"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import { mockRecentActivities } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  UserPlus, 
  BookOpen, 
  MessageSquare, 
  Calendar, 
  Clock, 
  CreditCard, 
  FileSpreadsheet,
  Activity,
  UserCheck,
  CheckCircle,
  Plus,
  GraduationCap,
  ChevronRight,
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function AdminDashboard() {
  const { activeUser, addToast } = useERP();

  const handleActionClick = (actionName: string) => {
    addToast(`Triggered: ${actionName} workflow`, "info");
  };
  
  // States for Quick Action Modals
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  
  // Student Form states
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentProgram, setStudentProgram] = useState("B.Tech");
  
  // Notice Form states
  const [noticeTitle, setNoticeTitle] = useState("");

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail) {
      addToast("Please fill in all required fields", "danger");
      return;
    }
    
    addToast(`Successfully created student profile for ${studentName} (${studentProgram})`, "success");
    setStudentModalOpen(false);
    setStudentName("");
    setStudentEmail("");
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle) {
      addToast("Please enter a notice description", "danger");
      return;
    }
    
    addToast(`Published notice: "${noticeTitle}" to Notice Board`, "success");
    setNoticeModalOpen(false);
    setNoticeTitle("");
  };

  const quickAccessItems = [
    { label: "Add Student", icon: UserPlus, bg: "bg-blue-50 text-blue-600 hover:bg-blue-100", action: () => setStudentModalOpen(true) },
    { label: "Add Faculty", icon: UserPlus, bg: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100", action: () => addToast("Add Faculty wizard opened", "info") },
    { label: "Create Notice", icon: MessageSquare, bg: "bg-orange-50 text-orange-600 hover:bg-orange-100", action: () => setNoticeModalOpen(true) },
    { label: "Attendance", icon: Calendar, bg: "bg-purple-50 text-purple-600 hover:bg-purple-100", action: () => addToast("Mark Attendance spreadsheet opened", "info") },
    { label: "Collect Fee", icon: CreditCard, bg: "bg-rose-50 text-rose-600 hover:bg-rose-100", action: () => addToast("Collect fee invoice terminal loaded", "info") },
    { label: "Reports", icon: FileSpreadsheet, bg: "bg-sky-50 text-sky-600 hover:bg-sky-100", action: () => addToast("Strategic reports dashboard loaded", "info") }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-1 animate-in fade-in duration-300">
      
      {/* 1. Header Banner Card */}
      <Card className="border-slate-100 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-black text-slate-900 leading-snug">
                Good Morning, {activeUser.name}! 👋
              </h2>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                {activeUser.roleTitle || "Administrator"} | Operational Control Console
              </p>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-600 font-black py-1.5 px-3.5">
              Academic Term: 2026 - 2027
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* 2. Color-Coded Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {/* Total Students */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-blue-100/80 flex items-center justify-center text-blue-600">
            <UserPlus className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">3,245</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Students</span>
          </div>
          <span className="text-[9px] text-blue-500 font-bold">Active this semester</span>
        </div>

        {/* Faculty & Staff */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-600">
            <UserCheck className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">248</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Faculty</span>
          </div>
          <span className="text-[9px] text-emerald-500 font-bold">8 new onboarding</span>
        </div>

        {/* Admission Enquiries */}
        <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-orange-100/80 flex items-center justify-center text-orange-600">
            <MessageSquare className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">142</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Enquiries</span>
          </div>
          <span className="text-[9px] text-orange-500 font-bold">Pending response</span>
        </div>

        {/* Pending Requests */}
        <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-purple-100/80 flex items-center justify-center text-purple-600">
            <Clock className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">28</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Tickets</span>
          </div>
          <span className="text-[9px] text-purple-500 font-bold">Helpdesk tickets open</span>
        </div>

        {/* Collected (Month) */}
        <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-sky-100/80 flex items-center justify-center text-sky-600">
            <CreditCard className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-xl font-black text-slate-900">₹1.68Cr</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Collected</span>
          </div>
          <span className="text-[9px] text-sky-500 font-bold">82% of target</span>
        </div>

        {/* Outstanding Fees */}
        <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-rose-100/80 flex items-center justify-center text-rose-600">
            <CreditCard className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-xl font-black text-slate-900">₹42.3L</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Outstanding</span>
          </div>
          <span className="text-[9px] text-rose-500 font-bold">Reminders sent</span>
        </div>
      </div>

      {/* 3. Quick Actions */}
      <Card className="border-slate-100 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Administrative Quick Actions</h3>
            <button 
              onClick={() => handleActionClick("Quick Actions View All")}
              className="text-xs font-black text-blue-600 hover:underline flex items-center cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 justify-items-center">
            {quickAccessItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={item.action}
                  className="w-full flex flex-col items-center justify-center p-3 border border-slate-100 hover:border-slate-350 rounded-2xl group focus-ring cursor-pointer bg-slate-50/40 hover:bg-slate-50"
                >
                  <div className={`h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-slate-100/50 ${item.bg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-655 mt-2.5 text-center group-hover:text-slate-900 leading-none">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 4. Symmetrical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Recent Activities */}
        <Card className="border-slate-100 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4 pb-1.5 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Recent Operational Log</h3>
              <Badge variant="outline" className="bg-emerald-50 border-emerald-250 text-emerald-600 font-bold">Live Feed</Badge>
            </div>

            <div className="space-y-4">
              {mockRecentActivities.map((act, idx) => (
                <div key={idx} className="flex items-start justify-between">
                  <div className="text-left space-y-1">
                    <span className="text-xs font-extrabold text-slate-800 leading-snug">
                      {act.text}
                    </span>
                    <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-semibold">
                      <span>{act.time}</span>
                      <span>•</span>
                      <span>By: {act.role}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="flex-shrink-0">{act.date.split(" ")[0]} {act.date.split(" ")[1]}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Column: System Task Overview */}
        <Card className="border-slate-100 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4 pb-1.5 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase text-left">System Task Overview</h3>
            </div>

            <div className="space-y-4 text-xs font-semibold text-slate-500">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 text-left">
                <span className="text-slate-600 font-extrabold">Classroom Allocations</span>
                <Badge variant="success" className="text-[10px] font-black uppercase">96% Allocated</Badge>
              </div>
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 text-left">
                <span className="text-slate-600 font-extrabold">Exam Hall Roll Sheets</span>
                <Badge variant="success" className="text-[10px] font-black uppercase">Generated</Badge>
              </div>
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 text-left">
                <span className="text-slate-600 font-extrabold">Salary Slips - May 2026</span>
                <Badge variant="success" className="text-[10px] font-black uppercase">Released</Badge>
              </div>
              <div className="flex items-center justify-between text-left">
                <span className="text-slate-600 font-extrabold">IT Infrastructure Tickets</span>
                <Badge variant="warning" className="text-[10px] font-black uppercase bg-amber-50 border-amber-200 text-amber-600">3 Pending Audit</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* QUICK ACTION MODALS */}
      <Modal
        isOpen={studentModalOpen}
        onClose={() => setStudentModalOpen(false)}
        title="Add New Student Profile"
        description="Fill in candidate details to initialize admission onboarding."
        footer={
          <div className="flex space-x-2 w-full justify-end">
            <Button variant="outline" onClick={() => setStudentModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateStudent}>
              Create Profile
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreateStudent} className="space-y-4 text-left">
          <Input
            label="Full Name *"
            placeholder="e.g. Aarav Mehta"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
          <Input
            label="Email Address *"
            type="email"
            placeholder="aarav@gmail.com"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            required
          />
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-450 uppercase block">Selected Degree *</label>
            <select
              value={studentProgram}
              onChange={(e) => setStudentProgram(e.target.value)}
              className="w-full text-xs font-semibold text-slate-800 p-2.5 border border-slate-200 rounded-lg bg-white outline-none cursor-pointer focus-ring"
            >
              <option value="B.Tech">B.Tech (Engineering)</option>
              <option value="B.Sc">B.Sc (Science)</option>
              <option value="B.Arch">B.Arch (Architecture)</option>
              <option value="MBA">MBA (Management)</option>
            </select>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={noticeModalOpen}
        onClose={() => setNoticeModalOpen(false)}
        title="Publish General Campus Notice"
        description="Enter announcement details to post to all institutional channels."
        footer={
          <div className="flex space-x-2 w-full justify-end">
            <Button variant="outline" onClick={() => setNoticeModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateNotice}>
              Publish Announcement
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreateNotice} className="space-y-4 text-left">
          <Input
            label="Notice Title *"
            placeholder="e.g. Mid-term examinations scheduling notices"
            value={noticeTitle}
            onChange={(e) => setNoticeTitle(e.target.value)}
            required
          />
        </form>
      </Modal>

    </div>
  );
}
