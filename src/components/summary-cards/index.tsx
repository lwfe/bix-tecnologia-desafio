import { formatCurrency } from "@/utils/formatters";
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react";
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

interface SummaryCardsProps {
  totalIncome: number;
  totalExpense: number;
}

export function SummaryCards({ totalIncome, totalExpense }: SummaryCardsProps) {
  const balance = totalIncome - totalExpense;

  const incomeChange = 12.5;
  const expenseChange = 8.3;
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
        <CardValue>{formatCurrency(totalIncome)}</CardValue>
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
        <CardValue>{formatCurrency(totalExpense)}</CardValue>
        <CardFooter>
          <NegativeChange>
            <ArrowUp size={12} /> {expenseChange}%
          </NegativeChange>
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
