"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

// 1. Line/Area Chart showing admissions trend (Jan - May)
export function AdmissionsTrendChart() {
  const data = [920, 1240, 1560, 1890, 2314];
  const months = ["Jan", "Feb", "Mar", "Apr", "May"];
  const max = 2500;
  
  // Convert points to SVG coords (width: 500, height: 200)
  const width = 500;
  const height = 150;
  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * (width - 40) + 20;
    const y = height - (val / max) * (height - 30) - 10;
    return { x, y, val };
  });

  const pathD = `M ${points.map(p => `${p.x} ${p.y}`).join(" L ")}`;
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  const [activePoint, setActivePoint] = useState<number | null>(null);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase select-none">
          Admissions Trend (YTD)
        </span>
        {activePoint !== null && (
          <span className="text-xs font-bold text-primary-blue bg-primary-blue-light px-2 py-0.5 rounded-full select-none animate-pulse">
            {months[activePoint]}: {points[activePoint].val} Students
          </span>
        )}
      </div>

      <div className="relative h-44 w-full bg-slate-50/50 rounded-xl border border-slate-100 p-2 flex items-center justify-center">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          {/* Grid lines */}
          <line x1="20" y1="10" x2={width - 20} y2="10" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="20" y1="70" x2={width - 20} y2="70" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="20" y1="130" x2={width - 20} y2="130" stroke="#f1f5f9" strokeWidth="1" />

          {/* Area fill */}
          <path d={areaD} fill="url(#blueGradient)" opacity="0.15" />

          {/* Line stroke */}
          <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Interactive dots */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle
                cx={p.x}
                cy={p.y}
                r={activePoint === idx ? "6" : "4"}
                className="fill-white stroke-primary-blue stroke-[3px] transition-all cursor-pointer"
                onMouseEnter={() => setActivePoint(idx)}
                onMouseLeave={() => setActivePoint(null)}
              />
              {/* Text label underneath */}
              <text
                x={p.x}
                y={height - 2}
                textAnchor="middle"
                className="fill-text-muted text-[8px] font-bold select-none"
              >
                {months[idx]}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

// 2. Revenue Collection Area Trend (Jan - May)
export function RevenueTrendChart() {
  const data = [0.85, 1.10, 1.32, 1.54, 1.68]; // in Crores
  const months = ["Jan", "Feb", "Mar", "Apr", "May"];
  const max = 2.0;
  
  const width = 500;
  const height = 150;
  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * (width - 40) + 20;
    const y = height - (val / max) * (height - 30) - 10;
    return { x, y, val };
  });

  const pathD = `M ${points.map(p => `${p.x} ${p.y}`).join(" L ")}`;
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  const [activePoint, setActivePoint] = useState<number | null>(null);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase select-none">
          Monthly Fee Collections
        </span>
        {activePoint !== null && (
          <span className="text-xs font-bold text-success bg-success-light px-2 py-0.5 rounded-full select-none">
            {months[activePoint]}: ₹{points[activePoint].val} Cr
          </span>
        )}
      </div>

      <div className="relative h-44 w-full bg-slate-50/50 rounded-xl border border-slate-100 p-2 flex items-center justify-center">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          {/* Grid lines */}
          <line x1="20" y1="10" x2={width - 20} y2="10" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="20" y1="70" x2={width - 20} y2="70" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="20" y1="130" x2={width - 20} y2="130" stroke="#f1f5f9" strokeWidth="1" />

          {/* Area fill */}
          <path d={areaD} fill="url(#greenGradient)" opacity="0.15" />

          {/* Line stroke */}
          <path d={pathD} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Interactive dots */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle
                cx={p.x}
                cy={p.y}
                r={activePoint === idx ? "6" : "4"}
                className="fill-white stroke-success stroke-[3px] transition-all cursor-pointer"
                onMouseEnter={() => setActivePoint(idx)}
                onMouseLeave={() => setActivePoint(null)}
              />
              <text
                x={p.x}
                y={height - 2}
                textAnchor="middle"
                className="fill-text-muted text-[8px] font-bold select-none"
              >
                {months[idx]}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

// 3. Simple Pie Chart for Financial Breakdown
export function FinancialOverviewPie() {
  const slices = [
    { label: "Tuition Fees", value: 64, color: "#2563eb" },
    { label: "Other Fees", value: 18, color: "#8b5cf6" },
    { label: "Grants & Funding", value: 13, color: "#f59e0b" },
    { label: "Other Income", value: 5, color: "#14b8a6" }
  ];

  // Helper values for generating SVG segments
  let cumulativePercent = 0;

  function getCoordinatesForPercent(percent: number) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  return (
    <div className="w-full">
      <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block mb-3.5 select-none">
        Revenue Breakdown YTD
      </span>
      <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-4">
        {/* Render simple pie visual using combined paths or simple CSS conic-gradient */}
        <div 
          className="h-28 w-28 rounded-full border border-slate-100 flex-shrink-0 flex items-center justify-center relative shadow-soft"
          style={{
            background: `conic-gradient(
              #2563eb 0% 64%, 
              #8b5cf6 64% 82%, 
              #f59e0b 82% 95%, 
              #14b8a6 95% 100%
            )`
          }}
        >
          {/* Inner cutout for donut chart */}
          <div className="h-16 w-16 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
            <span className="text-[9px] font-bold text-text-muted tracking-wider uppercase leading-none">Total</span>
            <span className="text-xs font-extrabold text-text-primary mt-0.5 leading-none">₹28.75Cr</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-1.5 mt-4 sm:mt-0 w-full">
          {slices.map((slice, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: slice.color }} />
                <span className="text-text-secondary font-medium">{slice.label}</span>
              </div>
              <span className="text-text-primary font-bold">{slice.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 4. Bar Graph for Campus Performance Index
export function CampusPerformanceBars() {
  const campuses = [
    { name: "Hyderabad Campus", students: "3,245", performance: 92, color: "bg-success" },
    { name: "Bengaluru Campus", students: "2,174", performance: 88, color: "bg-primary-blue" },
    { name: "Vijayawada Campus", students: "1,856", performance: 85, color: "bg-academic" },
    { name: "Warangal Campus", students: "1,367", performance: 82, color: "bg-info" }
  ];

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase select-none">
          Campus Quality Metrics
        </span>
        <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase select-none">
          Performance
        </span>
      </div>
      <div className="space-y-3.5">
        {campuses.map((camp, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="font-semibold text-text-primary">
                {camp.name}
                <span className="text-[10px] text-text-muted font-normal ml-1.5">
                  ({camp.students} Students)
                </span>
              </div>
              <span className="font-bold text-text-primary">{camp.performance}%</span>
            </div>
            {/* Bar Track */}
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={cn("h-full rounded-full transition-all duration-500", camp.color)} 
                style={{ width: `${camp.performance}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
