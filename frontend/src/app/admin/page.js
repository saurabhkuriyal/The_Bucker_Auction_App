"use client";

import { useAppSelector } from "@/lib/hooks";

import {
  BadgeDollarSign,
  Beef,
  Calendar,
  ChevronRight,
  Hammer,
  PlusCircle,
  TrendingUp,
  UploadCloud,
  Users,
} from "lucide-react";
import { useMemo } from "react";

export default function Page() {

  const id = useAppSelector((state) => state.userId);
  const username = useAppSelector((state) => state.username);
  const role = useAppSelector((state) => state.role);

  console.log("HHOOMME", id);
  console.log("HHOOMMEE UUSSEERRMMAE-----", username);
  console.log("HHOOMMEE ROLLEE-----", role);
  // --- Mock data (replace with your API later) ---
  const stats = [
    { label: "Active Auctions", value: 12, icon: Hammer, delta: "+3 this week" },
    { label: "Registered Bidders", value: 842, icon: Users, delta: "+27" },
    { label: "Gross Sales (₹)", value: "18.6L", icon: BadgeDollarSign, delta: "+₹1.2L" },
    { label: "Avg Bid Growth", value: "12.5%", icon: TrendingUp, delta: "vs last 7d" },
  ];

  const upcoming = [
    { id: "A-1042", bull: "Rajveer 9X", date: "2025-09-27", start: "15:00", lots: 18, status: "Scheduled" },
    { id: "A-1041", bull: "Sher Dil 5", date: "2025-09-25", start: "11:00", lots: 12, status: "Scheduled" },
    { id: "A-1040", bull: "Garuda 2", date: "2025-09-22", start: "10:00", lots: 10, status: "Live" },
  ];

  const topBulls = [
    { name: "Rajveer 9X", breed: "Sahiwal", high: "₹3.2L", bids: 42 },
    { name: "Sher Dil 5", breed: "Gir", high: "₹2.8L", bids: 35 },
    { name: "Garuda 2", breed: "Tharparkar", high: "₹2.4L", bids: 29 },
    { name: "Bhima 7", breed: "Kankrej", high: "₹2.1L", bids: 24 },
  ];

  // Simple inline chart path (sparkline) — no external libs
  const revenueSeries = [9, 11, 8, 12, 13, 16, 14, 18, 17, 21, 19, 23]; // pretend monthly
  const sparkPath = useMemo(() => {
    const w = 240, h = 60, pad = 6;
    const max = Math.max(...revenueSeries);
    const min = Math.min(...revenueSeries);
    const norm = (v) => h - pad - ((v - min) / Math.max(1, max - min)) * (h - pad * 2);
    const step = (w - pad * 2) / (revenueSeries.length - 1);
    return revenueSeries
      .map((v, i) => `${i === 0 ? "M" : "L"} ${pad + i * step} ${norm(v)}`)
      .join(" ");
  }, [revenueSeries]);

  // --- UI ---
  return (
    <div>
    <div className="w-full space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-600">
            Overview of auctions, bidders, and sales for your Bull Auction app.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            <PlusCircle className="h-4 w-4" />
            New Auction
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <UploadCloud className="h-4 w-4" />
            Bulk Upload Bulls
          </button>
        </div>
      </div>

      {/* KPIs */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-indigo-50 p-2.5">
                <s.icon className="h-5 w-5 text-indigo-600" />
              </div>
              <span className="text-xs font-medium text-emerald-600">{s.delta}</span>
            </div>
            <div className="mt-4 text-2xl font-semibold">{s.value}</div>
            <div className="mt-1 text-sm text-gray-600">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Two-column zone: Auctions + Chart / Top Bulls */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Upcoming / Live Auctions (table) */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div className="flex items-center gap-2">
              <Hammer className="h-5 w-5 text-indigo-600" />
              <h2 className="text-base font-semibold">Upcoming & Live Auctions</h2>
            </div>
            <button className="text-sm font-medium text-indigo-600 hover:underline inline-flex items-center gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Auction ID</th>
                  <th className="px-4 py-3 text-left font-semibold">Lead Bull</th>
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  <th className="px-4 py-3 text-left font-semibold">Start</th>
                  <th className="px-4 py-3 text-left font-semibold">Lots</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {upcoming.map((a) => (
                  <tr key={a.id} className="hover:bg-indigo-50/40 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{a.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gray-100">
                          <Beef className="h-4 w-4 text-gray-700" />
                        </span>
                        <span className="font-medium">{a.bull}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{a.date}</td>
                    <td className="px-4 py-3">{a.start}</td>
                    <td className="px-4 py-3">{a.lots}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold " +
                          (a.status === "Live"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700")
                        }
                      >
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {upcoming.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                      No auctions scheduled.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t px-5 py-3 text-xs text-gray-500">
            <div className="inline-flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Updated just now
            </div>
          </div>
        </div>

        {/* Right column: Revenue sparkline + Top Bulls */}
        <div className="space-y-6">
          {/* Revenue mini chart card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Monthly Revenue (₹)</h3>
              <span className="text-xs text-gray-500">Last 12 months</span>
            </div>
            <div className="mt-4">
              <svg viewBox="0 0 240 60" width="100%" height="60">
                <defs>
                  <linearGradient id="rev" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopOpacity="0.8" stopColor="#4f46e5" />
                    <stop offset="100%" stopOpacity="0.05" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>
                <path d={sparkPath} fill="none" stroke="#4f46e5" strokeWidth="2" />
              </svg>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Trending up by <span className="font-medium text-emerald-600">8.4%</span> this quarter.
            </div>
          </div>

          {/* Top Bulls */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold">Top Bulls</h3>
              <button className="text-sm font-medium text-indigo-600 hover:underline inline-flex items-center gap-1">
                Manage <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <ul className="space-y-3">
              {topBulls.map((b) => (
                <li
                  key={b.name}
                  className="flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2.5 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                      <Beef className="h-5 w-5 text-indigo-600" />
                    </span>
                    <div>
                      <div className="font-medium text-gray-900">{b.name}</div>
                      <div className="text-xs text-gray-500">{b.breed}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{b.high}</div>
                    <div className="text-xs text-gray-500">{b.bids} bids</div>
                  </div>
                </li>
              ))}
              {topBulls.length === 0 && (
                <li className="rounded-xl border border-dashed px-3 py-6 text-center text-sm text-gray-500">
                  No bulls yet.
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}

