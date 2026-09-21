import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import CatalogItem from "@/models/CatalogItem";
import ProjectItem from "@/models/Project"; // Припускаю, що твоя модель проєктів так називається

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ results: [] });
    }

    await connectToDatabase();

    // Робимо пошук нечутливим до регістру
    const searchRegex = new RegExp(query, "i");

    // 1. Шукаємо в Каталозі (по назві або опису)
    const catalogResultsPromise = CatalogItem.find({
      $or: [
        { name: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { category: { $regex: searchRegex } },
      ],
    }).lean();

    // 2. Шукаємо в Проєктах (по назві, опису або локації)
    const projectsResultsPromise = ProjectItem.find({
      $or: [
        { title: { $regex: searchRegex } },
        { shortDescription: { $regex: searchRegex } },
        { client: { $regex: searchRegex } },
      ],
    }).lean();

    // Виконуємо обидва запити паралельно для швидкості
    const [catalogResults, projectsResults] = await Promise.all([
      catalogResultsPromise,
      projectsResultsPromise,
    ]);

    // Форматуємо результати, щоб фронтенду було легше з ними працювати
    const formattedResults = [
      ...catalogResults.map((item) => ({
        _id: item._id,
        title: item.name,
        image: item.image,
        category: item.category,
        type: "catalog",
        url: `/catalog/${item.slug || item._id}`,
      })),
      ...projectsResults.map((item) => ({
        _id: item._id,
        title: item.title,
        image: item.mainImage,
        category: "Реалізований проєкт",
        type: "project",
        url: `/projects`, // або лінк на конкретний проєкт, якщо є
      })),
    ];

    return NextResponse.json({ results: formattedResults });
  } catch (error) {
    console.error("Помилка глобального пошуку:", error);
    return NextResponse.json({ error: "Помилка пошуку" }, { status: 500 });
  }
}
