import React, { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_EMPLOYEES,
  INITIAL_JOB_OPENINGS,
  INITIAL_CANDIDATES,
  INITIAL_TICKETS,
  INITIAL_LEAVE_REQUESTS,
  INITIAL_ATTENDANCE_LOGS,
  INITIAL_ACTIVITIES,
  INITIAL_UPCOMING_EVENTS,
  INITIAL_SETTINGS
} from "../data/initialData";

const HRContext = createContext(null);

export const HRProvider = ({ children }) => {
  // LocalStorage Helpers
  const getStored = (key, fallback) => {
    try {
      const item = localStorage.getItem(`hr_nova_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      console.warn(`Failed reading ${key} from localStorage`, e);
      return fallback;
    }
  };

  const setStored = (key, value) => {
    try {
      localStorage.setItem(`hr_nova_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn(`Failed writing ${key} to localStorage`, e);
    }
  };

  // State initialization
  const [employees, setEmployees] = useState(() => getStored("employees", INITIAL_EMPLOYEES));
  const [jobOpenings, setJobOpenings] = useState(() => getStored("jobOpenings", INITIAL_JOB_OPENINGS));
  const [candidates, setCandidates] = useState(() => getStored("candidates", INITIAL_CANDIDATES));
  const [tickets, setTickets] = useState(() => getStored("tickets", INITIAL_TICKETS));
  const [leaveRequests, setLeaveRequests] = useState(() => getStored("leaveRequests", INITIAL_LEAVE_REQUESTS));
  const [attendanceLogs, setAttendanceLogs] = useState(() => getStored("attendanceLogs", INITIAL_ATTENDANCE_LOGS));
  const [activities, setActivities] = useState(() => getStored("activities", INITIAL_ACTIVITIES));
  const [events, setEvents] = useState(() => getStored("events", INITIAL_UPCOMING_EVENTS));
  const [settings, setSettings] = useState(() => getStored("settings", INITIAL_SETTINGS));

  // Global Command / Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Unread notification count
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  // Sync to localStorage
  useEffect(() => { setStored("employees", employees); }, [employees]);
  useEffect(() => { setStored("jobOpenings", jobOpenings); }, [jobOpenings]);
  useEffect(() => { setStored("candidates", candidates); }, [candidates]);
  useEffect(() => { setStored("tickets", tickets); }, [tickets]);
  useEffect(() => { setStored("leaveRequests", leaveRequests); }, [leaveRequests]);
  useEffect(() => { setStored("attendanceLogs", attendanceLogs); }, [attendanceLogs]);
  useEffect(() => { setStored("activities", activities); }, [activities]);
  useEffect(() => { setStored("events", events); }, [events]);
  useEffect(() => { setStored("settings", settings); }, [settings]);

  // Toast dispatch
  const addToast = (title, message = "", type = "success") => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Activity logger helper
  const logActivity = (user, action, type = "general") => {
    const newAct = {
      id: "ACT-" + Date.now(),
      user,
      action,
      time: "Just now",
      type
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 14)]);
  };

  // === EMPLOYEE ACTIONS ===
  const addEmployee = (empData) => {
    const newId = `EMP-${1000 + employees.length + 1}`;
    const newEmp = {
      id: newId,
      rating: 4.8,
      attendanceRate: 100,
      leaveBalance: { casual: 10, sick: 7, annual: 18 },
      recentLeave: [],
      skills: empData.skills || ["Communication", "Teamwork"],
      ...empData
    };
    setEmployees((prev) => [newEmp, ...prev]);
    logActivity("Admin", `added new team member ${newEmp.firstName} ${newEmp.lastName} (${newEmp.designation})`, "employee");
    addToast("Employee Created", `${newEmp.firstName} ${newEmp.lastName} has been added to the directory.`, "success");
    return newEmp;
  };

  const updateEmployee = (id, updatedData) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...updatedData } : emp))
    );
    const emp = employees.find((e) => e.id === id);
    const name = emp ? `${emp.firstName} ${emp.lastName}` : "Employee";
    logActivity("Admin", `updated profile details for ${name}`, "employee");
    addToast("Profile Updated", `${name}'s information was successfully saved.`, "info");
  };

  const deleteEmployee = (id) => {
    const emp = employees.find((e) => e.id === id);
    const name = emp ? `${emp.firstName} ${emp.lastName}` : "Employee";
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    logActivity("Admin", `archived employee record for ${name}`, "employee");
    addToast("Employee Removed", `${name} has been removed from active staff.`, "warning");
  };

  // === RECRUITMENT ACTIONS ===
  const addCandidate = (candidateData) => {
    const newId = `CAN-${500 + candidates.length + 1}`;
    const newCand = {
      id: newId,
      stage: "Applied",
      appliedDate: new Date().toISOString().split("T")[0],
      interviewDate: "Not Scheduled",
      interviewer: "Unassigned",
      rating: 4,
      matchScore: Math.floor(Math.random() * 20) + 78,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      ...candidateData
    };
    setCandidates((prev) => [newCand, ...prev]);
    logActivity("Recruitment Team", `received new application from ${newCand.name} for ${newCand.role}`, "recruitment");
    addToast("Application Received", `${newCand.name} applied for ${newCand.role}.`, "success");
    return newCand;
  };

  const moveCandidateStage = (candidateId, newStage) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, stage: newStage } : c))
    );
    const cand = candidates.find((c) => c.id === candidateId);
    if (cand) {
      logActivity("Recruitment Team", `moved ${cand.name} to "${newStage}" stage`, "recruitment");
      addToast("Candidate Pipeline Updated", `${cand.name} is now in ${newStage}.`, "info");
    }
  };

  const updateCandidate = (id, updatedData) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
    );
    addToast("Candidate Updated", "Candidate details updated successfully.", "info");
  };

  const addJobOpening = (jobData) => {
    const newId = `JOB-${200 + jobOpenings.length + 1}`;
    const newJob = {
      id: newId,
      applicantsCount: 0,
      status: "Open",
      postedDate: new Date().toISOString().split("T")[0],
      ...jobData
    };
    setJobOpenings((prev) => [newJob, ...prev]);
    logActivity("Admin", `published new job opening: ${newJob.title}`, "recruitment");
    addToast("Position Published", `${newJob.title} is now actively accepting candidates.`, "success");
  };

  // === SUPPORT TICKET ACTIONS ===
  const addTicket = (ticketData) => {
    const newId = `TICK-${800 + tickets.length + 1}`;
    const newTicket = {
      id: newId,
      createdDate: new Date().toISOString().split("T")[0],
      status: "Open",
      comments: [
        {
          author: ticketData.employeeName || "Staff Member",
          date: "Just now",
          text: ticketData.description || "Ticket submitted."
        }
      ],
      ...ticketData
    };
    setTickets((prev) => [newTicket, ...prev]);
    logActivity(newTicket.employeeName, `submitted ticket #${newTicket.id}: ${newTicket.subject}`, "ticket");
    addToast("Ticket Created", `Support Ticket #${newTicket.id} created successfully.`, "success");
    return newTicket;
  };

  const updateTicketStatus = (ticketId, status) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status } : t))
    );
    logActivity("HR Support", `marked ticket #${ticketId} as ${status}`, "ticket");
    addToast("Ticket Status Updated", `Ticket #${ticketId} marked as ${status}.`, "info");
  };

  const updateTicketPriority = (ticketId, priority) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, priority } : t))
    );
    addToast("Priority Changed", `Ticket #${ticketId} priority set to ${priority}.`, "info");
  };

  const assignTicketHR = (ticketId, assignedHR) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, assignedHR } : t))
    );
    addToast("HR Assigned", `Assigned ${assignedHR} to ticket #${ticketId}.`, "info");
  };

  const addTicketComment = (ticketId, text, author = "Admin") => {
    const newComment = {
      author,
      date: "Just now",
      text
    };
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, comments: [...(t.comments || []), newComment] }
          : t
      )
    );
    addToast("Comment Added", "Your response has been recorded on the ticket.", "info");
  };

  // === ATTENDANCE & LEAVE ACTIONS ===
  const updateLeaveStatus = (leaveId, status) => {
    setLeaveRequests((prev) =>
      prev.map((l) => (l.id === leaveId ? { ...l, status } : l))
    );
    const leave = leaveRequests.find((l) => l.id === leaveId);
    if (leave) {
      logActivity("Admin", `${status.toLowerCase()} leave request for ${leave.employeeName} (${leave.leaveType})`, "leave");
      addToast(
        status === "Approved" ? "Leave Approved" : "Leave Rejected",
        `${leave.leaveType} for ${leave.employeeName} has been ${status.toLowerCase()}.`,
        status === "Approved" ? "success" : "warning"
      );
    }
  };

  const addLeaveRequest = (requestData) => {
    const newId = `LVE-${300 + leaveRequests.length + 1}`;
    const newLeave = {
      id: newId,
      status: "Pending",
      appliedDate: new Date().toISOString().split("T")[0],
      ...requestData
    };
    setLeaveRequests((prev) => [newLeave, ...prev]);
    logActivity(newLeave.employeeName, `requested ${newLeave.days} days ${newLeave.leaveType}`, "leave");
    addToast("Leave Request Submitted", `Request #${newLeave.id} submitted for managerial review.`, "success");
    return newLeave;
  };

  const markQuickAttendance = (status = "Present") => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const log = {
      id: "ATT-" + Date.now().toString().slice(-4),
      employeeName: "Admin User",
      timeIn: timeString,
      timeOut: "—",
      status,
      hours: "Working",
      date: "Today"
    };
    setAttendanceLogs((prev) => [log, ...prev]);
    logActivity("Admin User", `clocked in at ${timeString} (${status})`, "attendance");
    addToast("Clock-in Recorded", `Recorded status as ${status} at ${timeString}.`, "success");
  };

  // === SETTINGS ACTIONS ===
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addToast("Settings Saved", "System configurations have been updated.", "success");
  };

  // === EXPORT CSV UTILITY ===
  const exportDataToCSV = (type = "employees") => {
    let headers = [];
    let rows = [];
    let filename = `hr_nova_${type}_${new Date().toISOString().split("T")[0]}.csv`;

    if (type === "employees") {
      headers = ["ID", "Name", "Email", "Department", "Designation", "Status", "Work Mode", "Salary", "Joining Date"];
      rows = employees.map((e) => [
        e.id,
        `"${e.firstName} ${e.lastName}"`,
        e.email,
        e.department,
        `"${e.designation}"`,
        e.status,
        e.workMode,
        e.salary,
        e.joiningDate
      ]);
    } else if (type === "candidates") {
      headers = ["ID", "Name", "Email", "Role", "Department", "Stage", "Rating", "Experience", "Applied Date"];
      rows = candidates.map((c) => [
        c.id,
        `"${c.name}"`,
        c.email,
        `"${c.role}"`,
        c.department,
        c.stage,
        c.rating,
        c.experience,
        c.appliedDate
      ]);
    } else if (type === "tickets") {
      headers = ["Ticket ID", "Employee", "Subject", "Category", "Priority", "Status", "Assigned HR", "Created Date"];
      rows = tickets.map((t) => [
        t.id,
        `"${t.employeeName}"`,
        `"${t.subject}"`,
        t.category,
        t.priority,
        t.status,
        t.assignedHR,
        t.createdDate
      ]);
    } else if (type === "leave") {
      headers = ["ID", "Employee", "Type", "Days", "Start Date", "End Date", "Status", "Reason"];
      rows = leaveRequests.map((l) => [
        l.id,
        `"${l.employeeName}"`,
        l.leaveType,
        l.days,
        l.startDate,
        l.endDate,
        l.status,
        `"${l.reason}"`
      ]);
    }

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast("Export Successful", `Exported ${rows.length} rows to ${filename}`, "success");
  };

  const value = {
    // Data
    employees,
    jobOpenings,
    candidates,
    tickets,
    leaveRequests,
    attendanceLogs,
    activities,
    events,
    settings,
    toasts,
    isSearchOpen,
    unreadNotifications,

    // UI actions
    setIsSearchOpen,
    setEvents,
    addToast,
    removeToast,
    setUnreadNotifications,

    // CRUD
    addEmployee,
    updateEmployee,
    deleteEmployee,
    addCandidate,
    moveCandidateStage,
    updateCandidate,
    addJobOpening,
    addTicket,
    updateTicketStatus,
    updateTicketPriority,
    assignTicketHR,
    addTicketComment,
    updateLeaveStatus,
    addLeaveRequest,
    markQuickAttendance,
    updateSettings,
    exportDataToCSV
  };

  return <HRContext.Provider value={value}>{children}</HRContext.Provider>;
};

export const useHR = () => {
  const context = useContext(HRContext);
  if (!context) {
    throw new Error("useHR must be used within an HRProvider");
  }
  return context;
};
