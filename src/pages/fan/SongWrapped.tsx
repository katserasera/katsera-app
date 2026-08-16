import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

const wrappedData = {
  year: 2026,
  totalHours: 1247,
  totalSongs: 3891,
  topArtist: { name: "Nadin Amizah", listens: 892, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" },
  topSong: { title: "Rumpang", artist: "Nadin Amizah", plays: 318, cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop" },
  topAlbum: { title: "Selamat Ulang Tahun", artist: "Nadin Amizah", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop" },
  topGenre: "Indie Folk",
  streak: 47,
  favoritePlaylist: "Late Night Feels",
  monthlyChart: [82, 95, 110, 75, 130, 142, 160, 155, 108, 98, 125, 167],
  badges: [
    { icon: "🔥", label: "On Fire", desc: "47-day streak" },
    { icon: "🎸", label: "Indie Head", desc: "Top genre: Indie Folk" },
    { icon: "⭐", label: "Super Fan", desc: "#1 Nadin listener" },
    { icon: "🌙", label: "Night Owl", desc: "Mostly 10PM-2AM" },
  ],
  topArtists: [
    { name: "Nadin Amizah", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" },
    { name: "Bernadya", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop" },
    { name: "Reality Club", img: "https://images.unsplash.com/photo-1501386761578-eaa54b08e8d1?w=80&h=80&fit=crop" },
    { name: "Tulus", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop" },
    { name: "Hindia", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=80&h=80&fit=crop" },
  ],
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function MonthlyChart() {
  const max = Math.max(...wrappedData.monthlyChart)
  return (
    <div className="flex items-end gap-1 h-28">
      {wrappedData.monthlyChart.map((val, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-md bg-white/30 transition-all"
            style={{ height: `${(val / max) * 80}px` }}
          />
          <span className="text-[9px] text-white/60 font-semibold">{months[i]}</span>
        </div>
      ))}
    </div>
  )
}

type Card = {
  id: string
  bg: string
  label?: string
  render: () => React.ReactNode
}

const cards: Card[] = [
  {
    id: "intro",
    bg: "from-[#1E2D5A] to-[#3D5898]",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
        <div className="text-6xl">🎵</div>
        <div>
          <p className="text-white/70 text-sm font-semibold mb-1">Your {wrappedData.year}</p>
          <p className="text-white font-extrabold text-4xl">Wrapped</p>
        </div>
        <p className="text-white/60 text-sm">Your personal listening story. Swipe to explore.</p>
        <div className="flex gap-1 mt-2">
          {cards.map((_, i) => <div key={i} className={`h-1 rounded-full ${i === 0 ? "w-6 bg-white" : "w-2 bg-white/30"}`} />)}
        </div>
      </div>
    ),
  },
  {
    id: "hours",
    bg: "from-[#2C1A5E] to-[#6B3FA0]",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
        <p className="text-white/60 text-sm font-semibold uppercase tracking-widest">This year you listened for</p>
        <p className="text-white font-extrabold" style={{ fontSize: 72, lineHeight: 1 }}>{wrappedData.totalHours.toLocaleString()}</p>
        <p className="text-white font-extrabold text-2xl -mt-2">hours</p>
        <p className="text-white/50 text-sm mt-4">That's {Math.round(wrappedData.totalHours / 24)} full days of music 🎶</p>
        <div className="mt-4 text-center">
          <p className="text-white/40 text-xs">Across {wrappedData.totalSongs.toLocaleString()} songs</p>
        </div>
      </div>
    ),
  },
  {
    id: "top-artist",
    bg: "from-[#B5451B] to-[#E07A3A]",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full gap-5 px-8 text-center">
        <p className="text-white/60 text-sm font-semibold uppercase tracking-widest">Your Top Artist</p>
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
          <img src={wrappedData.topArtist.img} alt={wrappedData.topArtist.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-white font-extrabold text-3xl">{wrappedData.topArtist.name}</p>
          <p className="text-white/70 text-sm mt-1">{wrappedData.topArtist.listens} listens this year</p>
        </div>
        <div className="bg-white/20 rounded-2xl px-5 py-3">
          <p className="text-white/60 text-xs">You were in the</p>
          <p className="text-white font-extrabold text-xl">Top 0.1%</p>
          <p className="text-white/60 text-xs">of her listeners</p>
        </div>
      </div>
    ),
  },
  {
    id: "top-song",
    bg: "from-[#1A5E3A] to-[#3AAA6B]",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full gap-5 px-8 text-center">
        <p className="text-white/60 text-sm font-semibold uppercase tracking-widest">Your #1 Song</p>
        <div className="w-36 h-36 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20">
          <img src={wrappedData.topSong.cover} alt={wrappedData.topSong.title} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-white font-extrabold text-2xl">{wrappedData.topSong.title}</p>
          <p className="text-white/70 text-sm mt-1">{wrappedData.topSong.artist}</p>
        </div>
        <div className="flex items-center gap-2 bg-white/20 rounded-full px-5 py-2.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <span className="text-white font-bold text-sm">Played {wrappedData.topSong.plays} times</span>
        </div>
      </div>
    ),
  },
  {
    id: "top-album",
    bg: "from-[#5E1A4A] to-[#AA3A82]",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full gap-5 px-8 text-center">
        <p className="text-white/60 text-sm font-semibold uppercase tracking-widest">Favourite Album</p>
        <div className="w-36 h-36 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20">
          <img src={wrappedData.topAlbum.cover} alt={wrappedData.topAlbum.title} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-white font-extrabold text-2xl">{wrappedData.topAlbum.title}</p>
          <p className="text-white/70 text-sm mt-1">{wrappedData.topAlbum.artist}</p>
        </div>
      </div>
    ),
  },
  {
    id: "genre",
    bg: "from-[#1A4A5E] to-[#3A82AA]",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
        <p className="text-white/60 text-sm font-semibold uppercase tracking-widest">Your Top Genre</p>
        <div className="text-7xl">🎸</div>
        <p className="text-white font-extrabold text-4xl leading-tight">{wrappedData.topGenre}</p>
        <p className="text-white/60 text-sm">You really know what you like.</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {["Indie Folk", "Alt-Pop", "Singer-Songwriter", "Jazz", "Lo-Fi"].map((g, i) => (
            <span key={g} className={`px-3 py-1.5 rounded-full text-xs font-bold ${i === 0 ? "bg-white text-[#1A4A5E]" : "bg-white/20 text-white"}`}>{g}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "chart",
    bg: "from-[#0A1628] to-[#1E3A6E]",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-5 px-6">
        <div className="text-center">
          <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-1">Monthly Listening</p>
          <p className="text-white font-extrabold text-2xl">2026 in Review</p>
        </div>
        <MonthlyChart />
        <div className="flex justify-between text-xs text-white/50">
          <span>Peak: December ({wrappedData.monthlyChart[11]}h)</span>
          <span>Avg: {Math.round(wrappedData.monthlyChart.reduce((a, b) => a + b, 0) / 12)}h/mo</span>
        </div>
      </div>
    ),
  },
  {
    id: "streak",
    bg: "from-[#5E3A1A] to-[#E0962A]",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full gap-5 px-8 text-center">
        <p className="text-white/60 text-sm font-semibold uppercase tracking-widest">Listening Streak</p>
        <div className="text-6xl">🔥</div>
        <div>
          <p className="text-white font-extrabold" style={{ fontSize: 80, lineHeight: 1 }}>{wrappedData.streak}</p>
          <p className="text-white font-bold text-xl">days in a row</p>
        </div>
        <p className="text-white/60 text-sm">You couldn't stop, and we love that for you.</p>
      </div>
    ),
  },
  {
    id: "badges",
    bg: "from-[#1E2D5A] to-[#3D5898]",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full gap-5 px-6">
        <p className="text-white/60 text-sm font-semibold uppercase tracking-widest text-center">Achievements</p>
        <div className="grid grid-cols-2 gap-3 w-full">
          {wrappedData.badges.map((badge) => (
            <div key={badge.label} className="bg-white/15 rounded-2xl p-4 flex flex-col items-center gap-2 text-center">
              <span className="text-3xl">{badge.icon}</span>
              <p className="text-white font-bold text-sm">{badge.label}</p>
              <p className="text-white/60 text-xs">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "top5",
    bg: "from-[#2E1A5E] to-[#7A3AEA]",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-4 px-6">
        <p className="text-white/60 text-sm font-semibold uppercase tracking-widest text-center">Your Top 5 Artists</p>
        <div className="space-y-3">
          {wrappedData.topArtists.map((a, i) => (
            <div key={a.name} className="flex items-center gap-3">
              <span className="text-white/40 font-extrabold text-xl w-6 text-right">{i + 1}</span>
              <div className="w-10 h-10 rounded-full overflow-hidden flex-none border-2 border-white/20">
                <img src={a.img} alt={a.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-white font-bold text-base">{a.name}</p>
              {i === 0 && <span className="ml-auto text-white text-lg">👑</span>}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "share",
    bg: "from-[#1E2D5A] to-[#0D1B3A]",
    render: () => null, // rendered separately below
  },
]

export default function SongWrapped() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [shared, setShared] = useState(false)
  const startX = useRef(0)

  const card = cards[current]
  const isLast = current === cards.length - 1

  function handleTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const diff = startX.current - e.changedTouches[0].clientX
    if (diff > 40 && current < cards.length - 1) setCurrent((c) => c + 1)
    if (diff < -40 && current > 0) setCurrent((c) => c - 1)
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: `My ${wrappedData.year} Wrapped`, text: `I listened to ${wrappedData.totalHours} hours of music this year on Katsera!` }).catch(() => {})
    } else {
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    }
  }

  return (
    <div className="h-screen flex flex-col max-w-md mx-auto font-[Nunito] overflow-hidden">
      {/* Progress dots */}
      <div className={`absolute top-12 left-0 right-0 z-30 px-5 flex gap-1 max-w-md mx-auto`}>
        {cards.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all ${i < current ? "bg-white" : i === current ? "bg-white" : "bg-white/30"}`}
          />
        ))}
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-16 left-4 z-40 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center active:scale-95 transition-transform"
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      {/* Card */}
      <div
        className={`flex-1 bg-gradient-to-b ${card.bg} relative`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => {
          const x = e.clientX
          const w = (e.currentTarget as HTMLElement).offsetWidth
          if (x > w * 0.6 && current < cards.length - 1) setCurrent((c) => c + 1)
          else if (x < w * 0.4 && current > 0) setCurrent((c) => c - 1)
        }}
      >
        {isLast ? (
          /* Share card */
          <div className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
            <div className="text-5xl">🎉</div>
            <div>
              <p className="text-white/70 text-sm font-semibold mb-2">Your {wrappedData.year} Wrapped</p>
              <p className="text-white font-extrabold text-3xl">Share Your Story</p>
            </div>
            <div className="space-y-3 text-sm text-white/70">
              <p>🎵 {wrappedData.totalHours.toLocaleString()} hours listened</p>
              <p>🎤 Top artist: {wrappedData.topArtist.name}</p>
              <p>🔥 {wrappedData.streak}-day streak</p>
              <p>⭐ Genre: {wrappedData.topGenre}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); handleShare() }}
              className="w-full py-4 rounded-full bg-white text-[#1E2D5A] font-extrabold text-base active:scale-95 transition-transform"
            >
              {shared ? "✓ Copied to Clipboard!" : "Share My Wrapped"}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setCurrent(0) }}
              className="text-white/60 text-sm font-semibold"
            >
              View Again from Start
            </button>
          </div>
        ) : (
          card.render()
        )}

        {/* Navigation arrows */}
        {current > 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); setCurrent((c) => c - 1) }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </button>
        )}
        {current < cards.length - 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); setCurrent((c) => c + 1) }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </button>
        )}

        {/* Card counter */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <span className="text-white/40 text-xs font-semibold">{current + 1} / {cards.length}</span>
        </div>
      </div>
    </div>
  )
}
