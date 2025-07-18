import "./index.css";
import gameFind from "./assets/gameFind.jpg";
import turFind from "./assets/turFind.jpg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function FinderPage() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen -mt-30">
      <div
        className="relative bg-darkgreen w-57 h-65 rounded-xl mb-10 mr-20 -rotate-7
                   flex items-center justify-center overflow-hidden">
        <img
          src={turFind}
          alt="turFind"
          className="w-full h-full object-cover rounded-xl opacity-80"
        />
        <div
          className="absolute inset-0 flex flex-col justify-end items-center pb-5
                     font-polysans text-6xl text-beige">
          <span>tur-</span>
          <span>Find</span>
        </div>
      </div>
      <div
        className="relative bg-green w-57 h-65 rounded-xl ml-20 rotate-7
                   flex items-center justify-center overflow-hidden">
        <img
          src={gameFind}
          alt="gameFind"
          className="w-full h-full object-cover rounded-xl opacity-80"
        />
        <div
          className="absolute inset-0 flex flex-col justify-end items-center pb-5
                     font-polysans text-6xl text-beige">
          <span>game-</span>
          <span>Find</span>
        </div>
      </div>
    </div>
  );
}
