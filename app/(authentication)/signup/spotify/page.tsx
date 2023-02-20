"use client";

import { auth } from "@/lib/firebase/initialization";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useAuthState, useDeleteUser } from "react-firebase-hooks/auth";
import { FiCheck } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ErrorToast, UserCreatedToast } from "@/components/toasts";
import toast from "react-hot-toast";
import { SuccessText } from "@/components/authentication/successText";
import { AuthorizeSpotifyButton } from "@/components/authentication/authorizeSpotifyButton";

type ParamStatus = "success" | "denied" | "missmatch" | "error" | null;

export default function AuthenticateSpotify() {
  const [user] = useAuthState(auth);
  const [deleteUser] = useDeleteUser(auth);

  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status") as ParamStatus;

  useEffect(() => {
    if (user && status === "denied") {
      toast.custom((toast) => (
        <ErrorToast toast={toast} text="Spotify access denied" />
      ));
    }

    if (user && status === "success") {
      setTimeout(() => {
        router.push("/dashboard");
        toast.custom((toast) => (
          <UserCreatedToast toast={toast} text="Account created" />
        ));
      }, 2500);
    }

    if (user && status === "error") {
      deleteUser().then((success) => {
        if (success) {
          router.replace("/signup");
          toast.custom((toast) => (
            <ErrorToast
              toast={toast}
              text="Something went wrong, please try again"
            />
          ));
        }
      });
    }
  }, [user, status]);

  return (
    <div className="row-span-2 row-start-3 items-center justify-center justify-self-stretch overflow-hidden px-10 text-zinc-600 md:col-span-3 md:col-start-2 2xl:col-span-1 2xl:col-start-2">
      <div className="flex items-center">
        <div className="my-4 h-12 w-12 rounded-2xl bg-zinc-800 uppercase text-zinc-500 hover:text-white hover:shadow-lg focus:outline-none">
          <span className="flex h-full items-center justify-center text-white">
            <FiCheck />
          </span>
        </div>
        <SuccessText type="Fuse" variants={undefined} />
      </div>
      <Description hidden={status === "success"} />
      <AnimatePresence>
        <motion.div
          key="display"
          layout
          className="flex w-full items-center justify-start"
        >
          <AuthorizeSpotifyButton
            active={status === "denied"}
            success={status === "success"}
            variants={authorizeSpotifyButtonAnimation(status === "success")}
            user={user}
            text={status === "denied" ? "Retry" : "Sing in to Spotify"}
          />
          {status === "success" ? (
            <SuccessText
              type="Spotify"
              variants={successTextAnimation}
              key="success"
            />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const Description = ({ hidden }: { hidden: boolean }) => {
  return (
    <AnimatePresence>
      {hidden ? null : (
        <motion.p
          key="info"
          layout
          initial={false}
          animate={{
            opacity: 1,
            height: "auto",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
          exit={{
            opacity: 0,
            height: 0,
            marginTop: 0,
            marginBottom: 0,
            transition: { duration: 0.5 },
          }}
          className="overflow-hidden text-center"
        >
          You need to allow <span className="font-bold">fuse</span> to acces
          your spotify library. Click the button below to authorize.
        </motion.p>
      )}
    </AnimatePresence>
  );
};

const authorizeSpotifyButtonAnimation = (trigger: boolean): Variants => {
  return {
    initial: { width: "100%" },
    animate: {
      width: trigger ? "3rem" : "100%",
      transition: { delay: 0.5, duration: 1, ease: "easeInOut" },
    },
    exit: {},
  };
};

const successTextAnimation: Variants = {
  initial: { opacity: 0, x: 100, width: 0 },
  animate: {
    opacity: 1,
    x: 0,
    width: "auto",
    transition: { duration: 1, delay: 1 },
  },
  exit: { opacity: 0 },
};
