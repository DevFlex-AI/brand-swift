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
    const { pitchData } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Analyzing pitch deck with data:', pitchData);

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
            content: `You are a venture capital expert analyzing startup pitch decks. Provide detailed feedback on:
            1. Problem clarity and market pain points
            2. Solution differentiation and value proposition  
            3. Market size and opportunity assessment
            4. Business model viability
            5. Go-to-market strategy effectiveness
            6. Overall presentation and storytelling
            
            Return a JSON response with: overall_score (0-100), strengths (array), weaknesses (array), recommendations (array), and investor_readiness (1-5 scale).`
          },
          {
            role: 'user',
            content: `Analyze this pitch deck: ${JSON.stringify(pitchData)}`
          }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const analysis = JSON.parse(data.choices[0].message.content);

    // Save to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase
      .from('pitch_analyses')
      .insert({
        user_id: req.headers.get('user-id'),
        pitch_data: pitchData,
        analysis_result: analysis,
        overall_score: analysis.overall_score,
        investor_readiness: analysis.investor_readiness
      });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error analyzing pitch deck:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});