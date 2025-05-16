export interface Transaction {
  date: number;
  amount: number;
  transaction_type: string;
  currency: string;
  account: string;
  industry: string;
  state: string;
}

export interface ChartDataPoint {
  name: string;
  income: number;
  expense: number;
  balance?: number;
}

export interface MonthlyDataPoint {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

export interface Summary {
  totalIncome: number;
  totalExpense: number;
  totalAmount: number;
  groupedByState: {
    name: string;
    deposit: number;
    withdraw: number;
  }[];
  groupedByDate: {
    name: string;
    deposit: number;
    withdraw: number;
    balance: number;
  }[];
}
