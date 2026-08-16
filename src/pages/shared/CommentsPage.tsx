import { useState, useRef, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

interface Comment {
  id: number
  user: string
  avatar: string
  text: string
  time: string
  likes: number
  liked: boolean
  replies?: Comment[]
  reported?: boolean
}

const INITIAL_COMMENTS: Comment[] = [
  { id: 1, user: "rina_music", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop", text: "This is absolutely breathtaking 😭❤️ your talent never fails to move me", time: "2h ago", likes: 142, liked: false, replies: [
    { id: 11, user: "nadin_official", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop", text: "Thank you so much Rina 🥺💙 means the world!", time: "1h ago", likes: 89, liked: true },
    { id: 12, user: "fanatic_bernadya", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop", text: "Same, I cried listening to it 😭", time: "45m ago", likes: 23, liked: false },
  ]},
  { id: 2, user: "jakarta_fan_club", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop", text: "Can't wait for the album! When is the release date? 🎵", time: "3h ago", likes: 78, liked: false },
  { id: 3, user: "melody_addict99", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop", text: "The bridge in this song hits different every single time 💔", time: "5h ago", likes: 201, liked: true },
  { id: 4, user: "artlover_id", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop", text: "Been playing this on loop for 3 days straight, no regrets", time: "6h ago", likes: 55, liked: false },
  { id: 5, user: "katsera_superfan", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop", text: "Your voice is literally a gift 🎁 Never stop creating please!", time: "8h ago", likes: 310, liked: false },
]

function Avatar({ src, size = 36 }: { src: string; size?: number }) {
  return <img src={src} alt="" className="rounded-full object-cover flex-none" style={{ width: size, height: size }} />
}

function CommentItem({
  comment, onLike, onDelete, onReport, onReply, isOwn, depth = 0
}: {
  comment: Comment; onLike: (id: number) => void; onDelete: (id: number) => void; onReport: (id: number) => void; onReply: (user: string) => void; isOwn: boolean; depth?: number
}) {
  const [showMenu, setShowMenu] = useState(false)
  const [showReplies, setShowReplies] = useState(depth === 0)

  return (
    <div className={depth > 0 ? "ml-10 border-l-2 border-[#F4F5F9] pl-3" : ""}>
      <div className="flex gap-3 py-3">
        <Avatar src={comment.avatar} size={depth > 0 ? 28 : 36} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-[#1E2D5A] font-bold text-xs">{comment.user}</p>
            <p className="text-[#9BAACE] text-[10px]">{comment.time}</p>
          </div>
          {comment.reported ? (
            <p className="text-[#9BAACE] text-xs italic">This comment has been reported.</p>
          ) : (
            <p className="text-[#1E2D5A] text-sm leading-snug">{comment.text}</p>
          )}
          <div className="flex items-center gap-4 mt-2">
            <button onClick={() => onLike(comment.id)} className={`flex items-center gap-1.5 text-xs font-bold transition-colors active:scale-95 ${comment.liked ? "text-red-500" : "text-[#9BAACE]"}`}>
              <svg width="12" height="12" fill={comment.liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              {comment.likes}
            </button>
            {depth === 0 && (
              <button onClick={() => onReply(comment.user)} className="text-[#7A8BB5] text-xs font-bold active:scale-95">Reply</button>
            )}
            {comment.replies && comment.replies.length > 0 && depth === 0 && (
              <button onClick={() => setShowReplies(!showReplies)} className="text-[#3D5898] text-xs font-bold">
                {showReplies ? "Hide" : `${comment.replies.length} replies`}
              </button>
            )}
          </div>
        </div>
        <div className="relative flex-none">
          <button onClick={() => setShowMenu(!showMenu)} className="w-7 h-7 flex items-center justify-center text-[#C8D0E8] active:scale-95">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 bg-white rounded-2xl shadow-lg border border-[#F0F2F8] z-10 overflow-hidden min-w-[120px]">
              {isOwn ? (
                <button onClick={() => { onDelete(comment.id); setShowMenu(false) }} className="w-full px-4 py-3 text-left text-red-500 text-xs font-bold hover:bg-red-50 flex items-center gap-2">
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>Delete
                </button>
              ) : (
                <button onClick={() => { onReport(comment.id); setShowMenu(false) }} className="w-full px-4 py-3 text-left text-[#7A8BB5] text-xs font-bold hover:bg-[#F4F5F9] flex items-center gap-2">
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>Report
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {showReplies && comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} onLike={onLike} onDelete={onDelete} onReport={onReport} onReply={onReply} isOwn={reply.user === "rina_music"} depth={1} />
      ))}
    </div>
  )
}

export default function CommentsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { postTitle = "Latest post" } = (location.state as { postTitle?: string }) || {}
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS)
  const [text, setText] = useState("")
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState<"top" | "newest">("top")
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const sorted = [...comments].sort((a, b) =>
    sortBy === "top" ? b.likes - a.likes : 0
  )

  function handleLike(id: number) {
    setComments((prev) => prev.map((c) => {
      if (c.id === id) return { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }
      if (c.replies) return { ...c, replies: c.replies.map((r) => r.id === id ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 } : r) }
      return c
    }))
  }

  function handleDelete(id: number) {
    setComments((prev) => prev.filter((c) => c.id !== id).map((c) => ({ ...c, replies: c.replies?.filter((r) => r.id !== id) })))
  }

  function handleReport(id: number) {
    setComments((prev) => prev.map((c) => {
      if (c.id === id) return { ...c, reported: true }
      if (c.replies) return { ...c, replies: c.replies.map((r) => r.id === id ? { ...r, reported: true } : r) }
      return c
    }))
  }

  function handleReply(user: string) {
    setReplyTo(user)
    setText(`@${user} `)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  function handleSend() {
    if (!text.trim()) return
    setLoading(true)
    setTimeout(() => {
      const newComment: Comment = {
        id: Date.now(), user: "rina_music",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop",
        text: text.trim(), time: "Just now", likes: 0, liked: false
      }
      setComments((prev) => [newComment, ...prev])
      setText(""); setReplyTo(null); setLoading(false)
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
    }, 500)
  }

  // Auto-focus on mount
  useEffect(() => { inputRef.current?.focus() }, [])

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="bg-white px-4 pt-12 pb-3 shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-transform">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="flex-1">
            <p className="text-[#1E2D5A] font-extrabold text-lg">Comments</p>
            <p className="text-[#9BAACE] text-xs line-clamp-1">{postTitle}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setSortBy("top")} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${sortBy === "top" ? "bg-[#3D5898] text-white" : "bg-[#F4F5F9] text-[#7A8BB5]"}`}>Top</button>
            <button onClick={() => setSortBy("newest")} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${sortBy === "newest" ? "bg-[#3D5898] text-white" : "bg-[#F4F5F9] text-[#7A8BB5]"}`}>New</button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 divide-y divide-[#F4F5F9] pb-36">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="text-4xl">💬</span>
            <p className="text-[#1E2D5A] font-bold">No comments yet</p>
            <p className="text-[#9BAACE] text-sm">Be the first to comment!</p>
          </div>
        ) : sorted.map((c) => (
          <CommentItem key={c.id} comment={c} onLike={handleLike} onDelete={handleDelete} onReport={handleReport} onReply={handleReply} isOwn={c.user === "rina_music"} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#F0F2F8] px-4 py-3">
        {replyTo && (
          <div className="flex items-center gap-2 mb-2">
            <p className="text-[#3D5898] text-xs font-semibold flex-1">Replying to @{replyTo}</p>
            <button onClick={() => { setReplyTo(null); setText("") }} className="text-[#9BAACE] text-xs">Cancel</button>
          </div>
        )}
        <div className="flex items-end gap-3">
          <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop" size={32} />
          <div className="flex-1 bg-[#F4F5F9] rounded-2xl px-4 py-2.5 flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend() } }}
              placeholder="Add a comment..."
              rows={1}
              className="flex-1 bg-transparent text-[#1E2D5A] text-sm outline-none resize-none placeholder:text-[#C8D0E8] max-h-24"
              style={{ minHeight: 24 }}
            />
          </div>
          <button onClick={handleSend} disabled={!text.trim() || loading} className="w-9 h-9 rounded-full bg-[#3D5898] flex items-center justify-center flex-none disabled:opacity-40 active:scale-95 transition-all">
            {loading ? <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>}
          </button>
        </div>
      </div>
    </div>
  )
}
