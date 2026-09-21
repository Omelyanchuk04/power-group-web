import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import CatalogItem from "@/models/CatalogItem";

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();

    // 🔥 РОЗПАКОВУЄМО PARAMS ЧЕРЕЗ AWAIT (Обов'язково для Next.js 15+) 🔥
    const resolvedParams = await params;
    const id = resolvedParams.id;

    await CatalogItem.findByIdAndDelete(id);
    return NextResponse.json({ message: "Товар успішно видалено" });
  } catch (error) {
    console.error("Помилка видалення API:", error);
    return NextResponse.json({ error: "Помилка видалення" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();

    // 🔥 ТЕ САМЕ РОБИМО ДЛЯ ОНОВЛЕННЯ 🔥
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const data = await request.json();

    // 🔥 ГАРАНТУЄМО, ЩО МАСИВ ФАЙЛІВ ПРИСУТНІЙ 🔥
    if (!data.documents) {
      data.documents = [];
    }

    // Використовуємо $set, щоб гарантовано оновити всі передані поля
    const updatedItem = await CatalogItem.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true },
    );

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Помилка оновлення API:", error);
    return NextResponse.json({ error: "Помилка оновлення" }, { status: 500 });
  }
}
