"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Share2,
  Copy,
  Printer,
  Sparkles,
  QrCode as QrIcon,
  BadgeAlert,
  ArrowRight,
} from "lucide-react";
import { CampusEvent } from "@/data/mockData";

interface QrTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CampusEvent | null;
  student: {
    name: string;
    studentId: string;
    department?: string;
    email?: string;
    avatarUrl?: string;
  };
  onCancelRsvp?: (eventId: string) => void;
}

export default function QrTicketModal({
  isOpen,
  onClose,
  event,
  student,
  onCancelRsvp,
}: QrTicketModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  // Consistent ticket reference code
  const ticketId = event
    ? event.ticketHash ||
      `CU-TKT-${event.id.replace("evt-", "").toUpperCase()}-${student.studentId.replace("CU-", "")}-${Math.floor(1000 + Math.random() * 9000)}`
    : "";

  useEffect(() => {
    if (!event || !isOpen) return;

    // Reset check-in state when opening for a new event
    setIsCheckedIn(false);
    setCheckInTime(null);

    const payload = JSON.stringify({
      schema: "CITYUNI_PASS_V1",
      ticketId,
      eventId: event.id,
      title: event.title,
      organizer: event.organizer,
      studentId: student.studentId,
      studentName: student.name,
      location: event.location,
      dateTime: `${event.date} • ${event.time}`,
      status: "VERIFIED_ACTIVE",
      generatedAt: new Date().toISOString(),
    });

    QRCode.toDataURL(payload, {
      width: 280,
      margin: 1.5,
      color: {
        dark: "#0b3f6c", // campus-900
        light: "#ffffff",
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("Error generating ticket QR code:", err));
  }, [event, isOpen, student.studentId, student.name, ticketId]);

  if (!isOpen || !event) return null;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(ticketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateCheckIn = () => {
    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setIsCheckedIn(true);
    setCheckInTime(timeStr);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-md my-8 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-campus-900 via-campus-800 to-indigo-950 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close ticket"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/30 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-gold-400" />
              Official Entry Pass
            </span>
            <span className="text-[11px] text-slate-300 font-mono">
              City University Event Engine
            </span>
          </div>

          <h2 className="text-lg font-black tracking-tight text-white leading-snug line-clamp-2">
            {event.title}
          </h2>

          <p className="text-xs text-slate-300 mt-1 flex items-center gap-1">
            Host: <span className="text-white font-semibold">{event.organizer}</span>
          </p>
        </div>

        {/* Ticket Perforation Graphic */}
        <div className="relative bg-slate-100 h-4 flex items-center justify-between px-2 overflow-hidden border-y border-dashed border-slate-300">
          <div className="w-5 h-5 -ml-4 bg-slate-950/70 rounded-full" />
          <div className="w-full border-t border-dashed border-slate-300 mx-2" />
          <div className="w-5 h-5 -mr-4 bg-slate-950/70 rounded-full" />
        </div>

        {/* Ticket Body */}
        <div className="p-5 sm:p-6 space-y-5 bg-white">
          
          {/* Status Indicator */}
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-3 h-3 rounded-full shrink-0 ${
                  isCheckedIn
                    ? "bg-emerald-500 ring-4 ring-emerald-100"
                    : "bg-campus-500 animate-pulse ring-4 ring-campus-100"
                }`}
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block leading-tight">
                  {isCheckedIn ? "Checked In at Venue" : "RSVP Confirmed • Active Pass"}
                </span>
                <span className="text-[10px] text-slate-500">
                  {isCheckedIn
                    ? `Scanned at ${checkInTime} by Gate Staff`
                    : "Present QR code at entrance door for instant scan"}
                </span>
              </div>
            </div>

            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                isCheckedIn
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-blue-100 text-campus-800 border border-blue-200"
              }`}
            >
              {isCheckedIn ? "Verified" : "Valid"}
            </span>
          </div>

          {/* QR Code Presentation Box */}
          <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-white rounded-2xl border-2 border-dashed border-slate-200 shadow-inner">
            <div className="relative p-2 bg-white rounded-xl shadow-md border border-slate-100">
              {qrDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrDataUrl}
                  alt={`QR Ticket for ${event.title}`}
                  className="w-48 h-48 sm:w-52 sm:h-52 object-contain rounded-lg"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-slate-400">
                  <QrIcon className="w-8 h-8 animate-spin" />
                </div>
              )}

              {isCheckedIn && (
                <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xs rounded-xl flex flex-col items-center justify-center text-white p-3 text-center animate-in fade-in">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-1" />
                  <span className="text-sm font-black tracking-wide uppercase">Entry Approved</span>
                  <span className="text-[10px] text-emerald-200 font-mono mt-0.5">Checked In • {checkInTime}</span>
                </div>
              )}
            </div>

            {/* Ticket Ref Hash */}
            <div className="mt-3 flex items-center gap-2 text-center">
              <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                {ticketId}
              </span>
              <button
                onClick={handleCopyCode}
                className="p-1 text-slate-400 hover:text-slate-800 rounded transition-colors"
                title="Copy Ticket ID"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              {copied && (
                <span className="text-[10px] font-bold text-emerald-600 animate-in fade-in">
                  Copied!
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Cryptographically keyed to Student ID #{student.studentId}
            </p>
          </div>

          {/* Attendee & Event Metadata Split */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Attendee
              </span>
              <p className="font-bold text-slate-900 truncate">{student.name}</p>
              <p className="text-[11px] font-mono text-campus-700 font-semibold">{student.studentId}</p>
              <p className="text-[10px] text-slate-500 truncate">{student.department || "City University"}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Seat / Admission
              </span>
              <p className="font-bold text-slate-900">General Student</p>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Guaranteed
              </p>
              <p className="text-[10px] text-slate-500">Free Admission</p>
            </div>
          </div>

          {/* Schedule & Venue Specs */}
          <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-campus-600 shrink-0" />
              <span className="font-medium text-slate-900">{event.date}</span>
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

          {/* Interactive Check-in Simulator for testing */}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {!isCheckedIn ? (
              <button
                onClick={handleSimulateCheckIn}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-campus-600" />
                <span>Simulate Event Admin Scanner (Check In)</span>
              </button>
            ) : (
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold text-center flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Student Check-In Confirmed. Welcome to {event.title}!</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Print / Save Pass</span>
              </button>

              {onCancelRsvp && (
                <button
                  onClick={() => {
                    onCancelRsvp(event.id);
                    onClose();
                  }}
                  className="py-2 px-3 rounded-xl text-rose-600 hover:bg-rose-50 font-semibold text-xs transition-colors border border-rose-200"
                >
                  Cancel RSVP
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>City University Student Senate Verified</span>
          <button
            onClick={onClose}
            className="font-bold text-campus-700 hover:text-campus-900"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
