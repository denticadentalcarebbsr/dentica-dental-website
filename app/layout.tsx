import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description:
    "Dentica – An Advanced Oral Care Centre in Bhubaneswar. Expert dental care by MDS specialists Dr. Sambarta Das (Endodontics) and Dr. Anand Garabadu (Orthodontics). Root canal, braces, implants, smile design.",
  keywords: [
    "dental clinic bhubaneswar",
    "dentist bhubaneswar",
    "root canal bhubaneswar",
    "orthodontist bhubaneswar",
    "dental implants bhubaneswar",
    "clear aligners bhubaneswar",
    "invisalign odisha",
    "smile designing bhubaneswar",
    "Dentica",
    "MDS specialist odisha",
    "best dentist saheed nagar",
  ],
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Dentica – Advanced Oral Care Centre | Bhubaneswar",
    description:
      "Expert dental care by MDS specialists in Bhubaneswar. Root canal, orthodontics, clear aligners, implants & smile design. Book your appointment today.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dentica – An Advanced Oral Care Centre, Bhubaneswar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dentica – Advanced Oral Care Centre | Bhubaneswar",
    description:
      "Expert dental care by MDS specialists in Bhubaneswar. Root canal, orthodontics, clear aligners, implants & smile design.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.jpg", type: "image/jpeg" },
    ],
    apple: "/favicon.jpg",
  },
  robots: { index: true, follow: true },
  verification: {},
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: siteConfig.name,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.line1,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.pincode,
    addressCountry: siteConfig.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.geo.lat,
    longitude: siteConfig.geo.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  priceRange: "₹₹",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.jpg" type="image/jpeg" />
        <link rel="shortcut icon" href="/favicon.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/favicon.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
