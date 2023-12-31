import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "./nav-bar";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import SessionProvider from "@/app/ui/providers/session-provider";

export const metadata: Metadata = {
  title: "Bribe Your Child",
  description: "Create and edit a list of prizes",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className="bg-slate-400 min-h-screen">
        <SessionProvider session={session}>
          <NavBar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
