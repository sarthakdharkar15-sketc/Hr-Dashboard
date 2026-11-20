import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useHR } from "../../context/HRContext";
import {
  Search,
  Bell,
  HelpCircle,
  Menu,
  ChevronRight,
  LogOut,
  User,
  Shield,
  CheckCircle,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Sliders
} from "lucide-react";
import { Modal } from "../common/Modal";

export const TopNavbar = ({ onToggleMobileSidebar }) => {
  const {
    setIsSearchOpen,
    unreadNotifications,
    setUnreadNotifications,
    activities,
    markQuickAttendance
  } = useHR();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Live Clock updater
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Breadcrumb mapping
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === "/") return [{ label: "Dashboard", path: "/" }, { label: "Overview", path: "/" }];
    if (path.startsWith("/employees")) return [{ label: "Workforce", path: "/" }, { label: "Employees", path: "/employees" }];
    if (path.startsWith("/recruitment")) return [{ label: "Hiring", path: "/" }, { label: "Recruitment CRM", path: "/recruitment" }];
    if (path.startsWith("/support")) return [{ label: "Help Desk", path: "/" }, { label: "HR Support", path: "/support" }];
    if (path.startsWith("/attendance")) return [{ label: "Time Tracking", path: "/" }, { label: "Attendance & Leaves", path: "/attendance" }];
    if (path.startsWith("/performance")) return [{ label: "Appraisals", path: "/" }, { label: "Performance & OKRs", path: "/performance" }];
    if (path.startsWith("/reports")) return [{ label: "Intelligence", path: "/" }, { label: "Reports & Analytics", path: "/reports" }];
    if (path.startsWith("/settings")) return [{ label: "Administration", path: "/" }, { label: "System Settings", path: "/settings" }];
    return [{ label: "Dashboard", path: "/" }];
  };

  const breadcrumbs = getBreadcrumbs();

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <>
      <header className="h-16 bg-[#0B1020]/90 backdrop-blur-md border-b border-white/[0.08] sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left Side: Mobile Toggle & Breadcrumbs */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
            aria-label="Open Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb Navigation */}
          <nav className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.path + idx}>
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-600" />}
                <Link
                  to={crumb.path}
                  className={`hover:text-slate-200 transition ${
                    idx === breadcrumbs.length - 1
                      ? "text-white font-medium"
                      : "text-slate-400"
                  }`}
                >
                  {crumb.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md mx-2">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-[#121A2B] border border-white/[0.08] hover:border-violet-500/40 text-slate-400 hover:text-slate-200 transition-all text-xs group shadow-inner"
          >
            <div className="flex items-center gap-2.5 truncate">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-violet-400 transition-colors" />
              <span className="truncate">Search employees, tickets, candidates...</span>
            </div>
            <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-[10px] font-mono text-slate-400 group-hover:text-violet-300">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right Side: Quick Clock-in, Date/Time, Notifications, Help, Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Live Date display */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300">
            <CalendarIcon className="w-3.5 h-3.5 text-violet-400" />
            <span>{formattedDate}</span>
            <span className="text-slate-600">•</span>
            <ClockIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-slate-200">{formattedTime}</span>
          </div>

          {/* Quick Clock-in Button */}
          <button
            onClick={() => markQuickAttendance("Present")}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-xs font-semibold text-violet-200 transition-all shadow-sm shadow-violet-500/10 active:scale-95"
            title="Record Attendance for Today"
          >
            <CheckCircle className="w-3.5 h-3.5 text-violet-400" />
            <span>Clock In</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] transition"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 ring-2 ring-[#0B1020] animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#121A2B] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-3.5 border-b border-white/[0.08] flex items-center justify-between bg-[#0E1524]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">Notifications</span>
                    {unreadNotifications > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full bg-violet-500/20 text-violet-300 text-[10px] font-bold">
                        {unreadNotifications} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setUnreadNotifications(0)}
                    className="text-[11px] text-violet-400 hover:text-violet-300 font-medium"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-white/[0.04]">
                  {activities.slice(0, 5).map((act) => (
                    <div
                      key={act.id}
                      className="p-3 hover:bg-white/[0.02] transition flex items-start gap-3 text-xs"
                    >
                      <div className="w-2 h-2 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-200 leading-snug">
                          <strong className="text-white font-medium">{act.user}</strong>{" "}
                          {act.action}
                        </p>
                        <span className="text-[10px] text-slate-500 mt-0.5 block">
                          {act.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2 border-t border-white/[0.08] text-center bg-[#0B1020]">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      navigate("/support");
                    }}
                    className="text-[11px] text-slate-400 hover:text-white transition"
                  >
                    View all organization alerts
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Help Button */}
          <button
            onClick={() => setShowHelpModal(true)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] transition"
            title="Help & System Guide"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 pl-2 rounded-full hover:bg-white/[0.06] transition"
            >
              <div className="text-right hidden sm:block">
                <div className="text-xs font-semibold text-white leading-none">Admin User</div>
                <div className="text-[10px] text-violet-400 mt-0.5 font-medium">VP People & Ops</div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Admin"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-violet-500/40"
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#121A2B] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-3.5 border-b border-white/[0.08] bg-[#0E1524]">
                  <div className="text-xs font-semibold text-white">Admin User</div>
                  <div className="text-[11px] text-slate-400 truncate">admin@novatech.io</div>
                  <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-semibold">
                    Super Administrator
                  </span>
                </div>

                <div className="p-1 text-xs">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate("/employees");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] transition text-left"
                  >
                    <User className="w-4 h-4 text-violet-400" />
                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate("/settings");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] transition text-left"
                  >
                    <Sliders className="w-4 h-4 text-indigo-400" />
                    <span>System Preferences</span>
                  </button>
                </div>

                <div className="p-1 border-t border-white/[0.08]">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      alert("You are running in persistent Enterprise Admin mode.");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition text-left text-xs font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Lock Session</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Help Modal */}
      <Modal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        title="HR NOVA Enterprise Quick Reference"
        subtitle="Overview of modules and shortcuts for modern HR management"
      >
        <div className="space-y-4 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-violet-500/10 border border-violet-500/20">
            <h4 className="font-semibold text-violet-300 mb-1 flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> Enterprise SaaS HR Platform
            </h4>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              HR NOVA gives administrators complete oversight over employee lifecycles, active recruitment pipelines, enterprise help desk tickets, attendance logs, and corporate reports.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="font-semibold text-white mb-1">Global Command Bar</div>
              <p className="text-slate-400 text-[11px]">
                Press <kbd className="px-1 py-0.5 rounded bg-white/10 text-slate-300 font-mono text-[10px]">Ctrl+K</kbd> anywhere to search employees, candidates, and tickets in milliseconds.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="font-semibold text-white mb-1">Persistent Storage</div>
              <p className="text-slate-400 text-[11px]">
                All edits, additions, ticket updates, and leave approvals are persistently synced to your browser's localStorage.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="font-semibold text-white mb-1">Recruitment Kanban</div>
              <p className="text-slate-400 text-[11px]">
                Track candidates across Applied, Screening, Shortlisted, Interview, Selected, and Rejected stages.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="font-semibold text-white mb-1">Reports & CSV Export</div>
              <p className="text-slate-400 text-[11px]">
                Generate CSV exports directly for employee rosters, recruitment pipeline metrics, and ticket archives.
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
