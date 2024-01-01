import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '/images/logo.webp';

const Navbar = () => {
  const { activeNav, setActiveNav } = useAuth();
  const [isUser, setIsUser] = useState(null);
  const [activeProfile, setActiveProfile] = useState(false);

  useEffect(() => {
    const userExists = JSON.parse(localStorage.getItem('userInfo'));

    setIsUser(userExists);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setIsUser(null);
  };

  return (
    <>
      <div className="min-h-20 flex justify-center items-center py-4">
        <img src={logo} alt="Logo" className="h-16 object-cover" />
      </div>

      <div className="bg-primary text-white font-primary w-full">
        <div className="container mx-auto px-4">
          <div className="flex justify-end items-center">
            <div className="flex items-center">
              {!isUser ? (
                <>
                  <Link
                    to="/"
                    className={`uppercase hover:bg-black hover:bg-opacity-15 py-4 px-5 duration-500 cursor-pointer ${
                      activeNav === 'login' && 'bg-black bg-opacity-15'
                    }`}
                    onClick={() => {
                      setActiveNav('/');
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`uppercase hover:bg-black hover:bg-opacity-15 py-4 px-5 duration-500 cursor-pointer ${
                      activeNav === 'register' && 'bg-black bg-opacity-15'
                    }`}
                    onClick={() => {
                      setActiveNav('register');
                    }}
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div
                  className="relative bg-gray-100 rounded-full cursor-pointer"
                  onClick={() => setActiveProfile((prev) => !prev)}
                >
                  <img
                    src={isUser?.pic}
                    alt=""
                    className="w-11 h-11 rounded-full"
                  />
                  {activeProfile && (
                    <div className="absolute bg-white text-black top-full right-0 rounded-md z-[100] pt-4 shadow">
                      <Link
                        to={`/dashboard`}
                        className="uppercase hover:bg-black hover:bg-opacity-15 py-4 px-5 duration-500 font-bold cursor-pointer"
                      >
                        Dashboard
                      </Link>
                      <h4
                        className="uppercase hover:bg-black hover:bg-opacity-15 py-4 px-5 duration-500 font-bold cursor-pointer"
                        onClick={logoutHandler}
                      >
                        Logout
                      </h4>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
