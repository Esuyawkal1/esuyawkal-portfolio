"use client";

import { useEffect, useState } from "react";
import CyberParticles from "./cyber-particles";
import CyberTerminal from "./cyber-terminal";

export default function CyberShell() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const handleOpenTerminal = () => setIsTerminalOpen(true);
    const handleKeyDown = (e) => {
      // Shortcut Ctrl+` or Cmd+`
      if ((e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("cyber_open_terminal", handleOpenTerminal);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("cyber_open_terminal", handleOpenTerminal);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <CyberParticles />
      <CyberTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </>
  );
}
