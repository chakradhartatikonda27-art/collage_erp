"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Clock,
  ChevronRight,
  ArrowRight,
  User,
  CreditCard
} from "lucide-react";

export default function SuperAdminDashboard() {
  const { activeUser, addToast } = useERP();

  const handleActionClick = (actionName: string) => {
    addToast(`Triggered: ${actionName} workflow`, "info");
  };

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

  const quickAccessItems = [
    { label: "Provision Tenant", icon: PlusCircle, bg: "bg-blue-50 text-blue-600 hover:bg-blue-100", action: () => setProvisionModalOpen(true) },
    { label: "Manage Clients", icon: Layers, bg: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100", action: () => addToast("SaaS Client Directory loaded", "info") },
    { label: "Credentials Key", icon: Key, bg: "bg-orange-50 text-orange-600 hover:bg-orange-100", action: () => addToast("Security certificate dashboard loaded", "info") },
    { label: "Force Reboot", icon: RefreshCw, bg: "bg-rose-50 text-rose-600 hover:bg-rose-100", action: () => addToast("Platform reboot scheduled in off-peak hours", "warning") }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-1 animate-in fade-in duration-300">
      
      {/* 1. Header Banner Card */}
      <Card className="border-slate-100 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-full bg-slate-900 flex items-center justify-center shadow-md">
              <Server className="h-7 w-7 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-black text-slate-900 leading-snug">
                Good Morning, {activeUser.name}! 👋
              </h2>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                {activeUser.roleTitle || "SaaS Systems Director"} | Platform Console
              </p>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="bg-emerald-50 text-success font-black border-emerald-250 py-1.5 px-3">
              System Status: 100% Online
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* 2. Color-Coded Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {/* Active Organizations */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-blue-100/85 flex items-center justify-center text-blue-600">
            <Layers className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">128</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Campuses</span>
          </div>
          <span className="text-[9px] text-blue-500 font-bold">Active Tenants</span>
        </div>

        {/* Registered Users */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-emerald-100/85 flex items-center justify-center text-emerald-600">
            <User className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">84.6K</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Active Users</span>
          </div>
          <span className="text-[9px] text-emerald-500 font-bold">Across all nodes</span>
        </div>

        {/* MRR Collections */}
        <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-purple-100/85 flex items-center justify-center text-purple-600">
            <CreditCard className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-xl font-black text-slate-900">₹4.82 Cr</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">MRR</span>
          </div>
          <span className="text-[9px] text-purple-500 font-bold">+12% vs last month</span>
        </div>

        {/* Gateway Health */}
        <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-sky-100/85 flex items-center justify-center text-sky-600">
            <Globe className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">99.98%</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Gateway</span>
          </div>
          <span className="text-[9px] text-sky-500 font-bold">API Health OK</span>
        </div>

        {/* CPU Load */}
        <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-orange-100/85 flex items-center justify-center text-orange-600">
            <Cpu className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">28%</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">CPU Load</span>
          </div>
          <span className="text-[9px] text-orange-500 font-bold">4 cluster blocks</span>
        </div>

        {/* Memory Consumption */}
        <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm">
          <div className="h-9 w-9 rounded-xl bg-rose-100/85 flex items-center justify-center text-rose-600">
            <Database className="h-4.5 w-4.5" />
          </div>
          <div className="my-2.5">
            <span className="text-2xl font-black text-slate-900">42%</span>
            <span className="text-[10px] text-slate-500 font-bold block uppercase mt-0.5">Memory</span>
          </div>
          <span className="text-[9px] text-rose-500 font-bold">Heap check normal</span>
        </div>
      </div>

      {/* 3. Quick Access Actions */}
      <Card className="border-slate-100 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">SaaS Tenant Operations</h3>
            <button 
              onClick={() => handleActionClick("Quick Actions View All")}
              className="text-xs font-black text-blue-600 hover:underline flex items-center cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
            {quickAccessItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={item.action}
                  className="w-full flex flex-col items-center justify-center p-3.5 border border-slate-100 hover:border-slate-350 rounded-2xl group focus-ring cursor-pointer bg-slate-50/40 hover:bg-slate-50"
                >
                  <div className={`h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-slate-100/50 ${item.bg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-655 mt-2.5 text-center group-hover:text-slate-900 leading-none">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 4. Infrastructure Logs & DB Thread Monitors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Live Infrastructure Logs */}
        <Card className="border-slate-100 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4 pb-1.5 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Infrastructure Audit Trail</h3>
              <Badge variant="outline" className="bg-indigo-50 border-indigo-200 text-indigo-600 font-bold">Live Cluster Feed</Badge>
            </div>
            
            <div className="space-y-4">
              {sysLogs.map((log, idx) => (
                <div key={idx} className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 text-left">
                    <div className="h-8.5 w-8.5 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                      <Clock className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-slate-800 block">
                        {log.text}
                      </span>
                      <span className="text-[10px] text-slate-450 font-semibold block mt-0.5">
                        {log.time} • {log.date}
                      </span>
                    </div>
                  </div>
                  <Badge 
                    variant={log.type === "success" ? "success" : log.type === "warning" ? "danger" : "default"}
                    className="text-[8px] font-black uppercase flex-shrink-0"
                  >
                    {log.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Database cluster check */}
        <Card className="border-slate-100 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4 pb-1.5 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Cluster Thread Monitor</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-800">Main Database Threads</span>
                  <span className="font-black text-slate-900">12 / 100 Limits</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: "12%" }} />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-800">ElasticSearch Index Sync</span>
                  <span className="font-black text-slate-900">34% Sync Load</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: "34%" }} />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-800">Backup Server Storage</span>
                  <span className="font-black text-slate-900">82% Available</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: "18%" }} />
                </div>
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
        <form onSubmit={handleProvisionOrg} className="space-y-4 text-left">
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
