"use client"
import { useState, useEffect } from "react"
import type React from "react"

import styled from "styled-components"
import { useFilter } from "@/contexts/FilterContext"
import { Filter } from "lucide-react"
import { mockAccounts, mockIndustries, mockStates } from "@/data/mockData"

const FilterContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-top: 1rem;
`

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`

const FilterTitle = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const FilterLabel = styled.label`
  font-size: 0.75rem;
  color: #6b7280;
`

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 0.875rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
  }
`

const DateInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: flex-end;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
`

const ApplyButton = styled(Button)`
  background-color: #4f46e5;
  color: white;
  border: none;
  
  &:hover {
    background-color: #4338ca;
  }
`

const ResetButton = styled(Button)`
  background-color: white;
  color: #4b5563;
  border: 1px solid #e5e7eb;
  
  &:hover {
    background-color: #f9fafb;
  }
`

export default function FilterBar() {
  const { filters, setFilters } = useFilter()
  const [localFilters, setLocalFilters] = useState(filters)

  // Atualiza os filtros locais quando os filtros globais mudam
  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const applyFilters = () => {
    setFilters(localFilters)
  }

  const resetFilters = () => {
    const resetValues = {
      startDate: "",
      endDate: "",
      account: "",
      industry: "",
      state: "",
    }
    setLocalFilters(resetValues)
    setFilters(resetValues)
  }

  return (
    <FilterContainer>
      <FilterHeader>
        <FilterTitle>
          <Filter size={16} />
          Filtros
        </FilterTitle>
      </FilterHeader>

      <FilterGrid>
        <FilterGroup>
          <FilterLabel htmlFor="startDate">Data Inicial</FilterLabel>
          <DateInput
            type="date"
            id="startDate"
            name="startDate"
            value={localFilters.startDate}
            onChange={handleChange}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="endDate">Data Final</FilterLabel>
          <DateInput type="date" id="endDate" name="endDate" value={localFilters.endDate} onChange={handleChange} />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="account">Conta</FilterLabel>
          <Select id="account" name="account" value={localFilters.account} onChange={handleChange}>
            <option value="">Todas as contas</option>
            {mockAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </Select>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="industry">Indústria</FilterLabel>
          <Select id="industry" name="industry" value={localFilters.industry} onChange={handleChange}>
            <option value="">Todas as indústrias</option>
            {mockIndustries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </Select>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="state">Estado</FilterLabel>
          <Select id="state" name="state" value={localFilters.state} onChange={handleChange}>
            <option value="">Todos os estados</option>
            {mockStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Select>
        </FilterGroup>
      </FilterGrid>

      <ButtonGroup>
        <ResetButton onClick={resetFilters}>Limpar</ResetButton>
        <ApplyButton onClick={applyFilters}>Aplicar Filtros</ApplyButton>
      </ButtonGroup>
    </FilterContainer>
  )
}
