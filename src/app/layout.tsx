import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { GlobalStyle } from "@/styles/global-styles";
import { AuthProvider } from "@/contexts/auth-context";
import { StyledComponentsRegistry } from "@/lib/registry";
import { FilterProvider } from "@/contexts/filter-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard - BixTecnologia",
  description: "Dashboard financeiro com filtros dinâmicos e visualizações",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <AuthProvider>
            <FilterProvider>
              <GlobalStyle />
              {children}
            </FilterProvider>
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
