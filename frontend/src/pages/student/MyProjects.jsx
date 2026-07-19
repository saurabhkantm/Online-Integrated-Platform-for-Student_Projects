import { useMemo, useState } from 'react'
import { Eye, Github, ExternalLink, Inbox, Pencil, Trash2, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { currentStudent, STATUS } from '../../data/mockData'
import StatusBadge from '../../components/common/StatusBadge'
import ProjectDetailModal from '../../components/common/ProjectDetailModal'
import SearchFilterBar from '../../components/common/SearchFilterBar'
import EmptyState from '../../components/common/EmptyState'

const TABS = ['All', STATUS.PENDING, STATUS.APPROVED, STATUS.CHANGES, STATUS.REJECTED]

export default function MyProjects() {
  const { projects } = useApp()
  const [tab, setTab] = useState('All')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sortKey, setSortKey] = useState('submittedDate')
  const [sortOrder, setSortOrder] = useState('desc')
  const [page, setPage] = useState(1)
  const [active, setActive] = useState(null)
  const pageSize = 6

  const mine = useMemo(
    () => projects.filter((p) => p.submittedBy === currentStudent.name),
    [projects]
  )

  const activeCount = [tab !== 'All', !!statusFilter, !!search].filter(Boolean).length

  const filtered = useMemo(() => {
    const base = tab === 'All' ? mine : mine.filter((p) => p.status === tab)
    return base.filter((project) => {
      const query = search.trim().toLowerCase()
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.id.toLowerCase().includes(query) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(query)) ||
        project.description.toLowerCase().includes(query)
      const matchesStatus = !statusFilter || project.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [mine, tab, search, statusFilter])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1
      if (sortKey === 'title') {
        return a.title.localeCompare(b.title) * order
      }
      if (sortKey === 'status') {
        return a.status.localeCompare(b.status) * order
      }
      if (sortKey === 'submittedDate') {
        return (new Date(a.submittedDate) - new Date(b.submittedDate)) * order
      }
      return 0
    })
  }, [filtered, sortKey, sortOrder])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const visible = useMemo(() => {
    const start = (page - 1) * pageSize
    return sorted.slice(start, start + pageSize)
  }, [page, sorted])

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((current) => (current === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortOrder('desc')
    }
    setPage(1)
  }

  const clearFilters = () => {
    setSearch('')
    setStatusFilter('')
    setTab('All')
    setPage(1)
  }

  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] bg-white/95 p-8 shadow-ledger ring-1 ring-ledger-100">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-ledger-950">My Projects</h2>
            <p className="mt-2 text-sm leading-6 text-ledger-600">Track the review status of everything you've submitted.</p>
          </div>
          <p className="rounded-3xl bg-ledger-50 px-4 py-3 text-sm text-ledger-600 ring-1 ring-ledger-100">
            Everything is grouped by review status for easy tracking.
          </p>
        </div>
      </div>

      <SearchFilterBar
        search={search}
        onSearchChange={(value) => {
          setSearch(value)
          setPage(1)
        }}
        placeholder="Search by title, tech, or project ID…"
        filters={[
          {
            label: 'Status',
            value: statusFilter,
            onChange: (value) => {
              setStatusFilter(value)
              setPage(1)
            },
            options: ['All', STATUS.APPROVED, STATUS.PENDING, STATUS.REJECTED, STATUS.CHANGES],
          },
        ]}
        onClear={clearFilters}
        activeCount={activeCount}
      />

      <div className="rounded-[2rem] bg-white shadow-ledger ring-1 ring-ledger-100">
        <div className="flex flex-col gap-4 border-b border-ledger-100 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">My Projects</p>
            <p className="mt-2 text-xs text-ledger-400">Search, sort, and manage your submissions with a polished workspace.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-ledger-500">
            <span>{sorted.length} projects</span>
            <span className="h-1.5 w-1.5 rounded-full bg-ledger-300" />
            <span>{pageSize} per page</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="max-h-[620px] overflow-y-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="sticky top-0 z-10 bg-white shadow-sm">
                <tr className="border-b border-ledger-100 bg-ledger-50 text-xs uppercase tracking-wide text-ledger-400">
                  <th className="px-5 py-3 font-semibold">
                    <button
                      type="button"
                      onClick={() => handleSort('title')}
                      className="inline-flex items-center gap-2"
                    >
                      Project
                      <ArrowUpDown size={14} />
                    </button>
                  </th>
                  <th className="px-5 py-3 font-semibold">Tech Stack</th>
                  <th className="px-5 py-3 font-semibold">
                    <button
                      type="button"
                      onClick={() => handleSort('submittedDate')}
                      className="inline-flex items-center gap-2"
                    >
                      Submitted
                      <ArrowUpDown size={14} />
                    </button>
                  </th>
                  <th className="px-5 py-3 font-semibold">
                    <button
                      type="button"
                      onClick={() => handleSort('status')}
                      className="inline-flex items-center gap-2"
                    >
                      Status
                      <ArrowUpDown size={14} />
                    </button>
                  </th>
                  <th className="px-5 py-3 font-semibold">Links</th>
                  <th className="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ledger-100">
                {visible.map((project) => (
                  <tr key={project.id} className="transition hover:bg-ledger-50/80">
                    <td className="max-w-[260px] px-5 py-4">
                      <p className="truncate font-semibold text-ledger-900">{project.title}</p>
                      <p className="mt-1 text-xs text-ledger-400">{project.id}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-ledger-100 px-2.5 py-1 text-[11px] font-semibold text-ledger-600"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="rounded-full bg-ledger-100 px-2.5 py-1 text-[11px] text-ledger-400">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-ledger-500">{project.submittedDate}</td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-ledger-500">
                      <div className="flex items-center gap-2.5">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-ledger-200 bg-ledger-50 p-2 text-ledger-500 transition hover:border-ledger-300 hover:bg-white hover:text-ledger-700"
                            aria-label="GitHub"
                          >
                            <Github size={15} />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-ledger-200 bg-ledger-50 p-2 text-ledger-500 transition hover:border-ledger-300 hover:bg-white hover:text-ledger-700"
                            aria-label="Live demo"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex flex-wrap items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setActive(project)}
                          className="inline-flex items-center gap-2 rounded-full border border-ledger-200 bg-white px-3 py-2 text-xs font-semibold text-ledger-600 transition hover:border-ledger-300 hover:bg-ledger-50"
                        >
                          <Eye size={14} /> View
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-full border border-ledger-200 bg-ledger-50 px-3 py-2 text-xs font-semibold text-ledger-600 transition hover:border-ledger-300 hover:bg-ledger-100"
                        >
                          <Pencil size={14} /> Edit
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:border-red-200 hover:bg-red-100"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-ledger-100 bg-ledger-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ledger-500">
            Showing {visible.length} of {sorted.length} projects
          </p>
          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-ledger-200 bg-white text-ledger-600 transition hover:bg-ledger-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="rounded-2xl border border-ledger-200 bg-white px-4 py-2 text-sm font-semibold text-ledger-700">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={page === totalPages}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-ledger-200 bg-white text-ledger-600 transition hover:bg-ledger-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <ProjectDetailModal project={active} open={!!active} onClose={() => setActive(null)} />
    </div>
  )
}
