import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    // 🔥 НОВЕ ПОЛЕ: SLUG ДЛЯ SEO-ПОСИЛАНЬ
    slug: { type: String, unique: true },

    shortDescription: { type: String, required: true },
    client: { type: String },
    clientType: { type: String },

    // 🔥 ТЕПЕР ЦЕ МАСИВ, ЩОБ МОЖНА БУЛО ДОДАТИ ДЕКІЛЬКА РІШЕНЬ
    serviceType: [{ type: String }],

    power: { type: Number },

    // 🔥 НОВЕ ПОЛЕ: ЄМНІСТЬ (необов'язкове)
    capacity: { type: Number },

    mainImage: { type: String, required: true },
    gallery: [{ type: String }],
    date: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
