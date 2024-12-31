import { useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { BsLightning } from "react-icons/bs"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"

const products = [
	{
		memory: "1",
		price: 149
	},
	{
		memory: "2",
		price: 209
	},
	{
		memory: "4",
		price: 389
	},
	{
		memory: "8",
		price: 999
	},
]

export default function Product () {
  const [value, setValue] = useState("1");

  return <section className="min-h-dvh w-screen flex flex-col">
    <section className="bg-black py-3 overflow-hidden -rotate-[1deg] -mt-5 min-w-[100dvw]">
      <div className="text-xs font-general tracking-widest flex items-center  gap-6 text-[#F2F2F2] uppercase">
        <p>wd_black</p>
        <p className="whitespace-nowrap">SN850P NVMe™ SSD</p>
        <p>wd_black</p>
        <p className="whitespace-nowrap">SN850P NVMe™ SSD</p>
        <p>wd_black</p>
        <p className="whitespace-nowrap">SN850P NVMe™ SSD</p>
        <p>wd_black</p>
        <p className="whitespace-nowrap">SN850P NVMe™ SSD</p>
        <p>wd_black</p>
        <p className="whitespace-nowrap">SN850P NVMe™ SSD</p>
        <p>wd_black</p>
        <p className="whitespace-nowrap">SN850P NVMe™ SSD</p>
        <p>wd_black</p>
        <p className="whitespace-nowrap">SN850P NVMe™ SSD</p>
        <p>wd_black</p>
        <p className="whitespace-nowrap">SN850P NVMe™ SSD</p>
        <p>wd_black</p>
        <p className="whitespace-nowrap">SN850P NVMe™ SSD</p>
        <p>wd_black</p>
        <p className="whitespace-nowrap">SN850P NVMe™ SSD</p>
      </div>
    </section>


    <div className="max-w-7xl mx-auto grid md:grid-cols-2 grid-cols-1 py-10 gap-8 sm:gap-5 w-screen my-auto px-2">
      <div className=" overflow-hidden">
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
        <h2 className="font-mono text-2xl max-w-96">{products[Number(value)].memory}TB WD BLACK™ SN850P NVMe™ SSD for PS5™ consoles</h2>

        <ToggleGroup
          type="single"
          value={value.toString()}
          onValueChange={(value) => {
            if (value) setValue(value.toString());
          }}
        >
          {products.map((product, i) => <ToggleGroupItem className={`border-2 ${value === i.toString() ? "border-black" : "border-transparent"} rounded-md px-4 py-2`} key={product.memory} value={i.toString()}>{product.memory}</ToggleGroupItem>)}
        </ToggleGroup>

        <p className="font-general text-xs max-w-96">
          Release Date: September 12, 2024 <br />
          Manufactured by Western Digital.<br /> <br />

          Expand your PS5™ storage and Play On.<br /> <br />

          Officially licensed for the PlayStation®5 console, the WD_BLACK™ SN850P NVMe™ SSD for PS5™ consoles allows you to store more titles with worry free installation. Instantly expand up to 8TB* of storage to hold more of your favorite games. With an optimized heatsink built specifically for the PS5™ M.2 slot, you won’t need to worry about compatibility.
        </p>

        <p className="">${products[Number(value)].price}.99</p>
        <Button className="uppercase xs font-general">add in cart <BsLightning /></Button>
      </div>
    </div>
  </section>
}