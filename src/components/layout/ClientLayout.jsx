"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import GlobalBackground from "./GlobalBackground";
import { ModalProvider } from "@/context/ModalContext";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Гідратація: чекаємо, поки клієнт завантажиться
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isHome = pathname === "/";

  return (
    <ModalProvider>
      {/* Контейнер, який розтягується на всю висоту */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        {/* Глобальний фон (він сам сховається на головній сторінці) */}
        <GlobalBackground isLayout={true} />

        <Header />

        {/* Основний контент розтягується, штовхаючи футер вниз */}
        <main style={{ flex: 1, position: "relative", zIndex: 1 }}>
          {children}
        </main>

        {/* 🔥 КЛЮЧОВИЙ МОМЕНТ: Рендеримо футер ТІЛЬКИ на внутрішніх сторінках */}
        {!isHome && <Footer />}
      </div>
    </ModalProvider>
  );
}
