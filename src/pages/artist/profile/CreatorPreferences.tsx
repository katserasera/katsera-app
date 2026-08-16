import { useState } from "react"
import { useNavigate } from "react-router-dom"
import katseraLogo from "@/imports/katsera_logo.png"

const KLogo = () => <img src={katseraLogo} alt="Katsera" style={{ width: 22, height: 26, objectFit: "contain" as const }} />

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button onClick={onChange} className={`w-12 h-6 rounded-full transition-colors flex-none relative ${checked ? "bg-[#3D5898]" : "bg-[#C8D0E8]"}`}>
    <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-all ${checked ? "right-0.5" : "left-0.5"}`} />
  </button>
)

export default function CreatorPreferences() {
  const navigate = useNavigate()
  const [prefs, setPrefs] = useState({
    darkMode: false,
    compactFeed: false,
    autoPlayLive: true,
    showGiftAnimations: true,
    allowCollabs: true,
    showOnlineStatus: false,
    contentLanguage: "Indonesian",
    currency: "IDR",
  })
  const [saved, setSaved] = useState(false)

  const toggle = (k: keyof typeof prefs) => setPrefs((p) => ({ ...p, [k]: !p[k] }))
  const handleSave = () => { setSaved(true); setTimeout(() => navigate(-1), 1000) }

  if (saved) return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] gap-3">
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <p className="font-extrabold text-[#1E2D5A] text-lg">Preferences Saved</p>
    </div>
  )

  const groups = [
    {
      title: "Display",
      items: [
        { key: "darkMode" as const, label: "Dark Mode", desc: "Switch to dark color scheme" },
        { key: "compactFeed" as const, label: "Compact Feed", desc: "Show more posts with less spacing" },
        { key: "showGiftAnimations" as const, label: "Gift Animations", desc: "Play gift animations during live" },
      ],
    },
    {
      title: "Content",
      items: [
        { key: "autoPlayLive" as const, label: "Auto-play Live Streams", desc: "Start playing when you open a stream" },
        { key: "allowCollabs" as const, label: "Allow Collaborations", desc: "Let other artists tag you in posts" },
      ],
    },
    {
      title: "Visibility",
      items: [
        { key: "showOnlineStatus" as const, label: "Show Online Status", desc: "Let fans see when you're active" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm flex-none">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <KLogo />
        <span className="flex-1 font-extrabold text-[#1E2D5A] text-lg">Creator Preferences</span>
      </div>

      <div className="flex-1 px-5 pb-32 overflow-y-auto space-y-5">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="font-extrabold text-[#1E2D5A] text-xs uppercase tracking-widest mb-2">{group.title}</p>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {group.items.map((item, i) => (
                <div key={item.key} className={`flex items-center gap-4 px-5 py-4 ${i < group.items.length - 1 ? "border-b border-[#F4F5F9]" : ""}`}>
                  <div className="flex-1">
                    <p className="font-bold text-[#1E2D5A] text-sm">{item.label}</p>
                    <p className="text-[#9BAACE] text-xs mt-0.5">{item.desc}</p>
                  </div>
                  <Toggle checked={prefs[item.key] as boolean} onChange={() => toggle(item.key)} />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Select fields */}
        <div>
          <p className="font-extrabold text-[#1E2D5A] text-xs uppercase tracking-widest mb-2">Regional</p>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {[
              { label: "Content Language", value: prefs.contentLanguage, opts: ["Indonesian", "English", "Both"] },
              { label: "Currency", value: prefs.currency, opts: ["IDR", "USD", "SGD"] },
            ].map((item, i) => (
              <div key={item.label} className={`flex items-center px-5 py-4 ${i === 0 ? "border-b border-[#F4F5F9]" : ""}`}>
                <span className="flex-1 font-bold text-[#1E2D5A] text-sm">{item.label}</span>
                <select value={item.value} onChange={(e) => setPrefs((p) => ({ ...p, [item.label === "Content Language" ? "contentLanguage" : "currency"]: e.target.value }))} className="text-[#3D5898] font-semibold text-sm bg-transparent outline-none">
                  {item.opts.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-5 pb-6 pt-3 bg-[#E8E8E8]">
        <button onClick={handleSave} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm">Save Preferences</button>
      </div>
    </div>
  )
}
