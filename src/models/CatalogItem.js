import mongoose from "mongoose";
import slugify from "slugify";

const CatalogItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    gallery: { type: [String], default: [] },

    // Старий формат (один файл) — залишаємо для сумісності
    datasheetUrl: { type: String, default: "" },

    // 🔥 НОВИЙ ФОРМАТ: Масив файлів
    documents: [
      {
        title: { type: String, required: true }, // Назва (напр. "Інструкція користувача")
        url: { type: String, required: true }, // Посилання на завантажений PDF
      },
    ],

    filters: {
      brand: { type: String, default: "" },
      power: { type: String, default: "" },
      dimensions: { type: String, default: "" },
      phase: { type: String, default: "" },
      type: { type: String, default: "" },
      executionType: { type: String, default: "" },
      subcategory: { type: String, default: "" },
      batteryType: { type: String, default: "" },
    },
    price: { type: Number },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true },
);

CatalogItemSchema.pre("save", async function () {
  if (this.isModified("name")) {
    const baseSlug = slugify(this.name, {
      lower: true,
      strict: true,
      locale: "uk",
    });

    const uniqueSuffix = Math.random().toString(36).substring(2, 7);
    this.slug = `${baseSlug}-${uniqueSuffix}`;
  }
});

export default mongoose.models.CatalogItem ||
  mongoose.model("CatalogItem", CatalogItemSchema);
