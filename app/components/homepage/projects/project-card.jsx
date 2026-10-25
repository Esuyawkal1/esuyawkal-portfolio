// @flow strict
"use client";

import * as React from "react";
import TiltCard from "@/app/components/cyber/tilt-card";
import { FiEye, FiCpu } from "react-icons/fi";

function ProjectCard({ project, onOpen }) {
  return (
    <TiltCard
      maxTilt={6}
      scale={1.01}
      className="w-full cursor-pointer group"
      onClick={() => {
        if (onOpen) onOpen(project);
      }}
    >
      <div className="bg-[#0b1022] border border-[#1b2c68] relative rounded-xl backdrop-blur-xl w-full transition-all duration-300 group-hover:border-[#f43f5e]/50 shadow-[0_4px_25px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Solid Accent Line */}
        <div className="h-[2px] w-full bg-[#f43f5e]"></div>

        {/* Card Header */}
        <div className="px-4 lg:px-8 py-3.5 lg:py-4 flex items-center justify-between border-b border-[#1b2c68]/80 bg-[#080d1c]">
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-700"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-slate-700"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-slate-700"></div>
            <span className="ml-2 text-xs font-mono text-slate-400 uppercase tracking-widest">
              Project #{project.id}
            </span>
          </div>

          <p className="text-center text-[#f43f5e] font-bold text-base lg:text-lg tracking-wide group-hover:text-white transition-colors">
            {project.name}
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onOpen) onOpen(project);
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f43f5e]/10 text-[#f43f5e] border border-[#f43f5e]/30 hover:bg-[#f43f5e] hover:text-white transition-all shadow-sm"
          >
            <FiEye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Inspect Live</span>
          </button>
        </div>

        {/* Code Content - Two Cohesive Accents */}
        <div className="overflow-hidden px-4 lg:px-8 py-4 lg:py-6">
          <code className="font-mono text-xs md:text-sm lg:text-base leading-relaxed">
            <div className="blink">
              <span className="mr-2 text-[#38bdf8]">const</span>
              <span className="mr-2 text-white">project</span>
              <span className="mr-2 text-slate-400">=</span>
              <span className="text-slate-400">{'{'}</span>
            </div>
            <div>
              <span className="ml-4 lg:ml-8 mr-2 text-slate-300">name:</span>
              <span className="text-slate-400">{`'`}</span>
              <span className="text-[#f43f5e]">{project.name}</span>
              <span className="text-slate-400">{`',`}</span>
            </div>

            <div className="ml-4 lg:ml-8 mr-2">
              <span className="text-slate-300">tools:</span>
              <span className="text-slate-400">{` ['`}</span>
              {project.tools.map((tag, i) => (
                <React.Fragment key={i}>
                  <span className="text-[#f43f5e]">{tag}</span>
                  {project.tools?.length - 1 !== i && (
                    <span className="text-slate-400">{`', '`}</span>
                  )}
                </React.Fragment>
              ))}
              <span className="text-slate-400">{"],"}</span>
            </div>
            <div>
              <span className="ml-4 lg:ml-8 mr-2 text-slate-300">myRole:</span>
              <span className="text-[#38bdf8]">{project.role}</span>
              <span className="text-slate-400">,</span>
            </div>
            <div className="ml-4 lg:ml-8 mr-2">
              <span className="text-slate-300">Description:</span>
              <span className="text-[#38bdf8]">{' ' + project.description}</span>
              <span className="text-slate-400">,</span>
            </div>
            <div>
              <span className="text-slate-400">{`};`}</span>
            </div>
          </code>

          {/* Interactive footer bar */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-[#f43f5e]">
              <FiCpu /> Click to launch interactive simulation
            </span>
            <span className="font-mono text-[11px] text-slate-400">
              {project.tools.length} tech stacks
            </span>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export default ProjectCard;