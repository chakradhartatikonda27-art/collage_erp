"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { mockUsers, UserProfile, campuses, institutions, mockAnnouncements, mockSearchData } from "@/lib/mock-data";

export interface ToastItem {
  id: string;
  message: string;
  type: "success" | "warning" | "danger" | "info";
  duration?: number;
}

// Student record type for dynamic modifications
export interface StudentRecord {
  id: string;
  rollNo: string;
  name: string;
  program: string;
  dept: string;
  email: string;
  attendance: number;
  cgpa: string;
  status: "Active" | "Suspended" | "On Leave";
}

// Admission application type
export interface AdmissionApplication {
  id: string;
  name: string;
  program: string;
  stage: "Enquiry" | "Verification" | "Selection" | "Paid" | "Confirmed";
  email: string;
  phone: string;
  date: string;
  docsVerified: boolean;
}

// Finance invoice type
export interface FeeInvoice {
  id: string;
  invoiceNo: string;
  student: string;
  amount: number;
  paid: number;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
}

// Library book record type
export interface BookRecord {
  id: string;
  title: string;
  author: string;
  category: string;
  copies: number;
  available: number;
}

interface ERPContextType {
  activeUser: UserProfile;
  setActiveUser: (user: UserProfile) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  selectedCampus: string;
  setSelectedCampus: (campus: string) => void;
  selectedInstitution: string;
  setSelectedInstitution: (institution: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  
  // Dynamic collections
  students: StudentRecord[];
  setStudents: React.Dispatch<React.SetStateAction<StudentRecord[]>>;
  admissions: AdmissionApplication[];
  setAdmissions: React.Dispatch<React.SetStateAction<AdmissionApplication[]>>;
  invoices: FeeInvoice[];
  setInvoices: React.Dispatch<React.SetStateAction<FeeInvoice[]>>;
  books: BookRecord[];
  setBooks: React.Dispatch<React.SetStateAction<BookRecord[]>>;

  toasts: ToastItem[];
  addToast: (message: string, type: ToastItem["type"], duration?: number) => void;
  removeToast: (id: string) => void;
  unreadNotificationsCount: number;
  setUnreadNotificationsCount: React.Dispatch<React.SetStateAction<number>>;
  unreadMessagesCount: number;
  setUnreadMessagesCount: React.Dispatch<React.SetStateAction<number>>;
  pendingApprovalsCount: number;
  setPendingApprovalsCount: React.Dispatch<React.SetStateAction<number>>;
  currentBreadcrumbs: { label: string; href?: string }[];
  setBreadcrumbs: (breadcrumbs: { label: string; href?: string }[]) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ERPContext = createContext<ERPContextType | undefined>(undefined);

export function ERPProvider({ children }: { children: React.ReactNode }) {
  // Default active user is Chairman
  const [activeUser, setActiveUserInternal] = useState<UserProfile>(mockUsers.chairman);
  const [activeView, setActiveViewInternal] = useState<string>("Dashboard");
  const [selectedCampus, setSelectedCampus] = useState(campuses[0].name);
  const [selectedInstitution, setSelectedInstitution] = useState(institutions[0].name);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newVal = !prev;
      if (newVal) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newVal;
    });
  };

  // Initialize interactive datasets
  const [students, setStudents] = useState<StudentRecord[]>([
    { id: "S1", rollNo: "23BBA1024", name: "Ananya Sen", program: "BBA II Year", dept: "Management", email: "ananya.sen24@excel.edu.in", attendance: 92, cgpa: "8.4", status: "Active" },
    { id: "S2", rollNo: "23BBA1085", name: "Ananya Roy", program: "BBA II Year", dept: "Management", email: "ananya.roy@excel.edu.in", attendance: 71, cgpa: "6.8", status: "Active" },
    { id: "S3", rollNo: "24BCA2044", name: "Ananya Sharma", program: "BCA I Year", dept: "Computer Science", email: "asharma@excel.edu.in", attendance: 88, cgpa: "9.1", status: "Active" },
    { id: "S4", rollNo: "22CSE4109", name: "Ananya Rao", program: "B.Tech III Year", dept: "Computer Science", email: "arao@excel.edu.in", attendance: 65, cgpa: "7.2", status: "Active" },
    { id: "S5", rollNo: "23ECE3088", name: "Rajesh Sharma", program: "B.Tech II Year", dept: "Electronics", email: "rsharma@excel.edu.in", attendance: 94, cgpa: "8.9", status: "Active" },
    { id: "S6", rollNo: "23MEC1012", name: "Rahul Verma", program: "B.Tech II Year", dept: "Mechanical", email: "rverma@excel.edu.in", attendance: 81, cgpa: "7.9", status: "On Leave" }
  ]);

  const [admissions, setAdmissions] = useState<AdmissionApplication[]>([
    { id: "AD1", name: "Aarav Mehta", program: "B.Tech CSE", stage: "Verification", email: "aarav.m@gmail.com", phone: "+91 98765 43210", date: "15 Aug 2026", docsVerified: false },
    { id: "AD2", name: "Diya Iyer", program: "BCA CS", stage: "Selection", email: "diya.iyer@gmail.com", phone: "+91 91234 56789", date: "16 Aug 2026", docsVerified: true },
    { id: "AD3", name: "Kabir Sen", program: "BBA Marketing", stage: "Paid", email: "kabir.sen@gmail.com", phone: "+91 88776 65544", date: "17 Aug 2026", docsVerified: true },
    { id: "AD4", name: "Riya Bose", program: "MBA Finance", stage: "Confirmed", email: "riya.bose@gmail.com", phone: "+91 99887 76655", date: "18 Aug 2026", docsVerified: true }
  ]);

  const [invoices, setInvoices] = useState<FeeInvoice[]>([
    { id: "INV1", invoiceNo: "INV-2026-0493", student: "Ananya Sen", amount: 75000, paid: 71500, status: "Pending", date: "12 Jun 2026" },
    { id: "INV2", invoiceNo: "INV-2026-1082", student: "Ananya Roy", amount: 75000, paid: 0, status: "Overdue", date: "10 Jul 2026" },
    { id: "INV3", invoiceNo: "INV-2026-1299", student: "Rahul Verma", amount: 80000, paid: 80000, status: "Paid", date: "15 Aug 2026" }
  ]);

  const [books, setBooks] = useState<BookRecord[]>([
    { id: "BK1", title: "Introduction to Algorithms", author: "Cormen et al.", category: "Computer Science", copies: 12, available: 8 },
    { id: "BK2", title: "Principles of Management", author: "Harold Koontz", category: "Management", copies: 8, available: 3 },
    { id: "BK3", title: "Macroeconomics", author: "N. Gregory Mankiw", category: "Commerce", copies: 5, available: 0 },
    { id: "BK4", title: "Engineering Physics", author: "Gaur & Gupta", category: "Humanities", copies: 15, available: 12 }
  ]);

  // Counters for the header badges
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(3);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(2);
  const [pendingApprovalsCount, setPendingApprovalsCount] = useState(12);

  // Dynamic breadcrumbs
  const [currentBreadcrumbs, setBreadcrumbs] = useState<{ label: string; href?: string }[]>([
    { label: "Dashboard" }
  ]);

  // Sync approval counts depending on role
  useEffect(() => {
    if (activeUser.role === "principal") {
      setPendingApprovalsCount(4);
    } else if (activeUser.role === "admin") {
      setPendingApprovalsCount(3);
    } else if (activeUser.role === "accountant") {
      setPendingApprovalsCount(3);
    } else if (activeUser.role === "faculty") {
      setPendingApprovalsCount(0);
    } else {
      setPendingApprovalsCount(1);
    }
    
    // Reset view-routing on role switch to avoid layout mismatch
    setActiveViewInternal("Dashboard");
    setMobileMenuOpen(false);
    setNotificationsOpen(false);
  }, [activeUser]);

  // Sync breadcrumbs with activeView
  useEffect(() => {
    setBreadcrumbs([
      { label: "Dashboard", href: "/dashboard" },
      ...(activeView !== "Dashboard" ? [{ label: activeView }] : [])
    ]);
  }, [activeView]);

  // Listen to CMD+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const addToast = (message: string, type: ToastItem["type"], duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const setActiveUser = (user: UserProfile) => {
    setActiveUserInternal(user);
    addToast(`Switched workspace role to ${user.roleTitle}`, "info");
  };

  const setActiveView = (view: string) => {
    setActiveViewInternal(view);
    setMobileMenuOpen(false);
  };

  return (
    <ERPContext.Provider
      value={{
        activeUser,
        setActiveUser,
        activeView,
        setActiveView,
        selectedCampus,
        setSelectedCampus,
        selectedInstitution,
        setSelectedInstitution,
        sidebarCollapsed,
        setSidebarCollapsed,
        searchOpen,
        setSearchOpen,
        mobileMenuOpen,
        setMobileMenuOpen,
        notificationsOpen,
        setNotificationsOpen,
        
        students,
        setStudents,
        admissions,
        setAdmissions,
        invoices,
        setInvoices,
        books,
        setBooks,

        toasts,
        addToast,
        removeToast,
        unreadNotificationsCount,
        setUnreadNotificationsCount,
        unreadMessagesCount,
        setUnreadMessagesCount,
        pendingApprovalsCount,
        setPendingApprovalsCount,
        currentBreadcrumbs,
        setBreadcrumbs,
        darkMode,
        toggleDarkMode
      }}
    >
      {children}
    </ERPContext.Provider>
  );
}

export function useERP() {
  const context = useContext(ERPContext);
  if (context === undefined) {
    throw new Error("useERP must be used within an ERPProvider");
  }
  return context;
}
