import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CloudLedger — Practical Cloud Cost Control",
    template: "%s | CloudLedger",
  },
  description:
    "CloudLedger helps developers, founders, and small teams reduce cloud costs, forecast spending, and build financially sane infrastructure.",
  metadataBase: new URL("https://cloudledger.dev"),
  openGraph: {
    title: "CloudLedger — Practical Cloud Cost Control",
    description:
      "Practical systems for reducing AWS & Azure costs without slowing delivery.",
    url: "https://cloudledger.dev",
    siteName: "CloudLedger",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudLedger — Practical Cloud Cost Control",
    description:
      "Practical systems for reducing AWS & Azure costs without slowing delivery.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
