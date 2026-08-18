"use client";

import React, { useState } from "react";
import { useERP, FeeInvoice } from "@/context/erp-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { formatIndianCurrency } from "@/lib/utils";
import { Search, DollarSign, CreditCard, Clock, CheckCircle2, IndianRupee } from "lucide-react";

export default function FinanceModule() {
  const { invoices, setInvoices, addToast } = useERP();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Payment states
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<FeeInvoice | null>(null);
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [isProcessing, setIsProcessing] = useState(false);

  // Filter invoices
  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inv.student.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenPay = (inv: FeeInvoice) => {
    setSelectedInvoice(inv);
    setPayModalOpen(true);
  };

  const handleProcessPayment = () => {
    if (!selectedInvoice) return;

    setIsProcessing(true);
    addToast(`Initializing Secure Gateway: ${paymentMode}...`, "info", 800);

    setTimeout(() => {
      setIsProcessing(false);
      
      // Update invoice state
      setInvoices(prev => prev.map(inv => 
        inv.id === selectedInvoice.id 
          ? { ...inv, status: "Paid" as const, paid: inv.amount } 
          : inv
      ));

      addToast(`Payment of ${formatIndianCurrency(selectedInvoice.amount - selectedInvoice.paid)} recorded successfully!`, "success");
      setPayModalOpen(false);
      setSelectedInvoice(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">
          Financial Management Console
        </h1>
        <p className="text-xs md:text-sm text-text-secondary mt-1">
          Review accounts, trace fee collection logs, and invoice payments.
        </p>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-emerald-50/20 border-emerald-100/50">
          <CardContent className="p-4 flex items-center space-x-3.5">
            <div className="h-10 w-10 rounded-lg bg-success text-white flex items-center justify-center">
              <IndianRupee className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Today&apos;s Collection</span>
              <span className="text-lg font-black text-text-primary block mt-0.5">₹8.45 L</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50/20 border-blue-100/50">
          <CardContent className="p-4 flex items-center space-x-3.5">
            <div className="h-10 w-10 rounded-lg bg-primary-blue text-white flex items-center justify-center">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Monthly Collection</span>
              <span className="text-lg font-black text-text-primary block mt-0.5">₹1.68 Cr</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-50/20 border-red-100/50">
          <CardContent className="p-4 flex items-center space-x-3.5">
            <div className="h-10 w-10 rounded-lg bg-danger text-white flex items-center justify-center">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Outstanding Dues</span>
              <span className="text-lg font-black text-text-primary block mt-0.5">₹42.30 L</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 border-border-base">
          <CardContent className="p-4 flex items-center space-x-3.5">
            <div className="h-10 w-10 rounded-lg bg-primary-navy text-white flex items-center justify-center">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Budget Variance</span>
              <span className="text-lg font-black text-text-primary block mt-0.5">65% Processed</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Filter Bar */}
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="relative flex-1 w-full">
            <Input
              placeholder="Search by student name or invoice reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4 text-text-muted" />}
              className="w-full"
            />
          </div>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-44"
            >
              <option value="All">All Invoices</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => { setSearchQuery(""); setStatusFilter("All"); }}
              className="flex-shrink-0"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 border-b border-border-base text-text-secondary font-bold uppercase tracking-wider select-none">
                <tr>
                  <th className="p-4">Invoice Reference</th>
                  <th className="p-4">Student</th>
                  <th className="p-4">Amount Invoice</th>
                  <th className="p-4">Amount Paid</th>
                  <th className="p-4">Dues Outstanding</th>
                  <th className="p-4">Issue Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-base text-text-secondary font-medium">
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-text-muted">
                      No invoices found.
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-text-primary">{inv.invoiceNo}</td>
                      <td className="p-4 font-semibold text-text-primary">{inv.student}</td>
                      <td className="p-4">{formatIndianCurrency(inv.amount)}</td>
                      <td className="p-4 text-success">{formatIndianCurrency(inv.paid)}</td>
                      <td className="p-4 text-danger font-semibold">
                        {formatIndianCurrency(inv.amount - inv.paid)}
                      </td>
                      <td className="p-4 text-text-muted">{inv.date}</td>
                      <td className="p-4">
                        <Badge 
                          variant={
                            inv.status === "Paid" 
                              ? "success" 
                              : inv.status === "Pending" 
                              ? "warning" 
                              : "danger"
                          }
                        >
                          {inv.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        {inv.status !== "Paid" ? (
                          <Button 
                            variant="primary" 
                            size="sm" 
                            onClick={() => handleOpenPay(inv)}
                          >
                            Collect
                          </Button>
                        ) : (
                          <Badge variant="outline" className="text-text-muted">Cleared</Badge>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Collector Modal */}
      <Modal
        isOpen={payModalOpen}
        onClose={() => !isProcessing && setPayModalOpen(false)}
        title="Fee Collection Terminal"
        description="Process payment for candidate invoice."
        footer={
          <div className="flex space-x-2 w-full justify-end">
            <Button variant="outline" onClick={() => setPayModalOpen(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleProcessPayment} disabled={isProcessing}>
              {isProcessing ? "Authorizing Payment..." : "Record Payment"}
            </Button>
          </div>
        }
      >
        {selectedInvoice && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs">
              <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">Transaction details</span>
              <div className="flex justify-between">
                <span>Invoice Reference</span>
                <span className="font-bold text-text-primary">{selectedInvoice.invoiceNo}</span>
              </div>
              <div className="flex justify-between">
                <span>Student</span>
                <span className="font-semibold text-text-primary">{selectedInvoice.student}</span>
              </div>
              <div className="flex justify-between border-t border-border-base/50 pt-2 mt-2">
                <span>Amount Invoice</span>
                <span className="text-text-primary font-bold">{formatIndianCurrency(selectedInvoice.amount)}</span>
              </div>
              <div className="flex justify-between text-danger font-bold">
                <span>Outstanding Dues</span>
                <span>{formatIndianCurrency(selectedInvoice.amount - selectedInvoice.paid)}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">Collect Method</span>
              <div className="grid grid-cols-3 gap-2">
                {(["UPI", "Card", "Cash"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPaymentMode(mode)}
                    className={`p-3 rounded-lg border text-xs font-bold text-center transition-colors cursor-pointer focus-ring ${
                      paymentMode === mode 
                        ? "border-primary-blue bg-primary-blue-light/50 text-primary-blue" 
                        : "border-border-base text-text-secondary hover:border-border-focus"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
