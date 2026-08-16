import { useNavigate } from "react-router-dom"

export default function ShopDone() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] px-8 text-center">
      <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-lg">
        <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <h1 className="text-[#1E2D5A] font-extrabold text-2xl mb-2">Pesanan Berhasil!</h1>
      <p className="text-[#7A8BB5] text-sm leading-relaxed mb-8">
        Pembayaran Anda berhasil diverifikasi.<br />Pesanan sedang diproses dan akan segera dikirim.
      </p>
      <button
        onClick={() => navigate("/fan/home")}
        className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-all mb-3"
      >
        Kembali ke Home
      </button>
      <button
        onClick={() => navigate("/fan/shop")}
        className="w-full py-3 rounded-full border-2 border-[#3D5898] text-[#3D5898] font-bold text-sm active:scale-95 transition-all"
      >
        Lanjut Belanja
      </button>
    </div>
  )
}
