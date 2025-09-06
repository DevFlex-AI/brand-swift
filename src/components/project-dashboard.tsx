import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Rocket, 
  Download, 
  Share2, 
  Edit3, 
  BarChart3, 
  Users, 
  DollarSign,
  FileText,
  Image,
  Globe,
  Palette,
  Calendar,
  Target,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowUpRight
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  idea: string;
  status: "generating" | "completed" | "draft";
  progress: number;
  createdAt: string;
  deliverables: {
    branding: boolean;
    landingPage: boolean;
    pitchDeck: boolean;
    legalKit: boolean;
    socialStrategy: boolean;
    mvpRoadmap: boolean;
    monetization: boolean;
  };
}

export default function ProjectDashboard() {
  const [projects] = useState<Project[]>([
    {
      id: "1",
      name: "CoffeeDrop",
      idea: "A coffee subscription service for remote teams",
      status: "completed",
      progress: 100,
      createdAt: "2024-01-15",
      deliverables: {
        branding: true,
        landingPage: true,
        pitchDeck: true,
        legalKit: true,
        socialStrategy: true,
        mvpRoadmap: true,
        monetization: true
      }
    },
    {
      id: "2", 
      name: "TaskFlow AI",
      idea: "AI-powered project management for small teams",
      status: "generating",
      progress: 67,
      createdAt: "2024-01-18",
      deliverables: {
        branding: true,
        landingPage: true,
        pitchDeck: true,
        legalKit: false,
        socialStrategy: false,
        mvpRoadmap: false,
        monetization: false
      }
    }
  ]);

  const [activeProject, setActiveProject] = useState(projects[0]);

  const deliverableIcons = {
    branding: Palette,
    landingPage: Globe,
    pitchDeck: FileText,
    legalKit: FileText,
    socialStrategy: Users,
    mvpRoadmap: Target,
    monetization: DollarSign
  };

  const deliverableLabels = {
    branding: "Brand Kit & Logo",
    landingPage: "Landing Page",
    pitchDeck: "Pitch Deck",
    legalKit: "Legal Documents",
    socialStrategy: "Social Strategy",
    mvpRoadmap: "MVP Roadmap",
    monetization: "Monetization Plan"
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">My Startups</h1>
              <p className="text-muted-foreground">Manage your AI-generated startup projects</p>
            </div>
            <Button variant="hero" className="shadow-electric">
              <Rocket className="w-4 h-4 mr-2" />
              Create New Startup
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Your Projects
              </h3>
              {projects.map((project) => (
                <Card 
                  key={project.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    activeProject.id === project.id ? 'ring-2 ring-primary shadow-electric' : ''
                  }`}
                  onClick={() => setActiveProject(project)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{project.name}</h4>
                      <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                        {project.status === 'completed' ? (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {project.idea}
                    </p>
                    <Progress value={project.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      {project.progress}% complete
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">{activeProject.name}</h2>
                  <p className="text-muted-foreground">{activeProject.idea}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export All
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="deliverables" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="deliverables" className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(activeProject.deliverables).map(([key, completed]) => {
                      const Icon = deliverableIcons[key as keyof typeof deliverableIcons];
                      const label = deliverableLabels[key as keyof typeof deliverableLabels];
                      
                      return (
                        <Card key={key} className={`transition-all hover:shadow-md ${completed ? 'border-primary/50' : ''}`}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <Icon className={`w-5 h-5 ${completed ? 'text-primary' : 'text-muted-foreground'}`} />
                              {completed && <CheckCircle2 className="w-4 h-4 text-primary" />}
                            </div>
                            <h4 className="font-semibold mb-1">{label}</h4>
                            <p className="text-xs text-muted-foreground mb-3">
                              {completed ? 'Ready to download' : 'Generating...'}
                            </p>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant={completed ? "default" : "secondary"} 
                                className="flex-1"
                                disabled={!completed}
                              >
                                {completed ? (
                                  <>
                                    <ArrowUpRight className="w-3 h-3 mr-1" />
                                    View
                                  </>
                                ) : (
                                  <>
                                    <Clock className="w-3 h-3 mr-1" />
                                    Pending
                                  </>
                                )}
                              </Button>
                              {completed && (
                                <Button size="sm" variant="outline">
                                  <Download className="w-3 h-3" />
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Page Views</p>
                            <p className="text-2xl font-bold">2,847</p>
                          </div>
                          <BarChart3 className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          <span className="text-green-600">+12%</span> vs last week
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Conversions</p>
                            <p className="text-2xl font-bold">23</p>
                          </div>
                          <TrendingUp className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          <span className="text-green-600">+5</span> this week
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Engagement</p>
                            <p className="text-2xl font-bold">4.2min</p>
                          </div>
                          <Users className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Average session time
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Overview</CardTitle>
                      <CardDescription>
                        Track your startup's key metrics and progress
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-muted-foreground">
                        Chart visualization would go here
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Settings</CardTitle>
                      <CardDescription>
                        Manage your startup project configuration
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Public Landing Page</h4>
                          <p className="text-sm text-muted-foreground">
                            Allow others to view your generated landing page
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit3 className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Team Collaboration</h4>
                          <p className="text-sm text-muted-foreground">
                            Invite team members to collaborate
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Users className="w-4 h-4 mr-2" />
                          Manage
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Custom Domain</h4>
                          <p className="text-sm text-muted-foreground">
                            Connect your own domain name
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Globe className="w-4 h-4 mr-2" />
                          Setup
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