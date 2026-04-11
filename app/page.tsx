import ApplicationForm from "@/components/ApplicationForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Briefcase, CheckCircle, Clock, MapPin, Phone, Star, Users } from "lucide-react";

const JOB_POSITIONS = [
  { title: "Office Assistant", salary: "₹15,000 – ₹25,000/month", location: "Pan India" },
  { title: "Field Executive", salary: "₹18,000 – ₹30,000/month", location: "Pan India" },
  { title: "Data Entry Operator", salary: "₹12,000 – ₹20,000/month", location: "Work from Home" },
  { title: "Sales Executive", salary: "₹20,000 – ₹40,000/month", location: "Pan India" },
];

const BENEFITS = [
  "Free Registration – No Fees",
  "Government & Private Both",
  "Fresher & Experienced Welcome",
  "Response within 24 Hours",
  "10th / 12th / Graduate – All Eligible",
  "Work from Home Options Available",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-green-700 text-white text-center py-2 text-sm font-medium tracking-wide">
        🔔 Urgent Hiring! 500+ Vacancies Available – Apply Before Seats Fill Up
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Star size={14} className="fill-blue-900" />
            SARKAR JOBS – Official Portal
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            Get a Job in 7 Days
            <br />
            <span className="text-yellow-400">100% Free Registration</span>
          </h1>
          <p className="text-blue-100 text-lg mb-6 max-w-xl mx-auto">
            Trusted by 10,000+ candidates. Fill the form below and our team
            will call you within 24 hours with matching job opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
              <Users size={14} /> 10,000+ Placed
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
              <Briefcase size={14} /> 500+ Companies
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
              <Clock size={14} /> 24hr Response
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
        {/* Left – Job Info */}
        <div className="space-y-6">
          {/* Current Openings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase size={20} className="text-blue-700" />
              Current Openings
            </h2>
            <div className="space-y-3">
              {JOB_POSITIONS.map((job, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between p-3 bg-blue-50 rounded-xl border border-blue-100"
                >
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{job.title}</p>
                    <p className="text-green-700 text-sm font-medium">{job.salary}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <MapPin size={11} />
                    {job.location}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <ul className="space-y-2.5">
              {BENEFITS.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 text-sm">
                  <CheckCircle size={16} className="text-green-600 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-2xl p-5">
            <p className="font-bold text-lg mb-1">Need Instant Help?</p>
            <p className="text-green-100 text-sm mb-3">
              Chat directly with our placement advisor on WhatsApp
            </p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hello%2C%20I%20want%20to%20apply%20for%20a%20job`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-green-700 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-green-50 transition-colors"
            >
              <Phone size={16} />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Right – Form */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Apply Now – It&apos;s Free</h2>
            <p className="text-gray-500 text-sm mb-6">
              Fill in your details and we&apos;ll contact you within 24 hours
            </p>
            <ApplicationForm />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} Sarkar Jobs. All rights reserved. |{" "}
        <a href="/admin" className="hover:underline text-gray-400">
          Admin
        </a>
      </footer>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </main>
  );
}
