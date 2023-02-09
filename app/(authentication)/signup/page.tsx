"use client";

import { AnimatePresence, motion } from "framer-motion";
import { auth } from "@/lib/firebase/initialization";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FiCheck } from "react-icons/fi";
import Input from "../input";
import { ErrorToast } from "@/components/toasts";
import toast from "react-hot-toast";
import { parseFirebaseError } from "@/lib/firebase/utils";
import config from "@/config/default";
import { UserCredential } from "firebase/auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, userCreated, _, createdError] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUserWithEmailAndPassword(email, password);
  };

  const handleAuthorize = async (user: UserCredential) => {
    const path = config.api.token.url;
    path.searchParams.set("uid", user.user.uid);

    try {
      const result = await fetch(path.href, {
        credentials: "include",
      });

      if (!result.ok) {
        throw new Error("Bad response", { cause: { result } });
      }

      const { url } = await result.json();

      if (typeof window !== undefined) {
        window.location.replace(url);
      }
    } catch (error: any) {
      const res = error.cause?.result as Response;

      switch (res.status) {
        case 400:
          toast.custom((toast) => (
            <ErrorToast toast={toast} text="User was not created correctly" />
          ));
          break;
        default:
          toast.custom((toast) => (
            <ErrorToast
              toast={toast}
              text={`Server responded with ${res.status}`}
            />
          ));
          break;
      }
    }
  };

  useEffect(() => {
    if (createdError && !userCreated) {
      const message = parseFirebaseError(createdError);
      toast.custom((toast) => <ErrorToast toast={toast} text={message} />);
    }
  }, [createdError]);

  return (
    <motion.form
      layout
      onSubmit={handleSignUp}
      className="row-span-2 row-start-3 justify-self-stretch overflow-hidden px-10 text-zinc-600 md:col-span-3 md:col-start-2 2xl:col-span-1 2xl:col-start-2"
    >
      <AnimatePresence>
        {!userCreated ? (
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
              error={createdError?.code.includes("email")}
              setValue={setEmail}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              error={createdError?.code.includes("password")}
              setValue={setPassword}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <motion.div
        layout
        transition={{ delay: 1.2, duration: 1 }}
        className="flex w-full items-center justify-start"
      >
        <motion.button
          type="submit"
          layout
          disabled={userCreated !== undefined}
          initial={false}
          animate={{
            width: userCreated !== undefined ? "3rem" : "100%",
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="my-4 h-12 rounded-2xl bg-zinc-800 uppercase text-zinc-500 hover:text-white hover:shadow-lg focus:outline-none active:bg-orange"
        >
          {userCreated !== undefined ? (
            <span className="flex items-center justify-center text-white">
              <FiCheck />
            </span>
          ) : (
            "sign up"
          )}
        </motion.button>
        <AnimatePresence>
          {userCreated ? <AccountCreatedText /> : null}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>{userCreated ? null : <SignInLink />}</AnimatePresence>
      <AnimatePresence>
        {userCreated ? (
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
              type="button"
              onClick={() => handleAuthorize(userCreated)}
              className="h-12 w-full rounded-2xl bg-zinc-800 uppercase text-zinc-500  hover:text-white hover:shadow-lg focus:outline-none active:bg-orange"
            >
              Sign in to Spotify
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.form>
  );
}

const AccountCreatedText = () => {
  return (
    <motion.p
      key="status"
      initial={{ opacity: 0, x: 100, width: 0 }}
      animate={{ opacity: 1, x: 0, width: "auto" }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="whitespace-nowrap pl-4 text-white"
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
