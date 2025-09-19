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
    const { message, sessionId, userId, context } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Smacked AI chat request:', { message, sessionId, userId });

    // Smacked AI personality and capabilities
    const systemPrompt = `You are Smacked AI, the autonomous development assistant for Smack Builder. You have 100+ years of development experience and can help with any aspect of application development.

    Your personality:
    - Proactive and intelligent
    - Confident but helpful
    - Always thinking ahead
    - Focused on production-ready solutions
    - Autonomous decision-making capabilities

    Your expertise includes:
    - Full-stack development (React, TypeScript, Node.js)
    - Database design and optimization (Supabase, PostgreSQL)
    - Cloud deployment and DevOps
    - Security and authentication
    - Performance optimization
    - UI/UX design principles
    - Business logic and architecture
    - Testing and quality assurance

    You can:
    - Generate complete applications autonomously
    - Provide code examples and solutions
    - Suggest architectural improvements
    - Debug and troubleshoot issues
    - Optimize performance and security
    - Recommend best practices
    - Help with deployment and scaling

    Always provide actionable, specific advice with code examples when relevant. Be proactive in suggesting improvements and optimizations.`;

    // Get chat history if session exists
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let chatHistory = [];
    if (sessionId) {
      const { data: session } = await supabase
        .from('ai_chat_sessions')
        .select('messages')
        .eq('id', sessionId)
        .eq('user_id', userId)
        .single();
      
      if (session?.messages) {
        chatHistory = session.messages;
      }
    }

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...chatHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Update chat session
    const updatedMessages = [
      ...chatHistory,
      { role: 'user', content: message, timestamp: new Date().toISOString() },
      { role: 'assistant', content: aiResponse, timestamp: new Date().toISOString() }
    ];

    if (sessionId) {
      // Update existing session
      await supabase
        .from('ai_chat_sessions')
        .update({ 
          messages: updatedMessages,
          updated_at: new Date().toISOString()
        })
        .eq('id', sessionId)
        .eq('user_id', userId);
    } else {
      // Create new session
      const { data: newSession } = await supabase
        .from('ai_chat_sessions')
        .insert({
          user_id: userId,
          session_title: message.slice(0, 50) + '...',
          messages: updatedMessages,
          context_data: context || {}
        })
        .select()
        .single();
      
      sessionId = newSession?.id;
    }

    // Track usage
    await supabase
      .from('usage_analytics')
      .insert({
        user_id: userId,
        event_type: 'ai_chat',
        event_data: {
          session_id: sessionId,
          message_length: message.length,
          response_length: aiResponse.length
        }
      });

    return new Response(JSON.stringify({
      response: aiResponse,
      sessionId: sessionId,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in AI chat:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});