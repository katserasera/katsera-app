import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const channelPosts: Record<string, { name: string; handle: string; members: string; avatar: string; posts: { id: number; date: string; time: string; text?: string; img?: string; reactions: { emoji: string; count: string }[] }[] }> = {
  "1": {
    name: "Nadin's Space",
    handle: "Nadin Amizah",
    members: "325K",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    posts: [
      {
        id: 1,
        date: "March 18",
        time: "09:50",
        img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop",
        reactions: [
          { emoji: "🔥", count: "806" },
          { emoji: "❤️", count: "275" },
          { emoji: "😍", count: "298" },
          { emoji: "😂", count: "27" },
        ],
      },
      {
        id: 2,
        date: "March 18",
        time: "11:44",
        text: "Haioo, semuaa. Apa kabar? Just info, 30 menit lagi aku live hihi nyobain fitur.",
        reactions: [
          { emoji: "❤️", count: "375" },
          { emoji: "😍", count: "233" },
          { emoji: "🎉", count: "28" },
        ],
      },
      {
        id: 3,
        date: "March 18",
        time: "11:44",
        text: "AAAAK seru sekali. Teman-teman terima kasih banyak sudah meluangkan waktu. Selamat beraktivitas!",
        reactions: [
          { emoji: "❤️", count: "485" },
          { emoji: "🔥", count: "367" },
          { emoji: "😭", count: "28" },
        ],
      },
      {
        id: 4,
        date: "March 20",
        time: "16:43",
        img: "https://images.unsplash.com/photo-1501386761578-eaa54b08e8d1?w=400&h=300&fit=crop",
        reactions: [
          { emoji: "❤️", count: "1.2K" },
          { emoji: "🔥", count: "890" },
        ],
      },
    ],
  },
}

export default function FanChannelSpace() {
  const { id } = useParams()
  const navigate = useNavigate()
  const ch = channelSpace(id || "1")
  const [showMenu, setShowMenu] = useState(false)
  const [myReactions, setMyReactions] = useState<Record<string, string>>({})

  function toggleReaction(postId: number, emoji: string) {
    setMyReactions(prev => {
      const key = `${postId}-${emoji}`
      const next = { ...prev }
      if (next[key]) { delete next[key] } else { next[key] = emoji }
      return next
    })
  }

  function channelSpace(cid: string) {
    return channelPosts[cid] || channelPosts["1"]
  }

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-3 border-b border-[#F4F5F9] sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="w-9 h-9 rounded-full overflow-hidden flex-none">
            <img src={ch.avatar} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="font-extrabold text-[#1E2D5A] text-sm">{ch.name}</p>
            <p className="text-xs text-[#7A8BB5]">{ch.handle} · {ch.members} members</p>
          </div>
          <button onClick={() => setShowMenu(true)} className="w-8 h-8 rounded-full bg-[#F4F5F9] flex items-center justify-center active:scale-95 transition-transform">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1" fill="#7A8BB5"/><circle cx="19" cy="12" r="1" fill="#7A8BB5"/><circle cx="5" cy="12" r="1" fill="#7A8BB5"/></svg>
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-28 space-y-5">
        {ch.posts.map((post) => (
          <div key={post.id}>
            {/* Date label */}
            <p className="text-center text-xs text-[#7A8BB5] mb-3">{post.date}, {post.time}</p>

            {/* Post bubble */}
            <div className="flex gap-2 mb-1">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-none mt-1">
                <img src={ch.avatar} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                {post.img && (
                  <div className="rounded-2xl overflow-hidden mb-2">
                    <img src={post.img} alt="" className="w-full object-cover max-h-52" />
                  </div>
                )}
                {post.text && (
                  <div className="bg-[#F4F5F9] rounded-2xl rounded-tl-sm px-4 py-3 mb-2">
                    <p className="text-sm text-[#1E2D5A] leading-relaxed">{post.text}</p>
                  </div>
                )}
                {/* Reactions */}
                <div className="flex gap-1.5 flex-wrap">
                  {post.reactions.map((r) => {
                    const active = myReactions[`${post.id}-${r.emoji}`]
                    return (
                      <button
                        key={r.emoji}
                        onClick={() => toggleReaction(post.id, r.emoji)}
                        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition-colors active:scale-95 ${active ? "bg-[#3D5898]/15 border border-[#3D5898]/30" : "bg-[#F4F5F9] hover:bg-[#E8E8E8]"}`}
                      >
                        <span>{r.emoji}</span>
                        <span className="text-[#7A8BB5]">{r.count}</span>
                      </button>
                    )
                  })}
                  <button onClick={() => toggleReaction(post.id, "👍")} className="w-7 h-7 rounded-full bg-[#F4F5F9] flex items-center justify-center text-xs text-[#7A8BB5] hover:bg-[#E8E8E8] active:scale-95 transition-transform">+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Read-only notice (fans can't reply unless allowed) */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#F4F5F9] px-4 py-3">
        <div className="bg-[#F4F5F9] rounded-full px-4 py-3 flex items-center gap-2">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#7A8BB5" strokeWidth="2" strokeLinejoin="round"/></svg>
          <span className="text-[#7A8BB5] text-sm flex-1">Channel only — replies disabled</span>
          <button className="w-7 h-7 rounded-full bg-[#3D5898] flex items-center justify-center">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="white" stroke="white" strokeWidth="1.5"/></svg>
          </button>
        </div>
      </div>
      {/* Channel menu */}
      {showMenu && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setShowMenu(false)}>
          <div className="bg-white w-full max-w-md rounded-t-3xl p-5" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full bg-[#E0E5F2] mx-auto mb-4" />
            <p className="font-extrabold text-[#1E2D5A] text-base mb-4">{ch.name}</p>
            {[["View Artist Profile", () => navigate(`/fan/artist/1`)], ["Notification Settings", () => { setShowMenu(false) }], ["Leave Channel", () => { setShowMenu(false); navigate(-1) }]].map(([label, action]) => (
              <button key={String(label)} onClick={() => (action as () => void)()} className="w-full text-left py-3.5 border-b border-[#F4F5F9] text-sm font-semibold text-[#1E2D5A] last:border-0 active:opacity-60">
                {String(label)}
              </button>
            ))}
            <button onClick={() => setShowMenu(false)} className="w-full mt-3 py-3.5 rounded-full border-2 border-[#E0E5F2] text-[#7A8BB5] font-bold text-sm">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
