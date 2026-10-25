// @flow strict
"use client";

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import TiltCard from "@/app/components/cyber/tilt-card";
import { soundFx } from "@/app/components/cyber/sound-effects";

function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-between py-6 lg:py-16 font-sans">
      <Image
        src="/hero.svg"
        alt="Hero Background"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10 opacity-40 pointer-events-none"
        priority
      />

      <div className="grid grid-cols-1 items-center lg:grid-cols-2 lg:gap-12 gap-y-10 w-full">
        {/* Left Column (Bio & Actions) */}
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-16 md:pb-8 lg:pt-4">
          <h1 className="text-3xl sm:text-5xl lg:text-[2.85rem] font-normal leading-tight sm:leading-[1.18] tracking-tight text-slate-300">
            Hello, <br />
            This is{" "}
            <span className="font-bold text-white">
              {personalData.name}
            </span>
            <br />
            {`I'm a `}
            <span className="font-semibold text-[#f43f5e]">
              {personalData.designation}
            </span>
            .
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
            Architecting next-generation digital experiences, high-performance web applications, and intelligent full-stack systems.
          </p>

          {/* Social Links - Subtle monochrome row */}
          <div className="my-6 flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-sm w-fit">
            {[
              { href: personalData.github, icon: BsGithub, label: "GitHub" },
              { href: personalData.linkedIn, icon: BsLinkedin, label: "LinkedIn" },
              { href: personalData.facebook, icon: FaFacebook, label: "Facebook" },
              { href: personalData.twitter, icon: FaTwitterSquare, label: "Twitter" },
            ].map((soc, idx) => {
              const Icon = soc.icon;
              return (
                <Link
                  key={idx}
                  href={soc.href}
                  target="_blank"
                  aria-label={soc.label}
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20 transition-all duration-200"
                >
                  <Icon size={20} />
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons - Solid colors without gradients */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#f43f5e] text-white hover:bg-[#e11d48] rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_25px_rgba(244,63,94,0.5)] hover:scale-105 active:scale-95"
            >
              <span>Contact me</span>
              <RiContactsFill size={16} />
            </Link>

            <Link
              role="button"
              target="_blank"
              href={personalData.resume}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#101735] text-white hover:bg-[#16214c] border border-[#38bdf8]/40 hover:border-[#38bdf8] rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:scale-105 active:scale-95"
            >
              <span>Get Resume</span>
              <MdDownload size={18} className="text-[#38bdf8]" />
            </Link>
          </div>
        </div>

        {/* Right Column: 3D Tilt Card Code Window (Solid Cohesive Styling, No Gradients) */}
        <div className="order-1 lg:order-2 w-full">
          <TiltCard
            maxTilt={8}
            perspective={1200}
            className="w-full rounded-xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
          >
            <div className="bg-[#0b1022] border border-[#1b2c68] relative rounded-xl backdrop-blur-xl">
              {/* Solid Accent Line */}
              <div className="h-[2px] w-full bg-[#f43f5e]"></div>
 {/* Code Content - Two Cohesive Accents (#f43f5e and #38bdf8) */}
              <div className="overflow-x-auto px-4 lg:px-8 py-5 lg:py-7">
                <code className="font-mono text-xs md:text-sm leading-relaxed">
                  <div className="blink">
                    <span className="mr-2 text-[#38bdf8]">const</span>
                    <span className="mr-2 text-white">coder</span>
                    <span className="mr-2 text-slate-400">=</span>
                    <span className="text-slate-400">{'{'}</span>
                  </div>
                  <div>
                    <span className="ml-4 lg:ml-8 mr-2 text-slate-300">name:</span>
                    <span className="text-slate-400">{`'`}</span>
                    <span className="text-[#f43f5e]">{personalData.name}</span>
                    <span className="text-slate-400">{`',`}</span>
                  </div>
                  <div className="ml-4 lg:ml-8 mr-2">
                    <span className="text-slate-300">skills:</span>
                    <span className="text-slate-400">{`['`}</span>
                    <span className="text-[#f43f5e]">React</span>
                    <span className="text-slate-400">{"', '"}</span>
                    <span className="text-[#f43f5e]">NextJS</span>
                    <span className="text-slate-400">{"', '"}</span>
                    <span className="text-[#f43f5e]">Figma</span>
                    <span className="text-slate-400">{"', '"}</span>
                    <span className="text-[#f43f5e]">NodeJS</span>
                    <span className="text-slate-400">{"', '"}</span>
                    <span className="text-[#f43f5e]">MongoDB</span>
                    <span className="text-slate-400">{"', '"}</span>
                    <span className="text-[#f43f5e]">Docker</span>
                    <span className="text-slate-400">{"', '"}</span>
                    <span className="text-[#f43f5e]">AWS</span>
                    <span className="text-slate-400">{"'],"}</span>
                  </div>
                  <div>
                    <span className="ml-4 lg:ml-8 mr-2 text-slate-300">hardWorker:</span>
                    <span className="text-[#38bdf8]">true</span>
                    <span className="text-slate-400">,</span>
                  </div>
                  <div>
                    <span className="ml-4 lg:ml-8 mr-2 text-slate-300">quickLearner:</span>
                    <span className="text-[#38bdf8]">true</span>
                    <span className="text-slate-400">,</span>
                  </div>
                  <div>
                    <span className="ml-4 lg:ml-8 mr-2 text-slate-300">problemSolver:</span>
                    <span className="text-[#38bdf8]">true</span>
                    <span className="text-slate-400">,</span>
                  </div>
                  <div>
                    <span className="ml-4 lg:ml-8 mr-2 text-[#38bdf8]">hireable:</span>
                    <span className="text-[#38bdf8]">function</span>
                    <span className="text-slate-400">{'() {'}</span>
                  </div>
                  <div>
                    <span className="ml-8 lg:ml-16 mr-2 text-[#38bdf8]">return</span>
                    <span className="text-slate-400">{`(`}</span>
                  </div>
                  <div>
                    <span className="ml-12 lg:ml-24 text-[#38bdf8]">this.</span>
                    <span className="mr-2 text-white">hardWorker</span>
                    <span className="text-[#f43f5e]">&amp;&amp;</span>
                  </div>
                  <div>
                    <span className="ml-12 lg:ml-24 text-[#38bdf8]">this.</span>
                    <span className="mr-2 text-white">problemSolver</span>
                    <span className="text-[#f43f5e]">&amp;&amp;</span>
                  </div>
                  <div>
                    <span className="ml-12 lg:ml-24 text-[#38bdf8]">this.</span>
                    <span className="mr-2 text-white">skills.length</span>
                    <span className="mr-2 text-[#f43f5e]">&gt;=</span>
                    <span className="text-[#38bdf8]">5</span>
                  </div>
                  <div><span className="ml-8 lg:ml-16 mr-2 text-slate-400">{`);`}</span></div>
                  <div><span className="ml-4 lg:ml-8 text-slate-400">{`};`}</span></div>
                  <div><span className="text-slate-400">{`};`}</span></div>
                </code>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;