import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { MOCK_LOST_AND_FOUND, MOCK_COMPLAINTS, MOCK_EVENTS } from "@/data/mockData";

export interface DatabaseProvider {
  getLostItems(): Promise<any[]>;
  getFoundItems(): Promise<any[]>;
  getComplaints(): Promise<any[]>;
  getEvents(): Promise<any[]>;
  addLostItem(item: any): Promise<void>;
  addFoundItem(item: any): Promise<void>;
  addComplaint(complaint: any): Promise<void>;
  addEvent(event: any): Promise<void>;
  checkInAttendee(eventId: string, ticketId: string, studentId: string): Promise<boolean>;
  getCheckIns(eventId: string): Promise<any[]>;
}

// Normalizer for lost/found items so UI properties (itemName, contactInfo, reporterName) always exist
function normalizeLostFound(item: any) {
  return {
    id: item.id || `item-${Date.now()}`,
    type: item.type || "Lost",
    itemName: item.itemName || item.title || "Unspecified Item",
    category: item.category || "Other",
    description: item.description || "",
    location: item.location || "Campus",
    date: item.date || new Date().toISOString().split("T")[0],
    contactInfo: item.contactInfo || item.contact || "Campus Security Desk",
    status: item.status || "Active",
    reporterName: item.reporterName || item.reporter_id || "Campus Member",
    imageUrl: item.imageUrl || item.image_url,
  };
}

export const LocalDB: DatabaseProvider = {
  async getLostItems() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("lost_found_items")
          .select("*")
          .eq("type", "Lost")
          .order("created_at", { ascending: false });
        if (!error && data) {
          const normalized = data.map(normalizeLostFound);
          if (typeof window !== "undefined") {
            localStorage.setItem("db_lost_items", JSON.stringify(normalized));
          }
          return normalized;
        }
      } catch (err) {
        console.warn("Supabase getLostItems fallback to local:", err);
      }
    }

    if (typeof window === "undefined") return MOCK_LOST_AND_FOUND.filter(i => i.type === "Lost").map(normalizeLostFound);
    const stored = localStorage.getItem("db_lost_items");
    if (stored) return JSON.parse(stored).map(normalizeLostFound);
    const initial = MOCK_LOST_AND_FOUND.filter(i => i.type === "Lost").map(normalizeLostFound);
    localStorage.setItem("db_lost_items", JSON.stringify(initial));
    return initial;
  },

  async getFoundItems() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("lost_found_items")
          .select("*")
          .eq("type", "Found")
          .order("created_at", { ascending: false });
        if (!error && data) {
          const normalized = data.map(normalizeLostFound);
          if (typeof window !== "undefined") {
            localStorage.setItem("db_found_items", JSON.stringify(normalized));
          }
          return normalized;
        }
      } catch (err) {
        console.warn("Supabase getFoundItems fallback to local:", err);
      }
    }

    if (typeof window === "undefined") return MOCK_LOST_AND_FOUND.filter(i => i.type === "Found").map(normalizeLostFound);
    const stored = localStorage.getItem("db_found_items");
    if (stored) return JSON.parse(stored).map(normalizeLostFound);
    const initial = MOCK_LOST_AND_FOUND.filter(i => i.type === "Found").map(normalizeLostFound);
    localStorage.setItem("db_found_items", JSON.stringify(initial));
    return initial;
  },

  async getComplaints() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("complaints")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error && data && data.length > 0) {
          return data.map((c: any) => ({
            id: c.id,
            title: c.title || "Complaint",
            category: c.category || "Facility",
            location: c.location || "Campus",
            date: c.date || new Date().toISOString().split("T")[0],
            status: c.status || "Pending",
            priority: c.priority || "Normal",
            description: c.description || "",
            studentId: c.student_id || c.studentId || "Student",
          }));
        }
      } catch (err) {
        console.warn("Supabase getComplaints fallback to local:", err);
      }
    }

    if (typeof window === "undefined") return MOCK_COMPLAINTS;
    const stored = localStorage.getItem("db_complaints");
    if (stored) return JSON.parse(stored);
    localStorage.setItem("db_complaints", JSON.stringify(MOCK_COMPLAINTS));
    return MOCK_COMPLAINTS;
  },

  async getEvents() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error && data && data.length > 0) {
          return data.map((ev: any) => ({
            ...ev,
            attendeesCount: ev.attendees_count ?? ev.attendeesCount ?? 0,
            maxCapacity: ev.max_capacity ?? ev.maxCapacity ?? 100,
          }));
        }
      } catch (err) {
        console.warn("Supabase getEvents fallback to local:", err);
      }
    }

    if (typeof window === "undefined") return MOCK_EVENTS;
    const stored = localStorage.getItem("campusos_events_list_v2");
    if (stored) return JSON.parse(stored);
    localStorage.setItem("campusos_events_list_v2", JSON.stringify(MOCK_EVENTS));
    return MOCK_EVENTS;
  },

  async addLostItem(item) {
    const normalized = normalizeLostFound(item);
    if (isSupabaseConfigured) {
      try {
        await supabase.from("lost_found_items").insert([{
          id: normalized.id,
          title: normalized.itemName,
          category: normalized.category,
          location: normalized.location,
          date: normalized.date,
          status: "Open",
          type: "Lost",
          contact: normalized.contactInfo,
          description: normalized.description,
          reporter_id: normalized.reporterName,
        }]);
      } catch (err) {
        console.warn("Supabase addLostItem failed, falling back to local:", err);
      }
    }

    const items = await this.getLostItems();
    items.unshift(normalized);
    if (typeof window !== "undefined") {
      localStorage.setItem("db_lost_items", JSON.stringify(items));
    }
  },

  async addFoundItem(item) {
    const normalized = normalizeLostFound(item);
    if (isSupabaseConfigured) {
      try {
        await supabase.from("lost_found_items").insert([{
          id: normalized.id,
          title: normalized.itemName,
          category: normalized.category,
          location: normalized.location,
          date: normalized.date,
          status: "Open",
          type: "Found",
          contact: normalized.contactInfo,
          description: normalized.description,
          reporter_id: normalized.reporterName,
        }]);
      } catch (err) {
        console.warn("Supabase addFoundItem failed, falling back to local:", err);
      }
    }

    const items = await this.getFoundItems();
    items.unshift(normalized);
    if (typeof window !== "undefined") {
      localStorage.setItem("db_found_items", JSON.stringify(items));
    }
  },

  async addComplaint(complaint) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from("complaints").insert([{
          id: complaint.id || `comp-${Date.now()}`,
          title: complaint.title,
          category: complaint.category,
          location: complaint.location,
          date: complaint.date,
          status: complaint.status || "Submitted",
          priority: complaint.priority || "Normal",
          description: complaint.description,
          student_id: complaint.studentId || "Student",
        }]);
      } catch (err) {
        console.warn("Supabase addComplaint failed, falling back to local:", err);
      }
    }

    const complaints = await this.getComplaints();
    complaints.unshift(complaint);
    if (typeof window !== "undefined") {
      localStorage.setItem("db_complaints", JSON.stringify(complaints));
    }
  },

  async addEvent(event) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from("events").insert([{
          id: event.id || `evt-${Date.now()}`,
          title: event.title,
          organizer: event.organizer,
          category: event.category,
          date: event.date,
          time: event.time,
          location: event.location,
          attendees_count: event.attendeesCount || 0,
          max_capacity: event.maxCapacity || 100,
          tags: event.tags || [],
          description: event.description,
          featured: event.featured || false,
        }]);
      } catch (err) {
        console.warn("Supabase addEvent failed, falling back to local:", err);
      }
    }

    const events = await this.getEvents();
    events.unshift(event);
    if (typeof window !== "undefined") {
      localStorage.setItem("campusos_events_list_v2", JSON.stringify(events));
    }
  },

  async checkInAttendee(eventId: string, ticketId: string, studentId: string) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from("rsvps").upsert([{
          event_id: eventId,
          student_id: studentId,
          qr_code_hash: ticketId,
          status: "checked_in",
        }]);
      } catch (err) {
        console.warn("Supabase checkInAttendee failed, falling back to local:", err);
      }
    }

    if (typeof window === "undefined") return true;
    const key = `campusos_checkins_${eventId}`;
    const stored = localStorage.getItem(key);
    const list = stored ? JSON.parse(stored) : [];
    const record = {
      ticketId,
      studentId,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      date: new Date().toLocaleDateString(),
      verified: true
    };
    list.unshift(record);
    localStorage.setItem(key, JSON.stringify(list));
    return true;
  },

  async getCheckIns(eventId: string) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("rsvps")
          .select("*")
          .eq("event_id", eventId)
          .eq("status", "checked_in");
        if (!error && data) return data;
      } catch (err) {
        console.warn("Supabase getCheckIns failed, falling back to local:", err);
      }
    }

    if (typeof window === "undefined") return [];
    const key = `campusos_checkins_${eventId}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  }
};
