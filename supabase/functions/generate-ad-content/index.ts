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
    const { 
      businessName, 
      productDescription, 
      targetAudience, 
      platform, 
      adType, 
      tone, 
      callToAction,
      screenshot,
      template 
    } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Generating ad content for:', { businessName, platform, adType });

    // Analyze screenshot if provided
    let screenshotAnalysis = "";
    if (screenshot) {
      const visionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Analyze this screenshot and describe the key visual elements, UI components, features, and overall design that would be relevant for creating compelling ad copy.'
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: screenshot
                  }
                }
              ]
            }
          ],
          max_tokens: 500
        }),
      });

      const visionData = await visionResponse.json();
      screenshotAnalysis = visionData.choices[0].message.content;
    }

    // Generate ad content
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
            content: `You are an expert advertising copywriter and creative director. Create compelling ad copy that converts viewers into customers. 

            Consider platform-specific best practices:
            - Google Ads: Focus on search intent and clear value propositions
            - Facebook/Instagram: Emotional connection and visual storytelling
            - LinkedIn: Professional benefits and business value
            - TikTok: Trendy, authentic, and entertaining
            - YouTube: Educational and engaging narratives

            Return a JSON response with:
            - headline: Attention-grabbing headline (max 30 chars for most platforms)
            - description: Compelling description (max 90 chars for most platforms)
            - cta: Strong call-to-action button text
            - long_description: Extended description for platforms that support it
            - hashtags: Relevant hashtags for social platforms
            - targeting_suggestions: Audience targeting recommendations
            - creative_notes: Design and visual recommendations`
          },
          {
            role: 'user',
            content: `Create ${adType} ad copy for ${platform} with these details:
            
            Business: ${businessName}
            Product: ${productDescription}
            Target Audience: ${targetAudience}
            Tone: ${tone}
            Call to Action: ${callToAction}
            Template: ${template}
            
            ${screenshotAnalysis ? `Screenshot Analysis: ${screenshotAnalysis}` : ''}
            
            Make the ad compelling, platform-appropriate, and conversion-focused.`
          }
        ],
        temperature: 0.8,
        max_tokens: 1000
      }),
    });

    const data = await response.json();
    const adContent = JSON.parse(data.choices[0].message.content);

    // Save to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase
      .from('generated_ads')
      .insert({
        user_id: req.headers.get('user-id'),
        business_name: businessName,
        product_description: productDescription,
        target_audience: targetAudience,
        platform,
        ad_type: adType,
        tone,
        call_to_action: callToAction,
        template,
        has_screenshot: !!screenshot,
        generated_content: adContent,
        headline: adContent.headline,
        description: adContent.description,
        cta: adContent.cta
      });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    return new Response(JSON.stringify(adContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating ad content:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});