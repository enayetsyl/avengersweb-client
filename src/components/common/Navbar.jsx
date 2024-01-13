import {  useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '/images/logo.webp';
import { Box } from '@chakra-ui/react';
import { motion } from "framer-motion"

const Navbar = () => {
  const { activeNav, setActiveNav, user, logOut, loading } = useAuth();
  
  const [activeProfile, setActiveProfile] = useState(false);
 
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  const logoutHandler = () => {
    logOut()
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
              {!user ? (
                <>
                  <Link
                    to="/"
                    className={`${
                      activeNav === 'login' && 'bg-black bg-opacity-15'
                    }`}
                    onClick={() => {
                      setActiveNav('/');
                    }}
                  >
                    <Box
                    as='button'
                    px='20px'
                    py='16px'
                    transition='background 0.5s, opacity 0.5s'
                    cursor='pointer'
                    textTransform='uppercase'
                    _hover={{bg:'black', opacity:'0.15'}}
                    >Login</Box>
                    
                  </Link>
                  <Link
                    to="/register"
                    className={`${
                      activeNav === 'register' && 'bg-black bg-opacity-15'
                    }`}
                    onClick={() => {
                      setActiveNav('register');
                    }}
                  >
                    <Box
                    as='button'
                    px='20px'
                    py='16px'
                    transition='background 0.5s, opacity 0.5s'
                    cursor='pointer'
                    textTransform='uppercase'
                    _hover={{bg:'black', opacity:'0.15'}}
                    >Register</Box>
                    
                  </Link>
                  <Link  to="/about"
                    className={` ${
                      activeNav === 'about' && 'bg-black bg-opacity-15'
                    }`}
                    onClick={() => {
                      setActiveNav('about');
                    }}>
                   <motion.div
                   initial={{scale:0.8, color:'white'}}
                   animate={{
                    scale:1.2,
                    color:'black',
                    transition:{
                      duration: 2,
                      repeat: Infinity,
                    }
                   }}
                   >
                   <Box
                    as='button'
                    px='20px'
                    py='16px'
                    transition='background 0.5s, opacity 0.5s'
                    cursor='pointer'
                    textTransform='uppercase'
                    _hover={{bg:'black', opacity:'0.15'}}
                    >About</Box>
                   </motion.div>
                      </Link>
                </>
              ) : (
                <div
                  className="relative bg-gray-100 rounded-full cursor-pointer"
                  onClick={() => setActiveProfile((prev) => !prev)}
                >
                  {/* <img
                    src={isUser?.pic}
                    alt=""
                    className="w-11 h-11 rounded-full"
                  /> */}
                  <h1 className='text-black p-2'>{user.name}</h1>

                  {activeProfile && (
                    <div className="absolute bg-white text-black top-full right-0 rounded-md z-[100] pt-4 shadow">
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
