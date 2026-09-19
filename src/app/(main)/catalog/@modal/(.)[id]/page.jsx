import React from "react";
import mongoose from "mongoose"; // 🔥 ДОДАНО ІМПОРТ MONGOOSE 🔥
import { connectToDatabase } from "@/lib/mongodb";
import CatalogItem from "@/models/CatalogItem";
import ModalClientWrapper from "./ModalClientWrapper";

export default async function InterceptedProductModal({ params }) {
  const resolvedParams = await params;

  // 🔥 Очищаємо ID від глюка Next.js 🔥
  const cleanId = resolvedParams.id.replace("(.)", "");

  // Якщо ID битий, просто не відкриваємо модалку
  if (!mongoose.Types.ObjectId.isValid(cleanId)) return null;

  await connectToDatabase();
  const productDoc = await CatalogItem.findById(cleanId);

  if (!productDoc) return null;

  const product = JSON.parse(JSON.stringify(productDoc));

  return <ModalClientWrapper product={product} />;
}
