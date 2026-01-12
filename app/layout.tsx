import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Hostel Mess Management System",
  description: "A Smart, Digital Solution to Manage Hostel Mess Operations Efficiently",
};

import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased min-h-screen bg-background text-foreground")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
