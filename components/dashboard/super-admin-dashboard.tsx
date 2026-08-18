"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import { KPICard } from "./widgets/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { 
  Server, 
  Database, 
  ShieldCheck, 
  Activity, 
  PlusCircle, 
  Key, 
  RefreshCw,
  Cpu,
  Layers,
  Globe,
  Radio,
  Clock
} from "lucide-react";

export default function SuperAdminDashboard() {
  const { activeUser, addToast } = useERP();

  // Dialog State
  const [provisionModalOpen, setProvisionModalOpen] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [domainName, setDomainName] = useState("");
  const [isProvisioning, setIsProvisioning] = useState(false);

  const handleProvisionOrg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !domainName) return;

    setIsProvisioning(true);
    addToast(`Initializing container stack for ${orgName}...`, "info", 800);

    setTimeout(() => {
      setIsProvisioning(false);
      addToast(`SaaS Tenant ${orgName} provisioned successfully! Web URL: https://${domainName}`, "success");
      setProvisionModalOpen(false);
      setOrgName("");
      setDomainName("");
    }, 1500);
  };

  const sysLogs = [
    { text: "Automatic daily snapshot backup generated.", time: "11:00 PM", date: "18 Aug 2026", type: "success" },
    { text: "Port binding verified for cluster thread #14.", time: "10:14 PM", date: "18 Aug 2026", type: "info" },
    { text: "Security certificates (SSL) auto-renewed.", time: "09:00 PM", date: "18 Aug 2026", type: "success" },
    { text: "CPU Spike detected: peak 84% on DB node 2.", time: "04:30 PM", date: "18 Aug 2026", type: "warning" }
  ];

  const adminActions = [
    { label: "Provision Tenant", icon: PlusCircle, color: "text-primary-blue bg-primary-blue-light border-primary-blue/20", action: () => setProvisionModalOpen(true) },
    { label: "Manage Clients", icon: Layers, color: "text-academic bg-academic-light border-academic/20", action: () => addToast("SaaS Client Directory loaded", "info") },
    { label: "Credentials Key", icon: Key, color: "text-warning bg-warning-light border-warning/20", action: () => addToast("Security certificate dashboard loaded", "info") },
    { label: "Force Reboot", icon: RefreshCw, color: "text-danger bg-danger-light border-danger/20", action: () => addToast("Platform reboot scheduled in off-peak hours", "warning") }
  ];

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">
            SaaS Platform Administration Control
          </h1>
          <p className="text-xs md:text-sm text-text-secondary mt-1">
            Logged as: {activeUser.name} • {activeUser.roleTitle}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="border-border-base bg-emerald-50 text-success font-bold py-1 px-3">
            System Status: 100% Online
          </Badge>
        </div>
      </div>

      {/* SaaS Platform KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <KPICard title="Active Organizations" value="128" change="SaaS Tenant Subscriptions" isPositive={true} type="info" />
        <KPICard title="Registered Users" value="84.6K" change="Across all campuses" isPositive={true} type="academic" />
        <KPICard title="MRR Collections" value="₹4.82 Cr" change="+12.4% vs last month" isPositive={true} type="success" />
        <KPICard title="Gateway Health" value="99.98%" change="API response averages" isPositive={true} type="success" />
        <KPICard title="Platform CPU Load" value="28%" change="Average across 4 clusters" isPositive={true} type="info" />
        <KPICard title="Memory Consumption" value="42%" change="Heap usage check OK" isPositive={true} type="neutral" />
      </div>

      {/* System Admin Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Global SaaS Operations & Provisioning</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {adminActions.map((action, idx) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={idx}
                  onClick={action.action}
                  className="flex flex-col items-center justify-center p-4 rounded-xl border border-border-base hover:border-border-focus hover:shadow-soft transition-all duration-300 group cursor-pointer focus-ring"
                >
                  <div className={`h-11 w-11 rounded-lg flex items-center justify-center border mb-3 group-hover:scale-105 transition-transform ${action.color}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-text-primary text-center leading-none">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Platform Logs and Infrastructure Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live system logs */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-4.5 w-4.5 text-primary-blue animate-pulse" />
              <span>Live Infrastructure Audit Trail</span>
            </CardTitle>
            <Badge variant="outline">Live Cluster Feed</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border-base">
              {sysLogs.map((log, idx) => (
                <div key={idx} className="p-4 flex items-start justify-between hover:bg-slate-50 transition-colors">
                  <div className="space-y-1 pr-4">
                    <span className="text-xs font-semibold text-text-primary leading-snug">
                      {log.text}
                    </span>
                    <div className="flex items-center space-x-2 text-[10px] text-text-muted">
                      <span>{log.time}</span>
                      <span>•</span>
                      <span>{log.date}</span>
                    </div>
                  </div>
                  <Badge variant={log.type === "success" ? "success" : log.type === "warning" ? "danger" : "info"}>
                    {log.type.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Database cluster checks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Server className="h-4.5 w-4.5 text-academic" />
              <span>Cluster Thread Monitor</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-text-secondary">Main Database Threads</span>
                <span className="font-bold text-text-primary">12 / 100 Connection Limits</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-success rounded-full" style={{ width: "12%" }} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-text-secondary">ElasticSearch Index Load</span>
                <span className="font-bold text-text-primary">34% Sync Load</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary-blue rounded-full" style={{ width: "34%" }} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-text-secondary">Backup Server Storage</span>
                <span className="font-bold text-text-primary">82% Available</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-success rounded-full" style={{ width: "18%" }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Provision Tenant Modal */}
      <Modal
        isOpen={provisionModalOpen}
        onClose={() => !isProvisioning && setProvisionModalOpen(false)}
        title="Provision New SaaS Tenant"
        description="Fill organization parameters to spin up separate DB clusters."
        footer={
          <div className="flex space-x-2 w-full justify-end">
            <Button variant="outline" onClick={() => setProvisionModalOpen(false)} disabled={isProvisioning}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleProvisionOrg} disabled={isProvisioning}>
              {isProvisioning ? "Provisioning Stack..." : "Initialize Tenant"}
            </Button>
          </div>
        }
      >
        <form onSubmit={handleProvisionOrg} className="space-y-4">
          <Input
            label="Organization Name *"
            placeholder="e.g. Apex Engineering College"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            required
          />
          <Input
            label="Domain Prefix *"
            placeholder="e.g. apex.educare.in"
            value={domainName}
            onChange={(e) => setDomainName(e.target.value)}
            required
          />
        </form>
      </Modal>
    </div>
  );
}
