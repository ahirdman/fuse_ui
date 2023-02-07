"use client";

import "../styles/global.css";
import { Mulish } from "@next/font/google";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const mulish = Mulish({
  variable: "--font-mulish",
});

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
      toast.success("Signed in");
    }

    if (!loading && !user) {
      router.replace("/signin");
    }
  }, [user, loading]);

  return (
    <html lang="en" className={`${mulish.variable} font-sans`}>
      <head />
      <body>
        <main className="flex h-screen w-screen flex-col overflow-hidden bg-[#141416]">
          {children}
          <Toaster position="bottom-center" />
        </main>
      </body>
    </html>
  );
}
