import type { Transaction } from "@/types"
import type { Filters } from "@/contexts/FilterContext"

export function filterTransactions(transactions: Transaction[], filters: Filters): Transaction[] {
  return transactions.filter((transaction) => {
    // Filtrar por data inicial
    if (filters.startDate && transaction.date < filters.startDate) {
      return false
    }

    // Filtrar por data final
    if (filters.endDate && transaction.date > filters.endDate) {
      return false
    }

    // Filtrar por conta
    if (filters.account && transaction.account !== filters.account) {
      return false
    }

    // Filtrar por indústria
    if (filters.industry && transaction.industry !== filters.industry) {
      return false
    }

    // Filtrar por estado
    if (filters.state && transaction.state !== filters.state) {
      return false
    }

    return true
  })
}
