import { CheckCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-gradient-glassmorphism backdrop-blur-glass border border-white/20 rounded-full px-4 py-2 shadow-glass">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-foreground">Trusted by 500+ Institutions</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Transform{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Attendance
                </span>{" "}
                with Smart QR Technology
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Eliminate manual roll calls forever. SmartPresence automates attendance tracking with QR codes, 
                provides real-time analytics, and saves 10+ minutes per class while ensuring 99.8% accuracy.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-primary hover:scale-105 transition-transform shadow-glass">
                Schedule Free Demo
                <Play className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="backdrop-blur-glass bg-gradient-glassmorphism border-white/20 hover:bg-white/10">
                Watch Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">Minutes Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.8%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-2xl opacity-20 scale-105"></div>
            <img 
              src={heroImage} 
              alt="Students using SmartPresence QR code attendance system in modern classroom"
              className="relative z-10 w-full h-auto rounded-3xl shadow-2xl"
            />
            
            {/* Floating cards */}
            <div className="absolute -top-4 -left-4 bg-gradient-glassmorphism backdrop-blur-glass border border-white/20 rounded-2xl p-4 shadow-glass">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live Tracking</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-gradient-glassmorphism backdrop-blur-glass border border-white/20 rounded-2xl p-4 shadow-glass">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">2.3s</div>
                <div className="text-xs text-muted-foreground">Avg. Scan Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;