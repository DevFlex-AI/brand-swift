import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Image, Upload, Sparkles, Download, Share2, Eye, RefreshCw, 
  Camera, FileImage, Palette, Type, Layout, Target, BarChart3,
  Zap, Globe, MessageSquare, Mail, Phone, Video, Play, Pause,
  Edit3, Copy, Trash2, Settings, Filter, Search, Grid, List,
  Smartphone
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface AdTemplate {
  id: string;
  name: string;
  category: string;
  platform: string;
  dimensions: string;
  description: string;
  preview: string;
}

interface GeneratedAd {
  id: string;
  headline: string;
  description: string;
  cta: string;
  platform: string;
  template: string;
  screenshot?: string;
  createdAt: string;
}

export default function AdGeneratorWithScreenshots() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedScreenshot, setUploadedScreenshot] = useState<string | null>(null);
  const [adData, setAdData] = useState({
    businessName: "",
    productDescription: "",
    targetAudience: "",
    platform: "",
    adType: "",
    tone: "",
    callToAction: ""
  });
  const [generatedAds, setGeneratedAds] = useState<GeneratedAd[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<AdTemplate | null>(null);

  const adTemplates: AdTemplate[] = [
    {
      id: "social-square",
      name: "Social Media Square",
      category: "Social Media",
      platform: "Instagram/Facebook",
      dimensions: "1080x1080",
      description: "Perfect square format for social media feeds",
      preview: "/api/placeholder/300/300"
    },
    {
      id: "story-vertical",
      name: "Story Vertical",
      category: "Social Media", 
      platform: "Instagram/Snapchat",
      dimensions: "1080x1920",
      description: "Full-screen vertical format for stories",
      preview: "/api/placeholder/200/350"
    },
    {
      id: "banner-horizontal",
      name: "Banner Horizontal",
      category: "Display Ads",
      platform: "Google/Web",
      dimensions: "728x90",
      description: "Classic banner ad format",
      preview: "/api/placeholder/400/100"
    },
    {
      id: "video-thumbnail",
      name: "Video Thumbnail",
      category: "Video Ads",
      platform: "YouTube/TikTok",
      dimensions: "1280x720",
      description: "Eye-catching video ad thumbnail",
      preview: "/api/placeholder/350/200"
    },
    {
      id: "mobile-interstitial",
      name: "Mobile Interstitial",
      category: "Mobile Ads",
      platform: "Mobile Apps",
      dimensions: "320x480",
      description: "Full-screen mobile ad format",
      preview: "/api/placeholder/200/300"
    },
    {
      id: "linkedin-sponsored",
      name: "LinkedIn Sponsored",
      category: "Professional",
      platform: "LinkedIn",
      dimensions: "1200x627",
      description: "Professional networking ad format",
      preview: "/api/placeholder/350/180"
    }
  ];

  const platforms = [
    "Google Ads", "Facebook Ads", "Instagram Ads", "LinkedIn Ads", 
    "Twitter Ads", "TikTok Ads", "YouTube Ads", "Snapchat Ads",
    "Pinterest Ads", "Reddit Ads", "Amazon Ads", "Microsoft Ads"
  ];

  const adTypes = [
    "Product Launch", "Brand Awareness", "Lead Generation", "App Install",
    "Event Promotion", "Sale/Discount", "Retargeting", "Video Ad",
    "Carousel Ad", "Collection Ad", "Dynamic Ad", "Sponsored Content"
  ];

  const tones = [
    "Professional", "Casual", "Urgent", "Friendly", "Authoritative",
    "Playful", "Inspirational", "Trustworthy", "Innovative", "Exclusive"
  ];

  const handleScreenshotUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedScreenshot(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAd = async () => {
    if (!user) {
      alert("Please sign in to use this feature");
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-ad-content', {
        body: {
          ...adData,
          screenshot: uploadedScreenshot,
          template: selectedTemplate?.id
        },
        headers: { 'user-id': user.id }
      });

      if (error) throw error;

      const newAd: GeneratedAd = {
        id: Date.now().toString(),
        headline: data.headline,
        description: data.description,
        cta: data.cta,
        platform: adData.platform,
        template: selectedTemplate?.name || "Custom",
        screenshot: uploadedScreenshot,
        createdAt: new Date().toISOString()
      };

      setGeneratedAds(prev => [newAd, ...prev]);
    } catch (error) {
      console.error('Error generating ad:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportAd = (ad: GeneratedAd) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (selectedTemplate) {
      const [width, height] = selectedTemplate.dimensions.split('x').map(Number);
      canvas.width = width;
      canvas.height = height;
      
      // Create ad design programmatically
      if (ctx) {
        // Background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);
        
        // Add screenshot if available
        if (ad.screenshot) {
          const img = document.createElement('img');
          img.onload = () => {
            ctx.drawImage(img, 0, 0, width, height * 0.6);
            
            // Add text overlay
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 32px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(ad.headline, width / 2, height * 0.75);
            
            ctx.font = '18px Arial';
            ctx.fillText(ad.description, width / 2, height * 0.85);
            
            // CTA button
            ctx.fillStyle = '#dc2626';
            ctx.fillRect(width * 0.25, height * 0.9, width * 0.5, 40);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 16px Arial';
            ctx.fillText(ad.cta, width / 2, height * 0.9 + 25);
            
            // Download
            const link = document.createElement('a');
            link.download = `${ad.headline.replace(/\s+/g, '-').toLowerCase()}-ad.png`;
            link.href = canvas.toDataURL();
            link.click();
          };
          img.src = ad.screenshot;
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Camera className="w-4 h-4 mr-2" />
              AI Ad Generator with Screenshots
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Create Stunning Ads Instantly
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Upload screenshots and generate professional ads with AI-powered copy and design
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-primary" />
                    Upload Screenshot
                  </CardTitle>
                  <CardDescription>
                    Upload a screenshot of your product or website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div 
                    className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {uploadedScreenshot ? (
                      <div className="space-y-3">
                        <img 
                          src={uploadedScreenshot} 
                          alt="Uploaded screenshot" 
                          className="max-w-full h-32 object-cover mx-auto rounded-lg"
                        />
                        <p className="text-sm text-muted-foreground">Screenshot uploaded</p>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Change
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <FileImage className="w-12 h-12 text-muted-foreground mx-auto" />
                        <div>
                          <p className="font-medium">Upload Screenshot</p>
                          <p className="text-sm text-muted-foreground">
                            PNG, JPG up to 10MB
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Upload className="w-3 h-3 mr-1" />
                          Choose File
                        </Button>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotUpload}
                    className="hidden"
                  />
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-primary" />
                    Ad Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Business Name</label>
                    <Input
                      placeholder="Your business name"
                      value={adData.businessName}
                      onChange={(e) => setAdData({...adData, businessName: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Product Description</label>
                    <Textarea
                      placeholder="Describe your product or service..."
                      value={adData.productDescription}
                      onChange={(e) => setAdData({...adData, productDescription: e.target.value})}
                      className="min-h-20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Target Audience</label>
                    <Input
                      placeholder="Who is your target audience?"
                      value={adData.targetAudience}
                      onChange={(e) => setAdData({...adData, targetAudience: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Platform</label>
                    <Select value={adData.platform} onValueChange={(value) => setAdData({...adData, platform: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map((platform) => (
                          <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Ad Type</label>
                    <Select value={adData.adType} onValueChange={(value) => setAdData({...adData, adType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ad type" />
                      </SelectTrigger>
                      <SelectContent>
                        {adTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tone</label>
                    <Select value={adData.tone} onValueChange={(value) => setAdData({...adData, tone: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        {tones.map((tone) => (
                          <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Call to Action</label>
                    <Input
                      placeholder="e.g., Sign Up Now, Learn More, Get Started"
                      value={adData.callToAction}
                      onChange={(e) => setAdData({...adData, callToAction: e.target.value})}
                    />
                  </div>

                  <Button 
                    onClick={generateAd}
                    disabled={isGenerating || !adData.businessName || !adData.productDescription}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Generating Ad...
                      </>
                    ) : (
                      <>
                        <Camera className="w-4 h-4 mr-2" />
                        Generate Ad
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Tabs defaultValue="templates" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="generated">Generated Ads</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="export">Export</TabsTrigger>
                </TabsList>

                <TabsContent value="templates" className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Layout className="w-5 h-5 text-primary" />
                        Ad Templates
                      </CardTitle>
                      <CardDescription>
                        Choose from professional ad templates optimized for different platforms
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {adTemplates.map((template) => (
                          <div
                            key={template.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              selectedTemplate?.id === template.id
                                ? 'border-primary bg-primary/5'
                                : 'border-border/50 hover:border-primary/50'
                            }`}
                            onClick={() => setSelectedTemplate(template)}
                          >
                            <div className="aspect-video bg-muted/30 rounded-lg mb-3 flex items-center justify-center">
                              <Image className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h4 className="font-semibold text-sm">{template.name}</h4>
                            <p className="text-xs text-muted-foreground mb-2">{template.description}</p>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">{template.platform}</Badge>
                              <span className="text-xs text-muted-foreground">{template.dimensions}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="generated" className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Generated Ads
                      </CardTitle>
                      <CardDescription>
                        Your AI-generated ad campaigns and variations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {generatedAds.length > 0 ? (
                        <div className="grid gap-4">
                          {generatedAds.map((ad) => (
                            <div key={ad.id} className="p-4 border border-border/50 rounded-lg">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h4 className="font-semibold">{ad.headline}</h4>
                                  <p className="text-sm text-muted-foreground mb-2">{ad.description}</p>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs">{ad.platform}</Badge>
                                    <Badge variant="secondary" className="text-xs">{ad.template}</Badge>
                                  </div>
                                </div>
                                {ad.screenshot && (
                                  <img 
                                    src={ad.screenshot} 
                                    alt="Ad preview" 
                                    className="w-16 h-16 object-cover rounded-lg ml-4"
                                  />
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" onClick={() => exportAd(ad)}>
                                  <Download className="w-3 h-3 mr-1" />
                                  Export
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit3 className="w-3 h-3 mr-1" />
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Copy className="w-3 h-3 mr-1" />
                                  Duplicate
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Share2 className="w-3 h-3 mr-1" />
                                  Share
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-semibold mb-2">No Ads Generated Yet</h3>
                          <p className="text-muted-foreground">
                            Upload a screenshot and configure your ad to get started
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="shadow-card">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Ads Generated</p>
                            <p className="text-2xl font-bold">{generatedAds.length}</p>
                          </div>
                          <Camera className="w-8 h-8 text-primary" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-card">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Templates Used</p>
                            <p className="text-2xl font-bold">{new Set(generatedAds.map(ad => ad.template)).size}</p>
                          </div>
                          <Layout className="w-8 h-8 text-primary" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-card">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Platforms</p>
                            <p className="text-2xl font-bold">{new Set(generatedAds.map(ad => ad.platform)).size}</p>
                          </div>
                          <Globe className="w-8 h-8 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle>Performance Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Ad Performance Analytics</h3>
                        <p className="text-muted-foreground">
                          Track clicks, conversions, and ROI across all your ad campaigns
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="export" className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Download className="w-5 h-5 text-primary" />
                        Export Options
                      </CardTitle>
                      <CardDescription>
                        Download your ads in various formats and sizes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <Button variant="outline" className="h-20 flex-col gap-2">
                            <FileImage className="w-6 h-6" />
                            <span className="text-sm">High-Res PNG</span>
                          </Button>
                          <Button variant="outline" className="h-20 flex-col gap-2">
                            <Video className="w-6 h-6" />
                            <span className="text-sm">Video Format</span>
                          </Button>
                          <Button variant="outline" className="h-20 flex-col gap-2">
                            <Globe className="w-6 h-6" />
                            <span className="text-sm">Web Optimized</span>
                          </Button>
                          <Button variant="outline" className="h-20 flex-col gap-2">
                            <Smartphone className="w-6 h-6" />
                            <span className="text-sm">Mobile Sizes</span>
                          </Button>
                        </div>

                        <div className="p-4 bg-muted/30 rounded-lg">
                          <h4 className="font-semibold mb-2">Bulk Export</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Export all your ads in multiple formats and sizes
                          </p>
                          <Button className="w-full">
                            <Download className="w-4 h-4 mr-2" />
                            Export All Ads
                          </Button>
                        </div>
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