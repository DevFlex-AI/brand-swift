import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, Sparkles, Zap, Target, TrendingUp, BarChart3, Lightbulb,
  Code, Globe, FileText, Image, Video, Music, Palette, Edit3,
  MessageSquare, Mail, Phone, Calendar, Users, DollarSign,
  Shield, Lock, Key, Database, Server, Cloud, Wifi, Smartphone
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface AIFeature {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  capabilities: string[];
  accuracy: number;
  speed: number;
  cost: number;
  usage: number;
}

export default function AIFeatureEngine() {
  const { user } = useAuth();
  const [selectedFeature, setSelectedFeature] = useState<AIFeature | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const aiFeatures: AIFeature[] = [
    {
      id: "business-plan-ai",
      name: "AI Business Plan Generator",
      description: "Generate comprehensive business plans with market analysis, financial projections, and strategic roadmaps",
      category: "Business Strategy",
      icon: FileText,
      capabilities: ["Market Analysis", "Financial Modeling", "Competitive Research", "Risk Assessment"],
      accuracy: 94,
      speed: 95,
      cost: 5,
      usage: 15420
    },
    {
      id: "pitch-deck-ai",
      name: "AI Pitch Deck Creator",
      description: "Create investor-ready pitch decks with compelling narratives and professional design",
      category: "Fundraising",
      icon: Lightbulb,
      capabilities: ["Storytelling", "Design", "Data Visualization", "Investor Psychology"],
      accuracy: 92,
      speed: 88,
      cost: 8,
      usage: 12340
    },
    {
      id: "brand-ai",
      name: "AI Brand Designer",
      description: "Generate complete brand identities including logos, colors, fonts, and guidelines",
      category: "Design",
      icon: Palette,
      capabilities: ["Logo Design", "Color Psychology", "Typography", "Brand Guidelines"],
      accuracy: 89,
      speed: 92,
      cost: 6,
      usage: 18750
    },
    {
      id: "code-ai",
      name: "AI Code Generator",
      description: "Generate production-ready code for web apps, mobile apps, and APIs",
      category: "Development",
      icon: Code,
      capabilities: ["Full-Stack Development", "API Creation", "Database Design", "Testing"],
      accuracy: 91,
      speed: 85,
      cost: 12,
      usage: 9876
    },
    {
      id: "marketing-ai",
      name: "AI Marketing Strategist",
      description: "Create comprehensive marketing strategies with campaign ideas and content calendars",
      category: "Marketing",
      icon: TrendingUp,
      capabilities: ["Strategy Planning", "Content Creation", "Campaign Optimization", "ROI Analysis"],
      accuracy: 87,
      speed: 90,
      cost: 7,
      usage: 14567
    },
    {
      id: "financial-ai",
      name: "AI Financial Modeler",
      description: "Build detailed financial models with projections, scenarios, and investment analysis",
      category: "Finance",
      icon: DollarSign,
      capabilities: ["Financial Projections", "Scenario Planning", "Valuation", "Investment Analysis"],
      accuracy: 96,
      speed: 82,
      cost: 15,
      usage: 8901
    },
    {
      id: "legal-ai",
      name: "AI Legal Assistant",
      description: "Generate legal documents, contracts, and compliance frameworks",
      category: "Legal",
      icon: Shield,
      capabilities: ["Document Generation", "Contract Analysis", "Compliance Checking", "Risk Assessment"],
      accuracy: 93,
      speed: 87,
      cost: 20,
      usage: 6543
    },
    {
      id: "hr-ai",
      name: "AI HR Manager",
      description: "Automate hiring, onboarding, performance management, and team optimization",
      category: "Human Resources",
      icon: Users,
      capabilities: ["Recruitment", "Onboarding", "Performance Reviews", "Team Analytics"],
      accuracy: 88,
      speed: 91,
      cost: 10,
      usage: 11234
    },
    {
      id: "sales-ai",
      name: "AI Sales Coach",
      description: "Optimize sales processes, lead scoring, and customer relationship management",
      category: "Sales",
      icon: Target,
      capabilities: ["Lead Scoring", "Sales Forecasting", "Pipeline Management", "Customer Insights"],
      accuracy: 90,
      speed: 89,
      cost: 9,
      usage: 13456
    },
    {
      id: "product-ai",
      name: "AI Product Manager",
      description: "Guide product development with feature prioritization and user feedback analysis",
      category: "Product",
      icon: Zap,
      capabilities: ["Feature Prioritization", "User Research", "Roadmap Planning", "A/B Testing"],
      accuracy: 85,
      speed: 93,
      cost: 11,
      usage: 10987
    }
  ];

  const handleGenerate = async () => {
    if (!selectedFeature || !prompt.trim()) return;

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-feature-engine', {
        body: {
          featureId: selectedFeature.id,
          prompt: prompt.trim(),
          userId: user?.id
        }
      });

      if (error) throw error;
      
      setResults(prev => [data, ...prev]);
      setPrompt("");
    } catch (error) {
      console.error('Error generating with AI:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Brain className="w-4 h-4 mr-2" />
              AI Feature Engine
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Advanced AI Capabilities
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Harness the power of AI across every aspect of your startup
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>AI Features</CardTitle>
                  <CardDescription>
                    Select an AI feature to get started
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {aiFeatures.map((feature) => {
                    const IconComponent = feature.icon;
                    return (
                      <div
                        key={feature.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedFeature?.id === feature.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border/50 hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedFeature(feature)}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-primary" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{feature.name}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {feature.usage.toLocaleString()} uses
                          </Badge>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-xs text-muted-foreground">{feature.accuracy}% accuracy</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {selectedFeature ? (
                <div className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <selectedFeature.icon className="w-6 h-6 text-primary" />
                            {selectedFeature.name}
                          </CardTitle>
                          <CardDescription>{selectedFeature.description}</CardDescription>
                        </div>
                        <Badge variant="default">{selectedFeature.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{selectedFeature.accuracy}%</div>
                          <div className="text-sm text-muted-foreground">Accuracy</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{selectedFeature.speed}%</div>
                          <div className="text-sm text-muted-foreground">Speed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">${selectedFeature.cost}</div>
                          <div className="text-sm text-muted-foreground">Per Use</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            What would you like to create?
                          </label>
                          <Textarea
                            placeholder={`Describe what you want the ${selectedFeature.name} to generate...`}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="min-h-24"
                          />
                        </div>

                        <Button 
                          onClick={handleGenerate}
                          disabled={!prompt.trim() || isGenerating}
                          className="w-full"
                          size="lg"
                        >
                          {isGenerating ? (
                            <>
                              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                              Generating with AI...
                            </>
                          ) : (
                            <>
                              <Brain className="w-4 h-4 mr-2" />
                              Generate with AI
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Capabilities:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedFeature.capabilities.map((capability, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {capability}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {results.length > 0 && (
                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle>Generated Results</CardTitle>
                        <CardDescription>
                          AI-generated content and insights
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {results.map((result, index) => (
                            <div key={index} className="p-4 border border-border/50 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="secondary">Generated {new Date().toLocaleTimeString()}</Badge>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <Edit3 className="w-3 h-3 mr-1" />
                                    Edit
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <FileText className="w-3 h-3 mr-1" />
                                    Export
                                  </Button>
                                </div>
                              </div>
                              <div className="prose max-w-none">
                                <pre className="whitespace-pre-wrap text-sm">
                                  {JSON.stringify(result, null, 2)}
                                </pre>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <Card className="shadow-card">
                  <CardContent className="text-center py-12">
                    <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Select an AI Feature</h3>
                    <p className="text-muted-foreground">
                      Choose from our advanced AI capabilities to get started
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}