import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://acutabovesalon.co.uk"),
  title: "Hair Salon Chatham | A Cut Above Unisex Salon & BA Aesthetics",
  description:
    "A Cut Above unisex hair salon in Chatham, Medway. Expert hair colouring, balayage, bridal hair, barber services & BA Aesthetics — lip fillers & botox. Call 07450 987978.",
  keywords: [
    "hair salon chatham",
    "hair salon medway",
    "hair dresser medway",
    "barber medway",
    "barber chatham",
    "hair colouring medway",
    "balayage chatham",
    "bridal hair medway",
    "lip fillers chatham",
    "botox medway",
    "aesthetics chatham",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { "max-snippet": -1, "max-image-preview": "large" },
  },
  icons: {
    icon: "/photo-storefront.webp",
    shortcut: "/photo-storefront.webp",
    apple: "/photo-storefront.webp",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "A Cut Above Unisex Salon & BA Aesthetics",
  telephone: "07450987978",
  address: {
    "@type": "PostalAddress",
    streetAddress: "20 Shirley Ave",
    addressLocality: "Chatham",
    addressRegion: "Medway",
    postalCode: "ME5 9UR",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.3656,
    longitude: 0.5361,
  },
  areaServed: ["Chatham", "Medway", "Rochester", "Gillingham", "Strood"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Salon Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hair Colouring Chatham" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Balayage Medway" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Barber Chatham" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lip Fillers Chatham" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Botox Medway" } },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
