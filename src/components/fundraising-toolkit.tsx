import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Users, Calendar, FileText, TrendingUp, Target, Award } from "lucide-react";

export default function FundraisingToolkit() {
  const [fundraisingStage, setFundraisingStage] = useState("preparation");

  const stages = [
    { id: "preparation", name: "Preparation", progress: 85, status: "active" },
    { id: "outreach", name: "Investor Outreach", progress: 45, status: "pending" },
    { id: "meetings", name: "Pitch Meetings", progress: 0, status: "pending" },
    { id: "negotiation", name: "Term Negotiation", progress: 0, status: "pending" },
    { id: "closing", name: "Deal Closing", progress: 0, status: "pending" }
  ];

  const documents = [
    { name: "Executive Summary", status: "completed", description: "2-page company overview" },
    { name: "Pitch Deck", status: "completed", description: "15-slide investor presentation" },
    { name: "Financial Model", status: "in-progress", description: "3-year financial projections" },
    { name: "Data Room", status: "pending", description: "Due diligence documents" },
    { name: "Cap Table", status: "completed", description: "Current ownership structure" }
  ];

  const investors = [
    { name: "Sequoia Capital", stage: "Series A", focus: "Enterprise SaaS", status: "researching" },
    { name: "Andreessen Horowitz", stage: "Seed", focus: "AI/ML", status: "contacted" },
    { name: "First Round", stage: "Seed", focus: "B2B Tools", status: "meeting-scheduled" },
    { name: "Bessemer Venture", stage: "Series A", focus: "Cloud Software", status: "follow-up" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <DollarSign className="w-4 h-4 mr-2" />
              Fundraising Toolkit
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Raise Capital Faster
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Complete toolkit for successful fundraising campaigns
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {stages.map((stage, index) => (
              <Card 
                key={stage.id}
                className={`cursor-pointer transition-all ${
                  fundraisingStage === stage.id ? 'ring-2 ring-primary shadow-electric' : ''
                }`}
                onClick={() => setFundraisingStage(stage.id)}
              >
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">{index + 1}</div>
                    <h4 className="font-semibold text-sm mb-2">{stage.name}</h4>
                    <Progress value={stage.progress} className="h-2 mb-2" />
                    <p className="text-xs text-muted-foreground">{stage.progress}% complete</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="documents" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="investors">Investors</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Fundraising Documents
                  </CardTitle>
                  <CardDescription>
                    Essential documents for your fundraising process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                        <div>
                          <h4 className="font-semibold">{doc.name}</h4>
                          <p className="text-sm text-muted-foreground">{doc.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            doc.status === "completed" ? "default" :
                            doc.status === "in-progress" ? "secondary" : "outline"
                          }>
                            {doc.status.replace("-", " ")}
                          </Badge>
                          <Button variant="outline" size="sm">
                            {doc.status === "completed" ? "View" : "Create"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="investors" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Investor Pipeline
                  </CardTitle>
                  <CardDescription>
                    Track your investor outreach and meetings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {investors.map((investor, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                        <div>
                          <h4 className="font-semibold">{investor.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {investor.stage} • {investor.focus}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            investor.status === "meeting-scheduled" ? "default" :
                            investor.status === "contacted" ? "secondary" : "outline"
                          }>
                            {investor.status.replace("-", " ")}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Update
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Fundraising Timeline
                  </CardTitle>
                  <CardDescription>
                    Plan and track your fundraising milestones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Timeline Planning</h3>
                    <p className="text-muted-foreground mb-4">
                      Create a detailed timeline for your fundraising campaign
                    </p>
                    <Button variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Create Timeline
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Target Raise</p>
                        <p className="text-2xl font-bold">$2.5M</p>
                      </div>
                      <Target className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Investors Contacted</p>
                        <p className="text-2xl font-bold">47</p>
                      </div>
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Response Rate</p>
                        <p className="text-2xl font-bold">23%</p>
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