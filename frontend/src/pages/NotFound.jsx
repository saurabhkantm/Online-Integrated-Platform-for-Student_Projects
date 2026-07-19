import { Link } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ledger-50 px-4 py-10">
      <div className="w-full max-w-2xl rounded-[2rem] border border-ledger-200 bg-white p-10 text-center shadow-ledger">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-warning-50 text-warning-600">
          <AlertTriangle size={28} />
        </div>
        <h1 className="text-4xl font-bold text-ledger-900">Page not found</h1>
        <p className="mt-3 text-sm text-ledger-500">
          The page you're looking for doesn't exist or has been moved. Use the dashboard navigation to continue.
        </p>
        <Link
          to="/student/dashboard"
          className="mt-8 inline-flex rounded-full bg-ledger-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-ledger/20 hover:bg-ledger-800"
        >
          Go to student dashboard
        </Link>
      </div>
    </div>
  )
}
