"use client";

import React from "react";
import { useRouter } from "next/navigation";
// 🔥 ВИПРАВЛЕНИЙ ШЛЯХ (на 2 рівні вгору) 🔥
import CatalogProductModal from "../../components/CatalogGrid/CatalogProductModal";

export default function ModalClientWrapper({ product }) {
  const router = useRouter();

  return (
    <CatalogProductModal product={product} onClose={() => router.back()} />
  );
}
