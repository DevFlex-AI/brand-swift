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
    const { contentType, tone, topic, targetAudience, keywords } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Generating content:', { contentType, tone, topic });

    const contentPrompts = {
      blog: `Write a comprehensive blog post about "${topic}" in a ${tone} tone for ${targetAudience}. Include SEO keywords: ${keywords}. Structure with headings, subheadings, and engaging content.`,
      email: `Create an email marketing campaign about "${topic}" in a ${tone} tone for ${targetAudience}. Include subject line, preview text, and email body with clear CTA.`,
      social: `Create social media posts about "${topic}" in a ${tone} tone for ${targetAudience}. Include posts for different platforms (Twitter, LinkedIn, Instagram) with hashtags.`,
      ad: `Write compelling ad copy about "${topic}" in a ${tone} tone for ${targetAudience}. Include headlines, descriptions, and call-to-action buttons.`,
      press: `Write a press release about "${topic}" in a ${tone} tone. Include headline, dateline, lead paragraph, body, boilerplate, and contact information.`,
      product: `Write product descriptions for "${topic}" in a ${tone} tone for ${targetAudience}. Include features, benefits, and compelling copy that converts.`
    };

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
            content: `You are an expert content marketer and copywriter. Create high-quality, engaging content that drives results. Always return content in a structured JSON format with appropriate fields for the content type.`
          },
          {
            role: 'user',
            content: contentPrompts[contentType] || `Create ${contentType} content about "${topic}" in a ${tone} tone for ${targetAudience}.`
          }
        ],
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    // Save to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase
      .from('generated_content')
      .insert({
        user_id: req.headers.get('user-id'),
        content_type: contentType,
        tone,
        topic,
        target_audience: targetAudience,
        keywords,
        generated_content: generatedContent
      });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    return new Response(JSON.stringify({ content: generatedContent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating content:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});