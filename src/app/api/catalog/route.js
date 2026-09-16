import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
// 🔥 Тепер правильний шлях до моделі
import CatalogItem from "@/models/CatalogItem";

export async function GET() {
  try {
    await connectToDatabase();
    const items = await CatalogItem.find({}).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
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
    const newItem = await CatalogItem.create(data);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Помилка створення товару" },
      { status: 500 },
    );
  }
}
