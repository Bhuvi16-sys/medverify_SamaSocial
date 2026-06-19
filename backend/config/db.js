import mongoose from 'mongoose'
import { Resolver, resolveSrv, resolveTxt } from 'dns/promises'

const dnsServers = [
	['1.1.1.1', '1.0.0.1'],
	['8.8.8.8', '8.8.4.4'],
	['9.9.9.9', '149.112.112.112'],
]

const resolveSrvWithFallback = async (host) => {
	try {
		return await resolveSrv(host)
	} catch (error) {
		for (const servers of dnsServers) {
			try {
				const resolver = new Resolver()
				resolver.setServers(servers)
				return await resolver.resolveSrv(host)
			} catch {
				// Try next configured DNS provider.
			}
		}

		throw error
	}
}

const resolveTxtWithFallback = async (host) => {
	try {
		return await resolveTxt(host)
	} catch {
		for (const servers of dnsServers) {
			try {
				const resolver = new Resolver()
				resolver.setServers(servers)
				return await resolver.resolveTxt(host)
			} catch {
				// TXT records are optional, continue trying or return empty.
			}
		}

		return []
	}
}

const shouldUseDirectFallback = (mongoUri, error) => {
	const message = String(error?.message || '')
	return (
		String(mongoUri || '').startsWith('mongodb+srv://') &&
		(message.includes('querySrv') || error?.code === 'ECONNREFUSED')
	)
}

const buildDirectMongoUri = async (mongoUri) => {
	const source = new URL(mongoUri)
	const [srvAnswers, txtAnswers] = await Promise.all([
		resolveSrvWithFallback(`_mongodb._tcp.${source.hostname}`),
		resolveTxtWithFallback(source.hostname),
	])

	const hosts = srvAnswers
		.map((record) => `${record.name.replace(/\.$/, '')}:${record.port}`)

	if (hosts.length === 0) {
		throw new Error('Could not resolve Atlas SRV hosts for direct MongoDB connection.')
	}

	const params = new URLSearchParams(source.search)
	params.set('ssl', 'true')

	for (const answer of txtAnswers) {
		const text = Array.isArray(answer) ? answer.join('') : String(answer || '')
		const extra = new URLSearchParams(text)
		for (const [key, value] of extra.entries()) {
			if (!params.has(key)) params.set(key, value)
		}
	}

	if (!params.has('retryWrites')) params.set('retryWrites', 'true')
	if (!params.has('w')) params.set('w', 'majority')

	const auth = `${source.username}:${source.password}`
	const dbPath = source.pathname || '/dawacheck'
	return `mongodb://${auth}@${hosts.join(',')}${dbPath}?${params.toString()}`
}

export const connectDB = async () => {
	const mongoUri = process.env.MONGO_URI

	if (!mongoUri) {
		throw new Error('MONGO_URI is missing in environment variables.')
	}

	try {
		await mongoose.connect(mongoUri)
	} catch (error) {
		if (!shouldUseDirectFallback(mongoUri, error)) {
			throw error
		}

		try {
			const directUri = await buildDirectMongoUri(mongoUri)
			await mongoose.connect(directUri)
		} catch {
			// Preserve the original connection error because it is usually more actionable.
			throw error
		}
	}

	console.log('Connected to MongoDB')

	return mongoose.connection
}
