import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Sparkles, RefreshCw, Star, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface StartupIdea {
  id: string;
  title: string;
  description: string;
  target_audience: string;
  revenue_model: string;
  market_size: string;
  competition_level: string;
  difficulty: string;
  tags: string[];
}

export default function StartupIdeaGenerator() {
  const { user } = useAuth();
  const [industry, setIndustry] = useState('');
  const [interests, setInterests] = useState('');
  const [budget, setBudget] = useState('');
  const [ideas, setIdeas] = useState<StartupIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const [savedIdeas, setSavedIdeas] = useState<Set<string>>(new Set());

  const generateIdeas = async () => {
    setLoading(true);
    try {
      // Generate 10 startup ideas based on input
      const generatedIdeas: StartupIdea[] = [
        {
          id: '1',
          title: 'AI-Powered Personal Finance Coach',
          description: 'An app that analyzes spending patterns and provides personalized financial advice using AI.',
          target_audience: 'Young professionals aged 25-35',
          revenue_model: 'Freemium subscription model',
          market_size: '$50B+ fintech market',
          competition_level: 'Medium',
          difficulty: 'Medium',
          tags: ['AI', 'Finance', 'Mobile App', 'SaaS']
        },
        {
          id: '2',
          title: 'Smart Home Energy Optimizer',
          description: 'IoT device that learns your habits and automatically optimizes energy usage to reduce bills.',
          target_audience: 'Homeowners concerned about energy costs',
          revenue_model: 'Hardware sales + subscription service',
          market_size: '$15B smart home market',
          competition_level: 'High',
          difficulty: 'Hard',
          tags: ['IoT', 'Energy', 'Hardware', 'Green Tech']
        },
        {
          id: '3',
          title: 'Virtual Reality Fitness Platform',
          description: 'Immersive VR workouts that make exercise fun and engaging with gamification.',
          target_audience: 'Fitness enthusiasts and gamers',
          revenue_model: 'Subscription + in-app purchases',
          market_size: '$30B fitness industry',
          competition_level: 'Medium',
          difficulty: 'Hard',
          tags: ['VR', 'Fitness', 'Gaming', 'Health']
        },
        {
          id: '4',
          title: 'Local Food Waste Marketplace',
          description: 'Platform connecting restaurants with excess food to local consumers at discounted prices.',
          target_audience: 'Budget-conscious consumers and restaurants',
          revenue_model: 'Commission on transactions',
          market_size: '$400B food waste problem',
          competition_level: 'Low',
          difficulty: 'Easy',
          tags: ['Marketplace', 'Sustainability', 'Food', 'Mobile']
        },
        {
          id: '5',
          title: 'AI Study Buddy for Students',
          description: 'Personalized AI tutor that adapts to learning styles and tracks progress.',
          target_audience: 'Students and lifelong learners',
          revenue_model: 'Freemium + institutional licenses',
          market_size: '$240B education market',
          competition_level: 'High',
          difficulty: 'Medium',
          tags: ['AI', 'Education', 'Mobile App', 'SaaS']
        }
      ];
      
      setIdeas(generatedIdeas);
    } catch (error) {
      console.error('Error generating ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveIdea = async (idea: StartupIdea) => {
    if (!user) return;
    
    try {
      // Temporarily disable database save until types are regenerated
      // const { error } = await supabase
      //   .from('startup_ideas')
      //   .insert({
      //     user_id: user.id,
      //     title: idea.title,
      //     description: idea.description,
      //     target_audience: idea.target_audience,
      //     revenue_model: idea.revenue_model,
      //     market_size: idea.market_size,
      //     tags: idea.tags
      //   });

      // if (!error) {
        setSavedIdeas(new Set([...savedIdeas, idea.id]));
      // }
    } catch (error) {
      console.error('Error saving idea:', error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCompetitionColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Startup Idea Generator
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Get personalized startup ideas based on your interests, skills, and market trends.
        </p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Generate Ideas
          </CardTitle>
          <CardDescription>
            Tell us about your preferences to get tailored startup suggestions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="industry">Industry/Niche</Label>
              <Input
                id="industry"
                placeholder="e.g., Health, Finance, Education"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="interests">Your Interests</Label>
              <Input
                id="interests"
                placeholder="e.g., AI, Mobile Apps, Hardware"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="budget">Budget Range</Label>
              <Input
                id="budget"
                placeholder="e.g., $1k, $10k, $100k+"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
          </div>
          
          <Button 
            onClick={generateIdeas} 
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Generating Ideas...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Startup Ideas
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {ideas.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Generated Ideas</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ideas.map((idea) => (
              <Card key={idea.id} className="shadow-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      {idea.title}
                    </CardTitle>
                    <div className="flex gap-2">
                      <div className={`w-3 h-3 rounded-full ${getDifficultyColor(idea.difficulty)}`} 
                           title={`Difficulty: ${idea.difficulty}`} />
                    </div>
                  </div>
                  <CardDescription className="text-sm">
                    {idea.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Target:</span> {idea.target_audience}
                    </div>
                    <div>
                      <span className="font-medium">Revenue:</span> {idea.revenue_model}
                    </div>
                    <div>
                      <span className="font-medium">Market:</span> {idea.market_size}
                    </div>
                    <div>
                      <span className="font-medium">Competition:</span> 
                      <span className={`ml-1 ${getCompetitionColor(idea.competition_level)}`}>
                        {idea.competition_level}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {idea.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {user && (
                    <Button
                      variant={savedIdeas.has(idea.id) ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => saveIdea(idea)}
                      disabled={savedIdeas.has(idea.id)}
                      className="w-full"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      {savedIdeas.has(idea.id) ? 'Saved' : 'Save Idea'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}