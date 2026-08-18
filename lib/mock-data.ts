export interface UserProfile {
  id: string;
  name: string;
  role: string;
  roleTitle: string;
  avatar: string;
  email: string;
  department?: string;
  program?: string;
  year?: string;
  rollNo?: string;
}

export interface KPI {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  type: 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'academic';
}

export interface ScheduleItem {
  time: string;
  course: string;
  details: string; // e.g. BBA II Year - Sec A / Room 201
  instructorOrClass: string;
  status: 'Completed' | 'Upcoming' | 'Ongoing';
}

export interface PendingApproval {
  id: string;
  title: string;
  requester: string;
  date: string;
  type: string;
}

export interface Announcement {
  id: string;
  title: string;
  sender: string;
  date: string;
  isNew: boolean;
  category: 'Academic' | 'Placement' | 'Exam' | 'General';
}

export interface CourseProgress {
  id: string;
  name: string;
  studentsCount: number;
  progress: number;
  nextClass: string;
}

export const mockUsers: Record<string, UserProfile> = {
  super_admin: {
    id: "U01",
    name: "Vikram Malhotra",
    role: "super_admin",
    roleTitle: "SaaS Systems Director",
    avatar: "VM",
    email: "superadmin@excelerp.com",
  },
  inst_admin: {
    id: "U02",
    name: "Ramesh Sharma",
    role: "inst_admin",
    roleTitle: "Institution Administrator",
    avatar: "RS",
    email: "admin.blr@excel.edu.in",
  },
  chairman: {
    id: "U03",
    name: "Rajesh Kumar",
    role: "chairman",
    roleTitle: "Chairman & Managing Trustee",
    avatar: "RK",
    email: "chairman@excelgroup.org",
  },
  principal: {
    id: "U04",
    name: "Dr. Priya Sharma",
    role: "principal",
    roleTitle: "Principal - Business School",
    avatar: "PS",
    email: "principal.sbm@excel.edu.in",
    department: "Business Management"
  },
  faculty: {
    id: "U05",
    name: "Prof. Suresh Iyer",
    role: "faculty",
    roleTitle: "Assistant Professor",
    avatar: "SI",
    email: "suresh.iyer@excel.edu.in",
    department: "Computer Science"
  },
  student: {
    id: "U06",
    name: "Ananya Sen",
    role: "student",
    roleTitle: "Student",
    avatar: "AS",
    email: "ananya.sen24@excel.edu.in",
    program: "BBA",
    year: "II Year",
    rollNo: "23BBA1024",
    department: "Management"
  },
  parent: {
    id: "U07",
    name: "Subrata Sen",
    role: "parent",
    roleTitle: "Parent of Ananya Sen",
    avatar: "SS",
    email: "subrata.sen@gmail.com"
  },
  accountant: {
    id: "U08",
    name: "Amit Sharma",
    role: "accountant",
    roleTitle: "Senior Finance Officer",
    avatar: "AS",
    email: "finance.blr@excel.edu.in"
  }
};

export const campuses = [
  { id: "C1", name: "Bengaluru Campus" },
  { id: "C2", name: "Hyderabad Campus" },
  { id: "C3", name: "Vijayawada Campus" }
];

export const institutions = [
  { id: "I1", name: "Excel Group of Institutions" },
  { id: "I2", name: "Apex University" }
];

export const mockKPIs: Record<string, KPI[]> = {
  chairman: [
    { title: "Total Students", value: "8,642", change: "+6.8% vs last month", isPositive: true, type: 'info' },
    { title: "Total Faculty", value: "562", change: "+4.3% vs last month", isPositive: true, type: 'academic' },
    { title: "Programs Run", value: "128", change: "Across all institutions", isPositive: true, type: 'neutral' },
    { title: "Active Campuses", value: "12", change: "Across 3 states", isPositive: true, type: 'neutral' },
    { title: "Admissions (YTD)", value: "2,314", change: "+8.9% vs last year", isPositive: true, type: 'success' },
    { title: "Revenue (YTD)", value: "₹28.75 Cr", change: "+12.4% vs last year", isPositive: true, type: 'success' }
  ],
  principal: [
    { title: "Total Students", value: "3,245", change: "+4.2% vs last batch", isPositive: true, type: 'info' },
    { title: "Active Faculty", value: "186", change: "98% Attendance today", isPositive: true, type: 'academic' },
    { title: "Today's Attendance", value: "91.2%", change: "Student present rate", isPositive: true, type: 'success' },
    { title: "Pending Approvals", value: "12", change: "Requires your review", isPositive: false, type: 'warning' },
    { title: "Outstanding Fees", value: "₹42.30 L", change: "Defaulter notices sent", isPositive: false, type: 'danger' }
  ],
  admin: [
    { title: "Total Students", value: "3,245", change: "Active this semester", isPositive: true, type: 'info' },
    { title: "Faculty & Staff", value: "248", change: "8 new onboarding", isPositive: true, type: 'academic' },
    { title: "Admission Enquiries", value: "142", change: "Pending response", isPositive: false, type: 'warning' },
    { title: "Pending Requests", value: "28", change: "Tickets & applications", isPositive: false, type: 'warning' },
    { title: "Collected (This Month)", value: "₹1.68 Cr", change: "82% of target", isPositive: true, type: 'success' },
    { title: "Outstanding Fees", value: "₹42.30 L", change: "Due in 15 days", isPositive: false, type: 'danger' }
  ],
  faculty: [
    { title: "My Classes Today", value: "3", change: "View Schedule", isPositive: true, type: 'info' },
    { title: "Total Students", value: "128", change: "Across 4 courses", isPositive: true, type: 'academic' },
    { title: "Assignments to Grade", value: "12", change: "2 overdue", isPositive: false, type: 'warning' },
    { title: "Monthly Attendance", value: "92%", change: "Class average", isPositive: true, type: 'success' },
    { title: "My Active Courses", value: "4", change: "In-progress", isPositive: true, type: 'academic' }
  ],
  student: [
    { title: "Classes Today", value: "3", change: "Next at 09:00 AM", isPositive: true, type: 'info' },
    { title: "Assignments", value: "2", change: "Pending submission", isPositive: false, type: 'warning' },
    { title: "Upcoming Exams", value: "1", change: "Mid-Term exams", isPositive: true, type: 'academic' },
    { title: "My Attendance", value: "92%", change: "Minimum required 75%", isPositive: true, type: 'success' },
    { title: "Fee Balance", value: "₹3,500", change: "Pay before 31 Aug", isPositive: false, type: 'danger' }
  ],
  parent: [
    { title: "Attendance", value: "92%", change: "Classes attended", isPositive: true, type: 'success' },
    { title: "Assignments Completed", value: "18 / 20", change: "2 pending", isPositive: true, type: 'info' },
    { title: "Fee Outstanding", value: "₹3,500", change: "Next term due", isPositive: false, type: 'warning' },
    { title: "Academic Performance", value: "8.4 CGPA", change: "Class Rank: 4th", isPositive: true, type: 'academic' }
  ],
  accountant: [
    { title: "Today's Collection", value: "₹8.45 L", change: "UPI, Cards, Cash", isPositive: true, type: 'success' },
    { title: "Monthly Collection", value: "₹1.68 Cr", change: "82% of target", isPositive: true, type: 'success' },
    { title: "Outstanding Fees", value: "₹42.30 L", change: "Active recovery active", isPositive: false, type: 'danger' },
    { title: "Monthly Expenses", value: "₹68.45 L", change: "65% of budget", isPositive: true, type: 'warning' },
    { title: "Pending Invoices", value: "16", change: "Requires vendor pay", isPositive: false, type: 'warning' }
  ]
};

export const mockSchedules: Record<string, ScheduleItem[]> = {
  student: [
    { time: "09:00 AM - 10:00 AM", course: "Principles of Management", details: "Room 202 | Dr. Ramesh", instructorOrClass: "Dr. Ramesh", status: "Upcoming" },
    { time: "10:15 AM - 11:15 AM", course: "Business Economics", details: "Room 205 | Prof. Kavitha", instructorOrClass: "Prof. Kavitha", status: "Upcoming" },
    { time: "11:30 AM - 12:30 PM", course: "Accounting for Managers", details: "Room 201 | Prof. Suresh", instructorOrClass: "Prof. Suresh", status: "Upcoming" }
  ],
  faculty: [
    { time: "09:00 AM - 10:00 AM", course: "Business Communication", details: "BBA II Year - Section A | Room 201", instructorOrClass: "BBA II Year - Sec A", status: "Completed" },
    { time: "10:15 AM - 11:15 AM", course: "Human Resource Management", details: "BBA III Year - Section B | Room 305", instructorOrClass: "BBA III Year - Sec B", status: "Upcoming" },
    { time: "01:00 PM - 02:00 PM", course: "Principles of Management", details: "BBA I Year - Section C | Room 203", instructorOrClass: "BBA I Year - Sec C", status: "Upcoming" }
  ]
};

export const mockApprovals: Record<string, PendingApproval[]> = {
  principal: [
    { id: "A1", title: "Faculty CL Leave - Prof. Suresh Iyer", requester: "HR Department", date: "18 Aug 2026", type: "Leave" },
    { id: "A2", title: "Budget Release Request - Research Wing", requester: "Dr. R. Prasad", date: "17 Aug 2026", type: "Finance" },
    { id: "A3", title: "Special Admission Concession B.Tech CSE", requester: "Admissions Desk", date: "18 Aug 2026", type: "Admission" },
    { id: "A4", title: "Semester Results Approval - MBA IV Sem", requester: "Exam Controller", date: "16 Aug 2026", type: "Academic" }
  ],
  admin: [
    { id: "A11", title: "New Student Admission Approval", requester: "Admission Office", date: "18 Aug 2026", type: "Admission" },
    { id: "A12", title: "Asset Requisition - 15 Projectors", requester: "IT Department", date: "18 Aug 2026", type: "Inventory" },
    { id: "A13", title: "Maintenance Contract Renewal", requester: "Infrastructure Team", date: "17 Aug 2026", type: "Maintenance" }
  ],
  accountant: [
    { id: "A21", title: "Vendor Payment - Shanti Book Depot", requester: "Library", date: "18 Aug 2026", type: "Invoice" },
    { id: "A22", title: "Lab Equipment Purchase Bill", requester: "Physics Dept", date: "17 Aug 2026", type: "Reimbursement" },
    { id: "A23", title: "Hostel Mess Supplier Advance", requester: "Hostel Warden", date: "16 Aug 2026", type: "Payment" }
  ]
};

export const mockAnnouncements: Announcement[] = [
  { id: "N1", title: "Annual Audit scheduled from 20 May 2026.", sender: "Management Cell", date: "16 May 2026", isNew: true, category: "General" },
  { id: "N2", title: "PF ESI return submission before 25 May 2026.", sender: "HR Admin", date: "15 May 2026", isNew: false, category: "General" },
  { id: "N3", title: "Staff meeting on 22 May 2026 at 11:00 AM.", sender: "Principal Office", date: "14 May 2026", isNew: false, category: "General" },
  { id: "N4", title: "Guest Lecture on Digital Marketing by HBR Guest Speaker.", sender: "Management Department", date: "16 May 2026", isNew: true, category: "Academic" },
  { id: "N5", title: "Internship Opportunities Available in Deloitte & KPMG.", sender: "Training & Placement Cell", date: "15 May 2026", isNew: true, category: "Placement" },
  { id: "N6", title: "Mid Term Exams Schedule Released - Check Portal.", sender: "Examination Cell", date: "14 May 2026", isNew: false, category: "Exam" }
];

export const mockFacultyCourses: CourseProgress[] = [
  { id: "C101", name: "Business Communication", studentsCount: 32, progress: 75, nextClass: "17 May, 09:00 AM Room 201" },
  { id: "C102", name: "Human Resource Management", studentsCount: 30, progress: 60, nextClass: "17 May, 10:15 AM Room 305" },
  { id: "C103", name: "Principles of Management", studentsCount: 33, progress: 80, nextClass: "17 May, 01:00 PM Room 203" },
  { id: "C104", name: "Organizational Behaviour", studentsCount: 33, progress: 65, nextClass: "18 May, 09:00 AM Room 202" }
];

export const mockRecentActivities = [
  { text: "Payroll for May 2026 processed successfully.", time: "10:30 AM", date: "16 May 2026", role: "HR Admin" },
  { text: "New employee Amit Sharma joined as Accountant.", time: "04:15 PM", date: "15 May 2026", role: "HR Admin" },
  { text: "Fee collection of ₹8.45 L recorded today.", time: "12:20 PM", date: "15 May 2026", role: "Finance Office" },
  { text: "Leave request approved for Kavita Singh.", time: "11:05 AM", date: "14 May 2026", role: "Principal" }
];

export const mockSearchData = {
  students: [
    { id: "S1", rollNo: "23BBA1024", name: "Ananya Sen", program: "BBA II Year", dept: "Management", email: "ananya.sen24@excel.edu.in" },
    { id: "S2", rollNo: "23BBA1085", name: "Ananya Roy", program: "BBA II Year", dept: "Management", email: "ananya.roy@excel.edu.in" },
    { id: "S3", rollNo: "24BCA2044", name: "Ananya Sharma", program: "BCA I Year", dept: "Computer Science", email: "asharma@excel.edu.in" },
    { id: "S4", rollNo: "22CSE4109", name: "Ananya Rao", program: "B.Tech III Year", dept: "Computer Science", email: "arao@excel.edu.in" }
  ],
  faculty: [
    { id: "F1", name: "Dr. Ananya Nair", title: "Associate Professor", dept: "Humanities", email: "ananya.nair@excel.edu.in" }
  ],
  documents: [
    { id: "D1", name: "Ananya_Sen_Admission_Form.pdf", type: "PDF", size: "1.4 MB", uploadedBy: "Admissions Desk" },
    { id: "D2", name: "Ananya_Sen_10th_Certificate.pdf", type: "PDF", size: "840 KB", uploadedBy: "Admissions Desk" }
  ],
  invoices: [
    { id: "I1", invoiceNo: "INV-2026-0493", student: "Ananya Sen", amount: "₹75,000", status: "Paid", date: "12 Jun 2026" },
    { id: "I2", invoiceNo: "INV-2026-1082", student: "Ananya Roy", amount: "₹75,000", status: "Overdue", date: "10 Jul 2026" }
  ]
};
