"use client";

import { useEffect, useRef, useState } from "react";
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

// ── Helper components for Certificate section ──────────────────────────────

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      <p className="text-sm text-gray-900 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200">{value || "–"}</p>
    </div>
  );
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const certInputClass =
  "w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";

// ── CertificateSection ─────────────────────────────────────────────────────

function CertificateSection({ applications }: { applications: Application[] }) {
  const [certSearch, setCertSearch] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState<Application | null>(null);
  const [certNumber, setCertNumber] = useState("");
  const [courseName, setCourseName] = useState("Job Placement Program");
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [issueDate, setIssueDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [branchName, setBranchName] = useState("");
  const [authorizedBy, setAuthorizedBy] = useState("");
  const [certGenerating, setCertGenerating] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const certFiltered = certSearch.trim()
    ? applications.filter((a) => {
        const q = certSearch.toLowerCase();
        return (
          a.name?.toLowerCase().includes(q) ||
          a.phone?.includes(q) ||
          a.city?.toLowerCase().includes(q)
        );
      })
    : applications.slice(0, 10);

  const handleSelect = (app: Application) => {
    setSelectedApplicant(app);
    setCertSearch("");
  };

  const canDownload =
    !!selectedApplicant && !!certNumber && !!enrollmentDate && !!branchName && !!authorizedBy;

  const handleDownloadPDF = async () => {
    if (!certRef.current || !selectedApplicant) return;
    setCertGenerating(true);
    try {
      const { default: html2canvas } = await import("html2canvas");
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      pdf.addImage(imgData, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      const safeName = selectedApplicant.name.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_");
      pdf.save(`${safeName}_NaukriJunction_Certificate.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setCertGenerating(false);
    }
  };

  const fmtDate = (d: string) =>
    d
      ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })
      : "—";

  return (
    <div className="py-2">
      {/* Step 1: Search */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
        <h2 className="text-base font-bold text-gray-900 mb-3">Step 1 — Search &amp; Select Applicant</h2>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={certSearch}
            onChange={(e) => { setCertSearch(e.target.value); setSelectedApplicant(null); }}
            placeholder="Type name, phone, or city…"
            className="w-full pl-9 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {!selectedApplicant && (
          <ul className="mt-2 border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100 max-h-60 overflow-y-auto">
            {certFiltered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-400 text-center">No applicants found</li>
            ) : (
              certFiltered.map((app) => (
                <li
                  key={app.id}
                  onClick={() => handleSelect(app)}
                  className="flex items-center justify-between px-4 py-3 text-sm cursor-pointer hover:bg-blue-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{app.name}</span>
                  <span className="text-gray-500 text-xs">{app.phone} · {app.city}</span>
                </li>
              ))
            )}
          </ul>
        )}

        {selectedApplicant && (
          <div className="mt-2 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
            <div>
              <p className="font-semibold text-blue-900 text-sm">{selectedApplicant.name}</p>
              <p className="text-xs text-blue-600">{selectedApplicant.phone} · {selectedApplicant.city}</p>
            </div>
            <button
              onClick={() => setSelectedApplicant(null)}
              className="text-xs text-blue-600 hover:text-red-500 underline"
            >
              Change
            </button>
          </div>
        )}
      </div>

      {/* Step 2: Fill Details */}
      {selectedApplicant && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-4">Step 2 — Certificate Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <ReadOnlyField label="Student Name" value={selectedApplicant.name} />
            <ReadOnlyField label="Phone" value={selectedApplicant.phone} />
            <ReadOnlyField label="City" value={selectedApplicant.city} />
            <ReadOnlyField label="Education" value={selectedApplicant.education} />
            <ReadOnlyField label="Preferred Job Type" value={selectedApplicant.jobType} />

            <FormField label="Certificate Number" required>
              <input
                value={certNumber}
                onChange={(e) => setCertNumber(e.target.value)}
                placeholder="e.g. NJ-2026-001"
                className={certInputClass}
              />
            </FormField>

            <FormField label="Course / Program Name" required>
              <select value={courseName} onChange={(e) => setCourseName(e.target.value)} className={certInputClass}>
                <option>Job Placement Program</option>
                <option>Government Job Preparation</option>
                <option>Computer Skills Training</option>
                <option>Sales &amp; Marketing Program</option>
                <option>Banking &amp; Finance Preparation</option>
                <option>Healthcare Job Program</option>
              </select>
            </FormField>

            <FormField label="Enrollment Date" required>
              <input
                type="date"
                value={enrollmentDate}
                onChange={(e) => setEnrollmentDate(e.target.value)}
                className={certInputClass}
              />
            </FormField>

            <FormField label="Issue Date">
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className={certInputClass}
              />
            </FormField>

            <FormField label="Branch / Center Name" required>
              <input
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                placeholder="e.g. Pali Branch, Rajasthan"
                className={certInputClass}
              />
            </FormField>

            <FormField label="Authorized By" required>
              <input
                value={authorizedBy}
                onChange={(e) => setAuthorizedBy(e.target.value)}
                placeholder="Signatory name"
                className={certInputClass}
              />
            </FormField>
          </div>
        </div>
      )}

      {/* Step 3: Certificate Preview */}
      {selectedApplicant && (
        <div className="mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-4">Step 3 — Certificate Preview</h2>
          <div className="overflow-x-auto">
            <div
              ref={certRef}
              style={{
                width: "1123px",
                height: "794px",
                backgroundColor: "#ffffff",
                fontFamily: "Georgia, 'Times New Roman', serif",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* ── Top gradient header band ── */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "8px",
                background: "linear-gradient(90deg, #0D2E6B 0%, #1a4db5 50%, #0D2E6B 100%)",
              }} />

              {/* ── Outer navy border ── */}
              <div style={{
                position: "absolute", inset: "14px",
                border: "3px solid #0D2E6B",
                borderRadius: "6px",
              }} />
              {/* ── Inner gold border ── */}
              <div style={{
                position: "absolute", inset: "22px",
                border: "1px solid #C9A84C",
                borderRadius: "3px",
              }} />

              {/* ── Watermark diagonal text ── */}
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%) rotate(-35deg)",
                fontSize: "80px",
                fontWeight: "900",
                color: "#0D2E6B",
                opacity: 0.03,
                whiteSpace: "nowrap",
                letterSpacing: "12px",
                pointerEvents: "none",
                userSelect: "none",
              }}>
                NAUKRI JUNCTION
              </div>

              {/* ── Corner ornaments ── */}
              {[
                { top: "28px", left: "28px", borderTop: "3px solid #C9A84C", borderLeft: "3px solid #C9A84C" },
                { top: "28px", right: "28px", borderTop: "3px solid #C9A84C", borderRight: "3px solid #C9A84C" },
                { bottom: "28px", left: "28px", borderBottom: "3px solid #C9A84C", borderLeft: "3px solid #C9A84C" },
                { bottom: "28px", right: "28px", borderBottom: "3px solid #C9A84C", borderRight: "3px solid #C9A84C" },
              ].map((s, i) => (
                <div key={i} style={{ position: "absolute", width: "30px", height: "30px", ...s }} />
              ))}

              {/* ── Main content ── */}
              <div style={{
                position: "absolute", inset: "30px",
                display: "flex", flexDirection: "column",
                padding: "20px 52px 16px",
              }}>

                {/* ── Header row: Logo | Title | Official Seal ── */}
                <div style={{
                  display: "flex", alignItems: "center", gap: "20px",
                  paddingBottom: "16px",
                  borderBottom: "2px solid #0D2E6B",
                  marginBottom: "18px",
                }}>
                  {/* Logo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo.webp" alt="Naukri Junction" style={{ height: "76px", objectFit: "contain", flexShrink: 0 }} />

                  {/* Center title block */}
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <p style={{ fontSize: "11px", color: "#C9A84C", letterSpacing: "4px", textTransform: "uppercase", margin: "0 0 4px 0", fontFamily: "Arial, sans-serif", fontWeight: 600 }}>
                      NAUKRI JUNCTION — OFFICIAL PLACEMENT PORTAL
                    </p>
                    <h1 style={{ fontSize: "24px", color: "#0D2E6B", fontWeight: "800", margin: "0 0 4px 0", letterSpacing: "2px", textTransform: "uppercase" }}>
                      Certificate of Enrollment
                    </h1>
                    <p style={{ fontSize: "11px", color: "#888", margin: 0, fontFamily: "Arial, sans-serif" }}>
                      Reg. No: NJ/2018/UP/04712 &nbsp;·&nbsp; Est. 2018 &nbsp;·&nbsp; Pan India Network
                    </p>
                  </div>

                  {/* Official seal SVG */}
                  <svg width="76" height="76" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                    <circle cx="50" cy="50" r="48" fill="none" stroke="#0D2E6B" strokeWidth="3"/>
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
                    <circle cx="50" cy="50" r="36" fill="#0D2E6B"/>
                    {/* NJ monogram */}
                    <text x="50" y="44" textAnchor="middle" fontSize="18" fontFamily="Georgia, serif" fill="white" fontWeight="bold">NJ</text>
                    <text x="50" y="56" textAnchor="middle" fontSize="6" fontFamily="Arial, sans-serif" fill="#C9A84C" letterSpacing="1.5" fontWeight="600">OFFICIAL</text>
                    <text x="50" y="64" textAnchor="middle" fontSize="5" fontFamily="Arial, sans-serif" fill="white" letterSpacing="1">SEAL</text>
                    {/* Stars */}
                    <text x="22" y="54" fontSize="8" fill="#C9A84C">★</text>
                    <text x="70" y="54" fontSize="8" fill="#C9A84C">★</text>
                    {/* Arc text */}
                    <path id="sealArc" d="M8 50 A42 42 0 0 1 92 50" fill="none"/>
                    <text fontSize="5.5" fontFamily="Arial, sans-serif" fill="white" fontWeight="bold" letterSpacing="0.5">
                      <textPath href="#sealArc" startOffset="5%">NAUKRI JUNCTION</textPath>
                    </text>
                  </svg>
                </div>

                {/* ── Certify text ── */}
                <div style={{ textAlign: "center", marginBottom: "14px" }}>
                  <p style={{ fontSize: "13px", color: "#888", fontStyle: "italic", letterSpacing: "1px", margin: "0 0 8px 0", fontFamily: "Arial, sans-serif" }}>
                    This is to certify that
                  </p>
                  <h2 style={{
                    fontSize: "44px", color: "#0D2E6B", fontWeight: "700",
                    margin: "0 0 4px 0", letterSpacing: "1px",
                    textShadow: "0 1px 0 rgba(13,46,107,0.15)",
                  }}>
                    {selectedApplicant.name}
                  </h2>
                  <p style={{ fontSize: "13px", color: "#555", margin: "0 0 10px 0", fontFamily: "Arial, sans-serif" }}>
                    {[selectedApplicant.city, selectedApplicant.education, selectedApplicant.experience].filter(Boolean).join(" · ")}
                  </p>

                  {/* Highlighted enrollment box */}
                  <div style={{
                    display: "inline-block",
                    background: "#EFF6FF",
                    border: "1px solid #93C5FD",
                    borderRadius: "8px",
                    padding: "10px 32px",
                  }}>
                    <p style={{ fontSize: "13px", color: "#1e3a5f", margin: 0, lineHeight: "1.7" }}>
                      has been duly enrolled in the{" "}
                      <strong style={{ color: "#0D2E6B", fontSize: "14px" }}>{courseName}</strong>
                      <br />
                      conducted by <strong style={{ color: "#0D2E6B" }}>Naukri Junction</strong>
                      {selectedApplicant.jobType
                        ? <> — Placement track: <strong style={{ color: "#0D2E6B" }}>{selectedApplicant.jobType}</strong></>
                        : null}
                    </p>
                  </div>
                </div>

                {/* ── Details strip ── */}
                <div style={{
                  display: "flex",
                  border: "1px solid #D1D5DB",
                  borderRadius: "8px",
                  overflow: "hidden",
                  marginBottom: "14px",
                }}>
                  {[
                    { label: "Certificate No.", value: certNumber || "—" },
                    { label: "Enrollment Date", value: fmtDate(enrollmentDate) },
                    { label: "Issue Date", value: fmtDate(issueDate) },
                    { label: "Status", value: "✓ ACTIVE" },
                  ].map(({ label, value }, idx, arr) => (
                    <div key={label} style={{
                      flex: 1,
                      padding: "10px 16px",
                      textAlign: "center",
                      borderRight: idx < arr.length - 1 ? "1px solid #D1D5DB" : "none",
                      background: idx % 2 === 0 ? "#FAFAFA" : "#FFFFFF",
                    }}>
                      <p style={{ fontSize: "9px", color: "#999", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px 0", fontFamily: "Arial, sans-serif", fontWeight: 600 }}>
                        {label}
                      </p>
                      <p style={{
                        fontSize: "13px", color: value.startsWith("✓") ? "#16A34A" : "#1a1a1a",
                        fontWeight: "700", margin: 0,
                        fontFamily: value.startsWith("✓") ? "Arial, sans-serif" : "Georgia, serif",
                      }}>
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* ── Footer: Branch | Signature | Registry info ── */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  {/* Branch */}
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontSize: "9px", color: "#aaa", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 3px 0", fontFamily: "Arial, sans-serif" }}>Branch / Center</p>
                    <p style={{ fontSize: "13px", color: "#0D2E6B", fontWeight: "700", margin: "0 0 2px 0" }}>{branchName || "—"}</p>
                    <p style={{ fontSize: "10px", color: "#888", margin: 0, fontFamily: "Arial, sans-serif" }}>Pali, Rajasthan — 306707</p>
                  </div>

                  {/* Signature */}
                  <div style={{ textAlign: "center" }}>
                    <div style={{ width: "200px", borderTop: "1.5px solid #0D2E6B", paddingTop: "6px" }}>
                      <p style={{ fontSize: "14px", color: "#0D2E6B", fontWeight: "700", margin: "0 0 2px 0" }}>{authorizedBy || "—"}</p>
                      <p style={{ fontSize: "10px", color: "#888", margin: 0, fontFamily: "Arial, sans-serif" }}>Authorized Signatory</p>
                      <p style={{ fontSize: "9px", color: "#aaa", margin: "1px 0 0 0", fontFamily: "Arial, sans-serif" }}>Naukri Junction</p>
                    </div>
                  </div>

                  {/* Registry info */}
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "10px", color: "#aaa", margin: "0 0 3px 0", fontFamily: "Arial, sans-serif" }}>Reg. No: NJ/2018/UP/04712</p>
                    <p style={{ fontSize: "10px", color: "#aaa", margin: "0 0 3px 0", fontFamily: "Arial, sans-serif" }}>GSTIN: 08AAJFN1234X1ZX</p>
                    <p style={{ fontSize: "10px", color: "#aaa", margin: 0, fontFamily: "Arial, sans-serif" }}>support.naukrijunction@gmail.com</p>
                  </div>
                </div>

              </div>

              {/* ── Bottom gradient band ── */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "8px",
                background: "linear-gradient(90deg, #0D2E6B 0%, #C9A84C 50%, #0D2E6B 100%)",
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Download */}
      {selectedApplicant && (
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={handleDownloadPDF}
            disabled={certGenerating || !canDownload}
            className="flex items-center gap-2 bg-blue-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            <Download size={16} />
            {certGenerating ? "Generating PDF…" : "Download Certificate PDF"}
          </button>
          {!canDownload && (
            <p className="text-xs text-amber-600">Fill all required fields (*) to enable download</p>
          )}
        </div>
      )}
    </div>
  );
}

// ── AdminPage ──────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterJob, setFilterJob] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"applications" | "certificate">("applications");

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
          <h1 className="text-lg font-bold text-gray-900">Naukri Junction Admin</h1>
          <p className="text-xs text-gray-400">{applications.length} total submissions</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={fetchApplications}
            className="flex items-center gap-1.5 px-3 py-2 text-xs border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-700"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          {activeTab === "applications" && (
            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 px-3 py-2 text-xs bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
            >
              <Download size={13} />
              Export CSV
            </button>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-2 text-xs border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-600"
          >
            <LogOut size={13} />
            Logout
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="max-w-7xl mx-auto flex gap-1">
          {(["applications", "certificate"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-semibold capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "applications" ? "Applications" : "Certificate"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-5">
        {activeTab === "applications" ? (
          <>
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
          </>
        ) : (
          <CertificateSection applications={applications} />
        )}
      </div>
    </div>
  );
}
