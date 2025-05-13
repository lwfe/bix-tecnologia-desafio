export interface Transaction {
  id: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
  date: string
  status: "completed" | "pending" | "cancelled"
  account: string
  industry: string
  state: string
}

export interface Account {
  id: string
  name: string
}

export interface ChartDataPoint {
  name: string
  income: number
  expense: number
  balance?: number
}

export interface MonthlyDataPoint {
  month: string
  income: number
  expense: number
  balance: number
}
