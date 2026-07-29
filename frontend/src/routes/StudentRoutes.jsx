import React from 'react'
import StudentDashboard from '../pages/student/StudentDashboard'
import SubmitProject from '../pages/student/SubmitProject'
import MyProjects from '../pages/student/MyProject.jsx'
import ProjectStatus from '../pages/student/ProjectStatus'
import { Routes,Route } from 'react-router-dom'
import EditProject from '../pages/student/EditProject.jsx'

const StudentRoutes = () => {
 return ( <Routes>
    <Route path="dashboard" element={<StudentDashboard/>}/>
    <Route path="submit" element={<SubmitProject/>}/>
    <Route path="my-project" element={<MyProjects />}/>
    <Route path="projects/:id/edit" element={<EditProject/>}/>
    <Route path="status" element={<ProjectStatus />}/>
  </Routes>
 )
}

export default StudentRoutes