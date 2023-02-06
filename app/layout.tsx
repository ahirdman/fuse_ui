"use client";

import { usePathname } from "next/navigation";
import "../styles/global.css";
import { Mulish } from "@next/font/google";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import config from "@/config/default";

const mulish = Mulish({
  variable: "--font-mulish",
});

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  const pathName = usePathname();

  const links = config.pages.map((page) => {
    return (
      <Link
        key={page.url}
        href={page.url}
        className={
          pathName === page.url
            ? "text-white"
            : "text-zinc-600 hover:text-white"
        }
      >
        {page.display}
      </Link>
    );
  });

  return (
    <html lang="en" className={`${mulish.variable} font-sans`}>
      <head />
      <body>
        <main className="flex h-screen w-screen flex-col bg-[#141416]">
          {children}
          {!pathName?.includes("auth") ? (
            <nav className="flex h-20 items-center justify-evenly bg-black text-white ">
              {links}
            </nav>
          ) : null}
          <Toaster position="bottom-center" />
        </main>
      </body>
    </html>
  );
}
