import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

type Step = "email" | "sending" | "sent" | "new-password" | "resetting" | "success"

export default function ForgotPassword() {
  const navigate = useNavigate()
  const location = useLocation()
  const prefillEmail = (location.state as { email?: string })?.email || ""

  const [step, setStep] = useState<Step>("email")
  const [email, setEmail] = useState(prefillEmail)
  const [error, setError] = useState("")
  const [newPw, setNewPw] = useState("")
  const [confirmPw, setConfirmPw] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  function handleSendReset(e: React.FormEvent) {
    e.preventDefault()
    if (!email) { setError("Please enter your email address"); return }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Enter a valid email address"); return }
    setError("")
    setStep("sending")
    setTimeout(() => setStep("sent"), 2000)
  }

  function handleSetNewPassword(e: React.FormEvent) {
    e.preventDefault()
    if (newPw.length < 8) { setError("Password must be at least 8 characters"); return }
    if (newPw !== confirmPw) { setError("Passwords do not match"); return }
    setError("")
    setStep("resetting")
    setTimeout(() => setStep("success"), 2200)
  }

  const pwStrength = newPw.length === 0 ? 0 : newPw.length < 6 ? 1 : newPw.length < 10 ? 2 : /[A-Z]/.test(newPw) && /[0-9]/.test(newPw) && /[^a-zA-Z0-9]/.test(newPw) ? 4 : 3
  const pwStrengthLabel = ["", "Weak", "Fair", "Good", "Strong"][pwStrength]
  const pwStrengthColor = ["", "#EF4444", "#F59E0B", "#22C55E", "#16A34A"][pwStrength]

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">

      {/* Header */}
      <div className="pt-14 px-6 flex items-center">
        {step !== "success" && (
          <button onClick={() => step === "sent" || step === "new-password" ? setStep("email") : navigate(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-95 transition-transform">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        )}
      </div>

      <div className="flex-1 px-6 pt-6 flex flex-col">

        {/* ── Email entry ── */}
        {(step === "email" || step === "sending") && (
          <>
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-20 h-20 rounded-3xl bg-[#3D5898]/10 flex items-center justify-center mb-5">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="#3D5898" strokeWidth="1.8"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <h1 className="text-[#1E2D5A] font-extrabold text-2xl mb-2">Forgot password?</h1>
              <p className="text-[#7A8BB5] text-sm leading-relaxed max-w-xs">
                No worries! Enter your registered email and we'll send you a reset link.
              </p>
            </div>

            <form onSubmit={handleSendReset} className="space-y-4">
              <div>
                <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Email Address</label>
                <div className={`bg-white rounded-2xl flex items-center gap-3 px-4 border-2 shadow-sm transition-colors ${error ? "border-red-300" : "border-transparent focus-within:border-[#3D5898]"}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="#9BAACE" strokeWidth="1.8"/><path d="M2 8l10 6 10-6" stroke="#9BAACE" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError("") }}
                    placeholder="you@example.com"
                    className="flex-1 py-4 text-sm text-[#1E2D5A] outline-none placeholder:text-[#C8D0E8] font-semibold bg-transparent"
                  />
                  {email && !/\S+@\S+\.\S+/.test(email) === false && (
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"/></svg>
                  )}
                </div>
                {error && <p className="text-red-500 text-xs font-semibold mt-1.5 ml-1">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={step === "sending"}
                className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base flex items-center justify-center gap-2 disabled:opacity-60 active:scale-95 transition-all shadow-md"
              >
                {step === "sending"
                  ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending reset link…</>
                  : "Send Reset Link"
                }
              </button>
            </form>

            <button onClick={() => navigate("/auth/login")} className="mt-6 text-center text-[#3D5898] text-sm font-bold active:opacity-60">
              Back to Sign In
            </button>
          </>
        )}

        {/* ── Email sent ── */}
        {step === "sent" && (
          <>
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-20 h-20 rounded-3xl bg-green-100 flex items-center justify-center mb-5">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="#22c55e" strokeWidth="1.8"/>
                  <path d="M2 8l10 6 10-6" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <h1 className="text-[#1E2D5A] font-extrabold text-2xl mb-2">Email sent!</h1>
              <p className="text-[#7A8BB5] text-sm leading-relaxed max-w-xs">
                We sent a reset link to<br/>
                <span className="font-bold text-[#1E2D5A]">{email}</span>
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4 mb-6">
              {[
                { icon: "📬", title: "Check your inbox", desc: "The email may take a few minutes to arrive" },
                { icon: "🗂️", title: "Check spam folder", desc: "It might have been filtered automatically" },
                { icon: "⏱️", title: "Link expires in 15 min", desc: "Request a new one if it expires" },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">{icon}</span>
                  <div>
                    <p className="text-[#1E2D5A] font-bold text-sm">{title}</p>
                    <p className="text-[#9BAACE] text-xs">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulate clicking the email link */}
            <button
              onClick={() => setStep("new-password")}
              className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-transform shadow-md"
            >
              I've opened the link →
            </button>

            <button onClick={() => { setStep("sending"); setTimeout(() => setStep("sent"), 2000) }} className="mt-4 text-center text-[#3D5898] text-sm font-bold active:opacity-60 w-full">
              Resend email
            </button>
          </>
        )}

        {/* ── New password ── */}
        {(step === "new-password" || step === "resetting") && (
          <>
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-20 h-20 rounded-3xl bg-[#3D5898]/10 flex items-center justify-center mb-5">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="#3D5898" strokeWidth="1.8"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="12" cy="16" r="1.5" fill="#3D5898"/>
                </svg>
              </div>
              <h1 className="text-[#1E2D5A] font-extrabold text-2xl mb-2">Create new password</h1>
              <p className="text-[#7A8BB5] text-sm">Choose a strong, unique password</p>
            </div>

            <form onSubmit={handleSetNewPassword} className="space-y-4">
              {/* New password */}
              <div>
                <label className="text-[#1E2D5A] font-bold text-sm block mb-2">New Password</label>
                <div className="bg-white rounded-2xl flex items-center gap-3 px-4 border-2 border-transparent focus-within:border-[#3D5898] shadow-sm transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="#9BAACE" strokeWidth="1.8"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#9BAACE" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  <input
                    type={showPw ? "text" : "password"}
                    value={newPw}
                    onChange={(e) => { setNewPw(e.target.value); setError("") }}
                    placeholder="Min. 8 characters"
                    className="flex-1 py-4 text-sm text-[#1E2D5A] outline-none placeholder:text-[#C8D0E8] font-semibold bg-transparent"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="text-[#9BAACE]">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/></svg>
                  </button>
                </div>

                {/* Strength indicator */}
                {newPw.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((l) => (
                        <div key={l} className="flex-1 h-1.5 rounded-full transition-all" style={{ background: l <= pwStrength ? pwStrengthColor : "#E0E5F2" }} />
                      ))}
                    </div>
                    <p className="text-xs font-semibold" style={{ color: pwStrengthColor }}>{pwStrengthLabel} password</p>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Confirm Password</label>
                <div className={`bg-white rounded-2xl flex items-center gap-3 px-4 border-2 shadow-sm transition-colors ${confirmPw && confirmPw !== newPw ? "border-red-300" : confirmPw && confirmPw === newPw ? "border-green-300" : "border-transparent focus-within:border-[#3D5898]"}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="#9BAACE" strokeWidth="1.8"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#9BAACE" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPw}
                    onChange={(e) => { setConfirmPw(e.target.value); setError("") }}
                    placeholder="Repeat your password"
                    className="flex-1 py-4 text-sm text-[#1E2D5A] outline-none placeholder:text-[#C8D0E8] font-semibold bg-transparent"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-[#9BAACE]">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/></svg>
                  </button>
                </div>
              </div>

              {/* Password requirements */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <p className="text-[#7A8BB5] text-xs font-semibold mb-2 uppercase tracking-wide">Requirements</p>
                {[
                  { label: "At least 8 characters", met: newPw.length >= 8 },
                  { label: "One uppercase letter (A–Z)", met: /[A-Z]/.test(newPw) },
                  { label: "One number (0–9)", met: /[0-9]/.test(newPw) },
                  { label: "One special character (!@#$…)", met: /[^a-zA-Z0-9]/.test(newPw) },
                ].map(({ label, met }) => (
                  <div key={label} className="flex items-center gap-2 py-1">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-none transition-colors ${met ? "bg-green-500" : "bg-[#E0E5F2]"}`}>
                      {met && <svg width="8" height="8" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="7 2 3 6 1 4"/></svg>}
                    </div>
                    <span className={`text-xs transition-colors ${met ? "text-green-600 font-semibold" : "text-[#9BAACE]"}`}>{label}</span>
                  </div>
                ))}
              </div>

              {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}

              <button
                type="submit"
                disabled={step === "resetting"}
                className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base flex items-center justify-center gap-2 disabled:opacity-60 active:scale-95 transition-all shadow-md"
              >
                {step === "resetting"
                  ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Updating password…</>
                  : "Set New Password"
                }
              </button>
            </form>
          </>
        )}

        {/* ── Success ── */}
        {step === "success" && (
          <div className="flex flex-col items-center text-center flex-1 justify-center">
            <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center mb-8">
              <svg width="52" height="52" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"><polyline points="44 12 20 36 8 24"/></svg>
            </div>
            <h1 className="text-[#1E2D5A] font-extrabold text-2xl mb-3">Password Updated!</h1>
            <p className="text-[#7A8BB5] text-sm leading-relaxed max-w-xs mb-10">
              Your password has been changed successfully. You can now sign in with your new password.
            </p>
            <button onClick={() => navigate("/auth/login")} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-transform shadow-md">
              Sign In with New Password
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
