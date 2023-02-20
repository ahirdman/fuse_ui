"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { auth } from "@/lib/firebase/initialization";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FiCheck } from "react-icons/fi";
import { Input } from "../../../components/authentication/input";
import { ErrorToast } from "@/components/toasts";
import toast from "react-hot-toast";
import { parseFirebaseError } from "@/lib/firebase/utils";
import { SuccessText } from "@/components/authentication/successText";
import { handleAuthorize } from "@/components/authentication/authorizeSpotifyButton";
import { AuthError, UserCredential } from "firebase/auth";

interface SignUpInputsProps {
  error: AuthError | undefined;
  setPassword: (i: string) => void;
  setEmail: (i: string) => void;
  visible: boolean;
}

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, userCreated, _, createdError] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(email, password);
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
      <SignUpInputs
        error={createdError}
        setPassword={setPassword}
        setEmail={setEmail}
        visible={!userCreated}
      />
      <SignUpButton success={userCreated !== undefined} />
      <SignInLink visible={userCreated === undefined} />
      <AuthorizeSpotifySection user={userCreated} />
    </motion.form>
  );
}

const SignUpInputs = ({
  error,
  setPassword,
  setEmail,
  visible,
}: SignUpInputsProps) => {
  return (
    <AnimatePresence>
      {visible ? (
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
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

const SignUpButton = ({ success }: { success: boolean }) => {
  const successTextVariants: Variants = {
    initial: { opacity: 0, x: 100, width: 0 },
    animate: {
      opacity: 1,
      x: 0,
      width: "auto",
      transition: { delay: 0.7, duration: 0.5 },
    },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      layout
      transition={{ delay: 1.2, duration: 1 }}
      className="flex w-full items-center justify-start"
    >
      <motion.button
        type="submit"
        layout
        disabled={success}
        initial={false}
        animate={{
          width: success ? "3rem" : "100%",
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="my-4 h-12 rounded-2xl bg-zinc-800 uppercase text-zinc-500 hover:text-white hover:shadow-lg focus:outline-none active:bg-orange"
      >
        {success ? (
          <span className="flex items-center justify-center text-white">
            <FiCheck />
          </span>
        ) : (
          "sign up"
        )}
      </motion.button>
      <AnimatePresence>
        {success ? (
          <SuccessText
            key="status"
            variants={successTextVariants}
            type="Fuse"
          />
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

const SignInLink = ({ visible }: { visible: boolean }) => {
  return (
    <AnimatePresence>
      {visible ? (
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
      ) : null}
    </AnimatePresence>
  );
};

const AuthorizeSpotifySection = ({
  user,
}: {
  user: UserCredential | undefined;
}) => {
  return (
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
            type="button"
            onClick={() => handleAuthorize(user.user)}
            className="h-12 w-full rounded-2xl bg-zinc-800 uppercase text-zinc-500  hover:text-white hover:shadow-lg focus:outline-none active:bg-orange"
          >
            Sign in to Spotify
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
