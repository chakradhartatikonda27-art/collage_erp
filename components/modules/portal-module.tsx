"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  BookOpen, 
  Compass, 
  Eye, 
  CheckCircle,
  Users,
  Briefcase,
  HelpCircle,
  Send,
  Sparkles,
  Info,
  Calendar
} from "lucide-react";

export default function PortalModule() {
  const { addToast, setAdmissions } = useERP();
  
  // Navigation Menu state
  const [activeMenu, setActiveMenu] = useState("About Us");
  const [activeSubItem, setActiveSubItem] = useState("Our Mission");

  // Portal Editor contents
  const [missionText, setMissionText] = useState("To deliver world-class experiential learning and research excellence.");
  const [visionText, setVisionText] = useState("To be a premier global center for technological and management advancement.");
  
  // Send Enquiry Form states
  const [enquiryName, setEnquiryName] = useState("");
  const [enquiryEmail, setEnquiryEmail] = useState("");
  const [enquiryProgram, setEnquiryProgram] = useState("B.Tech");
  const [enquiryText, setEnquiryText] = useState("");

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryEmail) return;

    // Simulate pushing to Admissions pipeline
    const newLead = {
      id: `L-${Date.now()}`,
      name: enquiryName,
      email: enquiryEmail,
      phone: "+91 99002 11029",
      date: "19 Aug 2026",
      program: enquiryProgram,
      stage: "Verification" as const,
      status: "Applied" as const,
      docsVerified: false,
      documentCheck: { transcripts: false, identification: false, recommendation: false }
    };

    setAdmissions(prev => [newLead, ...prev]);
    addToast(`Enquiry registered! Candidate ${enquiryName} added to Admissions pipeline.`, "success");
    
    // Reset
    setEnquiryName("");
    setEnquiryEmail("");
    setEnquiryText("");
  };

  // Mega menu structure from the reference image
  const megaMenu = [
    {
      id: "About Us",
      label: "About Us",
      icon: Info,
      items: ["Our Mission", "Our Vision", "Our Values", "Why Choose Us", "Achievements", "Milestones", "Gallery"]
    },
    {
      id: "Branches",
      label: "Branches",
      icon: Building2,
      items: ["Branch Locations", "Branch Directory", "Infrastructure", "Facilities", "Branch Events", "Reach Us"]
    },
    {
      id: "Courses",
      label: "Courses",
      icon: BookOpen,
      items: ["All Courses", "Undergraduate", "Postgraduate", "Professional Courses", "Course Structure", "Course Fee"]
    },
    {
      id: "Admissions",
      label: "Admissions",
      icon: Compass,
      items: ["Admission Process", "Eligibility Criteria", "Apply Online", "Important Dates", "Documents Required", "Fee Structure"]
    },
    {
      id: "Resources",
      label: "Resources",
      icon: HelpCircle,
      items: ["Study Materials", "E-Library", "Downloads", "Notice Board", "Academic Calendar", "Forms & Templates"]
    },
    {
      id: "Our Team",
      label: "Our Team",
      icon: Users,
      items: ["Faculty Directory", "Department Heads", "Visiting Faculty", "Admin Staff", "Support Staff", "Library Staff"]
    },
    {
      id: "Contact Us",
      label: "Contact Us",
      icon: Mail,
      items: ["Contact Information", "Send Enquiry", "Feedback", "Support", "FAQs", "Live Chat"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">
          Public Website Directory & CMS
        </h1>
        <p className="text-xs md:text-sm text-text-secondary mt-1">
          Configure public portal menus and monitor candidate submissions.
        </p>
      </div>

      {/* Mega Menu Interactive Component */}
      <Card className="overflow-hidden border-primary-blue/20">
        <div className="bg-primary-navy p-4 flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 text-white select-none">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary-blue flex items-center justify-center font-black text-xs text-white">
              E
            </div>
            <div>
              <span className="font-extrabold text-xs tracking-wider block">INSTITUTION PORTAL</span>
              <span className="text-[9px] text-slate-400 font-bold block uppercase mt-0.5">Mega Menu Preview</span>
            </div>
          </div>
          <Badge variant="outline" className="border-primary-blue/30 text-primary-blue-light font-bold text-[9px] mt-2 md:mt-0">
            Interactive Mockup
          </Badge>
        </div>

        {/* Mega Menu Grid */}
        <div className="bg-slate-50 border-b border-border-base p-2 overflow-x-auto">
          <div className="flex min-w-[800px] justify-between text-xs font-bold text-text-secondary">
            {megaMenu.map((menu, idx) => {
              const IconComponent = menu.icon;
              const isActive = activeMenu === menu.id;
              return (
                <button
                  key={menu.id}
                  onClick={() => {
                    setActiveMenu(menu.id);
                    setActiveSubItem(menu.items[0]);
                  }}
                  className={`flex items-center space-x-1.5 py-2 px-3.5 rounded-lg transition-all cursor-pointer ${
                    isActive 
                      ? "bg-white border border-border-base text-primary-blue shadow-soft font-extrabold" 
                      : "hover:bg-slate-100 hover:text-text-primary"
                  }`}
                >
                  <span className="text-text-muted text-[10px]">{idx + 1}.</span>
                  <IconComponent className="h-4 w-4" />
                  <span>{menu.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dropdown Items display area */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
          {/* Sub menu listing */}
          <div className="space-y-1.5 border-r border-border-base/50 pr-4">
            <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block mb-3">
              {activeMenu} Navigation
            </span>
            {megaMenu.find(m => m.id === activeMenu)?.items.map((sub) => {
              const isSelected = activeSubItem === sub;
              return (
                <button
                  key={sub}
                  onClick={() => setActiveSubItem(sub)}
                  className={`w-full text-left rounded-lg py-2 px-3 text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-primary-blue-light/50 text-primary-blue font-bold"
                      : "text-text-secondary hover:bg-slate-50 hover:text-text-primary"
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>

          {/* Active Preview Area */}
          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border-base/50">
              <h3 className="text-sm font-bold text-text-primary">
                Preview: {activeMenu} &gt; {activeSubItem}
              </h3>
              <Badge variant="academic">CMS Live Mode</Badge>
            </div>

            {/* Render conditional previews based on selection */}
            <div className="min-h-[220px] bg-slate-50/50 rounded-xl border border-slate-100 p-6 flex flex-col justify-center">
              
              {/* About Us -> Mission & Vision */}
              {activeMenu === "About Us" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">Institutional Mission Editor</span>
                    <textarea
                      value={missionText}
                      onChange={(e) => setMissionText(e.target.value)}
                      className="w-full text-xs font-semibold text-text-primary p-3 rounded-lg border border-border-base bg-white focus-ring outline-none"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">Institutional Vision Editor</span>
                    <textarea
                      value={visionText}
                      onChange={(e) => setVisionText(e.target.value)}
                      className="w-full text-xs font-semibold text-text-primary p-3 rounded-lg border border-border-base bg-white focus-ring outline-none"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button variant="primary" size="sm" onClick={() => addToast("CMS changes saved successfully", "success")}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}

              {/* Branches -> Branch locations */}
              {activeMenu === "Branches" && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 bg-white rounded-lg border border-border-base shadow-soft space-y-1">
                      <span className="font-bold text-text-primary block">Bengaluru Campus (HQ)</span>
                      <p className="text-text-secondary text-[11px]">Excel Group Tech Park, Electronic City Phase 1</p>
                      <span className="text-[10px] text-text-muted block">Direct line: +91 80 4930219</span>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-border-base shadow-soft space-y-1">
                      <span className="font-bold text-text-primary block">Pune Campus</span>
                      <p className="text-text-secondary text-[11px]">Hinjewadi IT Phase 3, Pune Expressway</p>
                      <span className="text-[10px] text-text-muted block">Direct line: +91 20 8820493</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full font-bold">
                    Add New Branch Location
                  </Button>
                </div>
              )}

              {/* Courses -> list */}
              {activeMenu === "Courses" && (
                <div className="space-y-4 text-xs">
                  <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">Current Course Registries</span>
                  <div className="space-y-2">
                    {[
                      { name: "B.Tech Computer Science & Eng.", type: "Undergraduate", fee: "₹1,80,000 / Year" },
                      { name: "Master of Business Administration", type: "Postgraduate", fee: "₹2,20,000 / Year" },
                      { name: "B.Sc Artificial Intelligence & Data", type: "Undergraduate", fee: "₹1,50,000 / Year" }
                    ].map((course, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-white rounded-lg border border-border-base shadow-soft">
                        <div>
                          <span className="font-bold text-text-primary block">{course.name}</span>
                          <span className="text-[9px] text-text-muted">{course.type}</span>
                        </div>
                        <Badge variant="outline" className="font-bold text-text-primary bg-slate-50">{course.fee}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Admissions process */}
              {activeMenu === "Admissions" && (
                <div className="space-y-4 text-xs text-text-secondary">
                  <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">Step-by-step application process map</span>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Badge variant="academic" className="rounded-full h-5 w-5 flex items-center justify-center p-0 flex-shrink-0">1</Badge>
                      <div>
                        <span className="font-bold text-text-primary block text-xs">Online registration</span>
                        <p className="text-[10px] text-text-muted">Fill out the basic details on the apply online form.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Badge variant="academic" className="rounded-full h-5 w-5 flex items-center justify-center p-0 flex-shrink-0">2</Badge>
                      <div>
                        <span className="font-bold text-text-primary block text-xs">Document Verification</span>
                        <p className="text-[10px] text-text-muted">Submit your academic transcripts and identity documentation.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Badge variant="academic" className="rounded-full h-5 w-5 flex items-center justify-center p-0 flex-shrink-0">3</Badge>
                      <div>
                        <span className="font-bold text-text-primary block text-xs">Provisional Admission</span>
                        <p className="text-[10px] text-text-muted">Clear fee payment invoice values to complete university registry onboarding.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Resources */}
              {activeMenu === "Resources" && (
                <div className="space-y-3 text-xs">
                  <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">Notice Board & Announcements</span>
                  <div className="p-3 bg-white rounded-lg border border-border-base shadow-soft flex items-center justify-between">
                    <div>
                      <span className="font-bold text-text-primary block">Term 2 Exam schedule released</span>
                      <span className="text-[9px] text-text-muted">Dated: 18 Aug 2026</span>
                    </div>
                    <Button variant="outline" size="sm">Download PDF</Button>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-border-base shadow-soft flex items-center justify-between">
                    <div>
                      <span className="font-bold text-text-primary block">Independence Day holiday declaration</span>
                      <span className="text-[9px] text-text-muted">Dated: 14 Aug 2026</span>
                    </div>
                    <Badge variant="outline" className="text-text-muted">Cleared</Badge>
                  </div>
                </div>
              )}

              {/* Our Team */}
              {activeMenu === "Our Team" && (
                <div className="space-y-3 text-xs">
                  <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">Core Faculty Directory Registry</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 bg-white rounded-lg border border-border-base shadow-soft flex items-center space-x-2.5">
                      <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px]">SI</div>
                      <div>
                        <span className="font-semibold text-text-primary block">Prof. Suresh Iyer</span>
                        <span className="text-[9px] text-text-muted">CS Head of Department</span>
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-border-base shadow-soft flex items-center space-x-2.5">
                      <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px]">AN</div>
                      <div>
                        <span className="font-semibold text-text-primary block">Dr. Ananya Nair</span>
                        <span className="text-[9px] text-text-muted">Associate Dean, Humanities</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Us - Enquiry Form */}
              {activeMenu === "Contact Us" && (
                <form onSubmit={handleSendEnquiry} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Candidate Name *"
                      placeholder="e.g. Aarav Mehta"
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      required
                    />
                    <Input
                      label="Email Address *"
                      type="email"
                      placeholder="name@gmail.com"
                      value={enquiryEmail}
                      onChange={(e) => setEnquiryEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      label="Intended Course *"
                      value={enquiryProgram}
                      onChange={(e) => setEnquiryProgram(e.target.value)}
                    >
                      <option value="B.Tech">B.Tech (Computer Science)</option>
                      <option value="M.Tech">M.Tech (Data Analytics)</option>
                      <option value="BBA">BBA (Marketing)</option>
                    </Select>
                    <Input
                      label="Question / Details"
                      placeholder="Explain admission deadlines..."
                      value={enquiryText}
                      onChange={(e) => setEnquiryText(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button variant="primary" type="submit" className="font-bold flex items-center">
                      <Send className="h-3.5 w-3.5 mr-1.5" />
                      <span>Send Enquiry</span>
                    </Button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
