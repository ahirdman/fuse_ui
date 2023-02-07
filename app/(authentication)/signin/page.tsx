"use client";

import { auth } from "@/lib/firebase";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleSinIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(email, password);
  };

  return (
    <form
      onSubmit={handleSinIn}
      className="row-span-2 row-start-3 flex flex-col justify-evenly justify-self-stretch px-10 text-zinc-600 md:col-span-3 md:col-start-2 2xl:col-span-1 2xl:col-start-2"
    >
      <div className="flex flex-col">
        <label htmlFor="email" className="pb-1">
          Email address
        </label>
        <input
          type="text"
          id="email"
          name="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          className="border-b border-zinc-700 bg-transparent pb-5 text-white caret-[#e75627] hover:border-white focus:outline-none"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="pb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          className="border-b border-zinc-700 bg-transparent pb-5 text-white caret-[#e75627] hover:border-white focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className={`rounded-3xl bg-zinc-800 py-4 text-zinc-500 transition duration-150 ease-in-out hover:text-white hover:shadow-lg focus:outline-none active:bg-[#e75627] ${
          loading ?? "bg-[[#e75627] animate-spin"
        }`}
      >
        SIGN IN
      </button>
      <p className="text-center">
        Dont have an account?{" "}
        <Link href="/auth/signup" className="text-white">
          Sign up
        </Link>
      </p>
    </form>
  );
}
