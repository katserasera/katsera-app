import { useNavigate } from "react-router-dom"

function StarShape({ size = 40, color = "white", style }: { size?: number; color?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill={color} style={style}>
      <polygon points="20,2 24.9,15.1 38.6,15.1 27.9,24.4 31.8,37.5 20,29.4 8.2,37.5 12.1,24.4 1.4,15.1 15.1,15.1" />
    </svg>
  )
}

export default function RoleSelect() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#E8E8E8] relative overflow-hidden flex flex-col">
      {/* Diagonal blue panel — covers top-left area */}
      <div
        className="absolute inset-0"
        style={{
          background: "#3D5898",
          clipPath: "polygon(0 0, 100% 0, 100% 55%, 55% 85%, 0 85%)",
        }}
      />

      {/* Bottom blue arc */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "#3D5898",
          borderRadius: "60% 60% 0 0 / 100% 100% 0 0",
        }}
      />

      {/* Stars */}
      <div className="absolute top-16 right-8 z-10">
        <StarShape size={48} color="white" />
      </div>
      <div className="absolute top-52 right-20 z-10">
        <StarShape size={30} color="rgba(255,255,255,0.6)" />
      </div>
      <div className="absolute top-72 left-4 z-10">
        <StarShape size={56} color="#111" />
      </div>

      {/* Heading */}
      <div className="relative z-10 flex-1 flex flex-col justify-between px-8 pt-16 pb-10 max-w-md mx-auto w-full">
        <div>
          <h1 className="text-white text-5xl font-extrabold leading-tight mt-4 max-w-xs">
            Who are you signing up as?
          </h1>
        </div>

        {/* Buttons */}
        <div className="space-y-4 mb-6">
          <button
            onClick={() => navigate("/artist/creator-type")}
            className="w-full py-4 rounded-full text-white font-bold text-lg bg-[#1a1a1a] hover:bg-[#333] active:scale-95 transition-all shadow-lg"
          >
            Artist
          </button>
          <button
            onClick={() => navigate("/fan/welcome")}
            className="w-full py-4 rounded-full font-bold text-lg bg-[#E8E8E8] text-[#1a1a1a] hover:bg-white active:scale-95 transition-all border border-[#ccc] shadow-sm"
          >
            Fans
          </button>
          <div className="text-center pt-2">
            <p className="text-white/60 text-sm">
              Already have an account?{" "}
              <button onClick={() => navigate("/auth/login")} className="text-white font-bold underline active:opacity-60 transition-opacity">
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
