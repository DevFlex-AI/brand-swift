import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Rocket, Crown, ArrowLeft } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for exploring your first startup idea",
      features: [
        "5 AI-generated business ideas",
        "Basic business plan templates",
        "Simple landing page builder",
        "Community access",
        "Email support"
      ],
      icon: Zap,
      popular: false,
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const
    },
    {
      name: "Growth",
      price: "$29",
      priceSubtext: "/month",
      description: "Ideal for serious entrepreneurs building their startup",
      features: [
        "Unlimited AI business ideas",
        "Advanced business plan generator",
        "Professional pitch deck creator",
        "Brand identity generator",
        "Landing page builder with analytics",
        "Market validation tools",
        "Competitor analysis",
        "Priority email support",
        "Export capabilities"
      ],
      icon: Rocket,
      popular: true,
      buttonText: "Start Growing",
      buttonVariant: "default" as const
    },
    {
      name: "Scale",
      price: "$99",
      priceSubtext: "/month",
      description: "For established startups ready to scale and fundraise",
      features: [
        "Everything in Growth",
        "Advanced AI coaching",
        "Investor matching platform",
        "Fundraising toolkit",
        "Legal document generator",
        "Team collaboration tools",
        "Advanced analytics dashboard",
        "Custom integrations",
        "Dedicated account manager",
        "Priority support & onboarding"
      ],
      icon: Crown,
      popular: false,
      buttonText: "Scale Your Startup",
      buttonVariant: "outline" as const
    }
  ];

  const features = [
    "AI-Powered Business Ideas",
    "Professional Business Plans", 
    "Investor-Ready Pitch Decks",
    "Brand Identity Creation",
    "Landing Page Builder",
    "Market Validation Tools",
    "Competitor Analysis",
    "Legal Document Templates",
    "Team Collaboration",
    "Analytics & Insights"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Link to="/">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Star className="w-4 h-4 mr-2" />
              Pricing Plans
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              From idea validation to successful launch, we have the right plan to support your startup journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <Card 
                  key={index} 
                  className={`shadow-card relative ${plan.popular ? 'border-primary/50 shadow-lg scale-105' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold">
                      {plan.price}
                      {plan.priceSubtext && (
                        <span className="text-base font-normal text-muted-foreground">
                          {plan.priceSubtext}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full" 
                      variant={plan.buttonVariant}
                      asChild
                    >
                      <Link to="/auth">
                        {plan.buttonText}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-8">Everything You Need to Build & Scale</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-border/50"
                >
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Card className="shadow-card">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Need a Custom Solution?</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Building something bigger? We offer enterprise solutions with custom features, 
                  dedicated support, and white-label options for accelerators and incubators.
                </p>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/auth">
                    Contact Sales
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-16 text-center space-y-4">
            <h4 className="text-lg font-semibold">Frequently Asked Questions</h4>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-2">
                <h5 className="font-medium">Can I change plans anytime?</h5>
                <p className="text-sm text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.
                </p>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium">Is there a money-back guarantee?</h5>
                <p className="text-sm text-muted-foreground">
                  We offer a 14-day money-back guarantee for all paid plans. No questions asked.
                </p>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium">What payment methods do you accept?</h5>
                <p className="text-sm text-muted-foreground">
                  We accept all major credit cards, PayPal, and offer annual billing discounts.
                </p>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium">Do you offer student discounts?</h5>
                <p className="text-sm text-muted-foreground">
                  Yes! Students get 50% off any paid plan with valid student verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}