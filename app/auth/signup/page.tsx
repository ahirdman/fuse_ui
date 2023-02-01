"use client";

import { AnimatePresence, motion } from "framer-motion";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FiCheck } from "react-icons/fi";
import { LayoutGroup, usePresence } from "framer-motion";

type User = true | undefined;

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [createUserWithEmailAndPassword, user, loading, error] =
  //   useCreateUserWithEmailAndPassword(auth);

  const [user, setuser] = useState<User>(undefined);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user) {
      setuser(undefined);
    } else {
      setuser(true);
    }
    // createUserWithEmailAndPassword(email, password);
  };

  return (
    <motion.form
      layout
      onSubmit={handleSignUp}
      className={`row-span-2 row-start-3 flex flex-col justify-self-stretch overflow-hidden px-10 text-zinc-600 md:col-span-3 md:col-start-2 2xl:col-span-1 2xl:col-start-2 
        `}
    >
      <AnimatePresence mode="wait">
        {!user ? (
          <SignUpUpInput setEmail={setEmail} setPassword={setPassword} />
        ) : null}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          layout
          transition={{ delay: 1.2, duration: 1 }}
          className="relative flex w-full items-center"
        >
          <SignUpButton accountCreated={user} />
          {user ? (
            <motion.p
              key="status"
              layout
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="  pl-4 text-white"
            >
              <span className="font-bold uppercase text-[#e75627]">Fuse</span>{" "}
              account created
            </motion.p>
          ) : null}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {!user ? <SignInLink /> : null}
        {user ? <AuthorizeSpotify /> : null}
      </AnimatePresence>
    </motion.form>
  );
}

interface Props {
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
}

const SignUpUpInput = ({ setEmail, setPassword }: Props) => {
  return (
    <motion.div
      key="spotify"
      layout
      initial={false}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="flex flex-col pb-5"
    >
      <label htmlFor="email" className="pb-1">
        Email address
      </label>
      <input
        type="text"
        id="email"
        name="email"
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 border-b border-zinc-700 bg-transparent pb-4 text-white caret-[#e75627] hover:border-white focus:outline-none"
      />
      <label htmlFor="password" className="">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 border-b border-zinc-700 bg-transparent pb-4 text-white caret-[#e75627] hover:border-white focus:outline-none"
      />
    </motion.div>
  );
};

const SignInLink = () => {
  return (
    <motion.p
      key="sign"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className="text-center"
    >
      Already have an account?{" "}
      <Link href="/auth" className="text-white">
        Sign in
      </Link>
    </motion.p>
  );
};

const SignUpButton = ({ accountCreated }: { accountCreated: User }) => {
  return (
    <motion.button
      layout
      key="hello"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      type="submit"
      disabled={accountCreated}
      className={`h-12 rounded-2xl bg-zinc-800 uppercase text-zinc-500 transition-width duration-700 ease-out hover:text-white hover:shadow-lg focus:outline-none ${
        accountCreated ? " w-12 " : "w-full"
      }`}
    >
      {accountCreated ? (
        <span className="flex items-center justify-center text-white">
          <FiCheck />
        </span>
      ) : (
        "sign up"
      )}
    </motion.button>
  );
};

const AuthorizeSpotify = () => {
  return (
    <motion.div
      key="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, delay: 1.5 }}
      exit={{ opacity: 0.5 }}
    >
      <p className="mb-4">
        You need to allow <span className="font-bold">fuse</span> to acces your
        spotify library. Click the button below to authorize.
      </p>
      <button className="w-full rounded-2xl bg-zinc-800 p-4 uppercase text-zinc-500  hover:text-white hover:shadow-lg focus:outline-none">
        Sign in to Spotify
      </button>
    </motion.div>
  );
};
