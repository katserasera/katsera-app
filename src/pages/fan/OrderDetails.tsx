import { useState } from "react"
import { useNavigate, useLocation, useParams } from "react-router-dom"

function fmt(n: number) {
  return "Rp" + n.toLocaleString("id-ID")
}

const fallbackOrder = {
  id: "KAT-20260715-001",
  title: "World Tour Tee 2025",
  artist: "Nadin Amizah",
  date: "Jul 15, 2026",
  amount: 185000,
  status: "Completed",
  img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&h=120&fit=crop",
  items: 1,
  paymentMethod: "GoPay",
}

export default function OrderDetails() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  const order = (location.state as { order: typeof fallbackOrder })?.order || { ...fallbackOrder, id: id || fallbackOrder.id }

  const shipping = 15000
  const subtotal = order.amount - shipping
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  function handleDownload() {
    setDownloading(true)
    setTimeout(() => { setDownloading(false); setDownloaded(true) }, 1800)
  }

  const statusColor: Record<string, string> = {
    Completed: "text-green-600 bg-green-50",
    Pending: "text-amber-600 bg-amber-50",
    Refunded: "text-red-500 bg-red-50",
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-transform">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span className="text-[#1E2D5A] font-extrabold text-lg flex-1">Order Details</span>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor[order.status] || "text-[#7A8BB5] bg-[#F4F5F9]"}`}>{order.status}</span>
      </div>

      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto pb-32">
        {/* Order ID */}
        <div className="bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-[#7A8BB5] mb-0.5">Order ID</p>
            <p className="font-bold text-[#1E2D5A] text-sm">{order.id}</p>
          </div>
          <button
            onClick={() => navigator.clipboard?.writeText(order.id)}
            className="w-8 h-8 rounded-full bg-[#F4F5F9] flex items-center justify-center active:scale-95 transition-transform"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" stroke="#7A8BB5" strokeWidth="1.8"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="#7A8BB5" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Item */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-[#1E2D5A] text-sm mb-3">Purchased Item</p>
          <div className="flex gap-3">
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-none bg-[#F4F5F9]">
              <img src={order.img} alt={order.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-[#1E2D5A] font-bold text-sm leading-snug">{order.title}</p>
              <p className="text-[#7A8BB5] text-xs mt-0.5">{order.artist}</p>
              <p className="text-[#3D5898] font-extrabold text-sm mt-1">{fmt(subtotal)}</p>
            </div>
          </div>
        </div>

        {/* Billing summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
          <p className="font-bold text-[#1E2D5A] text-sm mb-1">Billing Summary</p>
          <div className="flex justify-between text-sm"><span className="text-[#7A8BB5]">Subtotal</span><span className="font-semibold text-[#1E2D5A]">{fmt(subtotal)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-[#7A8BB5]">Shipping</span><span className="font-semibold text-[#1E2D5A]">{fmt(shipping)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-[#7A8BB5]">Discount</span><span className="font-semibold text-green-600">-{fmt(0)}</span></div>
          <div className="border-t border-[#F4F5F9] pt-2 flex justify-between">
            <span className="font-bold text-[#1E2D5A]">Total</span>
            <span className="font-extrabold text-[#3D5898] text-base">{fmt(order.amount)}</span>
          </div>
        </div>

        {/* Payment method */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-[#1E2D5A] text-sm mb-2">Payment Method</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F4F5F9] flex items-center justify-center">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" stroke="#3D5898" strokeWidth="1.8"/><path d="M1 10h22" stroke="#3D5898" strokeWidth="1.8"/></svg>
            </div>
            <div>
              <p className="text-[#1E2D5A] font-bold text-sm">{order.paymentMethod}</p>
              <p className="text-[#7A8BB5] text-xs">{order.date}</p>
            </div>
            <span className="ml-auto text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">Paid</span>
          </div>
        </div>

        {/* Delivery info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-[#1E2D5A] text-sm mb-2">Delivery Address</p>
          <div className="flex gap-2 items-start">
            <svg className="mt-0.5 flex-none" width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#3D5898" strokeWidth="2"/><circle cx="12" cy="9" r="2.5" stroke="#3D5898" strokeWidth="2"/></svg>
            <p className="text-[#7A8BB5] text-xs leading-relaxed">Jl. Sudirman No. 12, Jakarta Pusat, DKI Jakarta 10220</p>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] px-4 py-4 space-y-2.5">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full py-3.5 rounded-full bg-[#3D5898] text-white font-extrabold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-60"
        >
          {downloading ? (
            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Generating Invoice...</>
          ) : downloaded ? (
            <><svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>Invoice Downloaded</>
          ) : (
            <><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Download Invoice</>
          )}
        </button>
        <button
          onClick={() => navigate("/artist/help/contact")}
          className="w-full py-3.5 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-extrabold text-sm active:scale-95 transition-transform"
        >
          Contact Support
        </button>
      </div>
    </div>
  )
}
