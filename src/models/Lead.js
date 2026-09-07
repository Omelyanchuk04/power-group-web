import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: "" },
    company: { type: String, default: "" },
    message: { type: String, default: "" },

    // Статус для адмінки (міні-CRM)
    status: {
      type: String,
      default: "Нова",
      enum: ["Нова", "В роботі", "Успіх", "Відмова"],
    },

    // Технічна інформація (з якого пристрою залишили)
    deviceInfo: { type: String, default: "" },
  },
  { timestamps: true }, // Автоматично додасть createdAt та updatedAt
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
