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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ClientLayout>
          {children}
          <Toaster richColors position="top-center" />
        </ClientLayout>
      </body>
    </html>
  );
}
