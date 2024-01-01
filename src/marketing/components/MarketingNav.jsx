import { useState } from 'react';
import logo from '/images/logo.webp';

const MarketingNav = () => {
  const [activeProfile, setActiveProfile] = useState(false);
  return (
    <>
      <div className="min-h-20 flex justify-center items-center py-4">
        <img src={logo} alt="Logo" className="h-16 object-cover" />
      </div>

      <div className="bg-primary text-white font-primary w-full py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-end items-center">
            <div className="relative bg-gray-100 rounded-full cursor-pointer">
              <img
                src="https://res.cloudinary.com/djlghivmg/image/upload/v1703938300/augm4ol82visdofnogbh.jpg"
                alt=""
                className="w-11 h-11 rounded-full"
                onClick={() => setActiveProfile((prev) => !prev)}
              />
              {activeProfile && (
                <div className="absolute bg-white text-black top-full right-0 rounded-md z-[100] pt-4 shadow">
                  <h4 className="uppercase hover:bg-black hover:bg-opacity-15 py-4 px-5 duration-500 font-bold cursor-pointer">
                    Logout
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketingNav;
