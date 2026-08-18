"use client";

import React from "react";
import { useERP } from "@/context/erp-context";
import ChairmanDashboard from "@/components/dashboard/chairman-dashboard";
import PrincipalDashboard from "@/components/dashboard/principal-dashboard";
import AdminDashboard from "@/components/dashboard/admin-dashboard";
import FacultyDashboard from "@/components/dashboard/faculty-dashboard";
import StudentDashboard from "@/components/dashboard/student-dashboard";
import ParentDashboard from "@/components/dashboard/parent-dashboard";
import CommonDashboard from "@/components/dashboard/common-dashboard";
import SuperAdminDashboard from "@/components/dashboard/super-admin-dashboard";

// Modules
import StudentsModule from "@/components/modules/students-module";
import AdmissionsModule from "@/components/modules/admissions-module";
import AttendanceModule from "@/components/modules/attendance-module";
import ExamsModule from "@/components/modules/exams-module";
import FinanceModule from "@/components/modules/finance-module";
import HRModule from "@/components/modules/hr-module";
import ServicesModule from "@/components/modules/services-module";
import SystemModule from "@/components/modules/system-module";
import PortalModule from "@/components/modules/portal-module";

export default function DashboardPage() {
  const { activeUser, activeView } = useERP();

  // If activeView is Dashboard, load the customized landing dashboard for that role
  if (activeView === "Dashboard") {
    switch (activeUser.role) {
      case "super_admin":
        return <SuperAdminDashboard />;
      case "chairman":
        return <ChairmanDashboard />;
      case "principal":
        return <PrincipalDashboard />;
      case "admin":
      case "inst_admin":
        return <AdminDashboard />;
      case "faculty":
        return <FacultyDashboard />;
      case "student":
        return <StudentDashboard />;
      case "parent":
        return <ParentDashboard />;
      default:
        return <CommonDashboard />;
    }
  }

  // Otherwise, route dynamically to the selected functional ERP module
  switch (activeView) {
    case "Students":
      return <StudentsModule />;
    case "Admissions":
      return <AdmissionsModule />;
    case "Attendance":
      return <AttendanceModule />;
    case "Examinations":
      return <ExamsModule />;
    case "Fees & Collections":
    case "Expenses":
    case "Budgets":
      return <FinanceModule />;
    case "HR & Payroll":
      return <HRModule />;
    case "Library":
    case "Hostel":
    case "Transport":
      return <ServicesModule />;
    case "Public Portal":
      return <PortalModule />;
    case "Settings":
    case "Documents":
      return <SystemModule />;
    default:
      return <CommonDashboard />;
  }
}
