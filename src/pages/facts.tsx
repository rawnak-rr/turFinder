import "../index.css";
import pitch from "../assets/footballpitch.png";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function FactsPage() {
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const secondCardRef = useRef<HTMLDivElement | null>(null);
  const thirdCardRef = useRef<HTMLDivElement | null>(null);
  const fourthCardRef = useRef<HTMLDivElement | null>(null);
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
            firstCardRef.current,
            { y: "6vh", opacity: 1 },
            {
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
            secondCardRef.current,
            { y: "-8vh", opacity: 1 },
            {
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
          gsap.fromTo(
            thirdCardRef.current,
            { y: "-19vh", opacity: 1 },
            {
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
            fourthCardRef.current,
            { y: "-33vh", opacity: 1 },
            {
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
            firstCardRef.current,
            {
              position: "absolute",
              top: "50%",
              left: "50%",
              xPercent: -50,
              yPercent: -50,
              opacity: 1,
            },
            {
              x: "-25vw",
              y: "-25vh",
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
            secondCardRef.current,
            {
              position: "absolute",
              top: "50%",
              left: "50%",
              xPercent: -50,
              yPercent: -50,
              opacity: 1,
            },
            {
              x: "-25vw",
              y: "25vh",
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
            thirdCardRef.current,
            {
              position: "absolute",
              top: "50%",
              left: "50%",
              xPercent: -50,
              yPercent: -50,
              opacity: 1,
            },
            {
              x: "25vw",
              y: "-25vh",
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
            fourthCardRef.current,
            {
              position: "absolute",
              top: "50%",
              left: "50%",
              xPercent: -50,
              yPercent: -50,
              opacity: 1,
            },
            {
              x: "25vw",
              y: "25vh",
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
      className="flex flex-col relative items-center justify-center w-screen h-screen">
      <div className="flex flex-col  items-center text-center">
        <img
          src={pitch}
          className="w-45"
        />
        <h1 className="flex flex-col font-unbounded font-black text-2xl">
          <span className="mt-5 -mb-1">PLAY WITHOUT ANY</span>
          <span>HASSLE!</span>
        </h1>
        <p className="flex flex-col font-redhatmono font-normal text-baseline">
          <span className="mt-4 -mb-1">
            We help you to book your turf of choice and
          </span>
          <span>
            even organize players if you need! <strong>AND</strong> If
          </span>
          <span className="-mt-1 mb-5">
            you don’t have a group yet, look no further!
          </span>
        </p>
      </div>
      <div>
        <div
          ref={firstCardRef}
          className="bg-yellow w-56 h-51 rounded-3xl flex flex-col justify-between -mb-20 p-6 -rotate-10
                       font-unbounded font-black text-4xl
                       lg:relative lg:z-30">
          <div className="flex flex-col">
            <span>20+</span>
            <span>Fields</span>
          </div>
          <p className="font-redhatmono text-[11px] font-normal">
            Turf locations across Bangladesh — discover and book with ease.
          </p>
        </div>
        <div
          ref={secondCardRef}
          className="bg-lightgreen w-56 h-51 rounded-3xl flex flex-col justify-between -mb-24 p-6 rotate-6
                       font-unbounded font-black text-4xl
                       lg:relative lg:z-29">
          <div className="flex flex-col">
            <span>Under</span>
            <span>2 Mins</span>
          </div>
          <p className="font-redhatmono text-[11px] font-normal">
            Average time to find & reserve a turf near you.
          </p>
        </div>
        <div
          ref={thirdCardRef}
          className="bg-darkgreen w-56 h-51 rounded-3xl flex flex-col justify-between -mb-20 p-6 rotate-13
                       font-unbounded font-black text-4xl text-beige
                       lg:relative lg:z-28">
          <div className="flex flex-col">
            <span>500+</span>
            <span>Players</span>
          </div>
          <p className="font-redhatmono text-[11px] font-normal">
            Join solo or with friends — find games that need you.
          </p>
        </div>
        <div
          ref={fourthCardRef}
          className="bg-almostblack w-56 h-51 rounded-3xl flex flex-col justify-between p-6 -rotate-4
                       font-unbounded font-black text-4xl text-beige
                       lg:relative lg:z-27">
          <div className="flex flex-col">
            <span>100%</span>
            <span>Verified</span>
          </div>
          <p className="font-redhatmono text-[11px] font-normal">
            We help create games daily by matching verified and legit players,
            even last-minute.
          </p>
        </div>
      </div>
    </div>
  );
}
