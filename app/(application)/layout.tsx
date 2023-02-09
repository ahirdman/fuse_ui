"use client";

import { SignedOutToast } from "@/components/toasts";
import config from "@/config/default";
import { auth } from "@/lib/firebase/initialization";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

export default function ApplicationLayout({ children }: Props) {
  const [user, loading] = useAuthState(auth);

  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/signin");
      toast.custom((toast) => (
        <SignedOutToast toast={toast} text="Signed out" />
      ));
    }
  });

  const links = config.pages.map((page) => {
    return (
      <Link key={page.url} href={page.url} legacyBehavior>
        <a
          className={
            pathName === page.url
              ? "text-white"
              : "text-zinc-600 hover:text-white"
          }
        >
          {page.display}
        </a>
      </Link>
    );
  });

  return (
    <section className="h-[calc(100%-5rem)]">
      {children}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "tween" }}
        className="flex h-20 items-center justify-evenly bg-black text-white "
      >
        {links}
      </motion.nav>
    </section>
  );
}
