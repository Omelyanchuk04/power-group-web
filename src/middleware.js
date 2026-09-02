import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Захищаємо тільки маршрути, які починаються на /admin
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token")?.value;

    // Якщо куки немає — перекидаємо на логін
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Перевіряємо, чи токен справжній і не протермінований
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);

      // Якщо все ок — пропускаємо в адмінку
      return NextResponse.next();
    } catch (error) {
      // Якщо токен підроблений або старий — перекидаємо на логін
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Всі інші сторінки (головна, послуги, контакти) пропускаємо без перевірок
  return NextResponse.next();
}

// Вказуємо, для яких шляхів запускати middleware (оптимізація продуктивності)
export const config = {
  matcher: ["/admin/:path*"],
};
