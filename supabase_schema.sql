-- ============================================================
-- City University CampusOS - Supabase Database Schema
-- Run this script in the Supabase SQL Editor to initialize all tables
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES / USERS TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  student_id TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  batch TEXT NOT NULL,
  department TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'club_admin', 'faculty', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  organizer TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  attendees_count INTEGER DEFAULT 0,
  max_capacity INTEGER NOT NULL DEFAULT 100,
  tags TEXT[] DEFAULT '{}',
  description TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RSVPS TABLE
CREATE TABLE IF NOT EXISTS public.rsvps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id TEXT REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_id TEXT NOT NULL,
  student_name TEXT NOT NULL,
  qr_code_hash TEXT NOT NULL,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'checked_in', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, student_id)
);

-- 4. ACADEMIC RESOURCES TABLE
CREATE TABLE IF NOT EXISTS public.academic_resources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  course_code TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  uploaded_by TEXT NOT NULL,
  uploaded_at TEXT NOT NULL,
  file_size TEXT DEFAULT '~',
  downloads INTEGER DEFAULT 0,
  semester TEXT,
  year TEXT,
  tags TEXT[] DEFAULT '{}',
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. LOST AND FOUND TABLE
CREATE TABLE IF NOT EXISTS public.lost_found_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  date TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Open', 'Claimed', 'Resolved')),
  type TEXT NOT NULL CHECK (type IN ('Lost', 'Found')),
  contact TEXT NOT NULL,
  description TEXT NOT NULL,
  reporter_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. COMPLAINTS TABLE
CREATE TABLE IF NOT EXISTS public.complaints (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  date TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Submitted', 'In Review', 'Resolved')),
  priority TEXT NOT NULL CHECK (priority IN ('Normal', 'Urgent')),
  description TEXT NOT NULL,
  student_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SHUTTLE BUS SCHEDULE TABLE
CREATE TABLE IF NOT EXISTS public.shuttle_routes (
  id TEXT PRIMARY KEY,
  route_name TEXT NOT NULL,
  start_point TEXT NOT NULL,
  destination TEXT NOT NULL,
  departure_times TEXT[] NOT NULL,
  bus_number TEXT NOT NULL,
  driver_name TEXT,
  driver_phone TEXT,
  active BOOLEAN DEFAULT TRUE,
  notes TEXT
);

-- ENABLE ROW LEVEL SECURITY (RLS) FOR PUBLIC READ/WRITE DEMO
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lost_found_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shuttle_routes ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read & write for Hackathon demonstration
CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public profiles write" ON public.profiles FOR ALL USING (true);

CREATE POLICY "Public events read" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public events write" ON public.events FOR ALL USING (true);

CREATE POLICY "Public rsvps read" ON public.rsvps FOR SELECT USING (true);
CREATE POLICY "Public rsvps write" ON public.rsvps FOR ALL USING (true);

CREATE POLICY "Public resources read" ON public.academic_resources FOR SELECT USING (true);
CREATE POLICY "Public resources write" ON public.academic_resources FOR ALL USING (true);

CREATE POLICY "Public lost_found read" ON public.lost_found_items FOR SELECT USING (true);
CREATE POLICY "Public lost_found write" ON public.lost_found_items FOR ALL USING (true);

CREATE POLICY "Public complaints read" ON public.complaints FOR SELECT USING (true);
CREATE POLICY "Public complaints write" ON public.complaints FOR ALL USING (true);

CREATE POLICY "Public shuttle read" ON public.shuttle_routes FOR SELECT USING (true);
CREATE POLICY "Public shuttle write" ON public.shuttle_routes FOR ALL USING (true);
