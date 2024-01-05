import Contact from "@/components/contact";
import Header from "@/components/header";
import Intro from "@/components/intro";
import Projects from "@/components/projects";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex  flex-col items-center justify-between p-24">
        <Intro />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
