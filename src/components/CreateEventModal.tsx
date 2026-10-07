"use client";

import React, { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  Tag,
  Building,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { CampusEvent, StudentClub } from "@/data/mockData";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  clubs: StudentClub[];
  onCreateEvent: (newEvent: CampusEvent) => void;
  preselectedClubId?: string;
}

export default function CreateEventModal({
  isOpen,
  onClose,
  clubs,
  onCreateEvent,
  preselectedClubId,
}: CreateEventModalProps) {
  const initialClubId = preselectedClubId || clubs[0]?.id || "club-cpccu";
  const initialClub = clubs.find((c) => c.id === initialClubId) || clubs[0];

  const [title, setTitle] = useState("");
  const [selectedClubId, setSelectedClubId] = useState(initialClubId);
  const [category, setCategory] = useState<string>("Competitive Programming");
  const [date, setDate] = useState("Nov 20, 2026");
  const [time, setTime] = useState("3:00 PM - 5:30 PM");
  const [location, setLocation] = useState(initialClub?.room || "CS Lab 402, Academic Building 3");
  const [maxCapacity, setMaxCapacity] = useState(150);
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [featured, setFeatured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClubChange = (clubId: string) => {
    setSelectedClubId(clubId);
    const matched = clubs.find((c) => c.id === clubId);
    if (matched) {
      setLocation(matched.room);
      if (matched.id === "club-cpccu") setCategory("Competitive Programming");
      else if (matched.id === "club-cultural") setCategory("Cultural");
      else if (matched.id === "club-sports") setCategory("Sports");
      else if (matched.category === "Technology") setCategory("Tech & AI");
    }
  };

  const handleAddSuggestedTag = (tag: string) => {
    const existing = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (!existing.includes(tag)) {
      setTagsInput(existing.length > 0 ? `${tagsInput}, ${tag}` : tag);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please provide an event title");
      return;
    }
    if (!description.trim()) {
      setError("Please provide a short description for attendees");
      return;
    }

    const matchedClub = clubs.find((c) => c.id === selectedClubId);
    const parsedTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // Ensure club identifier tag is present
    if (matchedClub && matchedClub.shortCode && !parsedTags.includes(matchedClub.shortCode)) {
      parsedTags.unshift(matchedClub.shortCode);
    }

    const newEvent: CampusEvent = {
      id: "evt-custom-" + Date.now(),
      title: title.trim(),
      organizer: matchedClub ? matchedClub.name : "City University Student Organization",
      clubId: selectedClubId,
      category,
      date,
      time,
      location,
      attendeesCount: 1, // creator registered
      maxCapacity: Number(maxCapacity) || 100,
      featured,
      badge: featured ? "Admin Spotlight" : undefined,
      tags: parsedTags.length > 0 ? parsedTags : ["CampusOS", "Student Life"],
      description: description.trim(),
      rsvpd: true, // auto-rsvp the creator
    };

    onCreateEvent(newEvent);
    onClose();
  };

  const suggestedTags = [
    "CPCCU",
    "Algorithms",
    "Cultural Club",
    "Live Music",
    "Sports Club",
    "Cricket",
    "Workshop",
    "Free Food",
    "Trophy",
    "Certificates",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl my-8 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-campus-900 via-campus-800 to-indigo-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/30 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Club Admin Portal</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Publish New Campus Event
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Author an official campus event on behalf of your registered City University student club.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Club Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-campus-600" />
              <span>Organizing Student Club</span>
            </label>
            <select
              value={selectedClubId}
              onChange={(e) => handleClubChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white transition-all"
            >
              {clubs.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.shortCode || c.category})
                </option>
              ))}
            </select>
          </div>

          {/* Event Title */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Event Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. CPCCU Intra-Varsity Speed Programming Contest 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white transition-all font-medium"
            />
          </div>

          {/* Category & Capacity Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white transition-all font-medium"
              >
                <option value="Competitive Programming">Competitive Programming</option>
                <option value="Cultural">Cultural & Performing Arts</option>
                <option value="Sports">Sports & Athletics</option>
                <option value="Hackathon">Hackathon & Innovation</option>
                <option value="Tech & AI">Tech & AI Workshop</option>
                <option value="Career">Career & Mentorship</option>
                <option value="Social">Social & Community</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-campus-600" />
                <span>Max Student Capacity</span>
              </label>
              <input
                type="number"
                min={10}
                max={1500}
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(parseInt(e.target.value) || 50)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          {/* Date, Time & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-campus-600" />
                <span>Date</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Nov 20, 2026"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-campus-600" />
                <span>Time Range</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 3:00 PM - 5:30 PM"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-campus-600" />
                <span>Campus Venue</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Lab 402, CS Building"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Event Details & Agenda <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              placeholder="Outline what participants will learn, contest format, guest speakers, or guidelines..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white transition-all font-medium"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-campus-600" />
              <span>Search Tags (comma-separated)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. CPCCU, Algorithms, Codeforces, Certificates"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white transition-all font-medium"
            />

            {/* Quick Tag suggestions */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[10px] text-slate-400 font-medium py-0.5">Quick add:</span>
              {suggestedTags.map((st) => (
                <button
                  type="button"
                  key={st}
                  onClick={() => handleAddSuggestedTag(st)}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-campus-100 hover:text-campus-800 text-slate-600 font-medium transition-colors"
                >
                  +{st}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Spotlight Toggle */}
          <div className="flex items-center gap-3 p-3 bg-amber-50/60 rounded-xl border border-amber-200/80">
            <input
              type="checkbox"
              id="featured-toggle"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 text-campus-600 rounded border-slate-300 focus:ring-campus-500"
            />
            <label htmlFor="featured-toggle" className="text-xs text-slate-800 cursor-pointer">
              <strong className="font-bold text-slate-900 block">Highlight as Featured Event Banner</strong>
              <span className="text-[11px] text-slate-500">
                Pins this event to the top hero spotlight across the campus feed.
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-campus-600 hover:bg-campus-700 text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish Event to Feed</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
