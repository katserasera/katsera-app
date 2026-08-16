import { useState } from "react"
import { useNavigate } from "react-router-dom"

const weekData = [45, 70, 55, 90, 75, 110, 85]
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const maxVal = Math.max(...weekData)

const transactions = [
  { id: "TRX-8821", type: "Merch Sale", amount: "+Rp450.000", date: "26 Jul 2026", status: "success" },
  { id: "TRX-8810", type: "Live Gift", amount: "+Rp1.200.000", date: "25 Jul 2026", status: "success" },
  { id: "TRX-8809", type: "Ticket Sale", amount: "+Rp3.500.000", date: "25 Jul 2026", status: "success" },
  { id: "TRX-8800", type: "Merch Sale", amount: "+Rp280.000", date: "24 Jul 2026", status: "success" },
  { id: "TRX-8791", type: "Withdrawal", amount: "-Rp5.000.000", date: "22 Jul 2026", status: "pending" },
  { id: "TRX-8780", type: "Music Stream", amount: "+Rp2.100.000", date: "20 Jul 2026", status: "success" },
]

const categories = [
  { label: "Collection", value: "Rp8.2M", pct: 38, color: "#3D5898" },
  { label: "Live Gift", value: "Rp5.5M", pct: 25, color: "#6B82BB" },
  { label: "Merchandise", value: "Rp4.8M", pct: 22, color: "#A0B0D8" },
  { label: "Ticket", value: "Rp3.1M", pct: 14, color: "#C8D0E8" },
]

export default function ArtistSalesHub() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<"overview" | "transactions">("overview")

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="px-5 pt-12 pb-3">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <svg width="22" height="25" viewBox="0 0 60 69" fill="none">
              <path d="M10 8 L10 61" stroke="#3D5898" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 34 L48 10" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 34 L48 60" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-extrabold text-[#1E2D5A] text-xl">Sales Hub</span>
          </div>
          <button onClick={() => navigate("/artist/redeem")} className="px-4 py-2 rounded-full bg-[#3D5898] text-white text-xs font-extrabold">
            Redeem →
          </button>
        </div>
      </div>

      {/* Balance card */}
      <div className="mx-5 mb-4">
        <div className="bg-gradient-to-br from-[#3D5898] to-[#1E2D5A] rounded-3xl p-5 text-white shadow-lg">
          <p className="text-sm font-semibold opacity-80 mb-1">Total Balance</p>
          <p className="font-extrabold text-4xl mb-0.5">Rp27.000.000</p>
          <p className="text-xs opacity-70">Available for withdrawal</p>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/20">
            <div>
              <p className="text-xs opacity-70">This Month</p>
              <p className="font-extrabold text-lg">Rp8.4M</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <p className="text-xs opacity-70">Last Month</p>
              <p className="font-extrabold text-lg">Rp6.1M</p>
            </div>
            <div className="ml-auto bg-green-400/20 rounded-full px-3 py-1">
              <p className="text-green-300 font-bold text-xs">+37.7% ↑</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 flex gap-2 mb-4">
        {[["overview", "Overview"], ["transactions", "Transactions"]].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key as "overview" | "transactions")}
            className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all ${tab === key ? "bg-[#3D5898] text-white" : "bg-white text-[#7A8BB5]"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 px-5 pb-28 overflow-y-auto space-y-4">
        {tab === "overview" && (
          <>
            {/* Weekly revenue chart */}
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-extrabold text-[#1E2D5A] text-base">Weekly Revenue</p>
                  <p className="text-xs text-[#7A8BB5]">Jul 20 – Jul 26, 2026</p>
                </div>
                <span className="text-xs font-bold text-[#3D5898] bg-[#F4F5F9] rounded-full px-3 py-1">Jul</span>
              </div>
              {/* Bar chart */}
              <div className="flex items-end justify-between gap-1.5 h-28">
                {weekData.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-t-lg transition-all ${i === 6 ? "bg-[#3D5898]" : "bg-[#C8D0E8]"}`}
                      style={{ height: `${(val / maxVal) * 100}%` }}
                    />
                    <span className="text-[9px] text-[#7A8BB5] font-bold">{days[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue breakdown */}
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <p className="font-extrabold text-[#1E2D5A] text-base mb-4">Revenue Breakdown</p>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div key={cat.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-[#1E2D5A]">{cat.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#7A8BB5]">{cat.pct}%</span>
                        <span className="text-sm font-extrabold text-[#3D5898]">{cat.value}</span>
                      </div>
                    </div>
                    <div className="h-2 bg-[#F4F5F9] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${cat.pct}%`, background: cat.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Total Orders", value: "342", sub: "+12 this week" },
                { label: "Active Merch", value: "18 SKUs", sub: "3 selling out" },
                { label: "Live Gifts", value: "Rp5.5M", sub: "from 24 lives" },
                { label: "Redeem Earned", value: "Rp12M", sub: "all time" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm">
                  <p className="text-xs text-[#7A8BB5] font-semibold">{s.label}</p>
                  <p className="font-extrabold text-[#1E2D5A] text-lg mt-0.5">{s.value}</p>
                  <p className="text-[10px] text-[#3D5898] font-semibold mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "transactions" && (
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            {transactions.map((tx, i) => (
              <div key={tx.id} className={`flex items-center gap-3 px-4 py-4 ${i < transactions.length - 1 ? "border-b border-[#F4F5F9]" : ""}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-none ${tx.amount.startsWith("+") ? "bg-green-50" : "bg-orange-50"}`}>
                  {tx.amount.startsWith("+") ? (
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/></svg>
                  ) : (
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/></svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-extrabold text-[#1E2D5A] text-sm">{tx.type}</p>
                  <p className="text-xs text-[#7A8BB5]">{tx.date} · {tx.id}</p>
                </div>
                <div className="text-right">
                  <p className={`font-extrabold text-sm ${tx.amount.startsWith("+") ? "text-green-600" : "text-orange-500"}`}>{tx.amount}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tx.status === "success" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-500"}`}>{tx.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Artist bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md">
        <div className="mx-4 mb-4 bg-white rounded-full flex shadow-lg border border-[#E8E8E8]">
          {[
            { key: "home", label: "Home", path: "/artist/dashboard" },
            { key: "sales", label: "Sales Hub", path: "/artist/sales", active: true },
            { key: "notif", label: "Alerts", path: "/artist/notifications" },
            { key: "channel", label: "Channel", path: "/artist/channel" },
            { key: "more", label: "More", path: "/artist/dashboard" },
          ].map((t) => (
            <button key={t.key} onClick={() => navigate(t.path)} className={`flex-1 flex flex-col items-center py-3 gap-0.5 ${t.active ? "text-[#3D5898]" : "text-[#C8D0E8]"}`}>
              <div className={`w-5 h-5 rounded-full ${t.active ? "bg-[#3D5898]" : "bg-[#C8D0E8]/40"}`} />
              <span className="text-[9px] font-bold">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
