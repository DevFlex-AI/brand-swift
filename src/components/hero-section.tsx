import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Zap, Target, TrendingUp, Users, Rocket, Star } from "lucide-react";
import HeroAnimation from "./3d-hero-animation";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 animate-float-3d blur-xl" />
        <div className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full bg-secondary/20 animate-pulse-3d blur-lg" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-accent/30 animate-rotate-3d blur-md" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 animate-pulse-3d">
                <Rocket className="w-4 h-4 mr-2" />
                Next-Gen AI Platform
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-float-3d">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Do a Blink
                </span>
                <br />
                <span className="text-foreground">
                  Business is Here
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl animate-fade-in">
                Revolutionary AI platform that creates complete startups instantly. From idea to launch - just blink and your business exists.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="shadow-electric animate-pulse-glow group">
                  <Zap className="w-5 h-5 mr-2 group-hover:animate-rotate-3d" />
                  Start Building
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="animate-float">
                  <Target className="w-5 h-5 mr-2" />
                  View Demo
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                {[
                  { icon: Users, label: "10K+ Users", value: "Active" },
                  { icon: TrendingUp, label: "95%", value: "Success Rate" },
                  { icon: Star, label: "4.9/5", value: "Rating" }
                ].map((stat, index) => (
                  <Card key={index} className="shadow-card animate-float-3d" style={{ animationDelay: `${index * 0.2}s` }}>
                    <CardContent className="p-4 text-center">
                      <stat.icon className="w-6 h-6 text-primary mx-auto mb-2 animate-pulse-3d" />
                      <div className="font-bold text-sm">{stat.label}</div>
                      <div className="text-xs text-muted-foreground">{stat.value}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md animate-rotate-3d">
                <HeroAnimation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;