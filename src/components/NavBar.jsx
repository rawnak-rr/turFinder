import React, {useState, useEffect} from "react";
import "../index.css";
import {useNavigate} from "react-router-dom";
import logo from "../assets/turfinderlogo.png";
import cal from "../assets/calendar.svg";
import profile from "../assets/profile.svg";
import menu from "../assets/menu.svg";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  // use this to toggle open/close menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
    // close menu if it's open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    if (isProfileOpen) {
      setIsProfileOpen(false);
    }
  };

  // use this to toggle open/close profile
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleLogin = () => {};

  const handleMenuItemClick = (path) => {
    // for now, just console.log since pages don't exist yet
    console.log(`Navigating to: ${path}`);
    // navigate(path); // Uncomment when you create these pages

    setIsMenuOpen(false); // Close menu
  };

  // this ensures the NavBar properly transitions to the bottom
  useEffect(() => {
    const handleScroll = () => {
      // change  window.scrollY > window.innerHeight / 4 <- as needed
      if (window.scrollY > window.innerHeight / 4) {
        setAtBottom(true);
      } else {
        setAtBottom(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-1/2 bg-darkgreen z-50 rounded-b-2xl transition-transform duration-300 ease-in-out
          ${
            isMenuOpen
              ? "transform translate-y-0"
              : "transform -translate-y-full"
          }
          `}
      >
        <div className="flex h-full justify-center items-center px-8 sm:px-12 md:px-16 lg:px-20">
          {/* Two column layout */}
          <div className="flex flex-row w-full max-w-6xl justify-between">
            {/* Left Column */}
            <div className="flex-1">
              <ul className="space-y-4 sm:space-y-6">
                <li
                  onClick={() => handleMenuItemClick("/book")}
                  className="text-beige font-redhatmono text-lg sm:text-sm md:text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200"
                >
                  book your turf
                </li>
                <li
                  onClick={() => handleMenuItemClick("/games")}
                  className="text-beige font-redhatmono text-lg sm:text-sm md:text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200"
                >
                  looking for games
                </li>
                <li
                  onClick={() => handleMenuItemClick("/rating")}
                  className="text-beige font-redhatmono text-lg sm:text-sm md:text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200"
                >
                  personal rating
                </li>
                <li
                  onClick={() => handleMenuItemClick("/about")}
                  className="text-beige font-redhatmono text-lg sm:text-sm md:text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200"
                >
                  about us
                </li>
              </ul>
            </div>

            {/* Right Column */}
            <div className="flex-1 flex justify-end">
              <ul className="space-y-4 sm:space-y-6 text-right">
                <li
                  onClick={() => window.open("https://instagram.com", "_blank")}
                  className="text-beige font-redhatmono text-lg sm:text-sm md:text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200"
                >
                  instagram
                </li>
                <li
                  onClick={() => window.open("https://facebook.com", "_blank")}
                  className="text-beige font-redhatmono text-lg sm:text-sm md:text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200"
                >
                  facebook
                </li>
                <li
                  onClick={() => window.open("mailto:contact@turfinder.com")}
                  className="text-beige font-redhatmono text-lg sm:text-sm md:text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200"
                >
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

      {/* profile sidebar - Login UI */}
      <div
        className={`fixed top-0 right-0 h-1/2 w-1/2 sm:w-96 bg-yellow rounded-l-2xl z-50 shadow-2xl transition-transform duration-300 ease-in-out ${
          isProfileOpen
            ? "transform translate-x-0"
            : "transform translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-end items-center p-6">
            <button
              onClick={toggleProfile}
              className="text-almostblack font-redhatmono text-sm cursor-pointer"
            >
              close
            </button>
          </div>

          {/* Login Form */}
          <div className="flex-1 overflow-y-auto p-6 font-redhatmono">
            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-colors te "
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-colors"
                />
              </div>

              {/* Login Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleLogin}
                  className="w-min rounded-2xl py-3 px-4 hover:bg-blue-600 text-black hover:text-white transition-colors font-medium cursor-pointer duration-300"
                >
                  Login
                </button>
              </div>

              {/* Login with Google */}
              <button className="w-full py-3 px-4 border rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-gray-700">Login with Google</span>
              </button>

              {/* Forgot Password Link */}
              <div className="text-center">
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Forgot your password?
                </a>
              </div>

              {/* Sign Up Link */}
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && <div className="fixed inset-0" onClick={toggleMenu}></div>}
      {/* Add overlay for profile sidebar */}
      {isProfileOpen && (
        <div className="fixed inset-0" onClick={toggleProfile}></div>
      )}

      <div
        className={`flex justify-center fixed top-0 left-0 w-full z-30
                    transform transition-transform duration-600 ease-in-out
                    ${
                      atBottom
                        ? "translate-y-[calc(100vh-8.5rem)]"
                        : "translate-y-10"
                    }
        `}
      >
        <div
          className="flex bg-almostblack
                     h-15 sm:h-17.5 lg:h-20
                     w-61 sm:w-71 lg:w-81
                     rounded-3xl sm:rounded-[30px] lg:rounded-[36px]"
        >
          <img
            onClick={handleLogoClick}
            src={logo}
            alt="tflogo"
            className="h-100% ml-1 cursor-pointer hover:opacity-80 transition-opacity duration-200"
          />
          <div
            className="flex font-polysans bg-darkgreen h-100% justify-evenly items-center
                          w-45 sm:w-55 lg:w-65
                          rounded-3xl sm:rounded-[30px] lg:rounded-[36px]"
          >
            <button
              onClick={toggleMenu}
              className="flex items-center justify-center rounded-full bg-almostblack cursor-pointer
                               font-polysans text-beige text-xs sm:text-sm lg:text-base
                               h-8 sm:h-10 lg:h-12
                               w-19 sm:w-21 lg:w-23
                               hover:bg-green active:bg-green/55 transition-all duration-200"
            >
              Menu
              <img
                src={menu}
                alt="menu"
                className="h-4 sm:h-5 lg:h-6 ml-1 mb-[1px]"
              />
            </button>
            <button
              className="flex bg-almostblack items-center justify-center cursor-pointer
                               h-8 sm:h-10 lg:h-12
                               w-8 sm:w-10 lg:w-12
                               rounded-lg sm:rounded-xl lg:rounded-2xl
                               hover:bg-green active:bg-green/55 transition-all duration-200"
            >
              <img src={cal} alt="calendar" className="h-5 sm:h-6 lg:h-7" />
            </button>
            <button
              className="flex bg-almostblack items-center justify-center cursor-pointer
                               h-8 sm:h-10 lg:h-12
                               w-8 sm:w-10 lg:w-12
                               rounded-lg sm:rounded-xl lg:rounded-2xl
                               hover:bg-green active:bg-green/55 transition-all duration-200"
            >
              <img
                onClick={handleProfileClick}
                src={profile}
                alt="profile"
                className="h-5.5 sm:h-6.5 lg:h-7.5"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
