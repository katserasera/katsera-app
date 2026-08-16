import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

function fmt(n: number) { return "Rp" + n.toLocaleString("id-ID") }

export default function ConcertData() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as { category: { label: string; price: number }; qty: number } | null
  const cat = state?.category || { label: "Festival", price: 870000 }
  const qty = state?.qty || 1

  const [form, setForm] = useState({ name: "", phone: "", email: "", idNum: "", gender: "male" })
  const [sameAsPurchaser, setSameAsPurchaser] = useState(true)

  const valid = form.name && form.phone && form.email && form.idNum

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span className="text-[#1E2D5A] font-extrabold text-lg">Informasi Diri</span>
      </div>

      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto pb-32">
        <p className="text-xs text-[#7A8BB5]">Pastikan seluruh data diisi dengan benar agar e-tiket dapat diterima melalui email pembeli.</p>

        {/* Purchaser form */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <p className="font-bold text-[#1E2D5A] text-sm">Detail Pemesanan</p>
          <input
            className="w-full bg-[#F4F5F9] rounded-full px-4 py-3 text-sm outline-none border border-[#C8D0E8] placeholder:text-[#7A8BB5]"
            placeholder="Nama Lengkap"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <div className="flex items-center gap-2 bg-[#F4F5F9] rounded-full border border-[#C8D0E8] px-4 py-3">
            <span className="text-sm text-[#3D5898] font-bold">🇮🇩</span>
            <input
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#7A8BB5]"
              placeholder="+62 811 1616 1618"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <input
            className="w-full bg-[#F4F5F9] rounded-full px-4 py-3 text-sm outline-none border border-[#C8D0E8] placeholder:text-[#7A8BB5]"
            placeholder="Email (martin_ma@gmail.com)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full bg-[#F4F5F9] rounded-full px-4 py-3 text-sm outline-none border border-[#C8D0E8] placeholder:text-[#7A8BB5]"
            placeholder="ID Number (SIM/KTP/Paspor/License)"
            value={form.idNum}
            onChange={(e) => setForm({ ...form, idNum: e.target.value })}
          />
          <div className="flex gap-4">
            {["male", "female"].map((g) => (
              <label key={g} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={() => setForm({ ...form, gender: g })} className="accent-[#3D5898]" />
                <span className="text-sm font-semibold text-[#1E2D5A]">{g === "male" ? "Male" : "Female"}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Viewer detail */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-[#1E2D5A] text-sm mb-2">Detail Penonton</p>
          <p className="text-xs text-[#7A8BB5] mb-3">Mohon mengisi detail penonton dengan benar untuk kelancaran acara.</p>
          <p className="text-xs font-semibold text-[#7A8BB5] mb-2">Tiket {qty} (pax)</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              onClick={() => setSameAsPurchaser(!sameAsPurchaser)}
              className={`w-11 h-6 rounded-full transition-all ${sameAsPurchaser ? "bg-[#3D5898]" : "bg-[#C8D0E8]"} relative`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${sameAsPurchaser ? "left-6" : "left-1"}`} />
            </div>
            <span className="text-xs text-[#7A8BB5]">Sama dengan pemesan</span>
          </label>
        </div>

        {/* Concert card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="relative h-32 bg-gradient-to-br from-[#3D5898] to-[#1E2D5A] flex items-center justify-center">
            <div className="text-center text-white">
              <p className="font-extrabold text-lg italic">Nadin Amizah</p>
              <p className="text-sm opacity-80">'Semua Aku Tanyakan'</p>
            </div>
            <div className="absolute top-2 right-2 bg-black/30 rounded-lg px-2 py-1">
              <p className="text-white text-[10px] font-bold">Gelora Bung Karno</p>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center border-b border-[#F4F5F9] pb-3 mb-3">
              <p className="font-extrabold text-[#1E2D5A]">Gelora Bung Karno</p>
              <div className="text-right">
                <p className="text-xs text-[#7A8BB5]">22 Oktober 2026</p>
                <p className="text-xs text-[#7A8BB5]">20.00 WIB</p>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-[#7A8BB5]">
              <p className="font-bold text-[#1E2D5A]">{cat.label} · {qty} Tiket</p>
              <p>🔒 Tidak bisa refund</p>
              <p>📅 Berlaku di tanggal yang tertera</p>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center">
          <span className="font-bold text-[#1E2D5A]">Total Pembayaran</span>
          <span className="font-extrabold text-[#3D5898] text-lg">{fmt(cat.price * qty)}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] px-5 py-4">
        <button
          disabled={!valid}
          onClick={() => navigate("/fan/concert/payment", { state: { ...state, form } })}
          className={`w-full py-4 rounded-full font-extrabold text-base transition-all active:scale-95 ${valid ? "bg-[#3D5898] text-white" : "bg-[#C8D0E8] text-[#7A8BB5] cursor-not-allowed"}`}
        >
          Lanjutkan pembayaran
        </button>
      </div>
    </div>
  )
}
