import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Palette, 
  Download, 
  RefreshCw, 
  Heart, 
  Share2, 
  Eye,
  Type,
  Image,
  Globe,
  Star,
  Check,
  Sparkles,
  Copy,
  ExternalLink
} from "lucide-react";

interface BrandOption {
  id: string;
  name: string;
  tagline: string;
  domain: string;
  available: boolean;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  tone: string;
  story: string;
}

export default function BrandGenerator() {
  const [brandOptions] = useState<BrandOption[]>([
    {
      id: "1",
      name: "CoffeeDrop",
      tagline: "Premium coffee, delivered to your team",
      domain: "coffeedrop.com",
      available: true,
      logo: "/api/placeholder/120/120",
      colors: {
        primary: "#8B4513",
        secondary: "#D2B48C", 
        accent: "#FF6B35"
      },
      fonts: {
        heading: "Montserrat",
        body: "Open Sans"
      },
      tone: "Warm & Professional",
      story: "CoffeeDrop brings teams together through exceptional coffee experiences, sourcing premium beans from sustainable farms worldwide."
    },
    {
      id: "2", 
      name: "TeamBrew",
      tagline: "Fuel your team's productivity",
      domain: "teambrew.co",
      available: true,
      logo: "/api/placeholder/120/120",
      colors: {
        primary: "#2C1810",
        secondary: "#F4E4BC",
        accent: "#E17B47"
      },
      fonts: {
        heading: "Poppins",
        body: "Inter"
      },
      tone: "Energetic & Modern",
      story: "TeamBrew revolutionizes workplace culture by delivering artisanal coffee subscriptions that energize and unite remote teams."
    },
    {
      id: "3",
      name: "BrewShare", 
      tagline: "Sharing great coffee moments",
      domain: "brewshare.io",
      available: false,
      logo: "/api/placeholder/120/120", 
      colors: {
        primary: "#4A2C2A",
        secondary: "#DEB887",
        accent: "#CD853F"
      },
      fonts: {
        heading: "Raleway",
        body: "Lato"
      },
      tone: "Friendly & Community-focused",
      story: "BrewShare creates shared coffee experiences that bring distributed teams closer together, one cup at a time."
    }
  ]);

  const [selectedBrand, setSelectedBrand] = useState(brandOptions[0]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const toggleFavorite = (brandId: string) => {
    setFavorites(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const regenerateBrand = async () => {
    setIsRegenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRegenerating(false);
  };

  const assets = [
    { name: "Primary Logo", type: "SVG", size: "Vector" },
    { name: "Logo Variants", type: "PNG", size: "4 files" },
    { name: "Favicon", type: "ICO", size: "16x16-512x512" },
    { name: "Brand Colors", type: "CSS", size: "Color palette" },
    { name: "Typography", type: "TTF", size: "2 fonts" },
    { name: "Brand Guidelines", type: "PDF", size: "12 pages" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Palette className="w-6 h-6 text-primary" />
                Brand Generator
              </h1>
              <p className="text-muted-foreground">AI-generated branding for your startup</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={regenerateBrand} disabled={isRegenerating}>
                {isRegenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </>
                )}
              </Button>
              <Button variant="hero">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Brand Options
              </h3>
              {brandOptions.map((brand) => (
                <Card 
                  key={brand.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedBrand.id === brand.id ? 'ring-2 ring-primary shadow-electric' : ''
                  }`}
                  onClick={() => setSelectedBrand(brand)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: brand.colors.primary }}
                        >
                          {brand.name[0]}
                        </div>
                        <div>
                          <h4 className="font-semibold">{brand.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {brand.tagline}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(brand.id);
                        }}
                      >
                        <Heart 
                          className={`w-4 h-4 ${
                            favorites.includes(brand.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-muted-foreground'
                          }`} 
                        />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs">{brand.domain}</span>
                      <Badge variant={brand.available ? "default" : "secondary"} className="text-xs">
                        {brand.available ? "Available" : "Taken"}
                      </Badge>
                    </div>

                    <div className="flex gap-1">
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-white"
                        style={{ backgroundColor: brand.colors.primary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-white"
                        style={{ backgroundColor: brand.colors.secondary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-white"
                        style={{ backgroundColor: brand.colors.accent }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="logo">Logo</TabsTrigger>
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="assets">Assets</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{selectedBrand.name}</CardTitle>
                        <CardDescription className="text-lg">
                          {selectedBrand.tagline}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Brand Story</h4>
                      <p className="text-muted-foreground">{selectedBrand.story}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Brand Tone</h4>
                        <Badge variant="secondary" className="text-sm">
                          {selectedBrand.tone}
                        </Badge>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Domain</h4>
                        <div className="flex items-center gap-2">
                          <Input value={selectedBrand.domain} readOnly className="text-sm" />
                          <Button variant="outline" size="sm">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Typography</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">Heading Font</Label>
                          <p className="font-bold text-lg" style={{ fontFamily: selectedBrand.fonts.heading }}>
                            {selectedBrand.fonts.heading}
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Body Font</Label>
                          <p className="text-lg" style={{ fontFamily: selectedBrand.fonts.body }}>
                            {selectedBrand.fonts.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="logo" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Logo Variations</CardTitle>
                    <CardDescription>
                      Multiple formats and variations for different use cases
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((variant) => (
                        <div key={variant} className="border rounded-lg p-6 bg-gray-50 flex items-center justify-center">
                          <div 
                            className="w-24 h-24 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
                            style={{ backgroundColor: selectedBrand.colors.primary }}
                          >
                            {selectedBrand.name[0]}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download SVG
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download PNG
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="colors" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Color Palette</CardTitle>
                    <CardDescription>
                      Your brand's carefully curated color scheme
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div 
                          className="w-full h-24 rounded-lg mb-3"
                          style={{ backgroundColor: selectedBrand.colors.primary }}
                        />
                        <Label className="text-sm font-medium">Primary</Label>
                        <p className="text-xs text-muted-foreground font-mono">
                          {selectedBrand.colors.primary}
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div 
                          className="w-full h-24 rounded-lg mb-3"
                          style={{ backgroundColor: selectedBrand.colors.secondary }}
                        />
                        <Label className="text-sm font-medium">Secondary</Label>
                        <p className="text-xs text-muted-foreground font-mono">
                          {selectedBrand.colors.secondary}
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div 
                          className="w-full h-24 rounded-lg mb-3"
                          style={{ backgroundColor: selectedBrand.colors.accent }}
                        />
                        <Label className="text-sm font-medium">Accent</Label>
                        <p className="text-xs text-muted-foreground font-mono">
                          {selectedBrand.colors.accent}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                      <Button size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export CSS
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Hex Codes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assets" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Brand Assets</CardTitle>
                    <CardDescription>
                      Complete brand kit ready for download
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {assets.map((asset, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Image className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{asset.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {asset.type} • {asset.size}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 mt-6">
                      <Button className="flex-1" variant="hero">
                        <Download className="w-4 h-4 mr-2" />
                        Download Complete Brand Kit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}