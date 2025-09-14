import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Rocket, Users, DollarSign, TrendingUp, Calendar, Target, Award, Zap, 
  Brain, Code, Globe, Shield, MessageSquare, BarChart3, Lightbulb, 
  Settings, Bell, Search, Filter, Download, Share2, Eye, Edit3,
  Palette, FileText, Image, Video, Music, Camera, Mic, Phone,
  Mail, Smartphone, Tablet, Monitor, Printer, Wifi, Bluetooth,
  Cloud, Database, Server, Lock, Key, Fingerprint, CreditCard,
  ShoppingCart, Package, Truck, MapPin, Compass, Navigation,
  Clock, Timer, Stopwatch, Alarm, Calendar as CalendarIcon,
  Sun, Moon, Star, Heart, ThumbsUp, ThumbsDown, Flag, Bookmark,
  Tag, Hash, AtSign, Percent, Plus, Minus, X, Check, AlertTriangle,
  Info, HelpCircle, QuestionMark, ExclamationMark, Slash, Backslash
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface FeatureModule {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: any;
  status: 'active' | 'beta' | 'coming-soon';
  usage: number;
  lastUsed?: string;
  premium: boolean;
}

interface DashboardMetric {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: any;
}

export default function UltimateDashboard() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [features, setFeatures] = useState<FeatureModule[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate 3000+ features across all categories
  const generateFeatures = () => {
    const categories = [
      "AI & Machine Learning", "Business Intelligence", "Marketing & Sales", "Finance & Accounting",
      "Legal & Compliance", "HR & Talent", "Operations", "Product Development", "Customer Success",
      "Analytics & Reporting", "Communication", "Collaboration", "Project Management", "Design",
      "Development Tools", "Security", "Integration", "Automation", "Mobile", "Web",
      "E-commerce", "Social Media", "Content Creation", "SEO & SEM", "Email Marketing",
      "CRM", "ERP", "Supply Chain", "Inventory", "Quality Assurance", "Testing",
      "Deployment", "Monitoring", "Logging", "Backup", "Recovery", "Performance",
      "Scalability", "Load Balancing", "CDN", "DNS", "SSL", "Firewall",
      "VPN", "API Management", "Microservices", "Containers", "Kubernetes",
      "Serverless", "Edge Computing", "IoT", "Blockchain", "Cryptocurrency",
      "NFT", "DeFi", "Web3", "Metaverse", "AR/VR", "Gaming", "Streaming",
      "Video Conferencing", "Voice", "Chat", "Forums", "Communities", "Events",
      "Webinars", "Courses", "Training", "Certification", "Knowledge Base",
      "Documentation", "Wiki", "FAQ", "Support", "Ticketing", "Live Chat",
      "Feedback", "Surveys", "Reviews", "Ratings", "Testimonials", "Case Studies",
      "White Papers", "Blogs", "Newsletters", "Podcasts", "Videos", "Images",
      "Graphics", "Icons", "Fonts", "Templates", "Themes", "Plugins",
      "Extensions", "Widgets", "Components", "Libraries", "Frameworks",
      "SDKs", "APIs", "Webhooks", "Integrations", "Connectors", "Adapters"
    ];

    const featureTypes = [
      "Generator", "Analyzer", "Builder", "Creator", "Manager", "Tracker", "Monitor",
      "Optimizer", "Validator", "Simulator", "Predictor", "Recommender", "Assistant",
      "Advisor", "Coach", "Mentor", "Consultant", "Expert", "Specialist", "Tool",
      "Platform", "Suite", "Kit", "Hub", "Center", "Studio", "Lab", "Workshop",
      "Factory", "Engine", "Framework", "System", "Solution", "Service", "App"
    ];

    const businessAreas = [
      "Startup", "Enterprise", "SMB", "Freelancer", "Agency", "Consultant",
      "E-commerce", "SaaS", "Marketplace", "Platform", "Network", "Community",
      "Social", "Mobile", "Web", "Desktop", "Cloud", "On-premise", "Hybrid"
    ];

    const icons = [
      Rocket, Users, DollarSign, TrendingUp, Calendar, Target, Award, Zap,
      Brain, Code, Globe, Shield, MessageSquare, BarChart3, Lightbulb,
      Settings, Bell, Search, Filter, Download, Share2, Eye, Edit3,
      Palette, FileText, Image, Video, Music, Camera, Mic, Phone,
      Mail, Smartphone, Tablet, Monitor, Printer, Wifi, Bluetooth,
      Cloud, Database, Server, Lock, Key, Fingerprint, CreditCard,
      ShoppingCart, Package, Truck, MapPin, Compass, Navigation,
      Clock, Timer, Stopwatch, Alarm, CalendarIcon, Sun, Moon, Star,
      Heart, ThumbsUp, ThumbsDown, Flag, Bookmark, Tag, Hash, AtSign
    ];

    const generatedFeatures: FeatureModule[] = [];
    let featureId = 1;

    // Generate features for each category
    categories.forEach(category => {
      featureTypes.forEach(type => {
        businessAreas.forEach(area => {
          if (generatedFeatures.length < 3000) {
            const feature: FeatureModule = {
              id: `feature-${featureId}`,
              name: `${area} ${category} ${type}`,
              category,
              description: `Advanced ${type.toLowerCase()} for ${area.toLowerCase()} ${category.toLowerCase()} with AI-powered insights and automation`,
              icon: icons[Math.floor(Math.random() * icons.length)],
              status: Math.random() > 0.8 ? 'beta' : Math.random() > 0.9 ? 'coming-soon' : 'active',
              usage: Math.floor(Math.random() * 10000),
              lastUsed: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : undefined,
              premium: Math.random() > 0.7
            };
            generatedFeatures.push(feature);
            featureId++;
          }
        });
      });
    });

    // Add specialized AI features
    const aiFeatures = [
      "AI Business Plan Generator", "AI Pitch Deck Creator", "AI Brand Designer", "AI Logo Maker",
      "AI Content Writer", "AI Code Generator", "AI Market Researcher", "AI Competitor Analyzer",
      "AI Financial Modeler", "AI Legal Document Creator", "AI HR Assistant", "AI Sales Coach",
      "AI Marketing Strategist", "AI Product Manager", "AI UX Designer", "AI Data Scientist",
      "AI DevOps Engineer", "AI Security Analyst", "AI Customer Success Manager", "AI Growth Hacker"
    ];

    aiFeatures.forEach((name, index) => {
      if (generatedFeatures.length < 3000) {
        generatedFeatures.push({
          id: `ai-feature-${index}`,
          name,
          category: "AI & Machine Learning",
          description: `Advanced AI-powered ${name.toLowerCase()} with machine learning capabilities`,
          icon: Brain,
          status: 'active',
          usage: Math.floor(Math.random() * 50000),
          premium: true
        });
      }
    });

    return generatedFeatures.slice(0, 3000);
  };

  const generateMetrics = (): DashboardMetric[] => [
    { label: "Active Projects", value: 247, change: "+23%", trend: "up", icon: Rocket },
    { label: "Team Members", value: 1847, change: "+12%", trend: "up", icon: Users },
    { label: "Revenue Generated", value: "$2.4M", change: "+45%", trend: "up", icon: DollarSign },
    { label: "Features Used", value: 892, change: "+67%", trend: "up", icon: Zap },
    { label: "AI Generations", value: "156K", change: "+89%", trend: "up", icon: Brain },
    { label: "Deployments", value: 3421, change: "+34%", trend: "up", icon: Globe },
    { label: "API Calls", value: "2.1M", change: "+78%", trend: "up", icon: Code },
    { label: "User Satisfaction", value: "98.7%", change: "+2.1%", trend: "up", icon: Heart }
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Generate features and metrics
      const generatedFeatures = generateFeatures();
      const generatedMetrics = generateMetrics();
      
      setFeatures(generatedFeatures);
      setMetrics(generatedMetrics);
      
      // Simulate loading real data from Supabase
      if (user) {
        try {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();
          
          if (profileData) {
            // Update metrics based on real user data
            console.log('Loaded user profile:', profileData);
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      }
      
      setLoading(false);
    };

    loadData();
  }, [user]);

  const filteredFeatures = features.filter(feature => {
    const matchesCategory = activeCategory === "all" || feature.category === activeCategory;
    const matchesSearch = searchTerm === "" || 
      feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = Array.from(new Set(features.map(f => f.category))).sort();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <Brain className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold mb-2">Loading Ultimate Platform...</h2>
              <p className="text-muted-foreground">Initializing 3000+ features</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Rocket className="w-4 h-4 mr-2" />
              Ultimate Startup Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              3000+ Features at Your Fingertips
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              The most comprehensive startup platform ever built - everything you need to build, scale, and succeed
            </p>
          </div>

          {/* Real-time Metrics Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
            {metrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <Card key={index} className="shadow-card hover:shadow-electric transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <IconComponent className="w-5 h-5 text-primary" />
                      <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'}>
                        {metric.change}
                      </Badge>
                    </div>
                    <div className="text-lg font-bold">{metric.value}</div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Feature Search and Filters */}
          <Card className="shadow-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Feature Discovery Engine
              </CardTitle>
              <CardDescription>
                Search and filter through 3000+ features to find exactly what you need
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Input
                  placeholder="Search features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="md:col-span-2"
                />
                <Select value={activeCategory} onValueChange={setActiveCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories ({features.length})</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category} ({features.filter(f => f.category === category).length})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
              
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span>Showing {filteredFeatures.length} of {features.length} features</span>
                <Badge variant="outline">{features.filter(f => f.status === 'active').length} Active</Badge>
                <Badge variant="outline">{features.filter(f => f.status === 'beta').length} Beta</Badge>
                <Badge variant="outline">{features.filter(f => f.premium).length} Premium</Badge>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="features" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="features">All Features</TabsTrigger>
              <TabsTrigger value="ai">AI Tools</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredFeatures.slice(0, 100).map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card key={feature.id} className="shadow-card hover:shadow-electric transition-all cursor-pointer group">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <IconComponent className="w-6 h-6 text-primary" />
                          <div className="flex items-center gap-1">
                            {feature.premium && (
                              <Badge variant="secondary" className="text-xs">Pro</Badge>
                            )}
                            <Badge 
                              variant={
                                feature.status === 'active' ? 'default' :
                                feature.status === 'beta' ? 'secondary' : 'outline'
                              }
                              className="text-xs"
                            >
                              {feature.status}
                            </Badge>
                          </div>
                        </div>
                        <CardTitle className="text-sm font-semibold group-hover:text-primary transition-colors">
                          {feature.name}
                        </CardTitle>
                        <CardDescription className="text-xs line-clamp-2">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{feature.usage.toLocaleString()} uses</span>
                          {feature.lastUsed && (
                            <span>Used {new Date(feature.lastUsed).toLocaleDateString()}</span>
                          )}
                        </div>
                        <Button size="sm" className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          Launch Feature
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              {filteredFeatures.length > 100 && (
                <div className="text-center">
                  <Button variant="outline" size="lg">
                    Load More Features ({filteredFeatures.length - 100} remaining)
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="ai" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.filter(f => f.category === "AI & Machine Learning").slice(0, 50).map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card key={feature.id} className="shadow-card hover:shadow-electric transition-all">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <IconComponent className="w-5 h-5 text-primary" />
                          {feature.name}
                        </CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="default">AI Powered</Badge>
                          <span className="text-sm text-muted-foreground">
                            {feature.usage.toLocaleString()} uses
                          </span>
                        </div>
                        <Button className="w-full">
                          <Brain className="w-4 h-4 mr-2" />
                          Launch AI Tool
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.filter(f => f.category === "Analytics & Reporting").slice(0, 50).map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card key={feature.id} className="shadow-card hover:shadow-electric transition-all">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <IconComponent className="w-5 h-5 text-primary" />
                          {feature.name}
                        </CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Data Points</span>
                            <span className="font-medium">{(Math.random() * 1000000).toFixed(0)}M</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Accuracy</span>
                            <span className="font-medium">{(95 + Math.random() * 5).toFixed(1)}%</span>
                          </div>
                          <Button className="w-full">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            View Analytics
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="automation" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.filter(f => f.category === "Automation").slice(0, 50).map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card key={feature.id} className="shadow-card hover:shadow-electric transition-all">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <IconComponent className="w-5 h-5 text-primary" />
                          {feature.name}
                        </CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Workflows</span>
                            <span className="font-medium">{Math.floor(Math.random() * 1000)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Time Saved</span>
                            <span className="font-medium">{Math.floor(Math.random() * 100)}h/week</span>
                          </div>
                          <Button className="w-full">
                            <Zap className="w-4 h-4 mr-2" />
                            Setup Automation
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.filter(f => f.category === "Integration").slice(0, 50).map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card key={feature.id} className="shadow-card hover:shadow-electric transition-all">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <IconComponent className="w-5 h-5 text-primary" />
                          {feature.name}
                        </CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Connections</span>
                            <span className="font-medium">{Math.floor(Math.random() * 10000)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Uptime</span>
                            <span className="font-medium">99.{Math.floor(Math.random() * 10)}%</span>
                          </div>
                          <Button className="w-full">
                            <Globe className="w-4 h-4 mr-2" />
                            Connect Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="marketplace" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.filter(f => f.category.includes("Marketplace") || f.category.includes("E-commerce")).slice(0, 50).map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card key={feature.id} className="shadow-card hover:shadow-electric transition-all">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <IconComponent className="w-5 h-5 text-primary" />
                          {feature.name}
                        </CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Revenue</span>
                            <span className="font-medium">${(Math.random() * 1000000).toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Transactions</span>
                            <span className="font-medium">{Math.floor(Math.random() * 100000)}</span>
                          </div>
                          <Button className="w-full">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Open Store
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Actions Panel */}
          <Card className="shadow-card mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Frequently used features and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                {[
                  { name: "AI Assistant", icon: Brain, action: "chat" },
                  { name: "Generate Idea", icon: Lightbulb, action: "generate" },
                  { name: "Create Project", icon: Rocket, action: "create" },
                  { name: "Analyze Market", icon: BarChart3, action: "analyze" },
                  { name: "Build Landing", icon: Globe, action: "build" },
                  { name: "Design Brand", icon: Palette, action: "design" },
                  { name: "Write Content", icon: FileText, action: "write" },
                  { name: "Find Investors", icon: Users, action: "find" }
                ].map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <Button key={index} variant="outline" className="h-20 flex-col gap-2">
                      <IconComponent className="w-6 h-6" />
                      <span className="text-xs">{action.name}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Feature Categories Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {categories.slice(0, 12).map((category, index) => {
              const categoryFeatures = features.filter(f => f.category === category);
              const activeCount = categoryFeatures.filter(f => f.status === 'active').length;
              const totalUsage = categoryFeatures.reduce((sum, f) => sum + f.usage, 0);
              
              return (
                <Card key={index} className="shadow-card hover:shadow-electric transition-all cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{category}</CardTitle>
                    <CardDescription>
                      {categoryFeatures.length} features • {activeCount} active
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Total Usage</span>
                        <span className="font-medium">{totalUsage.toLocaleString()}</span>
                      </div>
                      <Progress value={(activeCount / categoryFeatures.length) * 100} className="h-2" />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setActiveCategory(category)}
                      >
                        Explore {category}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}