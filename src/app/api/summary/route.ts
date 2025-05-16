import fs from "fs";
import path from "path";
import { Transaction } from "@/types";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const filters = request.nextUrl.searchParams;
  const filePath = path.join(process.cwd(), "mocks", "transactions.json");

  try {
    const rawData = fs.readFileSync(filePath, "utf-8");
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

    let filteredData = allData.filter((transaction) => {
      const transactionDate = new Date(transaction.date).getTime();

      const matchesDateRange =
        (!startDate || transactionDate >= startDate) &&
        (!endDate || transactionDate <= endDate);

      const matchesAccount = accountFilter
        ? transaction.account === accountFilter
        : true;

      const matchesIndustry = industryFilter
        ? transaction.industry === industryFilter
        : true;

      const matchesState = stateFilter
        ? transaction.state === stateFilter
        : true;

      return (
        matchesDateRange && matchesAccount && matchesIndustry && matchesState
      );
    });

    const totalIncome = filteredData.reduce(
      (total: number, transaction: Transaction) => {
        if (transaction.transaction_type === "deposit") {
          return total + Number(transaction.amount / 100);
        }
        return total;
      },
      0
    );

    const totalExpense = filteredData.reduce(
      (total: number, transaction: Transaction) => {
        if (transaction.transaction_type === "withdraw") {
          return total + Number(transaction.amount / 100);
        }
        return total;
      },
      0
    );

    const totalAmount = totalIncome - totalExpense;

    const groupedByState = filteredData.reduce(
      (acc: any, transaction: Transaction) => {
        const { state, transaction_type, amount } = transaction;
        const stateIndex = acc.findIndex((s: any) => s.name === state);
        if (stateIndex === -1) {
          acc.push({ name: state, [transaction_type]: Number(amount / 100) });
        } else {
          acc[stateIndex][transaction_type] += Number(amount / 100);
        }
        return acc;
      },
      []
    );

    const groupedByDate = filteredData.reduce(
      (acc: any, transaction: Transaction) => {
        const { date, transaction_type, amount } = transaction;

        const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
          month: "2-digit",
          year: "numeric",
        });

        const existingIndex = acc.findIndex(
          (item: any) => item.name === formattedDate
        );

        if (existingIndex === -1) {
          acc.push({
            name: formattedDate,
            deposit: transaction_type === "deposit" ? Number(amount / 100) : 0,
            withdraw:
              transaction_type === "withdraw" ? Number(amount / 100) : 0,
          });
        } else {
          acc[existingIndex][transaction_type] =
            (acc[existingIndex][transaction_type] || 0) + Number(amount / 100);
        }

        return acc;
      },
      []
    );

    groupedByDate.sort((a: any, b: any) => {
      const [monthA, yearA] = a.name.split("/").map(Number);
      const [monthB, yearB] = b.name.split("/").map(Number);

      const dateA = new Date(yearA, monthA - 1);
      const dateB = new Date(yearB, monthB - 1);

      return dateA.getTime() - dateB.getTime();
    });

    groupedByDate.forEach((item: any) => {
      item.balance = (item.deposit || 0) - (item.withdraw || 0);
    });

    return Response.json({
      totalIncome,
      totalExpense,
      totalAmount,
      groupedByState,
      groupedByDate,
    });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
