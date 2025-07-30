import { useState, useEffect, useRef } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/turfinderlogo.png";
import cal from "../assets/calendar.svg";
import profile from "../assets/profile.svg";
import menu from "../assets/menu.svg";
import DropdownMenu from "./navcomponents/DropDownMenu";
import Login from "./navcomponents/Login";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import CommandSearch from "./CommandSearch";
import Calendar from "./navcomponents/Calendar";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const handleCalendarClick = (): void => {
    setIsCalendarOpen(!isCalendarOpen);
    // Close other menus
    if (isMenuOpen) setIsMenuOpen(false);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  // Add this function
  const handleCalendarClose = (): void => {
    setIsCalendarOpen(false);
  };

  // Add this function
  const handleDateSelect = (date: Date): void => {
    console.log("Selected date:", date);
    // Handle date selection logic here
  };
  const sampleBookings = {
    "2025-07-30": [
      {
        id: "1",
        title: "North Arena",
        time: "9:00 - 9:30 AM",
        type: "slot" as const,
      },
    ],
  };

  // use this to toggle open/close menu
  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const handleLogoClick = (): void => {
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
  const toggleProfile = (): void => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleProfileClick = (): void => {
    setIsProfileOpen(!isProfileOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleLogin = (): void => {};

  const handleMenuItemClick = (path: string): void => {
    // for now, just console.log since pages don't exist yet
    console.log(`Navigating to: ${path}`);
    // navigate(path); // Uncomment when you create these pages

    setIsMenuOpen(false); // Close menu
  };

  useEffect(() => {
    const spin = () => {
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { rotate: 0 },
          { rotate: 360, duration: 2, ease: "power2.inOut" }
        );
      }
    };
    spin();
    const interval = setInterval(spin, 5000); // spin every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* drop down menu from the top */}
      <DropdownMenu
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        handleMenuItemClick={handleMenuItemClick}
      />
      {/* login page from the side */}
      <Login
        isProfileOpen={isProfileOpen}
        toggleProfile={toggleProfile}
        handleLogin={handleLogin}
      />

      <Calendar
        isOpen={isCalendarOpen}
        onClose={handleCalendarClose}
        onDateSelect={handleDateSelect}
        bookings={sampleBookings}
      />

      <CommandSearch />
      {/* navbar code */}
      <div
        ref={navbarRef}
        className="fixed bottom-10 md:top-0 left-1/2 transform -translate-x-1/2 drop-shadow-md z-20">
        <div
          className="flex bg-almostblack
                     h-15 sm:h-17.5 md:h-18
                     w-61 sm:w-71 md:w-81
                     rounded-3xl md:rounded-t-none md:rounded-b-3xl">
          <img
            ref={logoRef}
            onClick={handleLogoClick}
            src={logo}
            alt="tflogo"
            className="h-100% ml-1 cursor-pointer hover:opacity-80 transition-opacity duration-200"
          />
          <div
            className="flex font-polysans bg-darkgreen h-100% justify-evenly items-center
                       w-45 sm:w-55 md:w-65
                       rounded-3xl md:rounded-t-none md:rounded-b-3xl">
            <button
              onClick={toggleMenu}
              className="flex items-center justify-center rounded-2xl bg-almostblack cursor-pointer
                         font-polysans text-beige text-xs sm:text-sm md:text-base
                         h-8 sm:h-10 md:h-12
                         w-19 sm:w-21 md:w-23
                         hover:bg-green active:bg-green/55 transition-all duration-200">
              Menu
              <img
                src={menu}
                alt="menu"
                className="h-4 sm:h-5 md:h-6 ml-1 mb-[1px]"
              />
            </button>
            <button
              onClick={handleCalendarClick}
              className="flex bg-almostblack items-center justify-center cursor-pointer
                         h-8 sm:h-10 md:h-12
                         w-8 sm:w-10 md:w-12
                         rounded-md sm:rounded-xl md:rounded-2xl
                         hover:bg-green active:bg-green/55 transition-all duration-200">
              <img
                src={cal}
                alt="calendar"
                className="h-5 sm:h-6 md:h-7"
              />
            </button>
            <button
              onClick={handleProfileClick}
              className="flex bg-almostblack items-center justify-center cursor-pointer
                         h-8 sm:h-10 md:h-12
                         w-8 sm:w-10 md:w-12
                         rounded-md sm:rounded-xl md:rounded-2xl
                         hover:bg-green active:bg-green/55 transition-all duration-200">
              <img
                src={profile}
                alt="profile"
                className="h-5.5 sm:h-6.5 md:h-7.5"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
