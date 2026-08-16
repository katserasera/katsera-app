import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function DesignSystem() {
  const navigate = useNavigate()
  const [section, setSection] = useState<"tokens" | "components" | "states">("tokens")

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-3 bg-[#E8E8E8]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round"/></svg>
        </button>
        <div>
          <h1 className="font-extrabold text-[#1E2D5A] text-xl">Design System</h1>
          <p className="text-xs text-[#7A8BB5] font-semibold">Katsera · v2.6.0</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 flex gap-2 mb-4">
        {[["tokens", "Tokens"], ["components", "Components"], ["states", "UI States"]].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSection(key as "tokens" | "components" | "states")}
            className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${section === key ? "bg-[#3D5898] text-white" : "bg-white text-[#7A8BB5]"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 px-5 pb-10 overflow-y-auto space-y-4">
        {section === "tokens" && (
          <>
            {/* Colors */}
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <p className="font-extrabold text-[#1E2D5A] text-sm mb-3">Color Tokens</p>
              <div className="space-y-2">
                {[
                  { name: "--color-k-blue", value: "#3D5898", label: "Primary" },
                  { name: "--color-k-blue-dark", value: "#2D4270", label: "Dark" },
                  { name: "--color-k-blue-light", value: "#6B82BB", label: "Light" },
                  { name: "--color-k-navy", value: "#1E2D5A", label: "Text" },
                  { name: "--color-k-text-muted", value: "#7A8BB5", label: "Muted" },
                  { name: "--color-k-gray-bg", value: "#E8E8E8", label: "Background" },
                  { name: "--color-k-surface", value: "#F4F5F9", label: "Surface" },
                  { name: "--color-k-border", value: "#C8D0E8", label: "Border" },
                ].map((t) => (
                  <div key={t.name} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl border border-[#E8E8E8] flex-none shadow-sm" style={{ background: t.value }} />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-[#1E2D5A] font-mono">{t.name}</p>
                      <p className="text-[10px] text-[#7A8BB5]">{t.value} · {t.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <p className="font-extrabold text-[#1E2D5A] text-sm mb-3">Typography Scale</p>
              <div className="space-y-2">
                {[
                  { name: "Display", size: "text-4xl", weight: "font-extrabold", sample: "Katsera" },
                  { name: "H1", size: "text-2xl", weight: "font-extrabold", sample: "Artist Hub" },
                  { name: "H2", size: "text-xl", weight: "font-bold", sample: "Sales Overview" },
                  { name: "Body", size: "text-sm", weight: "font-semibold", sample: "Fan platform for artists" },
                  { name: "Caption", size: "text-xs", weight: "font-semibold", sample: "Posted 2 hours ago" },
                  { name: "Micro", size: "text-[10px]", weight: "font-bold", sample: "UPDATED · JUL 2026" },
                ].map((t) => (
                  <div key={t.name} className="flex items-baseline gap-3">
                    <span className="text-[10px] text-[#7A8BB5] font-bold w-14 flex-none">{t.name}</span>
                    <span className={`${t.size} ${t.weight} text-[#1E2D5A] leading-tight`}>{t.sample}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-[#7A8BB5] mt-3 font-bold">Font Family: Nunito (Google Fonts)</p>
            </div>

            {/* Spacing & Radius */}
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <p className="font-extrabold text-[#1E2D5A] text-sm mb-3">Radius System</p>
              <div className="flex gap-3 flex-wrap">
                {[
                  { name: "sm", r: "rounded-lg", size: "w-12 h-12" },
                  { name: "md", r: "rounded-2xl", size: "w-14 h-14" },
                  { name: "lg", r: "rounded-3xl", size: "w-16 h-16" },
                  { name: "pill", r: "rounded-full", size: "w-20 h-10" },
                ].map((r) => (
                  <div key={r.name} className="flex flex-col items-center gap-1">
                    <div className={`${r.size} ${r.r} bg-[#3D5898]`} />
                    <span className="text-[10px] text-[#7A8BB5] font-bold">{r.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {section === "components" && (
          <>
            {/* Buttons */}
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <p className="font-extrabold text-[#1E2D5A] text-sm mb-3">Buttons</p>
              <div className="space-y-3">
                <div className="flex gap-2 flex-wrap">
                  <button className="px-6 py-3 rounded-full bg-[#3D5898] text-white font-bold text-sm">Primary</button>
                  <button className="px-6 py-3 rounded-full border-2 border-[#3D5898] text-[#3D5898] font-bold text-sm">Outline</button>
                  <button className="px-6 py-3 rounded-full bg-[#F4F5F9] text-[#7A8BB5] font-bold text-sm">Ghost</button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button className="px-4 py-2 rounded-full bg-[#3D5898] text-white font-bold text-xs">Small</button>
                  <button className="px-4 py-2 rounded-full bg-red-500 text-white font-bold text-xs">Danger</button>
                  <button className="px-4 py-2 rounded-full bg-green-500 text-white font-bold text-xs">Success</button>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <p className="font-extrabold text-[#1E2D5A] text-sm mb-3">Inputs</p>
              <div className="space-y-3">
                <input placeholder="Default input" className="w-full rounded-full border border-[#C8D0E8] px-4 py-3 text-sm outline-none focus:border-[#3D5898] focus:ring-1 focus:ring-[#3D5898] bg-white" />
                <input placeholder="Search..." className="w-full rounded-full border border-[#C8D0E8] px-4 py-3 text-sm outline-none bg-[#F4F5F9]" />
              </div>
            </div>

            {/* Cards */}
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <p className="font-extrabold text-[#1E2D5A] text-sm mb-3">Cards</p>
              <div className="space-y-3">
                <div className="bg-[#F4F5F9] rounded-2xl p-4">
                  <p className="font-bold text-[#1E2D5A] text-sm">Surface Card</p>
                  <p className="text-xs text-[#7A8BB5]">Used for secondary content</p>
                </div>
                <div className="bg-white border border-[#C8D0E8] rounded-2xl p-4 shadow-sm">
                  <p className="font-bold text-[#1E2D5A] text-sm">Bordered Card</p>
                  <p className="text-xs text-[#7A8BB5]">Used for interactive items</p>
                </div>
                <div className="bg-gradient-to-br from-[#3D5898] to-[#1E2D5A] rounded-2xl p-4 text-white">
                  <p className="font-bold text-sm">Gradient Card</p>
                  <p className="text-xs opacity-70">Used for hero/promo blocks</p>
                </div>
              </div>
            </div>

            {/* Toggle + badge */}
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <p className="font-extrabold text-[#1E2D5A] text-sm mb-3">Controls</p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="w-12 h-6 rounded-full bg-[#3D5898] relative">
                  <div className="w-5 h-5 rounded-full bg-white shadow absolute top-0.5 left-6" />
                </div>
                <div className="w-12 h-6 rounded-full bg-[#C8D0E8] relative">
                  <div className="w-5 h-5 rounded-full bg-white shadow absolute top-0.5 left-0.5" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#3D5898] text-white text-xs font-bold">Badge</span>
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">Active</span>
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold">Offline</span>
              </div>
            </div>

            {/* Bottom Nav specimen */}
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <p className="font-extrabold text-[#1E2D5A] text-sm mb-3">Bottom Navigation</p>
              <div className="bg-white rounded-full flex border border-[#E8E8E8] shadow">
                {["Home", "Shop", "Channel", "More"].map((t, i) => (
                  <div key={t} className={`flex-1 flex flex-col items-center py-3 gap-0.5 ${i === 0 ? "text-[#3D5898]" : "text-[#C8D0E8]"}`}>
                    <div className={`w-4 h-4 rounded-full ${i === 0 ? "bg-[#3D5898]" : "bg-current"}`} />
                    <span className="text-[9px] font-bold">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {section === "states" && (
          <>
            {/* Loading */}
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <p className="font-extrabold text-[#1E2D5A] text-sm mb-3">Loading State</p>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-[#E8E8E8] flex-none" />
                    <div className="flex-1 space-y-1">
                      <div className="h-3 bg-[#E8E8E8] rounded-full w-2/3" />
                      <div className="h-2 bg-[#E8E8E8] rounded-full w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Empty state */}
            <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col items-center text-center">
              <p className="font-extrabold text-[#1E2D5A] text-sm mb-1">Empty State</p>
              <div className="w-16 h-16 rounded-full bg-[#F4F5F9] flex items-center justify-center my-4">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#C8D0E8" strokeWidth="2"/></svg>
              </div>
              <p className="font-extrabold text-[#1E2D5A] text-base">Nothing here yet</p>
              <p className="text-xs text-[#7A8BB5] mt-1">Start by creating your first post</p>
              <button className="mt-4 px-5 py-2.5 rounded-full bg-[#3D5898] text-white font-bold text-sm">Get Started</button>
            </div>

            {/* Success */}
            <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col items-center text-center">
              <p className="font-extrabold text-[#1E2D5A] text-sm mb-3 self-start">Success State</p>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <svg width="30" height="30" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
              <p className="font-extrabold text-[#1E2D5A] text-base mt-3">Action Complete</p>
              <p className="text-xs text-[#7A8BB5] mt-1">Your changes have been saved</p>
            </div>

            {/* Error */}
            <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col items-center text-center">
              <p className="font-extrabold text-[#1E2D5A] text-sm mb-3 self-start">Error State</p>
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <svg width="30" height="30" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <p className="font-extrabold text-[#1E2D5A] text-base mt-3">Something went wrong</p>
              <p className="text-xs text-[#7A8BB5] mt-1">Check your connection and try again</p>
              <button className="mt-4 px-5 py-2.5 rounded-full border-2 border-[#3D5898] text-[#3D5898] font-bold text-sm">Retry</button>
            </div>

            {/* Responsive note */}
            <div className="bg-gradient-to-br from-[#3D5898] to-[#1E2D5A] rounded-3xl p-5 text-white shadow-lg">
              <p className="font-extrabold text-sm mb-2">Responsive Breakpoints</p>
              <div className="space-y-1">
                {[
                  { label: "Mobile", value: "< 640px — max-w-md centered" },
                  { label: "Tablet", value: "640–1024px — 2-col grid" },
                  { label: "Desktop", value: "> 1024px — sidebar + content" },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-2">
                    <span className="text-xs font-bold opacity-70 w-16">{b.label}</span>
                    <span className="text-xs opacity-90">{b.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
