import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturesCarousel from "@/components/features-carousel";
import LoginCards from "@/components/login-cards";
import ProblemSolution from "@/components/problem-solution";
import FeaturesSection from "@/components/features-section";
import CtaSection from "@/components/cta-section";
import Footer from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturesCarousel />
      <LoginCards />
      <ProblemSolution />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;