import type { Transaction, ChartDataPoint, MonthlyDataPoint } from "@/types"

// Agrupar transações por categoria para gráfico de barras empilhadas
export function groupTransactionsByCategory(transactions: Transaction[]): ChartDataPoint[] {
  const categories = [...new Set(transactions.map((t) => t.category))]

  return categories.map((category) => {
    const categoryTransactions = transactions.filter((t) => t.category === category)

    const income = categoryTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

    const expense = categoryTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

    return {
      name: category,
      income,
      expense,
    }
  })
}

// Agrupar transações por mês para gráfico de linha
export function groupTransactionsByMonth(
  transactions: Transaction[],
  timeRange: "3m" | "6m" | "1y",
): MonthlyDataPoint[] {
  // Determinar o número de meses com base no timeRange
  const monthsToShow = timeRange === "3m" ? 3 : timeRange === "6m" ? 6 : 12

  // Obter a data atual e calcular a data de início com base no timeRange
  const now = new Date()
  const startDate = new Date()
  startDate.setMonth(now.getMonth() - monthsToShow + 1)
  startDate.setDate(1)

  // Criar um array com todos os meses no intervalo
  const months: MonthlyDataPoint[] = []
  for (let i = 0; i < monthsToShow; i++) {
    const date = new Date(startDate)
    date.setMonth(startDate.getMonth() + i)

    const monthName = date.toLocaleString("pt-BR", { month: "short" })
    const year = date.getFullYear()
    const monthKey = `${monthName}/${year.toString().slice(2)}`

    months.push({
      month: monthKey,
      income: 0,
      expense: 0,
      balance: 0,
    })
  }

  // Filtrar transações dentro do intervalo de tempo
  const filteredTransactions = transactions.filter((t) => {
    const transactionDate = new Date(t.date)
    return transactionDate >= startDate && transactionDate <= now
  })

  // Agrupar transações por mês
  filteredTransactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date)
    const monthIndex =
      transactionDate.getMonth() - startDate.getMonth() + (transactionDate.getFullYear() - startDate.getFullYear()) * 12

    if (monthIndex >= 0 && monthIndex < monthsToShow) {
      if (transaction.type === "income") {
        months[monthIndex].income += transaction.amount
      } else {
        months[monthIndex].expense += transaction.amount
      }
    }
  })

  // Calcular o saldo para cada mês
  months.forEach((month) => {
    month.balance = month.income - month.expense
  })

  return months
}
