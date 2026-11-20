import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHR } from "../context/HRContext";
import { StatCard } from "../components/common/StatCard";
import {
  Users,
  UserCheck,
  CalendarOff,
  Briefcase,
  UserPlus,
  LifeBuoy,
  Plus,
  Download,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronRight
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Analytics Sample Data
const GROWTH_DATA = [
  { month: "May", headcount: 94, fullTime: 82, contractors: 12 },
  { month: "Jun", headcount: 102, fullTime: 88, contractors: 14 },
  { month: "Jul", headcount: 110, fullTime: 95, contractors: 15 },
  { month: "Aug", headcount: 121, fullTime: 104, contractors: 17 },
  { month: "Sep", headcount: 132, fullTime: 112, contractors: 20 },
  { month: "Oct", headcount: 140, fullTime: 120, contractors: 20 },
  { month: "Nov", headcount: 148, fullTime: 126, contractors: 22 }
];

const ATTENDANCE_TREND = [
  { day: "Mon", present: 96, remote: 42, late: 6, leave: 4 },
  { day: "Tue", present: 102, remote: 38, late: 4, leave: 4 },
  { day: "Wed", present: 98, remote: 40, late: 5, leave: 5 },
  { day: "Thu", present: 104, remote: 36, late: 3, leave: 5 },
  { day: "Fri", present: 88, remote: 50, late: 7, leave: 3 }
];

const DEPT_COLORS = ["#8B5CF6", "#6366F1", "#06B6D4", "#10B981", "#F59E0B", "#EC4899", "#84CC16"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0B1020] border border-white/10 rounded-xl p-3 shadow-2xl text-xs space-y-1">
        <p className="font-semibold text-white">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-400 capitalize">{entry.name}:</span>
            <span className="font-semibold text-slate-100">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const OverviewPage = () => {
  const {
    employees,
    jobOpenings,
    candidates,
    tickets,
    activities,
    events,
    exportDataToCSV
  } = useHR();

  const navigate = useNavigate();
  const [growthTimeframe, setGrowthTimeframe] = useState("6M");

  // Dynamic Metrics
  const totalEmployees = employees.length + 138; // Representing enterprise scale
  const activeEmployees = employees.filter((e) => e.status === "Active").length + 130;
  const onLeaveCount = employees.filter((e) => e.status === "On Leave").length + 5;
  const openPositions = jobOpenings.filter((j) => j.status === "Open").length;
  const newApplicants = candidates.length + 84;
  const pendingTickets = tickets.filter((t) => t.status !== "Resolved").length;

  // Department distribution calculation
  const deptMap = {};
  employees.forEach((emp) => {
    deptMap[emp.department] = (deptMap[emp.department] || 0) + 1;
  });
  // Add enterprise baseline
  deptMap["Engineering"] = (deptMap["Engineering"] || 0) + 52;
  deptMap["Product Design"] = (deptMap["Product Design"] || 0) + 18;
  deptMap["Marketing"] = (deptMap["Marketing"] || 0) + 24;
  deptMap["Sales"] = (deptMap["Sales"] || 0) + 28;
  deptMap["Customer Success"] = (deptMap["Customer Success"] || 0) + 16;
  deptMap["Human Resources"] = (deptMap["Human Resources"] || 0) + 10;

  const departmentData = Object.keys(deptMap).map((key) => ({
    name: key,
    value: deptMap[key]
  }));

  // Recruitment funnel stages
  const funnelStages = [
    { stage: "Applied", count: 142, rate: "100%", color: "bg-slate-500" },
    { stage: "Screening", count: 86, rate: "60.5%", color: "bg-indigo-500" },
    { stage: "Shortlisted", count: 38, rate: "26.7%", color: "bg-cyan-500" },
    { stage: "Interview", count: 18, rate: "12.6%", color: "bg-violet-500" },
    { stage: "Selected", count: 6, rate: "4.2%", color: "bg-emerald-500" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#171A35] via-[#121A2B] to-[#0D1525] border border-white/[0.08] p-6 lg:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>HR Nova Enterprise Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Good Morning, Admin 👋
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Here's what's happening across your organization today. 6 candidates scheduled for interviews and 4 pending leave requests require your review.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate("/employees")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Employee</span>
            </button>
            <button
              onClick={() => navigate("/recruitment")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white text-xs font-semibold transition active:scale-95"
            >
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span>Post Job</span>
            </button>
            <button
              onClick={() => exportDataToCSV("employees")}
              className="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-slate-300 hover:text-white text-xs font-medium transition"
              title="Download Employee Summary"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 6 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          trend="+8.4%"
          trendType="up"
          comparison="vs last month"
          icon={Users}
          accent="violet"
          sparklineData={[110, 118, 125, 130, 138, 142, 148]}
        />
        <StatCard
          title="Active Staff"
          value={activeEmployees}
          trend="+6.1%"
          trendType="up"
          comparison="94% in office/wfh"
          icon={UserCheck}
          accent="emerald"
          sparklineData={[102, 108, 115, 120, 124, 128, 138]}
        />
        <StatCard
          title="On Leave"
          value={onLeaveCount}
          trend="-2.3%"
          trendType="down"
          comparison="Planned leaves"
          icon={CalendarOff}
          accent="amber"
          sparklineData={[8, 9, 7, 10, 6, 8, 6]}
        />
        <StatCard
          title="Open Positions"
          value={openPositions}
          trend="+2"
          trendType="up"
          comparison="Active postings"
          icon={Briefcase}
          accent="indigo"
          sparklineData={[3, 4, 4, 5, 5, 6, 5]}
        />
        <StatCard
          title="New Applicants"
          value={newApplicants}
          trend="+18.2%"
          trendType="up"
          comparison="This fortnight"
          icon={UserPlus}
          accent="cyan"
          sparklineData={[45, 52, 60, 68, 72, 85, 90]}
        />
        <StatCard
          title="Pending HR Requests"
          value={pendingTickets}
          trend="-12%"
          trendType="down"
          comparison="SLA 98.4%"
          icon={LifeBuoy}
          accent="violet"
          sparklineData={[9, 8, 7, 6, 5, 4, 3]}
        />
      </div>

      {/* Main Analytics Row: Growth Area Chart & Department Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee Growth Area Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-[#121A2B] border border-white/[0.08] rounded-2xl p-5 shadow-xl flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-base font-semibold text-white tracking-wide flex items-center gap-2">
                <span>Headcount & Workforce Growth</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 font-medium">
                  +14% YTD
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Full-time staff vs external contractors over the selected period
              </p>
            </div>
            <div className="flex items-center gap-1 bg-[#0B1020] p-1 rounded-xl border border-white/[0.08] text-xs">
              {["1M", "3M", "6M", "1Y"].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setGrowthTimeframe(tf)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${
                    growthTimeframe === tf
                      ? "bg-violet-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={GROWTH_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHeadcount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorFullTime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" tickLine={false} />
                <YAxis stroke="#64748B" tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="headcount"
                  name="Total Headcount"
                  stroke="#8B5CF6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorHeadcount)"
                />
                <Area
                  type="monotone"
                  dataKey="fullTime"
                  name="Full-Time"
                  stroke="#06B6D4"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorFullTime)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                Total Headcount (148)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                Full-Time Staff (126)
              </span>
            </div>
            <span className="text-[11px] text-emerald-400 font-medium">
              Turnover rate: 1.8% (Benchmark: 4.2%)
            </span>
          </div>
        </div>

        {/* Department Distribution Donut Chart */}
        <div className="bg-[#121A2B] border border-white/[0.08] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-white tracking-wide">
              Department Distribution
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Headcount breakdown by operational business unit
            </p>
          </div>

          <div className="h-56 w-full relative my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={DEPT_COLORS[index % DEPT_COLORS.length]}
                      stroke="#121A2B"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-white tracking-tight">148</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Members</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-white/[0.06]">
            {departmentData.slice(0, 6).map((dept, idx) => (
              <div key={dept.name} className="flex items-center gap-2 text-slate-300 truncate">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: DEPT_COLORS[idx % DEPT_COLORS.length] }}
                />
                <span className="truncate text-[11px]">{dept.name}</span>
                <span className="text-slate-500 text-[10px] ml-auto font-mono">
                  {dept.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Analytics Row: Attendance Overview Bar Chart & Recruitment Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Weekly Bar Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-[#121A2B] border border-white/[0.08] rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-white tracking-wide">
                Weekly Attendance & Presence
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Physical office, remote check-ins, late arrivals, and leaves
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              98.2% Avg Compliance
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ATTENDANCE_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="#64748B" tickLine={false} />
                <YAxis stroke="#64748B" tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="present" name="In Office" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="remote" name="Remote" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="late" name="Late Arrivals" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-violet-500" />
                In Office
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-cyan-400" />
                Remote
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-amber-500" />
                Late
              </span>
            </div>
            <button
              onClick={() => navigate("/attendance")}
              className="text-violet-400 hover:text-violet-300 inline-flex items-center gap-1 font-medium text-xs"
            >
              View Timesheet <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Recruitment Pipeline Funnel Visualization */}
        <div className="bg-[#121A2B] border border-white/[0.08] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white tracking-wide">
                Recruitment Funnel
              </h3>
              <button
                onClick={() => navigate("/recruitment")}
                className="text-xs text-violet-400 hover:text-violet-300 font-medium"
              >
                Kanban Board →
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Candidate progression across hiring stages
            </p>
          </div>

          <div className="space-y-3.5 my-4">
            {funnelStages.map((stage) => (
              <div key={stage.stage} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-200">{stage.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px] font-mono">{stage.count} candidates</span>
                    <span className="font-semibold text-white text-[11px]">{stage.rate}</span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${stage.color} transition-all duration-500`}
                    style={{ width: stage.rate }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-xs text-violet-200 flex items-center justify-between">
            <span>6 candidates in final selection</span>
            <span className="font-semibold text-white font-mono">Top 4.2%</span>
          </div>
        </div>
      </div>

      {/* Third Row: Recent Activities Timeline & Upcoming Calendar Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities Timeline (2 Cols) */}
        <div className="lg:col-span-2 bg-[#121A2B] border border-white/[0.08] rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-white tracking-wide">
              Recent Organizational Activities
            </h3>
            <span className="text-xs text-slate-400">Live Event Feed</span>
          </div>

          <div className="space-y-4">
            {activities.slice(0, 6).map((activity, idx) => (
              <div key={activity.id} className="relative flex items-start gap-3 group">
                {/* Connecting line */}
                {idx < 5 && (
                  <div className="absolute left-3.5 top-6 bottom-0 w-px bg-white/[0.08]" />
                )}
                <div className="w-7 h-7 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300 shrink-0 z-10 group-hover:scale-110 transition-transform">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="text-xs text-slate-200 leading-snug">
                    <strong className="text-white font-semibold">{activity.user}</strong>{" "}
                    {activity.action}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events Calendar Widget */}
        <div className="bg-[#121A2B] border border-white/[0.08] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-semibold text-white tracking-wide">
                Upcoming Events
              </h3>
              <Calendar className="w-4 h-4 text-violet-400" />
            </div>
            <p className="text-xs text-slate-400 mb-4">Key dates, interviews & townhalls</p>

            <div className="space-y-3">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] transition flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex flex-col items-center justify-center text-center shrink-0">
                    <span className="text-[9px] font-bold text-violet-400 uppercase leading-none">
                      {evt.date.split(" ")[0]}
                    </span>
                    <span className="text-sm font-extrabold text-white leading-none mt-0.5">
                      {evt.date.split(" ")[1]?.replace(",", "")}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-white truncate">{evt.title}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <span>{evt.time}</span>
                      <span>•</span>
                      <span className="text-violet-300 font-medium">{evt.attendees}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate("/attendance")}
            className="w-full mt-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition flex items-center justify-center gap-2"
          >
            <span>Open Corporate Calendar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
