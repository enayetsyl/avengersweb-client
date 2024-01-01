import { createContext, useState } from 'react';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [activeNav, setActiveNav] = useState('home');

  const authInfo = {
    activeNav,
    setActiveNav,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
