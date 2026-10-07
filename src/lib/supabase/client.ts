import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith("https://") &&
  !supabaseUrl.includes("your-project-id")
);

// If configured, use real Supabase client. Otherwise, use an initial placeholder client
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient(
      "https://campusos-mock.supabase.co",
      "mock-anon-key-cityuni-hackathon"
    );

export interface StudentUser {
  id: string;
  email: string;
  studentId: string;
  fullName: string;
  batch: string;
  department: string;
  role: "student" | "club_admin" | "faculty" | "admin";
  avatarUrl?: string;
}

export interface EventRecord {
  id: string;
  title: string;
  club_name: string;
  date: string;
  location: string;
  description: string;
  category: string;
  max_capacity: number;
}

export interface RsvpRecord {
  id: string;
  user_id: string;
  event_id: string;
  qr_code_hash: string;
  status: "confirmed" | "checked_in" | "cancelled";
  created_at: string;
}

export interface ResourceRecord {
  id: string;
  title: string;
  department: string;
  course_code: string;
  resource_type: string;
  file_url: string;
  created_at: string;
}

/**
 * Generate a unique verification hash for event entry QR codes
 */
export function generateQrHash(studentId: string, eventId: string): string {
  const seed = `${studentId}-${eventId}-${Date.now()}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  const hex = Math.abs(hash).toString(16).padStart(8, "0");
  return `CU-QR-${hex.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
}
