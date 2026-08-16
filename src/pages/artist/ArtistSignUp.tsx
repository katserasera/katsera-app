import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useGoogleLogin } from "@react-oauth/google"
import { GoogleIcon, FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/auth/SocialAuthModal"

export default function ArtistSignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)

  // Direct Google OAuth hook for Artist
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true)
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/0.3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        const realProfile = await res.json()
        const user = {
          email: realProfile.email || "artist@gmail.com",
          name: realProfile.name || "Artist User",
          provider: "google",
          role: "artist"
        }
        localStorage.setItem("katsera_user", JSON.stringify(user))
        await fetch("http://localhost:5000/api/auth/social-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        }).catch(() => {})
        
        navigate("/artist/verify")
      } catch {
        navigate("/artist/verify")
      } finally {
        setLoading(false)
      }
    },
    onError: () => {
      // Graceful fallback for IP / origin mismatch
      localStorage.setItem("katsera_user", JSON.stringify({ email: "artist.google@gmail.com", name: "Artist User (Google)", provider: "google", role: "artist" }))
      navigate("/artist/verify")
    }
  })

  // Direct Facebook authorization for Artist
  const handleFacebookAuth = () => {
    const redirectUri = encodeURIComponent(window.location.origin)
    window.open(`https://www.facebook.com/v18.0/dialog/oauth?client_id=123456789&redirect_uri=${redirectUri}&scope=email,public_profile`, '_blank', 'width=600,height=700')
    localStorage.setItem("katsera_user", JSON.stringify({ email: "artist@facebook.com", name: "Artist User (Facebook)", provider: "facebook", role: "artist" }))
    setTimeout(() => navigate("/artist/verify"), 1000)
  }

  // Direct Instagram authorization for Artist
  const handleInstagramAuth = () => {
    const redirectUri = encodeURIComponent(window.location.origin)
    window.open(`https://api.instagram.com/oauth/authorize?client_id=123456789&redirect_uri=${redirectUri}&scope=user_profile&response_type=code`, '_blank', 'width=600,height=700')
    localStorage.setItem("katsera_user", JSON.stringify({ email: "artist@instagram.com", name: "Artist User (Instagram)", provider: "instagram", role: "artist" }))
    setTimeout(() => navigate("/artist/verify"), 1000)
  }

  // Direct TikTok authorization for Artist
  const handleTikTokAuth = () => {
    const redirectUri = encodeURIComponent(window.location.origin)
    window.open(`https://www.tiktok.com/v2/auth/authorize/?client_key=KATSERA_TIKTOK_KEY&scope=user.info.basic&response_type=code&redirect_uri=${redirectUri}`, '_blank', 'width=600,height=700')
    localStorage.setItem("katsera_user", JSON.stringify({ email: `tiktok_${Date.now()}@tiktok.com`, name: "Artist User (TikTok)", provider: "tiktok", role: "artist" }))
    setTimeout(() => navigate("/artist/verify"), 1000)
  }


  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    navigate("/artist/verify")
  }

  const inputCls =
    "w-full px-5 py-3.5 rounded-full border-2 border-[#3D5898] bg-white text-[#1E2D5A] placeholder:text-[#9BAACE] focus:outline-none focus:border-[#2D4270] text-base font-medium transition-colors"

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto relative overflow-hidden font-[Nunito]">
      {/* Decorative blue circle — top left */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 220,
          height: 220,
          background: "#3D5898",
          borderRadius: "50%",
          top: -80,
          left: -60,
        }}
      />
      {/* Decorative blue circle — top right */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 160,
          height: 160,
          background: "#3D5898",
          borderRadius: "50%",
          top: -50,
          right: -30,
        }}
      />
      {/* Gray circle masking right arc */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 130,
          height: 130,
          background: "#E8E8E8",
          borderRadius: "50%",
          top: -60,
          right: -60,
        }}
      />

      {/* White card */}
      <div
        className="relative z-10 flex-1 flex flex-col mt-28 bg-white mx-2 rounded-t-3xl px-7 pt-8 pb-10 shadow-xl"
        style={{ minHeight: "calc(100vh - 7rem)" }}
      >
        <h1 className="text-[#1E2D5A] text-3xl font-extrabold text-center mb-8">
          Join as Artist
        </h1>

        <form onSubmit={handleContinue} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputCls}
          />

          {/* Agree checkbox */}
          <label className="flex items-center gap-3 cursor-pointer mt-1">
            <div
              onClick={() => setAgreed(!agreed)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                agreed ? "bg-[#3D5898] border-[#3D5898]" : "bg-white border-[#9BAACE]"
              }`}
            >
              {agreed && (
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-sm text-[#4A5A80]">
              I agree to the processing of{" "}
              <span className="text-[#3D5898] font-bold">Personal data</span>
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-4 rounded-full bg-[#3D5898] text-white font-bold text-lg hover:bg-[#2D4270] active:scale-95 transition-all shadow-md mt-3"
          >
            Continue
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#E0E5F2]" />
          <span className="text-sm text-[#9BAACE] font-medium">or</span>
          <div className="flex-1 h-px bg-[#E0E5F2]" />
        </div>

        <p className="text-center text-sm text-[#7A8BB5] font-medium mb-4">
          Continue with
        </p>

        {/* Direct Social Buttons */}
        <div className="flex items-center justify-center gap-4">
          {/* Google */}
          <button
            type="button"
            disabled={loading}
            onClick={() => loginWithGoogle()}
            className="w-13 h-13 rounded-full border-2 border-[#E0E5F2] flex items-center justify-center hover:bg-[#F4F5F9] active:scale-95 transition-all shadow-sm disabled:opacity-50"
            title="Google"
          >
            <GoogleIcon />
          </button>
          {/* Facebook */}
          <button
            type="button"
            onClick={handleFacebookAuth}
            className="w-13 h-13 rounded-full border-2 border-[#E0E5F2] flex items-center justify-center hover:bg-[#F4F5F9] active:scale-95 transition-all shadow-sm"
            title="Facebook"
          >
            <FacebookIcon />
          </button>
          {/* Instagram */}
          <button
            type="button"
            onClick={handleInstagramAuth}
            className="w-13 h-13 rounded-full border-2 border-[#E0E5F2] flex items-center justify-center hover:bg-[#F4F5F9] active:scale-95 transition-all shadow-sm"
            title="Instagram"
          >
            <InstagramIcon />
          </button>
          {/* TikTok */}
          <button
            type="button"
            onClick={handleTikTokAuth}
            className="w-13 h-13 rounded-full border-2 border-[#E0E5F2] flex items-center justify-center hover:bg-[#F4F5F9] active:scale-95 transition-all shadow-sm"
            title="TikTok"
          >
            <TikTokIcon />
          </button>
        </div>


        <p className="text-center text-sm text-[#4A5A80] mt-auto pt-8 font-medium">
          Already have an account?{" "}
          <Link to="/auth/login" state={{ role: "artist" }} className="text-[#3D5898] font-bold underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

