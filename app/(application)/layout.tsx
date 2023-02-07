"use client";

import config from "@/config/default";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function ApplicationLayout({ children }: Props) {
  const pathName = usePathname();

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
