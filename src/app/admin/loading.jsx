import React from "react";

export default function AdminLoading() {
  return (
    <div
      style={{
        padding: "32px 0",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Шапка зі скелетоном (імітує кнопку "Назад" та Заголовок) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              background: "rgba(0,0,0,0.06)",
              borderRadius: "50%",
              animation: "pulse 1.5s infinite ease-in-out",
            }}
          ></div>
          <div
            style={{
              width: "200px",
              height: "36px",
              background: "rgba(0,0,0,0.06)",
              borderRadius: "12px",
              animation: "pulse 1.5s infinite ease-in-out",
            }}
          ></div>
        </div>
        <div
          style={{
            width: "140px",
            height: "44px",
            background: "rgba(0,0,0,0.06)",
            borderRadius: "100px",
            animation: "pulse 1.5s infinite ease-in-out",
          }}
        ></div>
      </div>

      {/* Основна панель */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(12px)",
          borderRadius: "30px",
          padding: "32px",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          border: "1px solid rgba(255, 255, 255, 0.9)",
        }}
      >
        {/* Імітація кнопок-вкладок зверху */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          <div
            style={{
              width: "120px",
              height: "36px",
              background: "rgba(0,0,0,0.04)",
              borderRadius: "10px",
              animation: "pulse 1.5s infinite ease-in-out",
            }}
          ></div>
          <div
            style={{
              width: "120px",
              height: "36px",
              background: "rgba(0,0,0,0.04)",
              borderRadius: "10px",
              animation: "pulse 1.5s infinite ease-in-out",
            }}
          ></div>
        </div>

        {/* Імітація рядків таблиці */}
        <div
          style={{
            width: "100%",
            height: "64px",
            background: "rgba(0,0,0,0.03)",
            borderRadius: "16px",
            animation: "pulse 1.5s infinite ease-in-out",
          }}
        ></div>
        <div
          style={{
            width: "100%",
            height: "64px",
            background: "rgba(0,0,0,0.03)",
            borderRadius: "16px",
            animation: "pulse 1.5s infinite ease-in-out",
          }}
        ></div>
        <div
          style={{
            width: "100%",
            height: "64px",
            background: "rgba(0,0,0,0.03)",
            borderRadius: "16px",
            animation: "pulse 1.5s infinite ease-in-out",
          }}
        ></div>
        <div
          style={{
            width: "100%",
            height: "64px",
            background: "rgba(0,0,0,0.03)",
            borderRadius: "16px",
            animation: "pulse 1.5s infinite ease-in-out",
          }}
        ></div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
