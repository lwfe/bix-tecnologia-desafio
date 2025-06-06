import fs from "fs";
import path from "path";
import { Transaction } from "@/types";

export async function GET() {
  const filePath = path.join(process.cwd(), "mocks", "transactions.json");

  try {
    const rawData = fs.readFileSync(filePath, "utf-8");
    const allData = JSON.parse(rawData);

    const uniqueAccounts = Array.from(
      new Set(allData.map((transaction: Transaction) => transaction.account))
    );

    return Response.json(uniqueAccounts);
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
