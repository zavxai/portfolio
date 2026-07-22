import Projects from "@/features/home/sections/projects";
import Header from "@/features/home/sections/header";
import Blogs from "@/features/home/sections/blogs";
import Contact from "@/features/home/sections/contact";
import Nav from "@/features/home/sections/nav";

export default function Page() {
  return (
    <div className="relative w-full min-w-0 overflow-x-hidden">
      <Nav />
      <main className="mx-auto flex w-full max-w-5xl min-w-0 flex-col gap-16 px-4 pb-20 pt-6 sm:gap-24 sm:px-8 sm:pb-24 sm:pt-12 md:gap-28">
        <Header />
        <Projects />
        <Blogs />
        <Contact />
      </main>
    </div>
  );
}
