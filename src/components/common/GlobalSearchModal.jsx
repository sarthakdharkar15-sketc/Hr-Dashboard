import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useHR } from "../../context/HRContext";
import {
  Search,
  Users,
  Briefcase,
  Ticket,
  Clock,
  Layers,
  ArrowRight,
  X,
  FileText,
  Settings
} from "lucide-react";

export const GlobalSearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, employees, candidates, tickets } = useHR();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleClose = () => {
    setQuery("");
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isSearchOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen, handleClose]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredEmployees = q
    ? employees
        .filter(
          (e) =>
            e.firstName.toLowerCase().includes(q) ||
            e.lastName.toLowerCase().includes(q) ||
            e.department.toLowerCase().includes(q) ||
            e.designation.toLowerCase().includes(q) ||
            e.email.toLowerCase().includes(q)
        )
        .slice(0, 4)
    : [];

  const filteredCandidates = q
    ? candidates
        .filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.role.toLowerCase().includes(q) ||
            c.department.toLowerCase().includes(q)
        )
        .slice(0, 3)
    : [];

  const filteredTickets = q
    ? tickets
        .filter(
          (t) =>
            t.subject.toLowerCase().includes(q) ||
            t.id.toLowerCase().includes(q) ||
            t.employeeName.toLowerCase().includes(q) ||
            t.category.toLowerCase().includes(q)
        )
        .slice(0, 3)
    : [];

  const navActions = [
    { label: "Overview Dashboard", path: "/", icon: Layers },
    { label: "Employee Directory", path: "/employees", icon: Users },
    { label: "Recruitment Pipeline", path: "/recruitment", icon: Briefcase },
    { label: "HR Support Tickets", path: "/support", icon: Ticket },
    { label: "Attendance & Leaves", path: "/attendance", icon: Clock },
    { label: "Reports & Analytics", path: "/reports", icon: FileText },
    { label: "System Settings", path: "/settings", icon: Settings }
  ].filter((item) => !q || item.label.toLowerCase().includes(q));

  const handleSelect = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      <div
        className="fixed inset-0 bg-[#070b16]/85 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-2xl bg-[#121A2B] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-[#0E1524]">
          <Search className="w-5 h-5 text-violet-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search employees, candidates, tickets, or shortcuts..."
            className="flex-1 bg-transparent border-0 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-0"
          />
          <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 rounded">
            ESC to close
          </span>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Quick Nav Items */}
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1.5">
              Quick Navigation
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {navActions.slice(0, q ? 6 : 4).map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.path}
                    onClick={() => handleSelect(action.path)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] transition text-left text-xs group"
                  >
                    <Icon className="w-4 h-4 text-violet-400 group-hover:text-violet-300" />
                    <span className="flex-1 font-medium">{action.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Employees match */}
          {filteredEmployees.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1.5">
                Employees ({filteredEmployees.length})
              </div>
              <div className="space-y-1">
                {filteredEmployees.map((emp) => (
                  <button
                    key={emp.id}
                    onClick={() => handleSelect("/employees")}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] transition text-left text-xs group"
                  >
                    <img
                      src={emp.avatar}
                      alt=""
                      className="w-7 h-7 rounded-full object-cover border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white truncate">
                        {emp.firstName} {emp.lastName}{" "}
                        <span className="text-[10px] text-slate-400 font-normal">({emp.id})</span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {emp.designation} • {emp.department}
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                      {emp.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Candidates match */}
          {filteredCandidates.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1.5">
                Recruitment Candidates ({filteredCandidates.length})
              </div>
              <div className="space-y-1">
                {filteredCandidates.map((cand) => (
                  <button
                    key={cand.id}
                    onClick={() => handleSelect("/recruitment")}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] transition text-left text-xs group"
                  >
                    <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold text-indigo-300">
                      {cand.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white truncate">{cand.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">
                        Applied for {cand.role}
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {cand.stage}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tickets match */}
          {filteredTickets.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1.5">
                HR Support Tickets ({filteredTickets.length})
              </div>
              <div className="space-y-1">
                {filteredTickets.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleSelect("/support")}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] transition text-left text-xs group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-[10px] font-mono text-rose-300">
                      #
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white truncate">{t.subject}</div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {t.id} • {t.employeeName} ({t.category})
                      </div>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        t.status === "Open"
                          ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                          : t.status === "In Progress"
                          ? "bg-violet-500/10 text-violet-300 border border-violet-500/20"
                          : "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                      }`}
                    >
                      {t.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {q &&
            filteredEmployees.length === 0 &&
            filteredCandidates.length === 0 &&
            filteredTickets.length === 0 && (
              <div className="py-8 text-center">
                <Search className="w-8 h-8 text-slate-600 mx-auto mb-2 opacity-50" />
                <p className="text-sm text-slate-400">No results found for "{query}"</p>
                <p className="text-xs text-slate-500 mt-1">
                  Try searching by name, role, department or ticket subject.
                </p>
              </div>
            )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#0B1020] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-slate-300">
                ↑↓
              </kbd>{" "}
              Navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-slate-300">
                ↵
              </kbd>{" "}
              Select
            </span>
          </div>
          <span className="text-violet-400 font-medium">HR NOVA Command Palette</span>
        </div>
      </div>
    </div>
  );
};
