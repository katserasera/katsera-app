import { useState, useEffect, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const INITIAL_MESSAGES = [
  { id: 1, user: "AlipahDaksin00", text: "Sent a Gift 🎁", isGift: true, time: 0 },
  { id: 2, user: "AlipahDaksin00", text: "Kamu lagi dimana ituuuuu", isGift: false, time: 2000 },
  { id: 3, user: "DeviCakUn6", text: "Wanita aesthetic inii lagiii ❤❤3", isGift: false, time: 4000 },
  { id: 4, user: "NesaChan77", text: "spill lipstick din", isGift: false, time: 6000 },
  { id: 5, user: "FanRaisa99", text: "udah lama nungguin ini!! 🔥🔥", isGift: false, time: 8000 },
  { id: 6, user: "MartaLestari", text: "Sent a Gift 🌹", isGift: true, time: 10000 },
]

type FloatingParticle = { id: number; emoji: string; x: number; y: number }

const VIRTUAL_GIFTS = [
  { id: "rose", name: "Rose", emoji: "🌹", price: 10 },
  { id: "star", name: "Katsera Star", emoji: "⭐", price: 50 },
  { id: "crown", name: "Gold Crown", emoji: "👑", price: 100 },
  { id: "trophy", name: "Trophy", emoji: "🏆", price: 250 },
  { id: "rocket", name: "Super Rocket", emoji: "🚀", price: 500 },
  { id: "diamond", name: "Diamond", emoji: "💎", price: 1000 },
]

export default function LiveBroadcast() {
  const navigate = useNavigate()
  const location = useLocation()
  const { mode, aiMod } = (location.state as { title: string; mode: string; aiMod: boolean }) || { title: "Live Stream", mode: "public", aiMod: true }

  const [viewers, setViewers] = useState(400)
  const [likes, setLikes] = useState(250)
  const [comment, setComment] = useState("")
  const [messages, setMessages] = useState<{ id: number; user: string; text: string; isGift: boolean }[]>([])
  const [floatingGifts, setFloatingGifts] = useState<{ id: number; emoji: string; x: number }[]>([])
  const [floatingHearts, setFloatingHearts] = useState<FloatingParticle[]>([])
  const [duration, setDuration] = useState(0)
  const [showEndConfirm, setShowEndConfirm] = useState(false)
  const [showGiftModal, setShowGiftModal] = useState(false)
  const [aiFiltered, setAiFiltered] = useState(0)
  const [aiWarningToast, setAiWarningToast] = useState("")
  const [isEnded, setIsEnded] = useState(false)
  const [useRealCamera, setUseRealCamera] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  // Simulate messages arriving
  useEffect(() => {
    const timers = INITIAL_MESSAGES.map((msg) =>
      setTimeout(() => {
        setMessages((prev) => [...prev.slice(-6), { id: msg.id, user: msg.user, text: msg.text, isGift: msg.isGift }])
        if (msg.isGift) spawnGift("🎁")
      }, msg.time)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  // Duration counter
  useEffect(() => {
    const t = setInterval(() => setDuration((d) => d + 1), 1000)
    return () => clearInterval(t)
  }, [])

  // Simulated viewer/like growth
  useEffect(() => {
    const t = setInterval(() => {
      setViewers((v) => v + Math.floor(Math.random() * 3))
      setLikes((l) => l + Math.floor(Math.random() * 5))
      if (aiMod && Math.random() > 0.85) setAiFiltered((n) => n + 1)
    }, 3000)
    return () => clearInterval(t)
  }, [aiMod])

  // Camera toggle
  useEffect(() => {
    if (useRealCamera) {
      navigator.mediaDevices?.getUserMedia({ video: { facingMode: "user" } })
        .then((s) => {
          setStream(s)
          if (videoRef.current) videoRef.current.srcObject = s
        })
        .catch(() => setUseRealCamera(false))
    } else {
      if (stream) stream.getTracks().forEach((t) => t.stop())
    }
  }, [useRealCamera])

  const spawnGift = (emoji: string) => {
    const id = Date.now()
    const x = 20 + Math.random() * 60
    setFloatingGifts((prev) => [...prev, { id, emoji, x }])
    setTimeout(() => setFloatingGifts((prev) => prev.filter((g) => g.id !== id)), 2500)
  }

  const handleTapScreen = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    const hearts = ["❤️", "💖", "🔥", "✨", "😍"]
    const emoji = hearts[Math.floor(Math.random() * hearts.length)]
    const id = Date.now() + Math.random()

    setLikes((l) => l + 1)
    setFloatingHearts((prev) => [...prev.slice(-10), { id, emoji, x, y }])
    setTimeout(() => setFloatingHearts((prev) => prev.filter((h) => h.id !== id)), 1500)
  }

  const sendGift = (gift: typeof VIRTUAL_GIFTS[0]) => {
    spawnGift(gift.emoji)
    setMessages((prev) => [...prev.slice(-6), { id: Date.now(), user: "You", text: `Sent ${gift.name} ${gift.emoji}!`, isGift: true }])
    setShowGiftModal(false)
  }

  const sendComment = () => {
    if (!comment.trim()) return
    const blocked = ["spam", "hate", "toxic", "bodoh", "anjing", "kasar", "babi"]
    const isToxic = aiMod && blocked.some((w) => comment.toLowerCase().includes(w))

    if (isToxic) {
      setAiFiltered((n) => n + 1)
      setAiWarningToast("🛡️ AI Content Moderator: Comment blocked for inappropriate content!")
      setTimeout(() => setAiWarningToast(""), 3000)
    } else {
      setMessages((prev) => [...prev.slice(-6), { id: Date.now(), user: "You", text: comment, isGift: false }])
    }
    setComment("")
  }

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`

  if (isEnded) {
    return (
      <div className="min-h-screen bg-[#1E2D5A] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-[#3D5898] flex items-center justify-center mb-6">
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h1 className="text-white font-extrabold text-2xl mb-2">Live Ended</h1>
        <p className="text-[#9BAACE] text-sm mb-2">Duration: {fmt(duration)}</p>
        <div className="grid grid-cols-3 gap-4 w-full my-6">
          {[["👁", viewers.toLocaleString(), "Viewers"], ["❤️", likes.toLocaleString(), "Likes"], ["🛡", aiFiltered.toString(), "AI Filtered"]].map(([icon, val, label]) => (
            <div key={label} className="bg-[#3D5898]/30 rounded-2xl p-3">
              <p className="text-2xl mb-1">{icon}</p>
              <p className="text-white font-extrabold text-lg">{val}</p>
              <p className="text-[#9BAACE] text-xs">{label}</p>
            </div>
          ))}
        </div>
        <button onClick={() => navigate("/artist/dashboard")} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-all">
          Back to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div
      onClick={handleTapScreen}
      className="h-screen bg-black relative overflow-hidden w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto sm:my-2 sm:rounded-3xl sm:shadow-2xl font-[Nunito] select-none cursor-pointer transition-all"
      style={{ maxHeight: "100dvh" }}
    >
      {/* Video Background / WebRTC Feed */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#2d1b4e] to-[#0d0d1a]">
        {useRealCamera ? (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        ) : (
          <>
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-64 h-64 rounded-full bg-[#3D5898] blur-3xl" />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-72 bg-gradient-to-t from-[#1E2D5A]/60 to-transparent rounded-t-full flex items-end justify-center pb-4">
              <span className="text-8xl select-none animate-pulse">🎤</span>
            </div>
          </>
        )}
      </div>

      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 pt-12 px-4 flex items-center justify-between z-20" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setShowEndConfirm(true)}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white"
        >
          ✕
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setUseRealCamera(!useRealCamera)}
            className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-xs font-bold flex items-center gap-1.5"
          >
            📷 {useRealCamera ? "Cam On" : "Cam Off"}
          </button>
          <div className="flex items-center gap-1.5 bg-[#3D5898] rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-white text-xs font-extrabold">Live</span>
          </div>
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
            <span className="text-white text-xs font-bold">👁 {viewers.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
            <span className="text-white text-xs font-bold">❤️ {likes.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* AI Moderator Toast Warning */}
      {aiWarningToast && (
        <div className="absolute top-24 left-4 right-4 z-40 bg-red-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow-xl animate-in fade-in slide-in-from-top-4 duration-200 flex items-center gap-2">
          {aiWarningToast}
        </div>
      )}

      {/* Duration + AI badge */}
      <div className="absolute top-24 left-4 flex flex-col gap-2 z-20">
        <div className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 w-max">
          <span className="text-white text-xs font-bold font-mono">{fmt(duration)}</span>
        </div>
        {aiMod && (
          <div className="bg-[#3D5898]/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5 w-max">
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="white" fillOpacity="0.5" stroke="white" strokeWidth="2"/></svg>
            <span className="text-white text-[10px] font-bold">AI Moderator Active · {aiFiltered} blocked</span>
          </div>
        )}
      </div>

      {/* Floating hearts on tap */}
      {floatingHearts.map((h) => (
        <div
          key={h.id}
          className="absolute z-30 pointer-events-none text-3xl animate-out fade-out slide-out-to-top-12 duration-1000"
          style={{ left: `${h.x}%`, top: `${h.y}%` }}
        >
          {h.emoji}
        </div>
      ))}

      {/* Floating gifts */}
      {floatingGifts.map((g) => (
        <div
          key={g.id}
          className="absolute bottom-28 z-30 animate-bounce pointer-events-none text-4xl"
          style={{ left: `${g.x}%`, animationDuration: "0.6s" }}
        >
          {g.emoji}
        </div>
      ))}

      {/* Chat messages */}
      <div
        ref={chatRef}
        className="absolute bottom-20 left-4 right-16 z-20 space-y-1.5 pointer-events-none"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-center gap-2 text-xs backdrop-blur-sm px-3 py-1.5 rounded-full w-max max-w-[85%] ${
              msg.isGift ? "bg-yellow-500/30 border border-yellow-400/50" : "bg-black/40"
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-[#3D5898] flex items-center justify-center flex-none text-[9px] text-white font-bold">
              {msg.user[0]}
            </div>
            <span className="text-white/80 font-bold text-[11px]">{msg.user}:</span>
            <span className={`text-white text-[11px] ${msg.isGift ? "text-yellow-300 font-extrabold" : ""}`}>{msg.text}</span>
          </div>
        ))}
      </div>

      {/* Right action buttons */}
      <div className="absolute bottom-24 right-3 z-20 flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => { spawnGift("❤️"); setLikes((l) => l + 5) }}
          className="w-12 h-12 rounded-full bg-red-500/80 backdrop-blur-sm text-white flex items-center justify-center text-xl shadow-lg active:scale-95 transition-all"
        >
          ❤️
        </button>
        <button
          onClick={() => setShowGiftModal(true)}
          className="w-12 h-12 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xl shadow-lg active:scale-95 transition-all animate-bounce"
        >
          🎁
        </button>
      </div>

      {/* Comment input */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-6 pt-2 bg-gradient-to-t from-black/80 to-transparent" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendComment()}
            placeholder="Send a comment (AI moderated)..."
            className="flex-1 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 text-sm rounded-full px-4 py-3 outline-none border border-white/30"
          />
          <button onClick={sendComment} className="w-10 h-10 rounded-full bg-[#3D5898] text-white flex items-center justify-center font-bold">
            ➔
          </button>
        </div>
      </div>

      {/* Gift Selection Drawer Modal */}
      {showGiftModal && (
        <div className="absolute inset-0 bg-black/70 z-50 flex items-end" onClick={(e) => e.stopPropagation()}>
          <div className="bg-[#1E2D5A] text-white rounded-t-3xl p-6 w-full animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-base">Send Virtual Gift 🎁</h3>
              <button onClick={() => setShowGiftModal(false)} className="text-white/60 text-sm font-bold">Close</button>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {VIRTUAL_GIFTS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => sendGift(g)}
                  className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-3 flex flex-col items-center gap-1 active:scale-95 transition-all"
                >
                  <span className="text-3xl mb-1">{g.emoji}</span>
                  <span className="font-bold text-xs">{g.name}</span>
                  <span className="text-[10px] text-yellow-400 font-extrabold">🪙 {g.price} Coins</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* End broadcast confirm */}
      {showEndConfirm && (
        <div className="absolute inset-0 bg-black/70 z-50 flex items-center justify-center px-8" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white rounded-3xl p-6 w-full text-center">
            <h3 className="font-extrabold text-[#1E2D5A] text-lg mb-2">End Live Stream?</h3>
            <p className="text-[#7A8BB5] text-sm mb-6">Your broadcast will end and viewers will see the replay.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowEndConfirm(false)} className="flex-1 py-3 rounded-full border-2 border-[#C8D0E8] text-[#7A8BB5] font-bold text-sm">
                Cancel
              </button>
              <button
                onClick={() => { setShowEndConfirm(false); setIsEnded(true) }}
                className="flex-1 py-3 rounded-full bg-red-500 text-white font-extrabold text-sm"
              >
                End Live
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
