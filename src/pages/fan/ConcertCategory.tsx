import { useState } from "react"
import { useNavigate } from "react-router-dom"

function fmt(n: number) { return "Rp" + n.toLocaleString("id-ID") }

const categories = [
  { id: "festival", label: "Festival", price: 870000, desc: "Include pajak+layanan", expanded: true, sub: null },
  { id: "tribun-a1", label: "Tribune A1", price: 770000, desc: "Include pajak+layanan", expanded: false, sub: null },
  { id: "tribun-a2", label: "Tribune A2", price: 670000, desc: "Include pajak+layanan", expanded: false, sub: null },
  { id: "tribun-a3", label: "Tribune A3", price: 570000, desc: "Include pajak + layanan", expanded: false, sub: null },
  { id: "tribun-b1", label: "Tribune B1", price: 570000, desc: "Include pajak+layanan", expanded: false, sub: null },
  { id: "tribun-b2", label: "Tribune B2", price: 520000, desc: "Include pajak+layanan", expanded: false, sub: null },
  { id: "vip", label: "VIP", price: 2000000, desc: "Include pajak+layanan", expanded: false, sub: null },
]

export default function ConcertCategory() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"tiket" | "sk">("tiket")
  const [qty, setQty] = useState(1)
  const [expanded, setExpanded] = useState<string | null>("festival")



  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-0 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-[#3D5898] font-extrabold text-xl">K Shop</span>
          <button onClick={() => navigate("/fan/more")} className="ml-auto w-8 h-8 flex items-center justify-center rounded-full bg-[#E8E8E8] active:scale-95 transition-transform">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#3D5898" strokeWidth="2" strokeLinecap="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#3D5898" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
        <p className="text-xs text-[#7A8BB5] font-semibold mb-3">← KONSER: Semua Aku Dirayakan</p>

        {/* Tabs */}
        <div className="flex border-b border-[#E8E8E8]">
          {[["tiket", "Tiket"], ["sk", "Syarat dan Ketentuan"]].map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setActiveTab(key as "tiket" | "sk"); if (key === "sk") navigate("/fan/concert/terms") }}
              className={`flex-1 py-2.5 text-sm font-bold transition-all ${activeTab === key ? "text-[#3D5898] border-b-2 border-[#3D5898]" : "text-[#7A8BB5]"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto pb-28">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <button
              className="w-full px-4 py-3.5 flex items-center justify-between"
              onClick={() => setExpanded(expanded === cat.id ? null : cat.id)}
            >
              <div className="text-left">
                <p className="font-bold text-[#1E2D5A] text-sm">{cat.label}</p>
                <p className="text-xs text-[#7A8BB5]">{fmt(cat.price)} ({cat.desc})</p>
              </div>
              <svg
                className={`transition-transform ${expanded === cat.id ? "rotate-180" : ""}`}
                width="18" height="18" fill="none" viewBox="0 0 24 24"
              ><path d="M6 9l6 6 6-6" stroke="#7A8BB5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            {expanded === cat.id && (
              <div className="border-t border-[#F4F5F9] px-4 py-3">
                <p className="text-xs text-[#7A8BB5] mb-2">Jumlah tiket</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#1E2D5A]">Pax</span>
                    <span className="text-sm font-bold text-[#3D5898]">{fmt(cat.price)}/pax</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-7 h-7 rounded-full bg-[#F4F5F9] flex items-center justify-center font-bold text-[#3D5898]">−</button>
                    <span className="font-bold text-[#1E2D5A] w-5 text-center">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="w-7 h-7 rounded-full bg-[#3D5898] flex items-center justify-center font-bold text-white">+</button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <p className="text-xs text-[#7A8BB5]">Total ({qty} pax)</p>
                    <p className="font-extrabold text-[#3D5898]">{fmt(cat.price * qty)}</p>
                  </div>
                  <button
                    onClick={() => navigate("/fan/concert/terms", { state: { category: cat, qty } })}
                    className="px-6 py-2 rounded-full bg-[#3D5898] text-white font-bold text-sm active:scale-95 transition-all"
                  >
                    Pesan
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] flex">
        {[
          { key: "home", label: "Home", path: "/fan/home", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg> },
          { key: "shop", label: "Shop", path: "/fan/shop", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
          { key: "channel", label: "Channel", path: "/fan/channel", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="15" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 3l-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
          { key: "more", label: "More", path: "/fan/home", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/><circle cx="5" cy="12" r="1" fill="currentColor"/></svg> },
        ].map((t) => (
          <button key={t.key} onClick={() => navigate(t.path)} className={`flex-1 flex flex-col items-center py-2.5 gap-0.5 ${t.key === "shop" ? "text-[#3D5898]" : "text-[#7A8BB5]"}`}>
            {t.icon}
            <span className="text-[10px] font-bold">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
