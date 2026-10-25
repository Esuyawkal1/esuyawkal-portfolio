// @flow strict
"use client";

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import TiltCard from "@/app/components/cyber/tilt-card";

function AboutSection() {
  return (
    <div id="about" className="my-16 lg:my-24 relative">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#101735] w-fit text-[#f43f5e] rotate-90 p-2 px-5 text-sm font-bold font-mono tracking-wider rounded-md shadow-md">
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-[#1b2c68]"></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left description */}
        <div className="order-2 lg:order-1 space-y-4">
          <h2 className="font-bold text-2xl lg:text-3xl text-white tracking-tight">
            Crafting Digital Engineering Excellence
          </h2>

          <div className="p-6 rounded-2xl bg-[#0d1224]/80 border border-[#1b2c68] shadow-[0_4px_25px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            <p className="text-gray-200 text-sm lg:text-base leading-relaxed">
              {personalData.description}
            </p>
          </div>
        </div>

        {/* Right profile image with 3D Tilt */}
        <div className="flex justify-center order-1 lg:order-2">
          <TiltCard
            maxTilt={10}
            className="rounded-2xl p-2 bg-[#101735] border border-[#1b2c68] shadow-[0_0_30px_rgba(244,63,94,0.15)]"
          >
            <div className="relative overflow-hidden rounded-xl bg-[#0d1224]">
              <Image
                src={personalData.profile}
                width={280}
                height={280}
                alt="Esuyawkal Fentahun"
                className="rounded-xl transition-all duration-700 grayscale hover:grayscale-0 hover:scale-105 cursor-pointer object-cover"
                style={{ width: "280px", height: "auto" }}
                priority
              />
            </div>
          </TiltCard>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;