import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import CatalogSettings from "@/models/CatalogSettings";

export async function GET() {
  try {
    await connectToDatabase();
    let settings = await CatalogSettings.findOne({});

    // Якщо налаштувань ще немає в базі, створюємо дефолтні
    if (!settings) {
      settings = await CatalogSettings.create({
        categories: [
          "Сонячні панелі",
          "Гібридні інвертори",
          "Мережеві інвертори",
          "Акумулятори",
          "Системи накопичення",
          "Силове обладнання для сонячних електростанцій",
          "Комплектуючі для монтажу",
        ],
        brands: [
          "Longi Solar",
          "Tongwei Solar",
          "Jinko Solar",
          "JA Solar",
          "Trina Solar",
          "Deye",
          "Solis",
          "Afore",
          "Sungrow",
          "FoxESS",
          "LuxPower",
          "Huawei",
        ],
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { error: "Помилка завантаження налаштувань" },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  try {
    await connectToDatabase();
    const data = await request.json();

    let settings = await CatalogSettings.findOne({});
    if (settings) {
      settings.categories = data.categories;
      settings.brands = data.brands;
      await settings.save();
    } else {
      settings = await CatalogSettings.create(data);
    }

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Помилка збереження" }, { status: 500 });
  }
}
