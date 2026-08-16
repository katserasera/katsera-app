import { useState } from "react"
import { useNavigate } from "react-router-dom"

function fmt(n: number) { return "Rp" + n.toLocaleString("id-ID") }

const artist = {
  name: "Nadin Amizah",
  sub: "Nadin's Space",
  badge: "OFFICIAL MEMBERSHIP",
}

const packages = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "Monthly",
    features: [
      "Standard access",
      "Live interaction & chat",
      "Exclusive live performance (H-1)",
      "Supporter ports",
      "Artist Channel Access (Community Interaction)",
    ],
    color: "#F4F5F9",
    textColor: "#1E2D5A",
    highlight: false,
  },
  {
    id: "prime",
    name: "Prime",
    price: 35000,
    period: "Monthly",
    features: [
      "Standard access",
      "Live interaction & chat",
      "Live performance",
      "Replay live performance",
      "Supporter ports",
      "Artist Channel Access (Community Interaction)",
      "Signed album presale",
      "Virtual fanSign",
    ],
    color: "#3D5898",
    textColor: "#FFFFFF",
    highlight: true,
  },
  {
    id: "aura",
    name: "Aura",
    price: 45000,
    period: "Monthly",
    features: [
      "Standard access",
      "Live interaction & chat",
      "Live performance",
      "Replay live performance",
      "Supporter ports",
      "Artist Channel Access (Community Interaction)",
      "Presale concert tickets",
      "Signed album presale",
      "Virtual fanSign",
      "Behind the scenes access",
      "Priority live comments",
      "Custom member badges",
    ],
    color: "#1E2D5A",
    textColor: "#FFFFFF",
    highlight: false,
  },
]

export default function MembershipPackages() {
  const navigate = useNavigate()
  const [billing, setBilling] = useState<"annually" | "monthly">("monthly")
  const [selected, setSelected] = useState("prime")

  const selectedPkg = packages.find((p) => p.id === selected)!
  const annualDiscount = 0.8
  const displayPrice = billing === "annually" && selectedPkg.price > 0 ? Math.round(selectedPkg.price * annualDiscount) : selectedPkg.price

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span className="text-[#1E2D5A] font-extrabold text-lg">Membership</span>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Artist hero */}
        <div className="relative h-48 bg-gradient-to-br from-[#3D5898] to-[#1E2D5A] flex flex-col items-center justify-center gap-2 mx-4 mt-4 rounded-2xl overflow-hidden">
          <div className="text-5xl">🎤</div>
          <p className="text-white font-extrabold text-lg">{artist.name}</p>
          <p className="text-white/70 text-xs">{artist.sub}</p>
          <span className="absolute bottom-3 right-3 text-[9px] bg-[#3D5898] border border-white/30 text-white rounded-full px-2 py-0.5 font-bold">
            {artist.badge}
          </span>
        </div>

        <div className="px-4 py-4">
          <p className="text-sm text-[#7A8BB5] leading-relaxed mb-5 text-center">
            Unlock the full creative world. Join the membership for exclusive access to all your favorite artists in one place.
          </p>

          {/* Billing toggle */}
          <div className="mb-5">
            <p className="text-xs font-bold text-[#1E2D5A] uppercase tracking-wide mb-3">SELECT PACKAGE</p>
            <div className="flex bg-[#F4F5F9] rounded-full p-1 mb-4">
              {[["annually", "Annually"], ["monthly", "Monthly"]].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setBilling(key as "annually" | "monthly")}
                  className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${billing === key ? "bg-[#3D5898] text-white shadow" : "text-[#7A8BB5]"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Package cards */}
          <div className="space-y-3">
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelected(pkg.id)}
                className={`w-full text-left rounded-2xl p-4 border-2 transition-all active:scale-[0.98] ${selected === pkg.id ? "border-[#3D5898] shadow-lg" : "border-transparent shadow-sm"}`}
                style={{ background: pkg.color }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-extrabold text-lg" style={{ color: pkg.textColor }}>{pkg.name}</p>
                    <p className="text-sm font-bold" style={{ color: pkg.textColor, opacity: 0.7 }}>
                      {pkg.price === 0 ? "Gratis" : `${fmt(billing === "annually" && pkg.price > 0 ? Math.round(pkg.price * annualDiscount) : pkg.price)}/bulan`}
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected === pkg.id ? "bg-[#3D5898] border-[#3D5898]" : "border-current opacity-40"}`} style={{ borderColor: pkg.textColor }}>
                    {selected === pkg.id && <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                </div>
                <ul className="space-y-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs" style={{ color: pkg.textColor, opacity: 0.85 }}>
                      <svg className="mt-0.5 flex-none" width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs text-[#7A8BB5]">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#7A8BB5" strokeWidth="2"/></svg>
            SECURE PAYMENT
          </div>
          <div className="text-right">
            <p className="text-xs text-[#7A8BB5]">Total bayar</p>
            <p className="font-extrabold text-[#3D5898] text-lg">{selectedPkg.price === 0 ? "Gratis" : fmt(displayPrice * 12 * (billing === "annually" ? 1 : 1))}</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/fan/membership/payment", { state: { pkg: selectedPkg, billing, price: displayPrice } })}
          className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-all"
        >
          {selectedPkg.price === 0 ? "Aktifkan Gratis" : "Join Membership"}
        </button>
      </div>
    </div>
  )
}
