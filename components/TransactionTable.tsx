"use client"
import { useState } from "react"
import styled from "styled-components"
import type { Transaction } from "@/types"
import { formatCurrency, formatDate } from "@/utils/formatters"
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Clock } from "lucide-react"

const TableContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  overflow-x: auto;
`

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`

const TableTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Th = styled.th`
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
`

const Td = styled.td`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
`

const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${({ status }) => {
    if (status === "completed") {
      return `
        background-color: #d1fae5;
        color: #065f46;
      `
    } else if (status === "pending") {
      return `
        background-color: #fef3c7;
        color: #92400e;
      `
    } else {
      return `
        background-color: #fee2e2;
        color: #b91c1c;
      `
    }
  }}
`

const TypeIcon = styled.span<{ type: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  
  ${({ type }) => {
    if (type === "income") {
      return `
        background-color: #d1fae5;
        color: #10b981;
      `
    } else {
      return `
        background-color: #fee2e2;
        color: #ef4444;
      `
    }
  }}
`

const AmountCell = styled.span<{ type: string }>`
  color: ${({ type }) => (type === "income" ? "#10b981" : "#ef4444")};
  font-weight: 500;
`

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e5e7eb;
`

const PageInfo = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`

const PageControls = styled.div`
  display: flex;
  gap: 0.25rem;
`

const PageButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  background-color: white;
  color: ${({ disabled }) => (disabled ? "#d1d5db" : "#374151")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  
  &:hover:not(:disabled) {
    background-color: #f9fafb;
  }
`

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: #6b7280;
`

interface TransactionTableProps {
  transactions: Transaction[]
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Calcular paginação
  const totalPages = Math.ceil(transactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTransactions = transactions.slice(startIndex, endIndex)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <TableContainer>
      <TableHeader>
        <TableTitle>Transações Recentes</TableTitle>
      </TableHeader>

      {transactions.length === 0 ? (
        <EmptyState>Nenhuma transação encontrada com os filtros atuais.</EmptyState>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <Th>Descrição</Th>
                <Th>Categoria</Th>
                <Th>Data</Th>
                <Th>Valor</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <Td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <TypeIcon type={transaction.type}>
                        {transaction.type === "income" ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                      </TypeIcon>
                      {transaction.description}
                    </div>
                  </Td>
                  <Td>{transaction.category}</Td>
                  <Td>{formatDate(transaction.date)}</Td>
                  <Td>
                    <AmountCell type={transaction.type}>
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </AmountCell>
                  </Td>
                  <Td>
                    <StatusBadge status={transaction.status}>
                      {transaction.status === "pending" && <Clock size={12} style={{ marginRight: "4px" }} />}
                      {transaction.status === "completed"
                        ? "Concluído"
                        : transaction.status === "pending"
                          ? "Pendente"
                          : "Cancelado"}
                    </StatusBadge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <PageInfo>
              Mostrando {startIndex + 1}-{Math.min(endIndex, transactions.length)} de {transactions.length} transações
            </PageInfo>
            <PageControls>
              <PageButton onClick={goToPrevPage} disabled={currentPage === 1}>
                <ChevronLeft size={16} />
              </PageButton>
              <PageButton onClick={goToNextPage} disabled={currentPage === totalPages}>
                <ChevronRight size={16} />
              </PageButton>
            </PageControls>
          </Pagination>
        </>
      )}
    </TableContainer>
  )
}
