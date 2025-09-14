import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Building, Shield, Users, Globe, Database, Server, Cloud, Lock,
  Key, Fingerprint, Eye, Settings, Bell, Mail, Phone, Calendar,
  BarChart3, TrendingUp, DollarSign, Target, Zap, Code, Cog,
  Network, Layers, Box, Package, Truck, Factory, Wrench, Tool
} from "lucide-react";

interface EnterpriseFeature {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  complexity: 'basic' | 'advanced' | 'expert';
  implementation: string;
  roi: string;
  users: number;
}

export default function EnterpriseFeatures() {
  const [selectedCategory, setSelectedCategory] = useState("security");

  const enterpriseFeatures: EnterpriseFeature[] = [
    // Security & Compliance (200 features)
    ...Array.from({ length: 200 }, (_, i) => ({
      id: `security-${i}`,
      name: `Advanced Security Feature ${i + 1}`,
      description: `Enterprise-grade security solution for ${['authentication', 'authorization', 'encryption', 'monitoring', 'compliance'][i % 5]}`,
      category: "Security & Compliance",
      icon: [Shield, Lock, Key, Fingerprint, Eye][i % 5],
      complexity: ['basic', 'advanced', 'expert'][i % 3] as 'basic' | 'advanced' | 'expert',
      implementation: `${Math.floor(Math.random() * 12) + 1} weeks`,
      roi: `${Math.floor(Math.random() * 500) + 100}%`,
      users: Math.floor(Math.random() * 100000) + 10000
    })),

    // Infrastructure & DevOps (200 features)
    ...Array.from({ length: 200 }, (_, i) => ({
      id: `infrastructure-${i}`,
      name: `Infrastructure Tool ${i + 1}`,
      description: `Scalable infrastructure solution for ${['deployment', 'monitoring', 'scaling', 'backup', 'recovery'][i % 5]}`,
      category: "Infrastructure & DevOps",
      icon: [Server, Cloud, Database, Network, Layers][i % 5],
      complexity: ['basic', 'advanced', 'expert'][i % 3] as 'basic' | 'advanced' | 'expert',
      implementation: `${Math.floor(Math.random() * 8) + 2} weeks`,
      roi: `${Math.floor(Math.random() * 300) + 150}%`,
      users: Math.floor(Math.random() * 50000) + 5000
    })),

    // Business Intelligence (200 features)
    ...Array.from({ length: 200 }, (_, i) => ({
      id: `bi-${i}`,
      name: `BI Analytics ${i + 1}`,
      description: `Advanced analytics for ${['revenue', 'customers', 'operations', 'marketing', 'sales'][i % 5]} optimization`,
      category: "Business Intelligence",
      icon: [BarChart3, TrendingUp, DollarSign, Target, Users][i % 5],
      complexity: ['basic', 'advanced', 'expert'][i % 3] as 'basic' | 'advanced' | 'expert',
      implementation: `${Math.floor(Math.random() * 6) + 1} weeks`,
      roi: `${Math.floor(Math.random() * 400) + 200}%`,
      users: Math.floor(Math.random() * 75000) + 15000
    })),

    // Automation & Workflows (200 features)
    ...Array.from({ length: 200 }, (_, i) => ({
      id: `automation-${i}`,
      name: `Automation Engine ${i + 1}`,
      description: `Intelligent automation for ${['workflows', 'processes', 'tasks', 'notifications', 'integrations'][i % 5]}`,
      category: "Automation & Workflows",
      icon: [Zap, Cog, Settings, Bell, Code][i % 5],
      complexity: ['basic', 'advanced', 'expert'][i % 3] as 'basic' | 'advanced' | 'expert',
      implementation: `${Math.floor(Math.random() * 10) + 2} weeks`,
      roi: `${Math.floor(Math.random() * 600) + 250}%`,
      users: Math.floor(Math.random() * 60000) + 8000
    })),

    // Integration & APIs (200 features)
    ...Array.from({ length: 200 }, (_, i) => ({
      id: `integration-${i}`,
      name: `Integration Hub ${i + 1}`,
      description: `Seamless integration with ${['CRM', 'ERP', 'Marketing', 'Sales', 'Support'][i % 5]} systems`,
      category: "Integration & APIs",
      icon: [Globe, Box, Package, Truck, Factory][i % 5],
      complexity: ['basic', 'advanced', 'expert'][i % 3] as 'basic' | 'advanced' | 'expert',
      implementation: `${Math.floor(Math.random() * 4) + 1} weeks`,
      roi: `${Math.floor(Math.random() * 350) + 120}%`,
      users: Math.floor(Math.random() * 40000) + 12000
    }))
  ];

  const categories = Array.from(new Set(enterpriseFeatures.map(f => f.category)));

  const filteredFeatures = enterpriseFeatures.filter(f => 
    selectedCategory === "all" || f.category === selectedCategory
  );

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'advanced': return 'bg-yellow-100 text-yellow-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Building className="w-4 h-4 mr-2" />
              Enterprise Features
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Enterprise-Grade Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              1000+ enterprise features for large-scale startup operations
            </p>
          </div>

          {/* Enterprise Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {[
              { label: "Security Features", value: "200+", icon: Shield },
              { label: "Infrastructure Tools", value: "200+", icon: Server },
              { label: "BI Analytics", value: "200+", icon: BarChart3 },
              { label: "Automation Engines", value: "200+", icon: Zap },
              { label: "API Integrations", value: "200+", icon: Globe },
              { label: "Enterprise Users", value: "50K+", icon: Users }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="shadow-card">
                  <CardContent className="p-4 text-center">
                    <IconComponent className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All Features</TabsTrigger>
              <TabsTrigger value="Security & Compliance">Security</TabsTrigger>
              <TabsTrigger value="Infrastructure & DevOps">Infrastructure</TabsTrigger>
              <TabsTrigger value="Business Intelligence">Analytics</TabsTrigger>
              <TabsTrigger value="Automation & Workflows">Automation</TabsTrigger>
              <TabsTrigger value="Integration & APIs">Integration</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory} className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">
                    {selectedCategory === "all" ? "All Enterprise Features" : selectedCategory}
                  </h3>
                  <p className="text-muted-foreground">
                    {filteredFeatures.length} features available
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export List
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredFeatures.slice(0, 100).map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card key={feature.id} className="shadow-card hover:shadow-electric transition-all cursor-pointer group">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <IconComponent className="w-6 h-6 text-primary" />
                          <Badge className={getComplexityColor(feature.complexity)}>
                            {feature.complexity}
                          </Badge>
                        </div>
                        <CardTitle className="text-sm font-semibold group-hover:text-primary transition-colors">
                          {feature.name}
                        </CardTitle>
                        <CardDescription className="text-xs line-clamp-2">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Implementation</span>
                            <span className="font-medium">{feature.implementation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ROI</span>
                            <span className="font-medium text-green-600">{feature.roi}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Users</span>
                            <span className="font-medium">{feature.users.toLocaleString()}</span>
                          </div>
                        </div>
                        <Button size="sm" className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          Deploy Feature
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
          </Tabs>

          {/* Enterprise Implementation Roadmap */}
          <Card className="shadow-card mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tool className="w-5 h-5 text-primary" />
                Enterprise Implementation Roadmap
              </CardTitle>
              <CardDescription>
                Phased rollout plan for enterprise feature deployment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { phase: "Phase 1", title: "Foundation", duration: "4-6 weeks", features: 250, progress: 100 },
                  { phase: "Phase 2", title: "Security", duration: "6-8 weeks", features: 200, progress: 75 },
                  { phase: "Phase 3", title: "Analytics", duration: "8-10 weeks", features: 200, progress: 45 },
                  { phase: "Phase 4", title: "Automation", duration: "10-12 weeks", features: 350, progress: 20 }
                ].map((phase, index) => (
                  <div key={index} className="space-y-3">
                    <div className="text-center">
                      <Badge variant="outline" className="mb-2">{phase.phase}</Badge>
                      <h4 className="font-semibold">{phase.title}</h4>
                      <p className="text-sm text-muted-foreground">{phase.duration}</p>
                    </div>
                    <Progress value={phase.progress} className="h-2" />
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{phase.features}</div>
                      <div className="text-xs text-muted-foreground">features</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}