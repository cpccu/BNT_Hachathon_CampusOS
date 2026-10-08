"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  LayoutDashboard,
  CalendarDays,
  FolderKanban,
  Users,
  Bell,
  Cpu,
  Sparkles,
  Search,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Building,
  KeyRound,
  ArrowRight,
  RefreshCw,
  Sliders,
  Filter,
  Eye,
  FileText,
  Clock,
  Radio,
  ExternalLink,
  Laptop,
  GraduationCap,
  ChevronRight,
  Crown,
  BookOpen,
} from "lucide-react";
import { useAuth, RegisteredUserRecord } from "@/context/AuthContext";
import { MOCK_EVENTS, MOCK_CLUBS, CampusEvent } from "@/data/mockData";
import { LocalDB } from "@/lib/db";

interface FacilityBooking {
  id: string;
  facility: string;
  studentName: string;
  studentId: string;
  timeSlot: string;
  status: "Confirmed" | "Pending" | "Active" | "Completed";
  code: string;
}

interface CampusAlert {
  id: string;
  title: string;
  severity: "urgent" | "notice" | "event";
  message: string;
  active: boolean;
  timestamp: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, quickDemoLogin, getAllUsers, updateUserRole, loading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<"overview" | "events" | "facilities" | "students" | "alerts" | "ai">("overview");

  // State for events management — loaded from LocalDB (shared with student /events page)
  const [eventsList, setEventsList] = useState<CampusEvent[]>([]);
  const [eventSearch, setEventSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // New Event Modal
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    organizer: "CPCCU",
    category: "Hackathon",
    date: "Oct 24, 2026",
    time: "10:00 AM - 5:00 PM",
    location: "Innovation Pavilion Level 3",
    maxCapacity: 150,
    description: "",
  });

  // State for facilities
  const [facilityBookings, setFacilityBookings] = useState<FacilityBooking[]>([
    { id: "BK-901", facility: "Quiet Study Pod #4B", studentName: "Junaid Parvez", studentId: "CU-892401", timeSlot: "2:00 PM - 4:00 PM", status: "Active", code: "POD-4B-9201" },
    { id: "BK-902", facility: "Quiet Study Pod #2A", studentName: "Sarah Khan", studentId: "CU-891102", timeSlot: "1:00 PM - 3:00 PM", status: "Confirmed", code: "POD-2A-3310" },
    { id: "BK-903", facility: "NVIDIA A100 GPU Node #1", studentName: "Alex Rivera", studentId: "CU-772910", timeSlot: "All-Day Batch", status: "Active", code: "SLURM-GPU-01" },
    { id: "BK-904", facility: "Robotics Fabrication Lab", studentName: "Tanvir Ahmed", studentId: "CU-883901", timeSlot: "4:00 PM - 6:00 PM", status: "Pending", code: "ROBO-LAB-04" },
    { id: "BK-905", facility: "Auditorium Hall B", studentName: "Debate Club Execs", studentId: "CU-301290", timeSlot: "6:00 PM - 8:30 PM", status: "Confirmed", code: "AUD-HALL-B" },
  ]);

  // State for users
  const [usersList, setUsersList] = useState<RegisteredUserRecord[]>([]);
  const [userSearch, setUserSearch] = useState("");

  // State for announcements & alerts
  const [alerts, setAlerts] = useState<CampusAlert[]>([
    { id: "ALT-1", title: "CPCCU Hackathon '26 24-Hr Live Sprint", severity: "urgent", message: "Hackathon checkpoint #2 begins at 4:00 PM in Innovation Pavilion.", active: true, timestamp: "10 mins ago" },
    { id: "ALT-2", title: "SafeWalk 24/7 Security Escort Operational", severity: "notice", message: "Campus security patrols active at all university dorm gates.", active: true, timestamp: "1 hr ago" },
    { id: "ALT-3", title: "Mid-Term Examination Schedule Released", severity: "notice", message: "Download departmental timetables from Academic Vault.", active: false, timestamp: "Yesterday" },
  ]);

  const [newAlertTitle, setNewAlertTitle] = useState("");
  const [newAlertMessage, setNewAlertMessage] = useState("");
  const [newAlertSeverity, setNewAlertSeverity] = useState<"urgent" | "notice" | "event">("urgent");

  // Notification feedback
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  useEffect(() => {
    // Refresh user list from AuthContext
    setUsersList(getAllUsers());
    // Load events from shared LocalDB so Admin & Student views stay in sync
    LocalDB.getEvents().then((evts) => setEventsList(evts as CampusEvent[]));
  }, [getAllUsers]);

  // Check role authorization
  const isAdmin = user && user.role === "admin";

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title.trim()) return;

    const created: CampusEvent = {
      id: "ev-" + Math.floor(1000 + Math.random() * 9000),
      title: newEvent.title,
      organizer: newEvent.organizer,
      category: newEvent.category,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      attendeesCount: 1,
      maxCapacity: Number(newEvent.maxCapacity) || 100,
      tags: [newEvent.category, newEvent.organizer],
      description: newEvent.description || "Official City University campus event.",
      featured: true,
      rsvpd: false,
    };

    const newList = [created, ...eventsList];
    setEventsList(newList);
    LocalDB.addEvent(created); // persist to shared DB so /events page sees it
    setIsCreateEventOpen(false);
    setNewEvent({
      title: "",
      organizer: "CPCCU",
      category: "Hackathon",
      date: "Oct 24, 2026",
      time: "10:00 AM - 5:00 PM",
      location: "Innovation Pavilion Level 3",
      maxCapacity: 150,
      description: "",
    });
    showToast(`Event "${created.title}" successfully published to student feed!`);
  };

  const handleDeleteEvent = (id: string, title: string) => {
    const updated = eventsList.filter((e) => e.id !== id);
    setEventsList(updated);
    // Sync deletion to shared LocalDB
    if (typeof window !== "undefined") {
      localStorage.setItem("campusos_events_list_v2", JSON.stringify(updated));
    }
    showToast(`Event "${title}" was removed.`);
  };

  const handleToggleEventFeature = (id: string) => {
    const updated = eventsList.map((e) => (e.id === id ? { ...e, featured: !e.featured } : e));
    setEventsList(updated);
    // Sync to shared LocalDB
    if (typeof window !== "undefined") {
      localStorage.setItem("campusos_events_list_v2", JSON.stringify(updated));
    }
    showToast("Event homepage highlight toggled.");
  };

  const handleApproveBooking = (id: string) => {
    setFacilityBookings(
      facilityBookings.map((b) => (b.id === id ? { ...b, status: "Confirmed" } : b))
    );
    showToast(`Booking ${id} approved.`);
  };

  const handleCancelBooking = (id: string) => {
    setFacilityBookings(facilityBookings.filter((b) => b.id !== id));
    showToast(`Booking ${id} canceled and released.`);
  };

  const handleRoleChange = (userId: string, newRole: "student" | "club_admin" | "admin") => {
    updateUserRole(userId, newRole);
    setUsersList(getAllUsers());
    showToast(`User permissions updated to ${newRole.toUpperCase()}.`);
  };

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlertTitle.trim()) return;

    const created: CampusAlert = {
      id: "ALT-" + Math.floor(100 + Math.random() * 900),
      title: newAlertTitle,
      message: newAlertMessage || "Official broadcast from University Administration.",
      severity: newAlertSeverity,
      active: true,
      timestamp: "Just now",
    };

    setAlerts([created, ...alerts]);
    setNewAlertTitle("");
    setNewAlertMessage("");
    showToast(`Alert "${created.title}" broadcasted across CampusOS!`);
  };

  const handleToggleAlert = (id: string) => {
    setAlerts(
      alerts.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
    showToast("Alert removed.");
  };

  // If not logged in as Admin, show high-impact evaluation access screen
  if (!authLoading && !isAdmin) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto shadow-inner">
            <Crown className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Admin Access Required
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              The CampusOS Central Management Console is restricted to University Administrators and Registrar Staff.
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-4 text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Hackathon Judge Quick-Access</span>
            </div>
            <p className="text-[11px] text-amber-800 dark:text-amber-300">
              You are currently viewing as {user ? `"${user.fullName}" (${user.role})` : "Guest"}. Click below to instantly assume the Super Admin persona:
            </p>
            <div className="text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-slate-900/70 p-2 rounded-lg border border-amber-200/50">
              Email: <strong>admin@cityuniversity.edu.bd</strong> • Pass: <strong>admin1234</strong>
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => quickDemoLogin("admin")}
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <KeyRound className="w-4 h-4" />
              <span>Switch to Campus Admin (1-Click)</span>
            </button>

            <Link
              href="/"
              className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <span>Return to Student Portal</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner Toast */}
      {actionSuccess && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Admin Header */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-campus-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-campus-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-400" /> Super Admin Portal
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live System Synchronized
              </span>
              <span className="text-slate-400 text-xs">v2.4 Hackathon Edition</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              CampusOS Central Management Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Authenticated Administrator: <strong className="text-white">{user?.fullName || "Dr. Mahfuz Rahman"}</strong> ({user?.department || "Campus Administration"})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsCreateEventOpen(true)}
              className="px-4 py-2.5 bg-campus-600 hover:bg-campus-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Create Event</span>
            </button>
            <Link
              href="/"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
              <span>View Student Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {[
          { id: "overview", label: "Overview & Analytics", icon: LayoutDashboard },
          { id: "events", label: "Event Management", icon: CalendarDays, badge: eventsList.length },
          { id: "facilities", label: "Facilities & Pods", icon: Building, badge: facilityBookings.length },
          { id: "students", label: "User Directory", icon: Users, badge: usersList.length },
          { id: "alerts", label: "Announcements & Alerts", icon: Bell, badge: alerts.filter((a) => a.active).length },
          { id: "ai", label: "Smart Helpdesk AI Health", icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                active
                  ? "bg-campus-600 text-white shadow-md shadow-campus-600/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    active ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Students</span>
                <Users className="w-4 h-4 text-campus-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">2,840</div>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">↑ 18 new registrations today</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Campus Events</span>
                <CalendarDays className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{eventsList.length} Active</div>
              <p className="text-[11px] text-purple-600 font-semibold mt-1">1,420 Total Student RSVPs</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Study Pods Usage</span>
                <BookOpen className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">12 / 18</div>
              <p className="text-[11px] text-slate-500 font-semibold mt-1">66.7% Occupancy Rate</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">GPU Supercluster</span>
                <Cpu className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">4x A100</div>
              <p className="text-[11px] text-blue-600 font-semibold mt-1">16 Slurm Batch Jobs Running</p>
            </div>
          </div>

          {/* Activity Logs & Quick Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-campus-600" /> Real-Time Campus Audit Log
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">Stream: Live</span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-2">
                {[
                  { time: "2 mins ago", event: "Student RSVP confirmed for CPCCU Hackathon '26", user: "Junaid Parvez (CU-892401)", badge: "RSVP" },
                  { time: "8 mins ago", event: "Quiet Study Pod #4B reservation generated QR code pass", user: "Tanvir Ahmed (CU-883901)", badge: "Booking" },
                  { time: "14 mins ago", event: "Smart Helpdesk AI answered CSE 65 routine inquiry", user: "Anonymous Student", badge: "AI Query" },
                  { time: "25 mins ago", event: "New student account registered with verified email", user: "Alex Rivera (CU-772910)", badge: "Sign Up" },
                  { time: "42 mins ago", event: "Slurm cluster GPU job allocated: 1x NVIDIA A100", user: "Abir Chowdhury (ACM)", badge: "HPC" },
                ].map((item, idx) => (
                  <div key={idx} className="pt-2 flex items-start justify-between text-xs">
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{item.event}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{item.user}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-campus-50 dark:bg-campus-950 text-campus-600 border border-campus-200 dark:border-campus-800">
                        {item.badge}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-4">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-campus-600" /> Admin Rapid Controls
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">SafeWalk 24/7 Security</p>
                    <p className="text-[11px] text-slate-500">Patrols and blue-light hotlines</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full">
                    Active
                  </span>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">Smart Helpdesk Gemini AI</p>
                    <p className="text-[11px] text-slate-500">Google Gemini API integration</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full">
                    Operational
                  </span>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">Library Study Pods</p>
                    <p className="text-[11px] text-slate-500">Instant booking system</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-campus-100 dark:bg-campus-950 text-campus-700 dark:text-campus-300 rounded-full">
                    12 In Use
                  </span>
                </div>

                <button
                  onClick={() => setActiveTab("events")}
                  className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Manage All Events ({eventsList.length})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EVENT MANAGEMENT */}
      {activeTab === "events" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Campus Events Directory</h2>
              <p className="text-xs text-slate-500">Create, feature, approve, or cancel events across all clubs</p>
            </div>
            <button
              onClick={() => setIsCreateEventOpen(true)}
              className="px-3.5 py-2 bg-campus-600 hover:bg-campus-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 self-start"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Event</span>
            </button>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search events by title or club..."
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-campus-500"
              />
            </div>
          </div>

          {/* Events Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                  <th className="py-2.5 px-3 font-semibold">Event Title</th>
                  <th className="py-2.5 px-3 font-semibold">Club / Organizer</th>
                  <th className="py-2.5 px-3 font-semibold">Date & Time</th>
                  <th className="py-2.5 px-3 font-semibold">Capacity</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {eventsList
                  .filter((e) => e.title.toLowerCase().includes(eventSearch.toLowerCase()) || e.organizer.toLowerCase().includes(eventSearch.toLowerCase()))
                  .map((ev) => (
                    <tr key={ev.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900 dark:text-white">{ev.title}</div>
                        <div className="text-[10px] text-slate-400">{ev.location}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {ev.organizer}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                        <div>{ev.date}</div>
                        <div className="text-[10px] text-slate-400">{ev.time}</div>
                      </td>
                      <td className="py-3 px-3 font-mono">
                        {ev.attendeesCount} / {ev.maxCapacity}
                      </td>
                      <td className="py-3 px-3">
                        {ev.featured ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            ★ Featured
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                            Published
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleToggleEventFeature(ev.id)}
                            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg transition-colors"
                            title="Toggle Featured"
                          >
                            ★
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(ev.id, ev.title)}
                            className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-600 rounded-lg transition-colors"
                            title="Delete Event"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: FACILITIES & STUDY PODS */}
      {activeTab === "facilities" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Active Facility Reservations</h2>
                <p className="text-xs text-slate-500">Live access codes, study pods, and GPU cluster allocations</p>
              </div>
              <span className="text-xs font-mono font-bold text-campus-600">
                {facilityBookings.length} Active Passes
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                    <th className="py-2.5 px-3 font-semibold">Pass Code</th>
                    <th className="py-2.5 px-3 font-semibold">Facility</th>
                    <th className="py-2.5 px-3 font-semibold">Student / Requestor</th>
                    <th className="py-2.5 px-3 font-semibold">Time Slot</th>
                    <th className="py-2.5 px-3 font-semibold">Status</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {facilityBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-campus-600 dark:text-campus-400">
                        {b.code}
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                        {b.facility}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">{b.studentName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{b.studentId}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                        {b.timeSlot}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            b.status === "Active"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                              : b.status === "Pending"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {b.status === "Pending" && (
                            <button
                              onClick={() => handleApproveBooking(b.id)}
                              className="px-2 py-1 bg-emerald-600 text-white rounded text-[11px] font-bold hover:bg-emerald-700"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => handleCancelBooking(b.id)}
                            className="px-2 py-1 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded text-[11px] font-semibold"
                          >
                            Release
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: STUDENT & USER DIRECTORY */}
      {activeTab === "students" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Registered Users & Role Management</h2>
              <p className="text-xs text-slate-500">Manage permissions for Students, Club Admins, and System Administrators</p>
            </div>
            <div className="text-xs font-mono font-bold text-campus-600">
              Total Accounts: {usersList.length}
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, ID, or email..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-campus-500"
            />
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                  <th className="py-2.5 px-3 font-semibold">User Details</th>
                  <th className="py-2.5 px-3 font-semibold">Student ID</th>
                  <th className="py-2.5 px-3 font-semibold">Department & Batch</th>
                  <th className="py-2.5 px-3 font-semibold">Current Role</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Change Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {usersList
                  .filter((u) => u.fullName.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()) || u.studentId.toLowerCase().includes(userSearch.toLowerCase()))
                  .map((usr) => (
                    <tr key={usr.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900 dark:text-white">{usr.fullName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{usr.email}</div>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-700 dark:text-slate-300">
                        {usr.studentId}
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                        <div>{usr.department}</div>
                        <div className="text-[10px] text-slate-400">{usr.batch}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            usr.role === "admin"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                              : usr.role === "club_admin"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-300 dark:border-purple-800"
                              : "bg-campus-50 text-campus-700 dark:bg-campus-950 dark:text-campus-300"
                          }`}
                        >
                          {usr.role === "admin" ? "👑 Admin" : usr.role === "club_admin" ? "🛡️ Club Lead" : "🎓 Student"}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <select
                          value={usr.role}
                          onChange={(e) => handleRoleChange(usr.id, e.target.value as any)}
                          className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-lg px-2 py-1 font-semibold focus:outline-none"
                        >
                          <option value="student">Student</option>
                          <option value="club_admin">Club Admin</option>
                          <option value="admin">Super Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: ANNOUNCEMENTS & ALERTS */}
      {activeTab === "alerts" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Campus Alerts & Notification Banners
            </h2>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-3">
              {alerts.map((alt) => (
                <div key={alt.id} className="pt-3 flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                          alt.severity === "urgent"
                            ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        }`}
                      >
                        {alt.severity}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">{alt.title}</span>
                      <span className="text-[10px] text-slate-400">{alt.timestamp}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px]">{alt.message}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleToggleAlert(alt.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                        alt.active
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                      }`}
                    >
                      {alt.active ? "Broadcasting" : "Paused"}
                    </button>
                    <button
                      onClick={() => handleDeleteAlert(alt.id)}
                      className="p-1 text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Broadcast Form */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-rose-600 animate-pulse" /> Create Broadcast
            </h3>

            <form onSubmit={handleCreateAlert} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Alert Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., SafeWalk Extra Escorts Active"
                  value={newAlertTitle}
                  onChange={(e) => setNewAlertTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-campus-500 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Alert Details
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Short description displayed to all users..."
                  value={newAlertMessage}
                  onChange={(e) => setNewAlertMessage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-campus-500 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Severity Level
                </label>
                <select
                  value={newAlertSeverity}
                  onChange={(e) => setNewAlertSeverity(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-campus-500 text-slate-900 dark:text-white"
                >
                  <option value="urgent">Urgent / Critical</option>
                  <option value="notice">Campus Notice</option>
                  <option value="event">Event Alert</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <Radio className="w-4 h-4" />
                <span>Broadcast Alert Now</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 6: AI HELPDESK HEALTH */}
      {activeTab === "ai" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-500" /> Smart Helpdesk AI Engine Status
              </h2>
              <p className="text-xs text-slate-500">Live health monitoring of Google Gemini AI and City University Knowledge Base</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 100% Operational
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
              <span className="text-slate-400 text-[11px] font-bold uppercase">Primary AI Model</span>
              <p className="text-sm font-black text-slate-900 dark:text-white">Gemini 1.5 Flash</p>
              <p className="text-[10px] text-emerald-600 font-semibold">Active & Configured in Vercel</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
              <span className="text-slate-400 text-[11px] font-bold uppercase">Average Latency</span>
              <p className="text-sm font-black text-slate-900 dark:text-white">380 ms</p>
              <p className="text-[10px] text-slate-500 font-semibold">Real-time streaming responses</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
              <span className="text-slate-400 text-[11px] font-bold uppercase">Knowledge Base Nodes</span>
              <p className="text-sm font-black text-slate-900 dark:text-white">8 Comprehensive Modules</p>
              <p className="text-[10px] text-slate-500 font-semibold">Routines, Bus, Clubs, Exams, SafeWalk</p>
            </div>
          </div>

          <div className="p-4 bg-campus-50 dark:bg-campus-950/40 border border-campus-200 dark:border-campus-800/60 rounded-xl space-y-2 text-xs">
            <h4 className="font-bold text-campus-900 dark:text-campus-200">Knowledge Base Verification Checklist</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> CSE Batch 64, 65, 66 Daily Class Routines</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Shuttle Bus Routes A, B & C Timetables</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 24/7 SafeWalk Dispatch & Blue Light Hotlines</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Academic Vault Past Question Paper Index</li>
            </ul>
          </div>
        </div>
      )}

      {/* CREATE EVENT MODAL */}
      {isCreateEventOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-campus-600" /> Create Campus Event
              </h3>
              <button
                onClick={() => setIsCreateEventOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., CPCCU Competitive Programming Sprint"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-campus-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Organizing Club
                  </label>
                  <select
                    value={newEvent.organizer}
                    onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  >
                    <option value="CPCCU">CPCCU (Programming)</option>
                    <option value="Cultural Club">Cultural Club</option>
                    <option value="Robotics Club">Robotics Club</option>
                    <option value="Debate Club">Debate Club</option>
                    <option value="Sports Club">Sports Club</option>
                    <option value="University Admin">University Central</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Sports">Sports</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Academic">Academic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    required
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    required
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Campus Location
                  </label>
                  <input
                    type="text"
                    required
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Max Capacity
                  </label>
                  <input
                    type="number"
                    required
                    value={newEvent.maxCapacity}
                    onChange={(e) => setNewEvent({ ...newEvent, maxCapacity: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Details for students..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateEventOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-campus-600 hover:bg-campus-700 text-white rounded-xl font-bold shadow-md"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
