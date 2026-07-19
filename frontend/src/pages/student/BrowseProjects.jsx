import { useMemo, useState } from 'react'
import { Users, Github, ExternalLink, SearchX, ArrowUpRight, Download } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { COLLEGES, DEPARTMENTS, TECHNOLOGIES, YEARS, STATUS } from '../../data/mockData'
import SearchFilterBar from '../../components/common/SearchFilterBar'
import StatusBadge from '../../components/common/StatusBadge'
import ProjectDetailModal from '../../components/common/ProjectDetailModal'
import EmptyState from '../../components/common/EmptyState'

const gradientPalettes = [
  'from-sky-500 to-indigo-700',
  'from-emerald-500 to-teal-700',
  'from-fuchsia-500 to-violet-700',
  'from-orange-500 to-amber-700',
  'from-cyan-500 to-slate-700',
]

function getCardGradient(title) {
  const value = title.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return gradientPalettes[value % gradientPalettes.length]
}

function getInitials(title) {
  return title
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

export default function BrowseProjects() {
  const { projects } = useApp()
  const [search, setSearch] = useState('')
  const [college, setCollege] = useState('')
  const [department, setDepartment] = useState('')
  const [tech, setTech] = useState('')
  const [year, setYear] = useState('')
  const [active, setActive] = useState(null)

  const approved = projects.filter((p) => p.status === STATUS.APPROVED)

  const filtered = useMemo(() => {
    return approved.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      const matchesCollege = !college || p.college === college
      const matchesDept = !department || p.department === department
      const matchesTech = !tech || p.techStack.includes(tech)
      const matchesYear = !year || String(p.year) === year
      return matchesSearch && matchesCollege && matchesDept && matchesTech && matchesYear
    })
  }, [approved, search, college, department, tech, year])

  const activeCount = [college, department, tech, year].filter(Boolean).length

  const clearFilters = () => {
    setCollege('')
    setDepartment('')
    setTech('')
    setYear('')
  }

  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] bg-white/95 p-8 shadow-ledger ring-1 ring-ledger-100">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-ledger-950">Browse Projects</h2>
            <p className="mt-2 text-sm leading-6 text-ledger-600">
              Explore {approved.length} approved projects from across the repository.
            </p>
          </div>
          <div className="rounded-3xl bg-ledger-50 px-4 py-3 text-sm text-ledger-600 ring-1 ring-ledger-100">
            Refine your search with filters and quick actions.
          </div>
        </div>
      </div>

      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search by title or technology…"
        activeCount={activeCount}
        onClear={clearFilters}
        filters={[
          { label: 'College', value: college, onChange: setCollege, options: COLLEGES },
          { label: 'Department', value: department, onChange: setDepartment, options: DEPARTMENTS },
          { label: 'Technology', value: tech, onChange: setTech, options: TECHNOLOGIES },
          { label: 'Year', value: year, onChange: setYear, options: YEARS.map(String) },
        ]}
      />

      {filtered.length === 0 ? (
        <EmptyState icon={SearchX} title="No projects match your filters" message="Try clearing a filter or searching a different keyword." />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-[2rem] border border-ledger-100 bg-white shadow-ledger transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className={`relative h-48 bg-gradient-to-br ${getCardGradient(p.title)} p-5`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_40%)]" />
                <div className="relative flex h-full flex-col justify-end">
                  <div className="mb-4 inline-flex items-center gap-3 rounded-full bg-white/15 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm shadow-sm">
                    <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/20 text-sm font-semibold text-white">
                      {getInitials(p.title)}
                    </span>
                    <span>{p.department}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{p.title}</h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6">
                <p className="text-sm leading-6 text-ledger-600 line-clamp-3">{p.description}</p>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-2xl bg-ledger-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ledger-500">
                      {p.college}
                    </span>
                    <span className="rounded-2xl bg-ledger-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ledger-500">
                      {p.department}
                    </span>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] bg-ledger-50 p-3 text-sm text-ledger-500 ring-1 ring-ledger-100">
                      <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-ledger-400">Tech Stack</span>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.techStack.slice(0, 5).map((tech) => (
                          <span key={tech} className="rounded-full bg-ledger-100 px-2.5 py-1 text-[11px] font-medium text-ledger-600">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[1.5rem] bg-ledger-50 p-3 text-sm text-ledger-500 ring-1 ring-ledger-100">
                      <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-ledger-400">Team</span>
                      <p className="mt-3 text-sm text-ledger-600">{p.team.join(', ')}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-3">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-2xl border border-ledger-200 bg-ledger-50 px-3.5 py-2 text-sm font-semibold text-ledger-600 transition hover:border-ledger-300 hover:bg-white"
                      >
                        <Github size={16} /> GitHub
                      </a>
                    )}
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-2xl border border-ledger-200 bg-ledger-50 px-3.5 py-2 text-sm font-semibold text-ledger-600 transition hover:border-ledger-300 hover:bg-white"
                      >
                        <ExternalLink size={16} /> Demo
                      </a>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a
                      href={p.pdfName ? `/${p.pdfName}` : '#'}
                      download
                      className="inline-flex items-center gap-2 rounded-2xl bg-ledger-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-ledger-800"
                    >
                      <Download size={16} /> PDF
                    </a>
                    <button
                      type="button"
                      onClick={() => setActive(p)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-ledger-200 bg-white px-4 py-2 text-sm font-semibold text-ledger-700 transition hover:border-ledger-300 hover:bg-ledger-50"
                    >
                      <ArrowUpRight size={16} /> View
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <ProjectDetailModal project={active} open={!!active} onClose={() => setActive(null)} />
    </div>
  )
}
