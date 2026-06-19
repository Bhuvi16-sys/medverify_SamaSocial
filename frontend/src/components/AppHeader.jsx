import { useState } from 'react'
import Logo from './Logo'
import './AppHeader.css'

export default function AppHeader({ currentUser, onLogout, onGetStarted }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const navLinks = [
		{ label: 'Home', href: '#' },
		{ label: 'How it Works', href: '#' },
		{ label: 'Verify Medicine', href: '#' },
		{ label: 'Blog', href: '#' },
		{ label: 'Contact', href: '#' },
	]

	return (
		<header className="app-header">
			<div className="header-container">
				<div className="header-brand">
					<Logo size={48} />
					<h1>MedVerify</h1>
				</div>

				<nav className="header-nav">
					{navLinks.map((link) => (
						<a key={link.label} href={link.href} className="nav-link">
							{link.label}
						</a>
					))}
				</nav>

				<div className="header-actions">
					{currentUser ? (
						<>
							<span className="user-name">{currentUser.name}</span>
							<button className="btn-secondary" onClick={onLogout}>
								Logout
							</button>
						</>
					) : (
						<button className="btn-primary" onClick={onGetStarted}>
							Get Started
						</button>
					)}
				</div>
			</div>
		</header>
	)
}

