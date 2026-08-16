import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import KLogo from "../../components/KLogo"

export default function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate("/launch"), 1400)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E8E8E8]">
      <div className="animate-pulse">
        <KLogo size={80} color="#3D5898" />
      </div>
    </div>
  )
}
