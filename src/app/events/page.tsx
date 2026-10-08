"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarDays,
  Users,
  Search,
  Filter,
  Sparkles,
  PlusCircle,
  Ticket,
  CheckCircle2,
  Building,
  ArrowRight,
  ShieldAlert,
  RotateCcw,
  SlidersHorizontal,
  Flame,
  Award,
} from "lucide-react";
import { MOCK_EVENTS, MOCK_CLUBS, CampusEvent, StudentClub } from "@/data/mockData";
import EventCard from "@/components/EventCard";
import ClubCard from "@/components/ClubCard";
import QrTicketModal from "@/components/QrTicketModal";
import CreateEventModal from "@/components/CreateEventModal";
import ActionNotificationModal from "@/components/ActionNotificationModal";
import { useAuth } from "@/context/AuthContext";

const STORAGE_EVENTS_KEY = "campusos_events_list_v2";
const STORAGE_CLUBS_KEY = "campusos_clubs_list_v2";

export default function EventsAndClubsPage() {
  const { user, quickDemoLogin } = useAuth();

  // State initialized with mock data or saved localStorage cache
  const [events, setEvents] = useState<CampusEvent[]>(MOCK_EVENTS);
  const [clubs, setClubs] = useState<StudentClub[]>(MOCK_CLUBS);

  // Filter & Feed navigation
  const [activeTab, setActiveTab] = useState<"all_events" | "my_rsvps" | "clubs">("all_events");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClubId, setSelectedClubId] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"soonest" | "capacity" | "popular">("soonest");

  // Modals state
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [selectedTicketEvent, setSelectedTicketEvent] = useState<CampusEvent | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [preselectedClubForCreate, setPreselectedClubForCreate] = useState<string | undefined>();
  const [notificationModal, setNotificationModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    referenceId?: string;
  }>({
    isOpen: false,
    title: "",
    message: "",
  });

  // Hydrate from localStorage once mounted
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedEvents = localStorage.getItem(STORAGE_EVENTS_KEY);
        if (savedEvents) {
          const parsed = JSON.parse(savedEvents);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setEvents(parsed);
          }
        }
        const savedClubs = localStorage.getItem(STORAGE_CLUBS_KEY);
        if (savedClubs) {
          const parsedClubs = JSON.parse(savedClubs);
          if (Array.isArray(parsedClubs) && parsedClubs.length > 0) {
            setClubs(parsedClubs);
          }
        }
      } catch (err) {
        console.warn("Error restoring stored events or clubs:", err);
      }
    }
  }, []);

  // Save changes to localStorage
  const saveEvents = (updated: CampusEvent[]) => {
    setEvents(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_EVENTS_KEY, JSON.stringify(updated));
      } catch (err) {
        console.warn("Error saving events:", err);
      }
    }
  };

  const saveClubs = (updated: StudentClub[]) => {
    setClubs(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_CLUBS_KEY, JSON.stringify(updated));
      } catch (err) {
        console.warn("Error saving clubs:", err);
      }
    }
  };

  // Distinct category list
  const eventCategories = [
    "All",
    "Competitive Programming",
    "Cultural",
    "Sports",
    "Hackathon",
    "Tech & AI",
    "Career",
    "Social",
  ];

  // Distinct clubs list for filter
  const filterClubs = [
    { id: "All", name: "All Clubs", shortCode: "All" },
    ...clubs.map((c) => ({
      id: c.id,
      name: c.name,
      shortCode: c.shortCode || c.name.split(" ")[0],
    })),
  ];

  // RSVP toggle handler
  const handleRsvpChange = (eventId: string, isRsvpd: boolean, qrHash?: string) => {
    const updated = events.map((evt) => {
      if (evt.id === eventId) {
        return {
          ...evt,
          rsvpd: isRsvpd,
          ticketHash: qrHash || evt.ticketHash,
          attendeesCount: isRsvpd ? evt.attendeesCount + 1 : Math.max(0, evt.attendeesCount - 1),
        };
      }
      return evt;
    });
    saveEvents(updated);

    // If student just RSVP'd, open ticket modal immediately
    if (isRsvpd) {
      const target = updated.find((e) => e.id === eventId);
      if (target) {
        setSelectedTicketEvent(target);
        setTicketModalOpen(true);
      }
    }
  };

  const handleOpenTicket = (event: CampusEvent) => {
    setSelectedTicketEvent(event);
    setTicketModalOpen(true);
  };

  const handleCancelRsvp = (eventId: string) => {
    handleRsvpChange(eventId, false);
  };

  // Club admin create event handler
  const handleCreateNewEvent = (newEvent: CampusEvent) => {
    if (user?.role !== "club_admin" && user?.role !== "admin") {
      setNotificationModal({
        isOpen: true,
        title: "Access Restricted",
        message: "Only certified Club Executives and Campus Administrators have permission to publish new campus events.",
      });
      return;
    }
    const updated = [newEvent, ...events];
    saveEvents(updated);

    // Set filter to show the newly created event
    if (newEvent.clubId) {
      setSelectedClubId(newEvent.clubId);
    }
    setSelectedCategory("All");
    setActiveTab("all_events");

    // Open confirmation modal
    setNotificationModal({
      isOpen: true,
      title: "Campus Event Published Successfully!",
      message: `"${newEvent.title}" has been published by ${newEvent.organizer} to the City University Event Feed. Students can now view details and RSVP for QR check-in tickets.`,
      referenceId: "EVT-PUB-" + Math.floor(100000 + Math.random() * 900000),
    });

    // Also pop open ticket pass for the organizer
    setSelectedTicketEvent(newEvent);
    setTicketModalOpen(true);
  };

  // Club membership join toggle
  const handleClubJoinToggle = (clubId: string, joined: boolean) => {
    const updated = clubs.map((c) => {
      if (c.id === clubId) {
        return {
          ...c,
          joined,
          membersCount: joined ? c.membersCount + 1 : c.membersCount - 1,
        };
      }
      return c;
    });
    saveClubs(updated);
  };

  const handleFilterByClub = (clubId: string) => {
    setSelectedClubId(clubId);
    setActiveTab("all_events");
  };

  const handleOpenCreateForClub = (clubId: string) => {
    if (user?.role !== "club_admin" && user?.role !== "admin") {
      setNotificationModal({
        isOpen: true,
        title: "Access Restricted",
        message: "Only certified Club Executives and Campus Administrators can create events.",
      });
      return;
    }
    setPreselectedClubForCreate(clubId);
    setCreateModalOpen(true);
  };

  // Filter events for unified feed
  const filteredEvents = events.filter((evt) => {
    // Tab check (all vs my rsvps)
    if (activeTab === "my_rsvps" && !evt.rsvpd) {
      return false;
    }

    // Category filter
    const matchesCategory =
      selectedCategory === "All" || evt.category.toLowerCase() === selectedCategory.toLowerCase();

    // Club filter
    const matchesClub =
      selectedClubId === "All" ||
      evt.clubId === selectedClubId ||
      evt.organizer.toLowerCase().includes(selectedClubId.toLowerCase());

    // Search query
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      evt.title.toLowerCase().includes(query) ||
      evt.description.toLowerCase().includes(query) ||
      evt.organizer.toLowerCase().includes(query) ||
      evt.location.toLowerCase().includes(query) ||
      evt.tags.some((t) => t.toLowerCase().includes(query));

    return matchesCategory && matchesClub && matchesSearch;
  });

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "popular") {
      return b.attendeesCount - a.attendeesCount;
    }
    if (sortBy === "capacity") {
      const remainingA = a.maxCapacity - a.attendeesCount;
      const remainingB = b.maxCapacity - b.attendeesCount;
      return remainingB - remainingA;
    }
    // Default soonest (featured first)
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  // Filter clubs
  const filteredClubs = clubs.filter((c) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesCategory =
      selectedCategory === "All" || c.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      !query ||
      c.name.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query) ||
      c.lead.toLowerCase().includes(query) ||
      c.tags.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const rsvpdCount = events.filter((e) => e.rsvpd).length;
  const isClubAdmin = user?.role === "club_admin";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-campus-950 via-campus-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-campus-800">
        
        {/* Subtle background glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-campus-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-20 w-60 h-60 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 font-semibold border border-gold-400/30 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>City University Campus Activity Nexus</span>
              </span>

              {/* Interactive Demo Role Switcher */}
              <div className="inline-flex items-center bg-white/10 rounded-full p-0.5 border border-white/15 text-[11px]">
                <button
                  onClick={() => quickDemoLogin("student")}
                  className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${
                    !isClubAdmin ? "bg-white text-campus-950 shadow-xs" : "text-slate-300 hover:text-white"
                  }`}
                >
                  Student View
                </button>
                <button
                  onClick={() => quickDemoLogin("club_admin")}
                  className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${
                    isClubAdmin ? "bg-gold-400 text-slate-950 shadow-xs" : "text-slate-300 hover:text-white"
                  }`}
                >
                  Club Admin View
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Club & Event Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore competitive programming contests by <strong>CPCCU</strong>, concerts by the <strong>Cultural Club</strong>, athletic tournaments by the <strong>Sports Club</strong>, and manage event admissions with digital QR tickets.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            {(user?.role === "club_admin" || user?.role === "admin") && (
              <button
                onClick={() => {
                  setPreselectedClubForCreate(undefined);
                  setCreateModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gold-400 hover:bg-gold-300 text-slate-950 font-bold text-xs shadow-lg shadow-gold-500/20 transition-all active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create Event ({user.role === "admin" ? "Admin" : "Club Lead"})</span>
              </button>
            )}

            <button
              onClick={() => {
                setActiveTab("my_rsvps");
                setSelectedClubId("All");
                setSelectedCategory("All");
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-all"
            >
              <Ticket className="w-4 h-4 text-gold-300" />
              <span>My QR Passes ({rsvpdCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Unified Filter & Browsable Controls */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-5">
        
        {/* Top Controls: Primary View Tabs + Live Search + Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          
          {/* Main Navigation Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl w-fit">
            <button
              onClick={() => {
                setActiveTab("all_events");
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "all_events"
                  ? "bg-white text-campus-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>All Events Feed ({events.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("my_rsvps");
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "my_rsvps"
                  ? "bg-white text-campus-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Ticket className="w-4 h-4 text-emerald-600" />
              <span>My RSVP Tickets ({rsvpdCount})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("clubs");
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "clubs"
                  ? "bg-white text-campus-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building className="w-4 h-4 text-indigo-600" />
              <span>Clubs Directory ({clubs.length})</span>
            </button>
          </div>

          {/* Search Bar + Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={
                  activeTab === "clubs"
                    ? "Search clubs by name, lead, tag..."
                    : "Search events by title, club, venue..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white transition-all font-medium"
              />
            </div>

            {activeTab !== "clubs" && (
              <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0 text-xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-campus-500"
                >
                  <option value="soonest">Sort: Featured & Date</option>
                  <option value="popular">Sort: Most Attendees</option>
                  <option value="capacity">Sort: Seats Available</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Dual Filter Section: Club Filter Pills & Category Filter Pills */}
        {activeTab !== "clubs" && (
          <div className="space-y-3.5">
            {/* Filter by Club */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
              <span className="text-slate-500 font-bold text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-campus-600" /> Filter by Club:
              </span>
              {filterClubs.map((club) => {
                const count =
                  club.id === "All"
                    ? events.length
                    : events.filter(
                        (e) => e.clubId === club.id || e.organizer.includes(club.shortCode)
                      ).length;

                return (
                  <button
                    key={club.id}
                    onClick={() => setSelectedClubId(club.id)}
                    className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all flex items-center gap-1.5 text-xs ${
                      selectedClubId === club.id
                        ? "bg-campus-700 text-white font-bold shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                  >
                    <span>{club.shortCode}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        selectedClubId === club.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Filter by Category */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
              <span className="text-slate-500 font-bold text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-campus-600" /> Category:
              </span>
              {eventCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all text-xs ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white font-bold shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Active Filters Bar */}
            {(selectedClubId !== "All" || selectedCategory !== "All" || searchQuery) && (
              <div className="flex items-center justify-between bg-campus-50/70 border border-campus-200 rounded-2xl px-4 py-2 text-xs text-campus-900">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-600">Active Filters:</span>
                  {selectedClubId !== "All" && (
                    <span className="bg-white border border-campus-300 text-campus-800 font-bold px-2 py-0.5 rounded-lg text-[11px]">
                      Club: {filterClubs.find((c) => c.id === selectedClubId)?.shortCode || selectedClubId}
                    </span>
                  )}
                  {selectedCategory !== "All" && (
                    <span className="bg-white border border-indigo-300 text-indigo-800 font-bold px-2 py-0.5 rounded-lg text-[11px]">
                      Category: {selectedCategory}
                    </span>
                  )}
                  {searchQuery && (
                    <span className="bg-white border border-slate-300 text-slate-700 font-bold px-2 py-0.5 rounded-lg text-[11px]">
                      Search: &quot;{searchQuery}&quot;
                    </span>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedClubId("All");
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="font-bold text-campus-700 hover:text-campus-900 hover:underline flex items-center gap-1 shrink-0 ml-2"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SECTION 1: Unified Feed (All Events / My RSVPs) */}
      {activeTab !== "clubs" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>
                  {activeTab === "my_rsvps" ? "My Booked Events & QR Tickets" : "Unified Event Feed"}
                </span>
                <span className="text-xs font-bold bg-campus-100 text-campus-800 border border-campus-200 px-3 py-0.5 rounded-full">
                  {sortedEvents.length} {sortedEvents.length === 1 ? "Event" : "Events"}
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeTab === "my_rsvps"
                  ? "Present your digital QR pass at the entrance door for fast contactless check-in."
                  : "Live schedule across all City University student organizations."}
              </p>
            </div>

            {isClubAdmin && (
              <span className="text-xs bg-gold-100 text-gold-900 font-bold px-3 py-1 rounded-full border border-gold-300 flex items-center gap-1.5 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span>Admin Mode: You can author new events</span>
              </span>
            )}
          </div>

          {sortedEvents.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <CalendarDays className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  {activeTab === "my_rsvps"
                    ? "You haven't RSVP'd to any events yet"
                    : "No campus events match your filter criteria"}
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  {activeTab === "my_rsvps"
                    ? "Browse through the unified feed to find hackathons, cultural fests, and competitive programming contests, and click 'RSVP with Campus ID' to receive your instant digital QR pass."
                    : "Try selecting 'All Clubs' or resetting your category and search parameters."}
                </p>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                {activeTab === "my_rsvps" ? (
                  <button
                    onClick={() => {
                      setActiveTab("all_events");
                      setSelectedClubId("All");
                      setSelectedCategory("All");
                    }}
                    className="px-5 py-2.5 bg-campus-600 hover:bg-campus-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                  >
                    Browse All Events
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedClubId("All");
                      setSelectedCategory("All");
                      setSearchQuery("");
                    }}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedEvents.map((evt) => (
                <EventCard
                  key={evt.id}
                  event={evt}
                  onRsvpChange={handleRsvpChange}
                  onOpenTicket={handleOpenTicket}
                  onSelectClub={handleFilterByClub}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: Official Clubs Directory */}
      {activeTab === "clubs" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>City University Student Organizations</span>
                <span className="text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-0.5 rounded-full">
                  {filteredClubs.length} Active Clubs
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Official student clubs certified by the City University Student Senate. Join clubs or view their hosted events.
              </p>
            </div>

            {(user?.role === "club_admin" || user?.role === "admin") && (
              <button
                onClick={() => {
                  setPreselectedClubForCreate(undefined);
                  setCreateModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-campus-600 hover:bg-campus-700 text-white font-bold text-xs shadow-xs transition-colors self-start sm:self-auto"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Register New Event for a Club</span>
              </button>
            )}
          </div>

          {filteredClubs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
              <Users className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">No student clubs match your search</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try clearing your search term to view all registered clubs.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClubs.map((club) => (
                <ClubCard
                  key={club.id}
                  club={club}
                  userRole={user?.role}
                  onJoinToggle={handleClubJoinToggle}
                  onViewEvents={handleFilterByClub}
                  onCreateEvent={handleOpenCreateForClub}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* QR Code Ticket Modal */}
      <QrTicketModal
        isOpen={ticketModalOpen}
        onClose={() => setTicketModalOpen(false)}
        event={selectedTicketEvent}
        student={{
          name: user?.fullName || "Jordan Patel",
          studentId: user?.studentId || "CU-892401",
          department: user?.department || "Computer Science",
          email: user?.email || "jordan.patel@cityuni.edu",
        }}
        onCancelRsvp={handleCancelRsvp}
      />

      {/* Club Admin Event Creation Form Modal */}
      <CreateEventModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        clubs={clubs}
        onCreateEvent={handleCreateNewEvent}
        preselectedClubId={preselectedClubForCreate}
      />

      {/* Confirmation Notification Modal */}
      <ActionNotificationModal
        isOpen={notificationModal.isOpen}
        onClose={() => setNotificationModal({ ...notificationModal, isOpen: false })}
        title={notificationModal.title}
        message={notificationModal.message}
        referenceId={notificationModal.referenceId}
      />
    </div>
  );
}
