"use client";

import { AnimatePresence, motion } from "framer-motion";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FiCheck } from "react-icons/fi";

type User = true | undefined;

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [createUserWithEmailAndPassword, user, loading, error] =
  //   useCreateUserWithEmailAndPassword(auth);
  const [spotifyAuthIsVisible, setSpotifyAuthIsVisible] = useState(false);

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
    <form
      onSubmit={handleSignUp}
      className="row-span-2 row-start-3 flex flex-col justify-evenly justify-self-stretch px-10 text-zinc-600 md:col-span-3 md:col-start-2 2xl:col-span-1 2xl:col-start-2"
    >
      <SignUpUpInput
        setEmail={setEmail}
        setPassword={setPassword}
        user={user}
      />
      <div className="relative flex w-full items-center">
        <SignUpButton user={user} />
        <p
          className={`absolute left-12  px-4 transition-opacity delay-500 duration-500 ${
            user ? "z-0 text-white opacity-100" : "-z-10 opacity-0"
          }`}
        >
          <span className="font-bold uppercase text-[#e75627]">Fuse</span>{" "}
          account created
        </p>
      </div>

      <SignInLink user={user} />
      <AnimatePresence>
        {spotifyAuthIsVisible && (
          <motion.div
            key="spotify"
            className={`flex flex-col justify-between ${
              user ? "opacity-100" : "opacity-0"
            }`}
          >
            <p>
              In order to use Fuse, you need to allow fuse to acces your spotify
              library. Click the button below to authorize.
            </p>
            <button className="w-full rounded-2xl bg-zinc-800 p-4 uppercase text-zinc-500  hover:text-white hover:shadow-lg focus:outline-none">
              Sign in to Spotify
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

interface Props {
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  user: User;
}

const SignUpUpInput = ({ setEmail, setPassword, user }: Props) => {
  return (
    <div
      className={`transition-all delay-500 duration-500 ${
        user ? "h-0 opacity-0" : " h-40 opacity-100"
      }`}
    >
      <div className="flex flex-col pb-5">
        <label htmlFor="email" className="pb-1">
          Email address
        </label>
        <input
          type="text"
          id="email"
          name="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          className="border-b border-zinc-700 bg-transparent pb-4 text-white caret-[#e75627] hover:border-white focus:outline-none"
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
          className="border-b border-zinc-700 bg-transparent pb-4 text-white caret-[#e75627] hover:border-white focus:outline-none"
        />
      </div>
    </div>
  );
};

const SignInLink = ({ user }: { user: User }) => {
  return (
    <p
      className={`text-center transition-all duration-500 ease-in-out ${
        user ? "opacity-0" : "opacity-100"
      }`}
    >
      Already have an account?{" "}
      <Link href="/auth" className="text-white">
        Sign in
      </Link>
    </p>
  );
};

const SignUpButton = ({ user }: { user: User }) => {
  return (
    <button
      type="submit"
      disabled={user}
      className={`h-12 rounded-2xl bg-zinc-800 uppercase text-zinc-500 transition-width duration-500 ease-out hover:text-white hover:shadow-lg focus:outline-none ${
        user ? " w-12 " : "w-full"
      }`}
    >
      {user ? (
        <span className="flex items-center justify-center text-white">
          <FiCheck />
        </span>
      ) : (
        "sign up"
      )}
    </button>
  );
};
