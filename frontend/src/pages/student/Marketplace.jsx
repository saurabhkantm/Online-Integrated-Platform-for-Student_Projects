import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { projects, colleges, departments, technologies, academicYears } from '../../services/mockApi'
import StatusBadge from '../../components/common/StatusBadge'

export default function Marketplace() {
  const [search, setSearch] = useState('')
  const [college, setCollege] = useState('')
  const [department, setDepartment] = useState('')
  const [tech, setTech] = useState('')
  const [year, setYear] = useState('')

  const filtered = useMemo(
    () =>
      projects.filter((project) => {
        const matchesSearch =
          !search ||
          project.title.toLowerCase().includes(search.toLowerCase()) ||
          project.description.toLowerCase().includes(search.toLowerCase())
        const matchesCollege = !college || project.college === college
        const matchesDept = !department || project.department === department
        const matchesTech = !tech || project.techStack.includes(tech)
        const matchesYear = !year || String(project.year) === year
        return matchesSearch && matchesCollege && matchesDept && matchesTech && matchesYear
      }),
    [search, college, department, tech, year],
  )

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-8 shadow-ledger ring-1 ring-ledger-100">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Project marketplace</p>
            <h1 className="mt-3 text-3xl font-semibold text-ledger-950">Browse student projects</h1>
            <p className="mt-2 text-sm leading-7 text-ledger-600">Discover projects from colleges across the network.</p>
          </div>
          <div className="rounded-[2rem] bg-ledger-50 px-5 py-4 text-sm text-ledger-600 ring-1 ring-ledger-100">
            {filtered.length} projects found
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="rounded-[2rem] bg-white p-5 shadow-ledger ring-1 ring-ledger-100">
            <div className="relative">
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ledger-300" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects, colleges, or technologies..."
                className="w-full rounded-[1.75rem] border border-ledger-200 bg-ledger-50/90 py-4 pl-12 pr-4 text-sm text-ledger-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <select
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="rounded-3xl border border-ledger-200 bg-ledger-50 px-4 py-3 text-sm text-ledger-700"
              >
                <option value="">All Colleges</option>
                {colleges.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="rounded-3xl border border-ledger-200 bg-ledger-50 px-4 py-3 text-sm text-ledger-700"
              >
                <option value="">All Departments</option>
                {departments.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                value={tech}
                onChange={(e) => setTech(e.target.value)}
                className="rounded-3xl border border-ledger-200 bg-ledger-50 px-4 py-3 text-sm text-ledger-700"
              >
                <option value="">All Technologies</option>
                {technologies.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="rounded-3xl border border-ledger-200 bg-ledger-50 px-4 py-3 text-sm text-ledger-700"
              >
                <option value="">All Years</option>
                {academicYears.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((project) => (
              <article key={project.id} className="rounded-[2rem] border border-ledger-100 bg-white p-6 shadow-ledger transition hover:-translate-y-1 hover:shadow-2xl">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ledger-500">{project.college}</p>
                    <h2 className="mt-3 text-xl font-semibold text-ledger-950">{project.title}</h2>
                  </div>
                  <StatusBadge status={project.status} />
                </div>
                <p className="mt-4 text-sm leading-6 text-ledger-600">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="rounded-full bg-ledger-100 px-3 py-1 text-xs font-semibold text-ledger-600">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  <span className="rounded-2xl bg-ledger-50 px-3 py-2 text-xs font-semibold text-ledger-600">{project.department}</span>
                  <span className="rounded-2xl bg-ledger-50 px-3 py-2 text-xs font-semibold text-ledger-600">{project.year}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2 text-sm text-ledger-500">
                  <span>{project.submittedDate}</span>
                  <span className="mx-1 hidden sm:inline">•</span>
                  <span>{project.github ? 'GitHub' : 'No repo'}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                      GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl border border-ledger-200 bg-white px-4 py-2 text-sm font-semibold text-ledger-700 transition hover:bg-ledger-50"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
            <h3 className="text-lg font-semibold text-ledger-950">Marketplace summary</h3>
            <p className="mt-3 text-sm text-ledger-600">Explore approved and published projects from partner colleges.</p>
            <div className="mt-5 space-y-3">
              <div className="rounded-3xl bg-ledger-50 p-4">
                <p className="text-sm text-ledger-500">Total projects</p>
                <p className="mt-2 text-3xl font-semibold text-ledger-950">{filtered.length}</p>
              </div>
              <div className="rounded-3xl bg-ledger-50 p-4">
                <p className="text-sm text-ledger-500">Top technology</p>
                <p className="mt-2 text-3xl font-semibold text-ledger-950">React</p>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
            <h3 className="text-lg font-semibold text-ledger-950">Quick actions</h3>
            <div className="mt-5 grid gap-3">
              <button className="rounded-3xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">Submit your project</button>
              <button className="rounded-3xl border border-ledger-200 bg-white px-4 py-3 text-sm font-semibold text-ledger-700 transition hover:bg-ledger-50">View top rated projects</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
