export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-full grid grid-rows-5 grid-cols-1 md:grid-cols-5 2xl:grid-cols-3 grid-flow-col justify-items-center">
      <div className="md:p-10 text-center tracking-widest md:col-start-3 2xl:col-start-2 row-span-2 flex flex-col justify-center">
        <h1 className="font-extrabold text-9xl text-[#e75627]">FUSE</h1>
        <p className="text-white">Fuse your music library</p>
      </div>
      {children}
    </section>
  );
}
