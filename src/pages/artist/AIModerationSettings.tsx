import { useNavigate } from "react-router-dom"

export default function AIModerationSettings() {
  const navigate = useNavigate()

  const menuItems = [
    { label: "Blocked Accounts", path: "/artist/ai/blocked" },
    { label: "Muted Accounts", path: "/artist/ai/muted" },
    { label: "Filtered Words", path: "/artist/ai/filtered-words" },
    { label: "Quiet Notifications", path: "/artist/ai/quiet" },
  ]

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-[#E8E8E8] px-4 pt-12 pb-4">
        <div className="flex items-center gap-2 text-sm text-[#7A8BB5] font-semibold mb-1">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 hover:text-[#3D5898]">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            SETTINGS
          </button>
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          <span className="text-[#1E2D5A]">Block & Filtered</span>
        </div>
      </div>

      <div className="px-4">
        <p className="text-[#7A8BB5] text-sm mb-4">Manage accounts, words, and notifications you've filtered or blocked.</p>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#F4F5F9] transition-colors ${i < menuItems.length - 1 ? "border-b border-[#F4F5F9]" : ""}`}
            >
              <span className="text-[#1E2D5A] font-semibold text-sm">{item.label}</span>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" stroke="#3D5898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          ))}
        </div>

        {/* AI Intelligence card */}
        <div className="mt-5 bg-gradient-to-r from-[#3D5898] to-[#2D4270] rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.2"/>
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-extrabold text-sm">AI Moderation Active</p>
              <p className="text-white/70 text-xs">Real-time protection enabled</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[["247", "Comments Filtered"], ["12", "Spam Blocked"], ["3", "Accounts Muted"]].map(([val, label]) => (
              <div key={label} className="bg-white/10 rounded-xl p-2 text-center">
                <p className="text-white font-extrabold text-lg">{val}</p>
                <p className="text-white/60 text-[10px] leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Artist bottom nav */}
      <ArtistBottomNav active="more" />
    </div>
  )
}

function ArtistBottomNav({ active }: { active: string }) {
  const navigate = useNavigate()
  const tabs = [
    { key: "home", label: "Home", path: "/artist/dashboard", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg> },
    { key: "sales", label: "Sales Hub", path: "/artist/dashboard", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M8 12h8M8 8h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
    { key: "notif", label: "Alerts", path: "/artist/dashboard", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
    { key: "learn", label: "Learn", path: "/artist/academy", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg> },
    { key: "more", label: "More", path: "/artist/dashboard", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/><circle cx="5" cy="12" r="1" fill="currentColor"/></svg> },
  ]
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md">
      <div className="mx-4 mb-4 bg-white rounded-full flex shadow-lg border border-[#E8E8E8]">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => navigate(t.path)} className={`flex-1 flex flex-col items-center py-3 gap-0.5 ${active === t.key ? "text-[#3D5898]" : "text-[#C8D0E8]"}`}>
            {t.icon}
            <span className="text-[9px] font-bold">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
