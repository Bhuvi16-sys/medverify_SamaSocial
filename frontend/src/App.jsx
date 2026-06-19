import { useEffect, useMemo, useState } from 'react'
import CameraScanner from './components/CameraScanner'
import ResultCard from './components/ResultCard'
import InteractionBox from './components/InteractionBox'
import HeatMap from './components/HeatMap'
import WelcomeScreen from './components/WelcomeScreen'
import Login from './components/Login'
import Signup from './components/Signup'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import { logScan, verifyMedicine, getCurrentUser } from './services/api'

const STREAK_KEY = 'medverify_scan_days'

function getStreakFromStorage() {
	try {
		const raw = localStorage.getItem(STREAK_KEY)
		const days = raw ? JSON.parse(raw) : []
		if (!Array.isArray(days)) return 0

		const today = new Date()
		let count = 0
		for (let i = 0; i < 365; i += 1) {
			const d = new Date(today)
			d.setDate(today.getDate() - i)
			const key = d.toISOString().slice(0, 10)
			if (days.includes(key)) {
				count += 1
			} else {
				break
			}
		}

		return count
	} catch {
		return 0
	}
}

function recordScanDay() {
	try {
		const todayKey = new Date().toISOString().slice(0, 10)
		const raw = localStorage.getItem(STREAK_KEY)
		const existing = raw ? JSON.parse(raw) : []
		const deduped = Array.from(new Set([...(Array.isArray(existing) ? existing : []), todayKey]))
		localStorage.setItem(STREAK_KEY, JSON.stringify(deduped.slice(-45)))
	} catch {
		// Ignore streak storage failures.
	}
}

async function notifyIfPossible(title, body) {
	if (!('Notification' in window) || !('serviceWorker' in navigator)) return
	if (Notification.permission !== 'granted') return

	try {
		const registration = await navigator.serviceWorker.ready
		await registration.showNotification(title, {
			body,
			icon: '/icon-192.png',
		})
	} catch {
		// Ignore notification errors.
	}
}

function inferMedicineName(ocrText) {
	if (!ocrText) return ''
	const normalized = ocrText.replace(/\s+/g, ' ').trim()
	const match = normalized.match(/[A-Za-z][A-Za-z0-9\- ]{2,40}/)
	return (match?.[0] || normalized.split(' ').slice(0, 3).join(' ')).trim()
}

function makeDummyResult(ocrText, medicineName) {
	return {
		medicine: medicineName || 'Paracetamol 650',
		status: 'genuine',
		ocrText,
		price: 34,
		marketAverage: 41,
		advice: 'Store below 25C and verify batch number before purchase.',
		hindiText: 'Dawa asli lag rahi hai. Kripya expiry date zarur dekhein.',
	}
}

function App() {
	const [scanResult, setScanResult] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [scanStreak, setScanStreak] = useState(0)
	const [showWelcome, setShowWelcome] = useState(true)
	const [currentUser, setCurrentUser] = useState(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [authMode, setAuthMode] = useState('login') // 'login' or 'signup'
	const [checkingAuth, setCheckingAuth] = useState(true)

	const hasResult = useMemo(() => Boolean(scanResult), [scanResult])

	useEffect(() => {
		setScanStreak(getStreakFromStorage())

		// Check if user is already authenticated
		const token = localStorage.getItem('authToken')
		if (token) {
			getCurrentUser()
				.then((response) => {
					setCurrentUser(response.data.user)
					setIsAuthenticated(true)
				})
				.catch(() => {
					localStorage.removeItem('authToken')
					setIsAuthenticated(false)
				})
				.finally(() => {
					setCheckingAuth(false)
				})
		} else {
			setCheckingAuth(false)
		}

		try {
			const raw = localStorage.getItem('medverify_reminder')
			if (!raw) return
			const reminder = JSON.parse(raw)
			if (!reminder?.dueAt || Date.now() < Number(reminder.dueAt)) return

			notifyIfPossible(
				'MedVerify reminder',
				`Time to recheck ${reminder.medicine || 'your medicine'} and confirm safety.`,
			)
			localStorage.removeItem('medverify_reminder')
		} catch {
			// Ignore malformed reminder data.
		}
	}, [])

	const handleScanComplete = async (ocrText) => {
		const medicineName = inferMedicineName(ocrText)
		setLoading(true)
		setError('')

		try {
			const response = await verifyMedicine(medicineName)
			const payload = response?.data || {}
			const normalized = {
				medicine: payload.medicine || payload.name || medicineName,
				status: payload.status || 'not_found',
				ocrText,
				price: payload.price,
				marketAverage: payload.marketAverage,
				advice: payload.advice || payload.message,
				hindiText: payload.hindiText || payload.hindi_message,
			}
			setScanResult(normalized)
			recordScanDay()
			setScanStreak(getStreakFromStorage())
			notifyIfPossible(
					'MedVerify scan complete',
				`${normalized.medicine || 'Medicine'} marked as ${normalized.status}.`,
			)

			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					async (position) => {
						const { latitude, longitude } = position.coords
						try {
							await logScan(latitude, longitude, normalized.medicine, normalized.status)
						} catch {
							// Non-blocking analytics call.
						}
					},
					() => {
						// Skip scan log silently when location permission is denied.
					},
					{ enableHighAccuracy: false, timeout: 7000 },
				)
			}
		} catch {
			setError('Server unavailable. Showing demo card with dummy data.')
			setScanResult(makeDummyResult(ocrText, medicineName))
			recordScanDay()
			setScanStreak(getStreakFromStorage())
			notifyIfPossible(
				'MedVerify scan complete',
				'Using offline/demo result. Please verify when network is back.',
			)
		} finally {
			setLoading(false)
		}
	}

	const resetFlow = () => {
		setScanResult(null)
		setError('')
	}

	const handleLoginSuccess = (user) => {
		setCurrentUser(user)
		setIsAuthenticated(true)
		setShowWelcome(false)
		setAuthMode('login')
	}

	const handleSignupSuccess = (user) => {
		setCurrentUser(user)
		setIsAuthenticated(true)
		setShowWelcome(false)
		setAuthMode('login')
	}

	const handleLogout = () => {
		localStorage.removeItem('authToken')
		setCurrentUser(null)
		setIsAuthenticated(false)
		setShowWelcome(true)
		setAuthMode('login')
	}

	const handleGetStarted = () => {
		setShowWelcome(false)
		if (isAuthenticated) {
			// Already logged in, go to main app
			return
		} else {
			// Not logged in, show login page
			setAuthMode('login')
		}
	}

	const primaryMedicine = scanResult?.medicine || 'No medicine scanned yet'
	const quickStatus = scanResult?.status || 'ready'

	if (checkingAuth) {
		return (
			<>
				<AppHeader currentUser={currentUser} onLogout={handleLogout} onGetStarted={handleGetStarted} />
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						minHeight: 'calc(100vh - 200px)',
					}}
				>
					Loading...
				</div>
				<AppFooter />
			</>
		)
	}

	// Show welcome page first (public, no auth needed)
	if (showWelcome) {
		return (
			<>
				<AppHeader currentUser={currentUser} onLogout={handleLogout} onGetStarted={handleGetStarted} />
				<WelcomeScreen onGetStarted={handleGetStarted} />
				<AppFooter />
			</>
		)
	}

	// Show login/signup if user is trying to get started but not authenticated
	if (authMode === 'login' && !isAuthenticated) {
		return (
			<>
				<AppHeader currentUser={currentUser} onLogout={handleLogout} onGetStarted={handleGetStarted} />
				<Login
					onLoginSuccess={handleLoginSuccess}
					onSwitchToSignup={() => setAuthMode('signup')}
				/>
				<AppFooter />
			</>
		)
	}

	if (authMode === 'signup' && !isAuthenticated) {
		return (
			<>
				<AppHeader currentUser={currentUser} onLogout={handleLogout} onGetStarted={handleGetStarted} />
				<Signup
					onSignupSuccess={handleSignupSuccess}
					onSwitchToLogin={() => setAuthMode('login')}
				/>
				<AppFooter />
			</>
		)
	}

	return (
		<>
			<AppHeader currentUser={currentUser} onLogout={handleLogout} onGetStarted={handleGetStarted} />
			<main className="app-shell">
				<div className="phone-frame">
					<div className="app-backdrop app-backdrop-one" aria-hidden="true" />
					<div className="app-backdrop app-backdrop-two" aria-hidden="true" />

					<section className="hero-card">
					<p className="eyebrow">Scan. Verify.</p>
					<h1>
						Trust your <span>medicine.</span>
					</h1>
					<p className="subhead">
						Verify any medicine in seconds, compare affordable alternatives, and flag risky
						combinations before use.
					</p>

					<div className="hero-actions">
						<div className="scan-cta">
							<div className="scan-cta-icon">[]</div>
							<div>
								<strong>Scan medicine</strong>
								<span>Tap to check strip or package</span>
							</div>
						</div>
						<div className="hero-mini-stats">
							<div>
								<strong>{scanStreak}</strong>
								<span>day streak</span>
							</div>
							<div>
								<strong>{hasResult ? '1' : '0'}</strong>
								<span>latest scans</span>
							</div>
						</div>
					</div>

					<div className="hero-trust-row">
						<span>100% free</span>
						<span>Works offline</span>
						<span>Your data stays safe</span>
					</div>
				</section>

				<section className="shortcut-grid">
					<article className="shortcut-card">
						<p className="shortcut-label">My scans</p>
						<strong>{primaryMedicine}</strong>
						<span className={`shortcut-tag ${quickStatus}`}>{quickStatus}</span>
					</article>
					<article className="shortcut-card">
						<p className="shortcut-label">Reminders</p>
						<strong>Medicine schedule</strong>
						<span>Next alert handled in-app</span>
					</article>
					<article className="shortcut-card">
						<p className="shortcut-label">Interactions</p>
						<strong>Check with AI</strong>
						<span>Review 2 or more medicines</span>
					</article>
					<article className="shortcut-card">
						<p className="shortcut-label">ASHA mode</p>
						<strong>Field-ready view</strong>
						<span>Works for rural health workers</span>
					</article>
				</section>

				{error ? <p className="error-banner">{error}</p> : null}

				<section className="content-stack">
					{!hasResult ? (
						<CameraScanner onScanComplete={handleScanComplete} loading={loading} />
					) : (
						<ResultCard result={scanResult} onReset={resetFlow} />
					)}

					<InteractionBox />
					<HeatMap />
				</section>

				<nav className="bottom-nav" aria-label="Primary">
					<button className="nav-item" type="button">
						<span className="nav-icon">H</span>
						<span>Home</span>
					</button>
					<button className="nav-item" type="button">
						<span className="nav-icon">R</span>
						<span>History</span>
					</button>
					<button className="nav-item nav-item-active" type="button">
						<span className="nav-icon">S</span>
						<span>Scan</span>
					</button>
					<button className="nav-item" type="button">
						<span className="nav-icon">B</span>
						<span>Reminders</span>
					</button>
					<button className="nav-item" type="button">
						<span className="nav-icon">P</span>
						<span>Profile</span>
					</button>
				</nav>
			</div>
		</main>
			<AppFooter />
		</>
	)
}

export default App
