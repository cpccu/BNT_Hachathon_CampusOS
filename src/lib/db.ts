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

import { MOCK_LOST_AND_FOUND, MOCK_COMPLAINTS, MOCK_EVENTS } from "@/data/mockData";

export const LocalDB: DatabaseProvider = {
  async getLostItems() {
    if (typeof window === "undefined") return MOCK_LOST_AND_FOUND.filter(i => i.type === "Lost");
    const stored = localStorage.getItem("db_lost_items");
    if (stored) return JSON.parse(stored);
    const initial = MOCK_LOST_AND_FOUND.filter(i => i.type === "Lost");
    localStorage.setItem("db_lost_items", JSON.stringify(initial));
    return initial;
  },

  async getFoundItems() {
    if (typeof window === "undefined") return MOCK_LOST_AND_FOUND.filter(i => i.type === "Found");
    const stored = localStorage.getItem("db_found_items");
    if (stored) return JSON.parse(stored);
    const initial = MOCK_LOST_AND_FOUND.filter(i => i.type === "Found");
    localStorage.setItem("db_found_items", JSON.stringify(initial));
    return initial;
  },

  async getComplaints() {
    if (typeof window === "undefined") return MOCK_COMPLAINTS;
    const stored = localStorage.getItem("db_complaints");
    if (stored) return JSON.parse(stored);
    localStorage.setItem("db_complaints", JSON.stringify(MOCK_COMPLAINTS));
    return MOCK_COMPLAINTS;
  },

  async getEvents() {
    if (typeof window === "undefined") return MOCK_EVENTS;
    const stored = localStorage.getItem("campusos_events_list_v2");
    if (stored) return JSON.parse(stored);
    localStorage.setItem("campusos_events_list_v2", JSON.stringify(MOCK_EVENTS));
    return MOCK_EVENTS;
  },

  async addLostItem(item) {
    const items = await this.getLostItems();
    items.unshift(item);
    localStorage.setItem("db_lost_items", JSON.stringify(items));
  },

  async addFoundItem(item) {
    const items = await this.getFoundItems();
    items.unshift(item);
    localStorage.setItem("db_found_items", JSON.stringify(items));
  },

  async addComplaint(complaint) {
    const complaints = await this.getComplaints();
    complaints.unshift(complaint);
    localStorage.setItem("db_complaints", JSON.stringify(complaints));
  },

  async addEvent(event) {
    const events = await this.getEvents();
    events.unshift(event);
    localStorage.setItem("campusos_events_list_v2", JSON.stringify(events));
  },

  async checkInAttendee(eventId: string, ticketId: string, studentId: string) {
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
    if (typeof window === "undefined") return [];
    const key = `campusos_checkins_${eventId}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  }
};
