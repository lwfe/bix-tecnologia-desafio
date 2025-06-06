"use client";
import { useState } from "react";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";

import type { Transaction } from "@/types";

import { formatCurrency, formatDate } from "@/utils/formatters";

import {
  TableContainer,
  TableHeader,
  TableTitle,
  Table,
  Th,
  Td,
  StatusBadge,
  TypeIcon,
  AmountCell,
  Pagination,
  PageInfo,
  PageControls,
  PageButton,
  EmptyState,
} from "./styles";

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <TableContainer>
      <TableHeader>
        <TableTitle>Transações Recentes</TableTitle>
      </TableHeader>

      {transactions.length === 0 ? (
        <EmptyState>
          Nenhuma transação encontrada com os filtros atuais.
        </EmptyState>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <Th>Descrição</Th>
                <Th>Conta</Th>
                <Th>Data</Th>
                <Th>Valor</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction) => (
                <tr key={transaction.amount}>
                  <Td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <TypeIcon type={transaction.transaction_type}>
                        {transaction.transaction_type === "deposit" ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )}
                      </TypeIcon>
                      {transaction.industry}
                    </div>
                  </Td>
                  <Td>{transaction.account}</Td>
                  <Td>{formatDate(transaction.date)}</Td>
                  <Td>
                    <AmountCell type={transaction.transaction_type}>
                      {transaction.transaction_type === "deposit" ? "+" : "-"}
                      {formatCurrency(transaction.amount / 100)}
                    </AmountCell>
                  </Td>
                  <Td>
                    <StatusBadge status={transaction.transaction_type}>
                      Concluído
                    </StatusBadge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <PageInfo>
              Mostrando {startIndex + 1}-
              {Math.min(endIndex, transactions.length)} de {transactions.length}{" "}
              transações
            </PageInfo>
            <PageControls>
              <PageButton onClick={goToPrevPage} disabled={currentPage === 1}>
                <ChevronLeft size={16} />
              </PageButton>
              <PageButton
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </PageButton>
            </PageControls>
          </Pagination>
        </>
      )}
    </TableContainer>
  );
}
