import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
// 🔥 Тепер правильний шлях до моделі
import CatalogItem from "@/models/CatalogItem";

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    await CatalogItem.findByIdAndDelete(id);
    return NextResponse.json({ message: "Товар успішно видалено" });
  } catch (error) {
    return NextResponse.json({ error: "Помилка видалення" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const data = await request.json();
    const updatedItem = await CatalogItem.findByIdAndUpdate(id, data, {
      new: true,
    });
    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json({ error: "Помилка оновлення" }, { status: 500 });
  }
}
