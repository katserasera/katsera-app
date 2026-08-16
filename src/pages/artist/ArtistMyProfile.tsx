import { useState } from "react"
import { useNavigate } from "react-router-dom"

const songs = [
  { id: 1, title: "Rayuan Perempuan Gila", streams: "91.2M", duration: "4:21" },
  { id: 2, title: "Bertaut", streams: "120.4M", duration: "5:16" },
  { id: 3, title: "Sorai", streams: "85.1M", duration: "4:10" },
  { id: 4, title: "Taruh", streams: "42.8M", duration: "4:05" },
  { id: 5, title: "Kereta Ini Melaju Terlalu Cepat", streams: "29.6M", duration: "4:52" },
  { id: 6, title: "Paman Tua", streams: "18.4M", duration: "4:12" },
]

const posts = [
  { id: 1, img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop", likes: 4821, comments: 312 },
  { id: 2, img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", likes: 3102, comments: 198 },
  { id: 3, img: "https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=300&h=300&fit=crop", likes: 2841, comments: 155 },
  { id: 4, img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", likes: 1920, comments: 87 },
  { id: 5, img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", likes: 1430, comments: 63 },
  { id: 6, img: "https://images.unsplash.com/photo-1501386761578-eaa54b08e8d1?w=300&h=300&fit=crop", likes: 980, comments: 41 },
]

export default function ArtistMyProfile() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"post" | "songs" | "settings">("post")

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#3D5898] to-[#2D4270] pt-12 pb-0 relative">
        <div className="flex items-center gap-3 px-4 mb-4">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-white font-extrabold text-lg">My Profile</span>
        </div>

        {/* Profile info */}
        <div className="px-5 pb-5">
          <div className="flex items-end gap-4 mb-3">
            <div className="w-20 h-20 rounded-full border-3 border-white overflow-hidden shadow-lg flex-none">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 pb-1">
              <h1 className="text-white font-extrabold text-xl">Nadin Amizah</h1>
              <p className="text-white/70 text-xs">SINGER · SONG WRITER</p>
            </div>
          </div>

          <p className="text-white/70 text-xs leading-relaxed mb-4">
            musisi jati kecil. berharap bisa mengarungi semua hal yang harus kuarungi.
          </p>

          {/* Stats */}
          <div className="flex gap-6 mb-4">
            {[["125K", "Followers"], ["5", "Following"], ["24K", "Likes"]].map(([val, label]) => (
              <div key={label}>
                <p className="text-white font-extrabold text-base">{val}</p>
                <p className="text-white/60 text-xs">{label}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button onClick={() => navigate("/artist/profile/edit")} className="flex-1 py-2.5 rounded-full bg-[#3D5898] border border-white/30 text-white font-bold text-sm flex items-center justify-center gap-2">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              EDIT PROFILE
            </button>
            <button onClick={() => navigate("/artist/settings/security")} className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center flex-none">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="white" strokeWidth="2"/></svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/20">
          {[["post", "POST"], ["songs", "SONGS"], ["settings", "SETTINGS"]].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as "post" | "songs" | "settings")}
              className={`flex-1 py-3 text-sm font-extrabold transition-all ${activeTab === key ? "text-white border-b-2 border-white" : "text-white/50"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {activeTab === "settings" ? (
          <div className="px-4 pt-4 space-y-4 pb-4">
            {[
              { label: "Edit Profile", sub: "Name, bio, social links", path: "/artist/profile/edit", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/></svg> },
              { label: "Change Photo", sub: "Upload, crop, rotate", path: "/artist/profile/photo", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="#3D5898" strokeWidth="1.8"/><circle cx="12" cy="13" r="4" stroke="#3D5898" strokeWidth="1.8"/></svg> },
              { label: "Verification Status", sub: "ID & badge status", path: "/artist/profile/verification", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#3D5898" strokeWidth="1.8"/></svg> },
              { label: "Music Genres", sub: "Pop, Folk, Indie", path: "/artist/profile/genres", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M9 18V5l12-2v13" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="6" cy="18" r="3" stroke="#3D5898" strokeWidth="1.8"/><circle cx="18" cy="16" r="3" stroke="#3D5898" strokeWidth="1.8"/></svg> },
              { label: "Languages", sub: "Indonesian, English", path: "/artist/profile/languages", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#3D5898" strokeWidth="1.8"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#3D5898" strokeWidth="1.8"/></svg> },
              { label: "Creator Preferences", sub: "Display, content, regional", path: "/artist/profile/preferences", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" stroke="#3D5898" strokeWidth="1.8"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="#3D5898" strokeWidth="1.8"/></svg> },
            ].map((item) => (
              <button key={item.label} onClick={() => navigate(item.path)} className="w-full bg-white rounded-2xl px-4 py-4 flex items-center gap-4 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-[#EEF1FB] flex items-center justify-center flex-none">{item.icon}</div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-[#1E2D5A] text-sm">{item.label}</p>
                  <p className="text-[#9BAACE] text-xs mt-0.5">{item.sub}</p>
                </div>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#9BAACE" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            ))}
            <div className="h-px bg-[#C8D0E8] my-2" />
            {[
              { label: "Privacy Settings", path: "/artist/settings/privacy" },
              { label: "Notification Settings", path: "/artist/settings/notifications" },
              { label: "Security Settings", path: "/artist/settings/security" },
              { label: "Help Center", path: "/artist/help" },
            ].map((item) => (
              <button key={item.label} onClick={() => navigate(item.path)} className="w-full bg-white rounded-2xl px-4 py-4 flex items-center justify-between shadow-sm">
                <span className="font-bold text-[#1E2D5A] text-sm">{item.label}</span>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#9BAACE" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            ))}
          </div>
        ) : activeTab === "post" ? (
          <div className="grid grid-cols-3 gap-0.5 pb-4">
            {posts.map((post) => (
              <div key={post.id} className="aspect-square relative overflow-hidden bg-[#F4F5F9]">
                <img src={post.img} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="text-center text-white text-xs font-bold">
                    <p>❤ {(post.likes / 1000).toFixed(1)}K</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 pt-4 space-y-1">
            {songs.map((song) => (
              <div key={song.id} className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-[#3D5898]/10 flex items-center justify-center flex-none">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 18V5l12-2v13" stroke="#3D5898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="6" cy="18" r="3" stroke="#3D5898" strokeWidth="2"/><circle cx="18" cy="16" r="3" stroke="#3D5898" strokeWidth="2"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1E2D5A] font-bold text-sm truncate">{song.title}</p>
                  <p className="text-[#7A8BB5] text-xs">{song.streams} Streams · {song.duration}</p>
                </div>
                <button className="w-8 h-8 rounded-full bg-[#3D5898] flex items-center justify-center flex-none">
                  <svg width="10" height="12" fill="white" viewBox="0 0 10 12"><path d="M0 0v12l10-6z"/></svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Artist bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md">
        <div className="mx-4 mb-4 bg-white rounded-full flex shadow-lg border border-[#E8E8E8]">
          {[
            { key: "home", label: "Home", path: "/artist/dashboard" },
            { key: "sales", label: "Sales Hub", path: "/artist/dashboard" },
            { key: "notif", label: "Alerts", path: "/artist/dashboard" },
            { key: "learn", label: "Learn", path: "/artist/academy" },
            { key: "more", label: "More", path: "/artist/dashboard" },
          ].map((t) => (
            <button key={t.key} onClick={() => navigate(t.path)} className="flex-1 flex flex-col items-center py-3 gap-0.5 text-[#C8D0E8]">
              <div className="w-5 h-5 rounded bg-[#C8D0E8]/30" />
              <span className="text-[9px] font-bold">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
