import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "5SCENT - Perfume Shop",
  description: "Discover the finest selection of perfumes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
