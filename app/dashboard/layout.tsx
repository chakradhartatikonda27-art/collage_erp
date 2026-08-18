"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";
import GlobalSearch from "@/components/layout/global-search";
import { Drawer } from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { 
  BellRing, 
  Trash2, 
  CheckCheck, 
  ShieldAlert, 
  CalendarClock, 
  CreditCard 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { 
    sidebarCollapsed, 
    notificationsOpen, 
    setNotificationsOpen,
    unreadNotificationsCount,
    setUnreadNotificationsCount,
    addToast
  } = useERP();

  // Simulated notification list
  const [notifications, setNotifications] = useState([
    { id: "N1", category: "Attendance", priority: "high", title: "12 students have attendance below 75%", desc: "Action needed to dispatch warning letters.", time: "10 mins ago", unread: true },
    { id: "N2", category: "Finance", priority: "medium", title: "Outstanding term fees total: ₹42.30 L", desc: "Reminders scheduled to dispatch automatically in 2 days.", time: "2 hrs ago", unread: true },
    { id: "N3", category: "Academic", priority: "low", title: "Internal marks submission deadline tomorrow", desc: "HRM syllabus progress checklist validation pending.", time: "5 hrs ago", unread: true },
    { id: "N4", category: "Admission", priority: "medium", title: "6 application verifications pending", desc: "IT admin verification check required for document scan.", time: "1 day ago", unread: false }
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    setUnreadNotificationsCount(0);
    addToast("All notifications marked as read", "success");
  };

  const handleNotificationClick = (title: string, id: string) => {
    // Mark as read
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    setUnreadNotificationsCount(prev => Math.max(0, prev - 1));
    
    setNotificationsOpen(false);
    addToast(`Deep-link: Opening details for "${title}"`, "info");
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    setUnreadNotificationsCount(0);
    addToast("Cleared notification logs", "warning");
  };

  return (
    <div className="min-h-screen bg-background-base flex">
      {/* 1. Desktop Persistent Sidebar */}
      <Sidebar />

      {/* 2. Primary layout body wrapper */}
      <div 
        className={cn(
          "flex-1 flex flex-col min-w-0 transition-all duration-300 min-h-screen pb-16 md:pb-0",
          sidebarCollapsed ? "md:pl-20" : "md:pl-64"
        )}
      >
        {/* Header bar containing selectors, role toggles, global search trigger */}
        <Header />

        {/* Dynamic page contents wrapper */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-300">
          {children}
        </main>
      </div>

      {/* 3. Mobile Persistent Bottom Tab Navigation */}
      <BottomNav />

      {/* 4. Global Search Modal (Command Palette) */}
      <GlobalSearch />

      {/* 5. Notification Panel Drawer (Interactive slide out) */}
      <Drawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        title="Institution Notification Center"
        description="Priority updates and compliance alerts."
        footer={
          notifications.length > 0 ? (
            <div className="flex items-center justify-between w-full text-xs font-semibold text-text-secondary select-none">
              <button 
                onClick={handleClearNotifications}
                className="flex items-center text-danger hover:underline cursor-pointer"
              >
                <Trash2 className="h-4 w-4 mr-1.5" />
                <span>Clear Logs</span>
              </button>
              <button 
                onClick={handleMarkAllRead}
                className="flex items-center text-primary-blue hover:underline cursor-pointer"
              >
                <CheckCheck className="h-4 w-4 mr-1.5" />
                <span>Mark All Read</span>
              </button>
            </div>
          ) : undefined
        }
      >
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-text-muted flex flex-col items-center justify-center">
              <BellRing className="h-10 w-10 text-text-muted mb-2 animate-bounce" />
              <span className="text-sm font-semibold">No notifications yet.</span>
            </div>
          ) : (
            notifications.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNotificationClick(item.title, item.id)}
                className={cn(
                  "w-full p-4 rounded-xl border text-left flex items-start space-x-3.5 transition-all cursor-pointer group focus-ring hover:bg-slate-50",
                  item.unread 
                    ? "bg-surface-base border-border-base shadow-soft font-medium" 
                    : "bg-slate-50/50 border-slate-100 opacity-70"
                )}
              >
                <div className="flex-shrink-0 mt-1">
                  {item.category === "Attendance" && <ShieldAlert className="h-5 w-5 text-danger" />}
                  {item.category === "Finance" && <CreditCard className="h-5 w-5 text-warning" />}
                  {item.category === "Academic" && <CalendarClock className="h-5 w-5 text-academic" />}
                  {item.category === "Admission" && <CalendarClock className="h-5 w-5 text-info" />}
                </div>
                
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold tracking-wide uppercase select-none">
                    <span className={cn(
                      item.priority === "high" ? "text-danger" : item.priority === "medium" ? "text-warning" : "text-text-muted"
                    )}>
                      {item.category} • {item.priority}
                    </span>
                    <span className="text-text-muted text-[9px] font-medium">{item.time}</span>
                  </div>
                  <h4 className="text-xs font-bold text-text-primary leading-snug group-hover:text-primary-blue transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-text-secondary leading-normal">
                    {item.desc}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </Drawer>
    </div>
  );
}
