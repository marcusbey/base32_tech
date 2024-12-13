import ClientLayout from "@/components/client-layout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BASE32 | Tech & Studio",
  description: "AI, Automation & Design Solutions",
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
      <body suppressHydrationWarning>
        <ClientLayout>
          {children}
          <Toaster richColors position="top-center" />
        </ClientLayout>
      </body>
    </html>
  );
}
