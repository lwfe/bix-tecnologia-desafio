"use client";
import type React from "react";
import { useState, useEffect } from "react";

import { Filter } from "lucide-react";
import { useFilter } from "@/contexts/FilterContext";
import { mockAccounts, mockIndustries, mockStates } from "@/data/mockData";

import {
  ApplyButton,
  ButtonGroup,
  DateInput,
  FilterContainer,
  FilterGrid,
  FilterGroup,
  FilterHeader,
  FilterLabel,
  FilterTitle,
  ResetButton,
  Select,
} from "./styles";

export function FilterBar() {
  const { filters, setFilters } = useFilter();
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    setFilters(localFilters);
  };

  const resetFilters = () => {
    const resetValues = {
      startDate: "",
      endDate: "",
      account: "",
      industry: "",
      state: "",
    };
    setLocalFilters(resetValues);
    setFilters(resetValues);
  };

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
          <DateInput
            type="date"
            id="endDate"
            name="endDate"
            value={localFilters.endDate}
            onChange={handleChange}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="account">Conta</FilterLabel>
          <Select
            id="account"
            name="account"
            value={localFilters.account}
            onChange={handleChange}
          >
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
          <Select
            id="industry"
            name="industry"
            value={localFilters.industry}
            onChange={handleChange}
          >
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
          <Select
            id="state"
            name="state"
            value={localFilters.state}
            onChange={handleChange}
          >
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
  );
}
