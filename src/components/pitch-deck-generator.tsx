import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Presentation, Download, Eye, Share2, RefreshCw, FileText } from "lucide-react";

export default function PitchDeckGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation progress
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 20;
      });
    }, 800);
  };

  const slides = [
    { title: "Problem", description: "Market pain points and opportunity", status: "completed" },
    { title: "Solution", description: "Your product and key features", status: "completed" },
    { title: "Market", description: "TAM, SAM, SOM analysis", status: "completed" },
    { title: "Business Model", description: "Revenue streams and pricing", status: "completed" },
    { title: "Go-to-Market", description: "Launch and growth strategy", status: "completed" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Presentation className="w-4 h-4 mr-2" />
              AI Pitch Deck Generator
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Investor-Ready Pitch Deck
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Generate a professional 5-slide pitch deck that gets results
            </p>
          </div>

          {isGenerating && (
            <Card className="mb-8 border-primary/20 bg-gradient-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <RefreshCw className="w-6 h-6 text-primary animate-spin" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary mb-2">Generating Your Pitch Deck...</h3>
                    <Progress value={generationProgress} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-2">
                      Creating slides with market data and compelling narratives
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Pitch Deck Slides
                </CardTitle>
                <CardDescription>
                  Professional investor-grade presentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {slides.map((slide, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                      <div>
                        <h4 className="font-semibold">{index + 1}. {slide.title}</h4>
                        <p className="text-sm text-muted-foreground">{slide.description}</p>
                      </div>
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        {slide.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <Button onClick={handleGenerate} disabled={isGenerating} className="flex-1">
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Presentation className="w-4 h-4 mr-2" />
                        Generate Deck
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Deck Actions</CardTitle>
                <CardDescription>
                  Preview, download, and share your pitch deck
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Deck
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Link
                  </Button>
                </div>

                <div className="mt-8 p-4 bg-gradient-primary/10 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">
                    🎯 Investor-Ready Features
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Market sizing with real data</li>
                    <li>• Competitive analysis</li>
                    <li>• Financial projections</li>
                    <li>• Professional design</li>
                    <li>• Compelling storytelling</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}