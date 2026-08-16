import { useState } from "react"
import { useNavigate } from "react-router-dom"

const updateNotifs = [
  {
    id: 1,
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" stroke="white" strokeWidth="1.8"/><path d="M8 21h8M12 17v4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/><path d="M2 9h20" stroke="white" strokeWidth="1.8"/><circle cx="7" cy="13" r="1" fill="white"/></svg>,
    title: "Ticket System",
    body: "[TIKET] Konser Semua Aku Dirayakan sold 50 copies in 1 hour!",
    unread: true,
  },
  {
    id: 2,
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" stroke="white" strokeWidth="1.8"/><circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.8"/><path d="M2 12h3M19 12h3" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    title: "Katsera Finance",
    body: "February royalties have been successfully credited to your balance.",
    unread: true,
  },
  {
    id: 3,
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 10a3 3 0 0 0 6 0" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    title: "Merch Store",
    body: "T-SHIRT [Ringer Tees] - Merch Album is officially sold out!",
    unread: false,
  },
]

const interactionNotifs = [
  { id: 1, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop", badge: "❤️", name: "AlipahDaksin00", action: "liked your new song teaser.", unread: true },
  { id: 2, avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop", badge: "💬", name: "CornelBekasi", action: 'replied to your post: "Suaranya candu banget kak!"', unread: true },
  { id: 3, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop", badge: "🎁", name: "martin_go90", action: "sent a Gift during your Live.", unread: false },
  { id: 4, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop", badge: "💬", name: "ryujinbandung", action: 'left a comment: "Kapan main ke Bandung kak?"', unread: false },
  { id: 5, avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=60&h=60&fit=crop", badge: "❤️", name: "jennierubyjan333", action: "liked your post", unread: false },
]

type Tab = "all" | "updates" | "interactions"

const ArtistBottomNav = ({ active }: { active: string }) => {
  const navigate = useNavigate()
  const tabs = [
    { key: "home", path: "/artist/dashboard", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
    { key: "sales", path: "/artist/sales", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
    { key: "notifications", path: "/artist/notifications", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
    { key: "channel", path: "/artist/channel", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M9 14H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4l-4 4v-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
    { key: "more", path: "/artist/dashboard", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="19" cy="12" r="1.2" fill="currentColor"/></svg> },
  ]

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md">
      <div className="mx-4 mb-4 bg-white rounded-full flex shadow-lg border border-[#E8E8E8] px-2">
        {tabs.map((t) => {
          const isActive = t.key === active
          return (
            <button
              key={t.key}
              onClick={() => navigate(t.path)}
              className="flex-1 flex items-center justify-center py-3"
            >
              {isActive ? (
                <div className="w-10 h-10 rounded-full bg-[#3D5898] flex items-center justify-center text-white">
                  {t.icon}
                </div>
              ) : (
                <span className="text-[#C8D0E8]">{t.icon}</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function ArtistNotifications() {
  const [tab, setTab] = useState<Tab>("updates")

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Logo */}
      <div className="flex justify-center pt-12 pb-2">
        <svg width="28" height="32" viewBox="0 0 60 69" fill="none">
          <path d="M10 8 L10 61" stroke="#3D5898" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 34 L48 10" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 34 L48 60" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Avatar + title */}
      <div className="flex items-center gap-3 px-5 pb-5">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-none">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" alt="" className="w-full h-full object-cover" />
        </div>
        <h1 className="font-extrabold text-[#1E2D5A] text-2xl">Notifications</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-5 mb-5">
        {(["all", "updates", "interactions"] as Tab[]).map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-5 py-2 rounded-full text-xs font-extrabold tracking-wide transition-all uppercase ${tab === key ? "bg-[#1E2D5A] text-white" : "border-2 border-[#C8D0E8] text-[#7A8BB5]"}`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 px-5 space-y-3 overflow-y-auto pb-28">
        {/* Update cards */}
        {tab !== "interactions" && updateNotifs.map((n) => (
          <div key={n.id} className="bg-white rounded-2xl p-4 flex gap-3 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#1E2D5A] flex items-center justify-center flex-none">
              {n.icon}
            </div>
            <div className="flex-1">
              <p className="font-extrabold text-[#1E2D5A] text-sm">{n.title}</p>
              <p className="text-xs text-[#7A8BB5] leading-relaxed mt-0.5">{n.body}</p>
            </div>
          </div>
        ))}

        {/* Interaction items */}
        {tab !== "updates" && interactionNotifs.map((n) => (
          <div key={n.id} className="bg-white rounded-2xl p-4 flex gap-3 shadow-sm items-center">
            <div className="relative flex-none">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={n.avatar} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="absolute -bottom-1 -right-1 text-sm leading-none">{n.badge}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#1E2D5A] leading-snug">
                <span className="font-extrabold">{n.name} </span>
                <span className="text-[#7A8BB5]">{n.action}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <ArtistBottomNav active="notifications" />
    </div>
  )
}
