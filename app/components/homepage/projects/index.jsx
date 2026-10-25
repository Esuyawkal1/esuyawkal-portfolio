"use client";

import { useState } from "react";
import { projectsData } from "@/utils/data/projects-data";
import ProjectCard from "./project-card";
import ProjectModal from "@/app/components/cyber/project-modal";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div id="projects" className="relative z-10 my-12 lg:my-24">
      {/* Top Section Header */}
      <div className="sticky top-20 z-20">
        <div className="w-[100px] h-[100px] bg-violet-500 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl opacity-30"></div>
        <div className="flex items-center justify-between relative bg-[#0d1224]/80 backdrop-blur-md py-2 px-1">
          <div className="flex items-center gap-3">
            <span className="bg-[#101735] text-[#f43f5e] font-bold px-6 py-2.5 text-lg sm:text-xl rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.15)] font-mono">
              PROJECTS
            </span>
           
          </div>
          <span className="flex-1 h-[2px] bg-[#1b2c68] ml-4"></span>
        </div>
      </div>

      <div className="pt-20">
        <div className="flex flex-col gap-8">
          {projectsData.slice(0, 4).map((project, index) => (
            <div
              id={`sticky-card-${index + 1}`}
              key={index}
              className="sticky-card w-full mx-auto max-w-3xl sticky"
            >
              <div className="box-border flex items-center justify-center rounded-xl shadow-[0_0_35px_0_rgba(0,0,0,0.4)] transition-all duration-300">
                <ProjectCard
                  project={project}
                  onOpen={(p) => setSelectedProject(p)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Project Preview Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default Projects;