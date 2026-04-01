import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteFooter from "./components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const APP_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://blocnote.arthurp.fr";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f17" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "BlocNote — Bloc-notes Markdown en ligne gratuit",
    template: "%s | BlocNote",
  },
  description:
    "BlocNote est un bloc-notes en ligne moderne et gratuit avec support Markdown complet, sauvegarde automatique, mode sombre, export, et raccourcis clavier. Aucune inscription requise.",
  keywords: [
    "bloc-notes en ligne",
    "notes markdown",
    "éditeur markdown gratuit",
    "bloc-note en ligne",
    "prise de notes",
    "notepad en ligne",
    "éditeur de texte en ligne",
    "markdown preview",
    "sauvegarde automatique notes",
    "mode sombre notes",
    "notes sans inscription",
    "blocnote",
  ],
  authors: [{ name: "BlocNote" }],
  creator: "BlocNote",
  publisher: "BlocNote",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: APP_URL,
    languages: {
      "fr-FR": APP_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: APP_URL,
    siteName: "BlocNote",
    title: "BlocNote — Bloc-notes Markdown en ligne gratuit",
    description:
      "Prenez des notes en Markdown avec aperçu en temps réel, sauvegarde automatique et mode sombre. Gratuit, sans inscription.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BlocNote — Éditeur de notes Markdown en ligne",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlocNote — Bloc-notes Markdown en ligne gratuit",
    description:
      "Prenez des notes en Markdown avec aperçu en temps réel, sauvegarde automatique et mode sombre. Gratuit, sans inscription.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  category: "productivity",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "BlocNote",
  url: APP_URL,
  description:
    "Bloc-notes en ligne moderne et gratuit avec support Markdown, sauvegarde automatique, mode sombre et export.",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "All",
  browserRequirements: "Requires a modern web browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  featureList: [
    "Éditeur Markdown avec aperçu en temps réel",
    "Sauvegarde automatique",
    "Mode sombre et clair",
    "Export en fichier texte",
    "Raccourcis clavier",
    "Notes épinglables",
    "Recherche instantanée",
  ],
  inLanguage: "fr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a href="#main-content" className="skip-to-content">Aller au contenu principal</a>
        <div className="site-shell">
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
