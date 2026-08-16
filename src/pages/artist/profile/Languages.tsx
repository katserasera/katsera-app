import { useState } from "react"
import { useNavigate } from "react-router-dom"
import katseraLogo from "@/imports/katsera_logo.png"

const KLogo = () => <img src={katseraLogo} alt="Katsera" style={{ width: 22, height: 26, objectFit: "contain" as const }} />

const allLangs = ["Indonesian", "English", "Javanese", "Sundanese", "Mandarin", "Japanese", "Korean", "Arabic", "Spanish", "French", "German", "Portuguese", "Dutch", "Malay", "Hindi"]

export default function Languages() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string[]>(["Indonesian", "English"])
  const [saved, setSaved] = useState(false)

  const toggle = (l: string) => setSelected((p) => p.includes(l) ? p.filter((x) => x !== l) : [...p, l])
  const handleSave = () => { setSaved(true); setTimeout(() => navigate(-1), 1000) }

  if (saved) return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] gap-3">
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <p className="font-extrabold text-[#1E2D5A] text-lg">Languages Saved</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm flex-none">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <KLogo />
        <span className="flex-1 font-extrabold text-[#1E2D5A] text-lg">Languages</span>
      </div>

      <div className="flex-1 px-5 pb-32 overflow-y-auto">
        <p className="text-[#7A8BB5] text-xs font-semibold mb-4">Select the languages you perform or communicate in.</p>
        <div className="flex flex-wrap gap-2">
          {allLangs.map((l) => {
            const active = selected.includes(l)
            return (
              <button key={l} onClick={() => toggle(l)} className={`px-4 py-2.5 rounded-full font-bold text-xs border-2 transition-all ${active ? "bg-[#3D5898] text-white border-[#3D5898]" : "bg-white text-[#1E2D5A] border-transparent"}`}>
                {l}
              </button>
            )
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-5 pb-6 pt-3 bg-[#E8E8E8]">
        <button onClick={handleSave} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm">Save Languages</button>
      </div>
    </div>
  )
}
