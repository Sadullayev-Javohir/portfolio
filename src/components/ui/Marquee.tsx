"use client";

import React from "react";
import {
  CSharpIcon,
  DotNetIcon,
  AspNetCoreIcon,
  PostgreSqlIcon,
  RedisIcon,
  DockerIcon,
  SignalRIcon,
  EfCoreIcon,
  CleanArchIcon,
  AzureIcon,
  GitIcon,
  MsSqlIcon,
  LinuxIcon,
  HangfireIcon,
  WebSocketsIcon,
  XUnitIcon,
  PostmanIcon,
  TelegramIconSvg,
  MediatRIcon,
  SerilogIcon,
} from "./icons/TechIcons";

interface StackItem {
  name: string;
  category: string;
  icon: React.ReactNode;
}

export function Marquee() {
  const stackItems: StackItem[] = [
    { name: "C#", category: "Language", icon: <CSharpIcon className="w-5 h-5 shrink-0" /> },
    { name: ".NET 8", category: "Framework", icon: <DotNetIcon className="w-5 h-5 shrink-0" /> },
    { name: "ASP.NET Core", category: "Web APIs", icon: <AspNetCoreIcon className="w-5 h-5 shrink-0" /> },
    { name: "PostgreSQL", category: "Database", icon: <PostgreSqlIcon className="w-5 h-5 shrink-0" /> },
    { name: "Redis", category: "Cache / PubSub", icon: <RedisIcon className="w-5 h-5 shrink-0" /> },
    { name: "Docker", category: "DevOps", icon: <DockerIcon className="w-5 h-5 shrink-0" /> },
    { name: "SignalR", category: "Real-Time", icon: <SignalRIcon className="w-5 h-5 shrink-0" /> },
    { name: "Clean Architecture", category: "Design", icon: <CleanArchIcon className="w-5 h-5 shrink-0" /> },
    { name: "EF Core", category: "ORM", icon: <EfCoreIcon className="w-5 h-5 shrink-0" /> },
    { name: "Azure Speech & AI", category: "AI / Cloud", icon: <AzureIcon className="w-5 h-5 shrink-0" /> },
    { name: "Git & GitHub", category: "VCS", icon: <GitIcon className="w-5 h-5 shrink-0" /> },
    { name: "SQL Server", category: "Database", icon: <MsSqlIcon className="w-5 h-5 shrink-0" /> },
    { name: "Linux / Bash", category: "Systems", icon: <LinuxIcon className="w-5 h-5 shrink-0" /> },
    { name: "Hangfire", category: "Workers", icon: <HangfireIcon className="w-5 h-5 shrink-0" /> },
    { name: "WebSockets", category: "Sockets", icon: <WebSocketsIcon className="w-5 h-5 shrink-0" /> },
    { name: "xUnit", category: "Testing", icon: <XUnitIcon className="w-5 h-5 shrink-0" /> },
    { name: "Postman", category: "API Testing", icon: <PostmanIcon className="w-5 h-5 shrink-0" /> },
    { name: "Telegram Bot API", category: "Integrations", icon: <TelegramIconSvg className="w-5 h-5 shrink-0" /> },
    { name: "MediatR & CQRS", category: "Patterns", icon: <MediatRIcon className="w-5 h-5 shrink-0" /> },
    { name: "Serilog", category: "Telemetry", icon: <SerilogIcon className="w-5 h-5 shrink-0" /> },
  ];

  return (
    <div className="w-full bg-ink py-3 sm:py-3.5 overflow-hidden border-y-2 border-ink select-none relative group/slider">
      {/* Subtle edge fades for smooth ticker effect */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />

      <div
        className="flex w-max animate-marquee gap-4 sm:gap-5 items-center group-hover/slider:[animation-play-state:paused]"
        style={{ animationDuration: "42s" }}
      >
        {/* Render twice for continuous loop */}
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} className="flex items-center gap-4 sm:gap-5 shrink-0">
            {stackItems.map((tech) => (
              <div
                key={`${copyIndex}-${tech.name}`}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#1B1715] border border-[#3A342E] shadow-[2px_2px_0px_#000000] hover:border-yellow hover:bg-[#25201C] hover:shadow-[3px_3px_0px_#FFC940] hover:-translate-y-0.5 transition-all duration-200 cursor-default group shrink-0"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0 drop-shadow-sm group-hover:scale-110 transition-transform duration-200">
                  {tech.icon}
                </div>
                <span className="font-mono text-xs sm:text-[13px] font-bold text-cream tracking-[0.4px] uppercase whitespace-nowrap group-hover:text-yellow transition-colors">
                  {tech.name}
                </span>
                <span className="text-yellow/40 text-xs font-bold pl-0.5">✳</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
