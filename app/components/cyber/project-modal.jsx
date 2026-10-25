"use client";

import { useEffect, useState } from "react";
import {
  FiX,
  FiExternalLink,
  FiGithub,
  FiMonitor,
  FiTablet,
  FiSmartphone,
  FiCheckCircle,
  FiCpu,
  FiCode,
} from "react-icons/fi";

export default function ProjectModal({ project, onClose }) {
  const [device, setDevice] = useState("desktop"); // desktop, tablet, mobile
  const [activeTab, setActiveTab] = useState("preview"); // preview, overview, architecture

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#0d1224]/95 border border-[#1b2c68] shadow-[0_0_50px_rgba(244,63,94,0.15)] overflow-hidden transition-all">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1b2c68]/80 bg-[#101533]">
          <div className="flex items-center gap-3">
            <div className="flex space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            </div>
            <h3 id="project-modal-title" className="text-lg sm:text-xl font-bold text-white tracking-wide flex items-center gap-2">
              <span className="text-[#f43f5e]">{project.name}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {project.role}
              </span>
            </h3>
          </div>

          <button
            onClick={() => {
              onClose();
            }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Subheader Controls (Tabs & Device Switcher) */}
        <div className="flex flex-wrap items-center justify-between px-6 py-3 border-b border-[#1b2c68]/60 bg-[#0a0e24] gap-2">
          {/* Tabs */}
          <div className="flex items-center gap-2">
            {[
              { id: "preview", label: "Interactive Simulation", icon: FiCpu },
              { id: "overview", label: "Overview & Specs", icon: FiCode },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === tab.id
                      ? "bg-[#f43f5e] text-white shadow-md"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Device viewport toggle */}
          {activeTab === "preview" && (
            <div className="flex items-center bg-[#131b3e] rounded-lg p-1 border border-white/5">
              {[
                { id: "desktop", icon: FiMonitor, label: "Desktop" },
                { id: "tablet", icon: FiTablet, label: "Tablet" },
                { id: "mobile", icon: FiSmartphone, label: "Mobile" },
              ].map((d) => {
                const Icon = d.icon;
                return (
                  <button
                    key={d.id}
                    title={d.label}
                    onClick={() => {
                      setDevice(d.id);
                    }}
                    className={`p-1.5 rounded transition-colors ${
                      device === d.id
                        ? "bg-[#f43f5e] text-white font-bold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {activeTab === "preview" ? (
            <div className="flex flex-col items-center">
              {/* Simulated Device Frame */}
              <div
                className={`transition-all duration-300 border border-slate-700/80 rounded-xl overflow-hidden bg-[#0b1022] shadow-2xl ${
                  device === "desktop"
                    ? "w-full max-w-full"
                    : device === "tablet"
                    ? "w-full max-w-md"
                    : "w-full max-w-xs"
                }`}
              >
                {/* Browser/Device Bar */}
                <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400/80 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-yellow-400/80 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-green-400/80 inline-block" />
                  </div>
                  <span className="truncate max-w-[200px] text-slate-400 font-mono text-[11px] bg-slate-950 px-3 py-0.5 rounded-full border border-slate-800">
                    https://{project.name.toLowerCase().replace(/\s+/g, "-")}.dev
                  </span>
                  <span className="text-[10px] text-emerald-400">● LIVE</span>
                </div>

                {/* Simulated Interactive UI Mockup */}
                <div className="p-5 space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#f43f5e]">
                        Simulated Application Engine
                      </span>
                      <span className="text-xs text-purple-400 font-mono">
                        Latency: 18ms
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Interactive Feature Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#f43f5e]/40 transition-colors">
                      <div className="flex items-center gap-2 text-sm font-semibold text-white mb-1">
                        <FiCheckCircle className="text-[#f43f5e]" />
                        <span>High-Performance Backend</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        Optimized database indexing, microservice architecture, and sub-second response times.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#38bdf8]/40 transition-colors">
                      <div className="flex items-center gap-2 text-sm font-semibold text-white mb-1">
                        <FiCheckCircle className="text-[#38bdf8]" />
                        <span>Interactive UI & UX</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        Fluid micro-animations, accessible responsive components, and glassmorphic aesthetics.
                      </p>
                    </div>
                  </div>

                  {/* Interactive Terminal Log Sample */}
                  <div className="p-3 rounded-lg bg-black/70 border border-emerald-500/30 font-mono text-xs text-emerald-400">
                    <div className="flex items-center gap-2 mb-1 text-slate-400 border-b border-white/10 pb-1">
                      <span>$ system-diagnostics --status</span>
                    </div>
                    <div>&gt; [SUCCESS] API routes initialized</div>
                    <div>&gt; [INFO] Services running: {project.tools.slice(0, 4).join(", ")}</div>
                    <div>&gt; [ACTIVE] 100% test coverage verified</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Overview Tab */
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#f43f5e] mb-2">
                  Project Summary
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#38bdf8] mb-3">
                  Technologies & Frameworks Deployed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-xs rounded-lg font-mono font-medium bg-[#f43f5e]/10 text-[#f43f5e] border border-[#f43f5e]/30 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#38bdf8] mb-2">
                  Key Role & Responsibilities
                </h4>
                <div className="p-4 rounded-xl bg-[#101735] border border-[#1b2c68] text-sm text-gray-300">
                  Led development as <strong className="text-white">{project.role}</strong>, implementing scalable architecture, RESTful/GraphQL APIs, real-time socket interfaces, and seamless third-party cloud integrations.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#1b2c68]/80 bg-[#101533]">
          <div className="flex items-center gap-3">
            {project.code && (
              <a
                href={project.code}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors"
              >
                <FiGithub />
                <span>Source Code</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#f43f5e] hover:bg-[#e11d48] transition-colors"
              >
                <FiExternalLink />
                <span>Live Site</span>
              </a>
            )}
          </div>

          <button
            onClick={() => {
              onClose();
            }}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
