import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Lead from "@/models/Lead"; // Вкажіть правильний шлях до моделі, якщо він відрізняється

const escapeHTML = (str) => {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

const formatPhone = (phone) => {
  if (!phone) return { clean: "", formatted: "" };
  let d = phone.replace(/\D/g, "");

  if (d.startsWith("0") && d.length === 10) d = "38" + d;
  if (d.startsWith("80") && d.length === 11) d = "3" + d;

  if (d.length === 12 && d.startsWith("380")) {
    return {
      clean: "+" + d,
      formatted: `+38 (${d.substring(2, 5)}) ${d.substring(5, 8)}-${d.substring(8, 10)}-${d.substring(10, 12)}`,
    };
  }
  return { clean: "+" + d, formatted: "+" + d };
};

const parseUserAgent = (ua) => {
  if (!ua) return "Невідомий пристрій";

  let device = "Desktop";
  if (/Mobile|Android|iP(hone|od|ad)/i.test(ua)) device = "Mobile";

  let browser = "Інший";
  if (/Edg/i.test(ua)) browser = "Edge";
  else if (/Chrome/i.test(ua)) browser = "Chrome";
  else if (/Safari/i.test(ua)) browser = "Safari";
  else if (/Firefox/i.test(ua)) browser = "Firefox";

  let os = "";
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac OS/i.test(ua)) os = "macOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iOS|iPhone|iPad/i.test(ua)) os = "iOS";

  return `${device}${os ? ` (${os})` : ""} / ${browser}`;
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, company, message: userMessage, _gotcha } = body;

    // 🔥 ЗАХИСТ ВІД СПАМУ
    if (_gotcha) {
      console.warn("Spam bot blocked (Honeypot triggered)");
      return NextResponse.json({ success: true });
    }

    const userAgentHeader = request.headers.get("user-agent") || "";
    const deviceInfo = parseUserAgent(userAgentHeader);
    const { clean: cleanPhone, formatted: formattedPhone } = formatPhone(phone);

    // 🔥 1. ПІДКЛЮЧЕННЯ ТА ЗБЕРЕЖЕННЯ В MONGODB
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    const newLead = await Lead.create({
      name: name || "Не вказано",
      phone: formattedPhone || phone,
      email: email || "",
      company: company || "",
      message: userMessage || "",
      deviceInfo: deviceInfo,
    });
    console.log("✅ Заявку збережено в БД, ID:", newLead._id);

    // 🔥 2. ВІДПРАВКА В ТЕЛЕГРАМ
    const timeString = new Date().toLocaleString("uk-UA", {
      timeZone: "Europe/Kyiv",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const safeName = escapeHTML(name);
    const safeCompany = escapeHTML(company);
    const safeMessage = escapeHTML(userMessage);

    let text = `🔥 <b>НОВА ЗАЯВКА З САЙТУ</b> 🔥\n\n`;
    text += `👤 <b>Ім'я:</b> ${safeName || "<i>Не вказано</i>"}\n`;
    text += `📞 <b>Телефон:</b> ${formattedPhone || escapeHTML(phone)}\n`;

    if (email) text += `✉️ <b>Email:</b> ${escapeHTML(email)}\n`;
    if (company) text += `🏢 <b>Компанія:</b> ${safeCompany}\n`;

    if (userMessage) {
      text += `\n💬 <b>Запит:</b>\n<i>${safeMessage}</i>\n`;
    } else {
      text += `\n💬 <b>Запит:</b> <i>Не вказано</i>\n`;
    }

    text += `\n⚙️ <i>${timeString} | ${deviceInfo}</i>`;

    const inlineKeyboard = [];
    if (cleanPhone) {
      inlineKeyboard.push([
        { text: "💬 Написати в TG", url: `https://t.me/${cleanPhone}` },
      ]);
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Якщо токени є, відправляємо в TG
    if (token && chatId) {
      const url = `https://api.telegram.org/bot${token}/sendMessage`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "HTML",
          reply_markup: { inline_keyboard: inlineKeyboard },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Помилка Telegram:", errorData);
      }
    }

    return NextResponse.json({ success: true, leadId: newLead._id });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, error: "Помилка сервера" },
      { status: 500 },
    );
  }
}
