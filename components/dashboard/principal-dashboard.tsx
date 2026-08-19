"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import { mockApprovals, mockAnnouncements } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calendar, 
  CheckSquare, 
  CreditCard,
  AlertTriangle,
  ArrowRight,
  UserCheck,
  CheckCircle,
  XCircle,
  FileCheck2,
  GraduationCap,
  Clock,
  Megaphone,
  User,
  ChevronRight,
  Percent
} from "lucide-react";

export default function PrincipalDashboard() {
  const { activeUser, addToast, pendingApprovalsCount, setPendingApprovalsCount } = useERP();
  const [approvals, setApprovals] = useState(mockApprovals.principal);
  const [selectedApproval, setSelectedApproval] = useState<typeof mockApprovals.principal[0] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleActionClick = (actionName: string) => {
    addToast(`Triggered: ${actionName}`, "info");
  };

  const handleOpenApproval = (item: typeof mockApprovals.principal[0]) => {
    setSelectedApproval(item);
    setDrawerOpen(true);
  };

  const handleProcessApproval = (approved: boolean) => {
    if (!selectedApproval) return;
    
    // Remove the approval from the dashboard list
    setApprovals(prev => prev.filter(app => app.id !== selectedApproval.id));
    
    // Decrement the badge count in context
    setPendingApprovalsCount(prev => Math.max(0, prev - 1));
    
    // UI Feedback
    if (approved) {
      addToast(`Approved request: "${selectedApproval.title}" successfully`, "success");
    } else {
      addToast(`Rejected request: "${selectedApproval.title}"`, "warning");
    }
    
    setDrawerOpen(false);
    setSelectedApproval(null);
  };

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
                {activeUser.roleTitle || "Principal"} | Institution View: Business School
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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Total Students */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-blue-100/80 flex items-center justify-center text-blue-600">
            <User className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">3,245</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Students</span>
          </div>
          <span className="text-[9px] text-blue-500 font-bold">+4.2% vs last batch</span>
        </div>

        {/* Active Faculty */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-600">
            <UserCheck className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">186</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Active Faculty</span>
          </div>
          <span className="text-[9px] text-emerald-500 font-bold">98% present rate</span>
        </div>

        {/* Student Attendance */}
        <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-purple-100/80 flex items-center justify-center text-purple-600">
            <Percent className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">91.2%</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Attendance</span>
          </div>
          <span className="text-[9px] text-purple-500 font-bold">Daily average</span>
        </div>

        {/* Pending Approvals */}
        <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-orange-100/80 flex items-center justify-center text-orange-600">
            <CheckSquare className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">{pendingApprovalsCount}</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Approvals</span>
          </div>
          <span className="text-[9px] text-orange-500 font-bold">Requires attention</span>
        </div>

        {/* Outstanding Fees */}
        <div className="col-span-2 md:col-span-1 bg-rose-50/50 border border-rose-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-rose-100/80 flex items-center justify-center text-rose-600">
            <CreditCard className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">₹42.3L</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Outstanding</span>
          </div>
          <span className="text-[9px] text-rose-500 font-bold">Reminders active</span>
        </div>
      </div>

      {/* 3. Symmetrical Operational Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Approvals + Notice Board */}
        <div className="space-y-6">
          
          {/* Approvals Card */}
          <Card className="border-slate-100 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4 pb-1.5 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Pending Approvals</h3>
                {approvals.length > 0 && (
                  <span className="text-[10px] font-extrabold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full uppercase">
                    Action Required
                  </span>
                )}
              </div>

              {approvals.length === 0 ? (
                <div className="p-8 text-center text-slate-400 flex flex-col items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-emerald-500 mb-2" />
                  <span className="text-xs font-bold">All clear! No pending approvals.</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {approvals.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="text-left min-w-0 flex-1 pr-4">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-[9px] uppercase">{item.type}</Badge>
                          <span className="text-[10px] text-slate-400 font-semibold">{item.date}</span>
                        </div>
                        <span className="text-xs font-extrabold text-slate-800 block truncate mt-1">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-slate-450 font-semibold block mt-0.5">
                          Requester: {item.requester}
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleOpenApproval(item)}
                        className="flex-shrink-0"
                      >
                        Review
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notices Card */}
          <Card className="border-slate-100 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4 pb-1.5 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Campus Notices</h3>
                <button 
                  onClick={() => handleActionClick("Notice Board")}
                  className="text-xs font-black text-blue-600 hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {mockAnnouncements.slice(3, 6).map((notice) => (
                  <div key={notice.id} className="flex items-center justify-between">
                    <div className="text-left min-w-0 flex-1 pr-4">
                      <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                        <Badge variant="outline">{notice.category}</Badge>
                        <span>{notice.date}</span>
                      </div>
                      <span className="text-xs font-extrabold text-slate-800 block truncate mt-1">
                        {notice.title}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleActionClick(`View Notice ${notice.id}`)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg px-2.5 py-1 flex-shrink-0 cursor-pointer focus-ring"
                    >
                      Read
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Column: Student Alerts + Highlights */}
        <div className="space-y-6">
          
          {/* Student Alerts */}
          <Card className="border-slate-100 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4 pb-1.5 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Student Compliance Alerts</h3>
              </div>

              <div className="space-y-3.5">
                <div className="p-3.5 bg-red-50/50 border border-red-100 rounded-xl flex items-start space-x-3 text-left">
                  <div className="h-2 w-2 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                  <div className="flex-1 text-xs">
                    <span className="font-extrabold text-rose-600 block">Low Attendance Warning</span>
                    <span className="text-slate-500 font-semibold block mt-0.5">34 students have attendance below 75% this month.</span>
                    <button 
                      onClick={() => handleActionClick("View low attendance students")}
                      className="text-blue-600 font-black hover:underline mt-1.5 block cursor-pointer"
                    >
                      View Defaulters
                    </button>
                  </div>
                </div>

                <div className="p-3.5 bg-amber-50/50 border border-amber-100 rounded-xl flex items-start space-x-3 text-left">
                  <div className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <div className="flex-1 text-xs">
                    <span className="font-extrabold text-amber-600 block">Overdue Fee Instalments</span>
                    <span className="text-slate-500 font-semibold block mt-0.5">18 students with instalments overdue by 10+ days.</span>
                    <button 
                      onClick={() => handleActionClick("View fee outstanding list")}
                      className="text-blue-600 font-black hover:underline mt-1.5 block cursor-pointer"
                    >
                      Send Reminders
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Highlights Today */}
          <Card className="border-slate-100 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4 pb-1.5 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Academic Highlights Today</h3>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="font-extrabold text-slate-600">Total Lectures</span>
                  <span className="font-black text-slate-900">48 Scheduled</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="font-extrabold text-slate-600">Faculty Leave Status</span>
                  <span className="font-black text-slate-900">2 Substitutes assigned</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="font-extrabold text-slate-600">Mid-Sem Progress</span>
                  <span className="font-black text-slate-900">Question banks lock</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-slate-600">Placement Drive</span>
                  <span className="font-black text-emerald-600">TCS On-Campus active</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

      {/* Interactive Review Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Review Administration Request"
        description="Verify details and authorize request."
        footer={
          <div className="flex items-center space-x-2 w-full">
            <Button 
              variant="outline" 
              onClick={() => handleProcessApproval(false)} 
              className="flex-1 border-danger text-danger hover:bg-danger-light"
            >
              <XCircle className="h-4 w-4 mr-2" />
              <span>Reject</span>
            </Button>
            <Button 
              variant="success" 
              onClick={() => handleProcessApproval(true)} 
              className="flex-1"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              <span>Approve</span>
            </Button>
          </div>
        }
      >
        {selectedApproval && (
          <div className="space-y-5 text-left">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                Request Summary
              </span>
              <h3 className="text-sm font-black text-slate-800 leading-snug">
                {selectedApproval.title}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs mt-3 border-t border-slate-200 pt-3">
                <div>
                  <span className="text-slate-400 block font-semibold">Submitted By</span>
                  <span className="text-slate-800 font-extrabold block mt-0.5">{selectedApproval.requester}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Date Submitted</span>
                  <span className="text-slate-800 font-extrabold block mt-0.5">{selectedApproval.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Request Type</span>
                  <span className="text-slate-800 font-extrabold block mt-0.5">{selectedApproval.type}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Status</span>
                  <Badge variant="warning" className="mt-0.5">Pending Review</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                Workflow Timeline
              </span>
              <div className="relative border-l border-slate-250 ml-3 pl-5 space-y-4 py-1 text-xs">
                <div className="relative">
                  <div className="absolute -left-7.5 top-0.5 h-4 w-4 rounded-full bg-emerald-500 border border-white flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                  <span className="font-extrabold text-slate-800 block">Submitted to System</span>
                  <span className="text-slate-450 block font-semibold">10:45 AM, {selectedApproval.date}</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-7.5 top-0.5 h-4 w-4 rounded-full bg-emerald-500 border border-white flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                  <span className="font-extrabold text-slate-800 block">Verified by HR/Department</span>
                  <span className="text-slate-450 block font-semibold">02:30 PM, {selectedApproval.date}</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-7.5 top-0.5 h-4 w-4 rounded-full bg-amber-500 border border-white flex items-center justify-center">
                    <FileCheck2 className="h-3 w-3 text-white" />
                  </div>
                  <span className="font-extrabold text-slate-800 block">Awaiting Principal Consent</span>
                  <span className="text-slate-450 block font-semibold">Pending current review</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>

    </div>
  );
}
