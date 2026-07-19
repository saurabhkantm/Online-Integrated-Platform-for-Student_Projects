import { Navigate } from 'react-router-dom'
import DashboardLayout from '../components/layout/DashboardLayout'
import StudentDashboard from '../pages/student/StudentDashboard'
import SubmitProject from '../pages/student/SubmitProject'
import MyProjects from '../pages/student/MyProjects'
import Marketplace from '../pages/student/Marketplace'
import Notifications from '../pages/student/Notifications'
import FacultyDashboard from '../pages/faculty/FacultyDashboard'
import ReviewProjects from '../pages/faculty/ReviewProjects'
import Plagiarism from '../pages/faculty/Plagiarism'
import Feedback from '../pages/faculty/Feedback'
import Analytics from '../pages/faculty/Analytics'
import AdminDashboard from '../pages/admin/AdminDashboard'
import NotFound from '../pages/NotFound'

export const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <Navigate to="/student/dashboard" replace /> },
      { path: 'student/dashboard', element: <StudentDashboard /> },
      { path: 'student/submit-project', element: <SubmitProject /> },
      { path: 'student/projects', element: <MyProjects /> },
      { path: 'student/marketplace', element: <Marketplace /> },
      { path: 'student/notifications', element: <Notifications /> },
      { path: 'faculty/dashboard', element: <FacultyDashboard /> },
      { path: 'faculty/reviews', element: <ReviewProjects /> },
      { path: 'faculty/plagiarism', element: <Plagiarism /> },
      { path: 'faculty/feedback', element: <Feedback /> },
      { path: 'faculty/analytics', element: <Analytics /> },
      { path: 'admin/dashboard', element: <AdminDashboard /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
