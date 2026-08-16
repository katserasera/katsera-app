import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const channelData: Record<string, { name: string; handle: string; avatar: string; members: string; bio: string; live: boolean; posts: { id: number; type: string; content: string; likes: number; time: string; pinned?: boolean }[] }> = {
  "1": {
    name: "Nadin Amizah",
    handle: "@nadinamizah",
    avatar: "🎤",
    members: "84k",
    bio: "Penulis lagu, penyanyi indie folk. Album terbaru: 'Semua Aku Tanyakan'",
    live: true,
    posts: [
      { id: 1, type: "announcement", content: "📢 Konser 'Semua Aku Dirayakan' — 22 Oktober 2026 di Gelora Bung Karno! Tiket sudah tersedia di K Shop.", likes: 2341, time: "2 jam lalu", pinned: true },
      { id: 2, type: "text", content: "Terimakasih sudah support album baru aku 🌙 Kalian luar biasa. Ada yang sudah dengar lagu favorit?", likes: 891, time: "1 hari lalu" },
      { id: 3, type: "media", content: "Behind the scenes recording session 'Tiara Era' 🎵 Sneak peek sebelum rilis!", likes: 1204, time: "3 hari lalu" },
      { id: 4, type: "text", content: "Meet & Greet setelah konser untuk 50 fans pertama yang beli tiket VIP 🌸", likes: 3102, time: "1 minggu lalu" },
    ],
  },
  "2": {
    name: "Bernadya",
    handle: "@bernadya",
    avatar: "🎵",
    members: "56k",
    bio: "Singer-songwriter. 'Satu Bulan' · 'Kau Baik'",
    live: false,
    posts: [
      { id: 1, type: "text", content: "Tour announcement coming soon! 👀 Stay tuned.", likes: 1500, time: "5 jam lalu", pinned: true },
      { id: 2, type: "media", content: "Sneak peek video klip terbaru — launching weekend ini!", likes: 780, time: "2 hari lalu" },
    ],
  },
  "4": {
    name: "Ari Irham",
    handle: "@ariirham",
    avatar: "🎬",
    members: "32k",
    bio: "Aktor & musisi. Film & musik kolaborasi.",
    live: false,
    posts: [
      { id: 1, type: "text", content: "Film baru bakal tayang bulan depan! Nantikan ya 🎬", likes: 620, time: "1 hari lalu" },
    ],
  },
  "5": {
    name: "Tiara Andini",
    handle: "@tiaraandini",
    avatar: "⭐",
    members: "120k",
    bio: "Pop singer. Album 'Tiara' available now!",
    live: false,
    posts: [
      { id: 1, type: "announcement", content: "Album 'Tiara' Deluxe version sudah tersedia di K Shop! Dapatkan eksklusif photobook + photocards.", likes: 4201, time: "1 jam lalu", pinned: true },
    ],
  },
}

export default function ExploreChannel() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"post" | "live" | "media">("post")
  const [liked, setLiked] = useState<number[]>([])

  const ch = channelData[id || "1"] || channelData["1"]

  const toggleLike = (postId: number) => {
    setLiked((prev) => prev.includes(postId) ? prev.filter((x) => x !== postId) : [...prev, postId])
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20 shadow-sm">
        <div className="px-4 pt-12 pb-0">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate("/fan/channel")} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            {/* Channel info */}
            <div className="flex items-center gap-3 flex-1">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3D5898]/20 to-[#3D5898]/10 flex items-center justify-center text-xl">
                  {ch.avatar}
                </div>
                {ch.live && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="font-extrabold text-[#1E2D5A] text-sm">{ch.name}</p>
                  {ch.live && <span className="text-[9px] bg-red-500 text-white rounded-full px-1.5 py-0.5 font-bold">LIVE</span>}
                </div>
                <p className="text-xs text-[#7A8BB5]">{ch.members} members</p>
              </div>
            </div>

            <button className="px-4 py-1.5 rounded-full border-2 border-[#3D5898] text-[#3D5898] font-bold text-xs">
              Following
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#E8E8E8]">
            {[["post", "Post"], ["live", "Live"], ["media", "Media"]].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as "post" | "live" | "media")}
                className={`flex-1 py-2.5 text-sm font-bold transition-all ${activeTab === key ? "text-[#3D5898] border-b-2 border-[#3D5898]" : "text-[#7A8BB5]"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto pb-24">
        {/* Bio */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-[#7A8BB5]">{ch.bio}</p>
        </div>

        {activeTab === "post" && (
          <div className="space-y-3">
            {ch.posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl p-4 shadow-sm">
                {post.pinned && (
                  <div className="flex items-center gap-1 text-[10px] text-[#7A8BB5] font-bold mb-2">
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#7A8BB5"/></svg>
                    PINNED
                  </div>
                )}
                <div className="flex items-start gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3D5898]/20 to-[#3D5898]/10 flex items-center justify-center text-base flex-none">
                    {ch.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-[#1E2D5A] text-sm">{ch.name}</p>
                    <p className="text-[10px] text-[#7A8BB5]">{post.time}</p>
                  </div>
                </div>
                {post.type === "media" && (
                  <div className="h-28 bg-gradient-to-br from-[#3D5898]/10 to-[#6B82BB]/10 rounded-xl flex items-center justify-center text-4xl mb-3">🎵</div>
                )}
                <p className="text-sm text-[#1E2D5A] leading-relaxed mb-3">{post.content}</p>
                <div className="flex items-center gap-4 pt-2 border-t border-[#F4F5F9]">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 text-sm font-semibold transition-all ${liked.includes(post.id) ? "text-red-500" : "text-[#7A8BB5]"}`}
                  >
                    <svg width="16" height="16" fill={liked.includes(post.id) ? "currentColor" : "none"} viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
                    {post.likes + (liked.includes(post.id) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm font-semibold text-[#7A8BB5]">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
                    Komentar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "live" && (
          <div className="text-center py-16">
            {ch.live ? (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="h-48 bg-gradient-to-br from-[#3D5898] to-[#1E2D5A] rounded-xl flex flex-col items-center justify-center gap-3 mb-4">
                  <span className="text-5xl">{ch.avatar}</span>
                  <span className="text-[10px] bg-red-500 text-white rounded-full px-3 py-1 font-bold">● LIVE NOW</span>
                </div>
                <p className="font-extrabold text-[#1E2D5A] text-base">{ch.name} sedang live!</p>
                <p className="text-xs text-[#7A8BB5] mb-4">Bergabung sekarang untuk menyaksikan secara langsung</p>
                <button className="w-full py-3 rounded-full bg-[#3D5898] text-white font-bold text-sm active:scale-95 transition-all">
                  Tonton Live
                </button>
              </div>
            ) : (
              <>
                <p className="text-4xl mb-3">📺</p>
                <p className="font-semibold text-[#1E2D5A]">Tidak ada live saat ini</p>
                <p className="text-xs text-[#7A8BB5] mt-1">Aktifkan notifikasi agar tidak ketinggalan</p>
              </>
            )}
          </div>
        )}

        {activeTab === "media" && (
          <div className="grid grid-cols-3 gap-1.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-[#3D5898]/10 to-[#6B82BB]/10 rounded-xl flex items-center justify-center text-2xl">
                {["🎵", "🎬", "📸", "🎤", "🌟", "💿", "🎹", "🎸", "🥁"][i]}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] flex">
        {[
          { key: "home", label: "Home", path: "/fan/home", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg> },
          { key: "shop", label: "Shop", path: "/fan/shop", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
          { key: "channel", label: "Channel", path: "/fan/channel", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="15" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 3l-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
          { key: "more", label: "More", path: "/fan/home", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/><circle cx="5" cy="12" r="1" fill="currentColor"/></svg> },
        ].map((t) => (
          <button key={t.key} onClick={() => navigate(t.path)} className={`flex-1 flex flex-col items-center py-2.5 gap-0.5 ${t.key === "channel" ? "text-[#3D5898]" : "text-[#7A8BB5]"}`}>
            {t.icon}
            <span className="text-[10px] font-bold">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
