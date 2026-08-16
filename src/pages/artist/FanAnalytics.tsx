import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ageData = [
  { range: "13-17", pct: 8, color: "#C8D0E8" },
  { range: "18-24", pct: 45, color: "#3D5898" },
  { range: "25-34", pct: 30, color: "#6B82BB" },
  { range: "35+", pct: 17, color: "#A0B0D8" },
]

const topCities = [
  { city: "Jakarta", fans: "38K", flag: "🏙️" },
  { city: "Bandung", fans: "21K", flag: "🌄" },
  { city: "Surabaya", fans: "18K", flag: "🌊" },
  { city: "Yogyakarta", fans: "12K", flag: "🏛️" },
  { city: "Medan", fans: "9K", flag: "🌴" },
]

export default function FanAnalytics() {
  const navigate = useNavigate()
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d")

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round"/></svg>
        </button>
        <h1 className="font-extrabold text-[#1E2D5A] text-xl">Fan Analytics</h1>
        <div className="ml-auto flex gap-1">
          {(["7d", "30d", "90d"] as const).map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1 rounded-full text-xs font-bold ${period === p ? "bg-[#3D5898] text-white" : "bg-white text-[#7A8BB5]"}`}>{p}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-5 pb-28 overflow-y-auto space-y-4">
        {/* Top stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Total Fans", value: "125K", trend: "+2.4K", up: true },
            { label: "New This Month", value: "4.2K", trend: "+18%", up: true },
            { label: "Avg Engagement", value: "12.4%", trend: "+3.1%", up: true },
            { label: "Churn Rate", value: "0.8%", trend: "-0.2%", up: false },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-xs text-[#7A8BB5] font-semibold">{s.label}</p>
              <p className="font-extrabold text-[#1E2D5A] text-2xl mt-1">{s.value}</p>
              <p className={`text-[11px] font-bold mt-0.5 ${s.up ? "text-green-500" : "text-red-400"}`}>{s.trend} this period</p>
            </div>
          ))}
        </div>

        {/* Age distribution */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <p className="font-extrabold text-[#1E2D5A] text-base mb-4">Age Distribution</p>
          <div className="space-y-3">
            {ageData.map((a) => (
              <div key={a.range} className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#7A8BB5] w-12">{a.range}</span>
                <div className="flex-1 h-3 bg-[#F4F5F9] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${a.pct}%`, background: a.color }} />
                </div>
                <span className="text-xs font-extrabold text-[#1E2D5A] w-8 text-right">{a.pct}%</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#7A8BB5] mt-3 font-semibold">Gender split: 68% Female · 30% Male · 2% Other</p>
        </div>

        {/* Top cities */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <p className="font-extrabold text-[#1E2D5A] text-base mb-4">Top Cities</p>
          <div className="space-y-3">
            {topCities.map((c, i) => (
              <div key={c.city} className="flex items-center gap-3">
                <span className="w-5 text-xs font-bold text-[#7A8BB5]">#{i + 1}</span>
                <span className="text-lg">{c.flag}</span>
                <span className="font-bold text-[#1E2D5A] text-sm flex-1">{c.city}</span>
                <span className="font-extrabold text-[#3D5898] text-sm">{c.fans}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight card */}
        <div className="bg-gradient-to-br from-[#3D5898] to-[#1E2D5A] rounded-3xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🤖</span>
            <p className="font-extrabold text-sm">AI Fan Insight</p>
          </div>
          <p className="text-sm opacity-90 leading-relaxed">
            Your 18-24 Jakarta fans are most active on Saturday evenings. Consider scheduling your next live stream at 8 PM this Saturday for maximum reach.
          </p>
          <p className="text-xs opacity-60 mt-2">Updated · 26 Jul 2026</p>
        </div>
      </div>
    </div>
  )
}
