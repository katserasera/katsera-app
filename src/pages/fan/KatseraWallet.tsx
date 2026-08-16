import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

type WalletTab = "home" | "topup" | "history"
type TopUpStep = "amount" | "method" | "qris" | "processing" | "success"
type TopUpMethod = "qris" | "bca-va" | "mandiri-va" | "gopay" | "ovo" | "dana" | "visa"

function fmt(n: number) { return "Rp" + n.toLocaleString("id-ID") }

const TX_HISTORY = [
  { id: 1, type: "topup", label: "Top Up via GoPay", amount: 500000, date: "Jul 28, 2026 · 14:32", sign: 1 },
  { id: 2, type: "purchase", label: "Concert Ticket — VIP", amount: 750000, date: "Jul 25, 2026 · 09:15", sign: -1 },
  { id: 3, type: "purchase", label: "World Tour Tee", amount: 185000, date: "Jul 20, 2026 · 11:40", sign: -1 },
  { id: 4, type: "topup", label: "Top Up via QRIS", amount: 1000000, date: "Jul 15, 2026 · 16:05", sign: 1 },
  { id: 5, type: "purchase", label: "Membership — Gold", amount: 299000, date: "Jul 10, 2026 · 08:22", sign: -1 },
  { id: 6, type: "topup", label: "Top Up via OVO", amount: 200000, date: "Jul 5, 2026 · 12:00", sign: 1 },
]

const TOP_UP_AMOUNTS = [50000, 100000, 200000, 500000, 1000000, 2000000]

const METHODS: { id: TopUpMethod; label: string; icon: string; detail: string }[] = [
  { id: "qris", label: "QRIS", icon: "📱", detail: "Scan QR — all e-wallets" },
  { id: "gopay", label: "GoPay", icon: "💚", detail: "Pay via Gojek / GoPay" },
  { id: "ovo", label: "OVO", icon: "💜", detail: "Pay via OVO app" },
  { id: "dana", label: "DANA", icon: "💙", detail: "Pay via DANA app" },
  { id: "bca-va", label: "BCA Virtual Account", icon: "🏦", detail: "Transfer via BCA Mobile / ATM" },
  { id: "mandiri-va", label: "Mandiri Virtual Account", icon: "🏧", detail: "Transfer via Mandiri Online" },
  { id: "visa", label: "Visa / Mastercard", icon: "💳", detail: "All credit / debit cards" },
]

function QRCode({ value }: { value: string }) {
  const size = 200; const cells = 21; const cell = size / cells
  const hash = value.split("").reduce((a, c) => a * 31 + c.charCodeAt(0), 7)
  const grid: boolean[][] = Array.from({ length: cells }, (_, r) =>
    Array.from({ length: cells }, (_, c) => {
      if ((r < 7 && c < 7) || (r < 7 && c >= cells - 7) || (r >= cells - 7 && c < 7)) return true
      return ((hash + r * cells + c) * 2654435769) % 4 < 2
    })
  )
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-2xl border-4 border-white shadow-lg">
      <rect width={size} height={size} fill="white" rx="8" />
      {grid.map((row, r) => row.map((on, c) => on ? <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#1E2D5A" /> : null))}
    </svg>
  )
}

export default function KatseraWallet() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<WalletTab>("home")
  const [balance, setBalance] = useState(1266000)
  const [topUpStep, setTopUpStep] = useState<TopUpStep>("amount")
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [selectedMethod, setSelectedMethod] = useState<TopUpMethod | null>(null)
  const [qrisTimer, setQrisTimer] = useState(300)
  const [history, setHistory] = useState(TX_HISTORY)
  const [showBalance, setShowBalance] = useState(true)

  // QRIS countdown
  useEffect(() => {
    if (topUpStep !== "qris") return
    if (qrisTimer <= 0) return
    const t = setInterval(() => setQrisTimer((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [topUpStep, qrisTimer])

  const effectiveAmount = selectedAmount || parseInt(customAmount) || 0
  const mm = String(Math.floor(qrisTimer / 60)).padStart(2, "0")
  const ss = String(qrisTimer % 60).padStart(2, "0")

  function handlePay() {
    setTopUpStep("processing")
    setTimeout(() => {
      setBalance((b) => b + effectiveAmount)
      setHistory((h) => [{
        id: Date.now(), type: "topup", label: `Top Up via ${METHODS.find((m) => m.id === selectedMethod)?.label || "Wallet"}`,
        amount: effectiveAmount, date: "Just now", sign: 1
      }, ...h])
      setTopUpStep("success")
    }, 2000)
  }

  const tabs: { key: WalletTab; label: string; icon: string }[] = [
    { key: "home", label: "Wallet", icon: "💳" },
    { key: "topup", label: "Top Up", icon: "➕" },
    { key: "history", label: "History", icon: "📋" },
  ]

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="bg-white px-5 pt-12 pb-0 shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-[#F4F5F9] flex items-center justify-center active:scale-95 transition-transform">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </button>
          <p className="text-[#1E2D5A] font-extrabold text-lg flex-1">Katsera Wallet</p>
        </div>
        <div className="flex border-b border-[#F4F5F9]">
          {tabs.map(({ key, label, icon }) => (
            <button key={key} onClick={() => { setTab(key); if (key === "topup") setTopUpStep("amount") }} className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-bold border-b-2 transition-colors ${tab === key ? "text-[#3D5898] border-[#3D5898]" : "text-[#9BAACE] border-transparent"}`}>
              <span>{icon}</span>{label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-8">
        {/* HOME */}
        {tab === "home" && (
          <div className="px-4 pt-4 space-y-4">
            {/* Balance card */}
            <div className="bg-gradient-to-br from-[#3D5898] to-[#1E2D5A] rounded-3xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white/70 text-sm font-semibold">Wallet Balance</p>
                <button onClick={() => setShowBalance(!showBalance)} className="text-white/60 active:scale-95">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                    {showBalance ? <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></> : <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>}
                  </svg>
                </button>
              </div>
              <p className="font-extrabold text-3xl mb-1">{showBalance ? fmt(balance) : "Rp ••••••"}</p>
              <p className="text-white/60 text-xs">Updated just now</p>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setTab("topup")} className="flex-1 py-2.5 rounded-full bg-white text-[#3D5898] font-extrabold text-xs active:scale-95 transition-transform">Top Up</button>
                <button onClick={() => navigate("/payment", { state: { amount: 0, label: "Send Money", returnPath: "/wallet" } })} className="flex-1 py-2.5 rounded-full border border-white/30 text-white font-extrabold text-xs active:scale-95 transition-transform">Send</button>
              </div>
            </div>

            {/* Quick top-up */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-[#1E2D5A] font-bold text-sm mb-3">Quick Top Up</p>
              <div className="grid grid-cols-3 gap-2">
                {[50000, 100000, 200000].map((a) => (
                  <button key={a} onClick={() => { setSelectedAmount(a); setTab("topup"); setTopUpStep("method") }} className="py-2.5 rounded-xl border-2 border-[#E0E5F2] text-[#3D5898] font-bold text-xs hover:border-[#3D5898] active:scale-95 transition-all">
                    +{fmt(a)}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent transactions */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[#1E2D5A] font-bold text-sm">Recent Transactions</p>
                <button onClick={() => setTab("history")} className="text-[#3D5898] text-xs font-bold">See all</button>
              </div>
              {history.slice(0, 4).map((tx) => (
                <div key={tx.id} className="flex items-center gap-3 py-2.5 border-b border-[#F4F5F9] last:border-0">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-none ${tx.sign > 0 ? "bg-green-50" : "bg-red-50"}`}>
                    <span className="text-base">{tx.type === "topup" ? "💳" : "🛍️"}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#1E2D5A] font-bold text-xs truncate">{tx.label}</p>
                    <p className="text-[#9BAACE] text-[10px]">{tx.date}</p>
                  </div>
                  <p className={`font-extrabold text-sm flex-none ${tx.sign > 0 ? "text-green-600" : "text-[#1E2D5A]"}`}>
                    {tx.sign > 0 ? "+" : "-"}{fmt(tx.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TOP UP */}
        {tab === "topup" && (
          <div className="px-4 pt-4">
            {topUpStep === "amount" && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <p className="text-[#7A8BB5] text-sm mb-1">Current Balance</p>
                  <p className="text-[#1E2D5A] font-extrabold text-2xl mb-4">{fmt(balance)}</p>
                  <p className="text-[#1E2D5A] font-bold text-sm mb-3">Select Amount</p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {TOP_UP_AMOUNTS.map((a) => (
                      <button key={a} onClick={() => setSelectedAmount(a)} className={`py-3 rounded-xl border-2 font-bold text-xs transition-all active:scale-95 ${selectedAmount === a ? "border-[#3D5898] bg-[#3D5898]/8 text-[#3D5898]" : "border-[#E0E5F2] text-[#7A8BB5]"}`}>
                        {fmt(a)}
                      </button>
                    ))}
                  </div>
                  <div className="border-2 border-[#E0E5F2] rounded-xl px-4 py-3 focus-within:border-[#3D5898] transition-colors">
                    <p className="text-[#9BAACE] text-[10px] font-semibold mb-0.5">Or enter custom amount</p>
                    <div className="flex items-center gap-1">
                      <span className="text-[#7A8BB5] font-bold text-sm">Rp</span>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null) }}
                        placeholder="Enter amount"
                        className="flex-1 bg-transparent text-[#1E2D5A] font-extrabold text-base outline-none"
                      />
                    </div>
                  </div>
                </div>
                <button disabled={!effectiveAmount || effectiveAmount < 10000} onClick={() => setTopUpStep("method")} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm disabled:opacity-40 active:scale-95 transition-all">
                  Continue — {effectiveAmount ? fmt(effectiveAmount) : "Select amount"}
                </button>
              </div>
            )}

            {topUpStep === "method" && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <p className="text-[#1E2D5A] font-bold text-sm mb-3">Choose Payment Method</p>
                  {METHODS.map((m) => (
                    <button key={m.id} onClick={() => setSelectedMethod(m.id)} className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 mb-2 last:mb-0 transition-all active:scale-[0.98] ${selectedMethod === m.id ? "border-[#3D5898] bg-[#3D5898]/5" : "border-[#F4F5F9]"}`}>
                      <span className="text-xl flex-none">{m.icon}</span>
                      <div className="flex-1 text-left">
                        <p className="text-[#1E2D5A] font-bold text-sm">{m.label}</p>
                        <p className="text-[#9BAACE] text-xs">{m.detail}</p>
                      </div>
                      {selectedMethod === m.id && <svg width="16" height="16" fill="#3D5898" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#3D5898" strokeWidth="2.5" strokeLinecap="round" fill="none"/></svg>}
                    </button>
                  ))}
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm flex justify-between">
                  <span className="text-[#7A8BB5] text-sm">Top up amount</span>
                  <span className="text-[#1E2D5A] font-extrabold">{fmt(effectiveAmount)}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setTopUpStep("amount")} className="flex-1 py-4 rounded-full border-2 border-[#C8D0E8] text-[#7A8BB5] font-bold text-sm active:scale-95">Back</button>
                  <button disabled={!selectedMethod} onClick={() => selectedMethod === "qris" ? setTopUpStep("qris") : handlePay()} className="flex-1 py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm disabled:opacity-40 active:scale-95">Pay Now</button>
                </div>
              </div>
            )}

            {topUpStep === "qris" && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-[#3D5898] bg-[#3D5898]/8 px-3 py-1 rounded-full">QRIS Payment</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${qrisTimer > 60 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>{mm}:{ss}</span>
                  </div>
                  <QRCode value={`KATSERA-WALLET-${Date.now()}`} />
                  <p className="text-[#1E2D5A] font-extrabold text-xl">{fmt(effectiveAmount)}</p>
                  <p className="text-[#7A8BB5] text-xs text-center">Scan with GoPay · OVO · DANA · ShopeePay · or any QRIS-compatible app</p>
                  <div className="w-full border-t border-[#F4F5F9] pt-3 space-y-1.5">
                    <div className="flex justify-between text-xs"><span className="text-[#9BAACE]">Merchant</span><span className="font-bold text-[#1E2D5A]">Katsera Platform</span></div>
                    <div className="flex justify-between text-xs"><span className="text-[#9BAACE]">Category</span><span className="font-bold text-[#1E2D5A]">Wallet Top Up</span></div>
                  </div>
                </div>
                <button onClick={handlePay} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm active:scale-95">I've Completed Payment</button>
                <button onClick={() => setTopUpStep("method")} className="w-full py-3 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-bold text-sm active:scale-95">Back</button>
              </div>
            )}

            {topUpStep === "processing" && (
              <div className="flex flex-col items-center py-32 gap-5">
                <div className="relative w-24 h-24">
                  <svg width="96" height="96" viewBox="0 0 96 96" className="animate-spin">
                    <circle cx="48" cy="48" r="40" fill="none" stroke="#E0E5F2" strokeWidth="8"/>
                    <circle cx="48" cy="48" r="40" fill="none" stroke="#3D5898" strokeWidth="8" strokeDasharray="80 170" strokeLinecap="round"/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">💳</div>
                </div>
                <p className="text-[#1E2D5A] font-extrabold text-xl">Processing payment...</p>
                <p className="text-[#7A8BB5] text-sm">Please do not close this screen</p>
              </div>
            )}

            {topUpStep === "success" && (
              <div className="flex flex-col items-center py-20 gap-5 px-4">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                  <svg width="44" height="44" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <p className="text-[#1E2D5A] font-extrabold text-2xl">Top Up Successful!</p>
                <div className="w-full bg-white rounded-2xl p-4 shadow-sm space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-[#7A8BB5]">Amount</span><span className="font-bold text-green-600">+{fmt(effectiveAmount)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-[#7A8BB5]">New Balance</span><span className="font-extrabold text-[#1E2D5A]">{fmt(balance)}</span></div>
                </div>
                <button onClick={() => { setTopUpStep("amount"); setTab("home"); setSelectedAmount(null); setCustomAmount("") }} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm active:scale-95">Back to Wallet</button>
              </div>
            )}
          </div>
        )}

        {/* HISTORY */}
        {tab === "history" && (
          <div className="px-4 pt-4 space-y-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[#7A8BB5] text-xs">Current Balance</p>
                <p className="text-[#1E2D5A] font-extrabold text-xl">{fmt(balance)}</p>
              </div>
              <div className="text-right">
                <p className="text-[#9BAACE] text-xs">{history.length} transactions</p>
              </div>
            </div>
            {history.map((tx) => (
              <div key={tx.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-none ${tx.sign > 0 ? "bg-green-50" : "bg-red-50"}`}>
                  <span className="text-lg">{tx.type === "topup" ? "💳" : "🛍️"}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1E2D5A] font-bold text-sm truncate">{tx.label}</p>
                  <p className="text-[#9BAACE] text-xs">{tx.date}</p>
                </div>
                <p className={`font-extrabold text-sm flex-none ${tx.sign > 0 ? "text-green-600" : "text-red-500"}`}>
                  {tx.sign > 0 ? "+" : "-"}{fmt(tx.amount)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
