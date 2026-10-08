# 🎓 CampusOS — City University
### *The Unified Digital Campus Operating System for City University Students & Administration*

[![Live Demo](https://img.shields.io/badge/Live_Deployment-Active-emerald?logo=vercel&style=for-the-badge)](https://campusos-cityuni.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?logo=next.js&style=for-the-badge)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&style=for-the-badge)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss&style=for-the-badge)](https://tailwindcss.com/)
[![Google Gemini AI](https://img.shields.io/badge/Google_Gemini_AI-Powered-4285F4?logo=google&style=for-the-badge)](https://ai.google.dev/)

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
| 🎬 **Demo Video** | *(Google Drive link included in submission form)* | 🎥 Walkthrough available |

---

## 🔑 Demo Login Credentials (1-Click Judge Access)

Evaluators can click the **Instant 1-Click Evaluation Buttons** on the [`/login`](https://campusos-cityuni.vercel.app/login) page to switch roles instantly without typing:

| Persona | Role | Email | Password | Permissions & Access |
|---|---|---|---|---|
| **Junaid Parvez** | `student` | `student@cityuniversity.edu.bd` | `demo1234` | Student Dashboard, Event RSVPs & QR Passes, Resource Vault, Lost & Found, Smart AI Helpdesk |
| **Abir Chowdhury** | `club_admin` | `admin@cpccu.edu.bd` | `demo1234` | CPCCU Club Lead, Event Creation Modal, Attendee Lists, Resource Contributions |
| **Dr. Mahfuz Rahman** | `admin` | `admin@cityuniversity.edu.bd` | `admin1234` | Full Admin Console (`/admin`), Event Moderation, User Role Switching, Broadcast Alerts |

---

## 🧑‍🎓 Real-World Student User Scenarios

To demonstrate how CampusOS directly addresses the daily pain points of City University students:

### Scenario 1: A First-Year Student the Night Before an Exam
> **Persona:** *Sadia, CSE Batch 69 (1st year, Autumn trimester)*  
> It is 11:30 PM the night before the CSE 201 (Data Structures) midterm exam. The official department notice board is closed, and past questions in unofficial Messenger group chats are buried under hundreds of messages.  
> **With CampusOS:** Sadia opens [`/resources`](https://campusos-cityuni.vercel.app/resources), types `CSE 201`, and instantly finds the verified Midterm 2024 and 2025 question papers with downloadable answer guides.

### Scenario 2: Morning Rush & Shuttle Route Confusion
> **Persona:** *Tanvir, EEE Batch 66 (Commuter from Mirpur)*  
> Tanvir needs to know if the 9:00 AM shuttle bus from Mirpur 10 circle is on schedule. In the past, he had to call multiple classmates or hope for a Facebook post.  
> **With CampusOS:** Tanvir visits [`/shuttle`](https://campusos-cityuni.vercel.app/shuttle) to view the designated departure timetable for Route A (Mirpur Express), check designated stoppages, and view the driver's phone number directly.

### Scenario 3: Lost Student ID Card at Campus Cafeteria
> **Persona:** *Farhan, DBA Batch 65*  
> Farhan accidentally leaves his plastic campus ID card at the 1st-floor cafeteria.  
> **With CampusOS:** Another student finds the card and posts it on [`/lost-and-found`](https://campusos-cityuni.vercel.app/lost-and-found) under "Found Items". Farhan checks the centralized feed, filters by "Documents", claims the item, and receives the finder's contact details immediately.

### Scenario 4: Fast Contactless Hackathon Check-In
> **Persona:** *Junaid, Participant in CPCCU Hackathon '26*  
> When Junaid arrives at the Innovation Pavilion door, he opens [`/events`](https://campusos-cityuni.vercel.app/events) and displays his digital QR ticket. The event organizer scans the QR code, marking his status as `Checked-In` in the event database with an official audit timestamp.

---

## 🚀 Core Modules Built & Operational

### 1. 📊 Role-Based Smart Dashboard (`/`)
- Dynamic layout adapting to Student, Club Admin, and Super Admin roles.
- Real-time routine highlights, next upcoming classes, and quick actions.

### 2. 🎉 Club & Event Engine with QR Ticket Generation (`/events`)
- Unified feed across all clubs (CPCCU, Cultural Club, Robotics Club, Debate Club, Sports Club).
- Filter by category (Hackathons, Workshops, Cultural Fests).
- Instant RSVP with automatic cryptographically hashed **QR Code Entry Pass**.
- Real check-in recording that persists attendee check-in timestamps to the database.

### 3. 🚌 Shuttle Bus Schedule & Route Navigator (`/shuttle`)
- Dedicated timetable for **Route A (Mirpur)**, **Route B (Gulshan/Mohakhali)**, and **Route C (Uttara)**.
- Direction toggle (*From Campus → City* vs *City → To Campus*).
- Stoppage sequences, bus numbers, driver contacts, and travel guidelines.

### 4. 📚 Academic Vault & Resource Hub (`/resources`)
- Searchable database of 25+ authentic City University question papers and lecture notes for CSE and EEE.
- Fuzzy filtering by Course Code (e.g., `CSE 201`, `EEE 101`).
- Community upload form for submitting notes and exam guides.

### 5. 🔍 Lost & Found / Complaint Box (`/lost-and-found`)
- Unified campus feed to report lost possessions, log found items, or file campus complaints.
- Real-time status tracking (Open, Claimed, Resolved).
- Persistent data layer ensuring posts remain accessible across page reloads.

### 6. 🤖 Smart Helpdesk AI (`/helpdesk`)
- Powered by Google Gemini (`gemini-3.8-flash` with resilient multi-tier fallback).
- Contextually trained on City University's complete institutional knowledge base:
  - Class routines for CSE Batches 64, 65, and 66
  - Departmental curricula (CSE, EEE, DBA, Textile, Mechanical)
  - Shuttle bus schedules and SafeWalk security procedures
  - Credit fees, waiver guidelines, and administrative contacts

### 7. 👑 Central Management Console (`/admin`)
- Centralized administration for university officials.
- Live event moderation, user role promotion (`student` ↔ `club_admin` ↔ `admin`), and campus alerts.
- Fully synchronized with the shared database layer.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies Used |
|---|---|
| **Frontend Framework** | Next.js 14 (App Router, React 18) |
| **Language** | TypeScript 5 (Strict Mode) |
| **Styling** | Tailwind CSS 3, Responsive Glassmorphism, Dark & Light Mode |
| **AI Engine** | Google Gemini API (`@google/generative-ai`), Serverless API routes |
| **QR Engine** | `qrcode` SVG/Canvas encoding |
| **Database Architecture** | Asynchronous LocalDB persistence layer + Supabase PostgreSQL schema ready (`supabase_schema.sql`) |
| **Deployment** | Vercel Serverless Edge Platform |

---

## 💻 Local Setup Instructions

```bash
# 1. Clone repository
git clone https://github.com/cpccu/BNT_Hachathon_CampusOS.git
cd BNT_Hachathon_CampusOS

# 2. Install dependencies
npm install

# 3. Set environment variable
# Create .env.local with your Gemini API key:
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env.local

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