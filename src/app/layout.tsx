import type { Metadata } from "next";
import "./globals.css";
import { timeFormatting } from "@/lib/utils";

export const metadata: Metadata = {
  title: `${timeFormatting(new Date())}`,
  description: "오늘 할거 적기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
