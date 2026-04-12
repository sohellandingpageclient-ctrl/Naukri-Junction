"use client";

import { useEffect, useState } from "react";

const NOTIFICATIONS = [
  { name: "Rahul", city: "Lucknow", action: "just applied for Government Job" },
  { name: "Priya", city: "Patna", action: "just got placed! 🎉" },
  { name: "Amit", city: "Jaipur", action: "just applied for Data Entry" },
  { name: "Sunita", city: "Kanpur", action: "just got placed! 🎉" },
  { name: "Deepak", city: "Bhopal", action: "just applied for Bank Job" },
  { name: "Neha", city: "Agra", action: "just got placed! 🎉" },
  { name: "Sanjay", city: "Varanasi", action: "just applied for Office Assistant" },
  { name: "Pooja", city: "Pune", action: "just got placed! 🎉" },
  { name: "Vikram", city: "Indore", action: "just applied for Any Job" },
  { name: "Anjali", city: "Delhi", action: "just got placed! 🎉" },
  { name: "Ravi", city: "Nagpur", action: "just applied for Field Executive" },
  { name: "Meena", city: "Surat", action: "just got placed! 🎉" },
  { name: "Arjun", city: "Ranchi", action: "just applied for Computer Operator" },
  { name: "Kavita", city: "Meerut", action: "just got placed! 🎉" },
  { name: "Suresh", city: "Hyderabad", action: "just applied for Sales Executive" },
];

export default function LiveNotification() {
  const [current, setCurrent] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let index = 0;

    function show() {
      index = (index + 1) % NOTIFICATIONS.length;
      setCurrent(index);
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    }

    const timer = setInterval(show, 8000);
    const initial = setTimeout(show, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(initial);
    };
  }, []);

  if (current === null) return null;

  const n = NOTIFICATIONS[current];

  return (
    <div
      className={`fixed bottom-20 left-4 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl shadow-lg px-4 py-3 max-w-xs">
        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
          {n.name[0]}
        </div>
        <div>
          <p className="text-gray-900 text-xs font-semibold">
            {n.name} from {n.city}
          </p>
          <p className="text-gray-500 text-xs">{n.action}</p>
        </div>
        <div className="w-2 h-2 rounded-full bg-green-500 shrink-0 animate-pulse" />
      </div>
    </div>
  );
}
