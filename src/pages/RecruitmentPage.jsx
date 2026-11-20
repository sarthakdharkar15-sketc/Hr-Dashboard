import React, { useState, useMemo } from "react";
import { useHR } from "../context/HRContext";
import { Modal } from "../components/common/Modal";
import confetti from "canvas-confetti";
import {
  Briefcase,
  Users,
  Calendar,
  Search,
  Plus,
  Star,
  FileText,
  Mail,
  Phone,
  UserCheck
} from "lucide-react";

const STAGES = [
  { id: "Applied", label: "Applied", color: "border-slate-500/40 text-slate-300 bg-slate-500/10" },
  { id: "Screening", label: "Screening", color: "border-indigo-500/40 text-indigo-300 bg-indigo-500/10" },
  { id: "Shortlisted", label: "Shortlisted", color: "border-cyan-500/40 text-cyan-300 bg-cyan-500/10" },
  { id: "Interview", label: "Interview", color: "border-violet-500/40 text-violet-300 bg-violet-500/10" },
  { id: "Selected", label: "Selected / Hired", color: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10" },
  { id: "Rejected", label: "Rejected", color: "border-rose-500/40 text-rose-300 bg-rose-500/10" }
];

export const RecruitmentPage = () => {
  const {
    candidates,
    jobOpenings,
    addCandidate,
    moveCandidateStage,
    updateCandidate,
    addJobOpening,
    employees
  } = useHR();

  const [activeTab, setActiveTab] = useState("kanban"); // "kanban" | "jobs"
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");

  // Modals
  const [isAddCandidateOpen, setIsAddCandidateOpen] = useState(false);
  const [isCandidateProfileOpen, setIsCandidateProfileOpen] = useState(false);
  const [isScheduleInterviewOpen, setIsScheduleInterviewOpen] = useState(false);
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);

  const [activeCandidate, setActiveCandidate] = useState(null);

  // Forms
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Senior Full Stack Engineer",
    department: "Engineering",
    experience: "5 years",
    notes: ""
  });

  const [interviewForm, setInterviewForm] = useState({
    date: "2026-11-18",
    time: "02:00 PM",
    interviewer: "Elena Rostova",
    notes: "Technical architecture challenge & system design"
  });

  const [jobForm, setJobForm] = useState({
    title: "",
    department: "Engineering",
    location: "San Francisco, CA / Remote",
    type: "Full-time",
    salaryRange: "$140k - $170k",
    description: ""
  });

  // Filtered Candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter((cand) => {
      const matchesSearch =
        cand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cand.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cand.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = selectedRole === "All Roles" || cand.role === selectedRole;
      return matchesSearch && matchesRole;
    });
  }, [candidates, searchTerm, selectedRole]);

  // Unique roles
  const rolesList = ["All Roles", ...new Set(candidates.map((c) => c.role))];

  // Pipeline metrics
  const totalCandidates = candidates.length + 84;
  const activeOpenings = jobOpenings.filter((j) => j.status === "Open").length;
  const interviewCount = candidates.filter((c) => c.stage === "Interview").length;
  const selectedCount = candidates.filter((c) => c.stage === "Selected").length;

  const handleStageChange = (candidateId, newStage) => {
    moveCandidateStage(candidateId, newStage);
    if (newStage === "Selected") {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  };

  const handleAddCandidateSubmit = (e) => {
    e.preventDefault();
    if (!candidateForm.name || !candidateForm.email) return;
    addCandidate(candidateForm);
    setIsAddCandidateOpen(false);
    setCandidateForm({
      name: "",
      email: "",
      phone: "",
      role: "Senior Full Stack Engineer",
      department: "Engineering",
      experience: "5 years",
      notes: ""
    });
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (activeCandidate) {
      updateCandidate(activeCandidate.id, {
        interviewDate: `${interviewForm.date} at ${interviewForm.time}`,
        interviewer: interviewForm.interviewer,
        notes: `${activeCandidate.notes || ""}\nInterview scheduled: ${interviewForm.notes}`
      });
      setIsScheduleInterviewOpen(false);
    }
  };

  const handleAddJobSubmit = (e) => {
    e.preventDefault();
    if (!jobForm.title) return;
    addJobOpening(jobForm);
    setIsAddJobOpen(false);
    setJobForm({
      title: "",
      department: "Engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      salaryRange: "$140k - $170k",
      description: ""
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Title & KPI Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-indigo-400" />
            <span>Recruitment Management & CRM</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track talent acquisition pipelines, schedule interviews, and manage open requisitions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddJobOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition"
          >
            <Plus className="w-4 h-4 text-indigo-400" />
            <span>Post Job</span>
          </button>
          <button
            onClick={() => setIsAddCandidateOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Candidate</span>
          </button>
        </div>
      </div>

      {/* Recruitment KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Total Applicants</span>
            <div className="text-2xl font-bold text-white mt-1">{totalCandidates}</div>
            <span className="text-[11px] text-emerald-400">+22 this week</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Active Openings</span>
            <div className="text-2xl font-bold text-white mt-1">{activeOpenings}</div>
            <span className="text-[11px] text-slate-400">Across 4 departments</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Interviews Scheduled</span>
            <div className="text-2xl font-bold text-white mt-1">{interviewCount + 5}</div>
            <span className="text-[11px] text-cyan-400">Next 48 hours</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Selected / Hired</span>
            <div className="text-2xl font-bold text-white mt-1">{selectedCount + 8}</div>
            <span className="text-[11px] text-emerald-400">Acceptance 92%</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("kanban")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === "kanban"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            Kanban Pipeline Board
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === "jobs"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            Job Openings ({jobOpenings.length})
          </button>
        </div>

        {activeTab === "kanban" && (
          <div className="flex items-center gap-2.5">
            <div className="relative w-48 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search candidates..."
                className="w-full bg-[#121A2B] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-[#121A2B] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              {rolesList.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* KANBAN BOARD VIEW */}
      {activeTab === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start overflow-x-auto pb-4">
          {STAGES.map((stage) => {
            const stageCandidates = filteredCandidates.filter((c) => c.stage === stage.id);
            return (
              <div
                key={stage.id}
                className="bg-[#0e1626] border border-white/[0.06] rounded-2xl p-3 flex flex-col min-h-[540px] shadow-lg"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        stage.id === "Selected"
                          ? "bg-emerald-400"
                          : stage.id === "Interview"
                          ? "bg-violet-400"
                          : stage.id === "Rejected"
                          ? "bg-rose-400"
                          : "bg-indigo-400"
                      }`}
                    />
                    <h3 className="text-xs font-semibold text-white tracking-wide">{stage.label}</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-[10px] font-mono text-slate-300">
                    {stageCandidates.length}
                  </span>
                </div>

                {/* Candidate Cards List */}
                <div className="space-y-3 flex-1">
                  {stageCandidates.map((cand) => (
                    <div
                      key={cand.id}
                      onClick={() => {
                        setActiveCandidate(cand);
                        setIsCandidateProfileOpen(true);
                      }}
                      className="group bg-[#121A2B] border border-white/[0.08] hover:border-indigo-500/40 rounded-xl p-3.5 shadow-md hover:shadow-xl transition-all cursor-pointer space-y-2.5"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={cand.avatar}
                            alt=""
                            className="w-7 h-7 rounded-full object-cover ring-1 ring-white/10"
                          />
                          <div>
                            <h4 className="text-xs font-semibold text-white group-hover:text-indigo-300 transition truncate max-w-[110px]">
                              {cand.name}
                            </h4>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              {cand.id}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-amber-400">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{cand.rating || 4}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-300 truncate">
                        <span className="text-slate-400">Role:</span> {cand.role}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/[0.04]">
                        <span>Exp: {cand.experience}</span>
                        <span className="text-indigo-300 font-medium">
                          Match: {cand.matchScore || 85}%
                        </span>
                      </div>

                      {/* Quick stage changer buttons */}
                      <div
                        className="pt-2 flex items-center justify-between gap-1 border-t border-white/[0.04]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <select
                          value={cand.stage}
                          onChange={(e) => handleStageChange(cand.id, e.target.value)}
                          className="bg-[#0B1020] border border-white/10 rounded-lg px-2 py-1 text-[10px] text-slate-300 focus:outline-none focus:border-indigo-500 w-full"
                        >
                          {STAGES.map((s) => (
                            <option key={s.id} value={s.id}>
                              Move to: {s.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}

                  {stageCandidates.length === 0 && (
                    <div className="h-32 border border-dashed border-white/[0.06] rounded-xl flex items-center justify-center text-[11px] text-slate-600">
                      No candidates
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* JOB OPENINGS TAB VIEW */}
      {activeTab === "jobs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobOpenings.map((job) => (
            <div
              key={job.id}
              className="bg-[#121A2B] border border-white/[0.08] hover:border-indigo-500/30 rounded-2xl p-5 shadow-xl transition space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 font-semibold">
                    {job.id}
                  </span>
                  <h3 className="text-sm font-semibold text-white mt-1.5">{job.title}</h3>
                  <span className="text-xs text-slate-400">{job.department}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold">
                  {job.status}
                </span>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {job.description || "Exciting role building cloud infrastructure at Nova Tech."}
              </p>

              <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span>Location:</span>
                  <span className="text-white">{job.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Salary Range:</span>
                  <span className="text-emerald-400 font-mono">{job.salaryRange}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Applicants:</span>
                  <span className="text-indigo-300 font-semibold">{job.applicantsCount} active</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedRole(job.title);
                    setActiveTab("kanban");
                  }}
                  className="flex-1 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition text-center"
                >
                  View Applicants Board
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CANDIDATE PROFILE MODAL */}
      <Modal
        isOpen={isCandidateProfileOpen}
        onClose={() => setIsCandidateProfileOpen(false)}
        title={`Candidate: ${activeCandidate?.name}`}
        subtitle={`Applied for ${activeCandidate?.role} • ${activeCandidate?.department}`}
        maxWidth="max-w-2xl"
      >
        {activeCandidate && (
          <div className="space-y-5 text-xs">
            <div className="p-4 rounded-xl bg-[#0B1020] border border-white/[0.08] flex items-center gap-4">
              <img
                src={activeCandidate.avatar}
                alt=""
                className="w-16 h-16 rounded-xl object-cover ring-2 ring-indigo-500/30 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white truncate">{activeCandidate.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold">
                    {activeCandidate.stage}
                  </span>
                </div>
                <div className="text-slate-400 mt-0.5">
                  Match Score: <span className="text-emerald-400 font-bold">{activeCandidate.matchScore}%</span> • Experience: {activeCandidate.experience}
                </div>
                <div className="flex items-center gap-3 text-slate-300 mt-2">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    {activeCandidate.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    {activeCandidate.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Notes & Interview status */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="text-slate-400 font-semibold">Evaluator Notes & Feedback</div>
              <p className="text-slate-200 leading-relaxed">
                {activeCandidate.notes || "High domain suitability. Recommended for team architectural screening."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-slate-400">Scheduled Interview</div>
                <div className="text-white font-medium mt-1">
                  {activeCandidate.interviewDate || "Not Scheduled"}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-slate-400">Assigned Interviewer</div>
                <div className="text-violet-300 font-medium mt-1">
                  {activeCandidate.interviewer || "Unassigned"}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setIsResumePreviewOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 text-xs font-medium transition"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Preview Resume Document</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsCandidateProfileOpen(false);
                    setIsScheduleInterviewOpen(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/30 transition"
                >
                  Schedule Interview
                </button>
                <button
                  onClick={() => {
                    handleStageChange(activeCandidate.id, "Selected");
                    setIsCandidateProfileOpen(false);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/30 transition"
                >
                  Make Offer
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* SCHEDULE INTERVIEW MODAL */}
      <Modal
        isOpen={isScheduleInterviewOpen}
        onClose={() => setIsScheduleInterviewOpen(false)}
        title={`Schedule Interview: ${activeCandidate?.name}`}
        subtitle={`For ${activeCandidate?.role}`}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleScheduleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-300 mb-1">Interview Date</label>
            <input
              type="date"
              value={interviewForm.date}
              onChange={(e) => setInterviewForm({ ...interviewForm, date: e.target.value })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Time Slot</label>
            <input
              type="text"
              value={interviewForm.time}
              onChange={(e) => setInterviewForm({ ...interviewForm, time: e.target.value })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
              placeholder="02:00 PM PST"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Lead Interviewer</label>
            <select
              value={interviewForm.interviewer}
              onChange={(e) => setInterviewForm({ ...interviewForm, interviewer: e.target.value })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
            >
              {employees.map((emp) => (
                <option key={emp.id} value={`${emp.firstName} ${emp.lastName}`}>
                  {emp.firstName} {emp.lastName} ({emp.designation})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Interview Scope / Notes</label>
            <textarea
              rows={3}
              value={interviewForm.notes}
              onChange={(e) => setInterviewForm({ ...interviewForm, notes: e.target.value })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
              placeholder="Technical challenge, system design, or cultural assessment"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={() => setIsScheduleInterviewOpen(false)}
              className="px-4 py-2 rounded-xl border border-white/10 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-lg shadow-violet-600/30"
            >
              Confirm & Send Invite
            </button>
          </div>
        </form>
      </Modal>

      {/* ADD CANDIDATE MODAL */}
      <Modal
        isOpen={isAddCandidateOpen}
        onClose={() => setIsAddCandidateOpen(false)}
        title="Add Candidate to Pipeline"
        subtitle="Record applicant details and resume submission"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleAddCandidateSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-300 mb-1">Candidate Full Name *</label>
            <input
              type="text"
              required
              value={candidateForm.name}
              onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="Maya Lin"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Email *</label>
              <input
                type="email"
                required
                value={candidateForm.email}
                onChange={(e) => setCandidateForm({ ...candidateForm, email: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                placeholder="maya@example.com"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-300 mb-1">Phone</label>
              <input
                type="text"
                value={candidateForm.phone}
                onChange={(e) => setCandidateForm({ ...candidateForm, phone: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                placeholder="+1 (555) 432-1098"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Applying For Role</label>
              <select
                value={candidateForm.role}
                onChange={(e) => setCandidateForm({ ...candidateForm, role: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                {jobOpenings.map((job) => (
                  <option key={job.id} value={job.title}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-300 mb-1">Years of Experience</label>
              <input
                type="text"
                value={candidateForm.experience}
                onChange={(e) => setCandidateForm({ ...candidateForm, experience: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                placeholder="6 years"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Initial Screening Notes</label>
            <textarea
              rows={2}
              value={candidateForm.notes}
              onChange={(e) => setCandidateForm({ ...candidateForm, notes: e.target.value })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="Candidate referral, strong portfolio..."
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={() => setIsAddCandidateOpen(false)}
              className="px-4 py-2 rounded-xl border border-white/10 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30"
            >
              Add to Applied Stage
            </button>
          </div>
        </form>
      </Modal>

      {/* POST JOB OPENING MODAL */}
      <Modal
        isOpen={isAddJobOpen}
        onClose={() => setIsAddJobOpen(false)}
        title="Post New Requisition"
        subtitle="Publish a new open role across the organization"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleAddJobSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-300 mb-1">Job Title *</label>
            <input
              type="text"
              required
              value={jobForm.title}
              onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="Staff Security Engineer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Department</label>
              <select
                value={jobForm.department}
                onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Engineering">Engineering</option>
                <option value="Product Design">Product Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-300 mb-1">Salary Range</label>
              <input
                type="text"
                value={jobForm.salaryRange}
                onChange={(e) => setJobForm({ ...jobForm, salaryRange: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                placeholder="$160k - $190k"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Location & Work Mode</label>
            <input
              type="text"
              value={jobForm.location}
              onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="San Francisco, CA / Hybrid"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Job Description</label>
            <textarea
              rows={3}
              value={jobForm.description}
              onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="Responsibilities, technical expectations, and team scope..."
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={() => setIsAddJobOpen(false)}
              className="px-4 py-2 rounded-xl border border-white/10 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30"
            >
              Publish Job Opening
            </button>
          </div>
        </form>
      </Modal>

      {/* RESUME PREVIEW MODAL */}
      <Modal
        isOpen={isResumePreviewOpen}
        onClose={() => setIsResumePreviewOpen(false)}
        title={`Resume: ${activeCandidate?.name} — ${activeCandidate?.role}`}
        subtitle="Official Curriculum Vitae (Verified PDF / Document Stream)"
        maxWidth="max-w-2xl"
      >
        <div className="p-6 rounded-xl bg-[#090E1A] border border-white/[0.08] space-y-4 font-sans text-xs">
          <div className="border-b border-white/[0.08] pb-4 flex items-start justify-between">
            <div>
              <h2 className="text-base font-bold text-white">{activeCandidate?.name}</h2>
              <p className="text-violet-400 font-medium">{activeCandidate?.role}</p>
              <div className="text-slate-400 text-[11px] mt-1">
                {activeCandidate?.email} • {activeCandidate?.phone}
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
              Verified Candidate
            </span>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-white font-semibold uppercase text-[10px] tracking-wider text-slate-400">
              Professional Summary
            </h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Accomplished professional with {activeCandidate?.experience || "6 years"} of demonstrated success designing and scaling enterprise SaaS platforms. Expert in agile system development, architectural design, cross-functional engineering leadership, and high availability systems.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-semibold uppercase text-[10px] tracking-wider text-slate-400">
              Work Experience
            </h4>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-1">
              <div className="flex justify-between font-semibold text-white">
                <span>Senior Software Lead — CloudScale Inc.</span>
                <span className="text-slate-400 text-[10px]">2022 – Present</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Architected microservice pipelines handling over 50M daily events with 99.99% uptime. Led a team of 8 core platform engineers.
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-white font-semibold uppercase text-[10px] tracking-wider text-slate-400">
              Education & Degrees
            </h4>
            <p className="text-slate-300 text-[11px]">
              B.S. in Computer Science — University of California, Berkeley (Honors)
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
