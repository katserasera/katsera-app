import { useState } from "react"
import { useNavigate } from "react-router-dom"

const contacts = [
  { initials: "CB", name: "CornelBekasi", phone: "08131687777" },
  { initials: "D", name: "DeviCak", phone: "08131687777" },
  { initials: "N", name: "Nesachan", phone: "08131687777" },
  { initials: "A", name: "AlipahDaksin", phone: "08131687777" },
  { initials: "C", name: "Cacacute", phone: "08131687777" },
]

export default function FanReferral() {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const referralCode = "Ashila0608_x"

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-[#E8E8E8] px-5 pt-12 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="22" height="25" viewBox="0 0 60 69" fill="none">
            <path d="M10 8 L10 61" stroke="#3D5898" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 34 L48 10" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 34 L48 60" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[#3D5898] font-extrabold text-xl">More</span>
        </div>
        <button className="w-10 h-10 rounded-full border-2 border-[#C8D0E8] flex items-center justify-center">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#3D5898" strokeWidth="2" strokeLinecap="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#3D5898" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>

      <div className="flex-1 px-5 pb-28 overflow-y-auto">
        {/* Hero */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-[#1E2D5A] font-extrabold text-2xl leading-tight mb-2">
              Invite Your<br />Katsera Friends<br />and Earn
            </h1>
            <p className="text-[#3D5898] font-extrabold text-3xl mb-2">IDR 300.000</p>
            <div className="flex gap-3">
              <button className="text-[#7A8BB5] text-sm font-bold underline">How it Works</button>
              <button className="text-[#7A8BB5] text-sm font-bold underline">FAQ</button>
            </div>
          </div>
          {/* Gift illustration */}
          <div className="relative w-24 h-24 flex-none">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center shadow-lg">
              <span className="text-4xl">🎁</span>
            </div>
            <div className="absolute -top-2 -right-1 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shadow">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </div>
          </div>
        </div>

        {/* Stats card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#7A8BB5] font-semibold">Total Reward</p>
            <p className="font-extrabold text-[#1E2D5A] text-lg">IDR 50.000</p>
          </div>
          <div className="w-px h-10 bg-[#E8E8E8]" />
          <div className="flex items-center gap-2">
            <div>
              <p className="text-xs text-[#7A8BB5] font-semibold">Friends Referred</p>
              <p className="font-extrabold text-[#1E2D5A] text-lg">5</p>
            </div>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" stroke="#3D5898" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
        </div>

        {/* Referral code */}
        <div className="flex gap-2 mb-6">
          <div className="flex-1 bg-white rounded-xl px-4 py-3 text-[#3D5898] font-bold text-sm flex items-center shadow-sm">
            {referralCode}
          </div>
          <button onClick={handleCopy} className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-all ${copied ? "bg-green-500" : "bg-white"}`}>
            {copied ? (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
            ) : (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" stroke="#3D5898" strokeWidth="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="#3D5898" strokeWidth="2" strokeLinecap="round"/></svg>
            )}
          </button>
          <button className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#3D5898" strokeWidth="2"/></svg>
          </button>
          <button className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3" stroke="#3D5898" strokeWidth="2"/><circle cx="6" cy="12" r="3" stroke="#3D5898" strokeWidth="2"/><circle cx="18" cy="19" r="3" stroke="#3D5898" strokeWidth="2"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="#3D5898" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Invite friends list */}
        <p className="font-extrabold text-[#1E2D5A] text-base mb-3">Invite Friends</p>
        <div className="space-y-3">
          {contacts.map((c) => (
            <div key={c.name} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#3D5898] flex items-center justify-center flex-none">
                <span className="text-white font-extrabold text-sm">{c.initials}</span>
              </div>
              <div className="flex-1">
                <p className="font-bold text-[#1E2D5A] text-sm">{c.name}</p>
                <p className="text-[#7A8BB5] text-xs">{c.phone}</p>
              </div>
              <button className="px-5 py-2 rounded-full bg-[#3D5898] text-white font-bold text-xs active:scale-95 transition-all">
                Invite
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pb-4">
        <div className="bg-white rounded-full flex shadow-lg border border-[#E8E8E8]">
          {[
            { key: "home", label: "Home", path: "/fan/home" },
            { key: "shop", label: "Shop", path: "/fan/shop" },
            { key: "channel", label: "Channel", path: "/fan/dm" },
            { key: "more", label: "More", path: "/fan/more", active: true },
          ].map((t) => (
            <button key={t.key} onClick={() => navigate(t.path)} className={`flex-1 flex flex-col items-center py-3 gap-0.5 ${t.active ? "text-[#3D5898]" : "text-[#C8D0E8]"}`}>
              <div className="w-5 h-5 rounded bg-current opacity-40" />
              <span className="text-[10px] font-bold">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
