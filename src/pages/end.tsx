import logo from "../assets/turfinderlogo.png";
import outarrow from "../assets/icons/arrow-outward.svg";

export default function EndPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-almostwhite">
      <div className="flex-grow flex flex-col justify-center items-center pt-14 font-degular font-black text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-none">
        <span>LAUNCHING</span>
        <span>FALL 2025!</span>
      </div>

      <div className="relative bg-darkgreen w-full py-12 md:py-20 rounded-t-[60px] sm:rounded-t-[90px] md:rounded-t-[120px] flex flex-col items-center gap-10">
        {/* Brand */}
        <div className="flex items-center bg-almostblack w-72 sm:w-96 md:w-[420px] h-20 sm:h-24 md:h-30 rounded-xl">
          <img
            src={logo}
            className="w-28 sm:w-32 md:w-40 -ml-4 sm:-ml-5"
          />
          <span className="font-helvetica font-black text-4xl sm:text-5xl md:text-6xl text-almostwhite -ml-4 sm:-ml-5">
            turFinder*
          </span>
        </div>

        <div className="flex flex-col items-center font-redhatmono text-xs sm:text-sm text-white">
          <span className="uppercase tracking-wide">
            sign up for early access!
          </span>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row mt-4 gap-3">
            <input
              type="email"
              placeholder="email"
              className="bg-beige h-10 w-60 p-4 rounded-xl text-black placeholder:text-almostblack/60"
            />
            <button
              type="submit"
              className="bg-yellow h-10 w-full sm:w-24 rounded-xl text-black font-helvetica font-bold hover:bg-yellow/90 active:bg-yellow/70">
              submit
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-2 pt-8 font-polysans font-bold text-2xl sm:text-3xl text-lightgreen items-center md:items-start md:absolute md:left-20 md:top-10">
          <div className="flex items-center gap-1 group hover:scale-110 active:opacity-60 duration-200 cursor-pointer">
            Home
          </div>
          <div className="flex items-center gap-1 group hover:scale-110 active:opacity-60 duration-200 cursor-pointer">
            Instagram
            <img
              src={outarrow}
              className="w-6 sm:w-7 md:w-8 -mb-1 group-hover:rotate-45 duration-200"
            />
          </div>
          <div className="flex items-center gap-1 group hover:scale-110 active:opacity-60 duration-200 cursor-pointer">
            Facebook
            <img
              src={outarrow}
              className="w-6 sm:w-7 md:w-8 -mb-1 group-hover:rotate-45 duration-200"
            />
          </div>
          <div className="flex items-center gap-1 group hover:scale-110 active:opacity-60 duration-200 cursor-pointer">
            Contact Us
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 font-unbounded text-base sm:text-lg text-black items-center md:items-start md:absolute md:right-20 md:top-10">
          <div className="leading-none text-center md:text-left">
            <span className="block font-semibold">Rawnak</span>
            <span className="block">UNSW, Sydney</span>
          </div>
          <div className="leading-none text-center md:text-left">
            <span className="block font-semibold">Maheer</span>
            <span className="block">ASU, Tempe</span>
          </div>
          <div className="leading-none text-center md:text-left">
            <span className="block font-semibold">Masroor</span>
            <span className="block">BUET, Dhaka</span>
          </div>
        </div>
      </div>
    </div>
  );
}
