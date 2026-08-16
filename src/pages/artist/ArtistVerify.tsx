import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function ArtistVerify() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [countdown, setCountdown] = useState(28)
  const [error, setError] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Auto-focus first input on mount
    inputs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (countdown <= 0) return
    const t = setInterval(() => setCountdown((c) => c - 1), 1000)
    return () => clearInterval(t)
  }, [countdown])

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]
    next[i] = val
    setOtp(next)
    setError("")
    if (val && i < 5) inputs.current[i + 1]?.focus()
  }

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      const next = [...otp]; next[i - 1] = ""; setOtp(next)
      inputs.current[i - 1]?.focus()
    }
    if (e.key === "ArrowLeft" && i > 0) inputs.current[i - 1]?.focus()
    if (e.key === "ArrowRight" && i < 5) inputs.current[i + 1]?.focus()
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (!text) return
    const next = [...otp]
    text.split("").forEach((ch, idx) => { if (idx < 6) next[idx] = ch })
    setOtp(next)
    setError("")
    // Focus the next empty slot or last slot
    const nextEmpty = next.findIndex((d) => !d)
    inputs.current[nextEmpty >= 0 ? nextEmpty : 5]?.focus()
  }

  const isComplete = otp.every((d) => d !== "")

  const handleVerify = () => {
    if (!isComplete) { setError("Please enter all 6 digits"); return }
    setVerifying(true)
    setTimeout(() => {
      setVerifying(false)
      if (otp.join("") === "000000") { setError("Invalid code. Please try again."); setOtp(["","","","","",""]); inputs.current[0]?.focus(); return }
      setVerified(true)
      setTimeout(() => navigate("/artist/identity"), 1000)
    }, 1500)
  }

  if (verified) return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] gap-4 px-8">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
        <svg width="36" height="36" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <p className="text-[#1E2D5A] font-extrabold text-2xl">Email Verified!</p>
      <p className="text-[#7A8BB5] text-sm">Redirecting you...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="flex-1 flex flex-col px-6 sm:px-10 pt-16 sm:pt-20 pb-10">
        <h1 className="text-[#1E2D5A] text-3xl sm:text-4xl font-extrabold mb-3">
          Verify Your Email
        </h1>
        <p className="text-[#7A8BB5] text-sm sm:text-base font-medium mb-10 leading-relaxed">
          Enter the 6-digit code sent to:<br />
          <span className="text-[#3D5898] font-bold">nadinamizah099@gmail.com</span>
        </p>

        {/* OTP boxes — responsive, gap scales with screen */}
        <div className="flex justify-between gap-2 sm:gap-3 mb-3 w-full" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              autoComplete={i === 0 ? "one-time-code" : "off"}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`
                flex-1 min-w-0 aspect-square max-h-14 sm:max-h-16
                text-center text-xl sm:text-2xl font-extrabold
                bg-white rounded-xl sm:rounded-2xl
                border-2 transition-all duration-150
                focus:outline-none
                ${digit ? "border-[#3D5898] bg-[#3D5898]/5" : "border-[#E0E5F2]"}
                ${error ? "border-red-400 bg-red-50" : "focus:border-[#3D5898]"}
                text-[#1E2D5A]
              `}
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-xs font-semibold text-center mb-2">{error}</p>}

        {/* Paste hint */}
        <p className="text-[#9BAACE] text-xs text-center mb-8">You can also paste your 6-digit code</p>

        {/* Resend */}
        <button
          className="text-center text-sm font-semibold mb-6 disabled:opacity-40 transition-colors"
          disabled={countdown > 0 || verifying}
          onClick={() => { setCountdown(28); setOtp(["","","","","",""]); setError(""); inputs.current[0]?.focus() }}
          style={{ color: countdown > 0 ? "#9BAACE" : "#3D5898" }}
        >
          {countdown > 0 ? `Resend Code in ${countdown}s` : "Resend Code"}
        </button>

        <div className="h-px bg-[#C8D0E8] mb-6" />

        <button
          onClick={handleVerify}
          disabled={verifying || !isComplete}
          className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base sm:text-lg active:scale-95 transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {verifying ? <><div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />Verifying...</> : "Verify"}
        </button>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {otp.map((d, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-all ${d ? "bg-[#3D5898] scale-110" : "bg-[#E0E5F2]"}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
