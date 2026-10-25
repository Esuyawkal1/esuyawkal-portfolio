"use client";

import { useEffect, useRef, useState } from "react";
import { soundFx } from "./sound-effects";
import { personalData } from "@/utils/data/personal-data";
import { FiX, FiTerminal } from "react-icons/fi";

export default function CyberTerminal({ isOpen, onClose }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { text: "⚡ Cyber Terminal v2.5.0 Initialized.", type: "system" },
    { text: "Type 'help' to inspect available commands.", type: "system" },
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      soundFx.playWarp();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    soundFx.playClick();
    const newHistory = [...history, { text: `$ ${trimmed}`, type: "command" }];
    const cmd = trimmed.toLowerCase();

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    switch (cmd) {
      case "help":
        newHistory.push({
          text: `AVAILABLE COMMANDS:
  help       - List available commands
  about      - Display developer bio & specs
  skills     - Display core tech competencies
  projects   - Show highlighted engineering projects
  contact    - Retrieve direct transmission channels
  overdrive  - Toggle Crazy Overdrive Cyber Mode
  sudo hire  - Instant recruiter qualification handshake
  clear      - Clear the console display
  exit       - Close cyber terminal`,
          type: "output",
        });
        break;

      case "about":
        newHistory.push({
          text: `DEV PROFILE: ${personalData.name}
DESIGNATION: ${personalData.designation}
LOCATION:    ${personalData.address}
MISSION:     ${personalData.description}`,
          type: "output",
        });
        break;

      case "skills":
        newHistory.push({
          text: `CORE STACK:
  [====================] React / Next.js
  [=================== ] TypeScript / Node.js
  [==================  ] TailwindCSS / SCSS
  [==================  ] MongoDB / MySQL / PostgreSQL
  [=================   ] Docker / AWS Cloud Services
  [====================] Problem Solving & Clean Code`,
          type: "output",
        });
        break;

      case "projects":
        newHistory.push({
          text: `FEATURED PROJECTS:
  1. AI Powered e-commerce app (Node, Express, OpenAI, AWS)
  2. Travel Agency App (Next.js, NestJS, TypeScript, AWS)
  3. AI Powered Real Estate (React, OpenAI, Replicate, Stripe)
  4. Newsroom Management (NextJS, Redux, Material UI)`,
          type: "output",
        });
        break;

      case "contact":
        newHistory.push({
          text: `DIRECT CHANNELS:
  Email:    ${personalData.email}
  Phone:    ${personalData.phone}
  GitHub:   ${personalData.github}
  LinkedIn: ${personalData.linkedIn}`,
          type: "output",
        });
        break;

      case "overdrive":
        window.dispatchEvent(new CustomEvent("cyber_overdrive_toggle", { detail: true }));
        document.documentElement.classList.toggle("cyber-overdrive");
        soundFx.playWarp();
        newHistory.push({
          text: "🚀 [OVERDRIVE ENGAGED] Hyper-speed particle mesh activated!",
          type: "success",
        });
        break;

      case "sudo hire":
      case "sudo hire-me":
      case "hire":
        soundFx.playSuccess();
        newHistory.push({
          text: "🎉 ACCESS GRANTED! Outstanding choice. Initializing onboarding sequence...",
          type: "success",
        });
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "exit":
      case "quit":
        onClose();
        return;

      default:
        newHistory.push({
          text: `Command not recognized: '${trimmed}'. Type 'help' for valid commands.`,
          type: "error",
        });
        break;
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIdx + 1 < commandHistory.length ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx] || "");
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput("");
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl h-[480px] flex flex-col rounded-xl bg-slate-950/95 border border-[#f43f5e]/40 shadow-[0_0_40px_rgba(244,63,94,0.2)] font-mono text-sm overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FiTerminal className="text-[#f43f5e]" />
            <span className="text-xs text-gray-300 font-bold uppercase tracking-wider">
              bash -- guest@developer-portfolio:~
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-gray-400 hover:text-white hover:bg-white/10"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Output */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 text-xs sm:text-sm">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`whitespace-pre-wrap leading-relaxed ${
                line.type === "command"
                  ? "text-[#f43f5e] font-bold"
                  : line.type === "error"
                  ? "text-red-400"
                  : line.type === "success"
                  ? "text-emerald-300 font-semibold"
                  : line.type === "system"
                  ? "text-purple-400"
                  : "text-gray-300"
              }`}
            >
              {line.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 border-t border-slate-800">
          <span className="text-[#f43f5e] font-bold">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help'..."
            className="flex-1 bg-transparent text-white outline-none placeholder:text-gray-600 font-mono text-xs sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
