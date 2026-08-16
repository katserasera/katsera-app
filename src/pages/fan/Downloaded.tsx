import { useState } from "react"
import { useNavigate } from "react-router-dom"

type DlTab = "Songs" | "Albums" | "Videos"

const initialDownloads = {
  Songs: [
    { id: 1, title: "Rumpang", artist: "Nadin Amizah", size: "8.2 MB", quality: "320 kbps", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop", duration: "4:12" },
    { id: 2, title: "Selamat Ulang Tahun", artist: "Nadin Amizah", size: "7.8 MB", quality: "320 kbps", cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200&h=200&fit=crop", duration: "3:45" },
    { id: 3, title: "Ingkar", artist: "Bernadya", size: "8.6 MB", quality: "256 kbps", cover: "https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=200&h=200&fit=crop", duration: "3:58" },
  ],
  Albums: [
    { id: 1, title: "Selamat Ulang Tahun", artist: "Nadin Amizah", size: "94.3 MB", quality: "320 kbps", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop", tracks: "12 tracks" },
  ],
  Videos: [
    { id: 1, title: "Rumpang — Official MV", artist: "Nadin Amizah", size: "142 MB", quality: "1080p", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=220&fit=crop", duration: "4:12" },
    { id: 2, title: "Acoustic Live Session", artist: "Nadin Amizah", size: "1.2 GB", quality: "720p", cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=220&fit=crop", duration: "1:24:38" },
  ],
}

const totalBytes = 1535 // MB approx
const deviceCapacity = 32768 // MB (32 GB)
const usedPercent = Math.round((totalBytes / deviceCapacity) * 100)

export default function Downloaded() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<DlTab>("Songs")
  const [downloads, setDownloads] = useState<typeof initialDownloads>(initialDownloads)
  const [playing, setPlaying] = useState<number | null>(null)
  const [removeTarget, setRemoveTarget] = useState<{ tab: DlTab; id: number } | null>(null)
  const tabs: DlTab[] = ["Songs", "Albums", "Videos"]

  const items = downloads[tab]
  const totalAll = Object.values(downloads).flat().length

  function confirmRemove() {
    if (!removeTarget) return
    setDownloads((prev) => ({
      ...prev,
      [removeTarget.tab]: prev[removeTarget.tab].filter((i) => i.id !== removeTarget.id),
    }))
    setRemoveTarget(null)
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-0 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-transform">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-[#1E2D5A] font-extrabold text-lg flex-1">Downloaded</span>
        </div>

        {/* Storage usage bar */}
        <div className="px-0 pb-3">
          <div className="flex justify-between text-xs text-[#7A8BB5] font-semibold mb-1.5">
            <span>Storage Used</span>
            <span className="font-bold text-[#1E2D5A]">{(totalBytes / 1024).toFixed(1)} GB / {deviceCapacity / 1024} GB</span>
          </div>
          <div className="h-2 bg-[#F4F5F9] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#3D5898] to-[#1E2D5A] rounded-full transition-all" style={{ width: `${usedPercent}%` }} />
          </div>
          <p className="text-[10px] text-[#9BAACE] mt-1">{totalAll} items · {usedPercent}% used</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#F4F5F9]">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2.5 text-xs font-bold transition-colors ${tab === t ? "text-[#3D5898] border-b-2 border-[#3D5898]" : "text-[#9BAACE]"}`}>
              {t} ({downloads[t].length})
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-2 overflow-y-auto pb-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-20 h-20 rounded-full bg-[#F4F5F9] flex items-center justify-center">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="#C8D0E8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <p className="text-[#1E2D5A] font-bold">No downloads</p>
            <p className="text-[#7A8BB5] text-sm text-center px-8">Download {tab.toLowerCase()} to listen offline.</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-3 flex gap-3 items-center shadow-sm">
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-none relative">
                <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                  <svg width="8" height="8" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="12 6 9 11 6 9"/></svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <p className="text-[#1E2D5A] font-bold text-sm truncate">{item.title}</p>
                  <span className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded-full flex-none">OFFLINE</span>
                </div>
                <p className="text-[#7A8BB5] text-xs">{item.artist}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[#9BAACE] text-[10px] font-semibold">{item.quality}</span>
                  <span className="w-1 h-1 rounded-full bg-[#C8D0E8]" />
                  <span className="text-[#9BAACE] text-[10px] font-semibold">{item.size}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-none">
                <button
                  onClick={() => setPlaying(playing === item.id ? null : item.id)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition-all ${playing === item.id ? "bg-[#3D5898]" : "bg-[#F4F5F9]"}`}
                >
                  {playing === item.id ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#3D5898"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  )}
                </button>
                <button
                  onClick={() => setRemoveTarget({ tab, id: item.id })}
                  className="w-9 h-9 rounded-full border border-[#E0E5F2] flex items-center justify-center active:scale-95 transition-transform"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" stroke="#7A8BB5" strokeWidth="2" strokeLinecap="round"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" stroke="#7A8BB5" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Remove confirm modal */}
      {removeTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-5 space-y-4">
            <div className="w-10 h-1 rounded-full bg-[#E0E5F2] mx-auto" />
            <p className="font-extrabold text-[#1E2D5A] text-base">Remove Download?</p>
            <p className="text-[#7A8BB5] text-sm">This item will be removed from your offline library. You can re-download it anytime.</p>
            <button onClick={confirmRemove} className="w-full py-3.5 rounded-full bg-red-500 text-white font-extrabold text-sm active:scale-95 transition-transform">Remove Download</button>
            <button onClick={() => setRemoveTarget(null)} className="w-full py-3.5 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-extrabold text-sm">Keep It</button>
          </div>
        </div>
      )}
    </div>
  )
}
