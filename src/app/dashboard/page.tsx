"use client";
import { useEffect, useState } from "react";

import { useFilter } from "@/contexts/filter-context";

import { Summary, Transaction } from "@/types";

import { Sidebar } from "@/components/sidebar";
import { FilterBar } from "@/components/filter-bar";
import { SummaryCards } from "@/components/summary-cards";
import { TransactionTable } from "@/components/transaction-table";
import { TransactionCharts } from "@/components/transaction-charts";

import {
  ContentGrid,
  DashboardContainer,
  DashboardHeader,
  MainContent,
  Subtitle,
  Title,
} from "./styles";

export default function DashboardPage() {
  const { filters, queryStringFilters } = useFilter();
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    fetch("/api/transactions?" + queryStringFilters, { cache: "force-cache" })
      .then((res) => res.json())
      .then((data) => setFilteredTransactions(data.data));
    fetch("/api/summary?" + queryStringFilters, { cache: "force-cache" })
      .then((res) => res.json())
      .then((data) => setSummary(data));
  }, [filters]);

  return (
    <DashboardContainer>
      <Sidebar />
      <MainContent>
        <DashboardHeader>
          <Title>Dashboard Financeiro</Title>
          <Subtitle>Visualize e analise suas finanças</Subtitle>
        </DashboardHeader>

        <FilterBar />

        <ContentGrid>
          <SummaryCards
            totalIncome={summary?.totalIncome || 0}
            totalExpense={summary?.totalExpense || 0}
          />
          <TransactionCharts
            dateData={summary?.groupedByDate || []}
            stateData={summary?.groupedByState || []}
          />
          <TransactionTable transactions={filteredTransactions} />
        </ContentGrid>
      </MainContent>
    </DashboardContainer>
  );
}
