import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

function fmt(n: number) { return "Rp" + n.toLocaleString("id-ID") }

export default function ConcertPayment() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as { category: { label: string; price: number }; qty: number } | null
  const cat = state?.category || { label: "Festival", price: 870000 }
  const qty = state?.qty || 1
  const total = cat.price * qty

  const [method, setMethod] = useState<string | null>(null)
  const [paying, setPaying] = useState(false)

  const methods = [
    { id: "bca", label: "BCA Virtual Account", logo: "🏦" },
    { id: "mandiri", label: "Mandiri Virtual Account", logo: "🏧" },
    { id: "qris", label: "QRIS", logo: "📱" },
  ]

  const handlePay = () => {
    if (!method) return
    setPaying(true)
    setTimeout(() => navigate("/fan/concert/done"), 1500)
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span className="text-[#1E2D5A] font-extrabold text-lg">Pembayaran</span>
      </div>

      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto pb-32">
        {/* Concert ticket summary */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="relative h-36 bg-gradient-to-br from-[#3D5898] to-[#1E2D5A] flex items-center justify-center">
            <div className="text-center text-white">
              <p className="font-extrabold text-xl italic">Nadin Amizah</p>
              <p className="text-sm opacity-80">'Semua Aku Tanyakan'</p>
            </div>
            <div className="absolute top-2 right-2 bg-black/30 rounded-lg px-2 py-1">
              <p className="text-white text-[10px] font-bold">Gelora Bung Karno</p>
              <p className="text-white text-[9px] opacity-70">22 Oktober 2026</p>
            </div>
          </div>
          <div className="p-4 space-y-2">
            <div className="flex justify-between items-center">
              <p className="font-extrabold text-[#1E2D5A]">Gelora Bung Karno</p>
              <p className="text-xs text-[#7A8BB5]">22 Oktober 2026 · 20.00 WIB</p>
            </div>
            <div className="border-t border-[#F4F5F9] pt-2 space-y-1 text-xs text-[#7A8BB5]">
              <p className="font-bold text-[#1E2D5A]">{cat.label} · {qty} Tiket</p>
              <p>🔒 Tidak bisa refund</p>
              <p>📅 Berlaku di tanggal yang tertera</p>
            </div>
          </div>
        </div>

        {/* Methods */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-[#1E2D5A] text-sm mb-3">Metode Pembayaran</p>
          <div className="space-y-2">
            {methods.map((m) => (
              <label key={m.id} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all" style={{ background: method === m.id ? "#F0F3FA" : "#F4F5F9" }}>
                <input type="radio" name="method" onChange={() => setMethod(m.id)} className="accent-[#3D5898]" />
                <span className="text-lg">{m.logo}</span>
                <span className="text-sm font-semibold text-[#1E2D5A]">{m.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center">
          <span className="font-bold text-[#1E2D5A]">Total Pembayaran</span>
          <span className="font-extrabold text-[#3D5898] text-xl">{fmt(total)}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] px-5 py-4">
        <button
          onClick={handlePay}
          disabled={!method || paying}
          className={`w-full py-4 rounded-full font-extrabold text-base transition-all active:scale-95 ${method && !paying ? "bg-[#3D5898] text-white" : "bg-[#C8D0E8] text-[#7A8BB5] cursor-not-allowed"}`}
        >
          {paying ? "Memproses…" : method ? "Bayar Sekarang" : "Metode pembayaran belum dipilih"}
        </button>
      </div>
    </div>
  )
}
