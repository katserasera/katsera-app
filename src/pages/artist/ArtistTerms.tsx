import { useState } from "react"
import { useNavigate } from "react-router-dom"

const terms = [
  "Users must provide accurate and complete information during the registration process. Any false information may result in account suspension or termination.",
  "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
  "Tickets purchased through this platform are valid only for the specified event, date, and time. Tickets are non-transferable unless stated otherwise.",
  "All payments must be completed through the available payment methods. Transactions are considered final once confirmed.",
  "Refunds and cancellations are subject to the event organizer's policy. The platform is not responsible for decisions made by third parties.",
  "Users are prohibited from engaging in fraudulent activities, reselling tickets without permission, or misusing the platform in any way.",
  "All content, logos, and materials on this platform are owned by the company and may not be used without permission.",
]

export default function ArtistTerms() {
  const navigate = useNavigate()
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto px-6 pt-12 pb-10">
      <h1 className="text-[#1E2D5A] text-4xl font-extrabold mb-2">
        Terms & Conditions
      </h1>
      <p className="text-[#7A8BB5] text-sm font-medium mb-6 leading-relaxed">
        Please read and agree to the Terms of Service and Privacy Policy below.
      </p>

      {/* Terms list */}
      <div className="flex-1 overflow-y-auto mb-6 space-y-3 pr-1" style={{ maxHeight: "calc(100vh - 340px)" }}>
        {terms.map((term, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-[#3D5898] font-bold text-sm flex-shrink-0 mt-0.5">{i + 1}.</span>
            <p className="text-[#4A5A80] text-sm leading-relaxed">{term}</p>
          </div>
        ))}
      </div>

      {/* Agree checkbox */}
      <label className="flex items-center gap-3 cursor-pointer mb-6">
        <div
          onClick={() => setAgreed(!agreed)}
          className={`w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
            agreed ? "bg-[#3D5898] border-[#3D5898]" : "bg-white border-[#9BAACE]"
          }`}
          style={{ borderRadius: "4px" }}
        >
          {agreed && (
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <span className="text-sm text-[#4A5A80]">
          I have read and agree to{" "}
          <span className="text-[#3D5898] font-bold">Terms & Condition</span>
        </span>
      </label>

      <button
        onClick={() => agreed && navigate("/artist/approval")}
        disabled={!agreed}
        className={`w-full py-4 rounded-full font-bold text-lg transition-all active:scale-95 shadow-md ${
          agreed
            ? "bg-[#3D5898] text-white hover:bg-[#2D4270]"
            : "bg-[#3D5898]/40 text-white/60 cursor-not-allowed"
        }`}
      >
        Agree & Continue
      </button>
    </div>
  )
}
