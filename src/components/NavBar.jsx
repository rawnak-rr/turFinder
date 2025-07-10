import '../index.css';
import logo from '../assets/turfinderlogo.png'
import cal from '../assets/calendar.svg'
import profile from '../assets/profile.svg'
import menu from '../assets/menu.svg'


const NavBar = () => {
  return (
    <div className="flex justify-around">
      <div className="flex h-[55px] w-[244px] bg-almostblack rounded-[15px] mx-auto mt-4 fixed">
        <img src={logo} alt="tflogo" className="h-[55px] w-[55px] ml-[4px] cursor-pointer" />
        <div className="flex font-polysans bg-darkgreen h-[55px] w-[180px] rounded-[15px] ml-auto justify-around">
          <button className="flex mt-3 items-center justify-center rounded-full bg-almostblack font-polysans text-beige h-[30px] w-[70px] text-[12px] cursor-pointer">
              Menu
            <img src={menu} alt="menu" className="h-[14px] w-[14px] ml-[3px] mb-[1px]"/>
          </button>
          <button className="flex h-[30px] w-[30px] bg-almostblack mt-3 rounded-[7.5px] fill-current items-center justify-center cursor-pointer">
            <img src={cal} alt="calendar" className="h-[20px]"/>
          </button>
          <button className="flex h-[30px] w-[30px] bg-almostblack mt-3 rounded-[7.5px] items-center justify-center cursor-pointer">
            <img src={profile} alt="profile" className="h-[20px]"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
