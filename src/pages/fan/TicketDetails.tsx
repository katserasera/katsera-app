import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const fallback = {
  id: "TKT-20260901-001",
  event: "Semua Aku Dirayakan",
  artist: "Nadin Amizah",
  date: "Sep 1, 2026",
  time: "19:00 WIB",
  venue: "Jakarta International Expo, Hall A",
  status: "Upcoming",
  ticketType: "Standing GOLD",
  seat: "G-204",
  price: 750000,
  banner: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=300&fit=crop",
}

// QR code rendered as SVG pattern
function QRCode({ value }: { value: string }) {
  const size = 200
  const cells = 21
  const cell = size / cells
  // Deterministic pseudo-random pattern from value
  const hash = value.split("").reduce((a, c) => a * 31 + c.charCodeAt(0), 7)
  const grid: boolean[][] = Array.from({ length: cells }, (_, r) =>
    Array.from({ length: cells }, (_, c) => {
      // Finder patterns
      if ((r < 7 && c < 7) || (r < 7 && c >= cells - 7) || (r >= cells - 7 && c < 7)) return true
      return ((hash + r * cells + c) * 2654435769) % 4 < 2
    })
  )
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-xl">
      <rect width={size} height={size} fill="white" rx="8" />
      {grid.map((row, r) =>
        row.map((on, c) =>
          on ? <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#1E2D5A" /> : null
        )
      )}
    </svg>
  )
}

export default function TicketDetails() {
  const navigate = useNavigate()
  const location = useLocation()
  const ticket = (location.state as { ticket: typeof fallback })?.ticket || fallback

  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [shared, setShared] = useState(false)

  function handleDownload() {
    setDownloading(true)
    setTimeout(() => { setDownloading(false); setDownloaded(true) }, 1800)
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: ticket.event, text: `My ticket for ${ticket.event}`, url: window.location.href }).catch(() => {})
    } else {
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    }
  }

  const statusStyle: Record<string, string> = {
    Upcoming: "text-[#3D5898] bg-blue-50",
    Completed: "text-green-600 bg-green-50",
    Cancelled: "text-red-500 bg-red-50",
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-transform">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span className="text-[#1E2D5A] font-extrabold text-lg flex-1">My Ticket</span>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusStyle[ticket.status] || "text-[#7A8BB5] bg-[#F4F5F9]"}`}>{ticket.status}</span>
      </div>

      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto pb-32">
        {/* Ticket card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          {/* Banner */}
          <div className="h-36 relative">
            <img src={ticket.banner} alt={ticket.event} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-white font-extrabold text-lg leading-tight">{ticket.event}</p>
              <p className="text-white/80 text-xs">{ticket.artist}</p>
            </div>
          </div>

          {/* Dashed divider */}
          <div className="flex items-center px-4 py-2">
            <div className="flex-1 border-t-2 border-dashed border-[#E0E5F2]" />
            <div className="w-5 h-5 rounded-full bg-[#E8E8E8] mx-2 flex-none" />
            <div className="flex-1 border-t-2 border-dashed border-[#E0E5F2]" />
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center px-4 pb-4 gap-3">
            {ticket.status === "Cancelled" ? (
              <div className="w-[200px] h-[200px] bg-[#F4F5F9] rounded-xl flex flex-col items-center justify-center gap-2">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#C8D0E8" strokeWidth="1.8"/><line x1="15" y1="9" x2="9" y2="15" stroke="#C8D0E8" strokeWidth="2" strokeLinecap="round"/><line x1="9" y1="9" x2="15" y2="15" stroke="#C8D0E8" strokeWidth="2" strokeLinecap="round"/></svg>
                <p className="text-[#C8D0E8] font-bold text-sm">Ticket Cancelled</p>
              </div>
            ) : (
              <QRCode value={ticket.id} />
            )}
            <p className="text-xs text-[#7A8BB5] font-semibold">{ticket.id}</p>
          </div>
        </div>

        {/* Event details */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <p className="font-bold text-[#1E2D5A] text-sm">Event Information</p>
          {[
            ["Date", ticket.date],
            ["Time", ticket.time],
            ["Venue", ticket.venue],
            ["Ticket Type", ticket.ticketType],
            ["Seat / Zone", ticket.seat],
            ["Price", "Rp" + ticket.price.toLocaleString("id-ID")],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <span className="text-xs text-[#7A8BB5] font-semibold">{label}</span>
              <span className="text-xs text-[#1E2D5A] font-bold text-right max-w-[60%]">{value}</span>
            </div>
          ))}
        </div>

        {/* Venue info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-[#1E2D5A] text-sm mb-2">Venue Information</p>
          <div className="flex gap-2">
            <svg className="mt-0.5 flex-none" width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#3D5898" strokeWidth="2"/><circle cx="12" cy="9" r="2.5" stroke="#3D5898" strokeWidth="2"/></svg>
            <div>
              <p className="text-sm font-bold text-[#1E2D5A]">{ticket.venue}</p>
              <p className="text-xs text-[#7A8BB5] mt-0.5">Gates open 1 hour before showtime. No re-entry after 21:00.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] px-4 py-4 flex gap-3">
        <button
          onClick={handleShare}
          className="flex-1 py-3.5 rounded-full border-2 border-[#3D5898] text-[#3D5898] font-extrabold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          {shared ? "Link Copied!" : (
            <><svg width="15" height="15" fill="none" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2"/><circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2"/><circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" strokeWidth="2"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor" strokeWidth="2"/></svg>Share</>
          )}
        </button>
        <button
          onClick={handleDownload}
          disabled={downloading || ticket.status === "Cancelled"}
          className="flex-1 py-3.5 rounded-full bg-[#3D5898] text-white font-extrabold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
        >
          {downloading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : downloaded ? (
            <><svg width="15" height="15" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>Saved!</>
          ) : (
            <><svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Download</>
          )}
        </button>
      </div>
    </div>
  )
}
