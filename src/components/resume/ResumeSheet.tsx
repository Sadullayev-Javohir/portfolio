"use client";

import React from "react";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { RESUME_DATA } from "@/data/resumeData";
import { useLanguage } from "@/context/LanguageContext";

export function ResumeSheet() {
  const { dict, roles } = useLanguage();
  const {
    name,
    location,
    initials,
    contacts,
    skills,
    certifications,
    languages,
  } = RESUME_DATA;

  const renderContactIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="w-3 h-3 text-muted shrink-0" />;
      case "phone":
        return <Phone className="w-3 h-3 text-muted shrink-0" />;
      case "linkedin":
        return <Linkedin className="w-3 h-3 text-muted shrink-0" />;
      case "github":
        return <Github className="w-3 h-3 text-muted shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full py-5 px-4 sm:px-8 lg:px-14 flex justify-center">
      {/* Resume Paper Container */}
      <article
        id="resume-document"
        className="max-w-[1040px] w-full bg-white border-2 border-ink rounded-[4px] shadow-[10px_10px_0px_#14110F] p-6 sm:p-9 lg:p-[44px_44px_40px_44px] print:shadow-none print:border-none print:p-0"
      >
        {/* Sheet Header */}
        <header className="flex items-start justify-between gap-6">
          <div className="flex flex-col gap-0.5">
            <h2 className="font-display text-[30px] sm:text-[38px] font-bold text-ink tracking-[-1.4px] leading-tight">
              {name}
            </h2>
            <p className="font-sans text-[14px] sm:text-[15px] font-medium text-ink-soft">
              {dict.nav.roleTag}
            </p>
            <span className="font-mono text-[9.5px] text-muted tracking-[0.4px]">
              {dict.contactPage.locationValue}
            </span>
          </div>

          <div className="w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-full bg-ink flex items-center justify-center shrink-0">
            <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-cream">
              {initials}
            </span>
          </div>
        </header>

        {/* Contacts Row */}
        <div className="mt-5 sm:mt-6 py-[14px] sm:py-[18px] border-t-2 border-b-[1.5px] border-ink flex flex-wrap items-center gap-x-6 gap-y-2.5">
          {contacts.map((c) => (
            <a
              key={c.type}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-1.5 font-mono text-[8.5px] sm:text-[9px] text-ink tracking-[0.1px] hover:underline"
            >
              {renderContactIcon(c.type)}
              <span>{c.text}</span>
            </a>
          ))}
        </div>

        {/* Sheet Body (Main Column & Sidebar) */}
        <div className="pt-6 sm:pt-[26px] flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Main Column */}
          <div className="flex-1 min-w-0 flex flex-col gap-[22px]">
            {/* Summary */}
            <p className="font-sans text-[11.5px] sm:text-[12px] text-ink-soft leading-[1.65]">
              {dict.about.bio.p1}
            </p>

            {/* Experience Section */}
            <section className="flex flex-col gap-3">
              <div className="border-b-[1.5px] border-ink pb-1 flex items-center justify-between">
                <h3 className="font-mono text-[9px] font-normal tracking-[1.5px] text-ink uppercase">
                  {dict.resumePage.experienceLabel}
                </h3>
                <span className="font-mono text-[8px] font-normal tracking-[1px] text-muted uppercase">
                  {roles.length.toString().padStart(2, "0")} {dict.resumePage.rolesCount}
                </span>
              </div>

              <div className="flex flex-col gap-3.5">
                {roles.map((job, idx) => (
                  <div key={idx} className="flex flex-col gap-1 pb-1">
                    {/* Job Head */}
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-display text-[13px] sm:text-[13.5px] font-semibold text-ink tracking-[-0.2px]">
                          {job.role}
                        </span>
                        <span className="font-sans text-[10px] sm:text-[10.5px] text-muted">
                          {job.company} · {job.place}
                        </span>
                      </div>
                      <span className="font-mono text-[8px] text-muted tracking-[0.3px] shrink-0 text-right">
                        {job.period}
                      </span>
                    </div>

                    {/* Bullets */}
                    <ul className="flex flex-col gap-1 mt-0.5">
                      {job.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-ink shrink-0 mt-[6px]" />
                          <span className="font-sans text-[9px] sm:text-[9.5px] text-ink-soft leading-[1.55]">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section className="flex flex-col gap-2 mt-1">
              <div className="border-b-[1.5px] border-ink pb-1 flex items-center justify-between">
                <h3 className="font-mono text-[9px] font-normal tracking-[1.5px] text-ink uppercase">
                  {dict.resumePage.educationLabel}
                </h3>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-display text-[13px] sm:text-[13.5px] font-semibold text-ink">
                      {dict.educationSection.degree}
                    </span>
                    <span className="font-sans text-[10px] sm:text-[10.5px] text-muted">
                      {dict.educationSection.uni}
                    </span>
                  </div>
                  <span className="font-mono text-[8px] text-muted shrink-0 text-right">
                    {dict.educationSection.years}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-[280px] shrink-0 flex flex-col gap-[18px]">
            {/* Block 1: LANGUAGES & CORE */}
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[8px] text-muted tracking-[1.2px] uppercase">
                {dict.skillsPage.filterBackend}
              </span>
              <div className="flex flex-col">
                {skills.languagesAndCore.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="font-sans text-[10px] sm:text-[10.5px] text-ink-soft leading-[1.5]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Block 2: DATABASES & CACHING */}
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[8px] text-muted tracking-[1.2px] uppercase">
                {dict.skillsPage.filterData}
              </span>
              <div className="flex flex-col">
                {skills.databasesAndCaching.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="font-sans text-[10px] sm:text-[10.5px] text-ink-soft leading-[1.5]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Block 3: REAL-TIME & DEVOPS */}
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[8px] text-muted tracking-[1.2px] uppercase">
                {dict.skillsPage.filterArch}
              </span>
              <div className="flex flex-col">
                {skills.realTimeAndDevops.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="font-sans text-[10px] sm:text-[10.5px] text-ink-soft leading-[1.5]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Block 4: CERTIFICATIONS */}
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[8px] text-muted tracking-[1.2px] uppercase">
                {dict.experiencePage.certificationsLabel}
              </span>
              <div className="flex flex-col">
                {certifications.map((cert, cIdx) => (
                  <span
                    key={cIdx}
                    className="font-sans text-[10px] sm:text-[10.5px] text-ink-soft leading-[1.5]"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Block 5: LANGUAGES */}
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[8px] text-muted tracking-[1.2px] uppercase">
                {dict.experiencePage.languagesLabel}
              </span>
              <div className="flex flex-col">
                {languages.map((l, lIdx) => (
                  <span
                    key={lIdx}
                    className="font-sans text-[10px] sm:text-[10.5px] text-ink-soft leading-[1.5]"
                  >
                    {l.name} — {l.level}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
