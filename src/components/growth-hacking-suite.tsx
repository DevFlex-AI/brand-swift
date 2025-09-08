import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Zap, Target, Users, Share2, BarChart3, Lightbulb, DollarSign } from "lucide-react";

export default function GrowthHackingSuite() {
  const [activeExperiment, setActiveExperiment] = useState("viral-loops");

  const experiments = [
    {
      id: "viral-loops",
      name: "Viral Referral Loop",
      description: "Incentivize users to invite friends with rewards",
      status: "active",
      impact: "High",
      effort: "Medium",
      results: "+45% user growth"
    },
    {
      id: "content-seo",
      name: "SEO Content Strategy",
      description: "Create viral content targeting high-volume keywords",
      status: "planning",
      impact: "High",
      effort: "High",
      results: "Projected +200% organic traffic"
    },
    {
      id: "social-proof",
      name: "Social Proof Widgets",
      description: "Display real-time user activity to boost conversions",
      status: "completed",
      impact: "Medium",
      effort: "Low",
      results: "+12% conversion rate"
    }
  ];

  const growthChannels = [
    { name: "Product Hunt Launch", potential: "10K users", cost: "Free", timeline: "1 week" },
    { name: "TikTok Viral Campaign", potential: "100K users", cost: "$5K", timeline: "2 weeks" },
    { name: "Influencer Partnerships", potential: "50K users", cost: "$10K", timeline: "4 weeks" },
    { name: "Reddit Community Building", potential: "25K users", cost: "Free", timeline: "8 weeks" },
    { name: "LinkedIn Thought Leadership", potential: "15K users", cost: "Free", timeline: "12 weeks" }
  ];

  const abTests = [
    { name: "Landing Page Headline", variant: "A vs B", status: "running", winner: "TBD", improvement: "TBD" },
    { name: "Pricing Page Layout", variant: "A vs B vs C", status: "completed", winner: "Variant B", improvement: "+18% conversions" },
    { name: "Email Subject Lines", variant: "A vs B", status: "completed", winner: "Variant A", improvement: "+23% open rate" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Zap className="w-4 h-4 mr-2" />
              Growth Hacking Suite
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Explosive Growth Tactics
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              AI-powered growth experiments and viral marketing strategies
            </p>
          </div>

          <Tabs defaultValue="experiments" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="experiments">Experiments</TabsTrigger>
              <TabsTrigger value="channels">Channels</TabsTrigger>
              <TabsTrigger value="testing">A/B Testing</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="experiments" className="space-y-6">
              <div className="grid gap-6">
                {experiments.map((experiment) => (
                  <Card 
                    key={experiment.id}
                    className={`shadow-card cursor-pointer transition-all ${
                      activeExperiment === experiment.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setActiveExperiment(experiment.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-primary" />
                          {experiment.name}
                        </CardTitle>
                        <Badge variant={
                          experiment.status === "active" ? "default" :
                          experiment.status === "completed" ? "secondary" : "outline"
                        }>
                          {experiment.status}
                        </Badge>
                      </div>
                      <CardDescription>{experiment.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Impact</p>
                          <Badge variant={experiment.impact === "High" ? "default" : "secondary"}>
                            {experiment.impact}
                          </Badge>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Effort</p>
                          <Badge variant="outline">{experiment.effort}</Badge>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Results</p>
                          <p className="font-semibold text-sm">{experiment.results}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="channels" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Growth Channels
                  </CardTitle>
                  <CardDescription>
                    Recommended channels for rapid user acquisition
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {growthChannels.map((channel, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                        <div>
                          <h4 className="font-semibold">{channel.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Potential: {channel.potential} • Cost: {channel.cost} • Timeline: {channel.timeline}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Zap className="w-3 h-3 mr-1" />
                          Launch
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="testing" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    A/B Testing Dashboard
                  </CardTitle>
                  <CardDescription>
                    Monitor and analyze your conversion experiments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {abTests.map((test, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                        <div>
                          <h4 className="font-semibold">{test.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {test.variant} • Winner: {test.winner} • {test.improvement}
                          </p>
                        </div>
                        <Badge variant={test.status === "running" ? "default" : "secondary"}>
                          {test.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full mt-4">
                    <Target className="w-4 h-4 mr-2" />
                    Create New Test
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Growth Rate</p>
                        <p className="text-2xl font-bold">+127%</p>
                        <p className="text-xs text-success">vs last month</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Viral Coefficient</p>
                        <p className="text-2xl font-bold">1.8</p>
                        <p className="text-xs text-success">Above 1.0 target</p>
                      </div>
                      <Share2 className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">CAC Payback</p>
                        <p className="text-2xl font-bold">3.2 mo</p>
                        <p className="text-xs text-success">Improving</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}