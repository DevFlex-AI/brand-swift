import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Plus, MessageSquare, Calendar, FileText, Settings } from "lucide-react";

export default function TeamCollaboration() {
  const [teamMembers] = useState([
    { name: "Sarah Chen", role: "Founder & CEO", email: "sarah@startup.com", avatar: "/api/placeholder/40/40", status: "online" },
    { name: "Mike Rodriguez", role: "CTO", email: "mike@startup.com", avatar: "/api/placeholder/40/40", status: "away" },
    { name: "Emma Thompson", role: "Head of Marketing", email: "emma@startup.com", avatar: "/api/placeholder/40/40", status: "offline" },
    { name: "David Kim", role: "Product Designer", email: "david@startup.com", avatar: "/api/placeholder/40/40", status: "online" }
  ]);

  const recentActivity = [
    { user: "Sarah Chen", action: "updated the pitch deck", time: "2 minutes ago" },
    { user: "Mike Rodriguez", action: "commented on MVP roadmap", time: "15 minutes ago" },
    { user: "Emma Thompson", action: "shared social media strategy", time: "1 hour ago" },
    { user: "David Kim", action: "uploaded new logo variations", time: "2 hours ago" }
  ];

  const permissions = [
    { role: "Owner", canEdit: true, canDelete: true, canInvite: true, canManageBilling: true },
    { role: "Editor", canEdit: true, canDelete: false, canInvite: true, canManageBilling: false },
    { role: "Viewer", canEdit: false, canDelete: false, canInvite: false, canManageBilling: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Users className="w-4 h-4 mr-2" />
              Team Collaboration
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Build Together
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Collaborate with your team on every aspect of your startup
            </p>
          </div>

          <Tabs defaultValue="team" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="team" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Team Members</CardTitle>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Invite
                      </Button>
                    </div>
                    <CardDescription>
                      Manage your startup team and collaborators
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {teamMembers.map((member, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar>
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                                member.status === 'online' ? 'bg-green-500' :
                                member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                              }`} />
                            </div>
                            <div>
                              <h4 className="font-semibold">{member.name}</h4>
                              <p className="text-sm text-muted-foreground">{member.role}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Invite New Member</CardTitle>
                    <CardDescription>
                      Add team members to collaborate on your startup
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Email address" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Send Invitation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Track team collaboration and project updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border/50">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Role Permissions</CardTitle>
                  <CardDescription>
                    Manage what each role can do in your startup project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {permissions.map((permission, index) => (
                      <div key={index} className="p-4 rounded-lg border border-border/50">
                        <h4 className="font-semibold mb-3">{permission.role}</h4>
                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                          <div className="flex justify-between">
                            <span>Edit content</span>
                            <Badge variant={permission.canEdit ? "default" : "secondary"}>
                              {permission.canEdit ? "Yes" : "No"}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Delete items</span>
                            <Badge variant={permission.canDelete ? "default" : "secondary"}>
                              {permission.canDelete ? "Yes" : "No"}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Invite members</span>
                            <Badge variant={permission.canInvite ? "default" : "secondary"}>
                              {permission.canInvite ? "Yes" : "No"}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Manage billing</span>
                            <Badge variant={permission.canManageBilling ? "default" : "secondary"}>
                              {permission.canManageBilling ? "Yes" : "No"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Team Settings</CardTitle>
                  <CardDescription>
                    Configure collaboration preferences and notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about team activity
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Slack Integration</h4>
                        <p className="text-sm text-muted-foreground">
                          Connect your team's Slack workspace
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Calendar Sync</h4>
                        <p className="text-sm text-muted-foreground">
                          Sync deadlines with Google Calendar
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Setup
                      </Button>
                    </div>
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