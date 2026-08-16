import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

type ContentTab = "exclusive" | "demos" | "bts" | "early" | "downloads" | "workshops"
type CreatorCat = "music" | "painter"

// ── Music exclusive content ────────────────────────────────────────────────────
const demoSongs = [
  { id: 1, title: "Unfinished Canvas (Demo v1)", duration: "3:14", date: "Jul 18, 2026", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop", locked: false },
  { id: 2, title: "Midnight Thoughts (Early Mix)", duration: "4:02", date: "Jul 10, 2026", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop", locked: false },
  { id: 3, title: "Studio Session — Unreleased B-side", duration: "2:48", date: "Jul 2, 2026", cover: "https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=200&h=200&fit=crop", locked: false },
  { id: 4, title: "New Song (Work in Progress)", duration: "1:59", date: "Jun 28, 2026", cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200&h=200&fit=crop", locked: true },
]

const btsContent = [
  { id: 1, title: "Album Recording — Day 3", type: "Video", duration: "12:40", cover: "https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=400&h=250&fit=crop", date: "Jul 20" },
  { id: 2, title: "Songwriting Session with Producer", type: "Video", duration: "8:15", cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=250&fit=crop", date: "Jul 14" },
  { id: 3, title: "Tour Rehearsal Footage", type: "Video", duration: "22:03", cover: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=250&fit=crop", date: "Jul 7" },
  { id: 4, title: "Personal Diary — July Entry", type: "Post", duration: "", cover: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=250&fit=crop", date: "Jul 1" },
]

const earlyAccess = [
  { id: 1, title: "Rumpang (2026 Album)", releaseDate: "Sep 12, 2026", badge: "Pre-save open", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop", saved: false },
  { id: 2, title: "Jakarta EP", releaseDate: "Aug 1, 2026", badge: "7 days early", cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200&h=200&fit=crop", saved: true },
]

// ── Painter exclusive content ─────────────────────────────────────────────────
const tutorials = [
  { id: 1, title: "Watercolor Wet-on-Wet Technique", duration: "34:10", level: "Beginner", cover: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=250&fit=crop", progress: 65 },
  { id: 2, title: "Color Mixing Masterclass", duration: "48:22", level: "Intermediate", cover: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&h=250&fit=crop", progress: 0 },
  { id: 3, title: "Painting Shadows — Advanced Techniques", duration: "1:12:05", level: "Advanced", cover: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&h=250&fit=crop", progress: 0 },
  { id: 4, title: "Studio Setup & Brush Care", duration: "22:30", level: "All Levels", cover: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=250&fit=crop", progress: 100 },
]

const downloadResources = [
  { id: 1, name: "Andi Wijaya Color Palette Pack", type: "PDF", size: "2.4 MB", downloaded: false },
  { id: 2, name: "Reference Photo Pack — Landscapes Vol.1", type: "ZIP", size: "48 MB", downloaded: true },
  { id: 3, name: "Custom Brush Set (Procreate)", type: "BRUSHSET", size: "12 MB", downloaded: false },
  { id: 4, name: "Composition Grid Templates", type: "PDF", size: "890 KB", downloaded: true },
  { id: 5, name: "Nocturnal Series — High-res Scans", type: "ZIP", size: "120 MB", downloaded: false },
]

const workshops = [
  { id: 1, title: "Premium: Landscape Painting Intensive", date: "Aug 31, 2026", seats: 7, price: "Rp 450.000", cover: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=200&fit=crop", exclusive: true },
  { id: 2, title: "1-on-1 Mentoring Session", date: "Flexible", seats: 3, price: "Rp 1.200.000", cover: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=200&fit=crop", exclusive: true },
  { id: 3, title: "Brushwork & Texture Workshop", date: "Sep 14, 2026", seats: 12, price: "Rp 300.000", cover: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&h=200&fit=crop", exclusive: false },
]

const painterGallery = [
  { id: 1, title: "Midnight Bloom", medium: "Acrylic", price: "Rp 4.500.000", img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop", exclusive: true },
  { id: 2, title: "Silent Forest", medium: "Watercolor", price: "Rp 2.800.000", img: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&h=400&fit=crop", exclusive: true },
  { id: 3, title: "Urban Composition #7", medium: "Mixed Media", price: "Rp 6.200.000", img: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=400&fit=crop", exclusive: false },
]

// ── Lock overlay ──────────────────────────────────────────────────────────────
function LockOverlay() {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
      <div className="text-center">
        <svg width="24" height="24" fill="white" viewBox="0 0 24 24" className="mx-auto mb-1"><rect x="3" y="11" width="18" height="11" rx="2" fill="white"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
        <p className="text-white text-[10px] font-bold">Members only</p>
      </div>
    </div>
  )
}

export default function MembershipContent() {
  const navigate = useNavigate()
  const location = useLocation()
  const creatorCat = ((location.state as { creatorCategory?: CreatorCat })?.creatorCategory) ?? "music"
  const isPainter = creatorCat === "painter"

  const [tab, setTab] = useState<ContentTab>(isPainter ? "downloads" : "exclusive")
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [savedAlbums, setSavedAlbums] = useState<Set<number>>(new Set([2]))
  const [downloadedIds, setDownloadedIds] = useState<Set<number>>(new Set([2, 4]))
  const [downloadingId, setDownloadingId] = useState<number | null>(null)

  const musicTabs: { key: ContentTab; label: string; icon: string }[] = [
    { key: "exclusive", label: "Demos", icon: "🎵" },
    { key: "bts", label: "BTS", icon: "🎬" },
    { key: "early", label: "Early Access", icon: "⏰" },
  ]
  const painterTabs: { key: ContentTab; label: string; icon: string }[] = [
    { key: "downloads", label: "Downloads", icon: "📥" },
    { key: "workshops", label: "Workshops", icon: "🎓" },
    { key: "exclusive", label: "Gallery", icon: "🖼️" },
  ]
  const tabs = isPainter ? painterTabs : musicTabs

  function handleDownload(id: number) {
    setDownloadingId(id)
    setTimeout(() => { setDownloadingId(null); setDownloadedIds((prev) => new Set([...prev, id])) }, 1800)
  }

  const levelColor = { Beginner: "text-green-600 bg-green-50", Intermediate: "text-amber-600 bg-amber-50", Advanced: "text-red-500 bg-red-50", "All Levels": "text-[#3D5898] bg-[#3D5898]/8" }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-[#F4F5F9] flex items-center justify-center active:scale-95 transition-transform">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </button>
          <div className="flex-1">
            <p className="text-[#1E2D5A] font-extrabold text-lg">{isPainter ? "🎨 Painter Membership" : "🎵 Music Membership"}</p>
            <p className="text-[#9BAACE] text-xs">Exclusive member content</p>
          </div>
          <div className="bg-[#D4A017] text-white text-[10px] font-extrabold px-3 py-1 rounded-full">Gold</div>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-[#E0E5F2]">
          {tabs.map(({ key, label, icon }) => (
            <button key={key} onClick={() => setTab(key)} className={`flex-1 flex items-center justify-center gap-1 py-2.5 text-xs font-bold border-b-2 transition-colors ${tab === key ? "text-[#3D5898] border-[#3D5898]" : "text-[#9BAACE] border-transparent"}`}>
              <span>{icon}</span>{label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-8">

        {/* ── MUSIC: Demo Songs ── */}
        {!isPainter && tab === "exclusive" && (
          <div className="px-4 pt-4 space-y-3">
            <div className="bg-[#3D5898]/8 rounded-2xl p-3 flex items-center gap-2 mb-4">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/></svg>
              <p className="text-[#3D5898] text-xs font-semibold">These demos are exclusive to members. Please do not share outside Katsera.</p>
            </div>
            {demoSongs.map((song) => (
              <div key={song.id} className={`bg-white rounded-2xl overflow-hidden shadow-sm flex items-center gap-3 p-3 ${song.locked ? "opacity-70" : ""}`}>
                <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-none">
                  <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                  {song.locked && <LockOverlay />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1E2D5A] font-bold text-sm truncate">{song.title}</p>
                  <p className="text-[#9BAACE] text-xs">{song.duration} · {song.date}</p>
                </div>
                {!song.locked ? (
                  <button onClick={() => setPlayingId(playingId === song.id ? null : song.id)} className="w-10 h-10 rounded-full bg-[#3D5898] flex items-center justify-center flex-none active:scale-95 transition-transform">
                    {playingId === song.id
                      ? <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                      : <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    }
                  </button>
                ) : (
                  <button onClick={() => navigate("/fan/membership/detail")} className="text-[#3D5898] text-xs font-bold bg-[#3D5898]/8 px-3 py-1.5 rounded-full active:scale-95">Upgrade</button>
                )}
              </div>
            ))}
            {playingId && (
              <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#1E2D5A] px-5 py-4">
                <div className="flex items-center gap-3">
                  <img src={demoSongs.find((s) => s.id === playingId)?.cover} alt="" className="w-10 h-10 rounded-xl object-cover flex-none" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm truncate">{demoSongs.find((s) => s.id === playingId)?.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-0.5 items-end h-4">
                        {[4,7,5,9,6,8,3,7].map((h, i) => <div key={i} className="w-0.5 bg-[#3D5898] rounded-full" style={{ height: h*2, animation: `waveBar ${0.3+i*0.1}s ease-in-out infinite alternate` }} />)}
                      </div>
                      <p className="text-white/60 text-xs">{demoSongs.find((s) => s.id === playingId)?.duration}</p>
                    </div>
                  </div>
                  <button onClick={() => setPlayingId(null)} className="text-white/60 active:scale-95">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="3" x2="11" y2="11"/><line x1="11" y1="3" x2="3" y2="11"/></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── MUSIC: BTS Content ── */}
        {!isPainter && tab === "bts" && (
          <div className="px-4 pt-4 space-y-3">
            {btsContent.map((item) => (
              <button key={item.id} onClick={() => navigate("/fan/watched")} className="w-full bg-white rounded-2xl overflow-hidden shadow-sm text-left active:scale-[0.98] transition-transform">
                <div className="relative h-40">
                  <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {item.type === "Video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#3D5898"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      </div>
                    </div>
                  )}
                  {item.duration && <span className="absolute bottom-3 right-3 text-white text-xs font-bold bg-black/50 px-2 py-0.5 rounded">{item.duration}</span>}
                  <span className="absolute top-3 left-3 text-[10px] font-bold text-white bg-[#3D5898]/80 px-2 py-0.5 rounded-full">{item.type}</span>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-[#1E2D5A] font-bold text-sm">{item.title}</p>
                    <p className="text-[#9BAACE] text-xs">{item.date}</p>
                  </div>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#C8D0E8" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ── MUSIC: Early Access ── */}
        {!isPainter && tab === "early" && (
          <div className="px-4 pt-4 space-y-4">
            <p className="text-[#7A8BB5] text-sm">Get early access to upcoming releases before the public.</p>
            {earlyAccess.map((item) => {
              const isSaved = savedAlbums.has(item.id)
              return (
                <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
                  <img src={item.cover} alt={item.title} className="w-16 h-16 rounded-xl object-cover flex-none" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[#1E2D5A] font-bold text-sm">{item.title}</p>
                    <p className="text-[#9BAACE] text-xs mt-0.5">Drops {item.releaseDate}</p>
                    <span className="text-[10px] font-bold text-[#3D5898] bg-[#3D5898]/8 px-2 py-0.5 rounded-full mt-1 inline-block">{item.badge}</span>
                  </div>
                  <button onClick={() => { const n = new Set(savedAlbums); isSaved ? n.delete(item.id) : n.add(item.id); setSavedAlbums(n) }} className={`flex-none px-4 py-2 rounded-full text-xs font-extrabold transition-all active:scale-95 ${isSaved ? "bg-green-100 text-green-600" : "bg-[#3D5898] text-white"}`}>
                    {isSaved ? "✓ Saved" : "Pre-save"}
                  </button>
                </div>
              )
            })}
            <div className="bg-white rounded-2xl p-4 shadow-sm text-center space-y-2">
              <span className="text-3xl">📻</span>
              <p className="text-[#1E2D5A] font-bold text-sm">Unreleased Tracks Preview</p>
              <p className="text-[#7A8BB5] text-xs">Gold members get 30-second previews of unreleased tracks. Full access on release day.</p>
              <button className="w-full py-3 rounded-full bg-[#3D5898] text-white font-bold text-sm active:scale-95 transition-transform">Listen Preview</button>
            </div>
          </div>
        )}

        {/* ── PAINTER: Downloads ── */}
        {isPainter && tab === "downloads" && (
          <div className="px-4 pt-4 space-y-3">
            <p className="text-[#7A8BB5] text-sm mb-2">Exclusive resources for members. Use in your personal art practice only.</p>
            {downloadResources.map((res) => {
              const isDone = downloadedIds.has(res.id)
              const isLoading = downloadingId === res.id
              return (
                <div key={res.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#3D5898]/8 flex items-center justify-center flex-none">
                    <span className="text-lg">{res.type === "PDF" ? "📄" : res.type === "ZIP" ? "📦" : res.type === "BRUSHSET" ? "🖌️" : "📁"}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#1E2D5A] font-bold text-sm leading-tight">{res.name}</p>
                    <p className="text-[#9BAACE] text-xs mt-0.5">{res.type} · {res.size}</p>
                  </div>
                  <button onClick={() => !isDone && handleDownload(res.id)} disabled={isLoading} className={`flex-none px-3 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${isDone ? "bg-green-100 text-green-600" : isLoading ? "bg-[#E0E5F2] text-[#9BAACE]" : "bg-[#3D5898] text-white"}`}>
                    {isLoading ? <div className="w-3 h-3 border border-[#9BAACE] border-t-[#3D5898] rounded-full animate-spin mx-2" /> : isDone ? "✓ Done" : "↓ Get"}
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {/* ── PAINTER: Workshops ── */}
        {isPainter && tab === "workshops" && (
          <div className="px-4 pt-4 space-y-4">
            {workshops.map((ws) => (
              <button key={ws.id} onClick={() => navigate("/events/detail")} className="w-full bg-white rounded-2xl overflow-hidden shadow-sm text-left active:scale-[0.98] transition-transform">
                <div className="relative h-36">
                  <img src={ws.cover} alt={ws.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {ws.exclusive && <span className="absolute top-3 left-3 text-[10px] font-extrabold text-[#D4A017] bg-black/60 px-2 py-0.5 rounded-full">⭐ Member Exclusive</span>}
                </div>
                <div className="p-4">
                  <p className="text-[#1E2D5A] font-bold text-sm">{ws.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className="text-[#9BAACE] text-xs">{ws.date}</p>
                      <p className="text-xs text-amber-600 font-semibold">{ws.seats} seats left</p>
                    </div>
                    <p className="text-[#3D5898] font-extrabold text-sm">{ws.price}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ── PAINTER: Exclusive Gallery ── */}
        {isPainter && tab === "exclusive" && (
          <div className="px-4 pt-4 space-y-4">
            <div className="flex items-center gap-2 bg-[#D4A017]/10 rounded-2xl p-3 mb-2">
              <span className="text-base">👑</span>
              <p className="text-[#7A8BB5] text-xs font-semibold">Member-only original artworks. First right of purchase before public listing.</p>
            </div>
            {painterGallery.map((art) => (
              <div key={art.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="relative h-48">
                  <img src={art.img} alt={art.title} className="w-full h-full object-cover" />
                  {art.exclusive && <span className="absolute top-3 left-3 text-[10px] font-extrabold text-[#D4A017] bg-black/60 px-2 py-0.5 rounded-full">👑 Members First</span>}
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[#1E2D5A] font-bold text-sm">{art.title}</p>
                    <p className="text-[#9BAACE] text-xs">{art.medium}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#3D5898] font-extrabold text-sm">{art.price}</p>
                    <button onClick={() => navigate("/fan/shop")} className="text-xs font-bold text-white bg-[#3D5898] px-3 py-1.5 rounded-full mt-1 active:scale-95 transition-transform">Inquire</button>
                  </div>
                </div>
              </div>
            ))}

            {/* Tutorials grid */}
            <p className="text-[#1E2D5A] font-extrabold text-base mt-4">Full Tutorials</p>
            {tutorials.map((t) => (
              <button key={t.id} onClick={() => navigate("/fan/watched")} className="w-full bg-white rounded-2xl overflow-hidden shadow-sm text-left active:scale-[0.98] transition-transform flex items-center gap-3 p-3">
                <div className="relative w-20 h-14 rounded-xl overflow-hidden flex-none">
                  <img src={t.cover} alt={t.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                  {t.progress === 100 && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-400" />
                  )}
                  {t.progress > 0 && t.progress < 100 && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E0E5F2]">
                      <div className="h-full bg-[#3D5898]" style={{ width: `${t.progress}%` }} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1E2D5A] font-bold text-xs leading-tight">{t.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${levelColor[t.level as keyof typeof levelColor] || "text-[#7A8BB5] bg-[#F4F5F9]"}`}>{t.level}</span>
                    <span className="text-[#9BAACE] text-[10px]">{t.duration}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
