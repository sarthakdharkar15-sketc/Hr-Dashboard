# HR NOVA — Enterprise Smart HR Management System (HRMS)

> A modern dark-themed enterprise SaaS HR platform inspired by Linear, Stripe, and Vercel. Engineered with React 19, Vite, Tailwind CSS v4, Recharts, and Lucide Icons.

---

## 🌟 Visual Identity & Design System

- **Background Palette**: Deep Midnight Navy (`#0B1020`), Elevated Cards (`#121A2B`), Dark Accents (`#0E1524`).
- **Accent Tokens**: Electric Violet (`#8B5CF6`), Deep Indigo (`#6366F1`), Cyan Highlights (`#06B6D4`), Emerald Green (`#10B981`), Rose Red (`#F43F5E`).
- **Borders & Elevation**: Low-opacity soft borders (`border-white/[0.08]`), multi-layer drop shadows, subtle hover translations.
- **Typography**: Inter / Plus Jakarta Sans geometric font stack with clean tabular numbers and monospace IDs.
- **Micro-Interactions**: Real-time toast notifications, confetti celebrations on hiring offers, live clock and date synchronization, and a `Ctrl+K` command palette.

---

## 🚀 Key Modules & Architecture

### 1. Global Navigation & Command Palette
- **Collapsible Sidebar**: Expanding and collapsing sidebar with live badge counters (candidates in pipeline, open tickets, pending leaves), active pill indicators, and company SOC2 sync indicators.
- **Top Navigation Bar**: Live local clock, dynamic breadcrumb tracking, quick "Clock In" attendance trigger, notification tray with badge counter, and user profile drawer.
- **Global Search (`Ctrl+K` / `⌘K`)**: Instant search dialog searching across employees, job candidates, support tickets, and quick keyboard navigation links.

### 2. Overview Dashboard
- **Welcome Section**: Personalized greeting with quick action buttons (*Add Employee*, *Post Job*, *Export CSV*).
- **6 KPI Metric Cards**:
  - Total Employees (with +8.4% trend sparkline)
  - Active Staff (with 94% presence rate)
  - On Leave (with planned leaves tracking)
  - Open Positions (active job requisitions)
  - New Applicants (+18.2% trend)
  - Pending HR Requests (98.4% SLA resolution rate)
- **Interactive Analytics**:
  - **Employee Growth**: High-fidelity Area Chart comparing total headcount against full-time staff.
  - **Department Distribution**: Donut Chart showing departmental allocation with center KPI.
  - **Weekly Attendance**: Multi-column Bar Chart comparing In-Office, Remote, and Late check-ins.
  - **Recruitment Funnel**: Visual funnel metric tracking candidate stage transition rates.
  - **Recent Activities Timeline**: Live chronological audit log of actions across the system.
  - **Upcoming Corporate Events**: Townhall RSVP trackers, anniversary milestones, and interviews.

### 3. Employee Records Directory
- **Dual View Modes**: Interactive switch between **Table View** and **Grid Cards View**.
- **Search & Multi-Filtering**: Search by name, ID, email, or role; filter by 7 departments and 3 status states.
- **Column Sorting**: Sortable columns by ID, Name, Department, Status, and Joining Date.
- **Full CRUD Operations**:
  - Add New Employee modal with complete form validation.
  - Edit Employee modal with pre-filled state.
  - Delete Employee modal with safety confirmation.
- **5-Tab Detailed Profile Drawer**:
  1. *Personal Information*: Legal name, contact details, emergency phone, work location.
  2. *Job & Compensation*: Base salary, manager, joining date, verified skill tags.
  3. *Attendance History*: Year-to-date compliance rate, recent punch times.
  4. *Performance Overview*: Merit rating, OKR deliverable status.
  5. *Leave Balance*: Casual, Sick, Annual, and Carryover counts.

### 4. Recruitment Management / CRM
- **Kanban-Style Hiring Pipeline**: 6 hiring stages (*Applied*, *Screening*, *Shortlisted*, *Interview*, *Selected*, *Rejected*).
- **Interactive Stage Transitions**: Move candidates across stages with 1-click stage dropdowns.
- **Hiring Celebration**: Confetti bursts upon moving candidate to "Selected / Hired".
- **Candidate Dossier**: View candidate profile, match score, rating, interview schedule, and evaluator notes.
- **Resume Document Preview**: Modal simulating verified PDF resume curriculum vitae.
- **Job Requisitions Management**: View open postings, salary bands, and publish new roles.
- **Interview Scheduling**: Book dates, assign lead interviewers, and specify technical review scopes.

### 5. HR Support & Ticket Management
- **Help Desk KPIs**: Total Inquiries, Open, In Progress, and Resolved status counters.
- **Category Filtering**: Payroll Queries, Leave Issues, Workplace Complaints, Technical Issues, General HR Queries.
- **Priority Tiering**: Urgent, High, Medium, Low badges with visual contrast.
- **Ticket Investigation Drawer**:
  - Live status updater (Open ↔ In Progress ↔ Resolved).
  - Priority changer and HR specialist reassignment.
  - Interactive discussion & comments thread with instant timestamped replies.

### 6. Attendance & Leave Management
- **Daily Attendance Feed**: Clock In/Out timestamps, total hours, and presence tags.
- **Monthly Attendance Heatmap**: Visual calendar grid highlighting on-time, late, and holiday days.
- **Leave Request Management**: 1-click **Approve** or **Decline** actions for pending leave requests.
- **Leave Balance Pool**: Casual, Sick, Annual, and Maternity pool meters.
- **Request Leave Modal**: Employee time-off submission form with reason and coverage plan.

### 7. Performance & OKRs
- **Strategic OKRs Tracker**: Real-time progress bars, deliverable metrics, and department leads.
- **Enterprise 9-Box Talent Matrix**: Grid cross-mapping potential against performance ratings.
- **360 Appraisal Submission**: Record merit ratings (1.0 - 5.0) and executive evaluation reviews.

### 8. Reports & Analytics
- **Workforce Retention Velocity**: Hiring vs departures quarterly bar chart.
- **Demographics Breakdown**: Age distribution donut chart and median employee age metrics.
- **Departmental Cost & Attendance Table**: Headcount, avg compensation, and performance indices.
- **Live CSV Export**: Download real `.csv` files for employees, candidates, tickets, and leave logs.
- **Printable Executive Briefing**: Modal formatted for browser printing and PDF generation.

### 9. System Settings & Governance
- **Organization Profile**: Legal name, corporate domain, timezones, currency, and work week configuration.
- **Roles & Permissions (RBAC)**: Permission matrices for Super Admin, HR Business Partner, Department Lead, and Staff.
- **Notification Subscriptions**: Interactive toggles for Slack webhooks, email digests, and escalation pings.
- **Theme Palette Customization**: Accent switcher between Electric Violet, Deep Indigo, and Cyber Cyan.

---

## 💾 LocalStorage Persistence

All mutations are automatically synchronized to browser `localStorage` under the `hr_nova_*` prefix:
- `hr_nova_employees`
- `hr_nova_candidates`
- `hr_nova_jobOpenings`
- `hr_nova_tickets`
- `hr_nova_leaveRequests`
- `hr_nova_attendanceLogs`
- `hr_nova_activities`
- `hr_nova_settings`

Refreshing or reopening the browser preserves all changes seamlessly.

---

## 🔌 Future Backend Integration (FastAPI + MySQL)

The system is architected with clean service abstraction in `src/context/HRContext.jsx`. To connect a Python FastAPI + MySQL backend:

```
[ Frontend: React / Vite ]
         │ (HTTP / JSON)
         ▼
[ FastAPI Endpoints ]
  - GET/POST/PUT/DELETE /api/v1/employees
  - GET/POST/PUT/DELETE /api/v1/candidates
  - GET/POST/PUT/DELETE /api/v1/tickets
  - GET/POST/PUT/DELETE /api/v1/leaves
  - GET/POST/PUT/DELETE /api/v1/attendance
         │ (SQLAlchemy ORM)
         ▼
[ MySQL Database: hr_nova_db ]
  - tables: employees, candidates, job_openings, tickets, leave_requests, attendance_logs
```

---

## 🛠️ Local Development & Build

```bash
# Run local Vite development server
npm run dev

# Run oxlint for code analysis
npm run lint

# Compile production bundle
npm run build

# Preview production build locally
npm run preview
```
