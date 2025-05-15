import type { Transaction } from "@/types";
import type { Filters } from "@/contexts/filter-context";

export function filterTransactions(
  transactions: Transaction[],
  filters: Filters
): Transaction[] {
  return transactions.filter((transaction) => {
    if (filters.startDate && transaction.date < filters.startDate) {
      return false;
    }

    if (filters.endDate && transaction.date > filters.endDate) {
      return false;
    }

    if (filters.account && transaction.account !== filters.account) {
      return false;
    }

    if (filters.industry && transaction.industry !== filters.industry) {
      return false;
    }

    if (filters.state && transaction.state !== filters.state) {
      return false;
    }

    return true;
  });
}
