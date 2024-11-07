import Hero from "@/components/Hero";
import HowToUse from "@/components/HowToUse";
import NavBar from "@/components/NavBar";

// Home.tsx
export default function Home() {
  return (
    <div className="">
      <NavBar />
      <div className="">
        <Hero />
        <HowToUse />
      </div>
    </div>
  );
}
