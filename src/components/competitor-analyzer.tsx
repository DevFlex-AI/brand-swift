import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Search, Shield, Zap, AlertTriangle, TrendingUp, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function CompetitorAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [formData, setFormData] = useState({
    businessIdea: "",
    industry: "",
    targetMarket: ""
  });
  const { user } = useAuth();

  const handleAnalyze = async () => {
    if (!user) {
      alert("Please sign in to use this feature");
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-competitors', {
        body: formData,
        headers: { 'user-id': user.id }
      });

      if (error) throw error;
      setAnalysis(data);
    } catch (error) {
      console.error('Error analyzing competitors:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getThreatColor = (level) => {
    if (level <= 2) return "text-success";
    if (level <= 3) return "text-warning";
    return "text-destructive";
  };

  const getThreatBadge = (level) => {
    if (level <= 2) return "Low";
    if (level <= 3) return "Medium";
    return "High";
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Search className="w-4 h-4 mr-2" />
              Smart Competitor Analysis
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Know Your Competition
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              AI-powered competitive intelligence to position your startup for success
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Business Analysis</CardTitle>
                <CardDescription>
                  Tell us about your business to find competitors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="businessIdea">Business Idea</Label>
                  <Textarea
                    id="businessIdea"
                    placeholder="Describe your business idea, product, or service..."
                    value={formData.businessIdea}
                    onChange={(e) => setFormData({...formData, businessIdea: e.target.value})}
                    className="min-h-24"
                  />
                </div>

                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., SaaS, E-commerce, FinTech"
                    value={formData.industry}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="targetMarket">Target Market</Label>
                  <Input
                    id="targetMarket"
                    placeholder="e.g., Small businesses, Enterprise, Consumers"
                    value={formData.targetMarket}
                    onChange={(e) => setFormData({...formData, targetMarket: e.target.value})}
                  />
                </div>

                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !formData.businessIdea}
                  className="w-full"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Competition"}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {isAnalyzing && (
                <Card className="border-primary/20 bg-gradient-primary/5">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Search className="w-6 h-6 text-primary animate-pulse" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-primary mb-2">Analyzing Competitive Landscape...</h3>
                        <Progress value={60} className="h-2" />
                        <p className="text-sm text-muted-foreground mt-2">
                          Scanning market, identifying competitors, analyzing positioning
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {analysis && (
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="direct">Direct</TabsTrigger>
                    <TabsTrigger value="indirect">Indirect</TabsTrigger>
                    <TabsTrigger value="strategy">Strategy</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-primary" />
                          Competitive Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                            <span className="font-medium">Threat Level</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={getThreatColor(analysis.threat_level)}>
                                {getThreatBadge(analysis.threat_level)}
                              </Badge>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-3 h-3 rounded-full mr-1 ${
                                      i < analysis.threat_level ? 'bg-primary' : 'bg-muted'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">Market Gaps Found:</h4>
                            <ul className="space-y-2">
                              {analysis.market_gaps?.map((gap, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <Zap className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                                  <span className="text-sm">{gap}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="direct">
                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="w-5 h-5 text-destructive" />
                          Direct Competitors
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {analysis.direct_competitors?.map((competitor, index) => (
                            <div key={index} className="p-4 border border-border/50 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold">{competitor.name}</h4>
                                <Badge variant="outline">
                                  {competitor.market_share || "Unknown"} share
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {competitor.description}
                              </p>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h5 className="font-medium text-success mb-1">Strengths:</h5>
                                  <ul className="text-sm space-y-1">
                                    {competitor.strengths?.slice(0, 2).map((strength, i) => (
                                      <li key={i}>• {strength}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="font-medium text-warning mb-1">Weaknesses:</h5>
                                  <ul className="text-sm space-y-1">
                                    {competitor.weaknesses?.slice(0, 2).map((weakness, i) => (
                                      <li key={i}>• {weakness}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="indirect">
                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-warning" />
                          Indirect Competitors
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {analysis.indirect_competitors?.map((competitor, index) => (
                            <div key={index} className="p-3 border border-border/30 rounded-lg">
                              <h4 className="font-medium">{competitor.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {competitor.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="strategy">
                    <div className="space-y-4">
                      <Card className="shadow-card">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Positioning Strategy
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm leading-relaxed">
                            {analysis.positioning_strategy}
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="shadow-card">
                        <CardHeader>
                          <CardTitle>Competitive Advantages</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {analysis.competitive_advantages?.map((advantage, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Zap className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                                <span className="text-sm">{advantage}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="shadow-card">
                        <CardHeader>
                          <CardTitle>Moat Opportunities</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {analysis.moat_opportunities?.map((moat, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Shield className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                                <span className="text-sm">{moat}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              )}

              {!analysis && !isAnalyzing && (
                <Card className="shadow-card">
                  <CardContent className="text-center py-12">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
                    <p className="text-muted-foreground">
                      Enter your business details to discover your competitive landscape
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}