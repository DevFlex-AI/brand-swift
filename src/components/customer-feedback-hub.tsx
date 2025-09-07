import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Star, TrendingUp, Users, ThumbsUp, AlertCircle } from "lucide-react";

export default function CustomerFeedbackHub() {
  const [selectedFeedback, setSelectedFeedback] = useState("reviews");

  const reviews = [
    {
      id: "1",
      user: "Alex Johnson",
      rating: 5,
      title: "Game-changing platform!",
      content: "FlashBrand helped me launch my startup in record time. The AI-generated brand kit was spot on.",
      date: "2 days ago",
      verified: true,
      helpful: 12
    },
    {
      id: "2", 
      user: "Maria Garcia",
      rating: 4,
      title: "Great for beginners",
      content: "Perfect for first-time entrepreneurs. The legal templates saved me thousands in lawyer fees.",
      date: "1 week ago",
      verified: true,
      helpful: 8
    },
    {
      id: "3",
      user: "David Chen",
      rating: 5,
      title: "Exceeded expectations",
      content: "The pitch deck generator created a presentation better than what I could have made myself.",
      date: "2 weeks ago",
      verified: false,
      helpful: 15
    }
  ];

  const featureRequests = [
    {
      title: "Mobile app for iOS/Android",
      description: "Native mobile app to manage projects on the go",
      votes: 234,
      status: "planned",
      priority: "high"
    },
    {
      title: "Team collaboration features",
      description: "Real-time editing and commenting for team members",
      votes: 189,
      status: "in-progress",
      priority: "high"
    },
    {
      title: "Custom domain integration",
      description: "Connect custom domains to generated landing pages",
      votes: 156,
      status: "completed",
      priority: "medium"
    },
    {
      title: "Advanced analytics dashboard",
      description: "Detailed metrics and insights for startup performance",
      votes: 98,
      status: "under-review",
      priority: "medium"
    }
  ];

  const sentiment = {
    positive: 78,
    neutral: 15,
    negative: 7
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <MessageSquare className="w-4 h-4 mr-2" />
              Customer Feedback Hub
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Listen to Your Users
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Collect, analyze, and act on customer feedback to improve your product
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Reviews</p>
                    <p className="text-2xl font-bold">1,247</p>
                  </div>
                  <Star className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                    <p className="text-2xl font-bold">4.6</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Response Rate</p>
                    <p className="text-2xl font-bold">89%</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Satisfaction</p>
                    <p className="text-2xl font-bold">{sentiment.positive}%</p>
                  </div>
                  <ThumbsUp className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={selectedFeedback} onValueChange={setSelectedFeedback} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="requests">Feature Requests</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
              <TabsTrigger value="surveys">Surveys</TabsTrigger>
            </TabsList>

            <TabsContent value="reviews" className="space-y-6">
              <div className="grid gap-6">
                {reviews.map((review) => (
                  <Card key={review.id} className="shadow-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            {review.user.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-semibold">{review.user}</h4>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${
                                      i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">Verified</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold mb-2">{review.title}</h4>
                      <p className="text-muted-foreground mb-4">{review.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{review.helpful} helpful</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Respond
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="requests" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    Feature Requests
                  </CardTitle>
                  <CardDescription>
                    User-requested features and improvements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {featureRequests.map((request, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                        <div className="flex-1">
                          <h4 className="font-semibold">{request.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant={
                              request.status === "completed" ? "default" :
                              request.status === "in-progress" ? "secondary" :
                              request.status === "planned" ? "outline" : "outline"
                            }>
                              {request.status.replace("-", " ")}
                            </Badge>
                            <Badge variant={request.priority === "high" ? "destructive" : "outline"}>
                              {request.priority} priority
                            </Badge>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">{request.votes}</div>
                          <p className="text-xs text-muted-foreground">votes</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sentiment" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Sentiment Analysis</CardTitle>
                    <CardDescription>
                      Overall customer sentiment breakdown
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Positive</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div className="bg-success h-2 rounded-full" style={{ width: `${sentiment.positive}%` }}></div>
                          </div>
                          <span className="text-sm font-medium">{sentiment.positive}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Neutral</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div className="bg-warning h-2 rounded-full" style={{ width: `${sentiment.neutral}%` }}></div>
                          </div>
                          <span className="text-sm font-medium">{sentiment.neutral}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Negative</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div className="bg-destructive h-2 rounded-full" style={{ width: `${sentiment.negative}%` }}></div>
                          </div>
                          <span className="text-sm font-medium">{sentiment.negative}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Trending Topics</CardTitle>
                    <CardDescription>
                      Most mentioned topics in feedback
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {["AI Quality", "User Interface", "Pricing", "Speed", "Support"].map((topic, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{topic}</span>
                          <Badge variant="outline">{Math.floor(Math.random() * 50) + 10} mentions</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="surveys" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Customer Surveys
                  </CardTitle>
                  <CardDescription>
                    Create and manage customer feedback surveys
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Survey Builder</h3>
                    <p className="text-muted-foreground mb-4">
                      Create targeted surveys to gather specific feedback
                    </p>
                    <Button variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Create Survey
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