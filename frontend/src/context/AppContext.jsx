import { createContext, useContext, useState } from 'react'
import { notifications as mockNotifications, projects as mockProjects, STATUS, currentStudent } from '../data/mockData'

const AppContext = createContext(null)

let nextId = 1055
let nextToastId = 1

export function AppProvider({ children }) {
  const [role, setRole] = useState('student') // 'student' | 'faculty'
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [notifs, setNotifs] = useState(mockNotifications)
  const [projects, setProjects] = useState(mockProjects)
  const [toasts, setToasts] = useState([])

  const toggleSidebarCollapsed = () => setSidebarCollapsed((prev) => !prev)
  const logout = () => {
    setSidebarOpen(false)
    setSidebarCollapsed(false)
    setRole('student')
  }

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))
  const markRead = (id) => setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))

  const addToast = ({ title, message, type = 'info', duration = 4500 }) => {
    const id = `TOAST-${nextToastId++}`
    const toast = { id, title, message, type }
    setToasts((prev) => [toast, ...prev])
    window.setTimeout(() => setToasts((prev) => prev.filter((item) => item.id !== id)), duration)
  }
  const dismissToast = (id) => setToasts((prev) => prev.filter((item) => item.id !== id))

  const addProject = (data) => {
    const id = `PRJ-${nextId++}`
    const today = new Date().toISOString().slice(0, 10)
    const newProject = {
      id,
      status: STATUS.PENDING,
      submittedBy: currentStudent.name,
      submittedDate: today,
      reviewedDate: null,
      college: currentStudent.college,
      department: currentStudent.department,
      year: currentStudent.year,
      plagiarismScore: Math.floor(Math.random() * 30) + 2,
      flagged: false,
      feedback: [],
      ...data,
    }
    setProjects((prev) => [newProject, ...prev])
    setNotifs((prev) => [
      {
        id: `NTF-${Date.now()}`,
        title: 'Project Submitted',
        message: `"${newProject.title}" was submitted successfully and is awaiting faculty review.`,
        date: today,
        type: 'info',
        read: false,
      },
      ...prev,
    ])
    addToast({
      title: 'Submission received',
      message: `Your project "${newProject.title}" is in the review queue.`,
      type: 'success',
    })
    return newProject
  }

  const reviewProject = (id, { status, comment, by }) => {
    const today = new Date().toISOString().slice(0, 10)
    let reviewedTitle = ''
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p
        reviewedTitle = p.title
        return {
          ...p,
          status,
          reviewedDate: today,
          feedback: [
            ...p.feedback,
            {
              by,
              date: today,
              type: status === STATUS.APPROVED ? 'approval' : status === STATUS.REJECTED ? 'rejection' : 'changes',
              comment,
            },
          ],
        }
      })
    )
    setNotifs((prev) => [
      {
        id: `NTF-${Date.now()}`,
        title:
          status === STATUS.APPROVED ? 'Project Approved' : status === STATUS.REJECTED ? 'Project Rejected' : 'Changes Requested',
        message: `"${reviewedTitle}" — ${comment}`,
        date: today,
        type: status === STATUS.APPROVED ? 'success' : status === STATUS.REJECTED ? 'danger' : 'warning',
        read: false,
      },
      ...prev,
    ])
    addToast({
      title: status === STATUS.APPROVED ? 'Approved' : status === STATUS.REJECTED ? 'Rejected' : 'Changes requested',
      message: `"${reviewedTitle}" has been updated.`,
      type: status === STATUS.APPROVED ? 'success' : status === STATUS.REJECTED ? 'danger' : 'warning',
    })
  }

  const value = {
    role,
    setRole,
    sidebarOpen,
    setSidebarOpen,
    sidebarCollapsed,
    setSidebarCollapsed,
    toggleSidebarCollapsed,
    logout,
    notifs,
    markAllRead,
    markRead,
    unreadCount: notifs.filter((n) => !n.read).length,
    projects,
    addProject,
    reviewProject,
    toasts,
    dismissToast,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
