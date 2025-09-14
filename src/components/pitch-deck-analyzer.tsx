import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Presentation, BarChart3, Lightbulb, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function PitchDeckAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [pitchData, setPitchData] = useState({
    problem: "",
    solution: "",
    market: "",
    businessModel: "",
    goToMarket: ""
  });
  const { user } = useAuth();

  const handleAnalyze = async () => {
    if (!user) {
      alert("Please sign in to use this feature");
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-pitch-deck', {
        body: { pitchData },
        headers: { 'user-id': user.id }
      });

      if (error) throw error;
      setAnalysis(data);
    } catch (error) {
      console.error('Error analyzing pitch deck:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Presentation className="w-4 h-4 mr-2" />
              AI Pitch Deck Analyzer
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Perfect Your Pitch
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get expert feedback on your pitch deck from AI trained on successful fundraising decks
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Pitch Deck Input</CardTitle>
                <CardDescription>
                  Enter your pitch deck content for analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="problem">Problem Statement</Label>
                  <Textarea
                    id="problem"
                    placeholder="Describe the problem you're solving..."
                    value={pitchData.problem}
                    onChange={(e) => setPitchData({...pitchData, problem: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="solution">Solution</Label>
                  <Textarea
                    id="solution"
                    placeholder="Describe your solution..."
                    value={pitchData.solution}
                    onChange={(e) => setPitchData({...pitchData, solution: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="market">Market Opportunity</Label>
                  <Textarea
                    id="market"
                    placeholder="Describe your market and opportunity..."
                    value={pitchData.market}
                    onChange={(e) => setPitchData({...pitchData, market: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="businessModel">Business Model</Label>
                  <Textarea
                    id="businessModel"
                    placeholder="Explain how you make money..."
                    value={pitchData.businessModel}
                    onChange={(e) => setPitchData({...pitchData, businessModel: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="goToMarket">Go-to-Market Strategy</Label>
                  <Textarea
                    id="goToMarket"
                    placeholder="How will you acquire customers..."
                    value={pitchData.goToMarket}
                    onChange={(e) => setPitchData({...pitchData, goToMarket: e.target.value})}
                  />
                </div>
                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !pitchData.problem || !pitchData.solution}
                  className="w-full"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Pitch Deck"}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {isAnalyzing && (
                <Card className="border-primary/20 bg-gradient-primary/5">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <BarChart3 className="w-6 h-6 text-primary animate-pulse" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-primary mb-2">Analyzing Your Pitch...</h3>
                        <Progress value={75} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {analysis && (
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="strengths">Strengths</TabsTrigger>
                    <TabsTrigger value="weaknesses">Issues</TabsTrigger>
                    <TabsTrigger value="recommendations">Tips</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-primary" />
                          Overall Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">Overall Score</span>
                              <span className="text-2xl font-bold text-primary">{analysis.overall_score}/100</span>
                            </div>
                            <Progress value={analysis.overall_score} className="h-3" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">Investor Readiness</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-4 h-4 rounded-full mr-1 ${
                                      i < analysis.investor_readiness ? 'bg-primary' : 'bg-muted'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="strengths">
                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-success" />
                          Strengths
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {analysis.strengths?.map((strength, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="weaknesses">
                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-warning" />
                          Areas for Improvement
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {analysis.weaknesses?.map((weakness, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-warning mt-1 flex-shrink-0" />
                              <span>{weakness}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="recommendations">
                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-primary" />
                          Recommendations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {analysis.recommendations?.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Lightbulb className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              )}

              {!analysis && !isAnalyzing && (
                <Card className="shadow-card">
                  <CardContent className="text-center py-12">
                    <Presentation className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
                    <p className="text-muted-foreground">
                      Fill in your pitch deck content to get expert AI feedback
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