"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { formatIndianCurrency } from "@/lib/utils";
import { Search, Briefcase, FileText, CheckCircle, XCircle, Settings } from "lucide-react";

export default function HRModule() {
  const { addToast } = useERP();
  
  // State for mock employee leaves
  const [leaves, setLeaves] = useState([
    { id: "L1", name: "Prof. Suresh Iyer", type: "Casual Leave", date: "24 Aug 2026", reason: "Personal family function", days: 1 },
    { id: "L2", name: "Amit Sharma", type: "Sick Leave", date: "20 Aug 2026", reason: "Medical checkup", days: 2 }
  ]);

  // States for Payslip generator
  const [payslipModalOpen, setPayslipModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [basicPay, setBasicPay] = useState("65000");
  const [allowance, setAllowance] = useState("12000");
  const [deductions, setDeductions] = useState("3500");

  const netSalary = parseInt(basicPay) + parseInt(allowance) - parseInt(deductions);

  const employees = [
    { id: "E1", name: "Prof. Suresh Iyer", title: "Assistant Professor", dept: "Computer Science", email: "suresh.iyer@excel.edu.in", status: "Active" },
    { id: "E2", name: "Amit Sharma", title: "Senior Accountant", dept: "Finance Department", email: "finance.blr@excel.edu.in", status: "Active" },
    { id: "E3", name: "Dr. Ananya Nair", title: "Associate Professor", dept: "Humanities", email: "ananya.nair@excel.edu.in", status: "Active" }
  ];

  const handleProcessLeave = (id: string, name: string, approved: boolean) => {
    setLeaves(prev => prev.filter(l => l.id !== id));
    if (approved) {
      addToast(`Approved leave request for ${name}`, "success");
    } else {
      addToast(`Rejected leave request for ${name}`, "warning");
    }
  };

  const handleGeneratePayslip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaff) {
      addToast("Please select an employee", "danger");
      return;
    }
    addToast(`Payslip generated for ${selectedStaff}. Net Pay: ${formatIndianCurrency(netSalary)}`, "success");
    setPayslipModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">
            Human Resources & Payroll Office
          </h1>
          <p className="text-xs md:text-sm text-text-secondary mt-1">
            Manage staff profiles, process salary slip releases, and audit leaves.
          </p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => setPayslipModalOpen(true)}
          className="font-bold flex items-center shadow-soft"
        >
          <FileText className="h-4 w-4 mr-1.5" />
          <span>Release Payslip</span>
        </Button>
      </div>

      {/* Main operational view */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leave Requests Queue */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Leave Consent Requests ({leaves.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {leaves.length === 0 ? (
              <div className="p-8 text-center text-text-muted flex flex-col items-center justify-center">
                <CheckCircle className="h-9 w-9 text-success mb-2" />
                <span className="text-xs font-semibold">No pending leaves. All clear!</span>
              </div>
            ) : (
              <div className="divide-y divide-border-base">
                {leaves.map((leave) => (
                  <div key={leave.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50 transition-colors gap-4">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-text-primary text-sm">{leave.name}</span>
                        <Badge variant="academic">{leave.type}</Badge>
                      </div>
                      <p className="text-text-secondary font-medium">Reason: &ldquo;{leave.reason}&rdquo;</p>
                      <span className="text-[10px] text-text-muted block mt-0.5">Date: {leave.date} ({leave.days} Day)</span>
                    </div>
                    <div className="flex items-center space-x-2 select-none">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleProcessLeave(leave.id, leave.name, false)}
                        className="text-xs font-bold text-danger border-danger/35 hover:bg-danger-light"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button 
                        variant="success" 
                        size="sm"
                        onClick={() => handleProcessLeave(leave.id, leave.name, true)}
                        className="text-xs font-bold"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Short metrics widget */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Stats (This Month)</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3.5 text-xs text-text-secondary">
            <div className="flex justify-between items-center pb-2 border-b border-border-base/50">
              <span className="font-semibold text-text-muted">Teaching Staff Present</span>
              <Badge variant="success">98% Present</Badge>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border-base/50">
              <span className="font-semibold text-text-muted">Administrative Staff Present</span>
              <Badge variant="success">96% Present</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-text-muted">Currently on Authorized Leave</span>
              <Badge variant="warning">4 Employees</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Directory */}
      <Card>
        <CardHeader>
          <CardTitle>Faculty & Administration Employee Directory</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 border-b border-border-base text-text-secondary font-bold uppercase tracking-wider select-none">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Title / Role</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-base text-text-secondary font-medium">
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/50">
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-7 w-7 rounded-full bg-slate-100 text-text-secondary flex items-center justify-center font-bold text-[10px]">
                          {emp.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="font-semibold text-text-primary">{emp.name}</span>
                      </div>
                    </td>
                    <td className="p-4">{emp.title}</td>
                    <td className="p-4">{emp.dept}</td>
                    <td className="p-4 text-text-muted">{emp.email}</td>
                    <td className="p-4">
                      <Badge variant="success">{emp.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Salary payslip generator modal */}
      <Modal
        isOpen={payslipModalOpen}
        onClose={() => setPayslipModalOpen(false)}
        title="Payslip Generation Terminal"
        description="Verify monthly salary structures for release validation."
        footer={
          <div className="flex space-x-2 w-full justify-end">
            <Button variant="outline" onClick={() => setPayslipModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleGeneratePayslip}>
              Generate Payslip
            </Button>
          </div>
        }
      >
        <form onSubmit={handleGeneratePayslip} className="space-y-4">
          <Select
            label="Select Staff Employee *"
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            required
          >
            <option value="">Choose Employee...</option>
            {employees.map(e => (
              <option key={e.id} value={e.name}>{e.name} ({e.title})</option>
            ))}
          </Select>
          
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Basic Pay (₹)"
              type="number"
              value={basicPay}
              onChange={(e) => setBasicPay(e.target.value)}
              required
            />
            <Input
              label="Allowances (₹)"
              type="number"
              value={allowance}
              onChange={(e) => setAllowance(e.target.value)}
              required
            />
            <Input
              label="Deductions (₹)"
              type="number"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
              required
            />
          </div>

          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center text-xs font-bold mt-2">
            <span>Derived Net Salary:</span>
            <span className="text-primary-blue text-sm">{formatIndianCurrency(netSalary)}</span>
          </div>
        </form>
      </Modal>
    </div>
  );
}
