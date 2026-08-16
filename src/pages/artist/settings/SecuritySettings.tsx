import { useNavigate } from "react-router-dom"
import katseraLogo from "@/imports/katsera_logo.png"

const KLogo = () => <img src={katseraLogo} alt="Katsera" style={{ width: 22, height: 26, objectFit: "contain" as const }} />

const ChevronRight = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#9BAACE" strokeWidth="2" strokeLinecap="round"/></svg>
)

export default function SecuritySettings() {
  const navigate = useNavigate()

  const sections = [
    {
      title: "Authentication",
      items: [
        { label: "Change Password", sub: "Last changed 3 months ago", path: "/artist/settings/password", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" stroke="#3D5898" strokeWidth="1.8"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/></svg> },
        { label: "Two-Factor Authentication", sub: "Not enabled", path: "/artist/settings/2fa", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#3D5898" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
      ],
    },
    {
      title: "Devices & Sessions",
      items: [
        { label: "Connected Accounts", sub: "Google, Apple", path: "/artist/settings/connected", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/></svg> },
        { label: "Active Sessions", sub: "2 devices", path: "/artist/settings/sessions", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" stroke="#3D5898" strokeWidth="1.8"/><path d="M8 21h8M12 17v4" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/></svg> },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm flex-none">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <KLogo />
        <span className="flex-1 font-extrabold text-[#1E2D5A] text-lg">Security</span>
      </div>

      <div className="flex-1 px-5 pb-10 space-y-5">
        {/* Security score */}
        <div className="bg-gradient-to-br from-[#3D5898] to-[#1E2D5A] rounded-3xl p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center flex-none">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="white" strokeWidth="1.8" fill="rgba(255,255,255,0.2)"/></svg>
          </div>
          <div>
            <p className="text-white/70 text-xs font-semibold">Security Score</p>
            <p className="text-white font-extrabold text-2xl">60%</p>
            <p className="text-white/60 text-xs mt-0.5">Enable 2FA to reach 100%</p>
          </div>
        </div>

        {sections.map((s) => (
          <div key={s.title}>
            <p className="font-extrabold text-[#1E2D5A] text-xs uppercase tracking-widest mb-2">{s.title}</p>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {s.items.map((item, i) => (
                <button key={item.label} onClick={() => navigate(item.path)} className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-[#F8F9FC] transition-colors ${i < s.items.length - 1 ? "border-b border-[#F4F5F9]" : ""}`}>
                  <div className="w-9 h-9 rounded-full bg-[#EEF1FB] flex items-center justify-center flex-none">{item.icon}</div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-[#1E2D5A] text-sm">{item.label}</p>
                    <p className="text-[#9BAACE] text-xs mt-0.5">{item.sub}</p>
                  </div>
                  <ChevronRight />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Danger zone */}
        <div>
          <p className="font-extrabold text-[#1E2D5A] text-xs uppercase tracking-widest mb-2">Danger Zone</p>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button className="w-full flex items-center gap-4 px-5 py-4 border-b border-[#F4F5F9]">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-none">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <span className="flex-1 text-left font-bold text-red-500 text-sm">Logout All Devices</span>
              <ChevronRight />
            </button>
            <button className="w-full flex items-center gap-4 px-5 py-4">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-none">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <span className="flex-1 text-left font-bold text-red-500 text-sm">Delete Account</span>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
