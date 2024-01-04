import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const {user, loading} = useContext(AuthContext)
 

  if(loading){
    return <p>Loading.......</p>
  }
  const userRoles = user && user.role ? [user.role] : []
  console.log(userRoles)
  return (
   userRoles?.find((role) => allowedRoles?.includes(role))
    ? <>{children}</>
    :
    <Navigate to={'/'} state={{from: location}} replace/>
    
  )

};

export default PrivateRoute;
