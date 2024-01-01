import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('userInfo'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);
  console.log(user);
  if (user && user?.role === 'pending') {
    return <Navigate state={location.pathname} to={'/'} replace></Navigate>;
  }

  if (user && user?.role !== 'pending') {
    return children;
  }
  return <Navigate state={location.pathname} to={'/login'} replace></Navigate>;
};

export default PrivateRoute;
