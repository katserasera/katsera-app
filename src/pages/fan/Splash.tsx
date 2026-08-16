import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import katseraLogo from "@/imports/katsera_logo.png"

export default function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate("/launch"), 1800)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E8E8E8] font-[Nunito] px-4">
      <div className="flex flex-col items-center gap-4 animate-bounce">
        <img
          src={katseraLogo}
          alt="Katsera Logo"
          className="w-36 h-36 sm:w-44 sm:h-44 object-contain drop-shadow-xl"
        />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#3D5898] tracking-wider">
          Katsera
        </h1>
        <p className="text-sm sm:text-base font-semibold text-[#7A8BB5] tracking-wide">
          All the vibes, all the updates
        </p>
      </div>
    </div>
  )
}

