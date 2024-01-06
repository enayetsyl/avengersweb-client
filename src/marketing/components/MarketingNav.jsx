import {  useState } from 'react';
import logo from '/images/logo.webp';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { motion } from "framer-motion"


const MarketingNav = () => {
  const [activeProfile, setActiveProfile] = useState(false);
  const {user, logOut} = useAuth()
  const navigate = useNavigate()

  const logoutHandler = () => {
    logOut()
    navigate('/')
  };

  return (
    <>
      <div className="min-h-20 flex justify-center items-center py-4">
        <img src={logo} alt="Logo" className="h-16 object-cover" />
      </div>
  
      <div className="bg-primary text-white font-primary w-full py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className=''>
            {
              user?.role === "LeadCollector" ? (<Link to={'/marketing/lead-collector/add'}>
              <motion.button className='bg-black py-2 px-3 rounded-md font-bold '
                  initial={{scale: 1.1, y:'-50vh'}}
                  animate={{y: 0}}
                  whileHover={{scale:1.3}}
                  transition={{ type: 'spring', stiffness: 130, delay: 0.2}}
              >Add Lead</motion.button>
              </Link>) : ''
            }
          </div>
          <motion.div className="flex justify-end items-center"
          initial={{x:'40vw'}}
          animate={{x: 0}}
          transition={{type:'spring', stiffness: 100, delay:1.4}}
          >
              <h1 className='mr-2'>{user?.name}</h1>
            <motion.div className="relative bg-gray-100 rounded-full cursor-pointer"           
            >
              <img
                src="https://res.cloudinary.com/djlghivmg/image/upload/v1703938300/augm4ol82visdofnogbh.jpg"
                alt=""
                className="w-11 h-11 rounded-full"
                onClick={() => setActiveProfile((prev) => !prev)}
              />
              {activeProfile && (
                <div className="absolute bg-white text-black top-full right-0 rounded-md z-[100] pt-4 shadow">
                  <h4 className="uppercase hover:bg-black hover:bg-opacity-15 py-4 px-5 duration-500 font-bold cursor-pointer"
                  onClick={logoutHandler}
                  >
                    Logout
                  </h4>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default MarketingNav;
