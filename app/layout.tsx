import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-montserrat",
});

const SITE_URL = "https://huishanchen.vercel.app";
const DESCRIPTION =
  "Product Designer turning research, data, and complex workflows into accessible, user-friendly B2B SaaS and AI experiences.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Hui-Shan Chen — Product Designer", template: "%s — Hui-Shan Chen" },
  description: DESCRIPTION,
  keywords: [
    "Hui-Shan Chen",
    "Product Designer",
    "B2B SaaS",
    "AI Experience",
    "Design Systems",
    "UX Research",
    "Portfolio",
  ],
  authors: [{ name: "Hui-Shan Chen" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Hui-Shan Chen — Product Designer",
    description: DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: "Hui-Shan Chen",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hui-Shan Chen — Product Designer",
    description: DESCRIPTION,
  },
  icons: { icon: "/favicon.svg?v=2" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body id="top">
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
