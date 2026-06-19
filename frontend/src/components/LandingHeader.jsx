function LandingHeader({ onGetStarted }) {
	return (
		<header className="site-header">
			<div className="site-brand">
				<span className="site-brand-mark" aria-hidden="true">
					+
				</span>
				<span>MedVerify</span>
			</div>
			<nav className="site-nav" aria-label="Landing navigation">
				<a href="#home">Home</a>
				<a href="#how-it-works">How it Works</a>
				<a href="#verify">Verify Medicine</a>
				<a href="#blog">Blog</a>
				<a href="#contact">Contact</a>
			</nav>
			<button type="button" className="site-header-cta" onClick={onGetStarted}>
				Get Started
			</button>
		</header>
	)
}

export default LandingHeader
