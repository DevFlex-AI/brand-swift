import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Rocket, Eye, Code, Globe, Settings, Trash2, Copy, 
  Download, Share2, Play, Pause, RefreshCw, BarChart3,
  Users, Clock, CheckCircle, AlertTriangle, Brain, Zap
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'generating' | 'completed' | 'deployed' | 'error';
  progress: number;
  template: string;
  deployUrl?: string;
  createdAt: string;
  lastModified: string;
  collaborators: number;
  views: number;
}

export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockProjects: Project[] = [
      {
        id: "1",
        name: "TaskFlow Pro",
        description: "Team task management app with real-time collaboration",
        status: "deployed",
        progress: 100,
        template: "SaaS Dashboard",
        deployUrl: "https://taskflow-pro.smackbuilder.app",
        createdAt: "2024-01-15T10:30:00Z",
        lastModified: "2024-01-16T14:20:00Z",
        collaborators: 3,
        views: 1247
      },
      {
        id: "2",
        name: "ShopSmart Store",
        description: "E-commerce platform for sustainable products",
        status: "completed",
        progress: 100,
        template: "E-commerce Store",
        createdAt: "2024-01-18T09:15:00Z",
        lastModified: "2024-01-18T16:45:00Z",
        collaborators: 1,
        views: 892
      },
      {
        id: "3",
        name: "DevConnect Social",
        description: "Social network for developers to share projects",
        status: "generating",
        progress: 67,
        template: "Social Platform",
        createdAt: "2024-01-20T11:00:00Z",
        lastModified: "2024-01-20T11:00:00Z",
        collaborators: 2,
        views: 0
      }
    ];
    
    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'completed': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'generating': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'error': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deployed': return CheckCircle;
      case 'completed': return CheckCircle;
      case 'generating': return RefreshCw;
      case 'error': return AlertTriangle;
      default: return Clock;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <Brain className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold mb-2">Loading Your Projects...</h2>
              <p className="text-muted-foreground">Fetching your AI-generated applications</p>
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
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                <Rocket className="w-4 h-4 mr-2" />
                My Projects
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                Your AI Applications
              </h1>
              <p className="text-xl text-muted-foreground">
                Manage and deploy your Smacked AI generated applications
              </p>
            </div>
            <Button className="bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all">
              <Brain className="w-4 h-4 mr-2" />
              Create New App
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary">{projects.length}</div>
                    <div className="text-sm text-muted-foreground">Total Projects</div>
                  </div>
                  <Rocket className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {projects.filter(p => p.status === 'deployed').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Deployed</div>
                  </div>
                  <Globe className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {projects.reduce((sum, p) => sum + p.collaborators, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Collaborators</div>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {projects.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Views</div>
                  </div>
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="deployed">Deployed</TabsTrigger>
              <TabsTrigger value="generating">In Progress</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {projects.length > 0 ? (
                <div className="grid gap-6">
                  {projects.map((project) => {
                    const StatusIcon = getStatusIcon(project.status);
                    return (
                      <Card key={project.id} className="shadow-card hover:shadow-electric transition-all">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                                <Rocket className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-xl">{project.name}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(project.status)}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {project.status}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Progress Bar for generating projects */}
                            {project.status === 'generating' && (
                              <div>
                                <div className="flex justify-between text-sm mb-2">
                                  <span>Generation Progress</span>
                                  <span>{project.progress}%</span>
                                </div>
                                <Progress value={project.progress} className="h-2" />
                              </div>
                            )}

                            {/* Project Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <div className="text-muted-foreground">Template</div>
                                <div className="font-medium">{project.template}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Created</div>
                                <div className="font-medium">
                                  {new Date(project.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Collaborators</div>
                                <div className="font-medium">{project.collaborators}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Views</div>
                                <div className="font-medium">{project.views.toLocaleString()}</div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="default">
                                <Eye className="w-3 h-3 mr-1" />
                                Open
                              </Button>
                              <Button size="sm" variant="outline">
                                <Code className="w-3 h-3 mr-1" />
                                Code
                              </Button>
                              {project.deployUrl && (
                                <Button size="sm" variant="outline" asChild>
                                  <a href={project.deployUrl} target="_blank" rel="noopener noreferrer">
                                    <Globe className="w-3 h-3 mr-1" />
                                    Live
                                  </a>
                                </Button>
                              )}
                              <Button size="sm" variant="outline">
                                <Settings className="w-3 h-3 mr-1" />
                                Settings
                              </Button>
                              <Button size="sm" variant="outline">
                                <Share2 className="w-3 h-3 mr-1" />
                                Share
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="w-3 h-3 mr-1" />
                                Export
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="shadow-card">
                  <CardContent className="text-center py-12">
                    <Rocket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Start building your first AI-generated application with Smacked AI
                    </p>
                    <Button className="bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all">
                      <Brain className="w-4 h-4 mr-2" />
                      Create Your First App
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Other tab contents would be filtered versions of the same data */}
            <TabsContent value="deployed">
              <div className="grid gap-6">
                {projects.filter(p => p.status === 'deployed').map((project) => (
                  <Card key={project.id} className="shadow-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{project.name}</h3>
                          <p className="text-muted-foreground">{project.description}</p>
                        </div>
                        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                          <Globe className="w-3 h-3 mr-1" />
                          Live
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="generating">
              <div className="grid gap-6">
                {projects.filter(p => p.status === 'generating').map((project) => (
                  <Card key={project.id} className="shadow-card border-primary/20 bg-gradient-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <Brain className="w-8 h-8 text-primary animate-pulse" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-primary">{project.name}</h3>
                          <p className="text-muted-foreground mb-3">{project.description}</p>
                          <Progress value={project.progress} className="h-2" />
                          <p className="text-sm text-muted-foreground mt-2">
                            {project.progress}% complete - Smacked AI is building your app...
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="drafts">
              <Card className="shadow-card">
                <CardContent className="text-center py-12">
                  <Code className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Draft Projects</h3>
                  <p className="text-muted-foreground">
                    All your projects are either completed or deployed
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}