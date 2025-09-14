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
    const { industry, targetMarket, geography, businessModel } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Calculating market size for:', { industry, targetMarket, geography });

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
            content: `You are a market research expert. Calculate TAM (Total Addressable Market), SAM (Serviceable Available Market), and SOM (Serviceable Obtainable Market) for startups.

            Return a JSON response with:
            - tam_value: Total addressable market in USD
            - sam_value: Serviceable available market in USD  
            - som_value: Serviceable obtainable market in USD
            - growth_rate: Annual market growth rate (%)
            - key_trends: Array of market trends
            - market_segments: Array of market segments with sizes
            - competitive_landscape: Analysis of competition
            - methodology: How calculations were derived
            - data_sources: Sources used for estimates`
          },
          {
            role: 'user',
            content: `Calculate market size for:
            Industry: ${industry}
            Target Market: ${targetMarket}
            Geography: ${geography}
            Business Model: ${businessModel}`
          }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const marketAnalysis = JSON.parse(data.choices[0].message.content);

    // Save to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase
      .from('market_analyses')
      .insert({
        user_id: req.headers.get('user-id'),
        industry,
        target_market: targetMarket,
        geography,
        business_model: businessModel,
        tam_value: marketAnalysis.tam_value,
        sam_value: marketAnalysis.sam_value,
        som_value: marketAnalysis.som_value,
        growth_rate: marketAnalysis.growth_rate,
        analysis_result: marketAnalysis
      });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    return new Response(JSON.stringify(marketAnalysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error calculating market size:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});