import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// ============================================================
// CITY UNIVERSITY KNOWLEDGE BASE
// The richer this is, the smarter the AI replies instantly.
// ============================================================
const CAMPUS_KNOWLEDGE_BASE = `
=== CITY UNIVERSITY - CAMPUSOS KNOWLEDGE BASE ===

--- ABOUT THE UNIVERSITY ---
Name: City University (CityUni)
Location: Dhaka, Bangladesh
Website: cityuniversity.edu.bd
Type: Private University
Founded: 2002
Vision: To become a world-class institution producing globally competitive graduates.

--- DEPARTMENTS ---
1. CSE  - Computer Science & Engineering (Most popular, tech-focused)
2. EEE  - Electrical & Electronic Engineering
3. DBA  - Department of Business Administration (BBA, MBA programs)
4. Textile - Textile Engineering
5. Mechanical - Mechanical Engineering
6. English - Department of English (Literature & Language)

--- STUDENT BATCHES ---
Active batches: 62, 63, 64, 65, 66, 67, 68, 69
- Batch 62 is the most senior (final year students)
- Batch 69 is the most junior (1st year / newest students)
- Each batch is identified by their enrollment year
- Format: e.g. "CSE Batch 65" or "EEE 67"

--- CSE DEPARTMENT CLASS ROUTINES (Sample) ---
CSE Batch 65 (Trimester - Fall 2026):
  Monday:    09:00 DSA (Room 301), 11:30 OOP (Room 405)
  Tuesday:   10:00 Discrete Math (Room 201), 13:00 Physics Lab (Lab-1)
  Wednesday: 09:00 English Communication (Room 102), 11:30 DSA Lab (Lab-3)
  Thursday:  10:00 OOP (Room 405), 13:00 Database Systems (Room 302)
  Friday:    09:00 Discrete Math (Room 201)
  
CSE Batch 64 (Trimester - Fall 2026):
  Monday:    10:00 Operating Systems (Room 501), 13:00 Computer Networks (Room 302)
  Tuesday:   09:00 Software Engineering (Room 401), 11:30 Networks Lab (Lab-2)
  Wednesday: 10:00 Algorithms (Room 301), 13:00 OS Lab (Lab-1)
  Thursday:  09:00 Software Engineering (Room 401), 11:30 Algorithms (Room 301)
  Friday:    10:00 Human Computer Interaction (Room 202)
  
CSE Batch 66 (Trimester - Fall 2026):
  Monday:    09:00 Programming Fundamentals (Room 101), 11:30 Math-I (Room 203)
  Tuesday:   10:00 Digital Logic (Room 301), 13:00 English (Room 102)
  Wednesday: 09:00 Programming Lab (Lab-1), 11:30 Digital Logic Lab (Lab-2)
  Thursday:  10:00 Math-I (Room 203), 13:00 Programming Fundamentals (Room 101)
  Friday:    09:00 Physics (Room 204)

EEE Batch 65 (Trimester - Fall 2026):
  Monday:    09:00 Circuit Analysis (Room 401), 11:30 Math-II (Room 202)
  Tuesday:   10:00 Electronics-I (Room 302), 13:00 Circuit Lab (Lab-4)
  Wednesday: 09:00 Math-II (Room 202), 11:30 Electronics Lab (Lab-3)
  Thursday:  10:00 Circuit Analysis (Room 401), 13:00 Electronics-I (Room 302)
  Friday:    09:00 Engineering Drawing (Room 201)

DBA Batch 65 (Trimester - Fall 2026):
  Monday:    09:00 Management Principles (Room 601), 11:30 Business Math (Room 602)
  Tuesday:   10:00 Accounting-I (Room 601), 13:00 Economics (Room 603)
  Wednesday: 09:00 Business Communication (Room 602)
  Thursday:  10:00 Management Principles (Room 601), 13:00 Accounting-I (Room 601)
  Friday:    09:00 Economics (Room 603)

--- COURSES BY DEPARTMENT ---
CSE Core Courses:
  CSE 101 - Programming Fundamentals (C Language)
  CSE 201 - Data Structures & Algorithms (DSA)
  CSE 202 - Object Oriented Programming (OOP with Java)
  CSE 301 - Operating Systems
  CSE 302 - Computer Networks
  CSE 401 - Software Engineering
  CSE 402 - Database Systems
  CSE 403 - Artificial Intelligence & Machine Learning
  CSE 410 - Web Technologies
  CSE 420 - Mobile App Development
  
EEE Core Courses:
  EEE 101 - Circuit Analysis
  EEE 201 - Electronics-I
  EEE 202 - Digital Electronics
  EEE 301 - Signals & Systems
  EEE 302 - Microprocessors & Microcontrollers
  EEE 401 - Power Systems
  EEE 402 - Communication Systems
  
DBA Core Courses:
  DBA 101 - Management Principles
  DBA 201 - Accounting-I
  DBA 202 - Economics
  DBA 301 - Marketing Management
  DBA 401 - Financial Management
  DBA 402 - Business Strategy
  
Textile Core Courses:
  TEX 101 - Textile Fundamentals
  TEX 201 - Yarn Technology
  TEX 301 - Fabric Manufacturing
  TEX 401 - Textile Chemistry

--- CLUBS & ORGANIZATIONS ---
1. CPCCU (City Programming Club, City University)
   - The university's official tech & coding club
   - Organizes: Hackathons, coding contests, workshops, bootcamps
   - President: Ahmed Reza (CSE Batch 63)
   - Regular events: Weekly coding sessions every Wednesday 5PM

2. Cultural Club
   - Organizes: Nabanna (harvest festival), Independence Day programs, cultural nights
   - Activities: Drama, dance, music, art exhibitions
   - Open to all departments

3. Sports Club
   - Organizes: Futsal tournaments, cricket, badminton, volleyball
   - Annual: Inter-department sports week every February
   - Gym access: Monday-Friday 7AM-9PM

4. Debate Club
   - Regular debates, public speaking workshops
   - National debate competition participants

5. Volunteer & Social Welfare Club
   - Blood donation drives, tree planting events, charity work

--- UPCOMING EVENTS (Fall 2026) ---
1. CPCCU Hackathon 2026 - AI-Powered Web App Development
   Date: October 10-11, 2026 (48 hours)
   Venue: Innovation Pavilion & Great Hall
   Prize: BDT 1,00,000 for 1st place
   Registration: RSVP via CampusOS Events Engine
   
2. Cultural Night - Nabanna Festival
   Date: October 15, 2026
   Venue: Auditorium
   
3. Futsal Tournament (Inter-Department)
   Date: October 18-20, 2026
   Venue: Sports Ground
   Teams: All 6 departments competing

4. CSE Industry Visit - BJIT Group
   Date: October 25, 2026
   Open to: CSE Batch 63, 64, 65

--- ACADEMIC RESOURCES IN THE VAULT ---
CSE Past Papers Available:
  - CSE 201 DSA: Midterm 2024, Final 2024, Midterm 2025, Final 2025
  - CSE 301 OS: Midterm 2025, Final 2025
  - CSE 302 Networks: Midterm 2025
  - CSE 402 Database: Final 2024, Midterm 2025

EEE Past Papers Available:
  - EEE 101 Circuit Analysis: Midterm 2025, Final 2025
  - EEE 201 Electronics: Midterm 2024, Final 2024

Lecture Notes Available: OOP notes, DSA slides, Networks diagrams
Lab Guides: CSE Lab-1 guide, EEE Circuit Lab guide

--- CAMPUS FACILITIES ---
Shuttle Bus Schedule:
  Route A (Main Campus → Mirpur):  7:00AM, 9:00AM, 12:00PM, 5:00PM, 8:00PM
  Route B (Main Campus → Gulshan): 8:00AM, 1:00PM, 6:00PM
  Route C (Main Campus → Uttara):  7:30AM, 2:00PM, 7:00PM

Study Pods: 6 pods available, Book via CampusOS Resource Hub, Free for all students
Library Hours: Saturday-Thursday 8AM-9PM, Friday 10AM-6PM
Cafeteria: 1st Floor (Main Building), Hours 8AM-9PM
Prayer Room: 2nd Floor, Building B

SafeWalk (Campus Security Escort):
  Available: 24/7
  Call: Security Desk ext. 100
  Average wait: 3-5 minutes
  Coverage: Entire campus including parking areas

Lost & Found:
  Location: Main Security Desk, Ground Floor
  Phone: (555) 019-4357
  
Campus Helpdesk: (555) 019-4357
Emergency: 999 / Campus Security: Ext. 100

--- FEES & FINANCIAL ---
CSE Credit Fee: BDT 4,500 per credit
EEE Credit Fee: BDT 4,200 per credit
DBA Credit Fee: BDT 3,800 per credit
Waiver programs available for merit and financial need.
Contact: Accounts Office, Ground Floor, Admin Building

--- ADMISSION ---
Undergraduate: SSC + HSC or equivalent, minimum GPA 2.5 each
Requirements: Online application + admission test or waiver based on HSC result
Contact: admissions@cityuniversity.edu.bd

--- FREQUENTLY ASKED QUESTIONS ---
Q: How do I get my student ID reprinted?
A: Visit the Registrar's office (Room 101, Admin Building) with BDT 200 fee.

Q: How do I change my department?
A: Apply within the first trimester, subject to seat availability and CGPA requirements.

Q: What is the minimum CGPA to avoid probation?
A: CGPA must remain above 2.0. Below 2.0 triggers Academic Probation.

Q: When is the result published?
A: Typically 3-4 weeks after the final exam.

Q: How do I apply for a waiver?
A: Submit a waiver application form at the Accounts Office with supporting documents.

--- GENERAL KNOWLEDGE TOPICS TO ANSWER INTELLIGENTLY ---
- Hackathon: A timed competitive event (usually 24-48 hours) where teams build software or hardware solutions to solve a problem. Teams brainstorm, code, design, and present a working prototype to judges. Prizes are awarded to the best solutions.
- DSA (Data Structures & Algorithms): Core CS subject covering arrays, linked lists, trees, graphs, sorting, searching, dynamic programming. Essential for software engineering job interviews.
- OOP (Object Oriented Programming): Programming paradigm using classes, objects, inheritance, polymorphism, encapsulation. Java, Python, C++ are OOP languages.
- Trimester System: City University follows a trimester system (3 semesters/year: Spring, Summer, Fall). Each trimester is ~4 months.
`;

const SYSTEM_PROMPT = `You are the "CampusOS Smart Helpdesk AI" — the official AI assistant for City University students.
You have access to the complete university knowledge base below. Use it to answer questions accurately and instantly.
Be friendly, concise, and helpful. Use emojis naturally. Keep replies short (3-6 lines max unless a detailed list is needed).
Do NOT use markdown asterisks (**bold**) — plain text only since the chat UI doesn't render markdown.
If you don't know something specific, guide students to the right office or CampusOS module.

${CAMPUS_KNOWLEDGE_BASE}
`;

const callModel = async (modelName: string, prompt: string) => {
  const model = genAI.getGenerativeModel({ model: modelName });
  const result = await model.generateContent(prompt);
  return result.response.text();
};

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key is missing. Add GEMINI_API_KEY to your .env.local file." },
        { status: 500 }
      );
    }

    const { message, history } = await req.json();

    const formattedPrompt = [
      SYSTEM_PROMPT,
      ...(history ?? []).map((h: any) =>
        `${h.role === 'user' ? 'Student' : 'AI'}: ${h.content}`
      ),
      `Student: ${message}`,
      `AI:`,
    ].join('\n\n');

    let reply: string;
    try {
      reply = await callModel('gemini-3.8-flash', formattedPrompt);
    } catch (primaryError: any) {
      // Fallback on ANY error: 503 high demand, 404 model gone, network failures, etc.
      console.warn(`Primary model failed: ${primaryError.message}. Switching to fallback…`);
      try {
        reply = await callModel('gemini-3.5-flash', formattedPrompt);
      } catch (fallbackError: any) {
        // Last resort: gemini-pro-latest
        console.warn(`Fallback model also failed: ${fallbackError.message}. Trying gemini-pro-latest…`);
        reply = await callModel('gemini-pro-latest', formattedPrompt);
      }
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to connect to the AI server.' },
      { status: 500 }
    );
  }
}
