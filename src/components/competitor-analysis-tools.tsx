import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Eye, DollarSign, Users, Star, TrendingUp, AlertTriangle } from "lucide-react";

export default function CompetitorAnalysisTools() {
  const [searchTerm, setSearchTerm] = useState("");

  const competitors = [
    {
      name: "CompetitorA",
      url: "competitora.com",
      traffic: "2.5M/month",
      pricing: "$29-99/month",
      rating: 4.2,
      strengths: ["Strong SEO", "Great UX", "Active community"],
      weaknesses: ["High pricing", "Limited integrations", "Complex setup"],
      marketShare: "15%"
    },
    {
      name: "CompetitorB",
      url: "competitorb.com",
      traffic: "1.8M/month",
      pricing: "$19-79/month",
      rating: 3.9,
      strengths: ["Affordable pricing", "Easy setup", "Good support"],
      weaknesses: ["Limited features", "Outdated UI", "Slow updates"],
      marketShare: "12%"
    },
    {
      name: "CompetitorC",
      url: "competitorc.com",
      traffic: "3.2M/month",
      pricing: "$49-199/month",
      rating: 4.5,
      strengths: ["Feature-rich", "Enterprise-ready", "Strong brand"],
      weaknesses: ["Expensive", "Steep learning curve", "Slow"],
      marketShare: "22%"
    }
  ];

  const swotAnalysis = {
    strengths: ["AI-powered generation", "Affordable pricing", "Quick turnaround", "All-in-one solution"],
    weaknesses: ["New brand", "Limited customization", "No enterprise features", "Small team"],
    opportunities: ["Growing startup market", "Remote work trend", "AI adoption", "International expansion"],
    threats: ["Established competitors", "Economic downturn", "AI regulations", "Market saturation"]
  };

  const marketGaps = [
    { gap: "AI-powered legal documents", opportunity: "High", difficulty: "Medium" },
    { gap: "Sub-$10 pricing tier", opportunity: "Medium", difficulty: "Low" },
    { gap: "Mobile-first experience", opportunity: "High", difficulty: "High" },
    { gap: "Industry-specific templates", opportunity: "Medium", difficulty: "Medium" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Eye className="w-4 h-4 mr-2" />
              Competitor Analysis
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Know Your Competition
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              AI-powered competitive intelligence and market positioning
            </p>
          </div>

          <div className="mb-8">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Input
                    placeholder="Enter competitor URL or company name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Button>
                    <Search className="w-4 h-4 mr-2" />
                    Analyze
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="swot">SWOT Analysis</TabsTrigger>
              <TabsTrigger value="gaps">Market Gaps</TabsTrigger>
              <TabsTrigger value="tracking">Tracking</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6">
                {competitors.map((competitor, index) => (
                  <Card key={index} className="shadow-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {competitor.name}
                            <Badge variant="outline">{competitor.marketShare} market share</Badge>
                          </CardTitle>
                          <CardDescription>{competitor.url}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">{competitor.rating}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Key Metrics</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Traffic:</span>
                              <span className="font-medium">{competitor.traffic}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Pricing:</span>
                              <span className="font-medium">{competitor.pricing}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Rating:</span>
                              <span className="font-medium">{competitor.rating}/5</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-success">Strengths</h4>
                          <ul className="space-y-1 text-sm">
                            {competitor.strengths.map((strength, i) => (
                              <li key={i} className="text-muted-foreground">• {strength}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-destructive">Weaknesses</h4>
                          <ul className="space-y-1 text-sm">
                            {competitor.weaknesses.map((weakness, i) => (
                              <li key={i} className="text-muted-foreground">• {weakness}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="swot" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-success">Strengths</CardTitle>
                    <CardDescription>Internal factors that give you an advantage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {swotAnalysis.strengths.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-success" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-destructive">Weaknesses</CardTitle>
                    <CardDescription>Internal factors that put you at a disadvantage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {swotAnalysis.weaknesses.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-destructive" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-primary">Opportunities</CardTitle>
                    <CardDescription>External factors that could benefit your business</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {swotAnalysis.opportunities.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-warning">Threats</CardTitle>
                    <CardDescription>External factors that could harm your business</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {swotAnalysis.threats.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-warning" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="gaps" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Market Opportunities</CardTitle>
                  <CardDescription>
                    AI-identified gaps in the competitive landscape
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {marketGaps.map((gap, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                        <div>
                          <h4 className="font-semibold">{gap.gap}</h4>
                          <p className="text-sm text-muted-foreground">
                            Market opportunity to differentiate from competitors
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            gap.opportunity === "High" ? "default" :
                            gap.opportunity === "Medium" ? "secondary" : "outline"
                          }>
                            {gap.opportunity} Opportunity
                          </Badge>
                          <Badge variant="outline">
                            {gap.difficulty} Difficulty
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tracking" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Competitor Tracking
                  </CardTitle>
                  <CardDescription>
                    Monitor competitor changes and market movements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Competitor Monitoring</h3>
                    <p className="text-muted-foreground mb-4">
                      Track pricing changes, new features, and marketing campaigns
                    </p>
                    <Button variant="outline">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Set Up Alerts
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