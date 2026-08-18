import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import SocialAuthModal, { SocialProvider, GoogleIcon, FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/auth/SocialAuthModal"

export default function FanSignUp() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeModal, setActiveModal] = useState<SocialProvider | null>(null)

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("Please enter your email address")
      return
    }
    if (!password) {
      setError("Please enter your password")
      return
    }

    setLoading(true)
    setError("")

    const fullName = `${firstName} ${lastName}`.trim() || email.split("@")[0] || "Fan User"
    const userAuth = {
      email: email.trim().toLowerCase(),
      password,
      name: fullName,
      role: "fan",
      createdAt: new Date().toISOString()
    }
    localStorage.setItem("katsera_pending_auth", JSON.stringify(userAuth))
    localStorage.setItem("katsera_user", JSON.stringify(userAuth))

    try {
      await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userAuth.email, role: "fan" })
      })
    } catch {
      // Local fallback
    }

    setLoading(false)
    navigate("/fan/verify", { state: { email: userAuth.email } })
  }

  const inputCls = "w-full px-5 py-3.5 rounded-full border-2 border-[#3D5898] bg-white text-[#1E2D5A] placeholder:text-[#9BAACE] focus:outline-none focus:border-[#2D4270] text-base font-medium transition-colors"

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto relative overflow-hidden font-[Nunito]">
      {/* Decorative arcs top */}
      <div className="absolute top-0 left-0 right-0 flex-shrink-0 pointer-events-none" style={{ height: 180 }}>
        {/* Left arc */}
        <div
          className="absolute"
          style={{
            width: 200,
            height: 200,
            border: "none",
            background: "#3D5898",
            borderRadius: "50%",
            top: -100,
            left: -60,
          }}
        />
        {/* Gray circle over left */}
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
        {/* Right arc */}
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
        {/* Gray circle over right */}
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

      {/* Card */}
      <div
        className="relative z-10 flex-1 flex flex-col mt-28 bg-white mx-2 rounded-t-3xl rounded-b-none px-7 pt-7 pb-10 shadow-xl"
        style={{ minHeight: "calc(100vh - 7rem)" }}
      >
        <h1 className="text-[#1E2D5A] text-3xl font-extrabold text-center mb-6">Join as a fan</h1>

        {/* Social Sign Ins */}
        <div className="space-y-2.5 mb-5">
          {/* Direct Google Login */}
          <button
            type="button"
            disabled={loading}
            onClick={() => setActiveModal("google")}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-full border-2 border-[#3D5898] bg-white text-[#1E2D5A] font-extrabold text-sm hover:bg-[#f5f7fd] active:scale-95 transition-all shadow-sm disabled:opacity-50"
          >
            <GoogleIcon />
            {loading ? "Connecting Google..." : "Sign in with Google"}
          </button>

          {/* Direct Facebook, Instagram & TikTok Grid */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setActiveModal("facebook")}
              className="flex items-center justify-center gap-1.5 py-3 rounded-full border-2 border-[#1877F2] bg-white text-[#1877F2] font-extrabold text-xs hover:bg-[#f0f7ff] active:scale-95 transition-all shadow-sm"
            >
              <FacebookIcon />
              Facebook
            </button>

            <button
              type="button"
              onClick={() => setActiveModal("instagram")}
              className="flex items-center justify-center gap-1.5 py-3 rounded-full border-2 border-[#d6249f] bg-white text-[#d6249f] font-extrabold text-xs hover:bg-[#fdf0f9] active:scale-95 transition-all shadow-sm"
            >
              <InstagramIcon />
              Instagram
            </button>

            <button
              type="button"
              onClick={() => setActiveModal("tiktok")}
              className="flex items-center justify-center gap-1.5 py-3 rounded-full border-2 border-black bg-white text-black font-extrabold text-xs hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
            >
              <TikTokIcon />
              TikTok
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-[#E0E5F2]" />
          <span className="text-sm text-[#9BAACE] font-medium">or</span>
          <div className="flex-1 h-px bg-[#E0E5F2]" />
        </div>

        <form onSubmit={handleContinue} className="flex flex-col gap-4">
          {/* First + Last name */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className={inputCls}
              style={{ borderRadius: "50px" }}
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className={inputCls}
              style={{ borderRadius: "50px" }}
            />
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={inputCls}
            style={{ borderRadius: "50px" }}
          />

          {/* Password */}
          <div className="flex gap-2 items-center">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={inputCls + " flex-1"}
              style={{ borderRadius: "50px" }}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="w-12 h-12 rounded-full border-2 border-[#3D5898] bg-white flex items-center justify-center hover:bg-[#f5f7fd] flex-shrink-0 transition-colors"
            >
              {showPass ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D5898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D5898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

          {/* Continue */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-[#3D5898] text-white font-bold text-lg hover:bg-[#2D4270] active:scale-95 transition-all shadow-md mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Continue"}
          </button>
        </form>

        <p className="text-center text-xs text-[#9BAACE] mt-4 leading-relaxed">
          Signing up for a Katsera account means you agree to the{" "}
          <span className="underline text-[#3D5898] cursor-pointer">Privacy Policy</span> and{" "}
          <span className="underline text-[#3D5898] cursor-pointer">Terms of Service</span>.
        </p>

        <p className="text-center text-sm text-[#4A5A80] mt-auto pt-8 font-medium">
          Already have an account?{" "}
          <Link to="/auth/login" state={{ role: "fan" }} className="text-[#1E2D5A] font-bold underline">
            Log in
          </Link>
        </p>
      </div>

      {/* Social Auth Modal */}
      {activeModal && (
        <SocialAuthModal
          provider={activeModal}
          role="fan"
          onClose={() => setActiveModal(null)}
          onSuccess={(userData) => {
            setActiveModal(null)
            localStorage.setItem("katsera_user", JSON.stringify(userData))
            localStorage.setItem("katsera_pending_auth", JSON.stringify(userData))
            navigate("/fan/pick-artists")
          }}
        />
      )}
    </div>
  )
}
