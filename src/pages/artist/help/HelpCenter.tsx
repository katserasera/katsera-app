import { useNavigate } from "react-router-dom"
import katseraLogo from "@/imports/katsera_logo.png"

const KLogo = () => <img src={katseraLogo} alt="Katsera" style={{ width: 22, height: 26, objectFit: "contain" as const }} />

const ChevronRight = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#9BAACE" strokeWidth="2" strokeLinecap="round"/></svg>
)

const sections = [
  {
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#3D5898" strokeWidth="1.8"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    label: "FAQ",
    sub: "Common questions answered",
    path: "/artist/help/faq",
    bg: "bg-[#EEF1FB]",
  },
  {
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#3D5898" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
    label: "Contact Support",
    sub: "Chat with our team",
    path: "/artist/help/contact",
    bg: "bg-[#EEF1FB]",
  },
  {
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#D4A017" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
    label: "Submit a Ticket",
    sub: "For complex issues",
    path: "/artist/help/contact",
    bg: "bg-amber-50",
  },
  {
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="#EF4444" strokeWidth="1.8" strokeLinejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/></svg>,
    label: "Report a Problem",
    sub: "Bugs, abuse, or safety issues",
    path: "/artist/help/report",
    bg: "bg-red-50",
  },
]

const popularFaqs = [
  "How do I receive my earnings?",
  "What are the requirements for going live?",
  "How does AI moderation work?",
  "Can I change my username?",
  "How do I set up merchandise?",
]

export default function HelpCenter() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm flex-none">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <KLogo />
        <span className="flex-1 font-extrabold text-[#1E2D5A] text-lg">Help Center</span>
      </div>

      <div className="flex-1 px-5 pb-10 space-y-5">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#3D5898] to-[#1E2D5A] rounded-3xl p-6 text-center space-y-2">
          <p className="text-white font-extrabold text-xl">How can we help?</p>
          <p className="text-white/70 text-xs">Browse topics or search for answers below.</p>
          <div className="bg-white/20 rounded-full flex items-center gap-3 px-4 py-3 mt-3">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="white" strokeWidth="1.8"/><path d="M21 21l-4.35-4.35" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
            <span className="text-white/60 text-sm font-semibold">Search for help…</span>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          {sections.map((s) => (
            <button key={s.label} onClick={() => navigate(s.path)} className="bg-white rounded-2xl p-4 flex flex-col items-start gap-2 shadow-sm text-left active:scale-[0.97] transition-transform">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg}`}>{s.icon}</div>
              <div>
                <p className="font-extrabold text-[#1E2D5A] text-sm">{s.label}</p>
                <p className="text-[#9BAACE] text-xs mt-0.5">{s.sub}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Popular FAQs */}
        <div>
          <p className="font-extrabold text-[#1E2D5A] text-xs uppercase tracking-widest mb-3">Popular Questions</p>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {popularFaqs.map((q, i) => (
              <button key={q} onClick={() => navigate("/artist/help/faq")} className={`w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-[#F8F9FC] transition-colors ${i < popularFaqs.length - 1 ? "border-b border-[#F4F5F9]" : ""}`}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="flex-none"><circle cx="12" cy="12" r="10" stroke="#9BAACE" strokeWidth="1.8"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke="#9BAACE" strokeWidth="1.8" strokeLinecap="round"/></svg>
                <span className="flex-1 font-semibold text-[#1E2D5A] text-sm">{q}</span>
                <ChevronRight />
              </button>
            ))}
          </div>
        </div>

        {/* Community + Legal */}
        <div>
          <p className="font-extrabold text-[#1E2D5A] text-xs uppercase tracking-widest mb-3">Policies</p>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {[
              { label: "Community Guidelines", path: "/artist/help/faq" },
              { label: "Terms of Service", path: "/artist/help/faq" },
              { label: "Privacy Policy", path: "/artist/help/faq" },
            ].map((item, i) => (
              <button key={item.label} onClick={() => navigate(item.path)} className={`w-full flex items-center justify-between px-5 py-4 hover:bg-[#F8F9FC] transition-colors ${i < 2 ? "border-b border-[#F4F5F9]" : ""}`}>
                <span className="font-semibold text-[#1E2D5A] text-sm">{item.label}</span>
                <ChevronRight />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
