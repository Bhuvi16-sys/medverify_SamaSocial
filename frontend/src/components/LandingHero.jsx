function LandingHero({ onGetStarted }) {
	return (
		<section className="hero" id="home">
			<div className="hero-layout">
				<div className="hero-copy">
					<h1>MedVerify</h1>
					<p className="hero-tagline">Scan. Verify. Trust.</p>
					<h2>Your Trusted Partner in Medication Safety</h2>
					<p className="hero-lead" id="verify">
						Verify any medicine in seconds, find affordable alternatives, and stay safe with our
						comprehensive verification system.
					</p>

					<ul className="hero-points" aria-label="MedVerify highlights">
						<li>Instant authenticity checks</li>
						<li>Safer medicine decisions</li>
						<li>Affordable alternatives</li>
					</ul>

					<button className="btn-primary hero-cta" onClick={onGetStarted}>
						Get Started
					</button>
				</div>

				<div className="hero-media">
					<img
						className="hero-welcomepage"
						src="/hero-welcomepage.png"
						alt="Hand holding medicine strip"
						loading="eager"
						onError={(event) => {
							event.currentTarget.style.display = 'none'
						}}
					/>
				</div>
			</div>
		</section>
	)
}

export default LandingHero
