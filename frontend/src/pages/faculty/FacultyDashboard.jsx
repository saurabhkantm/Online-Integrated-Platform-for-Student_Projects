import { useMemo, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import {
  FolderKanban,
  Clock,
  CheckCircle2,
  ShieldAlert,
  Eye,
  Download,
  ExternalLink,
  RotateCcw,
  XCircle,
  AlertTriangle,
  BarChart3,
  PieChart as PieIcon,
  MessageCircle,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { STATUS, monthlySubmissions, departmentDistribution, statusBreakdown } from '../../data/mockData'
import StatCard from '../../components/common/StatCard'
import StatusBadge from '../../components/common/StatusBadge'
import ProjectDetailModal from '../../components/common/ProjectDetailModal'
import SimilarityGauge from '../../components/common/SimilarityGauge'

export default function FacultyDashboard() {
  const { projects, reviewProject } = useApp()
  const [selectedProject, setSelectedProject] = useState(null)
  const [feedback, setFeedback] = useState('')

  const stats = useMemo(() => {
    const pending = projects.filter((p) => p.status === STATUS.PENDING).length
    const changes = projects.filter((p) => p.status === STATUS.CHANGES).length
    return {
      total: projects.length,
      pending,
      approvals: projects.filter((p) => p.status === STATUS.APPROVED).length,
      flagged: projects.filter((p) => p.flagged).length,
      requested: pending + changes,
      changes,
    }
  }, [projects])

  const pendingReviews = useMemo(
    () => projects.filter((p) => p.status === STATUS.PENDING),
    [projects]
  )

  const plagiarismAlerts = useMemo(
    () => projects.filter((p) => p.flagged),
    [projects]
  )

  const approvalRequests = useMemo(
    () => projects.filter((p) => p.status === STATUS.PENDING || p.status === STATUS.CHANGES),
    [projects]
  )

  const defaultComments = {
    [STATUS.APPROVED]: 'Strong work — approved and ready for publication.',
    [STATUS.REJECTED]: 'The submission does not meet the originality or quality standards. Rejected.',
    [STATUS.CHANGES]: 'Please revise the submission with the requested changes and resubmit.',
  }

  const closeReview = () => {
    setSelectedProject(null)
    setFeedback('')
  }

  const handleReview = (status) => {
    if (!selectedProject) return
    reviewProject(selectedProject.id, {
      status,
      comment: feedback.trim() || defaultComments[status],
      by: 'Dr. Priya Nair',
    })
    closeReview()
  }

  const projectCountLabel = (count) => `${count} ${count === 1 ? 'item' : 'items'}`

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white/95 p-8 shadow-ledger ring-1 ring-ledger-100">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-ledger-500">Faculty dashboard</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.02em] text-ledger-950">Review hub for academic projects</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-ledger-600">
              Centralize pending reviews, plagiarism alerts, approval requests and analytics in one premium admin workspace.
            </p>
          </div>
          <div className="rounded-[2rem] border border-ledger-200 bg-ledger-50 px-5 py-4 text-sm text-ledger-600 shadow-sm">
            <div className="flex items-center gap-2 font-semibold text-ledger-900">
              <BarChart3 size={18} /> Active review workflow
            </div>
            <p className="mt-2 text-xs text-ledger-500">Stay on top of approvals, flagged submissions, and feedback loops.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        <StatCard label="Total Submissions" value={stats.total} icon={FolderKanban} accent="ledger" />
        <StatCard label="Pending Reviews" value={stats.pending} icon={Clock} accent="warning" />
        <StatCard label="Approval Requests" value={stats.requested} icon={MessageCircle} accent="info" />
        <StatCard label="Plagiarism Alerts" value={stats.flagged} icon={ShieldAlert} accent="danger" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <section className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100 xl:col-span-2">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-ledger-950">Pending Reviews</h2>
              <p className="mt-1 text-xs text-ledger-500">Projects waiting for faculty action.</p>
            </div>
            <span className="rounded-full bg-ledger-100 px-3 py-1 text-xs font-semibold text-ledger-600">
              {projectCountLabel(pendingReviews.length)}
            </span>
          </div>

          <div className="space-y-4">
            {pendingReviews.slice(0, 5).map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="w-full rounded-[1.75rem] border border-ledger-200 bg-ledger-50 p-5 text-left transition hover:border-gold-300 hover:bg-white"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-base font-semibold text-ledger-950">{project.title}</h3>
                      <StatusBadge status={project.status} />
                    </div>
                    <p className="mt-1 truncate text-sm text-ledger-500">{project.submittedBy} · {project.submittedDate}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ledger-500">
                    <span>{project.techStack.length} tech</span>
                    <span>{project.team.length} team</span>
                  </div>
                </div>
              </button>
            ))}
            {pendingReviews.length === 0 && (
              <p className="rounded-[1.5rem] bg-ledger-50 px-5 py-6 text-sm text-ledger-500">No pending reviews available.</p>
            )}
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-ledger-950">Plagiarism Alerts</h2>
              <p className="mt-1 text-xs text-ledger-500">Flagged submissions that need extra scrutiny.</p>
            </div>
            <AlertTriangle size={18} className="text-danger-500" />
          </div>

          <div className="space-y-4">
            {plagiarismAlerts.slice(0, 4).map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="w-full rounded-[1.75rem] border border-danger-100 bg-danger-50/10 p-4 text-left transition hover:bg-danger-50/20"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-ledger-950">{project.title}</h3>
                    <p className="mt-1 text-xs text-ledger-500">{project.submittedBy} · {project.college}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-danger-100 px-3 py-1 text-xs font-semibold text-danger-700">{project.plagiarismScore}%</span>
                    <span className="rounded-full bg-ledger-100 px-2 py-1 text-[11px] font-semibold text-danger-700">Flagged</span>
                  </div>
                </div>
              </button>
            ))}
            {plagiarismAlerts.length === 0 && (
              <p className="rounded-[1.5rem] bg-ledger-50 px-5 py-6 text-sm text-ledger-500">No plagiarism alerts found.</p>
            )}
          </div>
        </section>
      </div>

      <section className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-ledger-950">Approval Requests</h2>
            <p className="mt-1 text-xs text-ledger-500">Projects that need a final decision or revision request.</p>
          </div>
          <span className="rounded-full bg-ledger-100 px-3 py-1 text-xs font-semibold text-ledger-600">
            {projectCountLabel(approvalRequests.length)}
          </span>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-ledger-200">
          <table className="w-full border-collapse text-left text-sm text-ledger-700">
            <thead className="bg-ledger-50 text-xs uppercase tracking-[0.24em] text-ledger-500">
              <tr>
                <th className="px-5 py-4">Project</th>
                <th className="px-5 py-4">Team</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Submitted</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {approvalRequests.map((project) => (
                <tr key={project.id} className="border-t border-ledger-200 bg-white transition hover:bg-ledger-50">
                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-left font-semibold text-ledger-900 underline-offset-4 hover:underline"
                    >
                      {project.title}
                    </button>
                    <p className="mt-1 text-xs text-ledger-500">{project.college}</p>
                  </td>
                  <td className="px-5 py-4">{project.team.join(', ')}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={project.status} />
                  </td>
                  <td className="px-5 py-4">{project.submittedDate}</td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="rounded-full bg-ledger-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-ledger-800"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-5">
        <div className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100 xl:col-span-3">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-ledger-950">Analytics</h2>
              <p className="mt-1 text-xs text-ledger-500">Submission trends and review performance.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-ledger-200 bg-ledger-50 px-4 py-2 text-xs text-ledger-600">
              <PieIcon size={14} /> Current term data
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlySubmissions} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f8" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#7186ad' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#7186ad' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #eaecef', fontSize: 12, fontFamily: 'Inter' }} />
              <Bar dataKey="submitted" name="Submitted" fill="#1f2937" radius={[4, 4, 0, 0]} />
              <Bar dataKey="approved" name="Approved" fill="#b8860b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100 xl:col-span-2">
          <h3 className="text-lg font-semibold text-ledger-950">Review Outcome Mix</h3>
          <p className="mt-1 text-xs text-ledger-500">Fast view of approval distribution.</p>
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusBreakdown} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={2}>
                  {statusBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #eaecef', fontSize: 12, fontFamily: 'Inter' }} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <ProjectDetailModal
        project={selectedProject}
        open={!!selectedProject}
        onClose={closeReview}
        footer={
          selectedProject && (
            <div className="grid gap-4 sm:grid-cols-[1.4fr_1fr]">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-ledger-900">Faculty feedback</p>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  placeholder="Leave guidance or notes for the team..."
                  className="w-full rounded-3xl border border-ledger-200 bg-ledger-50 px-4 py-3 text-sm text-ledger-900 placeholder:text-ledger-400 focus:border-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-100"
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="grid gap-2 sm:grid-cols-2">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-ledger-200 bg-white px-4 py-3 text-sm font-semibold text-ledger-700 transition hover:bg-ledger-50"
                  >
                    <ExternalLink size={16} /> GitHub
                  </a>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-ledger-200 bg-white px-4 py-3 text-sm font-semibold text-ledger-700 transition hover:bg-ledger-50"
                  >
                    <Download size={16} /> Download PDF
                  </button>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => handleReview(STATUS.APPROVED)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-success-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-success-600"
                  >
                    <CheckCircle2 size={16} /> Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReview(STATUS.CHANGES)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold-500 px-4 py-3 text-sm font-semibold text-ledger-950 transition hover:bg-gold-400"
                  >
                    <RotateCcw size={16} /> Request Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReview(STATUS.REJECTED)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-danger-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-danger-600"
                  >
                    <XCircle size={16} /> Reject
                  </button>
                </div>
              </div>
            </div>
          )
        }
      />
    </div>
  )
}
