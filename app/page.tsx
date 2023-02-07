"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative flex h-full items-center justify-center text-white">
      <motion.div
        className=" absolute h-20 w-20 rounded-full bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0.5, 1.5, 1], opacity: [0, 0.5, 1, 0] }}
        className=" absolute h-32 w-32 rounded-full bg-black"
      />
      <div className="absolute flex h-20 w-20 items-center justify-center">
        <motion.svg className="h-2/3 w-2/3 animate-spin" viewBox="0 0 50 50">
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 0.5, 0], transition: { duration: 2 } }}
            fill="none"
            strokeWidth="2"
            stroke="#e75627"
            d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
            className="translate-x-[5px] translate-y-[5px] "
          />
        </motion.svg>
      </div>
    </div>
  );
}
