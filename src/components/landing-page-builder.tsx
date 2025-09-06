import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Eye, 
  Code, 
  Download, 
  Share2, 
  Edit3, 
  Monitor, 
  Smartphone, 
  Tablet,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Copy,
  Settings,
  Palette,
  Type,
  Image,
  BarChart3
} from "lucide-react";

interface LandingPageSection {
  id: string;
  type: 'hero' | 'features' | 'pricing' | 'testimonials' | 'cta' | 'footer';
  title: string;
  content: any;
  visible: boolean;
}

export default function LandingPageBuilder() {
  const [sections, setSections] = useState<LandingPageSection[]>([
    {
      id: '1',
      type: 'hero',
      title: 'Hero Section',
      visible: true,
      content: {
        headline: 'Premium Coffee Delivered to Your Team',
        subheadline: 'Boost productivity and team morale with artisanal coffee subscriptions tailored for remote teams.',
        cta: 'Start Free Trial',
        image: '/api/placeholder/600/400'
      }
    },
    {
      id: '2',
      type: 'features',
      title: 'Features Section',
      visible: true,
      content: {
        title: 'Why Teams Choose CoffeeDrop',
        features: [
          {
            title: 'Premium Selection',
            description: 'Curated beans from sustainable farms worldwide',
            icon: '☕'
          },
          {
            title: 'Team Customization',
            description: 'Personalized preferences for every team member',
            icon: '👥'
          },
          {
            title: 'Flexible Delivery',
            description: 'Schedule deliveries that work for your team',
            icon: '📦'
          }
        ]
      }
    },
    {
      id: '3',
      type: 'pricing',
      title: 'Pricing Section',
      visible: true,
      content: {
        title: 'Simple, Transparent Pricing',
        plans: [
          {
            name: 'Starter',
            price: '$29',
            period: '/month',
            features: ['5 team members', '2 coffee varieties', 'Monthly delivery']
          },
          {
            name: 'Professional',
            price: '$59',
            period: '/month',
            features: ['15 team members', '5 coffee varieties', 'Bi-weekly delivery', 'Premium support']
          },
          {
            name: 'Enterprise',
            price: '$129',
            period: '/month',
            features: ['Unlimited members', 'All coffee varieties', 'Weekly delivery', 'Dedicated account manager']
          }
        ]
      }
    }
  ]);

  const [selectedSection, setSelectedSection] = useState(sections[0]);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isGenerating, setIsGenerating] = useState(false);

  const regenerateSection = async (sectionId: string) => {
    setIsGenerating(true);
    // Simulate AI regeneration
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  const toggleSection = (sectionId: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, visible: !section.visible }
          : section
      )
    );
  };

  const previewSizes = {
    desktop: 'w-full h-96',
    tablet: 'w-2/3 h-96 mx-auto',
    mobile: 'w-80 h-96 mx-auto'
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary" />
                Landing Page Builder
              </h1>
              <p className="text-muted-foreground">Design your startup's perfect landing page</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline">
                <Code className="w-4 h-4 mr-2" />
                Export Code
              </Button>
              <Button variant="hero">
                <Share2 className="w-4 h-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Page Sections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {sections.map((section) => (
                    <div 
                      key={section.id}
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                        selectedSection.id === section.id 
                          ? 'bg-primary/10 text-primary' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedSection(section)}
                    >
                      <span className="text-sm font-medium">{section.title}</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSection(section.id);
                          }}
                          className={`w-4 h-4 rounded border ${
                            section.visible 
                              ? 'bg-primary border-primary' 
                              : 'border-muted-foreground'
                          }`}
                        >
                          {section.visible && <Eye className="w-3 h-3 text-white" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => regenerateSection(selectedSection.id)}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerate Section
                      </>
                    )}
                  </Button>
                  
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Palette className="w-4 h-4 mr-2" />
                    Customize Colors
                  </Button>
                  
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Type className="w-4 h-4 mr-2" />
                    Change Fonts
                  </Button>
                  
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Image className="w-4 h-4 mr-2" />
                    Upload Images
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Page Views</span>
                      <span className="font-medium">2,847</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Conversion Rate</span>
                      <span className="font-medium">3.2%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Avg. Session</span>
                      <span className="font-medium">4:23</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Tabs defaultValue="preview" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="edit">Edit Content</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                    <button
                      onClick={() => setPreviewMode('desktop')}
                      className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-background shadow-sm' : ''}`}
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPreviewMode('tablet')}
                      className={`p-2 rounded ${previewMode === 'tablet' ? 'bg-background shadow-sm' : ''}`}
                    >
                      <Tablet className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPreviewMode('mobile')}
                      className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-background shadow-sm' : ''}`}
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <TabsContent value="preview" className="space-y-6">
                <Card>
                  <CardContent className="p-0">
                    <div className={`${previewSizes[previewMode]} border rounded-lg bg-white overflow-hidden transition-all`}>
                      <div className="h-full flex flex-col">
                        {sections.filter(s => s.visible).map((section) => (
                          <div key={section.id} className="border-b last:border-b-0 p-6">
                            {section.type === 'hero' && (
                              <div className="text-center space-y-4">
                                <h1 className="text-3xl font-bold">{section.content.headline}</h1>
                                <p className="text-muted-foreground">{section.content.subheadline}</p>
                                <Button variant="hero">{section.content.cta}</Button>
                              </div>
                            )}
                            
                            {section.type === 'features' && (
                              <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-center">{section.content.title}</h2>
                                <div className="grid md:grid-cols-3 gap-4">
                                  {section.content.features.map((feature: any, index: number) => (
                                    <div key={index} className="text-center">
                                      <div className="text-2xl mb-2">{feature.icon}</div>
                                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {section.type === 'pricing' && (
                              <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-center">{section.content.title}</h2>
                                <div className="grid md:grid-cols-3 gap-4">
                                  {section.content.plans.map((plan: any, index: number) => (
                                    <div key={index} className="border rounded-lg p-4">
                                      <h3 className="font-semibold">{plan.name}</h3>
                                      <div className="text-2xl font-bold">
                                        {plan.price}<span className="text-sm text-muted-foreground">{plan.period}</span>
                                      </div>
                                      <ul className="space-y-1 text-sm mt-4">
                                        {plan.features.map((feature: string, fIndex: number) => (
                                          <li key={fIndex}>✓ {feature}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="edit" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Edit {selectedSection.title}</CardTitle>
                    <CardDescription>
                      Customize the content for this section
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedSection.type === 'hero' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2">Headline</label>
                          <Input value={selectedSection.content.headline} readOnly />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Subheadline</label>
                          <Textarea value={selectedSection.content.subheadline} readOnly />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Call to Action</label>
                          <Input value={selectedSection.content.cta} readOnly />
                        </div>
                      </>
                    )}
                    
                    <div className="flex gap-2 pt-4">
                      <Button>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        AI Rewrite
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Page Settings</CardTitle>
                    <CardDescription>
                      Configure your landing page
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Custom Domain</h4>
                        <p className="text-sm text-muted-foreground">
                          Connect your own domain
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">SEO Optimization</h4>
                        <p className="text-sm text-muted-foreground">
                          Meta tags and descriptions
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Analytics</h4>
                        <p className="text-sm text-muted-foreground">
                          Google Analytics integration
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Setup
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