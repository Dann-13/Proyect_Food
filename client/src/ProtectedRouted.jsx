import React from 'react'
import { Navigate, Outlet} from 'react-router-dom';
import { useAuth } from './context/authContext'

function ProtectedRouted() {
    const {loading, isAuthenticated} = useAuth();
    console.log("esta autenticado?" , isAuthenticated)
    if(loading) return <h1>Loading....</h1>
    if(!loading && !isAuthenticated) return <Navigate to='/login' replace/>
  return <Outlet />
}

export default ProtectedRouted
