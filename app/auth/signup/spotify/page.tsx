"use client";

import { auth } from "@/lib/firebase";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { FiCheck } from "react-icons/fi";

export default function AuthenticateSpotify() {
  const [user, loading, error] = useAuthState(auth);

  // Happy path:
  // Auth is done and redirected correclty
  // When user is signed in, animate div and then navigate to home screen

  // Something went wrong... ?

  return (
    <div className="row-span-2 row-start-3 flex-col items-center justify-center justify-self-stretch overflow-hidden px-10 text-zinc-600 md:col-span-3 md:col-start-2 2xl:col-span-1 2xl:col-start-2">
      <div className="flex items-center">
        <div className="my-4 h-12 w-12 rounded-2xl bg-zinc-800 uppercase text-zinc-500 hover:text-white hover:shadow-lg focus:outline-none">
          <span className="flex h-full items-center justify-center text-white">
            <FiCheck />
          </span>
        </div>
        <p className="whitespace-nowrap pl-4 text-white">
          <span className="font-bold uppercase text-[#e75627]">Fuse</span>{" "}
          account created
        </p>
      </div>
      <AnimatePresence>
        {!user ? (
          <motion.p
            key="info"
            layout
            initial={false}
            animate={{ opacity: 1, height: "auto" }}
            exit={{
              opacity: 0,
              height: 0,
              transition: { duration: 0.5 },
            }}
            className=" overflow-hidden text-center"
          >
            You need to allow <span className="font-bold">fuse</span> to acces
            your spotify library. Click the button below to authorize.
          </motion.p>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          key="display"
          layout
          className="flex w-full items-center justify-start"
        >
          <motion.button
            layout
            disabled={true}
            initial={{ width: "100%" }}
            animate={{
              width: user ? "3rem" : "100%",
            }}
            transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
            className="my-4 flex h-12  items-center justify-center rounded-2xl bg-zinc-800 uppercase text-zinc-500  "
          >
            {user ? (
              <span className="text-white">
                <FiCheck />
              </span>
            ) : (
              "Sign in with Spotify"
            )}
          </motion.button>
          {user ? (
            <motion.p
              key="connected"
              initial={{ opacity: 0, x: 100, width: 0 }}
              animate={{ opacity: 1, x: 0, width: "auto" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="whitespace-nowrap pl-4 text-white"
            >
              <span className="font-bold uppercase text-[#e75627]">
                Spotify
              </span>{" "}
              connected
            </motion.p>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
