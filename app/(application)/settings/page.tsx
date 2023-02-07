'use client';

import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';

export default function Settings() {
  const handleSignOut = () => {
    signOut(auth);
    toast.success('Signed out');
  };

  return (
    <div className="h-full grid">
      <div className="place-self-center text-white">
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
}
