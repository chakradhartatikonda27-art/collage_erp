"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useERP } from "@/context/erp-context";
import { mockUsers, UserProfile } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { GraduationCap, Building2, Lock, Mail, ChevronRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { setActiveUser, addToast } = useERP();
  
  // Default selected role is Chairman
  const [selectedKey, setSelectedKey] = useState<string>("chairman");
  const [email, setEmail] = useState(mockUsers.chairman.email);
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;
    setSelectedKey(key);
    setEmail(mockUsers[key].email);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate server auth latency
    setTimeout(() => {
      setIsLoading(false);
      const user = mockUsers[selectedKey];
      setActiveUser(user);
      addToast(`Logged in successfully as ${user.name}`, "success");
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50/50">
      {/* Left side: Branding Panel */}
      <div className="bg-primary-navy lg:w-7/12 flex flex-col justify-between p-8 md:p-16 text-white relative overflow-hidden select-none">
        {/* Top brand */}
        <div className="flex items-center space-x-3 z-10">
          <div className="h-10 w-10 rounded-xl bg-primary-blue flex items-center justify-center shadow-soft">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-wide block leading-none">EDUCARE</span>
            <span className="text-[10px] text-slate-400 font-bold tracking-wider mt-0.5 uppercase">ERP Platform</span>
          </div>
        </div>

        {/* Branding pitch */}
        <div className="space-y-6 z-10 max-w-lg my-12 lg:my-0">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-blue-200">
            <Building2 className="h-3.5 w-3.5" />
            <span>Commercial-Grade ERP SaaS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            One platform for your entire institution.
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed font-medium">
            Streamline admissions, scheduling, fees, evaluations, grading, and multi-campus analytics in one unified enterprise portal.
          </p>
        </div>

        {/* Footer credentials */}
        <div className="z-10 text-xs text-slate-400 font-semibold tracking-wide">
          © 2026 EduCare SaaS Corp. All rights reserved.
        </div>

        {/* Decorative graphic pattern */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none select-none translate-x-12 translate-y-12 scale-110">
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="150" stroke="white" strokeWidth="20" />
            <circle cx="200" cy="200" r="100" stroke="white" strokeWidth="20" />
          </svg>
        </div>
      </div>

      {/* Right side: Interactive Form Panel */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-16 lg:px-20 bg-surface-base">
        <div className="mx-auto w-full max-w-sm space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-text-primary tracking-tight">
              Sign In
            </h2>
            <p className="text-xs font-semibold text-text-muted">
              Choose a preset profile role to explore the ERP immediately.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Presets dropdown */}
            <Select 
              label="Explore Preset Role" 
              value={selectedKey} 
              onChange={handleRoleChange}
            >
              <option value="super_admin">Vikram Malhotra — Super Admin (All Access)</option>
              <option value="chairman">Rajesh Kumar — Chairman (Analytics View)</option>
              <option value="principal">Dr. Priya Sharma — Principal (Operational View)</option>
              <option value="admin">Ramesh Sharma — Admin Staff (Task View)</option>
              <option value="faculty">Prof. Suresh Iyer — Faculty (Teacher View)</option>
              <option value="student">Ananya Sen — Student (Academic View)</option>
              <option value="parent">Subrata Sen — Parent (Ward View)</option>
              <option value="accountant">Amit Sharma — Accountant (Finance View)</option>
            </Select>

            {/* Email input */}
            <Input
              label="Email Address"
              type="email"
              placeholder="name@institution.com"
              leftIcon={<Mail className="h-4 w-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password input */}
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="h-4 w-4" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-xs font-bold text-text-secondary select-none">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border-base text-primary-blue focus-ring" defaultChecked />
                <span>Remember me</span>
              </label>
              <button 
                type="button"
                onClick={() => addToast("Password reset simulation dispatched", "success")}
                className="text-primary-blue hover:text-primary-blue-hover cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Sign in trigger */}
            <Button
              type="submit"
              className="w-full flex items-center justify-center font-bold"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Loading Session...</span>
              ) : (
                <div className="flex items-center justify-center">
                  <span>Sign In</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
