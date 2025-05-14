"use client";
import { useEffect, useState } from "react";

import { useFilter } from "@/contexts/FilterContext";
import { filterTransactions } from "@/utils/filterUtils";

import { Transaction } from "@/types";
import { mockTransactions } from "@/data/mockData";

import { Sidebar } from "@/components/sidebar";
import FilterBar from "@/components/FilterBar";
import SummaryCards from "@/components/SummaryCards";
import TransactionTable from "@/components/TransactionTable";
import TransactionCharts from "@/components/TransactionCharts";

import {
  ContentGrid,
  DashboardContainer,
  DashboardHeader,
  MainContent,
  Subtitle,
  Title,
} from "./styles";

export default function DashboardPage() {
  const { filters } = useFilter();
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  useEffect(() => {
    const filtered = filterTransactions(mockTransactions, filters);
    setFilteredTransactions(filtered);
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
          <SummaryCards transactions={filteredTransactions} />
          <TransactionCharts transactions={filteredTransactions} />
          <TransactionTable transactions={filteredTransactions} />
        </ContentGrid>
      </MainContent>
    </DashboardContainer>
  );
}
