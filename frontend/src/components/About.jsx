import './StaticPage.css'

export default function About() {
	return (
		<div className="static-page">
			<div className="static-hero">
				<p className="static-kicker">Who we are</p>
				<h1 className="static-title">About MedVerify</h1>
			</div>
			<div className="static-card">
				<h2>What is MedVerify?</h2>
				<p>
					MedVerify is a free, open-source tool built to help people in India verify
					medicines quickly and safely. Using OCR scanning, drug interaction checking, and
					heatmap insights, MedVerify puts safety information directly in the hands of users.
				</p>

				<h2>Why we built it</h2>
				<p>
					Counterfeit and substandard medicines are a serious public health risk. We built
					MedVerify to give everyday users a simple way to verify what they are holding
					before they consume it.
				</p>

				<h2>Built by</h2>
				<p>
					MedVerify was built with love by <strong>Team VisionForge</strong> for the{' '}
					<strong>SamaSocial Build for Good Hackathon</strong>. It is free to use and
					open source.
				</p>
				<ul className="static-team">
					<li><strong>Daman</strong> — Team Lead</li>
					<li><strong>Bhuvi</strong> — Team Member</li>
					<li><strong>Sneha</strong> — Team Member</li>
				</ul>
			</div>
		</div>
	)
}
