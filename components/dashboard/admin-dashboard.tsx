"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import { mockRecentActivities, mockApprovals } from "@/lib/mock-data";
import { KPICard } from "./widgets/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
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
  Plus
} from "lucide-react";

export default function AdminDashboard() {
  const { activeUser, addToast } = useERP();
  
  // States for Quick Action Modals
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  
  // Student Form states
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentProgram, setStudentProgram] = useState("B.Tech");
  
  // Notice Form states
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeCategory, setNoticeCategory] = useState("General");

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail) {
      addToast("Please fill in all required fields", "danger");
      return;
    }
    
    // Simulate API call success
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
    
    // Simulate Notice Board publishing
    addToast(`Published notice: "${noticeTitle}" to Notice Board`, "success");
    setNoticeModalOpen(false);
    setNoticeTitle("");
  };

  const quickActions = [
    { label: "Add Student", icon: UserPlus, color: "text-primary-blue bg-primary-blue-light border-primary-blue/20", action: () => setStudentModalOpen(true) },
    { label: "Add Faculty", icon: UserPlus, color: "text-academic bg-academic-light border-academic/20", action: () => addToast("Add Faculty wizard opened", "info") },
    { label: "Create Notice", icon: MessageSquare, color: "text-warning bg-warning-light border-warning/20", action: () => setNoticeModalOpen(true) },
    { label: "Mark Attendance", icon: Calendar, color: "text-success bg-success-light border-success/20", action: () => addToast("Mark Attendance spreadsheet opened", "info") },
    { label: "Collect Fee", icon: CreditCard, color: "text-info bg-info-light border-info/20", action: () => addToast("Collect fee invoice terminal loaded", "info") },
    { label: "Generate Report", icon: FileSpreadsheet, color: "text-text-primary bg-slate-100 border-slate-200", action: () => addToast("Strategic reports dashboard loaded", "info") }
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">
          Campus Operations & Administration
        </h1>
        <p className="text-xs md:text-sm text-text-secondary mt-1">
          Welcome back, {activeUser.name} • Operational Overview & Tasks
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <KPICard title="Total Students" value="3,245" change="Active this semester" isPositive={true} type="info" />
        <KPICard title="Faculty & Staff" value="248" change="8 new onboarding" isPositive={true} type="academic" />
        <KPICard title="Admission Enquiries" value="142" change="Pending response" isPositive={false} type="warning" />
        <KPICard title="Pending Requests" value="28" change="Helpdesk tickets open" isPositive={false} type="warning" />
        <KPICard title="Collected (Month)" value="₹1.68 Cr" change="82% of target" isPositive={true} type="success" />
        <KPICard title="Outstanding Fees" value="₹42.30 L" change="Reminders sent" isPositive={false} type="danger" />
      </div>

      {/* Quick Access Actions Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Administrative Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, idx) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={idx}
                  onClick={action.action}
                  className="flex flex-col items-center justify-center p-4 rounded-xl border border-border-base hover:border-border-focus hover:shadow-soft transition-all duration-300 group cursor-pointer focus-ring"
                >
                  <div className={`h-11 w-11 rounded-lg flex items-center justify-center border mb-3 group-hover:scale-105 transition-transform ${action.color}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-text-primary text-center leading-none">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Activities and Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-4.5 w-4.5 text-primary-blue animate-pulse" />
              <span>Recent Operational Log</span>
            </CardTitle>
            <Badge variant="outline">Live Feed</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border-base">
              {mockRecentActivities.map((act, idx) => (
                <div key={idx} className="p-4 flex items-start justify-between hover:bg-slate-50 transition-colors">
                  <div className="space-y-1 pr-4">
                    <span className="text-xs font-semibold text-text-primary leading-snug">
                      {act.text}
                    </span>
                    <div className="flex items-center space-x-2 text-[10px] text-text-muted">
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

        {/* Short Pending Approvals view */}
        <Card>
          <CardHeader>
            <CardTitle>System Task Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3.5 text-xs text-text-secondary">
            <div className="flex items-center justify-between pb-2.5 border-b border-border-base/50">
              <span className="font-semibold text-text-muted">Classroom Allocations</span>
              <Badge variant="success">96% Allocated</Badge>
            </div>
            <div className="flex items-center justify-between pb-2.5 border-b border-border-base/50">
              <span className="font-semibold text-text-muted">Exam Hall Roll Sheets</span>
              <Badge variant="success">Generated</Badge>
            </div>
            <div className="flex items-center justify-between pb-2.5 border-b border-border-base/50">
              <span className="font-semibold text-text-muted">Salary Slips - May 2026</span>
              <Badge variant="success">Released</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-text-muted">IT Infrastructure Ticket</span>
              <Badge variant="warning">3 Pending Audit</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QUICK ACTION MODALS */}

      {/* Add Student Modal */}
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
              Onboard Student
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreateStudent} className="space-y-4">
          <Input
            label="Full Name *"
            placeholder="e.g. Rahul Sharma"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
          <Input
            label="Email Address *"
            type="email"
            placeholder="e.g. rahul.s@gmail.com"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Academic Program"
              value={studentProgram}
              onChange={(e) => setStudentProgram(e.target.value)}
            >
              <option value="B.Tech">B.Tech (CSE)</option>
              <option value="BCA">BCA (CS)</option>
              <option value="BBA">BBA (Marketing)</option>
              <option value="MBA">MBA (Finance)</option>
            </Select>
            <Select label="Batch Year">
              <option value="2026">2026 - 2030</option>
              <option value="2025">2025 - 2029</option>
            </Select>
          </div>
        </form>
      </Modal>

      {/* Create Notice Modal */}
      <Modal
        isOpen={noticeModalOpen}
        onClose={() => setNoticeModalOpen(false)}
        title="Publish notice description"
        description="Draft a notice to broadcast to the institution."
        footer={
          <div className="flex space-x-2 w-full justify-end">
            <Button variant="outline" onClick={() => setNoticeModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateNotice}>
              Publish Notice
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreateNotice} className="space-y-4">
          <Input
            label="Notice Announcement Description *"
            placeholder="e.g. Lab audit schedules released for CS batch..."
            value={noticeTitle}
            onChange={(e) => setNoticeTitle(e.target.value)}
            required
          />
          <Select
            label="Notice Category"
            value={noticeCategory}
            onChange={(e) => setNoticeCategory(e.target.value)}
          >
            <option value="General">General / Announcements</option>
            <option value="Academic">Academic / Syllabus</option>
            <option value="Exam">Examinations / Marks</option>
            <option value="Placement">Training & Placement Drives</option>
          </Select>
        </form>
      </Modal>
    </div>
  );
}
