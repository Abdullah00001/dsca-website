import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif, Figtree } from "next/font/google";
import { SiteShell } from "@/components/layout";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "800"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DSCA Barista Academy | Dhaka Specialty Coffee Academy",
  description:
    "ISO 9001:2015 certified barista training institute in Dhaka. Real machines, small batches, job-ready skills.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${instrumentSerif.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
