import { useState } from "react"
import { useNavigate } from "react-router-dom"

const types = [
  {
    id: "singer",
    label: "Singer / Music Artist",
    subtitle: "Musicians, bands, DJs, producers, vocalists",
    emoji: "🎵",
    features: ["Upload songs & albums", "Live concerts & streams", "Fan memberships", "Merch shop", "Music analytics"],
    accent: "#3D5898",
  },
  {
    id: "painter",
    label: "Painter / Visual Artist",
    subtitle: "Painters, illustrators, digital artists, photographers",
    emoji: "🎨",
    features: ["Upload artworks & collections", "Commission system", "Live painting sessions", "Artwork shop", "Buyer analytics"],
    accent: "#5B4A9A",
  },
]

export default function CreatorTypeSelect() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>(null)

  function handleContinue() {
    if (selected === "singer") navigate("/artist/join")
    if (selected === "painter") navigate("/artist/join", { state: { creatorType: "painter" } })
  }

  return (
    <div className="min-h-screen bg-[#1E2D5A] relative overflow-hidden flex flex-col justify-between p-6 md:p-12 w-full font-[Nunito]">
      {/* Decorative Widescreen Background Shapes */}
      <div className="absolute pointer-events-none w-[500px] h-[500px] bg-[#3D5898]/40 rounded-full blur-3xl -top-40 -right-20 animate-pulse" />
      <div className="absolute pointer-events-none w-[450px] h-[450px] bg-[#5B4A9A]/30 rounded-full blur-3xl -bottom-40 -left-20 animate-pulse [animation-delay:1.5s]" />

      {/* Top Desktop Navigation Header */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white active:scale-95 transition-all shadow-md">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
          <svg width="20" height="23" viewBox="0 0 60 69" fill="none">
            <path d="M10 8 L10 61" stroke="white" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 34 L48 10" stroke="white" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 34 L48 60" stroke="white" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-white font-extrabold text-sm tracking-wide">Katsera Creator Studio</span>
        </div>
      </div>

      {/* Main Desktop Section Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="inline-block bg-white/15 backdrop-blur-md text-white text-xs font-extrabold px-4 py-1.5 rounded-full border border-white/20">
            🎨 STEP 1 OF 3 • CREATOR IDENTITY
          </span>
          <h1 className="text-white font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight">
            What kind of creator are you?
          </h1>
          <p className="text-[#9BAACE] text-sm sm:text-base font-medium max-w-xl mx-auto">
            Choose your creative field to unlock your tailored Katsera tools & features. You can always add more later.
          </p>
        </div>

        {/* Side-by-Side Widescreen Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-10">
          {types.map((type) => {
            const isSelected = selected === type.id
            return (
              <div
                key={type.id}
                onClick={() => setSelected(type.id)}
                className={`rounded-3xl p-6 lg:p-8 text-left transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between border ${
                  isSelected
                    ? "bg-white text-[#1E2D5A] shadow-2xl scale-[1.02] border-white"
                    : "bg-white/10 hover:bg-white/15 text-white border-white/15 backdrop-blur-md hover:border-white/30"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-md flex-none" style={{ background: isSelected ? type.accent + "18" : "rgba(255,255,255,0.12)" }}>
                      {type.emoji}
                    </div>
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "border-[#3D5898] bg-[#3D5898]" : "border-white/40"}`}>
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    </div>
                  </div>

                  <h3 className={`font-black text-2xl mb-1 ${isSelected ? "text-[#1E2D5A]" : "text-white"}`}>
                    {type.label}
                  </h3>
                  <p className={`text-xs sm:text-sm font-medium mb-6 ${isSelected ? "text-[#7A8BB5]" : "text-white/60"}`}>
                    {type.subtitle}
                  </p>

                  <div className="space-y-2">
                    <p className={`text-xs font-extrabold uppercase tracking-wider ${isSelected ? "text-[#3D5898]" : "text-white/40"}`}>
                      Included Features:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {type.features.map((f) => (
                        <span key={f} className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${isSelected ? "bg-[#F4F5F9] text-[#3D5898]" : "bg-white/10 text-white/80"}`}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Desktop Shared Features Banner */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 max-w-5xl mx-auto border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <p className="text-white font-extrabold text-base flex items-center gap-2">
              <span>🌟</span> All Katsera Creators Enjoy Access To:
            </p>
            <p className="text-[#9BAACE] text-xs">Full monetization, live streams, analytics, and instant fan memberships.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {["Fan Community", "Revenue System", "Analytics", "Memberships"].map((f) => (
              <span key={f} className="text-xs font-bold bg-white/10 text-white px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                <svg width="12" height="12" fill="none" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round"><polyline points="10 3 4.5 9 2 6.5"/></svg>
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Desktop Continue Bar */}
      <div className="relative z-10 w-full max-w-md mx-auto pt-4 pb-4 text-center">
        <button
          onClick={handleContinue}
          disabled={!selected}
          className="w-full py-4 rounded-full font-black text-lg transition-all active:scale-95 disabled:opacity-40 bg-white text-[#1E2D5A] shadow-2xl hover:bg-gray-100 disabled:hover:bg-white"
        >
          {selected ? `Continue as ${types.find((t) => t.id === selected)?.label.split(" / ")[0]} ➔` : "Select a Creator Type"}
        </button>
      </div>
    </div>
  )
}
