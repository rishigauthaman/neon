import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Amb. Dr. Isha Farha Quraishy | Cinematic Portfolio",
  description:
    "A luxury 3D digital journey for Amb. Dr. Isha Farha Quraishy: Miss UAE, Forbes featured personality, speaker, humanitarian, and entrepreneur.",
  openGraph: {
    title: "Amb. Dr. Isha Farha Quraishy",
    description:
      "Cinematic 3D portfolio experience for a global tech celebrity and public speaker.",
    images: ["/images/isha-forbes-cover.png"]
  }
};

export const viewport: Viewport = {
  themeColor: "#020817",
  colorScheme: "dark"
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
