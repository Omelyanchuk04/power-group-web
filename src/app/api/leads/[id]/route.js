import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Lead from "@/models/Lead";

// Зміна статусу заявки
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedLead)
      return NextResponse.json(
        { error: "Заявку не знайдено" },
        { status: 404 },
      );
    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error) {
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}

// Видалення заявки
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead)
      return NextResponse.json(
        { error: "Заявку не знайдено" },
        { status: 404 },
      );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
