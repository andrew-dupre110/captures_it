import React from "react";
import { SendHorizonal } from "lucide-react";
import SplitText from "@/components/SplitText";
import AnimatedContent from "@/components/AnimatedContent";

const page = () => {
  return (
    <div className="container bg-black overflow-clip">
      <div className="font-sans mx-[4dvw] h-[84dvh] text-white flex justify-between items-center gap-16">

        {/* Left — form */}
        <div className="flex flex-col items-start flex-1 max-w-[55dvw]">
          <AnimatedContent distance={30} duration={0.8}>
            <p className="text-primary-accent text-xs uppercase tracking-[0.3em] mb-4">
              Get in Touch
            </p>
            <SplitText
              text="Let's capture it."
              className="text-5xl uppercase font-bold"
              splitType="words"
              duration={2}
              tag="h1"
              textAlign="start"
            />
            <div className="w-8 h-px bg-primary-accent mt-4 mb-6" />
            <p className="text-lg font-semibold text-white/70 max-w-xl mb-8">
              Whether you&apos;re planning an editorial shoot or looking to
              capture life&apos;s quietest moments, I&apos;d love to hear from
              you.
            </p>
          </AnimatedContent>

          <AnimatedContent distance={30} duration={0.8} delay={0.25} className="w-full">
            <form className="flex flex-col gap-8 w-full">
              <div className="flex gap-8">
                <label className="flex flex-col flex-1 gap-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/30">
                    Name
                  </span>
                  <input
                    className="minimal-input text-base font-semibold placeholder:font-light placeholder:text-white/20"
                    placeholder="Full name"
                    type="text"
                  />
                </label>
                <label className="flex flex-col flex-1 gap-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/30">
                    Email
                  </span>
                  <input
                    className="minimal-input text-base font-semibold placeholder:font-light placeholder:text-white/20"
                    placeholder="hello@example.com"
                    type="email"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.3em] text-white/30">
                  Subject
                </span>
                <input
                  className="minimal-input text-base font-semibold placeholder:font-light placeholder:text-white/20"
                  placeholder="What are we creating?"
                  type="text"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.3em] text-white/30">
                  Message
                </span>
                <textarea
                  className="minimal-input min-h-[100px] resize-none text-base font-semibold placeholder:font-light placeholder:text-white/20 py-3"
                  placeholder="Tell me more about your vision..."
                />
              </label>

              <div className="pt-2">
                <button
                  type="submit"
                  className="group flex items-center gap-4 border border-white/25 text-white px-8 py-4 text-xs uppercase tracking-[0.3em] font-bold hover:bg-primary-accent hover:border-primary-accent transition-all duration-300 cursor-pointer"
                >
                  <span>Send Message</span>
                  <SendHorizonal
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </div>
            </form>
          </AnimatedContent>
        </div>

        {/* Right — sidebar */}
        <AnimatedContent
          distance={30}
          duration={0.8}
          delay={0.4}
          className="flex flex-col gap-12 self-center shrink-0"
        >
          <div className="flex flex-col gap-4">
            <p className="text-primary-accent text-xs uppercase tracking-[0.3em]">
              Inquiries
            </p>
            <div className="w-8 h-px bg-primary-accent" />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-white">
                emilie.isabelle04@gmail.com
              </p>
              <p className="text-xs text-white/40">+230 500 - 000 - 00</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-primary-accent text-xs uppercase tracking-[0.3em]">
              Socials
            </p>
            <div className="w-8 h-px bg-primary-accent" />
            <div className="flex flex-col gap-2">
              <a
                className="text-sm font-semibold text-white hover:text-primary-accent transition-colors"
                href="https://www.instagram.com/captures_it/#"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                className="text-sm font-semibold text-white hover:text-primary-accent transition-colors"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                Pinterest
              </a>
            </div>
          </div>
        </AnimatedContent>

      </div>
    </div>
  );
};

export default page;
