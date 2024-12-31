import { useRef, useState, useLayoutEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { BsLightning } from "react-icons/bs";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ConfettiExplosion from "react-confetti-explosion";
import { useGSAP } from "@gsap/react";

const products = [
  {
    memory: "1",
    price: 149,
  },
  {
    memory: "2",
    price: 209,
  },
  {
    memory: "4",
    price: 389,
  },
  {
    memory: "8",
    price: 999,
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function Product() {
  const [value, setValue] = useState("1");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isExploding, setIsExploding] = useState(false);

  useGSAP(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "#content",
        { opacity: 0, y: "200%" },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "30% bottom",
            toggleActions: "restart none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP context on unmount
  }, []);

  return (
    <section ref={containerRef} className="min-h-dvh w-screen flex flex-col relative overflow-hidden">
      <div
        id="content"
        className="relative max-w-7xl mx-auto grid md:grid-cols-2 grid-cols-1 py-10 gap-8 sm:gap-5 w-screen my-auto px-2"
      >
        <div className="overflow-hidden">
          <Carousel className="w-full max-w-lg mx-auto">
            <CarouselContent>
              <CarouselItem>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img src="/img/BOX-WD-2TB-Hero-4-V2.webp" alt="" />
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img src="/img/WD-2TB-Storage-Hero1.webp" alt="" />
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img src="/img/WD-Storage-2TB-Hero-2.webp" alt="" />
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="flex flex-col justify-center items-center text-center md:text-start md:items-start gap-4">
          <h2 className="font-mono text-2xl max-w-96 animated-text">
            {products[Number(value)].memory}TB WD BLACK™ SN850P NVMe™ SSD for
            PS5™ consoles
          </h2>

          <ToggleGroup
            type="single"
            value={value.toString()}
            onValueChange={(value) => {
              if (value) setValue(value.toString());
            }}
          >
            {products.map((product, i) => (
              <ToggleGroupItem
                className={`border-2 ${
                  value === i.toString()
                    ? "border-black"
                    : "border-transparent"
                } rounded-md px-4 py-2`}
                key={product.memory}
                value={i.toString()}
              >
                {product.memory}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <p className="font-general text-xs max-w-96 animated-text">
            Release Date: September 12, 2024 <br />
            Manufactured by Western Digital.<br /> <br />
            Expand your PS5™ storage and Play On.<br /> <br />
            Officially licensed for the PlayStation®5 console, the WD_BLACK™
            SN850P NVMe™ SSD for PS5™ consoles allows you to store more titles
            with worry-free installation. Instantly expand up to 8TB* of storage
            to hold more of your favorite games. With an optimized heatsink
            built specifically for the PS5™ M.2 slot, you won’t need to worry
            about compatibility.
          </p>

          <p className="animated-text">
            ${products[Number(value)].price}.99
          </p>
          <Button size={"sm"} onClick={() => setIsExploding(true)} className="uppercase xs font-general">
            add in cart <BsLightning />
            {isExploding && <ConfettiExplosion onAnimationEnd={() => setIsExploding(false)} />}
          </Button>
        </div>
      </div>
    </section>
  );
}
