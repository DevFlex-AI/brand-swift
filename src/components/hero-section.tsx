import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Zap, Rocket } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with hero image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-95" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-primary/20 rounded-full animate-float" />
      <div className="absolute top-40 right-20 w-8 h-8 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-secondary/25 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-white/90 text-sm font-medium">Turn any idea into a startup in 5 minutes</span>
        </div>
        
        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Ultimate Startup
          <br />
          <span className="bg-gradient-to-r from-white via-primary-glow to-accent bg-clip-text text-transparent">
            Platform
          </span>
          <br />
          3000+ Features
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
          The most comprehensive startup platform ever built. From AI-powered business planning to 
          real-time collaboration, analytics, and enterprise features. <span className="font-bold text-white">Everything you need to succeed.</span>
        </p>
        
        {/* Input and CTA */}
        <Card className="max-w-2xl mx-auto p-8 bg-white/95 backdrop-blur-sm border-0 shadow-glow">
          <div className="space-y-6">
            <div className="text-left">
              <label className="block text-sm font-semibold text-foreground mb-3">
                What's your startup idea?
              </label>
              <Input
                placeholder="e.g., A coffee subscription for remote teams..."
                className="h-14 text-lg border-border/50 focus:border-primary focus:ring-primary"
              />
            </div>
            
            <Button 
              size="lg" 
              variant="hero"
              className="w-full h-14 text-lg font-semibold group"
              onClick={() => window.location.href = '/submit'}
            >
              Generate My Startup
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>3000+ features</span>
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-accent" />
                <span>AI-powered everything</span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Trust indicators */}
        <div className="mt-12 text-white/60 text-sm">
          <p className="mb-4">Trusted by 100,000+ entrepreneurs worldwide</p>
          <div className="flex justify-center items-center gap-8 opacity-70">
            <div className="h-8 w-24 bg-white/20 rounded"></div>
            <div className="h-8 w-24 bg-white/20 rounded"></div>
            <div className="h-8 w-24 bg-white/20 rounded"></div>
            <div className="h-8 w-24 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;