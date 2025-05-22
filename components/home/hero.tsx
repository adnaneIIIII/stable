import React from "react";
import { Button } from "@/components/ui/button";
import Arroww from "@/public/icon/arrow-w.svg";

export default function HeroSection() {
  const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};
  return (
    
    <div className=" bg-[linear-gradient(to_bottom,#000,#200000,#a52f00,#d08f17)] py-[72px] sm:py-24 relative overflow-clip">
      <div
        className="absolute h-[375px] w-[750px] sm:w-[2836px] sm:h-[768px] 
      
      rounded-[100%] bg-black left-1/2 -translate-x-1/2 border-[#fa7131] 
      
      bg-[radial-gradient(closest-side,#000_82%,#fa8b31ae)] top-[calc(100%-96px)] sm:top-[calc(100%-190px)]"
      ></div>

      <div className="container relative pt-8">
        <div className="flex items-center justify-center ">
         
          <a
            href="#"
            className="inline-flex gap-3 border py-1 px-2 rounded-xl border-white/30"
          >
            <span className="bg-gradient-to-r from-[#a52f00] to-[#dac574] text-transparent bg-clip-text [-webkit-background-clip:text]">
              Entertiment 2.0 is here
            </span>
            <span className="inline-flex items-center gap-1">
              <span>Introducing HoloIPTV</span>
              <Arroww />
            </span>
          </a>
        </div>
        <div className="flex justify-center mt-10">
          <div className="inline-flex relative">
            <h1 className=" font-bold text-5xl sm:text-9xl   tracking-tighter text-center  inline-flex">
              PREMIUM TV CHANNELS <br /> MOVIES AND MORE
            </h1>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-center text-xl sm:text-2xl  mt-10 max-w-2xl">
            Enjoy premium sports, live pay-per-view events,
            <br /> and the newest movie releases in high quality—all from the
            comfort of your screen.
          </p>
        </div>
        <div className="flex justify-center mt-8 gap-3 mb-8">
          <Button variant={"default"} className="">
            Get for Free
          </Button>
          <Button variant={"ghost"}>Contact Us</Button>
        </div>
      </div>
    </div>
  );
}
