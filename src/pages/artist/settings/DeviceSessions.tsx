import { useState } from "react"
import { useNavigate } from "react-router-dom"
import katseraLogo from "@/imports/katsera_logo.png"

const KLogo = () => <img src={katseraLogo} alt="Katsera" style={{ width: 22, height: 26, objectFit: "contain" as const }} />

const initialSessions = [
  { id: 1, device: "iPhone 15 Pro", os: "iOS 17.4", location: "Jakarta, Indonesia", time: "Now", current: true },
  { id: 2, device: "MacBook Pro 14\"", os: "macOS Sonoma", location: "Jakarta, Indonesia", time: "2 hours ago", current: false },
  { id: 3, device: "Samsung Galaxy S24", os: "Android 14", location: "Bandung, Indonesia", time: "3 days ago", current: false },
]

export default function DeviceSessions() {
  const navigate = useNavigate()
  const [sessions, setSessions] = useState(initialSessions)
  const [showLogoutAll, setShowLogoutAll] = useState(false)

  const revoke = (id: number) => setSessions((p) => p.filter((s) => s.id !== id))
  const logoutAll = () => { setSessions((p) => p.filter((s) => s.current)); setShowLogoutAll(false) }

  const DeviceIcon = ({ current }: { current: boolean }) => (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-none ${current ? "bg-[#3D5898]" : "bg-[#EEF1FB]"}`}>
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" stroke={current ? "white" : "#3D5898"} strokeWidth="1.8"/><path d="M12 18h.01" stroke={current ? "white" : "#3D5898"} strokeWidth="2" strokeLinecap="round"/></svg>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm flex-none">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <KLogo />
        <span className="flex-1 font-extrabold text-[#1E2D5A] text-lg">Active Sessions</span>
      </div>

      <div className="flex-1 px-5 pb-32 space-y-5">
        <p className="text-[#7A8BB5] text-xs font-semibold">{sessions.length} device{sessions.length !== 1 ? "s" : ""} currently signed in.</p>

        {/* Current */}
        {sessions.filter((s) => s.current).map((s) => (
          <div key={s.id}>
            <p className="font-extrabold text-[#1E2D5A] text-xs uppercase tracking-widest mb-2">This Device</p>
            <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border-2 border-[#3D5898]/20">
              <DeviceIcon current />
              <div className="flex-1">
                <p className="font-bold text-[#1E2D5A] text-sm">{s.device}</p>
                <p className="text-[#9BAACE] text-xs">{s.os} · {s.location}</p>
                <p className="text-[#3D5898] text-xs font-semibold mt-0.5">{s.time}</p>
              </div>
              <span className="text-xs font-extrabold text-[#3D5898] bg-blue-50 px-2.5 py-1 rounded-full">Current</span>
            </div>
          </div>
        ))}

        {/* Other */}
        {sessions.filter((s) => !s.current).length > 0 && (
          <div>
            <p className="font-extrabold text-[#1E2D5A] text-xs uppercase tracking-widest mb-2">Other Devices</p>
            <div className="space-y-3">
              {sessions.filter((s) => !s.current).map((s) => (
                <div key={s.id} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                  <DeviceIcon current={false} />
                  <div className="flex-1">
                    <p className="font-bold text-[#1E2D5A] text-sm">{s.device}</p>
                    <p className="text-[#9BAACE] text-xs">{s.os} · {s.location}</p>
                    <p className="text-[#9BAACE] text-xs">{s.time}</p>
                  </div>
                  <button onClick={() => revoke(s.id)} className="text-red-400 text-xs font-extrabold px-3 py-1.5 rounded-full border-2 border-red-100">Revoke</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {sessions.filter((s) => !s.current).length > 0 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-5 pb-6 pt-3 bg-[#E8E8E8]">
          <button onClick={() => setShowLogoutAll(true)} className="w-full py-4 rounded-full border-2 border-red-300 text-red-500 font-extrabold text-sm">
            Logout All Other Devices
          </button>
        </div>
      )}

      {showLogoutAll && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 space-y-4">
            <p className="font-extrabold text-[#1E2D5A] text-lg text-center">Logout All Other Devices?</p>
            <p className="text-[#7A8BB5] text-sm text-center">All other active sessions will be terminated immediately.</p>
            <button onClick={logoutAll} className="w-full py-3.5 rounded-full bg-red-500 text-white font-extrabold text-sm">Logout All</button>
            <button onClick={() => setShowLogoutAll(false)} className="w-full py-3.5 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-extrabold text-sm">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
