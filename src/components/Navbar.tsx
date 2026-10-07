"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  CalendarDays,
  FolderKanban,
  LayoutDashboard,
  Menu,
  X,
  Bell,
  Search,
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
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, signOut, isConfigured } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  React.useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    }
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
    {
      name: "Home Dashboard",
      href: "/",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "Club & Event Engine",
      href: "/events",
      icon: CalendarDays,
      badge: "Live",
    },
    {
      name: "Resource Hub",
      href: "/resources",
      icon: FolderKanban,
      badge: "Pods 24/7",
    },
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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-sm">
      {/* Top micro banner for university hackathon */}
      <div className="bg-gradient-to-r from-campus-900 via-campus-800 to-campus-900 text-white text-xs py-1 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-gold-500 text-slate-950 animate-pulse">
              ⚡ LIVE HACKATHON SPRINT
            </span>
            <span className="hidden sm:inline text-slate-200">
              CityHack 2026 is underway in the Great Hall & Innovation Pavilion
            </span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-slate-300">
            <span className="hidden md:inline">Campus Helpdesk: (555) 019-4357</span>
            <span className="inline-flex items-center text-gold-400 font-medium hover:underline cursor-pointer">
              SafeWalk 24/7 Active
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & University Title */}
          <Link
            href="/"
            className="flex items-center space-x-3 group transition-transform active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-campus-600 via-campus-700 to-campus-900 flex items-center justify-center text-white shadow-md shadow-campus-600/20 group-hover:shadow-campus-600/40 transition-all">
              <GraduationCap className="w-6 h-6 transform group-hover:-rotate-6 transition-transform" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-campus-700 transition-colors">
                  Campus<span className="text-campus-600">OS</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-slate-100 text-slate-600 rounded border border-slate-200">
                  v2.4
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wide -mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                City University
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "text-campus-700 bg-campus-50/90 font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      active ? "text-campus-600" : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        active
                          ? "bg-campus-200 text-campus-800"
                          : "bg-slate-200/80 text-slate-700"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-campus-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Profile / Auth */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Search Pill */}
            <div className="relative hidden lg:block">
              <div className="flex items-center bg-slate-100 hover:bg-slate-200/80 text-slate-500 text-xs px-3 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer w-40 justify-between">
                <span className="flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <span>Search campus...</span>
                </span>
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white text-slate-500 rounded border border-slate-300">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-campus-500"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-campus-500"
                aria-label="Campus Alerts"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white animate-pulse" />
              </button>

              {/* Notification dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Campus Alerts (3)
                    </span>
                    <span
                      onClick={() => setNotificationsOpen(false)}
                      className="text-[11px] text-campus-600 font-medium cursor-pointer hover:underline"
                    >
                      Dismiss
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 text-xs">
                    <div className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer">
                      <p className="font-semibold text-slate-800">Hackathon Key Drop in 30m</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">Pick up swag bags at Turing 101.</p>
                    </div>
                    <div className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer">
                      <p className="font-semibold text-slate-800">Study Pod #3 Reserved</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">Pass confirmed for current student.</p>
                    </div>
                    <div className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer">
                      <p className="font-semibold text-slate-800">CS 381 Lab Graded</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">Score posted: 98/100.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile or Auth buttons */}
            {user ? (
              <div className="relative pl-2 border-l border-slate-200">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-1 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-campus-100 border border-campus-300 flex items-center justify-center font-bold text-campus-800 text-xs shadow-xs">
                    {getInitials(user.fullName)}
                  </div>
                  <div className="hidden xl:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-800 leading-none">
                      {user.fullName}
                    </span>
                    <span className="text-[10px] text-slate-500 leading-tight">
                      {user.studentId}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 leading-snug">{user.fullName}</p>
                      <p className="text-[11px] font-mono text-campus-600 font-semibold">{user.studentId}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 text-[10px] rounded-full bg-campus-50 text-campus-800 font-bold border border-campus-200">
                          {user.batch}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] rounded-full bg-slate-100 text-slate-700 font-medium">
                          {user.role === "club_admin" ? "Org Admin" : "Student"}
                        </span>
                      </div>
                    </div>

                    <div className="px-2 py-1">
                      <Link
                        href="/events"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <UserCheck className="w-3.5 h-3.5 text-campus-600" />
                        <span>My RSVPs & Memberships</span>
                      </Link>
                      <Link
                        href="/resources"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <Building className="w-3.5 h-3.5 text-campus-600" />
                        <span>My Facility Bookings</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 px-2 pt-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          signOut();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out of CampusOS</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-campus-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </Link>
                <Link
                  href="/signup"
                  className="px-3 py-1.5 text-xs font-bold text-white bg-campus-600 hover:bg-campus-700 rounded-lg shadow-xs transition-colors flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Alerts"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-campus-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-800" />
              ) : (
                <Menu className="w-6 h-6 text-slate-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white shadow-lg animate-in fade-in duration-200">
          <div className="px-4 pt-3 pb-2 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-medium transition-colors ${
                    active
                      ? "bg-campus-50 text-campus-700 font-bold border-l-4 border-campus-600"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={`w-5 h-5 ${
                        active ? "text-campus-600" : "text-slate-500"
                      }`}
                    />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-campus-100 text-campus-800 font-semibold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Profile & Auth Section */}
          <div className="pt-3 pb-4 border-t border-slate-100 px-4 bg-slate-50/70">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-campus-700 text-white flex items-center justify-center font-bold text-sm shadow">
                      {getInitials(user.fullName)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 leading-tight">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {user.studentId} • {user.batch}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut();
                    }}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Out</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <Link
                    href="/resources"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white rounded-lg border border-slate-200 font-medium text-slate-700 shadow-2xs hover:bg-slate-50"
                  >
                    <Shield className="w-3.5 h-3.5 text-campus-600" />
                    <span>SafeWalk Escort</span>
                  </Link>
                  <Link
                    href="/events"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 bg-campus-600 rounded-lg text-white font-medium shadow-2xs hover:bg-campus-700"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                    <span>Hackathon Hub</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white rounded-xl border border-slate-200 font-bold text-slate-700 text-xs"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Log In</span>
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-campus-600 rounded-xl text-white font-bold text-xs shadow-xs"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
