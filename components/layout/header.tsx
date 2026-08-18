"use client";

import React, { useState, useRef, useEffect } from "react";
import { useERP } from "@/context/erp-context";
import { mockUsers, campuses, UserProfile } from "@/lib/mock-data";
import { 
  Bell, 
  Mail, 
  Search, 
  Menu, 
  ChevronDown, 
  User, 
  LogOut, 
  Building2, 
  HelpCircle, 
  Sliders,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const { 
    activeUser, 
    setActiveUser, 
    setActiveView,
    selectedCampus, 
    setSelectedCampus,
    unreadNotificationsCount,
    unreadMessagesCount,
    setSearchOpen,
    mobileMenuOpen,
    setMobileMenuOpen,
    notificationsOpen,
    setNotificationsOpen,
    addToast
  } = useERP();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [campusMenuOpen, setCampusMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const roleRef = useRef<HTMLDivElement>(null);
  const campusRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close menus on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        setRoleMenuOpen(false);
      }
      if (campusRef.current && !campusRef.current.contains(event.target as Node)) {
        setCampusMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRoleSwitch = (user: UserProfile) => {
    setActiveUser(user);
    setActiveView("Dashboard");
    setRoleMenuOpen(false);
  };

  const handleCampusSwitch = (campusName: string) => {
    setSelectedCampus(campusName);
    setCampusMenuOpen(false);
    addToast(`Switched campus view to ${campusName}`, "success");
  };

  return (
    <header className="h-16 border-b border-border-base bg-surface-base sticky top-0 z-20 flex items-center justify-between px-4 md:px-6 shadow-soft select-none">
      {/* Left side: Hamburger (mobile) & Campus Selector */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg text-text-secondary hover:bg-surface-hover focus-ring cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Institution / Campus Selector Dropdown */}
        <div className="relative" ref={campusRef}>
          <button
            onClick={() => setCampusMenuOpen(!campusMenuOpen)}
            className="flex items-center space-x-2 text-xs md:text-sm font-semibold text-text-primary hover:bg-surface-hover px-2.5 py-1.5 rounded-lg border border-border-base cursor-pointer focus-ring"
          >
            <Building2 className="h-4 w-4 text-primary-blue" />
            <span className="hidden sm:inline">Excel Institution - </span>
            <span>{selectedCampus}</span>
            <ChevronDown className="h-3 w-3 text-text-muted" />
          </button>

          {campusMenuOpen && (
            <div className="absolute left-0 mt-2 w-56 rounded-xl bg-surface-base border border-border-base shadow-medium z-30 py-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
              <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block px-3 py-1 border-b border-border-base/50 mb-1">
                Select Campus
              </span>
              {campuses.map((campus) => (
                <button
                  key={campus.id}
                  onClick={() => handleCampusSwitch(campus.name)}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover flex items-center justify-between cursor-pointer",
                    selectedCampus === campus.name && "text-primary-blue font-semibold bg-primary-blue-light/50"
                  )}
                >
                  <span>{campus.name}</span>
                  {selectedCampus === campus.name && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-blue" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right side: Global Search, Interactive Role Switcher, Alerts, Profile */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Global Search Bar (Trigger CMD+K Modal) */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center space-x-2 text-text-secondary bg-background-base border border-border-base hover:border-border-focus px-3 py-1.5 rounded-lg text-xs md:text-sm w-36 md:w-56 text-left cursor-pointer focus-ring group"
        >
          <Search className="h-4 w-4 text-text-muted group-hover:text-text-secondary transition-colors" />
          <span className="text-text-muted flex-1">Search...</span>
          <kbd className="hidden sm:inline-flex items-center h-4.5 rounded bg-surface-base px-1.5 text-[10px] border border-border-base/80 text-text-muted font-sans font-medium">
            ⌘K
          </kbd>
        </button>

        {/* DEMO-ONLY: Quick Role Switcher Dropdown */}
        <div className="relative" ref={roleRef}>
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center space-x-1.5 text-xs bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100/80 px-2.5 py-1.5 rounded-lg font-bold cursor-pointer focus-ring"
            title="Switch roles to view different dashboards"
          >
            <Sliders className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">View As:</span>
            <span>{activeUser.roleTitle.split(" ")[0]}</span>
            <ChevronDown className="h-3 w-3" />
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl bg-surface-base border border-border-base shadow-medium z-30 py-2 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-3 pb-1.5 border-b border-border-base/50 mb-1.5">
                <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">
                  Interactive Role Switcher
                </span>
                <p className="text-[10px] text-amber-700 font-medium">
                  Switch identities to test unique views.
                </p>
              </div>
              <div className="max-h-64 overflow-y-auto space-y-0.5">
                {Object.values(mockUsers).map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleRoleSwitch(user)}
                    className={cn(
                      "w-full text-left px-3 py-1.5 text-xs hover:bg-surface-hover flex items-center space-x-2.5 cursor-pointer",
                      activeUser.role === user.role && "bg-primary-blue-light/50 text-primary-blue font-semibold"
                    )}
                  >
                    <div className="h-6 w-6 rounded-full bg-primary-navy/10 text-primary-navy flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                      {user.avatar}
                    </div>
                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-text-primary font-bold truncate">{user.name}</span>
                        <span className="text-[9px] font-extrabold text-primary-blue bg-primary-blue-light/50 px-1.5 py-0.5 rounded uppercase flex-shrink-0 ml-1">
                          {user.role === "super_admin" ? "Super Admin" : user.role === "inst_admin" ? "Admin" : user.role}
                        </span>
                      </div>
                      <span className="text-[9px] text-text-muted truncate mt-0.5">{user.roleTitle}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <button
          onClick={() => {
            setNotificationsOpen(true);
            addToast("Opened notification panel", "info", 1000);
          }}
          className="p-2 text-text-secondary hover:bg-surface-hover rounded-lg relative cursor-pointer focus-ring"
        >
          <Bell className="h-5 w-5" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-danger text-white rounded-full text-[9px] font-bold flex items-center justify-center border border-white">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Messages Dropdown */}
        <button
          onClick={() => addToast("Messages panel is currently empty", "info")}
          className="p-2 text-text-secondary hover:bg-surface-hover rounded-lg relative cursor-pointer focus-ring"
        >
          <Mail className="h-5 w-5" />
          {unreadMessagesCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-primary-blue text-white rounded-full text-[9px] font-bold flex items-center justify-center border border-white">
              {unreadMessagesCount}
            </span>
          )}
        </button>

        {/* User Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center space-x-2 text-text-secondary hover:bg-surface-hover p-1.5 rounded-lg cursor-pointer focus-ring"
          >
            <div className="h-7 w-7 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold text-xs shadow-soft">
              {activeUser.avatar}
            </div>
            <span className="hidden md:inline text-xs font-semibold text-text-primary truncate max-w-24">
              {activeUser.name.split(" ")[0]}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-text-muted" />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-surface-base border border-border-base shadow-medium z-30 py-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-3.5 py-2 border-b border-border-base/50 mb-1">
                <span className="text-xs font-bold text-text-primary block truncate">
                  {activeUser.name}
                </span>
                <span className="text-[10px] text-text-muted block truncate">
                  {activeUser.email}
                </span>
              </div>
              <button
                onClick={() => {
                  setProfileMenuOpen(false);
                  addToast("Profile details loaded", "info");
                }}
                className="w-full text-left px-3.5 py-2 text-sm text-text-secondary hover:bg-surface-hover flex items-center cursor-pointer"
              >
                <User className="h-4 w-4 mr-2.5 text-text-muted" />
                <span>My Profile</span>
              </button>
              <button
                onClick={() => {
                  setProfileMenuOpen(false);
                  addToast("Support desk opened", "info");
                }}
                className="w-full text-left px-3.5 py-2 text-sm text-text-secondary hover:bg-surface-hover flex items-center cursor-pointer"
              >
                <HelpCircle className="h-4 w-4 mr-2.5 text-text-muted" />
                <span>Help & Support</span>
              </button>
              <div className="border-t border-border-base/50 my-1" />
              <button
                onClick={() => {
                  setProfileMenuOpen(false);
                  window.location.href = "/login";
                }}
                className="w-full text-left px-3.5 py-2 text-sm text-danger hover:bg-danger-light/50 flex items-center cursor-pointer"
              >
                <LogOut className="h-4 w-4 mr-2.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
