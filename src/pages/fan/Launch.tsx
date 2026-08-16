import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Launch() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate("/role"), 1800)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E8E8E8] font-[Nunito] px-4">
      <div className="flex flex-col items-center gap-3">
        <img
          src="/katsera_logo.png"
          alt="Katsera Logo"
          className="w-32 h-32 sm:w-40 sm:h-40 object-contain drop-shadow-lg"
        />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3D5898]">
          Katsera
        </h1>
      </div>
    </div>
  )
}


