import Logo from './Logo'
import './AppFooter.css'

export default function AppFooter() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="app-footer">
			<div className="footer-inner">
				<div className="footer-brand">
					<Logo size={36} />
					<div>
						<p className="footer-brand-name">MedVerify</p>
						<p className="footer-brand-sub">Scan. Verify. Trust.</p>
					</div>
				</div>

				<div className="footer-links">
					<a href="/about" className="footer-link" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/about'); window.dispatchEvent(new PopStateEvent('popstate')) }}>About</a>
					<a href="/privacy" className="footer-link" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/privacy'); window.dispatchEvent(new PopStateEvent('popstate')) }}>Privacy</a>
					<a href="/contact" className="footer-link" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')) }}>Contact</a>
				</div>
			</div>

			<div className="footer-bottom">
				<p>Made with ♥ by <strong>VisionForge</strong> for <strong>SamaSocial Build for Good Hackathon</strong> &mdash; &copy; {currentYear} MedVerify</p>
			</div>
		</footer>
	)
}
