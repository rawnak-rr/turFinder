import "../index.css";
import gameFind from "../assets/gameFind.jpg";
import turFind from "../assets/turFind.jpg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function FinderPage() {
  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const rightCardRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        // Mobile: max-width 1023px (Tailwind's lg breakpoint)
        isMobile: "(max-width: 1023px)",
        // Desktop: min-width 1024px
        isDesktop: "(min-width: 1024px)",
      },
      (context) => {
        if (context.conditions?.isMobile) {
          // Animate vertically for mobile
          gsap.fromTo(
            leftCardRef.current,
            { x: "10vw", y: "15vh", opacity: 1 },
            {
              x: "-vw",
              y: "-vh",
              opacity: 1,
              duration: 1,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                toggleActions: "play none none none",
              },
            }
          );
          gsap.fromTo(
            rightCardRef.current,
            { x: "-10vw", y: "-15vh", opacity: 1 },
            {
              x: "-vw",
              y: "vh",
              opacity: 1,
              duration: 1,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (context.conditions?.isDesktop) {
          // Animate horizontally for desktop
          gsap.fromTo(
            leftCardRef.current,
            { x: "11vw", opacity: 1 },
            {
              x: "-vw",
              opacity: 1,
              duration: 1,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                toggleActions: "play none none none",
              },
            }
          );
          gsap.fromTo(
            rightCardRef.current,
            { x: "-11vw", opacity: 1 },
            {
              x: "vw",
              opacity: 1,
              duration: 1,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center w-full min-h-screen gap-10
                 lg:flex-row lg:gap-0">
      <div
        ref={leftCardRef}
        className="relative bg-black rounded-xl mr-20 -rotate-7 drop-shadow-xl drop-shadow-almostblack/70
                   flex items-center justify-center overflow-hidden cursor-pointer
                   w-47 sm:w-57 md:w-87
                   h-55 sm:h-65 md:h-95
                   md:mr-0 md:mb-10">
        <img
          src={turFind}
          alt="turFind"
          className="w-full h-full object-cover rounded-xl opacity-60"
        />
        <div
          className="absolute inset-0 flex flex-col justify-end items-center pb-5
                     font-polysans text-beige
                     text-5xl sm:text-6xl md:text-8xl">
          <span>tur-</span>
          <span>Find</span>
        </div>
      </div>
      <div
        ref={rightCardRef}
        className="relative bg-black rounded-xl ml-20 rotate-7 drop-shadow-xl drop-shadow-almostblack/70
                   flex items-center justify-center overflow-hidden cursor-pointer
                   w-47 sm:w-57 md:w-87
                   h-55 sm:h-65 md:h-95">
        <img
          src={gameFind}
          alt="gameFind"
          className="w-full h-full object-cover rounded-xl opacity-60"
        />
        <div
          className="absolute inset-0 flex flex-col justify-end items-center pb-5
                     font-polysans text-beige
                     text-5xl sm:text-6xl md:text-8xl">
          <span>game-</span>
          <span>Find</span>
        </div>
      </div>
    </div>
  );
}
