"use client";

import React, { useState } from "react";
import { useERP } from "@/context/erp-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { 
  GraduationCap, 
  Globe, 
  Info, 
  Building2, 
  BookOpen, 
  Compass, 
  HelpCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ExternalLink,
  ChevronDown,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function PublicLandingPage() {
  const { addToast, setAdmissions } = useERP();
  
  // Navigation states
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  // Form states
  const [enquiryName, setEnquiryName] = useState("");
  const [enquiryEmail, setEnquiryEmail] = useState("");
  const [enquiryProgram, setEnquiryProgram] = useState("B.Tech CSE");
  const [enquiryText, setEnquiryText] = useState("");

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryEmail) return;

    // Simulate pushing to Admissions pipeline
    const newLead = {
      id: `L-${Date.now()}`,
      name: enquiryName,
      email: enquiryEmail,
      phone: "+91 99655 23999",
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

  const megaMenu = [
    {
      id: "about",
      label: "About Us",
      icon: Info,
      items: ["Our Mission & Vision", "Our Core Values", "Achievements & Milestones", "Virtual Campus Gallery"]
    },
    {
      id: "branches",
      label: "Campuses",
      icon: Building2,
      items: ["Technical Campus (EEC)", "Commerce & Science College", "Architecture & Planning College", "Medical & Nursing Wing"]
    },
    {
      id: "courses",
      label: "Programs",
      icon: BookOpen,
      items: ["All Courses & Curriculums", "Undergraduate Admissions", "Postgraduate Studies", "Scholarship Fee Structures"]
    },
    {
      id: "admissions",
      label: "Admissions",
      icon: Compass,
      items: ["Admission Registration", "Eligibility Cutoffs", "Important Dates & Calendars", "Onboarding Help Desk"]
    }
  ];

  const realBranches = [
    {
      name: "Excel Engineering College (Autonomous)",
      desc: "Premier engineering center with state-of-the-art computational labs and aeronautical research blocks.",
      location: "NH-544, Pallakkapalayam, Komarapalayam, Tamil Nadu 637303",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80",
      phone: "+91 99655 23999"
    },
    {
      name: "Excel College for Commerce & Science",
      desc: "Focusing on corporate administration, accounting sciences, physics, and biotechnology courses.",
      location: "NH-544, Pallakkapalayam, Komarapalayam, Tamil Nadu 637303",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
      phone: "+91 99655 33370"
    },
    {
      name: "Excel College of Architecture & Planning",
      desc: "Nurturing professional design, urban planning, spatial grids, and structural design disciplines.",
      location: "NH-544, Pallakkapalayam, Komarapalayam, Tamil Nadu 637303",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
      phone: "+91 99655 33370"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-primary-blue selection:text-white">
      {/* 1. Header Navigation Bar (Glassmorphic) */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-xl bg-primary-blue flex items-center justify-center shadow-lg shadow-primary-blue/30">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col select-none">
              <span className="font-extrabold text-sm tracking-wider text-white leading-none">EXCEL GROUP</span>
              <span className="text-[9px] text-slate-400 font-bold tracking-wider mt-0.5">OF INSTITUTIONS</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center space-x-1 text-xs font-bold text-slate-300">
            {megaMenu.map((menu) => (
              <div 
                key={menu.id}
                className="relative"
                onMouseEnter={() => setActiveMegaMenu(menu.id)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className="flex items-center space-x-1 px-3.5 py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-colors cursor-pointer">
                  <span>{menu.label}</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </button>

                {/* Dropdown Menu Panel (Mega Menu layout) */}
                {activeMegaMenu === menu.id && (
                  <div className="absolute left-0 mt-0.5 w-60 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2.5 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                    <div className="space-y-0.5">
                      {menu.items.map((subItem) => (
                        <button
                          key={subItem}
                          onClick={() => {
                            setActiveMegaMenu(null);
                            addToast(`CMS Navigation: Opening "${subItem}"`, "info");
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-slate-350 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer font-semibold"
                        >
                          {subItem}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button 
              onClick={() => addToast("Contact details loaded", "info")}
              className="px-3.5 py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </nav>

          {/* Action Login button */}
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button 
                variant="primary" 
                className="font-bold text-xs shadow-lg shadow-primary-blue/20 flex items-center"
              >
                <span>Portal Log In</span>
                <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Presentation Block (3D Parallax feel) */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-900">
        {/* Glowing backdrop graphics */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary-blue/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Pitch */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-primary-blue/10 px-3.5 py-1.5 rounded-full border border-primary-blue/20 text-xs font-bold text-blue-400">
              <Building2 className="h-3.5 w-3.5 text-blue-400" />
              <span>Sri Rengaswamy Educational Trust (SRET)</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              Shaping the <span className="bg-gradient-to-r from-blue-450 to-indigo-400 bg-clip-text text-transparent">Tech Leaders</span> of Tomorrow.
            </h1>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Join Excel Group of Institutions. Over 130 acres of integrated academic clusters offering autonomous Engineering, Commerce, Architecture, and Medical sciences.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-3">
              <a href="#apply" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full sm:w-auto font-black px-6 py-5 shadow-lg shadow-primary-blue/20 text-sm">
                  <span>Register for Admissions</span>
                  <ArrowRight className="h-4.5 w-4.5 ml-1.5" />
                </Button>
              </a>
              <Link href="/login" className="w-full sm:w-auto">
                <Button variant="ghost" className="w-full sm:w-auto font-bold border border-slate-800 hover:border-slate-750 bg-transparent hover:bg-slate-900/60 text-slate-300 hover:text-white px-6 py-5 text-sm">
                  Staff & Student Login
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Floating 3D Image Collage */}
          <div className="lg:col-span-6 flex justify-center items-center perspective-container select-none">
            <div className="relative w-full max-w-[480px] h-[360px]">
              
              {/* Back Card (Graduation wing) - Top Left */}
              <div 
                className="absolute rounded-2xl overflow-hidden border border-slate-800 shadow-2xl tilt-card float-slow"
                style={{ top: '10px', left: '10px', width: '230px', height: '160px', zIndex: 10 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80" 
                  alt="Graduation Wing" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-3.5">
                  <span className="text-[10px] font-extrabold text-blue-300 tracking-wide uppercase">Technical Wing</span>
                </div>
              </div>

              {/* Middle Card (Central Library) - Bottom Center-Left */}
              <div 
                className="absolute rounded-2xl overflow-hidden border border-slate-800 shadow-2xl tilt-card float-delayed"
                style={{ top: '180px', left: '60px', width: '230px', height: '160px', zIndex: 20 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=500&q=80" 
                  alt="Central Library" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-3.5">
                  <span className="text-[10px] font-extrabold text-indigo-300 tracking-wide uppercase">Central Library</span>
                </div>
              </div>

              {/* Front Main Card (Aeronautical Building) - Middle Right */}
              <div 
                className="absolute rounded-2xl overflow-hidden border border-primary-blue/30 shadow-2xl tilt-card glow-glow"
                style={{ top: '90px', left: '230px', width: '230px', height: '160px', zIndex: 30 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=500&q=80" 
                  alt="EEC Campus" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-blue-dark/80 to-transparent flex items-end p-4">
                  <div>
                    <Badge variant="success" className="text-[8px] tracking-wider font-extrabold uppercase bg-emerald-950 text-emerald-400 border-emerald-500/20 mb-1">
                      Autonomous
                    </Badge>
                    <span className="text-xs font-black text-white block">Excel Engineering College</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. Statistical Ticker */}
      <section className="bg-slate-950 py-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-3xl font-black text-white block">130+</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Acres Campus Area</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-black text-white block">84K+</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Enrolled Candidates</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-black text-white block">128+</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Courses Run</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-black text-white block">98%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Placement Score</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Branch Locations Explorer (3D Tilt Cards) */}
      <section className="py-16 lg:py-24 bg-slate-950 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Explore Our Campuses</h2>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">
              Specialized institutional setups designed for practical, research-focused education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-container">
            {realBranches.map((branch, idx) => (
              <div 
                key={idx} 
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between tilt-card"
              >
                <div className="h-44 w-full overflow-hidden relative">
                  <img src={branch.image} alt={branch.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="font-extrabold text-white block text-sm leading-snug">{branch.name}</span>
                    <p className="text-slate-400 text-xs mt-2 leading-relaxed">{branch.desc}</p>
                  </div>
                  <div className="text-[10px] text-slate-400 border-t border-slate-800/80 pt-3.5 space-y-1">
                    <span className="block truncate font-semibold"><MapPin className="h-3 w-3 inline mr-1.5 text-primary-blue-light" />{branch.location}</span>
                    <span className="block font-semibold"><Phone className="h-3 w-3 inline mr-1.5 text-success" />{branch.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Integrated Admissions Enquiry Form (Apply Online) */}
      <section id="apply" className="py-16 lg:py-24 bg-slate-950 relative">
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-primary-blue/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Institutional Admissions Portal</h2>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">
              Register an enquiry. Confirmed applicants will be mapped to the administrative onboarding board.
            </p>
          </div>

          <Card className="bg-slate-900 border-slate-800/80 overflow-hidden shadow-2xl p-6 md:p-8">
            <CardContent className="p-0">
              <form onSubmit={handleSendEnquiry} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-450 block mb-1.5 uppercase">Candidate Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Aarav Mehta"
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      className="w-full text-xs font-semibold text-white p-3 rounded-lg border border-slate-800 bg-slate-950 focus-ring outline-none hover:border-slate-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-450 block mb-1.5 uppercase">Email Address *</label>
                    <input
                      type="email"
                      placeholder="name@gmail.com"
                      value={enquiryEmail}
                      onChange={(e) => setEnquiryEmail(e.target.value)}
                      className="w-full text-xs font-semibold text-white p-3 rounded-lg border border-slate-800 bg-slate-950 focus-ring outline-none hover:border-slate-700"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-450 block mb-1.5 uppercase">Intended Course *</label>
                    <select
                      value={enquiryProgram}
                      onChange={(e) => setEnquiryProgram(e.target.value)}
                      className="w-full text-xs font-semibold text-white p-3 rounded-lg border border-slate-800 bg-slate-950 focus-ring outline-none hover:border-slate-700 cursor-pointer"
                    >
                      <option value="B.Tech CSE">B.Tech (Computer Science)</option>
                      <option value="B.Tech AI & DS">B.Tech (Artificial Intelligence)</option>
                      <option value="MBA Finance">MBA (Finance)</option>
                      <option value="B.Arch">B.Arch (Architecture)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-450 block mb-1.5 uppercase">Question / Details</label>
                    <input
                      type="text"
                      placeholder="Explain admission deadlines..."
                      value={enquiryText}
                      onChange={(e) => setEnquiryText(e.target.value)}
                      className="w-full text-xs font-semibold text-white p-3 rounded-lg border border-slate-800 bg-slate-950 focus-ring outline-none hover:border-slate-700"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-3">
                  <Button variant="primary" type="submit" className="font-bold flex items-center px-6 py-4">
                    <Send className="h-3.5 w-3.5 mr-1.5" />
                    <span>Send Enquiry</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 6. Footer section */}
      <footer className="bg-slate-950 border-t border-slate-900 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-500 select-none">
          <div>
            © 2026 Excel Group of Institutions. NH-544, Pallakkapalayam, Namakkal, TN, India.
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="hover:text-white transition-colors">Portal Access</Link>
            <span>•</span>
            <span className="text-[10px] text-slate-600 font-bold">CMS Version 3.4.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
