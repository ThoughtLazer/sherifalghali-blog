import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sherif Alghali - Tech Blog",
  description: "IT Infrastructure and Azure expertise from a certified professional",
  keywords: ["Azure", "Cloud", "IT Infrastructure", "Technology", "DevOps"],
  authors: [{ name: "Sherif Alghali" }],
  creator: "Sherif Alghali",
  icons: {
    icon: "https://sherifalghalistaticsite.blob.core.windows.net/images/Sherif-Favicon.jpg",
    shortcut: "https://sherifalghalistaticsite.blob.core.windows.net/images/Sherif-Favicon.jpg",
    apple: "https://sherifalghalistaticsite.blob.core.windows.net/images/Sherif-Favicon.jpg",
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
