import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, Video, Phone, ScreenShare as Screen, Edit3, Eye, Share2, Clock, Calendar, Bell, Settings, Plus, Search, Filter, Download, Upload, Folder, File, Image, Code, Database, Globe, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen: string;
  permissions: string[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  team: TeamMember[];
  lastActivity: string;
  files: number;
  tasks: number;
}

interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'edit' | 'comment' | 'share' | 'create' | 'delete';
}

export default function RealTimeCollaboration() {
  const { user } = useAuth();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<TeamMember[]>([]);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);

  const projects: Project[] = [
    {
      id: "proj-1",
      name: "CoffeeDrop Startup",
      description: "Coffee subscription for remote teams",
      status: "active",
      progress: 78,
      team: [
        {
          id: "user-1",
          name: "Sarah Chen",
          email: "sarah@coffeedrop.com",
          role: "Founder & CEO",
          status: "online",
          lastSeen: "now",
          permissions: ["admin", "edit", "view", "share"]
        },
        {
          id: "user-2", 
          name: "Mike Rodriguez",
          email: "mike@coffeedrop.com",
          role: "CTO",
          status: "online",
          lastSeen: "2 minutes ago",
          permissions: ["edit", "view", "share"]
        },
        {
          id: "user-3",
          name: "Emma Thompson",
          email: "emma@coffeedrop.com", 
          role: "Head of Marketing",
          status: "away",
          lastSeen: "15 minutes ago",
          permissions: ["edit", "view"]
        }
      ],
      lastActivity: "2 minutes ago",
      files: 47,
      tasks: 23
    }
  ];

  const recentActivities: Activity[] = [
    {
      id: "act-1",
      user: "Sarah Chen",
      action: "updated",
      target: "Business Plan v2.1",
      timestamp: "2 minutes ago",
      type: "edit"
    },
    {
      id: "act-2",
      user: "Mike Rodriguez", 
      action: "commented on",
      target: "MVP Technical Specs",
      timestamp: "5 minutes ago",
      type: "comment"
    },
    {
      id: "act-3",
      user: "Emma Thompson",
      action: "shared",
      target: "Marketing Strategy Deck",
      timestamp: "12 minutes ago", 
      type: "share"
    },
    {
      id: "act-4",
      user: "Sarah Chen",
      action: "created",
      target: "Investor Outreach List",
      timestamp: "25 minutes ago",
      type: "create"
    }
  ];

  useEffect(() => {
    if (projects.length > 0) {
      setActiveProject(projects[0]);
      setOnlineUsers(projects[0].team.filter(member => member.status === 'online'));
    }
    setActivities(recentActivities);

    // Set up real-time subscriptions
    const channel = supabase.channel('collaboration')
      .on('presence', { event: 'sync' }, () => {
        console.log('Presence sync');
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', key, leftPresences);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'edit': return Edit3;
      case 'comment': return MessageSquare;
      case 'share': return Share2;
      case 'create': return Plus;
      case 'delete': return X;
      default: return Eye;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Users className="w-4 h-4 mr-2" />
              Real-Time Collaboration
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Build Together, Succeed Together
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Advanced collaboration tools for distributed startup teams
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="space-y-4">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-sm">Online Team</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {onlineUsers.map((member) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    
                    <div className="pt-3 border-t">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Video className="w-3 h-3 mr-1" />
                          Video Call
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Screen className="w-3 h-3 mr-1" />
                          Share Screen
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-sm">Project Files</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      { name: "Business Plan.pdf", type: "document", size: "2.4 MB", modified: "2 min ago" },
                      { name: "Brand Assets.zip", type: "archive", size: "15.7 MB", modified: "1 hour ago" },
                      { name: "Pitch Deck.pptx", type: "presentation", size: "8.2 MB", modified: "3 hours ago" },
                      { name: "Financial Model.xlsx", type: "spreadsheet", size: "1.1 MB", modified: "1 day ago" }
                    ].map((file, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded hover:bg-muted/50">
                        <File className="w-4 h-4 text-primary" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{file.name}</div>
                          <div className="text-xs text-muted-foreground">{file.size} • {file.modified}</div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="lg:col-span-3">
              <Tabs defaultValue="workspace" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="workspace">Workspace</TabsTrigger>
                  <TabsTrigger value="chat">Team Chat</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="files">Files</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="workspace" className="space-y-6">
                  {activeProject && (
                    <Card className="shadow-card">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>{activeProject.name}</CardTitle>
                            <CardDescription>{activeProject.description}</CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="default">{activeProject.status}</Badge>
                            <Button variant="outline" size="sm">
                              <Settings className="w-3 h-3 mr-1" />
                              Settings
                            </Button>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Project Progress</span>
                            <span>{activeProject.progress}%</span>
                          </div>
                          <Progress value={activeProject.progress} className="h-2" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="space-y-4">
                            <h4 className="font-semibold">Quick Actions</h4>
                            <div className="grid grid-cols-2 gap-2">
                              <Button variant="outline" size="sm">
                                <Edit3 className="w-3 h-3 mr-1" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                <Share2 className="w-3 h-3 mr-1" />
                                Share
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="w-3 h-3 mr-1" />
                                Export
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="w-3 h-3 mr-1" />
                                Preview
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-semibold">Project Stats</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Files</span>
                                <span className="font-medium">{activeProject.files}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tasks</span>
                                <span className="font-medium">{activeProject.tasks}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Team Size</span>
                                <span className="font-medium">{activeProject.team.length}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Last Activity</span>
                                <span className="font-medium">{activeProject.lastActivity}</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-semibold">Team Members</h4>
                            <div className="space-y-2">
                              {activeProject.team.map((member) => (
                                <div key={member.id} className="flex items-center gap-2">
                                  <div className="relative">
                                    <Avatar className="w-6 h-6">
                                      <AvatarFallback className="text-xs">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-white ${getStatusColor(member.status)}`} />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm font-medium">{member.name}</div>
                                    <div className="text-xs text-muted-foreground">{member.role}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="chat" className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-primary" />
                        Team Chat
                      </CardTitle>
                      <CardDescription>
                        Real-time messaging with your team
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-96 border rounded-lg p-4 bg-muted/20 mb-4 overflow-y-auto">
                        <div className="space-y-4">
                          {[
                            { user: "Sarah Chen", message: "Just updated the financial projections. Looking good for Q2!", time: "2:34 PM", avatar: "SC" },
                            { user: "Mike Rodriguez", message: "Great! I'll review the tech requirements and update the roadmap accordingly.", time: "2:36 PM", avatar: "MR" },
                            { user: "Emma Thompson", message: "Should we schedule a call to discuss the marketing timeline?", time: "2:38 PM", avatar: "ET" },
                            { user: "Sarah Chen", message: "Yes, let's do 3 PM today. I'll send calendar invites.", time: "2:39 PM", avatar: "SC" }
                          ].map((msg, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="text-xs">{msg.avatar}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm">{msg.user}</span>
                                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                                </div>
                                <p className="text-sm">{msg.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Input placeholder="Type a message..." className="flex-1" />
                        <Button>Send</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity" className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        Recent Activity
                      </CardTitle>
                      <CardDescription>
                        Track all team actions and changes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {activities.map((activity) => {
                          const IconComponent = getActivityIcon(activity.type);
                          return (
                            <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/50">
                              <IconComponent className="w-4 h-4 text-primary" />
                              <div className="flex-1">
                                <p className="text-sm">
                                  <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                                  <span className="font-medium">{activity.target}</span>
                                </p>
                                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {activity.type}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="files" className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Folder className="w-5 h-5 text-primary" />
                          Project Files
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Upload className="w-3 h-3 mr-1" />
                            Upload
                          </Button>
                          <Button variant="outline" size="sm">
                            <Plus className="w-3 h-3 mr-1" />
                            New Folder
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                          { name: "Business Documents", type: "folder", items: 12, icon: Folder },
                          { name: "Design Assets", type: "folder", items: 28, icon: Folder },
                          { name: "Financial Models", type: "folder", items: 7, icon: Folder },
                          { name: "Business Plan v2.1.pdf", type: "file", size: "2.4 MB", icon: File },
                          { name: "Logo Variations.zip", type: "file", size: "15.7 MB", icon: File },
                          { name: "Pitch Deck Final.pptx", type: "file", size: "8.2 MB", icon: File }
                        ].map((item, index) => {
                          const IconComponent = item.icon;
                          return (
                            <div key={index} className="p-3 border border-border/50 rounded-lg hover:border-primary/50 cursor-pointer">
                              <div className="flex items-center gap-3">
                                <IconComponent className="w-5 h-5 text-primary" />
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{item.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {item.type === 'folder' ? `${item.items} items` : item.size}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5 text-primary" />
                        Collaboration Settings
                      </CardTitle>
                      <CardDescription>
                        Configure team permissions and notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3">Notification Preferences</h4>
                        <div className="space-y-3">
                          {[
                            "Real-time activity updates",
                            "File changes and uploads", 
                            "Team member status changes",
                            "Project milestone updates",
                            "Comment mentions",
                            "Video call invitations"
                          ].map((setting, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm">{setting}</span>
                              <Button variant="outline" size="sm">
                                {Math.random() > 0.5 ? "Enabled" : "Disabled"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Team Permissions</h4>
                        <div className="space-y-3">
                          {[
                            "Edit project content",
                            "Invite new members",
                            "Delete files and folders",
                            "Manage integrations",
                            "Export project data",
                            "Change project settings"
                          ].map((permission, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm">{permission}</span>
                              <Button variant="outline" size="sm">
                                Configure
                              </Button>
                            </div>
                          ))}
                        </div>
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