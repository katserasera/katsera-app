import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import KLogo from "../../components/KLogo"

export default function Launch() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate("/role"), 1800)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E8E8E8]">
      <KLogo size={100} color="#3D5898" showText />
    </div>
  )
}
