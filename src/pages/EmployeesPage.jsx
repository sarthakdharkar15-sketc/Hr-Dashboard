import React, { useState, useMemo } from "react";
import { useHR } from "../context/HRContext";
import { Modal } from "../components/common/Modal";
import {
  Users,
  Search,
  Plus,
  LayoutGrid,
  List,
  Mail,
  Phone,
  MapPin,
  Star,
  AlertCircle,
  Trash2,
  Edit,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown
} from "lucide-react";

const DEPARTMENTS = [
  "All Departments",
  "Engineering",
  "Product Design",
  "Marketing",
  "Human Resources",
  "Finance",
  "Sales",
  "Customer Success"
];

const STATUSES = ["All Statuses", "Active", "On Leave", "Probation"];

export const EmployeesPage = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee, exportDataToCSV } = useHR();

  // View state
  const [viewMode, setViewMode] = useState("table"); // "table" | "grid"
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [activeEmployee, setActiveEmployee] = useState(null);
  const [profileTab, setProfileTab] = useState("personal"); // "personal" | "job" | "attendance" | "performance" | "leaves"

  // Form State
  const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "Engineering",
    designation: "",
    status: "Active",
    workMode: "Hybrid",
    location: "San Francisco, CA",
    salary: "$140,000",
    joiningDate: new Date().toISOString().split("T")[0],
    bio: "",
    skills: "React, TypeScript, System Design",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  };
  const [formData, setFormData] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});

  // Filtering & Sorting
  const filteredEmployees = useMemo(() => {
    return employees
      .filter((emp) => {
        const matchesSearch =
          `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.designation.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDept =
          selectedDept === "All Departments" || emp.department === selectedDept;

        const matchesStatus =
          selectedStatus === "All Statuses" || emp.status === selectedStatus;

        return matchesSearch && matchesDept && matchesStatus;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();

        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [employees, searchTerm, selectedDept, selectedStatus, sortField, sortOrder]);

  // Paginated records
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage) || 1;
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim() || !formData.email.includes("@"))
      errors.email = "Valid corporate email is required";
    if (!formData.designation.trim()) errors.designation = "Designation is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOpenAdd = () => {
    setFormData(initialForm);
    setFormErrors({});
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (emp) => {
    setActiveEmployee(emp);
    setFormData({
      ...emp,
      skills: Array.isArray(emp.skills) ? emp.skills.join(", ") : emp.skills || ""
    });
    setFormErrors({});
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (emp) => {
    setActiveEmployee(emp);
    setIsDeleteModalOpen(true);
  };

  const handleOpenProfile = (emp) => {
    setActiveEmployee(emp);
    setProfileTab("personal");
    setIsProfileModalOpen(true);
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const skillsArray = formData.skills
      ? formData.skills.split(",").map((s) => s.trim()).filter(Boolean)
      : ["Leadership"];

    addEmployee({
      ...formData,
      skills: skillsArray
    });
    setIsAddModalOpen(false);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const skillsArray = formData.skills
      ? formData.skills.split(",").map((s) => s.trim()).filter(Boolean)
      : ["Leadership"];

    updateEmployee(activeEmployee.id, {
      ...formData,
      skills: skillsArray
    });
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (activeEmployee) {
      deleteEmployee(activeEmployee.id);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-violet-400" />
            <span>Employee Directory</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage organization members, employment profiles, departmental records, and roles
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => exportDataToCSV("employees")}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#121A2B] border border-white/[0.08] rounded-2xl p-4 shadow-xl flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name, ID, email..."
            className="w-full bg-[#0B1020] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-violet-500/50"
          />
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => {
              setSelectedDept(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-violet-500/50"
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-violet-500/50"
          >
            {STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#0B1020] border border-white/10 rounded-xl p-1 ml-auto">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition ${
                viewMode === "table"
                  ? "bg-violet-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition ${
                viewMode === "grid"
                  ? "bg-violet-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Grid Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Employee Directory View */}
      {filteredEmployees.length === 0 ? (
        <div className="bg-[#121A2B] border border-white/[0.08] rounded-2xl p-12 text-center">
          <Users className="w-12 h-12 text-slate-600 mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-semibold text-white">No employees found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            No employee records matched your active filter or search query. Try clearing filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedDept("All Departments");
              setSelectedStatus("All Statuses");
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-violet-600/20 text-violet-300 border border-violet-500/30 text-xs font-semibold hover:bg-violet-600/30 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "table" ? (
        /* TABLE VIEW */
        <div className="bg-[#121A2B] border border-white/[0.08] rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0B1020] text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/[0.08]">
                <tr>
                  <th
                    onClick={() => handleSort("id")}
                    className="py-3 px-4 font-semibold cursor-pointer hover:text-white transition"
                  >
                    <div className="flex items-center gap-1">
                      <span>ID</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("firstName")}
                    className="py-3 px-4 font-semibold cursor-pointer hover:text-white transition"
                  >
                    <div className="flex items-center gap-1">
                      <span>Employee</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("department")}
                    className="py-3 px-4 font-semibold cursor-pointer hover:text-white transition"
                  >
                    <div className="flex items-center gap-1">
                      <span>Department</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 font-semibold">Designation</th>
                  <th className="py-3 px-4 font-semibold">Work Mode</th>
                  <th
                    onClick={() => handleSort("status")}
                    className="py-3 px-4 font-semibold cursor-pointer hover:text-white transition"
                  >
                    <div className="flex items-center gap-1">
                      <span>Status</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("joiningDate")}
                    className="py-3 px-4 font-semibold cursor-pointer hover:text-white transition"
                  >
                    <div className="flex items-center gap-1">
                      <span>Joined</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {paginatedEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                    onClick={() => handleOpenProfile(emp)}
                  >
                    <td className="py-3 px-4 font-mono text-[11px] text-violet-300 font-semibold">
                      {emp.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatar}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-white/10 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-semibold text-white group-hover:text-violet-300 transition truncate">
                            {emp.firstName} {emp.lastName}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">{emp.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-200">
                        {emp.department}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300 truncate max-w-[180px]">
                      {emp.designation}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[11px] font-medium ${
                          emp.workMode === "Remote"
                            ? "text-cyan-400"
                            : emp.workMode === "Hybrid"
                            ? "text-indigo-400"
                            : "text-amber-400"
                        }`}
                      >
                        {emp.workMode}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          emp.status === "Active"
                            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                            : emp.status === "On Leave"
                            ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                            : "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {emp.joiningDate}
                    </td>
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenProfile(emp)}
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(emp)}
                          className="p-1.5 text-slate-400 hover:text-violet-300 rounded-lg hover:bg-violet-500/10 transition"
                          title="Edit Employee"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(emp)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition"
                          title="Delete Employee"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="px-4 py-3 bg-[#0B1020] border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
            <div>
              Showing{" "}
              <span className="text-white font-medium">
                {Math.min(filteredEmployees.length, (currentPage - 1) * itemsPerPage + 1)}
              </span>{" "}
              to{" "}
              <span className="text-white font-medium">
                {Math.min(filteredEmployees.length, currentPage * itemsPerPage)}
              </span>{" "}
              of <span className="text-white font-medium">{filteredEmployees.length}</span> employees
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 text-slate-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* GRID CARD VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedEmployees.map((emp) => (
            <div
              key={emp.id}
              onClick={() => handleOpenProfile(emp)}
              className="group bg-[#121A2B] border border-white/[0.08] hover:border-violet-500/40 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] text-violet-400 font-semibold px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20">
                    {emp.id}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      emp.status === "Active"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : emp.status === "On Leave"
                        ? "bg-amber-500/15 text-amber-300"
                        : "bg-indigo-500/15 text-indigo-300"
                    }`}
                  >
                    {emp.status}
                  </span>
                </div>

                <div className="flex flex-col items-center text-center mt-3">
                  <img
                    src={emp.avatar}
                    alt=""
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-violet-500/30 group-hover:scale-105 transition-transform"
                  />
                  <h3 className="text-sm font-semibold text-white mt-3 group-hover:text-violet-300 transition">
                    {emp.firstName} {emp.lastName}
                  </h3>
                  <p className="text-xs text-slate-400 truncate max-w-[200px]">
                    {emp.designation}
                  </p>
                  <span className="text-[11px] text-slate-500 mt-0.5">{emp.department}</span>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-1.5 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                    <span className="truncate">{emp.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{emp.location}</span>
                  </div>
                </div>
              </div>

              <div
                className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-1 text-[11px] text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{emp.rating || 4.8}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(emp)}
                    className="p-1.5 text-slate-400 hover:text-violet-300 rounded-lg hover:bg-violet-500/10 transition"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenDelete(emp)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD EMPLOYEE MODAL */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Employee"
        subtitle="Create an official organizational profile and assign credentials"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmitAdd} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">First Name *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                placeholder="Elena"
              />
              {formErrors.firstName && (
                <p className="text-[11px] text-rose-400 mt-1">{formErrors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Last Name *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                placeholder="Rostova"
              />
              {formErrors.lastName && (
                <p className="text-[11px] text-rose-400 mt-1">{formErrors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Corporate Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                placeholder="elena@novatech.io"
              />
              {formErrors.email && (
                <p className="text-[11px] text-rose-400 mt-1">{formErrors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              >
                {DEPARTMENTS.filter((d) => d !== "All Departments").map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Designation *</label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                placeholder="Senior Software Engineer"
              />
              {formErrors.designation && (
                <p className="text-[11px] text-rose-400 mt-1">{formErrors.designation}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Probation">Probation</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Work Mode</label>
              <select
                value={formData.workMode}
                onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Annual Salary</label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                placeholder="$145,000"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Skills (comma separated)
            </label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              placeholder="Kubernetes, React, Go, UI Architecture"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-white/10 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition"
            >
              Save Employee
            </button>
          </div>
        </form>
      </Modal>

      {/* EDIT EMPLOYEE MODAL */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit Employee — ${formData.firstName} ${formData.lastName}`}
        subtitle={`Editing profile records for ${activeEmployee?.id}`}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmitEdit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">First Name *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Last Name *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              >
                {DEPARTMENTS.filter((d) => d !== "All Departments").map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Designation</label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Probation">Probation</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Work Mode</label>
              <select
                value={formData.workMode}
                onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Salary</label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-white/10 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition"
            >
              Update Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Employee Deletion"
        subtitle="This action will remove the record from active payroll and workforce logs"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              Are you sure you want to delete{" "}
              <strong className="text-white">
                {activeEmployee?.firstName} {activeEmployee?.lastName}
              </strong>{" "}
              ({activeEmployee?.id})? This cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-white/10 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 transition"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* DETAILED EMPLOYEE PROFILE DRAWER/MODAL */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title={`${activeEmployee?.firstName} ${activeEmployee?.lastName}`}
        subtitle={`${activeEmployee?.designation} • ${activeEmployee?.department} (${activeEmployee?.id})`}
        maxWidth="max-w-3xl"
      >
        {activeEmployee && (
          <div className="space-y-5">
            {/* Top profile hero */}
            <div className="p-4 rounded-xl bg-[#0B1020] border border-white/[0.08] flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <img
                src={activeEmployee.avatar}
                alt=""
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-violet-500/40 shrink-0"
              />
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-lg font-bold text-white">
                    {activeEmployee.firstName} {activeEmployee.lastName}
                  </h2>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                    {activeEmployee.status}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 font-semibold">
                    {activeEmployee.workMode}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {activeEmployee.bio || "Dedicated professional driving business goals with high performance."}
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-violet-400" />
                    {activeEmployee.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    {activeEmployee.phone || "+1 (555) 234-5678"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {activeEmployee.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Navigation Tabs */}
            <div className="flex items-center gap-1 border-b border-white/[0.08] overflow-x-auto pb-1 text-xs">
              {[
                { id: "personal", label: "Personal Information" },
                { id: "job", label: "Job & Compensation" },
                { id: "attendance", label: "Attendance History" },
                { id: "performance", label: "Performance Overview" },
                { id: "leaves", label: "Leave Balance & History" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setProfileTab(tab.id)}
                  className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                    profileTab === tab.id
                      ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Personal Info */}
            {profileTab === "personal" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="text-slate-400">Full Legal Name</div>
                  <div className="font-semibold text-white">
                    {activeEmployee.firstName} {activeEmployee.lastName}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="text-slate-400">Employee ID</div>
                  <div className="font-semibold text-violet-400 font-mono">
                    {activeEmployee.id}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="text-slate-400">Emergency Contact</div>
                  <div className="font-semibold text-white">+1 (555) 911-8422 (Spouse)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="text-slate-400">Work Location</div>
                  <div className="font-semibold text-white">{activeEmployee.location}</div>
                </div>
              </div>
            )}

            {/* Tab 2: Job & Compensation */}
            {profileTab === "job" && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-slate-400">Annual Base Salary</div>
                    <div className="text-lg font-bold text-white mt-1">
                      {activeEmployee.salary || "$150,000"}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-slate-400">Joining Date</div>
                    <div className="text-lg font-bold text-white mt-1">
                      {activeEmployee.joiningDate}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-slate-400">Reporting Manager</div>
                    <div className="text-sm font-semibold text-violet-300 mt-1">
                      {activeEmployee.manager || "Executive VP"}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-slate-400 mb-2">Verified Professional Competencies</div>
                  <div className="flex flex-wrap gap-1.5">
                    {(activeEmployee.skills || ["System Design", "SaaS"]).map((sk) => (
                      <span
                        key={sk}
                        className="px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px]"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Attendance History */}
            {profileTab === "attendance" && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  <span>Year-to-date Attendance Rate</span>
                  <span className="font-bold font-mono text-sm">
                    {activeEmployee.attendanceRate || 98.5}%
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="text-slate-400 text-xs font-semibold">Recent Shifts</div>
                  {[
                    { date: "Yesterday", in: "08:52 AM", out: "05:45 PM", status: "On-time" },
                    { date: "Nov 02, 2026", in: "09:02 AM", out: "06:10 PM", status: "On-time" },
                    { date: "Nov 01, 2026", in: "08:45 AM", out: "05:30 PM", status: "On-time" }
                  ].map((shift, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-between"
                    >
                      <span>{shift.date}</span>
                      <span className="font-mono text-slate-300">
                        {shift.in} — {shift.out}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-semibold">
                        {shift.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Performance Overview */}
            {profileTab === "performance" && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                    <div className="text-slate-300">Overall Rating</div>
                    <div className="text-2xl font-bold text-white mt-1 flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-400 fill-current" />
                      <span>{activeEmployee.rating || 4.8} / 5.0</span>
                    </div>
                    <p className="text-[11px] text-violet-300 mt-1">Exceeds Expectations</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-slate-300">OKRs Completed</div>
                    <div className="text-2xl font-bold text-white mt-1">94%</div>
                    <p className="text-[11px] text-slate-400 mt-1">5 of 5 key deliverables on track</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Leaves */}
            {profileTab === "leaves" && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                    <div className="text-slate-400 text-[11px]">Casual Leave</div>
                    <div className="text-lg font-bold text-white mt-1">
                      {activeEmployee.leaveBalance?.casual || 8} days
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                    <div className="text-slate-400 text-[11px]">Sick Leave</div>
                    <div className="text-lg font-bold text-white mt-1">
                      {activeEmployee.leaveBalance?.sick || 5} days
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                    <div className="text-slate-400 text-[11px]">Annual Leave</div>
                    <div className="text-lg font-bold text-white mt-1">
                      {activeEmployee.leaveBalance?.annual || 14} days
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
