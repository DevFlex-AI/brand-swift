import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Play, Pause, Settings, Mail, MessageSquare, Calendar, Bell } from "lucide-react";

export default function AutomationWorkflows() {
  const [workflows] = useState([
    {
      id: "welcome-sequence",
      name: "Welcome Email Sequence",
      description: "Automated onboarding emails for new users",
      trigger: "User signs up",
      actions: ["Send welcome email", "Add to CRM", "Schedule follow-up"],
      status: "active",
      runs: 1247,
      conversionRate: "23%"
    },
    {
      id: "lead-nurturing",
      name: "Lead Nurturing Campaign",
      description: "Convert prospects into paying customers",
      trigger: "User downloads resource",
      actions: ["Tag as lead", "Send nurture sequence", "Notify sales team"],
      status: "active",
      runs: 856,
      conversionRate: "18%"
    },
    {
      id: "churn-prevention",
      name: "Churn Prevention",
      description: "Re-engage users showing signs of churn",
      trigger: "Low activity for 7 days",
      actions: ["Send re-engagement email", "Offer discount", "Schedule call"],
      status: "paused",
      runs: 234,
      conversionRate: "31%"
    }
  ]);

  const integrations = [
    { name: "Mailchimp", type: "Email Marketing", status: "connected", icon: Mail },
    { name: "Slack", type: "Team Communication", status: "connected", icon: MessageSquare },
    { name: "Calendly", type: "Scheduling", status: "disconnected", icon: Calendar },
    { name: "Zapier", type: "Automation", status: "connected", icon: Zap },
    { name: "HubSpot", type: "CRM", status: "disconnected", icon: Users }
  ];

  const triggers = [
    "User signs up",
    "User makes first purchase", 
    "User cancels subscription",
    "User reaches usage limit",
    "User inactive for X days",
    "User completes onboarding",
    "User refers a friend",
    "User upgrades plan"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Zap className="w-4 h-4 mr-2" />
              Automation Workflows
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Automate Your Growth
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Set up intelligent workflows that run your startup on autopilot
            </p>
          </div>

          <Tabs defaultValue="workflows" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="workflows">Workflows</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="builder">Builder</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="workflows" className="space-y-6">
              <div className="grid gap-6">
                {workflows.map((workflow) => (
                  <Card key={workflow.id} className="shadow-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-primary" />
                            {workflow.name}
                          </CardTitle>
                          <CardDescription>{workflow.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch checked={workflow.status === "active"} />
                          <Badge variant={workflow.status === "active" ? "default" : "secondary"}>
                            {workflow.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Trigger</p>
                          <p className="font-medium">{workflow.trigger}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Runs</p>
                          <p className="font-medium">{workflow.runs.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Conversion Rate</p>
                          <p className="font-medium text-success">{workflow.conversionRate}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Settings className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <BarChart3 className="w-3 h-3 mr-1" />
                            Stats
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground mb-2">Actions:</p>
                        <div className="flex flex-wrap gap-2">
                          {workflow.actions.map((action, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {action}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-primary" />
                    Connected Apps
                  </CardTitle>
                  <CardDescription>
                    Manage your automation integrations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {integrations.map((integration, index) => {
                      const IconComponent = integration.icon;
                      return (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-5 h-5 text-primary" />
                            <div>
                              <h4 className="font-semibold">{integration.name}</h4>
                              <p className="text-sm text-muted-foreground">{integration.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={integration.status === "connected" ? "default" : "outline"}>
                              {integration.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              {integration.status === "connected" ? "Configure" : "Connect"}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="builder" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5 text-primary" />
                    Workflow Builder
                  </CardTitle>
                  <CardDescription>
                    Create custom automation workflows
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Visual Workflow Builder</h3>
                    <p className="text-muted-foreground mb-4">
                      Drag and drop to create powerful automation workflows
                    </p>
                    <Button variant="outline">
                      <Play className="w-4 h-4 mr-2" />
                      Start Building
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Active Workflows</p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                      <Play className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Runs</p>
                        <p className="text-2xl font-bold">45.2K</p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Conversion</p>
                        <p className="text-2xl font-bold">24%</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-primary" />
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