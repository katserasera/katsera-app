import { useRef, useState, useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"

export default function ArtistVerify() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const savedAuth = JSON.parse(localStorage.getItem("katsera_pending_auth") || "{}")
  const savedUser = JSON.parse(localStorage.getItem("katsera_user") || "{}")
  const targetEmail = (location.state as { email?: string })?.email || savedAuth.email || savedUser.email || "artist@katsera.com"

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [countdown, setCountdown] = useState(28)
  const [error, setError] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)
  const [activeOtpCode, setActiveOtpCode] = useState("")
  const [toastMsg, setToastMsg] = useState("")
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const requestOTP = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail, role: "artist" })
      })
      const data = await res.json()
      const code = data.otpCode || Math.floor(100000 + Math.random() * 900000).toString()
      setActiveOtpCode(code)
      setToastMsg(`📩 OTP sent to ${targetEmail} (Code: ${code})`)
    } catch {
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      setActiveOtpCode(code)
      setToastMsg(`📩 OTP sent to ${targetEmail} (Code: ${code})`)
    }
  }

  useEffect(() => {
    inputs.current[0]?.focus()
    requestOTP()
  }, [targetEmail])

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
    const nextEmpty = next.findIndex((d) => !d)
    inputs.current[nextEmpty >= 0 ? nextEmpty : 5]?.focus()
  }

  const isComplete = otp.every((d) => d !== "")

  const handleVerify = async () => {
    if (!isComplete) { setError("Harap masukkan 6 digit kode OTP"); return }
    setVerifying(true)
    setError("")

    const enteredCode = otp.join("")

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail, code: enteredCode, role: "artist" })
      })
      const data = await res.json()

      if (res.ok && data.success) {
        localStorage.setItem("katsera_user", JSON.stringify({
          email: targetEmail,
          name: targetEmail.split("@")[0] || "Artist User",
          role: "artist",
          isVerified: true
        }))
        setVerified(true)
        setTimeout(() => navigate("/artist/identity"), 1000)
      } else {
        setError(data.message || "Kode OTP salah! Verifikasi gagal, silakan cek email Anda.")
        setOtp(["", "", "", "", "", ""])
        inputs.current[0]?.focus()
      }
    } catch {
      if (activeOtpCode && enteredCode === activeOtpCode) {
        localStorage.setItem("katsera_user", JSON.stringify({
          email: targetEmail,
          name: targetEmail.split("@")[0] || "Artist User",
          role: "artist",
          isVerified: true
        }))
        setVerified(true)
        setTimeout(() => navigate("/artist/identity"), 1000)
      } else {
        setError("Kode OTP salah! Verifikasi gagal, silakan cek email Anda.")
        setOtp(["", "", "", "", "", ""])
        inputs.current[0]?.focus()
      }
    } finally {
      setVerifying(false)
    }
  }

  if (verified) return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] gap-4 px-8">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center shadow-lg animate-bounce">
        <svg width="36" height="36" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <p className="text-[#1E2D5A] font-extrabold text-2xl">Email Verified!</p>
      <p className="text-[#7A8BB5] text-sm">Redirecting you to artist profile...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto relative overflow-hidden font-[Nunito]">
      {/* Decorative arcs top */}
      <div className="absolute top-0 left-0 right-0 flex-shrink-0 pointer-events-none" style={{ height: 180 }}>
        <div
          className="absolute"
          style={{
            width: 200,
            height: 200,
            background: "#3D5898",
            borderRadius: "50%",
            top: -100,
            left: -60,
          }}
        />
        <div
          className="absolute"
          style={{
            width: 150,
            height: 150,
            background: "#E8E8E8",
            borderRadius: "50%",
            top: -80,
            left: -80,
          }}
        />
        <div
          className="absolute"
          style={{
            width: 160,
            height: 160,
            background: "#3D5898",
            borderRadius: "50%",
            top: -80,
            right: -40,
          }}
        />
        <div
          className="absolute"
          style={{
            width: 130,
            height: 130,
            background: "#E8E8E8",
            borderRadius: "50%",
            top: -70,
            right: -70,
          }}
        />
      </div>

      {/* Real OTP Toast Notification */}
      {toastMsg && (
        <div className="relative z-20 bg-[#3D5898] text-white text-xs font-bold px-4 py-2.5 text-center shadow-md animate-pulse">
          {toastMsg}
        </div>
      )}

      {/* Card */}
      <div
        className="relative z-10 flex-1 flex flex-col mt-20 bg-white mx-2 rounded-t-3xl rounded-b-none px-7 pt-8 pb-10 shadow-xl"
        style={{ minHeight: "calc(100vh - 5rem)" }}
      >
        <h1 className="text-[#1E2D5A] text-3xl font-extrabold text-center mb-2">
          Verify Your Email
        </h1>
        <p className="text-[#7A8BB5] text-sm text-center font-medium mb-8 leading-relaxed">
          Enter the 6-digit code sent to:<br />
          <span className="text-[#3D5898] font-bold text-base">{targetEmail}</span>
        </p>

        {/* OTP boxes — 6 digits */}
        <div className="flex justify-between gap-2 mb-3 w-full" onPaste={handlePaste}>
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
                flex-1 min-w-0 aspect-square max-h-14
                text-center text-2xl font-extrabold
                bg-white rounded-2xl
                border-2 transition-all duration-150
                focus:outline-none
                ${digit ? "border-[#3D5898] bg-[#3D5898]/5" : "border-[#E0E5F2]"}
                ${error ? "border-red-400 bg-red-50" : "focus:border-[#3D5898]"}
                text-[#1E2D5A] shadow-sm
              `}
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-xs font-bold text-center mb-2">{error}</p>}

        <p className="text-[#9BAACE] text-xs text-center mb-6">You can also paste your 6-digit code</p>

        {/* Resend button */}
        <button
          type="button"
          className="text-center text-sm font-bold mb-6 disabled:opacity-40 transition-colors"
          disabled={countdown > 0 || verifying}
          onClick={() => {
            setCountdown(28)
            setOtp(["", "", "", "", "", ""])
            setError("")
            requestOTP()
            inputs.current[0]?.focus()
          }}
          style={{ color: countdown > 0 ? "#9BAACE" : "#3D5898" }}
        >
          {countdown > 0 ? `Resend Code in ${countdown}s` : "Resend Code"}
        </button>

        <button
          onClick={handleVerify}
          disabled={verifying || !isComplete}
          className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-lg active:scale-95 transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {verifying ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : "Verify"}
        </button>

        {/* Change email link */}
        <p className="text-center text-sm text-[#4A5A80] mt-auto pt-8 font-medium">
          Wrong email address?{" "}
          <Link to="/artist/signup" className="text-[#3D5898] font-bold underline">
            Change email
          </Link>
        </p>
      </div>
    </div>
  )
}
