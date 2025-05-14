import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DefaultProviders } from "@/providers/default";

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
        <DefaultProviders>{children}</DefaultProviders>
      </body>
    </html>
  );
}
