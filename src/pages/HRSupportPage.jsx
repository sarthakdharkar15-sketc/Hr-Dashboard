import React, { useState, useMemo } from "react";
import { useHR } from "../context/HRContext";
import { Modal } from "../components/common/Modal";
import {
  LifeBuoy,
  Ticket,
  Search,
  Plus,
  AlertTriangle,
  Clock,
  CheckCircle2,
  MessageSquare,
  Send,
  Download
} from "lucide-react";

const CATEGORIES = [
  "All Categories",
  "Payroll Queries",
  "Leave Issues",
  "Workplace Complaints",
  "Technical Issues",
  "General HR Queries"
];

const PRIORITIES = ["All Priorities", "Urgent", "High", "Medium", "Low"];
const STATUSES = ["All Statuses", "Open", "In Progress", "Resolved"];

export const HRSupportPage = () => {
  const {
    tickets,
    addTicket,
    updateTicketStatus,
    updateTicketPriority,
    assignTicketHR,
    addTicketComment,
    employees,
    exportDataToCSV
  } = useHR();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedPriority, setSelectedPriority] = useState("All Priorities");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  // Modals & drawers
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);
  const [isTicketDetailOpen, setIsTicketDetailOpen] = useState(false);
  const [activeTicket, setActiveTicket] = useState(null);

  // New comment input
  const [commentText, setCommentText] = useState("");

  // New Ticket Form State
  const [ticketForm, setTicketForm] = useState({
    employeeName: "Elena Rostova",
    subject: "",
    category: "General HR Queries",
    priority: "Medium",
    assignedHR: "Aisha Patel",
    description: ""
  });

  // Ticket KPIs
  const totalCount = tickets.length;
  const openCount = tickets.filter((t) => t.status === "Open").length;
  const inProgressCount = tickets.filter((t) => t.status === "In Progress").length;
  const resolvedCount = tickets.filter((t) => t.status === "Resolved").length;

  // Filtered Tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.employeeName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat =
        selectedCategory === "All Categories" || ticket.category === selectedCategory;
      const matchesPri =
        selectedPriority === "All Priorities" || ticket.priority === selectedPriority;
      const matchesSt =
        selectedStatus === "All Statuses" || ticket.status === selectedStatus;

      return matchesSearch && matchesCat && matchesPri && matchesSt;
    });
  }, [tickets, searchTerm, selectedCategory, selectedPriority, selectedStatus]);

  const handleOpenDetail = (t) => {
    setActiveTicket(t);
    setCommentText("");
    setIsTicketDetailOpen(true);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!ticketForm.subject.trim() || !ticketForm.description.trim()) return;
    addTicket(ticketForm);
    setIsCreateTicketOpen(false);
    setTicketForm({
      employeeName: "Elena Rostova",
      subject: "",
      category: "General HR Queries",
      priority: "Medium",
      assignedHR: "Aisha Patel",
      description: ""
    });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim() || !activeTicket) return;
    addTicketComment(activeTicket.id, commentText, "Admin (HR Support)");

    // Update active ticket state in modal immediately
    setActiveTicket((prev) => ({
      ...prev,
      comments: [
        ...(prev.comments || []),
        { author: "Admin (HR Support)", date: "Just now", text: commentText }
      ]
    }));
    setCommentText("");
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "Urgent":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      case "High":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "Medium":
        return "bg-violet-500/20 text-violet-300 border-violet-500/30";
      case "Low":
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Open":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      case "In Progress":
        return "bg-violet-500/15 text-violet-300 border-violet-500/30";
      case "Resolved":
      default:
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <LifeBuoy className="w-6 h-6 text-violet-400" />
            <span>HR Support & Help Desk</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage employee queries, workplace cases, payroll investigations, and resolution SLAs
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => exportDataToCSV("tickets")}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Tickets</span>
          </button>
          <button
            onClick={() => setIsCreateTicketOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create Ticket</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Total Inquiries</span>
            <div className="text-2xl font-bold text-white mt-1">{totalCount}</div>
            <span className="text-[11px] text-slate-400">All recorded tickets</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <Ticket className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Open Tickets</span>
            <div className="text-2xl font-bold text-amber-400 mt-1">{openCount}</div>
            <span className="text-[11px] text-amber-400 font-medium">Awaiting assignment</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">In Progress</span>
            <div className="text-2xl font-bold text-violet-300 mt-1">{inProgressCount}</div>
            <span className="text-[11px] text-slate-400">Actively being handled</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#121A2B] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Resolved</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{resolvedCount}</div>
            <span className="text-[11px] text-emerald-400 font-medium">SLA satisfaction 99%</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#121A2B] border border-white/[0.08] rounded-2xl p-4 shadow-xl flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tickets by subject, ID, staff..."
            className="w-full bg-[#0B1020] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-violet-500"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Priority */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-violet-500"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-violet-500"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tickets Modern Table */}
      <div className="bg-[#121A2B] border border-white/[0.08] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0B1020] text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/[0.08]">
              <tr>
                <th className="py-3 px-4 font-semibold">Ticket ID</th>
                <th className="py-3 px-4 font-semibold">Employee</th>
                <th className="py-3 px-4 font-semibold">Subject & Category</th>
                <th className="py-3 px-4 font-semibold">Priority</th>
                <th className="py-3 px-4 font-semibold">Assigned HR</th>
                <th className="py-3 px-4 font-semibold">Created Date</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  onClick={() => handleOpenDetail(ticket)}
                  className="hover:bg-white/[0.02] transition cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-mono text-[11px] text-violet-300 font-semibold">
                    {ticket.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white group-hover:text-violet-300 transition">
                      {ticket.employeeName}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-medium text-white truncate">{ticket.subject}</div>
                    <span className="text-[11px] text-slate-400 mt-0.5 block">
                      {ticket.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getPriorityBadge(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">{ticket.assignedHR}</td>
                  <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                    {ticket.createdDate}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(
                        ticket.status
                      )}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleOpenDetail(ticket)}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition text-[11px] font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTickets.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs">
            No support tickets match the selected filters.
          </div>
        )}
      </div>

      {/* CREATE TICKET MODAL */}
      <Modal
        isOpen={isCreateTicketOpen}
        onClose={() => setIsCreateTicketOpen(false)}
        title="Create New HR Support Ticket"
        subtitle="Log employee requests, workplace reports, or payroll questions"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-300 mb-1">Requester Employee *</label>
            <select
              value={ticketForm.employeeName}
              onChange={(e) => setTicketForm({ ...ticketForm, employeeName: e.target.value })}
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
            <label className="block font-medium text-slate-300 mb-1">Subject *</label>
            <input
              type="text"
              required
              value={ticketForm.subject}
              onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
              placeholder="e.g. Parental leave benefits clarification"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Category</label>
              <select
                value={ticketForm.category}
                onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
              >
                {CATEGORIES.filter((c) => c !== "All Categories").map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-300 mb-1">Priority</label>
              <select
                value={ticketForm.priority}
                onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Assign to HR Specialist</label>
            <select
              value={ticketForm.assignedHR}
              onChange={(e) => setTicketForm({ ...ticketForm, assignedHR: e.target.value })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
            >
              <option value="Aisha Patel">Aisha Patel (People Partner)</option>
              <option value="Carlos Mendez">Carlos Mendez (Finance / Payroll)</option>
              <option value="Tariq Mansoor">Tariq Mansoor (IT & Access)</option>
              <option value="Admin HR">Admin HR Lead</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Case Description *</label>
            <textarea
              rows={3}
              required
              value={ticketForm.description}
              onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
              placeholder="Provide background context or requested actions..."
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={() => setIsCreateTicketOpen(false)}
              className="px-4 py-2 rounded-xl border border-white/10 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-lg shadow-violet-600/30"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </Modal>

      {/* TICKET DETAILS & DISCUSSION MODAL */}
      <Modal
        isOpen={isTicketDetailOpen}
        onClose={() => setIsTicketDetailOpen(false)}
        title={`Ticket ${activeTicket?.id}: ${activeTicket?.subject}`}
        subtitle={`Requested by ${activeTicket?.employeeName} • ${activeTicket?.category}`}
        maxWidth="max-w-2xl"
      >
        {activeTicket && (
          <div className="space-y-4 text-xs">
            {/* Control Bar: Status, Priority, Assignee */}
            <div className="p-3.5 rounded-xl bg-[#0B1020] border border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-slate-400 block mb-1">Current Status</span>
                <select
                  value={activeTicket.status}
                  onChange={(e) => {
                    updateTicketStatus(activeTicket.id, e.target.value);
                    setActiveTicket({ ...activeTicket, status: e.target.value });
                  }}
                  className="w-full bg-[#121A2B] border border-white/10 rounded-lg px-2.5 py-1.5 text-white font-medium focus:outline-none focus:border-violet-500"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Priority Level</span>
                <select
                  value={activeTicket.priority}
                  onChange={(e) => {
                    updateTicketPriority(activeTicket.id, e.target.value);
                    setActiveTicket({ ...activeTicket, priority: e.target.value });
                  }}
                  className="w-full bg-[#121A2B] border border-white/10 rounded-lg px-2.5 py-1.5 text-white font-medium focus:outline-none focus:border-violet-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Assigned HR Specialist</span>
                <select
                  value={activeTicket.assignedHR}
                  onChange={(e) => {
                    assignTicketHR(activeTicket.id, e.target.value);
                    setActiveTicket({ ...activeTicket, assignedHR: e.target.value });
                  }}
                  className="w-full bg-[#121A2B] border border-white/10 rounded-lg px-2.5 py-1.5 text-white font-medium focus:outline-none focus:border-violet-500"
                >
                  <option value="Aisha Patel">Aisha Patel</option>
                  <option value="Carlos Mendez">Carlos Mendez</option>
                  <option value="Tariq Mansoor">Tariq Mansoor</option>
                  <option value="Admin HR">Admin HR</option>
                </select>
              </div>
            </div>

            {/* Initial description */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <span className="text-slate-400 font-semibold">Initial Ticket Description</span>
              <p className="text-slate-200 leading-relaxed">
                {activeTicket.description || activeTicket.subject}
              </p>
            </div>

            {/* Conversation / Comments Thread */}
            <div className="space-y-2">
              <h4 className="text-white font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-violet-400" />
                <span>Resolution Audit Thread ({activeTicket.comments?.length || 0})</span>
              </h4>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {(activeTicket.comments || []).map((c, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-violet-300">{c.author}</span>
                      <span className="text-[10px] text-slate-500">{c.date}</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed">{c.text}</p>
                  </div>
                ))}
              </div>

              {/* Add comment input */}
              <form onSubmit={handleAddComment} className="pt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Type an update or reply to requester..."
                  className="flex-1 bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold flex items-center gap-1.5 transition active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
