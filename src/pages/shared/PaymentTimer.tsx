import { useState, useEffect, useCallback } from "react"
import { useNavigate, useLocation } from "react-router-dom"

function fmt(n: number) { return "Rp" + n.toLocaleString("id-ID") }

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
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-2xl">
      <rect width={size} height={size} fill="white" rx="12" />
      {grid.map((row, r) => row.map((on, c) => on ? <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#1E2D5A" /> : null))}
    </svg>
  )
}

type PaymentState = "waiting" | "success" | "expired" | "failed"

const TIMER_SECONDS = 15 * 60 // 15 minutes

export default function PaymentTimer() {
  const navigate = useNavigate()
  const location = useLocation()
  const { amount = 750000, label = "Concert Ticket — VIP", method = "qris", returnPath = "/fan/events", orderId = "KAT-20260728-" + Math.floor(Math.random() * 9000 + 1000) } =
    (location.state as { amount?: number; label?: string; method?: string; returnPath?: string; orderId?: string }) || {}

  const isQRIS = method === "qris"
  const [secondsLeft, setSecondsLeft] = useState(TIMER_SECONDS)
  const [state, setState] = useState<PaymentState>("waiting")
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    if (state !== "waiting") return
    if (secondsLeft <= 0) { setState("expired"); return }
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [state, secondsLeft])

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0")
  const ss = String(secondsLeft % 60).padStart(2, "0")
  const pct = ((TIMER_SECONDS - secondsLeft) / TIMER_SECONDS) * 100

  const timerColor = secondsLeft > 300 ? "#3D5898" : secondsLeft > 60 ? "#F59E0B" : "#EF4444"

  const checkPayment = useCallback(() => {
    setChecking(true)
    setTimeout(() => { setChecking(false); setState("success") }, 2000)
  }, [])

  if (state === "success") return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] px-8 gap-5">
      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
        <svg width="44" height="44" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <p className="font-extrabold text-[#1E2D5A] text-2xl text-center">Payment Successful!</p>
      <p className="text-[#7A8BB5] text-sm text-center leading-relaxed">Your payment of <span className="font-bold text-[#1E2D5A]">{fmt(amount)}</span> has been received.</p>
      <div className="w-full bg-white rounded-2xl p-4 shadow-sm space-y-2">
        <div className="flex justify-between text-sm"><span className="text-[#7A8BB5]">Order ID</span><span className="font-bold text-[#1E2D5A]">{orderId}</span></div>
        <div className="flex justify-between text-sm"><span className="text-[#7A8BB5]">Amount</span><span className="font-bold text-[#3D5898]">{fmt(amount)}</span></div>
        <div className="flex justify-between text-sm"><span className="text-[#7A8BB5]">Status</span><span className="font-bold text-green-600">Paid</span></div>
      </div>
      <button onClick={() => navigate(returnPath)} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm active:scale-95 transition-transform">View My Tickets</button>
      <button onClick={() => navigate("/fan/home")} className="w-full py-3.5 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-bold text-sm active:scale-95 transition-transform">Back to Home</button>
    </div>
  )

  if (state === "expired") return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] px-8 gap-5">
      <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
        <svg width="44" height="44" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2"/><path d="M12 7v6M12 17v.01" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round"/></svg>
      </div>
      <p className="font-extrabold text-[#1E2D5A] text-2xl text-center">Payment Expired</p>
      <p className="text-[#7A8BB5] text-sm text-center leading-relaxed">Your payment window has expired. Please start a new transaction.</p>
      <button onClick={() => { setSecondsLeft(TIMER_SECONDS); setState("waiting") }} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm active:scale-95 transition-transform">Try Again</button>
      <button onClick={() => navigate(-1)} className="w-full py-3.5 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-bold text-sm active:scale-95 transition-transform">Choose Another Method</button>
    </div>
  )

  if (state === "failed") return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] px-8 gap-5">
      <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
        <svg width="44" height="44" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2"/><path d="M15 9l-6 6M9 9l6 6" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round"/></svg>
      </div>
      <p className="font-extrabold text-[#1E2D5A] text-2xl text-center">Payment Failed</p>
      <p className="text-[#7A8BB5] text-sm text-center">Something went wrong. Please try again or use a different payment method.</p>
      <button onClick={() => navigate(-1)} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm active:scale-95 transition-transform">Try Another Method</button>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="bg-white px-5 pt-12 pb-4 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-[#F4F5F9] flex items-center justify-center active:scale-95 transition-transform">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round"/></svg>
        </button>
        <div className="flex-1">
          <p className="text-[#1E2D5A] font-extrabold text-lg">Complete Payment</p>
          <p className="text-[#9BAACE] text-xs">{label}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 pb-8">
        {/* Timer */}
        <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
          <p className="text-[#7A8BB5] text-xs font-semibold mb-3">Time Remaining</p>
          <div className="relative w-28 h-28 mx-auto mb-3">
            <svg width="112" height="112" viewBox="0 0 112 112" className="rotate-[-90deg]">
              <circle cx="56" cy="56" r="50" fill="none" stroke="#E8E8E8" strokeWidth="8" />
              <circle cx="56" cy="56" r="50" fill="none" stroke={timerColor} strokeWidth="8" strokeDasharray={`${314 * (1 - pct / 100)} 314`} strokeLinecap="round" style={{ transition: "stroke-dasharray 1s linear, stroke 0.5s" }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="font-extrabold text-2xl leading-none" style={{ color: timerColor }}>{mm}:{ss}</p>
              <p className="text-[#9BAACE] text-[10px]">remaining</p>
            </div>
          </div>
          <p className="text-[#7A8BB5] text-xs">Complete payment before timer expires</p>
        </div>

        {/* Amount */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-[#7A8BB5] text-xs mb-1">Total Amount</p>
          <p className="text-[#1E2D5A] font-extrabold text-2xl">{fmt(amount)}</p>
          <p className="text-[#9BAACE] text-xs mt-0.5">{label}</p>
        </div>

        {/* QRIS */}
        {isQRIS ? (
          <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-extrabold text-[#3D5898] bg-[#3D5898]/8 px-2 py-0.5 rounded-full">QRIS</span>
              <span className="text-xs text-[#7A8BB5]">Berlaku untuk semua e-wallet</span>
            </div>
            <div className="p-3 bg-white border-2 border-[#E0E5F2] rounded-2xl">
              <QRCode value={orderId} />
            </div>
            <p className="text-[#1E2D5A] font-bold text-sm text-center">Scan dengan e-wallet apapun</p>
            <p className="text-[#7A8BB5] text-xs text-center">GoPay · OVO · DANA · ShopeePay · LinkAja</p>
            <div className="w-full border-t border-[#F4F5F9] pt-3 flex justify-between text-xs">
              <span className="text-[#7A8BB5]">Merchant</span>
              <span className="font-bold text-[#1E2D5A]">Katsera Platform</span>
            </div>
            <div className="w-full flex justify-between text-xs">
              <span className="text-[#7A8BB5]">Ref No.</span>
              <span className="font-bold text-[#1E2D5A]">{orderId}</span>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
            <p className="font-bold text-[#1E2D5A] text-sm">Virtual Account Number</p>
            <div className="bg-[#F4F5F9] rounded-xl p-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#7A8BB5] mb-0.5">BCA Virtual Account</p>
                <p className="font-extrabold text-[#1E2D5A] text-lg tracking-widest">8277 0001 2345 6789</p>
              </div>
              <button onClick={() => navigator.clipboard?.writeText("82770001234567899")} className="text-[#3D5898] text-xs font-bold bg-[#3D5898]/8 px-3 py-1.5 rounded-full active:scale-95">Copy</button>
            </div>
            <p className="text-xs text-[#7A8BB5]">Transfer exact amount to avoid processing delays</p>
          </div>
        )}

        {/* Status checker */}
        <button onClick={checkPayment} disabled={checking} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-70">
          {checking ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Checking Payment...</> : "I've Completed Payment"}
        </button>

        <button onClick={() => navigate(-1)} className="w-full py-3.5 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-bold text-sm active:scale-95 transition-transform">Change Payment Method</button>
      </div>
    </div>
  )
}
