"use client";
import type { ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { FilterProvider } from "@/contexts/FilterContext";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyle from "@/styles/GlobalStyle";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <AuthProvider>
        <FilterProvider>
          <GlobalStyle />
          {children}
        </FilterProvider>
      </AuthProvider>
    </StyledComponentsRegistry>
  );
}
