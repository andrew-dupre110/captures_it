"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`min-h-[8dvh] max-h-[8dvh] w-[100%] bg-black text-white relative z-50`}>
      <div className="flex py-4 px-6 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <Image
            src={"/images/logo.jpg"}
            alt="logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h2 className="text-2xl font-bold font-serif">Captures_it</h2>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-4 font-sans font-semibold">
          <Link href="/about">About</Link>
          <Link href="/work">Work</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black border-t border-white/10 flex flex-col font-sans font-semibold text-lg">
          <Link href="/about" className="px-6 py-4 hover:text-primary-accent transition-colors" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/work" className="px-6 py-4 hover:text-primary-accent transition-colors" onClick={() => setMenuOpen(false)}>Work</Link>
          <Link href="/contact" className="px-6 py-4 hover:text-primary-accent transition-colors" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
