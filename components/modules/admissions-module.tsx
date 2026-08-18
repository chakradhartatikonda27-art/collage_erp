"use client";

import React, { useState } from "react";
import { useERP, AdmissionApplication } from "@/context/erp-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { FileCheck, Sparkles, UserCheck2, AlertCircle, FileText, CheckCircle } from "lucide-react";

export default function AdmissionsModule() {
  const { admissions, setAdmissions, students, setStudents, addToast } = useERP();
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [doc1Checked, setDoc1Checked] = useState(false);
  const [doc2Checked, setDoc2Checked] = useState(false);

  // Group applications by stage
  const columns: { stage: AdmissionApplication["stage"]; title: string; color: string }[] = [
    { stage: "Enquiry", title: "Enquiries", color: "bg-slate-100 border-slate-200 text-text-primary" },
    { stage: "Verification", title: "Document Verification", color: "bg-blue-50 border-blue-100 text-primary-blue" },
    { stage: "Selection", title: "Selected Candidates", color: "bg-purple-50 border-purple-100 text-academic" },
    { stage: "Paid", title: "Fee Paid", color: "bg-amber-50 border-amber-100 text-warning" },
    { stage: "Confirmed", title: "Admissions Confirmed", color: "bg-emerald-50 border-emerald-100 text-success" }
  ];

  const handleOpenApp = (app: AdmissionApplication) => {
    setSelectedApp(app);
    setDoc1Checked(app.docsVerified);
    setDoc2Checked(app.docsVerified);
    setDrawerOpen(true);
  };

  const handleUpdateStage = (newStage: AdmissionApplication["stage"]) => {
    if (!selectedApp) return;

    setAdmissions(prev => prev.map(a => a.id === selectedApp.id ? { ...a, stage: newStage } : a));
    setSelectedApp(prev => prev ? { ...prev, stage: newStage } : null);
    addToast(`Moved applicant to stage: ${newStage}`, "success");
  };

  const handleVerifyDocs = () => {
    if (!selectedApp) return;

    setAdmissions(prev => prev.map(a => a.id === selectedApp.id ? { ...a, docsVerified: true, stage: "Selection" } : a));
    setSelectedApp(prev => prev ? { ...prev, docsVerified: true, stage: "Selection" } : null);
    addToast("Documents verified successfully. Applicant moved to Selection.", "success");
  };

  const handleOnboard = () => {
    if (!selectedApp) return;

    // Check if student already exists in directory to avoid duplicate key issues
    const exists = students.some(s => s.email === selectedApp.email);
    if (exists) {
      addToast("Student already onboarding / exists in database directory.", "warning");
      return;
    }

    // 1. Add student to Student Directory state
    const newStudent = {
      id: `S${Date.now().toString().substring(8)}`,
      rollNo: `26BBA${Math.floor(1000 + Math.random() * 9000)}`,
      name: selectedApp.name,
      program: selectedApp.program.includes("B.Tech") ? "B.Tech I Year" : `${selectedApp.program.split(" ")[0]} I Year`,
      dept: selectedApp.program.includes("CSE") || selectedApp.program.includes("CS") ? "Computer Science" : "Management",
      email: selectedApp.email,
      attendance: 100, // new student
      cgpa: "0.0", // yet to score
      status: "Active" as const
    };

    setStudents(prev => [...prev, newStudent]);

    // 2. Set stage to confirmed in Admissions List state
    setAdmissions(prev => prev.map(a => a.id === selectedApp.id ? { ...a, stage: "Confirmed" } : a));
    setSelectedApp(prev => prev ? { ...prev, stage: "Confirmed" } : null);
    
    addToast(`Onboarded ${selectedApp.name}! Created student record: ${newStudent.rollNo}`, "success");
    setDrawerOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">
            Admissions Pipeline Terminal
          </h1>
          <p className="text-xs md:text-sm text-text-secondary mt-1">
            Verify applications, select candidates, and onboard converted students.
          </p>
        </div>
      </div>

      {/* Kanban Pipeline Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 overflow-x-auto select-none">
        {columns.map((col, idx) => {
          const stageApps = admissions.filter(app => app.stage === col.stage);
          return (
            <div key={idx} className="flex flex-col space-y-3 bg-slate-50/50 border border-slate-100 rounded-xl p-3 min-w-[220px] max-h-[75vh]">
              <div className="flex items-center justify-between px-1.5 py-1">
                <span className="text-xs font-black text-text-primary uppercase tracking-wide">
                  {col.title}
                </span>
                <span className="h-5 w-5 bg-slate-100 rounded-full text-[10px] font-bold flex items-center justify-center border border-border-base">
                  {stageApps.length}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2">
                {stageApps.length === 0 ? (
                  <div className="p-8 text-center text-text-muted text-[10px] bg-white rounded-lg border border-dashed border-border-base">
                    No leads here
                  </div>
                ) : (
                  stageApps.map(app => (
                    <div 
                      key={app.id} 
                      onClick={() => handleOpenApp(app)}
                      className="bg-surface-base border border-border-base hover:border-border-focus hover:shadow-soft rounded-lg p-3 cursor-pointer transition-all space-y-2 group"
                    >
                      <h4 className="text-xs font-bold text-text-primary group-hover:text-primary-blue transition-colors truncate">
                        {app.name}
                      </h4>
                      <div className="flex justify-between items-center text-[10px] text-text-muted mt-1">
                        <span>{app.program}</span>
                        <span>{app.date.split(" ")[0]} {app.date.split(" ")[1]}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-border-base/50 mt-2">
                        <Badge variant={app.docsVerified ? "success" : "warning"} className="text-[8px]">
                          {app.docsVerified ? "Docs Checked" : "Pending Docs"}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Verification Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Verify Application Dossier"
        description={selectedApp?.name || ""}
        footer={
          <div className="flex items-center justify-end space-x-2 w-full">
            <Button variant="outline" size="sm" onClick={() => setDrawerOpen(false)}>
              Cancel
            </Button>
            {selectedApp?.stage === "Verification" && (
              <Button 
                variant="primary" 
                size="sm" 
                onClick={handleVerifyDocs} 
                disabled={!doc1Checked || !doc2Checked}
              >
                <FileCheck className="h-4 w-4 mr-1.5" />
                <span>Verify Documents</span>
              </Button>
            )}
            {selectedApp?.stage === "Selection" && (
              <Button variant="success" size="sm" onClick={() => handleUpdateStage("Paid")}>
                <CheckCircle className="h-4 w-4 mr-1.5" />
                <span>Move to Paid</span>
              </Button>
            )}
            {selectedApp?.stage === "Paid" && (
              <Button variant="success" size="sm" onClick={handleOnboard}>
                <UserCheck2 className="h-4 w-4 mr-1.5" />
                <span>Onboard Student</span>
              </Button>
            )}
          </div>
        }
      >
        {selectedApp && (
          <div className="space-y-5">
            {/* Applicant Summary */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs">
              <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">Applicant Info</span>
              <div className="flex justify-between">
                <span className="text-text-muted">Email</span>
                <span className="font-semibold text-text-primary">{selectedApp.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Phone</span>
                <span className="font-semibold text-text-primary">{selectedApp.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Program</span>
                <span className="font-bold text-text-primary">{selectedApp.program}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Pipeline Stage</span>
                <Badge variant="info">{selectedApp.stage}</Badge>
              </div>
            </div>

            {/* Document Checklist Stage */}
            {selectedApp.stage === "Verification" && (
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">Document Checklist</span>
                <div className="space-y-2 p-3.5 border border-border-base rounded-xl bg-surface-base text-xs">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-border-base text-primary-blue focus-ring" 
                      checked={doc1Checked}
                      onChange={(e) => setDoc1Checked(e.target.checked)}
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-text-primary block">10th / 12th Marks Sheet scan</span>
                      <span className="text-[10px] text-text-muted">High school verification</span>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer pt-2 border-t border-border-base/50">
                    <input 
                      type="checkbox" 
                      className="rounded border-border-base text-primary-blue focus-ring" 
                      checked={doc2Checked}
                      onChange={(e) => setDoc2Checked(e.target.checked)}
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-text-primary block">Transfer / Character Certificate</span>
                      <span className="text-[10px] text-text-muted">Affiliation clearance documentation</span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Selection / Selection stage */}
            {selectedApp.stage === "Selection" && (
              <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-xl space-y-2 text-xs">
                <span className="text-[10px] font-bold text-purple-700 tracking-wider uppercase block">Selection Status</span>
                <span className="font-semibold text-text-primary block">Applicant approved for admission onboarding.</span>
                <p className="text-[10px] text-text-secondary leading-relaxed">
                  Click &ldquo;Move to Paid&rdquo; once candidate secures their slot via provisional token fees payment.
                </p>
              </div>
            )}

            {/* Selection / Paid stage */}
            {selectedApp.stage === "Paid" && (
              <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl space-y-2.5 text-xs">
                <span className="text-[10px] font-bold text-amber-700 tracking-wider uppercase block">Fee Verification</span>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-text-primary">First Semester Tuition Fee paid</span>
                  <Badge variant="success">Verified online</Badge>
                </div>
                <p className="text-[10px] text-text-secondary leading-relaxed border-t border-amber-200/50 pt-2">
                  Documents are cleared and term fees are accounted. Click &ldquo;Onboard Student&rdquo; to register this student in the college directory.
                </p>
              </div>
            )}

            {/* Selection / Confirmed stage */}
            {selectedApp.stage === "Confirmed" && (
              <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-2 text-xs flex flex-col items-center justify-center text-center">
                <CheckCircle className="h-8 w-8 text-success mb-2 animate-bounce" />
                <span className="font-extrabold text-success block">Onboard Completed</span>
                <span className="text-[10px] text-text-muted mt-0.5">Student registered in SIS directory. All clearance slips issued.</span>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
}
