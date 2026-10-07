"use client";

import React, { useState } from "react";
import { CampusEvent } from "@/data/mockData";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Sparkles,
  Share2,
  QrCode,
  Ticket,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { generateQrHash } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";

interface EventCardProps {
  event: CampusEvent;
  onRsvpChange?: (id: string, isRsvpd: boolean, qrHash?: string) => void;
  onOpenTicket?: (event: CampusEvent) => void;
  onSelectClub?: (clubIdOrName: string) => void;
}

export default function EventCard({
  event,
  onRsvpChange,
  onOpenTicket,
  onSelectClub,
}: EventCardProps) {
  const { user } = useAuth();
  const [isRsvpd, setIsRsvpd] = useState(event.rsvpd || false);
  const [attendeeCount, setAttendeeCount] = useState(event.attendeesCount);
  const [copied, setCopied] = useState(false);
  const [qrHash] = useState<string>(
    () => event.ticketHash || generateQrHash(user?.studentId || "CU-892401", event.id)
  );

  const toggleRsvp = () => {
    const nextState = !isRsvpd;
    setIsRsvpd(nextState);
    const updatedCount = nextState ? attendeeCount + 1 : attendeeCount - 1;
    setAttendeeCount(updatedCount);
    if (onRsvpChange) {
      onRsvpChange(event.id, nextState, qrHash);
    }
    // If just RSVP'd, immediately pop open the QR ticket modal!
    if (nextState && onOpenTicket) {
      onOpenTicket({
        ...event,
        rsvpd: true,
        attendeesCount: updatedCount,
        ticketHash: qrHash,
      });
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.origin + "/events#" + event.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const percentFull = Math.min(100, Math.round((attendeeCount / event.maxCapacity) * 100));

  const getCategoryBadgeStyle = (cat: string) => {
    switch (cat) {
      case "Competitive Programming":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Cultural":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "Sports":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Hackathon":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Tech & AI":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Career":
        return "bg-teal-100 text-teal-800 border-teal-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div
      id={event.id}
      className={`group relative bg-white rounded-3xl border transition-all duration-300 hover:shadow-xl flex flex-col justify-between overflow-hidden ${
        event.featured
          ? "border-campus-300 ring-1 ring-campus-400/40 shadow-sm"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      {/* Top Banner accent */}
      {event.featured && (
        <div className="bg-gradient-to-r from-campus-700 via-campus-600 to-indigo-800 text-white text-[11px] font-bold py-1.5 px-4 flex items-center justify-between">
          <span className="flex items-center gap-1.5 tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-gold-300 animate-spin" style={{ animationDuration: "8s" }} />
            {event.badge || "Featured Campus Highlight"}
          </span>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
            City University
          </span>
        </div>
      )}

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Row: Category, Host Club & Quick Actions */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryBadgeStyle(
                event.category
              )}`}
            >
              {event.category}
            </span>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={handleShare}
                title="Share event link"
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              {copied && (
                <span className="text-[10px] text-emerald-600 font-bold animate-in fade-in">
                  Copied!
                </span>
              )}
            </div>
          </div>

          {/* Event Title */}
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-campus-600 transition-colors leading-snug mb-1.5">
            {event.title}
          </h3>

          {/* Club Organizer link */}
          <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
            Host:{" "}
            {onSelectClub && event.clubId ? (
              <button
                type="button"
                onClick={() => onSelectClub(event.clubId!)}
                className="font-semibold text-campus-700 hover:text-campus-900 hover:underline transition-colors text-left"
              >
                {event.organizer}
              </button>
            ) : (
              <span className="font-semibold text-slate-700">{event.organizer}</span>
            )}
          </p>

          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
            {event.description}
          </p>

          {/* Logistics metadata */}
          <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-campus-600 shrink-0" />
              <span className="font-medium text-slate-800">{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer: Capacity and RSVP CTA */}
        <div className="mt-5 pt-3">
          {/* Capacity Bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3 text-slate-400" />
                <span className="font-semibold text-slate-700">{attendeeCount}</span> / {event.maxCapacity} Registered
              </span>
              <span className={percentFull >= 90 ? "text-amber-600 font-bold" : "text-slate-500"}>
                {percentFull}% Full
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  percentFull >= 90 ? "bg-amber-500" : "bg-campus-500"
                }`}
                style={{ width: `${percentFull}%` }}
              />
            </div>
          </div>

          {/* RSVP Button */}
          <div className="space-y-2">
            <button
              onClick={toggleRsvp}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs ${
                isRsvpd
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100"
                  : "bg-campus-600 text-white hover:bg-campus-700 shadow-campus-600/20 hover:shadow-md"
              }`}
            >
              {isRsvpd ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>RSVP Confirmed (Click to Change)</span>
                </>
              ) : (
                <>
                  <Ticket className="w-4 h-4" />
                  <span>RSVP with Campus ID</span>
                </>
              )}
            </button>

            {/* Quick QR Ticket View Button if RSVP'd */}
            {isRsvpd && (
              <button
                type="button"
                onClick={() =>
                  onOpenTicket?.({
                    ...event,
                    rsvpd: true,
                    ticketHash: qrHash,
                    attendeesCount: attendeeCount,
                  })
                }
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-campus-900 to-indigo-900 hover:from-campus-800 hover:to-indigo-800 text-white font-bold text-xs transition-all flex items-center justify-between shadow-xs group/btn"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-white/10">
                    <QrCode className="w-3.5 h-3.5 text-gold-300" />
                  </div>
                  <span className="text-[11px] tracking-wide">View QR Check-In Ticket</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-300 group-hover/btn:text-white">
                  <span>Pass Ready</span>
                  <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
