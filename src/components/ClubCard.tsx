"use client";

import React, { useState } from "react";
import { StudentClub } from "@/data/mockData";
import { Users, BadgeCheck, Clock, MapPin, UserCheck, UserPlus, Mail } from "lucide-react";

interface ClubCardProps {
  club: StudentClub;
  onJoinToggle?: (id: string, joined: boolean) => void;
}

export default function ClubCard({ club, onJoinToggle }: ClubCardProps) {
  const [joined, setJoined] = useState(club.joined || false);
  const [members, setMembers] = useState(club.membersCount);

  const handleToggle = () => {
    const nextState = !joined;
    setJoined(nextState);
    setMembers(nextState ? members + 1 : members - 1);
    if (onJoinToggle) {
      onJoinToggle(club.id, nextState);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between group">
      <div>
        {/* Header: Verified + Category */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {club.category}
          </span>
          {club.verified && (
            <span className="flex items-center gap-1 text-[11px] text-campus-700 font-semibold bg-campus-50 px-2 py-0.5 rounded-full border border-campus-200">
              <BadgeCheck className="w-3.5 h-3.5 text-campus-600" />
              <span>Official Student Org</span>
            </span>
          )}
        </div>

        {/* Club Name */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-campus-600 transition-colors mb-1">
          {club.name}
        </h3>

        {/* Lead */}
        <p className="text-xs text-slate-500 mb-2.5">
          Lead: <span className="font-medium text-slate-700">{club.lead}</span>
        </p>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
          {club.description}
        </p>

        {/* Metadata info */}
        <div className="space-y-1.5 py-2.5 border-y border-slate-100 text-xs text-slate-600 mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium">{club.meetingTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{club.room}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-campus-600 shrink-0" />
            <span>
              <strong className="text-slate-800">{members}</strong> active student members
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {club.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded border border-slate-200/80"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={handleToggle}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            joined
              ? "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
              : "bg-slate-900 text-white hover:bg-campus-700 shadow-xs"
          }`}
        >
          {joined ? (
            <>
              <UserCheck className="w-3.5 h-3.5 text-campus-600" />
              <span>Member Active</span>
            </>
          ) : (
            <>
              <UserPlus className="w-3.5 h-3.5" />
              <span>Join Organization</span>
            </>
          )}
        </button>

        <a
          href={`mailto:${club.id}@cityuni.edu`}
          title="Contact Student President"
          className="p-2 border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-colors"
        >
          <Mail className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
