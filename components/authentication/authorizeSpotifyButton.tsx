import config from "@/config/default";
import { User } from "firebase/auth";
import { motion, Variants } from "framer-motion";
import toast from "react-hot-toast";
import { FiCheck } from "react-icons/fi";
import { ErrorToast } from "../toasts";

interface AuthorizeSpotifyButtonProps {
  active: boolean;
  success: boolean;
  variants: Variants;
  user?: User | undefined | null;
  text?: string;
}

export function AuthorizeSpotifyButton({
  active,
  success,
  variants,
  user,
  text = "Sign in to Spotify",
}: AuthorizeSpotifyButtonProps) {
  return (
    <motion.button
      layout
      onClick={user && active ? () => handleAuthorize(user) : undefined}
      disabled={!active}
      initial="initial"
      animate="animate"
      variants={variants}
      className="flex h-12 items-center justify-center rounded-2xl bg-zinc-800 uppercase text-zinc-500"
    >
      {success ? (
        <span className="text-white">
          <FiCheck />
        </span>
      ) : (
        text
      )}
    </motion.button>
  );
}

export const handleAuthorize = async (user: User) => {
  const path = config.api.token.url;
  path.searchParams.set("uid", user.uid);

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
