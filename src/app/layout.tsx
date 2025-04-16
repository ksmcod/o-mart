import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "@/components/header/Header";
import Container from "@/components/Container";
import { auth } from "@/auth";
import TanstackProvider from "@/components/providers/tanstack-provider";

export const metadata: Metadata = {
  title: "O'mart | Buy and sell your electronics",
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
        <Toaster
          position="bottom-left"
          toastOptions={{
            success: {
              style: {
                backgroundColor: "#14532d",
                width: "280px",
                color: "white",
                padding: "10px",
                textWrap: "wrap",
                fontWeight: "bold",
              },
            },
            error: {
              style: {
                backgroundColor: "#7f1d1d",
                width: "280px",
                color: "white",
                padding: "10px",
                textWrap: "wrap",
                fontWeight: "bold",
              },
            },
          }}
        />
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
