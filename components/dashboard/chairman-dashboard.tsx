"use client";

import React from "react";
import { useERP } from "@/context/erp-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Calendar, 
  FileText, 
  BookOpen, 
  Percent, 
  CreditCard, 
  Bell, 
  ChevronRight, 
  ArrowRight,
  ClipboardList,
  BookMarked,
  Briefcase,
  TrendingUp,
  Award,
  Book,
  HelpCircle,
  Megaphone,
  User,
  Clock,
  DollarSign,
  Building2
} from "lucide-react";
import { 
  AdmissionsTrendChart, 
  FinancialOverviewPie, 
  CampusPerformanceBars, 
  RevenueTrendChart 
} from "./widgets/charts";

export default function ChairmanDashboard() {
  const { activeUser, addToast } = useERP();

  const handleActionClick = (actionName: string) => {
    addToast(`Triggered: ${actionName} workflow`, "success");
  };

  const quickAccessItems = [
    { label: "Overview Report", icon: FileText, bg: "bg-blue-50 text-blue-600 hover:bg-blue-100", action: () => handleActionClick("Overview Report") },
    { label: "Financials", icon: DollarSign, bg: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100", action: () => handleActionClick("Financials Report") },
    { label: "Campuses", icon: Building2, bg: "bg-orange-50 text-orange-600 hover:bg-orange-100", action: () => handleActionClick("Campuses Directory") },
    { label: "Announcements", icon: Megaphone, bg: "bg-purple-50 text-purple-600 hover:bg-purple-100", action: () => handleActionClick("Announcements board") }
  ];

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
                {activeUser.roleTitle || "Chairman"} | Strategic Control Center
              </p>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-600 font-black py-1.5 px-3.5">
              Trust Executive Board
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* 2. Color-Coded Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {/* Total Students */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-blue-100/80 flex items-center justify-center text-blue-600">
            <User className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">8,642</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Total Students</span>
          </div>
          <span className="text-[9px] text-blue-500 font-bold">+6.8% vs last month</span>
        </div>

        {/* Total Faculty */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-600">
            <User className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">562</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Total Faculty</span>
          </div>
          <span className="text-[9px] text-emerald-500 font-bold">+4.3% vs last month</span>
        </div>

        {/* Programs */}
        <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-orange-100/80 flex items-center justify-center text-orange-600">
            <BookOpen className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">128</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Programs Run</span>
          </div>
          <span className="text-[9px] text-orange-500 font-bold">Across all colleges</span>
        </div>

        {/* Active Campuses */}
        <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-purple-100/80 flex items-center justify-center text-purple-600">
            <Building2 className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">12</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Campuses</span>
          </div>
          <span className="text-[9px] text-purple-500 font-bold">Across 3 states</span>
        </div>

        {/* Admissions YTD */}
        <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-sky-100/80 flex items-center justify-center text-sky-600">
            <Calendar className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">2,314</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Admissions</span>
          </div>
          <span className="text-[9px] text-sky-500 font-bold">+8.9% vs last year</span>
        </div>

        {/* Revenue YTD */}
        <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-rose-100/80 flex items-center justify-center text-rose-600">
            <CreditCard className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-xl font-black text-slate-900">₹28.75Cr</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Revenue</span>
          </div>
          <span className="text-[9px] text-rose-500 font-bold">+12% vs last year</span>
        </div>
      </div>

      {/* 3. Quick Access */}
      <Card className="border-slate-100 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Strategic Actions</h3>
            <button 
              onClick={() => handleActionClick("Management View All")}
              className="text-xs font-black text-blue-600 hover:underline flex items-center cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
            {quickAccessItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={item.action}
                  className="w-full flex flex-col items-center justify-center p-3.5 border border-slate-100 hover:border-slate-350 rounded-2xl group focus-ring cursor-pointer bg-slate-50/40 hover:bg-slate-50"
                >
                  <div className={`h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-slate-100/50 ${item.bg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-655 mt-2.5 text-center group-hover:text-slate-900 leading-none">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 4. Symmetrical Layout for Financial Breakdown & Admissions Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Revenue Breakdown + Admissions Trend */}
        <Card className="border-slate-100 shadow-sm bg-white">
          <CardContent className="p-6 space-y-6">
            <div className="pb-1.5 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase text-left">Revenue Channels YTD</h3>
            </div>
            <FinancialOverviewPie />

            <div className="pt-4 border-t border-slate-100">
              <AdmissionsTrendChart />
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Campus Quality Metrics + Admissions Trend */}
        <Card className="border-slate-100 shadow-sm bg-white">
          <CardContent className="p-6 space-y-6">
            <div className="pb-1.5 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase text-left">Campus Performance Quality Index</h3>
            </div>
            <CampusPerformanceBars />

            <div className="pt-4 border-t border-slate-100">
              <RevenueTrendChart />
            </div>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}
