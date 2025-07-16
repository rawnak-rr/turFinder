import React from 'react';
import '../index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/turfinderlogo.png'
import cal from '../assets/calendar.svg'
import profile from '../assets/profile.svg'
import menu from '../assets/menu.svg'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = () => {
    navigate('/');
    // Close menu if it's open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleMenuItemClick = (path) => {
    // For now, just console.log since pages don't exist yet
    console.log(`Navigating to: ${path}`);
    // navigate(path); // Uncomment when you create these pages
    setIsMenuOpen(false); // Close menu
  };

  return (
    <>
      <div className={`fixed top-0 left-0 w-full h-1/2 bg-darkgreen z-50 rounded-b-2xl transition-transform duration-300 ease-in-out ${
        isMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-full'
      }`}>
        <div className="flex h-full justify-center items-center px-8 sm:px-12 md:px-16 lg:px-20">
          
          {/* Two column layout */}
          <div className="flex flex-row w-full max-w-6xl justify-between">
            
            {/* Left Column */}
            <div className="flex-1">
              <ul className="space-y-4 sm:space-y-6">
                <li onClick={() => handleMenuItemClick('/book')} className="text-beige font-redhatmono text-lg sm:text-sm md:text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200">
                  book your turf
                </li>
                <li onClick={() => handleMenuItemClick('/games')} className="text-beige font-redhatmono text-lg sm:text-sm md:text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200">
                  looking for games
                </li>
                <li onClick={() => handleMenuItemClick('/rating')} className="text-beige font-redhatmono text-lg sm:text-sm md:text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200">
                  personal rating
                </li>
                <li onClick={() => handleMenuItemClick('/about')} className="text-beige font-redhatmono text-lg sm:text-sm md:text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200">
                  about us
                </li>
              </ul>
            </div>
            
            {/* Right Column */}
            <div className="flex-1 flex justify-end">
              <ul className="space-y-4 sm:space-y-6 text-right">
                <li onClick={() => window.open('https://instagram.com', '_blank')} className="text-beige font-redhatmono text-lg sm:text-sm md:text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200">
                  instagram
                </li>
                <li onClick={() => window.open('https://facebook.com', '_blank')} className="text-beige font-redhatmono text-lg sm:text-sm md:text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200">
                  facebook
                </li>
                <li onClick={() => window.open('mailto:contact@turfinder.com')} className="text-beige font-redhatmono text-lg sm:text-sm md:text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200">
                  mail
                </li>
              </ul>
            </div>
          </div>
          
          {/* Close Button */}
          <button 
            onClick={toggleMenu}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 text-beige hover:text-yellow cursor-pointer text-sm sm:text-xl font-redhatmono transition-colors duration-200"
          >
            close
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      <div className="flex relative z-30">
        <div className="flex bg-almostblack
                        mt-10
                        h-15 sm:h-17.5 lg:h-20
                        w-61 sm:w-71 lg:w-81
                        rounded-3xl sm:rounded-[30px] lg:rounded-[36px]">
          <img onClick={handleLogoClick} src={logo} alt="tflogo" className="h-100% ml-1 cursor-pointer hover:opacity-80 transition-opacity duration-200" />
          <div className="flex font-polysans bg-darkgreen h-100% justify-evenly items-center
                          w-45 sm:w-55 lg:w-65
                          rounded-3xl sm:rounded-[30px] lg:rounded-[36px]">
            <button onClick={toggleMenu} className="flex items-center justify-center rounded-full bg-almostblack cursor-pointer
                               font-polysans text-beige text-xs sm:text-sm lg:text-base
                               h-8 sm:h-10 lg:h-12
                               w-19 sm:w-21 lg:w-23
                               hover:bg-green active:bg-green/55 transition-all duration-200">
              Menu
              <img src={menu} alt="menu" className="h-4 sm:h-5 lg:h-6 ml-1 mb-[1px]"/>
            </button>
            <button className="flex bg-almostblack items-center justify-center cursor-pointer
                               h-8 sm:h-10 lg:h-12
                               w-8 sm:w-10 lg:w-12
                               rounded-lg sm:rounded-xl lg:rounded-2xl
                               hover:bg-green active:bg-green/55 transition-all duration-200">
              <img src={cal} alt="calendar" className="h-5 sm:h-6 lg:h-7"/>
            </button>
            <button className="flex bg-almostblack items-center justify-center cursor-pointer
                               h-8 sm:h-10 lg:h-12
                               w-8 sm:w-10 lg:w-12
                               rounded-lg sm:rounded-xl lg:rounded-2xl
                               hover:bg-green active:bg-green/55 transition-all duration-200">
              <img src={profile} alt="profile" className="h-5.5 sm:h-6.5 lg:h-7.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;