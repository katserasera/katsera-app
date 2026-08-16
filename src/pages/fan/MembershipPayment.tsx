import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

function fmt(n: number) { return "Rp" + n.toLocaleString("id-ID") }

export default function MembershipPayment() {
  const navigate = useNavigate()
  const location = useLocation()
  const { pkg, billing, price } = (location.state as { pkg: { name: string; price: number }; billing: string; price: number }) || {
    pkg: { name: "Prime", price: 35000 },
    billing: "monthly",
    price: 35000,
  }

  const [method, setMethod] = useState<string | null>("qris")
  const [paying, setPaying] = useState(false)

  const methods = [
    { id: "bca", label: "BCA Virtual Account", logo: "🏦" },
    { id: "mandiri", label: "Mandiri Virtual Account", logo: "🏧" },
    { id: "qris", label: "QRIS", logo: "📱" },
  ]

  const handlePay = () => {
    if (!method) return
    setPaying(true)
    setTimeout(() => navigate("/fan/membership/activate", { state: { pkg, billing } }), 1500)
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-[#1E2D5A] font-extrabold text-lg">Payment Method</span>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto pb-32">
        {/* Package summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-[#7A8BB5] font-semibold">MEMBERSHIP</p>
            <p className="font-extrabold text-[#1E2D5A]">{pkg.name} Package</p>
            <p className="text-xs text-[#7A8BB5]">{billing === "annually" ? "Annually" : "Monthly"}</p>
          </div>
          <span className="font-extrabold text-[#3D5898] text-lg">{pkg.price === 0 ? "Gratis" : `${fmt(price)}rb`}</span>
        </div>

        {/* Payment methods */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-[#1E2D5A] text-sm mb-3">Metode pembayaran</p>
          <div className="space-y-2">
            {methods.map((m) => (
              <label key={m.id} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all" style={{ background: method === m.id ? "#F0F3FA" : "#F4F5F9" }}>
                <input
                  type="radio"
                  name="method"
                  checked={method === m.id}
                  onChange={() => setMethod(m.id)}
                  className="accent-[#3D5898]"
                />
                <span className="text-lg">{m.logo}</span>
                <span className="text-sm font-semibold text-[#1E2D5A]">{m.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="font-bold text-[#1E2D5A]">Total bayar</span>
            <span className="font-extrabold text-[#3D5898] text-xl">{pkg.price === 0 ? "Gratis" : fmt(price * 1000)}</span>
          </div>
        </div>
      </div>

      {/* Bottom nav placeholder */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md">
        {/* mini bottom nav */}
        <div className="bg-white border-t border-[#E8E8E8] flex mb-0">
          {[
            { key: "home", label: "Home", path: "/fan/home", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg> },
            { key: "shop", label: "Shop", path: "/fan/shop", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
            { key: "channel", label: "Channel", path: "/fan/channel", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="15" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 3l-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
            { key: "more", label: "More", path: "/fan/home", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/><circle cx="5" cy="12" r="1" fill="currentColor"/></svg> },
          ].map((t) => (
            <button key={t.key} onClick={() => navigate(t.path)} className="flex-1 flex flex-col items-center py-2.5 gap-0.5 text-[#7A8BB5]">
              {t.icon}
              <span className="text-[10px] font-bold">{t.label}</span>
            </button>
          ))}
        </div>
        <div className="bg-white px-5 pb-5 pt-3 border-t border-[#E8E8E8]">
          <button
            onClick={handlePay}
            disabled={!method || paying}
            className={`w-full py-4 rounded-full font-extrabold text-base transition-all active:scale-95 ${method && !paying ? "bg-[#3D5898] text-white" : "bg-[#C8D0E8] text-[#7A8BB5] cursor-not-allowed"}`}
          >
            {paying ? "Memproses…" : "Payment"}
          </button>
        </div>
      </div>
    </div>
  )
}
