import logo from "../assets/turfinderlogo.png";
import outarrow from "../assets/arrow-outward.svg";

export default function EndPage() {
  return (
    <div className="w-screen h-screen flex flex-col bg-almostwhite">
      <div
        className="flex-grow flex flex-col justify-center items-center pt-15
                   font-degular font-black text-9xl">
        <span>LAUNCHING</span>
        <span>FALL 2025!</span>
      </div>
      <div
        className="bg-darkgreen w-screen h-1/2 rounded-t-[120px]
                   flex flex-col justify-evenly items-center">
        <div className="flex items-center bg-almostblack w-105 h-30 rounded-xl">
          <img
            src={logo}
            className="w-40 -ml-5"
          />
          <span className="font-helvetica font-black text-6xl text-almostwhite -ml-5">
            turFinder*
          </span>
        </div>
        <div
          className="flex flex-col mt-10 items-center
                     font-redhatmono text-sm text-white">
          <span>sign up for EARLY ACCESS!</span>
          <div>
            <input
              type="email"
              placeholder="email"
              className="bg-beige h-10 w-60 mt-3 p-4 mr-2 rounded-xl text-black placeholder:text-almostblack/60"
            />
            <button
              className="bg-yellow h-10 w-20 rounded-xl
                         text-black font-helvetica font-bold
                         cursor-pointer hover:bg-yellow/90 active:bg-yellow/70">
              submit
            </button>
          </div>
        </div>
        <div
          className="flex flex-col absolute left-20 gap-2 pt-10 cursor-pointer
                     font-polysans font-bold text-3xl text-lightgreen">
          <span className="flex flex-row gap-1 group hover:scale-110 active:opacity-60 duration-200">
            Home
          </span>
          <span className="flex flex-row gap-1 group hover:scale-110 active:opacity-60 duration-200">
            Instagram
            <img
              src={outarrow}
              className="w-8 -mb-1 group-hover:rotate-45 duration-200"
            />
          </span>
          <span className="flex flex-row gap-1 group hover:scale-110 active:opacity-60 duration-200">
            Facebook
            <img
              src={outarrow}
              className="w-8 -mb-1 group-hover:rotate-45 duration-200"
            />
          </span>
          <span className="flex flex-row gap-1 group hover:scale-110 active:opacity-60 duration-200">
            Contact Us
          </span>
        </div>
        <div
          className="flex flex-col absolute right-20 gap-10 pt-10 cursor-pointer
                     font-redhatmono font-normal text-2xl text-left text-black">
          <div className="flex flex-col">
            <span>Rawnak</span>
            <span>UNSW, Sydney</span>
          </div>
          <div className="flex flex-col">
            <span>Maheer</span>
            <span>ASU, Tempe</span>
          </div>
          <div className="flex flex-col">
            <span>Masroor</span>
            <span>BUET, Dhaka</span>
          </div>
        </div>
      </div>
    </div>
  );
}
