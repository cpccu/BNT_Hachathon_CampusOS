"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  FolderKanban,
  Search,
  Filter,
  Shield,
  Cpu,
  HeartHandshake,
  Building2,
  FileText,
  Upload,
  BookOpen,
  FlaskConical,
  Megaphone,
  Sparkles,
  RotateCcw,
  SlidersHorizontal,
  TrendingUp,
  Download,
  X,
  AlertCircle,
  CheckCircle2,
  BookMarked,
  ChevronDown,
  LayoutGrid,
  List,
} from "lucide-react";
import {
  MOCK_RESOURCES,
  MOCK_ACADEMIC_RESOURCES,
  CampusResource,
  AcademicCourseResource,
} from "@/data/mockData";
import ResourceCard from "@/components/ResourceCard";
import AcademicResourceCard from "@/components/AcademicResourceCard";
import ActionNotificationModal from "@/components/ActionNotificationModal";
import { useAuth } from "@/context/AuthContext";

const STORAGE_KEY = "campusos_academic_resources_v3";

const DEPARTMENTS = [
  "All",
  "Computer Science & Engineering (CSE)",
  "Electrical & Electronic Eng (EEE)",
  "Data Science & AI",
  "Mathematics",
  "All Departments",
];

const RESOURCE_TYPES: Array<AcademicCourseResource["resource_type"] | "All"> = [
  "All",
  "Exam Paper",
  "Lecture Notes",
  "Lab Guide",
  "Official Notice",
  "Syllabus",
  "Lab Guide",
];

const RESOURCE_TYPES_UNIQUE = [
  "All",
  "Exam Paper",
  "Lecture Notes",
  "Lab Guide",
  "Official Notice",
  "Syllabus",
];

const SORT_OPTIONS = [
  { value: "downloads", label: "Most Downloaded" },
  { value: "newest", label: "Newest First" },
  { value: "course_code", label: "By Course Code" },
];

function typeIcon(type: string) {
  switch (type) {
    case "Exam Paper": return <FileText className="w-3.5 h-3.5" />;
    case "Lecture Notes": return <BookOpen className="w-3.5 h-3.5" />;
    case "Lab Guide": return <FlaskConical className="w-3.5 h-3.5" />;
    case "Official Notice": return <Megaphone className="w-3.5 h-3.5" />;
    case "Syllabus": return <BookMarked className="w-3.5 h-3.5" />;
    default: return <FileText className="w-3.5 h-3.5" />;
  }
}

export default function ResourceHubPage() {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<"academic" | "facilities">("academic");
  const [academicResources, setAcademicResources] = useState<AcademicCourseResource[]>(MOCK_ACADEMIC_RESOURCES);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Academic filters
  const [searchQuery, setSearchQuery] = useState("");
  const [courseCodeFilter, setCourseCodeFilter] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [sortBy, setSortBy] = useState("downloads");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Facility filters
  const [facilitySearch, setFacilitySearch] = useState("");
  const [selectedFacilityCategory, setSelectedFacilityCategory] = useState("All");

  // Upload modal
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    department: "Computer Science & Engineering (CSE)",
    course_code: "",
    resource_type: "Exam Paper" as AcademicCourseResource["resource_type"],
    file_url: "",
    semester: "Fall",
    year: "2024",
    tags: "",
  });
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    message: "",
    referenceId: undefined as string | undefined,
  });

  // Restore from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setAcademicResources(parsed);
          }
        }
      } catch {}
    }
  }, []);

  const saveResources = (updated: AcademicCourseResource[]) => {
    setAcademicResources(updated);
    if (typeof window !== "undefined") {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
    }
  };

  // Compute stats
  const totalDownloads = useMemo(
    () => academicResources.reduce((sum, r) => sum + (r.downloads || 0), 0),
    [academicResources]
  );
  const cseCount = useMemo(
    () => academicResources.filter((r) => r.department.includes("CSE") || r.department.includes("Computer Science")).length,
    [academicResources]
  );
  const eeeCount = useMemo(
    () => academicResources.filter((r) => r.department.includes("EEE") || r.department.includes("Electrical")).length,
    [academicResources]
  );

  // Filter + sort academic resources
  const filtered = useMemo(() => {
    let result = academicResources.filter((r) => {
      const query = searchQuery.toLowerCase().trim();
      const ccQuery = courseCodeFilter.toLowerCase().trim();

      const matchesSearch =
        !query ||
        r.title.toLowerCase().includes(query) ||
        r.course_code.toLowerCase().includes(query) ||
        r.department.toLowerCase().includes(query) ||
        (r.uploaded_by || "").toLowerCase().includes(query) ||
        (r.tags || []).some((t) => t.toLowerCase().includes(query));

      const matchesCourseCode =
        !ccQuery || r.course_code.toLowerCase().includes(ccQuery);

      const matchesDept =
        selectedDept === "All" ||
        r.department === selectedDept ||
        (selectedDept === "All Departments" && true);

      const matchesType = selectedType === "All" || r.resource_type === selectedType;

      const matchesVerified = !verifiedOnly || r.verified === true;

      return matchesSearch && matchesCourseCode && matchesDept && matchesType && matchesVerified;
    });

    switch (sortBy) {
      case "downloads":
        return result.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
      case "newest":
        return result; // keeps insertion order (newest first = beginning of array)
      case "course_code":
        return result.sort((a, b) => a.course_code.localeCompare(b.course_code));
      default:
        return result;
    }
  }, [academicResources, searchQuery, courseCodeFilter, selectedDept, selectedType, sortBy, verifiedOnly]);

  const filteredFacilities = MOCK_RESOURCES.filter((res) => {
    const matchesCategory =
      selectedFacilityCategory === "All" || res.category === selectedFacilityCategory;
    const matchesSearch =
      !facilitySearch ||
      res.title.toLowerCase().includes(facilitySearch.toLowerCase()) ||
      res.description.toLowerCase().includes(facilitySearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFacilityAction = (res: CampusResource) => {
    setModalState({
      isOpen: true,
      title: `${res.title} — Access Confirmed`,
      message: `Your booking/access request for "${res.title}" at ${res.location} has been granted. Access pass linked to student ID ${user?.studentId || "CU-892401"}.`,
      referenceId: "RES-" + Math.floor(100000 + Math.random() * 900000),
    });
  };

  const handleDownloadEvent = (resource: AcademicCourseResource) => {
    const updated = academicResources.map((r) =>
      r.id === resource.id ? { ...r, downloads: (r.downloads || 0) + 1 } : r
    );
    saveResources(updated);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);

    if (!uploadForm.title.trim()) {
      setUploadError("Resource title is required.");
      return;
    }
    if (!uploadForm.course_code.trim()) {
      setUploadError("Course code is required (e.g. CSE 201 or EEE 321).");
      return;
    }
    if (!uploadForm.file_url.trim()) {
      setUploadError("A valid file URL or Google Drive / OneDrive link is required.");
      return;
    }

    const newResource: AcademicCourseResource = {
      id: "upload-" + Date.now(),
      title: uploadForm.title.trim(),
      department: uploadForm.department,
      course_code: uploadForm.course_code.toUpperCase().trim(),
      resource_type: uploadForm.resource_type,
      file_url: uploadForm.file_url.trim(),
      uploaded_by: user?.fullName || "Junaid Parvez",
      uploaded_at: "Just now",
      file_size: "~",
      downloads: 0,
      semester: uploadForm.semester,
      year: uploadForm.year,
      tags: uploadForm.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      verified: false,
    };

    saveResources([newResource, ...academicResources]);
    setUploadOpen(false);
    setUploadForm({
      title: "",
      department: "Computer Science & Engineering (CSE)",
      course_code: "",
      resource_type: "Exam Paper",
      file_url: "",
      semester: "Fall",
      year: "2024",
      tags: "",
    });

    setModalState({
      isOpen: true,
      title: "Resource Uploaded & Indexed!",
      message: `"${newResource.title}" has been added to the City University Academic Vault under ${newResource.course_code}. It will be reviewed by the department within 24 hours.`,
      referenceId: "DOC-" + newResource.id.toUpperCase(),
    });
  };

  const hasActiveFilters = courseCodeFilter || selectedDept !== "All" || selectedType !== "All" || verifiedOnly || searchQuery;

  const resetFilters = () => {
    setSearchQuery("");
    setCourseCodeFilter("");
    setSelectedDept("All");
    setSelectedType("All");
    setVerifiedOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ── HEADER BANNER ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-campus-950 via-campus-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-campus-800">
        <div className="absolute -right-16 -top-16 w-72 h-72 bg-campus-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 font-semibold border border-gold-400/30 text-xs">
              <FolderKanban className="w-3.5 h-3.5 text-gold-400" />
              <span>City University Academic Vault & Campus Services</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Resource Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Browse <strong>{academicResources.length}+</strong> past exam papers, lecture notes, and lab guides for <strong>CSE</strong> and <strong>EEE</strong> from City University. Filter by course code, department, or resource type — and upload your own.
            </p>
          </div>

          {/* Stats + CTAs */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <div className="text-lg font-black text-gold-300">{cseCount}</div>
                <div className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider">CSE Files</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <div className="text-lg font-black text-gold-300">{eeeCount}</div>
                <div className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider">EEE Files</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <div className="text-lg font-black text-gold-300">{(totalDownloads / 1000).toFixed(1)}K</div>
                <div className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider">Downloads</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setUploadOpen(true)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gold-400 hover:bg-gold-300 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Material</span>
              </button>
              <button
                onClick={() => setModalState({
                  isOpen: true,
                  title: "Campus SafeWalk Ranger Dispatched",
                  message: "Emergency Safety Patrol alert sent. A security ranger is en route to your location. ETA < 3 mins.",
                  referenceId: "SAFEWALK-" + Math.floor(10000 + Math.random() * 90000),
                })}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all"
              >
                <Shield className="w-4 h-4 text-amber-400" />
                <span>SafeWalk</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATUS ROW ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <Building2 className="w-5 h-5" />, color: "bg-emerald-50 text-emerald-600", title: "12 Pods Open", sub: "Library Level 2 & 3" },
          { icon: <Cpu className="w-5 h-5" />, color: "bg-purple-50 text-purple-600", title: "GPU Cluster Live", sub: "48 Nodes Active" },
          { icon: <HeartHandshake className="w-5 h-5" />, color: "bg-rose-50 text-rose-600", title: "Wellness Center", sub: "Drop-in Open Now" },
          { icon: <Shield className="w-5 h-5" />, color: "bg-campus-50 text-campus-600", title: "SafeWalk Ready", sub: "< 3.5 min response" },
        ].map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>{s.icon}</div>
            <div>
              <div className="text-xs font-bold text-slate-800">{s.title}</div>
              <div className="text-[11px] text-slate-500 font-medium">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── PRIMARY TABS ──────────────────────────────────────────────────── */}
      <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab("academic")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "academic" ? "bg-white text-campus-700 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
        >
          <FileText className="w-4 h-4" />
          <span>Academic Vault ({academicResources.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("facilities")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "facilities" ? "bg-white text-campus-700 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
        >
          <Building2 className="w-4 h-4" />
          <span>Campus Facilities ({MOCK_RESOURCES.length})</span>
        </button>
      </div>

      {/* ── ACADEMIC VAULT TAB ─────────────────────────────────────────────── */}
      {activeTab === "academic" && (
        <div className="space-y-6">
          {/* Filter Panel */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-5">
            {/* Row 1: Main search + Course Code + Sort + View Toggle */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
              {/* Keyword Search */}
              <div className="relative flex-1 min-w-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search title, keyword, uploader, tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white transition-all font-medium"
                />
              </div>

              {/* Course Code Input */}
              <div className="relative w-full lg:w-48">
                <span className="text-slate-400 font-mono text-xs absolute left-3.5 top-1/2 -translate-y-1/2">▸</span>
                <input
                  type="text"
                  placeholder="Course Code: CSE 201"
                  value={courseCodeFilter}
                  onChange={(e) => setCourseCodeFilter(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white transition-all font-mono font-medium uppercase"
                />
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 shrink-0">
                <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-campus-500"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Grid/List Toggle */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl shrink-0">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-campus-700" : "text-slate-400 hover:text-slate-700"}`}
                  title="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm text-campus-700" : "text-slate-400 hover:text-slate-700"}`}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Row 2: Department + Resource Type pill filters */}
            <div className="space-y-3">
              {/* Department filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
                <span className="text-slate-500 font-bold text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-campus-600" /> Dept:
                </span>
                {DEPARTMENTS.map((dept) => {
                  const count =
                    dept === "All"
                      ? academicResources.length
                      : academicResources.filter((r) =>
                          dept === "All Departments"
                            ? r.department === "All Departments"
                            : r.department === dept
                        ).length;
                  const label =
                    dept === "All" ? "All Depts" :
                    dept === "Computer Science & Engineering (CSE)" ? "CSE" :
                    dept === "Electrical & Electronic Eng (EEE)" ? "EEE" :
                    dept === "Data Science & AI" ? "DS & AI" :
                    dept === "All Departments" ? "UNIV" : dept;

                  return (
                    <button
                      key={dept}
                      onClick={() => setSelectedDept(dept)}
                      className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all flex items-center gap-1 text-xs ${
                        selectedDept === dept
                          ? "bg-campus-700 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <span>{label}</span>
                      <span className={`text-[10px] px-1.5 rounded-full font-mono ${selectedDept === dept ? "bg-white/20 text-white" : "bg-slate-200 text-slate-500"}`}>{count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Resource Type filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
                <span className="text-slate-500 font-bold text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-campus-600" /> Type:
                </span>
                {RESOURCE_TYPES_UNIQUE.map((type) => {
                  const count =
                    type === "All"
                      ? academicResources.length
                      : academicResources.filter((r) => r.resource_type === type).length;
                  return (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all flex items-center gap-1.5 text-xs ${
                        selectedType === type
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {type !== "All" && <span className={selectedType === type ? "text-white/80" : "text-slate-400"}>{typeIcon(type)}</span>}
                      <span>{type}</span>
                      <span className={`text-[10px] px-1.5 rounded-full font-mono ${selectedType === type ? "bg-white/20 text-white" : "bg-slate-200 text-slate-500"}`}>{count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Verified toggle + active filter bar */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="w-4 h-4 text-campus-600 border-slate-300 rounded focus:ring-campus-500"
                  />
                  <span className="font-semibold text-slate-700">Verified uploads only</span>
                </label>

                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-xs font-bold text-campus-700 hover:text-campus-900 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset All Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                Academic Course Materials
                <span className="text-xs font-bold bg-campus-50 text-campus-800 border border-campus-200 px-3 py-0.5 rounded-full">
                  {filtered.length} Files
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Past exam papers, lecture notes, lab guides &amp; official notices for CSE and EEE — City University Academic Vault
              </p>
            </div>
          </div>

          {/* Grid or List Results */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">No resources match your filters</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing the course code field, switching to "All Depts", or resetting all filters.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-campus-600 hover:bg-campus-700 text-white rounded-xl text-xs font-bold transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {filtered.map((resource) => (
                <AcademicResourceCard
                  key={resource.id}
                  resource={resource}
                  onDownload={handleDownloadEvent}
                />
              ))}
            </div>
          ) : (
            /* List View */
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-sm font-bold text-slate-900">
                  Academic Documents — List View
                </h3>
                <span className="text-xs font-medium text-slate-500">{filtered.length} results</span>
              </div>
              <div className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    className="px-5 sm:px-6 py-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-black text-campus-800 bg-campus-50 border border-campus-200 px-2 py-0.5 rounded">
                          {item.course_code}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.resource_type === "Exam Paper"
                              ? "bg-rose-100 text-rose-700"
                              : item.resource_type === "Lecture Notes"
                              ? "bg-purple-100 text-purple-700"
                              : item.resource_type === "Lab Guide"
                              ? "bg-emerald-100 text-emerald-700"
                              : item.resource_type === "Official Notice"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {item.resource_type}
                        </span>
                        <span className="text-xs text-slate-400">{item.department.replace("Computer Science & Engineering (CSE)", "CSE").replace("Electrical & Electronic Eng (EEE)", "EEE")}</span>
                        {item.verified && (
                          <span className="text-[10px] text-campus-700 font-semibold flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Verified
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                        {item.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                        {item.uploaded_by && <span>By {item.uploaded_by}</span>}
                        <span>• {item.uploaded_at}</span>
                        {item.file_size && <span className="font-mono">• {item.file_size}</span>}
                        {item.downloads && (
                          <span className="text-campus-600 font-semibold flex items-center gap-0.5">
                            <Download className="w-3 h-3" />
                            {item.downloads.toLocaleString()} DLs
                          </span>
                        )}
                      </div>
                    </div>

                    <a
                      href={item.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleDownloadEvent(item)}
                      className="shrink-0 px-4 py-2 bg-slate-900 hover:bg-campus-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      {item.resource_type === "Official Notice" ? "View" : "Download"}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── FACILITIES TAB ─────────────────────────────────────────────────── */}
      {activeTab === "facilities" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search study pods, GPU cluster, makerspace..."
                  value={facilitySearch}
                  onChange={(e) => setFacilitySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white transition-all"
                />
              </div>
              <span className="text-xs font-semibold text-slate-600">{filteredFacilities.length} facilities</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
              <span className="text-slate-500 font-bold text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Category:
              </span>
              {["All", "Study Spaces", "IT & Software", "Health & Wellness", "Academic Support"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFacilityCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all text-xs ${
                    selectedFacilityCategory === cat
                      ? "bg-campus-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} onAction={handleFacilityAction} />
            ))}
          </div>
        </div>
      )}

      {/* ── UPLOAD MODAL ───────────────────────────────────────────────────── */}
      {uploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-xl my-8 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95">
            {/* Header */}
            <div className="bg-gradient-to-r from-campus-900 to-indigo-950 p-6 text-white relative">
              <button
                onClick={() => { setUploadOpen(false); setUploadError(null); }}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/30 text-xs font-bold uppercase tracking-wider mb-2">
                <Upload className="w-3.5 h-3.5" />
                <span>Contribute to Academic Vault</span>
              </div>
              <h2 className="text-xl font-black text-white">Upload Course Material</h2>
              <p className="text-xs text-slate-300 mt-1">
                Share past exam papers, lecture notes, or lab guides with all City University students.
              </p>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {uploadError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Resource Title */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Resource Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CSE 201: DSA Midterm Exam Q-Paper with Solution (Fall 2024)"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white"
                />
              </div>

              {/* Department + Resource Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Department <span className="text-rose-500">*</span></label>
                  <select
                    value={uploadForm.department}
                    onChange={(e) => setUploadForm({ ...uploadForm, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-campus-500"
                  >
                    <option>Computer Science & Engineering (CSE)</option>
                    <option>Electrical & Electronic Eng (EEE)</option>
                    <option>Data Science & AI</option>
                    <option>Mathematics</option>
                    <option>All Departments</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Resource Type <span className="text-rose-500">*</span></label>
                  <select
                    value={uploadForm.resource_type}
                    onChange={(e) => setUploadForm({ ...uploadForm, resource_type: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-campus-500"
                  >
                    <option value="Exam Paper">Exam Paper</option>
                    <option value="Lecture Notes">Lecture Notes</option>
                    <option value="Lab Guide">Lab Guide</option>
                    <option value="Official Notice">Official Notice</option>
                    <option value="Syllabus">Syllabus</option>
                  </select>
                </div>
              </div>

              {/* Course Code + Semester + Year */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Course Code <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="CSE 201"
                    value={uploadForm.course_code}
                    onChange={(e) => setUploadForm({ ...uploadForm, course_code: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono uppercase text-slate-900 focus:outline-none focus:ring-2 focus:ring-campus-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Semester</label>
                  <select
                    value={uploadForm.semester}
                    onChange={(e) => setUploadForm({ ...uploadForm, semester: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-campus-500"
                  >
                    <option>Spring</option>
                    <option>Fall</option>
                    <option>Summer</option>
                    <option>Annual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Year</label>
                  <select
                    value={uploadForm.year}
                    onChange={(e) => setUploadForm({ ...uploadForm, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-campus-500"
                  >
                    {["2025", "2024", "2023", "2022", "2021"].map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="DSA, Midterm, Algorithms, Solutions"
                  value={uploadForm.tags}
                  onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-campus-500"
                />
              </div>

              {/* File URL */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  File URL / Drive Link <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/... or https://cityuni.edu/vault/..."
                  value={uploadForm.file_url}
                  onChange={(e) => setUploadForm({ ...uploadForm, file_url: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-campus-500"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Accepted: Google Drive, OneDrive, cityuni.edu links. Max file size: 25 MB.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setUploadOpen(false); setUploadError(null); }}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-campus-600 hover:bg-campus-700 text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload & Index to Vault</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
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
