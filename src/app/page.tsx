"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Calendar,
  Users,
  Compass,
  Clock,
  BookOpen,
  ArrowRight,
  Shield,
  Laptop,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  BellRing,
  Coffee,
  Navigation,
  Flame,
} from "lucide-react";
import {
  CURRENT_STUDENT,
  TODAY_CLASSES,
  ANNOUNCEMENTS,
  MOCK_EVENTS,
  MOCK_RESOURCES,
} from "@/data/mockData";
import EventCard from "@/components/EventCard";
import ActionNotificationModal from "@/components/ActionNotificationModal";
import { useAuth } from "@/context/AuthContext";

export default function HomeDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    referenceId?: string;
  }>({
    isOpen: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-campus-200 border-t-campus-600 rounded-full animate-spin" />
        <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">
          {loading ? "Loading CampusOS..." : "Redirecting to Sign In..."}
        </p>
      </div>
    );
  }

  const studentName = user.fullName || CURRENT_STUDENT.name;
  const studentId = user.studentId || CURRENT_STUDENT.id;
  const studentDept = user?.department || "Computer Science";
  const studentBatch = user?.batch || CURRENT_STUDENT.year;

  const featuredEvent = MOCK_EVENTS.find((e) => e.featured) || MOCK_EVENTS[0];

  const handleQuickAction = (actionName: string) => {
    const randomRef = "CU-" + Math.floor(100000 + Math.random() * 900000);
    switch (actionName) {
      case "study-pod":
        setModalState({
          isOpen: true,
          title: "Study Pod Reserved!",
          message:
            "Pod #4B (Main Library Level 2) has been booked for Jordan Patel for the next 2 hours. Access code sent to your campus email.",
          referenceId: randomRef,
        });
        break;
      case "safewalk":
        setModalState({
          isOpen: true,
          title: "SafeWalk Escort Dispatched",
          message:
            "A campus safety officer has received your location ping at Turing Hall. Estimated arrival: 3 minutes.",
          referenceId: randomRef,
        });
        break;
      case "hpc":
        setModalState({
          isOpen: true,
          title: "GPU Compute Key Issued",
          message:
            "Slurm cluster session allocated with 1x NVIDIA A100. SSH key and JupyterLab URL dispatched to your student terminal.",
          referenceId: randomRef,
        });
        break;
      default:
        setModalState({
          isOpen: true,
          title: "Request Submitted",
          message: "Your campus service request has been logged successfully.",
          referenceId: randomRef,
        });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. HERO WELCOME SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-campus-950 via-campus-900 to-campus-800 text-white p-6 sm:p-10 shadow-xl border border-campus-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-campus-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-gold-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>City University Student Portal • Fall Term</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Welcome back, {studentName} 👋
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Enrolled in <strong className="text-white">{studentDept}</strong> • {studentBatch}. Your next lecture is{" "}
              <span className="text-gold-300 font-semibold underline decoration-gold-500/40">DS 420 at 2:00 PM</span> in Innovation Pavilion B12.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                ID: {studentId}
              </span>
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
                <Coffee className="w-3.5 h-3.5 text-gold-400" />
                Library Cafe: Open till Midnight
              </span>
            </div>
          </div>

          {/* Quick status pill cards */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Link
              href="/events"
              className="group flex items-center justify-between gap-4 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <div className="font-bold text-white group-hover:text-gold-300 transition-colors">
                    CityHack 2026 Live
                  </div>
                  <div className="text-[11px] text-slate-300">24-Hr Sprint Underway</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/resources"
              className="group flex items-center justify-between gap-4 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white group-hover:text-emerald-300 transition-colors">
                    12 Study Pods Open
                  </div>
                  <div className="text-[11px] text-slate-300">Library Levels 2 & 3</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATS OVERVIEW CARDS */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Campus Events
            </span>
            <div className="w-8 h-8 rounded-lg bg-campus-50 text-campus-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">24+</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <span>↑ 6 added this week</span>
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Student Clubs
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">48</div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            You are in 2 active orgs
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Quiet Study Pods
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">12 / 18</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            Instant booking available
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Network Status
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Laptop className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">99.8%</div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            CityUni-Secure WiFi optimal
          </p>
        </div>
      </section>

      {/* 3. MAIN DASHBOARD CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Classes, Featured Hackathon, Campus Pulse */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Today's Schedule Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-campus-100 text-campus-700 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Today&apos;s Academic Schedule
                  </h2>
                  <p className="text-xs text-slate-500">Wednesday, Fall Term Week 6</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-campus-600 bg-campus-50 px-2.5 py-1 rounded-full border border-campus-200">
                3 Sessions
              </span>
            </div>

            <div className="space-y-3">
              {TODAY_CLASSES.map((cls) => (
                <div
                  key={cls.code}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    cls.status === "Next Up"
                      ? "border-campus-400 bg-campus-50/50 shadow-xs ring-1 ring-campus-300/40"
                      : cls.status === "Completed"
                      ? "border-slate-100 bg-slate-50/60 opacity-75"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-campus-800 bg-campus-100/70 px-2 py-0.5 rounded">
                        {cls.code}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">{cls.title}</h3>
                    </div>
                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {cls.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Navigation className="w-3.5 h-3.5 text-slate-400" />
                        {cls.room}
                      </span>
                      <span>{cls.instructor}</span>
                    </div>
                  </div>

                  <div>
                    {cls.status === "Next Up" ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-campus-600 text-white text-xs font-bold shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        Starts in 45m
                      </span>
                    ) : cls.status === "Completed" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
                        Completed
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">
                        Later today
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Hackathon Spotlight Banner */}
          <div className="bg-white rounded-2xl border border-purple-200 overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-campus-900 text-white p-6 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/30 border border-purple-400/40 text-xs font-bold text-purple-200">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  FLAGSHIP 24-HOUR HACKATHON
                </span>
                <span className="text-xs font-mono bg-white/10 px-2.5 py-1 rounded-md text-slate-200">
                  Oct 10-11, 2026
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
                CityHack 2026: 24-Hour Innovation Sprint
              </h2>
              <p className="text-xs sm:text-sm text-purple-200 leading-relaxed max-w-xl mb-4">
                Build next-generation campus AI agents, civic tech tools, and student developer software. Over $15,000 in prizes, keynote mentorship from tech leaders, and free catering.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/events"
                  className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Explore Event Hub & RSVP</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => handleQuickAction("hackathon-team")}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all"
                >
                  Join Matchmaking Teammate Discord
                </button>
              </div>
            </div>

            <div className="p-4 bg-purple-50/50 flex flex-wrap items-center justify-between text-xs text-purple-950 gap-2 border-t border-purple-100">
              <span className="font-semibold">
                📍 Great Hall & Virtual Discord Hub
              </span>
              <span className="text-purple-700">
                420 of 500 Hackers Confirmed
              </span>
            </div>
          </div>

          {/* Live Campus Pulse & Urgent Bulletins */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <BellRing className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Live Campus Bulletins & Pulse
                  </h2>
                  <p className="text-xs text-slate-500">Official administration announcements</p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {ANNOUNCEMENTS.map((ann) => (
                <div key={ann.id} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        ann.category === "Urgent"
                          ? "bg-rose-100 text-rose-700"
                          : ann.category === "Career"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {ann.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{ann.time}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 hover:text-campus-600 transition-colors cursor-pointer">
                    {ann.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {ann.summary}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
                    Issued by: {ann.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Quick Actions, Live Occupancy, SafeWalk */}
        <div className="space-y-6">
          
          {/* Quick Actions Panel */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Quick Launch Tools
            </h2>

            <div className="grid grid-cols-1 gap-2.5">
              <button
                onClick={() => handleQuickAction("study-pod")}
                className="w-full p-3 rounded-xl border border-slate-200 hover:border-campus-400 hover:bg-campus-50/40 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-campus-100 text-campus-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Reserve Study Pod
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Instant 2h Pass (Level 2-3)
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-campus-600 group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => handleQuickAction("safewalk")}
                className="w-full p-3 rounded-xl border border-slate-200 hover:border-campus-400 hover:bg-campus-50/40 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      SafeWalk 24/7 Escort
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Safety Ranger to your GPS
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-campus-600 group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => handleQuickAction("hpc")}
                className="w-full p-3 rounded-xl border border-slate-200 hover:border-campus-400 hover:bg-campus-50/40 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      NVIDIA GPU Session
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Slurm Compute Cluster
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-campus-600 group-hover:translate-x-0.5 transition-all" />
              </button>

              <Link
                href="/events"
                className="w-full p-3 rounded-xl border border-slate-200 hover:border-campus-400 hover:bg-campus-50/40 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Browse 48 Clubs
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Tech, Sports, Arts & Orgs
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-campus-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </div>

          {/* Live Campus Facilities Occupancy Radar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Facility Density Radar
              </h2>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Sensor Feed
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Main Library (All Floors)</span>
                  <span className="text-slate-500">68% Capacity</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-campus-500 rounded-full" style={{ width: "68%" }} />
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Level 4 Silent Zone has 24 open desks</span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Engineering MakerSpace</span>
                  <span className="text-amber-600 font-bold">85% Capacity</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "85%" }} />
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Laser cutters currently in queue</span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Recreation Fitness Center</span>
                  <span className="text-emerald-600">32% Capacity</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "32%" }} />
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Ideal workout window</span>
              </div>
            </div>
          </div>

          {/* Student Advisor & Emergency Card */}
          <div className="bg-gradient-to-br from-slate-900 to-campus-950 text-white rounded-2xl p-5 border border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-gold-400 font-bold text-xs uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>Campus Emergency Hub</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Need immediate medical, mental health, or police assistance on campus grounds? Dispatchers are on 24/7 stand-by.
            </p>
            <div className="flex items-center justify-between bg-white/10 rounded-xl p-3 border border-white/10 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Dispatch Line</span>
                <span className="font-mono font-bold text-white">(555) 019-9111</span>
              </div>
              <button
                onClick={() => handleQuickAction("safewalk")}
                className="px-3 py-1.5 bg-campus-600 hover:bg-campus-500 text-white font-bold rounded-lg transition-colors text-xs shadow-xs"
              >
                Call Escort
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Action Notification Modal */}
      <ActionNotificationModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.title}
        message={modalState.message}
        referenceId={modalState.referenceId}
      />
    </div>
  );
}
