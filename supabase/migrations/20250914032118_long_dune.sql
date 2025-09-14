/*
  # Ultimate Platform Database Schema

  1. New Tables
    - `competitor_analyses` - Store competitor analysis results
    - `pitch_analyses` - Store pitch deck analysis results  
    - `market_analyses` - Store market size calculations
    - `revenue_models` - Store revenue model recommendations
    - `generated_content` - Store AI-generated content
    - `collaboration_sessions` - Track real-time collaboration
    - `feature_usage` - Track feature usage analytics
    - `enterprise_deployments` - Track enterprise feature deployments

  2. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users to manage their own data

  3. Indexes
    - Add performance indexes for common queries
    - Add full-text search capabilities
*/

-- Competitor analyses table
CREATE TABLE IF NOT EXISTS competitor_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  business_idea text NOT NULL,
  industry text,
  target_market text,
  analysis_result jsonb,
  threat_level integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE competitor_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own competitor analyses"
  ON competitor_analyses
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Pitch analyses table
CREATE TABLE IF NOT EXISTS pitch_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  pitch_data jsonb NOT NULL,
  analysis_result jsonb,
  overall_score integer,
  investor_readiness integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pitch_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own pitch analyses"
  ON pitch_analyses
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Market analyses table
CREATE TABLE IF NOT EXISTS market_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  industry text NOT NULL,
  target_market text,
  geography text,
  business_model text,
  tam_value bigint,
  sam_value bigint,
  som_value bigint,
  growth_rate numeric,
  analysis_result jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE market_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own market analyses"
  ON market_analyses
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Revenue models table
CREATE TABLE IF NOT EXISTS revenue_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  business_idea text NOT NULL,
  industry text,
  target_market text,
  customer_segments text,
  analysis_result jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE revenue_models ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own revenue models"
  ON revenue_models
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Generated content table
CREATE TABLE IF NOT EXISTS generated_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type text NOT NULL,
  tone text,
  topic text,
  target_audience text,
  keywords text,
  generated_content text,
  word_count integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE generated_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own generated content"
  ON generated_content
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Collaboration sessions table
CREATE TABLE IF NOT EXISTS collaboration_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  participants uuid[] NOT NULL,
  session_type text DEFAULT 'editing',
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  duration_minutes integer,
  activities jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE collaboration_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view collaboration sessions they participate in"
  ON collaboration_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = ANY(participants));

CREATE POLICY "Users can create collaboration sessions"
  ON collaboration_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = ANY(participants));

-- Feature usage analytics table
CREATE TABLE IF NOT EXISTS feature_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  feature_id text NOT NULL,
  feature_name text NOT NULL,
  feature_category text,
  usage_count integer DEFAULT 1,
  last_used_at timestamptz DEFAULT now(),
  total_time_spent integer DEFAULT 0,
  success_rate numeric DEFAULT 100.0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, feature_id)
);

ALTER TABLE feature_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own feature usage"
  ON feature_usage
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Enterprise deployments table
CREATE TABLE IF NOT EXISTS enterprise_deployments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL,
  feature_id text NOT NULL,
  feature_name text NOT NULL,
  deployment_status text DEFAULT 'planned',
  implementation_phase text,
  estimated_completion timestamptz,
  actual_completion timestamptz,
  roi_percentage numeric,
  user_adoption_rate numeric,
  deployment_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE enterprise_deployments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Organization members can view their deployments"
  ON enterprise_deployments
  FOR SELECT
  TO authenticated
  USING (true); -- Will be refined with organization membership

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_competitor_analyses_user_id ON competitor_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_competitor_analyses_created_at ON competitor_analyses(created_at);
CREATE INDEX IF NOT EXISTS idx_pitch_analyses_user_id ON pitch_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_market_analyses_user_id ON market_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_revenue_models_user_id ON revenue_models(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_content_user_id ON generated_content(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_content_type ON generated_content(content_type);
CREATE INDEX IF NOT EXISTS idx_collaboration_sessions_project_id ON collaboration_sessions(project_id);
CREATE INDEX IF NOT EXISTS idx_feature_usage_user_id ON feature_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_feature_usage_feature_id ON feature_usage(feature_id);
CREATE INDEX IF NOT EXISTS idx_enterprise_deployments_org_id ON enterprise_deployments(organization_id);

-- Add full-text search capabilities
CREATE INDEX IF NOT EXISTS idx_generated_content_search ON generated_content USING gin(to_tsvector('english', generated_content));
CREATE INDEX IF NOT EXISTS idx_startup_ideas_search ON startup_ideas USING gin(to_tsvector('english', title || ' ' || description));

-- Update function for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_competitor_analyses_updated_at
  BEFORE UPDATE ON competitor_analyses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pitch_analyses_updated_at
  BEFORE UPDATE ON pitch_analyses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_market_analyses_updated_at
  BEFORE UPDATE ON market_analyses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_revenue_models_updated_at
  BEFORE UPDATE ON revenue_models
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_generated_content_updated_at
  BEFORE UPDATE ON generated_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_feature_usage_updated_at
  BEFORE UPDATE ON feature_usage
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enterprise_deployments_updated_at
  BEFORE UPDATE ON enterprise_deployments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();