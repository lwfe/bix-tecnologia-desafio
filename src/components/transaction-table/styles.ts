"use client";

import styled from "styled-components";

const TableContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  overflow-x: auto;
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const TableTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;

  ${({ status }) => {
    return `
        background-color: #d1fae5;
        color: #065f46;
      `;
  }}
`;

const TypeIcon = styled.span<{ type: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  margin-right: 0.5rem;

  ${({ type }) => {
    if (type === "deposit") {
      return `
        background-color: #d1fae5;
        color: #10b981;
      `;
    } else {
      return `
        background-color: #fee2e2;
        color: #ef4444;
      `;
    }
  }}
`;

const AmountCell = styled.span<{ type: string }>`
  color: ${({ type }) => (type === "deposit" ? "#10b981" : "#ef4444")};
  font-weight: 500;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e5e7eb;
`;

const PageInfo = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const PageControls = styled.div`
  display: flex;
  gap: 0.25rem;
`;

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
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: #6b7280;
`;

export {
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
};
