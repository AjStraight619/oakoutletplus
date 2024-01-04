import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-5xl font-bold text-center text-primary">
          Oak Outlet Plus
        </h1>
        <p className="text-2xl text-center text-secondary">Coming soon!</p>
      </main>
    </>
  );
}
