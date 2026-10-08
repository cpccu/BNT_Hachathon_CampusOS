"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Lock, GraduationCap, ShieldCheck, ArrowRight, UserPlus } from "lucide-react";
import Link from "next/link";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<"student" | "club_admin" | "faculty" | "admin">;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, loading, quickDemoLogin } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-campus-200 border-t-campus-600 rounded-full animate-spin" />
        <p className="text-xs font-bold tracking-wider uppercase text-slate-400">Verifying Campus Credentials...</p>
      </div>
    );
  }

  // Not logged in -> Show professional Gatekeeper Access Card
  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
          
          <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-campus-500 to-campus-800 flex items-center justify-center text-white shadow-lg">
            <Lock className="w-8 h-8" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-campus-600 dark:text-campus-400 bg-campus-50 dark:bg-campus-950/80 px-2.5 py-1 rounded-full border border-campus-200 dark:border-campus-800">
              City University Security Protocol
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Authentication Required
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              This module is secured for enrolled students, faculty, and university officials. Please sign in with your City University account to access this feature.
            </p>
          </div>

          {/* Quick Demo Login Presets */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2.5 text-left">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              1-Click Demo Evaluation Sign-In
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => quickDemoLogin("student")}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-campus-50 dark:hover:bg-campus-950/60 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <GraduationCap className="w-3.5 h-3.5 text-campus-600" />
                Student
              </button>
              <button
                onClick={() => quickDemoLogin("club_admin")}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/60 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                Club Lead
              </button>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-2.5">
            <Link
              href="/login"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-campus-600 to-campus-700 hover:from-campus-500 hover:to-campus-600 text-white font-bold text-sm shadow-md shadow-campus-500/20 transition-all"
            >
              <span>Sign In to Your Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/signup"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create New Student Account</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Check role authorization
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 rounded-3xl p-8 text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Access Prohibited</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Your role (<strong className="uppercase">{user.role}</strong>) does not have authorization to view or execute actions on this console.
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
