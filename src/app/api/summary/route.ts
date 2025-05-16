import { promises as fs } from "fs";
import path from "path";
import { Transaction } from "@/types";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const filters = request.nextUrl.searchParams;
  const filePath = path.join(process.cwd(), "mocks", "transactions.json");

  try {
    const rawData = await fs.readFile(filePath, "utf-8");
    const allData: Transaction[] = JSON.parse(rawData);

    const startDateParam = filters.get("startDate");
    const endDateParam = filters.get("endDate");
    const accountFilter = filters.get("account");
    const industryFilter = filters.get("industry");
    const stateFilter = filters.get("state");

    const startDate = startDateParam
      ? new Date(startDateParam).getTime()
      : null;
    const endDate = endDateParam ? new Date(endDateParam).getTime() : null;

    const filteredData = allData.filter((transaction) => {
      const transactionDate = new Date(transaction.date).getTime();

      return (
        (!startDate || transactionDate >= startDate) &&
        (!endDate || transactionDate <= endDate) &&
        (!accountFilter || transaction.account === accountFilter) &&
        (!industryFilter || transaction.industry === industryFilter) &&
        (!stateFilter || transaction.state === stateFilter)
      );
    });

    let totalIncome = 0;
    let totalExpense = 0;
    const groupedByState: Record<string, any> = {};
    const groupedByDateMap: Record<string, any> = {};

    for (const transaction of filteredData) {
      const { amount, transaction_type, state, date } = transaction;
      const amountValue = Number(amount) / 100;

      if (transaction_type === "deposit") totalIncome += amountValue;
      else if (transaction_type === "withdraw") totalExpense += amountValue;

      if (!groupedByState[state]) {
        groupedByState[state] = { name: state, deposit: 0, withdraw: 0 };
      }
      groupedByState[state][transaction_type] += amountValue;

      const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
        month: "2-digit",
        year: "numeric",
      });

      if (!groupedByDateMap[formattedDate]) {
        groupedByDateMap[formattedDate] = {
          name: formattedDate,
          deposit: 0,
          withdraw: 0,
        };
      }
      groupedByDateMap[formattedDate][transaction_type] += amountValue;
    }

    const groupedByStateArr = Object.values(groupedByState);

    const groupedByDateArr = Object.values(groupedByDateMap).sort(
      (a: any, b: any) => {
        const [monthA, yearA] = a.name.split("/").map(Number);
        const [monthB, yearB] = b.name.split("/").map(Number);
        return (
          new Date(yearA, monthA - 1).getTime() -
          new Date(yearB, monthB - 1).getTime()
        );
      }
    );

    groupedByDateArr.forEach((item: any) => {
      item.balance = (item.deposit || 0) - (item.withdraw || 0);
    });

    const totalAmount = totalIncome - totalExpense;

    return Response.json({
      totalIncome,
      totalExpense,
      totalAmount,
      groupedByState: groupedByStateArr,
      groupedByDate: groupedByDateArr,
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
