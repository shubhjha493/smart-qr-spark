import { ArrowRight, Play, Users, Building, Target, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  {
    icon: Building,
    value: "500+",
    label: "Institutions",
    description: "Educational institutions trust SmartPresence"
  },
  {
    icon: Users,
    value: "50K+",
    label: "Students",
    description: "Active students using the platform daily"
  },
  {
    icon: Target,
    value: "99.2%",
    label: "Accuracy",
    description: "Attendance tracking precision rate"
  },
  {
    icon: Clock,
    value: "15min",
    label: "Saved",
    description: "Average time saved per class session"
  }
];

const CtaSection = () => {
  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NGgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEg0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Join the Future of{" "}
            <span className="text-accent">
              Education Management
            </span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Transform your institution's attendance system today. Experience the power of 
            automated QR-based tracking with real-time analytics and seamless integration.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white/10 backdrop-blur-glass border border-white/20 rounded-2xl p-6 shadow-glass hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-accent mb-2">{stat.label}</div>
              <div className="text-sm text-white/80">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-2xl hover:scale-105 transition-all duration-300 px-8"
            >
              Schedule Free Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-glass px-8"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo Video
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm pt-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>No Setup Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>30-Day Free Trial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="text-center mt-16 max-w-2xl mx-auto">
          <blockquote className="text-lg text-white/90 italic">
            "SmartPresence transformed our attendance management completely. We save hours every day 
            and have much better insights into student engagement patterns."
          </blockquote>
          <cite className="block mt-4 text-accent font-semibold">
            — Dr. Sarah Johnson, Dean of Student Affairs
          </cite>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;