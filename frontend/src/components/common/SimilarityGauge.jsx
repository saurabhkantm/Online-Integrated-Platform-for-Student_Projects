// Signature element: a hand-built SVG "ledger seal" gauge that renders a
// project's similarity score as a circular ring, used on the plagiarism page.

export default function SimilarityGauge({ score, size = 88 }) {
  const radius = (size - 10) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  let color = '#1b8a5a' // success
  let label = 'Low'
  if (score >= 40) {
    color = '#c0392b' // danger
    label = 'High'
  } else if (score >= 20) {
    color = '#b8860b' // warning
    label = 'Moderate'
  }

  return (
    <div className="relative flex items-center justify-center rounded-full bg-white/90 p-3 shadow-sm ring-1 ring-ledger-100" style={{ width: size + 20, height: size + 20 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90 rounded-full">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={7} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-lg font-semibold leading-none" style={{ color }}>{score}%</span>
        <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-ledger-400">{label}</span>
      </div>
    </div>
  )
}
