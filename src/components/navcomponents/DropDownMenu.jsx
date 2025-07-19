import React from "react";

const DropdownMenu = ({ isMenuOpen, toggleMenu, handleMenuItemClick }) => {
  return (
    <>
      <div
        className={`fixed z-50
          top-0 left-1/4
          w-1/2 h-1/2
           bg-darkgreen rounded-b-2xl 
           transition-transform duration-300 ease-in-out
          ${
            isMenuOpen
              ? "transform translate-y-0"
              : "transform -translate-y-full"
          }
          `}>
        <div className="flex h-full justify-center items-center px-8">
          {/* Two column layout */}
          <div className="flex w-full max-w-6xl justify-between">
            {/* Left Column */}
            <ul className="space-y-4 hover:text-yellow">
              <li
                onClick={() => handleMenuItemClick("/book")}
                className="text-beige font-redhatmono 
                text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200">
                book your turf
              </li>
              <li
                onClick={() => handleMenuItemClick("/games")}
                className="text-beige font-redhatmono text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200">
                looking for games
              </li>
              <li
                onClick={() => handleMenuItemClick("/rating")}
                className="text-beige font-redhatmono text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200">
                personal rating
              </li>
              <li
                onClick={() => handleMenuItemClick("/about")}
                className="text-beige font-redhatmono text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200">
                about us
              </li>
            </ul>

            {/* Right Column */}
            <div className="justify-end">
              <ul className="space-y-4 text-right">
                <li
                  onClick={() => window.open("https://instagram.com", "_blank")}
                  className="text-beige font-redhatmono text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200">
                  instagram
                </li>
                <li
                  onClick={() => window.open("https://facebook.com", "_blank")}
                  className="text-beige font-redhatmono text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200">
                  facebook
                </li>
                <li
                  onClick={() => window.open("mailto:contact@turfinder.com")}
                  className="text-beige font-redhatmono text-lg lg:text-xl hover:text-yellow cursor-pointer transition-colors duration-200">
                  mail
                </li>
              </ul>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 text-beige hover:text-yellow cursor-pointer text-lg font-redhatmono transition-colors duration-200">
            close
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0"
          onClick={toggleMenu}></div>
      )}
    </>
  );
};

export default DropdownMenu;
