import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, Users, Code, Rocket, CheckCircle2 } from "lucide-react";

export default function MVPRoadmapGenerator() {
  const [activePhase, setActivePhase] = useState("phase1");

  const phases = [
    {
      id: "phase1",
      title: "Phase 1: Foundation",
      duration: "4 weeks",
      progress: 100,
      status: "completed",
      features: [
        { name: "User Authentication", priority: "Must Have", effort: "5 days", status: "completed" },
        { name: "Basic Dashboard", priority: "Must Have", effort: "3 days", status: "completed" },
        { name: "Core Workflow", priority: "Must Have", effort: "8 days", status: "completed" },
        { name: "Payment Integration", priority: "Must Have", effort: "4 days", status: "completed" }
      ]
    },
    {
      id: "phase2",
      title: "Phase 2: Core Features",
      duration: "6 weeks",
      progress: 60,
      status: "in-progress",
      features: [
        { name: "AI Content Generation", priority: "Must Have", effort: "10 days", status: "completed" },
        { name: "Template System", priority: "Must Have", effort: "7 days", status: "in-progress" },
        { name: "Export Features", priority: "Should Have", effort: "5 days", status: "pending" },
        { name: "Collaboration Tools", priority: "Should Have", effort: "8 days", status: "pending" }
      ]
    },
    {
      id: "phase3",
      title: "Phase 3: Enhancement",
      duration: "4 weeks",
      progress: 0,
      status: "pending",
      features: [
        { name: "Advanced Analytics", priority: "Could Have", effort: "6 days", status: "pending" },
        { name: "API Access", priority: "Could Have", effort: "8 days", status: "pending" },
        { name: "Mobile App", priority: "Won't Have", effort: "15 days", status: "pending" },
        { name: "White Label", priority: "Won't Have", effort: "12 days", status: "pending" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success/10 text-success";
      case "in-progress": return "bg-warning/10 text-warning";
      case "pending": return "bg-muted/10 text-muted-foreground";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Must Have": return "bg-destructive/10 text-destructive";
      case "Should Have": return "bg-warning/10 text-warning";
      case "Could Have": return "bg-primary/10 text-primary";
      case "Won't Have": return "bg-muted/10 text-muted-foreground";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <MapPin className="w-4 h-4 mr-2" />
              MVP Roadmap Generator
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              90-Day Build Roadmap
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              AI-generated development plan with features, timelines, and priorities
            </p>
          </div>

          <Tabs value={activePhase} onValueChange={setActivePhase} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              {phases.map((phase) => (
                <TabsTrigger key={phase.id} value={phase.id} className="flex flex-col gap-1">
                  <span>{phase.title}</span>
                  <span className="text-xs text-muted-foreground">{phase.duration}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {phases.map((phase) => (
              <TabsContent key={phase.id} value={phase.id} className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Rocket className="w-5 h-5 text-primary" />
                          {phase.title}
                        </CardTitle>
                        <CardDescription>
                          Duration: {phase.duration} • Progress: {phase.progress}%
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(phase.status)}>
                        {phase.status.replace("-", " ")}
                      </Badge>
                    </div>
                    <Progress value={phase.progress} className="mt-4" />
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {phase.features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className={`w-5 h-5 ${
                              feature.status === "completed" ? "text-success" : 
                              feature.status === "in-progress" ? "text-warning" : "text-muted-foreground"
                            }`} />
                            <div>
                              <h4 className="font-semibold">{feature.name}</h4>
                              <p className="text-sm text-muted-foreground">Effort: {feature.effort}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getPriorityColor(feature.priority)}>
                              {feature.priority}
                            </Badge>
                            <Badge variant="outline" className={getStatusColor(feature.status)}>
                              {feature.status.replace("-", " ")}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Duration</span>
                    <span className="font-semibold">14 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">MVP Launch</span>
                    <span className="font-semibold">Week 10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Full Release</span>
                    <span className="font-semibold">Week 14</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Team Size
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Frontend Dev</span>
                    <span className="font-semibold">1 person</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Backend Dev</span>
                    <span className="font-semibold">1 person</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Designer</span>
                    <span className="font-semibold">0.5 person</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  Tech Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Frontend</span>
                    <span className="font-semibold">React + Vite</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Backend</span>
                    <span className="font-semibold">Supabase</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">AI</span>
                    <span className="font-semibold">OpenAI API</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}