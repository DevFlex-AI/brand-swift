import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, Users, DollarSign, TrendingUp, Calendar, Target, Award, Zap } from "lucide-react";

export default function StartupAccelerator() {
  const [selectedProgram, setSelectedProgram] = useState("growth");

  const programs = [
    {
      id: "growth",
      name: "Growth Accelerator",
      duration: "12 weeks",
      cohortSize: "20 startups",
      investment: "$50K",
      equity: "6%",
      description: "Intensive growth program for early-stage startups",
      features: ["Weekly mentorship", "Growth hacking workshops", "Investor introductions", "Demo day pitch"]
    },
    {
      id: "ai",
      name: "AI Innovation Track",
      duration: "16 weeks", 
      cohortSize: "15 startups",
      investment: "$100K",
      equity: "8%",
      description: "Specialized program for AI-powered startups",
      features: ["AI model training", "Technical mentorship", "GPU credits", "Research partnerships"]
    },
    {
      id: "enterprise",
      name: "Enterprise Scale",
      duration: "20 weeks",
      cohortSize: "10 startups",
      investment: "$250K",
      equity: "10%",
      description: "For startups ready to scale to enterprise",
      features: ["Enterprise sales training", "Partnership development", "Legal support", "IPO preparation"]
    }
  ];

  const milestones = [
    { week: 1, title: "Program Kickoff", status: "completed" },
    { week: 4, title: "MVP Launch", status: "completed" },
    { week: 8, title: "First Revenue", status: "in-progress" },
    { week: 12, title: "Series A Prep", status: "pending" },
    { week: 16, title: "Demo Day", status: "pending" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Rocket className="w-4 h-4 mr-2" />
              Startup Accelerator
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Accelerate Your Success
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join our intensive accelerator programs and scale your startup faster
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {programs.map((program) => (
              <Card 
                key={program.id}
                className={`cursor-pointer transition-all hover:shadow-card ${
                  selectedProgram === program.id ? 'ring-2 ring-primary shadow-electric' : ''
                }`}
                onClick={() => setSelectedProgram(program.id)}
              >
                <CardHeader>
                  <CardTitle>{program.name}</CardTitle>
                  <CardDescription>{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Duration</span>
                      <span className="font-medium">{program.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Investment</span>
                      <span className="font-medium">{program.investment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Equity</span>
                      <span className="font-medium">{program.equity}</span>
                    </div>
                    <div className="space-y-2">
                      {program.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Program Milestones
              </CardTitle>
              <CardDescription>
                Track your progress through the accelerator program
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      milestone.status === 'completed' ? 'bg-success text-white' :
                      milestone.status === 'in-progress' ? 'bg-warning text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {milestone.week}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground">Week {milestone.week}</p>
                    </div>
                    <Badge variant={
                      milestone.status === 'completed' ? 'default' :
                      milestone.status === 'in-progress' ? 'secondary' : 'outline'
                    }>
                      {milestone.status.replace('-', ' ')}
                    </Badge>
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