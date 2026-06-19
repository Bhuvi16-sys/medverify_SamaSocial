import './AppFooter.css'

export default function AppFooter() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="app-footer">
			<div className="footer-container">
				<div className="footer-section">
					<h3>MedVerify</h3>
					<p>Verify medicines safely and affordably</p>
				</div>
				<div className="footer-section">
					<h4>Quick Links</h4>
					<ul>
						<li><a href="#about">About</a></li>
						<li><a href="#privacy">Privacy</a></li>
						<li><a href="#terms">Terms</a></li>
						<li><a href="#contact">Contact</a></li>
					</ul>
				</div>
				<div className="footer-section">
					<h4>Follow Us</h4>
					<ul>
						<li><a href="#twitter">Twitter</a></li>
						<li><a href="#facebook">Facebook</a></li>
						<li><a href="#instagram">Instagram</a></li>
					</ul>
				</div>
			</div>
			<div className="footer-bottom">
				<p>&copy; {currentYear} MedVerify. All rights reserved. Free and open source.</p>
			</div>
		</footer>
	)
}
