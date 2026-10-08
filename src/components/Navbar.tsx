"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  GraduationCap,
  CalendarDays,
  FolderKanban,
  LayoutDashboard,
  Menu,
  X,
  Bell,
  Sparkles,
  Shield,
  LogIn,
  LogOut,
  UserPlus,
  ChevronDown,
  UserCheck,
  Building,
  Moon,
  Sun,
  Zap,
  MessageSquare,
  Crown,
  Search,
  LifeBuoy,
  Bus,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleSignOut = async () => {
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    await signOut();
    router.push("/login");
  };

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard, badge: null },
    { name: "Events", href: "/events", icon: CalendarDays, badge: "Live" },
    { name: "Resources", href: "/resources", icon: FolderKanban, badge: null },
    { name: "Shuttle", href: "/shuttle", icon: Bus, badge: "Live" },
    { name: "Lost & Found", href: "/lost-and-found", icon: Search, badge: "New" },
    { name: "Help Desk", href: "/helpdesk", icon: LifeBuoy, badge: "AI" },
    ...(user?.role === "admin"
      ? [{ name: "Admin Console", href: "/admin", icon: Crown, badge: "Admin" }]
      : []),
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const getInitials = (name?: string) => {
    if (!name) return "CU";
    const parts = name.split(" ");
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "shadow-lg shadow-black/5 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60"
          : "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/40 dark:border-slate-800/40"
      }`}
    >
      {/* Hackathon Top Banner */}
      <div className="bg-gradient-to-r from-campus-900 via-indigo-900 to-campus-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDBNIDAgMjAgTCA0MCAyMCBNIDIwIDAgTCAyMCA0MCBNIDAgMzAgTCA0MCAzMCBNIDMwIDAgTCAzMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-gold-500 text-slate-950 animate-pulse tracking-wider uppercase">
              <Zap className="w-2.5 h-2.5" /> Live Sprint
            </span>
            <span className="hidden sm:inline text-slate-200 text-[11px]">
              CPCCU Hackathon '26 — Innovation Pavilion & Great Hall
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <span className="hidden md:flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SafeWalk 24/7 Active
            </span>
            <span className="hidden sm:inline">Helpdesk: (555) 019-4357</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-campus-400 to-campus-700 opacity-20 group-hover:opacity-40 blur-md transition-all duration-300" />
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-campus-600 to-campus-900 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex flex-col -space-y-0.5">
              <span className="text-[15px] font-black tracking-tight text-slate-900 dark:text-white leading-none">
                Campus<span className="text-campus-600">OS</span>
                <span className="ml-1.5 text-[9px] font-bold px-1 py-0.5 rounded bg-campus-50 dark:bg-campus-950 text-campus-600 border border-campus-200 dark:border-campus-800 align-middle">v2.4</span>
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wide flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                City University
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 group ${
                    active
                      ? "text-campus-700 dark:text-campus-400 bg-campus-50 dark:bg-campus-950/50"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${active ? "text-campus-600" : ""}`} />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400 uppercase tracking-wider">
                      {link.badge}
                    </span>
                  )}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-campus-400 to-campus-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-2">

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all duration-200"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <div className="transition-all duration-300">
                {isDark ? <Sun className="w-4.5 h-4.5 w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
              </div>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileDropdownOpen(false); }}
                className="relative w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all duration-200"
              >
                <Bell className="w-[18px] h-[18px]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-950 animate-pulse" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 pb-2 pt-1 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">Campus Alerts</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-100 text-rose-600 rounded-full">3 new</span>
                  </div>
                  <div className="divide-y divide-slate-50 dark:divide-slate-800">
                    {[
                      { icon: "⚡", title: "Hackathon Key Drop in 30m", sub: "Pick up swag bags at Turing 101." },
                      { icon: "📚", title: "Study Pod #3 Reserved", sub: "Pass confirmed for current student." },
                      { icon: "🏆", title: "CS 381 Lab Graded", sub: "Score posted: 98/100. Excellent work!" },
                    ].map((n) => (
                      <div key={n.title} className="px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5"><span>{n.icon}</span>{n.title}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{n.sub}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button onClick={() => setNotificationsOpen(false)} className="w-full text-[11px] font-bold text-campus-600 hover:underline">
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />

            {/* Auth */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => { setProfileDropdownOpen(!profileDropdownOpen); setNotificationsOpen(false); }}
                  className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-campus-500 to-campus-700 flex items-center justify-center font-black text-white text-xs shadow-md">
                    {getInitials(user.fullName)}
                  </div>
                  <div className="hidden xl:flex flex-col text-left">
                    <span className="text-[12px] font-bold text-slate-800 dark:text-slate-100 leading-tight">{user.fullName?.split(" ")[0]}</span>
                    <span className="text-[10px] text-slate-400 font-mono leading-none">{user.studentId}</span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${profileDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-campus-500 to-campus-700 flex items-center justify-center font-black text-white text-sm shadow-md">
                          {getInitials(user.fullName)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{user.fullName}</p>
                          <p className="text-[11px] font-mono text-campus-600">{user.studentId}</p>
                        </div>
                      </div>
                      <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 text-[10px] rounded-full bg-campus-50 dark:bg-campus-950 text-campus-700 dark:text-campus-400 font-bold border border-campus-200 dark:border-campus-800">{user.batch}</span>
                        <span className="px-2 py-0.5 text-[10px] rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                          {user.role === "admin" ? "👑 Campus Admin" : user.role === "club_admin" ? "🛡️ Org Admin" : "🎓 Student"}
                        </span>
                      </div>
                    </div>
                    <div className="px-2 py-1">
                      {user.role === "admin" && (
                        <Link href="/admin" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 rounded-xl transition-colors border border-amber-200 dark:border-amber-900/50 mb-1">
                          <Crown className="w-4 h-4 text-amber-600" /><span>Admin Management Console</span>
                        </Link>
                      )}
                      <Link href="/events" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
                        <UserCheck className="w-4 h-4 text-campus-600" /><span>My RSVPs & Memberships</span>
                      </Link>
                      <Link href="/resources" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
                        <Building className="w-4 h-4 text-campus-600" /><span>My Facility Bookings</span>
                      </Link>
                    </div>
                    <div className="border-t border-slate-100 dark:border-slate-800 px-2 pt-1">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors font-semibold"
                      >
                        <LogOut className="w-4 h-4" /><span>Sign Out of CampusOS</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="px-3.5 py-2 text-[12px] font-bold text-slate-700 dark:text-slate-300 hover:text-campus-700 dark:hover:text-campus-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 flex items-center gap-1.5">
                  <LogIn className="w-3.5 h-3.5" /> Log In
                </Link>
                <Link href="/signup" className="px-3.5 py-2 text-[12px] font-bold text-white bg-gradient-to-r from-campus-600 to-campus-700 hover:from-campus-500 hover:to-campus-600 rounded-xl shadow-md shadow-campus-600/20 transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95">
                  <UserPlus className="w-3.5 h-3.5" /> Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
              {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-3 pb-2 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                    active
                      ? "bg-campus-50 dark:bg-campus-950/50 text-campus-700 dark:text-campus-400 border-l-4 border-campus-600"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${active ? "text-campus-600" : "text-slate-400"}`} />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 uppercase tracking-wider">{link.badge}</span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="px-4 pt-3 pb-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-campus-500 to-campus-700 flex items-center justify-center font-black text-white text-sm">
                    {getInitials(user.fullName)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{user.fullName}</p>
                    <p className="text-[11px] text-slate-500 font-mono">{user.studentId} · {user.batch}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/resources" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-1.5 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300">
                    <Shield className="w-3.5 h-3.5 text-campus-600" /> SafeWalk
                  </Link>
                  <button onClick={handleSignOut} className="flex items-center justify-center gap-1.5 py-2.5 bg-rose-50 dark:bg-rose-950/30 rounded-xl text-xs font-bold text-rose-600">
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-1.5 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300">
                  <LogIn className="w-4 h-4" /> Log In
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-1.5 py-3 bg-gradient-to-r from-campus-600 to-campus-700 rounded-xl text-sm font-bold text-white shadow-md">
                  <UserPlus className="w-4 h-4" /> Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
