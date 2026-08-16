import { useNavigate, useLocation } from "react-router-dom"

export default function MembershipActivate() {
  const navigate = useNavigate()
  const location = useLocation()
  const { pkg, billing } = (location.state as { pkg: { name: string }; billing: string }) || { pkg: { name: "Prime" }, billing: "monthly" }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] px-8 text-center">
      {/* Badge */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#3D5898] to-[#1E2D5A] flex items-center justify-center mb-6 shadow-xl">
        <svg width="44" height="44" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2"/><path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>

      <h1 className="text-[#1E2D5A] font-extrabold text-2xl mb-1">Membership Aktif!</h1>
      <p className="text-[#3D5898] font-bold text-lg mb-3">{pkg.name} Package</p>
      <p className="text-[#7A8BB5] text-sm leading-relaxed mb-8">
        Selamat! Membership {pkg.name} kamu sudah aktif.{" "}
        {billing === "annually" ? "Berlaku selama 1 tahun ke depan." : "Perpanjang setiap bulan untuk nikmati semua benefit."}
        {" "}Nikmati akses eksklusif ke semua konten artis favoritmu.
      </p>

      {/* Benefits preview */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-sm mb-6 text-left space-y-2">
        <p className="font-bold text-[#1E2D5A] text-sm mb-2">Benefit aktif:</p>
        {["Live interaction & chat", "Exclusive performance access", "Supporter ports", "Artist Channel Access"].map((b) => (
          <div key={b} className="flex items-center gap-2 text-xs text-[#7A8BB5]">
            <div className="w-4 h-4 rounded-full bg-[#3D5898] flex items-center justify-center flex-none">
              <svg width="8" height="8" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            {b}
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/fan/home")}
        className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-all mb-3"
      >
        Mulai Eksplorasi
      </button>
      <button
        onClick={() => navigate("/fan/channel/1")}
        className="w-full py-3 rounded-full border-2 border-[#3D5898] text-[#3D5898] font-bold text-sm active:scale-95 transition-all"
      >
        Buka Channel Eksklusif
      </button>
    </div>
  )
}
