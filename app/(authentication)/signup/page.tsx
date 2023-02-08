"use client";

import { AnimatePresence, motion } from "framer-motion";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FiCheck } from "react-icons/fi";
import Input from "../input";

const emulator =
  "http://127.0.0.1:5001/fuse-4210a/us-central1/api/token/authorize";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUserWithEmailAndPassword(email, password);
  };

  const handleAuthorize = async () => {
    const result = await fetch(`${emulator}?id=${user?.user.uid}`, {
      credentials: "include",
    });
    const { url } = await result.json();

    if (typeof window !== undefined) {
      window.location.href = url;
    }
  };

  return (
    <motion.form
      layout
      onSubmit={handleSignUp}
      className="text-zinc-600 row-span-2 row-start-3 justify-self-stretch overflow-hidden px-10 md:col-span-3 md:col-start-2 2xl:col-span-1 2xl:col-start-2"
    >
      <AnimatePresence>
        {!user ? (
          <SignUpUpInput setEmail={setEmail} setPassword={setPassword} />
        ) : null}
      </AnimatePresence>
      <motion.div
        layout
        transition={{ delay: 1.2, duration: 1 }}
        className="flex w-full items-center justify-start"
      >
        <SignUpButton accountCreated={user !== null && user !== undefined} />
        <AnimatePresence>
          {user ? <AccountCreatedText /> : null}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>{user ? null : <SignInLink />}</AnimatePresence>
      <AnimatePresence>
        {user ? (
          <motion.div
            key="about"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            exit={{ opacity: 0 }}
          >
            <p className="my-4 text-center">
              You need to allow <span className="font-bold">fuse</span> to acces
              your spotify library. Click the button below to authorize.
            </p>
            <button
              onClick={handleAuthorize}
              className="bg-zinc-800 text-zinc-500 hover:text-white h-12 w-full rounded-2xl  uppercase hover:shadow-lg focus:outline-none active:bg-orange"
            >
              Sign in to Spotify
            </button>
          </motion.div>
        ) : null}
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
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, height: "auto", x: 0 }}
      exit={{
        opacity: 0,
        height: 0,
        transition: { duration: 1, delay: 1.2 },
      }}
      className="flex flex-col overflow-hidden"
    >
      <Input
        label="Email address"
        name="email"
        type="text"
        setValue={setEmail}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        setValue={setPassword}
      />
    </motion.div>
  );
};

const SignUpButton = ({ accountCreated }: { accountCreated: boolean }) => {
  return (
    <motion.button
      type="submit"
      layout
      disabled={accountCreated}
      initial={false}
      animate={{
        width: accountCreated ? "3rem" : "100%",
      }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="bg-zinc-800 text-zinc-500 hover:text-white my-4 h-12 rounded-2xl uppercase hover:shadow-lg focus:outline-none active:bg-orange"
    >
      {accountCreated ? (
        <span className="text-white flex items-center justify-center">
          <FiCheck />
        </span>
      ) : (
        "sign up"
      )}
    </motion.button>
  );
};

const AccountCreatedText = () => {
  return (
    <motion.p
      key="status"
      initial={{ opacity: 0, x: 100, width: 0 }}
      animate={{ opacity: 1, x: 0, width: "auto" }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="text-white whitespace-nowrap pl-4"
    >
      <span className="font-bold uppercase text-orange">Fuse</span> account
      created
    </motion.p>
  );
};

const SignInLink = () => {
  return (
    <motion.p
      key="sign"
      layout
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, height: "auto", x: 0 }}
      exit={{ opacity: 0, height: 0, transition: { duration: 0.7 } }}
      className="text-center"
    >
      Already have an account?{" "}
      <Link href="/signin" className="text-white">
        Sign in
      </Link>
    </motion.p>
  );
};
