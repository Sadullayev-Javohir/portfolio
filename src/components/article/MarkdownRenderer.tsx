"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Copy, Check, Info, AlertTriangle, CheckSquare, Square, ExternalLink } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  if (!content) return null;

  // Split into blocks by double newlines or special boundaries
  const blocks = parseMarkdownBlocks(content);

  return (
    <div className={`flex flex-col gap-5 leading-relaxed text-ink ${className}`}>
      {blocks.map((block, idx) => (
        <React.Fragment key={idx}>{renderBlock(block, idx)}</React.Fragment>
      ))}
    </div>
  );
}

// ----------------- BLOCK PARSER -----------------
type BlockType =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "image"; alt: string; src: string; caption?: string }
  | { type: "code"; lang: string; code: string }
  | { type: "quote"; text: string }
  | { type: "callout"; text: string; title?: string; kind?: "tip" | "warn" | "info" }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "checklist"; items: { checked: boolean; text: string }[] }
  | { type: "divider" }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "paragraph"; text: string };

function parseMarkdownBlocks(raw: string): BlockType[] {
  const lines = raw.split(/\r?\n/);
  const blocks: BlockType[] = [];

  let inCode = false;
  let codeLang = "";
  let codeBuffer: string[] = [];

  let listBuffer: string[] = [];
  let isOrderedList = false;

  let checklistBuffer: { checked: boolean; text: string }[] = [];

  let tableBuffer: string[] = [];

  let quoteBuffer: string[] = [];

  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      const text = paragraphBuffer.join("\n").trim();
      if (text) {
        blocks.push({ type: "paragraph", text });
      }
      paragraphBuffer = [];
    }
  };

  const flushList = () => {
    if (listBuffer.length > 0) {
      blocks.push({ type: "list", items: [...listBuffer], ordered: isOrderedList });
      listBuffer = [];
      isOrderedList = false;
    }
  };

  const flushChecklist = () => {
    if (checklistBuffer.length > 0) {
      blocks.push({ type: "checklist", items: [...checklistBuffer] });
      checklistBuffer = [];
    }
  };

  const flushQuote = () => {
    if (quoteBuffer.length > 0) {
      const rawQuote = quoteBuffer.join("\n").trim();
      // Check if callout like > [!NOTE] or > [!WARNING]
      const noteMatch = rawQuote.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(.*)/i);
      if (noteMatch) {
        const kindRaw = noteMatch[1].toLowerCase();
        const kind = kindRaw === "warning" || kindRaw === "caution" ? "warn" : kindRaw === "tip" ? "tip" : "info";
        const title = noteMatch[1].toUpperCase();
        const rest = [noteMatch[2], ...quoteBuffer.slice(1)].join("\n").trim();
        blocks.push({ type: "callout", text: rest, title, kind });
      } else {
        blocks.push({ type: "quote", text: rawQuote });
      }
      quoteBuffer = [];
    }
  };

  const flushTable = () => {
    if (tableBuffer.length >= 2) {
      const parseRow = (line: string) =>
        line
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((c) => c.trim());

      const headers = parseRow(tableBuffer[0]);
      // Skip separator row tableBuffer[1] (|---|---|)
      const rows: string[][] = [];
      for (let i = 2; i < tableBuffer.length; i++) {
        if (tableBuffer[i].includes("|")) {
          rows.push(parseRow(tableBuffer[i]));
        }
      }
      blocks.push({ type: "table", headers, rows });
      tableBuffer = [];
    } else if (tableBuffer.length > 0) {
      paragraphBuffer.push(...tableBuffer);
      tableBuffer = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Code fence
    if (trimmed.startsWith("```")) {
      if (inCode) {
        // end code
        blocks.push({ type: "code", lang: codeLang, code: codeBuffer.join("\n") });
        codeBuffer = [];
        codeLang = "";
        inCode = false;
        continue;
      } else {
        flushParagraph();
        flushList();
        flushChecklist();
        flushQuote();
        flushTable();
        inCode = true;
        codeLang = trimmed.replace(/^```/, "").trim() || "plaintext";
        continue;
      }
    }

    if (inCode) {
      codeBuffer.push(line);
      continue;
    }

    // 2. Divider
    if (/^(\*\*\*|---|___)$/.test(trimmed)) {
      flushParagraph();
      flushList();
      flushChecklist();
      flushQuote();
      flushTable();
      blocks.push({ type: "divider" });
      continue;
    }

    // 3. Image line: ![alt](url)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      flushParagraph();
      flushList();
      flushChecklist();
      flushQuote();
      flushTable();
      blocks.push({
        type: "image",
        alt: imgMatch[1],
        src: imgMatch[2],
        caption: imgMatch[1] || undefined,
      });
      continue;
    }

    // 4. Headers
    if (trimmed.startsWith("# ") && !trimmed.startsWith("##")) {
      flushParagraph();
      flushList();
      flushChecklist();
      flushQuote();
      flushTable();
      blocks.push({ type: "h1", text: trimmed.replace(/^#\s+/, "") });
      continue;
    }
    if (trimmed.startsWith("## ") && !trimmed.startsWith("###")) {
      flushParagraph();
      flushList();
      flushChecklist();
      flushQuote();
      flushTable();
      blocks.push({ type: "h2", text: trimmed.replace(/^##\s+/, "") });
      continue;
    }
    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      flushChecklist();
      flushQuote();
      flushTable();
      blocks.push({ type: "h3", text: trimmed.replace(/^###\s+/, "") });
      continue;
    }

    // 5. Quote
    if (trimmed.startsWith(">")) {
      flushParagraph();
      flushList();
      flushChecklist();
      flushTable();
      quoteBuffer.push(trimmed.replace(/^>\s?/, ""));
      continue;
    } else if (quoteBuffer.length > 0) {
      flushQuote();
    }

    // 6. Checklist: - [ ] or - [x]
    const checkMatch = trimmed.match(/^[-*]\s+\[([ xX])\]\s+(.*)$/);
    if (checkMatch) {
      flushParagraph();
      flushList();
      flushTable();
      checklistBuffer.push({
        checked: checkMatch[1].toLowerCase() === "x",
        text: checkMatch[2],
      });
      continue;
    } else if (checklistBuffer.length > 0) {
      flushChecklist();
    }

    // 7. Bullet / Numbered list
    const bulletMatch = trimmed.match(/^[-*]\s+(.*)$/);
    const orderedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (bulletMatch) {
      flushParagraph();
      flushTable();
      if (isOrderedList && listBuffer.length > 0) flushList();
      isOrderedList = false;
      listBuffer.push(bulletMatch[1]);
      continue;
    } else if (orderedMatch) {
      flushParagraph();
      flushTable();
      if (!isOrderedList && listBuffer.length > 0) flushList();
      isOrderedList = true;
      listBuffer.push(orderedMatch[2]);
      continue;
    } else if (listBuffer.length > 0) {
      flushList();
    }

    // 8. Markdown Table row (| a | b |)
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushParagraph();
      tableBuffer.push(trimmed);
      continue;
    } else if (tableBuffer.length > 0) {
      flushTable();
    }

    // 9. Blank line -> flush paragraph
    if (!trimmed) {
      flushParagraph();
      continue;
    }

    // 10. Normal paragraph text
    paragraphBuffer.push(line);
  }

  // Final flushes
  if (inCode) {
    blocks.push({ type: "code", lang: codeLang, code: codeBuffer.join("\n") });
  }
  flushParagraph();
  flushList();
  flushChecklist();
  flushQuote();
  flushTable();

  return blocks;
}

// ----------------- BLOCK RENDERER -----------------
function renderBlock(block: BlockType, key: number) {
  switch (block.type) {
    case "h1":
      return (
        <h1
          key={key}
          className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink tracking-tight pt-6 pb-2 border-b-2 border-ink/10"
        >
          {renderInline(block.text)}
        </h1>
      );

    case "h2":
      return (
        <h2
          key={key}
          className="font-display text-xl sm:text-2xl font-bold text-ink tracking-tight pt-5 pb-1 flex items-center gap-2.5"
        >
          <span className="w-2 h-5 rounded-full bg-yellow inline-block shrink-0" />
          <span>{renderInline(block.text)}</span>
        </h2>
      );

    case "h3":
      return (
        <h3
          key={key}
          className="font-display text-lg sm:text-xl font-bold text-ink pt-3 text-ink"
        >
          {renderInline(block.text)}
        </h3>
      );

    case "image":
      return (
        <figure key={key} className="my-5 w-full flex flex-col items-center">
          <div className="w-full rounded-2xl border-2 border-ink overflow-hidden bg-white shadow-solid-sm group relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={block.src}
              alt={block.alt || "Article image"}
              className="w-full h-auto max-h-[550px] object-contain bg-cream/20 mx-auto transition-transform duration-300"
              loading="lazy"
            />
            <a
              href={block.src}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 border border-ink text-ink opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-yellow cursor-pointer"
              title="Asl o'lchamda ko'rish"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          {block.caption && (
            <figcaption className="mt-2.5 text-xs font-mono text-muted text-center italic max-w-xl">
              📸 {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "code":
      return <CodeBlockComponent key={key} lang={block.lang} code={block.code} />;

    case "quote":
      return (
        <blockquote
          key={key}
          className="my-3 border-l-4 border-yellow bg-white/80 border-y border-r border-rule rounded-r-2xl p-5 shadow-sm font-display text-base sm:text-lg italic text-ink leading-relaxed"
        >
          &ldquo;{renderInline(block.text)}&rdquo;
        </blockquote>
      );

    case "callout":
      const isWarn = block.kind === "warn";
      const isTip = block.kind === "tip";
      const bgColor = isWarn ? "bg-peach/40 border-coral" : isTip ? "bg-mint/30 border-ink" : "bg-yellow/30 border-ink";
      return (
        <div
          key={key}
          className={`my-3 p-4 sm:p-5 rounded-2xl border-2 shadow-solid-sm flex items-start gap-3.5 ${bgColor}`}
        >
          {isWarn ? (
            <AlertTriangle className="w-5 h-5 text-coral shrink-0 mt-0.5" />
          ) : (
            <Info className="w-5 h-5 text-ink shrink-0 mt-0.5" />
          )}
          <div className="flex flex-col gap-1 text-sm font-sans">
            {block.title && (
              <span className="font-display font-bold text-xs font-mono tracking-wider uppercase text-ink">
                {block.title}
              </span>
            )}
            <p className="text-ink leading-relaxed whitespace-pre-wrap">{renderInline(block.text)}</p>
          </div>
        </div>
      );

    case "list":
      if (block.ordered) {
        return (
          <ol key={key} className="flex flex-col gap-2 my-2 pl-2">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-cream border border-ink font-mono text-[11px] font-bold text-ink shrink-0 flex items-center justify-center mt-0.5 shadow-xs">
                  {i + 1}
                </span>
                <span className="flex-1">{renderInline(item)}</span>
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul key={key} className="flex flex-col gap-2 my-2 pl-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed">
              <span className="w-2 h-2 rounded-full bg-yellow border border-ink shrink-0 mt-2" />
              <span className="flex-1">{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );

    case "checklist":
      return (
        <div key={key} className="flex flex-col gap-2 my-2 pl-1">
          {block.items.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm sm:text-base">
              {item.checked ? (
                <CheckSquare className="w-4 h-4 text-mint shrink-0 mt-1 stroke-[2.5]" />
              ) : (
                <Square className="w-4 h-4 text-muted shrink-0 mt-1" />
              )}
              <span className={item.checked ? "line-through text-muted" : "text-ink"}>
                {renderInline(item.text)}
              </span>
            </div>
          ))}
        </div>
      );

    case "table":
      return (
        <div key={key} className="w-full overflow-x-auto my-4 rounded-2xl border-2 border-ink shadow-solid-sm bg-white">
          <table className="w-full text-left text-sm font-sans border-collapse">
            <thead>
              <tr className="bg-cream border-b-2 border-ink">
                {block.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 font-mono font-bold text-xs uppercase text-ink">
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {block.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-cream/40 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 text-ink">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "divider":
      return <hr key={key} className="border-t-2 border-ink/15 my-6" />;

    case "paragraph":
    default:
      return (
        <p key={key} className="font-sans text-[15px] sm:text-[16px] text-ink-soft leading-[1.8] font-normal">
          {renderInline(block.text)}
        </p>
      );
  }
}

// ----------------- INLINE FORMATTER -----------------
// Parses **bold**, *italic*, <u>underline</u>, ~~strike~~, <mark>highlight</mark>, `code`, [link](url)
function renderInline(text: string): React.ReactNode {
  if (!text) return null;

  // Simple token parser for inline styles
  // We can match patterns:
  // 1. Links: [text](url)
  // 2. Bold: **text**
  // 3. Italic: *text* or _text_
  // 4. Strike: ~~text~~
  // 5. Code: `code`
  // 6. HTML: <u>text</u>, <mark>text</mark>, <br/>

  // Fast tokenization using regex
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|~~([^~]+)~~|`([^`]+)`|<u>(.*?)<\/u>|<mark>(.*?)<\/mark>|\n)/g;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }

    if (match[1] && match[2] && match[3]) {
      // Link [label](url)
      elements.push(
        <a
          key={match.index}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue font-semibold underline decoration-2 hover:text-ink transition-colors"
        >
          {match[2]}
        </a>
      );
    } else if (match[4]) {
      // **bold**
      elements.push(
        <strong key={match.index} className="font-bold text-ink">
          {match[4]}
        </strong>
      );
    } else if (match[5]) {
      // *italic*
      elements.push(
        <em key={match.index} className="italic text-ink font-medium">
          {match[5]}
        </em>
      );
    } else if (match[6]) {
      // ~~strike~~
      elements.push(
        <span key={match.index} className="line-through text-muted">
          {match[6]}
        </span>
      );
    } else if (match[7]) {
      // `code`
      elements.push(
        <code
          key={match.index}
          className="font-mono text-[13px] px-1.5 py-0.5 rounded-md bg-cream border border-ink/20 text-ink font-semibold"
        >
          {match[7]}
        </code>
      );
    } else if (match[8]) {
      // <u>underline</u>
      elements.push(
        <u key={match.index} className="underline decoration-ink decoration-2 underline-offset-2">
          {match[8]}
        </u>
      );
    } else if (match[9]) {
      // <mark>highlight</mark>
      elements.push(
        <mark key={match.index} className="bg-yellow/60 px-1 py-0.5 rounded text-ink font-medium">
          {match[9]}
        </mark>
      );
    } else if (match[0] === "\n") {
      elements.push(<br key={match.index} />);
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements.length > 0 ? elements : text;
}

// ----------------- CODE BLOCK WITH COPY -----------------
function CodeBlockComponent({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-ink rounded-2xl border-2 border-ink overflow-hidden my-4 shadow-solid-sm">
      <div className="border-b border-[#3A342E] px-4 py-2.5 flex items-center justify-between bg-[#1D1814]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-coral inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-mint inline-block" />
          <span className="font-mono text-xs text-[#B9B0A4] uppercase ml-2 tracking-wider">
            {lang || "CODE"}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 font-mono text-[10px] text-[#B9B0A4] hover:text-white px-2 py-1 rounded bg-[#2D2620] hover:bg-[#3D352D] transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-mint stroke-[2.5]" />
              <span className="text-mint font-bold">NUSXA OLINDI</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>NUSXA OLISH</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs sm:text-[13px] font-mono leading-relaxed text-cream">
        <code>{code}</code>
      </pre>
    </div>
  );
}
