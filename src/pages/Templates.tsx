import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Code, Search, Filter, Eye, Download, Star, Clock, 
  Users, Globe, Smartphone, Database, Brain, Zap,
  Layout, Component, Package, Rocket, Target, BarChart3
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  complexity: 'simple' | 'medium' | 'complex';
  estimatedTime: string;
  features: string[];
  techStack: string[];
  downloads: number;
  rating: number;
  preview: string;
  author: string;
  isPremium: boolean;
}

export default function Templates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedComplexity, setSelectedComplexity] = useState('all');

  const templates: Template[] = [
    {
      id: "saas-dashboard",
      name: "SaaS Dashboard Pro",
      description: "Complete SaaS application with user management, analytics, billing, and team collaboration",
      category: "Business",
      complexity: "complex",
      estimatedTime: "15-20 minutes",
      features: ["User Authentication", "Dashboard Analytics", "Subscription Management", "Team Collaboration", "API Integration", "Real-time Updates"],
      techStack: ["React", "TypeScript", "Supabase", "Stripe", "Tailwind CSS", "Recharts"],
      downloads: 15420,
      rating: 4.9,
      preview: "/api/placeholder/400/300",
      author: "Smack Builder Team",
      isPremium: true
    },
    {
      id: "ecommerce-store",
      name: "E-commerce Storefront",
      description: "Full-featured online store with product management, cart, and payment processing",
      category: "E-commerce",
      complexity: "complex",
      estimatedTime: "20-25 minutes",
      features: ["Product Catalog", "Shopping Cart", "Payment Processing", "Order Management", "Inventory Tracking", "Customer Reviews"],
      techStack: ["React", "TypeScript", "Supabase", "Stripe", "Tailwind CSS", "Framer Motion"],
      downloads: 12340,
      rating: 4.8,
      preview: "/api/placeholder/400/300",
      author: "Smack Builder Team",
      isPremium: true
    },
    {
      id: "social-platform",
      name: "Social Network",
      description: "Social networking platform with posts, messaging, and real-time interactions",
      category: "Social",
      complexity: "complex",
      estimatedTime: "25-30 minutes",
      features: ["User Profiles", "Posts & Comments", "Real-time Chat", "Notifications", "Friend System", "Media Sharing"],
      techStack: ["React", "TypeScript", "Supabase", "WebSockets", "Tailwind CSS", "Socket.io"],
      downloads: 9876,
      rating: 4.7,
      preview: "/api/placeholder/400/300",
      author: "Community",
      isPremium: false
    },
    {
      id: "portfolio-website",
      name: "Developer Portfolio",
      description: "Professional portfolio website with project showcase and contact forms",
      category: "Portfolio",
      complexity: "simple",
      estimatedTime: "5-10 minutes",
      features: ["Project Gallery", "Contact Form", "Blog Section", "SEO Optimization", "Dark Mode", "Responsive Design"],
      techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "React Hook Form"],
      downloads: 8765,
      rating: 4.6,
      preview: "/api/placeholder/400/300",
      author: "Community",
      isPremium: false
    },
    {
      id: "ai-chatbot",
      name: "AI Chatbot Interface",
      description: "Intelligent chatbot with natural language processing and context memory",
      category: "AI",
      complexity: "medium",
      estimatedTime: "10-15 minutes",
      features: ["NLP Processing", "Context Memory", "Multi-language Support", "Analytics", "Custom Training", "API Integration"],
      techStack: ["React", "TypeScript", "OpenAI", "Supabase", "Tailwind CSS"],
      downloads: 7654,
      rating: 4.8,
      preview: "/api/placeholder/400/300",
      author: "Smack Builder Team",
      isPremium: true
    },
    {
      id: "mobile-app",
      name: "Cross-Platform Mobile",
      description: "React Native mobile application with native features and offline support",
      category: "Mobile",
      complexity: "complex",
      estimatedTime: "30-35 minutes",
      features: ["Native Navigation", "Push Notifications", "Offline Support", "Device APIs", "Biometric Auth", "App Store Ready"],
      techStack: ["React Native", "TypeScript", "Expo", "Supabase", "NativeBase"],
      downloads: 6543,
      rating: 4.5,
      preview: "/api/placeholder/400/300",
      author: "Community",
      isPremium: false
    }
  ];

  const categories = Array.from(new Set(templates.map(t => t.category)));

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = searchTerm === '' || 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesComplexity = selectedComplexity === 'all' || template.complexity === selectedComplexity;
    
    return matchesSearch && matchesCategory && matchesComplexity;
  });

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'complex': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              <Layout className="w-4 h-4 mr-2" />
              App Templates
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Production-Ready Templates
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Start with battle-tested templates optimized by Smacked AI
            </p>
          </div>

          {/* Filters */}
          <Card className="shadow-card mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Complexity</SelectItem>
                    <SelectItem value="simple">Simple</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="complex">Complex</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
              
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span>Showing {filteredTemplates.length} of {templates.length} templates</span>
                <Badge variant="outline">{templates.filter(t => t.isPremium).length} Premium</Badge>
                <Badge variant="outline">{templates.filter(t => !t.isPremium).length} Free</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="shadow-card hover:shadow-electric transition-all cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {template.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {template.isPremium && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Pro
                        </Badge>
                      )}
                      <Badge className={getComplexityColor(template.complexity)}>
                        {template.complexity}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Preview */}
                    <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center border border-border/50">
                      <Code className="w-8 h-8 text-muted-foreground" />
                    </div>
                    
                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {template.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {template.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Tech Stack:</h4>
                      <div className="flex flex-wrap gap-1">
                        {template.techStack.slice(0, 4).map((tech, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Download className="w-3 h-3 text-muted-foreground" />
                          <span>{template.downloads.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span>{template.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span>{template.estimatedTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-gradient-primary hover:shadow-glow">
                        <Brain className="w-3 h-3 mr-1" />
                        Use Template
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredTemplates.length === 0 && (
            <Card className="shadow-card">
              <CardContent className="text-center py-12">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Templates Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or browse all templates
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedComplexity('all');
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}