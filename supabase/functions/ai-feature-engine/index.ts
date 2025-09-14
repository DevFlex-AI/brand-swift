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
    const { featureId, prompt, userId } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('AI Feature Engine request:', { featureId, prompt });

    // Define feature-specific prompts and capabilities
    const featurePrompts = {
      'business-plan-ai': {
        systemPrompt: `You are an expert business strategist and consultant. Generate comprehensive business plans with market analysis, competitive research, financial projections, and strategic roadmaps. Include executive summary, market opportunity, business model, marketing strategy, operations plan, management team, financial projections, funding requirements, and risk analysis.`,
        temperature: 0.7
      },
      'pitch-deck-ai': {
        systemPrompt: `You are a pitch deck expert who has helped startups raise millions. Create compelling investor presentations with clear problem statements, innovative solutions, market sizing, business models, traction metrics, financial projections, team introductions, and funding asks. Focus on storytelling and investor psychology.`,
        temperature: 0.8
      },
      'brand-ai': {
        systemPrompt: `You are a brand strategist and designer. Create comprehensive brand identities including brand names, taglines, color palettes, typography recommendations, logo concepts, brand voice, messaging frameworks, and brand guidelines. Consider psychology, market positioning, and visual impact.`,
        temperature: 0.9
      },
      'code-ai': {
        systemPrompt: `You are a senior full-stack developer and software architect. Generate production-ready code including frontend components, backend APIs, database schemas, deployment configurations, testing suites, and documentation. Follow best practices for security, performance, and maintainability.`,
        temperature: 0.3
      },
      'marketing-ai': {
        systemPrompt: `You are a growth marketing expert. Create comprehensive marketing strategies including target audience analysis, channel strategies, content marketing plans, paid advertising campaigns, SEO strategies, social media plans, email marketing sequences, and performance metrics.`,
        temperature: 0.7
      },
      'financial-ai': {
        systemPrompt: `You are a financial analyst and CFO advisor. Build detailed financial models including revenue projections, cost structures, cash flow analysis, break-even calculations, scenario planning, valuation models, and investment analysis. Provide actionable financial insights.`,
        temperature: 0.4
      },
      'legal-ai': {
        systemPrompt: `You are a startup lawyer and legal expert. Generate legal documents including terms of service, privacy policies, employment agreements, contractor agreements, partnership agreements, incorporation guides, IP protection strategies, and compliance frameworks.`,
        temperature: 0.2
      },
      'hr-ai': {
        systemPrompt: `You are an HR expert and people operations specialist. Create HR strategies including job descriptions, interview processes, onboarding programs, performance review systems, compensation frameworks, company culture guides, and employee handbook templates.`,
        temperature: 0.6
      },
      'sales-ai': {
        systemPrompt: `You are a sales expert and revenue optimization specialist. Develop sales strategies including lead generation tactics, sales funnel optimization, CRM workflows, sales scripts, pricing strategies, customer segmentation, and sales team training programs.`,
        temperature: 0.7
      },
      'product-ai': {
        systemPrompt: `You are a product management expert. Create product strategies including feature roadmaps, user story mapping, product requirements documents, go-to-market strategies, user research plans, A/B testing frameworks, and product analytics dashboards.`,
        temperature: 0.6
      }
    };

    const featureConfig = featurePrompts[featureId] || featurePrompts['business-plan-ai'];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: featureConfig.systemPrompt
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: featureConfig.temperature,
        max_tokens: 4000
      }),
    });

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    // Save to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase
      .from('ai_requests')
      .insert({
        user_id: userId,
        prompt,
        response: generatedContent,
        status: 'completed',
        tokens_used: data.usage?.total_tokens || 0,
        credits_consumed: Math.ceil((data.usage?.total_tokens || 0) / 100)
      });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    return new Response(JSON.stringify({ 
      content: generatedContent,
      tokensUsed: data.usage?.total_tokens || 0,
      featureId,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in AI Feature Engine:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});