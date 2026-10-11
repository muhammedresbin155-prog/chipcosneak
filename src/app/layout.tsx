import type { Metadata, Viewport } from "next";
import { Inter, Anton, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context/Providers";
import { Layout } from "@/components/layout/Layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
  weight: "400",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "CHIPCOSNEAKS - Fresh Kicks. Bold Energy.",
    template: "%s | CHIPCOSNEAKS",
  },
  description: "Premium sneakers and streetwear. Fresh kicks, bold energy, your style your rules. Free shipping on orders over ₹2,999.",
  keywords: ["sneakers", "streetwear", "running shoes", "basketball shoes", "lifestyle sneakers", "limited edition"],
  authors: [{ name: "CHIPCOSNEAKS" }],
  creator: "CHIPCOSNEAKS",
  publisher: "CHIPCOSNEAKS",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://chipcosneaks.com",
    siteName: "CHIPCOSNEAKS",
    title: "CHIPCOSNEAKS - Fresh Kicks. Bold Energy.",
    description: "Premium sneakers and streetwear. Fresh kicks, bold energy, your style your rules.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "CHIPCOSNEAKS Premium Sneakers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CHIPCOSNEAKS - Fresh Kicks. Bold Energy.",
    description: "Premium sneakers and streetwear. Fresh kicks, bold energy, your style your rules.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#62469B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable} ${bebas.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Anton&display=swap" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-dark-text">
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}