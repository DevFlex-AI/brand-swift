import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Target, TrendingUp, Calendar, MessageSquare, BookOpen, Award, Lightbulb } from "lucide-react";

export default function AICoachingDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const coachingAreas = [
    { name: "Business Strategy", progress: 75, nextMilestone: "Complete market analysis", icon: Target },
    { name: "Product Development", progress: 60, nextMilestone: "Finalize MVP features", icon: Brain },
    { name: "Marketing & Growth", progress: 45, nextMilestone: "Launch first campaign", icon: TrendingUp },
    { name: "Fundraising", progress: 30, nextMilestone: "Prepare pitch deck", icon: Award }
  ];

  const weeklyGoals = [
    { goal: "Complete customer interviews", completed: true, priority: "High" },
    { goal: "Finalize MVP wireframes", completed: true, priority: "High" },
    { goal: "Research pricing strategies", completed: false, priority: "Medium" },
    { goal: "Set up analytics tracking", completed: false, priority: "Medium" },
    { goal: "Update financial projections", completed: false, priority: "Low" }
  ];

  const insights = [
    {
      type: "Opportunity",
      title: "Untapped Market Segment",
      description: "Analysis shows 35% higher willingness to pay among enterprise customers",
      action: "Consider enterprise pricing tier",
      priority: "High"
    },
    {
      type: "Risk",
      title: "Competitor Product Launch",
      description: "CompetitorA launched similar features last week",
      action: "Accelerate unique feature development",
      priority: "High"
    },
    {
      type: "Optimization",
      title: "Conversion Rate Drop",
      description: "Landing page conversion decreased by 15% this week",
      action: "A/B test new headline variations",
      priority: "Medium"
    }
  ];

  const learningResources = [
    { title: "Startup Fundraising 101", type: "Course", duration: "2h", completed: false },
    { title: "Product-Market Fit Strategies", type: "Article", duration: "15min", completed: true },
    { title: "Growth Hacking Tactics", type: "Video", duration: "45min", completed: false },
    { title: "Financial Planning for Startups", type: "Course", duration: "3h", completed: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Brain className="w-4 h-4 mr-2" />
              AI Coaching Dashboard
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Personalized AI Guidance
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get intelligent coaching and insights to accelerate your startup journey
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Progress Overview
                    </CardTitle>
                    <CardDescription>
                      Your startup development across key areas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {coachingAreas.map((area, index) => {
                        const IconComponent = area.icon;
                        return (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <IconComponent className="w-4 h-4 text-primary" />
                                <span className="font-medium">{area.name}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{area.progress}%</span>
                            </div>
                            <Progress value={area.progress} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                              Next: {area.nextMilestone}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      AI Coach Chat
                    </CardTitle>
                    <CardDescription>
                      Get instant guidance from your AI startup coach
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-muted/30 border-l-4 border-primary">
                        <p className="text-sm font-medium">AI Coach</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          "Based on your recent progress, I recommend focusing on customer validation this week. Would you like me to create a survey template?"
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-primary/10 border-l-4 border-primary/50 ml-4">
                        <p className="text-sm font-medium">You</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          "Yes, that would be helpful. What questions should I include?"
                        </p>
                      </div>
                      <Button className="w-full">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Continue Conversation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="goals" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      This Week's Goals
                    </CardTitle>
                    <CardDescription>
                      AI-recommended tasks based on your startup stage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {weeklyGoals.map((goal, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              goal.completed ? "bg-success border-success" : "border-muted-foreground"
                            }`} />
                            <span className={`text-sm ${goal.completed ? "line-through text-muted-foreground" : ""}`}>
                              {goal.goal}
                            </span>
                          </div>
                          <Badge variant={
                            goal.priority === "High" ? "destructive" :
                            goal.priority === "Medium" ? "default" : "secondary"
                          }>
                            {goal.priority}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4">
                      <Target className="w-4 h-4 mr-2" />
                      Generate New Goals
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Goal Analytics</CardTitle>
                    <CardDescription>
                      Track your goal completion and productivity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">68%</div>
                        <p className="text-sm text-muted-foreground">Goals completed this month</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">This week</span>
                          <span className="font-medium">2/5 completed</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">This month</span>
                          <span className="font-medium">15/22 completed</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Avg. completion time</span>
                          <span className="font-medium">3.2 days</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <Card key={index} className="shadow-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-primary" />
                          {insight.title}
                        </CardTitle>
                        <Badge variant={
                          insight.type === "Opportunity" ? "default" :
                          insight.type === "Risk" ? "destructive" : "secondary"
                        }>
                          {insight.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{insight.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Recommended action:</span>
                          <span className="text-sm">{insight.action}</span>
                        </div>
                        <Badge variant={insight.priority === "High" ? "destructive" : "default"}>
                          {insight.priority} Priority
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="learning" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Personalized Learning Path
                  </CardTitle>
                  <CardDescription>
                    Curated resources based on your startup needs and progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {learningResources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                        <div>
                          <h4 className="font-semibold">{resource.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{resource.type}</Badge>
                            <span className="text-sm text-muted-foreground">{resource.duration}</span>
                            {resource.completed && (
                              <Badge variant="secondary" className="bg-success/10 text-success">
                                Completed
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          {resource.completed ? "Review" : "Start"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}