import { Transaction } from "@/types";
import {
  Card,
  CardFooter,
  CardHeader,
  CardsGrid,
  CardTitle,
  CardValue,
  IconWrapper,
  NegativeChange,
  PositiveChange,
} from "./styles";
import { ArrowDown, ArrowUp, Clock, DollarSign } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

interface SummaryCardsProps {
  transactions: Transaction[];
}

export function SummaryCards({ transactions }: SummaryCardsProps) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const pending = transactions
    .filter((t) => t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  const incomeChange = 12.5;
  const expenseChange = 8.3;
  const pendingChange = -5.2;
  const balanceChange = 15.7;

  return (
    <CardsGrid>
      <Card>
        <CardHeader>
          <CardTitle>Receitas</CardTitle>
          <IconWrapper color="#10b981">
            <ArrowUp size={16} />
          </IconWrapper>
        </CardHeader>
        <CardValue>{formatCurrency(income)}</CardValue>
        <CardFooter>
          <PositiveChange>
            <ArrowUp size={12} /> {incomeChange}%
          </PositiveChange>
          desde o último período
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Despesas</CardTitle>
          <IconWrapper color="#ef4444">
            <ArrowDown size={16} />
          </IconWrapper>
        </CardHeader>
        <CardValue>{formatCurrency(expenses)}</CardValue>
        <CardFooter>
          <NegativeChange>
            <ArrowUp size={12} /> {expenseChange}%
          </NegativeChange>
          desde o último período
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pendentes</CardTitle>
          <IconWrapper color="#f59e0b">
            <Clock size={16} />
          </IconWrapper>
        </CardHeader>
        <CardValue>{formatCurrency(pending)}</CardValue>
        <CardFooter>
          <PositiveChange>
            <ArrowDown size={12} /> {Math.abs(pendingChange)}%
          </PositiveChange>
          desde o último período
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Saldo Total</CardTitle>
          <IconWrapper color="#4f46e5">
            <DollarSign size={16} />
          </IconWrapper>
        </CardHeader>
        <CardValue>{formatCurrency(balance)}</CardValue>
        <CardFooter>
          <PositiveChange>
            <ArrowUp size={12} /> {balanceChange}%
          </PositiveChange>
          desde o último período
        </CardFooter>
      </Card>
    </CardsGrid>
  );
}
