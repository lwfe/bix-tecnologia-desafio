"use client";
import styled from "styled-components";
import { ArrowDown, ArrowUp, Clock, DollarSign } from "lucide-react";
import type { Transaction } from "@/types";
import { formatCurrency } from "@/utils/formatters";

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
`;

const IconWrapper = styled.div<{ color: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const CardValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
`;

const CardFooter = styled.div`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const PositiveChange = styled.span`
  color: #10b981;
  display: flex;
  align-items: center;
`;

const NegativeChange = styled.span`
  color: #ef4444;
  display: flex;
  align-items: center;
`;

interface SummaryCardsProps {
  transactions: Transaction[];
}

export default function SummaryCards({ transactions }: SummaryCardsProps) {
  // Calcular totais
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

  // Calcular percentuais (simulados para demonstração)
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
