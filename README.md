# 🎓 CampusOS — City University
### *The Unified Digital Campus Operating System for City University Students & Administration*

[![Live Demo](https://img.shields.io/badge/Live_Deployment-Active-emerald?logo=vercel&style=for-the-badge)](https://campusos-cityuni.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?logo=next.js&style=for-the-badge)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&style=for-the-badge)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss&style=for-the-badge)](https://tailwindcss.com/)
[![Supabase Database](https://img.shields.io/badge/Supabase-Live_PostgreSQL_DB-3ECF8E?logo=supabase&style=for-the-badge)](https://supabase.com/)
[![Google Gemini AI](https://img.shields.io/badge/Google_Gemini_AI-Streaming_AI-4285F4?logo=google&style=for-the-badge)](https://ai.google.dev/)

> **CPCCU AI-Powered Web App Development & Deployment Hackathon 2026**  
> Built for City University (Dhaka, Bangladesh) — *"One URL. Everything campus."*

---

## 🔗 Live Deployment & Submission Links

| Resource | URL | Status |
|---|---|---|
| 🌐 **Production URL** | **[https://campusos-cityuni.vercel.app](https://campusos-cityuni.vercel.app)** | ✅ **LIVE & VERIFIED** |
| 📂 **GitHub Repository** | **[github.com/cpccu/BNT_Hachathon_CampusOS](https://github.com/cpccu/BNT_Hachathon_CampusOS)** | ✅ Up to date with `main` |
| 👑 **Admin Console** | **[https://campusos-cityuni.vercel.app/admin](https://campusos-cityuni.vercel.app/admin)** | ✅ Comprehensive management console |
| 🚌 **Shuttle Bus Schedule** | **[https://campusos-cityuni.vercel.app/shuttle](https://campusos-cityuni.vercel.app/shuttle)** | ✅ Live timetable for Routes A, B & C |
| 🎬 **Demo Video** | *(Google Drive link included in submission form)* | 🎥 3-Minute Walkthrough Video |

---

## 🔑 Demo Login Credentials (1-Click Judge Access)

Evaluators can click the **Instant 1-Click Evaluation Buttons** directly from the **[Public Landing Page](https://campusos-cityuni.vercel.app)** or the **[`/login`](https://campusos-cityuni.vercel.app/login)** page to switch personas without typing:

| Persona | Role | Email | Password | Permissions & Access |
|---|---|---|---|---|
| **Junaid Parvez** | `student` | `student@cityuniversity.edu.bd` | `demo1234` | Student Dashboard, Appearing Soon / Cancelled routine alerts, Event RSVPs & QR Passes, Resource Vault, Lost & Found, Smart AI Helpdesk |
| **Abir Chowdhury** | `club_admin` | `admin@cpccu.edu.bd` | `demo1234` | CPCCU Club Lead, Event Creation Modal, Attendee Lists, Resource Contributions |
| **Dr. Mahfuz Rahman** | `admin` | `admin@cityuniversity.edu.bd` | `admin1234` | Super Admin Console (`/admin`), Event Moderation, User Role Switching, Global Broadcast Alerts |

---

## 🌟 Key Upgrades & Competitive Advantage

| Feature / Dimension | Other Competitors | **CampusOS (City University)** |
| :--- | :--- | :--- |
| **Cloud Database** | Static mock data or simulated UI | **REAL Live Supabase PostgreSQL** database with live RLS & instant multi-device synchronization across phones & laptops |
| **AI Virtual Assistant** | Hardcoded questions or basic bot | **Google Gemini AI streaming chat** trained specifically on City University routines, bus stops, and academic rules |
| **Role-Based Security** | Unprotected frontend buttons | **Strict Gatekeeper Architecture (`ProtectedRoute`)** with isolated Auth Navbar on `/login` and `/signup` |
| **Command Search** | Basic table search | **Global Command Palette (`Ctrl + K`)** accessible from a responsive search icon button on all mobile and desktop screens |
| **Academic Alerts** | Static timetable | **Appearing Soon Alert & Cancelled Class Notice** with reasons (e.g. faculty attending hackathons) integrated into the live notification bell |

---

## 🚀 Core Modules Built & Operational

### 1. 🏛️ Public University Showcase (`/` for visitors)
- Comprehensive landing page detailing City University's vision, Birulia campus facilities, 48+ student clubs, and free transit.
- Instant 1-click evaluator bypass for hackathon judges.
- Seamless redirection into the personalized dashboard upon login.

### 2. 📊 Role-Based Smart Dashboard (`/` for authenticated users)
- **Appearing Soon Card:** Highlights `DS 420: Deep Learning` starting in 20m (Room B12, Prof. Kamal Hossain).
- **Class Cancellation Notice:** Prominently strikes out cancelled sessions (`CSE 315`) with official faculty reason notices.
- Live system telemetry, study pod availability counters, and quick service request dispatchers.

### 3. 🎉 Club & Event Engine with QR Ticket Generation (`/events`)
- Unified feed across all clubs (CPCCU, Cultural Club, Robotics Club, Debate Club, Sports Club).
- Filter by category (Hackathons, Workshops, Cultural Fests).
- Instant RSVP with automatic cryptographically hashed **QR Code Entry Pass**.
- **Role-Gated Security:** Event creation modal is strictly reserved for verified `club_admin` and `admin` personas.

### 4. 🚌 Shuttle Bus Schedule & Route Navigator (`/shuttle`)
- Dedicated timetable for **Route A (Mirpur)**, **Route B (Gulshan/Mohakhali)**, and **Route C (Uttara)**.
- Bidirectional stoppage reversal toggle (*From Campus → City* vs *City → To Campus*).
- Stoppage sequences, bus numbers, driver contacts, and travel guidelines.

### 5. 📚 Academic Vault & Resource Hub (`/resources`)
- Searchable database of authentic City University question papers and lecture notes for CSE and EEE.
- Fuzzy filtering by Course Code (e.g., `CSE 201`, `EEE 101`).
- Community upload form for submitting notes and exam guides.

### 6. 🔍 Real-Time Multi-Device Lost & Found (`/lost-and-found`)
- Powered by a live Supabase PostgreSQL backend.
- Any item reported on one phone/laptop appears on other devices upon refresh.
- Unified campus feed to report lost possessions, log found items, or file campus complaints.

### 7. 🤖 Smart Helpdesk AI (`/helpdesk`)
- Powered by Google Gemini (`@google/generative-ai`) with resilient multi-tier fallback.
- Contextually trained on City University's complete institutional knowledge base:
  - Class routines for CSE Batches 64, 65, and 66
  - Departmental curricula (CSE, EEE, DBA, Textile, Mechanical)
  - Shuttle bus schedules and SafeWalk security procedures
  - Credit fees, waiver guidelines, and administrative contacts

### 8. 👑 Central Management Console (`/admin`)
- Centralized administration for university officials.
- Live event moderation, user role promotion (`student` ↔ `club_admin` ↔ `admin`), and emergency broadcast banner dispatch.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies Used |
|---|---|
| **Frontend Framework** | Next.js 14 (App Router, React 18) |
| **Language** | TypeScript 5 (Strict Mode) |
| **Styling** | Tailwind CSS 3, Glassmorphism, Responsive Mobile/Tablet Drawer |
| **Database** | Live Supabase PostgreSQL with Row Level Security (RLS) + LocalDB Fallback |
| **AI Engine** | Google Gemini API (`@google/generative-ai`), Serverless Edge routes |
| **QR Engine** | `qrcode` SVG/Canvas encoding |
| **Deployment** | Vercel Edge Cloud Production (`https://campusos-cityuni.vercel.app`) |

---

## 💻 Local Setup Instructions

```bash
# 1. Clone repository
git clone https://github.com/cpccu/BNT_Hachathon_CampusOS.git
cd BNT_Hachathon_CampusOS

# 2. Install dependencies
npm install

# 3. Set environment variables
# Create .env.local with your keys:
echo "NEXT_PUBLIC_SUPABASE_URL=your_supabase_url" >> .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key" >> .env.local
echo "GEMINI_API_KEY=your_gemini_api_key" >> .env.local

# 4. Start development server
npm run dev

# 5. Production build check
npm run build
```

---

## 👥 Hackathon Team

**Team Name:** BNT  
**Hackathon:** CPCCU AI-Powered Web App Development & Deployment Hackathon 2026  
**Institution:** City University, Dhaka, Bangladesh  

*© 2026 City University • CampusOS System. Built for student empowerment and campus innovation.*