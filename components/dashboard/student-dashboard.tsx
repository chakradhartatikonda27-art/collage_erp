"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Calendar, 
  FileText, 
  BookOpen, 
  Percent, 
  CreditCard, 
  Bell, 
  ChevronRight, 
  ArrowRight,
  ClipboardList,
  BookMarked,
  Briefcase,
  TrendingUp,
  Award,
  Book,
  HelpCircle,
  Megaphone,
  User,
  Clock
} from "lucide-react";

export default function StudentDashboard() {
  const { activeUser, addToast } = useERP();
  
  // Student states
  const [feeBalance, setFeeBalance] = useState("₹3,500");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handleActionClick = (actionName: string) => {
    addToast(`Triggered: ${actionName} workflow`, "info");
  };

  const handleProcessPayment = () => {
    setPaymentProcessing(true);
    addToast("Connecting securely to Payment Gateway...", "info", 1000);
    
    setTimeout(() => {
      setPaymentProcessing(false);
      setFeeBalance("₹0");
      addToast("Fee Payment Successful! Receipt generated.", "success");
      setPaymentModalOpen(false);
    }, 1800);
  };

  const quickAccessItems = [
    { label: "My Timetable", icon: Calendar, bg: "bg-blue-50 text-blue-600 hover:bg-blue-100", action: () => handleActionClick("My Timetable") },
    { label: "Study Material", icon: BookOpen, bg: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100", action: () => handleActionClick("Study Material") },
    { label: "Assignments", icon: ClipboardList, bg: "bg-orange-50 text-orange-600 hover:bg-orange-100", action: () => handleActionClick("Assignments") },
    { label: "Exam Schedule", icon: FileText, bg: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100", action: () => handleActionClick("Exam Schedule") },
    { label: "Attendance", icon: User, bg: "bg-purple-50 text-purple-600 hover:bg-purple-100", action: () => handleActionClick("Attendance logs") },
    { label: "Fee Payment", icon: CreditCard, bg: "bg-rose-50 text-rose-600 hover:bg-rose-100", action: () => setPaymentModalOpen(true) },
    { label: "Library", icon: BookMarked, bg: "bg-sky-50 text-sky-600 hover:bg-sky-100", action: () => handleActionClick("Library Catalog") },
    { label: "Placement", icon: Briefcase, bg: "bg-teal-50 text-teal-600 hover:bg-teal-100", action: () => handleActionClick("Placement Drive") }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-1">
      
      {/* 1. Header Student Personal Banner Card */}
      <Card className="border-slate-100 shadow-sm bg-white overflow-hidden animate-in fade-in duration-300">
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
                {activeUser.program || "BBA - II Year"} | Roll No: {activeUser.rollNo || "23BBA1024"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Academic Year</span>
            <span className="text-sm font-extrabold text-blue-600 block mt-0.5">2026 - 2027</span>
          </div>
        </CardContent>
      </Card>

      {/* 2. Color-Coded Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        {/* Classes Today */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-blue-100/80 flex items-center justify-center text-blue-600">
            <Calendar className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">3</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Classes Today</span>
          </div>
          <button 
            onClick={() => handleActionClick("Classes Today")}
            className="text-[10px] font-black text-blue-600 hover:underline cursor-pointer"
          >
            View Timetable
          </button>
        </div>

        {/* Assignments */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-600">
            <ClipboardList className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">2</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Assignments</span>
          </div>
          <span className="text-[10px] font-black text-emerald-600 bg-emerald-100/50 px-2 py-0.5 rounded-full">
            Pending
          </span>
        </div>

        {/* Exams */}
        <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-orange-100/80 flex items-center justify-center text-orange-600">
            <FileText className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">1</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Exams</span>
          </div>
          <span className="text-[10px] font-black text-orange-600 bg-orange-100/50 px-2 py-0.5 rounded-full">
            Upcoming
          </span>
        </div>

        {/* Attendance */}
        <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-purple-100/80 flex items-center justify-center text-purple-600">
            <Percent className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">92%</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Attendance</span>
          </div>
          <span className="text-[10px] text-purple-500 font-bold">This Month</span>
        </div>

        {/* Fee Balance */}
        <div className="col-span-2 md:col-span-1 bg-rose-50/50 border border-rose-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-rose-100/80 flex items-center justify-center text-rose-600">
            <CreditCard className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">{feeBalance}</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Fee Balance</span>
          </div>
          {feeBalance !== "₹0" ? (
            <button 
              onClick={() => setPaymentModalOpen(true)}
              className="text-[10px] font-black text-rose-600 hover:underline cursor-pointer"
            >
              Pay Now
            </button>
          ) : (
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-100/50 px-2 py-0.5 rounded-full">
              Paid
            </span>
          )}
        </div>

      </div>

      {/* 3. Quick Access Grid Section */}
      <Card className="border-slate-100 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Quick Access</h3>
            <button 
              onClick={() => handleActionClick("Quick Access View All")}
              className="text-xs font-black text-blue-600 hover:underline flex items-center cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
            </button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 justify-items-center">
            {quickAccessItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={item.action}
                  className="flex flex-col items-center justify-center group focus-ring cursor-pointer"
                >
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-slate-100/50 ${item.bg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-655 mt-2 text-center group-hover:text-slate-900 leading-none">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 4. Column split layout matching image structure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Recent Announcements + Courses Enrolled */}
        <div className="space-y-6">
          
          {/* Announcements Card */}
          <Card className="border-slate-100 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4 pb-1.5 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Recent Announcements</h3>
                <button 
                  onClick={() => handleActionClick("Announcements")}
                  className="text-xs font-black text-blue-600 hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {/* Item 1 */}
                <div className="flex items-start space-x-3.5">
                  <div className="h-9 w-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Megaphone className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <span className="text-xs font-extrabold text-slate-800 block truncate">
                      Guest Lecture on Digital Marketing
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                      Department of Marketing
                    </span>
                  </div>
                  <div className="text-right flex items-center space-x-1.5 flex-shrink-0">
                    <span className="text-[10px] text-slate-450 font-bold">16 May 2026</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start space-x-3.5">
                  <div className="h-9 w-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <span className="text-xs font-extrabold text-slate-800 block truncate">
                      Internship Opportunities Available
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                      Training & Placement Cell
                    </span>
                  </div>
                  <div className="text-right flex items-center space-x-1.5 flex-shrink-0">
                    <span className="text-[10px] text-slate-450 font-bold">15 May 2026</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start space-x-3.5">
                  <div className="h-9 w-9 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <span className="text-xs font-extrabold text-slate-800 block truncate">
                      Mid Term Exams Schedule Released
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                      Examination Cell
                    </span>
                  </div>
                  <div className="text-right flex items-center space-x-1.5 flex-shrink-0">
                    <span className="text-[10px] text-slate-450 font-bold">14 May 2026</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleActionClick("Announcements")}
                className="w-full text-center mt-5 text-xs font-black text-blue-600 hover:text-blue-750 flex items-center justify-center pt-3 border-t border-slate-100 cursor-pointer"
              >
                <span>View All Announcements</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </button>
            </CardContent>
          </Card>

          {/* Courses Enrolled Card */}
          <Card className="border-slate-100 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4 pb-1.5 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Courses Enrolled</h3>
                <button 
                  onClick={() => handleActionClick("Courses List")}
                  className="text-xs font-black text-blue-600 hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {/* Course 1 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center space-x-2.5">
                      <div className="h-7 w-7 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-black">PM</div>
                      <div className="text-left">
                        <span className="font-extrabold text-slate-800 block">Principles of Management</span>
                        <span className="text-[10px] text-slate-455 font-semibold">Dr. Ramesh</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">In Progress</span>
                      <span className="font-black text-slate-900">85%</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>

                {/* Course 2 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center space-x-2.5">
                      <div className="h-7 w-7 rounded bg-orange-50 text-orange-600 flex items-center justify-center text-[10px] font-black">BE</div>
                      <div className="text-left">
                        <span className="font-extrabold text-slate-800 block">Business Economics</span>
                        <span className="text-[10px] text-slate-455 font-semibold">Prof. Kavitha</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">In Progress</span>
                      <span className="font-black text-slate-900">78%</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: "78%" }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Column: Today's Schedule + Important Links */}
        <div className="space-y-6">
          
          {/* Today's Schedule Card */}
          <Card className="border-slate-100 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4 pb-1.5 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">My Schedule (Today)</h3>
                <button 
                  onClick={() => handleActionClick("Timetable")}
                  className="text-xs font-black text-blue-600 hover:underline cursor-pointer"
                >
                  View Timetable
                </button>
              </div>

              <div className="space-y-4">
                {/* Slot 1 */}
                <div className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="text-slate-500 flex flex-col items-center flex-shrink-0 w-20">
                      <span className="text-[11px] font-black text-slate-800 leading-none">09:00</span>
                      <span className="text-[9px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">10:00 AM</span>
                    </div>
                    <div className="h-7 w-px bg-slate-200" />
                    <div className="text-left">
                      <span className="text-xs font-extrabold text-slate-800 block">Principles of Management</span>
                      <span className="text-[10px] text-slate-455 font-semibold block mt-0.5">Room 202 | Dr. Ramesh</span>
                    </div>
                  </div>
                  <button onClick={() => handleActionClick("Class Calendar 1")} className="text-slate-450 hover:text-blue-600 cursor-pointer">
                    <Calendar className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Slot 2 */}
                <div className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="text-slate-500 flex flex-col items-center flex-shrink-0 w-20">
                      <span className="text-[11px] font-black text-slate-800 leading-none">10:15</span>
                      <span className="text-[9px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">11:15 AM</span>
                    </div>
                    <div className="h-7 w-px bg-slate-200" />
                    <div className="text-left">
                      <span className="text-xs font-extrabold text-slate-800 block">Business Economics</span>
                      <span className="text-[10px] text-slate-455 font-semibold block mt-0.5">Room 205 | Prof. Kavitha</span>
                    </div>
                  </div>
                  <button onClick={() => handleActionClick("Class Calendar 2")} className="text-slate-455 hover:text-blue-600 cursor-pointer">
                    <Calendar className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Slot 3 */}
                <div className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="text-slate-500 flex flex-col items-center flex-shrink-0 w-20">
                      <span className="text-[11px] font-black text-slate-800 leading-none">11:30</span>
                      <span className="text-[9px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">12:30 PM</span>
                    </div>
                    <div className="h-7 w-px bg-slate-200" />
                    <div className="text-left">
                      <span className="text-xs font-extrabold text-slate-800 block">Accounting for Managers</span>
                      <span className="text-[10px] text-slate-455 font-semibold block mt-0.5">Room 201 | Prof. Suresh</span>
                    </div>
                  </div>
                  <button onClick={() => handleActionClick("Class Calendar 3")} className="text-slate-455 hover:text-blue-600 cursor-pointer">
                    <Calendar className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

              <button 
                onClick={() => handleActionClick("Timetable")}
                className="w-full text-center mt-5 text-xs font-black text-blue-600 hover:text-blue-750 flex items-center justify-center pt-3 border-t border-slate-100 cursor-pointer"
              >
                <span>View Full Timetable</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </button>
            </CardContent>
          </Card>

          {/* Important Links Card */}
          <Card className="border-slate-100 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4 pb-1.5 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Important Links</h3>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {/* Link 1 */}
                <button 
                  onClick={() => handleActionClick("Academic Calendar")}
                  className="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-350 transition-all text-left focus-ring cursor-pointer"
                >
                  <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Academic Calendar</span>
                </button>

                {/* Link 2 */}
                <button 
                  onClick={() => handleActionClick("CBCS Syllabus")}
                  className="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-350 transition-all text-left focus-ring cursor-pointer"
                >
                  <div className="h-8 w-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">CBCS Syllabus</span>
                </button>

                {/* Link 3 */}
                <button 
                  onClick={() => handleActionClick("Results")}
                  className="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-350 transition-all text-left focus-ring cursor-pointer"
                >
                  <div className="h-8 w-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <Award className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Results</span>
                </button>

                {/* Link 4 */}
                <button 
                  onClick={() => handleActionClick("Student Handbook")}
                  className="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-350 transition-all text-left focus-ring cursor-pointer"
                >
                  <div className="h-8 w-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                    <Book className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Student Handbook</span>
                </button>

                {/* Link 5 */}
                <button 
                  onClick={() => handleActionClick("Grievance Redressal")}
                  className="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-350 transition-all text-left focus-ring cursor-pointer"
                >
                  <div className="h-8 w-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Grievance Redressal</span>
                </button>

                {/* Link 6 */}
                <button 
                  onClick={() => handleActionClick("Contact Faculty")}
                  className="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-350 transition-all text-left focus-ring cursor-pointer"
                >
                  <div className="h-8 w-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Contact Faculty</span>
                </button>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

      {/* Payment Gateway Modal */}
      <Modal
        isOpen={paymentModalOpen}
        onClose={() => !paymentProcessing && setPaymentModalOpen(false)}
        title="Institutional Fee Payment Gateway"
        description="Verify invoice and process secure checkout."
        footer={
          <div className="flex space-x-2 w-full justify-end">
            <Button variant="outline" onClick={() => setPaymentModalOpen(false)} disabled={paymentProcessing}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleProcessPayment} disabled={paymentProcessing}>
              {paymentProcessing ? "Processing..." : "Confirm Payment"}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Invoice Ref</span>
              <span className="font-bold text-slate-800">INV-2026-FEE049</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Student Profile</span>
              <span className="font-bold text-slate-800">{activeUser.name} ({activeUser.rollNo || "23BBA1024"})</span>
            </div>
            <div className="flex justify-between text-sm font-black text-slate-800 border-t border-slate-150 pt-2 mt-2">
              <span>Amount Outstanding</span>
              <span className="text-blue-600">{feeBalance}</span>
            </div>
          </div>

          <div className="space-y-2.5 text-left">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Select Payment Mode</span>
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button" 
                className="flex items-center space-x-2.5 p-3 rounded-lg border border-blue-600 bg-blue-50 text-xs font-black text-blue-600 text-left"
              >
                <div className="h-4.5 w-4.5 rounded-full border-[5px] border-blue-600 flex-shrink-0" />
                <span>BHIM UPI</span>
              </button>
              <button 
                type="button" 
                onClick={() => addToast("Card terminal integration placeholder", "info")}
                className="flex items-center space-x-2.5 p-3 rounded-lg border border-slate-200 hover:border-slate-400 text-xs font-bold text-slate-650 text-left cursor-pointer"
              >
                <div className="h-4.5 w-4.5 rounded-full border border-slate-300 flex-shrink-0" />
                <span>Credit/Debit Card</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>

    </div>
  );
}
