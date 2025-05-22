import React from "react";
import { Button } from "@/components/ui/button";
import Arroww from "@/public/icon/arrow-w.svg";

export default function HeroSection() {
  return (
    // <section
    //   className="relative bg-[url('/hero.jpg')] bg-cover bg-center bg-no-repeat lg:grid lg:h-screen lg:place-content-center"
    // >
    //   {/* Overlay for dark effect and blur */}
    //   <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

    //   {/* Content */}
    //   <div className="relative z-10 mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
    //     <div className="mx-auto max-w-prose text-center">
    //       <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
    //         Understand user flow and
    //         <strong className="text-indigo-600"> increase </strong>
    //         conversions
    //       </h1>

    //       <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200">
    //         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, nisi. Natus, provident
    //         accusamus impedit minima harum corporis iusto.
    //       </p>

    //       <div className="mt-4 flex justify-center gap-4 sm:mt-6">
    //         <Link href="#" passHref>
    //           <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
    //             Get Started
    //           </Button>
    //         </Link>
    //         <Link href="#" passHref>
    //           <Button variant="outline" className="border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white">
    //             Learn More
    //           </Button>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </section>
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
