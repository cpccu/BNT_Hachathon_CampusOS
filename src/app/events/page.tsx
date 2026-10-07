"use client";

import React, { useState } from "react";
import {
  CalendarDays,
  Users,
  Search,
  Filter,
  Sparkles,
  PlusCircle,
  Flame,
  CheckCircle2,
  Trophy,
} from "lucide-react";
import { MOCK_EVENTS, MOCK_CLUBS, CampusEvent, StudentClub } from "@/data/mockData";
import EventCard from "@/components/EventCard";
import ClubCard from "@/components/ClubCard";
import ActionNotificationModal from "@/components/ActionNotificationModal";

export default function EventsAndClubsPage() {
  const [activeTab, setActiveTab] = useState<"events" | "clubs">("events");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    referenceId?: string;
  }>({
    isOpen: false,
    title: "",
    message: "",
  });

  const eventCategories = ["All", "Hackathon", "Tech & AI", "Career", "Social", "Sports"];
  const clubCategories = ["All", "Technology", "Engineering", "Leadership", "Arts & Culture"];

  // Filter events
  const filteredEvents = MOCK_EVENTS.filter((evt) => {
    const matchesCategory = selectedCategory === "All" || evt.category === selectedCategory;
    const matchesQuery =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  // Filter clubs
  const filteredClubs = MOCK_CLUBS.filter((club) => {
    const matchesCategory = selectedCategory === "All" || club.category === selectedCategory;
    const matchesQuery =
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleCreateProposal = () => {
    setModalState({
      isOpen: true,
      title: "Event Proposal Draft Submitted",
      message:
        "Your student activity proposal has been sent to the City University Office of Student Affairs for room scheduling and AV review.",
      referenceId: "PROPOSAL-2026-" + Math.floor(1000 + Math.random() * 9000),
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-campus-900 via-campus-800 to-indigo-950 text-white p-6 sm:p-8 shadow-lg border border-campus-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs text-gold-300 font-semibold border border-white/10">
              <CalendarDays className="w-3.5 h-3.5 text-gold-400" />
              <span>Campus Activity & Community Nexus</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Club & Event Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore hackathons, technical workshops, keynote mixers, and join over 48 student-run organizations across City University.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCreateProposal}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Event / Org Proposal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Switcher Tabs & Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          
          {/* Main Tab Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl w-fit">
            <button
              onClick={() => {
                setActiveTab("events");
                setSelectedCategory("All");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "events"
                  ? "bg-white text-campus-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Events & Hackathons ({MOCK_EVENTS.length})</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("clubs");
                setSelectedCategory("All");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "clubs"
                  ? "bg-white text-campus-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Clubs & Societies ({MOCK_CLUBS.length})</span>
            </button>
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${activeTab === "events" ? "events, topics, venues..." : "clubs, tech, leads..."}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {(activeTab === "events" ? eventCategories : clubCategories).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full font-medium shrink-0 transition-colors ${
                selectedCategory === cat
                  ? "bg-campus-600 text-white shadow-2xs font-semibold"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section: Events Grid */}
      {activeTab === "events" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>Scheduled Campus Happenings</span>
              <span className="text-xs font-semibold bg-campus-50 text-campus-700 border border-campus-200 px-2.5 py-0.5 rounded-full">
                {filteredEvents.length} Available
              </span>
            </h2>
            <span className="text-xs text-slate-500">
              Free entry with City University Student ID
            </span>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <CalendarDays className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No events found matching your filter</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try selecting &quot;All&quot; categories or clearing your search term to see more events.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((evt) => (
                <EventCard key={evt.id} event={evt} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content Section: Clubs Directory */}
      {activeTab === "clubs" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>Official Student Organizations</span>
              <span className="text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-0.5 rounded-full">
                {filteredClubs.length} Active Orgs
              </span>
            </h2>
            <span className="text-xs text-slate-500">
              Sanctioned by City University Student Senate
            </span>
          </div>

          {filteredClubs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <Users className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No student clubs found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try resetting your search query or category filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClubs.map((club) => (
                <ClubCard key={club.id} club={club} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Interactive Modal */}
      <ActionNotificationModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.title}
        message={modalState.message}
        referenceId={modalState.referenceId}
      />
    </div>
  );
}
