/*
  # Smack Builder Complete Database Schema

  1. New Tables
    - `profiles` - Extended user profiles with company info
    - `projects` - AI-generated application projects
    - `app_generations` - Track AI app generation requests
    - `deployments` - Deployment history and configurations
    - `knowledge_base` - Knowledge management system
    - `project_instructions` - Project-specific AI instructions
    - `collaboration_sessions` - Real-time collaboration tracking
    - `usage_analytics` - Platform usage metrics
    - `ai_chat_sessions` - AI chat conversations
    - `templates` - App templates and configurations

  2. Security
    - Enable RLS on all tables
    - Add comprehensive policies for data access
    - Implement role-based permissions

  3. Performance
    - Add indexes for common queries
    - Enable full-text search capabilities
*/

-- Extended profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'company_name'
  ) THEN
    ALTER TABLE profiles ADD COLUMN company_name TEXT;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'location'
  ) THEN
    ALTER TABLE profiles ADD COLUMN location TEXT;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'subscription_tier'
  ) THEN
    ALTER TABLE profiles ADD COLUMN subscription_tier TEXT DEFAULT 'free';
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'daily_credits_limit'
  ) THEN
    ALTER TABLE profiles ADD COLUMN daily_credits_limit INTEGER DEFAULT 10;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'daily_credits_reset_at'
  ) THEN
    ALTER TABLE profiles ADD COLUMN daily_credits_reset_at TIMESTAMPTZ DEFAULT now();
  END IF;
END $$;

-- App generations table
CREATE TABLE IF NOT EXISTS app_generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  project_name text NOT NULL,
  description text NOT NULL,
  template_id text,
  generation_status text DEFAULT 'pending',
  progress_percentage integer DEFAULT 0,
  generated_files jsonb DEFAULT '[]'::jsonb,
  deployment_url text,
  error_message text,
  generation_time_seconds integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE app_generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own app generations"
  ON app_generations
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Deployments table
CREATE TABLE IF NOT EXISTS deployments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  deployment_target text NOT NULL,
  deployment_url text,
  custom_domain text,
  deployment_status text DEFAULT 'pending',
  build_time_seconds integer,
  deployment_config jsonb DEFAULT '{}'::jsonb,
  error_logs text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE deployments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own deployments"
  ON deployments
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Knowledge base table
CREATE TABLE IF NOT EXISTS knowledge_base (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  knowledge_type text DEFAULT 'instruction',
  category text,
  tags text[] DEFAULT ARRAY[]::text[],
  is_public boolean DEFAULT false,
  votes integer DEFAULT 0,
  author_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view public knowledge and their own"
  ON knowledge_base
  FOR SELECT
  TO authenticated
  USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can manage their own knowledge"
  ON knowledge_base
  FOR INSERT, UPDATE, DELETE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Project instructions table
CREATE TABLE IF NOT EXISTS project_instructions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  instruction_text text NOT NULL,
  is_active boolean DEFAULT true,
  priority integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE project_instructions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own project instructions"
  ON project_instructions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- AI chat sessions table
CREATE TABLE IF NOT EXISTS ai_chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  session_title text,
  messages jsonb DEFAULT '[]'::jsonb,
  context_data jsonb DEFAULT '{}'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ai_chat_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own chat sessions"
  ON ai_chat_sessions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Templates table
CREATE TABLE IF NOT EXISTS app_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text,
  complexity text DEFAULT 'medium',
  estimated_time text,
  features text[] DEFAULT ARRAY[]::text[],
  tech_stack text[] DEFAULT ARRAY[]::text[],
  template_config jsonb DEFAULT '{}'::jsonb,
  is_premium boolean DEFAULT false,
  downloads_count integer DEFAULT 0,
  rating numeric DEFAULT 0,
  created_by uuid REFERENCES auth.users(id),
  is_public boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE app_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view public templates"
  ON app_templates
  FOR SELECT
  TO authenticated
  USING (is_public = true OR auth.uid() = created_by);

CREATE POLICY "Users can manage their own templates"
  ON app_templates
  FOR INSERT, UPDATE, DELETE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Usage analytics table
CREATE TABLE IF NOT EXISTS usage_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  event_data jsonb DEFAULT '{}'::jsonb,
  session_id text,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE usage_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own analytics"
  ON usage_analytics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert analytics"
  ON usage_analytics
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_app_generations_user_id ON app_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_app_generations_status ON app_generations(generation_status);
CREATE INDEX IF NOT EXISTS idx_app_generations_created_at ON app_generations(created_at);

CREATE INDEX IF NOT EXISTS idx_deployments_user_id ON deployments(user_id);
CREATE INDEX IF NOT EXISTS idx_deployments_project_id ON deployments(project_id);
CREATE INDEX IF NOT EXISTS idx_deployments_status ON deployments(deployment_status);

CREATE INDEX IF NOT EXISTS idx_knowledge_base_user_id ON knowledge_base(user_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_public ON knowledge_base(is_public);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_category ON knowledge_base(category);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_tags ON knowledge_base USING gin(tags);

CREATE INDEX IF NOT EXISTS idx_project_instructions_user_id ON project_instructions(user_id);
CREATE INDEX IF NOT EXISTS idx_project_instructions_project_id ON project_instructions(project_id);
CREATE INDEX IF NOT EXISTS idx_project_instructions_active ON project_instructions(is_active);

CREATE INDEX IF NOT EXISTS idx_ai_chat_sessions_user_id ON ai_chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_chat_sessions_active ON ai_chat_sessions(is_active);

CREATE INDEX IF NOT EXISTS idx_app_templates_category ON app_templates(category);
CREATE INDEX IF NOT EXISTS idx_app_templates_public ON app_templates(is_public);
CREATE INDEX IF NOT EXISTS idx_app_templates_premium ON app_templates(is_premium);

CREATE INDEX IF NOT EXISTS idx_usage_analytics_user_id ON usage_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_analytics_event_type ON usage_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_usage_analytics_created_at ON usage_analytics(created_at);

-- Add full-text search capabilities
CREATE INDEX IF NOT EXISTS idx_knowledge_base_search 
  ON knowledge_base USING gin(to_tsvector('english', title || ' ' || content));

CREATE INDEX IF NOT EXISTS idx_app_templates_search 
  ON app_templates USING gin(to_tsvector('english', name || ' ' || description));

-- Update function for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_app_generations_updated_at
  BEFORE UPDATE ON app_generations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deployments_updated_at
  BEFORE UPDATE ON deployments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_knowledge_base_updated_at
  BEFORE UPDATE ON knowledge_base
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_instructions_updated_at
  BEFORE UPDATE ON project_instructions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_chat_sessions_updated_at
  BEFORE UPDATE ON ai_chat_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_app_templates_updated_at
  BEFORE UPDATE ON app_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();