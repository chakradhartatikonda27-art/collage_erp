"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Check, X, Clock, HelpCircle, CheckCircle } from "lucide-react";

interface AttendanceRecord {
  studentId: string;
  name: string;
  rollNo: string;
  status: "Present" | "Absent" | "Late";
}

export default function AttendanceModule() {
  const { students, addToast } = useERP();
  
  // Selection states
  const [selectedProgram, setSelectedProgram] = useState("BBA II Year");
  const [selectedSubject, setSelectedSubject] = useState("Business Communication");
  
  // Initialize checklist based on students in that program
  const getInitialRecords = (): AttendanceRecord[] => {
    return students
      .filter(s => s.program.includes("BBA II Year"))
      .map(s => ({
        studentId: s.id,
        name: s.name,
        rollNo: s.rollNo,
        status: "Present"
      }));
  };

  const [records, setRecords] = useState<AttendanceRecord[]>(getInitialRecords());

  const handleStatusChange = (studentId: string, status: AttendanceRecord["status"]) => {
    setRecords(prev => prev.map(r => r.studentId === studentId ? { ...r, status } : r));
  };

  const handleMarkAll = (status: AttendanceRecord["status"]) => {
    setRecords(prev => prev.map(r => ({ ...r, status })));
    addToast(`Marked all students as ${status}`, "info", 1500);
  };

  const handleSubmit = () => {
    const present = records.filter(r => r.status === "Present" || r.status === "Late").length;
    const absent = records.filter(r => r.status === "Absent").length;
    
    addToast(`Attendance submitted! Present: ${present}, Absent: ${absent}`, "success");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">
          Syllabus & Lecture Attendance Board
        </h1>
        <p className="text-xs md:text-sm text-text-secondary mt-1">
          Select class parameters and log student presence checklist reports.
        </p>
      </div>

      {/* Classroom Setup Picker */}
      <Card>
        <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select 
            label="Academic Batch & Class"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
          >
            <option value="BBA II Year">BBA II Year — Sec A</option>
            <option value="BCA I Year">BCA I Year — Sec B</option>
            <option value="B.Tech II Year">B.Tech II Year — Sec A</option>
          </Select>
          <Select
            label="Active Curriculum Course"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="Business Communication">Business Communication</option>
            <option value="Human Resource Management">Human Resource Management</option>
            <option value="Principles of Management">Principles of Management</option>
          </Select>
          <div className="flex items-end justify-end space-x-2 w-full">
            <Button 
              variant="outline" 
              onClick={() => handleMarkAll("Present")}
              className="text-xs font-bold"
            >
              All Present
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleMarkAll("Absent")}
              className="text-xs font-bold text-danger hover:bg-danger-light"
            >
              All Absent
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Checklist Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 border-b border-border-base text-text-secondary font-bold uppercase tracking-wider select-none">
                <tr>
                  <th className="p-4">Roll Number</th>
                  <th className="p-4">Name</th>
                  <th className="p-4 text-center">Status Toggles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-base text-text-secondary font-medium">
                {records.map((row) => (
                  <tr key={row.studentId} className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-text-primary">{row.rollNo}</td>
                    <td className="p-4 font-semibold text-text-primary">{row.name}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center space-x-2 select-none">
                        {/* Present Toggle */}
                        <button
                          onClick={() => handleStatusChange(row.studentId, "Present")}
                          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer focus-ring transition-colors ${
                            row.status === "Present"
                              ? "bg-success text-white border-transparent shadow-soft"
                              : "border-border-base text-text-secondary hover:bg-slate-50"
                          }`}
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>Present</span>
                        </button>

                        {/* Late Toggle */}
                        <button
                          onClick={() => handleStatusChange(row.studentId, "Late")}
                          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer focus-ring transition-colors ${
                            row.status === "Late"
                              ? "bg-warning text-white border-transparent shadow-soft"
                              : "border-border-base text-text-secondary hover:bg-slate-50"
                          }`}
                        >
                          <Clock className="h-3.5 w-3.5" />
                          <span>Late</span>
                        </button>

                        {/* Absent Toggle */}
                        <button
                          onClick={() => handleStatusChange(row.studentId, "Absent")}
                          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer focus-ring transition-colors ${
                            row.status === "Absent"
                              ? "bg-danger text-white border-transparent shadow-soft"
                              : "border-border-base text-text-secondary hover:bg-slate-50"
                          }`}
                        >
                          <X className="h-3.5 w-3.5" />
                          <span>Absent</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Submission block */}
      <div className="flex justify-end">
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          className="font-bold flex items-center shadow-soft"
        >
          <CheckCircle className="h-4 w-4 mr-1.5" />
          <span>Submit Attendance</span>
        </Button>
      </div>
    </div>
  );
}
