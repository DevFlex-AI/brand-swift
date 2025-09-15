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
    title: "3000+ AI Features",
    description: "Comprehensive AI-powered tools for every aspect of your startup journey."
  },
  {
    icon: Globe,
    title: "Real-Time Collaboration",
    description: "Advanced team collaboration with live editing, video calls, and project management."
  },
  {
    icon: Presentation,
    title: "Enterprise Analytics",
    description: "Advanced business intelligence with real-time dashboards and predictive insights."
  },
  {
    icon: Scale,
    title: "Security & Compliance",
    description: "Enterprise-grade security with SOC2, GDPR, and industry-specific compliance."
  },
  {
    icon: Share2,
    title: "Automation Engine",
    description: "Intelligent workflow automation across all business processes and integrations."
  },
  {
    icon: Code,
    title: "Development Suite",
    description: "Full-stack development tools with AI code generation and deployment automation."
  },
  {
    icon: FileText,
    title: "Business Intelligence",
    description: "Advanced market analysis, competitive intelligence, and strategic planning tools."
  },
  {
    icon: DollarSign,
    title: "Revenue Optimization",
    description: "AI-powered revenue modeling, pricing optimization, and financial forecasting."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The Ultimate Business Creation Ecosystem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            3300+ features across every business function. From AI-powered ideation to 
            enterprise-scale operations. Blink and your business exists.
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