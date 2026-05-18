import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastProvider } from "../components/ToastContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InsightForge AI | Autonomous Lead Enrichment & Audit Platform",
  description: "A complete full-stack AI-powered lead automation platform built for the SimplifiIQ AI Software Developer Intern Assessment. Features Zod validation, Cheerio scraping, Gemini AI inference, Puppeteer PDF generation, Resend email delivery, and Google Sheets/Drive integration.",
  keywords: ["AI Lead Enrichment", "Gemini AI", "Next.js 15", "SimplifiIQ Assessment", "Puppeteer PDF", "Autonomous Workflow"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200" suppressHydrationWarning>
        <ToastProvider>
          <Navbar />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
