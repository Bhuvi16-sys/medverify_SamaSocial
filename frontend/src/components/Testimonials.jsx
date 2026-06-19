function Testimonials() {
	return (
		<section className="testimonials" aria-label="User testimonials">
			<h2>Verified and Trusted by 10,000+ Users</h2>
			<div className="testimonial-grid">
				<article>
					<p>MedVerify saves time and helps me verify medicine quickly for my family.</p>
					<strong>RashadulIslam</strong>
				</article>
				<article>
					<p>I compare alternatives and costs in seconds. Very useful for daily decisions.</p>
					<strong>Juna</strong>
				</article>
				<article>
					<p>The nearby pharmacy finder helped me get urgent medicine without delay.</p>
					<strong>Sehanrd B.</strong>
				</article>
			</div>
			<div className="testimonial-dots" aria-hidden="true">
				<span className="active" />
				<span />
				<span />
			</div>
		</section>
	)
}

export default Testimonials
