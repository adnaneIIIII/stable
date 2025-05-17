import { devices, reviews } from "@/constants";
import Image from "next/image"
import Container from "./container";
import { cn } from "@/lib/utils";
import Marquee from "./marquee";

export default function Devices(){
      const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
  const therdRow = devices.slice(0, devices.length / 2);
    return(
        <Container>
          <div className="py-10 md:py-20 w-full">
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden py-10">
              <Marquee
                reverse
                pauseOnHover
                className="[--duration:20s] select-none">
                {therdRow.map((device) => (
                  <figure
                    key={device.name}
                    className={cn(
                      "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                      "border-zinc-50/[.1] bg-background over:bg-zinc-50/[.15]"
                    )}>
                    <div className="flex flex-row justify-center items-center gap-2">
                      <div className="flex flex-col justify-center">
                        <figcaption className="text-sm font-medium">
                          <Image
                            src={device.name}
                            width={223}
                            height={123}
                            alt=""
                            className=""
                          />
                        </figcaption>
                      </div>
                    </div>
                  </figure>
                ))}
              </Marquee>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
            </div>
          </div>
        </Container>
    )
}