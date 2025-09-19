import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Zap, 
  ArrowRight, 
  Brain, 
  Code, 
  Rocket, 
  Globe,
  Sparkles,
  Play,
  CheckCircle,
  Clock,
  Users,
  Star
} from 'lucide-react';

const HeroSection = () => {
  const features = [
    "Autonomous AI Development",
    "Zero-Code App Generation", 
    "Instant Deployment",
    "Production-Ready Output"
  ];

  const stats = [
    { label: "Apps Generated", value: "50K+", icon: Rocket },
    { label: "Active Developers", value: "10K+", icon: Users },
    { label: "Success Rate", value: "99.9%", icon: CheckCircle },
    { label: "Avg Build Time", value: "3 min", icon: Clock }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float-3d" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse-glow" />
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary/30 rounded-full blur-lg animate-rotate-3d" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Hero Badge */}
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
            <Brain className="w-4 h-4 mr-2" />
            Powered by Smacked AI
          </Badge>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Autonomous AI
            </span>
            <br />
            <span className="text-foreground">App Builder</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Describe your app idea and watch Smacked AI autonomously build, deploy, and optimize 
            your complete application. From concept to production in minutes, not months.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-card/50 border border-border/50 rounded-full backdrop-blur-sm"
              >
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-300 font-bold text-lg px-8 py-4"
              asChild
            >
              <Link to="/builder">
                <Brain className="w-5 h-5 mr-2" />
                Start Building with AI
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/50 hover:bg-primary/10 font-bold text-lg px-8 py-4"
              asChild
            >
              <Link to="/demo">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="bg-card/50 border-border/50 backdrop-blur-sm hover:shadow-card transition-all">
                  <CardContent className="p-6 text-center">
                    <IconComponent className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Live Demo Preview */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-3xl" />
            <Card className="relative bg-card/80 border-border/50 backdrop-blur-sm shadow-electric">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Live AI Generation
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Brain className="w-5 h-5 text-primary animate-pulse" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Smacked AI is analyzing your request...</div>
                      <div className="text-xs text-muted-foreground">Building React components, setting up database, configuring deployment</div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/20 rounded-lg border border-border/50">
                      <Code className="w-6 h-6 text-primary mb-2" />
                      <div className="text-sm font-medium">Frontend Built</div>
                      <div className="text-xs text-muted-foreground">React + TypeScript</div>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-lg border border-border/50">
                      <Database className="w-6 h-6 text-primary mb-2" />
                      <div className="text-sm font-medium">Database Ready</div>
                      <div className="text-xs text-muted-foreground">Supabase + RLS</div>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-lg border border-border/50">
                      <Globe className="w-6 h-6 text-primary mb-2" />
                      <div className="text-sm font-medium">Deployed Live</div>
                      <div className="text-xs text-muted-foreground">Vercel + CDN</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm">4.9/5 Developer Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm">SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm">99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;