"use client";

import React from "react";
import { useERP } from "@/context/erp-context";
import { mockAnnouncements } from "@/lib/mock-data";
import { KPICard } from "./widgets/kpi-card";
import { 
  AdmissionsTrendChart, 
  FinancialOverviewPie, 
  CampusPerformanceBars, 
  RevenueTrendChart 
} from "./widgets/charts";
import { TrendingAnalyticsDashboard } from "./widgets/trending-analytics";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Users, 
  UserCheck, 
  Award, 
  HelpCircle,
  FileText,
  Bell,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function ChairmanDashboard() {
  const { activeUser, addToast, setSelectedCampus } = useERP();

  // Define some custom quick stats for management overview card
  const highlights = [
    { label: "Placement Rate", value: "92.6%", trend: "+5.7% vs last month", type: "success" },
    { label: "Student Satisfaction", value: "4.6 / 5", trend: "+3.2% vs last month", type: "info" },
    { label: "Faculty Retention", value: "88.9%", trend: "+2.8% vs last month", type: "academic" },
    { label: "Research Publications", value: "56 Articles", trend: "+11.1% vs last month", type: "warning" }
  ];

  const handleActionClick = (actionName: string) => {
    addToast(`Triggered: ${actionName} workflow`, "success");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Greeting */}
      <div className="bg-primary-navy text-white rounded-2xl p-6 relative overflow-hidden shadow-medium flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-amber-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Strategic Operations Control</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Good Morning, {activeUser.name} 👋
          </h1>
          <p className="text-sm text-slate-300">
            &ldquo;Empowering minds, shaping futures.&rdquo; Here is your institutional health overview today.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 z-10">
          <button 
            onClick={() => handleActionClick("Institution Overview Report")}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg px-4 py-2 text-xs font-bold transition-all flex items-center cursor-pointer focus-ring"
          >
            <span>Overview Report</span>
            <FileText className="h-4 w-4 ml-1.5" />
          </button>
          <button 
            onClick={() => handleActionClick("Finance Dashboard")}
            className="bg-primary-blue hover:bg-primary-blue-hover text-white rounded-lg px-4 py-2 text-xs font-bold transition-all flex items-center cursor-pointer shadow-soft focus-ring"
          >
            <span>Financials</span>
            <DollarSign className="h-4 w-4 ml-1.5" />
          </button>
        </div>
        {/* Background graphic motif */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none select-none">
          <svg width="220" height="150" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 150L73.5359 86.4385C77.458 83.0456 83.2505 83.0768 87.1352 86.5126L127.365 122.094C131.238 125.519 137.013 125.568 140.942 122.209L220 54.4373" stroke="white" strokeWidth="15" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* 3D Campus Hub Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        <div className="space-y-3 z-10 max-w-xl text-left">
          <div className="inline-flex items-center space-x-2 bg-indigo-550/15 px-3 py-1 rounded-full border border-indigo-500/20 text-xs font-bold text-indigo-400">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>Virtual Operational Center</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white leading-tight">
            Strategic Management Center
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed font-semibold">
            Monitor real-time infrastructure threads, educational performance charts, admissions flow, and candidate queues from a single virtual space.
          </p>
        </div>
        <div className="w-full md:w-36 h-36 rounded-xl overflow-hidden border border-slate-850 flex-shrink-0 shadow-2xl relative group">
          <img 
            src="/futuristic_college_3d.jpg" 
            alt="Virtual Hub 3D" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-2">
            <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">3D Campus Model</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard title="Total Students" value="8,642" change="+6.8% vs last month" isPositive={true} type="info" />
        <KPICard title="Total Faculty" value="562" change="+4.3% vs last month" isPositive={true} type="academic" />
        <KPICard title="Programs Run" value="128" change="Across all institutions" isPositive={true} type="neutral" />
        <KPICard title="Active Campuses" value="12" change="Across 3 states" isPositive={true} type="neutral" />
        <KPICard title="Admissions YTD" value="2,314" change="+8.9% vs last year" isPositive={true} type="success" />
        <KPICard title="Revenue YTD" value="₹28.75 Cr" change="+12.4% vs last year" isPositive={true} type="success" />
      </div>

      {/* Primary analytical visualization charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Admissions & Fee Trends</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <AdmissionsTrendChart />
            <RevenueTrendChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Channels YTD</CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex items-center justify-center min-h-[220px]">
            <FinancialOverviewPie />
          </CardContent>
        </Card>
      </div>

      {/* Real-time Trending & Analytical Graphs */}
      <TrendingAnalyticsDashboard />

      {/* Secondary cards, announcements and metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Bars */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Campus Performance</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <CampusPerformanceBars />
          </CardContent>
        </Card>

        {/* Dynamic Highlights / Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Key Strategic Quality Index</CardTitle>
            <HelpCircle className="h-4 w-4 text-text-muted" />
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            {highlights.map((high, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
                    {high.label}
                  </span>
                  <span className="text-lg font-extrabold text-text-primary block mt-0.5">
                    {high.value}
                  </span>
                </div>
                <Badge variant={high.type === "success" ? "success" : "info"}>
                  {high.trend.split(" ")[0]}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent announcements list */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Important Group Notices & Press Releases</CardTitle>
          <button 
            onClick={() => handleActionClick("All Notices")}
            className="text-xs font-bold text-primary-blue hover:text-primary-blue-hover flex items-center cursor-pointer focus-ring"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border-base">
            {mockAnnouncements.slice(0, 3).map((notice) => (
              <div key={notice.id} className="p-4 flex items-start justify-between hover:bg-slate-50 transition-colors">
                <div className="space-y-1 pr-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant={notice.category === "Academic" ? "academic" : "default"}>
                      {notice.category}
                    </Badge>
                    <span className="text-xs text-text-muted">{notice.date}</span>
                    {notice.isNew && (
                      <span className="h-1.5 w-1.5 rounded-full bg-danger" />
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-text-primary leading-snug">
                    {notice.title}
                  </h4>
                  <p className="text-[11px] text-text-muted">
                    Published by: {notice.sender}
                  </p>
                </div>
                <button
                  onClick={() => handleActionClick(`View Notice ${notice.id}`)}
                  className="text-xs font-semibold text-text-muted hover:text-text-primary border border-border-base rounded-lg px-2.5 py-1 flex items-center flex-shrink-0 cursor-pointer focus-ring"
                >
                  Read
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
