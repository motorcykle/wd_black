import { BsPlaystation } from "react-icons/bs";
import { Button } from "./ui/button";
import { MouseEvent, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
    <section className="bg-[#444444] min-h-dvh h-dvh w-screen">
      <div className="size-full flex flex-col md:flex-row items-center justify-center relative bg-[#F2F2F2]">
        <div id="l_side" className="flex flex-col gap-6 items-start relative">
          <h1 className="text-8xl uppercase font-mono">
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
              className="-rotate-45"
            />
          </div>
        </div>

        <div
          id="r_side"
          className="absolute bottom-10 right-10 p-10 rounded-2xl tracking-widest"
        >
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-500 to-white font-general uppercase text-xl leading-loose">
            <span className="ml-14"></span>store more, play more, <br /> fast
            stocker plus, <br />
            <span className="ml-12"></span> jouer plus, vite
          </p>
        </div>
      </div>
    </section>
  );
}
