"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import { mockFacultyCourses, mockSchedules } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  BookOpen, 
  CheckSquare, 
  Clock, 
  ChevronRight, 
  ArrowRight,
  TrendingUp,
  Award,
  GraduationCap,
  Percent,
  User,
  ClipboardList
} from "lucide-react";

export default function FacultyDashboard() {
  const { activeUser, addToast } = useERP();
  
  // Pending tasks list state
  const [tasks, setTasks] = useState([
    { id: "T1", title: "Evaluate Marketing Assignment", count: 5, category: "Grading" },
    { id: "T2", title: "Internal Marks Submission - HRM", count: 2, category: "Exams" },
    { id: "T3", title: "Attendance Update Exceptions", count: 3, category: "Attendance" },
    { id: "T4", title: "Students to Counsel (Defaulters)", count: 4, category: "Mentoring" }
  ]);

  const [selectedTask, setSelectedTask] = useState<typeof tasks[0] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [gradeScore, setGradeScore] = useState("");

  const handleActionClick = (actionName: string) => {
    addToast(`Triggered: ${actionName}`, "info");
  };

  const handleOpenTask = (task: typeof tasks[0]) => {
    setSelectedTask(task);
    setDrawerOpen(true);
    setGradeScore("");
  };

  const handleGradeTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradeScore) return;

    addToast(`Evaluated papers: Assigned average score of ${gradeScore}%`, "success");
    
    // Remove the completed task
    if (selectedTask) {
      setTasks(prev => prev.filter(t => t.id !== selectedTask.id));
    }
    
    setDrawerOpen(false);
    setSelectedTask(null);
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
                {activeUser.roleTitle || "Faculty"} | {activeUser.department || "Business School"} Department
              </p>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-600 font-black py-1.5 px-3.5">
              Active Semester
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* 2. Color-Coded Stats Cards */}
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
            onClick={() => handleActionClick("My Schedule")}
            className="text-[10px] font-black text-blue-600 hover:underline cursor-pointer"
          >
            View Schedule
          </button>
        </div>

        {/* Total Students */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-600">
            <User className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">128</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Total Students</span>
          </div>
          <span className="text-[9px] text-emerald-500 font-bold">4 active courses</span>
        </div>

        {/* Assignments */}
        <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-orange-100/80 flex items-center justify-center text-orange-600">
            <ClipboardList className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">12</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">To Grade</span>
          </div>
          <span className="text-[9px] text-orange-500 font-bold">2 overdue batches</span>
        </div>

        {/* Attendance Rate */}
        <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-purple-100/80 flex items-center justify-center text-purple-600">
            <Percent className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">92%</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Attendance</span>
          </div>
          <span className="text-[9px] text-purple-500 font-bold">Class average</span>
        </div>

        {/* Active Courses */}
        <div className="col-span-2 md:col-span-1 bg-rose-50/50 border border-rose-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-rose-100/80 flex items-center justify-center text-rose-600">
            <BookOpen className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">4</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Active Courses</span>
          </div>
          <span className="text-[9px] text-rose-500 font-bold">BBA Curriculum</span>
        </div>
      </div>

      {/* 3. Symmetrical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Lecture Schedule + Progress */}
        <div className="space-y-6">
          
          {/* Lecture Schedule */}
          <Card className="border-slate-100 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4 pb-1.5 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Today&apos;s Lecture Schedule</h3>
                <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-600 font-bold">18 Aug 2026</Badge>
              </div>

              <div className="space-y-4">
                {mockSchedules.faculty.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="text-slate-500 flex flex-col items-center flex-shrink-0 w-20">
                        <span className="text-[11px] font-black text-slate-800 leading-none">{item.time.split(" ")[0]}</span>
                        <span className="text-[9px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">{item.time.split(" ").slice(1).join(" ")}</span>
                      </div>
                      <div className="h-7 w-px bg-slate-200" />
                      <div className="text-left">
                        <span className="text-xs font-extrabold text-slate-800 block truncate">{item.course}</span>
                        <span className="text-[10px] text-slate-455 font-semibold block mt-0.5">{item.details}</span>
                      </div>
                    </div>
                    <Badge variant={item.status === "Completed" ? "success" : "info"} className="text-[8px] font-black uppercase flex-shrink-0">
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Syllabus Progress */}
          <Card className="border-slate-100 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4 pb-1.5 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Syllabus Progress</h3>
              </div>

              <div className="space-y-4">
                {mockFacultyCourses.map((course) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex justify-between items-start text-xs text-left">
                      <div>
                        <span className="font-extrabold text-slate-800 block">{course.name}</span>
                        <span className="text-[10px] text-slate-455 font-semibold block mt-0.5">
                          Strength: {course.studentsCount} Students • Next: {course.nextClass}
                        </span>
                      </div>
                      <span className="font-black text-blue-600">{course.progress}% Complete</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Column: Action Items + Class Attendance Avg */}
        <div className="space-y-6">
          
          {/* Action Items */}
          <Card className="border-slate-100 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4 pb-1.5 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Pending Tasks</h3>
                <span className="text-[10px] font-extrabold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full uppercase">
                  Attention ({tasks.length})
                </span>
              </div>

              <div className="space-y-3.5">
                {tasks.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 flex flex-col items-center justify-center">
                    <CheckSquare className="h-10 w-10 text-emerald-500 mb-2" />
                    <span className="text-xs font-bold">Perfect! No pending action items.</span>
                  </div>
                ) : (
                  tasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => handleOpenTask(task)}
                      className="w-full flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-300 transition-all text-left focus-ring cursor-pointer"
                    >
                      <div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">{task.category}</span>
                        <span className="text-xs font-extrabold text-slate-800 mt-1 block">{task.title}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="h-5 w-5 bg-amber-50 border border-amber-200 text-amber-600 text-[10px] font-black rounded-full flex items-center justify-center flex-shrink-0">
                          {task.count}
                        </span>
                        <ChevronRight className="h-4.5 w-4.5 text-slate-400" />
                      </div>
                    </button>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Class Attendance Average */}
          <Card className="border-slate-100 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4 pb-1.5 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Class Attendance Average</h3>
              </div>

              <div className="flex flex-col items-center justify-center py-2">
                <div className="relative h-28 w-28 flex items-center justify-center select-none">
                  <svg className="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="transparent"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-500"
                      strokeWidth="3.5"
                      strokeDasharray="92, 100"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-xl font-black text-slate-900 leading-none">92%</span>
                    <span className="text-[9px] text-slate-400 font-bold tracking-wider mt-1 uppercase">PRESENT</span>
                  </div>
                </div>

                <div className="mt-5 space-y-2 text-xs w-full text-slate-500 font-semibold">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="flex items-center text-slate-600">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 mr-2" />
                      Present average
                    </span>
                    <span className="font-extrabold text-slate-900">23 Classes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center text-slate-600">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500 mr-2" />
                      Leave average
                    </span>
                    <span className="font-extrabold text-slate-900">2 Classes</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

      {/* Task Action Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selectedTask?.title || "Academic Action Item"}
        description="Submit evaluations or complete academic tasks."
        footer={
          <div className="flex space-x-2 w-full justify-end">
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleGradeTask}>
              Submit Evaluation
            </Button>
          </div>
        }
      >
        {selectedTask && (
          <div className="space-y-5 text-left">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2.5">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                Task Briefing
              </span>
              <span className="text-xs font-black text-slate-800 block">
                {selectedTask.title}
              </span>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                There are {selectedTask.count} items awaiting action in this queue. Completing this maintains curriculum schedules.
              </p>
            </div>

            {selectedTask.category === "Grading" && (
              <form onSubmit={handleGradeTask} className="space-y-4">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                  Evaluation Form
                </span>
                <Input
                  label="Average Score (%) *"
                  type="number"
                  placeholder="e.g. 85"
                  min="0"
                  max="100"
                  value={gradeScore}
                  onChange={(e) => setGradeScore(e.target.value)}
                  required
                />
              </form>
            )}

            {selectedTask.category !== "Grading" && (
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                  Complete Task
                </span>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Verify sheets and submit final logs to department coordinator.
                </p>
                <Button variant="primary" onClick={() => {
                  addToast(`Completed: ${selectedTask.title}`, "success");
                  setTasks(prev => prev.filter(t => t.id !== selectedTask.id));
                  setDrawerOpen(false);
                }} className="w-full">
                  Submit Now
                </Button>
              </div>
            )}
          </div>
        )}
      </Drawer>

    </div>
  );
}
