"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Phone,
  User,
  Plus,
  Box,
  AlertTriangle,
  CheckCircle2,
  Image as ImageIcon,
  Clock,
  Briefcase
} from "lucide-react";
import { MOCK_LOST_AND_FOUND, MOCK_COMPLAINTS, LostAndFoundItem, Complaint } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import ActionNotificationModal from "@/components/ActionNotificationModal";

type TabType = "lost" | "found" | "complaints";

export default function LostAndFoundPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("lost");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Local state to simulate additions
  const [lostItems, setLostItems] = useState<LostAndFoundItem[]>(MOCK_LOST_AND_FOUND.filter(item => item.type === "Lost"));
  const [foundItems, setFoundItems] = useState<LostAndFoundItem[]>(MOCK_LOST_AND_FOUND.filter(item => item.type === "Found"));
  const [complaints, setComplaints] = useState<Complaint[]>(MOCK_COMPLAINTS);

  const [notification, setNotification] = useState<{ isOpen: boolean; title: string; message: string; referenceId?: string }>({
    isOpen: false,
    title: "",
    message: ""
  });

  const filteredLost = lostItems.filter(item => item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredFound = foundItems.filter(item => item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredComplaints = complaints.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newId = `ref-${Math.floor(1000 + Math.random() * 9000)}`;
    const reporterName = user?.fullName || "Guest User";
    const date = new Date().toISOString().split("T")[0];

    if (activeTab === "lost" || activeTab === "found") {
      const newItem: LostAndFoundItem = {
        id: newId,
        type: activeTab === "lost" ? "Lost" : "Found",
        itemName: formData.get("itemName") as string,
        category: formData.get("category") as any,
        description: formData.get("description") as string,
        location: formData.get("location") as string,
        date: date,
        contactInfo: formData.get("contactInfo") as string,
        status: "Active",
        reporterName: reporterName,
      };
      if (activeTab === "lost") setLostItems([newItem, ...lostItems]);
      if (activeTab === "found") setFoundItems([newItem, ...foundItems]);
    } else {
      const newComplaint: Complaint = {
        id: newId,
        title: formData.get("itemName") as string,
        category: formData.get("category") as any,
        description: formData.get("description") as string,
        location: formData.get("location") as string,
        date: date,
        status: "Pending",
        reporterName: reporterName,
        priority: formData.get("priority") as any,
      };
      setComplaints([newComplaint, ...complaints]);
    }

    setShowAddModal(false);
    setNotification({
      isOpen: true,
      title: "Submission Successful",
      message: `Your ${activeTab === "complaints" ? "complaint" : activeTab + " item"} has been recorded in the system.`,
      referenceId: newId
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Lost & Found / Complaints</h1>
          <p className="text-sm text-slate-500 mt-1">Report lost items, claim found items, or file campus complaints.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-campus-600 hover:bg-campus-700 text-white font-bold rounded-xl transition-all shadow-md active:scale-95 whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          {activeTab === "complaints" ? "File Complaint" : `Report ${activeTab === "lost" ? "Lost" : "Found"} Item`}
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-200">
        <div className="flex w-full md:w-auto gap-2 p-1 bg-slate-200/50 rounded-xl overflow-x-auto">
          {[
            { id: "lost", label: "Lost Items", icon: Search },
            { id: "found", label: "Found Items", icon: Box },
            { id: "complaints", label: "Complaints", icon: AlertTriangle }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-white text-campus-700 shadow-sm border border-slate-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search items, titles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-campus-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {(activeTab === "lost" ? filteredLost : activeTab === "found" ? filteredFound : []).map((item: any) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
            <div className="p-5 flex-1 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      item.type === "Lost" ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {item.type}
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-slate-100 text-slate-600">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-campus-600 transition-colors">
                    {item.itemName}
                  </h3>
                </div>
                {item.status === "Resolved" && (
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                )}
              </div>

              <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="truncate">{item.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <User className="w-3.5 h-3.5" />
                  <span>{item.reporterName}</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className={`text-xs font-semibold ${item.status === "Active" ? "text-campus-600" : "text-emerald-600"}`}>
                {item.status}
              </span>
              {item.status === "Active" && (
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-lg transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                  Contact
                </button>
              )}
            </div>
          </div>
        ))}

        {activeTab === "complaints" && filteredComplaints.map((comp: any) => (
          <div key={comp.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
            <div className="p-5 flex-1 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      comp.priority === "High" ? "bg-rose-100 text-rose-700" :
                      comp.priority === "Medium" ? "bg-amber-100 text-amber-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {comp.priority} Priority
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-slate-100 text-slate-600">
                      {comp.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-campus-600 transition-colors">
                    {comp.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-600 line-clamp-2">{comp.description}</p>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                {comp.location && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate">{comp.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(comp.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <User className="w-3.5 h-3.5" />
                  <span>{comp.reporterName}</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                comp.status === "Resolved" ? "bg-emerald-100 text-emerald-700" :
                comp.status === "In Progress" ? "bg-amber-100 text-amber-700" :
                "bg-slate-200 text-slate-700"
              }`}>
                {comp.status}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">ID: {comp.id}</span>
            </div>
          </div>
        ))}

        {((activeTab === "lost" && filteredLost.length === 0) || 
          (activeTab === "found" && filteredFound.length === 0) || 
          (activeTab === "complaints" && filteredComplaints.length === 0)) && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">No records found</h3>
              <p className="text-sm text-slate-500 max-w-sm mt-1">Try adjusting your search filters or add a new record to the system.</p>
            </div>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                {activeTab === "complaints" ? "File a New Complaint" : `Report ${activeTab === "lost" ? "Lost" : "Found"} Item`}
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="p-6 space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {activeTab === "complaints" ? "Title / Summary" : "Item Name"} <span className="text-rose-500">*</span>
                </label>
                <input required name="itemName" type="text" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-campus-500" placeholder={activeTab === "complaints" ? "e.g. Library WiFi Down" : "e.g. Blue Hydro Flask"} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Category <span className="text-rose-500">*</span></label>
                  <select required name="category" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-campus-500 bg-white">
                    {activeTab === "complaints" ? (
                      <>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Academic">Academic</option>
                        <option value="Hostel">Hostel</option>
                        <option value="Cafeteria">Cafeteria</option>
                        <option value="Security">Security</option>
                        <option value="Other">Other</option>
                      </>
                    ) : (
                      <>
                        <option value="Electronics">Electronics</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Documents">Documents</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Other">Other</option>
                      </>
                    )}
                  </select>
                </div>

                {activeTab === "complaints" ? (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Priority <span className="text-rose-500">*</span></label>
                    <select required name="priority" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-campus-500 bg-white">
                      <option value="Low">Low Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="High">High Priority</option>
                    </select>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Contact Info <span className="text-rose-500">*</span></label>
                    <input required name="contactInfo" type="text" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-campus-500" placeholder="Phone or Email" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Location</label>
                <input name="location" type="text" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-campus-500" placeholder="Where did it happen / Where was it lost?" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Description <span className="text-rose-500">*</span></label>
                <textarea required name="description" rows={3} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-campus-500 resize-none" placeholder="Provide more details..."></textarea>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 bg-campus-600 hover:bg-campus-700 text-white text-sm font-bold rounded-xl transition-all shadow-md active:scale-95">
                  Submit Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ActionNotificationModal
        isOpen={notification.isOpen}
        onClose={() => setNotification({ ...notification, isOpen: false })}
        title={notification.title}
        message={notification.message}
        referenceId={notification.referenceId}
      />
    </div>
  );
}
