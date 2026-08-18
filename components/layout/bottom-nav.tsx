"use client";

import React from "react";
import { useERP } from "@/context/erp-context";
import { 
  LayoutDashboard, 
  Calendar, 
  CreditCard, 
  Clock, 
  Bell, 
  User,
  Sliders
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const { 
    activeUser, 
    unreadNotificationsCount, 
    setNotificationsOpen,
    addToast
  } = useERP();

  const [activeTab, setActiveTab] = React.useState("Home");

  const handleTabClick = (tabName: string, action?: () => void) => {
    setActiveTab(tabName);
    if (action) {
      action();
    } else {
      addToast(`Switched mobile view to ${tabName}`, "info", 1000);
    }
  };

  // Determine second and third tab icons/labels depending on student, faculty, parent, accountant, or admin
  const getDynamicTabs = () => {
    const role = activeUser.role;
    if (role === "student" || role === "parent") {
      return [
        { label: "Timetable", icon: Clock },
        { label: "Fees", icon: CreditCard }
      ];
    }
    if (role === "faculty") {
      return [
        { label: "Schedules", icon: Clock },
        { label: "Courses", icon: Calendar }
      ];
    }
    if (role === "accountant") {
      return [
        { label: "Payments", icon: CreditCard },
        { label: "Reports", icon: Calendar }
      ];
    }
    // Admin / Management / default
    return [
      { label: "Approvals", icon: Sliders },
      { label: "Finance", icon: CreditCard }
    ];
  };

  const dynamicTabs = getDynamicTabs();
  const Icon1 = dynamicTabs[0].icon;
  const Icon2 = dynamicTabs[1].icon;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 border-t border-border-base bg-surface-base shadow-premium z-30 flex items-center justify-around px-2 pb-safe select-none">
      {/* Home / Dashboard Tab */}
      <button
        onClick={() => handleTabClick("Home")}
        className={cn(
          "flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] font-semibold transition-colors cursor-pointer",
          activeTab === "Home" ? "text-primary-blue" : "text-text-secondary"
        )}
      >
        <LayoutDashboard className="h-5 w-5 mb-0.5" />
        <span>Home</span>
      </button>

      {/* Dynamic Tab 1 */}
      <button
        onClick={() => handleTabClick(dynamicTabs[0].label)}
        className={cn(
          "flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] font-semibold transition-colors cursor-pointer",
          activeTab === dynamicTabs[0].label ? "text-primary-blue" : "text-text-secondary"
        )}
      >
        <Icon1 className="h-5 w-5 mb-0.5" />
        <span>{dynamicTabs[0].label}</span>
      </button>

      {/* Dynamic Tab 2 */}
      <button
        onClick={() => handleTabClick(dynamicTabs[1].label)}
        className={cn(
          "flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] font-semibold transition-colors cursor-pointer",
          activeTab === dynamicTabs[1].label ? "text-primary-blue" : "text-text-secondary"
        )}
      >
        <Icon2 className="h-5 w-5 mb-0.5" />
        <span>{dynamicTabs[1].label}</span>
      </button>

      {/* Notifications Tab */}
      <button
        onClick={() => handleTabClick("Notifications", () => setNotificationsOpen(true))}
        className={cn(
          "flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] font-semibold transition-colors relative cursor-pointer",
          activeTab === "Notifications" ? "text-primary-blue" : "text-text-secondary"
        )}
      >
        <Bell className="h-5 w-5 mb-0.5" />
        <span>Alerts</span>
        {unreadNotificationsCount > 0 && (
          <span className="absolute top-1 right-5 h-4 w-4 bg-danger text-white rounded-full text-[9px] font-bold flex items-center justify-center border border-white">
            {unreadNotificationsCount}
          </span>
        )}
      </button>

      {/* Settings / More Tab */}
      <button
        onClick={() => handleTabClick("Settings")}
        className={cn(
          "flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] font-semibold transition-colors cursor-pointer",
          activeTab === "Settings" ? "text-primary-blue" : "text-text-secondary"
        )}
      >
        <User className="h-5 w-5 mb-0.5" />
        <span>Settings</span>
      </button>
    </div>
  );
}
