import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

function fmt(n: number) { return "Rp" + n.toLocaleString("id-ID") }

const METHOD_GROUPS = [
  {
    group: "Virtual Account",
    methods: [
      { id: "bca-va", label: "BCA Virtual Account", icon: "🏦", detail: "Transfer via BCA Mobile / ATM" },
      { id: "mandiri-va", label: "Mandiri Virtual Account", icon: "🏧", detail: "Transfer via Mandiri Online / ATM" },
      { id: "bni-va", label: "BNI Virtual Account", icon: "🏛", detail: "Transfer via BNI Mobile / ATM" },
    ],
  },
  {
    group: "E-Wallet",
    methods: [
      { id: "gopay", label: "GoPay", icon: "💚", detail: "Bayar via Gojek / GoPay app" },
      { id: "ovo", label: "OVO", icon: "💜", detail: "Bayar via OVO app" },
      { id: "dana", label: "DANA", icon: "💙", detail: "Bayar via DANA app" },
    ],
  },
  {
    group: "Credit / Debit Card",
    methods: [
      { id: "visa", label: "Visa / Mastercard", icon: "💳", detail: "Semua kartu kredit/debit" },
    ],
  },
  {
    group: "QR Payment",
    methods: [
      { id: "qris", label: "QRIS", icon: "📱", detail: "Scan QR dari semua e-wallet" },
    ],
  },
]

export default function PaymentGateway() {
  const navigate = useNavigate()
  const location = useLocation()
  const { amount, label, returnPath } = (location.state as { amount: number; label: string; returnPath: string }) || {
    amount: 299000, label: "Membership Prime", returnPath: "/fan/membership/activate",
  }

  const [selected, setSelected] = useState<string | null>(null)
  const [paying, setPaying] = useState(false)

  const handlePay = () => {
    if (!selected) return
    // QRIS → go to payment timer page
    if (selected === "qris") {
      navigate("/payment/timer", { state: { amount, label, method: "qris", returnPath } })
      return
    }
    // VA → go to payment timer with VA details
    if (selected.includes("-va")) {
      navigate("/payment/timer", { state: { amount, label, method: selected, returnPath } })
      return
    }
    setPaying(true)
    setTimeout(() => navigate("/payment/status", { state: { success: true, amount, label, returnPath } }), 1800)
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col w-full max-w-md sm:max-w-xl md:max-w-3xl mx-auto sm:my-4 sm:rounded-3xl sm:shadow-xl overflow-hidden font-[Nunito] relative transition-all">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span className="text-[#1E2D5A] font-extrabold text-lg">Pilih Pembayaran</span>
      </div>

      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto pb-36">
        {/* Order summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-xs text-[#7A8BB5] font-semibold">Pembayaran untuk</p>
            <p className="font-extrabold text-[#1E2D5A] text-sm">{label}</p>
          </div>
          <p className="font-extrabold text-[#3D5898] text-xl">{fmt(amount)}</p>
        </div>

        {/* Method groups */}
        {METHOD_GROUPS.map((group) => (
          <div key={group.group}>
            <p className="text-xs font-bold text-[#7A8BB5] uppercase tracking-wide mb-2">{group.group}</p>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {group.methods.map((method, i) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all ${selected === method.id ? "bg-[#F0F3FA]" : "hover:bg-[#F4F5F9]"} ${i < group.methods.length - 1 ? "border-b border-[#F4F5F9]" : ""}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={selected === method.id}
                    onChange={() => setSelected(method.id)}
                    className="accent-[#3D5898] w-4 h-4"
                  />
                  <span className="text-xl">{method.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-[#1E2D5A] text-sm">{method.label}</p>
                    <p className="text-[#7A8BB5] text-xs">{method.detail}</p>
                  </div>
                  {selected === method.id && (
                    <div className="w-5 h-5 rounded-full bg-[#3D5898] flex items-center justify-center flex-none">
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.8" strokeLinecap="round"/></svg>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Security badges */}
        <div className="flex items-center justify-center gap-4 py-2">
          {["🔒 SSL Secured", "✅ 3D Secure", "🛡 Fraud Protected"].map((badge) => (
            <span key={badge} className="text-[10px] text-[#7A8BB5] font-semibold">{badge}</span>
          ))}
        </div>
      </div>

      {/* Pay button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] px-5 py-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-[#7A8BB5]">Total Bayar</span>
          <span className="font-extrabold text-[#3D5898] text-lg">{fmt(amount)}</span>
        </div>
        <button
          onClick={handlePay}
          disabled={!selected || paying}
          className={`w-full py-4 rounded-full font-extrabold text-base transition-all active:scale-95 ${selected && !paying ? "bg-[#3D5898] text-white" : "bg-[#C8D0E8] text-[#7A8BB5] cursor-not-allowed"}`}
        >
          {paying ? "Memproses…" : selected ? `Bayar ${fmt(amount)}` : "Pilih metode pembayaran"}
        </button>
      </div>
    </div>
  )
}
