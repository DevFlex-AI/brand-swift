import { Card, CardContent } from "@/components/ui/card";
import { 
  Palette, 
  Globe, 
  FileText, 
  Presentation, 
  Scale, 
  Share2, 
  Code, 
  DollarSign 
} from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Brand Identity",
    description: "AI-generated brand names, logos, color palettes, and complete brand guidelines."
  },
  {
    icon: Globe,
    title: "Landing Page",
    description: "Mobile-optimized landing page with hero, features, pricing, and conversion-focused copy."
  },
  {
    icon: Presentation,
    title: "Pitch Deck",
    description: "Professional 5-slide investor deck covering problem, solution, market, and strategy."
  },
  {
    icon: Scale,
    title: "Legal Kit",
    description: "Terms of service, privacy policy, incorporation guide, and founder agreements."
  },
  {
    icon: Share2,
    title: "Social Strategy",
    description: "Social media handles, content calendar, and viral marketing campaigns."
  },
  {
    icon: Code,
    title: "MVP Roadmap",
    description: "Detailed feature list, development timeline, and technical specifications."
  },
  {
    icon: FileText,
    title: "Business Plan",
    description: "Market analysis, competitive research, and go-to-market strategy."
  },
  {
    icon: DollarSign,
    title: "Monetization",
    description: "Revenue models, pricing strategies, and financial projections."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need to Launch
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get a complete startup package instantly. No more spending weeks on research, 
            design, and planning. Focus on building and growing your business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-card transition-all duration-300 hover:-translate-y-2 border-border/50"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;