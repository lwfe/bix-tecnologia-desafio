import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";
import { Transaction } from "@/types";

export async function GET(request: NextRequest) {
  const filePath = path.join(process.cwd(), "mocks", "transactions.json");

  try {
    const rawData = fs.readFileSync(filePath, "utf-8");
    const allData: Transaction[] = JSON.parse(rawData);

    const params = request.nextUrl.searchParams;

    const initialDate = params.get("startDate");
    const finalDate = params.get("finalDate");
    const account = params.get("account");
    const industry = params.get("industry");
    const state = params.get("state");

    const initialDateObj = initialDate ? new Date(initialDate).getTime() : null;
    const finalDateObj = finalDate ? new Date(finalDate).getTime() : null;

    const filteredData = allData.filter((transaction) => {
      const transactionDate = new Date(transaction.date).getTime();

      const matchesDateRange =
        (!initialDateObj || transactionDate >= initialDateObj) &&
        (!finalDateObj || transactionDate <= finalDateObj);

      const matchesAccount = account ? transaction.account === account : true;

      const matchesIndustry = industry
        ? transaction.industry === industry
        : true;

      const matchesState = state ? transaction.state === state : true;

      return (
        matchesDateRange && matchesAccount && matchesIndustry && matchesState
      );
    });

    const page = Number(params.get("page")) || 1;
    const perPage = 25;
    const start = (page - 1) * perPage;
    const end = start + perPage;

    const paginated = filteredData.slice(start, end);

    return Response.json({
      data: paginated,
      total: filteredData.length,
      page,
      perPage,
    });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
