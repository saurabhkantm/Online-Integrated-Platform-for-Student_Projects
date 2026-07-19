import { Search, SlidersHorizontal, X } from 'lucide-react'

export default function SearchFilterBar({
  search,
  onSearchChange,
  placeholder = 'Search projects…',
  filters = [],
  onClear,
  activeCount = 0,
}) {
  return (
    <div className="rounded-[1.75rem] bg-white/95 p-4 shadow-ledger ring-1 ring-ledger-100 backdrop-blur-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ledger-300" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-2xl border border-ledger-200 bg-ledger-50/80 py-3 pl-10 pr-4 text-sm text-ledger-900 placeholder:text-ledger-400 focus:border-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {filters.map((f) => (
            <select
              key={f.label}
              value={f.value}
              onChange={(e) => f.onChange(e.target.value)}
              className="min-w-[8.5rem] rounded-2xl border border-ledger-200 bg-ledger-50/80 px-4 py-3 text-sm text-ledger-700 focus:border-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-100"
            >
              <option value="">{f.label}</option>
              {f.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ))}
        </div>

        {activeCount > 0 && (
          <button
            onClick={onClear}
            className="flex items-center justify-center gap-1.5 rounded-2xl border border-ledger-200 px-4 py-3 text-sm font-medium text-ledger-600 transition hover:bg-ledger-100 lg:w-auto"
          >
            <X size={14} /> Clear ({activeCount})
          </button>
        )}
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-ledger-500">
        <SlidersHorizontal size={12} /> Filter by college, department, technology and year
      </p>
    </div>
  )
}
