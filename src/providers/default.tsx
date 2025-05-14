"use client";
import type { ReactNode } from "react";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { AuthProvider } from "@/contexts/auth-context";
import { StyledComponentsRegistry } from "@/lib/registry";
import { FilterProvider } from "@/contexts/filter-context";

export function DefaultProviders({ children }: { children: ReactNode }) {
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
