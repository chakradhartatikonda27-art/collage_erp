"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import { mockAnnouncements } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
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
  HeartHandshake,
  GraduationCap,
  Percent,
  ClipboardList,
  ChevronRight
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
                Parent of: <span className="font-extrabold text-blue-600">Ananya Sen</span> (BBA II Year) • Parent Portal
              </p>
            </div>
          </div>
          <div className="text-right">
            <Button
              onClick={() => setMsgModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-4 py-3 rounded-lg flex items-center shadow-sm cursor-pointer transition-colors"
            >
              <MessageSquare className="h-4 w-4 mr-1.5" />
              <span>Message Class Mentor</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 2. Color-Coded Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Ward Attendance */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-blue-100/80 flex items-center justify-center text-blue-600">
            <Percent className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">92%</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Ward Attendance</span>
          </div>
          <span className="text-[9px] text-blue-500 font-bold">Class average: 88%</span>
        </div>

        {/* Assignments Completed */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-600">
            <ClipboardList className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">18 / 20</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Assignments</span>
          </div>
          <span className="text-[9px] text-emerald-500 font-bold">2 pending submissions</span>
        </div>

        {/* Outstanding Fees */}
        <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-rose-100/80 flex items-center justify-center text-rose-600">
            <CreditCard className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">₹3,500</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Outstanding Fees</span>
          </div>
          <span className="text-[9px] text-rose-550 font-bold">Due Date: 31 Aug 2026</span>
        </div>

        {/* Academic Performance */}
        <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-purple-100/80 flex items-center justify-center text-purple-600">
            <Award className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">8.4 CGPA</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Performance</span>
          </div>
          <span className="text-[9px] text-purple-500 font-bold">Rank: 4th in Dept</span>
        </div>
      </div>

      {/* 3. Symmetrical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns: Ward Academic Scorecard */}
        <Card className="lg:col-span-2 border-slate-100 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4 pb-1.5 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Ward Academic Scorecard (Latest Term)</h3>
            </div>

            <div className="overflow-x-auto text-left">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider select-none">
                  <tr>
                    <th className="p-4">Subject</th>
                    <th className="p-4">Grade</th>
                    <th className="p-4">Marks (Internal)</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                  {termGrades.map((grade, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-slate-800">{grade.subject}</td>
                      <td className="p-4">
                        <Badge variant="outline" className="font-black text-blue-600">{grade.grade}</Badge>
                      </td>
                      <td className="p-4">{grade.marks}</td>
                      <td className="p-4">
                        <Badge variant="success" className="text-[9px] font-black uppercase">{grade.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Outstanding Fee Details */}
        <Card className="border-slate-100 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4 pb-1.5 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Outstanding Fee Details</h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between font-bold text-slate-600">
                  <span>Tuition Fees Balance</span>
                  <span className="text-slate-800">₹3,500</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-600">
                  <span>Paid (YTD)</span>
                  <span>₹1,50,000</span>
                </div>
              </div>

              <p className="text-[10px] text-slate-450 leading-relaxed font-semibold text-left">
                * Installment reminders are sent automatically 10 days before term limits. UPI and Card pay methods are supported.
              </p>

              <Button 
                variant="outline" 
                onClick={() => addToast("Fee portal receipts loaded", "info")}
                className="w-full text-xs font-bold py-3"
              >
                Collect Receipt Library
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* 4. Announcements Row */}
      <Card className="border-slate-100 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4 pb-1.5 border-b border-slate-100">
            <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Ward Announcements & Campus Calendar</h3>
            <button 
              onClick={() => addToast("All parent notices loaded", "info")}
              className="text-xs font-black text-blue-600 hover:text-blue-750 flex items-center cursor-pointer"
            >
              <span>View Calendar</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </button>
          </div>

          <div className="space-y-4">
            {mockAnnouncements.slice(0, 3).map((notice) => (
              <div key={notice.id} className="flex items-center justify-between">
                <div className="text-left min-w-0 flex-1 pr-4">
                  <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-semibold">
                    <Badge variant="outline">{notice.category}</Badge>
                    <span>{notice.date}</span>
                  </div>
                  <span className="text-xs font-extrabold text-slate-800 block truncate mt-1">
                    {notice.title}
                  </span>
                </div>
                <button 
                  onClick={() => addToast(`Reading Notice ${notice.id}`, "info")}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg px-2.5 py-1 flex-shrink-0 cursor-pointer focus-ring"
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
        <form onSubmit={handleSendMessage} className="space-y-4 text-left">
          <div className="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="h-9 w-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs">
              SI
            </div>
            <div>
              <span className="text-xs font-extrabold text-slate-800 block">Prof. Suresh Iyer</span>
              <span className="text-[10px] text-slate-450 font-semibold block">BBA Class Coordinator • CS Department</span>
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-slate-655 select-none">Message Body *</label>
            <textarea
              className="flex min-h-[100px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus-ring focus-visible:ring-blue-600 focus-visible:border-blue-600 resize-none font-semibold"
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
