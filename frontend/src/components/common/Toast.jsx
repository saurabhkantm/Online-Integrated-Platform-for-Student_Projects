import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react'

const ICONS = {
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
  info: Info,
}

export default function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center px-4 sm:justify-end sm:px-6">
      <div className="flex w-full max-w-sm flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            const Icon = ICONS[toast.type] || Info
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.96 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="pointer-events-auto rounded-3xl border border-slate-200/80 bg-white/95 p-4 shadow-ledger backdrop-blur-md"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-ledger-50 text-ledger-700">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-ledger-950">{toast.title}</p>
                    <p className="mt-1 text-sm text-ledger-500">{toast.message}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDismiss(toast.id)}
                    className="rounded-full p-2 text-ledger-400 transition hover:bg-ledger-100 hover:text-ledger-700"
                    aria-label="Dismiss notification"
                  >
                    <XCircle size={18} />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
