"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Calendar, 
  Bus, 
  HelpCircle, 
  BookOpen, 
  SearchCheck, 
  ShieldAlert, 
  X, 
  ArrowRight,
  Clock,
  Sparkles,
  Command
} from "lucide-react";

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Events" | "Shuttle" | "Academic" | "Services" | "Lost & Found";
  badge?: string;
  href: string;
  icon: any;
}

const SEARCH_DATABASE: SearchItem[] = [
  // Classes & Academics
  {
    id: "cls-1",
    title: "DS 420: Deep Learning Foundations & Ethics",
    subtitle: "Appearing Soon: 02:00 PM · Innovation Pavilion B12 · Prof. Kamal Hossain",
    category: "Academic",
    badge: "Next Up",
    href: "/#schedule",
    icon: Clock,
  },
  {
    id: "cls-2",
    title: "CSE 315: Software Engineering & Architecture Lab",
    subtitle: "CANCELLED: Faculty attending CPCCU Hackathon Sprint",
    category: "Academic",
    badge: "Cancelled",
    href: "/#schedule",
    icon: ShieldAlert,
  },
  {
    id: "cls-3",
    title: "MTH 310: Applied Probability & Stochastic Modeling",
    subtitle: "04:00 PM · Science Complex 108 · Dr. Farhana Yasmin",
    category: "Academic",
    href: "/#schedule",
    icon: BookOpen,
  },
  // Events
  {
    id: "evt-1",
    title: "CPCCU Hackathon '26 - 24hr Innovation Sprint",
    subtitle: "Innovation Pavilion · 184 RSVPs · Live Now",
    category: "Events",
    badge: "Featured",
    href: "/events",
    icon: Calendar,
  },
  {
    id: "evt-2",
    title: "AI & Autonomous Robotics Expo",
    subtitle: "Auditorium Complex · Tomorrow 10:00 AM",
    category: "Events",
    href: "/events",
    icon: Calendar,
  },
  {
    id: "evt-3",
    title: "Annual Tech Career & Internship Fair",
    subtitle: "Central Gymnasium · 45+ hiring companies",
    category: "Events",
    href: "/events",
    icon: Calendar,
  },
  // Shuttle Routes
  {
    id: "bus-1",
    title: "Mirpur Express (CityU Campus ↔ Mirpur 10)",
    subtitle: "Via Birulia, Rainkhola, Sony Square · Departs every 20m",
    category: "Shuttle",
    badge: "Live",
    href: "/shuttle",
    icon: Bus,
  },
  {
    id: "bus-2",
    title: "Uttara FastTrack (CityU Campus ↔ Sector 11)",
    subtitle: "Via Ashulia, Abdullahpur, House Building · Air-conditioned",
    category: "Shuttle",
    href: "/shuttle",
    icon: Bus,
  },
  {
    id: "bus-3",
    title: "Dhanmondi Shuttle (CityU Campus ↔ Shankar)",
    subtitle: "Via Gabtoli, Technical, Asad Gate · Peak Hours",
    category: "Shuttle",
    href: "/shuttle",
    icon: Bus,
  },
  // Services & Resources
  {
    id: "res-1",
    title: "Silent Study Pods & Level 3 Workstations",
    subtitle: "Main Library · 12 of 18 Pods Currently Open",
    category: "Services",
    badge: "Available",
    href: "/resources",
    icon: BookOpen,
  },
  {
    id: "res-2",
    title: "Campus AI Helpdesk & Automated Ticketing",
    subtitle: "Get instant answers regarding bus delays, notices & grading",
    category: "Services",
    badge: "AI Powered",
    href: "/helpdesk",
    icon: HelpCircle,
  },
  {
    id: "res-3",
    title: "Lost & Found Central Registry (Supabase Live)",
    subtitle: "Browse reported smart watches, student ID cards & keys",
    category: "Lost & Found",
    badge: "Live Sync",
    href: "/lost-and-found",
    icon: SearchCheck,
  },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Listen for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter items
  const filteredItems = query.trim() === ""
    ? SEARCH_DATABASE
    : SEARCH_DATABASE.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <>
      {/* Trigger Button inside Navbar or Floating trigger */}
      <div className="hidden lg:block">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/60 text-slate-500 dark:text-slate-400 text-xs transition-all shadow-2xs hover:shadow-xs group"
          title="Search CampusOS (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-campus-600 dark:group-hover:text-campus-400 transition-colors" />
          <span className="text-[12px] font-medium text-slate-500 dark:text-slate-400">Search routes, events, classes...</span>
          <kbd className="ml-2 font-mono text-[10px] bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400 font-bold shadow-2xs">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div 
            className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
              <Search className="w-5 h-5 text-campus-600 dark:text-campus-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search classes, events, shuttle, study pods (or press Esc)..."
                autoFocus
                className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
              />
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Chips */}
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-[11px]">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Filter:</span>
              {["All", "Academic", "Shuttle", "Events", "Services"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setQuery(cat === "All" ? "" : cat)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    (cat === "All" && query === "") || query.toLowerCase() === cat.toLowerCase()
                      ? "bg-campus-600 text-white shadow-2xs font-bold"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Results List */}
            <div className="max-h-96 overflow-y-auto p-2 space-y-1 divide-y divide-slate-50 dark:divide-slate-800/60">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <p className="text-sm font-semibold">No campus resources matched "{query}"</p>
                  <p className="text-xs text-slate-400 mt-1">Try searching for "shuttle", "DS 420", "library" or "hackathon"</p>
                </div>
              ) : (
                filteredItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item.href)}
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-campus-50 dark:bg-campus-950/80 text-campus-600 dark:text-campus-400 flex items-center justify-center shrink-0 border border-campus-100 dark:border-campus-900 group-hover:scale-105 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-campus-600 dark:group-hover:text-campus-400 transition-colors">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                item.badge === "Cancelled"
                                  ? "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-800"
                                  : item.badge === "Next Up"
                                  ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800 animate-pulse"
                                  : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800"
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-campus-600 dark:group-hover:text-campus-400 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100 shrink-0 ml-2" />
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-campus-500" />
                City University Live Intelligent Directory
              </span>
              <span className="hidden sm:inline">Press ESC to dismiss</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
