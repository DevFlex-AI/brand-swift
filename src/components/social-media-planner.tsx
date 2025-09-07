import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share2, Calendar, TrendingUp, Target, MessageSquare, Image } from "lucide-react";

export default function SocialMediaPlanner() {
  const [activeTab, setActiveTab] = useState("strategy");

  const platforms = [
    { name: "Twitter", handle: "@yourstartup", followers: "0", posts: 12, icon: "🐦" },
    { name: "LinkedIn", handle: "company/yourstartup", followers: "0", posts: 8, icon: "💼" },
    { name: "Instagram", handle: "@yourstartup", followers: "0", posts: 15, icon: "📸" },
    { name: "TikTok", handle: "@yourstartup", followers: "0", posts: 6, icon: "🎵" }
  ];

  const contentIdeas = [
    { type: "Educational", title: "How to validate your startup idea", engagement: "High", platform: "LinkedIn" },
    { type: "Behind the scenes", title: "Day in the life of a founder", engagement: "Medium", platform: "Instagram" },
    { type: "Tips & Tricks", title: "5 marketing hacks for startups", engagement: "High", platform: "Twitter" },
    { type: "Trending", title: "React to industry news", engagement: "Medium", platform: "TikTok" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Share2 className="w-4 h-4 mr-2" />
              Social Media Planner
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              AI-Powered Social Strategy
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Build your brand presence across all social platforms
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="strategy">Strategy</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="strategy" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Platform Strategy
                    </CardTitle>
                    <CardDescription>
                      Recommended social media platforms for your startup
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {platforms.map((platform, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{platform.icon}</span>
                            <div>
                              <h4 className="font-semibold">{platform.name}</h4>
                              <p className="text-sm text-muted-foreground">{platform.handle}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{platform.posts} posts/month</p>
                            <p className="text-xs text-muted-foreground">{platform.followers} followers</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full mt-4">
                      <Share2 className="w-4 h-4 mr-2" />
                      Generate Handles
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Growth Strategy
                    </CardTitle>
                    <CardDescription>
                      AI-generated growth tactics for your niche
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-gradient-primary/10 border border-primary/20">
                        <h4 className="font-semibold text-primary mb-2">Content Pillars</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Educational content (40%)</li>
                          <li>• Behind-the-scenes (25%)</li>
                          <li>• Industry insights (20%)</li>
                          <li>• Community engagement (15%)</li>
                        </ul>
                      </div>

                      <div className="p-3 rounded-lg bg-gradient-primary/10 border border-primary/20">
                        <h4 className="font-semibold text-primary mb-2">Growth Tactics</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Partner with micro-influencers</li>
                          <li>• Join startup communities</li>
                          <li>• Share user-generated content</li>
                          <li>• Host Twitter Spaces/LinkedIn Live</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Content Ideas
                  </CardTitle>
                  <CardDescription>
                    AI-generated content suggestions for your startup
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {contentIdeas.map((idea, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">{idea.type}</Badge>
                            <Badge variant="secondary" className="text-xs">{idea.platform}</Badge>
                          </div>
                          <h4 className="font-semibold">{idea.title}</h4>
                          <p className="text-sm text-muted-foreground">Expected engagement: {idea.engagement}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Image className="w-3 h-3 mr-1" />
                          Create
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full mt-4">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Generate More Ideas
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Content Calendar
                  </CardTitle>
                  <CardDescription>
                    Schedule and manage your social media posts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Content Calendar Coming Soon</h3>
                    <p className="text-muted-foreground mb-4">
                      Schedule posts, track performance, and optimize your content strategy
                    </p>
                    <Button variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Create Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Social Analytics
                  </CardTitle>
                  <CardDescription>
                    Track your social media performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                    <p className="text-muted-foreground mb-4">
                      Track engagement, reach, and growth across all platforms
                    </p>
                    <Button variant="outline">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
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