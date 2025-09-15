import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Crown, Rocket } from "lucide-react";

const pricingPlans = [
  {
    name: "First Blink",
    price: "$1",
    period: "one-time",
    description: "Perfect for creating your first instant business",
    icon: Zap,
    features: [
      "Instant AI business creation",
      "Complete brand identity",
      "Professional landing page",
      "Ad generator with screenshots",
      "5-slide pitch deck",
      "Legal document templates",
      "Social media strategy",
      "Basic MVP roadmap"
    ],
    buttonText: "Get Started",
    buttonVariant: "hero" as const,
    popular: false
  },
  {
    name: "Power Blink",
    price: "$99",
    period: "/month",
    description: "For entrepreneurs building multiple businesses",
    icon: Crown,
    features: [
      "Everything in First Blink",
      "Unlimited business generation",
      "Advanced ad creation with AI",
      "Screenshot-to-ad conversion",
      "Custom domain deployment",
      "Advanced pitch deck",
      "Legal consultation call",
      "Weekly coaching sessions",
      "Priority AI generation",
      "Unlimited regenerations",
      "Team collaboration tools"
    ],
    buttonText: "Upgrade Now",
    buttonVariant: "default" as const,
    popular: true
  },
  {
    name: "Empire Blink",
    price: "$999",
    period: "/month",
    description: "Build business empires at scale",
    icon: Rocket,
    features: [
      "Everything in Power Blink",
      "White-label platform access",
      "Custom AI model training",
      "Enterprise ad generation",
      "Bulk screenshot processing",
      "AI MVP code generation",
      "Investor introductions",
      "PR and media outreach",
      "Team hiring assistance",
      "Fundraising support",
      "Dedicated success manager",
      "Custom integrations",
      "Priority support"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Start for $1, Scale as You Grow
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Begin with our complete starter kit, then unlock premium features 
            as your startup gains traction.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative ${
                plan.popular 
                  ? 'border-primary shadow-electric scale-105' 
                  : 'border-border/50'
              } hover:shadow-card transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  plan.popular 
                    ? 'bg-gradient-primary' 
                    : 'bg-muted'
                }`}>
                  <plan.icon className={`w-8 h-8 ${
                    plan.popular ? 'text-white' : 'text-foreground'
                  }`} />
                </div>
                
                <CardTitle className="text-2xl font-bold text-foreground">
                  {plan.name}
                </CardTitle>
                
                <div className="flex items-baseline justify-center gap-1 mt-4">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
                
                <p className="text-muted-foreground mt-2">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <Button 
                  variant={plan.buttonVariant}
                  size="lg"
                  className="w-full font-semibold"
                >
                  {plan.buttonText}
                </Button>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            All plans include 24/7 support and 30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;