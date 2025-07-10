import "./index.css";
import NavBar from "./components/NavBar";
import running from "./assets/runningmen.jpg";

function LandingPage() {
  return (
    <div className="flex justify-center">
      <div>
        <NavBar />
      </div>
      <div className="flex justify-center items-center">
        <img src={running} alt="running" className="w-[293px] rounded-[20px] absolute top-[261px]" />
        <div className="bg-yellow absolute top-[330px] w-[293px] h-[95px]"></div>
        <p className="absolute top-[314px] pl-[4px] font-helvetica text-[80px] font-bold">
          turFinder*
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
