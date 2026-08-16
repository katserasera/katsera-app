import { useState } from "react"
import { useNavigate } from "react-router-dom"
import katseraLogo from "@/imports/katsera_logo.png"

const KLogo = () => <img src={katseraLogo} alt="Katsera" style={{ width: 22, height: 26, objectFit: "contain" as const }} />

const accounts = [
  { key: "google", label: "Google", sub: "nadin@gmail.com", color: "#EA4335", icon: "G", connected: true },
  { key: "apple", label: "Apple", sub: "nadin@icloud.com", color: "#000000", icon: "", connected: true },
  { key: "spotify", label: "Spotify", sub: "Not connected", color: "#1DB954", icon: "S", connected: false },
  { key: "youtube", label: "YouTube", sub: "Not connected", color: "#FF0000", icon: "YT", connected: false },
]

export default function ConnectedAccounts() {
  const navigate = useNavigate()
  const [connected, setConnected] = useState<Record<string, boolean>>(
    Object.fromEntries(accounts.map((a) => [a.key, a.connected]))
  )
  const [confirmDisconnect, setConfirmDisconnect] = useState<string | null>(null)

  const toggle = (key: string) => {
    if (connected[key]) { setConfirmDisconnect(key); return }
    setConnected((p) => ({ ...p, [key]: true }))
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm flex-none">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <KLogo />
        <span className="flex-1 font-extrabold text-[#1E2D5A] text-lg">Connected Accounts</span>
      </div>

      <div className="flex-1 px-5 pb-10 space-y-4">
        <p className="text-[#7A8BB5] text-xs font-semibold">Linked accounts can be used to log into Katsera quickly.</p>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {accounts.map((a, i) => (
            <div key={a.key} className={`flex items-center gap-4 px-5 py-4 ${i < accounts.length - 1 ? "border-b border-[#F4F5F9]" : ""}`}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-none text-white font-extrabold text-sm" style={{ backgroundColor: a.color }}>
                {a.key === "apple"
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  : a.icon}
              </div>
              <div className="flex-1">
                <p className="font-bold text-[#1E2D5A] text-sm">{a.label}</p>
                <p className="text-[#9BAACE] text-xs mt-0.5">{connected[a.key] ? a.sub : "Not connected"}</p>
              </div>
              <button
                onClick={() => toggle(a.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-extrabold border-2 transition-all ${connected[a.key] ? "border-[#C8D0E8] text-[#7A8BB5]" : "border-[#3D5898] text-[#3D5898]"}`}
              >
                {connected[a.key] ? "Disconnect" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm disconnect modal */}
      {confirmDisconnect && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 space-y-4">
            <p className="font-extrabold text-[#1E2D5A] text-lg text-center">Disconnect {accounts.find((a) => a.key === confirmDisconnect)?.label}?</p>
            <p className="text-[#7A8BB5] text-sm text-center">You won't be able to log in with this account.</p>
            <button onClick={() => { setConnected((p) => ({ ...p, [confirmDisconnect!]: false })); setConfirmDisconnect(null) }} className="w-full py-3.5 rounded-full bg-red-500 text-white font-extrabold text-sm">Disconnect</button>
            <button onClick={() => setConfirmDisconnect(null)} className="w-full py-3.5 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-extrabold text-sm">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
