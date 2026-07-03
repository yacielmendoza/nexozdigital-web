import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

// Self-hosted Google Fonts via next/font (no layout shift, no external request).
// Space Grotesk = brand heading typeface (Brand Book v1).
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"]
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"]
});

const SITE_URL = "https://nexozdigital.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Nexoz Digital | Agencia Digital Bilingüe en Big Spring, TX",
    template: "%s | Nexoz Digital"
  },
  description:
    "Agencia digital bilingüe en Big Spring, TX. Diseño web, marketing digital, SEO local y automatización con IA que conectan tu negocio con los clientes que te buscan.",
  keywords: [
    "agencia digital bilingüe",
    "diseño web Big Spring TX",
    "marketing digital West Texas",
    "SEO local",
    "automatización IA",
    "bilingual digital agency Texas"
  ],
  authors: [{ name: "Nexoz Digital Solutions, LLC" }],
  alternates: {
    canonical: SITE_URL,
    languages: {
      es: `${SITE_URL}/`,
      en: `${SITE_URL}/en`,
      "x-default": `${SITE_URL}/`
    }
  },
  openGraph: {
    type: "website",
    locale: "es_US",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "Nexoz Digital",
    title: "Nexoz Digital | Agencia Digital Bilingüe en Big Spring, TX",
    description:
      "Presencia digital que conecta tu negocio con los clientes que te están buscando. En español. En inglés. En tu ciudad.",
    images: [
      {
        url: "/nexoz-mark.png",
        width: 1200,
        height: 630,
        alt: "Nexoz Digital"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexoz Digital | Agencia Digital Bilingüe",
    description:
      "Diseño web, marketing y automatización con IA. 100% bilingüe · Big Spring, TX.",
    images: ["/nexoz-mark.png"]
  },
  robots: { index: true, follow: true }
};

// Schema.org LocalBusiness structured data for rich results + AI discovery.
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Nexoz Digital Solutions LLC",
  description:
    "Agencia digital bilingüe en Big Spring, TX. Diseño web, marketing digital, automatización con IA y branding.",
  url: SITE_URL,
  telephone: "+1-432-000-0000",
  email: "hola@nexozdigital.com",
  image: `${SITE_URL}/nexoz-mark.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Big Spring",
    addressLocality: "Big Spring",
    addressRegion: "TX",
    postalCode: "79720",
    addressCountry: "US"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 32.2504,
    longitude: -101.4787
  },
  areaServed: [
    { "@type": "City", name: "Big Spring" },
    { "@type": "State", name: "Texas" },
    { "@type": "Country", name: "United States" }
  ],
  knowsLanguage: ["es", "en"],
  sameAs: [
    "https://www.facebook.com/nexozdigital",
    "https://www.instagram.com/nexozdigital",
    "https://www.linkedin.com/company/nexozdigital"
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00"
  },
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Credit Card, Bank Transfer",
  inLanguage: ["es", "en"]
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <script
          type="application/ld+json"
          // Structured data must be injected as raw JSON.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema)
          }}
        />
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
