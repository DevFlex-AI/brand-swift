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
    const { businessIdea, industry, targetMarket, customerSegments } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Analyzing revenue models for:', { businessIdea, industry });

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
            content: `You are a business model expert specializing in revenue optimization. Analyze business ideas and recommend the best revenue models and pricing strategies.

            Return a JSON response with:
            - recommended_models: Array of revenue models (subscription, freemium, marketplace, etc.) with pros/cons
            - pricing_strategy: Detailed pricing recommendations
            - monetization_timeline: When to implement each revenue stream
            - customer_lifetime_value: CLV estimates and improvement strategies
            - revenue_projections: 3-year revenue forecasts
            - key_metrics: Important KPIs to track
            - optimization_opportunities: Ways to maximize revenue
            - risk_factors: Potential revenue risks and mitigation`
          },
          {
            role: 'user',
            content: `Analyze revenue models for:
            Business Idea: ${businessIdea}
            Industry: ${industry}
            Target Market: ${targetMarket}
            Customer Segments: ${customerSegments}`
          }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const revenueAnalysis = JSON.parse(data.choices[0].message.content);

    // Save to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase
      .from('revenue_models')
      .insert({
        user_id: req.headers.get('user-id'),
        business_idea: businessIdea,
        industry,
        target_market: targetMarket,
        customer_segments: customerSegments,
        analysis_result: revenueAnalysis
      });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    return new Response(JSON.stringify(revenueAnalysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error analyzing revenue models:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});