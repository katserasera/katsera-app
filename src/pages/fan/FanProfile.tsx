import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function FanProfile() {
  const navigate = useNavigate()
  const [showLogout, setShowLogout] = useState(false)
  
  const savedUser = JSON.parse(localStorage.getItem("katsera_user") || "{}")
  const [form, setForm] = useState({
    email: savedUser.email || "cornelliusadrn@gmail.com",
    name: savedUser.name || "Cornellius Adran",
    telephone: "081316877777",
    address: "Jakarta, Indonesia",
  })

  useEffect(() => {
    if (savedUser.name || savedUser.email) {
      setForm((prev) => ({
        ...prev,
        email: savedUser.email || prev.email,
        name: savedUser.name || prev.name,
      }))
    }
  }, [])


  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="px-5 pt-12 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="22" height="25" viewBox="0 0 60 69" fill="none">
            <path d="M10 8 L10 61" stroke="#3D5898" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 34 L48 10" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 34 L48 60" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-extrabold text-[#1E2D5A] text-xl">Profile</span>
        </div>
        <button onClick={() => navigate("/fan/home")} className="w-10 h-10 rounded-full border-2 border-[#C8D0E8] flex items-center justify-center active:scale-95 transition-transform">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </button>
      </div>

      {/* Back arrow */}
      <div className="px-5 pb-4">
        <button onClick={() => navigate(-1)}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      <div className="flex-1 px-5 pb-28 overflow-y-auto">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-5">
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-md">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center gap-2 mt-3">
            <p className="font-extrabold text-[#1E2D5A] text-base">martin_go90</p>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#7A8BB5" strokeWidth="1.8"/></svg>
          </div>
        </div>

        {/* Form fields */}
        <div className="space-y-4">
          {([
            { field: "email" as const, label: "Email" },
            { field: "name" as const, label: "Name" },
            { field: "telephone" as const, label: "Telephone" },
            { field: "address" as const, label: "Address" },
          ]).map(({ field, label }) => (
            <div key={field}>
              <p className="font-extrabold text-[#1E2D5A] text-sm mb-1.5">{label}</p>
              <div className="bg-white rounded-2xl px-4 py-3.5 border-2 border-transparent focus-within:border-[#3D5898] transition-colors shadow-sm">
                <input
                  value={form[field]}
                  onChange={handleChange(field)}
                  className="w-full bg-transparent text-[#1E2D5A] font-semibold text-sm outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Log Out */}
        <div className="flex justify-end mt-5 mb-4">
          <button onClick={() => setShowLogout(true)} className="text-[#7A8BB5] font-semibold text-sm underline active:opacity-60 transition-opacity">Log Out</button>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#C8D0E8] mb-4" />

        {/* Terms & Conditions */}
        <p className="font-extrabold text-[#1E2D5A] text-xs uppercase tracking-widest mb-3">Terms &amp; Conditions</p>
        <div className="space-y-2">
          {[
            { label: "Privacy Policy" },
            { label: "Terms of Use" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#1E2D5A]">{item.label}</span>
              <button onClick={() => navigate("/artist/help/faq")} className="text-[#7A8BB5] text-xs font-semibold underline active:opacity-60 transition-opacity">Read in Detail</button>
            </div>
          ))}
        </div>
      </div>

      {/* Logout confirm */}
      {showLogout && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-5 space-y-4">
            <div className="w-10 h-1 rounded-full bg-[#E0E5F2] mx-auto" />
            <p className="font-extrabold text-[#1E2D5A] text-base">Log Out?</p>
            <p className="text-[#7A8BB5] text-sm">You'll need to sign in again to access your account.</p>
            <button onClick={() => navigate("/")} className="w-full py-3.5 rounded-full bg-red-500 text-white font-extrabold text-sm active:scale-95 transition-transform">Log Out</button>
            <button onClick={() => setShowLogout(false)} className="w-full py-3.5 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-extrabold text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pb-4">
        <div className="bg-white rounded-full flex shadow-lg border border-[#E8E8E8] px-2">
          {[
            { key: "home", label: "Home", path: "/fan/home", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
            { key: "shop", label: "Shop", path: "/fan/shop", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
            { key: "channel", label: "Channel", path: "/fan/dm", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 14H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4l-4 4v-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
            { key: "more", label: "More", path: "/fan/more", active: true, icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="19" cy="12" r="1.2" fill="currentColor"/></svg> },
          ].map((t) => (
            <button key={t.key} onClick={() => navigate(t.path)} className={`flex-1 flex flex-col items-center py-3 gap-0.5 ${t.active ? "text-[#3D5898]" : "text-[#C8D0E8]"}`}>
              {t.icon}
              <span className="text-[9px] font-bold">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
