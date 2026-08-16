import { useNavigate } from "react-router-dom"

export default function ConcertDone() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 shadow-sm flex items-center gap-3">
        <span className="text-[#3D5898] font-extrabold text-xl">K Shop</span>
        <div className="ml-auto w-8 h-8 flex items-center justify-center rounded-full bg-[#E8E8E8]">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#3D5898" strokeWidth="2" strokeLinecap="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#3D5898" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-lg">
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h1 className="text-[#1E2D5A] font-extrabold text-2xl mb-2">Resonansi Tercatat!</h1>
        <p className="text-[#7A8BB5] text-sm leading-relaxed mb-10">
          Pembayaran Anda berhasil diverifikasi. E-Tiket kini tersedia di menu Order History.
        </p>
        <button
          onClick={() => navigate("/fan/home")}
          className="px-10 py-3.5 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-all"
        >
          Lihat tiket saya
        </button>
      </div>
    </div>
  )
}
