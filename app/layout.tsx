import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ERPProvider } from "@/context/erp-context";
import { ToastContainer } from "@/components/ui/toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduCare ERP — Enterprise Institution Portal",
  description: "Commercial-grade multi-tenant college management SaaS platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background-base text-text-primary">
        <ERPProvider>
          {children}
          <ToastContainer />
        </ERPProvider>
      </body>
    </html>
  );
}
