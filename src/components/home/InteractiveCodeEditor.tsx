"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, RotateCcw, CheckCircle2, AlertCircle } from "lucide-react";

const INITIAL_CODE = `var me = new SoftwareEngineer(
  Name: "Javohir Sadullayev",
  Role: ".NET Backend Developer",
  Stack: ["C#", ".NET 8", "PostgreSQL"],
  Status: "Building reliable products"
);

Console.WriteLine($"Hello, I'm {me.Name} ✳");
await me.ShipReliableBackendAsync();`;

interface ExecutionResult {
  isError: boolean;
  output: string;
  badge: string;
}

function highlightCSharp(code: string): React.ReactNode[] {
  const lines = code.split("\n");
  return lines.map((line, lineIdx) => {
    // Check for comment
    const commentMatch = line.match(/^(\s*)(\/\/.*)$/);
    if (commentMatch) {
      return (
        <div key={lineIdx} className="whitespace-pre-wrap break-words">
          {commentMatch[1]}
          <span className="text-[#8F8678] italic">{commentMatch[2]}</span>
        </div>
      );
    }

    // Token pattern: keywords, identifiers, strings, property labels, punctuation
    const regex =
      /(\b(?:var|new|await|async|public|class|record|void|return|string|int|bool)\b)|(\b(?:Console|WriteLine|ShipReliableBackendAsync|Developer|SoftwareEngineer)\b)|("(?:[^"\\]|\\.)*")|(\b(?:Name|Role|Stack|Status)\b\s*:)|([{}()[\],;:])|([^\s"{}()[\];,:]+|\s+)/g;

    const tokens: React.ReactNode[] = [];
    let match;
    let keyIdx = 0;

    while ((match = regex.exec(line)) !== null) {
      const [full, keyword, identifier, str, prop, punct] = match;
      if (keyword) {
        tokens.push(
          <span key={keyIdx++} className="text-coral font-semibold">
            {keyword}
          </span>
        );
      } else if (identifier) {
        tokens.push(
          <span key={keyIdx++} className="text-sky font-semibold">
            {identifier}
          </span>
        );
      } else if (str) {
        tokens.push(
          <span key={keyIdx++} className="text-mint font-medium">
            {str}
          </span>
        );
      } else if (prop) {
        tokens.push(
          <span key={keyIdx++} className="text-yellow font-semibold">
            {prop}
          </span>
        );
      } else if (punct) {
        tokens.push(
          <span key={keyIdx++} className="text-cream/90 font-medium">
            {punct}
          </span>
        );
      } else {
        tokens.push(
          <span key={keyIdx++} className="text-cream">
            {full}
          </span>
        );
      }
    }

    return (
      <div key={lineIdx} className="whitespace-pre-wrap break-words min-h-[1.6em]">
        {tokens.length > 0 ? tokens : <span>&nbsp;</span>}
      </div>
    );
  });
}

function evaluateCSharpCode(code: string): ExecutionResult {
  const lines = code.split("\n");
  const knownTypes = new Set([
    "Console",
    "Developer",
    "SoftwareEngineer",
    "Task",
    "Math",
    "String",
    "Array",
    "List",
    "int",
    "string",
    "var",
    "bool",
    "void",
    "double",
    "float",
    "char",
  ]);
  const knownKeywords = new Set([
    "var",
    "new",
    "await",
    "async",
    "public",
    "class",
    "record",
    "return",
    "if",
    "else",
    "for",
    "foreach",
    "while",
  ]);
  const knownProps = new Set(["Name", "Role", "Stack", "Status"]);

  const declaredVars: Record<string, { type: string; val?: string; props?: Record<string, string> }> = {
    me: {
      type: "SoftwareEngineer",
      props: {
        Name: "Javohir Sadullayev",
        Role: ".NET Backend Developer",
        Status: "Building reliable backend products",
      },
    },
  };

  // Pre-scan for custom me Name if defined in object constructor
  const customNameMatch = code.match(/Name\s*:\s*"([^"]+)"/);
  if (customNameMatch && declaredVars.me.props) {
    declaredVars.me.props.Name = customNameMatch[1];
  }

  let openParen = 0;
  let openBrace = 0;
  let openBracket = 0;
  const printedOutputs: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();
    if (!line || line.startsWith("//")) continue;

    // Check quotes on line
    const quotes = (line.match(/"/g) || []).length;
    if (quotes % 2 !== 0) {
      return {
        isError: true,
        output: `CS1010: Newline in constant at line ${i + 1}`,
        badge: "1 error",
      };
    }

    // Bracket balance check
    const codeOnly = line.replace(/"(?:[^"\\]|\\.)*"/g, `""`);
    for (const ch of codeOnly) {
      if (ch === "(") openParen++;
      else if (ch === ")") openParen--;
      else if (ch === "{") openBrace++;
      else if (ch === "}") openBrace--;
      else if (ch === "[") openBracket++;
      else if (ch === "]") openBracket--;
    }

    if (openParen < 0) {
      return {
        isError: true,
        output: `CS1026: ) unexpected at line ${i + 1}`,
        badge: "1 error",
      };
    }
    if (openBrace < 0) {
      return {
        isError: true,
        output: `CS1513: } unexpected at line ${i + 1}`,
        badge: "1 error",
      };
    }
    if (openBracket < 0) {
      return {
        isError: true,
        output: `CS1003: ] unexpected at line ${i + 1}`,
        badge: "1 error",
      };
    }

    // Object creation / parameter lines
    if (line.match(/^[a-zA-Z_][a-zA-Z0-9_]*\s*:/)) {
      const propMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:/);
      if (propMatch && !knownProps.has(propMatch[1])) {
        return {
          isError: true,
          output: `CS0117: 'SoftwareEngineer' does not contain a definition for '${propMatch[1]}' at line ${i + 1}`,
          badge: "1 error",
        };
      }
      continue;
    }

    // Closing tokens
    if (line === ");" || line === "}" || line === "};" || line === "]," || line === "]") {
      continue;
    }

    // Variable declaration: var x = ...; or string x = ...;
    const varDeclMatch = line.match(/^(?:var|string|int|bool)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+?);?$/);
    if (varDeclMatch) {
      const vName = varDeclMatch[1];
      const vVal = varDeclMatch[2];
      if (!line.endsWith(";") && !line.endsWith("(")) {
        return {
          isError: true,
          output: `CS1002: ; expected at line ${i + 1}`,
          badge: "1 error",
        };
      }
      declaredVars[vName] = { type: "var", val: vVal.replace(/^"|"$/g, "") };
      continue;
    }

    // Console.WriteLine or Console.Write
    if (line.startsWith("Console.")) {
      if (!line.endsWith(";")) {
        return {
          isError: true,
          output: `CS1002: ; expected at line ${i + 1}`,
          badge: "1 error",
        };
      }
      const callMatch = line.match(/^Console\.([a-zA-Z_][a-zA-Z0-9_]*)\((.*)\);$/);
      if (!callMatch) {
        return {
          isError: true,
          output: `CS1003: Syntax error in Console call at line ${i + 1}`,
          badge: "1 error",
        };
      }
      const method = callMatch[1];
      if (method !== "WriteLine" && method !== "Write") {
        return {
          isError: true,
          output: `CS0117: 'Console' does not contain a definition for '${method}' at line ${i + 1}`,
          badge: "1 error",
        };
      }
      const args = callMatch[2].trim();
      if (args.startsWith(`$"`) || args.startsWith(`"`)) {
        let text = args.replace(/^\$?"|"$/g, "");
        text = text.replace(/\{([^}]+)\}/g, (_, expr) => {
          expr = expr.trim();
          if (expr === "me.Name") {
            return declaredVars.me?.props?.Name || "Javohir Sadullayev";
          }
          if (declaredVars[expr]) {
            return declaredVars[expr].val || expr;
          }
          return `{${expr}}`;
        });
        printedOutputs.push(text);
      } else if (declaredVars[args]) {
        printedOutputs.push(declaredVars[args].val || args);
      } else if (args === "") {
        printedOutputs.push("");
      } else {
        printedOutputs.push(args);
      }
      continue;
    }

    // await expression
    if (line.startsWith("await ")) {
      if (!line.endsWith(";")) {
        return {
          isError: true,
          output: `CS1002: ; expected at line ${i + 1}`,
          badge: "1 error",
        };
      }
      const awaitMatch = line.match(/^await\s+([a-zA-Z_][a-zA-Z0-9_]*)\.([a-zA-Z_][a-zA-Z0-9_]*)\(\);$/);
      if (awaitMatch) {
        const obj = awaitMatch[1];
        const meth = awaitMatch[2];
        if (!declaredVars[obj]) {
          return {
            isError: true,
            output: `CS0103: The name '${obj}' does not exist in the current context at line ${i + 1}`,
            badge: "1 error",
          };
        }
        if (meth !== "ShipReliableBackendAsync") {
          return {
            isError: true,
            output: `CS1061: 'SoftwareEngineer' does not contain a definition for '${meth}' at line ${i + 1}`,
            badge: "1 error",
          };
        }
      }
      continue;
    }

    // Bare identifier check (e.g., someone wrote "Conso" or "foo")
    const bareIdentMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*);?$/);
    if (bareIdentMatch) {
      const id = bareIdentMatch[1];
      if (!knownTypes.has(id) && !knownKeywords.has(id) && !declaredVars[id]) {
        return {
          isError: true,
          output: `CS0103: The name '${id}' does not exist in the current context at line ${i + 1}`,
          badge: "1 error",
        };
      }
      if (!line.endsWith(";")) {
        return {
          isError: true,
          output: `CS1002: ; expected at line ${i + 1}`,
          badge: "1 error",
        };
      }
    }

    // First identifier on any other line
    const firstWordMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)/);
    if (firstWordMatch) {
      const id = firstWordMatch[1];
      if (!knownTypes.has(id) && !knownKeywords.has(id) && !declaredVars[id]) {
        return {
          isError: true,
          output: `CS0103: The name '${id}' does not exist in the current context at line ${i + 1}`,
          badge: "1 error",
        };
      }
      if (!line.endsWith(";") && !line.endsWith("(") && !line.endsWith("{") && !line.endsWith(",")) {
        return {
          isError: true,
          output: `CS1002: ; expected at line ${i + 1}`,
          badge: "1 error",
        };
      }
    } else {
      return {
        isError: true,
        output: `CS1003: Syntax error at line ${i + 1}`,
        badge: "1 error",
      };
    }
  }

  if (openParen > 0) {
    return { isError: true, output: "CS1026: ) expected", badge: "1 error" };
  }
  if (openBrace > 0) {
    return { isError: true, output: "CS1513: } expected", badge: "1 error" };
  }
  if (openBracket > 0) {
    return { isError: true, output: "CS1003: ] expected", badge: "1 error" };
  }

  const finalOutput =
    printedOutputs.length > 0
      ? `Output: "${printedOutputs.join(" | ")}"`
      : `Output: "[OK] Execution completed."`;

  return { isError: false, output: finalOutput, badge: "0 errors · 8ms" };
}

export function InteractiveCodeEditor() {
  const [code, setCode] = useState(INITIAL_CODE);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult>({
    isError: false,
    output: 'Output: "Hello, I\'m Javohir Sadullayev ✳"',
    badge: "0 errors",
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [editorHeight, setEditorHeight] = useState<number>(225);

  // Automatically resize textarea so no scrollbar ever appears on mobile, tablet, or desktop
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollH = textareaRef.current.scrollHeight;
      const targetH = Math.max(220, scrollH);
      setEditorHeight(targetH);
      textareaRef.current.style.height = `${targetH}px`;
    }
  }, [code]);

  const handleRun = () => {
    setIsRunning(true);

    setTimeout(() => {
      const evalResult = evaluateCSharpCode(code);
      setResult(evalResult);
      setIsRunning(false);
    }, 200);
  };

  const handleReset = () => {
    setCode(INITIAL_CODE);
    setResult({
      isError: false,
      output: 'Output: "Hello, I\'m Javohir Sadullayev ✳"',
      badge: "0 errors",
    });
  };

  return (
    <div className="relative z-10 w-full max-w-[392px] rounded-2xl bg-ink border-2 border-ink shadow-[7px_7px_0px_#14110F] hover:shadow-[10px_10px_0px_#14110F] hover:-translate-y-1 overflow-hidden flex flex-col my-auto transition-all duration-300">
      {/* Terminal Top Bar */}
      <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#1C1F24] border-b border-[#3A342E] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-coral border border-ink/30" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow border border-ink/30" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-mint border border-ink/30" />
          <span className="font-mono text-[11px] sm:text-xs text-[#8F8678] pl-1 font-medium">
            Program.cs
          </span>
        </div>

        {/* Action Buttons: Reset & Run */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            title="Reset code"
            className="p-1 rounded text-[#8F8678] hover:text-cream active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleRun}
            disabled={isRunning}
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-bold border border-ink shadow-solid-sm active:translate-y-0.5 active:scale-95 transition-all cursor-pointer disabled:cursor-wait ${
              isRunning
                ? "bg-muted text-cream"
                : "bg-mint hover:bg-mint/90 text-ink"
            }`}
          >
            <Play className={`w-3 h-3 fill-current ${isRunning ? "animate-spin" : ""}`} />
            <span>{isRunning ? "Running..." : "Run ▶"}</span>
          </button>
        </div>
      </div>

      {/* Code Area with Syntax Highlighting + Transparent Editable Textarea (Zero Scrollbars) */}
      <div
        className="relative p-3.5 sm:p-4 bg-ink font-mono text-[11px] sm:text-[12px] leading-[1.6] overflow-hidden"
        style={{ minHeight: `${editorHeight}px` }}
      >
        {/* Layer 1: Syntax Highlighted Colored Code */}
        <div
          aria-hidden="true"
          className="absolute inset-0 p-3.5 sm:p-4 pointer-events-none select-none font-mono text-[11px] sm:text-[12px] leading-[1.6] whitespace-pre-wrap break-words overflow-hidden"
        >
          {highlightCSharp(code)}
        </div>

        {/* Layer 2: Editable Transparent Textarea with Cursor on top */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="relative z-10 w-full bg-transparent text-transparent caret-yellow font-mono text-[11px] sm:text-[12px] leading-[1.6] whitespace-pre-wrap break-words resize-none outline-none focus:ring-0 selection:bg-yellow/30 selection:text-transparent overflow-hidden"
          style={{ height: `${editorHeight}px`, overflow: "hidden", resize: "none" }}
          placeholder="// Type your C# code here..."
        />
      </div>

      {/* Terminal Result / Diagnostic Footer */}
      <div
        className={`px-3.5 sm:px-4 py-2 sm:py-2.5 border-t border-[#3A342E] flex items-center justify-between font-mono text-[10.5px] sm:text-[11px] transition-colors ${
          result.isError ? "bg-[#281414]" : "bg-[#121417]"
        }`}
      >
        <span
          className={`flex items-center gap-1.5 font-medium truncate pr-2 ${
            result.isError ? "text-coral" : "text-mint"
          }`}
          title={result.output}
        >
          {result.isError ? (
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-coral" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-mint" />
          )}
          <span className="truncate">{result.output}</span>
        </span>

        <span
          className={`font-bold shrink-0 ${
            result.isError ? "text-coral" : "text-yellow"
          }`}
        >
          {result.badge}
        </span>
      </div>
    </div>
  );
}
