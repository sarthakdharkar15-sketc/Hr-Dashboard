import React, { useState } from "react";
import { useHR } from "../context/HRContext";
import { Modal } from "../components/common/Modal";
import {
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Plus,
  Download,
  Check,
  X
} from "lucide-react";

export const AttendanceLeavePage = () => {
  const {
    attendanceLogs,
    leaveRequests,
    updateLeaveStatus,
    addLeaveRequest,
    markQuickAttendance,
    employees,
    exportDataToCSV
  } = useHR();

  const [activeTab, setActiveTab] = useState("attendance"); // "attendance" | "leaves"
  const [isRequestLeaveOpen, setIsRequestLeaveOpen] = useState(false);

  // New Leave Request form state
  const [leaveForm, setLeaveForm] = useState({
    employeeName: "Elena Rostova",
    department: "Engineering",
    leaveType: "Annual Leave",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    days: 3,
    reason: ""
  });

  // Calculate stats
  const presentCount = attendanceLogs.filter((l) => l.status === "Present").length + 118;
  const lateCount = attendanceLogs.filter((l) => l.status === "Late").length + 4;
  const onLeaveCount = leaveRequests.filter((l) => l.status === "Approved").length + 5;

  const pendingLeaves = leaveRequests.filter((l) => l.status === "Pending");
  const processedLeaves = leaveRequests.filter((l) => l.status !== "Pending");

  // Sample calendar days for current month (Nov 2026)
  const calendarDays = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    let status = "present";
    if (day === 4) status = "late";
    if (day === 7 || day === 8 || day === 14 || day === 15 || day === 21 || day === 22 || day === 28 || day === 29)
      status = "weekend";
    if (day === 11 || day === 12) status = "holiday";
    return { day, status };
  });

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    if (!leaveForm.reason.trim()) return;
    addLeaveRequest(leaveForm);
    setIsRequestLeaveOpen(false);
    setLeaveForm({
      employeeName: "Elena Rostova",
      department: "Engineering",
      leaveType: "Annual Leave",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      days: 3,
      reason: ""
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Clock className="w-6 h-6 text-cyan-400" />
            <span>Attendance & Leave Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track daily employee shifts, biometrics, planned absences, and approval workflows
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => exportDataToCSV("leave")}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Leaves</span>
          </button>
          <button
            onClick={() => setIsRequestLeaveOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/30 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Request Leave</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Present Today</span>
            <div className="text-2xl font-bold text-white mt-1">{presentCount}</div>
            <span className="text-[11px] text-emerald-400">97.8% Compliance</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Late Arrivals</span>
            <div className="text-2xl font-bold text-amber-400 mt-1">{lateCount}</div>
            <span className="text-[11px] text-slate-400">&gt; 15 mins grace</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">On Approved Leave</span>
            <div className="text-2xl font-bold text-cyan-300 mt-1">{onLeaveCount}</div>
            <span className="text-[11px] text-cyan-400">Sabbaticals & annual</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Pending Leave Approvals</span>
            <div className="text-2xl font-bold text-violet-400 mt-1">
              {pendingLeaves.length}
            </div>
            <span className="text-[11px] text-violet-300">Requires sign-off</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
        <button
          onClick={() => setActiveTab("attendance")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === "attendance"
              ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
              : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
          }`}
        >
          Daily Attendance Logs & Calendar
        </button>
        <button
          onClick={() => setActiveTab("leaves")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
            activeTab === "leaves"
              ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
              : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
          }`}
        >
          <span>Leave Requests & Balances</span>
          {pendingLeaves.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-violet-500 text-white text-[10px] font-bold">
              {pendingLeaves.length}
            </span>
          )}
        </button>
      </div>

      {/* ATTENDANCE TAB */}
      {activeTab === "attendance" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Attendance Records (2 Cols) */}
          <div className="lg:col-span-2 bg-[#121A2B] border border-white/[0.08] rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white tracking-wide">
                  Live Attendance Feed
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Today's clock-in timestamps and workstation status
                </p>
              </div>
              <button
                onClick={() => markQuickAttendance("Present")}
                className="px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition"
              >
                Mark Attendance
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#0B1020] text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/[0.08]">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Employee</th>
                    <th className="py-2.5 px-3 font-semibold">Clock In</th>
                    <th className="py-2.5 px-3 font-semibold">Clock Out</th>
                    <th className="py-2.5 px-3 font-semibold">Hours</th>
                    <th className="py-2.5 px-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {attendanceLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/[0.02] transition">
                      <td className="py-2.5 px-3 font-medium text-white">{log.employeeName}</td>
                      <td className="py-2.5 px-3 font-mono text-cyan-300">{log.timeIn}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-400">{log.timeOut}</td>
                      <td className="py-2.5 px-3">{log.hours}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            log.status === "Present"
                              ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                              : log.status === "Late"
                              ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                              : "bg-slate-500/15 text-slate-300 border border-slate-500/30"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monthly Attendance Calendar Heatmap */}
          <div className="bg-[#121A2B] border border-white/[0.08] rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white tracking-wide">
                  Monthly Calendar
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">November 2026</p>
              </div>
              <span className="text-[11px] text-cyan-400 font-mono">160 Working Hours</span>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div key={i} className="text-[10px] font-semibold text-slate-500 py-1">
                  {d}
                </div>
              ))}
              {calendarDays.map((item) => (
                <div
                  key={item.day}
                  className={`h-9 rounded-lg flex flex-col items-center justify-center font-mono text-xs transition ${
                    item.status === "weekend"
                      ? "bg-white/[0.02] text-slate-600"
                      : item.status === "holiday"
                      ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                      : item.status === "late"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold"
                      : "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20"
                  }`}
                  title={`Day ${item.day}: ${item.status}`}
                >
                  <span>{item.day}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500/40" /> Present
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-amber-500/40" /> Late
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-violet-500/40" /> Holiday
              </span>
            </div>
          </div>
        </div>
      )}

      {/* LEAVE MANAGEMENT TAB */}
      {activeTab === "leaves" && (
        <div className="space-y-6">
          {/* Leave Balances Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4">
              <span className="text-xs text-slate-400">Casual Leave Pool</span>
              <div className="text-xl font-bold text-white mt-1">12 Days / Year</div>
              <p className="text-[11px] text-slate-400 mt-1">Avg 8.4 remaining per employee</p>
            </div>
            <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4">
              <span className="text-xs text-slate-400">Sick & Medical Leave</span>
              <div className="text-xl font-bold text-white mt-1">10 Days / Year</div>
              <p className="text-[11px] text-emerald-400 mt-1">100% Paid with doctor note</p>
            </div>
            <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4">
              <span className="text-xs text-slate-400">Annual Paid Vacation</span>
              <div className="text-xl font-bold text-white mt-1">20 Days / Year</div>
              <p className="text-[11px] text-cyan-400 mt-1">Carryover limit: 5 days</p>
            </div>
            <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4">
              <span className="text-xs text-slate-400">Parental & Maternity</span>
              <div className="text-xl font-bold text-white mt-1">16 Weeks Paid</div>
              <p className="text-[11px] text-violet-300 mt-1">Standard enterprise coverage</p>
            </div>
          </div>

          {/* Pending Approval Requests */}
          <div className="bg-[#121A2B] border border-white/[0.08] rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white tracking-wide">
                  Pending Leave Authorizations ({pendingLeaves.length})
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Approve or decline submitted employee leave requests
                </p>
              </div>
            </div>

            {pendingLeaves.length > 0 ? (
              <div className="space-y-3">
                {pendingLeaves.map((leave) => (
                  <div
                    key={leave.id}
                    className="p-4 rounded-xl bg-[#0B1020] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-xs">
                          {leave.employeeName}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                          {leave.leaveType}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">({leave.id})</span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Reason: <span className="text-slate-400">{leave.reason}</span>
                      </p>
                      <div className="text-[11px] text-slate-400">
                        Duration: <span className="text-white font-medium">{leave.days} days</span>{" "}
                        ({leave.startDate} to {leave.endDate})
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => updateLeaveStatus(leave.id, "Rejected")}
                        className="px-3.5 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition active:scale-95"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>
                      <button
                        onClick={() => updateLeaveStatus(leave.id, "Approved")}
                        className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition active:scale-95"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Leave</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs border border-dashed border-white/[0.08] rounded-xl">
                All leave requests have been reviewed and resolved!
              </div>
            )}
          </div>

          {/* Historical Leave Table */}
          <div className="bg-[#121A2B] border border-white/[0.08] rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-white/[0.08]">
              <h3 className="text-sm font-semibold text-white">Historical Leave Records</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#0B1020] text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/[0.08]">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">ID</th>
                    <th className="py-2.5 px-3 font-semibold">Employee</th>
                    <th className="py-2.5 px-3 font-semibold">Leave Type</th>
                    <th className="py-2.5 px-3 font-semibold">Days</th>
                    <th className="py-2.5 px-3 font-semibold">Dates</th>
                    <th className="py-2.5 px-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {processedLeaves.map((l) => (
                    <tr key={l.id} className="hover:bg-white/[0.02]">
                      <td className="py-2.5 px-3 font-mono text-cyan-400">{l.id}</td>
                      <td className="py-2.5 px-3 font-medium text-white">{l.employeeName}</td>
                      <td className="py-2.5 px-3">{l.leaveType}</td>
                      <td className="py-2.5 px-3">{l.days} days</td>
                      <td className="py-2.5 px-3 text-slate-400">
                        {l.startDate} – {l.endDate}
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            l.status === "Approved"
                              ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                              : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                          }`}
                        >
                          {l.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* REQUEST LEAVE MODAL */}
      <Modal
        isOpen={isRequestLeaveOpen}
        onClose={() => setIsRequestLeaveOpen(false)}
        title="Submit Leave Request"
        subtitle="Forward time-off requests to department lead for authorization"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleLeaveSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-300 mb-1">Employee Requester</label>
            <select
              value={leaveForm.employeeName}
              onChange={(e) => setLeaveForm({ ...leaveForm, employeeName: e.target.value })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            >
              {employees.map((emp) => (
                <option key={emp.id} value={`${emp.firstName} ${emp.lastName}`}>
                  {emp.firstName} {emp.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Leave Category</label>
            <select
              value={leaveForm.leaveType}
              onChange={(e) => setLeaveForm({ ...leaveForm, leaveType: e.target.value })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="Annual Leave">Annual Paid Leave</option>
              <option value="Sick Leave">Sick & Medical Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Maternity/Paternity">Maternity / Paternity</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Start Date</label>
              <input
                type="date"
                required
                value={leaveForm.startDate}
                onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-300 mb-1">End Date</label>
              <input
                type="date"
                required
                value={leaveForm.endDate}
                onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Number of Days</label>
            <input
              type="number"
              min="1"
              max="60"
              value={leaveForm.days}
              onChange={(e) => setLeaveForm({ ...leaveForm, days: Number(e.target.value) })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Reason & Coverage Plan *</label>
            <textarea
              rows={3}
              required
              value={leaveForm.reason}
              onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              placeholder="Explain context and peer coverage during time off..."
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={() => setIsRequestLeaveOpen(false)}
              className="px-4 py-2 rounded-xl border border-white/10 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-lg shadow-cyan-600/30"
            >
              Submit Request
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
