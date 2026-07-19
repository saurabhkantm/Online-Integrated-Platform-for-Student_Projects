import React from 'react'
import { Route, Routes } from 'react-router-dom'
import dashBoard from '../pages/admin/dashBoard'
import Users from '../pages/admin/Users'
import colleges from '../pages/admin/colleges'
import Reports from '../pages/admin/Reports'

const AdminRoute = () => {
  <Routes>
    <Route path='dashboard' element={<dashBoard/>}/>
    <Route path='users' element={<Users/>}/>
    <Route path='colleges' element={<colleges/>}/>
    <Route path='reports' element={<Reports/>}/>
  </Routes>
}

export default AdminRoute