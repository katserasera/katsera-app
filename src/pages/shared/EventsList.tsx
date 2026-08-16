import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { SAMPLE_EVENTS, EventData, EventType } from "./EventDetail"

type CreatorCat = "music" | "painter"

const MUSIC_TYPES: { type: EventType; label: string; icon: string }[] = [
  { type: "concert", label: "Concert", icon: "🎤" },
  { type: "fan-meeting", label: "Fan Meeting", icon: "🤝" },
  { type: "album-launch", label: "Album Launch", icon: "💿" },
  { type: "listening-party", label: "Listening Party", icon: "🎧" },
  { type: "meet-greet", label: "Meet & Greet", icon: "👋" },
  { type: "live-showcase", label: "Live Showcase", icon: "🎸" },
]

const PAINTER_TYPES: { type: EventType; label: string; icon: string }[] = [
  { type: "painting-workshop", label: "Painting Workshop", icon: "🖌️" },
  { type: "live-painting", label: "Live Painting", icon: "🎨" },
  { type: "gallery-exhibition", label: "Gallery Exhibition", icon: "🖼️" },
  { type: "masterclass", label: "Masterclass", icon: "🎓" },
  { type: "art-talk", label: "Art Talk", icon: "💬" },
  { type: "museum-collab", label: "Museum Collab", icon: "🏛️" },
]

// Extend sample events for display
const ALL_EVENTS: EventData[] = [
  ...SAMPLE_EVENTS,
  {
    id: "fm-1",
    type: "fan-meeting",
    creatorCategory: "music",
    title: "Exclusive Fan Meeting — Jakarta Edition",
    date: "Saturday, 6 Sep 2026",
    time: "14:00 WIB",
    venue: "The Kasablanka Hall",
    city: "Jakarta",
    artistName: "Nadin Amizah",
    artistImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    coverImg: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=400&fit=crop",
    description: "An intimate fan meeting where Nadin shares stories, performs acoustic sets, and signs merchandise.",
    seatCategories: [
      { name: "Gold", price: 550000, remaining: 30, total: 100, color: "#D4A017" },
      { name: "Silver", price: 350000, remaining: 88, total: 200, color: "#A8A9AD" },
    ],
  },
  {
    id: "gallery-1",
    type: "gallery-exhibition",
    creatorCategory: "painter",
    title: "Nocturnal Series — Gallery Exhibition",
    date: "14–20 Sep 2026",
    time: "10:00 – 21:00 WIB",
    venue: "Galeri Nasional Indonesia",
    city: "Jakarta",
    artistName: "Andi Wijaya",
    artistImg: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=80&h=80&fit=crop",
    coverImg: "https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?w=800&h=400&fit=crop",
    description: "A week-long exhibition of Andi Wijaya's Nocturnal Series — 28 paintings exploring light, shadow, and the human experience at night.",
    maxParticipants: 500,
    availableSeats: 312,
    fee: 0,
    difficultyLevel: "All Levels",
  },
]

export default function EventsList() {
  const navigate = useNavigate()
  const location = useLocation()
  const creatorCat = ((location.state as { creatorCategory?: CreatorCat })?.creatorCategory) ?? "music"
  const [filter, setFilter] = useState<"all" | EventType>("all")
  const [view, setView] = useState<"grid" | "list">("list")

  const typeOptions = creatorCat === "music" ? MUSIC_TYPES : PAINTER_TYPES
  const filtered = ALL_EVENTS.filter((e) => e.creatorCategory === creatorCat && (filter === "all" || e.type === filter))

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-[#F4F5F9] flex items-center justify-center active:scale-95 transition-transform">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </button>
          <p className="text-[#1E2D5A] font-extrabold text-lg flex-1">
            {creatorCat === "music" ? "Music Events" : "Art Events"}
          </p>
          <button onClick={() => setView(view === "grid" ? "list" : "grid")} className="w-9 h-9 rounded-full bg-[#F4F5F9] flex items-center justify-center active:scale-95 transition-transform">
            {view === "list"
              ? <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" stroke="#7A8BB5" strokeWidth="1.8" strokeLinecap="round"/><rect x="14" y="3" width="7" height="7" stroke="#7A8BB5" strokeWidth="1.8" strokeLinecap="round"/><rect x="3" y="14" width="7" height="7" stroke="#7A8BB5" strokeWidth="1.8" strokeLinecap="round"/><rect x="14" y="14" width="7" height="7" stroke="#7A8BB5" strokeWidth="1.8" strokeLinecap="round"/></svg>
              : <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6" stroke="#7A8BB5" strokeWidth="1.8" strokeLinecap="round"/><line x1="8" y1="12" x2="21" y2="12" stroke="#7A8BB5" strokeWidth="1.8" strokeLinecap="round"/><line x1="8" y1="18" x2="21" y2="18" stroke="#7A8BB5" strokeWidth="1.8" strokeLinecap="round"/><line x1="3" y1="6" x2="3.01" y2="6" stroke="#7A8BB5" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="12" x2="3.01" y2="12" stroke="#7A8BB5" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="18" x2="3.01" y2="18" stroke="#7A8BB5" strokeWidth="2" strokeLinecap="round"/></svg>
            }
          </button>
        </div>

        {/* Type filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button onClick={() => setFilter("all")} className={`flex-none px-3.5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${filter === "all" ? "bg-[#3D5898] text-white" : "bg-[#F4F5F9] text-[#7A8BB5]"}`}>All</button>
          {typeOptions.map(({ type, label, icon }) => (
            <button key={type} onClick={() => setFilter(type as EventType)} className={`flex-none flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${filter === type ? "bg-[#3D5898] text-white" : "bg-[#F4F5F9] text-[#7A8BB5]"}`}>
              <span>{icon}</span>{label}
            </button>
          ))}
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto px-4 pt-4 pb-8 ${view === "grid" ? "grid grid-cols-2 gap-3 content-start" : "space-y-3"}`}>
        {filtered.length === 0 ? (
          <div className="col-span-2 flex flex-col items-center justify-center py-20 gap-3">
            <span className="text-5xl">🗓️</span>
            <p className="text-[#1E2D5A] font-bold text-base">No events found</p>
            <p className="text-[#9BAACE] text-sm">Try a different event type</p>
          </div>
        ) : filtered.map((event) => (
          <button
            key={event.id}
            onClick={() => navigate("/events/detail", { state: { event } })}
            className={`bg-white rounded-2xl overflow-hidden shadow-sm text-left active:scale-[0.98] transition-transform ${view === "list" ? "flex items-center" : ""}`}
          >
            <div className={`relative ${view === "list" ? "w-24 h-20 flex-none" : "h-36 w-full"}`}>
              <img src={event.coverImg} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2">
                <span className="text-[9px] font-extrabold uppercase tracking-wide bg-[#3D5898] text-white px-2 py-0.5 rounded-full">{event.type.replace(/-/g, " ")}</span>
              </div>
            </div>
            <div className={`p-3 ${view === "list" ? "flex-1 min-w-0" : ""}`}>
              <p className="text-[#1E2D5A] font-bold text-xs leading-tight line-clamp-2">{event.title}</p>
              <div className="flex items-center gap-1 mt-1.5">
                <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#9BAACE" strokeWidth="2"/><line x1="16" y1="2" x2="16" y2="6" stroke="#9BAACE" strokeWidth="2" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" stroke="#9BAACE" strokeWidth="2" strokeLinecap="round"/></svg>
                <p className="text-[#9BAACE] text-[10px]">{event.date.split(",")[1]?.trim() ?? event.date}</p>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#9BAACE" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke="#9BAACE" strokeWidth="2"/></svg>
                <p className="text-[#9BAACE] text-[10px] truncate">{event.city}</p>
              </div>
              {view === "list" && (
                <p className="text-[#3D5898] font-extrabold text-xs mt-1.5">
                  {event.seatCategories
                    ? `From Rp ${event.seatCategories[event.seatCategories.length - 1].price.toLocaleString("id-ID")}`
                    : event.fee === 0 ? "Free" : `Rp ${(event.fee ?? 0).toLocaleString("id-ID")}`
                  }
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
