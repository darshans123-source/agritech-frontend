-- Supabase KrishiSmart Database Schema
-- Run this in your Supabase SQL Editor

-- 1. Users Profile (tied to auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  "preferredLanguage" TEXT,
  "defaultCity" TEXT,
  "selectedState" TEXT,
  "selectedCrop" TEXT,
  "cropAdvice" TEXT,
  "chartData" JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own profile" ON public.users
  FOR ALL USING (auth.uid() = id);

-- 2. Status (Online presence and last active)
CREATE TABLE IF NOT EXISTS public.status (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  "userName" TEXT,
  "lastActive" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  status TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);
ALTER TABLE public.status ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read status" ON public.status FOR SELECT USING (true);
CREATE POLICY "Users can update their own status" ON public.status FOR ALL USING (auth.uid() = user_id);

-- 3. Updates (Alerts, Market News, Market Stats - Upserted per user & type)
CREATE TABLE IF NOT EXISTS public.updates (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  data JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  UNIQUE(user_id, type)
);
ALTER TABLE public.updates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own updates" ON public.updates FOR ALL USING (auth.uid() = user_id);

-- 4. Chats (AI Assistant History)
CREATE TABLE IF NOT EXISTS public.chats (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own chats" ON public.chats FOR ALL USING (auth.uid() = user_id);

-- 5. Diagnosis (Soil/Pest analysis results)
CREATE TABLE IF NOT EXISTS public.diagnosis (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  result TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  UNIQUE(user_id, type)
);
ALTER TABLE public.diagnosis ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own diagnosis" ON public.diagnosis FOR ALL USING (auth.uid() = user_id);

-- 6. Simulations (AI Farm Twin configurations & results)
CREATE TABLE IF NOT EXISTS public.simulations (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  crop TEXT,
  "plantingDate" TEXT,
  area NUMERIC,
  result TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);
ALTER TABLE public.simulations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own simulations" ON public.simulations FOR ALL USING (auth.uid() = user_id);

-- 7. Inventory
CREATE TABLE IF NOT EXISTS public.inventory (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  quantity NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  category TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own inventory" ON public.inventory FOR ALL USING (auth.uid() = user_id);

-- 8. Forum (Community Posts)
CREATE TABLE IF NOT EXISTS public.forum (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  "userName" TEXT,
  "userAvatar" TEXT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::jsonb,
  "likesCount" INTEGER DEFAULT 0,
  "likedBy" JSONB DEFAULT '[]'::jsonb,
  "commentCount" INTEGER DEFAULT 0,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);
ALTER TABLE public.forum ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read forum posts" ON public.forum FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert forum posts" ON public.forum FOR INSERT WITH CHECK (auth.uid() = user_id);
-- Allow users to update likesCount and likedBy even if they are not the author
CREATE POLICY "Authenticated users can update forum posts" ON public.forum FOR UPDATE USING (auth.uid() IS NOT NULL);

-- 9. Forum Comments
CREATE TABLE IF NOT EXISTS public.forum_comments (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  post_id UUID REFERENCES public.forum(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  "userName" TEXT,
  content TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);
ALTER TABLE public.forum_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read forum comments" ON public.forum_comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert forum comments" ON public.forum_comments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Apply changes to realtime publications
begin;
  -- remove the supabase_realtime publication
  drop publication if exists supabase_realtime;

  -- re-create the publication but don't enable it for any tables
  create publication supabase_realtime;
commit;

-- add tables to the publication
alter publication supabase_realtime add table public.status;
alter publication supabase_realtime add table public.forum;
alter publication supabase_realtime add table public.forum_comments;
