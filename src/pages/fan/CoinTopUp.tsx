import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

type Step = "amount" | "method" | "processing" | "success" | "failed"

const coinPackages = [
  { coins: 20, price: 20000, bonus: 0, tag: "" },
  { coins: 50, price: 45000, bonus: 5, tag: "Popular" },
  { coins: 100, price: 85000, bonus: 15, tag: "Best Value" },
  { coins: 500, price: 400000, bonus: 100, tag: "Mega Pack" },
]

const paymentMethods = [
  {
    id: "va",
    label: "Virtual Account",
    subtitle: "BCA, Mandiri, BNI, BRI",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" stroke="#3D5898" strokeWidth="1.8"/><path d="M1 10h22" stroke="#3D5898" strokeWidth="1.8"/></svg>
    ),
  },
  {
    id: "ewallet",
    label: "E-Wallet",
    subtitle: "GoPay, OVO, DANA, ShopeePay",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M3 9h18v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9zM3 9V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3" stroke="#3D5898" strokeWidth="1.8"/><circle cx="16" cy="14" r="1.5" fill="#3D5898"/></svg>
    ),
  },
  {
    id: "cc",
    label: "Credit / Debit Card",
    subtitle: "Visa, Mastercard, AMEX",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" stroke="#3D5898" strokeWidth="1.8"/><path d="M1 10h22M5 15h4M13 15h2" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/></svg>
    ),
  },
  {
    id: "qr",
    label: "QR Payment",
    subtitle: "QRIS — All banks & e-wallets",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" stroke="#3D5898" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="#3D5898" strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="#3D5898" strokeWidth="1.8"/><path d="M14 14h2v2h-2zM18 14h3M14 18h1M17 18h4M14 21h1M18 21h3M20 16v2" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/></svg>
    ),
  },
]

function fmt(n: number) {
  return "Rp" + n.toLocaleString("id-ID")
}

// Simple QR code simulation
function QRDisplay({ value }: { value: string }) {
  const size = 160
  const cells = 17
  const cell = size / cells
  const hash = value.split("").reduce((a, c) => a * 31 + c.charCodeAt(0), 13)
  const grid = Array.from({ length: cells }, (_, r) =>
    Array.from({ length: cells }, (_, c) => {
      if ((r < 5 && c < 5) || (r < 5 && c >= cells - 5) || (r >= cells - 5 && c < 5)) return true
      return ((hash + r * cells + c) * 2654435769) % 4 < 2
    })
  )
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-xl shadow-md">
      <rect width={size} height={size} fill="white" rx="8" />
      {grid.map((row, r) =>
        row.map((on, c) =>
          on ? <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#1E2D5A" /> : null
        )
      )}
    </svg>
  )
}

export default function CoinTopUp() {
  const navigate = useNavigate()
  const location = useLocation()
  const initialBalance: number = (location.state as { balance?: number })?.balance ?? parseInt(localStorage.getItem("coinBalance") || "20")

  const [step, setStep] = useState<Step>("amount")
  const [selected, setSelected] = useState<number | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(15)
  const [qrTimer, setQrTimer] = useState<ReturnType<typeof setInterval> | null>(null)

  const pkg = coinPackages.find((p) => p.coins === selected)

  function startProcessing() {
    setStep("processing")
    const willSucceed = Math.random() > 0.15 // 85% success rate
    setTimeout(() => {
      if (willSucceed) {
        const newBalance = initialBalance + (pkg ? pkg.coins + pkg.bonus : 0)
        localStorage.setItem("coinBalance", String(newBalance))
        setStep("success")
      } else {
        setStep("failed")
      }
    }, 2200)
  }

  function startQRCountdown() {
    setStep("method")
    // QR countdown if QR is selected
    if (paymentMethod === "qr") {
      let t = 15
      const interval = setInterval(() => {
        t -= 1
        setCountdown(t)
        if (t <= 0) {
          clearInterval(interval)
          startProcessing()
        }
      }, 1000)
      setQrTimer(interval)
    }
  }

  function handlePay() {
    if (paymentMethod === "qr") {
      startQRCountdown()
    } else {
      startProcessing()
    }
  }

  const newBalance = initialBalance + (pkg ? pkg.coins + pkg.bonus : 0)

  // --- Success ---
  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#3D5898] to-[#1E2D5A] flex flex-col max-w-md mx-auto font-[Nunito] items-center justify-center px-8 text-center gap-6">
        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
          <svg width="48" height="48" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div>
          <p className="text-white font-extrabold text-2xl mb-2">Top Up Successful!</p>
          <p className="text-white/70 text-sm">You added <span className="text-white font-bold">{(pkg?.coins || 0) + (pkg?.bonus || 0)} coins</span> to your account</p>
        </div>
        {/* Balance display */}
        <div className="bg-white/15 rounded-2xl px-8 py-5 w-full">
          <p className="text-white/60 text-xs mb-1">New Coin Balance</p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-[#D4A017] flex items-center justify-center">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="#D4A017" strokeWidth="2"/><path d="M12 8v4M10 12h4" stroke="#D4A017" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <p className="text-white font-extrabold text-3xl">{newBalance}</p>
            <p className="text-white/60 text-sm">coins</p>
          </div>
          {pkg && pkg.bonus > 0 && (
            <p className="text-[#D4A017] text-xs font-bold mt-1">+{pkg.bonus} bonus coins included! 🎉</p>
          )}
        </div>
        <button onClick={() => navigate("/fan/more")} className="w-full py-4 rounded-full bg-white text-[#3D5898] font-extrabold text-base active:scale-95 transition-transform">
          Back to More
        </button>
      </div>
    )
  }

  // --- Failed ---
  if (step === "failed") {
    return (
      <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito] items-center justify-center px-8 text-center gap-6">
        <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
          <svg width="44" height="44" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
        <div>
          <p className="text-[#1E2D5A] font-extrabold text-2xl mb-2">Payment Failed</p>
          <p className="text-[#7A8BB5] text-sm">Something went wrong with your payment. Please try again or use a different payment method.</p>
        </div>
        <button onClick={() => { setStep("method") }} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-transform">
          Retry Payment
        </button>
        <button onClick={() => { setStep("amount"); setPaymentMethod(null) }} className="text-[#7A8BB5] text-sm font-semibold">
          Choose Different Amount
        </button>
      </div>
    )
  }

  // --- Processing ---
  if (step === "processing") {
    return (
      <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito] items-center justify-center px-8 text-center gap-6">
        <div className="w-20 h-20 rounded-full border-4 border-[#3D5898] border-t-transparent animate-spin" />
        <div>
          <p className="text-[#1E2D5A] font-extrabold text-xl mb-1">Processing Payment</p>
          <p className="text-[#7A8BB5] text-sm">Please wait while we verify your payment...</p>
        </div>
        <div className="bg-white rounded-2xl px-6 py-4 w-full shadow-sm">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-[#7A8BB5]">Amount</span>
            <span className="font-bold text-[#1E2D5A]">{fmt(pkg?.price || 0)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#7A8BB5]">Coins</span>
            <span className="font-bold text-[#3D5898]">{(pkg?.coins || 0) + (pkg?.bonus || 0)} coins</span>
          </div>
        </div>
        <p className="text-xs text-[#9BAACE]">Do not close this page</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm flex items-center gap-3">
        <button
          onClick={() => {
            if (step === "method") setStep("amount")
            else navigate(-1)
          }}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-transform"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span className="text-[#1E2D5A] font-extrabold text-lg flex-1">Top Up Coins</span>
        {/* Current balance */}
        <div className="flex items-center gap-1.5 bg-[#F4F5F9] rounded-full px-3 py-1.5">
          <div className="w-4 h-4 rounded-full border border-[#D4A017] flex items-center justify-center">
            <svg width="8" height="8" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="#D4A017" strokeWidth="2.5"/></svg>
          </div>
          <span className="font-extrabold text-[#1E2D5A] text-xs">{initialBalance}</span>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex gap-0 bg-white border-b border-[#F4F5F9]">
        {[["amount", "1. Select"], ["method", "2. Payment"]].map(([s, label], i) => (
          <div key={s} className={`flex-1 py-2.5 text-center text-xs font-bold border-b-2 transition-colors ${step === s ? "text-[#3D5898] border-[#3D5898]" : step === "method" && i === 0 ? "text-[#3D5898] border-[#3D5898]/30" : "text-[#9BAACE] border-transparent"}`}>
            {label}
          </div>
        ))}
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto pb-32">
        {/* ── Step 1: Select Amount ── */}
        {step === "amount" && (
          <>
            <p className="text-[#7A8BB5] text-xs font-semibold mb-4">Choose how many coins to add to your account</p>
            <div className="grid grid-cols-2 gap-3">
              {coinPackages.map((pkg) => (
                <button
                  key={pkg.coins}
                  onClick={() => setSelected(pkg.coins)}
                  className={`relative rounded-2xl p-4 text-left transition-all active:scale-95 ${selected === pkg.coins ? "bg-[#3D5898] shadow-lg" : "bg-white shadow-sm"}`}
                >
                  {pkg.tag && (
                    <span className={`absolute top-2.5 right-2.5 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${selected === pkg.coins ? "bg-white/20 text-white" : "bg-[#3D5898] text-white"}`}>
                      {pkg.tag}
                    </span>
                  )}
                  <div className={`flex items-center gap-1.5 mb-1 ${selected === pkg.coins ? "text-white" : "text-[#D4A017]"}`}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4M10 12h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    <span className="font-extrabold text-xl">{pkg.coins}</span>
                  </div>
                  {pkg.bonus > 0 && (
                    <p className={`text-[10px] font-bold mb-1.5 ${selected === pkg.coins ? "text-white/80" : "text-green-600"}`}>+{pkg.bonus} bonus coins!</p>
                  )}
                  <p className={`font-extrabold text-sm ${selected === pkg.coins ? "text-white" : "text-[#3D5898]"}`}>{fmt(pkg.price)}</p>
                </button>
              ))}
            </div>

            {/* Info */}
            <div className="mt-4 bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-xs text-[#7A8BB5] font-semibold mb-2">What are Katsera Coins?</p>
              <p className="text-xs text-[#9BAACE] leading-relaxed">Coins are used to send gifts during live streams, unlock exclusive content, and support your favorite artists. They never expire.</p>
            </div>
          </>
        )}

        {/* ── Step 2: Payment Method ── */}
        {step === "method" && pkg && (
          <>
            {/* Order summary */}
            <div className="bg-[#3D5898] rounded-2xl p-4 mb-4 flex items-center justify-between">
              <div>
                <p className="text-white/70 text-xs mb-0.5">You're buying</p>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="#D4A017" strokeWidth="2"/></svg>
                  <p className="text-white font-extrabold text-lg">{pkg.coins + pkg.bonus} coins</p>
                  {pkg.bonus > 0 && <span className="text-[#D4A017] text-xs font-bold bg-[#D4A017]/20 px-2 py-0.5 rounded-full">+{pkg.bonus} bonus</span>}
                </div>
              </div>
              <p className="text-white font-extrabold text-xl">{fmt(pkg.price)}</p>
            </div>

            <p className="text-[#7A8BB5] text-xs font-semibold mb-3">Choose payment method</p>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full rounded-2xl p-4 flex items-center gap-3 text-left transition-all active:scale-[0.98] ${paymentMethod === method.id ? "bg-white ring-2 ring-[#3D5898]" : "bg-white shadow-sm"}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-none ${paymentMethod === method.id ? "bg-[#3D5898]/10" : "bg-[#F4F5F9]"}`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-[#1E2D5A] font-bold text-sm">{method.label}</p>
                    <p className="text-[#7A8BB5] text-xs">{method.subtitle}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === method.id ? "border-[#3D5898] bg-[#3D5898]" : "border-[#C8D0E8]"}`}>
                    {paymentMethod === method.id && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>

            {/* QR preview if selected */}
            {paymentMethod === "qr" && (
              <div className="mt-4 bg-white rounded-2xl p-5 shadow-sm flex flex-col items-center gap-3">
                <p className="text-[#7A8BB5] text-xs font-semibold">Scan with any banking app</p>
                <QRDisplay value={`KATSERA-${pkg.coins}-${Date.now()}`} />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-xs text-[#7A8BB5] font-semibold">QR valid for 5 minutes</p>
                </div>
                <p className="text-[#3D5898] font-extrabold text-lg">{fmt(pkg.price)}</p>
              </div>
            )}

            <div className="mt-4 flex items-center gap-2 text-[#9BAACE]">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8"/></svg>
              <p className="text-xs font-semibold">256-bit encrypted · Secure payment</p>
            </div>
          </>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] px-4 py-4">
        {step === "amount" ? (
          <button
            onClick={() => setStep("method")}
            disabled={!selected}
            className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-all disabled:opacity-40"
          >
            {selected ? `Continue — ${fmt(pkg?.price || 0)}` : "Select a Package"}
          </button>
        ) : (
          <button
            onClick={handlePay}
            disabled={!paymentMethod}
            className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" stroke="white" strokeWidth="2"/><path d="M1 10h22" stroke="white" strokeWidth="2"/></svg>
            {paymentMethod === "qr" ? "I've Scanned the QR" : `Pay ${fmt(pkg?.price || 0)}`}
          </button>
        )}
      </div>
    </div>
  )
}
