"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import { mockAnnouncements } from "@/lib/mock-data";
import { KPICard } from "./widgets/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  MessageSquare, 
  CreditCard, 
  Award, 
  ArrowRight,
  Send,
  User,
  HeartHandshake
} from "lucide-react";

export default function ParentDashboard() {
  const { activeUser, addToast } = useERP();
  
  // Parent state variables
  const [msgModalOpen, setMsgModalOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [msgSending, setMsgSending] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText) return;

    setMsgSending(true);
    
    setTimeout(() => {
      setMsgSending(false);
      addToast("Message securely routed to Class Mentor Prof. Suresh Iyer.", "success");
      setMsgModalOpen(false);
      setMessageText("");
    }, 1500);
  };

  const termGrades = [
    { subject: "Principles of Management", grade: "A+", marks: "92 / 100", status: "Passed" },
    { subject: "Business Economics", grade: "A", marks: "86 / 100", status: "Passed" },
    { subject: "Accounting for Managers", grade: "O", marks: "96 / 100", status: "Passed" }
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">
            Parent Portal Overview
          </h1>
          <p className="text-xs md:text-sm text-text-secondary mt-1">
            Welcome back, {activeUser.name} • Monitoring ward: <span className="font-bold text-primary-blue">Ananya Sen</span> (BBA II Year)
          </p>
        </div>
        <button
          onClick={() => setMsgModalOpen(true)}
          className="bg-primary-blue hover:bg-primary-blue-hover text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center shadow-soft cursor-pointer transition-colors focus-ring"
        >
          <MessageSquare className="h-4 w-4 mr-1.5" />
          <span>Message Class Mentor</span>
        </button>
      </div>

      {/* Ward KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Ward Attendance" value="92%" change="Class average: 88%" isPositive={true} type="success" />
        <KPICard title="Assignments Completed" value="18 / 20" change="2 pending submissions" isPositive={true} type="info" />
        <KPICard title="Outstanding Fees" value="₹3,500" change="Due date: 31 Aug 2026" isPositive={false} type="warning" />
        <KPICard title="Academic Performance" value="8.4 CGPA" change="Rank: 4th in department" isPositive={true} type="academic" />
      </div>

      {/* Academic Term Report and Fee summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Child's Academic Performance Grid */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-4.5 w-4.5 text-academic" />
              <span>Ward Academic Scorecard (Latest Term)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-50 border-b border-border-base text-text-secondary font-bold uppercase tracking-wider select-none">
                  <tr>
                    <th className="p-4">Subject</th>
                    <th className="p-4">Grade</th>
                    <th className="p-4">Marks (Internal)</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-base text-text-secondary font-medium">
                  {termGrades.map((grade, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-text-primary">{grade.subject}</td>
                      <td className="p-4">
                        <Badge variant="outline" className="font-bold">{grade.grade}</Badge>
                      </td>
                      <td className="p-4">{grade.marks}</td>
                      <td className="p-4">
                        <Badge variant="success">{grade.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Short Fee Details box */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-4.5 w-4.5 text-warning" />
              <span>Outstanding Fee Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4 text-xs text-text-secondary">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
              <div className="flex justify-between font-semibold">
                <span>Tuition Fees Balance</span>
                <span className="text-text-primary">₹3,500</span>
              </div>
              <div className="flex justify-between font-semibold text-success">
                <span>Paid (YTD)</span>
                <span>₹1,50,000</span>
              </div>
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed">
              * Installment reminders are sent automatically 10 days before term limits. UPI and Card pay methods are supported.
            </p>
            <Button 
              variant="outline" 
              onClick={() => addToast("Fee portal drawer loaded", "info")}
              className="w-full text-xs font-bold"
            >
              Collect Receipt Library
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Ward Announcements & Campus Calendar</CardTitle>
          <button 
            onClick={() => addToast("All parent notices loaded", "info")}
            className="text-xs font-bold text-primary-blue hover:text-primary-blue-hover flex items-center cursor-pointer"
          >
            <span>View Calendar</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border-base">
            {mockAnnouncements.slice(0, 3).map((notice) => (
              <div key={notice.id} className="p-4 flex items-start justify-between hover:bg-slate-50 transition-colors">
                <div className="space-y-1 pr-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{notice.category}</Badge>
                    <span className="text-[11px] text-text-muted">{notice.date}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-text-primary leading-snug">
                    {notice.title}
                  </h4>
                </div>
                <button 
                  onClick={() => addToast(`Reading Notice ${notice.id}`, "info")}
                  className="text-xs font-semibold text-text-muted hover:text-text-primary border border-border-base rounded-lg px-2.5 py-1 flex-shrink-0 cursor-pointer focus-ring"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mentor Communication Dialog */}
      <Modal
        isOpen={msgModalOpen}
        onClose={() => !msgSending && setMsgModalOpen(false)}
        title="Contact Student Mentor"
        description="Draft a message to Ananya's class mentor, Prof. Suresh Iyer."
        footer={
          <div className="flex space-x-2 w-full justify-end">
            <Button variant="outline" onClick={() => setMsgModalOpen(false)} disabled={msgSending}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSendMessage} disabled={msgSending}>
              {msgSending ? "Delivering Message..." : "Send Message"}
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSendMessage} className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="h-9 w-9 rounded-full bg-academic-light text-academic flex items-center justify-center font-bold text-xs">
              SI
            </div>
            <div>
              <span className="text-xs font-bold text-text-primary block">Prof. Suresh Iyer</span>
              <span className="text-[10px] text-text-muted block">BBA Class Coordinator • CS Department</span>
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold text-text-secondary select-none">Message Body *</label>
            <textarea
              className="flex min-h-[100px] w-full rounded-lg border border-border-base bg-surface-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus-ring focus-visible:ring-primary-blue focus-visible:border-primary-blue resize-none"
              placeholder="Write your inquiry here..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
