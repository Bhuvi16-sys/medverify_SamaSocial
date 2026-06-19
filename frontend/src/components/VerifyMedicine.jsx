import { useMemo, useState } from 'react'
import CameraScanner from './CameraScanner'
import ResultCard from './ResultCard'
import { verifyMedicine } from '../services/api'
import './VerifyMedicine.css'

function inferName(text) {
	if (!text) return ''
	const norm = text.replace(/\s+/g, ' ').trim()
	const match = norm.match(/[A-Za-z][A-Za-z0-9\- ]{2,40}/)
	return (match?.[0] || norm.split(' ').slice(0, 3).join(' ')).trim()
}

function makeDummy(ocrText, name) {
	return {
		medicine: name || 'Paracetamol 650',
		status: 'genuine',
		ocrText,
		price: 34,
		marketAverage: 41,
		advice: 'Store below 25°C and verify batch number before purchase.',
		hindiText: 'Dawa asli lag rahi hai. Kripya expiry date zarur dekhein.',
	}
}

export default function VerifyMedicine() {
	const [scanResult, setScanResult] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const hasResult = useMemo(() => Boolean(scanResult), [scanResult])

	const handleScanComplete = async (ocrText) => {
		const name = inferName(ocrText)
		setLoading(true)
		setError('')
		try {
			const response = await verifyMedicine(name)
			const p = response?.data || {}
			setScanResult({
				medicine: p.medicine || p.name || name,
				status: p.status || 'not_found',
				ocrText,
				price: p.price,
				marketAverage: p.marketAverage,
				advice: p.advice || p.message,
				hindiText: p.hindiText || p.hindi_message,
			})
		} catch {
			setError('Server unavailable — showing demo result.')
			setScanResult(makeDummy(ocrText, name))
		} finally {
			setLoading(false)
		}
	}

	const reset = () => {
		setScanResult(null)
		setError('')
	}

	return (
		<div className="vm-page">
			<div className="vm-hero">
				<p className="vm-kicker">Medicine Verification</p>
				<h1 className="vm-title">Verify your medicine instantly</h1>
				<p className="vm-sub">
					Scan a strip or package photo and we'll check it against our database.
				</p>
			</div>

			<div className="vm-content">
				{error && <p className="vm-error">{error}</p>}

				{!hasResult ? (
					<div className="vm-scanner-card">
						<CameraScanner onScanComplete={handleScanComplete} loading={loading} />
					</div>
				) : (
					<>
						<ResultCard result={scanResult} onReset={reset} />
						<button type="button" className="vm-rescan-btn" onClick={reset}>
							Scan another medicine
						</button>
					</>
				)}
			</div>
		</div>
	)
}
