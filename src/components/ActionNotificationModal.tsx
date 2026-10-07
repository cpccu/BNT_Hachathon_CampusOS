"use client";

import React from "react";
import { CheckCircle2, X } from "lucide-react";

interface ActionNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  referenceId?: string;
}

export default function ActionNotificationModal({
  isOpen,
  onClose,
  title,
  message,
  referenceId,
}: ActionNotificationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">{message}</p>

        {referenceId && (
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 mb-5">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">
              CampusOS Confirmation Ref
            </span>
            <span className="font-mono text-xs font-bold text-campus-700">
              {referenceId}
            </span>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 px-4 bg-campus-600 hover:bg-campus-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
        >
          Back to CampusOS
        </button>
      </div>
    </div>
  );
}
