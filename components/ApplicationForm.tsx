"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { trackCompleteRegistration, trackLead, trackViewContent } from "@/lib/metaPixel";
import { ChevronDown, Loader2, Search } from "lucide-react";

const JOB_OPTIONS = [
  "Government Job",
  "Office Assistant / Clerk",
  "Data Entry Operator",
  "Computer Operator",
  "Field Executive",
  "Sales Executive",
  "Bank / Finance Job",
  "Teacher / Instructor",
  "Healthcare / Hospital Staff",
  "Security Guard / Supervisor",
  "Driver",
  "Peon / Helper",
  "Work from Home",
  "Any Job",
];

function JobTypeDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = JOB_OPTIONS.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-left flex items-center justify-between bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || "Select job type"}
        </span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input
              autoFocus
              type="text"
              placeholder="Search job type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
            />
          </div>

          {/* Options */}
          <ul className="max-h-48 overflow-y-auto">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-400 text-center">No results</li>
            ) : (
              filtered.map((opt) => (
                <li
                  key={opt}
                  onClick={() => { onChange(opt); setOpen(false); setSearch(""); }}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center gap-2
                    ${value === opt ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
                >
                  {value === opt && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />}
                  {opt}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

type FormData = {
  name: string;
  phone: string;
  city: string;
  dob: string;
  education: string;
  experience: string;
  jobType: string;
  email: string;
  message: string;
};

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobType, setJobType] = useState("");
  const [captcha, setCaptcha] = useState<{ a: number; b: number; answer: number } | null>(null);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState(false);

  useEffect(() => {
    const a = randomInt(1, 12);
    const b = randomInt(1, 12);
    setCaptcha({ a, b, answer: a + b });
    trackViewContent();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!captcha || parseInt(captchaInput) !== captcha.answer) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    setLoading(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, jobType }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Something went wrong.");
        return;
      }

      // Fire Meta Pixel Lead event (browser-side) with shared eventId so
      // Meta deduplicates this against the server-side Conversions API event.
      trackLead({ name: data.name, phone: data.phone, city: data.city, eventId: result.eventId });
      trackCompleteRegistration({ job_type: jobType || "General" });

      setSubmitted(true);
      toast.success("Application submitted! We'll contact you soon.");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
        <p className="text-gray-500 text-sm mb-6">
          Our team will call you within 24 hours. You can also message us directly on WhatsApp.
        </p>
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hello%2C%20I%20just%20submitted%20my%20application%20on%20Naukri%20Junction`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-green-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.852L0 24l6.352-1.516A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.894 0-3.662-.499-5.193-1.37L3 21.5l.885-3.698A9.941 9.941 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
          Message on WhatsApp
        </a>
      </div>
    );
  }

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";
  const errorClass = "text-red-500 text-xs mt-1";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div>
        <label className={labelClass}>Full Name *</label>
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Enter your full name"
          className={inputClass}
        />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className={labelClass}>WhatsApp Number *</label>
        <input
          {...register("phone", {
            required: "Phone is required",
            pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit mobile number" },
          })}
          placeholder="10-digit mobile number"
          maxLength={10}
          inputMode="numeric"
          className={inputClass}
        />
        {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className={labelClass}>Email Address <span className="text-gray-400 font-normal">(Optional)</span></label>
        <input
          {...register("email", {
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
          })}
          placeholder="your@email.com"
          inputMode="email"
          className={inputClass}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      {/* City */}
      <div>
        <label className={labelClass}>City / District *</label>
        <input
          {...register("city", { required: "City is required" })}
          placeholder="Your city or district"
          className={inputClass}
        />
        {errors.city && <p className={errorClass}>{errors.city.message}</p>}
      </div>

      {/* DOB & Education – 2 cols */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Date of Birth *</label>
          <input
            type="date"
            {...register("dob", { required: "Date of birth is required" })}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 14)).toISOString().split("T")[0]}
            min="1950-01-01"
            className={inputClass}
          />
          {errors.dob && <p className={errorClass}>{errors.dob.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Qualification *</label>
          <select {...register("education", { required: "Qualification is required" })} className={inputClass}>
            <option value="">Select</option>
            <option value="8th">8th Pass</option>
            <option value="10th">10th Pass</option>
            <option value="12th">12th Pass</option>
            <option value="ITI / Diploma">ITI / Diploma</option>
            <option value="Graduate">Graduate</option>
            <option value="Post Graduate">Post Graduate</option>
            <option value="Other">Other</option>
          </select>
          {errors.education && <p className={errorClass}>{errors.education.message}</p>}
        </div>
      </div>

      {/* Experience */}
      <div>
        <label className={labelClass}>Experience</label>
        <select {...register("experience")} className={inputClass}>
          <option value="">Select experience</option>
          <option value="Fresher">Fresher (No Experience)</option>
          <option value="0-1 year">Less than 1 Year</option>
          <option value="1-3 years">1–3 Years</option>
          <option value="3-5 years">3–5 Years</option>
          <option value="5+ years">5+ Years</option>
        </select>
      </div>

      {/* Job Type */}
      <div>
        <label className={labelClass}>Preferred Job Type</label>
        <JobTypeDropdown value={jobType} onChange={setJobType} />
      </div>

      {/* Message */}
      <div>
        <label className={labelClass}>Additional Message (Optional)</label>
        <textarea
          {...register("message")}
          placeholder="Anything you'd like us to know..."
          rows={2}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Simple CAPTCHA */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-700 font-medium shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            {captcha ? `What is ${captcha.a} + ${captcha.b}?` : "Loading…"}
          </div>
          <input
            type="number"
            inputMode="numeric"
            value={captchaInput}
            onChange={(e) => { setCaptchaInput(e.target.value); setCaptchaError(false); }}
            placeholder="Answer"
            className="w-20 border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-center text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {captchaError && <p className="text-red-500 text-xs mt-1.5">Incorrect answer. Please try again.</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-70 text-white font-bold py-3.5 rounded-xl text-base transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Application – Free"
        )}
      </button>

      {/* Trust badges */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 pt-1">
        {[
          { icon: "🔒", label: "100% Secure" },
          { icon: "🆓", label: "Always Free" },
          { icon: "🛡️", label: "No Hidden Charges" },
          { icon: "✅", label: "Verified Service" },
        ].map(({ icon, label }) => (
          <span key={label} className="flex items-center gap-1 text-xs text-gray-500">
            <span>{icon}</span>{label}
          </span>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400">
        By submitting, you agree to be contacted by our team via call or WhatsApp. Your data is never sold or shared.
      </p>
    </form>
  );
}
