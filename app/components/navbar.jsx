// @flow strict
"use client";

import Link from "next/link";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "ABOUT", href: "/#about" },
    { label: "EXPERIENCE", href: "/#experience" },
    { label: "SKILLS", href: "/#skills" },
    { label: "EDUCATION", href: "/#education" },
    { label: "BLOGS", href: "/blog" },
    { label: "PROJECTS", href: "/#projects" },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full backdrop-blur-md bg-[#0d1224]/90 border-b border-white/5 transition-all">
      <div className="flex items-center justify-between py-4">
        {/* Brand / Logo */}
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className="group flex items-center font-mono text-2xl sm:text-3xl font-extrabold tracking-wider"
          >
            <span className="text-[#f43f5e] transition-transform group-hover:-translate-x-1 duration-200">
              &lt;
            </span>
            <span className="text-white group-hover:text-[#f43f5e] transition-colors">
              Esuyawkal
            </span>
            <span className="text-[#f43f5e] transition-transform group-hover:translate-x-1 duration-200">
              /&gt;
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-lg text-gray-300 hover:text-[#f43f5e] hover:bg-white/5 transition-colors"
          >
            {isOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center">
          <ul className="flex items-center space-x-1 text-sm font-semibold tracking-wider font-mono">
            {navLinks.map((item, idx) => (
              <li key={idx}>
                <Link
                  className="block px-4 py-2 text-gray-300 hover:text-[#f43f5e] transition-colors duration-200 relative group"
                  href={item.href}
                >
                  <span>{item.label}</span>
                  <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-[#f43f5e] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0d1224]/95 backdrop-blur-xl px-4 py-4 space-y-2 animate-fadeIn font-mono">
          {navLinks.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-gray-200 hover:bg-white/5 hover:text-[#f43f5e] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;