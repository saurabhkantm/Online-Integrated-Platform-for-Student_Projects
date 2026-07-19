import { useMemo, useState } from 'react'
import {
  ShieldAlert,
  ShieldCheck,
  ExternalLink,
  FileSearch,
  Download,
  CheckCircle2,
  RotateCcw,
  XCircle,
  AlertTriangle,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import StatCard from '../../components/common/StatCard'
import SimilarityGauge from '../../components/common/SimilarityGauge'
import Modal from '../../components/common/Modal'
import EmptyState from '../../components/common/EmptyState'

function getMatches(project) {
  if (project.plagiarismScore < 15) return []
  const pool = [
    { source: 'GitHub — public repository', label: 'Open-source code overlap' },
    { source: 'IEEE Xplore — conference paper (2023)', label: 'Methodology section overlap' },
    { source: 'Repository archive — earlier batch submission', label: 'Structural similarity in report' },
    { source: 'Kaggle — public notebook', label: 'Data pipeline overlap' },
    { source: 'arXiv preprint', label: 'Literature review overlap' },
  ]
  const count = project.plagiarismScore >= 40 ? 3 : project.plagiarismScore >= 25 ? 2 : 1
  return pool.slice(0, count).map((m, i) => ({
    ...m,
    percent: Math.max(4, Math.round(project.plagiarismScore / count) - i * 3),
  }))
}

function SimilarityProgress({ percentage }) {
  const hue = percentage >= 40 ? 'bg-danger-500' : percentage >= 20 ? 'bg-gold-500' : 'bg-success-500'
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-ledger-500">
        <span>Similarity progress</span>
        <span className="font-semibold text-ledger-900">{percentage}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-ledger-100">
        <div className={`${hue} h-full rounded-full`} style={{ width: `${percentage}%` }} />
      </div>
      <div className="flex items-center justify-between text-[11px] text-ledger-400">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  )
}

export default function Plagiarism() {
  const { projects, reviewProject } = useApp()
  const [viewing, setViewing] = useState(null)

  const sorted = useMemo(() => [...projects].sort((a, b) => b.plagiarismScore - a.plagiarismScore), [projects])
  const flagged = sorted.filter((p) => p.flagged)
  const avgScore = useMemo(
    () => Math.round(projects.reduce((sum, p) => sum + p.plagiarismScore, 0) / projects.length),
    [projects]
  )

  const riskScore = useMemo(() => {
    const high = projects.filter((p) => p.plagiarismScore >= 40).length
    return Math.round((high / projects.length) * 100)
  }, [projects])

  const categories = useMemo(
    () => [
      { label: 'Low risk', count: projects.filter((p) => p.plagiarismScore < 20).length, color: 'bg-success-500' },
      { label: 'Moderate risk', count: projects.filter((p) => p.plagiarismScore >= 20 && p.plagiarismScore < 40).length, color: 'bg-gold-500' },
      { label: 'High risk', count: projects.filter((p) => p.plagiarismScore >= 40).length, color: 'bg-danger-500' },
    ],
    [projects]
  )

  const matchCount = projects.filter((p) => p.plagiarismScore >= 20).length

  const handleAction = (project, status) => {
    reviewProject(project.id, {
      status,
      comment:
        status === 'Approved'
          ? 'Similarity is acceptable. Approved.'
          : status === 'Rejected'
          ? 'Similarity level is too high. Rejected.'
          : 'Please revise the submission based on similarity findings.',
      by: 'Dr. Priya Nair',
    })
    setViewing(null)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white/95 p-8 shadow-ledger ring-1 ring-ledger-100">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-ledger-500">Plagiarism review</p>
            <h1 className="mt-3 text-4xl font-semibold text-ledger-950">Similarity insights and risk analysis</h1>
            <p className="mt-4 text-sm leading-7 text-ledger-600">
              A professional detection workspace built for faculty action and transparent comparison review.
            </p>
          </div>
          <div className="rounded-[2rem] border border-ledger-200 bg-ledger-50 px-5 py-4 text-sm text-ledger-600 shadow-sm">
            <div className="flex items-center gap-2 font-semibold text-ledger-900">
              <ShieldAlert size={18} /> High fidelity similarity scanning
            </div>
            <p className="mt-2 text-xs text-ledger-500">Evaluate reports, compare matches, and act quickly.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Similarity %" value={avgScore} suffix="%" icon={ShieldAlert} accent={avgScore >= 40 ? 'danger' : avgScore >= 20 ? 'warning' : 'success'} />
        <StatCard label="Matching Projects" value={matchCount} icon={AlertTriangle} accent={matchCount > 0 ? 'danger' : 'success'} />
        <StatCard label="Risk Score" value={riskScore} suffix="%" icon={ShieldCheck} accent={riskScore >= 40 ? 'danger' : riskScore >= 20 ? 'warning' : 'success'} />
        <div className="rounded-[2rem] bg-white p-5 shadow-ledger ring-1 ring-ledger-100">
          <p className="text-sm font-semibold text-ledger-900">Similarity Progress</p>
          <p className="mt-2 text-xs text-ledger-500">Live score range for current scanned submissions.</p>
          <div className="mt-5">
            <SimilarityProgress percentage={avgScore} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100 xl:col-span-2">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-ledger-950">Comparison cards</h2>
              <p className="mt-1 text-xs text-ledger-400">Inspect the highest similarity matches and act from the dashboard.</p>
            </div>
            <span className="rounded-full bg-ledger-100 px-3 py-1 text-xs font-semibold text-ledger-600">
              {flagged.length} flagged projects
            </span>
          </div>

          <div className="space-y-4">
            {flagged.length === 0 ? (
              <div className="rounded-[1.75rem] bg-ledger-50 px-6 py-8 text-center text-sm text-ledger-500">
                No flagged matches detected. All scanned submissions are within acceptable similarity thresholds.
              </div>
            ) : (
              flagged.map((project) => (
                <div key={project.id} className="rounded-[1.75rem] border border-danger-100 bg-danger-50/10 p-5 shadow-sm">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-lg font-semibold text-ledger-950">{project.title}</h3>
                        <span className="rounded-full bg-danger-100 px-2 py-1 text-[11px] font-semibold text-danger-700">{project.plagiarismScore}%</span>
                      </div>
                      <p className="mt-2 text-sm text-ledger-500">{project.submittedBy} · {project.college} · {project.department}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-ledger-600 shadow-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setViewing(project)}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-ledger-200 bg-white px-4 py-3 text-sm font-semibold text-ledger-700 transition hover:bg-ledger-50"
                      >
                        <FileSearch size={16} /> View report
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAction(project, 'Approved')}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-success-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-success-600"
                      >
                        <CheckCircle2 size={16} /> Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAction(project, 'Changes Requested')}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold-500 px-4 py-3 text-sm font-semibold text-ledger-950 transition hover:bg-gold-400"
                      >
                        <RotateCcw size={16} /> Request changes
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAction(project, 'Rejected')}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-danger-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-danger-600"
                      >
                        <XCircle size={16} /> Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
            <h2 className="text-lg font-semibold text-ledger-950">Risk breakdown</h2>
            <p className="mt-1 text-xs text-ledger-400">Similarity distribution across all submissions.</p>
            <div className="mt-6 space-y-4">
              {categories.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-semibold text-ledger-700">
                    <span>{item.label}</span>
                    <span>{item.count} projects</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-ledger-100">
                    <div className={`${item.color} h-full`} style={{ width: `${Math.round((item.count / projects.length) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-ledger-950">High similarity alerts</h2>
                <p className="mt-1 text-xs text-ledger-400">Review the riskiest submissions first.</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-danger-50 px-3 py-1 text-xs font-semibold text-danger-700">
                <AlertTriangle size={14} /> {flagged.length}
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {flagged.slice(0, 4).map((project) => (
                <div key={project.id} className="rounded-3xl border border-danger-100 bg-danger-50/20 px-4 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-ledger-900">{project.title}</p>
                      <p className="text-xs text-ledger-500">{project.submittedBy}</p>
                    </div>
                    <span className="rounded-full bg-danger-100 px-3 py-1 text-xs font-semibold text-danger-700">{project.plagiarismScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={!!viewing}
        onClose={() => setViewing(null)}
        title="Similarity Report"
        size="lg"
        footer={
          viewing && (
            <div className="grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => handleAction(viewing, 'Approved')}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-success-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-success-600"
              >
                <CheckCircle2 size={16} /> Approve
              </button>
              <button
                type="button"
                onClick={() => handleAction(viewing, 'Changes Requested')}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold-500 px-4 py-3 text-sm font-semibold text-ledger-950 transition hover:bg-gold-400"
              >
                <RotateCcw size={16} /> Request changes
              </button>
              <button
                type="button"
                onClick={() => handleAction(viewing, 'Rejected')}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-danger-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-danger-600"
              >
                <XCircle size={16} /> Reject
              </button>
            </div>
          )
        }
      >
        {viewing && (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
              <div className="rounded-[2rem] bg-ledger-50 p-6 text-center">
                <SimilarityGauge score={viewing.plagiarismScore} size={100} />
                <div className="mt-5 space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-ledger-500">Similarity</p>
                  <p className="text-2xl font-semibold text-ledger-950">{viewing.plagiarismScore}%</p>
                  <p className="text-sm text-ledger-500">Risk score: {viewing.plagiarismScore >= 40 ? 'High' : viewing.plagiarismScore >= 20 ? 'Moderate' : 'Low'}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-[1.75rem] bg-ledger-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ledger-500">Project</p>
                  <h3 className="mt-2 text-lg font-semibold text-ledger-950">{viewing.title}</h3>
                  <p className="mt-2 text-sm text-ledger-600">{viewing.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {viewing.techStack.map((tech) => (
                      <span key={tech} className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-ledger-700 ring-1 ring-ledger-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-[1.75rem] bg-ledger-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ledger-500">Matching Projects</p>
                  <div className="mt-4 space-y-3">
                    {getMatches(viewing).map((match, index) => (
                      <div key={index} className="rounded-2xl border border-ledger-200 bg-white px-4 py-3">
                        <div className="flex items-center justify-between gap-3 text-sm text-ledger-900">
                          <div>
                            <p className="font-semibold">{match.source}</p>
                            <p className="text-xs text-ledger-500">{match.label}</p>
                          </div>
                          <span className="rounded-full bg-ledger-100 px-2 py-1 text-[11px] font-semibold text-ledger-600">{match.percent}%</span>
                        </div>
                      </div>
                    ))}
                    {getMatches(viewing).length === 0 && (
                      <p className="text-sm text-ledger-500">No significant matched sources detected.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={viewing.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-ledger-200 bg-white px-5 py-3 text-sm font-semibold text-ledger-700 transition hover:bg-ledger-50"
              >
                <ExternalLink size={16} /> Open GitHub
              </a>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-ledger-200 bg-white px-5 py-3 text-sm font-semibold text-ledger-700 transition hover:bg-ledger-50"
              >
                <Download size={16} /> Download report PDF
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
