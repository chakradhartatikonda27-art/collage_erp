"use client";

import React from "react";
import { useERP } from "@/context/erp-context";
import { mockAnnouncements } from "@/lib/mock-data";
import { KPICard } from "./widgets/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, BookOpen, CreditCard } from "lucide-react";

export default function CommonDashboard() {
  const { activeUser, pendingApprovalsCount } = useERP();

  // Pick stats for user type
  const getDuesText = () => {
    if (activeUser.role === "accountant") return "Collected dues: 82% this term";
    return "Operations active";
  };

  return (
    <div className="space-y-6">
      {/* Title greeting */}
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">
          {activeUser.roleTitle} Panel
        </h1>
        <p className="text-xs md:text-sm text-text-secondary mt-1">
          Welcome back, {activeUser.name} • Institution Workspace active
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Operational Status" value="Active" change="All systems operational" isPositive={true} type="info" />
        <KPICard title="Institution Dues" value="₹1.68 Cr" change={getDuesText()} isPositive={true} type="success" />
        <KPICard title="Approvals pending" value={pendingApprovalsCount} change="Review authorization logs" isPositive={false} type="warning" />
        <KPICard title="Helpdesk Tickets" value="0" change="No tickets pending response" isPositive={true} type="success" />
      </div>

      {/* Dashboard widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>System & Operation Metrics</CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-xs text-text-secondary space-y-4">
            <p className="leading-relaxed">
              You are logged in with the role profile: <span className="font-bold text-text-primary">{activeUser.roleTitle}</span>. 
              This panel provides centralized widgets matching administrative access boundaries.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border-base/50 pt-4">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                <span className="font-bold text-text-primary block">Active Sessions</span>
                <span className="text-[10px] text-text-muted block">12 Administrative users active on site</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                <span className="font-bold text-text-primary block">Database Status</span>
                <span className="text-[10px] text-text-muted block">Synced with primary campus cluster (100% health)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notices */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Group Notices</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border-base">
              {mockAnnouncements.slice(0, 3).map((notice) => (
                <div key={notice.id} className="p-3 flex items-start space-x-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary-blue mt-1.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-text-primary block leading-snug truncate">
                      {notice.title}
                    </span>
                    <span className="text-[10px] text-text-muted">{notice.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
