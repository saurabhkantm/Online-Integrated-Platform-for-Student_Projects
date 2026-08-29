import React from 'react'
import DashBoard from '../pages/faculty/DashBoard'
import Review from '../pages/faculty/Review'
import { Routes,Route } from 'react-router-dom'
import PlagiarismReport from '../pages/faculty/PlagiarismReport'

const FacultyRoutes = () => {
 return ( <Routes>
    <Route path="dashboard" element={<DashBoard/>}/>
    <Route path="review" element={<Review />}/>
    <Route path='plagiarism-report' element={<PlagiarismReport/>}/>
  </Routes>
 )
}

export default FacultyRoutes