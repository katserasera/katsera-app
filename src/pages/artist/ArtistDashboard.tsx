import { useState } from "react"
import { useNavigate } from "react-router-dom"

// ── Icons ────────────────────────────────────────────────────────────────────
function NavIcon({ type, active }: { type: string; active: boolean }) {
  const c = active ? "#3D5898" : "#9BAACE"
  const f = active ? "#3D5898" : "none"
  if (type === "home") return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={f} stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
  if (type === "sales") return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
  if (type === "notif") return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={f} stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
  if (type === "learn") return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
  if (type === "more") return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="1" fill={c} /><circle cx="12" cy="12" r="1" fill={c} /><circle cx="12" cy="19" r="1" fill={c} />
    </svg>
  )
  return null
}

// ── Home Tab ─────────────────────────────────────────────────────────────────
function HomeTab() {
  const navigate = useNavigate()
  const [showSearch, setShowSearch] = useState(false)
  const [searchQ, setSearchQ] = useState("")
  return (
    <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
      {/* Profile card */}
      <div className="bg-[#3D5898] rounded-2xl p-5 mb-5 flex items-center gap-4 relative overflow-hidden">
        <div
          className="absolute right-0 top-0 bottom-0 w-32 opacity-20"
          style={{ background: "radial-gradient(circle at 80% 50%, white 0%, transparent 70%)" }}
        />
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format"
          alt="Artist"
          className="w-16 h-16 rounded-full object-cover border-3 border-white flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-white font-extrabold text-lg">Nadin Amizah</p>
          <p className="text-white/70 text-sm">Singer · Songwriter</p>
          <div className="flex gap-4 mt-2">
            {[{ v: "4.2M", l: "Followers" }, { v: "64", l: "Works" }].map(({ v, l }) => (
              <div key={l}>
                <p className="text-white font-extrabold text-sm">{v}</p>
                <p className="text-white/60 text-xs">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#FFD700] text-[#1E2D5A] text-xs font-bold px-2 py-0.5 rounded-full self-start">
          Verified
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {[
          { icon: "🔴", label: "Go Live", path: "/artist/live/setup" },
          { icon: "📤", label: "Upload", path: "/artist/upload" },
          { icon: "📢", label: "Notice", path: "/artist/profile" },
          { icon: "🛍️", label: "Shop", path: "/artist/redeem" },
        ].map(({ icon, label, path }) => (
          <button key={label} onClick={() => navigate(path)} className="bg-white rounded-2xl py-3 flex flex-col items-center gap-1.5 shadow-sm hover:shadow active:scale-95 transition-all">
            <span className="text-2xl">{icon}</span>
            <span className="text-[#1E2D5A] text-xs font-bold">{label}</span>
          </button>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { value: "48.3K", label: "Views this week", trend: "+12%" },
          { value: "2,841", label: "New followers", trend: "+8%" },
          { value: "Rp 3.2M", label: "Revenue", trend: "+21%" },
        ].map(({ value, label, trend }) => (
          <div key={label} className="bg-white rounded-2xl p-3 shadow-sm">
            <p className="text-[#1E2D5A] font-extrabold text-base">{value}</p>
            <p className="text-[#9BAACE] text-xs mt-0.5 leading-tight">{label}</p>
            <p className="text-green-500 text-xs font-bold mt-1">{trend}</p>
          </div>
        ))}
      </div>

      {/* Recent fan activity */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-[#1E2D5A] font-extrabold text-base">Recent Activity</p>
        <button onClick={() => navigate("/artist/activity")} className="text-[#3D5898] text-sm font-semibold active:opacity-60">See all</button>
      </div>
      <div className="space-y-3">
        {[
          { action: "liked your post", name: "Martin C.", time: "2m ago", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&auto=format" },
          { action: "started following you", name: "Sari W.", time: "15m ago", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format" },
          { action: "commented: \"Amazing performance!\"", name: "Budi S.", time: "1h ago", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format" },
          { action: "purchased Tour Tee", name: "Rina P.", time: "3h ago", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&auto=format" },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-2xl flex items-center gap-3 p-3 shadow-sm">
            <img src={item.img} alt={item.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[#1E2D5A] text-sm font-bold truncate">{item.name}</p>
              <p className="text-[#9BAACE] text-xs truncate">{item.action}</p>
            </div>
            <p className="text-[#9BAACE] text-xs flex-shrink-0">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Sales Hub Tab ─────────────────────────────────────────────────────────────
function SalesTab() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
  const values = [1.2, 2.1, 1.8, 3.4, 2.8, 4.1, 3.8]
  const max = Math.max(...values)

  return (
    <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
      {/* Revenue card */}
      <div className="bg-[#3D5898] rounded-2xl p-5 mb-5 text-white">
        <p className="text-white/70 text-sm font-medium mb-1">Total Revenue</p>
        <p className="text-4xl font-extrabold mb-0.5">Rp 24.6M</p>
        <p className="text-white/60 text-xs">This month · <span className="text-green-300">↑ 21% vs last month</span></p>

        {/* Mini bar chart */}
        <div className="flex items-end gap-1.5 mt-5 h-16">
          {values.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-lg"
                style={{
                  height: `${(v / max) * 52}px`,
                  background: i === values.length - 1 ? "white" : "rgba(255,255,255,0.35)",
                }}
              />
              <span className="text-white/50 text-[9px]">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue breakdown */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: "Merch Sales", value: "Rp 8.4M", icon: "🛍️", sub: "48 orders" },
          { label: "Tickets", value: "Rp 12.1M", icon: "🎟️", sub: "203 sold" },
          { label: "Subscriptions", value: "Rp 3.2M", icon: "⭐", sub: "641 fans" },
          { label: "Live Tips", value: "Rp 0.9M", icon: "💝", sub: "Last stream" },
        ].map(({ label, value, icon, sub }) => (
          <div key={label} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{icon}</span>
              <p className="text-[#9BAACE] text-xs font-medium">{label}</p>
            </div>
            <p className="text-[#1E2D5A] font-extrabold text-base">{value}</p>
            <p className="text-[#9BAACE] text-xs mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Recent transactions */}
      <p className="text-[#1E2D5A] font-extrabold text-base mb-3">Recent Transactions</p>
      <div className="space-y-2">
        {[
          { label: "Tour Tee — Martin C.", amount: "+Rp 185.000", time: "2h ago", type: "merch" },
          { label: "Monthly Sub — Rina P.", amount: "+Rp 50.000", time: "5h ago", type: "sub" },
          { label: "Concert Ticket × 2", amount: "+Rp 600.000", time: "1d ago", type: "ticket" },
          { label: "Photo Book — Sari W.", amount: "+Rp 450.000", time: "2d ago", type: "merch" },
        ].map((tx, i) => (
          <div key={i} className="bg-white rounded-xl flex items-center gap-3 px-4 py-3 shadow-sm">
            <div className="w-9 h-9 rounded-full bg-[#F0F2FA] flex items-center justify-center flex-shrink-0">
              <span className="text-base">{tx.type === "merch" ? "🛍️" : tx.type === "sub" ? "⭐" : "🎟️"}</span>
            </div>
            <p className="text-[#1E2D5A] text-sm font-semibold flex-1 truncate">{tx.label}</p>
            <div className="text-right flex-shrink-0">
              <p className="text-green-500 font-bold text-sm">{tx.amount}</p>
              <p className="text-[#9BAACE] text-xs">{tx.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Notifications Tab ─────────────────────────────────────────────────────────
function NotificationsTab({ markRead, onMarkRead }: { markRead: boolean; onMarkRead: () => void }) {
  const notifications = [
    { icon: "❤️", text: "2,841 fans liked your latest post \"Behind the scenes\"", time: "Just now", unread: true },
    { icon: "💬", text: "Budi S. commented: \"Your voice is incredible, can't wait for the tour!\"", time: "5m ago", unread: true },
    { icon: "👥", text: "348 new fans followed you this week. Keep up the great content!", time: "1h ago", unread: true },
    { icon: "🛍️", text: "Your Tour Tee 2025 has 48 new orders. Check Sales Hub.", time: "3h ago", unread: false },
    { icon: "📣", text: "Katsera Team: Your live stream last night reached 12,400 viewers!", time: "1d ago", unread: false },
    { icon: "⭐", text: "You have 641 active fan subscriptions this month.", time: "2d ago", unread: false },
    { icon: "🎵", text: "Your post \"New single dropping this Friday\" is trending in Indonesia.", time: "3d ago", unread: false },
  ]

  return (
    <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[#1E2D5A] font-extrabold text-base">All Notifications</p>
        <button onClick={onMarkRead} className={`text-sm font-semibold transition-colors ${markRead ? "text-green-500" : "text-[#3D5898]"}`}>{markRead ? "✓ All read" : "Mark all read"}</button>
      </div>
      <div className="space-y-2">
        {notifications.map((n, i) => (
          <div
            key={i}
            className={`rounded-2xl flex items-start gap-3 px-4 py-4 shadow-sm transition-colors ${
              n.unread && !markRead ? "bg-[#EEF1FA] border border-[#C8D0E8]" : "bg-white"
            }`}
          >
            <span className="text-2xl flex-shrink-0 mt-0.5">{n.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[#1E2D5A] text-sm font-medium leading-relaxed">{n.text}</p>
              <p className="text-[#9BAACE] text-xs mt-1">{n.time}</p>
            </div>
            {n.unread && !markRead && (
              <div className="w-2.5 h-2.5 rounded-full bg-[#3D5898] flex-shrink-0 mt-1.5" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Learn & Channel Tab ───────────────────────────────────────────────────────
function LearnTab() {
  const navigate = useNavigate()
  const courses = [
    { title: "How to Grow Your Fan Base", category: "Growth", duration: "12 min", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&auto=format" },
    { title: "Monetize Your Art on Katsera", category: "Revenue", duration: "18 min", img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=250&fit=crop&auto=format" },
    { title: "Live Streaming Best Practices", category: "Channel", duration: "10 min", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop&auto=format" },
  ]

  return (
    <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
      {/* Channel section */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-[#1E2D5A] font-extrabold text-base">My Channel</p>
        <button onClick={() => navigate("/artist/live/setup")} className="text-sm font-bold text-white bg-red-500 px-3 py-1 rounded-full flex items-center gap-1.5 active:scale-95 transition-transform">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="white"><circle cx="5" cy="5" r="5" /></svg>
          Go Live
        </button>
      </div>

      <button onClick={() => navigate("/artist/studio")} className="w-full bg-[#3D5898] rounded-2xl p-4 mb-6 flex items-center justify-between active:scale-[0.98] transition-transform">
        <div>
          <p className="text-white font-extrabold text-base">Studio Ready</p>
          <p className="text-white/70 text-sm">12,400 viewers last stream</p>
          <p className="text-white/60 text-xs mt-1">Next scheduled: Sat 8pm WIB</p>
        </div>
        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
        </div>
      </button>

      {/* Learn */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-[#1E2D5A] font-extrabold text-base">Artist Resources</p>
        <button onClick={() => navigate("/artist/academy")} className="text-xs text-[#3D5898] font-bold">Katsera Academy →</button>
      </div>
      <div className="space-y-3">
        {courses.map((c) => (
          <button key={c.title} onClick={() => navigate("/artist/academy")} className="bg-white rounded-2xl overflow-hidden shadow-sm flex w-full cursor-pointer active:scale-95 transition-transform text-left">
            <div className="w-24 h-20 bg-[#E0E5F2] flex-shrink-0">
              <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-3 flex flex-col justify-center">
              <span className="text-[#3D5898] text-xs font-bold mb-0.5">{c.category}</span>
              <p className="text-[#1E2D5A] text-sm font-bold leading-tight">{c.title}</p>
              <p className="text-[#9BAACE] text-xs mt-0.5">{c.duration} read</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── More Tab ──────────────────────────────────────────────────────────────────
function MoreTab() {
  const navigate = useNavigate()
  const items = [
    { icon: "👤", label: "My Profile", path: "/artist/profile" },
    { icon: "🎨", label: "My Works", path: "/artist/upload-works" },
    { icon: "📅", label: "Schedule Events", path: "/artist/live/setup" },
    { icon: "💳", label: "Payout / Redeem", path: "/artist/redeem" },
    { icon: "🛡", label: "AI Moderation", path: "/artist/ai" },
    { icon: "🔔", label: "Notification Preferences", path: "/artist/settings/notifications" },
    { icon: "⚙️", label: "Settings", path: "/artist/settings/security" },
    { icon: "❓", label: "Help & Support", path: "/artist/help" },
  ]

  return (
    <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
      <div className="bg-[#3D5898] rounded-2xl p-5 flex items-center gap-4 mb-5">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format"
          alt="Artist"
          className="w-16 h-16 rounded-full object-cover border-2 border-white/40"
        />
        <div>
          <p className="text-white font-extrabold text-lg">Nadin Amizah</p>
          <p className="text-white/70 text-sm">Singer · Songwriter</p>
          <span className="bg-[#FFD700] text-[#1E2D5A] text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block">
            ✓ Verified Artist
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm divide-y divide-[#F0F2F8] mb-4">
        {items.map((item) => (
          <button key={item.label} onClick={() => navigate(item.path)} className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#F4F5F9] transition-colors text-left active:bg-[#E8E8E8]">
            <span className="text-xl">{item.icon}</span>
            <span className="text-[#1E2D5A] font-semibold text-sm flex-1">{item.label}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9BAACE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        ))}
      </div>

      <button
        onClick={() => navigate("/role")}
        className="w-full py-3.5 rounded-2xl border-2 border-red-200 text-red-500 font-bold text-sm hover:bg-red-50 active:scale-95 transition-all"
      >
        Log out
      </button>
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
const TABS = [
  { key: "home", label: "Home" },
  { key: "sales", label: "Sales Hub" },
  { key: "notif", label: "Notifications" },
  { key: "learn", label: "Learn" },
  { key: "more", label: "More" },
] as const

type TabKey = typeof TABS[number]["key"]

export default function ArtistDashboard() {
  const [tab, setTab] = useState<TabKey>("home")
  const [showSearch, setShowSearch] = useState(false)
  const [searchQ, setSearchQ] = useState("")
  const [markRead, setMarkRead] = useState(false)

  return (
    <div className="h-screen bg-[#F4F5F9] flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Top bar */}
      <div className="bg-white px-5 pt-5 pb-4 flex items-center justify-between flex-shrink-0 border-b border-[#F0F2F8]">
        <div className="flex items-center gap-2">
          <svg width="28" height="32" viewBox="0 0 60 69" fill="none">
            <path d="M10 8 L10 61" stroke="#3D5898" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 34 L48 10" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 34 L48 60" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[#3D5898] font-extrabold text-lg">Katsera</span>
          <span className="text-xs bg-[#FFD700] text-[#1E2D5A] px-2 py-0.5 rounded-full font-bold ml-1">Artist</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowSearch(true)} className="w-9 h-9 rounded-full bg-[#F4F5F9] flex items-center justify-center active:scale-95 transition-transform">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D5898" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
          <button onClick={() => setTab("notif")} className="w-9 h-9 rounded-full bg-[#F4F5F9] flex items-center justify-center relative active:scale-95 transition-transform">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D5898" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {!markRead && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />}
          </button>
        </div>
      </div>

      {/* Search overlay */}
      {showSearch && (
        <div className="absolute inset-0 bg-white z-50 flex flex-col">
          <div className="flex items-center gap-3 px-4 pt-12 pb-3 border-b border-[#F0F2F8]">
            <div className="flex-1 bg-[#F4F5F9] rounded-full flex items-center gap-3 px-4 py-2.5">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="#9BAACE" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="#9BAACE" strokeWidth="2" strokeLinecap="round"/></svg>
              <input autoFocus value={searchQ} onChange={(e) => setSearchQ(e.target.value)} placeholder="Search fans, songs, posts…" className="flex-1 bg-transparent text-[#1E2D5A] text-sm font-semibold outline-none placeholder:text-[#C8D0E8]" />
            </div>
            <button onClick={() => { setShowSearch(false); setSearchQ("") }} className="text-[#3D5898] font-bold text-sm">Cancel</button>
          </div>
          {searchQ ? (
            <div className="flex-1 px-4 pt-4 space-y-3">
              {["Fans", "Posts", "Songs"].map((cat) => (
                <div key={cat}>
                  <p className="text-xs font-extrabold text-[#9BAACE] uppercase tracking-widest mb-2">{cat}</p>
                  <div className="bg-[#F4F5F9] rounded-2xl p-4 text-center text-sm text-[#9BAACE] font-semibold">No {cat.toLowerCase()} matching "{searchQ}"</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-[#C8D0E8]">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <p className="text-sm font-semibold">Search for fans, content, or revenue</p>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {tab === "home"  && <HomeTab />}
        {tab === "sales" && <SalesTab />}
        {tab === "notif" && <NotificationsTab markRead={markRead} onMarkRead={() => setMarkRead(true)} />}
        {tab === "learn" && <LearnTab />}
        {tab === "more"  && <MoreTab />}
      </div>

      {/* Bottom nav */}
      <div className="bg-white border-t border-[#F0F2F8] flex items-center px-1 py-2 flex-shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        {TABS.map(({ key, label }) => {
          const active = tab === key
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="flex-1 flex flex-col items-center gap-1 py-1 active:scale-95 transition-transform"
            >
              <NavIcon type={key} active={active} />
              <span className={`text-[10px] font-bold leading-tight text-center ${active ? "text-[#3D5898]" : "text-[#9BAACE]"}`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
