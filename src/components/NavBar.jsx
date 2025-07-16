import '../index.css';
import logo from '../assets/turfinderlogo.png'
import cal from '../assets/calendar.svg'
import profile from '../assets/profile.svg'
import menu from '../assets/menu.svg'


const NavBar = () => {
  return (
    <div className="flex">
      <div className="flex bg-almostblack
                      mt-10
                      h-15 sm:h-17.5 lg:h-20
                      w-61 sm:w-71 lg:w-81
                      rounded-3xl sm:rounded-[30px] lg:rounded-[36px]">
        <img src={logo} alt="tflogo" className="h-100% ml-1 cursor-pointer" />
        <div className="flex font-polysans bg-darkgreen h-100% justify-evenly items-center
                        w-45 sm:w-55 lg:w-65
                        rounded-3xl sm:rounded-[30px] lg:rounded-[36px]">
          <button className="flex items-center justify-center rounded-full bg-almostblack cursor-pointer
                             font-polysans text-beige text-xs sm:text-sm lg:text-base
                             h-8 sm:h-10 lg:h-12
                             w-19 sm:w-21 lg:w-23
                             hover:bg-green active:bg-green/55">
            Menu
            <img src={menu} alt="menu" className="h-4 sm:h-5 lg:h-6 ml-1 mb-[1px]"/>
          </button>
          <button className="flex bg-almostblack items-center justify-center cursor-pointer
                             h-8 sm:h-10 lg:h-12
                             w-8 sm:w-10 lg:w-12
                             rounded-lg sm:rounded-xl lg:rounded-2xl
                             hover:bg-green active:bg-green/55">
            <img src={cal} alt="calendar" className="h-5 sm:h-6 lg:h-7"/>
          </button>
          <button className="flex bg-almostblack items-center justify-center cursor-pointer
                             h-8 sm:h-10 lg:h-12
                             w-8 sm:w-10 lg:w-12
                             rounded-lg sm:rounded-xl lg:rounded-2xl
                             hover:bg-green active:bg-green/55">
            <img src={profile} alt="profile" className="h-5.5 sm:h-6.5 lg:h-7.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
