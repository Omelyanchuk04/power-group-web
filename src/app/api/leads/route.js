import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Lead from "@/models/Lead";

export async function GET() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    // Отримуємо всі заявки, сортуємо від найновіших до найстаріших
    const leads = await Lead.find().sort({ createdAt: -1 });

    return NextResponse.json(leads);
  } catch (error) {
    console.error("Помилка при отриманні заявок:", error);
    return NextResponse.json(
      { error: "Не вдалося завантажити заявки" },
      { status: 500 },
    );
  }
}
