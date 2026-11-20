// HR NOVA Initial Enterprise Data
// Stored in localStorage on first run and synchronized on all mutations

export const INITIAL_EMPLOYEES = [
  {
    id: "EMP-1001",
    firstName: "Elena",
    lastName: "Rostova",
    email: "elena.rostova@novatech.io",
    phone: "+1 (555) 234-8901",
    department: "Engineering",
    designation: "Principal Cloud Architect",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    joiningDate: "2022-03-15",
    status: "Active",
    workMode: "Hybrid",
    location: "San Francisco, CA",
    salary: "$185,000",
    rating: 4.9,
    attendanceRate: 98.5,
    leaveBalance: { casual: 8, sick: 6, annual: 16 },
    manager: "Admin / VP Engineering",
    bio: "Leading distributed multi-cloud architecture and high-throughput systems infrastructure.",
    skills: ["Kubernetes", "AWS", "Golang", "Microservices", "System Design"],
    recentLeave: [
      { type: "Annual", dates: "Oct 12 - Oct 14, 2026", days: 3, status: "Approved" }
    ]
  },
  {
    id: "EMP-1002",
    firstName: "Marcus",
    lastName: "Vance",
    email: "marcus.vance@novatech.io",
    phone: "+1 (555) 345-6712",
    department: "Product Design",
    designation: "Staff Product Designer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    joiningDate: "2021-08-01",
    status: "Active",
    workMode: "Remote",
    location: "Austin, TX",
    salary: "$165,000",
    rating: 4.8,
    attendanceRate: 96.0,
    leaveBalance: { casual: 5, sick: 4, annual: 12 },
    manager: "Elena Rostova",
    bio: "Obsessed with micro-interactions, design tokens, and scalable SaaS component libraries.",
    skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
    recentLeave: [
      { type: "Sick", dates: "Sep 28, 2026", days: 1, status: "Approved" }
    ]
  },
  {
    id: "EMP-1003",
    firstName: "Sophia",
    lastName: "Chen",
    email: "sophia.chen@novatech.io",
    phone: "+1 (555) 456-7890",
    department: "Engineering",
    designation: "Senior Frontend Engineer",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    joiningDate: "2023-01-10",
    status: "Active",
    workMode: "Hybrid",
    location: "San Francisco, CA",
    salary: "$150,000",
    rating: 4.7,
    attendanceRate: 99.1,
    leaveBalance: { casual: 7, sick: 5, annual: 14 },
    manager: "Elena Rostova",
    bio: "React and WebGL wizard specialized in high-performance data dashboards.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "GraphQL"],
    recentLeave: []
  },
  {
    id: "EMP-1004",
    firstName: "David",
    lastName: "Kim",
    email: "david.kim@novatech.io",
    phone: "+1 (555) 567-8901",
    department: "Marketing",
    designation: "Head of Growth",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    joiningDate: "2022-11-20",
    status: "Active",
    workMode: "On-site",
    location: "New York, NY",
    salary: "$170,000",
    rating: 4.6,
    attendanceRate: 94.2,
    leaveBalance: { casual: 6, sick: 7, annual: 10 },
    manager: "Admin / CEO",
    bio: "Data-driven growth strategist leading international customer acquisition.",
    skills: ["Growth Loops", "SEO", "Product Analytics", "B2B SaaS Sales"],
    recentLeave: [
      { type: "Casual", dates: "Nov 02, 2026", days: 1, status: "Approved" }
    ]
  },
  {
    id: "EMP-1005",
    firstName: "Aisha",
    lastName: "Patel",
    email: "aisha.patel@novatech.io",
    phone: "+1 (555) 678-9012",
    department: "Human Resources",
    designation: "Senior HR Business Partner",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    joiningDate: "2021-04-18",
    status: "Active",
    workMode: "Hybrid",
    location: "San Francisco, CA",
    salary: "$135,000",
    rating: 4.9,
    attendanceRate: 99.4,
    leaveBalance: { casual: 9, sick: 6, annual: 18 },
    manager: "Admin / Head of People",
    bio: "Champion of workplace culture, executive coaching, and equity programs.",
    skills: ["Talent Acquisition", "Employee Relations", "Compensation", "DEI"],
    recentLeave: []
  },
  {
    id: "EMP-1006",
    firstName: "Carlos",
    lastName: "Mendez",
    email: "carlos.mendez@novatech.io",
    phone: "+1 (555) 789-0123",
    department: "Finance",
    designation: "Financial Controller",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    joiningDate: "2020-09-01",
    status: "On Leave",
    workMode: "Hybrid",
    location: "New York, NY",
    salary: "$158,000",
    rating: 4.5,
    attendanceRate: 91.0,
    leaveBalance: { casual: 2, sick: 4, annual: 5 },
    manager: "Admin / CFO",
    bio: "Overseeing SaaS budgeting, financial auditing, and investor reporting.",
    skills: ["Financial Modeling", "QuickBooks", "ERP", "Tax Compliance"],
    recentLeave: [
      { type: "Annual", dates: "Nov 03 - Nov 14, 2026", days: 10, status: "Active" }
    ]
  },
  {
    id: "EMP-1007",
    firstName: "Zoe",
    lastName: "Kowalski",
    email: "zoe.kowalski@novatech.io",
    phone: "+1 (555) 890-1234",
    department: "Customer Success",
    designation: "Enterprise Support Lead",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    joiningDate: "2023-05-12",
    status: "Active",
    workMode: "Remote",
    location: "Chicago, IL",
    salary: "$125,000",
    rating: 4.8,
    attendanceRate: 97.8,
    leaveBalance: { casual: 8, sick: 5, annual: 15 },
    manager: "Admin / VP CS",
    bio: "Passionate about enterprise customer retention, SLAs, and CSAT scores.",
    skills: ["Zendesk", "Customer Journey", "SLA Management", "Account Retention"],
    recentLeave: []
  },
  {
    id: "EMP-1008",
    firstName: "Tariq",
    lastName: "Mansoor",
    email: "tariq.mansoor@novatech.io",
    phone: "+1 (555) 901-2345",
    department: "Engineering",
    designation: "DevOps & SRE Specialist",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    joiningDate: "2024-02-01",
    status: "Active",
    workMode: "Hybrid",
    location: "San Francisco, CA",
    salary: "$145,000",
    rating: 4.7,
    attendanceRate: 98.0,
    leaveBalance: { casual: 10, sick: 6, annual: 18 },
    manager: "Elena Rostova",
    bio: "Focusing on CI/CD automation, Kubernetes clusters, and zero-downtime rollouts.",
    skills: ["Terraform", "Docker", "Prometheus", "CI/CD", "Linux"],
    recentLeave: []
  },
  {
    id: "EMP-1009",
    firstName: "Natasha",
    lastName: "Volkova",
    email: "natasha.volkova@novatech.io",
    phone: "+1 (555) 012-3456",
    department: "Product Design",
    designation: "UI/UX Researcher",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    joiningDate: "2024-06-15",
    status: "Probation",
    workMode: "Hybrid",
    location: "San Francisco, CA",
    salary: "$115,000",
    rating: 4.4,
    attendanceRate: 99.0,
    leaveBalance: { casual: 4, sick: 5, annual: 6 },
    manager: "Marcus Vance",
    bio: "Running usability sessions, customer journey mapping, and accessibility audits.",
    skills: ["Usability Testing", "Wireframing", "WCAG 2.1", "Miro"],
    recentLeave: []
  },
  {
    id: "EMP-1010",
    firstName: "Lucas",
    lastName: "Silva",
    email: "lucas.silva@novatech.io",
    phone: "+1 (555) 123-4567",
    department: "Sales",
    designation: "Enterprise Account Executive",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    joiningDate: "2023-09-01",
    status: "Active",
    workMode: "Remote",
    location: "Miami, FL",
    salary: "$140,000",
    rating: 4.7,
    attendanceRate: 96.5,
    leaveBalance: { casual: 7, sick: 4, annual: 13 },
    manager: "Admin / VP Sales",
    bio: "Driving multi-million ARR contracts with Fortune 500 SaaS enterprise clients.",
    skills: ["Salesforce", "Enterprise Closing", "Contract Negotiation", "HubSpot"],
    recentLeave: []
  }
];

export const INITIAL_JOB_OPENINGS = [
  {
    id: "JOB-201",
    title: "Senior Full Stack Engineer",
    department: "Engineering",
    location: "San Francisco, CA / Hybrid",
    type: "Full-time",
    applicantsCount: 28,
    status: "Open",
    salaryRange: "$150k - $180k",
    postedDate: "2026-10-15",
    description: "Looking for an experienced engineer to architect scalable enterprise cloud services."
  },
  {
    id: "JOB-202",
    title: "Staff Product Designer",
    department: "Product Design",
    location: "Remote (US)",
    type: "Full-time",
    applicantsCount: 19,
    status: "Open",
    salaryRange: "$160k - $190k",
    postedDate: "2026-10-20",
    description: "Lead our core design systems and design the next generation of our analytics experience."
  },
  {
    id: "JOB-203",
    title: "Growth Marketing Lead",
    department: "Marketing",
    location: "New York, NY / Hybrid",
    type: "Full-time",
    applicantsCount: 14,
    status: "Open",
    salaryRange: "$130k - $160k",
    postedDate: "2026-10-25",
    description: "Drive paid acquisition, product-led growth loops, and global conversion funnels."
  },
  {
    id: "JOB-204",
    title: "HR Business Partner",
    department: "Human Resources",
    location: "San Francisco, CA",
    type: "Full-time",
    applicantsCount: 9,
    status: "Open",
    salaryRange: "$115k - $135k",
    postedDate: "2026-11-01",
    description: "Support our growing engineering and sales teams with talent and organizational development."
  },
  {
    id: "JOB-205",
    title: "DevOps & SRE Engineer",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-time",
    applicantsCount: 32,
    status: "Open",
    salaryRange: "$140k - $175k",
    postedDate: "2026-10-10",
    description: "Ensure 99.99% uptime, scale cloud infrastructure, and maintain SOC2 compliance."
  }
];

export const INITIAL_CANDIDATES = [
  {
    id: "CAN-501",
    name: "Maya Lin",
    email: "maya.lin@example.com",
    phone: "+1 (555) 432-1098",
    role: "Senior Full Stack Engineer",
    department: "Engineering",
    stage: "Interview",
    rating: 5,
    matchScore: 94,
    experience: "7 years",
    appliedDate: "2026-10-28",
    interviewDate: "Tomorrow at 2:00 PM",
    interviewer: "Elena Rostova",
    notes: "Strong in Go & React. Completed architecture challenge with stellar feedback.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "CAN-502",
    name: "Alex Thorne",
    email: "alex.thorne@example.com",
    phone: "+1 (555) 876-5432",
    role: "Staff Product Designer",
    department: "Product Design",
    stage: "Shortlisted",
    rating: 4,
    matchScore: 88,
    experience: "9 years",
    appliedDate: "2026-10-29",
    interviewDate: "Nov 15, 2026",
    interviewer: "Marcus Vance",
    notes: "Former Lead at Figma plugin ecosystem. Portfolio is top tier.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "CAN-503",
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    phone: "+1 (555) 321-9876",
    role: "Growth Marketing Lead",
    department: "Marketing",
    stage: "Selected",
    rating: 5,
    matchScore: 96,
    experience: "6 years",
    appliedDate: "2026-10-20",
    interviewDate: "Completed",
    interviewer: "David Kim",
    notes: "Offer letter issued. Anticipating acceptance this week.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "CAN-504",
    name: "Liam O'Connor",
    email: "liam.oc@example.com",
    phone: "+1 (555) 654-3210",
    role: "DevOps & SRE Engineer",
    department: "Engineering",
    stage: "Screening",
    rating: 4,
    matchScore: 82,
    experience: "5 years",
    appliedDate: "2026-11-01",
    interviewDate: "Nov 14, 2026",
    interviewer: "Tariq Mansoor",
    notes: "Reviewing resume and open source Kubernetes contributions.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "CAN-505",
    name: "Priyah Sharma",
    email: "priyah.s@example.com",
    phone: "+1 (555) 789-4321",
    role: "HR Business Partner",
    department: "Human Resources",
    stage: "Applied",
    rating: 3,
    matchScore: 78,
    experience: "4 years",
    appliedDate: "2026-11-03",
    interviewDate: "Not Scheduled",
    interviewer: "Aisha Patel",
    notes: "Application received via LinkedIn referral.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "CAN-506",
    name: "Ethan Wright",
    email: "ethan.w@example.com",
    phone: "+1 (555) 210-9876",
    role: "Senior Full Stack Engineer",
    department: "Engineering",
    stage: "Rejected",
    rating: 2,
    matchScore: 61,
    experience: "3 years",
    appliedDate: "2026-10-18",
    interviewDate: "N/A",
    interviewer: "Elena Rostova",
    notes: "Insufficient depth in distributed consensus and production microservices.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_TICKETS = [
  {
    id: "TICK-801",
    employeeId: "EMP-1003",
    employeeName: "Sophia Chen",
    employeeAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    subject: "HSA / Healthcare dependent addition",
    category: "General HR Queries",
    priority: "Medium",
    assignedHR: "Aisha Patel",
    createdDate: "2026-11-02",
    status: "In Progress",
    description: "Need to enroll my newborn under the group health coverage and submit proof documents.",
    comments: [
      { author: "Sophia Chen", date: "Nov 02, 10:15 AM", text: "Uploaded birth certificate to the portal." },
      { author: "Aisha Patel", date: "Nov 02, 02:40 PM", text: "Confirmed receipt! Processing with provider." }
    ]
  },
  {
    id: "TICK-802",
    employeeId: "EMP-1002",
    employeeName: "Marcus Vance",
    employeeAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    subject: "Home office ergonomic monitor arm reimbursement",
    category: "Payroll Queries",
    priority: "Low",
    assignedHR: "Carlos Mendez",
    createdDate: "2026-11-01",
    status: "Resolved",
    description: "Submitted invoice of $189 for Herman Miller dual arm under the WFH stipend.",
    comments: [
      { author: "Marcus Vance", date: "Nov 01, 09:30 AM", text: "Receipt attached from official vendor." },
      { author: "Carlos Mendez", date: "Nov 01, 04:10 PM", text: "Approved. Added to mid-month payroll cycle." }
    ]
  },
  {
    id: "TICK-803",
    employeeId: "EMP-1007",
    employeeName: "Zoe Kowalski",
    employeeAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    subject: "VPN access latency & SSO certificate token issue",
    category: "Technical Issues",
    priority: "High",
    assignedHR: "Tariq Mansoor",
    createdDate: "2026-11-03",
    status: "Open",
    description: "Customer Success team experiencing SSO timeout errors when logging into Zendesk & internal admin.",
    comments: [
      { author: "Zoe Kowalski", date: "Nov 03, 11:00 AM", text: "Impacts 4 CSMs currently answering urgent support tickets." }
    ]
  },
  {
    id: "TICK-804",
    employeeId: "EMP-1004",
    employeeName: "David Kim",
    employeeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    subject: "Q4 Marketing offsite travel advance & budget",
    category: "Payroll Queries",
    priority: "Urgent",
    assignedHR: "Aisha Patel",
    createdDate: "2026-11-04",
    status: "In Progress",
    description: "Need authorization for team flight reservations for the New York marketing summit.",
    comments: [
      { author: "David Kim", date: "Nov 04, 08:30 AM", text: "Airfare prices climbing, expedited sign-off needed." }
    ]
  },
  {
    id: "TICK-805",
    employeeId: "EMP-1009",
    employeeName: "Natasha Volkova",
    employeeAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    subject: "Probation review milestone schedule",
    category: "Leave Issues",
    priority: "Low",
    assignedHR: "Aisha Patel",
    createdDate: "2026-10-25",
    status: "Resolved",
    description: "Requesting schedule for the 90-day onboarding review check-in.",
    comments: [
      { author: "Aisha Patel", date: "Oct 26, 11:20 AM", text: "Booked with Marcus Vance for Nov 18." }
    ]
  }
];

export const INITIAL_LEAVE_REQUESTS = [
  {
    id: "LVE-301",
    employeeId: "EMP-1003",
    employeeName: "Sophia Chen",
    employeeAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    department: "Engineering",
    leaveType: "Annual Leave",
    startDate: "2026-11-20",
    endDate: "2026-11-24",
    days: 5,
    reason: "Thanksgiving family gathering and rest.",
    status: "Pending",
    appliedDate: "2026-11-03"
  },
  {
    id: "LVE-302",
    employeeId: "EMP-1006",
    employeeName: "Carlos Mendez",
    employeeAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    department: "Finance",
    leaveType: "Annual Leave",
    startDate: "2026-11-03",
    endDate: "2026-11-14",
    days: 10,
    reason: "Scheduled personal sabbatical.",
    status: "Approved",
    appliedDate: "2026-10-15"
  },
  {
    id: "LVE-303",
    employeeId: "EMP-1008",
    employeeName: "Tariq Mansoor",
    employeeAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    department: "Engineering",
    leaveType: "Casual Leave",
    startDate: "2026-11-10",
    endDate: "2026-11-11",
    days: 2,
    reason: "Moving into new apartment.",
    status: "Pending",
    appliedDate: "2026-11-04"
  },
  {
    id: "LVE-304",
    employeeId: "EMP-1010",
    employeeName: "Lucas Silva",
    employeeAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    department: "Sales",
    leaveType: "Sick Leave",
    startDate: "2026-10-18",
    endDate: "2026-10-19",
    days: 2,
    reason: "Viral flu recovery.",
    status: "Approved",
    appliedDate: "2026-10-18"
  }
];

export const INITIAL_ATTENDANCE_LOGS = [
  { id: "ATT-01", employeeName: "Elena Rostova", timeIn: "08:52 AM", timeOut: "05:45 PM", status: "Present", hours: "8.9h", date: "Today" },
  { id: "ATT-02", employeeName: "Marcus Vance", timeIn: "09:05 AM", timeOut: "—", status: "Present", hours: "Working", date: "Today" },
  { id: "ATT-03", employeeName: "Sophia Chen", timeIn: "08:48 AM", timeOut: "—", status: "Present", hours: "Working", date: "Today" },
  { id: "ATT-04", employeeName: "David Kim", timeIn: "09:28 AM", timeOut: "—", status: "Late", hours: "Working", date: "Today" },
  { id: "ATT-05", employeeName: "Aisha Patel", timeIn: "08:55 AM", timeOut: "—", status: "Present", hours: "Working", date: "Today" },
  { id: "ATT-06", employeeName: "Carlos Mendez", timeIn: "—", timeOut: "—", status: "On Leave", hours: "0h", date: "Today" },
  { id: "ATT-07", employeeName: "Zoe Kowalski", timeIn: "09:00 AM", timeOut: "—", status: "Present", hours: "Working", date: "Today" },
  { id: "ATT-08", employeeName: "Tariq Mansoor", timeIn: "09:12 AM", timeOut: "—", status: "Present", hours: "Working", date: "Today" },
  { id: "ATT-09", employeeName: "Natasha Volkova", timeIn: "09:35 AM", timeOut: "—", status: "Late", hours: "Working", date: "Today" },
  { id: "ATT-10", employeeName: "Lucas Silva", timeIn: "08:30 AM", timeOut: "—", status: "Present", hours: "Working", date: "Today" }
];

export const INITIAL_ACTIVITIES = [
  { id: "ACT-1", user: "Sophia Chen", action: "submitted a leave request for 5 days", time: "12 minutes ago", type: "leave" },
  { id: "ACT-2", user: "Maya Lin", action: "progressed to technical interview stage", time: "45 minutes ago", type: "recruitment" },
  { id: "ACT-3", user: "Carlos Mendez", action: "annual sabbatical leave commenced", time: "2 hours ago", type: "status" },
  { id: "ACT-4", user: "David Kim", action: "opened ticket #TICK-804 (Urgent travel authorization)", time: "3 hours ago", type: "ticket" },
  { id: "ACT-5", user: "Elena Rostova", action: "completed Q4 engineering performance audit", time: "Yesterday at 4:30 PM", type: "performance" }
];

export const INITIAL_UPCOMING_EVENTS = [
  { id: "EVT-1", title: "Q4 All-Hands Townhall", date: "Nov 15, 2026", time: "10:00 AM PST", type: "Company Wide", attendees: "148 RSVP" },
  { id: "EVT-2", title: "Tech Interview: Maya Lin", date: "Nov 13, 2026", time: "2:00 PM PST", type: "Interview", attendees: "Elena Rostova" },
  { id: "EVT-3", title: "Payroll Cut-off Date", date: "Nov 20, 2026", time: "5:00 PM PST", type: "Finance", attendees: "Carlos Mendez" },
  { id: "EVT-4", title: "Elena Rostova 4th Workversary", date: "Nov 22, 2026", time: "All Day", type: "Celebration", attendees: "Nova Team" }
];

export const INITIAL_SETTINGS = {
  companyName: "Nova Technologies Inc.",
  companyDomain: "novatech.io",
  timezone: "America/Los_Angeles (PST)",
  currency: "USD ($)",
  fiscalYearStart: "January",
  defaultWorkWeek: "Monday - Friday (40 hrs)",
  notifications: {
    emailAlerts: true,
    slackIntegration: true,
    leaveApprovals: true,
    ticketAssignment: true,
    weeklyReportDigest: true
  },
  accentColor: "violet"
};
