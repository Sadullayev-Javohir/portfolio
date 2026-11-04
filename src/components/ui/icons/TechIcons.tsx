import React from "react";

export function CSharpIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 21,7.2 21,16.8 12,22 3,16.8 3,7.2" fill="#9B4993" stroke="#14110F" strokeWidth="1" />
      <path d="M12.2 8c-2.2 0-3.8 1.6-3.8 4s1.6 4 3.8 4c1.4 0 2.6-.7 3.2-1.8l-1.5-.9c-.4.6-1 1-1.7 1-1.2 0-2.1-.9-2.1-2.3s.9-2.3 2.1-2.3c.7 0 1.3.4 1.7 1l1.5-.9c-.6-1.1-1.8-1.8-3.2-1.8z" fill="#FFFFFF" />
      <path d="M16 10h.8v1.2H16v1.4h.8v1.2H16v1.2h-.9v-1.2h-1.2v1.2h-.9v-1.2h-.8V12.6h.8v-1.4h-.8V10h.8V8.8h.9V10h1.2V8.8h.9V10zm-.9 1.2h-1.2v1.4h1.2v-1.4z" fill="#FFFFFF" />
    </svg>
  );
}

export function DotNetIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#512BD4" stroke="#14110F" strokeWidth="1" />
      <circle cx="5.5" cy="15.5" r="1.2" fill="#FFFFFF" />
      <path d="M8 16.5V7.5h1.8l3 5.3V7.5h1.6v9h-1.6L9.8 11.2v5.3H8z" fill="#FFFFFF" />
      <path d="M16 16.5V7.5h3.6v1.4H17.8v2.2h1.6v1.4h-1.6v2.6h2.2v1.4H16z" fill="#FFFFFF" />
    </svg>
  );
}

export function AspNetCoreIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#0078D4" stroke="#14110F" strokeWidth="1" />
      <circle cx="12" cy="12" r="7" stroke="#FFFFFF" strokeWidth="1.6" />
      <path d="M5 12h14M12 5c2 2.3 3.1 4.5 3.1 7s-1.1 4.7-3.1 7c-2-2.3-3.1-4.5-3.1-7s1.1-4.7 3.1-7z" stroke="#FFFFFF" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="2" fill="#FFC940" />
    </svg>
  );
}

export function PostgreSqlIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#336791" stroke="#14110F" strokeWidth="1" />
      <path d="M12 5.5c-3.2 0-5.8 2.2-5.8 5.2 0 1.6.8 3.1 2 4.1-.2 1-.6 2-1.5 2.7 1.4 0 2.8-.7 3.7-1.7.7.2 1.4.3 2.1.3 3.5 0 6.3-2.4 6.3-5.4S16.1 5.5 12 5.5z" fill="#FFFFFF" />
      <path d="M10.8 11.2a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" fill="#336791" />
      <path d="M13 14c-.8 0-1.8.8-1.8 1.8 0 .8.6 1.4 1.4 1.4h1c.8 0 1.4-.6 1.4-1.4 0-1-1-1.8-2-1.8z" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}

export function RedisIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#DC382D" stroke="#14110F" strokeWidth="1" />
      <path d="M12 4.5l6.5 3.3-6.5 3.3-6.5-3.3L12 4.5z" fill="#FFFFFF" />
      <path d="M5.5 10.8l6.5 3.3 6.5-3.3M5.5 14.3l6.5 3.3 6.5-3.3" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7.8" r="1" fill="#DC382D" />
    </svg>
  );
}

export function DockerIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#2496ED" stroke="#14110F" strokeWidth="1" />
      <rect x="5.5" y="10.5" width="2" height="1.8" rx="0.3" fill="#FFFFFF" />
      <rect x="8" y="10.5" width="2" height="1.8" rx="0.3" fill="#FFFFFF" />
      <rect x="10.5" y="10.5" width="2" height="1.8" rx="0.3" fill="#FFFFFF" />
      <rect x="8" y="8.2" width="2" height="1.8" rx="0.3" fill="#FFFFFF" />
      <rect x="10.5" y="8.2" width="2" height="1.8" rx="0.3" fill="#FFFFFF" />
      <rect x="13" y="10.5" width="2" height="1.8" rx="0.3" fill="#FFFFFF" />
      <path d="M4 13.5c.3 0 1.8-.1 2.8.6.9.7 2.2.7 3.1 0 1-.7 2.3-.7 3.2 0 1 .7 2.3.7 3.2 0 .6-.4 1.5-.6 2.7-.4.5-.4 1-.2 1.3.3.4.6.3 1.4-.2 1.9-1.2 1.2-2.8 1.9-4.5 1.9H7.5C5.5 17.8 4 16.2 4 14v-.5z" fill="#FFFFFF" />
    </svg>
  );
}

export function SignalRIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#E65100" stroke="#14110F" strokeWidth="1" />
      <path d="M5.5 17.5a8.5 8.5 0 0 1 0-11" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8.5 14.8a5 5 0 0 1 0-5.6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.2" fill="#FFC940" />
      <path d="M15.5 9.2a5 5 0 0 1 0 5.6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18.5 6.5a8.5 8.5 0 0 1 0 11" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function EfCoreIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#68217A" stroke="#14110F" strokeWidth="1" />
      <circle cx="7" cy="8" r="2" fill="#FFFFFF" />
      <circle cx="17" cy="8" r="2" fill="#FFFFFF" />
      <circle cx="12" cy="16.5" r="2.5" fill="#FFC940" stroke="#14110F" strokeWidth="0.8" />
      <path d="M7 8l5 8.5L17 8M7 8h10" stroke="#FFFFFF" strokeWidth="1.5" />
    </svg>
  );
}

export function CleanArchIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#14110F" stroke="#FFC940" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="7.5" stroke="#7BE0AD" strokeWidth="1.5" strokeDasharray="2.5 2" />
      <circle cx="12" cy="12" r="4.8" stroke="#4F7CFF" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" fill="#FFC940" />
    </svg>
  );
}

export function AzureIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#0089D6" stroke="#14110F" strokeWidth="1" />
      <path d="M13.2 6.5L7 17.5h4.2l2-3.8z" fill="#FFFFFF" fillOpacity="0.85" />
      <path d="M13.5 6.5l-3.3 6 3.6 5h4.2L18 17.5z" fill="#FFFFFF" />
    </svg>
  );
}

export function GitIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#F05032" stroke="#14110F" strokeWidth="1" />
      <circle cx="15" cy="7.5" r="1.8" fill="#FFFFFF" />
      <circle cx="9" cy="12" r="1.8" fill="#FFFFFF" />
      <circle cx="15" cy="16.5" r="1.8" fill="#FFFFFF" />
      <path d="M15 9.3v5.4M9 13.8v1a2 2 0 0 0 2 2h2.2" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function MsSqlIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#CC292B" stroke="#14110F" strokeWidth="1" />
      <ellipse cx="12" cy="7" rx="5.5" ry="2.2" fill="#FFFFFF" />
      <path d="M6.5 7v3.5c0 1.2 2.5 2.2 5.5 2.2s5.5-1 5.5-2.2V7M6.5 10.5v3.5c0 1.2 2.5 2.2 5.5 2.2s5.5-1 5.5-2.2v-3.5" stroke="#FFFFFF" strokeWidth="1.6" />
    </svg>
  );
}

export function LinuxIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#201E1C" stroke="#7BE0AD" strokeWidth="1.2" />
      <path d="M7 8.5l3.5 3.5L7 15.5M12.5 15.5h4.5" stroke="#7BE0AD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HangfireIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#C62828" stroke="#14110F" strokeWidth="1" />
      <path d="M12 4.5c.8 2 2.5 3.5 2.5 6 0 1.2-.5 2.2-1.2 3 .8-.4 2-1 2.4-2.2 1.5 2 1.3 4.5.3 6.2-1.2 2-3.3 2.5-4 2.5s-2.8-.5-4-2.5c-1-1.7-1.2-4.2.3-6.2.4 1.2 1.6 1.8 2.4 2.2-.7-.8-1.2-1.8-1.2-3 0-2.5 1.7-4 2.5-6z" fill="#FFC940" />
    </svg>
  );
}

export function WebSocketsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#1B1F23" stroke="#3A342E" strokeWidth="1" />
      <path d="M6.5 10h11M14.5 7l3 3-3 3M17.5 14h-11M9.5 17l-3-3 3-3" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function XUnitIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#2E7D32" stroke="#14110F" strokeWidth="1" />
      <path d="M12 5l5.5 2.2v4.8c0 3.6-2.3 6.8-5.5 7.8-3.2-1-5.5-4.2-5.5-7.8V7.2L12 5z" fill="#FFFFFF" fillOpacity="0.2" stroke="#FFFFFF" strokeWidth="1.3" />
      <path d="M9 12l2 2 4-4" stroke="#FFC940" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PostmanIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#FF6C37" stroke="#14110F" strokeWidth="1" />
      <circle cx="12" cy="9.5" r="3" fill="#FFFFFF" />
      <path d="M7 16.5c0-2.3 2.2-3.8 5-3.8s5 1.5 5 3.8" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function TelegramIconSvg({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#229ED9" stroke="#14110F" strokeWidth="1" />
      <path d="M5.5 11.5l12-4.5-2.8 11-4-3.2-2.2 1.6v-2.8l5.5-5.2-7 4.2z" fill="#FFFFFF" />
    </svg>
  );
}

export function MediatRIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#3F51B5" stroke="#14110F" strokeWidth="1" />
      <circle cx="12" cy="12" r="3" fill="#FFC940" stroke="#FFFFFF" strokeWidth="1.2" />
      <circle cx="6" cy="6" r="1.5" fill="#FFFFFF" />
      <circle cx="18" cy="6" r="1.5" fill="#FFFFFF" />
      <circle cx="6" cy="18" r="1.5" fill="#FFFFFF" />
      <circle cx="18" cy="18" r="1.5" fill="#FFFFFF" />
      <path d="M6 6l4 4M18 6l-4 4M6 18l4-4M18 18l-4-4" stroke="#FFFFFF" strokeWidth="1.3" />
    </svg>
  );
}

export function SerilogIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#009688" stroke="#14110F" strokeWidth="1" />
      <rect x="6" y="7" width="12" height="10" rx="1.5" stroke="#FFFFFF" strokeWidth="1.4" />
      <path d="M9 10h6M9 13h4" stroke="#FFC940" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function getTechIcon(name: string, className = "w-4 h-4"): React.ReactNode {
  const n = name.toLowerCase();
  if (n.includes("c#")) return <CSharpIcon className={className} />;
  if (n.includes(".net")) return <DotNetIcon className={className} />;
  if (n.includes("asp.net") || n.includes("rest api")) return <AspNetCoreIcon className={className} />;
  if (n.includes("postgres")) return <PostgreSqlIcon className={className} />;
  if (n.includes("redis")) return <RedisIcon className={className} />;
  if (n.includes("docker")) return <DockerIcon className={className} />;
  if (n.includes("signalr")) return <SignalRIcon className={className} />;
  if (n.includes("clean architecture") || n.includes("architecture")) return <CleanArchIcon className={className} />;
  if (n.includes("entity framework") || n.includes("ef core") || n.includes("dapper") || n.includes("linq")) return <EfCoreIcon className={className} />;
  if (n.includes("azure") || n.includes("speech") || n.includes("ocr")) return <AzureIcon className={className} />;
  if (n.includes("git") || n.includes("ci/cd")) return <GitIcon className={className} />;
  if (n.includes("sql server") || n.includes("sql")) return <MsSqlIcon className={className} />;
  if (n.includes("linux") || n.includes("bash")) return <LinuxIcon className={className} />;
  if (n.includes("hangfire") || n.includes("background")) return <HangfireIcon className={className} />;
  if (n.includes("websocket")) return <WebSocketsIcon className={className} />;
  if (n.includes("xunit") || n.includes("test")) return <XUnitIcon className={className} />;
  if (n.includes("postman")) return <PostmanIcon className={className} />;
  if (n.includes("telegram")) return <TelegramIconSvg className={className} />;
  if (n.includes("mediatr") || n.includes("cqrs") || n.includes("oop")) return <MediatRIcon className={className} />;
  if (n.includes("serilog") || n.includes("logging")) return <SerilogIcon className={className} />;
  return null;
}
