import { useState } from "react"
import { useNavigate } from "react-router-dom"

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "",
    color: "#7A8BB5",
    bg: "#F4F5F9",
    badge: "",
    benefits: [
      "Follow up to 5 artists",
      "Access to public posts",
      "Basic channel access",
      "Standard quality streams",
    ],
  },
  {
    id: "bronze",
    name: "Bronze Fan",
    price: 29000,
    period: "/month",
    color: "#CD7F32",
    bg: "#FDF6EE",
    badge: "Popular",
    benefits: [
      "Follow unlimited artists",
      "Exclusive fan posts",
      "Priority channel access",
      "HD quality streams",
      "Monthly bonus coins (50)",
      "Fan badge on profile",
    ],
  },
  {
    id: "silver",
    name: "Silver Fan",
    price: 59000,
    period: "/month",
    color: "#A8A9AD",
    bg: "#F8F9FA",
    badge: "Best Value",
    benefits: [
      "Everything in Bronze",
      "Early access to events",
      "Direct message artists",
      "4K quality streams",
      "Monthly bonus coins (150)",
      "Silver badge + frame",
      "Exclusive digital content",
    ],
  },
  {
    id: "gold",
    name: "Gold Fan",
    price: 99000,
    period: "/month",
    color: "#D4A017",
    bg: "#FFFBEE",
    badge: "Premium",
    benefits: [
      "Everything in Silver",
      "VIP event priority queue",
      "Artist meet & greet access",
      "Unlimited downloads",
      "Monthly bonus coins (400)",
      "Gold badge + animated frame",
      "Merch discounts (15%)",
      "Exclusive behind-the-scenes",
    ],
  },
]

const currentPlan = plans[1] // Bronze Fan (active)
const expiryDate = "Aug 31, 2026"
const daysLeft = 34

export default function MembershipDetail() {
  const navigate = useNavigate()
  const [upgrading, setUpgrading] = useState(false)
  const [selected, setSelected] = useState(currentPlan.id)
  const [upgradeTarget, setUpgradeTarget] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const selectedPlan = plans.find((p) => p.id === selected)!

  function handleUpgrade() {
    if (selected === currentPlan.id) return
    setUpgradeTarget(selected)
  }

  function confirmUpgrade() {
    setUpgradeTarget(null)
    setUpgrading(true)
    setTimeout(() => {
      setUpgrading(false)
      setSuccess(true)
    }, 2000)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito] items-center justify-center px-8 text-center gap-6">
        <div className="w-24 h-24 rounded-full bg-[#3D5898] flex items-center justify-center shadow-xl">
          <svg width="44" height="44" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div>
          <p className="text-[#1E2D5A] font-extrabold text-2xl mb-2">Upgrade Successful!</p>
          <p className="text-[#7A8BB5] text-sm">You're now a <span className="font-bold text-[#1E2D5A]">{selectedPlan.name}</span>. Enjoy your new benefits!</p>
        </div>
        <button onClick={() => navigate("/fan/membership/content", { state: { creatorCategory: "music" } })} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-transform">
          Browse Exclusive Content
        </button>
        <button onClick={() => navigate("/fan/more")} className="w-full py-3.5 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-bold text-sm active:scale-95 transition-transform mt-2">
          Back to More
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-transform">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span className="text-[#1E2D5A] font-extrabold text-lg flex-1">My Membership</span>
      </div>

      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto pb-32">
        {/* Current plan card */}
        <div className="rounded-2xl overflow-hidden shadow-sm" style={{ background: `linear-gradient(135deg, ${currentPlan.color}22, ${currentPlan.color}44)`, border: `2px solid ${currentPlan.color}50` }}>
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-semibold" style={{ color: currentPlan.color }}>CURRENT PLAN</p>
                <p className="text-[#1E2D5A] font-extrabold text-xl">{currentPlan.name}</p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: currentPlan.color }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M2 7l4.5 4.5 5.5-6 5.5 6L22 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 7v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7" stroke="white" strokeWidth="2"/></svg>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full bg-white/40 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${((30 - daysLeft) / 30) * 100}%`, background: currentPlan.color }} />
              </div>
              <p className="text-xs font-bold text-[#1E2D5A]">{daysLeft}d left</p>
            </div>
            <p className="text-xs text-[#7A8BB5] mt-1.5">Expires: {expiryDate} · Auto-renews monthly</p>
          </div>
        </div>

        {/* Benefits of current plan */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-[#1E2D5A] text-sm mb-3">Your Benefits</p>
          <div className="space-y-2">
            {currentPlan.benefits.map((b) => (
              <div key={b} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-none" style={{ background: currentPlan.color + "20" }}>
                  <svg width="10" height="10" fill="none" stroke={currentPlan.color} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <p className="text-sm text-[#1E2D5A] font-semibold">{b}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade plans */}
        <div>
          <p className="font-bold text-[#1E2D5A] text-sm mb-3 px-0.5">Available Plans</p>
          <div className="space-y-3">
            {plans.map((plan) => {
              const isCurrent = plan.id === currentPlan.id
              const isSelected = plan.id === selected
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelected(plan.id)}
                  className={`w-full rounded-2xl p-4 text-left transition-all active:scale-[0.98] ${isSelected ? "ring-2" : "ring-0"}`}
                  style={{
                    background: plan.bg,
                    border: isSelected ? `2px solid ${plan.color}` : "2px solid transparent",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <p className="font-extrabold text-[#1E2D5A] text-sm">{plan.name}</p>
                      {isCurrent && <span className="text-[10px] font-bold text-white bg-[#3D5898] px-2 py-0.5 rounded-full">Active</span>}
                      {plan.badge && !isCurrent && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: plan.color, background: plan.color + "20" }}>{plan.badge}</span>}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {plan.price === 0 ? (
                        <p className="font-extrabold text-[#7A8BB5] text-base">Free</p>
                      ) : (
                        <p className="font-extrabold text-[#1E2D5A] text-base">Rp{plan.price.toLocaleString("id-ID")}<span className="text-xs font-semibold text-[#7A8BB5]">{plan.period}</span></p>
                      )}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "" : "border-[#C8D0E8]"}`} style={{ borderColor: isSelected ? plan.color : undefined, background: isSelected ? plan.color : undefined }}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {plan.benefits.slice(0, 3).map((b) => (
                      <span key={b} className="text-[10px] font-semibold text-[#7A8BB5] bg-white/60 px-2 py-0.5 rounded-full">{b}</span>
                    ))}
                    {plan.benefits.length > 3 && <span className="text-[10px] font-semibold text-[#7A8BB5] bg-white/60 px-2 py-0.5 rounded-full">+{plan.benefits.length - 3} more</span>}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] px-4 py-4 space-y-2">
        {selected !== currentPlan.id ? (
          <button
            onClick={handleUpgrade}
            disabled={upgrading}
            className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {upgrading ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Processing...</>
            ) : (
              `Upgrade to ${selectedPlan.name}`
            )}
          </button>
        ) : (
          <button
            onClick={() => navigate("/fan/membership")}
            className="w-full py-4 rounded-full border-2 border-[#3D5898] text-[#3D5898] font-extrabold text-base active:scale-95 transition-transform"
          >
            Manage Subscription
          </button>
        )}
        <p className="text-center text-xs text-[#9BAACE]">Cancel anytime · Billed monthly · Secure payment</p>
      </div>

      {/* Upgrade confirm sheet */}
      {upgradeTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-5 space-y-4">
            <div className="w-10 h-1 rounded-full bg-[#E0E5F2] mx-auto" />
            <p className="font-extrabold text-[#1E2D5A] text-base">Confirm Upgrade</p>
            <p className="text-[#7A8BB5] text-sm">You're upgrading to <span className="font-bold text-[#1E2D5A]">{plans.find((p) => p.id === upgradeTarget)?.name}</span> for <span className="font-bold text-[#3D5898]">Rp{plans.find((p) => p.id === upgradeTarget)?.price.toLocaleString("id-ID")}/month</span>. Your card will be charged immediately.</p>
            <button onClick={confirmUpgrade} className="w-full py-3.5 rounded-full bg-[#3D5898] text-white font-extrabold text-sm active:scale-95 transition-transform">Confirm Upgrade</button>
            <button onClick={() => setUpgradeTarget(null)} className="w-full py-3.5 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-extrabold text-sm">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
