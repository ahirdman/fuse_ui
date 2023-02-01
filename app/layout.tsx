"use client";

import { usePathname, useRouter } from "next/navigation";
import "../styles/global.css";
import { Mulish } from "@next/font/google";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import config from "@/config/default";

const mulish = Mulish({
  variable: "--font-mulish",
});

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  const [user] = useAuthState(auth);
  // const router = useRouter();
  const pathName = usePathname();

  // useEffect(() => {
  //   // if (user) {
  //   //   router.replace('/dashboard');
  //   // }

  //   if (user) {
  //     console.log('signed in');
  //   } else {
  //     console.log('signed out');
  //   }

  //   // if (!user) {
  //   //   router.replace('/auth');
  //   // }
  // }, [user]);

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
          <nav
            className={`${
              user ? "opacity-100" : "opacity-0"
            } flex h-20 items-center justify-evenly bg-black text-white transition-all duration-500 ease-in-out`}
          >
            {links}
          </nav>
          <Toaster position="bottom-center" />
        </main>
      </body>
    </html>
  );
}
