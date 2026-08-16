import { useState } from "react"
import { useNavigate } from "react-router-dom"
import katseraLogo from "@/imports/katsera_logo.png"

const KLogo = () => <img src={katseraLogo} alt="Katsera" style={{ width: 22, height: 26, objectFit: "contain" as const }} />

type Step = "intro" | "method" | "verify" | "done"

export default function TwoFactorAuth() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>("intro")
  const [method, setMethod] = useState<"sms" | "app" | null>(null)
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [codeError, setCodeError] = useState("")

  const handleVerify = () => {
    if (code.length < 6) { setCodeError("Enter the 6-digit code"); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep("done") }, 1200)
  }

  if (step === "done") return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] gap-4">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
        <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#22C55E" strokeWidth="1.8" fill="rgba(34,197,94,0.15)"/><path d="M9 12l2 2 4-4" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/></svg>
      </div>
      <p className="font-extrabold text-[#1E2D5A] text-xl text-center">2FA Enabled!</p>
      <p className="text-[#7A8BB5] text-sm text-center px-8">Your account is now protected with two-factor authentication.</p>
      <button onClick={() => navigate(-1)} className="px-10 py-3.5 rounded-full bg-[#3D5898] text-white font-extrabold text-sm">Done</button>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => step === "intro" ? navigate(-1) : setStep((s) => ({ method: "intro", verify: "method", done: "verify" }[s] as Step))} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm flex-none">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <KLogo />
        <span className="flex-1 font-extrabold text-[#1E2D5A] text-lg">Two-Factor Auth</span>
      </div>

      <div className="flex-1 px-5 pb-10">
        {step === "intro" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#3D5898] to-[#1E2D5A] rounded-3xl p-6 flex flex-col items-center gap-3 text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="white" strokeWidth="1.8"/></svg>
              </div>
              <p className="text-white font-extrabold text-lg">Add an Extra Layer of Security</p>
              <p className="text-white/70 text-xs leading-relaxed">When you log in, you'll need your password plus a verification code from your phone.</p>
            </div>
            <div className="space-y-3">
              {[
                { icon: "🔐", title: "Prevent Unauthorized Access", desc: "Even if your password is stolen, your account stays safe" },
                { icon: "📱", title: "Quick Verification", desc: "Just enter a 6-digit code sent to your phone or app" },
                { icon: "🔄", title: "Backup Options", desc: "Recovery codes available in case you lose your phone" },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-4 flex gap-3 shadow-sm">
                  <span className="text-xl flex-none">{item.icon}</span>
                  <div>
                    <p className="font-bold text-[#1E2D5A] text-sm">{item.title}</p>
                    <p className="text-[#9BAACE] text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setStep("method")} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm">Enable 2FA</button>
          </div>
        )}

        {step === "method" && (
          <div className="space-y-4">
            <p className="font-extrabold text-[#1E2D5A] text-base mb-4">Choose your verification method</p>
            {[
              { key: "sms" as const, label: "SMS / Text Message", sub: "Receive a code via +62 812 *** 7890", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.32 6.32l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="#3D5898" strokeWidth="1.8"/></svg> },
              { key: "app" as const, label: "Authenticator App", sub: "Google Authenticator, Authy, etc.", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" stroke="#3D5898" strokeWidth="1.8"/><path d="M12 18h.01" stroke="#3D5898" strokeWidth="2" strokeLinecap="round"/></svg> },
            ].map((opt) => (
              <button key={opt.key} onClick={() => setMethod(opt.key)} className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${method === opt.key ? "border-[#3D5898] bg-blue-50" : "border-transparent bg-white shadow-sm"}`}>
                <div className="w-10 h-10 rounded-full bg-[#EEF1FB] flex items-center justify-center flex-none">{opt.icon}</div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-[#1E2D5A] text-sm">{opt.label}</p>
                  <p className="text-[#9BAACE] text-xs mt-0.5">{opt.sub}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === opt.key ? "border-[#3D5898] bg-[#3D5898]" : "border-[#C8D0E8]"}`}>
                  {method === opt.key && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>
            ))}
            <button onClick={() => method && setStep("verify")} disabled={!method} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm mt-2 disabled:opacity-40">Continue</button>
          </div>
        )}

        {step === "verify" && (
          <div className="space-y-5">
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#EEF1FB] flex items-center justify-center mx-auto mb-3">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.32 6.32l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="#3D5898" strokeWidth="1.8"/></svg>
              </div>
              <p className="font-extrabold text-[#1E2D5A] text-base">Enter verification code</p>
              <p className="text-[#9BAACE] text-xs mt-1">We sent a 6-digit code to {method === "sms" ? "+62 812 *** 7890" : "your authenticator app"}</p>
            </div>
            <div className={`bg-white rounded-2xl px-5 py-4 border-2 transition-colors ${codeError ? "border-red-400" : "border-transparent focus-within:border-[#3D5898]"} shadow-sm`}>
              <input
                type="number"
                value={code}
                onChange={(e) => { setCode(e.target.value.slice(0, 6)); setCodeError("") }}
                className="w-full bg-transparent text-[#1E2D5A] font-extrabold text-2xl text-center tracking-widest outline-none"
                placeholder="000000"
                maxLength={6}
              />
            </div>
            {codeError && <p className="text-red-500 text-xs text-center">{codeError}</p>}
            <button className="text-[#3D5898] text-xs font-semibold w-full text-center">Resend code</button>
            <button onClick={handleVerify} disabled={loading} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Verifying…</> : "Verify & Enable"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
