export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid h-full grid-flow-col grid-cols-1 grid-rows-5 justify-items-center md:grid-cols-5 2xl:grid-cols-3">
      <div className="row-span-2 flex flex-col justify-center text-center tracking-widest md:col-start-3 md:p-10 2xl:col-start-2">
        <h1 className="text-9xl font-extrabold text-orange">FUSE</h1>
        <p className="text-white">Fuse your music library</p>
      </div>
      {children}
    </section>
  );
}
