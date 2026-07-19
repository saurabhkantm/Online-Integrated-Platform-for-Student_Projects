import React from 'react'
import Loader from '../../components/common/Loader';
import { Outlet } from 'react-router-dom';

const ProtectedRoute = ({allowedRoles}) => {
    const {user,role,loading} = useAuth();
    if(loading) return <Loader/>
    if(!user || !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace/>
    }
  return <Outlet />
}

export default ProtectedRoute