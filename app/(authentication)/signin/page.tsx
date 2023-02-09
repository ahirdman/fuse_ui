"use client";

import { ErrorToast, SignedInToast } from "@/components/toasts";
import { auth } from "@/lib/firebase/initialization";
import { parseFirebaseError } from "@/lib/firebase/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import Input from "../input";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, signedIn, _, signInError] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSinIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (signInError) {
      const message = parseFirebaseError(signInError);
      toast.custom((toast) => <ErrorToast toast={toast} text={message} />);
    }

    if (signedIn) {
      toast.custom((toast) => <SignedInToast toast={toast} text="Signed in" />);
      router.replace("/dashboard");
    }
  }, [signInError, signedIn]);

  return (
    <form
      onSubmit={handleSinIn}
      className="row-span-2 row-start-3 justify-self-stretch px-10 text-zinc-600 md:col-span-3 md:col-start-2 2xl:col-span-1 2xl:col-start-2"
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="flex flex-col"
      >
        <Input
          label="Email address"
          name="email"
          error={signInError?.code.includes("email")}
          setValue={setEmail}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          error={signInError?.code.includes("password")}
          setValue={setPassword}
        />
      </motion.div>
      <button
        type="submit"
        className="my-4 h-12 w-full rounded-2xl bg-zinc-800 uppercase text-zinc-500 transition duration-150 ease-in-out hover:text-white hover:shadow-lg focus:outline-none active:bg-orange"
      >
        sign in
      </button>
      <motion.p
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="text-center"
      >
        Dont have an account?{" "}
        <Link href="/signup" className="text-white">
          Sign up
        </Link>
      </motion.p>
    </form>
  );
}
