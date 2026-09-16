import mongoose from "mongoose";

const CatalogItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    image: { type: String }, // URL головного зображення

    // Динамічні фільтри зберігаємо тут
    filters: {
      brand: { type: String },
      power: { type: String },
      dimensions: { type: String },
      phases: { type: String },
      type: { type: String },
    },

    // Можна додати ціну, наявність тощо
    price: { type: Number },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.models.CatalogItem ||
  mongoose.model("CatalogItem", CatalogItemSchema);
