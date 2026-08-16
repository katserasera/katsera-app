import { useNavigate, useLocation } from "react-router-dom"

function fmt(n: number) { return "Rp" + n.toLocaleString("id-ID") }

export default function RedeemConfirm() {
  const navigate = useNavigate()
  const location = useLocation()
  const { amount } = (location.state as { amount: number }) || { amount: 2000000 }

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
        <div className="flex items-center gap-2 mb-5">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" stroke="#3D5898" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h1 className="text-[#3D5898] font-extrabold text-xl">CONFIRM</h1>
        </div>

        {/* Confirm card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-0">
          <div className="flex justify-between py-3.5 border-b border-[#F4F5F9]">
            <span className="text-[#7A8BB5] text-sm font-semibold">Nominal penarikan</span>
            <span className="text-[#3D5898] font-extrabold text-sm">{fmt(amount)}</span>
          </div>
          <div className="flex justify-between py-3.5 border-b border-[#F4F5F9]">
            <span className="text-[#7A8BB5] text-sm font-semibold">Biaya administrasi</span>
            <span className="text-[#7A8BB5] font-semibold text-sm">-</span>
          </div>
          <div className="flex justify-between py-3.5 border-b border-[#F4F5F9]">
            <span className="text-[#7A8BB5] text-sm font-semibold">Waktu estimasi</span>
            <span className="text-[#1E2D5A] font-bold text-sm">1-2 hari kerja</span>
          </div>

          {/* Bank account */}
          <div className="pt-4">
            <p className="text-[#3D5898] text-xs font-bold uppercase tracking-wide mb-3">Rekening Tujuan</p>
            <div className="bg-[#F4F5F9] rounded-xl p-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-none shadow-sm">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" stroke="#3D5898" strokeWidth="2"/><path d="M2 10h20" stroke="#3D5898" strokeWidth="2"/></svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="font-bold text-[#1E2D5A] text-sm">BCA</p>
                  <span className="w-1 h-1 rounded-full bg-[#7A8BB5]" />
                  <p className="text-[#7A8BB5] text-sm">8420****129</p>
                </div>
                <p className="text-[#7A8BB5] text-xs">Nadin Amizah</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security note */}
        <div className="mt-4 flex items-start gap-2">
          <svg className="mt-0.5 flex-none" width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#3D5898" strokeWidth="2" fill="#3D5898" fillOpacity="0.1"/></svg>
          <p className="text-xs text-[#7A8BB5] leading-relaxed">
            Penarikan diproses melalui sistem keamanan berlapis. Dana akan masuk ke rekening dalam 1-2 hari kerja.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] px-5 py-4 flex gap-3">
        <button onClick={() => navigate(-1)} className="flex-1 py-4 rounded-2xl border-2 border-[#C8D0E8] text-[#7A8BB5] font-bold text-sm">
          Back
        </button>
        <button
          onClick={() => navigate("/artist/redeem/success", { state: { amount } })}
          className="flex-1 py-4 rounded-2xl bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          Next
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M7 17L17 7M7 7h10v10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  )
}
