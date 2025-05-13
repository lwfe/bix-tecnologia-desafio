"use client"
import { useState } from "react"
import styled from "styled-components"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import type { Transaction } from "@/types"
import { formatCurrency } from "@/utils/formatters"
import { groupTransactionsByMonth, groupTransactionsByCategory } from "@/utils/chartUtils"

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const ChartCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  height: 400px;
  display: flex;
  flex-direction: column;
`

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`

const ChartTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
`

const ChartControls = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ChartButton = styled.button<{ active?: boolean }>`
  background-color: ${(props) => (props.active ? "#4f46e5" : "white")};
  color: ${(props) => (props.active ? "white" : "#6b7280")};
  border: 1px solid ${(props) => (props.active ? "#4f46e5" : "#e5e7eb")};
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${(props) => (props.active ? "#4338ca" : "#f9fafb")};
  }
`

const ChartContent = styled.div`
  flex: 1;
  width: 100%;
`

interface TransactionChartsProps {
  transactions: Transaction[]
}

export default function TransactionCharts({ transactions }: TransactionChartsProps) {
  const [timeRange, setTimeRange] = useState<"3m" | "6m" | "1y">("6m")

  // Dados para o gráfico de barras empilhadas (por categoria)
  const categoryData = groupTransactionsByCategory(transactions)

  // Dados para o gráfico de linha (por mês)
  const monthlyData = groupTransactionsByMonth(transactions, timeRange)

  return (
    <ChartsContainer>
      <ChartCard>
        <ChartHeader>
          <ChartTitle>Transações por Categoria</ChartTitle>
        </ChartHeader>
        <ChartContent>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `R$${value / 1000}k`} />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                labelFormatter={(label) => `Categoria: ${label}`}
              />
              <Legend />
              <Bar dataKey="income" stackId="a" name="Receitas" fill="#10b981" />
              <Bar dataKey="expense" stackId="a" name="Despesas" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContent>
      </ChartCard>

      <ChartCard>
        <ChartHeader>
          <ChartTitle>Fluxo de Caixa</ChartTitle>
          <ChartControls>
            <ChartButton active={timeRange === "3m"} onClick={() => setTimeRange("3m")}>
              3 meses
            </ChartButton>
            <ChartButton active={timeRange === "6m"} onClick={() => setTimeRange("6m")}>
              6 meses
            </ChartButton>
            <ChartButton active={timeRange === "1y"} onClick={() => setTimeRange("1y")}>
              1 ano
            </ChartButton>
          </ChartControls>
        </ChartHeader>
        <ChartContent>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `R$${value / 1000}k`} />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Legend />
              <Line type="monotone" dataKey="income" name="Receitas" stroke="#10b981" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="expense" name="Despesas" stroke="#ef4444" />
              <Line type="monotone" dataKey="balance" name="Saldo" stroke="#4f46e5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContent>
      </ChartCard>
    </ChartsContainer>
  )
}
