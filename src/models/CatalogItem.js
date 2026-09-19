import mongoose from "mongoose";
import slugify from "slugify";

const CatalogItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    // 🔥 ЗМІНА ТУТ: Додано унікальний індекс 🔥
    // unique: true гарантує, що в базі не буде двох товарів з однаковим slug.
    // Також додано required, бо slug обов'язковий для SEO роутингу.
    slug: { type: String, required: true, unique: true },

    category: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    gallery: { type: [String], default: [] },
    datasheetUrl: { type: String, default: "" },
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

// 🔥 ОНОВЛЕНИЙ БЛОК: Автоматична генерація слага перед збереженням 🔥

// Ми використовуємо звичайну функцію (function), а не стрілочну (=>),
// щоб мати доступ до 'this' (поточного документа).
// Ми використовуємо async функцію (сучасний стандарт Mongoose 5+),
// тому колбек 'next' більше не потрібен. Хук завершиться, коли виконається функція.

CatalogItemSchema.pre("save", async function () {
  // 1. Генеруємо slug ТІЛЬКИ якщо ім'я було змінено або це новий товар
  if (this.isModified("name")) {
    const baseSlug = slugify(this.name, {
      lower: true,
      strict: true, // видаляє спецсимволи (+, &, % і т.д.)
      locale: "uk", // транслітерація з української
    });

    // 2. ОБОВ'ЯЗКОВО: Додаємо унікальний суфікс (щоб уникнути помилок при однакових назвах)
    // Якщо створити два товари "Інвертор Deye 5kW", обидва отримають slug "invertor-deye-5kw".
    // База даних видасть помилку E11000 (duplicate key) через unique: true.
    // Тому додаємо випадковий суфікс або timestamp.
    const uniqueSuffix = Math.random().toString(36).substring(2, 7);
    this.slug = `${baseSlug}-${uniqueSuffix}`;
  }
});

export default mongoose.models.CatalogItem ||
  mongoose.model("CatalogItem", CatalogItemSchema);
