import { useState } from "react"
import { useNavigate } from "react-router-dom"
import katseraLogo from "@/imports/katsera_logo.png"

const KLogo = () => <img src={katseraLogo} alt="Katsera" style={{ width: 22, height: 26, objectFit: "contain" as const }} />

const faqData = [
  {
    category: "Account",
    items: [
      { q: "How do I change my username?", a: "Go to Edit Profile and update the Username field. Usernames must be unique and can only be changed once every 30 days." },
      { q: "How do I verify my account?", a: "Navigate to Profile → Verification Status. You'll need to submit a government-issued ID. The process takes 3–5 business days." },
      { q: "Can I have multiple Katsera accounts?", a: "No, each artist is allowed one account per identity. Contact support if you have a legitimate need for multiple accounts." },
    ],
  },
  {
    category: "Revenue & Earnings",
    items: [
      { q: "How do I receive my earnings?", a: "Set up your withdrawal method in Sales Hub → Withdrawal Settings. Payouts are processed within 3–7 business days after redemption." },
      { q: "What percentage does Katsera take?", a: "Katsera retains 20% of revenue from memberships, 15% from merchandise, and 10% from live gifts. You keep the rest." },
      { q: "Is there a minimum withdrawal amount?", a: "Yes, the minimum withdrawal is Rp 100,000. There is no maximum limit per transaction." },
    ],
  },
  {
    category: "Live Streaming",
    items: [
      { q: "What are the requirements for going live?", a: "Your account must be verified, and you must have at least 100 followers. A stable internet connection of at least 5 Mbps is recommended." },
      { q: "How does AI moderation work during live streams?", a: "Our AI reviews chat messages in real-time and filters inappropriate content. You can customize sensitivity in AI Moderation Settings." },
      { q: "Can I schedule a live stream in advance?", a: "Yes! Go to Dashboard → Live → Schedule. Fans will receive a notification reminder 30 minutes before your stream." },
    ],
  },
  {
    category: "Content & Channel",
    items: [
      { q: "How do I manage my channel?", a: "Go to the Channel tab and tap the gear icon. You can control who can reply, set keywords, and view performance stats." },
      { q: "What types of posts can I create?", a: "You can post text, images, videos, audio clips, polls, and exclusive member-only content." },
      { q: "How do I set up merchandise?", a: "Visit Sales Hub → Merchandise. You can add products, set prices, manage inventory, and view orders all from one place." },
    ],
  },
]

export default function FAQ() {
  const navigate = useNavigate()
  const [openItem, setOpenItem] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  const filtered = faqData.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) => !search || item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase())),
  })).filter((cat) => cat.items.length > 0)

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm flex-none">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <KLogo />
        <span className="flex-1 font-extrabold text-[#1E2D5A] text-lg">FAQ</span>
      </div>

      <div className="px-5 mb-4">
        <div className="bg-white rounded-full flex items-center gap-3 px-4 py-3 shadow-sm">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="#9BAACE" strokeWidth="1.8"/><path d="M21 21l-4.35-4.35" stroke="#9BAACE" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions…" className="flex-1 bg-transparent text-[#1E2D5A] font-semibold text-sm outline-none placeholder:text-[#C8D0E8]" />
        </div>
      </div>

      <div className="flex-1 px-5 pb-10 space-y-5 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#C8D0E8" strokeWidth="1.5"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke="#C8D0E8" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <p className="font-semibold text-[#9BAACE] text-sm">No results for "{search}"</p>
            <button onClick={() => navigate("/artist/help/contact")} className="text-[#3D5898] text-xs font-bold underline">Contact support instead</button>
          </div>
        ) : filtered.map((cat) => (
          <div key={cat.category}>
            <p className="font-extrabold text-[#1E2D5A] text-xs uppercase tracking-widest mb-2">{cat.category}</p>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {cat.items.map((item, i) => {
                const key = `${cat.category}-${i}`
                const open = openItem === key
                return (
                  <div key={key} className={i < cat.items.length - 1 ? "border-b border-[#F4F5F9]" : ""}>
                    <button onClick={() => setOpenItem(open ? null : key)} className="w-full flex items-center gap-3 px-5 py-4 text-left">
                      <span className="flex-1 font-bold text-[#1E2D5A] text-sm">{item.q}</span>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className={`flex-none transition-transform ${open ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6" stroke="#9BAACE" strokeWidth="2" strokeLinecap="round"/></svg>
                    </button>
                    {open && (
                      <div className="px-5 pb-4">
                        <p className="text-[#7A8BB5] text-sm leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <div className="bg-gradient-to-br from-[#3D5898] to-[#1E2D5A] rounded-2xl p-5 text-center space-y-2">
          <p className="font-extrabold text-white text-sm">Didn't find what you need?</p>
          <p className="text-white/60 text-xs">Our support team usually replies within 2 hours.</p>
          <button onClick={() => navigate("/artist/help/contact")} className="mt-2 px-6 py-2.5 rounded-full bg-white text-[#3D5898] font-extrabold text-xs">Contact Support</button>
        </div>
      </div>
    </div>
  )
}
