import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import ToastContainer from '../common/Toast'

const routeTitles = {
  '/student/dashboard': 'Student Dashboard',
  '/student/submit': 'Submit Project',
  '/student/my-projects': 'My Projects',
  '/student/browse': 'Browse Projects',
  '/student/marketplace': 'Marketplace',
  '/student/notifications': 'Notifications',
  '/faculty/dashboard': 'Faculty Dashboard',
  '/faculty/review': 'Review Projects',
  '/faculty/plagiarism': 'Plagiarism Detection',
  '/faculty/feedback': 'Feedback',
  '/faculty/analytics': 'Analytics',
  '/admin/dashboard': 'Admin Dashboard',
}

export default function DashboardLayout() {
  const { sidebarCollapsed, toasts, dismissToast } = useApp()
  const location = useLocation()
  const title = routeTitles[location.pathname] || 'Dashboard'
  const contentPadding = sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'

  return (
    <div className={`flex min-h-screen overflow-hidden bg-ledger-50 text-slate-900 ${contentPadding}`}>
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar title={title} />
        <main className="relative flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <ToastContainer toasts={toasts} onDismiss={dismissToast} />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="mx-auto w-full max-w-7xl"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
