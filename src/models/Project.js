import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    client: { type: String },
    mainImage: { type: String, required: true },
    clientType: { type: String, required: true, default: "b2c" },
    serviceType: { type: String, required: true, default: "solar" },
    power: { type: Number, required: true, default: 0 },
    // Поле powerLabel видалено
  },
  { timestamps: true },
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
