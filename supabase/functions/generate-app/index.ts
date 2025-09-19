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
    const { description, template, userId } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Generating app with Smacked AI:', { description, template, userId });

    // Enhanced AI prompt for autonomous app generation
    const systemPrompt = `You are Smacked AI, an autonomous application builder that generates complete, production-ready applications. You have 100+ years of development experience and can build any type of application.

    Your capabilities include:
    - Full-stack application architecture
    - React/TypeScript frontend development
    - Supabase backend integration
    - Stripe payment processing
    - Responsive design with Tailwind CSS
    - Authentication and authorization
    - Database design and optimization
    - Deployment configuration
    - Security best practices
    - Performance optimization

    When generating an app, provide:
    1. Complete file structure with all necessary files
    2. Production-ready code with proper error handling
    3. Database schema with RLS policies
    4. Authentication flows
    5. Responsive UI components
    6. Deployment configuration
    7. Environment setup instructions

    Return a JSON response with:
    - app_name: Generated app name
    - description: Enhanced app description
    - tech_stack: Array of technologies used
    - file_structure: Complete file tree
    - database_schema: SQL schema
    - deployment_config: Deployment settings
    - estimated_build_time: Time estimate in minutes
    - features: Array of implemented features
    - next_steps: Recommended next actions`;

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
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Generate a complete application based on this description: "${description}"
            
            ${template ? `Use this template as a starting point: ${template}` : ''}
            
            Make it production-ready with modern best practices, security, and performance optimizations.`
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      }),
    });

    const data = await response.json();
    const generatedApp = JSON.parse(data.choices[0].message.content);

    // Save to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: appGeneration, error: dbError } = await supabase
      .from('app_generations')
      .insert({
        user_id: userId,
        project_name: generatedApp.app_name,
        description: description,
        template_id: template,
        generation_status: 'completed',
        progress_percentage: 100,
        generated_files: generatedApp.file_structure,
        generation_time_seconds: generatedApp.estimated_build_time * 60
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
    }

    // Track usage analytics
    await supabase
      .from('usage_analytics')
      .insert({
        user_id: userId,
        event_type: 'app_generation',
        event_data: {
          template: template,
          description_length: description.length,
          generated_app_name: generatedApp.app_name
        }
      });

    return new Response(JSON.stringify({
      ...generatedApp,
      generation_id: appGeneration?.id,
      status: 'success'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating app:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      status: 'error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});