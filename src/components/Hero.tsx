import { BsPlaystation } from "react-icons/bs";
import { Button } from "./ui/button";
import { MouseEvent, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [transformStyle, setTransformStyle] = useState<string>("");
  const itemRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    // Set initial states for the elements
    gsap.set("#l_side", { x: "-100%", opacity: 0 });
    gsap.set("#r_side", { x: "100%", opacity: 0 });

    // Define the animation timeline
    const timeline = gsap.timeline();

    timeline
      .to("#l_side", {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        "#r_side",
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      ); // Overlap the animations slightly
  });

  useGSAP(() => {
    gsap.set("#container_frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#container_frame", {
      clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      duration: 1.5,
      scrollTrigger: {
        trigger: "#container_frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current || window.innerWidth < 768) return; // Disable tilt for touch devices

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 100;
    const tiltY = (relativeX - 0.5) * -100;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <section className=" min-h-dvh h-dvh w-screen overflow-x-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 ">
        <video
          loop
          muted
          autoPlay
          src="/4k.mp4"
          className="w-full h-full object-cover pointer-events-none hidden md:inline-block"
          style={{ pointerEvents: "none" }}
        ></video>

        <img src="/pexels-shvets-production-7562108.jpg" alt="" className="md:hidden w-full h-full object-cover pointer-events-none" />
      </div>

      <div className="absolute inset-0 -z-5 pointer-events-auto"></div>
      <div id="container_frame" className="size-full z-18 flex flex-col md:flex-row items-center justify-center relative bg-[#F2F2F2] shadow-2xl py-28 max-xl:px-5">
        <div id="l_side" className="flex flex-col gap-6 items-start relative">
          <h1 className="text-5xl md:text-8xl uppercase font-mono">
            wd_<b className="font-black">black</b>
          </h1>

          <div className="space-y-5 font-general">
            <p className="text-xl">SN850P NVMe™ SSD</p>
            <p className="uppercase">
              game drive + heatsink <br />
              gaming disque + dissipateur
            </p>
          </div>

          <Button size={"lg"} className="text-xs font-general uppercase">
            read more <BsPlaystation />
          </Button>
        </div>

        <div
          id=""
          ref={itemRef}
          style={{ transform: transformStyle }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative transition-transform duration-300 ease-out"
        >
          <div className="overflow-hidden">
            <img
              src="/img/WD-2TB-Storage-Hero1.webp"
              alt=""
              className="-rotate-45 hidden md:inline-block"
            />
          </div>
        </div>

        <div
          id="r_side"
          className="absolute bottom-10 right-0 md:right-10 p-0 md:p-10 tracking-widest"
        >
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-500 to-white font-general uppercase text-xs md:text-xl  leading-loose">
            <span className="ml-14"></span>store more, play more, <br /> fast
            stocker plus, <br />
            <span className="ml-12"></span> jouer plus, vite
          </p>
        </div>
      </div>
    </section>
  );
}
