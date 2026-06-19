import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const client = axios.create({
	baseURL: BASE,
	timeout: 12000,
})

// Add token to requests if available
client.interceptors.request.use((config) => {
	const token = localStorage.getItem('authToken')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export const register = (email, password, name) =>
	client.post('/api/auth/register', { email, password, name })

export const login = (email, password) =>
	client.post('/api/auth/login', { email, password })

export const getCurrentUser = () => client.get('/api/auth/me')

export const verifyMedicine = (name) =>
	client.get('/api/verify', { params: { name } })

export const logScan = (lat, lng, medicine, result) =>
	client.post('/api/scan-log', { lat, lng, medicine, result })

export const checkInteractions = (medicines) =>
	client.post('/api/interactions', { medicines })

export const getHeatmap = () => client.get('/api/heatmap')

export { BASE }

