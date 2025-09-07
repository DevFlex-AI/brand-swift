import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, Calendar, Award, TrendingUp, Heart, Share2 } from "lucide-react";

export default function CommunityHub() {
  const [activeTab, setActiveTab] = useState("discussions");

  const discussions = [
    {
      id: "1",
      title: "How to validate your startup idea in 2024",
      author: "Sarah Chen",
      avatar: "/api/placeholder/40/40",
      replies: 23,
      likes: 45,
      category: "Validation",
      timeAgo: "2 hours ago",
      trending: true
    },
    {
      id: "2",
      title: "Best practices for AI-powered customer support",
      author: "Mike Rodriguez", 
      avatar: "/api/placeholder/40/40",
      replies: 18,
      likes: 32,
      category: "AI",
      timeAgo: "5 hours ago",
      trending: false
    },
    {
      id: "3",
      title: "Fundraising mistakes I wish I knew earlier",
      author: "Emma Thompson",
      avatar: "/api/placeholder/40/40", 
      replies: 41,
      likes: 78,
      category: "Fundraising",
      timeAgo: "1 day ago",
      trending: true
    }
  ];

  const events = [
    {
      title: "Startup Pitch Night",
      date: "Dec 15, 2024",
      time: "7:00 PM EST",
      attendees: 156,
      type: "Virtual",
      description: "Practice your pitch with fellow entrepreneurs"
    },
    {
      title: "AI for Startups Workshop",
      date: "Dec 20, 2024", 
      time: "2:00 PM EST",
      attendees: 89,
      type: "Virtual",
      description: "Learn how to integrate AI into your startup"
    },
    {
      title: "Founder Networking Mixer",
      date: "Dec 22, 2024",
      time: "6:00 PM EST", 
      attendees: 67,
      type: "In-Person",
      description: "Connect with other founders in San Francisco"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Kim", points: 2847, badge: "🏆", contributions: "142 posts" },
    { rank: 2, name: "Jessica Wu", points: 2156, badge: "🥈", contributions: "98 posts" },
    { rank: 3, name: "Carlos Lopez", points: 1923, badge: "🥉", contributions: "87 posts" },
    { rank: 4, name: "Rachel Green", points: 1654, badge: "⭐", contributions: "76 posts" },
    { rank: 5, name: "Tom Wilson", points: 1432, badge: "⭐", contributions: "65 posts" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Users className="w-4 h-4 mr-2" />
              Community Hub
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Connect & Learn Together
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of entrepreneurs building the future
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
            </TabsList>

            <TabsContent value="discussions" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {discussions.map((discussion) => (
                    <Card key={discussion.id} className="shadow-card hover:shadow-electric transition-all cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={discussion.avatar} />
                              <AvatarFallback>{discussion.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg flex items-center gap-2">
                                {discussion.title}
                                {discussion.trending && (
                                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    Trending
                                  </Badge>
                                )}
                              </CardTitle>
                              <CardDescription>
                                by {discussion.author} • {discussion.timeAgo}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge variant="outline">{discussion.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{discussion.replies}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{discussion.likes}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Share2 className="w-3 h-3 mr-1" />
                            Share
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-4">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="text-sm">Popular Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {["Validation", "AI", "Fundraising", "Marketing", "Product"].map((category, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{category}</span>
                            <span className="text-muted-foreground">{Math.floor(Math.random() * 50) + 10}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="text-sm">Community Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Total Members</span>
                          <span className="font-medium">12,847</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Active Today</span>
                          <span className="font-medium">1,234</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Posts This Week</span>
                          <span className="font-medium">456</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-6">
              <div className="grid gap-6">
                {events.map((event, index) => (
                  <Card key={index} className="shadow-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            {event.title}
                          </CardTitle>
                          <CardDescription>{event.description}</CardDescription>
                        </div>
                        <Badge variant={event.type === "Virtual" ? "default" : "secondary"}>
                          {event.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Date & Time</p>
                          <p className="font-medium">{event.date}</p>
                          <p className="text-sm">{event.time}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Attendees</p>
                          <p className="font-medium">{event.attendees} registered</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="hero">
                            Register
                          </Button>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Community Leaderboard
                  </CardTitle>
                  <CardDescription>
                    Top contributors and most helpful members
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboard.map((member) => (
                      <div key={member.rank} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{member.badge}</div>
                          <div>
                            <h4 className="font-semibold">#{member.rank} {member.name}</h4>
                            <p className="text-sm text-muted-foreground">{member.contributions}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{member.points.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mentorship" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Mentorship Program
                  </CardTitle>
                  <CardDescription>
                    Connect with experienced entrepreneurs and industry experts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Find Your Mentor</h3>
                    <p className="text-muted-foreground mb-4">
                      Get matched with mentors based on your industry and goals
                    </p>
                    <Button variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Browse Mentors
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