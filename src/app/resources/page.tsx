"use client";

import React, { useState } from "react";
import {
  FolderKanban,
  Search,
  Filter,
  Shield,
  PhoneCall,
  Clock,
  Sparkles,
  Cpu,
  HeartHandshake,
  BookMarked,
  CheckCircle2,
  AlertTriangle,
  Building2,
  FileText,
  Download,
  Upload,
  PlusCircle,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import {
  MOCK_RESOURCES,
  MOCK_ACADEMIC_RESOURCES,
  CampusResource,
  AcademicCourseResource,
} from "@/data/mockData";
import ResourceCard from "@/components/ResourceCard";
import ActionNotificationModal from "@/components/ActionNotificationModal";
import { useAuth } from "@/context/AuthContext";

export default function ResourceHubPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"facilities" | "academic">("academic");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFacilityCategory, setSelectedFacilityCategory] = useState<string>("All");
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  
  const [academicResources, setAcademicResources] = useState<AcademicCourseResource[]>(
    MOCK_ACADEMIC_RESOURCES
  );

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newResource, setNewResource] = useState({
    title: "",
    department: "Computer Science",
    course_code: "",
    resource_type: "Exam Paper" as AcademicCourseResource["resource_type"],
    file_url: "",
  });

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

  const facilityCategories = [
    "All",
    "Study Spaces",
    "IT & Software",
    "Health & Wellness",
    "Academic Support",
  ];

  const departments = [
    "All",
    "Computer Science",
    "Data Science & AI",
    "Mathematics",
    "Electrical & Computer Eng",
  ];

  const resourceTypes = [
    "All",
    "Exam Paper",
    "Lecture Notes",
    "Lab Guide",
    "Software Spec",
  ];

  // Filter facilities
  const filteredFacilities = MOCK_RESOURCES.filter((res) => {
    const matchesCategory =
      selectedFacilityCategory === "All" || res.category === selectedFacilityCategory;
    const matchesQuery =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Filter academic resources (Database table: resources)
  const filteredAcademic = academicResources.filter((item) => {
    const matchesDept = selectedDept === "All" || item.department === selectedDept;
    const matchesType = selectedType === "All" || item.resource_type === selectedType;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.course_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesType && matchesQuery;
  });

  const handleFacilityAction = (res: CampusResource) => {
    const confirmationId = "RES-" + Math.floor(100000 + Math.random() * 900000);
    setModalState({
      isOpen: true,
      title: `${res.title} Confirmed`,
      message: `Your booking/access request for "${res.title}" at ${res.location} has been granted. Access pass linked to student ID ${user?.studentId || "CU-892401"}.`,
      referenceId: confirmationId,
    });
  };

  const handleInstantEmergency = () => {
    setModalState({
      isOpen: true,
      title: "Campus SafeWalk Ranger Dispatched",
      message:
        "Emergency Safety Patrol alert transmitted. A security ranger is en route to your current beacon location with average transit time < 3 mins.",
      referenceId: "SAFEWALK-" + Math.floor(10000 + Math.random() * 90000),
    });
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResource.title || !newResource.course_code || !newResource.file_url) return;

    const created: AcademicCourseResource = {
      id: "acad-" + Math.floor(1000 + Math.random() * 9000),
      title: newResource.title,
      department: newResource.department,
      course_code: newResource.course_code.toUpperCase(),
      resource_type: newResource.resource_type,
      file_url: newResource.file_url,
      uploaded_by: user?.fullName || "Jordan Patel",
      uploaded_at: "Just now",
      file_size: "1.8 MB",
      downloads: 1,
    };

    setAcademicResources([created, ...academicResources]);
    setUploadModalOpen(false);
    setNewResource({
      title: "",
      department: "Computer Science",
      course_code: "",
      resource_type: "Exam Paper",
      file_url: "",
    });

    setModalState({
      isOpen: true,
      title: "Resource Uploaded Successfully",
      message: `"${created.title}" has been indexed in the City University Academic Vault under ${created.course_code}.`,
      referenceId: "DOC-" + created.id.toUpperCase(),
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-campus-950 via-campus-900 to-slate-900 text-white p-6 sm:p-8 shadow-lg border border-campus-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs text-gold-300 font-semibold border border-white/10">
              <FolderKanban className="w-3.5 h-3.5 text-gold-400" />
              <span>Campus Facilities & Academic Vault</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Resource Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Access past exam solutions, course syllabi, reserve quiet study pods, request high-performance NVIDIA GPU compute, or dispatch 24/7 security escorts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setUploadModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Course Material</span>
            </button>
            <button
              onClick={handleInstantEmergency}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>SafeWalk 24/7</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Tab Switcher */}
      <div className="flex items-center bg-slate-200/80 p-1.5 rounded-2xl w-fit">
        <button
          onClick={() => {
            setActiveTab("academic");
            setSearchQuery("");
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "academic"
              ? "bg-white text-campus-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Academic Course Vault ({academicResources.length})</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("facilities");
            setSearchQuery("");
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "facilities"
              ? "bg-white text-campus-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Campus Facilities & Spaces ({MOCK_RESOURCES.length})</span>
        </button>
      </div>

      {/* Real-time Status Micro-Telemetry Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800">12 Pods Open</div>
            <div className="text-[11px] text-emerald-600 font-semibold">Library Level 2 & 3</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800">GPU Cluster Slurm</div>
            <div className="text-[11px] text-purple-600 font-semibold">48 Nodes Active</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800">Wellness Sanctuary</div>
            <div className="text-[11px] text-rose-600 font-semibold">Drop-in Open Now</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-campus-50 text-campus-600 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800">SafeWalk Response</div>
            <div className="text-[11px] text-campus-600 font-semibold">&lt; 3.5 min avg wait</div>
          </div>
        </div>
      </div>

      {/* ACADEMIC COURSE MATERIALS VAULT TAB */}
      {activeTab === "academic" && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search title, course code (e.g. CS 381), or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white transition-all"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-campus-500"
                >
                  <option value="All">All Departments</option>
                  {departments.filter((d) => d !== "All").map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-campus-500"
                >
                  <option value="All">All Resource Types</option>
                  {resourceTypes.filter((t) => t !== "All").map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Academic Resource Table / Card List */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Verified Academic Course Documents
                </h2>
                <p className="text-xs text-slate-500">
                  Schema: <code className="text-campus-600 font-mono">resources(title, department, course_code, resource_type, file_url)</code>
                </p>
              </div>
              <span className="text-xs font-semibold bg-campus-50 text-campus-700 border border-campus-200 px-2.5 py-1 rounded-full">
                {filteredAcademic.length} Files Available
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredAcademic.map((item) => (
                <div
                  key={item.id}
                  className="p-5 sm:px-6 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-campus-800 bg-campus-100 px-2 py-0.5 rounded border border-campus-200">
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
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {item.resource_type}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500 font-medium">
                        {item.department}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <span>Uploaded by {item.uploaded_by}</span>
                      <span>•</span>
                      <span>{item.uploaded_at}</span>
                      {item.file_size && (
                        <>
                          <span>•</span>
                          <span className="font-mono">{item.file_size}</span>
                        </>
                      )}
                      {item.downloads && (
                        <>
                          <span>•</span>
                          <span className="text-campus-600 font-semibold">
                            {item.downloads} downloads
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <a
                      href={item.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-slate-900 hover:bg-campus-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              ))}

              {filteredAcademic.length === 0 && (
                <div className="p-12 text-center text-slate-400 text-xs">
                  No course materials found matching your filters.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FACILITIES TAB */}
      {activeTab === "facilities" && (
        <div className="space-y-6">
          {/* Search and Category Filter Toolbar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search study pods, compute cluster, makerspace, tutoring..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white transition-all"
                />
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Showing <strong className="text-slate-800">{filteredFacilities.length}</strong> facilities
              </div>
            </div>

            {/* Filter Badges */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Category:
              </span>
              {facilityCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFacilityCategory(cat)}
                  className={`px-3 py-1.5 rounded-full font-medium shrink-0 transition-colors ${
                    selectedFacilityCategory === cat
                      ? "bg-campus-600 text-white shadow-2xs font-semibold"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Resources Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onAction={handleFacilityAction}
              />
            ))}
          </div>
        </div>
      )}

      {/* Upload Academic Resource Modal (Schema: Resources) */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Upload Course Material
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Indexes into <code className="text-campus-600 font-mono">public.resources</code> table for City University students.
            </p>

            <form onSubmit={handleUploadSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Resource Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CS 381 Practice Midterm with Step-by-Step Proofs"
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Course Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="CS 381"
                    value={newResource.course_code}
                    onChange={(e) => setNewResource({ ...newResource, course_code: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 uppercase font-mono focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Resource Type
                  </label>
                  <select
                    value={newResource.resource_type}
                    onChange={(e) => setNewResource({ ...newResource, resource_type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white"
                  >
                    <option value="Exam Paper">Exam Paper</option>
                    <option value="Lecture Notes">Lecture Notes</option>
                    <option value="Lab Guide">Lab Guide</option>
                    <option value="Syllabus">Syllabus</option>
                    <option value="Software Spec">Software Spec</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Department
                </label>
                <select
                  value={newResource.department}
                  onChange={(e) => setNewResource({ ...newResource, department: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Data Science & AI">Data Science & AI</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Electrical & Computer Eng">Electrical & Computer Eng</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  File URL / Cloud Document Link
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://cityuni.edu/vault/doc.pdf"
                  value={newResource.file_url}
                  onChange={(e) => setNewResource({ ...newResource, file_url: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-campus-600 hover:bg-campus-700 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Upload & Index
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
