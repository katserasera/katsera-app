import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ArtistCommunity() {
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState("")
  const [licenseFile, setLicenseFile] = useState<string | null>(null)

  const inputCls =
    "w-full px-5 py-3.5 rounded-full border-2 border-[#3D5898] bg-white text-[#1E2D5A] placeholder:text-[#9BAACE] focus:outline-none focus:border-[#2D4270] text-base font-medium transition-colors"

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto px-6 pt-12 pb-10">
      <h1 className="text-[#1E2D5A] text-4xl font-extrabold mb-10">
        Seniman Komunitas
      </h1>

      {/* Company Name */}
      <p className="text-[#1E2D5A] text-sm font-extrabold mb-2">Nama Perusahaan</p>
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        className={inputCls + " mb-8"}
      />

      {/* Business License */}
      <p className="text-[#1E2D5A] text-sm font-extrabold mb-2">Surat Izin Usaha</p>
      <button
        onClick={() => setLicenseFile("Surat_Izin_Usaha.pdf")}
        className={`w-full border-2 rounded-2xl py-10 flex flex-col items-center gap-4 mb-10 transition-all active:scale-95 ${
          licenseFile
            ? "bg-[#3D5898]/10 border-[#3D5898]"
            : "bg-white border-[#3D5898] hover:bg-[#F4F5F9]"
        }`}
      >
        {licenseFile ? (
          <>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3D5898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-[#3D5898] font-bold text-sm">{licenseFile}</span>
          </>
        ) : (
          <>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3D5898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 16 12 12 8 16" />
              <line x1="12" y1="12" x2="12" y2="21" />
              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
            </svg>
            <span className="text-[#3D5898] font-bold text-base">Drag Surat Izin Usaha</span>
          </>
        )}
      </button>

      <button
        onClick={() => navigate("/artist/terms")}
        className="w-full py-4 rounded-full bg-[#3D5898] text-white font-bold text-lg hover:bg-[#2D4270] active:scale-95 transition-all shadow-md"
      >
        Continue
      </button>
    </div>
  )
}
