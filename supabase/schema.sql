-- ============================================================================
-- CampusOS — City University Database Schema
-- Built for Supabase (PostgreSQL with Row Level Security & Triggers)
-- ============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. USERS TABLE (Extends Supabase auth.users)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    student_id TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    batch TEXT NOT NULL, -- e.g. "Class of 2026", "2023-2027"
    department TEXT DEFAULT 'Computer Science',
    role TEXT DEFAULT 'student' CHECK (role IN ('student', 'club_admin', 'faculty', 'admin')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for instant lookup by student ID and email
CREATE INDEX IF NOT EXISTS idx_users_student_id ON public.users(student_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- ----------------------------------------------------------------------------
-- 2. EVENTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    club_name TEXT NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    max_capacity INTEGER DEFAULT 150,
    created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(date);
CREATE INDEX IF NOT EXISTS idx_events_club_name ON public.events(club_name);

-- ----------------------------------------------------------------------------
-- 3. RSVPS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    qr_code_hash TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'checked_in', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_event_rsvp UNIQUE(user_id, event_id)
);

CREATE INDEX IF NOT EXISTS idx_rsvps_user_id ON public.rsvps(user_id);
CREATE INDEX IF NOT EXISTS idx_rsvps_event_id ON public.rsvps(event_id);
CREATE INDEX IF NOT EXISTS idx_rsvps_qr_code_hash ON public.rsvps(qr_code_hash);

-- ----------------------------------------------------------------------------
-- 4. RESOURCES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    course_code TEXT NOT NULL,
    resource_type TEXT NOT NULL CHECK (resource_type IN ('Exam Paper', 'Lecture Notes', 'Lab Guide', 'Syllabus', 'Reference Book', 'Software Spec')),
    file_url TEXT NOT NULL,
    uploaded_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_resources_course_code ON public.resources(course_code);
CREATE INDEX IF NOT EXISTS idx_resources_department ON public.resources(department);

-- ----------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Public profiles are viewable by authenticated users"
    ON public.users FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can update their own profile"
    ON public.users FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

-- Events policies
CREATE POLICY "Events are viewable by all students"
    ON public.events FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Authenticated users can create events"
    ON public.events FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = created_by);

-- RSVPs policies
CREATE POLICY "Users can view their own RSVPs"
    ON public.rsvps FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own RSVP"
    ON public.rsvps FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can cancel their own RSVP"
    ON public.rsvps FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Resources policies
CREATE POLICY "Resources are readable by all authenticated users"
    ON public.resources FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Authenticated users can upload resources"
    ON public.resources FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = uploaded_by);

-- ----------------------------------------------------------------------------
-- 6. AUTOMATIC USER PROFILE SYNC TRIGGER
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (
        id,
        email,
        student_id,
        full_name,
        batch,
        role
    )
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'student_id', 'CU-' || UPPER(SUBSTRING(new.id::text, 1, 6))),
        COALESCE(new.raw_user_meta_data->>'full_name', SPLIT_PART(new.email, '@', 1)),
        COALESCE(new.raw_user_meta_data->>'batch', 'Class of 2026'),
        COALESCE(new.raw_user_meta_data->>'role', 'student')
    )
    ON CONFLICT (id) DO UPDATE
    SET
        student_id = EXCLUDED.student_id,
        full_name = EXCLUDED.full_name,
        batch = EXCLUDED.batch;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if already exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 7. INITIAL HACKATHON SEED DATA
-- ----------------------------------------------------------------------------
INSERT INTO public.events (title, club_name, date, location, description, category, max_capacity)
VALUES
    ('CityHack 2026: 24-Hour Innovation Sprint', 'CityUni Developer Club & ACM', NOW() + INTERVAL '2 days', 'Great Hall & Innovation Pavilion', 'The premier annual 24h innovation hackathon with $15K in prizes.', 'Hackathon', 500),
    ('Generative AI & Agentic Workflows Workshop', 'City AI Research Society', NOW() + INTERVAL '1 day', 'Engineering Atrium 101', 'Build autonomous agents with multimodal models and function calling.', 'Tech & AI', 160),
    ('Founders Coffee & Startup Pitch Mixer', 'City Venture Incubator', NOW() + INTERVAL '3 days', 'Founders Lounge, 3rd Floor', 'Pitch ideas to alumni angel investors and meet student co-founders.', 'Career', 90)
ON CONFLICT DO NOTHING;

INSERT INTO public.resources (title, department, course_code, resource_type, file_url)
VALUES
    ('CS 381: Distributed Systems Midterm Review & Solutions (2025)', 'Computer Science', 'CS 381', 'Exam Paper', 'https://cityuni.edu/vault/cs381-midterm-sol.pdf'),
    ('DS 420: Deep Learning & Ethics Lecture Notes & Notebooks', 'Data Science', 'DS 420', 'Lecture Notes', 'https://cityuni.edu/vault/ds420-notes.pdf'),
    ('MTH 310: Applied Probability Stochastic Modeling Problem Sets', 'Mathematics', 'MTH 310', 'Lab Guide', 'https://cityuni.edu/vault/mth310-psets.pdf')
ON CONFLICT DO NOTHING;
