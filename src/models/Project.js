import mongoose from "mongoose";

// models/Project.js
const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    client: { type: String },
    clientType: { type: String },
    serviceType: { type: String },
    power: { type: Number },
    mainImage: { type: String, required: true },
    gallery: [{ type: String }],

    // 🔥 ДОДАЄМО ПОЛЕ ДАТИ
    date: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
