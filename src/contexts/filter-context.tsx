"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import Cookies from "js-cookie";

export interface Filters {
  startDate: string;
  endDate: string;
  account: string;
  industry: string;
  state: string;
}

interface FilterContextType {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const COOKIE_EXPIRATION_IN_DAYS = 30;
const FILTER_COOKIE_NAME = "dashboard_filters";

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFiltersState] = useState<Filters>({
    startDate: "",
    endDate: "",
    account: "",
    industry: "",
    state: "",
  });

  useEffect(() => {
    const savedFilters = Cookies.get(FILTER_COOKIE_NAME);

    if (savedFilters) {
      try {
        const parsedFilters = JSON.parse(savedFilters);
        setFiltersState(parsedFilters);
      } catch (error) {
        console.error("Erro ao analisar filtros salvos:", error);
      }
    }
  }, []);

  const setFilters = (newFilters: Filters) => {
    setFiltersState(newFilters);

    Cookies.set(FILTER_COOKIE_NAME, JSON.stringify(newFilters), {
      expires: COOKIE_EXPIRATION_IN_DAYS,
    });
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);

  if (context === undefined) {
    throw new Error("useFilter deve ser usado dentro de um FilterProvider");
  }

  return context;
}
