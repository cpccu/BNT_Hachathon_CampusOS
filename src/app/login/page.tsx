"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Sparkles,
  UserCheck,
  ShieldCheck,
  Crown,
  KeyRound,
  CheckCircle2,
  Copy,
  Info,
} from "lucide-react";
import { useAuth, PRESET_DEMO_ACCOUNTS } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, quickDemoLogin, isConfigured, user, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedRole, setCopiedRole] = useState<string | null>(null);

  // If already logged in, redirect appropriately
  useEffect(() => {
    if (!authLoading && user) {
      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter your university email or Student ID.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn(email, password);
      if (res.error) {
        setError(res.error);
        setLoading(false);
      } else {
        // Successful sign in
        if (email.toLowerCase().includes("admin@cityuniversity")) {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }
    } catch (err: any) {
      setError(err?.message || "Failed to authenticate.");
      setLoading(false);
    }
  };

  const handle1ClickLogin = (role: "student" | "club_admin" | "admin") => {
    quickDemoLogin(role);
    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  const handleFillCredentials = (emailVal: string, passVal: string) => {
    setEmail(emailVal);
    setPassword(passVal);
    setError(null);
  };

  const handleCopy = (text: string, roleName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRole(roleName);
    setTimeout(() => setCopiedRole(null), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-campus-600 to-campus-900 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
              <GraduationCap className="w-7 h-7" />
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Sign In to CampusOS
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            City University Unified Student & Administration Portal
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Hackathon Evaluation Demo Profiles Active</span>
          </div>
        </div>

        {/* 1-Click Demo Profiles Card */}
        <div className="bg-gradient-to-br from-campus-50 via-indigo-50/50 to-purple-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 border border-campus-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-campus-600" /> 
              Instant 1-Click Evaluation Login
            </span>
            <span className="text-[10px] text-campus-700 dark:text-campus-400 font-semibold bg-campus-100 dark:bg-campus-900/50 px-2 py-0.5 rounded-full">
              Zero typing required
            </span>
          </div>

          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            Select a demo persona to test the portal with full role permissions:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Student */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex flex-col justify-between hover:border-campus-400 transition-all shadow-2xs">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <UserCheck className="w-3.5 h-3.5 text-campus-600" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Student</span>
                </div>
                <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Jordan Patel</p>
                <p className="text-[10px] text-slate-400 font-mono">CU-892401 • CSE</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => handle1ClickLogin("student")}
                  className="w-full py-1.5 bg-campus-600 hover:bg-campus-700 text-white rounded-lg font-bold text-[11px] transition-all flex items-center justify-center gap-1 shadow-xs"
                >
                  <span>Login as Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillCredentials("student@cityuniversity.edu.bd", "demo1234")}
                  className="w-full py-1 text-[10px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                >
                  Fill credentials
                </button>
              </div>
            </div>

            {/* Club Admin */}
            <div className="bg-white dark:bg-slate-950 border border-purple-200 dark:border-purple-900/40 rounded-xl p-3 flex flex-col justify-between hover:border-purple-400 transition-all shadow-2xs">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                  <span className="text-xs font-bold text-purple-900 dark:text-purple-300">Club Admin</span>
                </div>
                <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Alex Chen</p>
                <p className="text-[10px] text-slate-400 font-mono">CPCCU Club Lead</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => handle1ClickLogin("club_admin")}
                  className="w-full py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-[11px] transition-all flex items-center justify-center gap-1 shadow-xs"
                >
                  <span>Login as Club Lead</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillCredentials("admin@cpccu.edu.bd", "demo1234")}
                  className="w-full py-1 text-[10px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                >
                  Fill credentials
                </button>
              </div>
            </div>

            {/* Super Admin */}
            <div className="bg-white dark:bg-slate-950 border border-amber-200 dark:border-amber-900/40 rounded-xl p-3 flex flex-col justify-between hover:border-amber-400 transition-all shadow-2xs">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Crown className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-xs font-bold text-amber-900 dark:text-amber-300">Campus Admin</span>
                </div>
                <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Dr. Mahfuz Rahman</p>
                <p className="text-[10px] text-slate-400 font-mono">Registrar & Admin</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => handle1ClickLogin("admin")}
                  className="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-[11px] transition-all flex items-center justify-center gap-1 shadow-xs"
                >
                  <span>Login as Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillCredentials("admin@cityuniversity.edu.bd", "admin1234")}
                  className="w-full py-1 text-[10px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                >
                  Fill credentials
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Manual Login Form Card */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Standard Credential Login
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sign in with your registered account or demo email
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Student Email or Campus ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="student@cityuniversity.edu.bd"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white dark:focus:bg-slate-900"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <span className="text-[11px] text-campus-600 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white dark:focus:bg-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-campus-600 hover:bg-campus-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2 hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Sign In to CampusOS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Judge Credentials Cheat Sheet */}
          <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-campus-600" />
                Demo Credentials Reference (Saved in README.md)
              </span>
            </div>
            <div className="overflow-x-auto text-[11px]">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-200 dark:border-slate-700">
                    <th className="py-1 pr-2 font-medium">Role</th>
                    <th className="py-1 px-2 font-medium">Email</th>
                    <th className="py-1 px-2 font-medium">Password</th>
                    <th className="py-1 pl-2 font-medium text-right">Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  <tr>
                    <td className="py-1.5 pr-2 font-semibold">Student</td>
                    <td className="py-1.5 px-2 font-mono text-slate-800 dark:text-slate-100">student@cityuniversity.edu.bd</td>
                    <td className="py-1.5 px-2 font-mono text-campus-600">demo1234</td>
                    <td className="py-1.5 pl-2 text-right">Portal & RSVPs</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 pr-2 font-semibold text-purple-600">Club Lead</td>
                    <td className="py-1.5 px-2 font-mono text-slate-800 dark:text-slate-100">admin@cpccu.edu.bd</td>
                    <td className="py-1.5 px-2 font-mono text-campus-600">demo1234</td>
                    <td className="py-1.5 pl-2 text-right">Event Creator</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 pr-2 font-semibold text-amber-600">Admin</td>
                    <td className="py-1.5 px-2 font-mono text-slate-800 dark:text-slate-100">admin@cityuniversity.edu.bd</td>
                    <td className="py-1.5 px-2 font-mono text-amber-600 font-bold">admin1234</td>
                    <td className="py-1.5 pl-2 text-right">Admin Console</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-2 text-center border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs text-slate-500">
              New student at City University?{" "}
              <Link href="/signup" className="text-campus-600 hover:text-campus-800 font-bold hover:underline">
                Register Student Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
