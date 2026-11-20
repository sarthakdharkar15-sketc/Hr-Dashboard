import React from "react";
import { NavLink } from "react-router-dom";
import { useHR } from "../../context/HRContext";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  LifeBuoy,
  Clock,
  Award,
  BarChart3,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building2
} from "lucide-react";

export const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const { candidates, tickets, leaveRequests } = useHR();

  // Badges calculation
  const pendingCandidates = candidates.filter((c) => c.stage === "Interview" || c.stage === "Shortlisted").length;
  const openTickets = tickets.filter((t) => t.status === "Open" || t.status === "In Progress").length;
  const pendingLeaves = leaveRequests.filter((l) => l.status === "Pending").length;

  const navItems = [
    {
      label: "Overview",
      path: "/",
      icon: LayoutDashboard,
      badge: null
    },
    {
      label: "Employees",
      path: "/employees",
      icon: Users,
      badge: null
    },
    {
      label: "Recruitment",
      path: "/recruitment",
      icon: Briefcase,
      badge: pendingCandidates > 0 ? pendingCandidates : null,
      badgeColor: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
    },
    {
      label: "HR Support",
      path: "/support",
      icon: LifeBuoy,
      badge: openTickets > 0 ? openTickets : null,
      badgeColor: "bg-rose-500/20 text-rose-300 border border-rose-500/30"
    },
    {
      label: "Attendance & Leaves",
      path: "/attendance",
      icon: Clock,
      badge: pendingLeaves > 0 ? pendingLeaves : null,
      badgeColor: "bg-amber-500/20 text-amber-300 border border-amber-500/30"
    },
    {
      label: "Performance",
      path: "/performance",
      icon: Award,
      badge: null
    },
    {
      label: "Reports & Analytics",
      path: "/reports",
      icon: BarChart3,
      badge: null
    },
    {
      label: "Settings",
      path: "/settings",
      icon: Settings,
      badge: null
    }
  ];

  const handleNavClick = () => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-[#070b16]/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen bg-[#0C1222] border-r border-white/[0.08] flex flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo and Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20 shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold tracking-tight text-white text-base font-sans">
                    HR NOVA
                  </span>
                  <span className="px-1.5 py-0.2 bg-violet-500/20 border border-violet-500/30 text-[9px] font-semibold text-violet-300 rounded tracking-wider">
                    PRO
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 truncate">Enterprise Workforce</p>
              </div>
            )}
          </div>

          {/* Collapse Button (Desktop) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              Workforce Modules
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                title={isCollapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-violet-600/25 to-indigo-600/10 border border-violet-500/30 shadow-md shadow-violet-500/5 font-semibold"
                      : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]"
                  } ${isCollapsed ? "justify-center" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active left indicator pill */}
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-violet-500 rounded-r-full" />
                    )}

                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive
                          ? "text-violet-400"
                          : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    />

                    {!isCollapsed && (
                      <span className="flex-1 truncate">{item.label}</span>
                    )}

                    {!isCollapsed && item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                          item.badgeColor || "bg-white/10 text-slate-300"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Workspace Card / Footer */}
        <div className="p-3 border-t border-white/[0.08] bg-[#090E1A]">
          {!isCollapsed ? (
            <div className="p-3 rounded-xl bg-[#121A2B] border border-white/[0.07] flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white truncate">
                    Nova Tech Inc.
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    SOC2 Cloud Sync
                  </div>
                </div>
              </div>
              <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0" />
            </div>
          ) : (
            <div className="flex justify-center py-1">
              <div className="w-8 h-8 rounded-lg bg-[#121A2B] border border-white/[0.08] flex items-center justify-center text-violet-400">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
