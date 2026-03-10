import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { siteConfig } from "@/lib/siteConfig";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Sherif Alghali - Tech Blog",
    template: "%s | Sherif Alghali",
  },
  description: siteConfig.description,
  keywords: [
    "Sherif Alghali",
    "Azure",
    "Cloud",
    "IT Infrastructure",
    "Technology",
    "DevOps",
    "Microsoft 365",
    "MCT",
    "Microsoft Certified Trainer",
  ],
  authors: [{ name: "Sherif Alghali", url: siteConfig.author.url }],
  creator: "Sherif Alghali",
  publisher: "Sherif Alghali",
  icons: {
    icon: siteConfig.favicon,
    shortcut: siteConfig.favicon,
    apple: siteConfig.favicon,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Sherif Alghali - Tech Blog",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} light`} suppressHydrationWarning>
      <body className="bg-white text-gray-900">
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
