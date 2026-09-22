import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";

// 🔥 Функція транслітерації української в латиницю для URL 🔥
function createSlug(text) {
  if (!text) return "";

  const cyrillicToLatinMap = {
    а: "a",
    б: "b",
    в: "v",
    г: "h",
    ґ: "g",
    д: "d",
    е: "e",
    є: "ye",
    ж: "zh",
    з: "z",
    и: "y",
    і: "i",
    ї: "yi",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ь: "",
    ю: "yu",
    я: "ya",
    " ": "-",
  };

  return text
    .toLowerCase()
    .split("")
    .map((char) => cyrillicToLatinMap[char] || char)
    .join("")
    .replace(/[^a-z0-9-]/g, "-") // Заміна всіх спецсимволів на дефіс
    .replace(/-+/g, "-") // Видалення дублікатів дефісів
    .replace(/^-|-$/g, ""); // Видалення дефісів по краях (щоб не було -slug-)
}

// GET: Отримати всі проєкти (для відображення на сторінці)
export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ createdAt: -1 }); // Нові зверху
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Помилка отримання проєктів" },
      { status: 500 },
    );
  }
}

// POST: Створити новий проєкт (виклик з адмінки)
export async function POST(req) {
  try {
    await connectToDatabase();

    // Отримуємо дані з тіла запиту
    const body = await req.json();

    // 🔥 АВТОМАТИЧНА ГЕНЕРАЦІЯ УНІКАЛЬНОГО SLUG 🔥
    if (body.title) {
      let baseSlug = createSlug(body.title);
      let finalSlug = baseSlug;
      let counter = 1;

      // Перевіряємо, чи існує вже проєкт з таким slug. Якщо так, додаємо -1, -2 і т.д.
      while (await Project.findOne({ slug: finalSlug })) {
        finalSlug = `${baseSlug}-${counter}`;
        counter++;
      }
      body.slug = finalSlug;
    }

    const newProject = await Project.create(body);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Помилка створення проєкту", details: error.message },
      { status: 500 },
    );
  }
}
