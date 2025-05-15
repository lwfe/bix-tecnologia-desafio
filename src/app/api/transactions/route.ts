import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const filePath = path.join(process.cwd(), "mocks", "transactions.json");

  try {
    const rawData = fs.readFileSync(filePath, "utf-8");
    const allData = JSON.parse(rawData);

    const page = Number(request.nextUrl.searchParams.get("page")) || 1;
    const perPage = 25;
    const start = (page - 1) * perPage;
    const end = start + perPage;

    const paginated = allData.slice(start, end);

    return Response.json({
      data: paginated,
      total: allData.length,
      page,
      perPage,
    });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
