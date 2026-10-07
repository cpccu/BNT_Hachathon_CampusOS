import React from "react";
import Link from "next/link";
import { GraduationCap, ShieldAlert, Heart, ExternalLink, Activity, PhoneCall } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Emergency dispatch banner */}
      <div className="bg-campus-950/80 border-b border-campus-800/50 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs gap-2">
          <div className="flex items-center space-x-2 text-slate-200">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold text-white">Campus 24/7 Safety & Dispatch Hotline:</span>
            <span className="font-mono text-amber-300">(555) 019-9111</span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-emerald-400 font-medium">Campus Wi-Fi & Services: All Normal</span>
            </span>
            <span className="text-slate-600">|</span>
            <span>Blue Light Stations: 42 Active</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-campus-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                Campus<span className="text-campus-400">OS</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The unified digital operating system for City University students, faculty, and student innovators. Built for speed, collaboration, and academic excellence.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>CityHack 2026 Edition</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Core Modules
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home Dashboard & Pulse
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  Club & Event Engine
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">
                  Study Pods & Resource Hub
                </Link>
              </li>
              <li>
                <a href="#schedule" className="hover:text-white transition-colors">
                  Course Timetable & Roster
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Campus Services */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              University Services
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                  University Library Portal <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                  NVIDIA GPU Cluster Slurm <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                  Health & Wellness Center <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                  Makerspace Safety Certification <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Hackathon Project Info */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Hackathon Project
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Developed for the City University 24-Hour Hackathon with Next.js App Router, Tailwind CSS, and Lucide icons.
            </p>
            <div className="text-xs text-slate-400">
              <span className="block font-semibold text-slate-200">City University Tech Stack:</span>
              <span className="text-[11px] font-mono text-campus-400">TypeScript • Tailwind • React 18</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} City University • CampusOS System. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-400 cursor-pointer">Student Honor Code</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy & Data Governance</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
