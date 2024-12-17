import ClientLayout from "@/components/client-layout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ScrollProvider } from "@/context/scroll-context";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://base32.tech'),
  title: {
    default: "BASE32 | AI Software Development & Consulting",
    template: "%s | BASE32"
  },
  description: "Expert AI software development, automation solutions, and tech consulting. Specializing in LLMs, machine learning, and custom AI applications for businesses.",
  keywords: [
    "Romain BOBOE",
    "BASE32",
    "AI software development",
    "Romain BOBOE BASE32",
    "Romain BOBOE tech consulting",
    "artificial intelligence consulting",
    "machine learning solutions",
    "LLM applications",
    "custom AI development",
    "tech automation",
    "AI integration",
    "software engineering",
    "tech consulting Montreal",
    "AI consulting",
    "business automation",
    "AI strategy",
    "digital transformation",
    "AI implementation",
    "software solutions",
    "tech innovation",
    "AI architecture",
    "system automation",
    "AI optimization",
    "enterprise AI",
    "Montreal tech",
    "Quebec AI company",
    "Canadian tech solutions",
    "AI development Montreal",
    "tech consulting Quebec"
  ],
  creator: "Romain BOBOE",
  publisher: "BASE32",
  authors: [{ 
    name: "Romain BOBOE",
    url: "https://romainboboe.com"
  }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "BASE32 | AI Software Development & Consulting",
    description: "Expert AI software development, automation solutions, and tech consulting. Specializing in LLMs, machine learning, and custom AI applications for businesses.",
    url: 'https://base32.tech',
    siteName: 'BASE32',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BASE32 - AI Software Development & Consulting',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BASE32 | AI Software Development & Consulting',
    description: 'Expert AI software development, automation solutions, and tech consulting services',
    images: ['/images/twitter-image.jpg'],
    creator: 'Romain BOBOE',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://base32.tech',
    languages: {
      'en-US': 'https://base32.tech',
      'fr-CA': 'https://base32.tech/fr',
    },
  },
};

// These attributes are added by browser extensions and should be included in SSR
const extensionAttributes = {
  "data-kantu": "1",
  "data-new-gr-c-s-check-loaded": "14.1212.0",
  "data-gr-ext-installed": "",
  "data-gr-ext-disabled": "forever",
} as const;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={inter.className}
      {...extensionAttributes}
      suppressHydrationWarning
    >
      <head>
        <script defer data-website-id="6745e0e710cb0518ebd02c97" data-domain="base32.tech" src="https://datafa.st/js/script.js"></script>
      </head>
      <body suppressHydrationWarning>
        <ScrollProvider>
          <ClientLayout>
            {children}
            <Toaster richColors position="top-center" />
          </ClientLayout>
        </ScrollProvider>
      </body>
    </html>
  ); 
}
 