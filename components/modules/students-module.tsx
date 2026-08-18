"use client";

import React, { useState } from "react";
import { useERP, StudentRecord } from "@/context/erp-context";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Drawer } from "@/components/ui/drawer";
import { Search, SlidersHorizontal, UserPlus, Eye, Mail, FileText, CalendarClock } from "lucide-react";

export default function StudentsModule() {
  const { students, setStudents, addToast } = useERP();
  const [searchQuery, setSearchQuery] = useState("");
  const [programFilter, setProgramFilter] = useState("All");
  
  // Drawer states
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"Overview" | "Academics" | "Attendance" | "Fees">("Overview");

  // Filtering
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProgram = programFilter === "All" || student.program.includes(programFilter);
    return matchesSearch && matchesProgram;
  });

  const handleOpenProfile = (student: StudentRecord) => {
    setSelectedStudent(student);
    setActiveTab("Overview");
    setDrawerOpen(true);
  };

  const handleUpdateStatus = (newStatus: StudentRecord["status"]) => {
    if (!selectedStudent) return;
    setStudents(prev => prev.map(s => s.id === selectedStudent.id ? { ...s, status: newStatus } : s));
    setSelectedStudent(prev => prev ? { ...prev, status: newStatus } : null);
    addToast(`Updated student status to ${newStatus}`, "success");
  };

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">
            Student Information System
          </h1>
          <p className="text-xs md:text-sm text-text-secondary mt-1">
            Search, filter, and manage student lifecycle records.
          </p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => addToast("Add student wizard launched", "info")}
          className="font-bold flex items-center"
        >
          <UserPlus className="h-4 w-4 mr-1.5" />
          <span>Add Student</span>
        </Button>
      </div>

      {/* Directory Filters */}
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="relative flex-1 w-full">
            <Input
              placeholder="Search by student name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4 text-text-muted" />}
              className="w-full"
            />
          </div>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <Select
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="w-full md:w-44"
            >
              <option value="All">All Programs</option>
              <option value="BBA">BBA</option>
              <option value="BCA">BCA</option>
              <option value="B.Tech">B.Tech</option>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => { setSearchQuery(""); setProgramFilter("All"); }}
              className="flex-shrink-0"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Data Table */}
      <Card>
        <CardContent className="p-0">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 border-b border-border-base text-text-secondary font-bold uppercase tracking-wider select-none">
                <tr>
                  <th className="p-4">Roll Number</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Program</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Attendance</th>
                  <th className="p-4">CGPA</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-base text-text-secondary font-medium">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-text-muted">
                      No students matching the criteria were found.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((stud) => (
                    <tr 
                      key={stud.id} 
                      className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                      onClick={() => handleOpenProfile(stud)}
                    >
                      <td className="p-4 font-bold text-text-primary">{stud.rollNo}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <div className="h-7 w-7 rounded-full bg-primary-blue-light text-primary-blue flex items-center justify-center font-bold text-[10px]">
                            {stud.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <span className="font-semibold text-text-primary">{stud.name}</span>
                        </div>
                      </td>
                      <td className="p-4">{stud.program}</td>
                      <td className="p-4">{stud.dept}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-1.5">
                          <div className="h-1.5 w-12 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${stud.attendance >= 75 ? "bg-success" : "bg-danger"}`}
                              style={{ width: `${stud.attendance}%` }}
                            />
                          </div>
                          <span className={stud.attendance >= 75 ? "text-success font-semibold" : "text-danger font-semibold"}>
                            {stud.attendance}%
                          </span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-text-primary">{stud.cgpa}</td>
                      <td className="p-4">
                        <Badge 
                          variant={
                            stud.status === "Active" 
                              ? "success" 
                              : stud.status === "On Leave" 
                              ? "warning" 
                              : "danger"
                          }
                        >
                          {stud.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleOpenProfile(stud)}
                          className="h-8 w-8 text-text-muted hover:text-text-primary rounded-lg"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards List View */}
          <div className="md:hidden divide-y divide-border-base">
            {filteredStudents.length === 0 ? (
              <div className="p-8 text-center text-text-muted text-xs">
                No students matching the criteria were found.
              </div>
            ) : (
              filteredStudents.map((stud) => (
                <div
                  key={stud.id}
                  onClick={() => handleOpenProfile(stud)}
                  className="p-4 active:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer space-x-3"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="h-9 w-9 rounded-full bg-primary-blue-light text-primary-blue flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {stud.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="min-w-0 space-y-1">
                      <span className="text-xs font-bold text-text-primary block truncate">
                        {stud.name}
                      </span>
                      <span className="text-[10px] text-text-muted block">
                        {stud.rollNo} • {stud.program}
                      </span>
                      {/* Attendance indicator */}
                      <div className="flex items-center space-x-1.5 pt-1">
                        <div className="h-1 w-16 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${stud.attendance >= 75 ? "bg-success" : "bg-danger"}`}
                            style={{ width: `${stud.attendance}%` }}
                          />
                        </div>
                        <span className={cn(
                          "text-[9px] font-bold",
                          stud.attendance >= 75 ? "text-success" : "text-danger"
                        )}>
                          {stud.attendance}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-1.5 flex-shrink-0 text-right">
                    <Badge 
                      variant={
                        stud.status === "Active" 
                          ? "success" 
                          : stud.status === "On Leave" 
                          ? "warning" 
                          : "danger"
                      }
                      className="text-[9px]"
                    >
                      {stud.status}
                    </Badge>
                    <span className="text-[10px] font-extrabold text-text-primary bg-slate-100 px-2 py-0.5 rounded-md">
                      {stud.cgpa} CGPA
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Student Profile Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selectedStudent?.name || "Student Profile"}
        description={selectedStudent?.rollNo || ""}
        footer={
          <div className="flex items-center justify-between w-full">
            <div className="flex space-x-1">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleUpdateStatus("Active")}
                disabled={selectedStudent?.status === "Active"}
              >
                Activate
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleUpdateStatus("On Leave")}
                disabled={selectedStudent?.status === "On Leave"}
              >
                Leave
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-danger hover:bg-danger-light"
                onClick={() => handleUpdateStatus("Suspended")}
                disabled={selectedStudent?.status === "Suspended"}
              >
                Suspend
              </Button>
            </div>
            <Button variant="primary" size="sm" onClick={() => setDrawerOpen(false)}>
              Close Profile
            </Button>
          </div>
        }
      >
        {selectedStudent && (
          <div className="space-y-5">
            {/* Drawer Tabs */}
            <div className="flex border-b border-border-base text-xs font-semibold select-none">
              {(["Overview", "Academics", "Attendance", "Fees"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-center py-2.5 border-b-2 transition-colors cursor-pointer ${
                    activeTab === tab 
                      ? "border-primary-blue text-primary-blue font-bold" 
                      : "border-transparent text-text-muted hover:text-text-primary"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab contents */}
            {activeTab === "Overview" && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3">
                  <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">
                    Contact Details
                  </span>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-text-muted" />
                    <span className="text-text-primary font-semibold">{selectedStudent.email}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-border-base/50 pt-3 mt-3">
                    <div>
                      <span className="text-text-muted block">Program Enrolled</span>
                      <span className="text-text-primary font-bold block mt-0.5">{selectedStudent.program}</span>
                    </div>
                    <div>
                      <span className="text-text-muted block">Department</span>
                      <span className="text-text-primary font-bold block mt-0.5">{selectedStudent.dept}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">
                    Institutional Record
                  </span>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Enrollment Status</span>
                    <Badge variant={selectedStudent.status === "Active" ? "success" : "warning"}>
                      {selectedStudent.status}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Academics" && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">CGPA Score</span>
                    <span className="text-2xl font-black text-text-primary block mt-0.5">{selectedStudent.cgpa} / 10.0</span>
                  </div>
                  <Badge variant="academic">Term Rank: 4th</Badge>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">Semester Grade Sheet</span>
                  <div className="space-y-1.5 border border-border-base rounded-xl p-3.5 bg-surface-base">
                    <div className="flex justify-between pb-2 border-b border-border-base/50">
                      <span>Business Administration</span>
                      <span className="font-bold text-text-primary">A+</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-border-base/50">
                      <span>Principles of Management</span>
                      <span className="font-bold text-text-primary">O (Outstanding)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Financial Accounting</span>
                      <span className="font-bold text-text-primary">A</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Attendance" && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">Monthly Average</span>
                    <span className="text-2xl font-black text-text-primary block mt-0.5">{selectedStudent.attendance}%</span>
                  </div>
                  <Badge variant={selectedStudent.attendance >= 75 ? "success" : "danger"}>
                    {selectedStudent.attendance >= 75 ? "Attendance OK" : "Defaulter Warning"}
                  </Badge>
                </div>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  * Dynamic attendance tracking is processed automatically when faculty submits checklists. Required compliance is 75% per course.
                </p>
              </div>
            )}

            {activeTab === "Fees" && (
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">Pending Fees Dues</span>
                    <span className="text-xl font-bold text-danger block mt-0.5">
                      {selectedStudent.name === "Ananya Sen" ? "₹3,500" : "₹0"}
                    </span>
                  </div>
                  <Badge variant={selectedStudent.name === "Ananya Sen" ? "warning" : "success"}>
                    {selectedStudent.name === "Ananya Sen" ? "Reminders active" : "Dues Cleared"}
                  </Badge>
                </div>
                <div className="border border-border-base rounded-xl p-3 bg-surface-base flex justify-between items-center">
                  <div>
                    <span className="font-bold text-text-primary block">Term I Tuition Invoice</span>
                    <span className="text-[10px] text-text-muted block mt-0.5">INV-2026-0493 • Date: 12 Jun 2026</span>
                  </div>
                  <Badge variant="success">Paid</Badge>
                </div>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
}
