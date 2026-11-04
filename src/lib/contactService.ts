import fs from "fs";
import path from "path";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  ip?: string;
  userAgent?: string;
  status: "unread" | "read";
  telegramSent: boolean;
}

const MESSAGES_FILE = path.join(process.cwd(), "src/data/contactMessages.json");

function ensureFile(filePath: string, defaultData: string = "[]") {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, defaultData, "utf-8");
    }
  } catch (err) {
    console.error(`Failed to ensure file ${filePath}:`, err);
  }
}

export function getContactMessages(): ContactMessage[] {
  ensureFile(MESSAGES_FILE);
  try {
    const raw = fs.readFileSync(MESSAGES_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading contact messages:", err);
    return [];
  }
}

export async function sendTelegramNotification(
  msg: Pick<ContactMessage, "name" | "email" | "subject" | "message" | "createdAt">
): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return false;
  }

  const escapeHtml = (str: string) =>
    (str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const formattedDate = new Date(msg.createdAt).toLocaleString("uz-UZ", {
    timeZone: "Asia/Tashkent",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const text = [
    `📬 <b>Yangi Xabar (Portfolio Contact Form)</b>`,
    ``,
    `👤 <b>Kimdan:</b> ${escapeHtml(msg.name)}`,
    `📧 <b>Email:</b> ${escapeHtml(msg.email)}`,
    `📌 <b>Mavzu:</b> ${escapeHtml(msg.subject || "(Mavzu ko'rsatilmagan)")}`,
    ``,
    `💬 <b>Xabar:</b>`,
    `<i>${escapeHtml(msg.message)}</i>`,
    ``,
    `🕒 <b>Vaqt:</b> ${formattedDate}`,
  ].join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });

    const data = await res.json();
    return !!(res.ok && data.ok);
  } catch (err) {
    console.error("Telegram notification error:", err);
    return false;
  }
}

export async function saveContactMessage(params: {
  name: string;
  email: string;
  subject?: string;
  message: string;
  ip?: string;
  userAgent?: string;
}): Promise<ContactMessage> {
  ensureFile(MESSAGES_FILE);
  const messages = getContactMessages();

  const id = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const createdAt = new Date().toISOString();

  // Try sending Telegram notification
  let telegramSent = false;
  try {
    telegramSent = await sendTelegramNotification({
      name: params.name,
      email: params.email,
      subject: params.subject || "",
      message: params.message,
      createdAt,
    });
  } catch (err) {
    console.error("Failed to push to Telegram:", err);
  }

  const newMessage: ContactMessage = {
    id,
    name: params.name.trim(),
    email: params.email.trim(),
    subject: (params.subject || "").trim(),
    message: params.message.trim(),
    createdAt,
    ip: params.ip,
    userAgent: params.userAgent,
    status: "unread",
    telegramSent,
  };

  messages.unshift(newMessage);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");

  return newMessage;
}

export function markMessageAsRead(id: string): boolean {
  ensureFile(MESSAGES_FILE);
  const messages = getContactMessages();
  const target = messages.find((m) => m.id === id);
  if (target) {
    target.status = "read";
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
    return true;
  }
  return false;
}

export function deleteContactMessage(id: string): boolean {
  ensureFile(MESSAGES_FILE);
  const messages = getContactMessages();
  const filtered = messages.filter((m) => m.id !== id);
  if (filtered.length !== messages.length) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
  }
  return false;
}
