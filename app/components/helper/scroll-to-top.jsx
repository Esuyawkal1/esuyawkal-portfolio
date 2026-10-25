"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const SCROLL_THRESHOLD = 500;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll, { passive: true });
    };
  }, []);

  const onClickBtn = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Scroll back to top"
      onClick={onClickBtn}
      className={`fixed bottom-8 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-[#f43f5e] text-white hover:bg-[#e11d48] shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all duration-300 ease-out hover:scale-110 active:scale-95 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <FaArrowUp className="w-4 h-4" />
    </button>
  );
};

export default ScrollToTop;
