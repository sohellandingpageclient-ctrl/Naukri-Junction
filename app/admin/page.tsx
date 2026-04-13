"use client";

import { useEffect, useState } from "react";
import { Download, LogOut, Phone, RefreshCw, Search, Trash2 } from "lucide-react";

type Application = {
  id: string;
  name: string;
  phone: string;
  city: string;
  dob?: string;
  age?: string; // legacy field
  education: string;
  experience: string;
  jobType: string;
  email: string;
  message: string;
  submittedAt: string;
  status: string;
};

function calcAge(dob: string): number | null {
  if (!dob) return null;
  const today = new Date();
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function formatDobAge(app: Application): string {
  if (app.dob) {
    const age = calcAge(app.dob);
    const formatted = new Date(app.dob).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    return `${formatted}${age !== null ? ` (${age} yrs)` : ""}`;
  }
  if (app.age) return `Age: ${app.age}`;
  return "–";
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterJob, setFilterJob] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const login = async () => {
    const res = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      fetchApplications();
    } else {
      setAuthError("Wrong password. Try again.");
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    const res = await fetch("/api/applications");
    if (res.ok) {
      const data = await res.json();
      setApplications(data.applications);
    }
    setLoading(false);
  };

  const deleteApplication = async (id: string) => {
    if (!confirm("Delete this application? This cannot be undone.")) return;
    setDeletingId(id);
    const res = await fetch("/api/applications", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setApplications((prev) => prev.filter((a) => a.id !== id));
    }
    setDeletingId(null);
  };

  const logout = async () => {
    await fetch("/api/admin-auth", { method: "DELETE" });
    setAuthed(false);
  };

  useEffect(() => {
    if (authed) fetchApplications();
  }, [authed]);

  const filtered = applications.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch =
      a.name?.toLowerCase().includes(q) ||
      a.phone?.includes(q) ||
      a.city?.toLowerCase().includes(q);
    const matchJob = filterJob ? a.jobType === filterJob : true;
    return matchSearch && matchJob;
  });

  const exportCSV = () => {
    const headers = ["Name", "Phone", "Email", "City", "DOB", "Age", "Education", "Experience", "Job Type", "Message", "Date"];
    const rows = filtered.map((a) => {
      const age = a.dob ? calcAge(a.dob) : (a.age || "");
      return [
        a.name, a.phone, a.email, a.city,
        a.dob || "",
        age !== null ? String(age) : "",
        a.education, a.experience, a.jobType, a.message,
        new Date(a.submittedAt).toLocaleString("en-IN"),
      ];
    });
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c || ""}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `applications_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Login</h1>
          <p className="text-gray-500 text-sm mb-6">Enter password to access the dashboard</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Password"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          {authError && <p className="text-red-500 text-xs mb-3">{authError}</p>}
          <button
            onClick={login}
            className="w-full bg-blue-700 text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Applications Dashboard</h1>
          <p className="text-xs text-gray-400">{filtered.length} total submissions</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={fetchApplications}
            className="flex items-center gap-1.5 px-3 py-2 text-xs border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-700"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
          >
            <Download size={13} />
            Export CSV
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-2 text-xs border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-600"
          >
            <LogOut size={13} />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-5">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, or city..."
              className="w-full pl-9 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <select
            value={filterJob}
            onChange={(e) => setFilterJob(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">All Job Types</option>
            <option value="Office Assistant">Office Assistant</option>
            <option value="Field Executive">Field Executive</option>
            <option value="Data Entry">Data Entry</option>
            <option value="Sales Executive">Sales Executive</option>
            <option value="Any">Any</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {[
            { label: "Total", value: applications.length },
            { label: "Today", value: applications.filter((a) => new Date(a.submittedAt).toDateString() === new Date().toDateString()).length },
            { label: "This Week", value: applications.filter((a) => Date.now() - new Date(a.submittedAt).getTime() < 7 * 24 * 60 * 60 * 1000).length },
            { label: "Filtered", value: filtered.length },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading applications...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No applications found.</div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {["Name", "Phone", "Email", "City", "DOB / Age", "Education", "Experience", "Job Type", "Date", "Actions"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((app, i) => (
                      <tr key={app.id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{app.name}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{app.phone}</td>
                        <td className="px-4 py-3 text-gray-700">{app.email || "–"}</td>
                        <td className="px-4 py-3 text-gray-700">{app.city}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{formatDobAge(app)}</td>
                        <td className="px-4 py-3 text-gray-700">{app.education || "–"}</td>
                        <td className="px-4 py-3 text-gray-700">{app.experience || "–"}</td>
                        <td className="px-4 py-3">
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap">
                            {app.jobType || "Any"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">
                          {new Date(app.submittedAt).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <a
                              href={`https://wa.me/91${app.phone}?text=${encodeURIComponent(`Hello ${app.name}, I'm calling from Naukri Junction regarding your application for ${app.jobType || "a job position"}.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap"
                            >
                              <Phone size={12} />
                              WhatsApp
                            </a>
                            <button
                              onClick={() => deleteApplication(app.id)}
                              disabled={deletingId === app.id}
                              className="inline-flex items-center gap-1 bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap"
                            >
                              <Trash2 size={12} />
                              {deletingId === app.id ? "..." : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filtered.map((app) => (
                <div key={app.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-900">{app.name}</p>
                      <p className="text-sm text-gray-600">{app.phone}</p>
                      {app.email && <p className="text-xs text-gray-500">{app.email}</p>}
                    </div>
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                      {app.jobType || "Any"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-1.5 text-xs text-gray-600 mb-3">
                    <span><span className="font-medium text-gray-500">City:</span> {app.city}</span>
                    <span><span className="font-medium text-gray-500">DOB:</span> {formatDobAge(app)}</span>
                    <span><span className="font-medium text-gray-500">Education:</span> {app.education || "–"}</span>
                    <span><span className="font-medium text-gray-500">Experience:</span> {app.experience || "–"}</span>
                    <span className="col-span-2 text-gray-400">
                      {new Date(app.submittedAt).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`https://wa.me/91${app.phone}?text=${encodeURIComponent(`Hello ${app.name}, I'm calling from Naukri Junction regarding your application for ${app.jobType || "a job position"}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-green-100 text-green-700 hover:bg-green-200 px-3 py-2 rounded-xl text-xs font-medium transition-colors"
                    >
                      <Phone size={13} />
                      WhatsApp
                    </a>
                    <button
                      onClick={() => deleteApplication(app.id)}
                      disabled={deletingId === app.id}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-50 px-3 py-2 rounded-xl text-xs font-medium transition-colors"
                    >
                      <Trash2 size={13} />
                      {deletingId === app.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
