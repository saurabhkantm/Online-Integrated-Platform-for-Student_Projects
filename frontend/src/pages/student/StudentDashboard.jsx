import {
  FolderKanban,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  Bell,
  CalendarDays,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { currentStudent, STATUS } from '../../data/mockData'
import StatusBadge from '../../components/common/StatusBadge'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const statsConfig = [
  {
    label: 'Total Projects',
    valueKey: 'total',
    icon: FolderKanban,
    gradient: 'from-indigo-600 to-violet-600',
    trend: '+12%',
    trendLabel: 'vs last week',
  },
  {
    label: 'Approved',
    valueKey: 'approved',
    icon: CheckCircle2,
    gradient: 'from-emerald-500 to-teal-500',
    trend: '+18%',
    trendLabel: 'approval rate',
  },
  {
    label: 'Pending',
    valueKey: 'pending',
    icon: Clock,
    gradient: 'from-amber-500 to-orange-500',
    trend: '-3%',
    trendLabel: 'since yesterday',
  },
  {
    label: 'Rejected',
    valueKey: 'rejected',
    icon: XCircle,
    gradient: 'from-rose-500 to-pink-500',
    trend: '-8%',
    trendLabel: 'lower than last week',
  },
]

const upcomingDeadlines = [
  {
    title: 'Final capstone submission',
    due: '30 Jun 2026',
    status: 'Urgent',
    progress: 88,
    gradient: 'from-fuchsia-500 to-pink-500',
  },
  {
    title: 'Peer review completion',
    due: '27 Jun 2026',
    status: 'In progress',
    progress: 56,
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    title: 'Demo video upload',
    due: '24 Jun 2026',
    status: 'Almost due',
    progress: 72,
    gradient: 'from-amber-500 to-orange-500',
  },
]

const chartColors = ['#4f46e5', '#0ea5e9', '#7c3aed', '#14b8a6', '#f97316', '#ec4899']

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export default function StudentDashboard() {
  const { projects, notifs } = useApp()
  const mine = projects.filter((p) => p.submittedBy === currentStudent.name)

  const stats = {
    total: mine.length,
    approved: mine.filter((p) => p.status === STATUS.APPROVED).length,
    pending: mine.filter((p) => p.status === STATUS.PENDING).length,
    rejected: mine.filter((p) => p.status === STATUS.REJECTED).length,
  }

  const recent = [...mine]
    .sort((a, b) => new Date(b.submittedDate) - new Date(a.submittedDate))
    .slice(0, 5)

  const departmentCounts = projects.reduce((acc, project) => {
    acc[project.department] = (acc[project.department] || 0) + 1
    return acc
  }, {})

  const projectsByDepartment = Object.entries(departmentCounts)
    .map(([department, count]) => ({ department, count }))
    .sort((a, b) => b.count - a.count)

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const lastSixMonths = Array.from({ length: 6 }, (_, index) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (5 - index))
    return `${monthLabels[date.getMonth()]} ${date.getFullYear()}`
  })

  const monthlySubmissionTrend = lastSixMonths.map((label) => ({ month: label, count: 0 }))
  const monthlyIndex = Object.fromEntries(monthlySubmissionTrend.map((item, index) => [item.month, index]))

  projects.forEach((project) => {
    const date = new Date(project.submittedDate)
    const label = `${monthLabels[date.getMonth()]} ${date.getFullYear()}`
    if (label in monthlyIndex) {
      monthlySubmissionTrend[monthlyIndex[label]].count += 1
    }
  })

  const techCounts = projects.reduce((acc, project) => {
    project.techStack.forEach((tech) => {
      acc[tech] = (acc[tech] || 0) + 1
    })
    return acc
  }, {})

  const technologyDistribution = Object.entries(techCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6)

  const approvalData = [
    { status: STATUS.APPROVED, value: projects.filter((p) => p.status === STATUS.APPROVED).length },
    { status: STATUS.PENDING, value: projects.filter((p) => p.status === STATUS.PENDING).length },
    { status: STATUS.REJECTED, value: projects.filter((p) => p.status === STATUS.REJECTED).length },
  ]

  const totalReviewed = approvalData.reduce((sum, item) => sum + item.value, 0)
  const approvedRate = totalReviewed ? Math.round((approvalData[0].value / totalReviewed) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white/90 p-8 shadow-ledger ring-1 ring-ledger-100">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-ledger-500">Welcome back</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ledger-950 sm:text-5xl">
              Good afternoon, {currentStudent.name.split(' ')[0]}.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ledger-600">
              {formatDate(new Date().toISOString())} · {currentStudent.college} · {currentStudent.department}
            </p>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-ledger-900 to-indigo-700 p-6 text-white shadow-xl shadow-indigo-200/30 ring-1 ring-white/20">
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10 text-white">
                <Bell size={24} />
              </span>
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-indigo-100/80">Today</p>
                <p className="mt-2 text-3xl font-semibold">{recent.length} recent updates</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-indigo-100/80">
              Stay ahead of deadlines and track your approval pipeline with the latest project activity.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statsConfig.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
              className={`group overflow-hidden rounded-[2rem] bg-gradient-to-br ${item.gradient} p-6 shadow-ledger-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="rounded-3xl bg-white/15 p-3 text-white shadow-inner">
                  <Icon size={24} />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white/90">
                  <TrendingUp size={14} /> {item.trend}
                </span>
              </div>
              <div className="mt-8">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/80">{item.label}</p>
                <p className="mt-4 text-4xl font-semibold text-white">{stats[item.valueKey]}</p>
                <p className="mt-2 text-sm text-white/80">{item.trendLabel}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Projects by Department</p>
              <h2 className="mt-3 text-2xl font-semibold text-ledger-950">Department distribution</h2>
            </div>
            <p className="text-sm text-ledger-500">Current repository-wide insights</p>
          </div>

          <div className="mt-5 h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectsByDepartment} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8eaf6" vertical={false} />
                <XAxis
                  dataKey="department"
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 18, border: '1px solid #eef2ff', backgroundColor: '#ffffff' }} />
                <Bar dataKey="count" radius={[16, 16, 0, 0]} fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Monthly Submission Trend</p>
              <h2 className="mt-3 text-2xl font-semibold text-ledger-950">Submission momentum</h2>
            </div>
            <p className="text-sm text-ledger-500">Last 6 months</p>
          </div>

          <div className="mt-5 h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySubmissionTrend} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 18, border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }} />
                <Line type="monotone" dataKey="count" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: '#0ea5e9' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Technology Distribution</p>
              <h2 className="mt-3 text-2xl font-semibold text-ledger-950">Stack adoption</h2>
            </div>
            <p className="text-sm text-ledger-500">Top tools & frameworks</p>
          </div>

          <div className="mt-5 h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={technologyDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  innerRadius={55}
                  paddingAngle={4}
                >
                  {technologyDistribution.map((entry, index) => (
                    <Cell key={`slice-${entry.name}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 18, border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }} />
                <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ fontSize: 12, color: '#64748b' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Approval Rate</p>
              <h2 className="mt-3 text-2xl font-semibold text-ledger-950">Review performance</h2>
            </div>
            <div className="rounded-full bg-ledger-50 px-4 py-2 text-sm font-semibold text-ledger-600">{approvedRate}% approved</div>
          </div>

          <div className="mt-6 space-y-6">
            <div className="rounded-[1.75rem] border border-ledger-100 bg-ledger-50 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-ledger-950">Approval score</p>
                  <p className="mt-2 text-sm text-ledger-500">The percentage of projects accepted across the repository.</p>
                </div>
                <div className="text-3xl font-semibold text-emerald-600">{approvedRate}%</div>
              </div>
            </div>

            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={approvalData} margin={{ top: 0, right: 0, left: -10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef2ff" vertical={false} />
                  <XAxis dataKey="status" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 18, border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }} />
                  <Bar dataKey="value" radius={[16, 16, 0, 0]} fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Recent Activity</p>
              <h2 className="mt-3 text-2xl font-semibold text-ledger-950">Latest submissions</h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-ledger-50 px-4 py-2 text-sm font-semibold text-ledger-700">
              <CalendarDays size={16} /> {recent.length} items
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {recent.map((project) => (
              <div
                key={project.id}
                className="rounded-[1.75rem] border border-ledger-100 bg-ledger-50 p-4 transition hover:border-ledger-200 hover:bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-ledger-950">{project.title}</p>
                    <p className="mt-1 text-sm text-ledger-500">Submitted {project.submittedDate}</p>
                  </div>
                  <StatusBadge status={project.status} />
                </div>
                <p className="mt-3 text-sm leading-6 text-ledger-500 line-clamp-2">{project.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Notifications</p>
              <h2 className="mt-3 text-2xl font-semibold text-ledger-950">Recent alerts</h2>
            </div>
            <span className="rounded-full bg-gold-100 px-3 py-2 text-xs font-semibold text-gold-700">
              {notifs.filter((n) => !n.read).length} unread
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {notifs.slice(0, 4).map((notif) => (
              <div
                key={notif.id}
                className="rounded-[1.75rem] border border-ledger-100 bg-ledger-50 p-4 transition hover:border-ledger-200 hover:bg-white"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-ledger-950">{notif.title}</p>
                  <span className="text-xs text-ledger-400">{notif.date}</span>
                </div>
                <p className="mt-2 text-sm text-ledger-500">{notif.message}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Upcoming Deadlines</p>
              <h2 className="mt-3 text-2xl font-semibold text-ledger-950">Due soon</h2>
            </div>
            <span className="rounded-full bg-ledger-50 px-3 py-2 text-xs font-semibold text-ledger-600">
              Priority tasks
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div
                key={deadline.title}
                className="rounded-[1.75rem] border border-ledger-100 bg-ledger-50 p-4 transition hover:border-ledger-200 hover:bg-white"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ledger-950">{deadline.title}</p>
                    <p className="mt-1 text-sm text-ledger-500">Due {deadline.due}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ledger-700 shadow-sm ring-1 ring-ledger-100">
                    {deadline.status}
                  </span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-ledger-200">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${deadline.gradient}`}
                    style={{ width: `${deadline.progress}%` }}
                  />
                </div>
                <p className="mt-2 text-xs font-semibold text-ledger-500">{deadline.progress}% complete</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
