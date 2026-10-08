"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bus,
  Clock,
  MapPin,
  Phone,
  AlertCircle,
  Navigation,
  ArrowRight,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Info
} from "lucide-react";

interface BusRoute {
  id: string;
  name: string;
  badge: string;
  routeColor: string;
  startPoint: string;
  destination: string;
  stops: string[];
  departureTimes: string[];
  returnTimes: string[];
  busNumber: string;
  driverName: string;
  driverPhone: string;
  activeStatus: "On Time" | "Departing Soon" | "Service Finished";
  capacity: string;
  fare: string;
}

const SHUTTLE_ROUTES: BusRoute[] = [
  {
    id: "route-a",
    name: "Route A — Mirpur Express",
    badge: "Most Popular",
    routeColor: "from-blue-600 to-indigo-700",
    startPoint: "City University Main Campus",
    destination: "Mirpur 10 Circle",
    stops: ["City University Gate", "Birulia Bridge", "Dania", "Mirpur 1", "Mirpur 10 (Overbridge)"],
    departureTimes: ["07:00 AM", "09:00 AM", "12:00 PM", "05:00 PM", "08:00 PM"],
    returnTimes: ["07:45 AM", "09:45 AM", "01:00 PM", "06:00 PM", "08:45 PM"],
    busNumber: "CU-BUS-01 (AC)",
    driverName: "Md. Rafiqul Islam",
    driverPhone: "+880 1711-234567",
    activeStatus: "On Time",
    capacity: "52 Seats",
    fare: "Free with Student ID"
  },
  {
    id: "route-b",
    name: "Route B — Gulshan & Mohakhali Link",
    badge: "Direct Express",
    routeColor: "from-emerald-600 to-teal-700",
    startPoint: "City University Main Campus",
    destination: "Gulshan 1 / Mohakhali Bus Terminal",
    stops: ["City University Gate", "Ashulia", "Airport Road", "Banani Kakoli", "Gulshan 1"],
    departureTimes: ["08:00 AM", "01:00 PM", "06:00 PM"],
    returnTimes: ["09:00 AM", "02:15 PM", "07:15 PM"],
    busNumber: "CU-BUS-03 (Non-AC)",
    driverName: "Kalam Mia",
    driverPhone: "+880 1822-345678",
    activeStatus: "Departing Soon",
    capacity: "48 Seats",
    fare: "Free with Student ID"
  },
  {
    id: "route-c",
    name: "Route C — Uttara Sector Shuttle",
    badge: "High Frequency",
    routeColor: "from-amber-600 to-orange-700",
    startPoint: "City University Main Campus",
    destination: "Uttara Sector 10 / House Building",
    stops: ["City University Gate", "Dour", "Abdullahpur", "Azampur", "House Building"],
    departureTimes: ["07:30 AM", "02:00 PM", "07:00 PM"],
    returnTimes: ["08:15 AM", "03:00 PM", "08:00 PM"],
    busNumber: "CU-BUS-05 (AC)",
    driverName: "Shah Alam",
    driverPhone: "+880 1933-456789",
    activeStatus: "On Time",
    capacity: "52 Seats",
    fare: "Free with Student ID"
  }
];

export default function ShuttleSchedulePage() {
  const [selectedRoute, setSelectedRoute] = useState<BusRoute>(SHUTTLE_ROUTES[0]);
  const [direction, setDirection] = useState<"from_campus" | "to_campus">("from_campus");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-campus-950 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="absolute -right-16 -top-16 w-72 h-72 bg-campus-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 font-semibold border border-gold-400/30 text-xs">
              <Bus className="w-3.5 h-3.5 text-gold-400" />
              <span>City University Campus Transportation</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Shuttle Bus Schedule & Routes
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Official live timetable for City University campus shuttle buses across <strong>Mirpur, Gulshan, and Uttara</strong>. Free service for all enrolled students upon presenting digital or physical Campus ID.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="bg-white/10 rounded-2xl p-4 border border-white/10 text-center">
              <div className="text-2xl font-black text-gold-300">3 Routes</div>
              <div className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Active Daily</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 border border-white/10 text-center">
              <div className="text-2xl font-black text-emerald-400">100% Free</div>
              <div className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">With Student ID</div>
            </div>
          </div>
        </div>
      </div>

      {/* Route Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SHUTTLE_ROUTES.map((route) => {
          const isSelected = selectedRoute.id === route.id;
          return (
            <button
              key={route.id}
              onClick={() => setSelectedRoute(route)}
              className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                isSelected
                  ? "bg-white dark:bg-slate-900 border-campus-500 shadow-lg ring-2 ring-campus-500/20"
                  : "bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {route.badge}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  route.activeStatus === "On Time"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                }`}>
                  ● {route.activeStatus}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                {route.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-campus-600" />
                <span>{route.destination}</span>
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>{route.busNumber}</span>
                <span className="font-semibold text-campus-600 dark:text-campus-400">{route.departureTimes.length} Departures Today</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Route Detail View */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-campus-100 text-campus-800 dark:bg-campus-950 dark:text-campus-300">
                Selected Route
              </span>
              <span className="text-xs text-slate-500">{selectedRoute.busNumber}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {selectedRoute.name}
            </h2>
          </div>

          {/* Direction Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl w-fit">
            <button
              onClick={() => setDirection("from_campus")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                direction === "from_campus"
                  ? "bg-white dark:bg-slate-900 text-campus-700 dark:text-campus-300 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              From Campus → City
            </button>
            <button
              onClick={() => setDirection("to_campus")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                direction === "to_campus"
                  ? "bg-white dark:bg-slate-900 text-campus-700 dark:text-campus-300 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              City → To Campus
            </button>
          </div>
        </div>

        {/* Timetable Grid */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-campus-600" />
            <span>Departure Times ({direction === "from_campus" ? "Departing Campus" : "Departing City Stop"})</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {(direction === "from_campus" ? selectedRoute.departureTimes : selectedRoute.returnTimes).map((time, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-center hover:border-campus-400 transition-all"
              >
                <div className="text-xs font-bold text-slate-400 mb-1">Trip #{idx + 1}</div>
                <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono">{time}</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-1">Confirmed</div>
              </div>
            ))}
          </div>
        </div>

        {/* Route Stoppages Timeline */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-campus-600" />
            <span>Designated Stoppages (Order of Transit)</span>
          </h4>
          <div className="flex flex-wrap items-center gap-2">
            {selectedRoute.stops.map((stop, idx) => (
              <React.Fragment key={idx}>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-campus-50 dark:bg-campus-950/40 border border-campus-200 dark:border-campus-900/60 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <span className="w-4 h-4 rounded-full bg-campus-600 text-white text-[10px] flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span>{stop}</span>
                </div>
                {idx < selectedRoute.stops.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bus Info & Driver Contact Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-500 font-semibold">Bus Details</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">{selectedRoute.busNumber}</div>
            <div className="text-xs text-slate-500">{selectedRoute.capacity} • Air Conditioned</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-500 font-semibold">Designated Driver</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">{selectedRoute.driverName}</div>
            <a
              href={`tel:${selectedRoute.driverPhone}`}
              className="text-xs text-campus-600 dark:text-campus-400 font-semibold flex items-center gap-1 hover:underline"
            >
              <Phone className="w-3 h-3" />
              <span>{selectedRoute.driverPhone}</span>
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-500 font-semibold">Fare & Eligibility</div>
            <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{selectedRoute.fare}</div>
            <div className="text-xs text-slate-500">Boarding requires active Campus ID pass</div>
          </div>
        </div>
      </div>

      {/* Important Travel Rules */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-3xl p-6 flex flex-col sm:flex-row items-start gap-4">
        <Info className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm">
            Campus Shuttle Travel Guidelines
          </h4>
          <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
            • Please arrive at the designated pickup stop at least <strong>5 minutes before</strong> the scheduled departure time.
            <br />
            • Keep your physical City University student ID or your <strong>CampusOS digital pass</strong> ready when boarding.
            <br />
            • For emergency inquiries or transit delays, contact the Campus Transport Desk via ext. 104 or call the designated driver directly.
          </p>
        </div>
      </div>
    </div>
  );
}
