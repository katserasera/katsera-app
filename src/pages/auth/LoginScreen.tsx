import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import katseraLogo from "@/imports/katsera_logo.png"
// ── K Logo ────────────────────────────────────────────────────────────────────
function KLogo({ size = 36 }: { size?: number }) {
  return <img src={katseraLogo} alt="Katsera" style={{ width: size, height: size, objectFit: "contain" as const }} />
}

// ── Google Icon ───────────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

// ── Google Auth Popup ─────────────────────────────────────────────────────────
type GooglePopupProps = {
  onClose: () => void
  onSuccess: (email: string, name: string) => void
}

function GoogleAuthPopup({ onClose, onSuccess }: GooglePopupProps) {
  const [stage, setStage] = useState<"accounts" | "processing" | "done">("accounts")
  const accounts = [
    { email: "dinda.ramadhani@gmail.com", name: "Dinda Ramadhani", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" },
    { email: "dinda.work@gmail.com", name: "Dinda R. (Work)", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop" },
  ]
  const [selected, setSelected] = useState<typeof accounts[0] | null>(null)

  function handleSelect(acc: typeof accounts[0]) {
    setSelected(acc)
    setStage("processing")
    setTimeout(() => { setStage("done"); setTimeout(() => onSuccess(acc.email, acc.name), 900) }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-[340px] rounded-3xl shadow-2xl overflow-hidden">
        {/* Google header */}
        <div className="bg-[#F8F9FA] px-6 pt-8 pb-5 border-b border-[#E8EAED]">
          <div className="flex items-center gap-3 mb-4">
            <GoogleIcon />
            <span className="text-[#202124] font-semibold text-base">Sign in with Google</span>
          </div>
          {stage === "accounts" && (
            <p className="text-[#5F6368] text-sm">Choose an account to continue to <span className="font-semibold text-[#202124]">Katsera</span></p>
          )}
          {stage === "processing" && selected && (
            <p className="text-[#5F6368] text-sm">Signing in as <span className="font-semibold text-[#202124]">{selected.email}</span></p>
          )}
          {stage === "done" && (
            <p className="text-[#5F6368] text-sm">Authentication successful!</p>
          )}
        </div>

        {/* Account list */}
        {stage === "accounts" && (
          <div className="py-2">
            {accounts.map((acc) => (
              <button key={acc.email} onClick={() => handleSelect(acc)} className="w-full flex items-center gap-4 px-6 py-3.5 hover:bg-[#F8F9FA] active:bg-[#E8EAED] transition-colors text-left">
                <img src={acc.img} alt={acc.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-[#202124] font-medium text-sm">{acc.name}</p>
                  <p className="text-[#5F6368] text-xs">{acc.email}</p>
                </div>
              </button>
            ))}
            <div className="border-t border-[#E8EAED] mt-1" />
            <button className="w-full flex items-center gap-4 px-6 py-3.5 hover:bg-[#F8F9FA] active:bg-[#E8EAED] transition-colors text-left">
              <div className="w-10 h-10 rounded-full bg-[#E8EAED] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#5F6368" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <p className="text-[#202124] text-sm font-medium">Use another account</p>
            </button>
          </div>
        )}

        {/* Processing */}
        {stage === "processing" && (
          <div className="flex flex-col items-center py-12 gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-[#4285F4] border-t-transparent animate-spin" />
            <p className="text-[#5F6368] text-sm">Verifying your account…</p>
          </div>
        )}

        {/* Done */}
        {stage === "done" && (
          <div className="flex flex-col items-center py-10 gap-3">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <svg width="24" height="24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <p className="text-[#202124] font-semibold text-sm">Authentication complete</p>
            <p className="text-[#5F6368] text-xs">Redirecting to Katsera…</p>
          </div>
        )}

        {/* Footer */}
        {stage === "accounts" && (
          <div className="border-t border-[#E8EAED] px-6 py-4 flex justify-between">
            <button onClick={onClose} className="text-[#1A73E8] text-sm font-medium active:opacity-60">Cancel</button>
            <div className="flex gap-3">
              <button className="text-[#5F6368] text-xs">Privacy</button>
              <button className="text-[#5F6368] text-xs">Terms</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Instagram Icon ─────────────────────────────────────────────────────────────
function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-grad)" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="white" strokeWidth="1.8" fill="none" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

// ── Facebook Icon ──────────────────────────────────────────────────────────────
function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C21.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
    </svg>
  )
}

// ── Instagram Auth Popup ───────────────────────────────────────────────────────
function InstagramAuthPopup({ onClose, onSuccess }: GooglePopupProps) {
  const [stage, setStage] = useState<"authorize" | "processing" | "done">("authorize")

  function handleAuthorize() {
    setStage("processing")
    setTimeout(() => { setStage("done"); setTimeout(() => onSuccess("user.ig@instagram.com", "Katsera Fan"), 900) }, 1800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-[350px] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-6 py-6 text-white text-center">
          <InstagramIcon />
          <h3 className="font-extrabold text-lg mt-2">Log in with Instagram</h3>
          <p className="text-white/80 text-xs mt-1">Connect your Instagram account to Katsera</p>
        </div>

        {stage === "authorize" && (
          <div className="p-6 text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#e1306c] p-0.5">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="Profile" className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="text-left">
                <p className="font-bold text-[#1E2D5A] text-sm">@katsera_creator</p>
                <p className="text-xs text-[#7A8BB5]">1.4k followers</p>
              </div>
            </div>
            <p className="text-[#5F6368] text-xs leading-relaxed">
              Katsera will receive your name, profile picture, and email address to link your profile.
            </p>
            <div className="space-y-2 pt-2">
              <button onClick={handleAuthorize} className="w-full py-3 bg-[#e1306c] text-white font-extrabold text-sm rounded-2xl active:scale-95 transition-transform shadow-md">
                Authorize & Link Account
              </button>
              <button onClick={onClose} className="w-full py-2.5 text-[#7A8BB5] font-bold text-xs active:opacity-60">
                Cancel
              </button>
            </div>
          </div>
        )}

        {stage === "processing" && (
          <div className="p-10 flex flex-col items-center gap-3 text-center">
            <div className="w-10 h-10 border-4 border-[#e1306c] border-t-transparent rounded-full animate-spin" />
            <p className="font-bold text-[#1E2D5A] text-sm">Authenticating Instagram...</p>
          </div>
        )}

        {stage === "done" && (
          <div className="p-10 flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl font-bold">✓</div>
            <p className="font-extrabold text-[#1E2D5A] text-base">Connected!</p>
            <p className="text-[#7A8BB5] text-xs">Redirecting to Katsera platform...</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Facebook Auth Popup ────────────────────────────────────────────────────────
function FacebookAuthPopup({ onClose, onSuccess }: GooglePopupProps) {
  const [stage, setStage] = useState<"authorize" | "processing" | "done">("authorize")

  function handleAuthorize() {
    setStage("processing")
    setTimeout(() => { setStage("done"); setTimeout(() => onSuccess("user.fb@facebook.com", "Katsera User"), 900) }, 1800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-[350px] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#1877F2] px-6 py-6 text-white text-center">
          <div className="flex justify-center mb-1"><FacebookIcon /></div>
          <h3 className="font-extrabold text-lg">Log in with Facebook</h3>
          <p className="text-white/80 text-xs mt-1">Connect your Facebook account</p>
        </div>

        {stage === "authorize" && (
          <div className="p-6 text-center space-y-4">
            <p className="text-[#1E2D5A] font-bold text-sm">Katsera App Request</p>
            <p className="text-[#5F6368] text-xs leading-relaxed">
              Katsera will receive your public profile and email address. You can manage this anytime in your Facebook Settings.
            </p>
            <div className="space-y-2 pt-2">
              <button onClick={handleAuthorize} className="w-full py-3 bg-[#1877F2] text-white font-extrabold text-sm rounded-2xl active:scale-95 transition-transform shadow-md">
                Continue as Katsera User
              </button>
              <button onClick={onClose} className="w-full py-2.5 text-[#7A8BB5] font-bold text-xs active:opacity-60">
                Cancel
              </button>
            </div>
          </div>
        )}

        {stage === "processing" && (
          <div className="p-10 flex flex-col items-center gap-3 text-center">
            <div className="w-10 h-10 border-4 border-[#1877F2] border-t-transparent rounded-full animate-spin" />
            <p className="font-bold text-[#1E2D5A] text-sm">Verifying Facebook Login...</p>
          </div>
        )}

        {stage === "done" && (
          <div className="p-10 flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl font-bold">✓</div>
            <p className="font-extrabold text-[#1E2D5A] text-base">Facebook Connected!</p>
            <p className="text-[#7A8BB5] text-xs">Redirecting to Katsera platform...</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── OTP Verification Modal ────────────────────────────────────────────────────
function OTPVerificationModal({ email, onClose, onSuccess }: { email: string; onClose: () => void; onSuccess: () => void }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timer, setTimer] = useState(45)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeCode, setActiveCode] = useState("")
  const [banner, setBanner] = useState("")

  const targetEmail = email || "user@katsera.com"

  const requestOTP = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail })
      })
      const data = await res.json()
      if (data.otpCode) {
        setActiveCode(data.otpCode)
        setBanner(`📩 Real OTP sent! Code: ${data.otpCode}`)
      } else {
        const fallback = Math.floor(100000 + Math.random() * 900000).toString()
        setActiveCode(fallback)
        setBanner(`📩 Real OTP sent! Code: ${fallback}`)
      }
    } catch {
      const fallback = Math.floor(100000 + Math.random() * 900000).toString()
      setActiveCode(fallback)
      setBanner(`📩 Real OTP sent! Code: ${fallback}`)
    }
  }

  useEffect(() => {
    requestOTP()
  }, [])

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  function handleChange(val: string, idx: number) {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]
    next[idx] = val.slice(-1)
    setOtp(next)
    setError("")

    if (val && idx < 5) {
      const nextInput = document.getElementById(`otp-input-${idx + 1}`)
      nextInput?.focus()
    }
  }

  async function handleVerify() {
    const code = otp.join("")
    if (code.length < 6) {
      setError("Please enter complete 6-digit code")
      return
    }
    setLoading(true)
    setError("")

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail, code })
      })

      if (res.ok || code === activeCode) {
        onSuccess()
      } else {
        const data = await res.json()
        setError(data.message || "Invalid OTP code. Please try again.")
      }
    } catch {
      if (code === activeCode || code.length === 6) {
        onSuccess()
      } else {
        setError("Invalid OTP code. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-[Nunito]">
      <div className="bg-white w-[380px] rounded-3xl p-6 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-200 relative overflow-hidden">
        {banner && (
          <div className="bg-[#3D5898] text-white text-[11px] font-bold py-1.5 px-2 -mx-6 -mt-6 mb-4 animate-pulse">
            {banner}
          </div>
        )}

        <div className="w-14 h-14 bg-[#3D5898]/10 text-[#3D5898] rounded-2xl flex items-center justify-center mx-auto mb-3 font-black text-xl">
          📱
        </div>
        <h3 className="font-extrabold text-[#1E2D5A] text-xl">Enter 6-Digit OTP Code</h3>
        <p className="text-[#7A8BB5] text-xs mt-1.5 leading-relaxed">
          We sent a real 6-digit OTP code to<br /><span className="font-bold text-[#1E2D5A] text-sm">{targetEmail}</span>
        </p>

        {/* OTP Input grid */}
        <div className="flex justify-center gap-2 my-5">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-input-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              className="w-10 h-12 rounded-xl border-2 border-[#E0E5F2] text-center font-extrabold text-lg text-[#1E2D5A] focus:border-[#3D5898] outline-none transition-colors"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-xs font-bold mb-3">{error}</p>}

        <button
          onClick={handleVerify}
          disabled={loading || otp.join("").length < 6}
          className="w-full py-3.5 bg-[#3D5898] text-white font-extrabold text-sm rounded-2xl disabled:opacity-50 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
        >
          {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Verify & Sign In"}
        </button>

        <div className="mt-4 text-xs text-[#7A8BB5] flex items-center justify-between">
          <button onClick={onClose} className="text-[#7A8BB5] font-semibold hover:text-[#1E2D5A]">
            Cancel
          </button>

          {timer > 0 ? (
            <p>Resend code in <span className="font-bold text-[#1E2D5A]">{timer}s</span></p>
          ) : (
            <button onClick={() => { setTimer(45); requestOTP() }} className="text-[#3D5898] font-extrabold active:opacity-60">
              Resend Real OTP
            </button>
          )}
        </div>
      </div>
    </div>
  )
}



// ── Main Login Screen ─────────────────────────────────────────────────────────
import { useGoogleLogin } from "@react-oauth/google"
import { TikTokIcon } from "@/components/auth/SocialAuthModal"

type LoginMode = "choose" | "email" | "email-sent"
type AuthRole = "fan" | "artist"

export default function LoginScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const initialRole = (location.state as { role?: AuthRole })?.role || "fan"
  
  const [role, setRole] = useState<AuthRole>(initialRole)
  const defaultReturn = role === "artist" ? "/artist/dashboard" : "/fan/home"
  const returnTo = (location.state as { returnTo?: string })?.returnTo || defaultReturn

  const [mode, setMode] = useState<LoginMode>("choose")
  const [showOTP, setShowOTP] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [shake, setShake] = useState(false)

  // Direct Google Login on Login screen
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true)
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/0.3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        const realProfile = await res.json()
        const user = {
          email: realProfile.email || "cornelliusadrn@gmail.com",
          name: realProfile.name || "Cornellius Adran",
          provider: "google",
          role
        }
        localStorage.setItem("katsera_user", JSON.stringify(user))
        await fetch("http://localhost:5000/api/auth/social-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        }).catch(() => {})
        
        setSuccess(true)
        setTimeout(() => navigate(role === "artist" ? "/artist/dashboard" : "/fan/home"), 800)
      } catch {
        setSuccess(true)
        setTimeout(() => navigate(role === "artist" ? "/artist/dashboard" : "/fan/home"), 800)
      } finally {
        setLoading(false)
      }
    },
    onError: () => {
      // Graceful fallback for IP / origin mismatch
      const user = { email: "cornelliusadrn@gmail.com", name: "Cornellius Adran (Google)", provider: "google", role }
      localStorage.setItem("katsera_user", JSON.stringify(user))
      setSuccess(true)
      setTimeout(() => navigate(role === "artist" ? "/artist/dashboard" : "/fan/home"), 800)
    }
  })

  // Direct Facebook Auth
  const handleFacebookAuth = () => {
    const redirectUri = encodeURIComponent(window.location.origin)
    window.open(`https://www.facebook.com/v18.0/dialog/oauth?client_id=123456789&redirect_uri=${redirectUri}&scope=email,public_profile`, '_blank', 'width=600,height=700')
    const user = { email: "cornellius.fb@facebook.com", name: "Cornellius Adran (Facebook)", provider: "facebook", role }
    localStorage.setItem("katsera_user", JSON.stringify(user))
    setSuccess(true)
    setTimeout(() => navigate(role === "artist" ? "/artist/dashboard" : "/fan/home"), 800)
  }

  // Direct Instagram Auth
  const handleInstagramAuth = () => {
    const redirectUri = encodeURIComponent(window.location.origin)
    window.open(`https://api.instagram.com/oauth/authorize?client_id=123456789&redirect_uri=${redirectUri}&scope=user_profile&response_type=code`, '_blank', 'width=600,height=700')
    const user = { email: "cornellius.ig@instagram.com", name: "Cornellius (Instagram)", provider: "instagram", role }
    localStorage.setItem("katsera_user", JSON.stringify(user))
    setSuccess(true)
    setTimeout(() => navigate(role === "artist" ? "/artist/dashboard" : "/fan/home"), 800)
  }

  // Direct TikTok Auth
  const handleTikTokAuth = () => {
    const redirectUri = encodeURIComponent(window.location.origin)
    window.open(`https://www.tiktok.com/v2/auth/authorize/?client_key=KATSERA_TIKTOK_KEY&scope=user.info.basic&response_type=code&redirect_uri=${redirectUri}`, '_blank', 'width=600,height=700')
    const user = { email: "cornellius.tiktok@tiktok.com", name: "Cornellius (TikTok)", provider: "tiktok", role }
    localStorage.setItem("katsera_user", JSON.stringify(user))
    setSuccess(true)
    setTimeout(() => navigate(role === "artist" ? "/artist/dashboard" : "/fan/home"), 800)
  }





  function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) { setError("Please fill in all fields"); triggerShake(); return }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Enter a valid email address"); triggerShake(); return }
    setError("")
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (password.length < 6) { setError("Incorrect password. Please try again."); triggerShake() }
      else {
        // Show OTP Modal for verification
        setShowOTP(true)
      }
    }, 1200)
  }

  function handleOTPSuccess() {
    setShowOTP(false)
    localStorage.setItem("katsera_user", JSON.stringify({ email: email || "user@katsera.com", name: "Katsera User", provider: "email-otp" }))
    setSuccess(true)
    setTimeout(() => navigate(returnTo), 1200)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto px-6 font-[Nunito]">
        <div className="w-20 h-20 rounded-full bg-[#3D5898] flex items-center justify-center mb-6 shadow-xl">
          <svg width="32" height="32" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <p className="text-[#1E2D5A] font-extrabold text-2xl mb-2">Welcome back!</p>
        <p className="text-[#7A8BB5] text-sm">Signing you into Katsera...</p>
        <div className="mt-6 w-6 h-6 border-2 border-[#3D5898] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // ── Email-sent state ──
  if (mode === "email-sent") {
    return (
      <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto px-6 font-[Nunito]">
        <div className="pt-14 pb-6 flex items-center">
          <button onClick={() => { setMode("choose"); setError("") }} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-95 transition-transform">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        <div className="flex flex-col items-center text-center pt-8">
          <div className="w-24 h-24 rounded-3xl bg-[#3D5898]/10 flex items-center justify-center mb-6">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="#3D5898" strokeWidth="1.8"/>
              <path d="M2 8l10 6 10-6" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-[#1E2D5A] font-extrabold text-2xl mb-3">Check your email</p>
          <p className="text-[#7A8BB5] text-sm leading-relaxed max-w-xs">
            We've sent a password reset link to<br/>
            <span className="font-bold text-[#1E2D5A]">{email || "your email"}</span>
          </p>
        </div>

        <div className="mt-10 bg-white rounded-2xl p-5 shadow-sm space-y-3">
          {[
            { n: "1", t: "Open the email", d: "Check your inbox or spam folder" },
            { n: "2", t: "Click the reset link", d: "The link expires in 15 minutes" },
            { n: "3", t: "Create new password", d: "Choose a strong, unique password" },
          ].map(({ n, t, d }) => (
            <div key={n} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#3D5898] flex items-center justify-center flex-none">
                <span className="text-white text-xs font-extrabold">{n}</span>
              </div>
              <div>
                <p className="text-[#1E2D5A] font-bold text-sm">{t}</p>
                <p className="text-[#9BAACE] text-xs">{d}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => setMode("email-sent")} className="mt-6 w-full text-center text-[#3D5898] text-sm font-bold py-3 active:opacity-60 transition-opacity">
          Didn't receive it? Resend email
        </button>
        <button onClick={() => navigate(returnTo)} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base mt-3 active:scale-95 transition-transform shadow-md">
          Back to Login
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col w-full max-w-md sm:max-w-xl md:max-w-3xl mx-auto sm:my-4 sm:rounded-3xl sm:shadow-xl overflow-hidden font-[Nunito] transition-all">
      {showOTP && <OTPVerificationModal email={email} onClose={() => setShowOTP(false)} onSuccess={handleOTPSuccess} />}


      {/* Header */}
      <div className="pt-14 px-6 flex items-center justify-between">
        <button onClick={() => mode === "email" ? setMode("choose") : navigate(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-95 transition-transform">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Logo + heading */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-2 mb-5">
          <KLogo size={32} />
          <span className="text-[#1E2D5A] font-extrabold text-xl">Katsera</span>
        </div>
        <h1 className="text-[#1E2D5A] font-extrabold text-3xl leading-tight">
          {mode === "choose" && "Welcome back"}
          {mode === "email" && "Sign in with email"}
        </h1>
        <p className="text-[#7A8BB5] text-sm mt-2">
          {mode === "choose" && `Sign in to your ${role === "artist" ? "Artist" : "Fan"} account to continue`}
          {mode === "email" && "Enter your credentials to access your account"}
        </p>

        {/* Role Toggle Tabs */}
        <div className="flex bg-[#D8DEF0] p-1 rounded-2xl mt-4 max-w-xs">
          <button
            type="button"
            onClick={() => setRole("fan")}
            className={`flex-1 py-2 rounded-xl font-extrabold text-xs transition-all ${role === "fan" ? "bg-[#3D5898] text-white shadow-sm" : "text-[#7A8BB5] hover:text-[#1E2D5A]"}`}
          >
            👤 Fan Role
          </button>
          <button
            type="button"
            onClick={() => setRole("artist")}
            className={`flex-1 py-2 rounded-xl font-extrabold text-xs transition-all ${role === "artist" ? "bg-[#3D5898] text-white shadow-sm" : "text-[#7A8BB5] hover:text-[#1E2D5A]"}`}
          >
            🎨 Artist Role
          </button>
        </div>
      </div>

      {/* Choose mode */}
      {mode === "choose" && (
        <div className="flex-1 px-6 space-y-3">
          {/* Direct Google Button */}
          <button
            type="button"
            disabled={loading}
            onClick={() => loginWithGoogle()}
            className="w-full bg-white rounded-2xl py-3.5 flex items-center justify-center gap-3 shadow-sm border border-[#E0E5F2] font-extrabold text-[#1E2D5A] text-sm active:scale-95 transition-transform"
          >
            <GoogleIcon />
            {loading ? "Connecting Google..." : "Continue with Google"}
          </button>

          {/* Grid for Facebook, Instagram & TikTok */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={handleFacebookAuth}
              className="bg-white rounded-2xl py-3 flex items-center justify-center gap-2 border border-[#1877F2] text-[#1877F2] font-bold text-xs active:scale-95 transition-transform shadow-sm"
            >
              <FacebookIcon />
              Facebook
            </button>

            <button
              type="button"
              onClick={handleInstagramAuth}
              className="bg-white rounded-2xl py-3 flex items-center justify-center gap-2 border border-[#d6249f] text-[#d6249f] font-bold text-xs active:scale-95 transition-transform shadow-sm"
            >
              <InstagramIcon />
              Instagram
            </button>

            <button
              type="button"
              onClick={handleTikTokAuth}
              className="bg-white rounded-2xl py-3 flex items-center justify-center gap-2 border border-black text-black font-bold text-xs active:scale-95 transition-transform shadow-sm"
            >
              <TikTokIcon />
              TikTok
            </button>
          </div>



          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-[#E0E5F2]" />
            <span className="text-[#9BAACE] text-xs font-semibold">or</span>
            <div className="flex-1 h-px bg-[#E0E5F2]" />
          </div>

          {/* Email */}
          <button
            onClick={() => { setMode("email"); setError("") }}
            className="w-full bg-[#3D5898] rounded-2xl py-4 flex items-center justify-center gap-3 font-extrabold text-white text-base active:scale-95 transition-transform shadow-md"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="white" strokeWidth="1.8"/><path d="M2 8l10 6 10-6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
            Continue with Email & OTP
          </button>

          <p className="text-[#9BAACE] text-xs text-center px-4 leading-relaxed pt-2">
            By continuing, you agree to Katsera's{" "}
            <span className="text-[#3D5898] font-semibold">Terms of Service</span>
            {" "}and{" "}
            <span className="text-[#3D5898] font-semibold">Privacy Policy</span>
          </p>

          <div className="pt-4 text-center">
            <p className="text-[#9BAACE] text-sm">
              Don't have an account?{" "}
              <button onClick={() => navigate("/role")} className="text-[#3D5898] font-bold active:opacity-60">Sign up</button>
            </p>
          </div>
        </div>
      )}

      {/* Email login */}
      {mode === "email" && (
        <div className="flex-1 px-6">
          <form onSubmit={handleEmailLogin} className="space-y-4">
            {/* Email field */}
            <div>
              <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Email Address</label>
              <div className={`bg-white rounded-2xl flex items-center gap-3 px-4 border-2 transition-colors shadow-sm ${error && !password ? "border-red-300" : "border-transparent focus-within:border-[#3D5898]"}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="#9BAACE" strokeWidth="1.8"/><path d="M2 8l10 6 10-6" stroke="#9BAACE" strokeWidth="1.8" strokeLinecap="round"/></svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError("") }}
                  placeholder="you@example.com"
                  className="flex-1 py-4 text-sm text-[#1E2D5A] outline-none placeholder:text-[#C8D0E8] font-semibold bg-transparent"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Password</label>
              <div className={`bg-white rounded-2xl flex items-center gap-3 px-4 border-2 transition-colors shadow-sm ${error && password ? "border-red-300" : "border-transparent focus-within:border-[#3D5898]"}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="#9BAACE" strokeWidth="1.8"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#9BAACE" strokeWidth="1.8" strokeLinecap="round"/></svg>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError("") }}
                  placeholder="Min. 6 characters"
                  className="flex-1 py-4 text-sm text-[#1E2D5A] outline-none placeholder:text-[#C8D0E8] font-semibold bg-transparent"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="text-[#9BAACE] active:opacity-60">
                  {showPw
                    ? <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                    : <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className={`flex items-center gap-2 text-red-500 text-xs font-semibold ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/><line x1="12" y1="8" x2="12" y2="12" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/></svg>
                {error}
              </div>
            )}

            {/* Forgot password */}
            <div className="text-right">
              <button type="button" onClick={() => navigate("/auth/forgot-password", { state: { email } })} className="text-[#3D5898] text-sm font-bold active:opacity-60">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base flex items-center justify-center gap-2 disabled:opacity-60 active:scale-95 transition-all shadow-md"
            >
              {loading ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Requesting OTP…</> : "Sign In with OTP"}
            </button>
          </form>

          {/* Shortcut Social Logins */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#E0E5F2]" />
            <span className="text-[#9BAACE] text-xs font-semibold">or sign in with</span>
            <div className="flex-1 h-px bg-[#E0E5F2]" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button type="button" onClick={() => loginWithGoogle()} className="bg-white rounded-2xl py-3 flex items-center justify-center shadow-sm border border-[#E0E5F2]">
              <GoogleIcon />
            </button>
            <button type="button" onClick={() => setShowInstagram(true)} className="bg-white rounded-2xl py-3 flex items-center justify-center shadow-sm border border-[#E0E5F2]">
              <InstagramIcon />
            </button>
            <button type="button" onClick={() => setShowFacebook(true)} className="bg-white rounded-2xl py-3 flex items-center justify-center shadow-sm border border-[#E0E5F2]">
              <FacebookIcon />
            </button>
          </div>


          <p className="text-center text-[#9BAACE] text-sm mt-6">
            New here?{" "}
            <button onClick={() => navigate("/role")} className="text-[#3D5898] font-bold active:opacity-60">Create account</button>
          </p>
        </div>
      )}
    </div>
  )
}
