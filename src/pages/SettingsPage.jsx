import React, { useState } from "react";
import { useHR } from "../context/HRContext";
import {
  Settings,
  Building,
  Shield,
  Bell,
  Palette,
  Check,
  Save
} from "lucide-react";

export const SettingsPage = () => {
  const { settings, updateSettings } = useHR();

  const [activeTab, setActiveTab] = useState("org"); // "org" | "roles" | "notifications" | "appearance"

  // Local form state
  const [orgData, setOrgData] = useState({
    companyName: settings.companyName || "Nova Technologies Inc.",
    companyDomain: settings.companyDomain || "novatech.io",
    timezone: settings.timezone || "America/Los_Angeles (PST)",
    currency: settings.currency || "USD ($)",
    fiscalYearStart: settings.fiscalYearStart || "January",
    defaultWorkWeek: settings.defaultWorkWeek || "Monday - Friday (40 hrs)"
  });

  const [notifications, setNotifications] = useState(
    settings.notifications || {
      emailAlerts: true,
      slackIntegration: true,
      leaveApprovals: true,
      ticketAssignment: true,
      weeklyReportDigest: true
    }
  );

  const [accentColor, setAccentColor] = useState(settings.accentColor || "violet");

  const handleSaveOrg = (e) => {
    e.preventDefault();
    updateSettings({ ...orgData });
  };

  const handleToggleNotif = (key) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    updateSettings({ notifications: updated });
  };

  const rolesMatrix = [
    {
      role: "Super Administrator",
      description: "Full read/write permissions across all workforce systems & settings",
      usersCount: "2 Users",
      permissions: { employees: "Full", recruitment: "Full", support: "Full", compensation: "Full", settings: "Full" }
    },
    {
      role: "HR Business Partner",
      description: "Management of employee files, leave approvals, recruitment & tickets",
      usersCount: "4 Users",
      permissions: { employees: "Full", recruitment: "Full", support: "Full", compensation: "Restricted", settings: "None" }
    },
    {
      role: "Department Lead",
      description: "Approve team leaves, view dept attendance, and conduct appraisals",
      usersCount: "8 Users",
      permissions: { employees: "View Only", recruitment: "Interviewer", support: "Submit", compensation: "None", settings: "None" }
    },
    {
      role: "Employee / Staff",
      description: "Self-service time-off requests, personal profile, and ticket submissions",
      usersCount: "134 Users",
      permissions: { employees: "Self", recruitment: "None", support: "Submit", compensation: "Self", settings: "None" }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-violet-400" />
          <span>System Settings & Governance</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure organizational parameters, security credentials, role-based access, and themes
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 overflow-x-auto text-xs">
        {[
          { id: "org", label: "Organization Profile", icon: Building },
          { id: "roles", label: "Roles & Permissions", icon: Shield },
          { id: "notifications", label: "Notification Channels", icon: Bell },
          { id: "appearance", label: "Theme & Visual Identity", icon: Palette }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-violet-600 text-white shadow-md shadow-violet-600/20"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ORGANIZATION PROFILE */}
      {activeTab === "org" && (
        <form onSubmit={handleSaveOrg} className="space-y-6 max-w-3xl">
          <div className="bg-[#121A2B] border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-5">
            <h3 className="text-base font-semibold text-white">General Enterprise Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-slate-300 mb-1">Company Legal Entity</label>
                <input
                  type="text"
                  value={orgData.companyName}
                  onChange={(e) => setOrgData({ ...orgData, companyName: e.target.value })}
                  className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">Corporate Domain</label>
                <input
                  type="text"
                  value={orgData.companyDomain}
                  onChange={(e) => setOrgData({ ...orgData, companyDomain: e.target.value })}
                  className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">Default Timezone</label>
                <select
                  value={orgData.timezone}
                  onChange={(e) => setOrgData({ ...orgData, timezone: e.target.value })}
                  className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="America/Los_Angeles (PST)">America/Los_Angeles (PST)</option>
                  <option value="America/New_York (EST)">America/New_York (EST)</option>
                  <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                  <option value="Asia/Singapore (SGT)">Asia/Singapore (SGT)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">Base Currency</label>
                <select
                  value={orgData.currency}
                  onChange={(e) => setOrgData({ ...orgData, currency: e.target.value })}
                  className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="USD ($)">USD ($) — United States Dollar</option>
                  <option value="EUR (€)">EUR (€) — Euro</option>
                  <option value="GBP (£)">GBP (£) — British Pound</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">Fiscal Year Start</label>
                <select
                  value={orgData.fiscalYearStart}
                  onChange={(e) => setOrgData({ ...orgData, fiscalYearStart: e.target.value })}
                  className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="January">January</option>
                  <option value="April">April</option>
                  <option value="July">July</option>
                  <option value="October">October</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">Standard Work Week</label>
                <input
                  type="text"
                  value={orgData.defaultWorkWeek}
                  onChange={(e) => setOrgData({ ...orgData, defaultWorkWeek: e.target.value })}
                  className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-violet-600/30 transition active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save Organization Profile</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: ROLES & PERMISSIONS */}
      {activeTab === "roles" && (
        <div className="space-y-6">
          <div className="bg-[#121A2B] border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-4">
            <div>
              <h3 className="text-base font-semibold text-white">Role-Based Access Control (RBAC)</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage clearance levels, confidential compensation visibility, and action privileges
              </p>
            </div>

            <div className="space-y-3">
              {rolesMatrix.map((r) => (
                <div
                  key={r.role}
                  className="p-4 rounded-xl bg-[#0B1020] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{r.role}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/30 font-medium">
                        {r.usersCount}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs">{r.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] text-slate-300">
                      Staff: <strong className="text-white">{r.permissions.employees}</strong>
                    </span>
                    <span className="px-2 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] text-slate-300">
                      Hiring: <strong className="text-white">{r.permissions.recruitment}</strong>
                    </span>
                    <span className="px-2 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] text-slate-300">
                      Tickets: <strong className="text-white">{r.permissions.support}</strong>
                    </span>
                    <span className="px-2 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] text-slate-300">
                      Comp: <strong className="text-emerald-400">{r.permissions.compensation}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NOTIFICATION PREFERENCES */}
      {activeTab === "notifications" && (
        <div className="bg-[#121A2B] border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-6 max-w-2xl">
          <div>
            <h3 className="text-base font-semibold text-white">Alerts & Dispatch Subscriptions</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select which event updates are dispatched to your administrative dashboard and connected channels
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {[
              {
                key: "emailAlerts",
                title: "Executive Email Summaries",
                desc: "Send daily activity rollups and urgent ticket escalation alerts to admin email."
              },
              {
                key: "slackIntegration",
                title: "Slack Bot Webhook Integration",
                desc: "Broadcast newly hired candidates and holiday approvals to #people-announcements."
              },
              {
                key: "leaveApprovals",
                title: "Direct Leave Approval Notifications",
                desc: "Notify when an employee submits a vacation or medical leave request."
              },
              {
                key: "ticketAssignment",
                title: "Support Ticket Assignment Alerts",
                desc: "Ping assigned HR specialists immediately when an urgent ticket is delegated."
              },
              {
                key: "weeklyReportDigest",
                title: "Weekly Intelligence Digest",
                desc: "Deliver automated weekly turnover and attendance rates every Monday at 8 AM PST."
              }
            ].map((item) => (
              <div
                key={item.key}
                onClick={() => handleToggleNotif(item.key)}
                className="p-3.5 rounded-xl bg-[#0B1020] border border-white/[0.08] flex items-center justify-between gap-4 cursor-pointer hover:border-violet-500/40 transition"
              >
                <div>
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                </div>
                <div
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                    notifications[item.key] ? "bg-violet-600 justify-end" : "bg-white/10 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: THEME & VISUAL IDENTITY */}
      {activeTab === "appearance" && (
        <div className="bg-[#121A2B] border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-6 max-w-2xl">
          <div>
            <h3 className="text-base font-semibold text-white">Visual Design Identity</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Customize dashboard accents and contrast levels matching enterprise branding
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-300 mb-2">Primary Accent Color</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "violet", name: "Electric Violet", hex: "#8B5CF6", bg: "bg-[#8B5CF6]" },
                  { id: "indigo", name: "Deep Indigo", hex: "#6366F1", bg: "bg-[#6366F1]" },
                  { id: "cyan", name: "Cyber Cyan", hex: "#06B6D4", bg: "bg-[#06B6D4]" }
                ].map((color) => (
                  <button
                    key={color.id}
                    onClick={() => {
                      setAccentColor(color.id);
                      updateSettings({ accentColor: color.id });
                    }}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 transition ${
                      accentColor === color.id
                        ? "border-white/30 bg-white/[0.06] shadow-lg"
                        : "border-white/[0.08] bg-[#0B1020] hover:bg-white/[0.02]"
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full ${color.bg}`} />
                    <span className="font-semibold text-white text-xs">{color.name}</span>
                    {accentColor === color.id && <Check className="w-3.5 h-3.5 text-white ml-auto" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1020] border border-white/[0.08] space-y-2">
              <span className="font-semibold text-white">Active Design System</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Theme preset: <strong>Deep Midnight Navy (#0B1020)</strong> with elevated glass-effect cards (#121A2B), 8px modular spacing, and Inter typography tokens.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
