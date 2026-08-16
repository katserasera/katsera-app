import { useNavigate, useLocation } from "react-router-dom"

function fmt(n: number) { return "Rp" + n.toLocaleString("id-ID") }

export default function PaymentStatus() {
  const navigate = useNavigate()
  const location = useLocation()
  const { success, amount, label, returnPath } = (location.state as { success: boolean; amount: number; label: string; returnPath: string }) || {
    success: true, amount: 299000, label: "Membership Prime", returnPath: "/fan/home",
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] px-8 text-center">
        <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-xl">
          <svg width="44" height="44" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h1 className="text-[#1E2D5A] font-extrabold text-2xl mb-2">Pembayaran Berhasil!</h1>
        <p className="text-[#7A8BB5] text-sm leading-relaxed mb-2">{label}</p>
        <p className="text-[#3D5898] font-extrabold text-2xl mb-8">{fmt(amount)}</p>

        {/* Receipt card */}
        <div className="w-full bg-white rounded-2xl p-5 shadow-sm mb-8 text-left space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#7A8BB5]">Order ID</span>
            <span className="font-bold text-[#1E2D5A]">KTS-{Date.now().toString().slice(-8)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#7A8BB5]">Status</span>
            <span className="font-bold text-green-600 flex items-center gap-1">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
              Paid
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#7A8BB5]">Tanggal</span>
            <span className="font-bold text-[#1E2D5A]">{new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
        </div>

        <button onClick={() => navigate(returnPath)} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-all mb-3">
          Lanjutkan
        </button>
        <button onClick={() => navigate("/fan/home")} className="text-sm text-[#7A8BB5] font-semibold">
          Kembali ke Home
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] px-8 text-center">
      <div className="w-24 h-24 rounded-full bg-red-400 flex items-center justify-center mb-6 shadow-xl">
        <svg width="44" height="44" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.8" strokeLinecap="round"/></svg>
      </div>
      <h1 className="text-[#1E2D5A] font-extrabold text-2xl mb-2">Pembayaran Gagal</h1>
      <p className="text-[#7A8BB5] text-sm leading-relaxed mb-8">
        Transaksi tidak berhasil. Silakan coba kembali atau gunakan metode pembayaran lain.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-all mb-3"
      >
        Coba Lagi
      </button>
      <button
        onClick={() => navigate("/payment", { state: { amount, label, returnPath } })}
        className="w-full py-3 rounded-full border-2 border-[#3D5898] text-[#3D5898] font-bold text-sm active:scale-95 transition-all"
      >
        Ganti Metode Pembayaran
      </button>
    </div>
  )
}
