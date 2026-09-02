import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";

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

    const newProject = await Project.create(body);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Помилка створення проєкту", details: error.message },
      { status: 500 },
    );
  }
}
