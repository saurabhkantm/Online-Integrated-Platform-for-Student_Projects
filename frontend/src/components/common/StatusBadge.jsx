import { CheckCircle2, Clock, XCircle, RotateCcw } from 'lucide-react'
import { STATUS } from '../../data/mockData'

const STYLES = {
  [STATUS.APPROVED]: 'border-success-100 bg-success-50 text-success-700',
  [STATUS.PENDING]: 'border-warning-100 bg-warning-50 text-warning-700',
  [STATUS.REJECTED]: 'border-danger-100 bg-danger-50 text-danger-700',
  [STATUS.CHANGES]: 'border-ledger-200 bg-ledger-100 text-ledger-700',
}

const ICONS = {
  [STATUS.APPROVED]: CheckCircle2,
  [STATUS.PENDING]: Clock,
  [STATUS.REJECTED]: XCircle,
  [STATUS.CHANGES]: RotateCcw,
}

export default function StatusBadge({ status, className = '' }) {
  const Icon = ICONS[status] || Clock
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm ${STYLES[status] || 'border-ledger-200 bg-ledger-100 text-ledger-700'} ${className}`}
    >
      <Icon size={13} strokeWidth={2.5} />
      {status}
    </span>
  )
}
