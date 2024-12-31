
import { BsPlaystation } from "react-icons/bs"
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";

export default function Header () {
  const headersRef = useRef<HTMLElement>(null)

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (!headersRef.current) return;

    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      headersRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      headersRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      headersRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    if (!headersRef.current) return;
    
    gsap.to(headersRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return <header ref={headersRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
    <section className="absolute top-1/2 w-full -translate-y-1/2">
      <nav className="flex size-full items-center justify-between p-4">
        {/* <img src="/img/PlayStation-Logo-1.png" alt="" className="h-10" /> */}
        <BsPlaystation className=" h-12 w-12" />

        <img src="/img/Western_Digital_logo.svg.png" alt="" className="h-10 filter grayscale" />
      </nav>
    </section>
  </header>
}