import React from "react";
import { CERTIFICATIONS } from "@/data/skillsData";

export function CertsStrip() {
  return (
    <section className="w-full bg-white border-y-2 border-ink">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-11 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-10">
        {/* Left Section */}
        <div className="w-full lg:w-[420px] shrink-0 flex flex-col gap-1.5">
          <span className="font-mono text-[10.5px] uppercase tracking-[1.6px] text-muted font-semibold">
            VERIFIED
          </span>
          <h3 className="font-display text-2xl font-semibold text-ink tracking-tight">
            Certifications &amp; languages.
          </h3>
        </div>

        {/* Certs List */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 w-full">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={`${cert.title}-${cert.sub}`}
              className="flex flex-col gap-1 p-3 rounded-lg border-2 border-transparent hover:border-ink/20 transition-all hover:bg-cream/40"
            >
              <h4 className="font-sans text-[13px] font-semibold text-ink leading-tight">
                {cert.title}
              </h4>
              <p className="font-mono text-[8.5px] tracking-wider text-muted uppercase">
                {cert.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
