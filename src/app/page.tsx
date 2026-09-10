import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WorkshopsSection from "@/components/WorkshopsSection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WorkshopsSection />
      <CommunitySection />
      <Footer />
    </div>
  );
}
