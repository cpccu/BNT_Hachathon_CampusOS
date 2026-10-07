"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, X, Send, Bot, User, MessageSquare, ChevronDown, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  isTyping?: boolean;
}

export default function CampusAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "msg-1",
          role: "ai",
          content: "Hi! I'm your CampusOS AI Assistant ✨. I can help you find past papers, check shuttle bus timings, find clubs, or dispatch SafeWalk. What do you need help with?",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate AI thinking
    const typingId = "typing-" + Date.now();
    setMessages((prev) => [
      ...prev,
      { id: typingId, role: "ai", content: "", isTyping: true },
    ]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.id !== typingId));
      
      const query = userMsg.content.toLowerCase();
      let aiResponse = "";

      // Hackathon Mock AI Logic (City University Context)
      if (query.includes("bus") || query.includes("shuttle")) {
        aiResponse = "🚌 The next CityUni Shuttle (Route A) leaves the Main Campus in 12 minutes. The Route B shuttle to the Metro Station leaves in 25 minutes. Should I set an alarm for you?";
      } else if (query.includes("cse 201") || query.includes("dsa")) {
        aiResponse = "📚 CSE 201 (Data Structures & Algorithms) is a core course. I found the complete lecture slides and 3 past midterm papers in the Academic Vault! You can download them directly from the Resource Hub.";
      } else if (query.includes("lost") || query.includes("id card") || query.includes("found")) {
        aiResponse = "🔍 If you lost your ID card, you can check the Lost & Found Box at the Main Security Desk. 3 ID cards were turned in today. Would you like me to file a missing item report for you?";
      } else if (query.includes("safewalk") || query.includes("escort") || query.includes("emergency")) {
        aiResponse = "🛡️ SafeWalk is available 24/7! A campus security ranger can escort you anywhere on campus. The average wait time right now is 3 minutes. Should I dispatch a ranger to your location?";
      } else if (query.includes("routine") || query.includes("batch") || query.includes("class") || query.includes("schedule")) {
        const departments = ["cse", "dba", "textile", "mechanical", "english", "eee"];
        const foundDept = departments.find(d => query.includes(d)) || "CSE";
        
        // Extract batch number (62-69)
        const batchMatch = query.match(/\b(6[2-9])\b/);
        const batch = batchMatch ? batchMatch[0] : "64"; // Default demo batch
        
        aiResponse = `📅 Here is the latest info for **${foundDept.toUpperCase()} Batch ${batch}**:

• Today's next class is at 11:30 AM (Room 402 - ${foundDept.toUpperCase()} Core).
• Your full weekly class routine was recently updated by the department coordinator.

Would you like me to download the official PDF routine for ${foundDept.toUpperCase()} Batch ${batch} from the Academic Vault?`;
      } else if (query.includes("club") || query.includes("event") || query.includes("hackathon")) {
        aiResponse = "🎉 The CPCCU Hackathon is happening soon! There are also 5 other events this week including the Sports Club Futsal Tournament. Check the Events feed to RSVP and get your QR ticket.";
      } else {
        aiResponse = "I'm still learning about that! As an AI assistant for City University, I'm best at helping you with academic resources, campus facilities, event RSVPs, and shuttle timings. Try asking me about 'CSE past papers' or 'bus schedule'!";
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "ai", content: aiResponse },
      ]);
    }, 1500); // 1.5s delay for realism
  };

  const quickPrompts = [
    "When is the next bus?",
    "Find CSE 201 past papers",
    "I lost my ID card",
    "Call SafeWalk",
  ];

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
    setTimeout(() => {
      document.getElementById("ai-chat-input")?.focus();
    }, 100);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-campus-600 hover:bg-campus-700 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group ${
          isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        }`}
        title="Ask Campus AI"
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gold-500 border-2 border-campus-600"></span>
        </span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 sm:w-[400px] w-[calc(100vw-3rem)] h-[550px] max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-campus-900 to-indigo-950 dark:from-slate-950 dark:to-slate-900 p-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <h3 className="font-black text-sm">Smart Helpdesk AI</h3>
              <p className="text-[10px] text-slate-300 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Online — Powered by CampusOS
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scroll-smooth">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "ai"
                    ? "bg-campus-100 text-campus-700 border border-campus-200"
                    : "bg-slate-200 text-slate-600 border border-slate-300"
                }`}
              >
                {msg.role === "ai" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div
                className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-campus-600 text-white rounded-tr-sm"
                    : "bg-white text-slate-800 border border-slate-200 rounded-tl-sm shadow-sm"
                }`}
              >
                {msg.isTyping ? (
                  <div className="flex items-center gap-1.5 px-2 py-1">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                  </div>
                ) : (
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length < 3 && (
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleQuickPrompt(prompt)}
                className="shrink-0 px-3 py-1.5 bg-white border border-slate-200 hover:border-campus-400 text-slate-600 hover:text-campus-700 text-[11px] font-semibold rounded-full transition-colors whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-200 shrink-0">
          <div className="relative flex items-center">
            <input
              id="ai-chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask anything about CityUni..."
              className="w-full pl-4 pr-12 py-3 bg-slate-100 border-transparent focus:bg-white focus:border-campus-500 focus:ring-2 focus:ring-campus-500/20 rounded-xl text-sm transition-all"
              autoComplete="off"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="absolute right-2 p-1.5 bg-campus-600 text-white rounded-lg hover:bg-campus-700 disabled:opacity-50 disabled:hover:bg-campus-600 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center mt-2">
            <span className="text-[9px] font-medium text-slate-400 uppercase tracking-widest">
              CampusOS Smart Helpdesk Module
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
