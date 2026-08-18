"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import { mockApprovals, mockAnnouncements } from "@/lib/mock-data";
import { KPICard } from "./widgets/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
  FileCheck2
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
    <div className="space-y-6">
      {/* Overview Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">
            Academic Operations Control
          </h1>
          <p className="text-xs md:text-sm text-text-secondary mt-1">
            Welcome back, {activeUser.name} • Institution View: Business School
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="border-border-base bg-surface-base font-bold py-1 px-3">
            Academic Year: 2026 - 2027
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard title="Total Students" value="3,245" change="+4.2% vs last batch" isPositive={true} type="info" />
        <KPICard title="Active Faculty" value="186" change="98% Attendance today" isPositive={true} type="academic" />
        <KPICard title="Today's Attendance" value="91.2%" change="Student present rate" isPositive={true} type="success" />
        <KPICard title="Pending Approvals" value={pendingApprovalsCount} change="Action required" isPositive={false} type="warning" />
        <KPICard title="Outstanding Fees" value="₹42.30 L" change="Payment reminders active" isPositive={false} type="danger" />
      </div>

      {/* Main operational view */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Pending Approvals list */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <CheckSquare className="h-4.5 w-4.5 text-warning" />
              <span>Pending Administration Approvals ({approvals.length})</span>
            </CardTitle>
            {approvals.length > 0 && (
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                Attention Required
              </span>
            )}
          </CardHeader>
          <CardContent className="p-0">
            {approvals.length === 0 ? (
              <div className="p-8 text-center text-text-muted flex flex-col items-center justify-center">
                <CheckCircle className="h-10 w-10 text-success mb-2" />
                <span className="text-sm font-semibold">All clear! No pending approvals.</span>
              </div>
            ) : (
              <div className="divide-y divide-border-base">
                {approvals.map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="space-y-1 pr-4 min-w-0">
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            item.type === "Leave" 
                              ? "academic" 
                              : item.type === "Finance" 
                              ? "warning" 
                              : item.type === "Admission" 
                              ? "info" 
                              : "default"
                          }
                        >
                          {item.type}
                        </Badge>
                        <span className="text-[11px] text-text-muted">{item.date}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-text-primary truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-text-secondary">
                        Submitted by: {item.requester}
                      </p>
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

        {/* Student Alerts & Compliance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-4.5 w-4.5 text-danger" />
              <span>Student Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="p-3.5 bg-red-50/50 border border-red-100 rounded-xl flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-danger mt-1.5 flex-shrink-0" />
              <div className="flex-1 text-xs">
                <span className="font-bold text-danger block">Low Attendance Warning</span>
                <span className="text-text-secondary block mt-0.5">34 students have attendance below 75% this month.</span>
                <button 
                  onClick={() => handleActionClick("View low attendance students")}
                  className="text-primary-blue font-bold hover:underline mt-1.5 block"
                >
                  View Defaulters
                </button>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50/50 border border-amber-100 rounded-xl flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-warning mt-1.5 flex-shrink-0" />
              <div className="flex-1 text-xs">
                <span className="font-bold text-warning block">Overdue Fee Instalments</span>
                <span className="text-text-secondary block mt-0.5">18 students with instalments overdue by 10+ days.</span>
                <button 
                  onClick={() => handleActionClick("View fee outstanding list")}
                  className="text-primary-blue font-bold hover:underline mt-1.5 block"
                >
                  Send Reminders
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Exams and Academic announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedules */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Highlights Today</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3 text-xs text-text-secondary">
            <div className="flex justify-between items-center pb-2 border-b border-border-base/50">
              <span className="font-medium text-text-muted">Total Classes Scheduled</span>
              <span className="font-bold text-text-primary">48 Lectures</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border-base/50">
              <span className="font-medium text-text-muted">Faculty Leave Status</span>
              <span className="font-bold text-text-primary">2 Active Leaves (Substitutes assigned)</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border-base/50">
              <span className="font-medium text-text-muted">Mid-Sem Progress</span>
              <span className="font-bold text-text-primary">Question paper bank complete</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-text-muted">Internship Drives</span>
              <span className="font-bold text-success font-semibold">TCS On-Campus active</span>
            </div>
          </CardContent>
        </Card>

        {/* Notices */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Campus Notices</CardTitle>
            <button 
              onClick={() => handleActionClick("Notice Board")}
              className="text-xs font-bold text-primary-blue hover:underline flex items-center cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border-base">
              {mockAnnouncements.slice(3, 6).map((notice) => (
                <div key={notice.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center space-x-2 text-[10px] text-text-muted">
                      <Badge variant="outline">{notice.category}</Badge>
                      <span>{notice.date}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-text-primary leading-snug">
                      {notice.title}
                    </h4>
                  </div>
                  <button 
                    onClick={() => handleActionClick(`View Notice ${notice.id}`)}
                    className="text-xs font-semibold text-text-muted hover:text-text-primary border border-border-base rounded-lg px-2.5 py-1 flex-shrink-0 cursor-pointer focus-ring"
                  >
                    Read
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
              className="flex-1 border-danger text-danger hover:bg-danger-light/50"
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
          <div className="space-y-5">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3">
              <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">
                Request Summary
              </span>
              <h3 className="text-base font-bold text-text-primary leading-snug">
                {selectedApproval.title}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs mt-3 border-t border-border-base/50 pt-3">
                <div>
                  <span className="text-text-muted block">Submitted By</span>
                  <span className="text-text-primary font-semibold block mt-0.5">{selectedApproval.requester}</span>
                </div>
                <div>
                  <span className="text-text-muted block">Date Submitted</span>
                  <span className="text-text-primary font-semibold block mt-0.5">{selectedApproval.date}</span>
                </div>
                <div>
                  <span className="text-text-muted block">Request Type</span>
                  <span className="text-text-primary font-semibold block mt-0.5">{selectedApproval.type}</span>
                </div>
                <div>
                  <span className="text-text-muted block">Status</span>
                  <Badge variant="warning" className="mt-0.5">Pending Authorization</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">
                Workflow Timeline
              </span>
              <div className="relative border-l border-border-base/80 ml-3 pl-5 space-y-4 py-1 text-xs">
                <div className="relative">
                  <div className="absolute -left-7.5 top-0.5 h-4 w-4 rounded-full bg-success border border-white flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                  <span className="font-semibold text-text-primary block">Submitted to System</span>
                  <span className="text-text-muted block">10:45 AM, {selectedApproval.date}</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-7.5 top-0.5 h-4 w-4 rounded-full bg-success border border-white flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                  <span className="font-semibold text-text-primary block">Verified by HR/Department</span>
                  <span className="text-text-muted block">02:30 PM, {selectedApproval.date}</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-7.5 top-0.5 h-4 w-4 rounded-full bg-warning border border-white flex items-center justify-center">
                    <FileCheck2 className="h-3 w-3 text-white" />
                  </div>
                  <span className="font-semibold text-text-primary block">Awaiting Principal Consent</span>
                  <span className="text-text-muted block">Pending current review</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">
                Administrative Notes
              </span>
              <p className="text-xs text-text-secondary leading-relaxed bg-amber-50/30 border border-amber-100/50 p-3 rounded-lg">
                This request has been checked against institutional compliance guides. HR recommends authorization based on term metrics.
              </p>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
