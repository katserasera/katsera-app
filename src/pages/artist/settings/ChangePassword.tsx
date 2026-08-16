import { useState } from "react"
import { useNavigate } from "react-router-dom"
import katseraLogo from "@/imports/katsera_logo.png"

const KLogo = () => <img src={katseraLogo} alt="Katsera" style={{ width: 22, height: 26, objectFit: "contain" as const }} />

const strength = (pw: string) => {
  let s = 0
  if (pw.length >= 8) s++
  if (/[A-Z]/.test(pw)) s++
  if (/[0-9]/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  return s
}

const StrengthBar = ({ pw }: { pw: string }) => {
  const s = strength(pw)
  const labels = ["", "Weak", "Fair", "Good", "Strong"]
  const colors = ["bg-gray-200", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-500"]
  if (!pw) return null
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => <div key={i} className={`h-1 flex-1 rounded-full ${i <= s ? colors[s] : "bg-[#E8E8E8]"}`} />)}
      </div>
      <p className={`text-xs font-semibold ${colors[s].replace("bg-", "text-")}`}>{labels[s]}</p>
    </div>
  )
}

export default function ChangePassword() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ current: "", next: "", confirm: "" })
  const [show, setShow] = useState({ current: false, next: false, confirm: false })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.current) e.current = "Required"
    if (form.next.length < 8) e.next = "At least 8 characters"
    if (form.next !== form.confirm) e.confirm = "Passwords don't match"
    return e
  }

  const handleSave = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true) }, 1200)
  }

  if (done) return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] gap-4">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <p className="font-extrabold text-[#1E2D5A] text-xl">Password Changed!</p>
      <p className="text-[#7A8BB5] text-sm">You'll need to log in again on other devices.</p>
      <button onClick={() => navigate(-1)} className="px-8 py-3 rounded-full bg-[#3D5898] text-white font-extrabold text-sm mt-2">Done</button>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm flex-none">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <KLogo />
        <span className="flex-1 font-extrabold text-[#1E2D5A] text-lg">Change Password</span>
      </div>

      <div className="flex-1 px-5 pb-32 space-y-4">
        {(["current", "next", "confirm"] as const).map((key) => {
          const labels = { current: "Current Password", next: "New Password", confirm: "Confirm New Password" }
          return (
            <div key={key}>
              <p className="font-bold text-[#1E2D5A] text-xs mb-1.5">{labels[key]}</p>
              <div className={`bg-white rounded-2xl px-4 py-3.5 border-2 transition-colors shadow-sm flex items-center gap-2 ${errors[key] ? "border-red-400" : "border-transparent focus-within:border-[#3D5898]"}`}>
                <input
                  type={show[key] ? "text" : "password"}
                  value={form[key]}
                  onChange={(e) => { setForm((p) => ({ ...p, [key]: e.target.value })); if (errors[key]) setErrors((p) => { const n = { ...p }; delete n[key]; return n }) }}
                  className="flex-1 bg-transparent text-[#1E2D5A] font-semibold text-sm outline-none"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShow((p) => ({ ...p, [key]: !p[key] }))}>
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#9BAACE" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </div>
              {key === "next" && <StrengthBar pw={form.next} />}
              {errors[key] && <p className="text-red-500 text-xs mt-1 ml-1">{errors[key]}</p>}
            </div>
          )
        })}

        <button onClick={() => navigate("/artist/settings/forgot")} className="text-[#3D5898] text-xs font-semibold underline">Forgot current password?</button>

        <div className="bg-blue-50 rounded-2xl p-4 flex gap-3 mt-2">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="flex-none mt-0.5"><circle cx="12" cy="12" r="10" stroke="#3D5898" strokeWidth="1.8"/><path d="M12 8v4M12 16h.01" stroke="#3D5898" strokeWidth="2" strokeLinecap="round"/></svg>
          <p className="text-xs text-[#3D5898] font-semibold leading-relaxed">Use at least 8 characters with a mix of uppercase, numbers, and symbols for a strong password.</p>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-5 pb-6 pt-3 bg-[#E8E8E8]">
        <button onClick={handleSave} disabled={loading} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm disabled:opacity-60 flex items-center justify-center gap-2">
          {loading ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Saving…</> : "Change Password"}
        </button>
      </div>
    </div>
  )
}
