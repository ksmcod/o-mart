import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "O'mart | Buy and sell anything",
  description: "A marketplace app built with Nextjs",
};

const font = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <Header />

        <Container>{children}</Container>
      </body>
    </html>
  );
}
