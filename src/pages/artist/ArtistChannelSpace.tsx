import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const initialPosts = [
  { id: 1, text: "Ngantuk banget deh siang-siang gini", timestamp: "Hari ini 12.30", reactions: 9000 },
  { id: 2, text: "Tapi tetap semangat!!!!", timestamp: "", reactions: 4200 },
]

export default function ArtistChannelSpace() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState(initialPosts)
  const [draft, setDraft] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [posts])

  const sendPost = () => {
    if (!draft.trim()) return
    setPosts((prev) => [...prev, { id: Date.now(), text: draft, timestamp: "", reactions: 0 }])
    setDraft("")
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* K Logo */}
      <div className="flex justify-center pt-10 pb-3">
        <svg width="28" height="32" viewBox="0 0 60 69" fill="none">
          <path d="M10 8 L10 61" stroke="#3D5898" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 34 L48 10" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 34 L48 60" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Artist row */}
      <div className="px-5 flex items-center gap-3 pb-3">
        <div className="w-11 h-11 rounded-full overflow-hidden flex-none">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <p className="font-extrabold text-[#1E2D5A] text-sm leading-tight">Nadin Amizah</p>
          <p className="text-[#7A8BB5] text-[10px] uppercase tracking-widest font-bold">Singer</p>
        </div>
        <button onClick={() => navigate("/artist/channel/settings")} className="text-[#7A8BB5]">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="1.8"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="1.8"/></svg>
        </button>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-[#C8D0E8] mb-4" />

      {/* Channel name */}
      <p className="text-center font-extrabold text-[#1E2D5A] text-base mb-2">Nadin's Space</p>

      {/* Posts area */}
      <div className="flex-1 px-5 overflow-y-auto pb-28">
        <div className="flex flex-col gap-3 justify-end min-h-full pt-8">
          {posts.map((post) => (
            <div key={post.id}>
              {post.timestamp && (
                <p className="text-center text-xs text-[#7A8BB5] font-semibold mb-3">
                  {post.timestamp}
                </p>
              )}
              <div className="relative">
                <div className="bg-white rounded-full px-5 py-3.5 shadow-sm mx-auto max-w-[90%]">
                  <p className="text-[#1E2D5A] font-semibold text-sm text-center">{post.text}</p>
                </div>
                {post.reactions > 0 && (
                  <div className="absolute -bottom-2.5 right-4 bg-[#3D5898] rounded-full px-2.5 py-0.5">
                    <span className="text-[10px] text-white font-extrabold">
                      {post.reactions >= 1000 ? `${Math.round(post.reactions / 1000)}k` : post.reactions} react
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md px-5">
        <div className="bg-white rounded-full flex items-center px-4 py-3 gap-3 shadow-md">
          {/* Camera */}
          <button onClick={() => navigate("/artist/live/setup")} className="w-9 h-9 rounded-full bg-[#F4F5F9] flex items-center justify-center flex-none active:scale-95 transition-transform">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="#7A8BB5" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="12" cy="13" r="4" stroke="#7A8BB5" strokeWidth="1.8"/></svg>
          </button>

          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendPost()}
            placeholder="Sapa fans..."
            className="flex-1 bg-transparent text-sm text-[#1E2D5A] outline-none placeholder:text-[#7A8BB5] font-semibold"
          />

          {/* Mic — voice message */}
          <button onMouseDown={() => {}} onMouseUp={() => {}} className="text-[#7A8BB5] flex-none active:text-[#3D5898] transition-colors">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="1.8"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>

          {/* Plus */}
          <button onClick={sendPost} className="w-8 h-8 rounded-full border-2 border-[#7A8BB5] flex items-center justify-center flex-none active:bg-[#3D5898] active:border-[#3D5898] transition-colors">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="#7A8BB5" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
