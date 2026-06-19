import './WelcomeScreen.css'
import LandingHero from './LandingHero'

function WelcomeScreen({ onGetStarted }) {
	return (
		<main className="welcome-site">
			<div className="welcome-page">
				<LandingHero onGetStarted={onGetStarted} />
			</div>
		</main>
	)
}

export default WelcomeScreen
