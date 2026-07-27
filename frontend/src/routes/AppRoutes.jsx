import React from 'react'
import { Routes, Route } from 'react-router-dom'
import BrowseProjects from '../pages/browse/BrowseProjects'
import ProjectDetailsPage from '../pages/browse/ProjectDetailsPage'
import PeerLearning from '../pages/browse/PeerLearning'
import NotFound from '../pages/shared/NotFound'
import Unauthorized from '../pages/shared/Unauthorized'
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import StudentRoutes from './StudentRoutes'
import FacultyRoutes from './FacultyRoutes'
import AdminRoutes from './AdminRoute'
import Register from '../pages/auth/Register'
import HomePage from '../pages/shared/Homepage'
import AboutUs from '../pages/shared/Aboutus'
import LoginForm from '../pages/auth/Login'

const AppRoutes = () => {
  return (
    <Routes>
      {/* public browse routes */}
      <Route path="/" element={<HomePage/>} />
      <Route path="/about" element={<AboutUs/>} />
      <Route path="/browse-project" element={<BrowseProjects />} />
      <Route path="/projects/:id" element={<ProjectDetailsPage />} />
      <Route path="/peer-learning" element={<PeerLearning />} />

      {/* auth routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LoginForm/>}/>

      {/* role protected route groups */}
      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        <Route path="/student/*" element={<StudentRoutes />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['faculty']} />}>
        <Route path="/faculty/*" element={<FacultyRoutes />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Route>

      {/* shared */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes