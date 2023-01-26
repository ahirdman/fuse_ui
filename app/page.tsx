export default function Home() {
  return (
    <main className="grid grid-rows-5 grid-cols-3 grid-flow-col justify-items-center h-screen w-screen bg-[#141416]">
      <div className="p-10 text-center tracking-widest col-start-2 row-span-2 w-auto m-auto">
        <h1 className="font-extrabold text-transparent tracking-widest text-9xl bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
          FUSE
        </h1>
        <p className="text-white">Fuse your music library</p>
      </div>
      <div className="text-zinc-300 bg-black rounded-xl px-10 col-start-2 row-start-3 row-span-2 flex flex-col justify-evenly">
        <h1 className="text-lg text-center">Sign In</h1>
        <Button label="Sign in with Email" />
        <Button label="Sign in with Apple" />
        <Button label="Sign in with Google" />
        <p>
          Dont have an account? <span className="font-bold">sign up</span> here
        </p>
      </div>
    </main>
  );
}

function Button({ label }: { label: string }) {
  return <button className="py-1 px-6 text-white bg-black font-bold">{label}</button>;
}
