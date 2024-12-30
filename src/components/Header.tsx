import { useRef } from "react"
import { BsPlaystation } from "react-icons/bs"

export default function Header () {
  const headersRef = useRef(null)

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