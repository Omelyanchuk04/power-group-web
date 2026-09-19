import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import CatalogItem from "@/models/CatalogItem";
import slugify from "slugify";

export async function GET() {
  try {
    await connectToDatabase();
    const items = await CatalogItem.find({}).sort({ createdAt: -1 });
    return NextResponse.json(items);
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

    if (data.name) {
      // 🔥 БЕРЕМО ЛИШЕ ПЕРШІ 5 СЛІВ ІЗ НАЗВИ 🔥
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
    // 🔥 ВИВОДИМО РЕАЛЬНУ ПОМИЛКУ В ТЕРМІНАЛ VS CODE 🔥
    console.error("ПОМИЛКА СТВОРЕННЯ ТОВАРУ У БАЗІ:", error);

    return NextResponse.json(
      { error: "Помилка створення товару", details: error.message },
      { status: 500 },
    );
  }
}
