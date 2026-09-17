// src/app/admin/loading.jsx
import React from "react";

export default function AdminLoading() {
  return (
    <div
      style={{
        padding: "32px",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Шапка зі скелетоном */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            width: "250px",
            height: "40px",
            background: "rgba(0,0,0,0.05)",
            borderRadius: "12px",
            animation: "pulse 1.5s infinite",
          }}
        ></div>
        <div
          style={{
            width: "150px",
            height: "44px",
            background: "rgba(0,0,0,0.05)",
            borderRadius: "100px",
            animation: "pulse 1.5s infinite",
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
          height: "600px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            width: "30%",
            height: "30px",
            background: "rgba(0,0,0,0.04)",
            borderRadius: "8px",
            animation: "pulse 1.5s infinite",
          }}
        ></div>
        <div
          style={{
            width: "100%",
            height: "60px",
            background: "rgba(0,0,0,0.04)",
            borderRadius: "12px",
            animation: "pulse 1.5s infinite",
          }}
        ></div>
        <div
          style={{
            width: "100%",
            height: "60px",
            background: "rgba(0,0,0,0.04)",
            borderRadius: "12px",
            animation: "pulse 1.5s infinite",
          }}
        ></div>
        <div
          style={{
            width: "100%",
            height: "60px",
            background: "rgba(0,0,0,0.04)",
            borderRadius: "12px",
            animation: "pulse 1.5s infinite",
          }}
        ></div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
