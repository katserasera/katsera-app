import { useNavigate, useLocation } from "react-router-dom"

function fmt(n: number) { return "Rp" + n.toLocaleString("id-ID") }

export default function RedeemSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const { amount } = (location.state as { amount: number }) || { amount: 800000 }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Logo */}
      <div className="flex justify-center pt-12 pb-4">
        <svg width="32" height="37" viewBox="0 0 60 69" fill="none">
          <path d="M10 8 L10 61" stroke="#3D5898" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 34 L48 10" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 34 L48 60" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center pb-28">
        {/* Green check */}
        <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-5 shadow-lg">
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>

        <h1 className="text-[#3D5898] font-extrabold text-2xl mb-3">SUCCESS!</h1>
        <p className="text-[#7A8BB5] text-sm leading-relaxed">
          Penarikan senilai {fmt(amount)} berhasil diproses dan sedang dalam perjalanan ke rekening Anda.
        </p>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#E8E8E8] px-5 pb-8 pt-2">
        <button
          onClick={() => navigate("/artist/dashboard")}
          className="w-full py-4 rounded-2xl bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-all mb-4"
        >
          Lihat riwayat penarikan
        </button>
      </div>

      {/* Artist bottom nav */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md">
        <div className="mx-4 bg-white rounded-full flex shadow-lg border border-[#E8E8E8]">
          {[
            { key: "home", icon: "🏠", label: "Home", path: "/artist/dashboard" },
            { key: "sales", icon: "📊", label: "Sales Hub", active: true, path: "/artist/dashboard" },
            { key: "notif", icon: "🔔", label: "Alerts", path: "/artist/dashboard" },
            { key: "learn", icon: "📚", label: "Learn", path: "/artist/academy" },
            { key: "more", icon: "⋯", label: "More", path: "/artist/dashboard" },
          ].map((t) => (
            <button key={t.key} onClick={() => navigate(t.path)} className={`flex-1 flex flex-col items-center py-3 gap-0.5 ${t.active ? "text-[#3D5898]" : "text-[#C8D0E8]"}`}>
              <span className="text-lg">{t.icon}</span>
              <span className="text-[9px] font-bold">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
