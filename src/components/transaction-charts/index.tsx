"use client";

import { useState } from "react";
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
} from "recharts";

import type { Summary, Transaction } from "@/types";

import { formatCurrency } from "@/utils/formatters";
import {
  groupTransactionsByMonth,
  groupTransactionsByCategory,
} from "@/utils/chart-utils";

import {
  ChartButton,
  ChartCard,
  ChartContent,
  ChartControls,
  ChartHeader,
  ChartsContainer,
  ChartTitle,
} from "./styles";

interface TransactionChartsProps {
  stateData: Summary["groupedByState"];
  dateData: Summary["groupedByDate"];
}

export function TransactionCharts({
  dateData,
  stateData,
}: TransactionChartsProps) {
  const [timeRange, setTimeRange] = useState<"3m" | "6m" | "1y">("6m");

  return (
    <ChartsContainer>
      <ChartCard>
        <ChartHeader>
          <ChartTitle>Transações por Estado</ChartTitle>
        </ChartHeader>
        <ChartContent>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stateData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `R$${value * 1000}k`} />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value / 1000))}
                labelFormatter={(label) => `Estado: ${label}`}
              />
              <Legend />
              <Bar
                dataKey="income"
                stackId="a"
                name="Receitas"
                fill="#10b981"
              />
              <Bar
                dataKey="expense"
                stackId="a"
                name="Despesas"
                fill="#ef4444"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContent>
      </ChartCard>

      <ChartCard>
        <ChartHeader>
          <ChartTitle>Fluxo de Caixa</ChartTitle>
          <ChartControls>
            <ChartButton
              active={timeRange === "3m"}
              onClick={() => setTimeRange("3m")}
            >
              3 meses
            </ChartButton>
            <ChartButton
              active={timeRange === "6m"}
              onClick={() => setTimeRange("6m")}
            >
              6 meses
            </ChartButton>
            <ChartButton
              active={timeRange === "1y"}
              onClick={() => setTimeRange("1y")}
            >
              1 ano
            </ChartButton>
          </ChartControls>
        </ChartHeader>
        <ChartContent>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dateData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `R$${value / 1000}k`} />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                name="Receitas"
                stroke="#10b981"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                name="Despesas"
                stroke="#ef4444"
              />
              <Line
                type="monotone"
                dataKey="balance"
                name="Saldo"
                stroke="#0033CC"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContent>
      </ChartCard>
    </ChartsContainer>
  );
}
