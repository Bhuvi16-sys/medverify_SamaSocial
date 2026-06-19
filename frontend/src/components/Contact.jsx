import './Contact.css'

export default function Contact() {
	return (
		<div className="contact-page">
			<div className="contact-hero">
				<p className="contact-kicker">Get in touch</p>
				<h1 className="contact-title">Contact Us</h1>
				<p className="contact-sub">
					Have a question or feedback? We'd love to hear from you.
				</p>
			</div>

			<div className="contact-body">
				<section className="contact-form-card">
					<h2 className="contact-card-title">Send a Message</h2>
					<form className="contact-form" onSubmit={(e) => e.preventDefault()}>
						<div className="contact-row">
							<div className="contact-field">
								<label htmlFor="c-name">Your Name</label>
								<input id="c-name" type="text" placeholder="Your Name" required />
							</div>
							<div className="contact-field">
								<label htmlFor="c-email">Email</label>
								<input id="c-email" type="email" placeholder="you@example.com" required />
							</div>
						</div>
						<div className="contact-field">
							<label htmlFor="c-message">Message</label>
							<textarea id="c-message" rows={5} placeholder="Tell us what's on your mind…" required />
						</div>
						<button type="submit" className="contact-submit">Send Message</button>
					</form>
				</section>

				<section className="contact-info-card">
					<h2 className="contact-card-title">Contact Info</h2>
					<ul className="contact-info-list">
						<li>
							<span className="ci-icon">📧</span>
							<div>
								<p className="ci-label">Email</p>
								<p className="ci-value">support@medverify.com</p>
							</div>
						</li>
						<li>
							<span className="ci-icon">🕐</span>
							<div>
								<p className="ci-label">Response time</p>
								<p className="ci-value">Within 24 hours</p>
							</div>
						</li>
						<li>
							<span className="ci-icon">📍</span>
							<div>
								<p className="ci-label">Based in</p>
								<p className="ci-value">India</p>
							</div>
						</li>
					</ul>

					<div className="contact-note">
						<span>🔒</span>
						<p>Your information is safe with us.</p>
					</div>
				</section>
			</div>
		</div>
	)
}
