import { createContext, useEffect, useState } from 'react';
import Loader from '../components/common/Loader';

export const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [activeNav, setActiveNav] = useState('home');
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const logOut = () => {
    sessionStorage.removeItem('userInfo');
    setUser(null);
  }
  
  useEffect(() => {
    const userExists = JSON.parse(sessionStorage.getItem('userInfo'));
    setUser(userExists);
    setLoading(false)
  },[])
  
  // useEffect(()=> {
  //   if(!user){
  //     localStorage.removeItem('token')
  //   }
  // },[user])


  if(loading){
    return <Loader/>
  }





 
  const authInfo = {
    activeNav,
    setActiveNav,
    user, 
    setUser,
    loading, setLoading,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
