export default function Logo({ size = 40 }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
			style={{ display: 'block' }}
		>
			{/* Medical Cross */}
			<g transform="translate(10,10)">
				<rect x="20" y="0" width="16" height="56" rx="4" fill="#0A84FF" />
				<rect x="0" y="20" width="56" height="16" rx="4" fill="#0A84FF" />

				{/* Verification Circle */}
				<circle cx="44" cy="44" r="16" fill="#34C759" stroke="white" strokeWidth="2.4" />

				{/* Checkmark */}
				<path
					d="M37 44 L42 49 L53 38"
					stroke="white"
					strokeWidth="3.2"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
		</svg>
	)
}
