import { useState, useEffect, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"

// ── Types ─────────────────────────────────────────────────────────────────────
type MessageRole = "user" | "ai" | "agent" | "system"
type ChatStatus = "idle" | "active" | "waiting-agent" | "agent-joined" | "ended"

interface Message {
  id: string
  role: MessageRole
  text: string
  time: Date
  read?: boolean
  attachmentUrl?: string
  typing?: boolean
}

// ── Constants ─────────────────────────────────────────────────────────────────
const AI_NAME = "Katsera AI"
const AGENT_NAME = "Rafi S."
const AGENT_IMG = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop"

const EMOJIS = ["😊","😂","❤️","👍","🎵","🎨","🔥","✨","😢","🙏","🎉","💪"]

const AI_REPLIES: Record<string, string> = {
  default: "Thank you for reaching out! I'm looking into that for you right now.",
  payment: "I can see your recent transactions. Could you share the order ID or transaction reference so I can investigate further?",
  account: "I can help you with your account. Could you verify your registered email address?",
  ticket: "Let me check your ticket details. Can you provide the event name and booking reference?",
  cancel: "I understand you'd like to cancel. May I ask the reason so we can help you better?",
  refund: "Refund requests are typically processed within 3–5 business days. Would you like me to initiate one?",
}

function pickAiReply(text: string): string {
  const lower = text.toLowerCase()
  if (lower.includes("pay") || lower.includes("charge") || lower.includes("billing")) return AI_REPLIES.payment
  if (lower.includes("account") || lower.includes("login") || lower.includes("password")) return AI_REPLIES.account
  if (lower.includes("ticket") || lower.includes("concert") || lower.includes("event")) return AI_REPLIES.ticket
  if (lower.includes("cancel")) return AI_REPLIES.cancel
  if (lower.includes("refund") || lower.includes("money back")) return AI_REPLIES.refund
  return AI_REPLIES.default
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function StatusDot({ online }: { online: boolean }) {
  return (
    <span className={`inline-block w-2.5 h-2.5 rounded-full flex-none ${online ? "bg-green-400" : "bg-gray-400"}`} />
  )
}

function TypingBubble() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-7 h-7 rounded-full bg-[#3D5898] flex items-center justify-center flex-none">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>
      </div>
      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-[#9BAACE]" style={{ animation: `bounce 1s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
      </div>
    </div>
  )
}

function MessageBubble({ msg, showName }: { msg: Message; showName: boolean }) {
  const isUser = msg.role === "user"
  const isSystem = msg.role === "system"
  const time = msg.time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })

  if (isSystem) {
    return (
      <div className="flex justify-center my-3">
        <span className="text-[#9BAACE] text-xs font-semibold bg-white/80 px-3 py-1 rounded-full shadow-sm">{msg.text}</span>
      </div>
    )
  }

  const bubbleColor = isUser ? "bg-[#3D5898] text-white rounded-br-sm" : msg.role === "agent" ? "bg-[#F4F5F9] text-[#1E2D5A] rounded-bl-sm" : "bg-white text-[#1E2D5A] rounded-bl-sm"
  const avatar = msg.role === "agent"
    ? <img src={AGENT_IMG} alt={AGENT_NAME} className="w-7 h-7 rounded-full object-cover flex-none" />
    : <div className="w-7 h-7 rounded-full bg-[#3D5898] flex items-center justify-center flex-none"><svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/></svg></div>

  return (
    <div className={`flex items-end gap-2 mb-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {!isUser && avatar}
      <div className={`max-w-[78%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
        {showName && !isUser && (
          <span className="text-[#9BAACE] text-[10px] font-semibold ml-1">{msg.role === "agent" ? AGENT_NAME : AI_NAME}</span>
        )}
        <div className={`px-4 py-2.5 rounded-2xl shadow-sm ${bubbleColor}`}>
          {msg.attachmentUrl && (
            <img src={msg.attachmentUrl} alt="attachment" className="w-40 h-28 object-cover rounded-xl mb-2" />
          )}
          <p className="text-sm leading-relaxed">{msg.text}</p>
        </div>
        <div className={`flex items-center gap-1.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
          <span className="text-[#C8D0E8] text-[10px]">{time}</span>
          {isUser && msg.read && (
            <svg width="12" height="8" fill="none" viewBox="0 0 16 10"><path d="M1 5l4 4L15 1" stroke="#3D5898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 5l4 4" stroke="#3D5898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}
          {isUser && !msg.read && (
            <svg width="10" height="8" fill="none" viewBox="0 0 12 10"><path d="M1 5l4 4L11 1" stroke="#C8D0E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function SupportChat() {
  const navigate = useNavigate()
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const [status, setStatus] = useState<ChatStatus>("idle")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)
  const [agentOnline] = useState(true)
  const [ratingDone, setRatingDone] = useState(false)
  const [rating, setRating] = useState(0)
  const [endConfirm, setEndConfirm] = useState(false)

  const uid = () => Math.random().toString(36).slice(2)

  const addMsg = useCallback((role: MessageRole, text: string, extra?: Partial<Message>) => {
    setMessages((prev) => [...prev, { id: uid(), role, text, time: new Date(), read: role !== "user", ...extra }])
  }, [])

  // Mark user messages read after 1.2s
  useEffect(() => {
    const t = setTimeout(() => {
      setMessages((prev) => prev.map((m) => m.role === "user" ? { ...m, read: true } : m))
    }, 1200)
    return () => clearTimeout(t)
  }, [messages])

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  function startChat() {
    setStatus("active")
    setTimeout(() => {
      addMsg("ai", "Hi! 👋 I'm Katsera's AI assistant. How can I help you today?")
      setTimeout(() => {
        addMsg("ai", "You can ask me about payments, tickets, account issues, or anything else. I'm here 24/7! 🤖")
      }, 800)
    }, 500)
  }

  function sendMessage(text?: string, attachmentUrl?: string) {
    const content = (text ?? input).trim()
    if (!content && !attachmentUrl) return
    setInput("")
    setShowEmoji(false)
    addMsg("user", content || "📎 Sent an attachment", { attachmentUrl, read: false })

    // Simulate AI typing
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const reply = pickAiReply(content)
      addMsg("ai", reply)
    }, 1400 + Math.random() * 800)
  }

  function requestHumanAgent() {
    addMsg("system", "Requesting a human support agent…")
    setStatus("waiting-agent")
    setTimeout(() => {
      addMsg("system", `${AGENT_NAME} has joined the chat`)
      setStatus("agent-joined")
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        addMsg("agent", `Hi! I'm ${AGENT_NAME} from the Katsera support team. I can see your conversation with our AI. Let me take a closer look and help you directly.`)
      }, 1200)
    }, 4000)
  }

  function endChat() {
    setEndConfirm(false)
    addMsg("system", "Chat session ended")
    setStatus("ended")
  }

  function handleAttachment() {
    fileRef.current?.click()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    sendMessage("", url)
    e.target.value = ""
  }

  return (
    <div className="h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <style>{`
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
      `}</style>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

      {/* ── Header ── */}
      <div className="bg-white px-4 pt-12 pb-4 flex items-center gap-3 shadow-sm flex-none">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-[#F4F5F9] flex items-center justify-center flex-none active:scale-95 transition-transform">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round"/></svg>
        </button>

        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#3D5898] flex items-center justify-center">
              {status === "agent-joined"
                ? <img src={AGENT_IMG} alt={AGENT_NAME} className="w-10 h-10 rounded-full object-cover" />
                : <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>
              }
            </div>
            <StatusDot online={agentOnline} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[#1E2D5A] font-bold text-sm">
              {status === "agent-joined" ? AGENT_NAME : "Katsera Support"}
            </p>
            <p className="text-[#9BAACE] text-xs">
              {status === "idle" && "Customer Support"}
              {status === "active" && "AI Assistant · Online"}
              {status === "waiting-agent" && "Connecting to agent…"}
              {status === "agent-joined" && "Human Agent · Online"}
              {status === "ended" && "Chat Ended"}
            </p>
          </div>
        </div>

        {status !== "idle" && status !== "ended" && (
          <button onClick={() => setEndConfirm(true)} className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center active:scale-95 transition-transform">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        )}
      </div>

      {/* ── Idle (pre-chat) screen ── */}
      {status === "idle" && (
        <div className="flex-1 overflow-y-auto px-5 pt-8 pb-6 flex flex-col gap-5">
          {/* Support card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm text-center">
            <div className="w-20 h-20 rounded-full bg-[#3D5898] flex items-center justify-center mx-auto mb-4">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="white"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <h2 className="text-[#1E2D5A] font-extrabold text-xl mb-2">How can we help?</h2>
            <p className="text-[#7A8BB5] text-sm leading-relaxed">Our AI assistant is available 24/7. Human agents are online during business hours.</p>
          </div>

          {/* Status bar */}
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <StatusDot online={agentOnline} />
            <div className="flex-1">
              <p className="text-[#1E2D5A] font-bold text-sm">{agentOnline ? "Support Online" : "Support Offline"}</p>
              <p className="text-[#9BAACE] text-xs">{agentOnline ? "Human agents available · Avg wait ~2 min" : "AI assistant available · Agents back Mon 9AM"}</p>
            </div>
          </div>

          {/* Common topics */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-[#1E2D5A] font-bold text-sm mb-3">Common Topics</p>
            <div className="space-y-2">
              {[
                { icon: "💳", label: "Payment & Billing" },
                { icon: "🎫", label: "Tickets & Events" },
                { icon: "👤", label: "Account & Login" },
                { icon: "🔴", label: "Live Streaming Issues" },
                { icon: "🔄", label: "Refund Request" },
                { icon: "🛡️", label: "Report Content" },
              ].map(({ icon, label }) => (
                <button key={label} onClick={() => { startChat(); setTimeout(() => sendMessage(label), 1800) }} className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F4F5F9] active:bg-[#E8EDF7] transition-colors text-left">
                  <span className="text-lg">{icon}</span>
                  <span className="text-[#1E2D5A] text-sm font-semibold">{label}</span>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="ml-auto"><path d="M9 18l6-6-6-6" stroke="#C8D0E8" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
              ))}
            </div>
          </div>

          <button onClick={startChat} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-transform shadow-md flex items-center justify-center gap-2">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Start Live Chat
          </button>
        </div>
      )}

      {/* ── Active chat ── */}
      {status !== "idle" && (
        <>
          {/* Agent request banner */}
          {status === "active" && (
            <div className="bg-[#3D5898]/8 px-4 py-2.5 flex items-center justify-between flex-none">
              <p className="text-[#3D5898] text-xs font-semibold">Want to speak with a human agent?</p>
              <button onClick={requestHumanAgent} className="text-[#3D5898] text-xs font-bold bg-[#3D5898]/10 px-3 py-1 rounded-full active:scale-95 transition-transform">
                Request Agent
              </button>
            </div>
          )}

          {status === "waiting-agent" && (
            <div className="bg-amber-50 px-4 py-2.5 flex items-center gap-2 flex-none">
              <div className="w-3 h-3 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
              <p className="text-amber-700 text-xs font-semibold">Connecting you to a human agent — estimated wait ~2 min</p>
            </div>
          )}

          {status === "agent-joined" && (
            <div className="bg-green-50 px-4 py-2 flex items-center gap-2 flex-none">
              <StatusDot online={true} />
              <p className="text-green-700 text-xs font-semibold">{AGENT_NAME} (Human Agent) is now in the conversation</p>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {/* Date header */}
            <div className="flex justify-center mb-4">
              <span className="text-[#9BAACE] text-[10px] font-semibold bg-white/80 px-3 py-1 rounded-full shadow-sm">Today</span>
            </div>

            {messages.map((msg, i) => {
              const prevRole = i > 0 ? messages[i - 1].role : null
              const showName = msg.role !== "user" && msg.role !== "system" && prevRole !== msg.role
              return <MessageBubble key={msg.id} msg={msg} showName={showName} />
            })}

            {isTyping && <TypingBubble />}
            <div ref={bottomRef} />
          </div>

          {/* Ended state */}
          {status === "ended" && (
            <div className="px-4 py-5 bg-white border-t border-[#E8E8E8] flex-none">
              {!ratingDone ? (
                <div className="text-center">
                  <p className="text-[#1E2D5A] font-bold text-sm mb-3">Rate your support experience</p>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button key={s} onClick={() => setRating(s)} className={`text-2xl transition-transform active:scale-90 ${rating >= s ? "text-yellow-400" : "text-[#E0E5F2]"}`}>★</button>
                    ))}
                  </div>
                  <button onClick={() => { if (rating) setRatingDone(true) }} disabled={!rating} className="w-full py-3 rounded-full bg-[#3D5898] text-white font-bold text-sm disabled:opacity-40 active:scale-95 transition-all">
                    Submit Rating
                  </button>
                </div>
              ) : (
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <svg width="20" height="20" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><polyline points="16 4 7 13 3 9"/></svg>
                  </div>
                  <p className="text-[#1E2D5A] font-bold text-sm">Thanks for your feedback!</p>
                  <button onClick={() => navigate(-1)} className="text-[#3D5898] text-sm font-bold active:opacity-60">Return to Help Center</button>
                </div>
              )}
            </div>
          )}

          {/* Input bar */}
          {status !== "ended" && (
            <div className="bg-white border-t border-[#E8E8E8] flex-none">
              {showEmoji && (
                <div className="px-4 pt-3 pb-1 flex flex-wrap gap-2 border-b border-[#F0F2F8]">
                  {EMOJIS.map((e) => (
                    <button key={e} onClick={() => setInput((p) => p + e)} className="text-xl active:scale-90 transition-transform">{e}</button>
                  ))}
                </div>
              )}
              <div className="flex items-end gap-2 px-3 py-3">
                <button onClick={() => setShowEmoji(!showEmoji)} className={`w-9 h-9 rounded-full flex items-center justify-center flex-none transition-colors active:scale-95 ${showEmoji ? "bg-[#3D5898]/10 text-[#3D5898]" : "text-[#9BAACE]"}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/><path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/></svg>
                </button>
                <button onClick={handleAttachment} className="w-9 h-9 rounded-full flex items-center justify-center flex-none text-[#9BAACE] active:scale-95 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <div className="flex-1 bg-[#F4F5F9] rounded-full px-4 py-2.5 flex items-center">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                    placeholder="Type a message…"
                    className="flex-1 bg-transparent text-sm text-[#1E2D5A] outline-none placeholder:text-[#C8D0E8] font-semibold"
                  />
                </div>
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim()}
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-none transition-all active:scale-95 ${input.trim() ? "bg-[#3D5898] text-white" : "bg-[#E0E5F2] text-[#9BAACE]"}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><polygon points="22 2 15 22 11 13 2 9 22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── End chat confirmation sheet ── */}
      {endConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-5 space-y-3">
            <div className="w-10 h-1 rounded-full bg-[#E0E5F2] mx-auto" />
            <p className="font-extrabold text-[#1E2D5A] text-base">End this conversation?</p>
            <p className="text-[#7A8BB5] text-sm">Your chat history will be saved. You can start a new chat anytime.</p>
            <button onClick={endChat} className="w-full py-3.5 rounded-full bg-red-500 text-white font-extrabold text-sm active:scale-95 transition-transform">End Chat</button>
            <button onClick={() => setEndConfirm(false)} className="w-full py-3.5 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-extrabold text-sm active:scale-95 transition-transform">Keep Chatting</button>
          </div>
        </div>
      )}
    </div>
  )
}
