import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";

// PUT: Оновити існуючий проєкт
export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    // Отримуємо id з URL
    const { id } = await params;
    const body = await req.json();

    const updatedProject = await Project.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedProject) {
      return NextResponse.json(
        { error: "Проєкт не знайдено" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Помилка оновлення" }, { status: 500 });
  }
}

// DELETE: Видалити проєкт
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json(
        { error: "Проєкт не знайдено" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Проєкт успішно видалено" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Помилка видалення" }, { status: 500 });
  }
}
