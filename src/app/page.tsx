import MainHero from "@/components/hero/mainHero";
import Navbar from "@/components/nav";

export default function Home() {
  return (
    <div className="w-full font-mulish bg-blue-main ">
      <Navbar />
      <MainHero />
    </div>
  );
}
