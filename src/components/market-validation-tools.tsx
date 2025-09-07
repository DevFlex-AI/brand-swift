import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckSquare, Target, Users, TrendingUp, MessageCircle, BarChart3 } from "lucide-react";

export default function MarketValidationTools() {
  const [surveyQuestion, setSurveyQuestion] = useState("");
  const [targetAudience, setTargetAudience] = useState("");

  const validationMethods = [
    { name: "Customer Surveys", description: "Gather feedback directly from potential users", icon: MessageCircle, status: "Active" },
    { name: "Landing Page Tests", description: "Measure interest with sign-up rates", icon: Target, status: "Pending" },
    { name: "Social Media Polls", description: "Quick validation through social channels", icon: Users, status: "Active" },
    { name: "Competitor Analysis", description: "Study market gaps and opportunities", icon: BarChart3, status: "Completed" }
  ];

  const surveyQuestions = [
    "What's your biggest challenge with [problem area]?",
    "How much would you pay for a solution that [value proposition]?",
    "What tools do you currently use for [specific task]?",
    "How often do you encounter [specific problem]?",
    "What would make you switch to a new [product category]?"
  ];

  const distributionChannels = [
    { name: "Reddit Communities", reach: "50K+", cost: "Free", effort: "Low" },
    { name: "LinkedIn Posts", reach: "5K+", cost: "Free", effort: "Medium" },
    { name: "Twitter Polls", reach: "2K+", cost: "Free", effort: "Low" },
    { name: "Facebook Groups", reach: "20K+", cost: "Free", effort: "Medium" },
    { name: "Google Ads", reach: "100K+", cost: "$50-200", effort: "High" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <CheckSquare className="w-4 h-4 mr-2" />
              Market Validation Tools
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Validate Your Startup Idea
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Use AI-powered tools to validate market demand before building
            </p>
          </div>

          <Tabs defaultValue="methods" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="methods">Methods</TabsTrigger>
              <TabsTrigger value="surveys">Surveys</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            <TabsContent value="methods" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {validationMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <Card key={index} className="shadow-card">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <IconComponent className="w-5 h-5 text-primary" />
                            {method.name}
                          </CardTitle>
                          <Badge variant={
                            method.status === "Active" ? "default" :
                            method.status === "Completed" ? "secondary" : "outline"
                          }>
                            {method.status}
                          </Badge>
                        </div>
                        <CardDescription>{method.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full">
                          <Target className="w-4 h-4 mr-2" />
                          Start Validation
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="surveys" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>AI Survey Generator</CardTitle>
                    <CardDescription>
                      Generate targeted survey questions for your market
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Target Audience</label>
                      <Input
                        placeholder="e.g., Remote workers, Small business owners"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Custom Question</label>
                      <Textarea
                        placeholder="What specific question do you want to ask?"
                        value={surveyQuestion}
                        onChange={(e) => setSurveyQuestion(e.target.value)}
                      />
                    </div>
                    <Button className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Generate Survey
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Suggested Questions</CardTitle>
                    <CardDescription>
                      AI-generated questions for market validation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {surveyQuestions.map((question, index) => (
                        <div key={index} className="p-3 rounded-lg border border-border/50 hover:border-primary/50 cursor-pointer">
                          <p className="text-sm">{question}</p>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Generate More
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="distribution" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Distribution Channels</CardTitle>
                  <CardDescription>
                    Recommended channels to reach your target audience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {distributionChannels.map((channel, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                        <div>
                          <h4 className="font-semibold">{channel.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Reach: {channel.reach} • Cost: {channel.cost} • Effort: {channel.effort}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Target className="w-3 h-3 mr-1" />
                          Launch
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Validation Score</CardTitle>
                    <CardDescription>Overall market validation rating</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">7.8</div>
                      <p className="text-sm text-muted-foreground">out of 10</p>
                      <Badge className="mt-2 bg-success/10 text-success">Strong Validation</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Response Rate</CardTitle>
                    <CardDescription>Survey participation metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Surveys Sent</span>
                        <span className="font-medium">1,250</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Responses</span>
                        <span className="font-medium">387</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Response Rate</span>
                        <span className="font-medium text-primary">31%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Key Insights</CardTitle>
                    <CardDescription>AI-generated market insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>• 73% would pay for this solution</p>
                      <p>• $50-100 is the optimal price range</p>
                      <p>• Main concern: data security</p>
                      <p>• Preferred features: automation</p>
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