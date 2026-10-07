"use client";

import React, { useState } from "react";
import { CampusResource } from "@/data/mockData";
import { MapPin, Clock, CheckCircle, AlertCircle, ArrowUpRight, Check } from "lucide-react";

interface ResourceCardProps {
  resource: CampusResource;
  onAction?: (resource: CampusResource) => void;
}

export default function ResourceCard({ resource, onAction }: ResourceCardProps) {
  const [reserved, setReserved] = useState(false);

  const getStatusBadge = (status: CampusResource["status"]) => {
    switch (status) {
      case "Available":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          dot: "bg-emerald-500",
        };
      case "Busy":
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          dot: "bg-amber-500",
        };
      case "Closing Soon":
        return {
          bg: "bg-rose-50 text-rose-700 border-rose-200",
          dot: "bg-rose-500",
        };
      default:
        return {
          bg: "bg-campus-50 text-campus-700 border-campus-200",
          dot: "bg-campus-500",
        };
    }
  };

  const statusStyle = getStatusBadge(resource.status);

  const handleActionClick = () => {
    setReserved(true);
    if (onAction) {
      onAction(resource);
    }
    setTimeout(() => {
      // Keep feedback visible for a while
    }, 4000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200 p-5 sm:p-6 flex flex-col justify-between group">
      <div>
        {/* Top line: Category and Status Pill */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {resource.category}
          </span>
          <div
            className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${statusStyle.bg}`}
          >
            <span className={`w-2 h-2 rounded-full ${statusStyle.dot} animate-pulse`} />
            <span>{resource.status}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-campus-600 transition-colors mb-2">
          {resource.title}
        </h3>

        {/* Availability / Capacity metric */}
        {resource.capacityOrAvailable && (
          <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-campus-50/80 border border-campus-100 text-xs font-semibold text-campus-900">
            <CheckCircle className="w-3.5 h-3.5 text-campus-600" />
            <span>{resource.capacityOrAvailable}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {resource.description}
        </p>

        {/* Logistics metadata */}
        <div className="space-y-1.5 py-3 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium text-slate-800">{resource.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{resource.hours}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <button
          onClick={handleActionClick}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs ${
            reserved
              ? "bg-emerald-600 text-white"
              : "bg-slate-900 text-white hover:bg-campus-700"
          }`}
        >
          {reserved ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Request Confirmed • Check Email</span>
            </>
          ) : (
            <>
              <span>{resource.actionLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
