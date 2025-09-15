import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Zap, Clock, DollarSign } from "lucide-react";

export default function IdeaInputForm() {
  const [idea, setIdea] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [businessModel, setBusinessModel] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // This would integrate with Supabase and Stripe
    alert("Payment integration would go here!");
    setIsSubmitting(false);
  };

  const features = [
    "AI-generated brand name & logo",
    "Professional landing page",
    "5-slide pitch deck",
    "Legal document templates",
    "Social media strategy",
    "MVP roadmap & features",
    "Monetization plan",
    "Domain suggestions"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Startup Builder
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Turn Your Idea Into A Startup
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get everything you need to launch in under 60 seconds for just $1
            </p>
            
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground mb-12">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>60 seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span>Only $1</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>AI-powered</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Describe Your Startup Idea
                </CardTitle>
                <CardDescription>
                  Tell us about your idea and we'll build your complete startup package
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      What's your startup idea? *
                    </label>
                    <Textarea
                      placeholder="e.g., A coffee subscription service for remote teams that delivers artisanal coffee from local roasters to home offices worldwide..."
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      className="min-h-24"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Who's your target audience?
                    </label>
                    <Input
                      placeholder="e.g., Remote workers, small teams, coffee enthusiasts"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Preferred business model?
                    </label>
                    <Input
                      placeholder="e.g., Subscription, marketplace, SaaS, one-time purchase"
                      value={businessModel}
                      onChange={(e) => setBusinessModel(e.target.value)}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    variant="hero"
                    size="lg"
                    disabled={!idea.trim() || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Generating Your Startup...
                      </>
                    ) : (
                      <>
                        Generate My Startup for $1
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Secure payment via Stripe • 30-day money-back guarantee
                  </p>
                </form>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>You'll Get Everything You Need</CardTitle>
                <CardDescription>
                  Complete startup package generated in minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-gradient-primary/10 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">
                    ⚡ Instant Business Package
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Complete business created instantly. Just blink and everything is ready to launch.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}