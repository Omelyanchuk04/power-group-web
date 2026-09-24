const fs = require("fs");
const path = require("path");

const folderPath =
  "/Users/oleksandr/Desktop/MyProjects/power-group/public/frames";

// Зчитуємо всі файли в папці
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Помилка читання папки:", err);
    return;
  }

  // Відфільтровуємо тільки зображення (ігноруємо приховані файли типу .DS_Store)
  const images = files.filter(
    (file) =>
      file.toLowerCase().endsWith(".jpg") ||
      file.toLowerCase().endsWith(".jpeg") ||
      file.toLowerCase().endsWith(".png"),
  );

  // Сортуємо файли "розумним" методом (щоб 2 йшло перед 10)
  images.sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
  );

  images.forEach((file, index) => {
    const ext = path.extname(file);

    // Формуємо номер з нулями спереду (001, 002, 010, 150)
    const newNumber = String(index + 1).padStart(3, "0");
    const newName = `frame-${newNumber}${ext}`;

    const oldPath = path.join(folderPath, file);
    const newPath = path.join(folderPath, newName);

    // Перейменовуємо
    fs.renameSync(oldPath, newPath);
  });

  console.log(`✅ Готово! Успішно перейменовано ${images.length} файлів.`);
});
