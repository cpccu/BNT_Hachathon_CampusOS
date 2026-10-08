"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Bus,
  Search,
  BookOpen,
  Bot,
  Users,
  CheckCircle2,
  Lock,
  Zap,
  Globe,
  Award
} from "lucide-react";

interface LandingPageProps {
  onQuickDemoLogin: (role: "student" | "club_admin" | "admin") => void;
}

export default function UniversityLandingPage({ onQuickDemoLogin }: LandingPageProps) {
  return (
    <div className="space-y-16 sm:space-y-24 py-4 sm:py-8 animate-in fade-in duration-500">
      
      {/* ── HERO BANNER ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-campus-950 via-campus-900 to-indigo-950 text-white p-8 sm:p-14 lg:p-20 shadow-2xl border border-campus-800">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-campus-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-gold-300 font-bold tracking-wider uppercase shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Official Student Operating System · City University</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            The Digital Heartbeat of <span className="bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500 bg-clip-text text-transparent">City University</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            CampusOS is a next-generation academic operating system uniting <strong>2,800+ students</strong>, faculty, and student clubs into one synchronized ecosystem. Real-time shuttle routing, automated AI helpdesk, live QR event passes, and academic vaults.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/login"
              className="px-6 py-3.5 rounded-2xl bg-gold-400 hover:bg-gold-300 text-slate-950 font-black text-sm shadow-xl shadow-gold-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Sign In to Student Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/signup"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            >
              Create Enrolled Account
            </Link>
          </div>

          {/* Quick Demo Shortcuts for Hackathon Judges */}
          <div className="pt-6 border-t border-white/10">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-gold-400" />
              1-Click Demo Evaluation Sign-in for Judges:
            </div>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => onQuickDemoLogin("student")}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-all flex items-center gap-1.5 shadow-2xs"
              >
                🎓 Student View (Junaid Parvez)
              </button>
              <button
                onClick={() => onQuickDemoLogin("club_admin")}
                className="px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 text-xs font-bold border border-purple-500/30 transition-all flex items-center gap-1.5 shadow-2xs"
              >
                🛡️ Club Lead View (CPCCU Lead)
              </button>
              <button
                onClick={() => onQuickDemoLogin("admin")}
                className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-bold border border-amber-500/30 transition-all flex items-center gap-1.5 shadow-2xs"
              >
                👑 Campus Admin Console
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE ECOSYSTEM FEATURES ────────────────────────────────────────── */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-campus-600 dark:text-campus-400">
            Synchronized Modules
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Everything You Need to Navigate Campus Life
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Powered by a live Supabase PostgreSQL backend and real-time streaming intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Club & Event Engine",
              desc: "Explore hackathons, workshops, and sports meets. One-tap instant digital QR passes with instant attendee telemetry.",
              icon: Calendar,
              tag: "Live Sync",
              href: "/events",
              color: "text-purple-600",
              bg: "bg-purple-50 dark:bg-purple-950/50"
            },
            {
              title: "CityU Live Shuttle Timetable",
              desc: "Track scheduled campus buses across Mirpur, Gulshan, and Uttara. Switch stoppage directions and view direct driver contacts.",
              icon: Bus,
              tag: "Bidirectional",
              href: "/shuttle",
              color: "text-blue-600",
              bg: "bg-blue-50 dark:bg-blue-950/50"
            },
            {
              title: "Academic Vault & Study Pods",
              desc: "Verified exam questions, faculty lecture slides, and quiet library study pod booking with instantaneous reservation codes.",
              icon: BookOpen,
              tag: "Resource Hub",
              href: "/resources",
              color: "text-emerald-600",
              bg: "bg-emerald-50 dark:bg-emerald-950/50"
            },
            {
              title: "Multi-Device Lost & Found",
              desc: "Post lost property or claim found valuables with live multi-device PostgreSQL cloud synchronization and campus complaint filing.",
              icon: Search,
              tag: "Supabase DB",
              href: "/lost-and-found",
              color: "text-amber-600",
              bg: "bg-amber-50 dark:bg-amber-950/50"
            },
            {
              title: "AI Campus Helpdesk",
              desc: "24/7 intelligent streaming virtual assistant answering university questions, campus policies, schedules, and bus timings.",
              icon: Bot,
              tag: "Gemini AI",
              href: "/helpdesk",
              color: "text-rose-600",
              bg: "bg-rose-50 dark:bg-rose-950/50"
            },
            {
              title: "Role-Based Central Admin",
              desc: "High-privilege console for university registrars: push campus-wide emergency broadcasts, review tickets, and manage role security.",
              icon: ShieldCheck,
              tag: "RBAC Security",
              href: "/admin",
              color: "text-indigo-600",
              bg: "bg-indigo-50 dark:bg-indigo-950/50"
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-campus-400 dark:hover:border-campus-600 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-campus-600 dark:group-hover:text-campus-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-campus-600 dark:text-campus-400 hover:underline pt-2 border-t border-slate-100 dark:border-slate-800"
                >
                  <span>Explore Feature</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── ABOUT CITY UNIVERSITY SECTION ───────────────────────────────────── */}
      <section className="bg-slate-100 dark:bg-slate-900/60 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-campus-50 dark:bg-campus-950 text-campus-700 dark:text-campus-300 font-bold text-xs border border-campus-200 dark:border-campus-800">
            <Globe className="w-3.5 h-3.5" /> About City University
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Pioneering Higher Education & Innovation in Bangladesh
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            City University is committed to academic excellence, technological innovation, and societal development. Its sprawling campus in Birulia, Savar houses state-of-the-art software laboratories, robotics fabrication suites, and collaborative study halls.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-xl font-black text-campus-600">48+</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Student Clubs</div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-xl font-black text-emerald-600">100%</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Free Campus Transit</div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-xl font-black text-purple-600">24/7</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">SafeWalk Security</div>
            </div>
          </div>
        </div>

        {/* Action Card */}
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl max-w-sm w-full space-y-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-campus-50 dark:bg-campus-950 text-campus-600 dark:text-campus-400 flex items-center justify-center mx-auto shadow-inner">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ready to Get Started?</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in with your enrolled Student ID or register a new campus account in under 30 seconds.
          </p>
          <div className="space-y-2 pt-2">
            <Link
              href="/login"
              className="w-full py-3 px-4 rounded-xl bg-campus-600 hover:bg-campus-700 text-white font-bold text-xs shadow-md transition-all block"
            >
              Log In to CampusOS
            </Link>
            <Link
              href="/signup"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-bold text-xs transition-all block"
            >
              Register New Account
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
