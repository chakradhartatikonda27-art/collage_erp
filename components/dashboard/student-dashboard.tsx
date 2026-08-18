"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import { mockSchedules, mockAnnouncements } from "@/lib/mock-data";
import { KPICard } from "./widgets/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  BookOpen, 
  Clock, 
  FileText, 
  CreditCard, 
  BookMarked,
  Briefcase,
  ChevronRight,
  Sparkles,
  Play,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet
} from "lucide-react";

export default function StudentDashboard() {
  const { activeUser, addToast } = useERP();
  
  // Student specific States
  const [feeBalance, setFeeBalance] = useState("₹3,500");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handleActionClick = (actionName: string) => {
    addToast(`Triggered: ${actionName} workflow`, "info");
  };

  const handleProcessPayment = () => {
    setPaymentProcessing(true);
    addToast("Connecting securely to PG...", "info", 1000);
    
    setTimeout(() => {
      setPaymentProcessing(false);
      setFeeBalance("₹0");
      addToast("Fee Payment Successful! Receipt generated.", "success");
      setPaymentModalOpen(false);
    }, 2000);
  };

  const quickAccessItems = [
    { label: "My Timetable", icon: Clock, color: "text-primary-blue bg-primary-blue-light border-primary-blue/10", action: () => handleActionClick("Timetable view") },
    { label: "Study Material", icon: BookOpen, color: "text-academic bg-academic-light border-academic/10", action: () => handleActionClick("E-library materials") },
    { label: "Assignments", icon: FileText, color: "text-warning bg-warning-light border-warning/10", action: () => handleActionClick("Assignments queue") },
    { label: "Exam Schedule", icon: Calendar, color: "text-danger bg-danger-light border-danger/10", action: () => handleActionClick("Exams dashboard") },
    { label: "Attendance Details", icon: UserCheckIcon, color: "text-success bg-success-light border-success/10", action: () => handleActionClick("Attendance logs") },
    { label: "Fee Payment", icon: CreditCard, color: "text-info bg-info-light border-info/10", action: () => setPaymentModalOpen(true) },
    { label: "Library Catalog", icon: BookMarked, color: "text-text-primary bg-slate-100 border-slate-200", action: () => handleActionClick("Library books locator") },
    { label: "Placement Drive", icon: Briefcase, color: "text-purple-600 bg-purple-50 border-purple-100", action: () => handleActionClick("Placements desk") }
  ];

  const studentCourses = [
    { name: "Principles of Management", progress: 85, color: "bg-primary-blue", instructor: "Dr. Ramesh" },
    { name: "Business Economics", progress: 78, color: "bg-success", instructor: "Prof. Kavitha" },
    { name: "Accounting for Managers", progress: 90, color: "bg-academic", instructor: "Prof. Suresh" }
  ];

  return (
    <div className="space-y-6">
      {/* Student Banner Header */}
      <div className="bg-primary-blue text-white rounded-2xl p-6 relative overflow-hidden shadow-medium flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
            <span className="text-xs font-bold text-blue-100 uppercase tracking-wider">Student Academic Hub</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Good Morning, {activeUser.name}! 👋
          </h1>
          <p className="text-sm text-blue-100">
            Program: {activeUser.program} — {activeUser.year} • Roll Number: {activeUser.rollNo}
          </p>
        </div>
        <div className="z-10">
          <Badge variant="outline" className="border-blue-300 text-white font-bold bg-white/10 py-1.5 px-3.5">
            Academic Term: 2026 - 2027
          </Badge>
        </div>
        {/* Background visual graphics */}
        <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none select-none">
          <svg width="220" height="150" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="20" width="80" height="80" rx="10" stroke="white" strokeWidth="8" />
            <circle cx="150" cy="90" r="45" stroke="white" strokeWidth="8" />
          </svg>
        </div>
      </div>

      {/* Student KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard title="Classes Today" value="3" change="View Today's Timetable" isPositive={true} type="info" />
        <KPICard title="Assignments" value="2" change="Pending submission" isPositive={false} type="warning" />
        <KPICard title="Upcoming Exams" value="1" change="Mid-Term Exams" isPositive={true} type="academic" />
        <KPICard title="My Attendance" value="92%" change="Required minimum 75%" isPositive={true} type="success" />
        
        {/* Interactive Fee Balance Card */}
        <Card className="hover:shadow-medium transition-shadow duration-300 relative overflow-hidden border-border-base bg-surface-base">
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <p className="text-xs font-bold text-text-secondary tracking-wide uppercase">Fee Balance</p>
              {feeBalance !== "₹0" && (
                <button
                  onClick={() => setPaymentModalOpen(true)}
                  className="text-[10px] font-bold text-danger bg-danger-light px-2 py-0.5 rounded-full hover:bg-danger-hover hover:text-white transition-colors cursor-pointer"
                >
                  Pay Now
                </button>
              )}
            </div>
            <div className="mt-3.5">
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-text-primary">
                {feeBalance}
              </h3>
              <p className="text-[11px] text-text-muted mt-1 font-medium">
                {feeBalance === "₹0" ? "All dues cleared" : "Due date: 31 Aug 2026"}
              </p>
            </div>
            <div className={feeBalance === "₹0" ? "h-1 w-full bg-success absolute bottom-0 left-0" : "h-1 w-full bg-danger absolute bottom-0 left-0"} />
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Menu Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Quick Access Links</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {quickAccessItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={idx}
                  onClick={item.action}
                  className="flex flex-col items-center justify-center p-3 rounded-xl border border-border-base hover:border-border-focus hover:shadow-soft transition-all duration-300 group cursor-pointer focus-ring"
                >
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center border mb-2.5 group-hover:scale-105 transition-transform ${item.color}`}>
                    <IconComponent className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[11px] font-bold text-text-primary text-center leading-tight">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main dashboard widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Timetable */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-4.5 w-4.5 text-primary-blue" />
              <span>Today&apos;s Lecture Schedule</span>
            </CardTitle>
            <Badge variant="outline">Sec B Room 202</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border-base">
              {mockSchedules.student.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-start space-x-3.5">
                    <div className="h-8.5 w-8.5 rounded-lg bg-slate-100 flex items-center justify-center text-text-secondary flex-shrink-0">
                      <Play className="h-3 w-3 fill-current text-primary-blue" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">
                        {item.course}
                      </h4>
                      <p className="text-xs text-text-muted mt-0.5">
                        {item.time}
                      </p>
                      <span className="text-[11px] text-text-secondary font-medium block mt-1">
                        {item.details}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline">Scheduled</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Academic Course Enrolled tracker */}
        <Card>
          <CardHeader>
            <CardTitle>Courses Syllabus Coverage</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {studentCourses.map((c, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-text-primary">{c.name}</span>
                  <span className="font-bold text-text-secondary">{c.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.progress}%` }} />
                </div>
                <span className="text-[9px] text-text-muted block">Instructor: {c.instructor}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Announcements & Placements alerts</CardTitle>
          <button 
            onClick={() => handleActionClick("Notice Board")}
            className="text-xs font-bold text-primary-blue hover:text-primary-blue-hover flex items-center cursor-pointer"
          >
            <span>View Notice Board</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border-base">
            {mockAnnouncements.slice(3, 6).map((notice) => (
              <div key={notice.id} className="p-4 flex items-start justify-between hover:bg-slate-50 transition-colors">
                <div className="space-y-1 pr-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant={notice.category === "Placement" ? "warning" : "default"}>
                      {notice.category}
                    </Badge>
                    <span className="text-[11px] text-text-muted">{notice.date}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-text-primary leading-snug">
                    {notice.title}
                  </h4>
                  <p className="text-[11px] text-text-muted">
                    Sender: {notice.sender}
                  </p>
                </div>
                <button 
                  onClick={() => handleActionClick(`Open Notice ${notice.id}`)}
                  className="text-xs font-semibold text-text-muted hover:text-text-primary border border-border-base rounded-lg px-2.5 py-1 flex-shrink-0 cursor-pointer focus-ring"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Gateway Mock Modal */}
      <Modal
        isOpen={paymentModalOpen}
        onClose={() => !paymentProcessing && setPaymentModalOpen(false)}
        title="Institutional Fee Payment Gateway"
        description="Verify amount and select pay method."
        footer={
          <div className="flex space-x-2 w-full justify-end">
            <Button variant="outline" onClick={() => setPaymentModalOpen(false)} disabled={paymentProcessing}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleProcessPayment} disabled={paymentProcessing}>
              {paymentProcessing ? "Processing Dues..." : "Confirm Payment"}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
            <div className="flex justify-between text-xs text-text-muted">
              <span>Invoice Ref</span>
              <span className="font-semibold text-text-primary">INV-2026-FEE049</span>
            </div>
            <div className="flex justify-between text-xs text-text-muted">
              <span>Student Profile</span>
              <span className="font-semibold text-text-primary">{activeUser.name} ({activeUser.rollNo})</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-text-primary border-t border-border-base/50 pt-2 mt-2">
              <span>Amount Outstanding</span>
              <span className="text-primary-blue">{feeBalance}</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">Select Payment Mode</span>
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button" 
                className="flex items-center space-x-2.5 p-3 rounded-lg border border-primary-blue bg-primary-blue-light/50 text-xs font-bold text-primary-blue text-left"
              >
                <div className="h-4.5 w-4.5 rounded-full border-[5px] border-primary-blue flex-shrink-0" />
                <span>BHIM UPI</span>
              </button>
              <button 
                type="button" 
                onClick={() => addToast("Card terminal integration placeholder", "info")}
                className="flex items-center space-x-2.5 p-3 rounded-lg border border-border-base hover:border-border-focus text-xs font-semibold text-text-secondary text-left"
              >
                <div className="h-4.5 w-4.5 rounded-full border border-border-base flex-shrink-0" />
                <span>Credit/Debit Card</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// Inline fallback icon replacement for user check to avoid import conflicts
function UserCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  );
}
