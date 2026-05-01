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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isHome = pathname === "/";

  return (
    <ModalProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
          position: "relative",
          /* 🔥 ОСЬ ВБИВЦЯ ПОРОЖНЬОГО МІСЦЯ ЗНИЗУ: */
          overflow: "clip",
        }}
      >
        {isHome && <GlobalBackground isLayout={true} />}

        <Header />

        <main style={{ flex: 1, position: "relative", zIndex: 1 }}>
          {children}
        </main>

        {!isHome && <Footer />}
      </div>
    </ModalProvider>
  );
}
