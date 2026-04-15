const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Шляхи до папок (зміни, якщо твої картинки лежать в іншому місці)
const inputDir = path.join(__dirname, "..", "public", "frames");
const outputDir = path.join(__dirname, "..", "public", "frames-compressed");

// Створюємо папку для вихідних файлів, якщо її немає
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Читаємо всі файли в папці
fs.readdir(inputDir, (err, files) => {
  if (err) throw err;

  const jpgFiles = files.filter((file) => file.endsWith(".jpg"));
  let processedCount = 0;

  console.log(`Знайдено ${jpgFiles.length} файлів. Починаю стиснення...`);

  jpgFiles.forEach((file) => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    sharp(inputPath)
      .resize({ width: 1080, withoutEnlargement: true }) // Зменшуємо до 1080px по ширині (опціонально)
      .jpeg({ quality: 60, progressive: true, mozjpeg: true }) // mozjpeg дає найкраще стиснення
      .toFile(outputPath)
      .then((info) => {
        processedCount++;
        console.log(
          `[${processedCount}/${jpgFiles.length}] Стиснуто: ${file} -> ${(info.size / 1024).toFixed(1)} KB`,
        );
      })
      .catch((err) => console.error(`Помилка з файлом ${file}:`, err));
  });
});
