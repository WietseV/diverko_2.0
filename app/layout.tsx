import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Diverko | Sales consultancy & training",
    template: "%s | Diverko",
  },
  description: "Diverko supports sales teams through consultancy, training, and motorsport-inspired coaching.",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang?: string };
}>) {
  const lang = params?.lang ?? "en";
  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary_light text-primary_dark`}>
        {children}
      </body>
    </html>
  );
}
