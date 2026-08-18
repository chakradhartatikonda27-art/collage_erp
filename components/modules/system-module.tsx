"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { 
  FileSpreadsheet, 
  Settings, 
  Download, 
  ShieldAlert, 
  Sliders,
  CheckCircle,
  FileDown
} from "lucide-react";

export default function SystemModule() {
  const { addToast } = useERP();
  const [activeSubTab, setActiveSubTab] = useState<"Reports" | "Settings">("Reports");
  
  // Reports States
  const [reportCategory, setReportCategory] = useState("Students");
  const [reportData, setReportData] = useState<any[] | null>(null);

  // Settings States (Permission Matrix)
  const [permissions, setPermissions] = useState([
    { module: "Academic Marks Entry", roles: { principal: true, faculty: true, student: false } },
    { module: "Payroll Release Tools", roles: { principal: true, faculty: false, student: false } },
    { module: "Fee Payment Terminals", roles: { principal: true, faculty: false, student: true } }
  ]);

  const handleGenerateReport = () => {
    addToast("Compiling registry logs...", "info", 600);
    
    setTimeout(() => {
      if (reportCategory === "Students") {
        setReportData([
          { field1: "Ananya Sen", field2: "23BBA1024", field3: "BBA II Year", field4: "92% Attendance" },
          { field1: "Rahul Verma", field2: "23MEC1012", field3: "B.Tech II Year", field4: "81% Attendance" }
        ]);
      } else if (reportCategory === "Fees") {
        setReportData([
          { field1: "INV-2026-0493", field2: "Ananya Sen", field3: "₹75,000", field4: "Pending" },
          { field1: "INV-2026-1299", field2: "Rahul Verma", field3: "₹80,000", field4: "Paid" }
        ]);
      } else {
        setReportData([
          { field1: "Prof. Suresh Iyer", field2: "Assistant Professor", field3: "Computer Science", field4: "Active" },
          { field1: "Amit Sharma", field2: "Senior Accountant", field3: "Finance", field4: "Active" }
        ]);
      }
      addToast(`Generated report for ${reportCategory} successfully`, "success");
    }, 800);
  };

  const handleExport = (format: string) => {
    addToast(`Building ${format} bundle...`, "info", 800);
    
    setTimeout(() => {
      addToast(`Downloaded report_${reportCategory.toLowerCase()}.${format.toLowerCase()} successfully!`, "success");
    }, 1200);
  };

  const handlePermissionToggle = (idx: number, role: "principal" | "faculty" | "student") => {
    setPermissions(prev => {
      const copy = [...prev];
      copy[idx].roles[role] = !copy[idx].roles[role];
      return copy;
    });
    addToast("Updated System Authorization matrix", "success");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">
          System Control & Intelligence Engine
        </h1>
        <p className="text-xs md:text-sm text-text-secondary mt-1">
          Extract analytical reports and configure global Role-Based Access controls (RBAC).
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-border-base text-xs font-semibold select-none">
        <button
          onClick={() => setActiveSubTab("Reports")}
          className={`flex items-center justify-center space-x-2 py-3 px-6 border-b-2 transition-colors cursor-pointer ${
            activeSubTab === "Reports" 
              ? "border-primary-blue text-primary-blue font-bold" 
              : "border-transparent text-text-muted hover:text-text-primary"
          }`}
        >
          <FileSpreadsheet className="h-4 w-4" />
          <span>Reporting Engine</span>
        </button>
        <button
          onClick={() => setActiveSubTab("Settings")}
          className={`flex items-center justify-center space-x-2 py-3 px-6 border-b-2 transition-colors cursor-pointer ${
            activeSubTab === "Settings" 
              ? "border-primary-blue text-primary-blue font-bold" 
              : "border-transparent text-text-muted hover:text-text-primary"
          }`}
        >
          <Settings className="h-4 w-4" />
          <span>RBAC Security Settings</span>
        </button>
      </div>

      {/* Reports Engine Sub-tab */}
      {activeSubTab === "Reports" && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 flex flex-col sm:flex-row items-end gap-4">
              <div className="flex-1 w-full">
                <Select
                  label="Select Report Module Category"
                  value={reportCategory}
                  onChange={(e) => { setReportCategory(e.target.value); setReportData(null); }}
                >
                  <option value="Students">Student Enrollment & Attendance logs</option>
                  <option value="Fees">Fee invoice audit trails</option>
                  <option value="HR">Employee payroll directory index</option>
                </Select>
              </div>
              <Button 
                variant="primary" 
                onClick={handleGenerateReport}
                className="w-full sm:w-auto font-bold"
              >
                Compile Report
              </Button>
            </CardContent>
          </Card>

          {/* Generated Report table */}
          {reportData && (
            <Card className="animate-in fade-in duration-300">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">Compiled {reportCategory} Audit Log</CardTitle>
                <div className="flex items-center space-x-1.5 select-none">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport("PDF")}
                  >
                    <FileDown className="h-3.5 w-3.5 mr-1" />
                    PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport("Excel")}
                  >
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Excel
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-border-base text-text-secondary font-bold select-none">
                      <tr>
                        <th className="p-4">Col 1</th>
                        <th className="p-4">Col 2</th>
                        <th className="p-4">Col 3</th>
                        <th className="p-4">Col 4</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-base text-text-secondary font-medium">
                      {reportData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="p-4 text-text-primary font-bold">{row.field1}</td>
                          <td className="p-4">{row.field2}</td>
                          <td className="p-4">{row.field3}</td>
                          <td className="p-4">
                            <Badge variant="outline">{row.field4}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Settings Permission Matrix Sub-tab */}
      {activeSubTab === "Settings" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShieldAlert className="h-4.5 w-4.5 text-danger" />
              <span>Institutional RBAC Permissions Grid</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-50 border-b border-border-base text-text-secondary font-bold uppercase tracking-wider select-none">
                  <tr>
                    <th className="p-4">System Operation Module</th>
                    <th className="p-4 text-center">Principal</th>
                    <th className="p-4 text-center">Faculty</th>
                    <th className="p-4 text-center">Student</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-base text-text-secondary font-medium select-none">
                  {permissions.map((perm, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-text-primary">{perm.module}</td>
                      
                      {/* Principal Check */}
                      <td className="p-4 text-center">
                        <input 
                          type="checkbox" 
                          checked={perm.roles.principal}
                          onChange={() => handlePermissionToggle(idx, "principal")}
                          className="rounded border-border-base text-primary-blue focus-ring"
                        />
                      </td>

                      {/* Faculty Check */}
                      <td className="p-4 text-center">
                        <input 
                          type="checkbox" 
                          checked={perm.roles.faculty}
                          onChange={() => handlePermissionToggle(idx, "faculty")}
                          className="rounded border-border-base text-primary-blue focus-ring"
                        />
                      </td>

                      {/* Student Check */}
                      <td className="p-4 text-center">
                        <input 
                          type="checkbox" 
                          checked={perm.roles.student}
                          onChange={() => handlePermissionToggle(idx, "student")}
                          className="rounded border-border-base text-primary-blue focus-ring"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
