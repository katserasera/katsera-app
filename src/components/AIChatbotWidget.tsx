import { useState, useRef, useEffect } from "react"

type Message = {
  id: number
  sender: "bot" | "user"
  text: string
  time: string
}

const KNOWLEDGE_BASE: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["tiket", "konser", "nonton", "jadwal"],
    answer: "Untuk membeli tiket konser atau melihat event artis favoritmu, kamu bisa buka menu 'Concerts' atau 'Events Marketplace'. Pembayaran bisa via QRIS, E-Wallet, atau Bank VA! 🎟️✨",
  },
  {
    keywords: ["koin", "topup", "top-up", "saldo", "wallet"],
    answer: "Kamu bisa melakukan Top-Up Koin Katsera via menu 'Katsera Wallet' atau 'Top Up Coins'. Koin bisa digunakan untuk kirim Gift saat Live Stream atau membeli karya eksklusif! 🪙💫",
  },
  {
    keywords: ["artis", "daftar", "upload", "lagu", "lukisan", "painter"],
    answer: "Untuk bergabung sebagai Creator (Musisi atau Pelukis), klik 'As an Artist' pada menu pendaftaran, lengkapi profil, lalu lakukan Verifikasi Wajah AI! 🎨🎤",
  },
  {
    keywords: ["live", "stream", "siaran", "gift", "hadiah"],
    answer: "Saat menonton Live Stream artis, kamu bisa ketuk layar untuk memberikan Like (Hearts ❤️) dan membuka panel Gift 🌹 untuk mengirim Mawar, Mahkota, atau Roket!",
  },
  {
    keywords: ["otp", "login", "verifikasi", "face", "wajah"],
    answer: "Keamanan Katsera menggunakan otentikasi OTP SMS/Email dan AI Face Recognition kamera langsung untuk memastikan perlindungan akunmu! 🔒🤖",
  },
]

export default function AIChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Halo! Saya Katsera AI Assistant 🤖. Ada yang bisa saya bantu tentang artis, tiket konser, membership, atau koin Katsera?",
      time: "Just now",
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  function handleSend(userText?: string) {
    const textToSend = userText || input
    if (!textToSend.trim()) return

    const userMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!userText) setInput("")
    setIsTyping(true)

    // Match bot response
    setTimeout(() => {
      const lower = textToSend.toLowerCase()
      const match = KNOWLEDGE_BASE.find((k) => k.keywords.some((w) => lower.includes(w)))
      const botResponse = match
        ? match.answer
        : "Terima kasih sudah bertanya! Kamu bisa mencari informasi lebih detail melalui Pusat Bantuan Katsera atau langsung menghubungi Support Chat kami. 🌟"

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-[Nunito]">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 rounded-full bg-[#3D5898] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all group"
          aria-label="Open Katsera AI"
        >
          <span className="text-2xl">🤖</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          <div className="absolute right-16 top-2 bg-[#1E2D5A] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Chat dengan Katsera AI ✨
          </div>
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="w-[340px] h-[480px] bg-white rounded-3xl shadow-2xl border border-[#E0E5F2] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Chat Header */}
          <div className="bg-[#1E2D5A] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#3D5898] flex items-center justify-center text-xl shadow-inner">
                🤖
              </div>
              <div>
                <h4 className="font-extrabold text-sm flex items-center gap-1.5">
                  Katsera AI <span className="text-[10px] bg-green-500 text-white font-bold px-1.5 py-0.2 rounded-full">ONLINE</span>
                </h4>
                <p className="text-[#9BAACE] text-xs">Asisten Cerdas 24/7</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white active:scale-95 transition-all"
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8F9FC]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[82%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#3D5898] text-white rounded-br-none shadow-sm"
                      : "bg-white text-[#1E2D5A] border border-[#E8EAED] rounded-bl-none shadow-sm font-medium"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-[#9BAACE] mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-[#E8EAED] w-max shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#3D5898] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#3D5898] animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-[#3D5898] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="px-3 py-2 bg-white border-t border-[#F0F2F8] flex gap-1.5 overflow-x-auto scrollbar-none">
            {[
              "Beli Tiket Konser 🎟️",
              "Cara Top-Up 🪙",
              "Daftar Artis 🎨",
              "Live Stream 🔴",
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="whitespace-nowrap text-[11px] font-bold bg-[#F4F5F9] text-[#3D5898] hover:bg-[#3D5898] hover:text-white px-3 py-1.5 rounded-full transition-all active:scale-95 flex-none"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-[#E8EAED] flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Tulis pertanyaan..."
              className="flex-1 bg-[#F4F5F9] rounded-2xl px-4 py-2.5 text-xs text-[#1E2D5A] font-semibold outline-none focus:bg-white focus:ring-2 focus:ring-[#3D5898]"
            />
            <button
              onClick={() => handleSend()}
              className="w-10 h-10 rounded-2xl bg-[#3D5898] text-white flex items-center justify-center shadow-md active:scale-95 transition-all flex-none"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
