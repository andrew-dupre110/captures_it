import Image from "next/image";
import React from "react";
import { Mail, Phone } from "lucide-react";
import SplitText from "@/components/SplitText";
import { fetchPersonalInfo } from "@/services/personalInfo/personalInfo.service";

const page = async () => {
  const info = await fetchPersonalInfo();

  return (
    <div className="container bg-black overflow-clip">
      <div className="font-sans mx-[4dvw] py-10 md:py-0 md:h-[84dvh] text-white flex flex-col md:flex-row justify-between items-start md:items-center">

        {/* Left column */}
        <div className="flex flex-col items-start">
          <p className="text-primary-accent text-xs uppercase tracking-[0.3em] mb-4">
            Meet the Artist
          </p>
          <SplitText
            text="Emilie Isabelle"
            className="text-3xl md:text-5xl uppercase font-bold"
            splitType="words"
            duration={2}
          />
          <div className="w-8 h-px bg-primary-accent mt-4 mb-6" />
          <p className="text-base md:text-lg font-semibold text-white/70 w-full md:max-w-[50dvw]">
            {info?.professionalSummary ??
              "Emilie Isabelle is a London-based photographer with a keen eye for capturing the poetry in everyday life. Specializing in natural light, texture, and intimate moments, her work invites viewers to explore the beauty within the ordinary."}
          </p>

          {/* Experience */}
          {info?.experience && info.experience.length > 0 && (
            <div className="mt-8 flex flex-col gap-4">
              {info.experience.map((exp, i) => (
                <div key={i} className="flex gap-6 items-start">
                  {exp.year && (
                    <span className="text-primary-accent font-mono text-xs w-10 shrink-0 pt-0.5">
                      {exp.year}
                    </span>
                  )}
                  <div>
                    {exp.title && (
                      <p className="text-sm font-semibold">{exp.title}</p>
                    )}
                    {exp.description && (
                      <p className="text-xs text-white/40 mt-0.5">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contact */}
          {(info?.email || info?.telephone) && (
            <div className="flex flex-wrap gap-6 md:gap-8 text-xs text-white/30 uppercase tracking-widest mt-8">
              {info.email && (
                <span className="flex items-center gap-2">
                  <Mail size={12} />
                  {info.email}
                </span>
              )}
              {info.telephone && (
                <span className="flex items-center gap-2">
                  <Phone size={12} />
                  {info.telephone}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right column — hidden on mobile */}
        <div className="hidden md:block pointer-events-none select-none">
          <Image
            src="/images/home.jpeg"
            alt="Emilie Isabelle"
            width={550}
            height={680}
            className="mt-[10dvh]"
            priority
          />
        </div>

      </div>
    </div>
  );
};

export default page;
