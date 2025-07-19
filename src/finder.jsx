import "./index.css";
import gameFind from "./assets/gameFind.jpg";
import turFind from "./assets/turFind.jpg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function FinderPage() {
  return (
    <div
      className="flex flex-col items-center justify-center w-screen h-screen gap-10
                 lg:flex-row lg:gap-0">
      <div
        className="relative bg-black rounded-xl mr-20 -rotate-7
                   flex items-center justify-center overflow-hidden cursor-pointer
                   w-47 sm:w-57 lg:w-87
                   h-55 sm:h-65 lg:h-95
                   lg:mr-0 lg:mb-10">
        <img
          src={turFind}
          alt="turFind"
          className="w-full h-full object-cover rounded-xl opacity-60"
        />
        <div
          className="absolute inset-0 flex flex-col justify-end items-center pb-5
                     font-polysans text-beige
                     text-5xl sm:text-6xl lg:text-8xl">
          <span>tur-</span>
          <span>Find</span>
        </div>
      </div>
      <div
        className="relative bg-black rounded-xl ml-20 rotate-7
                   flex items-center justify-center overflow-hidden cursor-pointer
                   w-47 sm:w-57 lg:w-87
                   h-55 sm:h-65 lg:h-95">
        <img
          src={gameFind}
          alt="gameFind"
          className="w-full h-full object-cover rounded-xl opacity-60"
        />
        <div
          className="absolute inset-0 flex flex-col justify-end items-center pb-5
                     font-polysans text-beige
                     text-5xl sm:text-6xl lg:text-8xl">
          <span>game-</span>
          <span>Find</span>
        </div>
      </div>
    </div>
  );
}
