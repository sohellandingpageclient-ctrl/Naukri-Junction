"use client";

import { useEffect, useState } from "react";
import { Download, LogOut, Phone, RefreshCw, Search } from "lucide-react";

type Application = {
  id: string;
  name: string;
  phone: string;
  city: string;
  age: string;
  education: string;
  experience: string;
  jobType: string;
  message: string;
  submittedAt: string;
  status: string;
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterJob, setFilterJob] = useState("");

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
    const headers = ["Name", "Phone", "City", "Age", "Education", "Experience", "Job Type", "Message", "Date"];
    const rows = filtered.map((a) => [
      a.name, a.phone, a.city, a.age, a.education, a.experience, a.jobType, a.message,
      new Date(a.submittedAt).toLocaleString("en-IN"),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c || ""}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `applications_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Login</h1>
          <p className="text-gray-400 text-sm mb-6">Enter password to access the dashboard</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Password"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Applications Dashboard</h1>
          <p className="text-sm text-gray-400">{filtered.length} total submissions</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchApplications}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
          >
            <Download size={14} />
            Export CSV
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-600"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, or city..."
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <select
            value={filterJob}
            onChange={(e) => setFilterJob(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total", value: applications.length, color: "blue" },
            { label: "Today", value: applications.filter((a) => new Date(a.submittedAt).toDateString() === new Date().toDateString()).length, color: "green" },
            { label: "This Week", value: applications.filter((a) => Date.now() - new Date(a.submittedAt).getTime() < 7 * 24 * 60 * 60 * 1000).length, color: "purple" },
            { label: "Filtered", value: filtered.length, color: "orange" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading applications...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No applications found.</div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {["Name", "Phone", "City", "Age", "Education", "Experience", "Job Type", "Date", "Action"].map((h) => (
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
                      <td className="px-4 py-3 text-gray-700">{app.city}</td>
                      <td className="px-4 py-3 text-gray-700">{app.age || "–"}</td>
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
                        <a
                          href={`https://wa.me/91${app.phone}?text=${encodeURIComponent(`Hello ${app.name}, I'm calling from Naukri Junction regarding your application for ${app.jobType || "a job position"}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap"
                        >
                          <Phone size={12} />
                          WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
