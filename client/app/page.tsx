import SplitText from "@/components/SplitText";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Captures_it",
};

const TextAnimationDuration = 2;

export default function Home() {
  return (
    <div className="container bg-black overflow-clip">

      {/* ── Mobile: cinematic full-bleed hero ── */}
      <div className="md:hidden relative h-[80dvh] w-full">
        {/* Full-bleed background image */}
        <Image
          src="/images/04b646384a490001c5509b162048a04163f5aa6ea27bdb29c597dcb0522cc5df.png"
          alt="Emilie Isabelle"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Top vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

        {/* Bottom gradient: dark panel for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        {/* Text overlay — pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 text-white">
          <p className="text-primary-accent text-[10px] uppercase tracking-[0.4em] mb-3 font-sans">
            Photographer · Mauritius
          </p>

          <SplitText
            text="Emilie Isabelle"
            className="font-serif text-4xl font-bold leading-tight"
            splitType="words"
            duration={TextAnimationDuration}
          />

          <div className="w-8 h-px bg-primary-accent my-4" />

          <p className="text-sm text-white/55 font-sans font-light leading-relaxed max-w-xs">
            Naturalness. Discretion. The beauty in details forgotten nowadays.
          </p>

          <Link
            href="/work"
            className="inline-flex items-center gap-3 mt-6 text-[10px] uppercase tracking-[0.35em] font-sans font-semibold text-white/80 hover:text-primary-accent transition-colors"
          >
            View Work
            <span className="w-8 h-px bg-current inline-block" />
          </Link>
        </div>
      </div>

      {/* ── Desktop: editorial side-by-side ── */}
      <div className="hidden md:flex font-sans mx-[4dvw] h-[80dvh] text-white justify-between items-center">
        <div className="flex flex-col items-start">
          <p className="text-primary-accent text-xs uppercase tracking-[0.4em] mb-4">
            Photographer · Mauritius
          </p>

          <SplitText
            text="Hi. I'm Emilie Isabelle"
            className="text-5xl uppercase font-bold"
            splitType="words"
            duration={TextAnimationDuration}
          />

          <div className="w-8 h-px bg-primary-accent mt-4 mb-6" />

          <SplitText
            text="Captured a simple expression, a simple smile, or even a moment taken
                  in complete discretion, and subsequently have a beautiful result. I
                  base myself mainly on the naturalness of the photo. We will say that
                  it is my trademark. But above all, kept the details forgotten nowadays"
            className="text-lg min-w-[60dvw] max-w-[60dvw] font-semibold text-white/80"
            splitType="lines"
            textAlign="start"
            duration={TextAnimationDuration}
          />

          <Link
            href="/work"
            className="inline-flex items-center gap-3 mt-8 text-[10px] uppercase tracking-[0.35em] font-semibold text-white/70 hover:text-primary-accent transition-colors"
          >
            View Work
            <span className="w-8 h-px bg-current inline-block" />
          </Link>
        </div>

        <div className="pointer-events-none select-none">
          <Image
            src="/images/04b646384a490001c5509b162048a04163f5aa6ea27bdb29c597dcb0522cc5df.png"
            alt="Home bg image"
            width={800}
            height={300}
            priority
            className="mt-[20dvh] ml-[4dvw]"
          />
        </div>
      </div>

    </div>
  );
}
