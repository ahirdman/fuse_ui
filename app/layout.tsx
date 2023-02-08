"use client";

import "../styles/global.css";
import { Mulish } from "@next/font/google";
import { Toaster } from "react-hot-toast";

const mulish = Mulish({
  variable: "--font-mulish",
});

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${mulish.variable} font-sans`}>
      <head />
      <body>
        <main className="flex h-screen w-screen flex-col overflow-hidden bg-[#141416]">
          {children}
          <Toaster position="top-center" />
        </main>
      </body>
    </html>
  );
}
