import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import CatalogItem from "@/models/CatalogItem";
import slugify from "slugify";

export async function GET(request) {
  try {
    await connectToDatabase();

    // 1. Отримуємо параметри запиту (наприклад, ?category=Акумулятори)
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    // 2. Будуємо об'єкт запиту для БД
    const query = {};
    if (category) {
      query.category = category;
    }

    // 3. Отримуємо товари (якщо є категорія — лише її, якщо ні — всі)
    const items = await CatalogItem.find(query).sort({ createdAt: -1 });

    // 🔥 4. ДИНАМІЧНА ГЕНЕРАЦІЯ БРЕНДІВ 🔥
    // Шукаємо всі унікальні значення поля 'filters.brand' для нашого запиту
    const rawBrands = await CatalogItem.distinct("filters.brand", query);

    // Відфільтровуємо можливі пусті значення ("" або null), які могли потрапити в БД
    const brands = rawBrands.filter((brand) => brand && brand.trim() !== "");

    // Повертаємо об'єкт з товарами та унікальними брендами для цієї вибірки
    return NextResponse.json({ items, brands });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Помилка завантаження товарів" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();

    // 🔥 Гарантуємо, що масив документів існує
    if (!data.documents) {
      data.documents = [];
    }

    if (data.name) {
      // БЕРЕМО ЛИШЕ ПЕРШІ 5 СЛІВ ІЗ НАЗВИ
      const shortName = data.name.split(" ").slice(0, 5).join(" ");

      const baseSlug = slugify(shortName, {
        lower: true,
        strict: true,
        locale: "uk",
      });

      const randomSuffix = Math.random().toString(36).substring(2, 6);
      data.slug = `${baseSlug}-${randomSuffix}`;
    }

    const newItem = await CatalogItem.create(data);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("ПОМИЛКА СТВОРЕННЯ ТОВАРУ У БАЗІ:", error);
    return NextResponse.json(
      { error: "Помилка створення товару", details: error.message },
      { status: 500 },
    );
  }
}
