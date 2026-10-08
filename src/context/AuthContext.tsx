"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  supabase,
  isSupabaseConfigured,
  StudentUser,
} from "@/lib/supabase/client";

export interface RegisteredUserRecord extends StudentUser {
  password?: string;
}

export interface SignUpData {
  email: string;
  password: string;
  studentId: string;
  fullName: string;
  batch: string;
  department?: string;
  role?: "student" | "club_admin" | "admin";
}

interface AuthContextType {
  user: StudentUser | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (data: SignUpData) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  quickDemoLogin: (role?: "student" | "club_admin" | "admin") => void;
  getAllUsers: () => RegisteredUserRecord[];
  updateUserRole: (userId: string, newRole: "student" | "club_admin" | "admin") => void;
}

export const LOCAL_STORAGE_KEY = "campusos_current_user";
export const USER_DATABASE_KEY = "campusos_user_database_v2";

/**
 * Official Hackathon Demo Accounts
 * All credentials are documented in README.md and supported with 1-click login
 */
export const PRESET_DEMO_ACCOUNTS: RegisteredUserRecord[] = [
  {
    id: "cu-usr-892401",
    email: "student@cityuniversity.edu.bd",
    password: "demo1234",
    studentId: "CU-892401",
    fullName: "Junaid Parvez",
    batch: "Batch 65 (Class of 2026)",
    department: "Computer Science & Engineering",
    role: "student",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "cu-usr-892401-legacy",
    email: "jordan.patel@cityuni.edu",
    password: "demo1234",
    studentId: "CU-892401",
    fullName: "Junaid Parvez",
    batch: "Batch 65 (Class of 2026)",
    department: "Computer Science & Engineering",
    role: "student",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "cu-admin-30129",
    email: "admin@cpccu.edu.bd",
    password: "demo1234",
    studentId: "CU-301290",
    fullName: "Abir Chowdhury (CPCCU Lead)",
    batch: "Batch 63 (Class of 2025)",
    department: "Computer Science & Engineering",
    role: "club_admin",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "cu-sysadmin-001",
    email: "admin@cityuniversity.edu.bd",
    password: "admin1234",
    studentId: "CU-ADMIN-001",
    fullName: "Dr. Mahfuz Rahman (Campus Registrar & Admin)",
    batch: "Faculty & Administration",
    department: "Central IT & Campus Administration",
    role: "admin",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
  },
];

export const DEFAULT_DEMO_STUDENT = PRESET_DEMO_ACCOUNTS[0];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<StudentUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper to load registered users from localStorage
  const loadLocalUserDb = (): RegisteredUserRecord[] => {
    if (typeof window === "undefined") return PRESET_DEMO_ACCOUNTS;
    try {
      const raw = localStorage.getItem(USER_DATABASE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Map existing accounts, overriding preset demo accounts with current metadata
        const updated = parsed.map((u: RegisteredUserRecord) => {
          const match = PRESET_DEMO_ACCOUNTS.find(
            (p) => p.email.toLowerCase() === u.email.toLowerCase()
          );
          return match ? { ...u, ...match } : u;
        });
        const emails = new Set(updated.map((u: RegisteredUserRecord) => u.email.toLowerCase()));
        for (const preset of PRESET_DEMO_ACCOUNTS) {
          if (!emails.has(preset.email.toLowerCase())) {
            updated.push(preset);
          }
        }
        localStorage.setItem(USER_DATABASE_KEY, JSON.stringify(updated));
        return updated;
      }
    } catch (e) {
      console.error("Failed to parse local user database", e);
    }
    // Seed initial database
    try {
      localStorage.setItem(USER_DATABASE_KEY, JSON.stringify(PRESET_DEMO_ACCOUNTS));
    } catch (e) {
      console.error(e);
    }
    return PRESET_DEMO_ACCOUNTS;
  };

  useEffect(() => {
    async function initAuth() {
      if (isSupabaseConfigured) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            const { data: profile } = await supabase
              .from("users")
              .select("*")
              .eq("id", session.user.id)
              .single();

            if (profile) {
              setUser({
                id: profile.id,
                email: profile.email,
                studentId: profile.student_id,
                fullName: profile.full_name,
                batch: profile.batch,
                department: profile.department || "Computer Science",
                role: profile.role || "student",
                avatarUrl: profile.avatar_url,
              });
            } else {
              setUser({
                id: session.user.id,
                email: session.user.email || "",
                studentId: (session.user.user_metadata?.student_id as string) || "CU-DEMO",
                fullName: (session.user.user_metadata?.full_name as string) || "Student",
                batch: (session.user.user_metadata?.batch as string) || "Class of 2026",
                department: (session.user.user_metadata?.department as string) || "Computer Science",
                role: "student",
              });
            }
          }
        } catch (err) {
          console.warn("Supabase auth check fallback:", err);
        }
      } else {
        // Local mode: initialize user database
        loadLocalUserDb();

        const saved = typeof window !== "undefined" ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
        const isLoggedOut = typeof window !== "undefined" ? localStorage.getItem("campusos_logged_out") === "true" : false;

        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            const presetMatch = PRESET_DEMO_ACCOUNTS.find(
              (p) => p.email.toLowerCase() === parsed?.email?.toLowerCase()
            );
            if (presetMatch) {
              const fresh = {
                id: presetMatch.id,
                email: presetMatch.email,
                studentId: presetMatch.studentId,
                fullName: presetMatch.fullName,
                batch: presetMatch.batch,
                department: presetMatch.department,
                role: presetMatch.role,
                avatarUrl: presetMatch.avatarUrl,
              };
              setUser(fresh);
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fresh));
            } else {
              setUser(parsed);
            }
          } catch {
            setUser(null);
          }
        } else if (isLoggedOut) {
          setUser(null);
        } else {
          // Default initial state for first-time evaluators
          setUser(DEFAULT_DEMO_STUDENT);
          if (typeof window !== "undefined") {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_DEMO_STUDENT));
          }
        }
      }
      setLoading(false);
    }

    initAuth();

    if (isSupabaseConfigured) {
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session?.user) {
            const { data: profile } = await supabase
              .from("users")
              .select("*")
              .eq("id", session.user.id)
              .single();

            setUser({
              id: session.user.id,
              email: session.user.email || "",
              studentId: profile?.student_id || session.user.user_metadata?.student_id || "CU-USER",
              fullName: profile?.full_name || session.user.user_metadata?.full_name || "CityUni Student",
              batch: profile?.batch || session.user.user_metadata?.batch || "Class of 2026",
              department: profile?.department || "Computer Science",
              role: profile?.role || "student",
            });
          } else {
            setUser(null);
          }
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const signUp = async (data: SignUpData): Promise<{ error: string | null }> => {
    const cleanEmail = (data.email || "").trim().toLowerCase();
    const cleanStudentId = (data.studentId || "").trim().toUpperCase();

    if (isSupabaseConfigured) {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: cleanEmail,
        password: data.password,
        options: {
          data: {
            student_id: cleanStudentId,
            full_name: data.fullName,
            batch: data.batch,
            department: data.department || "Computer Science & Engineering",
          },
        },
      });

      if (authError) return { error: authError.message };

      if (authData.user) {
        await supabase.from("users").upsert({
          id: authData.user.id,
          email: cleanEmail,
          student_id: cleanStudentId,
          full_name: data.fullName,
          batch: data.batch,
          department: data.department || "Computer Science & Engineering",
          role: data.role || "student",
        });
      }

      return { error: null };
    } else {
      // Local mode authentication with persistence
      const usersDb = loadLocalUserDb();

      if (usersDb.some((u) => u.email.toLowerCase() === cleanEmail)) {
        return { error: "An account with this email address already exists. Please sign in." };
      }

      if (usersDb.some((u) => u.studentId.toUpperCase() === cleanStudentId)) {
        return { error: "An account with this Student ID already exists. Please verify your credentials." };
      }

      const newUser: RegisteredUserRecord = {
        id: "cu-usr-" + Math.floor(100000 + Math.random() * 900000),
        email: cleanEmail,
        password: data.password,
        studentId: cleanStudentId,
        fullName: data.fullName.trim(),
        batch: data.batch,
        department: data.department || "Computer Science & Engineering",
        role: data.role || "student",
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.fullName)}`,
      };

      const updatedDb = [...usersDb, newUser];
      if (typeof window !== "undefined") {
        localStorage.setItem(USER_DATABASE_KEY, JSON.stringify(updatedDb));
        localStorage.removeItem("campusos_logged_out");
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser));
      }

      setUser(newUser);
      return { error: null };
    }
  };

  const signIn = async (emailOrId: string, passwordInput: string): Promise<{ error: string | null }> => {
    const cleanId = (emailOrId || "").trim().toLowerCase();
    const cleanPass = (passwordInput || "").trim();

    if (!cleanId) return { error: "Please enter your email or Student ID." };
    if (!cleanPass) return { error: "Please enter your password." };

    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signInWithPassword({
        email: cleanId,
        password: cleanPass,
      });
      if (error) return { error: error.message };
      if (typeof window !== "undefined") {
        localStorage.removeItem("campusos_logged_out");
      }
      return { error: null };
    } else {
      // Local authentication with real password verification
      const usersDb = loadLocalUserDb();

      const found = usersDb.find(
        (u) =>
          u.email.toLowerCase() === cleanId ||
          u.studentId.toLowerCase() === cleanId
      );

      if (!found) {
        return {
          error: "No account found matching this email or Student ID. Please check your credentials or click a 1-Click Demo Profile below.",
        };
      }

      if (found.password && found.password !== cleanPass) {
        return {
          error: "Incorrect password for this account. Check demo credentials in README.md or click 1-Click Demo Login.",
        };
      }

      const activeUser: StudentUser = {
        id: found.id,
        email: found.email,
        studentId: found.studentId,
        fullName: found.fullName,
        batch: found.batch,
        department: found.department,
        role: found.role,
        avatarUrl: found.avatarUrl,
      };

      setUser(activeUser);
      if (typeof window !== "undefined") {
        localStorage.removeItem("campusos_logged_out");
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(activeUser));
      }
      return { error: null };
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn("Supabase sign out error:", err);
      }
    }
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.setItem("campusos_logged_out", "true");
    }
    router.push("/login");
  };

  const quickDemoLogin = (role: "student" | "club_admin" | "admin" = "student") => {
    let target = PRESET_DEMO_ACCOUNTS.find((u) => u.role === role);
    if (!target) target = PRESET_DEMO_ACCOUNTS[0];

    const activeUser: StudentUser = {
      id: target.id,
      email: target.email,
      studentId: target.studentId,
      fullName: target.fullName,
      batch: target.batch,
      department: target.department,
      role: target.role,
      avatarUrl: target.avatarUrl,
    };

    setUser(activeUser);
    if (typeof window !== "undefined") {
      localStorage.removeItem("campusos_logged_out");
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(activeUser));
    }
  };

  const getAllUsers = (): RegisteredUserRecord[] => {
    return loadLocalUserDb();
  };

  const updateUserRole = (userId: string, newRole: "student" | "club_admin" | "admin") => {
    const db = loadLocalUserDb();
    const updated = db.map((u) => (u.id === userId ? { ...u, role: newRole } : u));
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_DATABASE_KEY, JSON.stringify(updated));
    }
    if (user && user.id === userId) {
      const updatedCurrent = { ...user, role: newRole };
      setUser(updatedCurrent);
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCurrent));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured: isSupabaseConfigured,
        signIn,
        signUp,
        signOut,
        quickDemoLogin,
        getAllUsers,
        updateUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
