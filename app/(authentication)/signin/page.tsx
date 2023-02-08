"use client";

import { ErrorToast, SignedInToast } from "@/components/toasts";
import { auth } from "@/lib/firebase";
import { AuthError } from "@firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import Input from "../input";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, _, error] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSinIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (error) {
      const message = parseError(error);
      toast.custom((toast) => <ErrorToast toast={toast} text={message} />);
    }

    if (user) {
      toast.custom((toast) => <SignedInToast toast={toast} text="Signed in" />);
      router.replace("/dashboard");
    }
  }, [error, user]);

  return (
    <form
      onSubmit={handleSinIn}
      className="row-span-2 row-start-3 justify-self-stretch px-10 text-zinc-600 md:col-span-3 md:col-start-2 2xl:col-span-1 2xl:col-start-2"
    >
      <div className="flex flex-col">
        <Input
          label="Email address"
          name="email"
          type="email"
          error={error?.code.includes("email")}
          setValue={setEmail}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          error={error?.code.includes("password")}
          setValue={setPassword}
        />
      </div>
      <button
        type="submit"
        className="my-4 h-12 w-full rounded-2xl bg-zinc-800 uppercase text-zinc-500 transition duration-150 ease-in-out hover:text-white hover:shadow-lg focus:outline-none active:bg-orange"
      >
        sign in
      </button>
      <p className="text-center">
        Dont have an account?{" "}
        <Link href="/signup" className="text-white">
          Sign up
        </Link>
      </p>
    </form>
  );
}

const parseError = (error: AuthError) => {
  const { message } = error;

  if (message.includes("passowrd")) {
    return "Wrong password";
  }

  if (message.includes("email")) {
    return "Wrong email";
  }

  return "Wrong credentials";
};
