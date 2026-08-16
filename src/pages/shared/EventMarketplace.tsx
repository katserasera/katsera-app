import { useState } from "react"
import { useNavigate } from "react-router-dom"

type EventCategory = "music" | "visual-arts" | "creative-arts"

interface MarketEvent {
  id: string
  title: string
  category: EventCategory
  type: string
  artist: string
  artistImg: string
  city: string
  date: string
  time: string
  venue: string
  price: number | null
  remaining: number
  total: number
  cover: string
  rating: number
  reviewCount: number
}

const ALL_EVENTS: MarketEvent[] = [
  { id: "e1", title: "Semua Aku Dirayakan — World Tour", category: "music", type: "Concert", artist: "Nadin Amizah", artistImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop", city: "Jakarta", date: "Sep 1, 2026", time: "19:00 WIB", venue: "GBK International Stadium", price: 350000, remaining: 1240, total: 8000, cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=340&fit=crop", rating: 4.9, reviewCount: 2400 },
  { id: "e2", title: "Exclusive Fan Meeting — Jakarta Edition", category: "music", type: "Fan Meeting", artist: "Nadin Amizah", artistImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop", city: "Jakarta", date: "Sep 6, 2026", time: "14:00 WIB", venue: "The Kasablanka Hall", price: 350000, remaining: 88, total: 200, cover: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=340&fit=crop", rating: 4.8, reviewCount: 890 },
  { id: "e3", title: "Reality Check Album Launch", category: "music", type: "Album Launch", artist: "Reality Club", artistImg: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop", city: "Bandung", date: "Aug 20, 2026", time: "20:00 WIB", venue: "Braga City Walk", price: 150000, remaining: 320, total: 500, cover: "https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=600&h=340&fit=crop", rating: 4.7, reviewCount: 560 },
  { id: "e4", title: "Bernadya Intimate Meet & Greet", category: "music", type: "Meet & Greet", artist: "Bernadya", artistImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop", city: "Surabaya", date: "Aug 15, 2026", time: "16:00 WIB", venue: "Galaxy Mall Surabaya", price: 500000, remaining: 22, total: 50, cover: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=340&fit=crop", rating: 5.0, reviewCount: 128 },
  { id: "e5", title: "Watercolor Landscape Masterclass", category: "visual-arts", type: "Painting Workshop", artist: "Andi Wijaya", artistImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop", city: "Bandung", date: "Aug 31, 2026", time: "09:00 WIB", venue: "Studio Andi Wijaya", price: 450000, remaining: 7, total: 15, cover: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=340&fit=crop", rating: 4.9, reviewCount: 345 },
  { id: "e6", title: "Nocturnal Series — Gallery Exhibition", category: "visual-arts", type: "Gallery Exhibition", artist: "Andi Wijaya", artistImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop", city: "Jakarta", date: "Sep 14-20, 2026", time: "10:00–21:00", venue: "Galeri Nasional Indonesia", price: 0, remaining: 312, total: 500, cover: "https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?w=600&h=340&fit=crop", rating: 4.8, reviewCount: 670 },
  { id: "e7", title: "Oil Painting for Beginners", category: "visual-arts", type: "Oil Painting Workshop", artist: "Sinta Dewi", artistImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop", city: "Yogyakarta", date: "Sep 5, 2026", time: "10:00 WIB", venue: "Sanggar Seni Malioboro", price: 320000, remaining: 8, total: 12, cover: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=340&fit=crop", rating: 4.7, reviewCount: 189 },
  { id: "e8", title: "Japanese Flower Arrangement Workshop", category: "creative-arts", type: "Flower Arrangement Workshop", artist: "Reza Pratama", artistImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop", city: "Jakarta", date: "Aug 24, 2026", time: "14:00 WIB", venue: "Greenery Studio Jakarta", price: 275000, remaining: 5, total: 20, cover: "https://images.unsplash.com/photo-1487530811015-780a5ee24c0c?w=600&h=340&fit=crop", rating: 4.9, reviewCount: 231 },
  { id: "e9", title: "Introduction to Pottery Wheel", category: "creative-arts", type: "Pottery Workshop", artist: "Layla Putri", artistImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop", city: "Bali", date: "Sep 10, 2026", time: "09:00 WIB", venue: "Ubud Art Studio", price: 550000, remaining: 4, total: 10, cover: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=340&fit=crop", rating: 4.8, reviewCount: 412 },
  { id: "e10", title: "Calligraphy — Arabic Style", category: "creative-arts", type: "Calligraphy Workshop", artist: "Sinta Dewi", artistImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop", city: "Surabaya", date: "Sep 18, 2026", time: "13:00 WIB", venue: "Tunjungan Plaza Convention Center", price: 200000, remaining: 18, total: 30, cover: "https://images.unsplash.com/photo-1527176930608-09cb256ab504?w=600&h=340&fit=crop", rating: 4.6, reviewCount: 98 },
]

const CITIES = ["All Cities", "Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Bali"]

const CATEGORY_TYPES: Record<EventCategory, string[]> = {
  "music": ["Concert", "Fan Meeting", "Album Launch", "Meet & Greet"],
  "visual-arts": ["Painting Workshop", "Watercolor Class", "Oil Painting Workshop", "Live Painting Session", "Gallery Exhibition"],
  "creative-arts": ["Pottery Workshop", "Flower Arrangement Workshop", "Craft Workshop", "Sculpture Workshop", "Calligraphy Workshop"],
}

const CAT_LABELS: Record<EventCategory, string> = {
  "music": "🎵 Music",
  "visual-arts": "🎨 Visual Arts",
  "creative-arts": "🖐️ Creative Arts",
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill={s <= Math.round(rating) ? "#F59E0B" : "#E0E5F2"}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
      <span className="text-[#9BAACE] text-[10px] ml-0.5">{rating}</span>
    </div>
  )
}

export default function EventMarketplace() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<EventCategory | "all">("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [city, setCity] = useState("All Cities")
  const [view, setView] = useState<"list" | "grid">("list")

  const availableTypes = category !== "all" ? CATEGORY_TYPES[category as EventCategory] : Object.values(CATEGORY_TYPES).flat()

  const filtered = ALL_EVENTS.filter((e) => {
    const q = search.toLowerCase()
    const matchSearch = !q || e.title.toLowerCase().includes(q) || e.artist.toLowerCase().includes(q) || e.city.toLowerCase().includes(q)
    const matchCat = category === "all" || e.category === category
    const matchType = typeFilter === "all" || e.type === typeFilter
    const matchCity = city === "All Cities" || e.city === city
    return matchSearch && matchCat && matchType && matchCity
  })

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-transform">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <p className="text-[#1E2D5A] font-extrabold text-lg flex-1">Event Marketplace</p>
          <button onClick={() => setView(view === "list" ? "grid" : "list")} className="w-8 h-8 rounded-full bg-[#F4F5F9] flex items-center justify-center active:scale-95">
            <svg width="14" height="14" fill="none" stroke="#7A8BB5" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24">
              {view === "list" ? <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></> : <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6" strokeWidth="2"/><line x1="3" y1="12" x2="3.01" y2="12" strokeWidth="2"/><line x1="3" y1="18" x2="3.01" y2="18" strokeWidth="2"/></>}
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="bg-[#F4F5F9] rounded-full flex items-center px-4 py-2.5 gap-2 mb-3">
          <svg width="14" height="14" fill="none" stroke="#7A8BB5" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search events, artists, cities..." className="flex-1 bg-transparent text-sm text-[#1E2D5A] outline-none placeholder:text-[#7A8BB5]" />
          {search && <button onClick={() => setSearch("")} className="text-[#9BAACE] active:scale-95"><svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>}
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2" style={{ scrollbarWidth: "none" }}>
          {(["all", "music", "visual-arts", "creative-arts"] as const).map((c) => (
            <button key={c} onClick={() => { setCategory(c); setTypeFilter("all") }} className={`flex-none px-4 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${category === c ? "bg-[#3D5898] text-white" : "bg-[#F4F5F9] text-[#7A8BB5]"}`}>
              {c === "all" ? "🌟 All" : CAT_LABELS[c as EventCategory]}
            </button>
          ))}
        </div>

        {/* Type + City filters */}
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <select value={city} onChange={(e) => setCity(e.target.value)} className="flex-none bg-[#F4F5F9] text-[#7A8BB5] text-xs font-bold px-3 py-1.5 rounded-full outline-none">
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <button onClick={() => setTypeFilter("all")} className={`flex-none px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${typeFilter === "all" ? "bg-[#1E2D5A] text-white" : "bg-[#F4F5F9] text-[#7A8BB5]"}`}>All Types</button>
          {availableTypes.slice(0, 4).map((t) => (
            <button key={t} onClick={() => setTypeFilter(t)} className={`flex-none px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${typeFilter === t ? "bg-[#1E2D5A] text-white" : "bg-[#F4F5F9] text-[#7A8BB5]"}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto px-4 pt-4 pb-8 ${view === "grid" ? "grid grid-cols-2 gap-3 content-start" : "space-y-3"}`}>
        {filtered.length === 0 ? (
          <div className="col-span-2 flex flex-col items-center justify-center py-20 gap-3">
            <span className="text-5xl">🔍</span>
            <p className="text-[#1E2D5A] font-bold">No events found</p>
            <p className="text-[#9BAACE] text-sm text-center px-8">Try adjusting your search or filters</p>
            <button onClick={() => { setSearch(""); setCategory("all"); setTypeFilter("all"); setCity("All Cities") }} className="px-5 py-2 rounded-full bg-[#3D5898] text-white text-sm font-bold active:scale-95">Clear Filters</button>
          </div>
        ) : filtered.map((event) => (
          <button
            key={event.id}
            onClick={() => navigate("/events/detail", { state: { event } })}
            className={`bg-white rounded-2xl overflow-hidden shadow-sm text-left active:scale-[0.98] transition-transform w-full ${view === "list" ? "flex" : ""}`}
          >
            <div className={`relative ${view === "list" ? "w-28 h-24 flex-none" : "h-36"}`}>
              <img src={event.cover} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className={`absolute top-2 left-2 text-[9px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full ${event.price === 0 ? "bg-green-500 text-white" : "bg-[#3D5898] text-white"}`}>
                {event.price === 0 ? "Free" : event.type}
              </span>
              {event.remaining <= 10 && <span className="absolute top-2 right-2 text-[9px] font-bold text-red-500 bg-white px-1.5 py-0.5 rounded-full">{event.remaining} left</span>}
            </div>
            <div className={`p-3 ${view === "list" ? "flex-1 min-w-0" : ""}`}>
              <p className="text-[#1E2D5A] font-bold text-xs leading-tight line-clamp-2 mb-1">{event.title}</p>
              <p className="text-[#9BAACE] text-[10px] mb-1">{event.artist}</p>
              <div className="flex items-center gap-1.5 mb-1">
                <svg width="9" height="9" fill="none" stroke="#9BAACE" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
                <p className="text-[#9BAACE] text-[10px]">{event.city}</p>
                <span className="text-[#C8D0E8]">·</span>
                <p className="text-[#9BAACE] text-[10px]">{event.date.split(",")[1]?.trim() ?? event.date}</p>
              </div>
              <Stars rating={event.rating} />
              {view === "list" && (
                <p className="text-[#3D5898] font-extrabold text-xs mt-1.5">
                  {event.price === 0 ? "Free" : event.price !== null ? `From Rp${event.price.toLocaleString("id-ID")}` : "Free"}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
