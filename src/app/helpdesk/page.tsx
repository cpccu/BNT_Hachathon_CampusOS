"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, User, MessageSquare, Book, LifeBuoy, FileText, CheckCircle2, ChevronRight, PhoneCall, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  isTyping?: boolean;
}

export default function HelpdeskPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "ai",
      content: "Hello! I am the CampusOS Smart Helpdesk AI. How can I assist you today? I can help with account issues, course registration, library access, or campus IT services."
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<"ai" | "faq" | "ticket">("ai");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const typingId = "typing-" + Date.now();
    setMessages((prev) => [...prev, { id: typingId, role: "ai", content: "", isTyping: true }]);

    setTimeout(async () => {
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMsg.content,
            history: messages.slice(-5)
          })
        });
        const data = await res.json();
        setMessages((prev) => prev.filter((m) => m.id !== typingId));
        if (data.error) throw new Error(data.error);
        setMessages((prev) => [...prev, { id: Date.now().toString(), role: "ai", content: data.reply }]);
      } catch (error: any) {
        setMessages((prev) => prev.filter((m) => m.id !== typingId));
        setMessages((prev) => [...prev, { id: Date.now().toString(), role: "ai", content: `⚠️ System Error: ${error.message}` }]);
      }
    }, 500);
  };

  const FAQs = [
    { q: "How do I reset my Campus Portal password?", a: "To reset your password, visit the login page and click 'Forgot Password'. A reset link will be sent to your registered university email." },
    { q: "How can I book a Study Pod?", a: "Navigate to the 'Resources' tab from the main dashboard. You'll see a real-time map of available Study Pods. Click on an open pod to reserve it instantly." },
    { q: "Where can I find my course registration dates?", a: "Course registration dates are posted under the 'Announcements' section on your Home Dashboard. You will also receive an email notification 1 week prior." },
    { q: "Who do I contact for Eduroam WiFi issues?", a: "If you cannot connect to Eduroam or CityUni-Secure, please ensure your device certificates are updated. For persistent issues, contact the IT Helpdesk at it-support@cityuni.edu." }
  ];

  const quickPrompts = ["Reset my password", "How to book a study pod?", "Library timings", "Contact IT support"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-campus-900 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-campus-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-gold-300 font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              24/7 Smart Support
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Smart Help Desk & IT Support</h1>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Get instant answers from our AI Assistant, browse FAQs, or open a support ticket for complex IT, academic, or facility issues.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 flex items-center gap-4 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-300 font-medium uppercase tracking-wider">IT Emergency Hotline</div>
                <div className="font-mono font-bold text-lg">(555) 019-HELP</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Navigation & Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm flex flex-col gap-1">
            <button
              onClick={() => setActiveTab("ai")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "ai" ? "bg-campus-50 text-campus-700 border border-campus-200" : "text-slate-600 hover:bg-slate-50"}`}
            >
              <Sparkles className="w-5 h-5" /> AI Assistant Chat
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "faq" ? "bg-campus-50 text-campus-700 border border-campus-200" : "text-slate-600 hover:bg-slate-50"}`}
            >
              <Book className="w-5 h-5" /> Knowledge Base & FAQs
            </button>
            <button
              onClick={() => setActiveTab("ticket")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "ticket" ? "bg-campus-50 text-campus-700 border border-campus-200" : "text-slate-600 hover:bg-slate-50"}`}
            >
              <LifeBuoy className="w-5 h-5" /> Open Support Ticket
            </button>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white border border-slate-700 shadow-sm">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-gold-400" /> Direct Contacts
            </h3>
            <p className="text-sm text-slate-400 mb-4">For issues requiring human intervention.</p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                <span className="text-slate-300">IT Support</span>
                <span className="font-mono text-campus-300">it@cityuni.edu</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                <span className="text-slate-300">Registrar</span>
                <span className="font-mono text-campus-300">reg@cityuni.edu</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Library</span>
                <span className="font-mono text-campus-300">lib@cityuni.edu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Content */}
        <div className="lg:col-span-2">
          {activeTab === "ai" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
              <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-campus-100 flex items-center justify-center text-campus-600">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900">CampusOS AI Support</h2>
                    <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Systems Online
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === "ai" ? "bg-campus-600 text-white shadow-md" : "bg-slate-200 text-slate-600"}`}>
                      {msg.role === "ai" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                    </div>
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-campus-600 text-white rounded-tr-sm" : "bg-white text-slate-800 border border-slate-200 rounded-tl-sm shadow-sm"}`}>
                      {msg.isTyping ? (
                        <div className="flex items-center gap-1.5 px-2 py-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        </div>
                      ) : (
                        <span className="whitespace-pre-wrap">{msg.content}</span>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {messages.length <= 2 && (
                <div className="px-6 py-3 bg-white flex flex-wrap gap-2 shrink-0">
                  {quickPrompts.map(prompt => (
                    <button key={prompt} onClick={() => { setInput(prompt); setTimeout(() => handleSend(), 100); }} className="px-3 py-1.5 bg-slate-100 hover:bg-campus-50 text-slate-600 hover:text-campus-700 text-xs font-semibold rounded-lg transition-colors border border-transparent hover:border-campus-200">
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              <div className="p-4 bg-white border-t border-slate-200 shrink-0">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Describe your issue..."
                    className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-200 focus:bg-white focus:border-campus-500 focus:ring-4 focus:ring-campus-500/10 rounded-2xl text-sm transition-all"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="absolute right-3 p-2.5 bg-campus-600 text-white rounded-xl hover:bg-campus-700 disabled:opacity-50 transition-all shadow-md active:scale-95"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "faq" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 h-[600px] overflow-y-auto">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <Book className="w-6 h-6 text-campus-600" /> Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {FAQs.map((faq, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-slate-200 hover:border-campus-300 transition-colors bg-slate-50/50 group">
                    <h4 className="font-bold text-slate-900 text-base mb-2 group-hover:text-campus-700 transition-colors">{faq.q}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Didn't find your answer?</h4>
                  <p className="text-sm text-amber-800/80 mb-3">Our AI assistant can search through hundreds of internal documents, or you can open a direct support ticket.</p>
                  <button onClick={() => setActiveTab("ticket")} className="text-sm font-bold px-4 py-2 bg-amber-200 hover:bg-amber-300 rounded-lg transition-colors">
                    Open a Ticket
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ticket" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 h-[600px] overflow-y-auto">
              <h2 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-3">
                <LifeBuoy className="w-6 h-6 text-campus-600" /> Submit a Support Ticket
              </h2>
              <p className="text-slate-500 text-sm mb-8">Our support team generally responds within 2-4 hours during business days.</p>
              
              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Ticket submitted successfully! Check your email for the tracking ID."); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Issue Category</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-campus-500 focus:border-campus-500 bg-white text-sm transition-all">
                      <option>IT & Account Access</option>
                      <option>Course Registration & Portal</option>
                      <option>Library & Facilities</option>
                      <option>Billing & Financial Aid</option>
                      <option>Other / General</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Priority Level</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-campus-500 focus:border-campus-500 bg-white text-sm transition-all">
                      <option>Low - General Inquiry</option>
                      <option>Medium - Service Disruption</option>
                      <option>High - Urgent System Failure</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subject</label>
                  <input required type="text" placeholder="Brief summary of the issue..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-campus-500 focus:border-campus-500 text-sm transition-all" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Detailed Description</label>
                  <textarea required rows={5} placeholder="Please provide as much detail as possible to help us resolve your issue quickly..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-campus-500 focus:border-campus-500 text-sm resize-none transition-all"></textarea>
                </div>

                <div className="pt-4 flex justify-end">
                  <button type="submit" className="px-6 py-3 bg-campus-600 hover:bg-campus-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center gap-2">
                    <Send className="w-4 h-4" /> Submit Ticket
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
