"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { CheckSquare, Share2, Award, Sparkles, CheckCircle } from "lucide-react";

interface ExamMarksRecord {
  studentId: string;
  name: string;
  rollNo: string;
  score: string; // string for input binding
  grade: string;
}

export default function ExamsModule() {
  const { students, addToast } = useERP();

  // Pick initial mock records
  const getInitialRecords = (): ExamMarksRecord[] => {
    return students
      .filter(s => s.program.includes("BBA II Year"))
      .map(s => {
        // Mock default score based on child's CGPA
        const baseScore = s.cgpa !== "0.0" ? Math.floor(parseFloat(s.cgpa) * 10) + 5 : 75;
        return {
          studentId: s.id,
          name: s.name,
          rollNo: s.rollNo,
          score: String(baseScore),
          grade: calculateGrade(baseScore)
        };
      });
  };

  const [records, setRecords] = useState<ExamMarksRecord[]>(getInitialRecords());
  const [isPublished, setIsPublished] = useState(false);

  function calculateGrade(score: number): string {
    if (score >= 95) return "O";
    if (score >= 90) return "A+";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    return "F";
  }

  const handleScoreChange = (studentId: string, value: string) => {
    const scoreNum = parseInt(value);
    if (!isNaN(scoreNum) && (scoreNum < 0 || scoreNum > 100)) {
      addToast("Scores must be between 0 and 100", "warning");
      return;
    }

    setRecords(prev => prev.map(r => {
      if (r.studentId === studentId) {
        const grade = isNaN(scoreNum) ? "-" : calculateGrade(scoreNum);
        return { ...r, score: value, grade };
      }
      return r;
    }));
  };

  const handleSubmit = () => {
    addToast("Internal marks sheets updated and verified", "success");
  };

  const handlePublishToggle = () => {
    setIsPublished(!isPublished);
    if (!isPublished) {
      addToast("Exam results published online to student & parent portals!", "success");
    } else {
      addToast("Exam results visibility hidden", "warning");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">
            Examination Grade & Marks Console
          </h1>
          <p className="text-xs md:text-sm text-text-secondary mt-1">
            Input student internal marks and publish semester results.
          </p>
        </div>
        <Button 
          variant={isPublished ? "outline" : "success"}
          onClick={handlePublishToggle}
          className="font-bold flex items-center shadow-soft"
        >
          <Share2 className="h-4 w-4 mr-1.5" />
          <span>{isPublished ? "Revoke Results" : "Publish Results"}</span>
        </Button>
      </div>

      {/* Grid view selector */}
      <Card>
        <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select label="Batch Program">
            <option value="BBA II Year">BBA II Year — Sec A</option>
            <option value="BCA I Year">BCA I Year — Sec B</option>
          </Select>
          <Select label="Course Module">
            <option value="Principles of Management">Principles of Management</option>
            <option value="Business Economics">Business Economics</option>
          </Select>
          <div className="flex items-end justify-between text-xs text-text-secondary font-semibold p-1 border-b border-border-base/50">
            <span>Result Visibility Status:</span>
            <Badge variant={isPublished ? "success" : "warning"}>
              {isPublished ? "ONLINE" : "DRAFT"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Marks Sheet Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 border-b border-border-base text-text-secondary font-bold uppercase tracking-wider select-none">
                <tr>
                  <th className="p-4">Roll Number</th>
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Internal Score (Max: 100)</th>
                  <th className="p-4">Derived Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-base text-text-secondary font-medium">
                {records.map((row) => (
                  <tr key={row.studentId} className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-text-primary">{row.rollNo}</td>
                    <td className="p-4 font-semibold text-text-primary">{row.name}</td>
                    <td className="p-4">
                      <div className="max-w-[120px]">
                        <Input
                          type="number"
                          value={row.score}
                          onChange={(e) => handleScoreChange(row.studentId, e.target.value)}
                          placeholder="Score"
                          min="0"
                          max="100"
                          className="h-8 text-xs font-bold text-center"
                        />
                      </div>
                    </td>
                    <td className="p-4 font-bold text-text-primary">
                      <Badge variant="academic" className="text-xs font-black px-3.5 py-0.5">
                        {row.grade}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end">
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          className="font-bold flex items-center shadow-soft"
        >
          <CheckCircle className="h-4 w-4 mr-1.5" />
          <span>Save Marks Registry</span>
        </Button>
      </div>
    </div>
  );
}
