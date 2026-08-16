import { useState } from "react"
import { useNavigate } from "react-router-dom"

type FilterKey = "All" | "Completed" | "Pending" | "Refunded"

const orders = [
  {
    id: "KAT-20260715-001",
    title: "World Tour Tee 2025",
    artist: "Nadin Amizah",
    date: "Jul 15, 2026",
    amount: 185000,
    status: "Completed" as FilterKey,
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&h=120&fit=crop",
    items: 1,
    paymentMethod: "GoPay",
  },
  {
    id: "KAT-20260710-002",
    title: "Signed Photo Book",
    artist: "Bernadya",
    date: "Jul 10, 2026",
    amount: 450000,
    status: "Completed" as FilterKey,
    img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&h=120&fit=crop",
    items: 1,
    paymentMethod: "OVO",
  },
  {
    id: "KAT-20260705-003",
    title: "Official Lightstick + Hoodie Bundle",
    artist: "Reality Club",
    date: "Jul 5, 2026",
    amount: 600000,
    status: "Pending" as FilterKey,
    img: "https://images.unsplash.com/photo-1549298222-1c31e8915347?w=120&h=120&fit=crop",
    items: 2,
    paymentMethod: "Bank Transfer",
  },
  {
    id: "KAT-20260620-004",
    title: "Concert Ticket — Semua Aku Dirayakan",
    artist: "Nadin Amizah",
    date: "Jun 20, 2026",
    amount: 750000,
    status: "Refunded" as FilterKey,
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=120&h=120&fit=crop",
    items: 1,
    paymentMethod: "GoPay",
  },
]

const statusColor: Record<FilterKey, string> = {
  All: "",
  Completed: "text-green-600 bg-green-50",
  Pending: "text-amber-600 bg-amber-50",
  Refunded: "text-red-500 bg-red-50",
}

function fmt(n: number) {
  return "Rp" + n.toLocaleString("id-ID")
}

export default function OrderHistory() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<FilterKey>("All")
  const [search, setSearch] = useState("")
  const [loading] = useState(false)

  const filters: FilterKey[] = ["All", "Completed", "Pending", "Refunded"]

  const filtered = orders.filter((o) => {
    const matchStatus = filter === "All" || o.status === filter
    const q = search.toLowerCase()
    const matchSearch = !q || o.title.toLowerCase().includes(q) || o.artist.toLowerCase().includes(q) || o.id.toLowerCase().includes(q)
    return matchStatus && matchSearch
  })

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-transform">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-[#1E2D5A] font-extrabold text-lg flex-1">Order History</span>
        </div>
        {/* Search */}
        <div className="bg-[#F4F5F9] rounded-full flex items-center px-4 py-2.5 gap-2 mb-3">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="#7A8BB5" strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke="#7A8BB5" strokeWidth="2" strokeLinecap="round"/></svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="flex-1 bg-transparent text-sm text-[#1E2D5A] outline-none placeholder:text-[#7A8BB5]"
          />
          {search && <button onClick={() => setSearch("")} className="text-[#7A8BB5]"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>}
        </div>
        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${filter === f ? "bg-[#3D5898] text-white" : "bg-[#F4F5F9] text-[#7A8BB5]"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto pb-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-2 border-[#3D5898] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#7A8BB5] text-sm">Loading orders...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-20 h-20 rounded-full bg-[#F4F5F9] flex items-center justify-center">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#C8D0E8" strokeWidth="1.8"/><path d="M3 9h18M9 21V9" stroke="#C8D0E8" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <p className="text-[#1E2D5A] font-bold text-base">No orders found</p>
            <p className="text-[#7A8BB5] text-sm text-center px-8">
              {search ? `No results for "${search}"` : "You haven't placed any orders yet."}
            </p>
            {search && <button onClick={() => setSearch("")} className="px-5 py-2 rounded-full bg-[#3D5898] text-white text-sm font-bold">Clear Search</button>}
          </div>
        ) : (
          filtered.map((order) => (
            <button
              key={order.id}
              onClick={() => navigate(`/fan/orders/${order.id}`, { state: { order } })}
              className="w-full bg-white rounded-2xl shadow-sm p-4 flex gap-3 text-left active:scale-[0.98] transition-transform"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-none bg-[#F4F5F9]">
                <img src={order.img} alt={order.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <p className="text-[#1E2D5A] font-bold text-sm leading-tight line-clamp-2 flex-1">{order.title}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-none ${statusColor[order.status]}`}>{order.status}</span>
                </div>
                <p className="text-[#7A8BB5] text-xs mb-1">{order.artist}</p>
                <p className="text-[#9BAACE] text-xs mb-2">{order.date} · {order.id}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#3D5898] font-extrabold text-sm">{fmt(order.amount)}</span>
                  <span className="text-[#7A8BB5] text-xs flex items-center gap-1">
                    View Details
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#7A8BB5" strokeWidth="2" strokeLinecap="round"/></svg>
                  </span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
