"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  supabase,
  isSupabaseConfigured,
  StudentUser,
} from "@/lib/supabase/client";

interface SignUpData {
  email: string;
  password: string;
  studentId: string;
  fullName: string;
  batch: string;
  department?: string;
}

interface AuthContextType {
  user: StudentUser | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (data: SignUpData) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  quickDemoLogin: (role?: "student" | "club_admin") => void;
}

const LOCAL_STORAGE_KEY = "campusos_current_user";

const DEFAULT_DEMO_STUDENT: StudentUser = {
  id: "cu-usr-892401",
  email: "jordan.patel@cityuni.edu",
  studentId: "CU-892401",
  fullName: "Jordan Patel",
  batch: "Class of 2026",
  department: "Computer Science",
  role: "student",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<StudentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      if (isSupabaseConfigured) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            // Fetch user profile from public.users table
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
        // Fallback demo mode: check localStorage or seed with default student if not logged out
        const saved = typeof window !== "undefined" ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
        const isLoggedOut = typeof window !== "undefined" ? localStorage.getItem("campusos_logged_out") === "true" : false;
        if (saved) {
          try {
            setUser(JSON.parse(saved));
          } catch {
            setUser(null);
          }
        } else if (isLoggedOut) {
          setUser(null);
        } else {
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
    if (isSupabaseConfigured) {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            student_id: data.studentId,
            full_name: data.fullName,
            batch: data.batch,
            department: data.department || "Computer Science",
          },
        },
      });

      if (authError) return { error: authError.message };

      if (authData.user) {
        // Also ensure public.users row exists
        await supabase.from("users").upsert({
          id: authData.user.id,
          email: data.email,
          student_id: data.studentId,
          full_name: data.fullName,
          batch: data.batch,
          department: data.department || "Computer Science",
          role: "student",
        });
      }

      return { error: null };
    } else {
      // Local demo mode simulation
      const newUser: StudentUser = {
        id: "cu-usr-" + Math.floor(100000 + Math.random() * 900000),
        email: data.email,
        studentId: data.studentId,
        fullName: data.fullName,
        batch: data.batch,
        department: data.department || "Computer Science",
        role: "student",
      };
      setUser(newUser);
      if (typeof window !== "undefined") {
        localStorage.removeItem("campusos_logged_out");
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser));
      }
      return { error: null };
    }
  };

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return { error: error.message };
      if (typeof window !== "undefined") {
        localStorage.removeItem("campusos_logged_out");
      }
      return { error: null };
    } else {
      // Local demo mode authentication
      const demoUser: StudentUser = {
        id: "cu-usr-892401",
        email: email || "jordan.patel@cityuni.edu",
        studentId: "CU-892401",
        fullName: email.split("@")[0].replace(".", " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Jordan Patel",
        batch: "Class of 2026",
        department: "Computer Science",
        role: "student",
      };
      setUser(demoUser);
      if (typeof window !== "undefined") {
        localStorage.removeItem("campusos_logged_out");
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(demoUser));
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

  const quickDemoLogin = (role: "student" | "club_admin" = "student") => {
    const demoUser: StudentUser = {
      id: role === "student" ? "cu-usr-892401" : "cu-admin-30129",
      email: role === "student" ? "jordan.patel@cityuni.edu" : "alex.chen.acm@cityuni.edu",
      studentId: role === "student" ? "CU-892401" : "CU-301290",
      fullName: role === "student" ? "Jordan Patel" : "Alex Chen (ACM Lead)",
      batch: role === "student" ? "Class of 2026" : "Class of 2025",
      department: "Computer Science",
      role: role,
    };
    setUser(demoUser);
    if (typeof window !== "undefined") {
      localStorage.removeItem("campusos_logged_out");
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(demoUser));
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
