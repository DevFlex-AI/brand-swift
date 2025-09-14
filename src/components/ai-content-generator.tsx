import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Copy, Download, RefreshCw, FileText, Mail, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function AIContentGenerator() {
  const [contentType, setContentType] = useState("");
  const [tone, setTone] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { user } = useAuth();

  const contentTypes = [
    { value: "blog", label: "Blog Post", icon: FileText },
    { value: "email", label: "Email Campaign", icon: Mail },
    { value: "social", label: "Social Media", icon: MessageSquare },
    { value: "ad", label: "Ad Copy", icon: Sparkles },
    { value: "press", label: "Press Release", icon: FileText },
    { value: "product", label: "Product Description", icon: FileText }
  ];

  const tones = [
    "Professional", "Casual", "Friendly", "Authoritative", "Playful", "Urgent", "Inspirational", "Technical"
  ];

  const generatedContent = {
    blog: {
      title: "How AI is Revolutionizing Startup Development",
      content: "In today's fast-paced business environment, artificial intelligence is becoming the secret weapon for successful startups. From automating mundane tasks to providing deep insights into customer behavior, AI is transforming how entrepreneurs build and scale their businesses...",
      wordCount: 1250
    },
    email: {
      subject: "Transform Your Startup Idea Into Reality",
      content: "Hi [Name],\n\nAre you sitting on a brilliant startup idea but don't know where to start? You're not alone. Thousands of entrepreneurs have great ideas but struggle with the execution...",
      wordCount: 320
    }
  };

  const handleGenerate = async () => {
    if (!user) {
      alert("Please sign in to use this feature");
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: {
          contentType,
          tone,
          topic: document.querySelector('textarea')?.value || '',
          targetAudience: 'General',
          keywords: ''
        },
        headers: { 'user-id': user.id }
      });

      if (error) throw error;
      // Update UI with generated content
      console.log('Generated content:', data);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Content Generator
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Create Compelling Content
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Generate high-quality marketing content with AI in seconds
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Content Settings</CardTitle>
                <CardDescription>
                  Configure your content generation preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Content Type</label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tone</label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((toneOption) => (
                        <SelectItem key={toneOption} value={toneOption.toLowerCase()}>
                          {toneOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Topic/Brief</label>
                  <Textarea 
                    placeholder="Describe what you want to write about..."
                    className="min-h-24"
                  />
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleGenerate}
                  disabled={!contentType || !tone || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <div className="lg:col-span-2">
              <Tabs defaultValue="output" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="output">Generated Content</TabsTrigger>
                  <TabsTrigger value="variations">Variations</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="output" className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>AI-Generated Content</CardTitle>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <RefreshCw className="w-3 h-3 mr-1" />
                            Regenerate
                          </Button>
                          <Button variant="outline" size="sm">
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-3 h-3 mr-1" />
                            Export
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {contentType === "blog" && (
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold text-lg mb-2">{generatedContent.blog.title}</h3>
                            <Badge variant="outline">{generatedContent.blog.wordCount} words</Badge>
                          </div>
                          <div className="prose max-w-none">
                            <p className="text-muted-foreground leading-relaxed">
                              {generatedContent.blog.content}
                            </p>
                          </div>
                        </div>
                      )}

                      {contentType === "email" && (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Subject Line</label>
                            <div className="p-3 bg-muted/30 rounded-lg mt-1">
                              {generatedContent.email.subject}
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Email Body</label>
                            <div className="p-3 bg-muted/30 rounded-lg mt-1 whitespace-pre-line">
                              {generatedContent.email.content}
                            </div>
                          </div>
                          <Badge variant="outline">{generatedContent.email.wordCount} words</Badge>
                        </div>
                      )}

                      {!contentType && (
                        <div className="text-center py-12">
                          <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Ready to Generate</h3>
                          <p className="text-muted-foreground">
                            Select a content type and configure your preferences to get started
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="variations" className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle>Content Variations</CardTitle>
                      <CardDescription>
                        Multiple versions of your content for A/B testing
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <RefreshCw className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Generate Variations</h3>
                        <p className="text-muted-foreground mb-4">
                          Create multiple versions to test what works best
                        </p>
                        <Button variant="outline">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Create Variations
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle>Content History</CardTitle>
                      <CardDescription>
                        Access previously generated content
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Content History</h3>
                        <p className="text-muted-foreground">
                          Your generated content will appear here
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