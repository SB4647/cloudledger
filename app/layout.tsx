import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CSSProperties, ReactNode } from "react";

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

const containerStyle: CSSProperties = {
  maxWidth: "960px",
  margin: "0 auto",
  padding: "0 1.5rem",
};

const headerStyle: CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 10,
  borderBottom: "1px solid #222",
  background: "rgba(0,0,0,0.8)",
  backdropFilter: "blur(10px)",
};

const navStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
  height: "64px",
};

const brandStyle: CSSProperties = {
  fontWeight: 700,
  letterSpacing: "0.2px",
  textDecoration: "none",
  color: "inherit",
};

const linksStyle: CSSProperties = {
  display: "flex",
  gap: "1.25rem",
  alignItems: "center",
  fontSize: "0.95rem",
};

const linkStyle: CSSProperties = {
  textDecoration: "none",
  color: "inherit",
  opacity: 0.85,
};

const bodyStyle: CSSProperties = {
  background: "#000",
  color: "#fff",
  minHeight: "100vh",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={bodyStyle}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CloudLedger",
              url: "https://cloudledger.dev",
              description:
                "CloudLedger is a practical engineering platform for understanding, forecasting, and reducing cloud infrastructure costs.",
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "CloudLedger",
              url: "https://cloudledger.dev",
            }),
          }}
        />

        <header style={headerStyle}>
          <div style={containerStyle}>
            <nav style={navStyle}>
              <Link
                href="/"
                style={{
                  ...brandStyle,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                }}
              >
                <Image
                  src="/public/cloudledge_logo.png"
                  alt="CloudLedger logo"
                  width={32}
                  height={32}
                  priority
                />
                <span>CloudLedger</span>
              </Link>

              <div style={linksStyle}>
                <Link href="/guides" style={linkStyle}>
                  Guides
                </Link>
                <Link href="/tools" style={linkStyle}>
                  Tools
                </Link>
                <Link href="/cases" style={linkStyle}>
                  Case Studies
                </Link>
                <Link href="/resources" style={linkStyle}>
                  Resources
                </Link>
              </div>
            </nav>
          </div>
        </header>

        {/* Keeps all pages aligned under the same container */}
        <div style={containerStyle}>{children}</div>
      </body>
    </html>
  );
}
