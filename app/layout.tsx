import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neon-ai-crm.netlify.app"),
  title: "NEON WhatsApp AI Bot + CRM",
  description:
    "Three-page WhatsApp AI lead collection app with CRM and dashboard for NEON TOURISM FZE.",
  openGraph: {
    title: "NEON WhatsApp AI Bot + CRM",
    description:
      "Focused AI bot, CRM, and dashboard app for collecting and managing travel leads.",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "NEON WhatsApp AI Bot + CRM",
    description:
      "Focused AI bot, CRM, and dashboard app for collecting and managing travel leads."
  }
};

export const viewport: Viewport = {
  themeColor: "#06111f",
  colorScheme: "dark light"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
