import { useState } from "react"
import { useNavigate } from "react-router-dom"

type ActivityType = "like" | "comment" | "follow" | "purchase" | "membership" | "ticket"

interface Activity {
  id: number
  type: ActivityType
  user: string
  avatar: string
  message: string
  time: string
  amount?: number
  read: boolean
}

const ACTIVITIES: Activity[] = [
  { id: 1, type: "membership", user: "rina_music", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop", message: "subscribed to your Gold membership", time: "2m ago", amount: 299000, read: false },
  { id: 2, type: "ticket", user: "jakarta_fan_club", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop", message: "purchased 2 VIP tickets for Semua Aku Dirayakan", time: "5m ago", amount: 1500000, read: false },
  { id: 3, type: "like", user: "melody_addict99", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop", message: "liked your latest post", time: "12m ago", read: false },
  { id: 4, type: "comment", user: "katsera_superfan", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop", message: "commented: \"This song is everything 😭❤️\"", time: "25m ago", read: false },
  { id: 5, type: "follow", user: "artlover_id", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop", message: "started following you", time: "1h ago", read: true },
  { id: 6, type: "purchase", user: "music_fan_bdg", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop", message: "purchased World Tour Tee 2026 — Navy", time: "2h ago", amount: 185000, read: true },
  { id: 7, type: "like", user: "nadin_fan_01", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop", message: "liked your photo", time: "3h ago", read: true },
  { id: 8, type: "comment", user: "bandung_vibes", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=60&h=60&fit=crop", message: "commented: \"When is the next tour? Can't wait!\"", time: "5h ago", read: true },
  { id: 9, type: "ticket", user: "liveshow_fans", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop", message: "purchased Standing Gold ticket", time: "6h ago", amount: 750000, read: true },
  { id: 10, type: "membership", user: "superfan_id", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop", message: "upgraded to Platinum membership", time: "8h ago", amount: 599000, read: true },
]

const TYPE_CONFIG: Record<ActivityType, { icon: string; color: string; bg: string; label: string }> = {
  like: { icon: "❤️", color: "#EF4444", bg: "bg-red-50", label: "Like" },
  comment: { icon: "💬", color: "#3D5898", bg: "bg-blue-50", label: "Comment" },
  follow: { icon: "👥", color: "#22C55E", bg: "bg-green-50", label: "Follow" },
  purchase: { icon: "🛍️", color: "#F59E0B", bg: "bg-amber-50", label: "Purchase" },
  membership: { icon: "⭐", color: "#D4A017", bg: "bg-yellow-50", label: "Membership" },
  ticket: { icon: "🎫", color: "#7C3AED", bg: "bg-purple-50", label: "Ticket" },
}

const SUMMARY_STATS = [
  { label: "New Likes", value: "1.2K", icon: "❤️", trend: "+18%" },
  { label: "New Comments", value: "342", icon: "💬", trend: "+24%" },
  { label: "New Follows", value: "89", icon: "👥", trend: "+12%" },
  { label: "Revenue", value: "Rp 12.4M", icon: "💰", trend: "+31%" },
]

function fmt(n: number) { return "Rp" + n.toLocaleString("id-ID") }

export default function ActivityCenter() {
  const navigate = useNavigate()
  const [activities, setActivities] = useState(ACTIVITIES)
  const [filter, setFilter] = useState<"all" | ActivityType>("all")

  const unread = activities.filter((a) => !a.read).length

  const filtered = activities.filter((a) => filter === "all" || a.type === filter)

  function markAllRead() {
    setActivities((prev) => prev.map((a) => ({ ...a, read: true })))
  }

  function markRead(id: number) {
    setActivities((prev) => prev.map((a) => a.id === id ? { ...a, read: true } : a))
  }

  const typeFilters: Array<{ key: "all" | ActivityType; label: string }> = [
    { key: "all", label: "All" },
    { key: "membership", label: "Membership" },
    { key: "ticket", label: "Tickets" },
    { key: "purchase", label: "Orders" },
    { key: "like", label: "Likes" },
    { key: "comment", label: "Comments" },
    { key: "follow", label: "Follows" },
  ]

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="bg-white px-5 pt-12 pb-4 shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-[#F4F5F9] flex items-center justify-center active:scale-95 transition-transform">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </button>
          <div className="flex-1">
            <p className="text-[#1E2D5A] font-extrabold text-lg">Activity Center</p>
            {unread > 0 && <p className="text-[#9BAACE] text-xs">{unread} unread</p>}
          </div>
          {unread > 0 && (
            <button onClick={markAllRead} className="text-[#3D5898] text-xs font-bold active:scale-95">Mark all read</button>
          )}
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {typeFilters.map(({ key, label }) => (
            <button key={key} onClick={() => setFilter(key)} className={`flex-none px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${filter === key ? "bg-[#3D5898] text-white" : "bg-[#F4F5F9] text-[#7A8BB5]"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-8">
        {/* Summary stats */}
        <div className="px-4 pt-4 pb-2">
          <div className="grid grid-cols-2 gap-3">
            {SUMMARY_STATS.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-3.5 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg">{s.icon}</span>
                  <span className="text-green-600 text-[10px] font-bold bg-green-50 px-2 py-0.5 rounded-full">{s.trend}</span>
                </div>
                <p className="text-[#1E2D5A] font-extrabold text-base">{s.value}</p>
                <p className="text-[#9BAACE] text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue breakdown */}
        <div className="mx-4 mt-2 bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-[#1E2D5A] font-bold text-sm mb-3">Recent Revenue</p>
          {[
            { label: "Merchandise Sales", amount: 4850000, icon: "🛍️" },
            { label: "Ticket Sales", amount: 5250000, icon: "🎫" },
            { label: "Membership Sales", amount: 2340000, icon: "⭐" },
          ].map((r) => (
            <div key={r.label} className="flex items-center gap-3 py-2 border-b border-[#F4F5F9] last:border-0">
              <span className="text-base">{r.icon}</span>
              <p className="flex-1 text-[#7A8BB5] text-xs">{r.label}</p>
              <p className="text-[#1E2D5A] font-bold text-sm">{fmt(r.amount)}</p>
            </div>
          ))}
        </div>

        {/* Activity feed */}
        <div className="px-4 pt-4 space-y-2">
          <p className="text-[#1E2D5A] font-extrabold text-sm mb-2">Recent Activity</p>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-12 gap-3">
              <span className="text-4xl">🔔</span>
              <p className="text-[#1E2D5A] font-bold">No activity yet</p>
            </div>
          ) : filtered.map((a) => {
            const cfg = TYPE_CONFIG[a.type]
            return (
              <button
                key={a.id}
                onClick={() => markRead(a.id)}
                className={`w-full bg-white rounded-2xl p-4 shadow-sm flex items-start gap-3 text-left transition-all active:scale-[0.98] ${!a.read ? "border-l-4 border-[#3D5898]" : ""}`}
              >
                <div className="relative flex-none">
                  <img src={a.avatar} alt={a.user} className="w-11 h-11 rounded-full object-cover" />
                  <div className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full ${cfg.bg} flex items-center justify-center border border-white`}>
                    <span className="text-[9px]">{cfg.icon}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[#1E2D5A] text-sm flex-1 leading-snug">
                      <span className="font-bold">{a.user}</span> {a.message}
                    </p>
                    {!a.read && <div className="w-2 h-2 rounded-full bg-[#3D5898] flex-none mt-1.5" />}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-[#9BAACE] text-xs">{a.time}</p>
                    {a.amount && <p className="text-green-600 font-bold text-xs">+{fmt(a.amount)}</p>}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
