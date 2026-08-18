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
  AlertTriangle
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
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
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
