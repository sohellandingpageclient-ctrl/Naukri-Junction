import ApplicationForm from "@/components/ApplicationForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Shield, Star } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Apply Now – Free Job Registration | Naukri Junction",
  description: "Fill in your details and our team will call you within 24 hours with matching job opportunities. 100% Free.",
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-green-700 text-white text-center py-2 text-sm font-medium tracking-wide">
        🔔 Urgent Hiring! 500+ Vacancies Available – Apply Before Seats Fill Up
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-8 px-4 text-center">
        <div className="flex justify-center mb-3">
          <Image
            src="/logo.webp"
            alt="Naukri Junction"
            width={140}
            height={47}
            className="object-contain rounded-xl"
            priority
          />
        </div>
        <div className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 px-4 py-1.5 rounded-full text-sm font-bold mb-3">
          <Star size={14} className="fill-blue-900" />
          NAUKRI JUNCTION – Official Portal
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
          Apply Now –{" "}
          <span className="text-yellow-400">100% Free Registration</span>
        </h1>
        <p className="text-blue-100 text-sm max-w-sm mx-auto">
          Fill the form below and our team will call you within 24 hours with matching job opportunities.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-sm">
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
            <span className="text-yellow-400 font-bold">★★★★★</span>
            <span className="text-white font-semibold">4.9 Rated</span>
            <span className="text-blue-200">· 2,000+ Reviews</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
            <Shield size={13} className="text-green-400" />
            <span className="text-white">Est. 2018 · Registered Business</span>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Apply Now – It&apos;s Free</h2>
          <p className="text-gray-500 text-sm mb-6">
            Fill in your details and we&apos;ll contact you within 24 hours
          </p>
          <ApplicationForm />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 pb-8 px-4">
        © {new Date().getFullYear()} Naukri Junction · 100% Free Job Portal ·{" "}
        <a href="/" className="hover:text-gray-600 underline">
          Visit Main Site
        </a>
      </footer>

      <WhatsAppButton />
    </main>
  );
}
