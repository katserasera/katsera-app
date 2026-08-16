import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

function fmt(n: number) { return "Rp" + n.toLocaleString("id-ID") }

export default function ShopPayment() {
  const navigate = useNavigate()
  const location = useLocation()
  const { total, product } = (location.state as { total: number; product: { name: string; image: string } }) || { total: 164000, product: { name: "T-Shirt Official", image: "👕" } }
  const [method, setMethod] = useState<string | null>(null)
  const [paying, setPaying] = useState(false)

  const methods = [
    { id: "bca", label: "BCA Virtual Account", icon: "🏦" },
    { id: "mandiri", label: "Mandiri Virtual Account", icon: "🏧" },
    { id: "qris", label: "QRIS", icon: "📱" },
  ]

  const handlePay = () => {
    if (!method) return
    setPaying(true)
    setTimeout(() => navigate("/fan/shop/done"), 1500)
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span className="text-[#1E2D5A] font-extrabold text-lg">Payment</span>
      </div>

      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto pb-32">
        {/* Order card */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#3D5898]/10 to-[#3D5898]/20 flex items-center justify-center text-3xl flex-none">
            {product.image}
          </div>
          <div className="flex-1">
            <p className="text-xs text-[#7A8BB5] font-semibold">Order</p>
            <p className="text-sm font-bold text-[#1E2D5A] line-clamp-2">{product.name}</p>
          </div>
          <span className="text-[#3D5898] font-extrabold text-base">{fmt(total)}</span>
        </div>

        {/* Payment methods */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-[#1E2D5A] text-sm mb-3">Metode Pembayaran</p>
          <div className="space-y-2">
            {methods.map((m) => (
              <label key={m.id} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all" style={{ background: method === m.id ? "#F0F3FA" : "#F4F5F9" }}>
                <input type="radio" name="method" onChange={() => setMethod(m.id)} className="accent-[#3D5898]" />
                <span className="text-lg">{m.icon}</span>
                <span className="text-sm font-semibold text-[#1E2D5A]">{m.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="font-bold text-[#1E2D5A]">Total Bayar</span>
            <span className="font-extrabold text-[#3D5898] text-xl">{fmt(total)}</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] px-5 py-4">
        <button
          onClick={handlePay}
          disabled={!method || paying}
          className={`w-full py-4 rounded-full font-extrabold text-base transition-all active:scale-95 ${method && !paying ? "bg-[#3D5898] text-white" : "bg-[#C8D0E8] text-[#7A8BB5] cursor-not-allowed"}`}
        >
          {paying ? "Processing…" : method ? "Bayar Sekarang" : "Pilih Metode Pembayaran"}
        </button>
      </div>
    </div>
  )
}
