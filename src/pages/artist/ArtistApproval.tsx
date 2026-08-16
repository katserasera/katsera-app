import { useNavigate, useLocation } from "react-router-dom"

function ApprovalIllustration() {
  return (
    <div className="flex items-center justify-center my-6">
      <div className="relative" style={{ width: 260, height: 240 }}>
        {/* Blue blob background */}
        <div
          className="absolute inset-0"
          style={{
            background: "#3D5898",
            borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
            transform: "scale(0.95)",
          }}
        />
        {/* Clipboard SVG */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="180" height="200" viewBox="0 0 180 200" fill="none">
            {/* Clipboard body */}
            <rect x="30" y="30" width="100" height="130" rx="8" fill="white" stroke="#4A6BB5" strokeWidth="2" />
            {/* Clipboard clip */}
            <rect x="65" y="22" width="30" height="20" rx="4" fill="#4A6BB5" />
            {/* Checkbox rows */}
            {[55, 80, 105, 130].map((y, i) => (
              <g key={i}>
                <rect x="44" y={y} width="16" height="16" rx="3" fill={i < 3 ? "#3D5898" : "none"} stroke="#3D5898" strokeWidth="2" />
                {i < 3 && (
                  <polyline points={`47,${y + 8} 52,${y + 13} 57,${y + 5}`} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                )}
                <rect x="68" y={y + 4} width="48" height="3" rx="1.5" fill="#D0D8EC" />
                <rect x="68" y={y + 10} width="32" height="3" rx="1.5" fill="#E8EDF7" />
              </g>
            ))}
            {/* Person */}
            <circle cx="148" cy="70" r="12" fill="#2D4270" />
            <path d="M130 140 C130 115 166 115 166 140" fill="#2D4270" />
            {/* Pencil */}
            <rect x="92" y="52" width="10" height="60" rx="3" fill="#6B82BB" transform="rotate(-30 92 52)" />
            <polygon points="87,108 97,108 92,120" fill="#4A6BB5" transform="rotate(-30 92 108)" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function ArtistApproval() {
  const navigate = useNavigate()
  const location = useLocation()
  const isPainter = (location.state as { creatorType?: string })?.creatorType === "painter"

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto px-6 pt-12 pb-10">
      <h1 className="text-[#1E2D5A] text-4xl font-extrabold mb-2">
        Approval Process
      </h1>

      <ApprovalIllustration />

      <div className="text-center mb-10">
        <p className="text-[#1E2D5A] font-extrabold text-lg mb-3">
          Waiting for Account Approval
        </p>
        <p className="text-[#7A8BB5] text-sm leading-relaxed mb-4">
          Your account approval will be processed within a maximum of 1 day via email.
        </p>
        <p className="text-[#7A8BB5] text-sm leading-relaxed">
          We will contact you shortly to verify your information.
        </p>
      </div>

      <button
        onClick={() => navigate(isPainter ? "/painter/dashboard" : "/artist/dashboard")}
        className="w-full py-4 rounded-full bg-[#3D5898] text-white font-bold text-lg hover:bg-[#2D4270] active:scale-95 transition-all shadow-md mt-auto"
      >
        Agree
      </button>
    </div>
  )
}
