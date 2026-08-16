import { useState } from "react"
import { useNavigate } from "react-router-dom"

const initialHistory = [
  {
    id: 1,
    title: "Acoustic Session — Live from Jakarta",
    artist: "Nadin Amizah",
    duration: "1:24:38",
    progress: 82,
    lastWatched: "2 hours ago",
    thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=220&fit=crop",
    type: "Live",
  },
  {
    id: 2,
    title: "Rumpang — Official Music Video",
    artist: "Nadin Amizah",
    duration: "4:12",
    progress: 100,
    lastWatched: "Yesterday",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=220&fit=crop",
    type: "MV",
  },
  {
    id: 3,
    title: "Q&A with Fans — Behind the Scenes",
    artist: "Bernadya",
    duration: "48:20",
    progress: 35,
    lastWatched: "2 days ago",
    thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=220&fit=crop",
    type: "Exclusive",
  },
  {
    id: 4,
    title: "Reality Check — Full Concert Replay",
    artist: "Reality Club",
    duration: "2:05:11",
    progress: 60,
    lastWatched: "3 days ago",
    thumbnail: "https://images.unsplash.com/photo-1501386761578-eaa54b08e8d1?w=400&h=220&fit=crop",
    type: "Concert",
  },
  {
    id: 5,
    title: "Ingkar — Lyric Video",
    artist: "Bernadya",
    duration: "3:58",
    progress: 100,
    lastWatched: "5 days ago",
    thumbnail: "https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=400&h=220&fit=crop",
    type: "MV",
  },
]

const typeColor: Record<string, string> = {
  Live: "bg-red-500 text-white",
  MV: "bg-[#3D5898] text-white",
  Exclusive: "bg-amber-500 text-white",
  Concert: "bg-purple-500 text-white",
}

export default function RecentlyWatched() {
  const navigate = useNavigate()
  const [history, setHistory] = useState(initialHistory)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [removed, setRemoved] = useState<Set<number>>(new Set())

  function removeItem(id: number) {
    setRemoved((prev) => new Set(prev).add(id))
    setTimeout(() => setHistory((prev) => prev.filter((v) => v.id !== id)), 300)
  }

  function clearAll() {
    setShowClearConfirm(false)
    setHistory([])
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-transform">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-[#1E2D5A] font-extrabold text-lg flex-1">Recently Watched</span>
          {history.length > 0 && (
            <button onClick={() => setShowClearConfirm(true)} className="text-xs text-[#7A8BB5] font-semibold hover:text-red-500 transition-colors">
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto pb-8">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-24 h-24 rounded-full bg-[#F4F5F9] flex items-center justify-center">
              <svg width="44" height="44" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="#C8D0E8" strokeWidth="1.8"/><polyline points="12 7 12 12 15 15" stroke="#C8D0E8" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <p className="text-[#1E2D5A] font-bold text-base">No watch history</p>
            <p className="text-[#7A8BB5] text-sm text-center px-8">Videos and live streams you watch will appear here.</p>
            <button onClick={() => navigate("/fan/home")} className="px-6 py-2.5 rounded-full bg-[#3D5898] text-white font-bold text-sm">
              Browse Content
            </button>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${removed.has(item.id) ? "opacity-0 scale-95" : "opacity-100"}`}
            >
              {/* Thumbnail */}
              <div className="relative h-44 overflow-hidden">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Type badge */}
                <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded-full ${typeColor[item.type] || "bg-white text-[#1E2D5A]"}`}>{item.type}</span>
                {/* Duration */}
                <span className="absolute bottom-10 right-3 text-white text-xs font-bold bg-black/50 px-2 py-0.5 rounded">{item.duration}</span>
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
                  <div className="h-full bg-[#3D5898]" style={{ width: `${item.progress}%` }} />
                </div>
              </div>

              <div className="p-3">
                <p className="text-[#1E2D5A] font-bold text-sm leading-snug line-clamp-2">{item.title}</p>
                <p className="text-[#7A8BB5] text-xs mt-0.5 mb-3">{item.artist} · {item.lastWatched}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/fan/channel/1`)}
                    className="flex-1 py-2 rounded-full bg-[#3D5898] text-white text-xs font-bold active:scale-95 transition-transform"
                  >
                    {item.progress === 100 ? "Watch Again" : "Continue Watching"}
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-9 h-9 rounded-full border border-[#E0E5F2] flex items-center justify-center active:scale-95 transition-transform"
                  >
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" stroke="#7A8BB5" strokeWidth="2" strokeLinecap="round"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" stroke="#7A8BB5" strokeWidth="2" strokeLinecap="round"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Clear confirm modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-5 space-y-4">
            <div className="w-10 h-1 rounded-full bg-[#E0E5F2] mx-auto" />
            <p className="font-extrabold text-[#1E2D5A] text-base">Clear Watch History?</p>
            <p className="text-[#7A8BB5] text-sm">This will remove all {history.length} items from your watch history. This action cannot be undone.</p>
            <button onClick={clearAll} className="w-full py-3.5 rounded-full bg-red-500 text-white font-extrabold text-sm active:scale-95 transition-transform">Clear All History</button>
            <button onClick={() => setShowClearConfirm(false)} className="w-full py-3.5 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-extrabold text-sm">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
