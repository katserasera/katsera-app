import { useState } from "react"
import { useNavigate } from "react-router-dom"
import katseraLogo from "@/imports/katsera_logo.png"

const KLogo = () => <img src={katseraLogo} alt="Katsera" style={{ width: 22, height: 26, objectFit: "contain" as const }} />

const categories = ["Account Issue", "Payment Problem", "Content & Channel", "Live Streaming", "Technical Bug", "Other"]

export default function ContactSupport() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ category: "", subject: "", message: "", email: "nadin@katsera.id" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.category) e.category = "Select a category"
    if (!form.subject.trim()) e.subject = "Add a subject"
    if (form.message.length < 20) e.message = "Describe your issue in at least 20 characters"
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1200)
  }

  if (submitted) return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] gap-5 px-8">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
        <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <p className="font-extrabold text-[#1E2D5A] text-xl text-center">Ticket Submitted!</p>
      <p className="text-[#7A8BB5] text-sm text-center leading-relaxed">We've received your request. Our team will respond to <span className="font-bold text-[#3D5898]">{form.email}</span> within 2 business hours.</p>
      <div className="bg-white rounded-2xl p-4 w-full shadow-sm">
        <p className="text-xs text-[#9BAACE] font-semibold mb-1">Ticket Reference</p>
        <p className="font-extrabold text-[#1E2D5A] text-lg tracking-widest">#KAT-20260726</p>
      </div>
      <button onClick={() => navigate(-1)} className="px-10 py-3.5 rounded-full bg-[#3D5898] text-white font-extrabold text-sm">Back to Help</button>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm flex-none">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <KLogo />
        <span className="flex-1 font-extrabold text-[#1E2D5A] text-lg">Contact Support</span>
      </div>

      <div className="flex-1 px-5 pb-32 space-y-4 overflow-y-auto">
        {/* Live chat teaser */}
        <div className="bg-gradient-to-r from-[#3D5898] to-[#1E2D5A] rounded-2xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-none">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex-1">
            <p className="font-extrabold text-white text-sm">Live Chat</p>
            <p className="text-white/60 text-xs">Team online · avg reply 5 min</p>
          </div>
          <button onClick={() => navigate("/support/chat")} className="px-4 py-2 rounded-full bg-white text-[#3D5898] font-extrabold text-xs active:scale-95 transition-transform">Start Chat</button>
        </div>

        <div className="h-px bg-[#C8D0E8]" />
        <p className="font-extrabold text-[#1E2D5A] text-sm">Or submit a ticket</p>

        {/* Category */}
        <div>
          <p className="font-bold text-[#1E2D5A] text-xs mb-1.5">Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => { setForm((p) => ({ ...p, category: c })); if (errors.category) setErrors((p) => { const n = { ...p }; delete n.category; return n }) }} className={`px-3.5 py-2 rounded-full text-xs font-bold border-2 transition-all ${form.category === c ? "bg-[#3D5898] text-white border-[#3D5898]" : "bg-white text-[#1E2D5A] border-transparent shadow-sm"}`}>
                {c}
              </button>
            ))}
          </div>
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
        </div>

        {/* Subject */}
        <div>
          <p className="font-bold text-[#1E2D5A] text-xs mb-1.5">Subject</p>
          <div className={`bg-white rounded-2xl px-4 py-3.5 border-2 transition-colors shadow-sm ${errors.subject ? "border-red-400" : "border-transparent focus-within:border-[#3D5898]"}`}>
            <input value={form.subject} onChange={(e) => { setForm((p) => ({ ...p, subject: e.target.value })); if (errors.subject) setErrors((p) => { const n = { ...p }; delete n.subject; return n }) }} className="w-full bg-transparent text-[#1E2D5A] font-semibold text-sm outline-none" placeholder="Brief description of your issue" />
          </div>
          {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
        </div>

        {/* Message */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="font-bold text-[#1E2D5A] text-xs">Message</p>
            <span className="text-xs text-[#9BAACE]">{form.message.length}/1000</span>
          </div>
          <div className={`bg-white rounded-2xl px-4 py-3.5 border-2 transition-colors shadow-sm ${errors.message ? "border-red-400" : "border-transparent focus-within:border-[#3D5898]"}`}>
            <textarea value={form.message} onChange={(e) => { setForm((p) => ({ ...p, message: e.target.value.slice(0, 1000) })); if (errors.message) setErrors((p) => { const n = { ...p }; delete n.message; return n }) }} rows={5} className="w-full bg-transparent text-[#1E2D5A] font-semibold text-sm outline-none resize-none" placeholder="Describe your issue in detail. Include any steps to reproduce it, and what you expected to happen." />
          </div>
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>

        {/* Email */}
        <div>
          <p className="font-bold text-[#1E2D5A] text-xs mb-1.5">Reply Email</p>
          <div className="bg-white rounded-2xl px-4 py-3.5 shadow-sm">
            <input value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className="w-full bg-transparent text-[#1E2D5A] font-semibold text-sm outline-none" />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-5 pb-6 pt-3 bg-[#E8E8E8]">
        <button onClick={handleSubmit} disabled={loading} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm disabled:opacity-60 flex items-center justify-center gap-2">
          {loading ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Submitting…</> : "Submit Ticket"}
        </button>
      </div>
    </div>
  )
}
