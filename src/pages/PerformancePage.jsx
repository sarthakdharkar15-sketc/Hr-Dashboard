import React, { useState } from "react";
import { useHR } from "../context/HRContext";
import { Modal } from "../components/common/Modal";
import {
  Award,
  Target,
  Star,
  TrendingUp,
  CheckCircle2,
  Plus,
  Sparkles
} from "lucide-react";

const INITIAL_OKRS = [
  {
    id: "OKR-1",
    department: "Engineering",
    title: "Achieve 99.99% Core Service Reliability & Microsecond Latency",
    owner: "Elena Rostova",
    progress: 88,
    target: "99.99%",
    metric: "4 nines SLA",
    status: "On Track"
  },
  {
    id: "OKR-2",
    department: "Product Design",
    title: "Unify Enterprise SaaS Design System & Accessibility Compliance",
    owner: "Marcus Vance",
    progress: 95,
    target: "100%",
    metric: "WCAG AAA Verified",
    status: "On Track"
  },
  {
    id: "OKR-3",
    department: "Growth Marketing",
    title: "Expand North America Mid-Market Enterprise Pipeline to $10M ARR",
    owner: "David Kim",
    progress: 74,
    target: "$10M ARR",
    metric: "$7.4M Contracted",
    status: "At Risk"
  },
  {
    id: "OKR-4",
    department: "Human Resources",
    title: "Scale Engineering Staff with Under 30-Day Time-to-Hire",
    owner: "Aisha Patel",
    progress: 90,
    target: "28 Days",
    metric: "Current: 24 Days",
    status: "On Track"
  }
];

export const PerformancePage = () => {
  const { employees, addToast } = useHR();
  const [okrs] = useState(INITIAL_OKRS);
  const [selectedCycle, setSelectedCycle] = useState("Q4 2026 (Active)");
  const [isNewReviewOpen, setIsNewReviewOpen] = useState(false);

  // Review Form
  const [reviewForm, setReviewForm] = useState({
    employeeName: "Sophia Chen",
    reviewer: "Elena Rostova",
    rating: 5,
    summary: "Demonstrated exceptional engineering leadership on the new high-throughput telemetry pipeline."
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    addToast("Appraisal Recorded", `Q4 Performance review submitted for ${reviewForm.employeeName}.`, "success");
    setIsNewReviewOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Title & Cycle selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Award className="w-6 h-6 text-amber-400" />
            <span>Performance & Objectives (OKRs)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Conduct 360 appraisal cycles, align quarterly deliverables, and benchmark organizational talent
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedCycle}
            onChange={(e) => setSelectedCycle(e.target.value)}
            className="bg-[#121A2B] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
          >
            <option value="Q4 2026 (Active)">Q4 2026 (Active Appraisal)</option>
            <option value="Q3 2026">Q3 2026 (Concluded)</option>
            <option value="Mid-Year 2026">Mid-Year 2026</option>
          </select>

          <button
            onClick={() => setIsNewReviewOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-lg shadow-amber-600/30 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Review</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Org Average Rating</span>
            <div className="text-2xl font-bold text-white mt-1 flex items-center gap-1.5">
              <Star className="w-5 h-5 text-amber-400 fill-current" />
              <span>4.74 / 5.0</span>
            </div>
            <span className="text-[11px] text-emerald-400">Top 5% high performing</span>
          </div>
        </div>

        <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Reviews Completed</span>
            <div className="text-2xl font-bold text-violet-300 mt-1">86%</div>
            <span className="text-[11px] text-slate-400">128 of 148 recorded</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Company OKRs on Track</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">92.5%</div>
            <span className="text-[11px] text-slate-400">Key deliverables aligned</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Target className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Eligible for Promotion</span>
            <div className="text-2xl font-bold text-cyan-300 mt-1">16 Members</div>
            <span className="text-[11px] text-cyan-400">Staff & Principal tier</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* OKR Tracker Section */}
      <div className="bg-[#121A2B] border border-white/[0.08] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white tracking-wide flex items-center gap-2">
              <Target className="w-4 h-4 text-violet-400" />
              <span>Strategic Key Objectives (OKRs)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Progress tracking on company-wide quarterly milestones
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {okrs.map((okr) => (
            <div
              key={okr.id}
              className="p-4 rounded-xl bg-[#0B1020] border border-white/[0.08] space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20">
                    {okr.department}
                  </span>
                  <h4 className="text-xs font-semibold text-white mt-1.5 leading-snug">
                    {okr.title}
                  </h4>
                  <span className="text-[11px] text-slate-400">Lead: {okr.owner}</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    okr.status === "On Track"
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                      : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                  }`}
                >
                  {okr.status}
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">{okr.metric}</span>
                  <span className="font-semibold text-white">{okr.progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/[0.08] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      okr.progress > 85 ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                    style={{ width: `${okr.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9-Box Talent Matrix Visualization */}
      <div className="bg-[#121A2B] border border-white/[0.08] rounded-2xl p-5 shadow-xl space-y-4">
        <div>
          <h3 className="text-base font-semibold text-white tracking-wide">
            Enterprise 9-Box Talent Grid
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Cross-mapping performance ratings against high-potential leadership trajectories
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          {/* Row 1: High Potential */}
          <div className="p-3.5 rounded-xl bg-violet-500/10 border border-violet-500/20">
            <span className="text-[10px] text-violet-400 uppercase font-semibold">Rough Diamond</span>
            <div className="text-xs font-bold text-white mt-1">High Pot. / Low Perf.</div>
            <span className="text-[10px] text-slate-400 block mt-1">4 Employees</span>
          </div>
          <div className="p-3.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30">
            <span className="text-[10px] text-indigo-400 uppercase font-semibold">Future Leader</span>
            <div className="text-xs font-bold text-white mt-1">High Pot. / Good Perf.</div>
            <span className="text-[10px] text-slate-400 block mt-1">14 Employees</span>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 shadow-inner">
            <span className="text-[10px] text-emerald-400 uppercase font-bold flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" /> Star Performer
            </span>
            <div className="text-xs font-bold text-white mt-1">Elena, Sophia, Marcus</div>
            <span className="text-[10px] text-emerald-300 block mt-1">18 High Impact</span>
          </div>

          {/* Row 2: Medium Potential */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Inconsistent</span>
            <div className="text-xs font-medium text-slate-300 mt-1">Med Pot. / Low Perf.</div>
            <span className="text-[10px] text-slate-500 block mt-1">3 Employees</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <span className="text-[10px] text-slate-300 uppercase font-semibold">Core Contributor</span>
            <div className="text-xs font-semibold text-white mt-1">Med Pot. / Med Perf.</div>
            <span className="text-[10px] text-slate-400 block mt-1">42 Employees</span>
          </div>
          <div className="p-3.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30">
            <span className="text-[10px] text-cyan-400 uppercase font-semibold">High Professional</span>
            <div className="text-xs font-bold text-white mt-1">Med Pot. / High Perf.</div>
            <span className="text-[10px] text-slate-400 block mt-1">26 Employees</span>
          </div>

          {/* Row 3: Low Potential */}
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <span className="text-[10px] text-rose-400 uppercase font-semibold">Talent Risk</span>
            <div className="text-xs font-medium text-rose-300 mt-1">Low Pot. / Low Perf.</div>
            <span className="text-[10px] text-rose-400 block mt-1">1 Employee (PIP)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Solid Performer</span>
            <div className="text-xs font-medium text-slate-300 mt-1">Low Pot. / Med Perf.</div>
            <span className="text-[10px] text-slate-500 block mt-1">12 Employees</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-[10px] text-slate-300 uppercase font-semibold">Trusted Specialist</span>
            <div className="text-xs font-medium text-white mt-1">Low Pot. / High Perf.</div>
            <span className="text-[10px] text-slate-400 block mt-1">8 Employees</span>
          </div>
        </div>
      </div>

      {/* SUBMIT REVIEW MODAL */}
      <Modal
        isOpen={isNewReviewOpen}
        onClose={() => setIsNewReviewOpen(false)}
        title="Record Performance Appraisal"
        subtitle="Log quarterly evaluation notes and assign merit rating"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-300 mb-1">Employee Reviewed</label>
            <select
              value={reviewForm.employeeName}
              onChange={(e) => setReviewForm({ ...reviewForm, employeeName: e.target.value })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
            >
              {employees.map((emp) => (
                <option key={emp.id} value={`${emp.firstName} ${emp.lastName}`}>
                  {emp.firstName} {emp.lastName} ({emp.designation})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Reviewing Lead / Evaluator</label>
            <input
              type="text"
              value={reviewForm.reviewer}
              onChange={(e) => setReviewForm({ ...reviewForm, reviewer: e.target.value })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">
              Merit Rating (1.0 to 5.0)
            </label>
            <select
              value={reviewForm.rating}
              onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
            >
              <option value={5}>5.0 — Outstanding / Far Exceeds</option>
              <option value={4.5}>4.5 — Consistently Exceeds</option>
              <option value={4}>4.0 — Meets Expectations</option>
              <option value={3}>3.0 — Needs Coaching</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Executive Summary *</label>
            <textarea
              rows={3}
              required
              value={reviewForm.summary}
              onChange={(e) => setReviewForm({ ...reviewForm, summary: e.target.value })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={() => setIsNewReviewOpen(false)}
              className="px-4 py-2 rounded-xl border border-white/10 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold shadow-lg shadow-amber-600/30"
            >
              Save Appraisal
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
