import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, Users, Target, Calendar, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function RevenueModelAdvisor() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [formData, setFormData] = useState({
    businessIdea: "",
    industry: "",
    targetMarket: "",
    customerSegments: ""
  });
  const { user } = useAuth();

  const handleAnalyze = async () => {
    if (!user) {
      alert("Please sign in to use this feature");
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('revenue-model-advisor', {
        body: formData,
        headers: { 'user-id': user.id }
      });

      if (error) throw error;
      setAnalysis(data);
    } catch (error) {
      console.error('Error analyzing revenue models:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatCurrency = (value) => {
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
    return `$${value}`;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <DollarSign className="w-4 h-4 mr-2" />
              Revenue Model Advisor
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Optimize Your Revenue
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              AI-powered analysis to find the best revenue model and pricing strategy for your startup
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>
                  Tell us about your business to get revenue recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="businessIdea">Business Idea</Label>
                  <Textarea
                    id="businessIdea"
                    placeholder="Describe your business, product, or service..."
                    value={formData.businessIdea}
                    onChange={(e) => setFormData({...formData, businessIdea: e.target.value})}
                    className="min-h-24"
                  />
                </div>

                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., SaaS, E-commerce, Marketplace"
                    value={formData.industry}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="targetMarket">Target Market</Label>
                  <Input
                    id="targetMarket"
                    placeholder="e.g., SMBs, Enterprise, B2C"
                    value={formData.targetMarket}
                    onChange={(e) => setFormData({...formData, targetMarket: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="customerSegments">Customer Segments</Label>
                  <Textarea
                    id="customerSegments"
                    placeholder="Describe your different customer types..."
                    value={formData.customerSegments}
                    onChange={(e) => setFormData({...formData, customerSegments: e.target.value})}
                  />
                </div>

                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !formData.businessIdea}
                  className="w-full"
                >
                  {isAnalyzing ? "Analyzing..." : "Get Revenue Recommendations"}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {isAnalyzing && (
                <Card className="border-primary/20 bg-gradient-primary/5">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <DollarSign className="w-6 h-6 text-primary animate-pulse" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-primary mb-2">Analyzing Revenue Models...</h3>
                        <Progress value={75} className="h-2" />
                        <p className="text-sm text-muted-foreground mt-2">
                          Evaluating pricing strategies and revenue optimization opportunities
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {analysis && (
                <Tabs defaultValue="models" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="models">Models</TabsTrigger>
                    <TabsTrigger value="pricing">Pricing</TabsTrigger>
                    <TabsTrigger value="projections">Forecast</TabsTrigger>
                    <TabsTrigger value="optimization">Tips</TabsTrigger>
                  </TabsList>

                  <TabsContent value="models">
                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-primary" />
                          Recommended Revenue Models
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {analysis.recommended_models?.map((model, index) => (
                            <div key={index} className="p-4 border border-border/50 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold">{model.name}</h4>
                                <Badge variant="outline" className="text-primary">
                                  {model.priority || "Primary"}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {model.description}
                              </p>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h5 className="font-medium text-success mb-1">Pros:</h5>
                                  <ul className="text-sm space-y-1">
                                    {model.pros?.slice(0, 2).map((pro, i) => (
                                      <li key={i}>• {pro}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="font-medium text-warning mb-1">Cons:</h5>
                                  <ul className="text-sm space-y-1">
                                    {model.cons?.slice(0, 2).map((con, i) => (
                                      <li key={i}>• {con}</li>
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

                  <TabsContent value="pricing">
                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="w-5 h-5 text-primary" />
                          Pricing Strategy
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 bg-gradient-primary/10 rounded-lg border border-primary/20">
                            <h4 className="font-semibold text-primary mb-2">
                              Recommended Strategy
                            </h4>
                            <p className="text-sm">
                              {analysis.pricing_strategy}
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">Customer Lifetime Value</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-3 bg-muted/30 rounded-lg">
                                <div className="text-2xl font-bold text-primary">
                                  {formatCurrency(analysis.customer_lifetime_value?.current || 0)}
                                </div>
                                <div className="text-sm text-muted-foreground">Current CLV</div>
                              </div>
                              <div className="p-3 bg-muted/30 rounded-lg">
                                <div className="text-2xl font-bold text-success">
                                  {formatCurrency(analysis.customer_lifetime_value?.optimized || 0)}
                                </div>
                                <div className="text-sm text-muted-foreground">Optimized CLV</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="projections">
                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-primary" />
                          Revenue Projections
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {analysis.revenue_projections?.map((projection, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                              <span className="font-medium">Year {index + 1}</span>
                              <div className="text-right">
                                <div className="text-xl font-bold text-primary">
                                  {formatCurrency(projection.revenue)}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {projection.customers} customers
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className="mt-6">
                            <h4 className="font-semibold mb-3">Key Metrics to Track:</h4>
                            <ul className="space-y-2">
                              {analysis.key_metrics?.map((metric, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <BarChart3 className="w-4 h-4 text-primary" />
                                  <span className="text-sm">{metric}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="optimization">
                    <div className="space-y-4">
                      <Card className="shadow-card">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Optimization Opportunities
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {analysis.optimization_opportunities?.map((opportunity, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <TrendingUp className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                                <span className="text-sm">{opportunity}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="shadow-card">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Implementation Timeline
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {analysis.monetization_timeline?.map((phase, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                                  <span className="text-xs font-medium text-primary">{index + 1}</span>
                                </div>
                                <div>
                                  <h4 className="font-medium">{phase.phase}</h4>
                                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                                  <Badge variant="outline" className="mt-1">
                                    {phase.timeline}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              )}

              {!analysis && !isAnalyzing && (
                <Card className="shadow-card">
                  <CardContent className="text-center py-12">
                    <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Ready to Optimize</h3>
                    <p className="text-muted-foreground">
                      Enter your business details to get personalized revenue recommendations
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