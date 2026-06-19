function HowItWorks({ onGetStarted }) {
	return (
		<section className="steps" id="how-it-works">
			<h2>How it Works</h2>
			<div className="step-grid">
				<article>
					<div className="step-icon" aria-hidden="true">
						1
					</div>
					<h3>Scan</h3>
					<p>Scan any barcode or serial number to verify authenticity.</p>
				</article>
				<article>
					<div className="step-icon" aria-hidden="true">
						2
					</div>
					<h3>Analyze</h3>
					<p>Compare prices, quality, and alternatives across verified options.</p>
				</article>
				<article>
					<div className="step-icon" aria-hidden="true">
						3
					</div>
					<h3>Results</h3>
					<p>Get easy-to-read safety insights and practical recommendations.</p>
				</article>
			</div>
			<button type="button" className="section-cta" onClick={onGetStarted}>
				Get Started
			</button>
		</section>
	)
}

export default HowItWorks
