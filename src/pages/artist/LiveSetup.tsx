import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LiveSetup() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [mode, setMode] = useState<"public" | "membership">("public")
  const [aiMod, setAiMod] = useState(true)

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-[#F4F5F9] flex items-center justify-center"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-[#F4F5F9] flex items-center justify-center">
            {/* AI/effects icon */}
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3" stroke="#3D5898" strokeWidth="2"/>
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="#3D5898" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="w-10 h-10 rounded-full bg-[#F4F5F9] flex items-center justify-center">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path d="M23 4v6h-6M1 20v-6h6" stroke="#3D5898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" stroke="#3D5898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Camera preview area */}
      <div className="flex-1 flex flex-col justify-end px-5 pb-8">
        {/* Title input */}
        <div className="mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title your live"
            className="w-full text-2xl font-bold text-[#3D5898] placeholder:text-[#9BAACE] border-0 border-b-2 border-red-500 outline-none pb-2 bg-transparent"
          />
        </div>

        {/* Public / Membership toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode("public")}
            className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${
              mode === "public" ? "bg-red-500 text-white" : "bg-[#F4F5F9] text-[#9BAACE]"
            }`}
          >
            Public
          </button>
          <button
            onClick={() => setMode("membership")}
            className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${
              mode === "membership" ? "bg-red-500 text-white" : "bg-[#F4F5F9] text-[#9BAACE]"
            }`}
          >
            Membership Only
          </button>
        </div>

        {/* AI Moderation card */}
        <div className="bg-[#2D2D3A] rounded-2xl p-4 flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#1E2D5A] flex items-center justify-center flex-none">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#3D5898" strokeWidth="2" fill="#3D5898" fillOpacity="0.2"/>
              <path d="M9 12l2 2 4-4" stroke="#6B82BB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-white font-extrabold text-sm">AI Moderation</p>
            <p className="text-[#9BAACE] text-xs leading-snug">Auto-filter toxic comments and muted words</p>
          </div>
          <button
            onClick={() => setAiMod(!aiMod)}
            className={`w-12 h-6 rounded-full transition-all flex items-center px-0.5 ${aiMod ? "bg-blue-500" : "bg-[#555]"}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow transition-all ${aiMod ? "ml-6" : "ml-0"}`} />
          </button>
        </div>

        {/* Start button */}
        <button
          onClick={() => navigate("/artist/live/broadcast", { state: { title: title || "Live Stream", mode, aiMod } })}
          className="w-full py-4 rounded-2xl bg-red-500 text-white font-extrabold text-lg flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg"
        >
          Start live stream
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
