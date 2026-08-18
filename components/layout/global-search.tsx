"use client";

import React, { useState, useEffect, useRef } from "react";
import { useERP } from "@/context/erp-context";
import { mockSearchData } from "@/lib/mock-data";
import { Search, X, Users, FileText, FileSpreadsheet, CreditCard, ChevronRight } from "lucide-react";

export default function GlobalSearch() {
  const { searchOpen, setSearchOpen, addToast } = useERP();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
    }
  }, [searchOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    if (searchOpen) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [searchOpen, setSearchOpen]);

  if (!searchOpen) return null;

  // Filter records based on query
  const lowercaseQuery = query.toLowerCase();

  const filteredStudents = lowercaseQuery
    ? mockSearchData.students.filter(
        (s) =>
          s.name.toLowerCase().includes(lowercaseQuery) ||
          s.rollNo.toLowerCase().includes(lowercaseQuery) ||
          s.program.toLowerCase().includes(lowercaseQuery)
      )
    : mockSearchData.students.slice(0, 2); // default recommendations

  const filteredFaculty = lowercaseQuery
    ? mockSearchData.faculty.filter(
        (f) =>
          f.name.toLowerCase().includes(lowercaseQuery) ||
          f.dept.toLowerCase().includes(lowercaseQuery)
      )
    : mockSearchData.faculty.slice(0, 1);

  const filteredDocs = lowercaseQuery
    ? mockSearchData.documents.filter((d) =>
        d.name.toLowerCase().includes(lowercaseQuery)
      )
    : mockSearchData.documents.slice(0, 1);

  const filteredInvoices = lowercaseQuery
    ? mockSearchData.invoices.filter(
        (i) =>
          i.invoiceNo.toLowerCase().includes(lowercaseQuery) ||
          i.student.toLowerCase().includes(lowercaseQuery)
      )
    : mockSearchData.invoices.slice(0, 1);

  const hasResults =
    filteredStudents.length > 0 ||
    filteredFaculty.length > 0 ||
    filteredDocs.length > 0 ||
    filteredInvoices.length > 0;

  const handleSelectResult = (category: string, name: string) => {
    setSearchOpen(false);
    addToast(`Selected ${category}: "${name}"`, "success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setSearchOpen(false)}
      />

      {/* Search dialog */}
      <div className="relative w-full max-w-xl rounded-xl bg-surface-base border border-border-base shadow-premium flex flex-col max-h-[70vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-10">
        {/* Search header input */}
        <div className="flex items-center px-4 py-3.5 border-b border-border-base">
          <Search className="h-5 w-5 text-text-muted mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search students, faculty, invoices, documents... (e.g. Ananya)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-text-primary placeholder-text-muted focus:outline-none"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover cursor-pointer transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[50vh]">
          {/* Category: Students */}
          {filteredStudents.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block mb-1.5 px-2">
                Students
              </span>
              <div className="space-y-0.5">
                {filteredStudents.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => handleSelectResult("Student", student.name)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-hover cursor-pointer group text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-primary-blue-light text-primary-blue flex items-center justify-center">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-text-primary block">
                          {student.name}
                        </span>
                        <span className="text-xs text-text-muted">
                          {student.rollNo} • {student.program} • {student.dept}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Category: Faculty */}
          {filteredFaculty.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block mb-1.5 px-2">
                Faculty
              </span>
              <div className="space-y-0.5">
                {filteredFaculty.map((fac) => (
                  <button
                    key={fac.id}
                    onClick={() => handleSelectResult("Faculty", fac.name)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-hover cursor-pointer group text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-academic-light text-academic flex items-center justify-center">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-text-primary block">
                          {fac.name}
                        </span>
                        <span className="text-xs text-text-muted">
                          {fac.title} • {fac.dept}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Category: Documents */}
          {filteredDocs.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block mb-1.5 px-2">
                Documents
              </span>
              <div className="space-y-0.5">
                {filteredDocs.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => handleSelectResult("Document", doc.name)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-hover cursor-pointer group text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-slate-100 text-text-secondary flex items-center justify-center">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-text-primary block truncate max-w-sm">
                          {doc.name}
                        </span>
                        <span className="text-xs text-text-muted">
                          {doc.type} • {doc.size} • Uploaded by {doc.uploadedBy}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Category: Invoices */}
          {filteredInvoices.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block mb-1.5 px-2">
                Invoices & Fees
              </span>
              <div className="space-y-0.5">
                {filteredInvoices.map((inv) => (
                  <button
                    key={inv.id}
                    onClick={() => handleSelectResult("Invoice", inv.invoiceNo)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-hover cursor-pointer group text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-success-light text-success flex items-center justify-center">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-text-primary block">
                          {inv.invoiceNo} — {inv.amount}
                        </span>
                        <span className="text-xs text-text-muted">
                          Student: {inv.student} • Date: {inv.date} • Status: {inv.status}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {!hasResults && (
            <div className="p-8 text-center text-text-muted">
              No results found for &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 bg-slate-50 border-t border-border-base text-[10px] text-text-muted flex justify-between select-none">
          <span>Search matches all indexed campus entities</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
