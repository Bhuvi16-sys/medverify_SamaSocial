function BlogSection({ onGetStarted }) {
	return (
		<section className="blog" id="blog">
			<h2>Latest from the Blog</h2>
			<div className="blog-grid">
				<article>
					<div className="blog-thumb">Health Guide</div>
					<h3>How for Your Medicines and Findyzes</h3>
					<p>Scan serial numbers and verify authenticity with confidence.</p>
				</article>
				<article>
					<div className="blog-thumb">Cost Checker</div>
					<h3>Compare prices and find cheaper alternatives</h3>
					<p>Evaluate options by price, quality, and composition quickly.</p>
				</article>
				<article>
					<div className="blog-thumb">Safety Notes</div>
					<h3>Dosage and Safety with local pharmacies</h3>
					<p>Get practical dosage and safety guidance before you buy.</p>
				</article>
			</div>
			<button type="button" className="section-cta" onClick={onGetStarted}>
				Get Started
			</button>
		</section>
	)
}

export default BlogSection
