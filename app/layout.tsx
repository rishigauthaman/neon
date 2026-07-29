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
  metadataBase: new URL("https://neon-tourism-fze.openai.site"),
  title: "NEON TOURISM FZE | AI Travel, WhatsApp Sales Agent, CRM",
  description:
    "Premium AI-powered travel platform for NEON TOURISM FZE with website, WhatsApp sales agent, CRM, booking system, admin tools, and analytics dashboard.",
  openGraph: {
    title: "NEON TOURISM FZE",
    description:
      "Dubai travel concierge platform combining luxury website, WhatsApp AI, CRM, booking, and sales analytics.",
    images: ["https://neontourism.com/wp-content/uploads/2024/11/listing-6.jpg"],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "NEON TOURISM FZE",
    description:
      "AI-powered travel website and CRM for Neon Tourism in Dubai.",
    images: ["https://neontourism.com/wp-content/uploads/2024/11/listing-6.jpg"]
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
