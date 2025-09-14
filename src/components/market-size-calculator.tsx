import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Globe, Target, Calculator } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function MarketSizeCalculator() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [marketData, setMarketData] = useState(null);
  const [formData, setFormData] = useState({
    industry: "",
    targetMarket: "",
    geography: "",
    businessModel: ""
  });
  const { user } = useAuth();

  const industries = [
    "Technology", "Healthcare", "Financial Services", "E-commerce", "Education",
    "Real Estate", "Food & Beverage", "Transportation", "Entertainment", "Manufacturing"
  ];

  const geographies = [
    "Global", "North America", "United States", "Europe", "Asia Pacific", 
    "Latin America", "Middle East & Africa", "United Kingdom", "Canada", "Australia"
  ];

  const businessModels = [
    "SaaS", "E-commerce", "Marketplace", "Subscription", "Freemium",
    "Advertising", "Transaction-based", "Licensing", "Hardware", "Consulting"
  ];

  const handleCalculate = async () => {
    if (!user) {
      alert("Please sign in to use this feature");
      return;
    }

    setIsCalculating(true);
    try {
      const { data, error } = await supabase.functions.invoke('calculate-market-size', {
        body: formData,
        headers: { 'user-id': user.id }
      });

      if (error) throw error;
      setMarketData(data);
    } catch (error) {
      console.error('Error calculating market size:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const formatCurrency = (value) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
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
              <Calculator className="w-4 h-4 mr-2" />
              Market Size Calculator
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Calculate Your Market
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get accurate TAM, SAM, and SOM calculations with AI-powered market research
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Market Parameters</CardTitle>
                <CardDescription>
                  Define your market to calculate opportunity size
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={formData.industry} onValueChange={(value) => setFormData({...formData, industry: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="targetMarket">Target Market Description</Label>
                  <Input
                    id="targetMarket"
                    placeholder="e.g., Small businesses with 10-50 employees"
                    value={formData.targetMarket}
                    onChange={(e) => setFormData({...formData, targetMarket: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="geography">Geographic Market</Label>
                  <Select value={formData.geography} onValueChange={(value) => setFormData({...formData, geography: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select geographic scope" />
                    </SelectTrigger>
                    <SelectContent>
                      {geographies.map((geo) => (
                        <SelectItem key={geo} value={geo}>{geo}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="businessModel">Business Model</Label>
                  <Select value={formData.businessModel} onValueChange={(value) => setFormData({...formData, businessModel: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business model" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessModels.map((model) => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleCalculate}
                  disabled={isCalculating || !formData.industry || !formData.targetMarket}
                  className="w-full"
                >
                  {isCalculating ? "Calculating..." : "Calculate Market Size"}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {isCalculating && (
                <Card className="border-primary/20 bg-gradient-primary/5">
                  <CardContent className="p-6 text-center">
                    <Calculator className="w-8 h-8 text-primary mx-auto mb-3 animate-pulse" />
                    <h3 className="font-semibold text-primary mb-2">Calculating Market Size...</h3>
                    <p className="text-sm text-muted-foreground">Analyzing market data and trends</p>
                  </CardContent>
                </Card>
              )}

              {marketData && (
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="trends">Trends</TabsTrigger>
                    <TabsTrigger value="segments">Segments</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <div className="space-y-4">
                      <Card className="shadow-card">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Globe className="w-5 h-5 text-primary" />
                            TAM - Total Addressable Market
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-primary">
                            {formatCurrency(marketData.tam_value)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            The total global market opportunity
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="shadow-card">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-primary" />
                            SAM - Serviceable Available Market
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-primary">
                            {formatCurrency(marketData.sam_value)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Market you can realistically target
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="shadow-card">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-primary" />
                            SOM - Serviceable Obtainable Market
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-primary">
                            {formatCurrency(marketData.som_value)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Market share you can realistically capture
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="trends">
                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-primary" />
                          Market Trends
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Annual Growth Rate</span>
                            <span className="text-lg font-bold text-success">
                              {marketData.growth_rate}%
                            </span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold">Key Trends:</h4>
                          <ul className="space-y-2">
                            {marketData.key_trends?.map((trend, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <TrendingUp className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                                <span className="text-sm">{trend}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="segments">
                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle>Market Segments</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {marketData.market_segments?.map((segment, index) => (
                            <div key={index} className="p-4 border border-border/50 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold">{segment.name}</h4>
                                <Badge variant="outline">{formatCurrency(segment.size)}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{segment.description}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              )}

              {!marketData && !isCalculating && (
                <Card className="shadow-card">
                  <CardContent className="text-center py-12">
                    <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Ready to Calculate</h3>
                    <p className="text-muted-foreground">
                      Fill in your market parameters to get size calculations
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