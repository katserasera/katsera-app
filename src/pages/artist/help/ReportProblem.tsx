import { useState } from "react"
import { useNavigate } from "react-router-dom"
import katseraLogo from "@/imports/katsera_logo.png"

const KLogo = () => <img src={katseraLogo} alt="Katsera" style={{ width: 22, height: 26, objectFit: "contain" as const }} />

const reportTypes = [
  { key: "bug", label: "App Bug", icon: "🐛", desc: "Something isn't working as expected" },
  { key: "abuse", label: "Abuse / Harassment", icon: "🚨", desc: "Harmful content or behavior" },
  { key: "spam", label: "Spam", icon: "📩", desc: "Unwanted messages or fake activity" },
  { key: "safety", label: "Safety Concern", icon: "⚠️", desc: "Immediate safety issue" },
  { key: "copyright", label: "Copyright Violation", icon: "©️", desc: "Content used without permission" },
  { key: "other", label: "Other", icon: "💬", desc: "Something else entirely" },
]

export default function ReportProblem() {
  const navigate = useNavigate()
  const [type, setType] = useState<string | null>(null)
  const [desc, setDesc] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    if (!type || desc.length < 10) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1000)
  }

  if (submitted) return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] gap-4 px-8">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
        <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <p className="font-extrabold text-[#1E2D5A] text-xl text-center">Report Submitted</p>
      <p className="text-[#7A8BB5] text-sm text-center leading-relaxed">Thank you for keeping Katsera safe. Our trust & safety team will review this report.</p>
      <button onClick={() => navigate(-1)} className="px-10 py-3.5 rounded-full bg-[#3D5898] text-white font-extrabold text-sm mt-2">Done</button>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm flex-none">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <KLogo />
        <span className="flex-1 font-extrabold text-[#1E2D5A] text-lg">Report a Problem</span>
      </div>

      <div className="flex-1 px-5 pb-32 space-y-5 overflow-y-auto">
        <div>
          <p className="font-extrabold text-[#1E2D5A] text-xs uppercase tracking-widest mb-3">What would you like to report?</p>
          <div className="grid grid-cols-2 gap-3">
            {reportTypes.map((rt) => (
              <button key={rt.key} onClick={() => setType(rt.key)} className={`flex flex-col items-start gap-1.5 p-4 rounded-2xl border-2 transition-all ${type === rt.key ? "border-[#3D5898] bg-blue-50" : "border-transparent bg-white shadow-sm"}`}>
                <span className="text-xl">{rt.icon}</span>
                <p className="font-extrabold text-[#1E2D5A] text-xs">{rt.label}</p>
                <p className="text-[#9BAACE] text-[10px] leading-tight">{rt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="font-bold text-[#1E2D5A] text-xs">Describe the issue</p>
            <span className="text-[#9BAACE] text-xs">{desc.length}/500</span>
          </div>
          <div className={`bg-white rounded-2xl px-4 py-3.5 border-2 transition-colors shadow-sm ${!type || desc.length >= 10 ? "border-transparent focus-within:border-[#3D5898]" : "border-transparent"}`}>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value.slice(0, 500))} rows={5} className="w-full bg-transparent text-[#1E2D5A] font-semibold text-sm outline-none resize-none" placeholder="Provide as much detail as possible so we can investigate effectively." />
          </div>
          {type && desc.length < 10 && desc.length > 0 && <p className="text-red-400 text-xs mt-1">Please add more detail</p>}
        </div>

        <div className="bg-amber-50 rounded-2xl p-4 flex gap-3">
          <span className="text-lg flex-none">⚠️</span>
          <p className="text-xs text-amber-700 font-semibold leading-relaxed">Reports are reviewed by our Trust & Safety team. Submitting false reports may result in account action.</p>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-5 pb-6 pt-3 bg-[#E8E8E8]">
        <button onClick={handleSubmit} disabled={!type || desc.length < 10 || loading} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm disabled:opacity-40 flex items-center justify-center gap-2">
          {loading ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Submitting…</> : "Submit Report"}
        </button>
      </div>
    </div>
  )
}
