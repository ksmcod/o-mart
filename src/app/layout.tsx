import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Header from "@/components/header/Header";
import Container from "@/components/Container";
import { auth } from "@/auth";
import TanstackProvider from "@/components/providers/tanstack-provider";

export const metadata: Metadata = {
  title: "O'mart | Buy and sell anything",
  description: "A marketplace app built with Nextjs",
};

const font = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <TanstackProvider>
          <SessionProvider session={session}>
            <Header />

            <Container>{children}</Container>
          </SessionProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
