import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, DollarSign, MapPin, Building, Star, MessageSquare } from "lucide-react";

export default function InvestorMatching() {
  const [filters, setFilters] = useState({
    stage: "",
    industry: "",
    location: "",
    checkSize: ""
  });

  const investors = [
    {
      name: "TechVentures Capital",
      type: "VC Fund",
      checkSize: "$500K - $2M",
      stage: "Seed",
      location: "San Francisco, CA",
      industries: ["SaaS", "AI/ML", "Fintech"],
      portfolio: 45,
      rating: 4.8,
      description: "Early-stage focused fund with strong operator network"
    },
    {
      name: "Innovation Partners",
      type: "Angel Group",
      checkSize: "$50K - $500K",
      stage: "Pre-Seed",
      location: "New York, NY",
      industries: ["E-commerce", "Marketplace", "Consumer"],
      portfolio: 120,
      rating: 4.6,
      description: "Angel investors with deep industry expertise"
    },
    {
      name: "Global Growth Fund",
      type: "Growth Equity",
      checkSize: "$5M - $50M",
      stage: "Series A+",
      location: "London, UK",
      industries: ["Enterprise", "B2B SaaS", "Infrastructure"],
      portfolio: 28,
      rating: 4.9,
      description: "Growth-stage fund focused on scaling businesses"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Users className="w-4 h-4 mr-2" />
              Investor Matching
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Find Your Perfect Investor
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              AI-powered matching with investors who fund startups like yours
            </p>
          </div>

          <Card className="shadow-card mb-8">
            <CardHeader>
              <CardTitle>Filter Investors</CardTitle>
              <CardDescription>
                Narrow down investors based on your startup's needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Select value={filters.stage} onValueChange={(value) => setFilters({...filters, stage: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Funding Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                    <SelectItem value="seed">Seed</SelectItem>
                    <SelectItem value="series-a">Series A</SelectItem>
                    <SelectItem value="series-b">Series B+</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.industry} onValueChange={(value) => setFilters({...filters, industry: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="ai">AI/ML</SelectItem>
                    <SelectItem value="fintech">Fintech</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                  </SelectContent>
                </Select>

                <Input 
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                />

                <Select value={filters.checkSize} onValueChange={(value) => setFilters({...filters, checkSize: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Check Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">$10K - $100K</SelectItem>
                    <SelectItem value="medium">$100K - $1M</SelectItem>
                    <SelectItem value="large">$1M - $10M</SelectItem>
                    <SelectItem value="mega">$10M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            {investors.map((investor, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="w-5 h-5 text-primary" />
                        {investor.name}
                      </CardTitle>
                      <CardDescription>{investor.type} • {investor.location}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">{investor.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Investment Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Check Size:</span>
                          <span className="font-medium">{investor.checkSize}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Stage:</span>
                          <span className="font-medium">{investor.stage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Portfolio:</span>
                          <span className="font-medium">{investor.portfolio} companies</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Focus Industries</h4>
                      <div className="flex flex-wrap gap-1">
                        {investor.industries.map((industry, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">About</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {investor.description}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="hero">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          Connect
                        </Button>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}