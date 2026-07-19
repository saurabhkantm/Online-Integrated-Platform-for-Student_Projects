import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Bell, Search, Sun, Moon, ChevronDown, LogOut } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { currentStudent, currentFaculty, currentAdmin } from '../../data/mockData'

export default function Navbar({ title }) {
  const { role, setRole, setSidebarOpen, unreadCount, logout: contextLogout } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const user = role === 'student' ? currentStudent : role === 'faculty' ? currentFaculty : currentAdmin

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains('dark'))
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const switchRole = (next) => {
    setRole(next)
    setMenuOpen(false)
    navigate(
      next === 'student'
        ? '/student/dashboard'
        : next === 'faculty'
        ? '/faculty/dashboard'
        : '/admin/dashboard',
    )
  }

  const handleLogout = () => {
    setMenuOpen(false)
    contextLogout()
    navigate('/student/dashboard')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 shadow-sm backdrop-blur-md transition duration-300 dark:border-slate-800/70 dark:bg-slate-950/85">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <button
          className="rounded-2xl p-2 text-ledger-600 transition hover:bg-ledger-100 hover:text-ledger-900 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.35em] text-ledger-500 dark:text-slate-400">Workspace</p>
          <h1 className="truncate text-lg font-semibold text-ledger-950 dark:text-white md:text-xl">{title}</h1>
        </div>

        <div className="relative flex-1">
          <div className="hidden items-center gap-3 rounded-3xl border border-slate-200 bg-ledger-50 px-4 py-2 text-sm text-ledger-500 shadow-sm transition focus-within:border-ledger-300 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-300 sm:flex">
            <Search size={18} className="text-ledger-500 dark:text-slate-400" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search projects, reports, or teams…"
              className="w-full bg-transparent text-sm text-ledger-900 outline-none placeholder:text-ledger-400 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
          </div>

          <button
            type="button"
            onClick={() => setMobileSearchOpen((open) => !open)}
            className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-ledger-600 transition hover:bg-ledger-50 dark:border-slate-700 dark:bg-slate-950/90 dark:text-slate-300 dark:hover:bg-slate-800 sm:hidden"
          >
            <Search size={16} /> Search
          </button>

          {mobileSearchOpen && (
            <div className="absolute inset-x-0 top-full z-20 mt-3 px-0 sm:hidden">
              <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-950/95">
                <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-ledger-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/90">
                  <Search size={18} className="text-ledger-500 dark:text-slate-400" />
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search projects, reports, or teams…"
                    className="w-full bg-transparent text-sm text-ledger-900 outline-none placeholder:text-ledger-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() =>
              navigate(
                role === 'student'
                  ? '/student/notifications'
                  : role === 'faculty'
                  ? '/faculty/dashboard'
                  : '/admin/dashboard',
              )
            }
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-slate-200 bg-white text-ledger-600 transition hover:border-ledger-300 hover:bg-ledger-50 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && role === 'student' && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-500 px-1.5 text-[10px] font-semibold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setDarkMode((mode) => !mode)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-slate-200 bg-white text-ledger-600 transition hover:border-ledger-300 hover:bg-ledger-50 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900/90"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ledger-900 text-sm font-semibold text-white">
                {user.avatar}
              </span>
              <div className="hidden min-w-0 flex-col truncate sm:flex">
                <span className="truncate text-sm font-semibold text-ledger-950 dark:text-white">{user.name}</span>
                <span className="truncate text-[11px] text-ledger-500 dark:text-slate-400">
                  {role === 'student' ? 'Student' : user.designation}
                </span>
              </div>
              <ChevronDown size={16} className={`hidden text-ledger-400 transition sm:block ${menuOpen ? 'rotate-180' : ''}`} />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 z-20 mt-3 w-64 overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-lg dark:border-slate-700 dark:bg-slate-950">
                  <div className="px-4 py-4">
                    <p className="text-sm font-semibold text-ledger-950 dark:text-white">{user.name}</p>
                    <p className="truncate text-xs text-ledger-500 dark:text-slate-400">{user.email}</p>
                  </div>
                  <div className="border-t border-slate-100/80 dark:border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => setMenuOpen(false)}
                      className="block w-full px-4 py-3 text-left text-sm text-ledger-600 hover:bg-ledger-50 dark:text-slate-300 dark:hover:bg-slate-900"
                    >
                      Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => setMenuOpen(false)}
                      className="block w-full px-4 py-3 text-left text-sm text-ledger-600 hover:bg-ledger-50 dark:text-slate-300 dark:hover:bg-slate-900"
                    >
                      Settings
                    </button>
                    <button
                      type="button"
                      onClick={() => switchRole('student')}
                      className="block w-full px-4 py-3 text-left text-sm text-ledger-600 hover:bg-ledger-50 dark:text-slate-300 dark:hover:bg-slate-900"
                    >
                      Switch to student workspace
                    </button>
                    <button
                      type="button"
                      onClick={() => switchRole('faculty')}
                      className="block w-full px-4 py-3 text-left text-sm text-ledger-600 hover:bg-ledger-50 dark:text-slate-300 dark:hover:bg-slate-900"
                    >
                      Switch to faculty workspace
                    </button>
                    <button
                      type="button"
                      onClick={() => switchRole('admin')}
                      className="block w-full px-4 py-3 text-left text-sm text-ledger-600 hover:bg-ledger-50 dark:text-slate-300 dark:hover:bg-slate-900"
                    >
                      Switch to admin workspace
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-b-3xl bg-danger-50 px-4 py-3 text-sm font-semibold text-danger-600 transition hover:bg-danger-100"
                  >
                    <LogOut size={16} /> Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
