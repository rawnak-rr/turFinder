import "./index.css";
import NavBar from "./components/NavBar";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function FinderPage() {
  return (
    <div className="flex justify-center w-screen h-screen">
      <div>
        <NavBar />
      </div>
    </div>
  );
}
