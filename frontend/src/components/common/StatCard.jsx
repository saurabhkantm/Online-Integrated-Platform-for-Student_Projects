import { motion } from 'framer-motion'
import { FiFolder } from 'react-icons/fi'

const ACCENT_STYLES = {
  ledger: { ring: 'ring-ledger-100', icon: 'bg-ledger-900 text-white', text: 'text-ledger-950' },
  gold: { ring: 'ring-gold-100', icon: 'bg-gold-500 text-white', text: 'text-ledger-950' },
  success: { ring: 'ring-success-100', icon: 'bg-success-500 text-white', text: 'text-ledger-950' },
  warning: { ring: 'ring-warning-100', icon: 'bg-warning-500 text-white', text: 'text-ledger-950' },
  danger: { ring: 'ring-danger-100', icon: 'bg-danger-500 text-white', text: 'text-ledger-950' },
}

function isValidIcon(icon) {
  return typeof icon === 'function' || (typeof icon === 'object' && icon !== null)
}

export default function StatCard({ title, value, icon, color = 'ledger' }) {
  if (typeof title !== 'string' || title.trim().length === 0) return null
  if (value === undefined || value === null) return null

  const IconComponent = isValidIcon(icon) ? icon : FiFolder
  const accent = typeof color === 'string' && ACCENT_STYLES[color] ? color : 'ledger'
  const styles = ACCENT_STYLES[accent]

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`flex items-center gap-4 rounded-xl bg-white p-5 shadow-ledger ring-1 ${styles.ring}`}
    >
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}>
        <IconComponent size={20} strokeWidth={2.2} />
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs font-medium uppercase tracking-wide text-ledger-400">{title}</p>
        <p className={`font-display text-2xl font-bold ${styles.text}`}>{value}</p>
      </div>
    </motion.div>
  )
}
