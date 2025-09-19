import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Lightbulb, Brain, Search, Plus, Edit3, Trash2, Eye,
  FileText, Code, Database, Globe, Users, Settings,
  BookOpen, GraduationCap, Target, Zap, Star, Clock,
  Tag, Filter, Download, Upload, Share2, Copy
} from 'lucide-react';

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  type: 'instruction' | 'example' | 'best-practice' | 'troubleshooting';
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  author: string;
  isPublic: boolean;
  votes: number;
}

interface ProjectInstruction {
  id: string;
  projectId: string;
  instruction: string;
  isActive: boolean;
  createdAt: string;
}

export default function Knowledge() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newInstruction, setNewInstruction] = useState('');
  const [activeTab, setActiveTab] = useState('browse');

  const knowledgeItems: KnowledgeItem[] = [
    {
      id: "1",
      title: "React Component Best Practices",
      content: "When building React components, always follow these patterns for optimal performance and maintainability...",
      type: "best-practice",
      category: "Frontend",
      tags: ["React", "Components", "Performance"],
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-16T14:20:00Z",
      author: "Smacked AI",
      isPublic: true,
      votes: 42
    },
    {
      id: "2",
      title: "Supabase RLS Configuration",
      content: "Configure Row Level Security policies for secure data access in your applications...",
      type: "instruction",
      category: "Database",
      tags: ["Supabase", "Security", "RLS"],
      createdAt: "2024-01-14T09:15:00Z",
      updatedAt: "2024-01-14T09:15:00Z",
      author: "Smacked AI",
      isPublic: true,
      votes: 38
    },
    {
      id: "3",
      title: "Stripe Integration Example",
      content: "Complete example of integrating Stripe payments with subscription management...",
      type: "example",
      category: "Payments",
      tags: ["Stripe", "Payments", "Subscriptions"],
      createdAt: "2024-01-13T16:45:00Z",
      updatedAt: "2024-01-13T16:45:00Z",
      author: "Community",
      isPublic: true,
      votes: 56
    },
    {
      id: "4",
      title: "Deployment Troubleshooting",
      content: "Common deployment issues and their solutions when using various hosting platforms...",
      type: "troubleshooting",
      category: "Deployment",
      tags: ["Deployment", "Troubleshooting", "Hosting"],
      createdAt: "2024-01-12T11:20:00Z",
      updatedAt: "2024-01-18T08:30:00Z",
      author: "Smacked AI",
      isPublic: true,
      votes: 29
    }
  ];

  const projectInstructions: ProjectInstruction[] = [
    {
      id: "1",
      projectId: "current",
      instruction: "Always use TypeScript strict mode and implement proper error boundaries for production applications.",
      isActive: true,
      createdAt: "2024-01-20T10:00:00Z"
    },
    {
      id: "2",
      projectId: "current",
      instruction: "Implement responsive design with mobile-first approach and test on multiple device sizes.",
      isActive: true,
      createdAt: "2024-01-20T10:05:00Z"
    },
    {
      id: "3",
      projectId: "current",
      instruction: "Use Supabase RLS policies for data security and implement proper authentication flows.",
      isActive: true,
      createdAt: "2024-01-20T10:10:00Z"
    }
  ];

  const categories = Array.from(new Set(knowledgeItems.map(item => item.category)));

  const filteredItems = knowledgeItems.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'instruction': return FileText;
      case 'example': return Code;
      case 'best-practice': return Star;
      case 'troubleshooting': return Target;
      default: return Lightbulb;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'instruction': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'example': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'best-practice': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'troubleshooting': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const handleSaveInstruction = () => {
    if (!newInstruction.trim()) return;
    
    // In a real app, this would save to the database
    console.log('Saving instruction:', newInstruction);
    setNewInstruction('');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              <Lightbulb className="w-4 h-4 mr-2" />
              Knowledge Base
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              AI-Powered Knowledge
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Curated knowledge base enhanced by Smacked AI for better development
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Project Instructions */}
              <Card className="shadow-card border-primary/20 bg-gradient-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Brain className="w-5 h-5 animate-pulse" />
                    Project Instructions
                  </CardTitle>
                  <CardDescription>
                    AI instructions for current project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {projectInstructions.map((instruction) => (
                    <div key={instruction.id} className="p-3 bg-background/50 rounded-lg border border-border/50">
                      <p className="text-sm">{instruction.instruction}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="text-xs">
                          Active
                        </Badge>
                        <Button size="sm" variant="ghost">
                          <Edit3 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Add new project instruction..."
                      value={newInstruction}
                      onChange={(e) => setNewInstruction(e.target.value)}
                      className="min-h-20"
                    />
                    <Button 
                      size="sm" 
                      onClick={handleSaveInstruction}
                      disabled={!newInstruction.trim()}
                      className="w-full"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Save Instruction
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-sm">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant={selectedCategory === 'all' ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory('all')}
                  >
                    All Categories
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'ghost'}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Knowledge
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Docs
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export All
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="browse">Browse</TabsTrigger>
                  <TabsTrigger value="create">Create</TabsTrigger>
                  <TabsTrigger value="ai-chat">AI Chat</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="browse" className="space-y-6">
                  {/* Search and Filters */}
                  <Card className="shadow-card">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            placeholder="Search knowledge base..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <Button variant="outline">
                          <Filter className="w-4 h-4 mr-2" />
                          Filters
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Knowledge Items */}
                  <div className="grid gap-6">
                    {filteredItems.map((item) => {
                      const TypeIcon = getTypeIcon(item.type);
                      return (
                        <Card key={item.id} className="shadow-card hover:shadow-electric transition-all">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="flex items-center gap-2">
                                <TypeIcon className="w-5 h-5 text-primary" />
                                {item.title}
                              </CardTitle>
                              <div className="flex items-center gap-2">
                                <Badge className={getTypeColor(item.type)}>
                                  {item.type.replace('-', ' ')}
                                </Badge>
                                {item.isPublic && (
                                  <Badge variant="outline">Public</Badge>
                                )}
                              </div>
                            </div>
                            <CardDescription>
                              By {item.author} • {new Date(item.createdAt).toLocaleDateString()}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <p className="text-sm text-muted-foreground line-clamp-3">
                                {item.content}
                              </p>
                              
                              <div className="flex flex-wrap gap-1">
                                {item.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    <Tag className="w-2 h-2 mr-1" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3" />
                                    <span>{item.votes}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{new Date(item.updatedAt).toLocaleDateString()}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Button size="sm" variant="outline">
                                    <Eye className="w-3 h-3 mr-1" />
                                    View
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Copy className="w-3 h-3 mr-1" />
                                    Copy
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Share2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="create" className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plus className="w-5 h-5 text-primary" />
                        Create Knowledge Item
                      </CardTitle>
                      <CardDescription>
                        Add new instructions, examples, or best practices to the knowledge base
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <Input placeholder="Enter a descriptive title..." />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Content</label>
                        <Textarea 
                          placeholder="Write your knowledge content here..."
                          className="min-h-32"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Type</label>
                          <select className="w-full p-2 border border-border/50 rounded-md bg-background">
                            <option value="instruction">Instruction</option>
                            <option value="example">Example</option>
                            <option value="best-practice">Best Practice</option>
                            <option value="troubleshooting">Troubleshooting</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Category</label>
                          <select className="w-full p-2 border border-border/50 rounded-md bg-background">
                            {categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Tags</label>
                        <Input placeholder="Enter tags separated by commas..." />
                      </div>

                      <div className="flex items-center gap-4">
                        <Button className="bg-gradient-primary hover:shadow-glow">
                          <Plus className="w-4 h-4 mr-2" />
                          Create Knowledge Item
                        </Button>
                        <Button variant="outline">
                          <Brain className="w-4 h-4 mr-2" />
                          AI Enhance
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ai-chat" className="space-y-6">
                  <Card className="shadow-card border-primary/20 bg-gradient-primary/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-primary">
                        <Brain className="w-5 h-5 animate-pulse" />
                        Chat with Smacked AI
                      </CardTitle>
                      <CardDescription>
                        Ask questions about development, get code examples, and receive personalized guidance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Chat Messages */}
                        <div className="h-96 border border-border/50 rounded-lg p-4 bg-background/50 overflow-y-auto">
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                                <Brain className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="bg-muted/50 rounded-lg p-3">
                                  <p className="text-sm">
                                    Hello! I'm Smacked AI, your autonomous development assistant. I can help you with:
                                  </p>
                                  <ul className="text-sm mt-2 space-y-1">
                                    <li>• Code generation and optimization</li>
                                    <li>• Architecture recommendations</li>
                                    <li>• Debugging and troubleshooting</li>
                                    <li>• Best practices and patterns</li>
                                  </ul>
                                  <p className="text-sm mt-2">What would you like to know?</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Chat Input */}
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Ask Smacked AI anything about development..."
                            className="flex-1"
                          />
                          <Button className="bg-gradient-primary hover:shadow-glow">
                            <Brain className="w-4 h-4 mr-2" />
                            Ask AI
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5 text-primary" />
                        Knowledge Settings
                      </CardTitle>
                      <CardDescription>
                        Configure knowledge base preferences and AI behavior
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3">AI Assistance Preferences</h4>
                        <div className="space-y-3">
                          {[
                            "Auto-suggest improvements while coding",
                            "Proactive architecture recommendations", 
                            "Real-time code optimization hints",
                            "Automatic best practice enforcement",
                            "Context-aware documentation suggestions"
                          ].map((setting, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm">{setting}</span>
                              <Button variant="outline" size="sm">
                                {Math.random() > 0.5 ? "Enabled" : "Disabled"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Knowledge Sharing</h4>
                        <div className="space-y-3">
                          {[
                            "Share knowledge items publicly",
                            "Allow community contributions",
                            "Enable knowledge item voting",
                            "Receive knowledge notifications"
                          ].map((setting, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm">{setting}</span>
                              <Button variant="outline" size="sm">
                                {Math.random() > 0.5 ? "Enabled" : "Disabled"}
                              </Button>
                            </div>
                          ))}
                        </div>
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