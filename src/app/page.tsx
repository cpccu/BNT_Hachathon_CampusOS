"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles, Calendar, Users, Compass, Clock, BookOpen, ArrowRight, Shield, Laptop, CheckCircle2, ChevronRight, AlertCircle, BellRing, Coffee, Navigation, Flame, Activity, Settings, HardDrive, Crown, MessageSquare, Plus, Edit
} from "lucide-react";
import {
  CURRENT_STUDENT, TODAY_CLASSES, ANNOUNCEMENTS, MOCK_EVENTS, MOCK_RESOURCES
} from "@/data/mockData";
import ActionNotificationModal from "@/components/ActionNotificationModal";
import { useAuth } from "@/context/AuthContext";

export default function HomeDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [modalState, setModalState] = useState({ isOpen: false, title: "", message: "", referenceId: "" });

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-campus-200 border-t-campus-600 rounded-full animate-spin" />
        <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">Redirecting to Sign In...</p>
      </div>
    );
  }

  const handleQuickAction = (actionName: string) => {
    const randomRef = "CU-" + Math.floor(100000 + Math.random() * 900000);
    let title = "Request Submitted";
    let message = "Your campus service request has been logged successfully.";
    if (actionName === "study-pod") {
      title = "Study Pod Reserved!";
      message = "Pod #4B (Main Library Level 2) has been booked. Access code sent to your campus email.";
    } else if (actionName === "safewalk") {
      title = "SafeWalk Escort Dispatched";
      message = "A campus safety officer has received your location ping. Estimated arrival: 3 minutes.";
    } else if (actionName === "hpc") {
      title = "GPU Compute Key Issued";
      message = "Slurm cluster session allocated. SSH key dispatched to your student terminal.";
    }
    setModalState({ isOpen: true, title, message, referenceId: randomRef });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {user.role === "admin" && <AdminDashboard user={user} onAction={handleQuickAction} />}
      {user.role === "club_admin" && <ClubAdminDashboard user={user} onAction={handleQuickAction} />}
      {user.role === "student" && <StudentDashboard user={user} onAction={handleQuickAction} />}

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

function AdminDashboard({ user, onAction }: { user: any, onAction: (a: string) => void }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-slate-700">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-amber-400 font-bold tracking-wider uppercase">
              <Crown className="w-3.5 h-3.5" /> Super Administrator
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Welcome back, {user.fullName}</h1>
            <p className="text-slate-300">System overview is optimal. There are <strong className="text-white">3 pending facility requests</strong> and <strong className="text-white">12 active events</strong> running.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin" className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold rounded-xl transition-all shadow-md flex items-center gap-2">
              <Settings className="w-4 h-4" /> Go to Admin Console
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "Active Students", value: "2,840", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "System Uptime", value: "99.9%", icon: HardDrive, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Tickets", value: "14", icon: MessageSquare, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Live Events", value: "8", icon: Flame, color: "text-purple-600", bg: "bg-purple-50" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase">{stat.label}</span>
              <div className={`w-8 h-8 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900">{stat.value}</div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-campus-600" /> Recent System Activity
          </h2>
          <div className="divide-y divide-slate-100">
            {['Student "Jordan Patel" booked Study Pod 4B', 'Club "CPCCU" submitted an event for approval', 'Helpdesk ticket #1042 resolved by IT'].map((act, i) => (
              <div key={i} className="py-3 text-sm text-slate-700 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div> {act}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-sm text-white space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-400" /> Emergency Broadcast
          </h2>
          <p className="text-sm text-slate-400">Push an instant notification to all active user sessions.</p>
          <textarea className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-amber-500 resize-none" rows={3} placeholder="Enter broadcast message..."></textarea>
          <button className="px-4 py-2 bg-rose-600 hover:bg-rose-500 font-bold rounded-xl text-sm transition-all shadow-md w-full">Send Global Alert</button>
        </div>
      </div>
    </div>
  );
}

function ClubAdminDashboard({ user, onAction }: { user: any, onAction: (a: string) => void }) {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    import("@/lib/db").then(({ LocalDB }) => {
      LocalDB.getEvents().then(e => setEvents(e.filter((evt: any) => evt.clubId === "club-cpccu")));
    });
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-900 to-campus-900 text-white p-6 sm:p-10 shadow-xl border border-purple-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-purple-300 font-bold tracking-wider uppercase">
              <Users className="w-3.5 h-3.5" /> Club Lead Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Hello, {user.fullName}</h1>
            <p className="text-slate-300">You are managing <strong className="text-white">CPCCU</strong>. Your next event "IUPC 2026" has 184 RSVPs.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-3 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-xl transition-all shadow-md flex items-center gap-2">
              <Plus className="w-4 h-4" /> Create Event
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "Total Members", value: "540", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Upcoming Events", value: "3", icon: Calendar, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Total RSVPs", value: "412", icon: CheckCircle2, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Club Rank", value: "#1", icon: Flame, color: "text-amber-600", bg: "bg-amber-50" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase">{stat.label}</span>
              <div className={`w-8 h-8 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900">{stat.value}</div>
          </div>
        ))}
      </section>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-campus-600" /> Manage Upcoming Club Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((evt: any) => (
            <div key={evt.id} className="p-4 border border-slate-200 rounded-xl flex flex-col justify-between hover:border-campus-400 transition-colors">
              <div>
                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-md mb-2 inline-block">{evt.date}</span>
                <h3 className="font-bold text-slate-900 line-clamp-1">{evt.title}</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {evt.attendeesCount} RSVPs</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center justify-center gap-1"><Edit className="w-3.5 h-3.5" /> Edit</button>
                <button className="flex-1 py-1.5 text-xs font-bold bg-campus-600 hover:bg-campus-700 text-white rounded-lg">View List</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudentDashboard({ user, onAction }: { user: any, onAction: (a: string) => void }) {
  const studentName = user.fullName || CURRENT_STUDENT.name;
  const studentId = user.studentId || CURRENT_STUDENT.id;
  const studentDept = user?.department || "Computer Science";
  const studentBatch = user?.batch || CURRENT_STUDENT.year;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-campus-950 via-campus-900 to-campus-800 text-white p-6 sm:p-10 shadow-xl border border-campus-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-campus-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-gold-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" /> City University Student Portal
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">Welcome back, {studentName} 👋</h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Enrolled in <strong className="text-white">{studentDept}</strong> • {studentBatch}. Your next lecture is <span className="text-gold-300 font-semibold underline decoration-gold-500/40">DS 420 at 2:00 PM</span>.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> ID: {studentId}
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Link href="/events" className="group flex items-center justify-between gap-4 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center"><Flame className="w-5 h-5 text-gold-400" /></div>
                <div><div className="font-bold text-white group-hover:text-gold-300">CityHack 2026 Live</div><div className="text-[11px] text-slate-300">24-Hr Sprint Underway</div></div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/resources" className="group flex items-center justify-between gap-4 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center"><BookOpen className="w-5 h-5 text-emerald-300" /></div>
                <div><div className="font-bold text-white group-hover:text-emerald-300">12 Study Pods Open</div><div className="text-[11px] text-slate-300">Library Levels 2 & 3</div></div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "Campus Events", value: "24+", icon: Calendar, color: "text-campus-600", bg: "bg-campus-50" },
          { label: "Student Clubs", value: "48", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Quiet Study Pods", value: "12 / 18", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Network Status", value: "99.8%", icon: Laptop, color: "text-blue-600", bg: "bg-blue-50" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
              <div className={`w-8 h-8 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}><stat.icon className="w-4 h-4" /></div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">{stat.value}</div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-campus-100 text-campus-700 flex items-center justify-center"><Clock className="w-4 h-4" /></div>
                <div><h2 className="text-base font-bold text-slate-900">Today's Academic Schedule</h2><p className="text-xs text-slate-500">Wednesday, Fall Term Week 6</p></div>
              </div>
              <span className="text-xs font-semibold text-campus-600 bg-campus-50 px-2.5 py-1 rounded-full border border-campus-200">3 Sessions</span>
            </div>
            <div className="space-y-3">
              {TODAY_CLASSES.map((cls) => (
                <div key={cls.code} className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${cls.status === "Next Up" ? "border-campus-400 bg-campus-50/50 shadow-xs ring-1 ring-campus-300/40" : cls.status === "Completed" ? "border-slate-100 bg-slate-50/60 opacity-75" : "border-slate-200 bg-white"}`}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-campus-800 bg-campus-100/70 px-2 py-0.5 rounded">{cls.code}</span>
                      <h3 className="text-sm font-bold text-slate-900">{cls.title}</h3>
                    </div>
                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="flex items-center gap-1 font-medium"><Clock className="w-3.5 h-3.5" />{cls.time}</span>
                      <span className="flex items-center gap-1"><Navigation className="w-3.5 h-3.5" />{cls.room}</span>
                      <span>{cls.instructor}</span>
                    </div>
                  </div>
                  <div>
                    {cls.status === "Next Up" ? <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-campus-600 text-white text-xs font-bold shadow-xs"><span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />Starts in 45m</span> : cls.status === "Completed" ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-medium"><CheckCircle2 className="w-3.5 h-3.5" />Completed</span> : <span className="text-xs text-slate-400 font-medium">Later today</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Quick Launch Tools</h2>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                { id: "study-pod", label: "Reserve Study Pod", sub: "Instant 2h Pass", icon: BookOpen, color: "text-campus-700", bg: "bg-campus-100" },
                { id: "safewalk", label: "SafeWalk 24/7 Escort", sub: "Safety Ranger to your GPS", icon: Shield, color: "text-amber-700", bg: "bg-amber-100" },
                { id: "hpc", label: "NVIDIA GPU Session", sub: "Slurm Compute Cluster", icon: Laptop, color: "text-purple-700", bg: "bg-purple-100" }
              ].map(tool => (
                <button key={tool.id} onClick={() => onAction(tool.id)} className="w-full p-3 rounded-xl border border-slate-200 hover:border-campus-400 hover:bg-campus-50/40 text-left transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${tool.bg} ${tool.color} flex items-center justify-center group-hover:scale-105 transition-transform`}><tool.icon className="w-4 h-4" /></div>
                    <div><div className="text-xs font-bold text-slate-900">{tool.label}</div><div className="text-[11px] text-slate-500">{tool.sub}</div></div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-campus-600 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-campus-950 text-white rounded-2xl p-5 border border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-gold-400 font-bold text-xs uppercase tracking-wider"><Shield className="w-4 h-4" /><span>Campus Emergency Hub</span></div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">Need immediate medical, mental health, or police assistance on campus grounds? Dispatchers are on 24/7 stand-by.</p>
            <div className="flex items-center justify-between bg-white/10 rounded-xl p-3 border border-white/10 text-xs">
              <div><span className="text-[10px] text-slate-400 block">Dispatch Line</span><span className="font-mono font-bold text-white">(555) 019-9111</span></div>
              <button onClick={() => onAction("safewalk")} className="px-3 py-1.5 bg-campus-600 hover:bg-campus-500 text-white font-bold rounded-lg transition-colors text-xs shadow-xs">Call Escort</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
