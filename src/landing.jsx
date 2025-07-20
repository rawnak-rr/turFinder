import "./index.css";
import NavBar from "./components/NavBar";
import running from "./assets/runningmen.jpg";

export default function LandingPage() {
  return (
    <div className="flex justify-center w-screen h-screen">
      <div className="fixed z-50">
        <NavBar />
      </div>
      <div className="flex justify-center items-center z-30">
        <img
          className="w-70 sm:w-90 lg:w-110 rounded-3xl shrink-0"
          src={running}
          alt="running"
        />
        <div
          className="bg-yellow absolute
                       w-70 sm:w-90 lg:w-110 
                       h-23 sm:h-30 lg:h-37"></div>
        <p
          className="absolute pl-2.5
                     font-helvetica text-[75px] sm:text-[97px] lg:text-[119px] font-bold">
          turFinder*
        </p>
      </div>
    </div>
  );
}
