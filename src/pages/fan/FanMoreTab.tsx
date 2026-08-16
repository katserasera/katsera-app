import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const menuItems = [
  { icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>, label: "Order History", path: "/fan/orders" },
  { icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M9 16l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: "Event Entries", path: "/fan/events" },
  { icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: "Saved Items", path: "/fan/saved" },
  { icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M1 10h22" stroke="currentColor" strokeWidth="1.8"/></svg>, label: "My Wallet", path: "/fan/wallet" },
  { icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><polyline points="12 7 12 12 15 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>, label: "Recently Watched", path: "/fan/watched" },
  { icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>, label: "Purchased Media", path: "/fan/media" },
  { icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: "Downloaded", path: "/fan/downloads" },
  { icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.8"/><circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.8"/></svg>, label: "Song Wrapped", path: "/fan/wrapped" },
]

export default function FanMoreTab() {
  const navigate = useNavigate()
  const [coinBalance, setCoinBalance] = useState(20)

  // Sync balance from localStorage on mount and on focus
  useEffect(() => {
    const sync = () => setCoinBalance(parseInt(localStorage.getItem("coinBalance") || "20"))
    sync()
    window.addEventListener("focus", sync)
    return () => window.removeEventListener("focus", sync)
  }, [])

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="22" height="25" viewBox="0 0 60 69" fill="none">
            <path d="M10 8 L10 61" stroke="#3D5898" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 34 L48 10" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 34 L48 60" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-extrabold text-[#1E2D5A] text-xl">More</span>
        </div>
        <button onClick={() => navigate("/fan/home")} className="w-10 h-10 rounded-full border-2 border-[#C8D0E8] flex items-center justify-center active:scale-95 transition-transform relative">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border border-white" />
        </button>
      </div>

      <div className="flex-1 px-5 pb-28 overflow-y-auto space-y-3">
        {/* Profile row */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-20 h-20 rounded-full overflow-hidden flex-none shadow-sm">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <p className="font-extrabold text-[#1E2D5A] text-base">martin_go90</p>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#7A8BB5" strokeWidth="1.8"/></svg>
            </div>
            <button onClick={() => navigate("/fan/profile")} className="px-5 py-2 rounded-full bg-[#3D5898] text-white font-extrabold text-xs">
              My Profile
            </button>
          </div>
        </div>

        {/* My Membership */}
        <div className="bg-white rounded-2xl shadow-sm">
          <button
            onClick={() => navigate("/fan/membership/detail")}
            className="w-full flex items-center gap-3 px-4 py-4 active:bg-[#F4F5F9] transition-colors rounded-2xl"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M2 7l4.5 4.5 5.5-6 5.5 6L22 7" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 7v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7" stroke="#D4A017" strokeWidth="2"/></svg>
            <div className="flex-1 text-left">
              <p className="font-semibold text-[#1E2D5A] text-sm">My Membership</p>
              <p className="text-[#D4A017] text-xs font-semibold">Bronze Fan · 34 days left</p>
            </div>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#C8D0E8" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Coin balance */}
        <div className="bg-white rounded-2xl shadow-sm flex items-center px-4 py-4 gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#D4A017] flex items-center justify-center flex-none">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="#D4A017" strokeWidth="2"/><path d="M12 8v4M10 12h4" stroke="#D4A017" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <span className="font-extrabold text-[#1E2D5A] text-base">{coinBalance}</span>
          <span className="text-[#9BAACE] text-xs font-semibold">Katsera Coins</span>
          <div className="flex-1" />
          <button
            onClick={() => navigate("/fan/wallet")}
            className="px-5 py-2 rounded-full bg-[#3D5898] text-white font-extrabold text-xs active:scale-95 transition-transform"
          >
            Wallet
          </button>
        </div>

        {/* Menu items card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-4 text-left ${i < menuItems.length - 1 ? "border-b border-[#F4F5F9]" : ""} hover:bg-[#F4F5F9] active:bg-[#E8E8E8] transition-colors`}
            >
              <span className="text-[#3D5898] flex-none">{item.icon}</span>
              <span className="font-semibold text-[#1E2D5A] text-sm flex-1">{item.label}</span>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#C8D0E8" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          ))}
        </div>

        {/* Referral banner */}
        <button onClick={() => navigate("/fan/referral")} className="w-full bg-gradient-to-r from-[#3D5898] to-[#1E2D5A] rounded-2xl p-4 flex items-center gap-3 shadow-sm active:scale-[0.98] transition-all">
          <span className="text-2xl">🎁</span>
          <div className="flex-1 text-left">
            <p className="font-extrabold text-white text-sm">Invite Friends & Earn</p>
            <p className="text-xs text-white/70">Get IDR 300.000 per referral</p>
          </div>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pb-4">
        <div className="bg-white rounded-full flex shadow-lg border border-[#E8E8E8] px-2">
          {[
            { key: "home", label: "Home", path: "/fan/home", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
            { key: "shop", label: "Shop", path: "/fan/shop", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
            { key: "channel", label: "Channel", path: "/fan/dm", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 14H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4l-4 4v-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
            { key: "more", label: "More", path: "/fan/more", active: true, icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="19" cy="12" r="1.2" fill="currentColor"/></svg> },
          ].map((t) => (
            <button key={t.key} onClick={() => navigate(t.path)} className={`flex-1 flex flex-col items-center py-3 gap-0.5 ${t.active ? "text-[#3D5898]" : "text-[#C8D0E8]"}`}>
              {t.icon}
              <span className="text-[9px] font-bold">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
