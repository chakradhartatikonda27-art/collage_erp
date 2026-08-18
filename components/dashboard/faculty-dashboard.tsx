"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import { mockFacultyCourses, mockSchedules, mockAnnouncements } from "@/lib/mock-data";
import { KPICard } from "./widgets/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award
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
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">
            Faculty Academic Portal
          </h1>
          <p className="text-xs md:text-sm text-text-secondary mt-1">
            Welcome back, {activeUser.name} • {activeUser.roleTitle} — {activeUser.department} Department
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="success" className="py-1 px-3">
            Active Semester
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard title="My Classes Today" value="3" change="View schedule timeline" isPositive={true} type="info" />
        <KPICard title="Total Students" value="128" change="Across 4 active courses" isPositive={true} type="academic" />
        <KPICard title="Assignments to Grade" value="12" change="2 overdue batches" isPositive={false} type="warning" />
        <KPICard title="Attendance Rate" value="92%" change="Class average this month" isPositive={true} type="success" />
        <KPICard title="My Active Courses" value="4" change="BBA curriculum" isPositive={true} type="academic" />
      </div>

      {/* Schedule and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-4.5 w-4.5 text-primary-blue" />
              <span>Today&apos;s Lecture Schedule</span>
            </CardTitle>
            <Badge variant="outline">18 Aug 2026</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border-base">
              {mockSchedules.faculty.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-lg bg-slate-100 flex flex-col items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 text-text-secondary" />
                    </div>
                    <div className="min-w-0">
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
                  <Badge variant={item.status === "Completed" ? "success" : "info"}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actionable Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckSquare className="h-4.5 w-4.5 text-warning" />
              <span>Action Items ({tasks.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {tasks.length === 0 ? (
              <div className="p-8 text-center text-text-muted flex flex-col items-center justify-center">
                <Sparkles className="h-8 w-8 text-success mb-2 animate-bounce" />
                <span className="text-xs font-semibold">Perfect! No pending action items.</span>
              </div>
            ) : (
              tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => handleOpenTask(task)}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-100 transition-colors group cursor-pointer focus-ring text-left"
                >
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                      {task.category}
                    </span>
                    <span className="text-xs font-bold text-text-primary block truncate">
                      {task.title}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 flex-shrink-0">
                    <span className="h-5 w-5 bg-warning-light text-warning text-[10px] font-bold rounded-full flex items-center justify-center border border-warning/10">
                      {task.count}
                    </span>
                    <ChevronRight className="h-4 w-4 text-text-muted group-hover:text-text-primary transition-colors" />
                  </div>
                </button>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Courses and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Courses enrolled / Syllabus Progress */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>My Courses & Syllabus Progress</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            {mockFacultyCourses.map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex justify-between items-start text-xs">
                  <div>
                    <span className="font-bold text-text-primary block">{course.name}</span>
                    <span className="text-[10px] text-text-muted block mt-0.5">
                      Batch Strength: {course.studentsCount} Students • Next: {course.nextClass}
                    </span>
                  </div>
                  <span className="font-bold text-primary-blue">{course.progress}% Complete</span>
                </div>
                {/* Progress bar */}
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-blue rounded-full transition-all duration-500" 
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Visual attendance rating circle */}
        <Card>
          <CardHeader>
            <CardTitle>Class Attendance Average</CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            {/* SVG circle */}
            <div className="relative h-28 w-28 flex items-center justify-center">
              <svg className="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="transparent"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-success"
                  strokeWidth="3.5"
                  strokeDasharray="92, 100"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-xl font-black text-text-primary leading-none">92%</span>
                <span className="text-[9px] text-text-muted font-bold tracking-wider mt-0.5">PRESENT</span>
              </div>
            </div>

            <div className="mt-5 space-y-2 text-xs w-full text-text-secondary">
              <div className="flex justify-between items-center pb-2 border-b border-border-base/50">
                <span className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-success mr-2" />
                  Present average
                </span>
                <span className="font-semibold text-text-primary">23 Classes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-danger mr-2" />
                  Leave average
                </span>
                <span className="font-semibold text-text-primary">2 Classes</span>
              </div>
            </div>
          </CardContent>
        </Card>
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
          <div className="space-y-5">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2.5">
              <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">
                Task Briefing
              </span>
              <span className="text-sm font-bold text-text-primary block">
                {selectedTask.title}
              </span>
              <p className="text-xs text-text-secondary leading-relaxed">
                There are {selectedTask.count} items awaiting action in this queue. Completing this maintains curriculum schedules.
              </p>
            </div>

            {selectedTask.category === "Grading" && (
              <form onSubmit={handleGradeTask} className="space-y-4">
                <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">
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
                <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">
                  Complete Task
                </span>
                <p className="text-xs text-text-secondary leading-relaxed">
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
