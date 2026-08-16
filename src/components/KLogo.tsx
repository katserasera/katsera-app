interface KLogoProps {
  size?: number
  color?: string
  showText?: boolean
}

export default function KLogo({ size = 64, showText = false }: KLogoProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src="/katsera_logo.png"
        alt="Katsera"
        style={{ width: size, height: size, objectFit: "contain" }}
        onError={(e) => {
          // Fallback if image fails
          const target = e.currentTarget
          target.style.display = "none"
        }}
      />
      {showText && (
        <span style={{ color: "#3D5898", fontSize: size * 0.38, fontWeight: 700, letterSpacing: "0.01em" }}>
          Katsera
        </span>
      )}
    </div>
  )
}

