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

export const LocalDB: DatabaseProvider = {
  async getLostItems() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("lost_found_items")
          .select("*")
          .eq("type", "Lost")
          .order("created_at", { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn("Supabase getLostItems fallback to local:", err);
      }
    }

    if (typeof window === "undefined") return MOCK_LOST_AND_FOUND.filter(i => i.type === "Lost");
    const stored = localStorage.getItem("db_lost_items");
    if (stored) return JSON.parse(stored);
    const initial = MOCK_LOST_AND_FOUND.filter(i => i.type === "Lost");
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
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn("Supabase getFoundItems fallback to local:", err);
      }
    }

    if (typeof window === "undefined") return MOCK_LOST_AND_FOUND.filter(i => i.type === "Found");
    const stored = localStorage.getItem("db_found_items");
    if (stored) return JSON.parse(stored);
    const initial = MOCK_LOST_AND_FOUND.filter(i => i.type === "Found");
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
        if (!error && data && data.length > 0) return data;
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
          // Normalize column names
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
    if (isSupabaseConfigured) {
      try {
        await supabase.from("lost_found_items").insert([{
          id: item.id || `lost-${Date.now()}`,
          title: item.title,
          category: item.category,
          location: item.location,
          date: item.date,
          status: item.status || "Open",
          type: "Lost",
          contact: item.contact,
          description: item.description,
        }]);
      } catch (err) {
        console.warn("Supabase addLostItem failed, falling back to local:", err);
      }
    }

    const items = await this.getLostItems();
    items.unshift(item);
    if (typeof window !== "undefined") {
      localStorage.setItem("db_lost_items", JSON.stringify(items));
    }
  },

  async addFoundItem(item) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from("lost_found_items").insert([{
          id: item.id || `found-${Date.now()}`,
          title: item.title,
          category: item.category,
          location: item.location,
          date: item.date,
          status: item.status || "Open",
          type: "Found",
          contact: item.contact,
          description: item.description,
        }]);
      } catch (err) {
        console.warn("Supabase addFoundItem failed, falling back to local:", err);
      }
    }

    const items = await this.getFoundItems();
    items.unshift(item);
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
