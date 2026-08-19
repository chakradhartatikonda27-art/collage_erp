"use client";

import React, { useState, useRef, useEffect } from "react";
import { useERP } from "@/context/erp-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sparkles, 
  X, 
  Send, 
  MessageSquare, 
  Bot, 
  ChevronDown, 
  TrendingUp, 
  AlertCircle, 
  ShieldCheck, 
  BookOpen,
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export default function AiCopilot() {
  const { activeUser } = useERP();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Set initial welcome message based on role
  useEffect(() => {
    const getWelcomeMessage = () => {
      switch (activeUser.role) {
        case "superadmin":
          return `Hello ${activeUser.name}. I have loaded the platform infrastructure context. CPU, memory, and tenant telemetry are healthy. How can I assist with server operations today?`;
        case "chairman":
          return `Greetings, ${activeUser.name}. I have compiled the institutional financial and academic metrics. Bengaluru and Hyderabad campuses are showing strong YTD growth. What report shall we generate?`;
        case "principal":
          return `Good day, Dr. Krishnan. Academic compliance modules are up to date. I detected 34 attendance exceptions this term. Let me know if you would like me to draft notification reminders.`;
        case "faculty":
          return `Hello Prof. Sen. Gradebooks and syllabus progress markers are loaded. BBA Marketing evaluation queue is open. What syllabus updates or grade metrics shall we check?`;
        case "parent":
          return `Welcome. I have loaded Ananya's academic reports. Her attendance is currently at 92%, and the latest CGPA is 8.4. How can I help you check her scorecards or fees?`;
        default:
          return `Welcome to the Excel Institution ERP Portal. I am your EduCare AI Assistant. How can I help you analyze reports or manage workflows today?`;
      }
    };

    setMessages([
      {
        sender: "bot",
        text: getWelcomeMessage(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [activeUser]);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getQuickPrompts = () => {
    switch (activeUser.role) {
      case "superadmin":
        return [
          { label: "Infrastructure Audit", text: "Audit platform infrastructure health and resource loads.", icon: ShieldCheck },
          { label: "Check Tenant Volumes", text: "List current tenant databases and query active connections.", icon: ShieldCheck }
        ];
      case "chairman":
        return [
          { label: "Financial Projections", text: "Estimate BBA and Engineering fee revenues for next semester.", icon: DollarSign },
          { label: "Campus Rankings", text: "Show quality index performance ranking for Hyderabad vs Bengaluru.", icon: TrendingUp }
        ];
      case "principal":
        return [
          { label: "Attendance exceptions", text: "List the student batches with attendance rates below 75%.", icon: AlertCircle },
          { label: "Draft fee warnings", text: "Generate a SMS/email notification template for overdue tuition fees.", icon: AlertCircle }
        ];
      case "faculty":
        return [
          { label: "Syllabus checkpoints", text: "Check syllabus status and next topics for BBA Management.", icon: BookOpen },
          { label: "Class average GPA", text: "Calculate the average internal scores for Marketing Management.", icon: TrendingUp }
        ];
      default:
        return [
          { label: "Attendance Summary", text: "Show Ananya's class attendance logs for this semester.", icon: BookOpen },
          { label: "Upcoming Exams", text: "List next week's exam timetable slots and assignments.", icon: BookOpen }
        ];
    }
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response after 1 second
    setTimeout(() => {
      setIsTyping(false);
      let responseText = "";

      // Smart answers based on prompt keywords
      const lowerText = text.toLowerCase();
      if (lowerText.includes("infrastructure") || lowerText.includes("audit")) {
        responseText = "### Infrastructure Telemetry Audit:\n\n* **Database Cluster**: CPU load 34%, Memory 62% allocated. No lock states.\n* **Tenant Databases**: 12 active tenants connected. Read latency 12ms.\n* **Server Health**: SSL Certificates verified. Auto-renewal scheduled for Jan 2027.";
      } else if (lowerText.includes("financial") || lowerText.includes("projection") || lowerText.includes("revenue")) {
        responseText = "### YTD Financial Projections:\n\n* Total collected revenue is **₹28.75 Cr**.\n* tuition fees represent 78%, followed by Hostel/Bus fees (22%).\n* Projecting a **+8.4% increase** in fee receipts next term due to B.Tech CSE seat expansion.";
      } else if (lowerText.includes("attendance") || lowerText.includes("defaulter")) {
        responseText = "### Attendance Exceptions:\n\n* **BBA II Year**: 18 students below 75% attendance.\n* **B.Tech III Year**: 16 students below 75% attendance.\n* **Recommendation**: Draft automated alert warning email template. Click 'Draft warnings' to review template.";
      } else if (lowerText.includes("draft") || lowerText.includes("warning") || lowerText.includes("email") || lowerText.includes("sms")) {
        responseText = "### Draft Fee Warning Notice:\n\n*Dear Parent, this is to inform you that your ward's tuition fee installment is overdue. Please log in to your Parent Portal at college-erp-six-theta.vercel.app/dashboard to settle the balance. Support helpline: +91 99880 77660.*";
      } else if (lowerText.includes("syllabus") || lowerText.includes("progress")) {
        responseText = "### Syllabus Checkpoints:\n\n* **BBA - Principles of Management**: 82% complete. 2 lectures remaining (Case Study 4).\n* **BBA - Accounting for Managers**: 75% complete. Next: Cost Sheet analysis.\n* All sessions are aligned with midterm schedules.";
      } else if (lowerText.includes("gpa") || lowerText.includes("grade") || lowerText.includes("score")) {
        responseText = "### Term Academic Scorecard:\n\n* Current average CGPA is **8.4**.\n* Top performing subject: *Accounting for Managers* (**Grade: O - 96%**).\n* Class ranking remains inside the top 5% in BBA Department.";
      } else if (lowerText.includes("exam") || lowerText.includes("timetable")) {
        responseText = "### Upcoming Academic Timetable:\n\n* **24 Aug**: Principles of Management Mid-sem (09:30 AM)\n* **26 Aug**: Accounting for Managers Mid-sem (09:30 AM)\n* **28 Aug**: Business Economics Mid-sem (02:00 PM)";
      } else {
        responseText = `I have received your query: "${text}". As the EduCare AI copilot, I am scanning our institutional database indices to compile this report. Please ask me about attendance defaulters, fee collections, infrastructure audits, or grade scorecards to see advanced data analytics.`;
      }

      setMessages(prev => [...prev, {
        sender: "bot",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1200);
  };

  return (
    <>
      {/* 1. Floating Copilot Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed z-40 h-12 w-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer focus-ring",
          "bottom-20 right-4 md:bottom-6 md:right-6", // Positioned above mobile bottom nav
          isOpen 
            ? "bg-slate-900 text-white rotate-90 scale-95 border border-slate-700" 
            : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-blue-500/20"
        )}
        title="Open EduCare AI Copilot"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <div className="relative">
            <Bot className="h-5 w-5" />
            <span className="absolute -top-1.5 -right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
        )}
      </button>

      {/* 2. Floating AI Assistant Chat panel */}
      {isOpen && (
        <Card className="fixed z-40 bottom-36 right-4 md:bottom-20 md:right-6 w-[360px] max-w-[calc(100vw-2rem)] h-[480px] rounded-2xl shadow-medium bg-white border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 fade-in duration-200 dark:border-slate-800">
          
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex justify-between items-center select-none">
            <div className="flex items-center space-x-3 text-left">
              <div className="h-9 w-9 rounded-full bg-blue-600/80 border border-blue-500/30 flex items-center justify-center">
                <Sparkles className="h-5.5 w-5.5 text-white" />
              </div>
              <div>
                <span className="text-xs font-black tracking-wide block">EduCare AI Copilot</span>
                <span className="text-[9px] text-emerald-400 font-extrabold flex items-center mt-0.5 uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1.5 block animate-pulse" />
                  Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Messages viewport */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "flex flex-col max-w-[85%] text-xs",
                  msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div 
                  className={cn(
                    "p-3 rounded-2xl leading-relaxed text-left",
                    msg.sender === "user" 
                      ? "bg-blue-600 text-white rounded-tr-none font-semibold" 
                      : "bg-white text-slate-800 border border-slate-100 shadow-sm rounded-tl-none font-medium"
                  )}
                >
                  {msg.text.split("\n").map((line, lIdx) => {
                    if (line.startsWith("### ")) {
                      return <h4 key={lIdx} className="font-extrabold text-slate-900 mt-1.5 first:mt-0 mb-1">{line.replace("### ", "")}</h4>;
                    }
                    if (line.startsWith("* ")) {
                      return <p key={lIdx} className="ml-2 mb-1 last:mb-0 text-slate-655">• {line.replace("* ", "")}</p>;
                    }
                    return <p key={lIdx} className="mb-1 last:mb-0">{line}</p>;
                  })}
                </div>
                <span className="text-[8px] text-slate-400 font-bold mt-1 uppercase tracking-wider">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start max-w-[80%] text-xs">
                <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm rounded-tl-none text-slate-400 flex items-center space-x-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-350 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-350 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-350 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts Panel */}
          {messages.length === 1 && !isTyping && (
            <div className="p-3 bg-white border-t border-slate-100 space-y-2 select-none">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block text-left">Quick Analytics Prompts</span>
              <div className="flex flex-col gap-1.5">
                {getQuickPrompts().map((p, idx) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(p.text)}
                      className="w-full text-left p-2 border border-slate-100 hover:border-blue-200 rounded-xl bg-slate-50/50 hover:bg-blue-50/20 text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center space-x-2 cursor-pointer transition-colors"
                    >
                      <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="truncate">{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask anything about ERP analytics..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage(inputValue);
              }}
              className="flex-1 text-xs font-semibold text-slate-800 px-3 py-2.5 border border-slate-200 rounded-xl focus-ring outline-none bg-slate-50/50 focus:bg-white"
            />
            <Button
              onClick={() => handleSendMessage(inputValue)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-2.5 flex items-center justify-center cursor-pointer shadow-sm shadow-blue-500/10 flex-shrink-0"
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

        </Card>
      )}
    </>
  );
}
