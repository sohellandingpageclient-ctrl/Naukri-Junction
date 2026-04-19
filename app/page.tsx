import ApplicationForm from "@/components/ApplicationForm";
import LiveNotification from "@/components/LiveNotification";
import TestimonialsScroller from "@/components/TestimonialsScroller";
import TrustCertificates from "@/components/TrustCertificates";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Award, Briefcase, CheckCircle, Clock, HelpCircle, Mail, MapPin, Phone, Shield, Star, ThumbsUp, Users } from "lucide-react";
import Image from "next/image";

const JOB_POSITIONS = [
  { title: "Government Job (Various Posts)", salary: "₹18,000 – ₹60,000/month", location: "Pan India" },
  { title: "Office Assistant / Clerk", salary: "₹15,000 – ₹25,000/month", location: "Pan India" },
  { title: "Field Executive", salary: "₹18,000 – ₹30,000/month", location: "Pan India" },
  { title: "Data Entry Operator", salary: "₹16,000 – ₹35,000/month", location: "Work from Home" },
  { title: "Sales Executive", salary: "₹20,000 – ₹40,000/month", location: "Pan India" },
  { title: "Bank / Finance Jobs", salary: "₹20,000 – ₹70,000/month", location: "Pan India" },
  { title: "Computer Operator", salary: "₹14,000 – ₹30,000/month", location: "Pan India" },
  { title: "Peon / Helper / Driver", salary: "₹12,000 – ₹25,000/month", location: "Pan India" },
  { title: "Security Guard / Supervisor", salary: "₹13,000 – ₹20,000/month", location: "Pan India" },
  { title: "Teacher / Instructor", salary: "₹20,000 – ₹80,000/month", location: "Pan India" },
  { title: "Healthcare / Hospital Staff", salary: "₹16,000 – ₹40,000/month", location: "Pan India" },
  { title: "Work from Home (Various)", salary: "₹10,000 – ₹25,000/month", location: "Work from Home" },
];

const BENEFITS = [
  "Free Registration – No Fees",
  "Government & Private Both",
  "Fresher & Experienced Welcome",
  "Response within 24 Hours",
  "8th / 10th / 12th / Graduate – All Eligible",
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
          <div className="flex justify-center mb-4">
            <Image src="/logo.webp" alt="Naukri Junction" width={160} height={54} className="object-contain rounded-xl" priority />
          </div>
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Star size={14} className="fill-blue-900" />
            NAUKRI JUNCTION – Official Portal
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            Get a Job in 7 Days
            <br />
            <span className="text-yellow-400">100% Free Registration</span>
          </h1>
          <p className="text-blue-100 text-lg mb-4 max-w-xl mx-auto">
            Trusted by 10,000+ candidates. Fill the form below and our team
            will call you within 24 hours with matching job opportunities.
          </p>
          {/* Trust Rating Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6 text-sm">
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
          <a
            href="#apply-form"
            className="inline-block bg-yellow-400 text-blue-900 font-extrabold text-lg px-8 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition-colors mb-6"
          >
            Apply Now – It&apos;s Free
          </a>
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
        <div id="apply-form">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Apply Now – It&apos;s Free</h2>
            <p className="text-gray-500 text-sm mb-6">
              Fill in your details and we&apos;ll contact you within 24 hours
            </p>
            <ApplicationForm />
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <TestimonialsScroller />

      {/* How It Works */}
      <section className="bg-blue-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl font-bold mb-2">How It Works</h2>
          <p className="text-center text-blue-200 text-sm mb-10">Get placed in 3 simple steps</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Fill the Form", desc: "Submit your basic details — name, qualification, location, and preferred job type. Takes less than 2 minutes." },
              { step: "2", title: "We Call You", desc: "Our placement advisor will call you within 24 hours with job opportunities matching your profile." },
              { step: "3", title: "Get Placed", desc: "Attend the interview, get selected, and start your new job. We stay with you until you're placed." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white/10 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-yellow-400 text-blue-900 rounded-full flex items-center justify-center text-xl font-extrabold mx-auto mb-4">{step}</div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-yellow-400 py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: <Users size={28} />, value: "10,000+", label: "Candidates Placed" },
            { icon: <Briefcase size={28} />, value: "500+", label: "Partner Companies" },
            { icon: <Award size={28} />, value: "8+ Years", label: "Trusted Experience" },
            { icon: <ThumbsUp size={28} />, value: "98%", label: "Satisfaction Rate" },
          ].map(({ icon, value, label }) => (
            <div key={label} className="text-blue-900">
              <div className="flex justify-center mb-2">{icon}</div>
              <p className="text-2xl font-extrabold">{value}</p>
              <p className="text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Certificates */}
      <TrustCertificates />

      {/* Who Can Apply */}
      <section className="bg-white py-14 px-4 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">Who Can Apply?</h2>
          <p className="text-center text-gray-500 text-sm mb-8">We welcome candidates from all backgrounds and qualifications</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "8th / 10th Pass",
              "12th Pass (Any Stream)",
              "ITI / Diploma Holders",
              "Graduates (BA, BSc, BCom, etc.)",
              "Freshers with No Experience",
              "Experienced Candidates",
              "Housewives Seeking Work from Home",
              "Rural & Semi-Urban Candidates",
              "Candidates from Any State",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 bg-blue-50 rounded-xl px-4 py-3 border border-blue-100">
                <CheckCircle size={18} className="text-green-600 shrink-0" />
                <span className="text-gray-800 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-14 px-4 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
          <p className="text-center text-gray-500 text-sm mb-8">Everything you need to know before applying</p>
          <div className="space-y-4">
            {[
              { q: "Is registration really free?", a: "Yes, 100% free. We never charge candidates for registration or placement. Our service is completely free for job seekers." },
              { q: "How soon will I get a call?", a: "Our team will contact you within 24 hours of submitting the form. Most candidates receive a call within a few hours." },
              { q: "What types of jobs are available?", a: "We offer government jobs, bank jobs, private sector jobs, work-from-home opportunities, and more — across all qualification levels." },
              { q: "Do I need prior experience?", a: "No experience is required for most openings. We have positions for freshers as well as experienced candidates across all sectors." },
              { q: "Can I apply from a village or small town?", a: "Absolutely. We place candidates from all across India — cities, towns, and villages. Many openings are available Pan India." },
              { q: "What documents will I need?", a: "Generally you'll need your educational certificates, Aadhaar card, and a recent photo. Our advisor will guide you on specifics for each job." },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <HelpCircle size={18} className="text-blue-700 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{q}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-14 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Ready to Change Your Life?</h2>
          <p className="text-blue-200 mb-6 text-sm leading-relaxed">
            Thousands of candidates have already found their dream jobs through Naukri Junction.
            Don&apos;t wait — seats fill up fast!
          </p>
          <a
            href="#apply-form"
            className="inline-block bg-yellow-400 text-blue-900 font-extrabold text-lg px-10 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition-colors"
          >
            Apply Now – It&apos;s Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 pt-12 pb-6 px-4">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image src="/logo.webp" alt="Naukri Junction Logo" width={130} height={44} className="object-contain rounded-lg" />
            </div>
            <p className="text-sm leading-relaxed mb-2">
              India&apos;s trusted free job placement portal, connecting job seekers with government &amp; private opportunities since 2018. Over 8 years of dedicated service, 10,000+ candidates placed across India — completely free of charge.
            </p>
            <p className="text-xs text-gray-500 mb-1">Reg. No: NJ/2018/UP/04712</p>
            <p className="text-xs text-gray-500">Pan India Network · Government &amp; Private Sector</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-yellow-400" />
                <span>Sewari, Bali, Falna,<br />PO: Sewari Sub Post Office,<br />DIST: Pali, Rajasthan – 306707</span>
              </li>
              {process.env.NEXT_PUBLIC_HELPDESK_NUMBER && (
                <li className="flex items-center gap-2">
                  <Phone size={14} className="shrink-0 text-yellow-400" />
                  <a href={`tel:+91${process.env.NEXT_PUBLIC_HELPDESK_NUMBER}`} className="hover:text-white transition-colors">
                    +91 {process.env.NEXT_PUBLIC_HELPDESK_NUMBER}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-yellow-400" />
                <a href="mailto:support.naukrijunction@gmail.com" className="hover:text-white transition-colors">
                  support.naukrijunction@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Trust Badges */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Why Trust Us</h4>
            <ul className="space-y-2 text-sm">
              {[
                "100% Free – No Hidden Charges",
                "10,000+ Candidates Placed",
                "Government & Private Both",
                "Verified Business Since 2018",
                "SSL Secured & Privacy Safe",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle size={13} className="text-green-500 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs max-w-5xl mx-auto">
          <span>© {new Date().getFullYear()} Naukri Junction. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/admin" className="hover:text-white transition-colors">Admin</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Live applicant notifications */}
      <LiveNotification />
    </main>
  );
}
