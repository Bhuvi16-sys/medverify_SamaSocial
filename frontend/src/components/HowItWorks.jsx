function HowItWorks({ onGetStarted }) {
	const features = [
		{
			id: 'scan',
			tag: 'Scan Image',
			title: 'Verify medicine instantly from strip or package photo',
			description: 'Scan and confirm medicine identity in seconds.',
			image: '/explore-scan.png',
			alt: 'Scan feature',
		},
		{
			id: 'interactions',
			tag: 'Drug Interactions',
			title: 'Check risky combinations before taking doses',
			description: 'Get instant warnings for unsafe medicine combinations.',
			image: '/explore-interactions.png',
			alt: 'Drug interactions feature',
		},
		{
			id: 'heatmap',
			tag: 'Heatmap Insights',
			title: 'See local scan trends and potential risk clusters',
			description: 'Track area-wise medicine scan trends and risk patterns.',
			image: '/explore-heatmap.png',
			alt: 'Heatmap feature',
		},
	]

	return (
		<section className="how-it-works-page" id="how-it-works">
			<div className="how-it-works-shell">
				<p className="how-kicker">Explore</p>
				<h2>Everything you need to verify medicines</h2>
				<p className="how-subtitle">
					Three focused tools for identity checks, interaction safety, and local risk visibility.
				</p>

				<div className="how-feature-list" aria-label="Feature overview">
					{features.map((feature) => (
						<article key={feature.id} className="how-feature-card-combined">
							<div className="how-feature-media">
								<img src={feature.image} alt={feature.alt} className="how-feature-image" />
							</div>
							<div className="how-feature-content">
								<p className="how-feature-tag">{feature.tag}</p>
								<h3>{feature.title}</h3>
								<p>{feature.description}</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}

export default HowItWorks
