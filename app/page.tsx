"use client";

import LoadingCircle from "@/components/loadingCircle";
import { SignedInToast } from "@/components/toasts";
import { auth } from "@/lib/firebase/initialization";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
      toast.custom((toast) => <SignedInToast toast={toast} text="Signed in" />);
    }

    if (!loading && !user) {
      router.replace("/signin");
    }
  }, [user, loading]);

  return <LoadingCircle />;
}
