export default function EmptyState({ icon: Icon, title, message }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-ledger-200 bg-white/90 px-6 py-14 text-center shadow-ledger">
      {Icon && (
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-ledger-50 text-ledger-700">
          <Icon size={24} />
        </div>
      )}
      <p className="font-semibold text-lg text-ledger-950">{title}</p>
      {message && <p className="mt-2 max-w-sm text-sm text-ledger-500">{message}</p>}
    </div>
  )
}
