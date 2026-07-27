import React from 'react'
import StudentDashboard from '../pages/student/StudentDashboard'
import SubmitProject from '../pages/student/SubmitProject'
import MyProject from '../pages/student/MyProject'
import ProjectStatus from '../pages/student/ProjectStatus'
import { Routes,Route } from 'react-router-dom'

const StudentRoutes = () => {
  <Routes>
    <Route path="dashboard" element={<StudentDashboard/>}/>
    <Route path="submit" element={<SubmitProject/>}/>
    <Route path="my-project" element={<MyProject />}/>
    <Route path="status" element={<ProjectStatus />}/>
  </Routes>
}

export default StudentRoutes