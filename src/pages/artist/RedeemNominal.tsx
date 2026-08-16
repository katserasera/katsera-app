import { useState } from "react"
import { useNavigate } from "react-router-dom"

function fmt(n: number) { return "Rp" + n.toLocaleString("id-ID") }

export default function RedeemNominal() {
  const navigate = useNavigate()
  const balance = 27000000
  const [amount, setAmount] = useState("2000000")
  const parsed = parseInt(amount.replace(/\D/g, "") || "0")
  const valid = parsed >= 100000 && parsed <= balance

  const quickAmounts = [500000, 1000000, 2000000, 5000000]

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Logo header */}
      <div className="flex justify-center pt-12 pb-4">
        <svg width="32" height="37" viewBox="0 0 60 69" fill="none">
          <path d="M10 8 L10 61" stroke="#3D5898" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 34 L48 10" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 34 L48 60" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div className="flex-1 px-5 pb-28">
        <h1 className="text-[#3D5898] font-extrabold text-xl mb-5">REEDEM EARNINGS</h1>

        {/* Balance card */}
        <div className="bg-[#3D5898] rounded-2xl p-5 flex items-center justify-between mb-6 shadow-lg">
          <div>
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">SALDO TERSEDIA</p>
            <p className="text-white font-extrabold text-2xl">{fmt(balance)}</p>
          </div>
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <rect x="2" y="5" width="20" height="14" rx="3" stroke="white" strokeWidth="2" fillOpacity="0.2" fill="white"/>
            <path d="M2 10h20" stroke="white" strokeWidth="2"/>
            <circle cx="17" cy="16" r="2" fill="white"/>
          </svg>
        </div>

        {/* Amount input */}
        <div className="mb-2">
          <p className="text-[#7A8BB5] font-semibold text-sm mb-2">Nominal Penarikan</p>
          <div className="bg-white rounded-2xl px-5 py-4 shadow-sm">
            <input
              value={amount ? `Rp${parseInt(amount.replace(/\D/g, "") || "0").toLocaleString("id-ID")}` : ""}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "")
                setAmount(raw)
              }}
              className="w-full text-[#3D5898] font-extrabold text-xl outline-none bg-transparent"
              placeholder="Rp0"
            />
          </div>
          {parsed > 0 && parsed < 100000 && (
            <div className="flex items-center gap-1.5 mt-2">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="#F59E0B" strokeWidth="2"/><line x1="12" y1="9" x2="12" y2="13" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/></svg>
              <span className="text-xs text-yellow-600 font-semibold">Minimal penarikan Rp100.000</span>
            </div>
          )}
        </div>

        {/* Quick amounts */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {quickAmounts.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(String(a))}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${parsed === a ? "bg-[#3D5898] text-white" : "bg-white text-[#3D5898] border border-[#C8D0E8]"}`}
            >
              {fmt(a)}
            </button>
          ))}
        </div>

        {/* Bank account */}
        <div className="mb-6">
          <p className="text-[#7A8BB5] font-semibold text-sm mb-2">Rekening Tujuan</p>
          <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#F4F5F9] flex items-center justify-center flex-none">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" stroke="#3D5898" strokeWidth="2"/><path d="M2 10h20" stroke="#3D5898" strokeWidth="2"/></svg>
            </div>
            <div className="flex-1">
              <p className="font-bold text-[#1E2D5A] text-sm">BCA</p>
              <p className="text-[#7A8BB5] text-xs">8420****129</p>
            </div>
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] px-5 py-4">
        <button
          disabled={!valid}
          onClick={() => navigate("/artist/redeem/confirm", { state: { amount: parsed } })}
          className={`w-full py-4 rounded-2xl font-extrabold text-base transition-all active:scale-95 flex items-center justify-center gap-2 ${valid ? "bg-[#3D5898] text-white" : "bg-[#C8D0E8] text-[#7A8BB5] cursor-not-allowed"}`}
        >
          Next
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M7 17L17 7M7 7h10v10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  )
}
