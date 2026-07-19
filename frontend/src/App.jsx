import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import DashboardLayout from './components/layout/DashboardLayout'
import ErrorBoundary from './components/common/ErrorBoundary'
import LoadingFallback from './components/common/LoadingFallback'

const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard'))
const SubmitProject = lazy(() => import('./pages/student/SubmitProject'))
const MyProjects = lazy(() => import('./pages/student/MyProjects'))
const BrowseProjects = lazy(() => import('./pages/student/BrowseProjects'))
const Marketplace = lazy(() => import('./pages/student/Marketplace'))
const Notifications = lazy(() => import('./pages/student/Notifications'))
const FacultyDashboard = lazy(() => import('./pages/faculty/FacultyDashboard'))
const ReviewProjects = lazy(() => import('./pages/faculty/ReviewProjects'))
const Plagiarism = lazy(() => import('./pages/faculty/Plagiarism'))
const Feedback = lazy(() => import('./pages/faculty/Feedback'))
const Analytics = lazy(() => import('./pages/faculty/Analytics'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const NotFound = lazy(() => import('./pages/NotFound'))
const RouteError = lazy(() => import('./pages/RouteError'))

export default function App() {
  return (
    <AppProvider>
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<DashboardLayout />} errorElement={<RouteError />}>
              <Route index element={<Navigate to="student/dashboard" replace />} />

              <Route path="student">
                <Route
                  path="dashboard"
                  element={<StudentDashboard />}
                  handle={{ title: 'Student Dashboard' }}
                />
                <Route
                  path="submit"
                  element={<SubmitProject />}
                  handle={{ title: 'Submit Project' }}
                />
                <Route
                  path="my-projects"
                  element={<MyProjects />}
                  handle={{ title: 'My Projects' }}
                />
                <Route
                  path="browse"
                  element={<BrowseProjects />}
                  handle={{ title: 'Browse Projects' }}
                />
                <Route
                  path="marketplace"
                  element={<Marketplace />}
                  handle={{ title: 'Marketplace' }}
                />
                <Route
                  path="notifications"
                  element={<Notifications />}
                  handle={{ title: 'Notifications' }}
                />
              </Route>

              <Route path="faculty">
                <Route
                  path="dashboard"
                  element={<FacultyDashboard />}
                  handle={{ title: 'Faculty Dashboard' }}
                />
                <Route
                  path="review"
                  element={<ReviewProjects />}
                  handle={{ title: 'Review Projects' }}
                />
                <Route
                  path="plagiarism"
                  element={<Plagiarism />}
                  handle={{ title: 'Plagiarism Detection' }}
                />
                <Route
                  path="feedback"
                  element={<Feedback />}
                  handle={{ title: 'Feedback' }}
                />
                <Route
                  path="analytics"
                  element={<Analytics />}
                  handle={{ title: 'Analytics' }}
                />
              </Route>

              <Route path="admin">
                <Route
                  path="dashboard"
                  element={<AdminDashboard />}
                  handle={{ title: 'Admin Dashboard' }}
                />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </AppProvider>
  )
}
