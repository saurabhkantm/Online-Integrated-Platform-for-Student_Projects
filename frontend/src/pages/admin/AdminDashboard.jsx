import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import StatCard from '../../components/common/StatCard'
import { analyticsData } from '../../services/mockApi'

const stats = [
  { label: 'Total Universities', value: 58, accent: 'ledger' },
  { label: 'Total Students', value: 12540, accent: 'gold' },
  { label: 'Total Faculty', value: 860, accent: 'success' },
  { label: 'Total Projects', value: 3124, accent: 'warning' },
]

export default function AdminDashboard() {
  const approvals = useMemo(() => analyticsData.approvalTrends.reduce((sum, item) => sum + item.approved, 0), [])
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-8 shadow-ledger ring-1 ring-ledger-100">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Admin dashboard</p>
            <h1 className="mt-3 text-4xl font-semibold text-ledger-950">University platform oversight</h1>
            <p className="mt-3 text-sm leading-7 text-ledger-600">Monitor colleges, users, and project performance across the network.</p>
          </div>
          <div className="rounded-[2rem] bg-ledger-50 px-5 py-4 text-sm text-ledger-600 ring-1 ring-ledger-100">
            <span className="font-semibold">Executive summary</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} accent={stat.accent} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100 xl:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Approval trends</p>
              <h2 className="mt-2 text-2xl font-semibold text-ledger-950">Review velocity</h2>
            </div>
            <p className="text-sm text-ledger-500">Last 6 months</p>
          </div>
          <div className="mt-6 h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.approvalTrends} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }} />
                <Bar dataKey="approved" fill="#4338ca" radius={[14, 14, 0, 0]} />
                <Bar dataKey="pending" fill="#0ea5e9" radius={[14, 14, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Department mix</p>
            <h2 className="mt-2 text-2xl font-semibold text-ledger-950">Project distribution</h2>
          </div>
          <div className="mt-6 h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={analyticsData.departmentDistribution} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={4}>
                  {analyticsData.departmentDistribution.map((entry, index) => (
                    <Cell key={entry.name} fill={['#4338ca', '#0ea5e9', '#22c55e', '#eab308'][index]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Total approvals</p>
          <p className="mt-4 text-4xl font-semibold text-ledger-950">{approvals}</p>
          <p className="mt-3 text-sm text-ledger-500">Projects approved across the platform this year.</p>
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Universities managed</p>
          <p className="mt-4 text-4xl font-semibold text-ledger-950">58</p>
          <p className="mt-3 text-sm text-ledger-500">Active partner institutions across India.</p>
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Student growth</p>
          <p className="mt-4 text-4xl font-semibold text-ledger-950">+18%</p>
          <p className="mt-3 text-sm text-ledger-500">Quarterly student engagement increase.</p>
        </div>
      </section>
    </div>
  )
}
