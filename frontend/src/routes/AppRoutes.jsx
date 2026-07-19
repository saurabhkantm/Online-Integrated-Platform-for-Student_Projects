import React from 'react'
import {Routes,Route} from 'react-router-dom'
import BrowseProjects from '../pages/browse/BrowseProjects'
import ProjectDetailsPage from '../pages/browse/ProjectDetailsPage'
import PeerLearning from '../pages/browse/PeerLearning'
import StudentLogin from '../pages/auth/StudentLogin'
import FacultyLogin from '../pages/auth/FacultyLogin'
import AdminLogin from '../pages/auth/AdminLogin'
import NotFound from '../pages/shared/NotFound'
import Unauthorized from '../pages/shared/Unauthorized'
import ProtectedRoute from '../pages/auth/ProtectedRoute'
import StudentRoutes from './StudentRoutes'
import FacultyRoutes from './FacultyRoutes'
import AdminRoute from './AdminRoute'

const AppRoutes = () => {
  return (
    <Routes>
        {/* public browse routes */}
        <Route path="/" element={<BrowseProjects/>} />
        <Route path="/projects/:id" element={<ProjectDetailsPage/>}/>
        <Route path="/peer-learning" element={<PeerLearning/>}/>

        {/* auth routes */}
        <Route path="/login/student" element={<StudentLogin/>}/>
        <Route path="/login/faculty" element={<FacultyLogin/>}/>
        <Route path="/login/admin" element={<AdminLogin/>}/>

        {/* shared */}
        <Route path="*" element={<NotFound/>} />
        <Route path="/unauthorized" element={<Unauthorized />}/>

        {/* role protected route groups */}
        <Route element={<ProtectedRoute allowedRoles={['student']}/>}>
            <Route path="/student/*" element={<StudentRoutes/>}/>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['faculty']}/>}>
            <Route path="/student/*" element={<FacultyRoutes/>}/>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']}/>}>
            <Route path="/student/*" element={<AdminRoute/>}/>
        </Route>

    </Routes>
  )
}

export default AppRoutes