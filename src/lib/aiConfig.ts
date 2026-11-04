import fs from "fs";
import path from "path";

export interface AiConfig {
  primaryModel: string;
  fallbackModels: string[];
  temperature: number;
  maxTokens: number;
  timeoutSeconds: number;
  lastUpdated?: string;
}

const DEFAULT_CONFIG: AiConfig = {
  primaryModel: "upstage/solar-mini4:free",
  fallbackModels: [
    "stepfun/step-3.7-flash:free",
    "stealth/crouton-alpha",
    "reflection/beam-1.0-501b-a23b:free",
  ],
  temperature: 0.7,
  maxTokens: 1024,
  timeoutSeconds: 6,
  lastUpdated: new Date().toISOString(),
};

const CONFIG_PATH = path.join(process.cwd(), "src", "data", "ai-config.json");

let memoryConfig: AiConfig = { ...DEFAULT_CONFIG };

export function getAiConfig(): AiConfig {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const content = fs.readFileSync(CONFIG_PATH, "utf-8");
      const parsed = JSON.parse(content);
      memoryConfig = { ...DEFAULT_CONFIG, ...parsed };
      return memoryConfig;
    }
  } catch (error) {
    console.warn("Failed to read ai-config.json from disk, using cached/default:", error);
  }
  return memoryConfig;
}

export function saveAiConfig(newConfig: Partial<AiConfig>): AiConfig {
  const current = getAiConfig();
  const updated: AiConfig = {
    ...current,
    ...newConfig,
    lastUpdated: new Date().toISOString(),
  };

  try {
    const dir = path.dirname(CONFIG_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(updated, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write ai-config.json to disk:", error);
  }

  memoryConfig = updated;
  return updated;
}
