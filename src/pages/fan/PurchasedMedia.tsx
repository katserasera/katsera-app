import { useState } from "react"
import { useNavigate } from "react-router-dom"

type MediaTab = "Songs" | "Albums" | "Videos" | "Podcasts"

const songs = [
  { id: 1, title: "Rumpang", artist: "Nadin Amizah", date: "Jun 1, 2026", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop", duration: "4:12" },
  { id: 2, title: "Selamat Ulang Tahun", artist: "Nadin Amizah", date: "May 20, 2026", cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200&h=200&fit=crop", duration: "3:45" },
  { id: 3, title: "Ingkar", artist: "Bernadya", date: "Apr 10, 2026", cover: "https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=200&h=200&fit=crop", duration: "3:58" },
  { id: 4, title: "Tentang Rindu", artist: "Bernadya", date: "Mar 5, 2026", cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop", duration: "4:30" },
]
const albums = [
  { id: 1, title: "Selamat Ulang Tahun", artist: "Nadin Amizah", date: "Jan 15, 2026", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop", tracks: 12 },
  { id: 2, title: "Satu", artist: "Bernadya", date: "Feb 28, 2026", cover: "https://images.unsplash.com/photo-1501386761578-eaa54b08e8d1?w=200&h=200&fit=crop", tracks: 10 },
]
const videos = [
  { id: 1, title: "Rumpang — Official MV", artist: "Nadin Amizah", date: "Jun 1, 2026", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=220&fit=crop", duration: "4:12" },
  { id: 2, title: "Acoustic Live Session", artist: "Nadin Amizah", date: "May 1, 2026", cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=220&fit=crop", duration: "1:24:38" },
]
const podcasts = [
  { id: 1, title: "Behind The Song Vol. 3", artist: "Nadin Amizah", date: "Jul 1, 2026", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=200&fit=crop", duration: "42:00" },
]

type MediaItem = { id: number; title: string; artist: string; date: string; cover: string; duration?: string; tracks?: number }
const mediaData: Record<MediaTab, MediaItem[]> = { Songs: songs, Albums: albums, Videos: videos, Podcasts: podcasts }

export default function PurchasedMedia() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<MediaTab>("Songs")
  const [search, setSearch] = useState("")
  const [playing, setPlaying] = useState<number | null>(null)
  const [downloaded, setDownloaded] = useState<Set<number>>(new Set())

  const tabs: MediaTab[] = ["Songs", "Albums", "Videos", "Podcasts"]
  const items: MediaItem[] = mediaData[tab].filter((i) =>
    !search || i.title.toLowerCase().includes(search.toLowerCase()) || i.artist.toLowerCase().includes(search.toLowerCase())
  )

  function togglePlay(id: number) {
    setPlaying((prev) => (prev === id ? null : id))
  }

  function toggleDownload(id: number) {
    setDownloaded((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-0 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-transform">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-[#1E2D5A] font-extrabold text-lg flex-1">Purchased Media</span>
        </div>
        {/* Search */}
        <div className="bg-[#F4F5F9] rounded-full flex items-center px-4 py-2.5 gap-2 mx-0 mb-3">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="#7A8BB5" strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke="#7A8BB5" strokeWidth="2" strokeLinecap="round"/></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${tab.toLowerCase()}...`} className="flex-1 bg-transparent text-sm text-[#1E2D5A] outline-none placeholder:text-[#7A8BB5]" />
          {search && <button onClick={() => setSearch("")} className="text-[#7A8BB5]"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>}
        </div>
        {/* Tabs */}
        <div className="flex border-b border-[#F4F5F9]">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2.5 text-xs font-bold transition-colors ${tab === t ? "text-[#3D5898] border-b-2 border-[#3D5898]" : "text-[#9BAACE]"}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-2 overflow-y-auto pb-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-20 h-20 rounded-full bg-[#F4F5F9] flex items-center justify-center">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" stroke="#C8D0E8" strokeWidth="1.8"/><path d="M8 21h8M12 17v4" stroke="#C8D0E8" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <p className="text-[#1E2D5A] font-bold">No {tab.toLowerCase()} found</p>
            <p className="text-[#7A8BB5] text-sm text-center px-8">
              {search ? `No results for "${search}"` : `You haven't purchased any ${tab.toLowerCase()} yet.`}
            </p>
          </div>
        ) : tab === "Videos" ? (
          /* Video cards — wider layout */
          items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-40">
                <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button onClick={() => togglePlay(item.id)} className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center active:scale-95 transition-transform">
                    {playing === item.id ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    )}
                  </div>
                </button>
                <span className="absolute bottom-3 right-3 text-white text-xs font-bold bg-black/50 px-2 py-0.5 rounded">{(item as { duration?: string }).duration || ""}</span>
              </div>
              <div className="p-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[#1E2D5A] font-bold text-sm truncate">{item.title}</p>
                  <p className="text-[#7A8BB5] text-xs">{item.artist} · {item.date}</p>
                </div>
                <button onClick={() => toggleDownload(item.id)} className={`w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition-all ${downloaded.has(item.id) ? "bg-[#3D5898]" : "border border-[#E0E5F2]"}`}>
                  {downloaded.has(item.id) ? (
                    <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="#7A8BB5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          /* Songs/Albums/Podcasts — list layout */
          items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-3 flex gap-3 items-center shadow-sm">
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-none">
                <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#1E2D5A] font-bold text-sm truncate">{item.title}</p>
                <p className="text-[#7A8BB5] text-xs">{item.artist}</p>
                <p className="text-[#9BAACE] text-xs">{item.date}</p>
              </div>
              <div className="flex items-center gap-2 flex-none">
                <button onClick={() => togglePlay(item.id)} className={`w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition-all ${playing === item.id ? "bg-[#3D5898]" : "bg-[#F4F5F9]"}`}>
                  {playing === item.id ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#3D5898"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  )}
                </button>
                <button onClick={() => toggleDownload(item.id)} className={`w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition-all ${downloaded.has(item.id) ? "bg-[#3D5898]" : "border border-[#E0E5F2]"}`}>
                  {downloaded.has(item.id) ? (
                    <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="#7A8BB5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
