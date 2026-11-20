import React, { useState } from "react";
import { useHR } from "../context/HRContext";
import { Modal } from "../components/common/Modal";
import {
  BarChart3,
  Download,
  Printer
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";

const TURNOVER_DATA = [
  { quarter: "Q1 2026", newHires: 18, departures: 2, retention: "98.2%" },
  { quarter: "Q2 2026", newHires: 24, departures: 3, retention: "97.5%" },
  { quarter: "Q3 2026", newHires: 32, departures: 4, retention: "96.8%" },
  { quarter: "Q4 2026", newHires: 28, departures: 2, retention: "98.6%" }
];

const DEMOGRAPHICS_DATA = [
  { name: "20-29 yrs", value: 38 },
  { name: "30-39 yrs", value: 65 },
  { name: "40-49 yrs", value: 34 },
  { name: "50+ yrs", value: 11 }
];

const COLORS = ["#8B5CF6", "#6366F1", "#06B6D4", "#10B981"];

export const ReportsPage = () => {
  const { exportDataToCSV } = useHR();
  const [timeRange, setTimeRange] = useState("Q4 2026");
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Title & Export bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-violet-400" />
            <span>Reports & Organizational Intelligence</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise analytics, demographic distributions, retention rates, and workforce KPIs
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-[#121A2B] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-violet-500"
          >
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Q3 2026">Q3 2026</option>
            <option value="Q4 2026">Q4 2026 (Current)</option>
            <option value="YTD 2026">Full Year 2026</option>
          </select>

          <button
            onClick={() => exportDataToCSV("employees")}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-slate-200 transition"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/30 transition active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Print Executive PDF</span>
          </button>
        </div>
      </div>

      {/* Analytics Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4">
          <span className="text-xs text-slate-400">Annual Retention Rate</span>
          <div className="text-2xl font-bold text-white mt-1">98.2%</div>
          <span className="text-[11px] text-emerald-400 font-medium">Top decile SaaS tier</span>
        </div>

        <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4">
          <span className="text-xs text-slate-400">Average Tenure</span>
          <div className="text-2xl font-bold text-violet-300 mt-1">2.8 Years</div>
          <span className="text-[11px] text-slate-400">+0.4 yrs year-over-year</span>
        </div>

        <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4">
          <span className="text-xs text-slate-400">Offer Acceptance Rate</span>
          <div className="text-2xl font-bold text-cyan-300 mt-1">91.4%</div>
          <span className="text-[11px] text-emerald-400 font-medium">+3.2% vs industry</span>
        </div>

        <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4">
          <span className="text-xs text-slate-400">HR Resolution SLA</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">99.1%</div>
          <span className="text-[11px] text-slate-400">&lt; 4 hours avg turnaround</span>
        </div>
      </div>

      {/* Main Charts: Turnover Trends & Age Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Turnover Bar & Line Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-[#121A2B] border border-white/[0.08] rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-white tracking-wide">
                Hiring vs Turnover Velocity
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                New staff onboarded compared against departures across fiscal quarters
              </p>
            </div>
            <span className="text-xs text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-semibold">
              Net Positive (+91 Headcount)
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TURNOVER_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="quarter" stroke="#64748B" tickLine={false} />
                <YAxis stroke="#64748B" tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0B1020", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px" }}
                />
                <Bar dataKey="newHires" name="New Hires" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="departures" name="Departures" fill="#F43F5E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-violet-500" />
                New Hires
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-rose-500" />
                Voluntary / Involuntary Departures
              </span>
            </div>
          </div>
        </div>

        {/* Age Demographics Donut */}
        <div className="bg-[#121A2B] border border-white/[0.08] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-white tracking-wide">
              Workforce Demographics
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Age bracket distribution across org</p>
          </div>

          <div className="h-56 w-full relative my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DEMOGRAPHICS_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DEMOGRAPHICS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#0B1020", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-slate-400">Median</span>
              <span className="text-lg font-bold text-white">33.5 yrs</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs pt-3 border-t border-white/[0.06]">
            {DEMOGRAPHICS_DATA.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  {d.name}
                </span>
                <span className="font-mono text-slate-400">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demographic & Departmental Table */}
      <div className="bg-[#121A2B] border border-white/[0.08] rounded-2xl p-5 shadow-xl space-y-4">
        <h3 className="text-base font-semibold text-white tracking-wide">
          Departmental Resource Utilization & Compensation
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0B1020] text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/[0.08]">
              <tr>
                <th className="py-2.5 px-3">Business Unit</th>
                <th className="py-2.5 px-3">Headcount</th>
                <th className="py-2.5 px-3">Avg Comp</th>
                <th className="py-2.5 px-3">Attendance</th>
                <th className="py-2.5 px-3">Performance Index</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {[
                { dept: "Engineering", count: 54, comp: "$162,000", att: "98.4%", perf: "4.8 / 5", status: "Optimal" },
                { dept: "Product Design", count: 20, comp: "$152,000", att: "97.1%", perf: "4.7 / 5", status: "Optimal" },
                { dept: "Marketing & Growth", count: 25, comp: "$138,000", att: "95.8%", perf: "4.6 / 5", status: "Optimal" },
                { dept: "Enterprise Sales", count: 29, comp: "$145,000", att: "96.4%", perf: "4.7 / 5", status: "Optimal" },
                { dept: "Customer Success", count: 17, comp: "$120,000", att: "98.9%", perf: "4.8 / 5", status: "Optimal" },
                { dept: "People & HR", count: 11, comp: "$132,000", att: "99.2%", perf: "4.9 / 5", status: "Optimal" }
              ].map((row) => (
                <tr key={row.dept} className="hover:bg-white/[0.02]">
                  <td className="py-2.5 px-3 font-semibold text-white">{row.dept}</td>
                  <td className="py-2.5 px-3">{row.count} FTEs</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400">{row.comp}</td>
                  <td className="py-2.5 px-3 text-cyan-300">{row.att}</td>
                  <td className="py-2.5 px-3 text-amber-300 font-semibold">{row.perf}</td>
                  <td className="py-2.5 px-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PRINTABLE EXECUTIVE PDF REPORT MODAL */}
      <Modal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        title="Executive Workforce Intelligence Briefing"
        subtitle="Nova Technologies Inc. — Q4 2026 Audit Report"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-[#090E1A] border border-white/[0.08] space-y-3 font-sans">
            <div className="flex justify-between items-start border-b border-white/[0.08] pb-3">
              <div>
                <h2 className="text-base font-bold text-white">NOVA TECHNOLOGIES INC.</h2>
                <p className="text-[11px] text-slate-400">Quarterly Workforce Audit & Performance Summary</p>
              </div>
              <div className="text-right font-mono text-[10px] text-slate-400">
                Generated: Nov 2026<br />
                Security Tier: CONFIDENTIAL
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-slate-300 text-[11px]">
              <div><strong>Total Headcount:</strong> 148 Staff</div>
              <div><strong>Retention Rate:</strong> 98.2%</div>
              <div><strong>Open Requisitions:</strong> 5 Active</div>
              <div><strong>Avg Employee Rating:</strong> 4.74 / 5.0</div>
            </div>

            <div className="pt-2 border-t border-white/[0.08]">
              <h4 className="text-white font-semibold text-xs mb-1">Executive Summary</h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                During the fourth fiscal quarter, workforce growth surged by 14% year-to-date while voluntary turnover remained suppressed at historic lows of 1.8%. Engineering and Sales divisions scaled with 91.4% offer acceptance. Organizational compliance and time-tracking consistency remain exceptional at 98.2%.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-2">
            <button
              onClick={() => setIsPrintModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-white/10 text-slate-300 hover:text-white"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-violet-600/30"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
