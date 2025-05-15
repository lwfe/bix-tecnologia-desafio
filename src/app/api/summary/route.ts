import fs from "fs";
import path from "path";
import { Transaction } from "@/types";

export async function GET() {
  const filePath = path.join(process.cwd(), "mocks", "transactions.json");

  try {
    const rawData = fs.readFileSync(filePath, "utf-8");
    const allData = JSON.parse(rawData);

    const totalIncome = allData.reduce(
      (total: number, transaction: Transaction) => {
        if (transaction.transaction_type === "deposit") {
          return total + Number(transaction.amount / 100);
        }
        return total;
      },
      0
    );

    const totalExpense = allData.reduce(
      (total: number, transaction: Transaction) => {
        if (transaction.transaction_type === "withdraw") {
          return total + Number(transaction.amount / 100);
        }
        return total;
      },
      0
    );

    const totalAmount = totalIncome - totalExpense;

    const groupedByState = allData.reduce(
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

    const groupedByDate = allData.reduce(
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
            [transaction_type]: Number(amount / 100),
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
