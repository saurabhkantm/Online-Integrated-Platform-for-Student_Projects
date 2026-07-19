import { CheckCheck, BellOff, CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import EmptyState from '../../components/common/EmptyState'

const ICONS = {
  success: { Icon: CheckCircle2, color: 'bg-success-50 text-success-500' },
  warning: { Icon: AlertTriangle, color: 'bg-warning-50 text-warning-500' },
  danger: { Icon: XCircle, color: 'bg-danger-50 text-danger-500' },
  info: { Icon: Info, color: 'bg-ledger-100 text-ledger-500' },
}

export default function Notifications() {
  const { notifs, markAllRead, markRead } = useApp()

  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] bg-white/95 p-8 shadow-ledger ring-1 ring-ledger-100">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-ledger-950">Notifications</h2>
            <p className="mt-2 text-sm leading-6 text-ledger-600">Status changes and updates on your submitted projects.</p>
          </div>
          <button
            onClick={markAllRead}
            className="flex w-fit items-center gap-1.5 rounded-lg border border-ledger-200 px-3.5 py-2 text-xs font-semibold text-ledger-600 hover:bg-ledger-50"
          >
            <CheckCheck size={14} /> Mark all as read
          </button>
        </div>
      </div>

      {notifs.length === 0 ? (
        <EmptyState icon={BellOff} title="You're all caught up" message="New notifications will show up here." />
      ) : (
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-ledger ring-1 ring-ledger-100">
          <ul className="divide-y divide-ledger-100">
            {notifs.map((n) => {
              const { Icon, color } = ICONS[n.type] || ICONS.info
              return (
                <li
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={`flex cursor-pointer items-start gap-3.5 px-5 py-4 transition hover:bg-ledger-50/60 ${
                    !n.read ? 'bg-gold-50/40' : ''
                  }`}
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${color}`}>
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-ledger-800">{n.title}</p>
                      <span className="shrink-0 text-xs text-ledger-400">{n.date}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-ledger-500">{n.message}</p>
                  </div>
                  {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500" aria-label="Unread" />}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
