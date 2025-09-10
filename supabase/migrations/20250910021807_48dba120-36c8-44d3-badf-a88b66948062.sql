-- Add missing fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN company_name TEXT,
ADD COLUMN location TEXT;

-- Create startup_ideas table
CREATE TABLE public.startup_ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  target_audience TEXT,
  revenue_model TEXT,
  market_size TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on startup_ideas
ALTER TABLE public.startup_ideas ENABLE ROW LEVEL SECURITY;

-- Create policies for startup_ideas
CREATE POLICY "Users can view their own startup ideas" 
ON public.startup_ideas 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own startup ideas" 
ON public.startup_ideas 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own startup ideas" 
ON public.startup_ideas 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own startup ideas" 
ON public.startup_ideas 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_startup_ideas_updated_at
BEFORE UPDATE ON public.startup_ideas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();