import { useState } from "react"
import { useNavigate } from "react-router-dom"

const joinedChannels = [
  { id: 1, name: "Nadin Amizah", handle: "@nadinamizah", avatar: "🎤", members: "84k", live: true, lastPost: "2 jam lalu" },
  { id: 2, name: "Bernadya", handle: "@bernadya", avatar: "🎵", members: "56k", live: false, lastPost: "5 jam lalu" },
  { id: 4, name: "Ari Irham", handle: "@ariirham", avatar: "🎬", members: "32k", live: false, lastPost: "1 hari lalu" },
]

const discoverChannels = [
  { id: 5, name: "Tiara Andini", handle: "@tiaraandini", avatar: "⭐", members: "120k", genre: "Pop" },
  { id: 6, name: "Raisa", handle: "@raisa6690", avatar: "🌹", members: "98k", genre: "Pop R&B" },
  { id: 7, name: "Tulus", handle: "@tulus", avatar: "🎹", members: "75k", genre: "Soul" },
]

export default function ChannelHome() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [notJoinedView, setNotJoinedView] = useState(false)
  const [joinedIds, setJoinedIds] = useState<number[]>([1, 2, 4])

  const filteredDiscover = discoverChannels.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (notJoinedView) {
    return (
      <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
        <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm flex items-center gap-3">
          <button onClick={() => setNotJoinedView(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-[#1E2D5A] font-extrabold text-lg">Cari Channel</span>
        </div>
        <div className="px-4 py-4 space-y-4 overflow-y-auto pb-24">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="#7A8BB5" strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke="#7A8BB5" strokeWidth="2" strokeLinecap="round"/></svg>
            <input
              className="w-full bg-white rounded-full pl-9 pr-4 py-3 text-sm text-[#1E2D5A] placeholder:text-[#7A8BB5] outline-none border border-[#C8D0E8]"
              placeholder="Cari nama artis atau channel…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>

          {filteredDiscover.length > 0 && (
            <div className="space-y-3">
              {filteredDiscover.map((ch) => (
                <div key={ch.id} className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3D5898]/20 to-[#3D5898]/10 flex items-center justify-center text-2xl flex-none">
                    {ch.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[#1E2D5A] text-sm">{ch.name}</p>
                    <p className="text-xs text-[#7A8BB5]">{ch.handle} · {ch.members} members</p>
                    <span className="text-[10px] bg-[#3D5898]/10 text-[#3D5898] rounded-full px-2 py-0.5 font-bold">{ch.genre}</span>
                  </div>
                  <button
                    onClick={() => {
                      setJoinedIds([...joinedIds, ch.id])
                      setTimeout(() => navigate(`/fan/channel/${ch.id}`), 400)
                    }}
                    className="px-4 py-1.5 rounded-full bg-[#3D5898] text-white font-bold text-xs active:scale-95 transition-all"
                  >
                    Join
                  </button>
                </div>
              ))}
            </div>
          )}

          {searchQuery && filteredDiscover.length === 0 && (
            <div className="text-center py-12 text-[#7A8BB5]">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-semibold">Channel tidak ditemukan</p>
              <p className="text-xs mt-1">Coba kata kunci yang berbeda</p>
            </div>
          )}
        </div>
        <BottomNav active="channel" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#1E2D5A] font-extrabold text-xl">Channel</span>
          <button onClick={() => setNotJoinedView(true)} className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F4F5F9]">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="#3D5898" strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke="#3D5898" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto pb-24">
        {/* Joined channels */}
        <div>
          <p className="text-xs font-bold text-[#7A8BB5] uppercase tracking-wide mb-3">Channel Saya</p>
          <div className="space-y-3">
            {joinedChannels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => navigate(`/fan/channel/${ch.id}`)}
                className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm active:scale-[0.98] transition-transform text-left"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3D5898]/20 to-[#3D5898]/10 flex items-center justify-center text-2xl flex-none">
                    {ch.avatar}
                  </div>
                  {ch.live && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-[6px] text-white font-bold">L</span>
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-[#1E2D5A] text-sm">{ch.name}</p>
                    {ch.live && <span className="text-[9px] bg-red-500 text-white rounded-full px-1.5 py-0.5 font-bold">LIVE</span>}
                  </div>
                  <p className="text-xs text-[#7A8BB5]">{ch.handle} · {ch.members} members</p>
                  <p className="text-xs text-[#7A8BB5] mt-0.5">Postingan terbaru: {ch.lastPost}</p>
                </div>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" stroke="#C8D0E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            ))}
          </div>
        </div>

        {/* Discover */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-[#7A8BB5] uppercase tracking-wide">Temukan Channel Baru</p>
            <button onClick={() => setNotJoinedView(true)} className="text-xs text-[#3D5898] font-bold">Lihat semua</button>
          </div>
          <div className="space-y-3">
            {discoverChannels.map((ch) => (
              <div key={ch.id} className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3D5898]/20 to-[#3D5898]/10 flex items-center justify-center text-2xl flex-none">
                  {ch.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[#1E2D5A] text-sm">{ch.name}</p>
                  <p className="text-xs text-[#7A8BB5]">{ch.members} members · {ch.genre}</p>
                </div>
                <button
                  onClick={() => {
                    setJoinedIds([...joinedIds, ch.id])
                    navigate(`/fan/channel/${ch.id}`)
                  }}
                  className="px-4 py-1.5 rounded-full border-2 border-[#3D5898] text-[#3D5898] font-bold text-xs active:scale-95 transition-all"
                >
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="channel" />
    </div>
  )
}

function BottomNav({ active }: { active: string }) {
  const navigate = useNavigate()
  const tabs = [
    { key: "home", label: "Home", path: "/fan/home", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg> },
    { key: "shop", label: "Shop", path: "/fan/shop", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
    { key: "channel", label: "Channel", path: "/fan/channel", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="15" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 3l-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { key: "more", label: "More", path: "/fan/home", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/><circle cx="5" cy="12" r="1" fill="currentColor"/></svg> },
  ]
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] flex">
      {tabs.map((t) => (
        <button key={t.key} onClick={() => navigate(t.path)} className={`flex-1 flex flex-col items-center py-2.5 gap-0.5 ${active === t.key ? "text-[#3D5898]" : "text-[#7A8BB5]"}`}>
          {t.icon}
          <span className="text-[10px] font-bold">{t.label}</span>
        </button>
      ))}
    </div>
  )
}
