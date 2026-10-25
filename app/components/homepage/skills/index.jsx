// @flow strict
"use client";

import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";

function Skills() {
  return (
    <div id="skills" className="relative z-10 border-t my-12 lg:my-24 border-[#1b2c68]">
      <div className="flex justify-center my-6 lg:py-8">
        <div className="flex items-center">
          <span className="w-16 h-[2px] bg-[#1b2c68]"></span>
          <span className="bg-[#101735] text-[#f43f5e] font-bold font-mono px-6 py-2.5 text-lg sm:text-xl rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.15)]">
            SKILLS
          </span>
          <span className="w-16 h-[2px] bg-[#1b2c68]"></span>
        </div>
      </div>

      <div className="w-full my-8">
        <Marquee
          gradient={false}
          speed={65}
          pauseOnHover={true}
          pauseOnClick={true}
          delay={0}
          play={true}
          direction="left"
        >
          {skillsData.map((skill, id) => (
            <div
              className="w-36 min-w-fit h-fit flex flex-col items-center justify-center transition-all duration-300 m-3 sm:m-5 rounded-xl group relative hover:scale-105 cursor-pointer"
              key={id}
            >
              <div className="h-full w-full rounded-xl border border-[#1b2c68] bg-[#101735] group-hover:border-[#f43f5e] group-hover:shadow-[0_0_20px_rgba(244,63,94,0.2)] transition-all duration-300">
                <div className="flex flex-col items-center justify-center gap-3 p-5 sm:p-6">
                  <div className="h-8 sm:h-10 transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src={skillsImage(skill)?.src}
                      alt={skill}
                      width={40}
                      height={40}
                      className="!h-full !w-auto rounded-lg"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  <p className="text-slate-300 group-hover:text-white text-xs sm:text-sm font-semibold tracking-wide transition-colors">
                    {skill}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export default Skills;