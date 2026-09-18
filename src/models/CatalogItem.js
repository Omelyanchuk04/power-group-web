import mongoose from "mongoose";

const CatalogItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    gallery: { type: [String], default: [] },

    // 🔥 ОНОВЛЕНІ ДИНАМІЧНІ ФІЛЬТРИ 🔥
    // Це приклад того, як має виглядати шматок твоєї моделі
    filters: {
      brand: { type: String, default: "" }, // Виробник
      power: { type: String, default: "" }, // Потужність
      dimensions: { type: String, default: "" }, // Габарити
      phase: { type: String, default: "" }, // Кількість фаз
      type: { type: String, default: "" }, // Тип інвертора
      executionType: { type: String, default: "" }, // Тип виконання (Силове обл.)
      subcategory: { type: String, default: "" }, // Підкатегорія (Кабелі, конектори)
      batteryType: { type: String, default: "" }, // Тип батареї (Акумулятори)
    },

    price: { type: Number },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.models.CatalogItem ||
  mongoose.model("CatalogItem", CatalogItemSchema);
