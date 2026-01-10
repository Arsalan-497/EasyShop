import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster as Sonner } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EasyShop - Shop Smart, Shop Easy",
  description: "Your trusted online shopping destination. Quality products, fast delivery, and secure payments at EasyShop.",
  keywords: ["EasyShop", "online shopping", "e-commerce", "products", "shopping", "deals"],
  authors: [{ name: "EasyShop Team" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "EasyShop - Shop Smart, Shop Easy",
    description: "Your trusted online shopping destination",
    url: "https://easyshop.com",
    siteName: "EasyShop",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EasyShop - Shop Smart, Shop Easy",
    description: "Your trusted online shopping destination",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
        <Sonner />
      </body>
    </html>
  );
}
