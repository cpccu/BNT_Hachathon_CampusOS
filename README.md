# 🎓 CampusOS — City University

**The Unified Digital Student Operating System for City University.**  
Engineered for speed, collaboration, and high productivity for the **City University 24-Hour Hackathon**.

---

## ⚡ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Client Interactivity)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security, Triggers & Auth)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with collegiate themes & custom design tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript (Strict mode enabled)
- **Font**: Inter with system-ui fallbacks

---

## 🗄️ Database Schema (`supabase/schema.sql`)

The database schema is fully defined in [`supabase/schema.sql`](file:///c:/CampusOS-CityUni/supabase/schema.sql) and ready to run in the Supabase SQL Editor:

### 1. `users` Table
- `id`: UUID (Primary Key, references `auth.users(id)`)
- `student_id`: TEXT (Unique, e.g. `CU-892401`)
- `email`: TEXT (Unique, e.g. `jordan.patel@cityuni.edu`)
- `full_name`: TEXT
- `batch`: TEXT (e.g. `Class of 2026`)
- `department`: TEXT (`Computer Science`, etc.)
- `role`: TEXT (`student`, `club_admin`, `faculty`, `admin`)
- Includes auto-profile trigger syncing from `auth.users` on sign-up.

### 2. `events` Table
- `id`: UUID (Primary Key)
- `title`: TEXT
- `club_name`: TEXT
- `date`: TIMESTAMPTZ
- `location`: TEXT
- `description`: TEXT
- `category`: TEXT (`Hackathon`, `Tech & AI`, `Career`, `Social`, `Sports`)
- `max_capacity`: INTEGER
- `created_by`: UUID (references `users(id)`)

### 3. `rsvps` Table
- `id`: UUID (Primary Key)
- `user_id`: UUID (references `users(id)`)
- `event_id`: UUID (references `events(id)`)
- `qr_code_hash`: TEXT (Unique, verification hash for entry scan)
- `status`: TEXT (`confirmed`, `checked_in`, `cancelled`)
- Unique constraint on `(user_id, event_id)`

### 4. `resources` Table
- `id`: UUID (Primary Key)
- `title`: TEXT
- `department`: TEXT
- `course_code`: TEXT (e.g. `CS 381`, `DS 420`)
- `resource_type`: TEXT (`Exam Paper`, `Lecture Notes`, `Lab Guide`, `Syllabus`, `Software Spec`)
- `file_url`: TEXT
- `uploaded_by`: UUID (references `users(id)`)

---

## 🔐 Authentication & Session Flow

- **Sign-Up Page** (`/signup`): Student registration with Full Name, Student ID (`CU-XXXXXX`), City University Email, Batch/Year, Department, and Password. Includes instant "Auto-fill Sample Student" for hackathon testing.
- **Log-In Page** (`/login`): Single sign-on with credentials or **1-Click Hackathon Evaluator Login** (`Jordan Patel` or `Alex Chen (ACM Lead)`).
- **Dual Mode**: Works directly connected to Supabase (`.env.local`), and gracefully defaults to an interactive offline session demo if credentials are not yet entered.
- **Navbar Profile Dropdown**: Shows authenticated student badge, student ID, batch, and instant sign-out.

---

## 📱 Core Pages

1. **Home Dashboard** (`/`): Dynamic student greeting, lecture schedule tracker, flagship hackathon card, live campus bulletins, facility radar, and quick tools.
2. **Club & Event Engine** (`/events`): Dual-mode switch for Events vs Clubs, real-time search, category filters, interactive RSVP counter with QR code entry pass generation.
3. **Resource Hub** (`/resources`): Academic Course Vault for past exams/notes and live 24/7 facility booking (study pods, GPU Slurm nodes, SafeWalk dispatch).
4. **Sign-Up** (`/signup`) & **Log-In** (`/login`): Modern auth pages branded for City University.

---

## 🚀 Environment Setup & Run

1. Copy `.env.example` to `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

2. Run the SQL schema in your Supabase SQL Editor:
Open [`supabase/schema.sql`](file:///c:/CampusOS-CityUni/supabase/schema.sql) and execute the script.

3. Start development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
