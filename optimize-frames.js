const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "public", "frames");
const outputDir = path.join(__dirname, "public", "frames-compressed");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach((file) => {
  if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    sharp(inputPath)
      // Опціонально: зменште роздільну здатність, якщо оригінали завеликі
      // .resize({ width: 1920, withoutEnlargement: true })
      .jpeg({
        quality: 65, // Базове зниження якості (для динаміки 65-70 вистачає з головою)
        mozjpeg: true, // Вмикає оптимізований енкодер для меншого розміру
        chromaSubsampling: "4:2:0", // Стискає дані кольору без помітної втрати для ока
      })
      .toFile(outputPath)
      .then(() => console.log(`Стиснуто: ${file}`))
      .catch((err) => console.error(`Помилка з ${file}:`, err));
  }
});
