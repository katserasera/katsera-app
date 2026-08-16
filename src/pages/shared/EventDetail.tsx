import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

// ── Types ─────────────────────────────────────────────────────────────────────
export type EventType = "concert" | "fan-meeting" | "album-launch" | "listening-party" | "meet-greet" | "live-showcase" | "painting-workshop" | "live-painting" | "gallery-exhibition" | "masterclass" | "art-talk" | "museum-collab"

export interface EventData {
  id: string
  type: EventType
  creatorCategory: "music" | "painter"
  title: string
  date: string
  time: string
  venue: string
  city: string
  artistName: string
  artistImg: string
  coverImg: string
  description: string
  // Music fields
  seatCategories?: SeatCategory[]
  guestStars?: string[]
  hasMerchandise?: boolean
  hasVIP?: boolean
  vipBenefits?: string[]
  parkingInfo?: string
  faq?: { q: string; a: string }[]
  // Painter fields
  maxParticipants?: number
  availableSeats?: number
  fee?: number
  materials?: string[]
  difficultyLevel?: "Beginner" | "Intermediate" | "Advanced" | "All Levels"
  instructor?: string
}

interface SeatCategory {
  name: string
  price: number
  remaining: number
  total: number
  color: string
}

// ── Sample Events ─────────────────────────────────────────────────────────────
export const SAMPLE_EVENTS: EventData[] = [
  {
    id: "concert-1",
    type: "concert",
    creatorCategory: "music",
    title: "Live Concert at Gelora Bung Karno Stadium",
    date: "Saturday, 23 August 2026",
    time: "19:00 WIB",
    venue: "Gelora Bung Karno Stadium",
    city: "Jakarta",
    artistName: "Nadin Amizah",
    artistImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    coverImg: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=400&fit=crop",
    description: "Experience the night of your life as Nadin Amizah takes the stage at GBK for her biggest concert yet. Expect breathtaking performances, stunning visual effects, and a full setlist spanning her entire discography.",
    seatCategories: [
      { name: "VVIP", price: 1500000, remaining: 12, total: 100, color: "#D4A017" },
      { name: "VIP", price: 850000, remaining: 45, total: 500, color: "#3D5898" },
      { name: "Festival A", price: 450000, remaining: 320, total: 2000, color: "#5B4A9A" },
      { name: "Festival B", price: 250000, remaining: 1840, total: 5000, color: "#7A8BB5" },
    ],
    guestStars: ["Raisa Andriana", "Tulus"],
    hasMerchandise: true,
    hasVIP: true,
    vipBenefits: ["Front-row access", "Meet & greet with artist (VVIP only)", "Exclusive merchandise bag", "Priority entrance", "Dedicated lounge area"],
    parkingInfo: "Parking available at Lot A, B, and C. Online booking recommended via the Katsera app. Additional parking at surrounding SCBD area.",
    faq: [
      { q: "What are the venue gates?", a: "Gates open at 17:00 WIB. Please arrive early to avoid queues." },
      { q: "Can I bring my camera?", a: "Personal cameras are allowed but professional equipment (tripods, detachable lenses) are not permitted." },
      { q: "Is there an age limit?", a: "All ages welcome. Children under 12 must be accompanied by an adult." },
      { q: "What if it rains?", a: "The event will proceed in all weather conditions. Outdoor areas may be affected — ponchos are recommended." },
    ],
  },
  {
    id: "workshop-1",
    type: "painting-workshop",
    creatorCategory: "painter",
    title: "Watercolor Landscape Workshop",
    date: "Sunday, 31 August 2026",
    time: "09:00 – 13:00 WIB",
    venue: "Andi Wijaya Studio",
    city: "Bandung",
    artistName: "Andi Wijaya",
    artistImg: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=80&h=80&fit=crop",
    coverImg: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=400&fit=crop",
    description: "Learn to paint stunning watercolor landscapes with award-winning painter Andi Wijaya. This 4-hour immersive workshop covers color theory, brush techniques, and composition — perfect for beginners and intermediate artists alike.",
    maxParticipants: 20,
    availableSeats: 7,
    fee: 450000,
    materials: ["Watercolor set (12+ colors)", "300gsm watercolor paper (provided)", "Brushes: flat, round, detail (provided)", "Pencil & eraser", "Water container (provided)", "Masking tape (provided)"],
    difficultyLevel: "All Levels",
    instructor: "Andi Wijaya — 15+ years experience, exhibited in Singapore, Tokyo, and Amsterdam",
  },
]

// ── Map icon helper ────────────────────────────────────────────────────────────
function MapPlaceholder({ venue }: { venue: string }) {
  return (
    <div className="w-full h-36 rounded-2xl overflow-hidden bg-[#E0E5F2] relative flex items-center justify-center">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 20px, #C8D0E8 20px, #C8D0E8 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, #C8D0E8 20px, #C8D0E8 21px)" }} />
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-[#3D5898] flex items-center justify-center shadow-lg">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="white" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2"/></svg>
        </div>
        <p className="text-[#3D5898] font-bold text-xs text-center max-w-32">{venue}</p>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function EventDetail() {
  const navigate = useNavigate()
  const location = useLocation()
  const eventFromState = (location.state as { event?: EventData })?.event
  const event = eventFromState ?? SAMPLE_EVENTS[0]

  const [saved, setSaved] = useState(false)
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  const [showBooking, setShowBooking] = useState(false)
  const [booking, setBooking] = useState<"idle" | "processing" | "success">("idle")
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [calendarAdded, setCalendarAdded] = useState(false)
  const [shareText, setShareText] = useState("Share")

  const isMusic = event.creatorCategory === "music"
  const selectedCat = event.seatCategories?.find((c) => c.name === selectedSeat)
  const total = selectedCat ? selectedCat.price * qty : (event.fee ?? 0) * qty

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: event.title, text: `Check out ${event.title} on Katsera!`, url: window.location.href }).catch(() => {})
    } else {
      setShareText("Link Copied!")
      setTimeout(() => setShareText("Share"), 2000)
    }
  }

  function handleAddCalendar() {
    setCalendarAdded(true)
    setTimeout(() => setCalendarAdded(false), 2000)
  }

  function handleBooking() {
    if (isMusic && !selectedSeat) return
    setShowBooking(true)
  }

  function confirmBooking() {
    setBooking("processing")
    setTimeout(() => setBooking("success"), 2500)
  }

  const capacity = event.maxParticipants ?? 0
  const seated = capacity - (event.availableSeats ?? 0)
  const seatPct = capacity > 0 ? (seated / capacity) * 100 : 0

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* ── Cover + Back ── */}
      <div className="relative h-56 flex-none">
        <img src={event.coverImg} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <button onClick={() => navigate(-1)} className="absolute top-12 left-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round"/></svg>
        </button>
        <div className="absolute top-12 right-4 flex gap-2">
          <button onClick={() => setSaved(!saved)} className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform">
            <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "white" : "none"} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          </button>
          <button onClick={handleShare} className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3" stroke="white" strokeWidth="1.8"/><circle cx="6" cy="12" r="3" stroke="white" strokeWidth="1.8"/><circle cx="18" cy="19" r="3" stroke="white" strokeWidth="1.8"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="white" strokeWidth="1.8"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="white" strokeWidth="1.8"/></svg>
          </button>
        </div>
        {/* Event type badge */}
        <div className="absolute bottom-4 left-4">
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#3D5898] text-white px-3 py-1 rounded-full">{event.type.replace(/-/g, " ")}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Title + artist */}
        <div className="bg-white px-5 pt-5 pb-4 shadow-sm">
          <h1 className="text-[#1E2D5A] font-extrabold text-xl leading-tight mb-3">{event.title}</h1>
          <div className="flex items-center gap-3">
            <img src={event.artistImg} alt={event.artistName} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-[#1E2D5A] font-bold text-sm">{event.artistName}</p>
              <p className="text-[#9BAACE] text-xs">Organizer</p>
            </div>
            <button onClick={() => navigate(`/fan/artist/1`)} className="ml-auto text-[#3D5898] text-xs font-bold bg-[#3D5898]/8 px-3 py-1.5 rounded-full active:scale-95 transition-transform">
              View Profile
            </button>
          </div>
        </div>

        <div className="px-4 pt-4 space-y-4">
          {/* Date / Time / Venue */}
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
            {[
              { icon: "📅", label: "Date", value: event.date },
              { icon: "🕖", label: "Time", value: event.time },
              { icon: "📍", label: "Venue", value: `${event.venue}, ${event.city}` },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-xl w-8 text-center">{icon}</span>
                <div>
                  <p className="text-[#9BAACE] text-xs">{label}</p>
                  <p className="text-[#1E2D5A] font-bold text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-[#1E2D5A] font-bold text-sm mb-2">About This Event</p>
            <p className="text-[#7A8BB5] text-sm leading-relaxed">{event.description}</p>
          </div>

          {/* ── MUSIC: Seat categories ── */}
          {isMusic && event.seatCategories && (
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-[#1E2D5A] font-bold text-sm mb-3">Select Ticket Category</p>
              <div className="space-y-2.5">
                {event.seatCategories.map((cat) => {
                  const isSelected = selectedSeat === cat.name
                  const soldPct = ((cat.total - cat.remaining) / cat.total) * 100
                  return (
                    <button key={cat.name} onClick={() => setSelectedSeat(cat.name)} className={`w-full rounded-2xl p-3.5 text-left transition-all active:scale-[0.99] border-2 ${isSelected ? "border-[#3D5898] bg-[#3D5898]/5" : "border-transparent bg-[#F4F5F9]"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full flex-none" style={{ background: cat.color }} />
                          <span className="text-[#1E2D5A] font-bold text-sm">{cat.name}</span>
                          {cat.remaining < 50 && <span className="text-[10px] text-red-500 font-bold bg-red-50 px-1.5 py-0.5 rounded-full">Low Stock</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#3D5898] font-extrabold text-sm">Rp {cat.price.toLocaleString("id-ID")}</span>
                          {isSelected && <div className="w-5 h-5 rounded-full bg-[#3D5898] flex items-center justify-center"><svg width="10" height="10" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 2 4 7 1 4"/></svg></div>}
                        </div>
                      </div>
                      <div className="h-1.5 bg-[#E0E5F2] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${soldPct}%`, background: cat.color }} />
                      </div>
                      <p className="text-[#9BAACE] text-[10px] mt-1">{cat.remaining.toLocaleString()} remaining of {cat.total.toLocaleString()}</p>
                    </button>
                  )
                })}
              </div>

              {selectedSeat && (
                <div className="mt-3 flex items-center justify-between bg-[#F4F5F9] rounded-xl px-4 py-2.5">
                  <span className="text-[#1E2D5A] text-sm font-bold">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-7 h-7 rounded-full bg-[#E0E5F2] flex items-center justify-center active:scale-95">
                      <svg width="12" height="12" fill="none" stroke="#1E2D5A" strokeWidth="2.5" strokeLinecap="round"><line x1="2" y1="6" x2="10" y2="6"/></svg>
                    </button>
                    <span className="text-[#1E2D5A] font-extrabold text-base w-5 text-center">{qty}</span>
                    <button onClick={() => setQty(Math.min(10, qty + 1))} className="w-7 h-7 rounded-full bg-[#3D5898] flex items-center justify-center active:scale-95">
                      <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="6" y1="2" x2="6" y2="10"/><line x1="2" y1="6" x2="10" y2="6"/></svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── PAINTER: Availability ── */}
          {!isMusic && (
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[#1E2D5A] font-bold text-sm">Workshop Details</p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${(event.availableSeats ?? 0) > 5 ? "text-green-600 bg-green-50" : "text-red-500 bg-red-50"}`}>{event.availableSeats} seats left</span>
              </div>
              <div className="space-y-2 mb-3">
                {[
                  { label: "Max Participants", value: `${event.maxParticipants} people` },
                  { label: "Workshop Fee", value: `Rp ${(event.fee ?? 0).toLocaleString("id-ID")}` },
                  { label: "Difficulty", value: event.difficultyLevel ?? "All Levels" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-[#9BAACE] text-xs">{label}</span>
                    <span className="text-[#1E2D5A] font-bold text-xs">{value}</span>
                  </div>
                ))}
              </div>
              <div className="h-2 bg-[#E0E5F2] rounded-full overflow-hidden">
                <div className="h-full bg-[#3D5898] rounded-full" style={{ width: `${seatPct}%` }} />
              </div>
              <p className="text-[#9BAACE] text-[10px] mt-1">{seated} registered · {event.availableSeats} remaining</p>
            </div>
          )}

          {/* ── PAINTER: Materials ── */}
          {!isMusic && event.materials && (
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-[#1E2D5A] font-bold text-sm mb-3">Required Materials</p>
              <div className="space-y-1.5">
                {event.materials.map((m) => (
                  <div key={m} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3D5898] flex-none mt-1.5" />
                    <p className="text-[#7A8BB5] text-xs">{m}</p>
                  </div>
                ))}
              </div>
              {event.instructor && (
                <div className="mt-3 pt-3 border-t border-[#F0F2F8]">
                  <p className="text-[#1E2D5A] font-bold text-xs mb-1">Instructor</p>
                  <p className="text-[#7A8BB5] text-xs">{event.instructor}</p>
                </div>
              )}
            </div>
          )}

          {/* ── MUSIC: Guest stars ── */}
          {isMusic && event.guestStars && event.guestStars.length > 0 && (
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-[#1E2D5A] font-bold text-sm mb-3">Guest Stars ⭐</p>
              <div className="flex gap-3">
                {event.guestStars.map((g) => (
                  <div key={g} className="flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 rounded-full bg-[#3D5898]/10 flex items-center justify-center">
                      <span className="text-xl">🎤</span>
                    </div>
                    <p className="text-[#1E2D5A] font-bold text-[10px] text-center">{g}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── MUSIC: VIP Benefits ── */}
          {isMusic && event.hasVIP && event.vipBenefits && (
            <div className="bg-gradient-to-br from-[#D4A017]/10 to-[#D4A017]/5 rounded-2xl p-4 border border-[#D4A017]/20">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">👑</span>
                <p className="text-[#1E2D5A] font-bold text-sm">VIP / VVIP Benefits</p>
              </div>
              <div className="space-y-1.5">
                {event.vipBenefits.map((b) => (
                  <div key={b} className="flex items-center gap-2">
                    <svg width="12" height="12" fill="none" stroke="#D4A017" strokeWidth="2.5" strokeLinecap="round"><polyline points="10 2 5 7 2 4"/></svg>
                    <p className="text-[#7A8BB5] text-xs">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── MUSIC: Merchandise ── */}
          {isMusic && event.hasMerchandise && (
            <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3D5898]/8 flex items-center justify-center text-xl flex-none">🛍️</div>
              <div className="flex-1">
                <p className="text-[#1E2D5A] font-bold text-sm">Merchandise Booth</p>
                <p className="text-[#9BAACE] text-xs">Official merch available at the venue</p>
              </div>
              <button onClick={() => navigate("/fan/shop")} className="text-[#3D5898] text-xs font-bold active:opacity-60">View →</button>
            </div>
          )}

          {/* ── MUSIC: Parking ── */}
          {isMusic && event.parkingInfo && (
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">🚗</span>
                <p className="text-[#1E2D5A] font-bold text-sm">Parking Information</p>
              </div>
              <p className="text-[#7A8BB5] text-xs leading-relaxed">{event.parkingInfo}</p>
            </div>
          )}

          {/* Maps */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[#1E2D5A] font-bold text-sm">Location</p>
              <button className="text-[#3D5898] text-xs font-bold active:opacity-60">Open Maps →</button>
            </div>
            <MapPlaceholder venue={event.venue} />
            <p className="text-[#9BAACE] text-xs mt-2 text-center">{event.venue}, {event.city}</p>
          </div>

          {/* Add to calendar */}
          <button onClick={handleAddCalendar} className={`w-full rounded-2xl py-3.5 flex items-center justify-center gap-2 font-bold text-sm transition-all active:scale-[0.98] ${calendarAdded ? "bg-green-100 text-green-700" : "bg-white shadow-sm text-[#1E2D5A]"}`}>
            {calendarAdded
              ? <><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="14 2 6 10 2 6"/></svg>Added to Calendar!</>
              : <><span>📅</span>Add to Calendar</>
            }
          </button>

          {/* ── MUSIC: FAQ ── */}
          {isMusic && event.faq && event.faq.length > 0 && (
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-[#1E2D5A] font-bold text-sm mb-3">FAQ</p>
              <div className="space-y-2">
                {event.faq.map((item, i) => (
                  <div key={i} className="border-b border-[#F0F2F8] last:border-0 pb-2 last:pb-0">
                    <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between py-1.5 text-left active:opacity-60 transition-opacity">
                      <span className="text-[#1E2D5A] font-bold text-xs pr-3">{item.q}</span>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className={`flex-none transition-transform ${faqOpen === i ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6" stroke="#9BAACE" strokeWidth="2" strokeLinecap="round"/></svg>
                    </button>
                    {faqOpen === i && <p className="text-[#7A8BB5] text-xs leading-relaxed pb-1">{item.a}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[#9BAACE] text-xs">{isMusic ? "Starting from" : "Workshop fee"}</p>
            <p className="text-[#3D5898] font-extrabold text-lg">
              {selectedCat
                ? `Rp ${(selectedCat.price * qty).toLocaleString("id-ID")}`
                : isMusic
                  ? `Rp ${(event.seatCategories?.[event.seatCategories.length - 1]?.price ?? 0).toLocaleString("id-ID")}`
                  : `Rp ${(event.fee ?? 0).toLocaleString("id-ID")}`
              }
            </p>
          </div>
          <button onClick={handleBooking} disabled={isMusic && !selectedSeat} className="flex-none px-8 py-3.5 rounded-full bg-[#3D5898] text-white font-extrabold text-sm active:scale-95 transition-all disabled:opacity-40 shadow-md">
            {isMusic ? "Buy Ticket" : "Register Now"}
          </button>
        </div>
        {isMusic && !selectedSeat && <p className="text-[#9BAACE] text-[10px] text-center">Select a seat category to continue</p>}
      </div>

      {/* ── Booking sheet ── */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-5">
            <div className="w-10 h-1 rounded-full bg-[#E0E5F2] mx-auto mb-5" />

            {booking === "idle" && (
              <>
                <p className="text-[#1E2D5A] font-extrabold text-base mb-4">{isMusic ? "Order Summary" : "Registration Summary"}</p>
                <div className="bg-[#F4F5F9] rounded-2xl p-4 space-y-2 mb-4">
                  <div className="flex justify-between"><span className="text-[#7A8BB5] text-sm">{event.title.slice(0, 30)}…</span></div>
                  {isMusic && selectedCat && (
                    <>
                      <div className="flex justify-between"><span className="text-[#9BAACE] text-xs">Category</span><span className="text-[#1E2D5A] font-bold text-xs">{selectedCat.name}</span></div>
                      <div className="flex justify-between"><span className="text-[#9BAACE] text-xs">Qty</span><span className="text-[#1E2D5A] font-bold text-xs">{qty} ticket{qty > 1 ? "s" : ""}</span></div>
                    </>
                  )}
                  <div className="border-t border-[#E0E5F2] pt-2 flex justify-between">
                    <span className="text-[#1E2D5A] font-bold text-sm">Total</span>
                    <span className="text-[#3D5898] font-extrabold text-sm">Rp {total.toLocaleString("id-ID")}</span>
                  </div>
                </div>
                <button onClick={confirmBooking} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-transform shadow-md mb-2">
                  Confirm & Pay
                </button>
                <button onClick={() => setShowBooking(false)} className="w-full py-3 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-bold text-sm active:scale-95 transition-transform">Cancel</button>
              </>
            )}

            {booking === "processing" && (
              <div className="flex flex-col items-center py-12 gap-4">
                <div className="w-14 h-14 rounded-full border-4 border-[#3D5898]/30 border-t-[#3D5898] animate-spin" />
                <p className="text-[#1E2D5A] font-extrabold text-base">Processing payment…</p>
                <p className="text-[#9BAACE] text-sm">Please wait a moment</p>
              </div>
            )}

            {booking === "success" && (
              <div className="flex flex-col items-center py-8 gap-3">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <svg width="36" height="36" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"><polyline points="30 8 14 24 6 16"/></svg>
                </div>
                <p className="text-[#1E2D5A] font-extrabold text-xl">{isMusic ? "Ticket Booked!" : "Registration Confirmed!"}</p>
                <p className="text-[#7A8BB5] text-sm text-center">Check your email for the {isMusic ? "e-ticket" : "confirmation"}. See you there! 🎉</p>
                <div className="bg-[#F4F5F9] rounded-2xl p-3 w-full text-center">
                  <p className="text-[#9BAACE] text-xs">Booking Reference</p>
                  <p className="text-[#1E2D5A] font-extrabold text-sm">#EVT-{Math.random().toString(36).slice(2, 8).toUpperCase()}</p>
                </div>
                <button onClick={() => { setShowBooking(false); navigate("/fan/events") }} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-transform shadow-md">
                  View My Tickets →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
