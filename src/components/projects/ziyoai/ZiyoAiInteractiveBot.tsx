"use client";

import { useState } from "react";
import { Mic, Image as ImageIcon, ShieldAlert, Sparkles, CheckCircle2, RefreshCw, Terminal, Play } from "lucide-react";

type Scenario = "voice" | "enrichment" | "failover";

export function ZiyoAiInteractiveBot() {
  const [scenario, setScenario] = useState<Scenario>("voice");
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(3);
  const [logs, setLogs] = useState<string[]>([
    "[12:44:02.118] [INF] Telegram Webhook: update_id=9841249 received from channel @ziyo_edu",
    "[12:44:02.135] [INF] Update deduplication check: OK (Redis TTL: 120s)",
    "[12:44:02.190] [INF] Audio stream buffered (4.2s OGG opus). Dispatching to Whisper STT...",
    "[12:44:02.378] [INF] STT Result: \"Quyosh tizimidagi eng katta sayyora qaysi va uning massasi qancha?\"",
    "[12:44:02.390] [INF] Gateway: Provider Key A active (latency: 18ms)",
    "[12:44:02.890] [INF] Response synthesized: 34 tokens. Synthesizing voice note (Neural TTS)...",
    "[12:44:03.020] [INF] Response delivered to chat (Total elapsed: 902ms). Status 200 OK.",
  ]);

  const runScenario = (type: Scenario) => {
    setScenario(type);
    setIsRunning(true);
    setActiveStep(0);

    if (type === "voice") {
      setLogs([
        "[SIMULATION] Initiating Voice Note Multimodal Flow...",
        "[STEP 1] Receiving voice stream via Telegram Webhook...",
      ]);
      setTimeout(() => {
        setActiveStep(1);
        setLogs((prev) => [
          ...prev,
          "[STEP 2] Transcribing with Whisper STT: \"Sun'iy intellekt backendda qanday qo'llaniladi?\"",
        ]);
      }, 700);
      setTimeout(() => {
        setActiveStep(2);
        setLogs((prev) => [
          ...prev,
          "[STEP 3] .NET 8 Bot Service: Context matched with educational repository. Calling LLM...",
        ]);
      }, 1500);
      setTimeout(() => {
        setActiveStep(3);
        setIsRunning(false);
        setLogs((prev) => [
          ...prev,
          "[STEP 4] TTS Neural voice note generated and sent back to Telegram group. Elapsed: 840ms. ✓",
        ]);
      }, 2300);
    } else if (type === "enrichment") {
      setLogs([
        "[SIMULATION] Autonomous Channel Post Auto-Enrichment Triggered...",
        "[STEP 1] Channel monitor detected new article on algorithms...",
      ]);
      setTimeout(() => {
        setActiveStep(1);
        setLogs((prev) => [
          ...prev,
          "[STEP 2] OCR extracted text from infographics: 1,420 words parsed.",
        ]);
      }, 700);
      setTimeout(() => {
        setActiveStep(2);
        setLogs((prev) => [
          ...prev,
          "[STEP 3] Generating 3 interactive quiz questions and discussion prompt...",
        ]);
      }, 1500);
      setTimeout(() => {
        setActiveStep(3);
        setIsRunning(false);
        setLogs((prev) => [
          ...prev,
          "[STEP 4] Quiz poll & discussion starter pinned to educational group. ✓",
        ]);
      }, 2300);
    } else if (type === "failover") {
      setLogs([
        "[SIMULATION] Dual-Key Gateway High-Availability Test...",
        "[STEP 1] Provider Key A hit rate limit (HTTP 429 Too Many Requests)...",
      ]);
      setTimeout(() => {
        setActiveStep(1);
        setLogs((prev) => [
          ...prev,
          "[WARN] 30s model deadline exceeded on Key A. Failover watchdog triggered!",
        ]);
      }, 700);
      setTimeout(() => {
        setActiveStep(2);
        setLogs((prev) => [
          ...prev,
          "[STEP 3] Hot cutover to Provider Key B. Instant token refresh.",
        ]);
      }, 1400);
      setTimeout(() => {
        setActiveStep(3);
        setIsRunning(false);
        setLogs((prev) => [
          ...prev,
          "[RECOVERY] Request resolved through Key B. Client saw zero failure (99.9% uptime preserved). ✓",
        ]);
      }, 2200);
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 lg:px-14 py-10">
      <div className="bg-cream border-2 border-ink rounded-[20px] p-6 lg:p-8 shadow-[6px_6px_0px_#14110F] flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-line">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-mint animate-pulse" />
              <span className="font-mono text-[9px] tracking-[1.4px] text-muted uppercase font-semibold">
                INTERACTIVE PIPELINE LAB
              </span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-ink tracking-tight">
              Test ZiyoAI&apos;s Resilient Architecture
            </h3>
          </div>

          {/* Scenario Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => runScenario("voice")}
              disabled={isRunning}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-ink text-xs font-mono font-medium transition-all ${
                scenario === "voice"
                  ? "bg-mint text-ink shadow-[2px_2px_0px_#14110F] -translate-y-0.5"
                  : "bg-white text-ink hover:bg-cream"
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Voice Note (STT/TTS)</span>
            </button>

            <button
              onClick={() => runScenario("enrichment")}
              disabled={isRunning}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-ink text-xs font-mono font-medium transition-all ${
                scenario === "enrichment"
                  ? "bg-yellow text-ink shadow-[2px_2px_0px_#14110F] -translate-y-0.5"
                  : "bg-white text-ink hover:bg-cream"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Channel Auto-Enrichment</span>
            </button>

            <button
              onClick={() => runScenario("failover")}
              disabled={isRunning}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-ink text-xs font-mono font-medium transition-all ${
                scenario === "failover"
                  ? "bg-coral text-white shadow-[2px_2px_0px_#14110F] -translate-y-0.5"
                  : "bg-white text-ink hover:bg-cream"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Dual-Key Failover</span>
            </button>
          </div>
        </div>

        {/* Pipeline Visualizer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            {
              step: "01",
              title: "Input Ingestion",
              desc: scenario === "voice" ? "Telegram Voice OGG" : scenario === "enrichment" ? "Post / Image OCR" : "Rate Limit 429",
              active: activeStep >= 0,
            },
            {
              step: "02",
              title: "Pre-processing",
              desc: scenario === "voice" ? "Whisper Transcription" : scenario === "enrichment" ? "Semantic Chunking" : "Watchdog Check",
              active: activeStep >= 1,
            },
            {
              step: "03",
              title: "Gateway Execution",
              desc: scenario === "failover" ? "Cutover to Key B" : ".NET 8 EF Core LLM Call",
              active: activeStep >= 2,
            },
            {
              step: "04",
              title: "Output Delivery",
              desc: scenario === "voice" ? "Neural Voice Stream" : scenario === "enrichment" ? "Group Quiz Published" : "Uptime Preserved (200 OK)",
              active: activeStep >= 3,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border-2 border-ink transition-all ${
                item.active
                  ? "bg-white shadow-[3px_3px_0px_#14110F]"
                  : "bg-cream/50 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[9px] text-muted font-bold">
                  PHASE {item.step}
                </span>
                {item.active ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <div className="w-3 h-3 rounded-full border border-ink/40" />
                )}
              </div>
              <p className="font-display font-bold text-sm text-ink">
                {item.title}
              </p>
              <p className="font-mono text-[10px] text-muted truncate mt-0.5">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Live Terminal Output */}
        <div className="bg-ink rounded-xl border-2 border-ink p-4 flex flex-col gap-2 font-mono text-[11px] text-[#A8D8FF] shadow-[4px_4px_0px_#14110F]">
          <div className="flex items-center justify-between pb-2 border-b border-[#3A342E]">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-mint" />
              <span className="text-white text-[10px] font-semibold tracking-wider">
                ZIYOAI ENGINE TELEMETRY LOGS (STDOUT)
              </span>
            </div>
            <button
              onClick={() => runScenario(scenario)}
              disabled={isRunning}
              className="inline-flex items-center gap-1 text-[10px] text-yellow hover:underline"
            >
              <RefreshCw className={`w-3 h-3 ${isRunning ? "animate-spin" : ""}`} />
              Re-run
            </button>
          </div>

          <div className="flex flex-col gap-1 max-h-36 overflow-y-auto font-mono text-[10.5px]">
            {logs.map((log, i) => (
              <div
                key={i}
                className={
                  log.includes("WARN")
                    ? "text-coral"
                    : log.includes("RECOVERY") || log.includes("✓")
                    ? "text-mint font-semibold"
                    : log.includes("STEP")
                    ? "text-yellow"
                    : "text-zinc-300"
                }
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
