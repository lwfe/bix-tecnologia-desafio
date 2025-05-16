"use client";

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

import type { Summary } from "@/types";

import { formatCurrency } from "@/utils/formatters";

import {
  ChartCard,
  ChartContent,
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
              <YAxis tickFormatter={(value) => `R$${value / 1000}k`} />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                labelFormatter={(label) => `Estado: ${label}`}
              />
              <Legend />
              <Bar
                dataKey="deposit"
                stackId="a"
                name="Receitas"
                fill="#10b981"
              />
              <Bar
                dataKey="withdraw"
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
        </ChartHeader>
        <ChartContent>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dateData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `R$${value / 1000}k`} />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="deposit"
                name="Receitas"
                stroke="#10b981"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="withdraw"
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
