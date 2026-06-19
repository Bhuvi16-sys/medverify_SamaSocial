import './StaticPage.css'

export default function Privacy() {
	return (
		<div className="static-page">
			<div className="static-hero">
				<p className="static-kicker">Your data</p>
				<h1 className="static-title">Privacy Policy</h1>
			</div>
			<div className="static-card">
				<h2>What we collect</h2>
				<p>
					MedVerify collects only the minimum data needed to provide the service — medicine
					scan results and optional location data for heatmap insights. No personal health
					records are stored.
				</p>

				<h2>How we use it</h2>
				<p>
					Scan data is used solely to verify medicines and generate anonymous heatmap
					patterns. We do not sell or share your data with third parties.
				</p>

				<h2>Location data</h2>
				<p>
					Location is only used when you explicitly allow it during a scan. It is stored
					anonymously and used only for aggregated heatmap visualisation.
				</p>

				<h2>Contact</h2>
				<p>
					For any privacy concerns, reach us at{' '}
					<a href="mailto:support@medverify.com">support@medverify.com</a>.
				</p>
			</div>
		</div>
	)
}
