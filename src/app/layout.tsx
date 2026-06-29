import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://timeconvy.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TimeConvy — Convert Time Zones Instantly",
    template: "%s — TimeConvy",
  },
  description:
    "Convert time between any two time zones instantly. Free, fast, and accurate with automatic daylight saving time support.",
  keywords: [
    "time zone converter",
    "IST to EST",
    "GMT to IST",
    "time difference calculator",
    "meeting time planner",
    "world clock",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "TimeConvy — Convert Time Zones Instantly",
    description:
      "Convert time between any two time zones instantly. Free, fast, and accurate with automatic daylight saving time support.",
    type: "website",
    url: SITE_URL,
    siteName: "TimeConvy",
  },
  twitter: {
    card: "summary_large_image",
    title: "TimeConvy — Convert Time Zones Instantly",
    description: "Convert time between any two time zones instantly.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "TimeConvy",
  url: SITE_URL,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Convert time between any two time zones instantly. Free, fast, and accurate with automatic daylight saving time support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
