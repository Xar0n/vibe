import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { createClient } from '@/lib/supabase'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RecipeVerse - Делитесь своими рецептами",
  description: "Платформа для обмена рецептами и кулинарными идеями",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
