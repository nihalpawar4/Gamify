-- ═══════════════════════════════════════════════════════
-- TECHNO GAMES v3.1 — SUPABASE SCHEMA SETUP
-- Run this in your Supabase SQL Editor
-- ═══════════════════════════════════════════════════════

-- ─── 1. CONTACTS TABLE ──────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can insert contacts" ON contacts;
CREATE POLICY "Anyone can insert contacts" ON contacts FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Authenticated read contacts" ON contacts;
CREATE POLICY "Authenticated read contacts" ON contacts FOR SELECT USING (auth.role() = 'authenticated');

-- ─── 2. USER PROFILES TABLE ────────────────────────
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT DEFAULT '',
  username TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  credits INTEGER DEFAULT 100,
  is_subscribed BOOLEAN DEFAULT FALSE,
  subscription_tier TEXT DEFAULT 'free',
  preferred_language TEXT DEFAULT 'c',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users read own profile" ON user_profiles;
CREATE POLICY "Users read own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users update own profile" ON user_profiles;
CREATE POLICY "Users update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users insert own profile" ON user_profiles;
CREATE POLICY "Users insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);
DROP POLICY IF EXISTS "Public read profiles" ON user_profiles;
CREATE POLICY "Public read profiles" ON user_profiles FOR SELECT USING (true);

-- ─── 3. GAME SCORES TABLE ─────────────────────────
CREATE TABLE IF NOT EXISTS game_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT DEFAULT '',
  game TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  language TEXT DEFAULT 'javascript',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE game_scores ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone read scores" ON game_scores;
CREATE POLICY "Anyone read scores" ON game_scores FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth users insert scores" ON game_scores;
CREATE POLICY "Auth users insert scores" ON game_scores FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Auth users update own scores" ON game_scores;
CREATE POLICY "Auth users update own scores" ON game_scores FOR UPDATE USING (auth.uid() = user_id);

-- ─── 4. COMPLETED CHALLENGES TABLE ─────────────────
CREATE TABLE IF NOT EXISTS completed_challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_key TEXT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, challenge_key)
);

ALTER TABLE completed_challenges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users read own challenges" ON completed_challenges;
CREATE POLICY "Users read own challenges" ON completed_challenges FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users insert own challenges" ON completed_challenges;
CREATE POLICY "Users insert own challenges" ON completed_challenges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ─── 5. SOLUTION VIEWS TABLE ───────────────────────
CREATE TABLE IF NOT EXISTS solution_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_key TEXT NOT NULL,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE solution_views ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users read own views" ON solution_views;
CREATE POLICY "Users read own views" ON solution_views FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users insert own views" ON solution_views;
CREATE POLICY "Users insert own views" ON solution_views FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ─── 6. TRIGGER: Auto-create profile on signup ─────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, username, credits, is_subscribed, subscription_tier, preferred_language)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(
      NEW.raw_user_meta_data->>'preferred_username',
      NEW.raw_user_meta_data->>'user_name',
      NEW.raw_user_meta_data->>'name',
      CASE WHEN NEW.is_anonymous THEN 'guest_' || substr(NEW.id::text, 1, 8)
           ELSE split_part(COALESCE(NEW.email, 'user'), '@', 1)
      END
    ),
    100,
    FALSE,
    'free',
    'c'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── 7. ENABLE REALTIME ────────────────────────────
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE contacts;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE game_scores;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE user_profiles;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ═══════════════════════════════════════════════════════
-- SETUP: Enable Anonymous sign-ins + Google OAuth in Dashboard
-- ═══════════════════════════════════════════════════════
