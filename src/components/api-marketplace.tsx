import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Search, Star, Download, Zap, Globe, Database, Mail } from "lucide-react";

export default function APIMarketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const apiCategories = [
    { id: "all", name: "All APIs", count: 156 },
    { id: "ai", name: "AI & ML", count: 45 },
    { id: "payments", name: "Payments", count: 23 },
    { id: "communication", name: "Communication", count: 34 },
    { id: "analytics", name: "Analytics", count: 28 },
    { id: "storage", name: "Storage", count: 26 }
  ];

  const apis = [
    {
      name: "OpenAI GPT-4",
      description: "Advanced language model for text generation and analysis",
      category: "ai",
      pricing: "$0.03/1K tokens",
      rating: 4.9,
      installs: "50K+",
      icon: Zap,
      features: ["Text generation", "Code completion", "Translation", "Summarization"]
    },
    {
      name: "Stripe Payments",
      description: "Complete payment processing solution",
      category: "payments", 
      pricing: "2.9% + 30¢",
      rating: 4.8,
      installs: "100K+",
      icon: Globe,
      features: ["Credit cards", "Digital wallets", "Subscriptions", "Invoicing"]
    },
    {
      name: "SendGrid Email",
      description: "Reliable email delivery and marketing platform",
      category: "communication",
      pricing: "$14.95/month",
      rating: 4.7,
      installs: "75K+",
      icon: Mail,
      features: ["Transactional email", "Marketing campaigns", "Analytics", "Templates"]
    },
    {
      name: "Supabase Database",
      description: "Open source Firebase alternative with PostgreSQL",
      category: "storage",
      pricing: "$25/month",
      rating: 4.6,
      installs: "30K+",
      icon: Database,
      features: ["Real-time database", "Authentication", "Storage", "Edge functions"]
    }
  ];

  const filteredAPIs = apis.filter(api => 
    (selectedCategory === "all" || api.category === selectedCategory) &&
    (searchTerm === "" || api.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Code className="w-4 h-4 mr-2" />
              API Marketplace
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Supercharge Your Startup
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover and integrate powerful APIs to accelerate development
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-sm">Search & Filter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Search APIs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Categories</h4>
                    {apiCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === category.id 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-muted'
                        }`}
                      >
                        <div className="flex justify-between">
                          <span>{category.name}</span>
                          <span className="text-muted-foreground">{category.count}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Tabs defaultValue="browse" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="browse">Browse APIs</TabsTrigger>
                  <TabsTrigger value="installed">Installed</TabsTrigger>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                </TabsList>

                <TabsContent value="browse" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredAPIs.map((api, index) => {
                      const IconComponent = api.icon;
                      return (
                        <Card key={index} className="shadow-card hover:shadow-electric transition-all">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                  <IconComponent className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg">{api.name}</CardTitle>
                                  <div className="flex items-center gap-2">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star 
                                          key={i} 
                                          className={`w-3 h-3 ${
                                            i < Math.floor(api.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                          }`} 
                                        />
                                      ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                      {api.rating} • {api.installs}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">{api.pricing}</p>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground mb-4">{api.description}</p>
                            
                            <div className="flex flex-wrap gap-1 mb-4">
                              {api.features.map((feature, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1">
                                <Download className="w-3 h-3 mr-1" />
                                Install
                              </Button>
                              <Button variant="outline" size="sm">
                                <Code className="w-3 h-3 mr-1" />
                                Docs
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="installed" className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle>Installed APIs</CardTitle>
                      <CardDescription>
                        Manage your active API integrations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <Code className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No APIs Installed</h3>
                        <p className="text-muted-foreground">
                          Install APIs from the marketplace to see them here
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="favorites" className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle>Favorite APIs</CardTitle>
                      <CardDescription>
                        Your bookmarked APIs for quick access
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Favorites Yet</h3>
                        <p className="text-muted-foreground">
                          Star APIs to add them to your favorites
                        </p>
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