import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const {user, loading} = useAuth()
 

  if(loading){
    return <p>Loading.......</p>
  }
  const userRoles = user && user.role ? [user.role] : []
  return (
   userRoles?.find((role) => allowedRoles?.includes(role))
    ? <>{children}</>
    :
    <Navigate to={'/'} state={{from: location}} replace/>
    
  )

};

export default PrivateRoute;
