import React from "react";
import { SendHorizonal} from "lucide-react"


const page = () => {

  return (
    <div className="container px-[20dvw] mt-5">
      <div className="layout-content-container flex flex-col max-w-[1200px] w-full">
        <div className="flex flex-col gap-6 mb-10">
          <h1 className="text-[#141118] dark:text-white text-4xl md:text-5xl font-light tracking-tight text-primary-accent">
            Let&apos;s capture it.
          </h1>
          <p className="text-[#756189] dark:text-gray-400 text-lg font-light leading-relaxed max-w-xl">
            Whether you&apos;re planning an editorial shoot or looking to capture
            life&apos;s quietest moments, I&apos;d love to hear from you.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32">
          <div className="lg:col-span-7">
            <form className="flex flex-col gap-12">
              <div className="flex flex-col gap-12 md:flex-row">
                <label className="flex flex-col flex-1 gap-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#756189]">
                    Name
                  </span>
                  <input
                    className="minimal-input text-lg font-light placeholder:text-[#756189]/30 focus:outline-none"
                    placeholder="Full name"
                    type="text"
                  />
                </label>
                <label className="flex flex-col flex-1 gap-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#756189]">
                    Email
                  </span>
                  <input
                    className="minimal-input text-lg font-light placeholder:text-[#756189]/30 focus:outline-none"
                    placeholder="hello@example.com"
                    type="email"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#756189]">
                  Subject
                </span>
                <input
                  className="minimal-input text-lg font-light placeholder:text-[#756189]/30 focus:outline-none"
                  placeholder="What are we creating?"
                  type="text"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#756189]">
                  Message
                </span>
                <textarea
                  className="minimal-input min-h-[120px] resize-none text-lg font-light placeholder:text-[#756189]/30 py-4 focus:outline-none"
                  placeholder="Tell me more about your vision..."
                ></textarea>
              </label>
              <div className="pt-6">
                <button
                  className="cursor-pointer rounded-sm group flex items-center justify-between w-full md:w-auto md:min-w-[240px] border border-[#141118] dark:border-white text-[#141118] dark:text-white px-8 py-5 text-xs uppercase tracking-[0.3em] font-bold hover:bg-primary-accent hover:border-none hover:rounded-md hover:text-white dark:hover:bg-white dark:hover:text-background-dark transition-all duration-300"
                  type="submit"
                >
                  <span>Send Message</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    <SendHorizonal />
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/**
           * -----
           *  Side bar section with links and aditional info
           * -----
           * **/}

          <div className="lg:col-span-5 flex flex-col justify-between lg:pl-12">
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-6">
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#756189]">
                  Inquiries
                </h4>
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-light hover:text-primary-dark transition-colors cursor-pointer">
                    emilie.isabelle04@gmail.com
                  </p>
                  <p className="text-xl font-light">+230 500 - 000 - 00</p>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#756189]">
                  Studio
                </h4>
                <p className="text-xl font-light leading-relaxed">-</p>
              </div>
              <div className="flex flex-col gap-6">
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#756189]">
                  Socials
                </h4>
                <div className="flex flex-col gap-3">
                  <a
                    className="text-lg font-light hover:text-primary-dark transition-all w-fit border-b border-transparent hover:border-primary-dark"
                    href="https://www.instagram.com/captures_it/#"
                    target="_blank"
                  >
                    Instagram
                  </a>
                  <a
                    className="text-lg font-light hover:text-primary-dark transition-all w-fit border-b border-transparent hover:border-primary-dark"
                    href="#"
                    target="_blank"
                  >
                    Pinterest
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
