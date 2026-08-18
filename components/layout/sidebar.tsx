"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import { cn } from "@/lib/utils";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Calendar, 
  Clock, 
  FileText, 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  File, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LayoutDashboard,
  ShieldCheck,
  Building,
  Briefcase,
  BookMarked,
  Home,
  Bus,
  MessageSquare,
  ClipboardList,
  AlertTriangle,
  Globe
} from "lucide-react";

interface MenuItem {
  title: string;
  icon: React.ComponentType<any>;
  href?: string;
  roles?: string[]; // Allowed roles (if omitted, allowed for all)
}

interface MenuGroup {
  name: string;
  items: MenuItem[];
}

export default function Sidebar() {
  const { activeUser, sidebarCollapsed, setSidebarCollapsed, addToast, activeView, setActiveView } = useERP();

  const menuGroups: MenuGroup[] = [
    {
      name: "Academics",
      items: [
        { title: "Dashboard", icon: LayoutDashboard },
        { title: "Students", icon: Users, roles: ["super_admin", "inst_admin", "chairman", "principal", "faculty", "accountant"] },
        { title: "Courses", icon: BookOpen, roles: ["super_admin", "inst_admin", "chairman", "principal", "faculty", "student"] },
        { title: "Subjects", icon: ClipboardList, roles: ["super_admin", "inst_admin", "chairman", "principal", "faculty", "student"] },
        { title: "Timetable", icon: Clock, roles: ["super_admin", "inst_admin", "chairman", "principal", "faculty", "student"] },
        { title: "Attendance", icon: Calendar, roles: ["super_admin", "inst_admin", "chairman", "principal", "faculty", "student", "parent"] },
        { title: "Examinations", icon: FileText, roles: ["super_admin", "inst_admin", "chairman", "principal", "faculty", "student", "parent"] }
      ]
    },
    {
      name: "Administration",
      items: [
        { title: "Admissions", icon: GraduationCap, roles: ["super_admin", "inst_admin", "chairman", "principal"] },
        { title: "HR & Payroll", icon: Briefcase, roles: ["super_admin", "inst_admin", "chairman", "principal"] },
        { title: "Library", icon: BookMarked, roles: ["super_admin", "inst_admin", "chairman", "principal", "faculty", "student", "librarian"] },
        { title: "Hostel", icon: Home, roles: ["super_admin", "inst_admin", "chairman", "principal", "student", "hostel_admin"] },
        { title: "Transport", icon: Bus, roles: ["super_admin", "inst_admin", "chairman", "principal", "student", "faculty", "transport_manager"] }
      ]
    },
    {
      name: "Finance",
      items: [
        { title: "Fees & Collections", icon: CreditCard, roles: ["super_admin", "inst_admin", "chairman", "principal", "accountant", "student", "parent"] },
        { title: "Expenses", icon: DollarSign, roles: ["super_admin", "inst_admin", "chairman", "principal", "accountant"] },
        { title: "Budgets", icon: TrendingUp, roles: ["super_admin", "inst_admin", "chairman", "principal", "accountant"] }
      ]
    },
    {
      name: "System",
      items: [
        { title: "Documents", icon: File },
        { title: "Communication", icon: MessageSquare },
        { title: "Settings", icon: Settings }
      ]
    }
  ];

  const handleNavClick = (title: string) => {
    setActiveView(title);
    addToast(`Navigating to ${title} section`, "info", 1000);
  };

  // Filter groups and items based on role permission boundaries
  const filteredGroups = menuGroups.map(group => {
    const items = group.items.filter(item => {
      if (!item.roles) return true;
      return item.roles.includes(activeUser.role);
    });
    return { ...group, items };
  }).filter(group => group.items.length > 0);

  return (
    <aside
      className={cn(
        "bg-primary-navy text-white h-screen fixed left-0 top-0 z-30 flex flex-col transition-all duration-300 border-r border-slate-800/80 shadow-medium md:flex hidden",
        sidebarCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Logo & Name */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800/80">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="h-9 w-9 rounded-lg bg-primary-blue flex items-center justify-center flex-shrink-0 shadow-soft">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col select-none">
              <span className="font-bold text-sm tracking-wide leading-none text-white">EDUCARE</span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider mt-0.5">INSTITUTION</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        {/* Featured Public Portal Promotion for Owners */}
        {!sidebarCollapsed && ["super_admin", "inst_admin", "chairman", "principal"].includes(activeUser.role) && (
          <button
            onClick={() => handleNavClick("Public Portal")}
            className={cn(
              "w-full mb-6 p-3 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group cursor-pointer focus-ring",
              activeView === "Public Portal"
                ? "bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-primary-blue shadow-lg shadow-primary-blue/10"
                : "bg-slate-900/50 border-slate-800 hover:border-primary-blue/50 hover:bg-slate-900/80"
            )}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-blue/5 rounded-full blur-xl group-hover:bg-primary-blue/10 transition-colors pointer-events-none" />
            <div className="flex items-center space-x-3">
              <div className={cn(
                "h-9 w-9 rounded-lg flex items-center justify-center border transition-transform duration-500 group-hover:scale-105",
                activeView === "Public Portal"
                  ? "bg-primary-blue border-primary-blue-light text-white animate-pulse"
                  : "bg-slate-800 border-slate-700 text-primary-blue-light"
              )}>
                <Globe className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white tracking-tight">Public Website</span>
                  <span className="text-[8px] font-black text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-1 py-0.5 rounded leading-none select-none">
                    CMS LIVE
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block truncate font-medium mt-0.5">
                  Mega Menu & Enquiries
                </span>
              </div>
            </div>
          </button>
        )}

        {/* If collapsed, show a glowing icon */}
        {sidebarCollapsed && ["super_admin", "inst_admin", "chairman", "principal"].includes(activeUser.role) && (
          <button
            onClick={() => handleNavClick("Public Portal")}
            className={cn(
              "w-12 h-12 mx-auto mb-6 rounded-xl flex items-center justify-center border transition-all cursor-pointer focus-ring relative group",
              activeView === "Public Portal"
                ? "bg-primary-blue border-primary-blue text-white shadow-soft shadow-primary-blue/20"
                : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-primary-blue hover:text-white"
            )}
            title="Public Website CMS Portal"
          >
            <Globe className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute left-14 bg-primary-navy border border-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-medium z-50">
              Public Portal (CMS)
            </span>
          </button>
        )}

        <div className="space-y-6">
          {filteredGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            {!sidebarCollapsed && (
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block px-3 mb-2">
                {group.name}
              </span>
            )}
            <div className="space-y-1">
              {group.items.map((item, itemIdx) => {
                const IconComponent = item.icon;
                const isSelected = activeView === item.title;
                return (
                  <button
                    key={itemIdx}
                    onClick={() => handleNavClick(item.title)}
                    className={cn(
                      "w-full flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all cursor-pointer group focus-ring",
                      isSelected
                        ? "bg-primary-blue text-white shadow-soft"
                        : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                    )}
                    title={sidebarCollapsed ? item.title : undefined}
                  >
                    <IconComponent className={cn("h-4 w-4 flex-shrink-0", sidebarCollapsed ? "mx-auto h-5 w-5" : "mr-3")} />
                    {!sidebarCollapsed && <span>{item.title}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Collapse Trigger Footer Button */}
      <div className="p-3 border-t border-slate-800/80">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="w-full flex items-center justify-center h-9 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer transition-colors focus-ring"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <div className="flex items-center text-xs">
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>Collapse Sidebar</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
