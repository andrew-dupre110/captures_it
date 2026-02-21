import { usePathname } from "next/navigation";
import React from "react";
import { siInstagram } from "simple-icons";

const Footer = () => {
  const pathname = usePathname();
  const isHomePage = pathname == "/";

  return (
    <div className={`min-h-[8dvh] max-h-[8dvh] border-t-1 border-text-secondary/10 flex items-center py-4  px-[2dvw] justify-between ${isHomePage && 'bg-black'} `}>
      <p className="text-text-secondary font-light text-xs">
        <span className="text-focus font-bold">captures_it</span> / ©
        {new Date().getFullYear().toString()} Emilie Isabelle
      </p>

      <div className="flex items-center gap-6">
        <a href="https://www.instagram.com/captures_it/#" target="_blank">
          <img
            src={`https://cdn.simpleicons.org/${siInstagram.slug}/6B6B6B`}
            alt={siInstagram.title}
            height={25}
            width={25}
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
