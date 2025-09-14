import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { businessIdea, industry, targetMarket } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Analyzing competitors for:', { businessIdea, industry });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a competitive analysis expert. Analyze the competitive landscape for startups and provide actionable insights.

            Return a JSON response with:
            - direct_competitors: Array of direct competitors with name, description, strengths, weaknesses, market_share
            - indirect_competitors: Array of indirect competitors
            - competitive_advantages: Opportunities for differentiation
            - market_gaps: Underserved areas in the market
            - threat_level: Overall competitive threat (1-5)
            - positioning_strategy: Recommended positioning
            - moat_opportunities: Ways to build competitive moats
            - swot_analysis: Strengths, Weaknesses, Opportunities, Threats`
          },
          {
            role: 'user',
            content: `Analyze competitors for:
            Business Idea: ${businessIdea}
            Industry: ${industry}
            Target Market: ${targetMarket}`
          }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const competitorAnalysis = JSON.parse(data.choices[0].message.content);

    // Save to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase
      .from('competitor_analyses')
      .insert({
        user_id: req.headers.get('user-id'),
        business_idea: businessIdea,
        industry,
        target_market: targetMarket,
        analysis_result: competitorAnalysis,
        threat_level: competitorAnalysis.threat_level
      });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    return new Response(JSON.stringify(competitorAnalysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error analyzing competitors:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});