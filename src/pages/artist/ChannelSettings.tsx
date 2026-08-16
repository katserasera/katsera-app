import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ChannelSettings() {
  const navigate = useNavigate()
  const [kontrolOpen, setKontrolOpen] = useState(false)
  const [fanReply, setFanReply] = useState(false)
  const [kinerjaOpen, setKinerjaOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Back arrow */}
      <div className="px-5 pt-14 pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3D5898]">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Avatar + name */}
      <div className="flex flex-col items-center px-5 pb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-3 shadow-sm">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop" alt="" className="w-full h-full object-cover" />
        </div>
        <h1 className="font-extrabold text-[#1E2D5A] text-xl">Nadin's Space</h1>
        <p className="text-[#7A8BB5] text-sm mt-0.5 font-semibold">Ubah nama</p>
      </div>

      {/* Settings rows */}
      <div className="px-5 space-y-3">
        {/* Kontrol saluran */}
        <div className="bg-white rounded-full shadow-sm overflow-hidden">
          <button
            onClick={() => setKontrolOpen(!kontrolOpen)}
            className="w-full flex items-center gap-3 px-5 py-4"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#3D5898" strokeWidth="1.8" strokeLinejoin="round"/></svg>
            <span className="flex-1 text-left font-semibold text-[#1E2D5A] text-sm">Kontrol saluran</span>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className={`transition-transform ${kontrolOpen ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6" stroke="#7A8BB5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          {kontrolOpen && (
            <div className="px-5 pb-4 border-t border-[#F4F5F9]">
              <div className="flex items-center justify-between py-3">
                <p className="text-sm text-[#1E2D5A] font-semibold">Izinkan penggemar membalas pesan</p>
                <button
                  onClick={() => setFanReply(!fanReply)}
                  className={`w-11 h-6 rounded-full transition-all flex-none relative ${fanReply ? "bg-[#3D5898]" : "bg-[#C8D0E8]"}`}
                >
                  <div className={`w-4.5 h-4.5 w-[18px] h-[18px] rounded-full bg-white shadow absolute top-[3px] transition-all ${fanReply ? "left-[22px]" : "left-[3px]"}`} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Kinerja saluran */}
        <div className="bg-white rounded-full shadow-sm overflow-hidden">
          <button
            onClick={() => setKinerjaOpen(!kinerjaOpen)}
            className="w-full flex items-center gap-3 px-5 py-4"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10" stroke="#3D5898" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="20" x2="12" y2="4" stroke="#3D5898" strokeWidth="2" strokeLinecap="round"/><line x1="6" y1="20" x2="6" y2="14" stroke="#3D5898" strokeWidth="2" strokeLinecap="round"/></svg>
            <span className="flex-1 text-left font-semibold text-[#1E2D5A] text-sm">Kinerja saluran</span>
          </button>

          {kinerjaOpen && (
            <div className="px-5 pb-4 border-t border-[#F4F5F9]">
              <div className="grid grid-cols-3 gap-3 py-3">
                {[
                  { label: "Subscribers", value: "325K" },
                  { label: "Posts", value: "142" },
                  { label: "Avg Reach", value: "82%" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#F4F5F9] rounded-2xl p-3 text-center">
                    <p className="font-extrabold text-[#3D5898] text-lg">{s.value}</p>
                    <p className="text-[10px] text-[#7A8BB5] font-semibold mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
