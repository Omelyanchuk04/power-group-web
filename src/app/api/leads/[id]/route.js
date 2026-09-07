import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Lead from "@/models/Lead";

// 🔥 ЗМІНА СТАТУСУ (PATCH)
export async function PATCH(request, context) {
  try {
    // В нових версіях Next.js params потрібно читати так:
    const params = await context.params;
    const id = params.id;

    const body = await request.json();
    const { status } = body;

    // Підключення до бази
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedLead) {
      return NextResponse.json(
        { error: "Заявку не знайдено в базі" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error) {
    console.error("Помилка PATCH /api/leads/[id]:", error);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}

// 🔥 ВИДАЛЕННЯ (DELETE)
export async function DELETE(request, context) {
  try {
    const params = await context.params;
    const id = params.id;

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
      return NextResponse.json(
        { error: "Заявку не знайдено в базі" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Помилка DELETE /api/leads/[id]:", error);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
