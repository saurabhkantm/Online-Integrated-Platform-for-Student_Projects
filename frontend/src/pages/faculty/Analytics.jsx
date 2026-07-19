import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts'
import { analyticsData } from '../../services/mockApi'
import StatCard from '../../components/common/StatCard'

const stats = [
  { label: 'Total Submissions', value: 3124, accent: 'ledger' },
  { label: 'Awaiting Review', value: 142, accent: 'warning' },
  { label: 'Approved', value: 2485, accent: 'success' },
  { label: 'Rejected', value: 497, accent: 'danger' },
]

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-8 shadow-ledger ring-1 ring-ledger-100">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Faculty analytics</p>
            <h1 className="mt-3 text-4xl font-semibold text-ledger-950">Project performance insights</h1>
            <p className="mt-3 text-sm leading-7 text-ledger-600">Data-powered insights for academic review and course planning.</p>
          </div>
          <div className="rounded-[2rem] bg-ledger-50 px-5 py-4 text-sm text-ledger-600 ring-1 ring-ledger-100">
            Built with university-scale data in mind
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {stats.map((metric) => (
          <StatCard key={metric.label} label={metric.label} value={metric.value} accent={metric.accent} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100 xl:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Approval trends</p>
              <h2 className="mt-2 text-2xl font-semibold text-ledger-950">Monthly review flow</h2>
            </div>
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
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Technology distribution</p>
            <h2 className="mt-2 text-2xl font-semibold text-ledger-950">Most used tools</h2>
          </div>
          <div className="mt-6 h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={analyticsData.technologyUsage} dataKey="value" nameKey="name" innerRadius={50} outerRadius={100} paddingAngle={4}>
                  {analyticsData.technologyUsage.map((entry, index) => (
                    <Cell key={entry.name} fill={['#4338ca', '#0ea5e9', '#22c55e', '#8b5cf6', '#f59e0b'][index]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  )
}
