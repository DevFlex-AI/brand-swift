import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, Rocket, Settings, Eye, Copy, ExternalLink,
  CheckCircle, Clock, AlertTriangle, Zap, Brain, Code,
  Database, Shield, BarChart3, Users, Download, Share2
} from 'lucide-react';

interface DeploymentTarget {
  id: string;
  name: string;
  description: string;
  icon: any;
  features: string[];
  buildTime: string;
  pricing: string;
  status: 'available' | 'coming-soon' | 'premium';
}

export default function Deploy() {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);

  const deploymentTargets: DeploymentTarget[] = [
    {
      id: "vercel",
      name: "Vercel",
      description: "Instant deployment with global CDN and automatic HTTPS",
      icon: Globe,
      features: ["Global CDN", "Automatic HTTPS", "Preview Deployments", "Analytics"],
      buildTime: "30-60 seconds",
      pricing: "Free tier available",
      status: "available"
    },
    {
      id: "netlify",
      name: "Netlify",
      description: "Modern web deployment with form handling and serverless functions",
      icon: Rocket,
      features: ["Form Handling", "Serverless Functions", "Split Testing", "Analytics"],
      buildTime: "45-90 seconds",
      pricing: "Free tier available",
      status: "available"
    },
    {
      id: "aws",
      name: "AWS Amplify",
      description: "Enterprise-grade deployment with full AWS integration",
      icon: Shield,
      features: ["Auto Scaling", "Custom Domains", "CI/CD Pipeline", "Monitoring"],
      buildTime: "2-5 minutes",
      pricing: "Pay per use",
      status: "premium"
    },
    {
      id: "smack-cloud",
      name: "Smack Cloud",
      description: "Our premium hosting optimized for AI-generated applications",
      icon: Brain,
      features: ["AI Optimization", "Auto Scaling", "Performance Monitoring", "24/7 Support"],
      buildTime: "15-30 seconds",
      pricing: "Premium only",
      status: "premium"
    }
  ];

  const mockProjects = [
    { id: "1", name: "TaskFlow Pro", status: "ready" },
    { id: "2", name: "ShopSmart Store", status: "ready" },
    { id: "3", name: "DevConnect Social", status: "generating" }
  ];

  const deploymentHistory = [
    {
      id: "1",
      project: "TaskFlow Pro",
      target: "Vercel",
      url: "https://taskflow-pro.vercel.app",
      status: "success",
      deployedAt: "2024-01-20T10:30:00Z",
      buildTime: "45s"
    },
    {
      id: "2",
      project: "ShopSmart Store",
      target: "Netlify",
      url: "https://shopsmart-store.netlify.app",
      status: "success",
      deployedAt: "2024-01-19T15:20:00Z",
      buildTime: "1m 12s"
    }
  ];

  const handleDeploy = async () => {
    if (!selectedProject || !selectedTarget) {
      alert("Please select a project and deployment target");
      return;
    }

    setIsDeploying(true);
    
    // Simulate deployment process
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      alert("Deployment successful! Your app is now live.");
    } catch (error) {
      alert("Deployment failed. Please try again.");
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              <Globe className="w-4 h-4 mr-2" />
              Deployment Center
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Deploy with One Click
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Deploy your AI-generated applications to production instantly
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Deployment Configuration */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-primary" />
                    Deployment Config
                  </CardTitle>
                  <CardDescription>
                    Configure your deployment settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Project</label>
                    <Select value={selectedProject} onValueChange={setSelectedProject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose project to deploy" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProjects.map((project) => (
                          <SelectItem 
                            key={project.id} 
                            value={project.id}
                            disabled={project.status !== 'ready'}
                          >
                            {project.name} {project.status !== 'ready' && '(Not Ready)'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Custom Domain (Optional)</label>
                    <Input
                      placeholder="your-app.com"
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                    />
                  </div>

                  <Button 
                    onClick={handleDeploy}
                    disabled={isDeploying || !selectedProject || !selectedTarget}
                    className="w-full bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all"
                  >
                    {isDeploying ? (
                      <>
                        <Brain className="w-4 h-4 mr-2 animate-spin" />
                        Deploying...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-4 h-4 mr-2" />
                        Deploy Now
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-sm">Deployment Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total Deployments</span>
                    <span className="font-medium">247</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Success Rate</span>
                    <span className="font-medium text-green-500">99.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg Build Time</span>
                    <span className="font-medium">1m 23s</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="targets" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="targets">Deployment Targets</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="domains">Domains</TabsTrigger>
                </TabsList>

                <TabsContent value="targets" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {deploymentTargets.map((target) => {
                      const IconComponent = target.icon;
                      return (
                        <Card 
                          key={target.id} 
                          className={`shadow-card cursor-pointer transition-all hover:shadow-electric ${
                            selectedTarget === target.id ? 'ring-2 ring-primary border-primary/50' : ''
                          }`}
                          onClick={() => setSelectedTarget(target.id)}
                        >
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="flex items-center gap-2">
                                <IconComponent className="w-5 h-5 text-primary" />
                                {target.name}
                              </CardTitle>
                              <Badge 
                                variant={target.status === 'available' ? 'default' : 'secondary'}
                                className={
                                  target.status === 'premium' ? 'bg-primary/10 text-primary' : ''
                                }
                              >
                                {target.status === 'premium' ? 'Premium' : 
                                 target.status === 'coming-soon' ? 'Coming Soon' : 'Available'}
                              </Badge>
                            </div>
                            <CardDescription>{target.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-sm mb-2">Features:</h4>
                                <div className="flex flex-wrap gap-1">
                                  {target.features.map((feature, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <div className="text-muted-foreground">Build Time</div>
                                  <div className="font-medium">{target.buildTime}</div>
                                </div>
                                <div>
                                  <div className="text-muted-foreground">Pricing</div>
                                  <div className="font-medium">{target.pricing}</div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="history" className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle>Deployment History</CardTitle>
                      <CardDescription>
                        Track your recent deployments and their status
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {deploymentHistory.map((deployment) => (
                          <div key={deployment.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <div>
                                <h4 className="font-semibold">{deployment.project}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Deployed to {deployment.target} • {deployment.buildTime} build time
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                                Success
                              </Badge>
                              <Button size="sm" variant="outline" asChild>
                                <a href={deployment.url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="domains" className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle>Custom Domains</CardTitle>
                      <CardDescription>
                        Manage custom domains for your deployed applications
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Domain Management</h3>
                        <p className="text-muted-foreground mb-4">
                          Connect custom domains to your deployed applications
                        </p>
                        <Button variant="outline">
                          <Globe className="w-4 h-4 mr-2" />
                          Add Custom Domain
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}