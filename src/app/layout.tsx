import type { Metadata } from "next";
import { Playfair_Display, Spectral } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
});
const spectral = Spectral({
  weight: "400",
  subsets: ["latin"],
  variable: '--font-spectral',
});

export const metadata: Metadata = {
  title: "David Udelson",
  description: "David Udelson is a web developer designer and personal growth coach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${spectral.variable}`}>{children}</body>
    </html>
  );
}
