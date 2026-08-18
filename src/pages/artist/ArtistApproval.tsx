import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

function ApprovalIllustration({ isApproved }: { isApproved: boolean }) {
  return (
    <div className="flex items-center justify-center my-6">
      <div className="relative" style={{ width: 260, height: 220 }}>
        {/* Blue blob background */}
        <div
          className="absolute inset-0 transition-colors duration-500"
          style={{
            background: isApproved ? "#059669" : "#3D5898",
            borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
            transform: "scale(0.95)",
          }}
        />
        {/* Clipboard SVG */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="180" height="190" viewBox="0 0 180 200" fill="none">
            {/* Clipboard body */}
            <rect x="30" y="30" width="100" height="130" rx="8" fill="white" stroke={isApproved ? "#059669" : "#4A6BB5"} strokeWidth="2" />
            {/* Clipboard clip */}
            <rect x="65" y="22" width="30" height="20" rx="4" fill={isApproved ? "#059669" : "#4A6BB5"} />
            {/* Checkbox rows */}
            {[55, 80, 105, 130].map((y, i) => (
              <g key={i}>
                <rect x="44" y={y} width="16" height="16" rx="3" fill={isApproved || i < 3 ? (isApproved ? "#059669" : "#3D5898") : "none"} stroke={isApproved ? "#059669" : "#3D5898"} strokeWidth="2" />
                {(isApproved || i < 3) && (
                  <polyline points={`47,${y + 8} 52,${y + 13} 57,${y + 5}`} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                )}
                <rect x="68" y={y + 4} width="48" height="3" rx="1.5" fill="#D0D8EC" />
                <rect x="68" y={y + 10} width="32" height="3" rx="1.5" fill="#E8EDF7" />
              </g>
            ))}
            {/* Person */}
            <circle cx="148" cy="70" r="12" fill={isApproved ? "#065F46" : "#2D4270"} />
            <path d="M130 140 C130 115 166 115 166 140" fill={isApproved ? "#065F46" : "#2D4270"} />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function ArtistApproval() {
  const navigate = useNavigate()
  const location = useLocation()
  const isPainter = (location.state as { creatorType?: string })?.creatorType === "painter"

  const [isApproved, setIsApproved] = useState(() => {
    const user = JSON.parse(localStorage.getItem("katsera_user") || "{}")
    return Boolean(user.isApproved)
  })

  const handleApprove = () => {
    setIsApproved(true)
    const user = JSON.parse(localStorage.getItem("katsera_user") || "{}")
    const updated = { ...user, isApproved: true, role: "artist" }
    localStorage.setItem("katsera_user", JSON.stringify(updated))
  }

  const handleProceed = () => {
    navigate(isPainter ? "/painter/dashboard" : "/artist/dashboard")
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto px-6 pt-10 pb-8 font-[Nunito]">
      <div className="flex items-center justify-between mb-2">
        <span className="bg-[#3D5898] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
          Langkah 4 dari 4
        </span>
        <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${isApproved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
          {isApproved ? "✓ Disetujui (Approved)" : "⏳ Menunggu Approval"}
        </span>
      </div>

      <h1 className="text-[#1E2D5A] text-3xl font-extrabold mb-1">
        {isApproved ? "Akun Artis Disetujui!" : "Proses Verifikasi Artis"}
      </h1>
      <p className="text-[#7A8BB5] text-xs font-semibold">
        {isApproved
          ? "Selamat! Dokumen KTP & NPWP Anda telah disetujui oleh tim Katsera."
          : "Dokumen Anda sedang ditinjau oleh Admin Katsera untuk memastikan keaslian akun."}
      </p>

      <ApprovalIllustration isApproved={isApproved} />

      <div className="text-center mb-6 bg-white p-5 rounded-2xl border border-[#E0E5F2] shadow-sm">
        {isApproved ? (
          <div>
            <p className="text-emerald-700 font-extrabold text-base mb-1.5 flex items-center justify-center gap-1.5">
              <span>🎉</span> Status Akun: Resmi Terverifikasi
            </p>
            <p className="text-[#4A5A80] text-xs leading-relaxed">
              Anda kini memiliki akses penuh untuk merilis tiket konser, menjual merchandise eksklusif, dan melakukan penarikan pendapatan.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-[#1E2D5A] font-extrabold text-base mb-1.5">
              Menunggu Persetujuan Admin Katsera
            </p>
            <p className="text-[#7A8BB5] text-xs leading-relaxed mb-3">
              Persetujuan akun artis biasanya diproses maksimal 1x24 jam. Anda akan menerima notifikasi email setelah disetujui.
            </p>
            <button
              type="button"
              onClick={handleApprove}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 mx-auto"
            >
              <span>⚡</span> Setujui Akun Sekarang (Demo / Instant Approve)
            </button>
          </div>
        )}
      </div>

      <div className="space-y-2 mt-auto">
        <button
          type="button"
          onClick={handleProceed}
          className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base hover:bg-[#2D4270] active:scale-95 transition-all shadow-md"
        >
          {isApproved ? "Masuk ke Dashboard Artis & Gunakan Fitur →" : "Buka Dashboard Artis"}
        </button>
      </div>
    </div>
  )
}
