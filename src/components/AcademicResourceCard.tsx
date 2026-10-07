"use client";

import React, { useState } from "react";
import {
  Download,
  ShieldCheck,
  BadgeCheck,
  FileText,
  BookOpen,
  FlaskConical,
  Megaphone,
  BookMarked,
  Clock,
  User,
  HardDrive,
  TrendingDown,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { AcademicCourseResource } from "@/data/mockData";

interface AcademicResourceCardProps {
  resource: AcademicCourseResource;
  onDownload?: (resource: AcademicCourseResource) => void;
}

function getTypeConfig(type: AcademicCourseResource["resource_type"]) {
  switch (type) {
    case "Exam Paper":
      return {
        icon: <FileText className="w-4 h-4" />,
        color: "bg-rose-100 text-rose-800 border-rose-200",
        iconBg: "bg-rose-50 text-rose-600",
        accentBar: "bg-rose-500",
      };
    case "Lecture Notes":
      return {
        icon: <BookOpen className="w-4 h-4" />,
        color: "bg-purple-100 text-purple-800 border-purple-200",
        iconBg: "bg-purple-50 text-purple-600",
        accentBar: "bg-purple-500",
      };
    case "Lab Guide":
      return {
        icon: <FlaskConical className="w-4 h-4" />,
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
        iconBg: "bg-emerald-50 text-emerald-600",
        accentBar: "bg-emerald-500",
      };
    case "Official Notice":
      return {
        icon: <Megaphone className="w-4 h-4" />,
        color: "bg-amber-100 text-amber-900 border-amber-200",
        iconBg: "bg-amber-50 text-amber-700",
        accentBar: "bg-amber-500",
      };
    case "Syllabus":
      return {
        icon: <BookMarked className="w-4 h-4" />,
        color: "bg-blue-100 text-blue-800 border-blue-200",
        iconBg: "bg-blue-50 text-blue-600",
        accentBar: "bg-blue-500",
      };
    default:
      return {
        icon: <FileText className="w-4 h-4" />,
        color: "bg-slate-100 text-slate-800 border-slate-200",
        iconBg: "bg-slate-50 text-slate-600",
        accentBar: "bg-slate-400",
      };
  }
}

function getDeptShortTag(dept: string): string {
  if (dept.includes("CSE") || dept.includes("Computer Science")) return "CSE";
  if (dept.includes("EEE") || dept.includes("Electrical")) return "EEE";
  if (dept.includes("Data Science") || dept.includes("AI")) return "DS & AI";
  if (dept.includes("Math")) return "MATH";
  if (dept.includes("All")) return "UNIV";
  return dept.split(" ")[0].toUpperCase();
}

export default function AcademicResourceCard({
  resource,
  onDownload,
}: AcademicResourceCardProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [dlCount, setDlCount] = useState(resource.downloads || 0);
  const cfg = getTypeConfig(resource.resource_type);
  const deptShort = getDeptShortTag(resource.department);

  const handleDownload = () => {
    setDownloaded(true);
    setDlCount((c) => c + 1);
    if (onDownload) onDownload(resource);
  };

  return (
    <div className="group relative bg-white rounded-3xl border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden">
      {/* Accent color top bar */}
      <div className={`h-1 w-full ${cfg.accentBar}`} />

      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        {/* Top Row: Type badge, Dept pill, Verified */}
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${cfg.color}`}
            >
              {cfg.icon}
              {resource.resource_type}
            </span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-mono">
              {deptShort}
            </span>
          </div>
          {resource.verified && (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-campus-800 bg-campus-50 px-2 py-0.5 rounded-full border border-campus-200">
              <ShieldCheck className="w-3 h-3 text-campus-600" />
              Verified
            </span>
          )}
        </div>

        {/* Course Code highlight */}
        <div className="mb-2">
          <span className="font-mono text-sm font-black text-campus-800 bg-campus-50 border border-campus-200 px-2.5 py-0.5 rounded-lg">
            {resource.course_code}
          </span>
          {resource.year && (
            <span className="ml-2 text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              {resource.semester ? `${resource.semester} ` : ""}{resource.year}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-campus-700 transition-colors leading-snug mb-2 line-clamp-3">
          {resource.title}
        </h3>

        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {resource.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[10px] bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200"
              >
                {tag}
              </span>
            ))}
            {resource.tags.length > 4 && (
              <span className="text-[10px] text-slate-400">+{resource.tags.length - 4} more</span>
            )}
          </div>
        )}

        {/* Metadata Row */}
        <div className="mt-auto pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
          {resource.uploaded_by && (
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">
                By <span className="font-medium text-slate-700">{resource.uploaded_by}</span>
              </span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {resource.uploaded_at}
              </span>
              {resource.file_size && (
                <span className="flex items-center gap-1 font-mono">
                  <HardDrive className="w-3.5 h-3.5 text-slate-400" />
                  {resource.file_size}
                </span>
              )}
            </div>
            {dlCount > 0 && (
              <span className="flex items-center gap-1 text-campus-700 font-semibold">
                <Download className="w-3.5 h-3.5" />
                {dlCount.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 sm:px-6 pb-5">
        <a
          href={resource.file_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDownload}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs ${
            downloaded
              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
              : "bg-slate-900 hover:bg-campus-700 text-white"
          }`}
        >
          {downloaded ? (
            <>
              <BadgeCheck className="w-4 h-4" />
              <span>Opened — Open Again</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>
                {resource.resource_type === "Official Notice" ? "View Notice" : "Download PDF"}
              </span>
              <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
            </>
          )}
        </a>
      </div>
    </div>
  );
}
