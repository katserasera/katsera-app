import { useNavigate } from "react-router-dom"

const channels = [
  { id: 1, name: "Nadin's Space", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop", lastMsg: "Terima kasih banyak dukungannya", time: "10 hrs ago", unread: 0 },
  { id: 2, name: "Indonesia Theater", avatar: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=80&h=80&fit=crop", lastMsg: "Jangan lupa nonton ya!", time: "25 mnt ago", unread: 2 },
  { id: 3, name: "Erikaaa di sinii >_<", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop", lastMsg: "Tebak aku mau lukis di manaa??", time: "2 hrs ago", unread: 1 },
  { id: 4, name: "Weknowlah", avatar: "https://images.unsplash.com/photo-1501386761578-eaa54b08e8d1?w=80&h=80&fit=crop", lastMsg: "Cek vt terbarukuuu", time: "5 mnt ago", unread: 0 },
  { id: 5, name: "Reality Club", avatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop", lastMsg: "THANK YOU BANDUNG", time: "1 hrs ago", unread: 3 },
]

export default function FanDMChannels() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center justify-between border-b border-[#F4F5F9]">
        <div className="flex items-center gap-2">
          <svg width="22" height="25" viewBox="0 0 60 69" fill="none">
            <path d="M10 8 L10 61" stroke="#3D5898" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 34 L48 10" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 34 L48 60" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[#1E2D5A] font-extrabold text-xl">Channels</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/fan/more")} className="w-9 h-9 rounded-full bg-[#F4F5F9] flex items-center justify-center active:scale-95 transition-transform">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#3D5898" strokeWidth="2" strokeLinecap="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#3D5898" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#C8D0E8]">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Channel list */}
      <div className="flex-1 overflow-y-auto pb-28">
        <div className="bg-white mx-4 mt-4 rounded-2xl shadow-sm overflow-hidden">
          {channels.map((ch, i) => (
            <button
              key={ch.id}
              onClick={() => navigate(`/fan/dm/${ch.id}`)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-[#F4F5F9] transition-colors ${i < channels.length - 1 ? "border-b border-[#F4F5F9]" : ""}`}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden flex-none">
                <img src={ch.avatar} alt={ch.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="font-extrabold text-[#1E2D5A] text-sm truncate">{ch.name}</p>
                  <p className="text-xs text-[#7A8BB5] flex-none ml-2">{ch.time}</p>
                </div>
                <p className="text-xs text-[#7A8BB5] truncate">{ch.lastMsg}</p>
              </div>
              {ch.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-[#3D5898] flex items-center justify-center flex-none">
                  <span className="text-white text-[10px] font-bold">{ch.unread}</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Search another channel */}
        <button
          onClick={() => navigate("/fan/channel")}
          className="mx-4 mt-3 w-[calc(100%-32px)] bg-white rounded-2xl shadow-sm px-4 py-3.5 flex items-center gap-3 text-left hover:bg-[#F4F5F9] transition-colors active:scale-[0.98]"
        >
          <div className="w-8 h-8 rounded-full border-2 border-[#C8D0E8] flex items-center justify-center flex-none">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="#7A8BB5" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </div>
          <span className="text-[#7A8BB5] font-semibold text-sm">Search another channel</span>
        </button>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pb-4">
        <div className="bg-white rounded-full flex shadow-lg border border-[#E8E8E8]">
          {[
            { key: "home", label: "Home", path: "/fan/home", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg> },
            { key: "shop", label: "Shop", path: "/fan/shop", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
            { key: "channel", label: "Channel", path: "/fan/dm", active: true, icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg> },
            { key: "more", label: "More", path: "/fan/more", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/><circle cx="5" cy="12" r="1" fill="currentColor"/></svg> },
          ].map((t) => (
            <button key={t.key} onClick={() => navigate(t.path)} className={`flex-1 flex flex-col items-center py-3 gap-0.5 ${t.active ? "text-[#3D5898]" : "text-[#C8D0E8]"}`}>
              {t.icon}
              <span className="text-[10px] font-bold">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
