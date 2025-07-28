import logo from "../assets/turfinderlogo.png";

export default function EndPage() {
  return (
    <div className="w-screen h-screen flex flex-col bg-almostwhite">
      <div
        className="flex-grow flex flex-col justify-center items-center pt-15
                   font-degular font-extrabold text-7xl">
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
      </div>
    </div>
  );
}
