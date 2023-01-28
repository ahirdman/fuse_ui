'use client';

import { auth } from '@/lib/firebase';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

function Authenticate() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const handleSinIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(email, password);
  };

  return (
    <form
      onSubmit={handleSinIn}
      className="flex flex-col justify-self-stretch justify-evenly text-zinc-600 px-10 md:col-start-2 md:col-span-3 2xl:col-span-1 2xl:col-start-2 row-start-3 row-span-2"
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
          onChange={e => setEmail(e.target.value)}
          className="text-white bg-transparent border-b border-zinc-700 pb-5 focus:outline-none hover:border-white caret-[#e75627]"
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
          onChange={e => setPassword(e.target.value)}
          className="text-white bg-transparent border-b border-zinc-700 pb-5 focus:outline-none hover:border-white caret-[#e75627]"
        />
      </div>
      <button
        type="submit"
        className={`py-4 bg-zinc-800 text-zinc-500 rounded-3xl hover:text-white hover:shadow-lg focus:outline-none active:bg-[#e75627] transition duration-150 ease-in-out ${
          loading ?? 'bg-[[#e75627] animate-spin'
        }`}
      >
        SIGN IN
      </button>
      <p className="text-center">
        Dont have an account?{' '}
        <Link href="/dashboard" className="text-white">
          Sign up
        </Link>
      </p>
    </form>
  );
}

export default function Home() {
  return (
    <div className="h-full grid grid-rows-5 grid-cols-1 md:grid-cols-5 2xl:grid-cols-3 grid-flow-col justify-items-center">
      <div className="md:p-10 text-center tracking-widest md:col-start-3 2xl:col-start-2 row-span-2 flex flex-col justify-center">
        <h1 className="font-extrabold text-9xl text-[#e75627]">FUSE</h1>
        <p className="text-white">Fuse your music library</p>
      </div>
      <Authenticate />
    </div>
  );
}
