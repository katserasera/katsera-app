import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export default function ArtistJoin() {
  const [selected, setSelected] = useState<"individual" | "community" | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const isPainter = (location.state as { creatorType?: string })?.creatorType === "painter"

  const handleContinue = () => {
    if (selected === "individual") navigate("/artist/signup", { state: { creatorType: isPainter ? "painter" : "singer" } })
    else if (selected === "community") navigate("/artist/community")
  }

  return (
    <div className="w-full min-h-screen bg-[#3D5898] relative overflow-hidden flex flex-col justify-between p-6 md:p-12 font-[Nunito]">
      {/* Widescreen Decorative Gray Art Shapes */}
      <div
        className="absolute pointer-events-none opacity-20 md:opacity-30"
        style={{
          width: 500,
          height: 500,
          background: "#E8E8E8",
          borderRadius: "80px",
          top: -150,
          right: -100,
          transform: "rotate(-25deg)",
        }}
      />
      <div
        className="absolute pointer-events-none opacity-20 md:opacity-30"
        style={{
          width: 450,
          height: 450,
          background: "#E8E8E8",
          borderRadius: "70px",
          bottom: -100,
          left: -120,
          transform: "rotate(-25deg)",
        }}
      />
      <div
        className="absolute pointer-events-none opacity-15 md:opacity-25"
        style={{
          width: 350,
          height: 250,
          background: "#E8E8E8",
          borderRadius: "50px",
          bottom: 100,
          right: -80,
          transform: "rotate(-20deg)",
        }}
      />

      {/* Top Desktop Navigation Header */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white active:scale-95 transition-all shadow-md">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <span className="text-xl">{isPainter ? "🎨" : "🎵"}</span>
          <span className="text-white font-extrabold text-sm tracking-wide">
            {isPainter ? "Painter / Visual Artist" : "Singer / Music Artist"}
          </span>
        </div>
      </div>

      {/* Main Desktop Section Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="inline-block bg-white/15 backdrop-blur-md text-white text-xs font-extrabold px-4 py-1.5 rounded-full border border-white/20">
            👤 STEP 2 OF 3 • ACCOUNT PROFILE TYPE
          </span>
          <h1 className="text-white font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight">
            Join as Artist
          </h1>
          <p className="text-white/80 text-sm sm:text-base font-medium max-w-xl mx-auto">
            Select how you'd like to operate your Katsera Creator Account. You can collaborate with others anytime.
          </p>
        </div>

        {/* Side-by-Side Widescreen Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto mb-10">
          {[
            {
              id: "individual",
              title: "Individual",
              subtitle: "Solo Artist or Independent Creator",
              icon: "👤",
              desc: "Perfect for solo musicians, solo painters, and independent creators running their personal brand.",
              bullets: ["Direct revenue payouts", "Personal verified channel", "Custom merch & artwork shop"],
            },
            {
              id: "community",
              title: "Community",
              subtitle: "Band, Collective, Label, or Art Studio",
              icon: "👥",
              desc: "Designed for bands, music groups, art collectives, and teams sharing a single creator channel.",
              bullets: ["Multi-member access", "Group events & broadcasts", "Collaborative project management"],
            },
          ].map((option) => {
            const isSelected = selected === option.id
            return (
              <div
                key={option.id}
                onClick={() => setSelected(option.id as "individual" | "community")}
                className={`rounded-3xl p-6 lg:p-8 text-left transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between border ${
                  isSelected
                    ? "bg-white text-[#3D5898] shadow-2xl scale-[1.02] border-white"
                    : "bg-white/10 hover:bg-white/15 text-white border-white/20 backdrop-blur-md hover:border-white/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md ${isSelected ? "bg-[#3D5898]/10" : "bg-white/10"}`}>
                      {option.icon}
                    </div>
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "border-[#3D5898] bg-[#3D5898]" : "border-white/40"}`}>
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    </div>
                  </div>

                  <h3 className={`font-black text-2xl mb-1 ${isSelected ? "text-[#3D5898]" : "text-white"}`}>
                    {option.title}
                  </h3>
                  <p className={`text-xs sm:text-sm font-semibold mb-4 ${isSelected ? "text-[#7A8BB5]" : "text-white/70"}`}>
                    {option.subtitle}
                  </p>
                  <p className={`text-xs leading-relaxed mb-6 ${isSelected ? "text-gray-600" : "text-white/60"}`}>
                    {option.desc}
                  </p>

                  <div className="space-y-2 border-t pt-4 border-current/10">
                    {option.bullets.map((b) => (
                      <div key={b} className="flex items-center gap-2">
                        <svg width="12" height="12" fill="none" stroke={isSelected ? "#3D5898" : "#4ADE80"} strokeWidth="3" strokeLinecap="round"><polyline points="10 3 4.5 9 2 6.5"/></svg>
                        <span className={`text-xs font-semibold ${isSelected ? "text-[#3D5898]" : "text-white/80"}`}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Action Button */}
        <div className="w-full max-w-md mx-auto text-center">
          <button
            onClick={handleContinue}
            disabled={!selected}
            className={`w-full py-4 rounded-full font-black text-lg transition-all active:scale-95 shadow-2xl ${
              selected
                ? "bg-white text-[#3D5898] hover:bg-gray-100"
                : "bg-white/20 text-white/40 cursor-not-allowed border border-white/10"
            }`}
          >
            {selected ? `Continue as ${selected === "individual" ? "Individual" : "Community"} ➔` : "Select Account Type"}
          </button>
        </div>
      </div>
    </div>
  )
}
