import { NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Перевіряємо, чи співпадають дані з .env
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Створюємо зашифрований токен
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const token = await new SignJWT({ admin: true })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("24h") // Токен діє 24 години
        .sign(secret);

      // Створюємо відповідь і записуємо токен у cookie браузера
      const response = NextResponse.json({ success: true });
      response.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 день
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { error: "Невірний логін або пароль" },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
