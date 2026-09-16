import mongoose from "mongoose";

const CatalogSettingsSchema = new mongoose.Schema(
  {
    categories: { type: [String], default: [] },
    brands: { type: [String], default: [] },
  },
  { timestamps: true },
);

export default mongoose.models.CatalogSettings ||
  mongoose.model("CatalogSettings", CatalogSettingsSchema);
