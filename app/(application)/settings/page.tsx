"use client";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function Settings() {
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="grid h-full">
      <div className="place-self-center text-white">
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
}
