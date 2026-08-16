import { useState } from "react"
import { Link } from "react-router-dom"

export default function Login() {
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex">
      {/* Left panel — image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#1A1917] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1000&fit=crop&auto=format"
          alt="Featured artwork"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917]/60 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10">
          <p className="font-display text-white text-2xl font-light leading-snug mb-2">
            "The work is the record of how it was made."
          </p>
          <p className="text-white/50 text-sm">— Elena Voss</p>
        </div>
        <Link to="/" className="absolute top-8 left-10 font-display text-white text-lg font-semibold tracking-tight">
          Katsera
        </Link>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        {/* Mobile logo */}
        <Link to="/" className="lg:hidden font-display text-2xl font-semibold text-[#161514] mb-10">
          Katsera
        </Link>

        <div className="w-full max-w-sm">
          {/* Mode toggle */}
          <div className="flex border border-[#DDD9D4] mb-8 overflow-hidden" style={{ borderRadius: "2px" }}>
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                  mode === m
                    ? "bg-[#161514] text-[#F8F7F4]"
                    : "text-[#7A7874] hover:text-[#161514]"
                }`}
              >
                {m === "login" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <h1 className="font-display text-2xl font-light text-[#161514] mb-1">
            {mode === "login" ? "Welcome back" : "Join Katsera"}
          </h1>
          <p className="text-sm text-[#7A7874] mb-8">
            {mode === "login"
              ? "Sign in to your artist account."
              : "Create a free account to showcase your work."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-medium text-[#4A4844] mb-1.5">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena Voss"
                  className="w-full px-4 py-2.5 border border-[#DDD9D4] bg-transparent text-sm text-[#161514] placeholder:text-[#AEACA6] focus:outline-none focus:border-[#161514] transition-colors"
                  style={{ borderRadius: "2px" }}
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-[#4A4844] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elena@example.com"
                className="w-full px-4 py-2.5 border border-[#DDD9D4] bg-transparent text-sm text-[#161514] placeholder:text-[#AEACA6] focus:outline-none focus:border-[#161514] transition-colors"
                style={{ borderRadius: "2px" }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#4A4844] mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-[#DDD9D4] bg-transparent text-sm text-[#161514] placeholder:text-[#AEACA6] focus:outline-none focus:border-[#161514] transition-colors"
                style={{ borderRadius: "2px" }}
              />
            </div>

            {mode === "login" && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-[#7A7874] hover:text-[#161514] transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#161514] text-[#F8F7F4] text-sm font-medium hover:bg-[#2E2C2A] transition-colors mt-2"
              style={{ borderRadius: "2px" }}
            >
              {mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#DDD9D4]" />
            <p className="text-xs text-[#AEACA6]">or continue with</p>
            <div className="flex-1 h-px bg-[#DDD9D4]" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            {["Google", "Apple"].map((provider) => (
              <button
                key={provider}
                className="py-2.5 border border-[#DDD9D4] text-sm text-[#4A4844] hover:border-[#161514] hover:text-[#161514] transition-colors"
                style={{ borderRadius: "2px" }}
              >
                {provider}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-[#7A7874] mt-8">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-[#161514] font-medium hover:text-[#C8684A] transition-colors"
            >
              {mode === "login" ? "Sign up free" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
