import { useState } from "react"
import { useNavigate } from "react-router-dom"

type StatusKey = "Upcoming" | "Completed" | "Cancelled"

const tickets = [
  {
    id: "TKT-20260901-001",
    event: "Semua Aku Dirayakan",
    artist: "Nadin Amizah",
    date: "Sep 1, 2026",
    time: "19:00 WIB",
    venue: "Jakarta International Expo, Hall A",
    status: "Upcoming" as StatusKey,
    ticketType: "Standing GOLD",
    seat: "G-204",
    price: 750000,
    banner: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=300&fit=crop",
  },
  {
    id: "TKT-20260810-002",
    event: "Reality Check Tour",
    artist: "Reality Club",
    date: "Aug 10, 2026",
    time: "20:00 WIB",
    venue: "Istora Senayan, Jakarta",
    status: "Upcoming" as StatusKey,
    ticketType: "VIP",
    seat: "V-015",
    price: 1200000,
    banner: "https://images.unsplash.com/photo-1501386761578-eaa54b08e8d1?w=600&h=300&fit=crop",
  },
  {
    id: "TKT-20260520-003",
    event: "Bernadya Intimate Session",
    artist: "Bernadya",
    date: "May 20, 2026",
    time: "18:00 WIB",
    venue: "Djakarta Theatre",
    status: "Completed" as StatusKey,
    ticketType: "Regular",
    seat: "R-089",
    price: 350000,
    banner: "https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=600&h=300&fit=crop",
  },
  {
    id: "TKT-20260301-004",
    event: "Ari Irham Premiere Night",
    artist: "Ari Irham",
    date: "Mar 1, 2026",
    time: "17:00 WIB",
    venue: "CGV Grand Indonesia",
    status: "Cancelled" as StatusKey,
    ticketType: "Premiere",
    seat: "P-003",
    price: 250000,
    banner: "https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=600&h=300&fit=crop",
  },
]

const statusStyle: Record<StatusKey, string> = {
  Upcoming: "text-[#3D5898] bg-blue-50",
  Completed: "text-green-600 bg-green-50",
  Cancelled: "text-red-500 bg-red-50",
}

export default function EventEntries() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<StatusKey>("Upcoming")
  const tabs: StatusKey[] = ["Upcoming", "Completed", "Cancelled"]

  const filtered = tickets.filter((t) => t.status === tab)

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-0 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-transform">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-[#1E2D5A] font-extrabold text-lg flex-1">Event Entries</span>
          <span className="text-xs text-[#7A8BB5] font-semibold">{tickets.length} tickets</span>
        </div>
        {/* Tabs */}
        <div className="flex border-b border-[#F4F5F9]">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-xs font-bold transition-colors ${tab === t ? "text-[#3D5898] border-b-2 border-[#3D5898]" : "text-[#9BAACE]"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto pb-8">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-20 h-20 rounded-full bg-[#F4F5F9] flex items-center justify-center">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#C8D0E8" strokeWidth="1.8"/><path d="M16 2v4M8 2v4M3 10h18" stroke="#C8D0E8" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <p className="text-[#1E2D5A] font-bold">No {tab.toLowerCase()} tickets</p>
            <p className="text-[#7A8BB5] text-sm text-center px-8">Check back later for upcoming events.</p>
          </div>
        ) : (
          filtered.map((ticket) => (
            <button
              key={ticket.id}
              onClick={() => navigate(`/fan/events/${ticket.id}`, { state: { ticket } })}
              className="w-full bg-white rounded-2xl overflow-hidden shadow-sm text-left active:scale-[0.98] transition-transform"
            >
              {/* Banner */}
              <div className="h-32 relative overflow-hidden">
                <img src={ticket.banner} alt={ticket.event} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full ${statusStyle[ticket.status]}`}>{ticket.status}</span>
                <p className="absolute bottom-3 left-4 text-white font-extrabold text-sm">{ticket.event}</p>
              </div>
              {/* Info */}
              <div className="p-4 space-y-1.5">
                <p className="text-[#7A8BB5] text-xs font-semibold">{ticket.artist}</p>
                <div className="flex items-center gap-4 text-xs text-[#1E2D5A] font-semibold">
                  <span className="flex items-center gap-1">
                    <svg width="11" height="11" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    {ticket.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg width="11" height="11" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><polyline points="12 7 12 12 15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    {ticket.time}
                  </span>
                </div>
                <p className="text-xs text-[#7A8BB5] flex items-center gap-1">
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2"/></svg>
                  {ticket.venue}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-bold text-[#7A8BB5]">{ticket.ticketType} · {ticket.seat}</span>
                  <span className="text-[#3D5898] font-extrabold text-sm">Rp{ticket.price.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
