"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, 
  Sparkles, 
  Filter, 
  Download, 
  Building2, 
  ArrowUpRight, 
  Activity,
  Award,
  Zap,
  BookOpen,
  PieChart
} from "lucide-react";

export function TrendingAnalyticsDashboard() {
  // Advanced Filter Options
  const [selectedCampus, setSelectedCampus] = useState("All");
  const [selectedMetric, setSelectedMetric] = useState("Admissions");
  const [selectedYear, setSelectedYear] = useState("2026");

  // Chart data matching campus choices
  const mockDataset: Record<string, {
    slices: { label: string; value: number; color: string; sideColor: string; topColor: string }[];
    trends: { label: string; count: number; change: string; isPositive: boolean }[];
    campusShare: Record<string, number>;
  }> = {
    All: {
      slices: [
        { label: "B.Tech CSE & IT", value: 48, color: "#2563eb", sideColor: "#1d4ed8", topColor: "#60a5fa" },
        { label: "Medical Sciences", value: 24, color: "#7c3aed", sideColor: "#6d28d9", topColor: "#a78bfa" },
        { label: "Commerce & Management", value: 18, color: "#10b981", sideColor: "#047857", topColor: "#34d399" },
        { label: "Architecture & Design", value: 10, color: "#f59e0b", sideColor: "#b45309", topColor: "#fbbf24" }
      ],
      trends: [
        { label: "CSE & Artificial Intelligence", count: 840, change: "+24.5%", isPositive: true },
        { label: "MBBS & Allied Health", count: 420, change: "+12.8%", isPositive: true },
        { label: "MBA Finance & Logistics", count: 310, change: "+8.2%", isPositive: true },
        { label: "B.Arch Urban Planning", count: 180, change: "-2.4%", isPositive: false }
      ],
      campusShare: { EEC: 45, ECCS: 35, ECAP: 20 }
    },
    EEC: {
      slices: [
        { label: "B.Tech CSE & IT", value: 65, color: "#2563eb", sideColor: "#1d4ed8", topColor: "#60a5fa" },
        { label: "B.Tech Mech & Aero", value: 20, color: "#10b981", sideColor: "#047857", topColor: "#34d399" },
        { label: "B.Tech Biotech & Agri", value: 15, color: "#f59e0b", sideColor: "#b45309", topColor: "#fbbf24" }
      ],
      trends: [
        { label: "Computer Science & Eng", count: 680, change: "+32.1%", isPositive: true },
        { label: "Aeronautical Research", count: 180, change: "+14.3%", isPositive: true },
        { label: "Civil & Mech Blocks", count: 110, change: "-5.2%", isPositive: false }
      ],
      campusShare: { EEC: 100, ECCS: 0, ECAP: 0 }
    },
    ECCS: {
      slices: [
        { label: "B.Com Accounting", value: 50, color: "#7c3aed", sideColor: "#6d28d9", topColor: "#a78bfa" },
        { label: "B.Sc Physics & Chem", value: 30, color: "#10b981", sideColor: "#047857", topColor: "#34d399" },
        { label: "BBA Business Admin", value: 20, color: "#f59e0b", sideColor: "#b45309", topColor: "#fbbf24" }
      ],
      trends: [
        { label: "Corporate Secretaryship", count: 320, change: "+18.9%", isPositive: true },
        { label: "Biotechnology Studies", count: 140, change: "+9.5%", isPositive: true },
        { label: "Data Analytics BBA", count: 90, change: "+22.4%", isPositive: true }
      ],
      campusShare: { EEC: 0, ECCS: 100, ECAP: 0 }
    }
  };

  const activeData = mockDataset[selectedCampus] || mockDataset.All;

  // Render conic gradient values dynamically based on slices
  let currentOffset = 0;
  const conicGradientString = activeData.slices.map((slice) => {
    const start = currentOffset;
    currentOffset += slice.value;
    return `${slice.color} ${start}% ${currentOffset}%`;
  }).join(", ");

  const totalKPI = selectedCampus === "EEC" ? "₹14.20 Cr" : selectedCampus === "ECCS" ? "₹9.80 Cr" : "₹28.75 Cr";

  return (
    <div className="space-y-6">
      {/* 1. Header Filter Row */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-lg bg-indigo-950 flex items-center justify-center border border-indigo-900">
            <Filter className="h-4.5 w-4.5 text-indigo-400" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Operational Analytics</span>
            <span className="text-xs font-black text-white leading-none">Interactive Decision Filters</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Select Campus */}
          <select 
            value={selectedCampus}
            onChange={(e) => setSelectedCampus(e.target.value)}
            className="text-xs font-bold text-white bg-slate-950 border border-slate-800 rounded-lg p-2 hover:border-slate-700 outline-none cursor-pointer focus-ring"
          >
            <option value="All">All Campuses</option>
            <option value="EEC">Excel Eng College (EEC)</option>
            <option value="ECCS">Commerce & Science (ECCS)</option>
          </select>

          {/* Select Metric */}
          <select 
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="text-xs font-bold text-white bg-slate-950 border border-slate-800 rounded-lg p-2 hover:border-slate-700 outline-none cursor-pointer focus-ring"
          >
            <option value="Admissions">Admissions</option>
            <option value="Revenue">Fees & Revenue</option>
            <option value="Evaluations">GPA Evaluations</option>
          </select>

          {/* Select Year */}
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="text-xs font-bold text-white bg-slate-950 border border-slate-800 rounded-lg p-2 hover:border-slate-700 outline-none cursor-pointer focus-ring"
          >
            <option value="2026">2026 (Active)</option>
            <option value="2025">2025</option>
          </select>

          <Button 
            variant="ghost" 
            size="sm" 
            className="border border-slate-800 hover:bg-slate-900 text-slate-300"
            onClick={() => alert("Exporting operational dataset CSV...")}
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            <span>CSV</span>
          </Button>
        </div>
      </div>

      {/* 2. Analytical Grid with 3D Conic Pie and 3D Column charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 3D Donut Pie Breakdown */}
        <Card className="lg:col-span-6 bg-slate-900/60 border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-44 h-44 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center space-x-2 text-white">
              <PieChart className="h-4 w-4 text-primary-blue" />
              <span>3D Segmented Distribution Share</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              
              {/* GPU-Accelerated 3D Conic Donut Chart */}
              <div className="relative h-36 w-36 flex-shrink-0 flex items-center justify-center select-none">
                {/* 3D Under-Shadow Layer */}
                <div className="absolute inset-0 rounded-full bg-slate-950/70 blur-md translate-y-3.5 scale-95" />
                
                {/* Tilted Conic Face */}
                <div 
                  className="absolute inset-0 rounded-full flex items-center justify-center transition-all duration-700 ease-in-out border border-white/5"
                  style={{
                    transform: 'perspective(400px) rotateX(32deg) rotateY(-8deg) translateZ(10px)',
                    transformStyle: 'preserve-3d',
                    background: `conic-gradient(from 30deg, ${conicGradientString})`,
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3), 0 12px 24px -5px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  {/* Central Cutout for 3D depth */}
                  <div 
                    className="h-16 w-16 bg-slate-950 rounded-full flex flex-col items-center justify-center border border-white/10"
                    style={{
                      transform: 'translateZ(6px)',
                      boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.8)'
                    }}
                  >
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block leading-none">TOTAL</span>
                    <span className="text-xs font-black text-white mt-1 leading-none">{totalKPI}</span>
                  </div>
                </div>
              </div>

              {/* Legend with interactive Share values */}
              <div className="flex-1 space-y-2.5 w-full">
                {activeData.slices.map((slice, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                    <div className="flex items-center space-x-2.5">
                      <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: slice.color }} />
                      <span className="text-slate-300 font-bold text-[11px] leading-none">{slice.label}</span>
                    </div>
                    <span className="text-white font-extrabold">{slice.value}%</span>
                  </div>
                ))}
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Right Column: 3D Isometric Cylinder Column Chart */}
        <Card className="lg:col-span-6 bg-slate-900/60 border-slate-800 relative overflow-hidden">
          <div className="absolute top-10 left-10 w-44 h-44 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center space-x-2 text-white">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>3D Perspective Registrations Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-48 flex items-end justify-between gap-4 border-b border-slate-800 pb-1 pt-6 px-2 select-none">
              {activeData.trends.map((item, idx) => {
                const maxCount = Math.max(...activeData.trends.map(t => t.count));
                const percentHeight = (item.count / maxCount) * 100;
                
                // Color cycles
                const colorHex = idx === 0 ? "#2563eb" : idx === 1 ? "#7c3aed" : idx === 2 ? "#10b981" : "#f59e0b";
                const sideHex = idx === 0 ? "#1d4ed8" : idx === 1 ? "#6d28d9" : idx === 2 ? "#047857" : "#b45309";
                const topHex = idx === 0 ? "#60a5fa" : idx === 1 ? "#a78bfa" : idx === 2 ? "#34d399" : "#fbbf24";

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center group relative">
                    {/* 3D Column Column Wrapper */}
                    <div 
                      className="w-8 relative transition-all duration-500" 
                      style={{ 
                        height: `${percentHeight}%`,
                        perspective: '400px',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {/* Front face of 3D column */}
                      <div 
                        className="absolute inset-0 rounded-t"
                        style={{ 
                          backgroundColor: colorHex,
                          transform: 'translateZ(5px)',
                          boxShadow: '5px 5px 15px rgba(0,0,0,0.3)'
                        }}
                      />

                      {/* Top face of 3D column */}
                      <div 
                        className="absolute left-0 w-full h-[10px]"
                        style={{ 
                          top: '-10px',
                          backgroundColor: topHex,
                          transform: 'rotateX(90deg) translateY(-5px)',
                          transformOrigin: 'top center'
                        }}
                      />

                      {/* Right side face of 3D column */}
                      <div 
                        className="absolute top-0 right-0 h-full w-[10px]"
                        style={{ 
                          marginRight: '-10px',
                          backgroundColor: sideHex,
                          transform: 'rotateY(90deg) translateX(5px)',
                          transformOrigin: 'right center'
                        }}
                      />
                    </div>

                    {/* Numeric Count hovering */}
                    <span className="text-[10px] font-black text-white mt-3.5 leading-none">{item.count}</span>
                    <span className="text-[8px] font-bold text-slate-500 mt-1 truncate max-w-[64px] block uppercase tracking-wider">{item.label.split(" ")[0]}</span>
                    
                    {/* Badge change details */}
                    <span className={`text-[8px] font-black mt-1 ${item.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {item.change}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* 3. Trending Dashboard Hot Topics / Announcements */}
      <Card className="bg-slate-900/60 border-slate-800">
        <CardHeader>
          <CardTitle className="text-xs font-extrabold uppercase text-slate-400 tracking-wider flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-warning animate-pulse" />
              <span>Live Campus Trending Index</span>
            </span>
            <Badge variant="success" className="bg-emerald-950 text-emerald-400 border-emerald-500/20 text-[9px] font-black uppercase">
              Operational Audit Normal
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2 relative overflow-hidden">
            <div className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </div>
            <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest block">Registrations Peak</span>
            <span className="text-xs font-black text-white block">Artificial Intelligence Admission Surge</span>
            <p className="text-[10px] text-slate-400 leading-normal font-semibold">
              B.Tech Artificial Intelligence & Data Science registrations are up 32% this month, hitting quota limits.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2 relative overflow-hidden">
            <div className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </div>
            <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-widest block">Placements Trend</span>
            <span className="text-xs font-black text-white block">8 Global Technology MoU Signed</span>
            <p className="text-[10px] text-slate-400 leading-normal font-semibold">
              Corporate placements cell finalized core training partnerships with Infosys, Wipro, and Tech Mahindra.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2 relative overflow-hidden">
            <div className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </div>
            <span className="text-[8px] font-bold text-amber-400 uppercase tracking-widest block">Infrastructure</span>
            <span className="text-xs font-black text-white block">New Computational Server Active</span>
            <p className="text-[10px] text-slate-400 leading-normal font-semibold">
              EEC technical center provisioned and turned online a new 64-core research virtualization cluster.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
