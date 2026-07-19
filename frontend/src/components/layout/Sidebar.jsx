import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FilePlus2,
  FolderKanban,
  Search,
  Bell,
  ClipboardCheck,
  ShieldAlert,
  BarChart3,
  MessageCircle,
  X,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { currentStudent, currentFaculty, currentAdmin } from '../../data/mockData'

const studentLinks = [
  { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/student/submit', label: 'Submit Project', icon: FilePlus2 },
  { to: '/student/my-projects', label: 'My Projects', icon: FolderKanban },
  { to: '/student/browse', label: 'Browse Projects', icon: Search },
  { to: '/student/marketplace', label: 'Marketplace', icon: Search },
  { to: '/student/notifications', label: 'Notifications', icon: Bell },
]

const facultyLinks = [
  { to: '/faculty/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/faculty/review', label: 'Review Projects', icon: ClipboardCheck },
  { to: '/faculty/plagiarism', label: 'Plagiarism Check', icon: ShieldAlert },
  { to: '/faculty/feedback', label: 'Feedback', icon: MessageCircle },
  { to: '/faculty/analytics', label: 'Analytics', icon: BarChart3 },
]

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
]

export default function Sidebar() {
  const {
    role,
    sidebarOpen,
    setSidebarOpen,
    sidebarCollapsed,
    toggleSidebarCollapsed,
    logout,
    unreadCount,
  } = useApp()
  const user = role === 'student' ? currentStudent : role === 'faculty' ? currentFaculty : currentAdmin
  const links = role === 'student' ? studentLinks : role === 'faculty' ? facultyLinks : adminLinks
  const desktopCollapsed = sidebarCollapsed && !sidebarOpen

  const content = (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className={`flex items-center gap-3 ${desktopCollapsed ? 'justify-center' : ''} px-4 py-5`}>
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gold-500 text-white shadow-xl">
            <GraduationCap size={22} />
          </div>
          <div className={`min-w-0 overflow-hidden ${desktopCollapsed ? 'hidden' : 'block'}`}>
            <p className="text-lg font-semibold text-ledger-950">CampusRepo</p>
            <p className="text-xs uppercase tracking-[0.32em] text-ledger-400">University portal</p>
          </div>
          <button
            type="button"
            onClick={toggleSidebarCollapsed}
            className="ml-auto hidden rounded-full border border-ledger-200 bg-white/90 p-2 text-ledger-600 shadow-sm transition hover:bg-ledger-100 hover:text-ledger-950 lg:inline-flex"
            aria-label="Toggle sidebar"
          >
            {desktopCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button
            type="button"
            className="ml-auto rounded-2xl p-2 text-ledger-500 transition hover:bg-ledger-100 hover:text-ledger-900 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-2 pb-6">
          <p
            className={`px-3 pt-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-ledger-500 ${
              desktopCollapsed ? 'hidden' : ''
            }`}
          >
            {role === 'student' ? 'Student workspace' : role === 'faculty' ? 'Faculty workspace' : 'Admin workspace'}
          </p>

          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-3xl transition duration-200 ${
                  desktopCollapsed ? 'justify-center px-0 py-4' : 'px-4 py-3 '
                } ${
                  isActive
                    ? 'bg-ledger-900 text-white shadow-lg'
                    : 'text-ledger-700 hover:bg-ledger-100 hover:text-ledger-950'
                }`
              }
            >
              <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.2 }} className="flex items-center gap-3">
                <Icon size={18} strokeWidth={2.2} />
                {!desktopCollapsed && <span>{label}</span>}
              </motion.span>
              {!desktopCollapsed && label === 'Notifications' && unreadCount > 0 && (
                <span className="rounded-full bg-gold-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                  {unreadCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className={`border-t border-ledger-100 px-4 py-5 ${desktopCollapsed ? 'items-center' : ''}`}>
        <div className={`flex items-center gap-3 ${desktopCollapsed ? 'justify-center' : ''}`}>
          <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-ledger-900 text-white">
            {user.avatar}
          </div>
          {!desktopCollapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ledger-950">{user.name}</p>
              <p className="truncate text-xs text-ledger-500">{user.email}</p>
            </div>
          )}
        </div>

        {!desktopCollapsed ? (
          <div className="mt-4 space-y-2">
            <div className="rounded-[1.75rem] bg-ledger-50 p-4 text-sm text-ledger-600 ring-1 ring-ledger-100">
              <p className="font-semibold text-ledger-900">Stay informed</p>
              <p className="mt-1 text-xs text-ledger-500">You have {unreadCount} unread notifications.</p>
            </div>
            <motion.button
              type="button"
              onClick={logout}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-3xl border border-ledger-200 bg-white px-4 py-3 text-sm font-semibold text-danger-600 transition hover:bg-danger-50"
            >
              <LogOut size={16} /> Logout
            </motion.button>
          </div>
        ) : (
          <motion.button
            type="button"
            onClick={logout}
            whileTap={{ scale: 0.98 }}
            className="mt-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-ledger-200 bg-white text-danger-600 transition hover:bg-danger-50"
            aria-label="Logout"
          >
            <LogOut size={18} />
          </motion.button>
        )}
      </div>
    </div>
  )

  return (
    <>
      <motion.aside
        className={`fixed inset-y-0 left-0 z-40 hidden overflow-hidden border-r border-ledger-100 bg-white/95 shadow-xl backdrop-blur-sm transition-all duration-300 lg:flex ${
          desktopCollapsed ? 'w-20' : 'w-72'
        }`}
        animate={{ width: desktopCollapsed ? 80 : 288 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {content}
      </motion.aside>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div className="fixed inset-0 z-40 lg:hidden">
            <motion.div
              className="absolute inset-0 bg-ledger-950/60 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              className="relative z-10 h-full w-72 bg-ledger-900"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              {content}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
