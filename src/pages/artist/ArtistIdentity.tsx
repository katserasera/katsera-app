import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

interface UploadZoneProps {
  label: string
  fileName: string | null
  fileSize?: string
  accept?: string
  onFileSelect: (fileName: string, fileSize: string) => void
}

function UploadZone({ label, fileName, fileSize, accept = ".pdf,.jpg,.jpeg,.png", onFileSelect }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const sizeStr = `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      onFileSelect(file.name, sizeStr)
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`w-full border-2 rounded-2xl py-6 px-4 flex flex-col items-center gap-2.5 transition-all active:scale-[0.98] ${
          fileName
            ? "bg-[#EBF3FF] border-[#3D5898] shadow-sm"
            : "bg-white border-[#3D5898] hover:bg-[#F4F5F9]"
        }`}
      >
        {fileName ? (
          <>
            <div className="w-12 h-12 rounded-full bg-[#3D5898] flex items-center justify-center text-white shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-[#1E2D5A] font-extrabold text-sm truncate max-w-full">{fileName}</span>
            <span className="text-[#7A8BB5] text-xs font-semibold">{fileSize || "File siap diunggah"} • Klik untuk ganti</span>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-[#F0F4FC] flex items-center justify-center text-[#3D5898]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 16 12 12 8 16" />
                <line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
            </div>
            <span className="text-[#3D5898] font-bold text-sm">{label}</span>
            <span className="text-[#9BAACE] text-[11px]">PDF, PNG, JPG (Maks. 10MB)</span>
          </>
        )}
      </button>
    </div>
  )
}

export default function ArtistIdentity() {
  const navigate = useNavigate()
  const [idFile, setIdFile] = useState<string | null>(null)
  const [idSize, setIdSize] = useState<string>("")
  const [npwpFile, setNpwpFile] = useState<string | null>(null)
  const [npwpSize, setNpwpSize] = useState<string>("")
  const [faceScanned, setFaceScanned] = useState(false)
  const [error, setError] = useState("")

  const handleContinue = () => {
    if (!idFile && !npwpFile && !faceScanned) {
      setError("Silakan unggah setidaknya KTP / NPWP atau lakukan Face Scan untuk melanjutkan.")
      return
    }

    const artistDocs = {
      ktp: idFile || "KTP_Terverifikasi.pdf",
      npwp: npwpFile || "NPWP_Terverifikasi.pdf",
      faceVerified: true,
      uploadedAt: new Date().toISOString()
    }
    localStorage.setItem("katsera_artist_docs", JSON.stringify(artistDocs))
    
    // Save to user session
    const existing = JSON.parse(localStorage.getItem("katsera_user") || "{}")
    localStorage.setItem("katsera_user", JSON.stringify({ ...existing, hasUploadedDocs: true, isApproved: false }))

    navigate("/artist/create-profile")
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto px-6 pt-10 pb-8 font-[Nunito]">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-[#3D5898] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
          Langkah 2 dari 4
        </span>
      </div>

      <h1 className="text-[#1E2D5A] text-3xl font-extrabold mb-1">
        Verifikasi Identitas
      </h1>
      <p className="text-[#7A8BB5] text-xs font-semibold mb-6">
        Unggah KTP, NPWP & Verifikasi Wajah untuk persetujuan akun artis resmi Katsera.
      </p>

      {/* Step 1 */}
      <div className="mb-4">
        <p className="text-[#3D5898] text-xs font-extrabold uppercase tracking-wide mb-1.5 flex items-center justify-between">
          <span>1. Upload KTP / Paspor</span>
          {idFile && <span className="text-emerald-600 font-bold">✓ Terpilih</span>}
        </p>
        <UploadZone
          label="Pilih atau Drag File KTP / Paspor"
          fileName={idFile}
          fileSize={idSize}
          onFileSelect={(name, size) => { setIdFile(name); setIdSize(size); setError("") }}
        />
      </div>

      {/* Step 2 */}
      <div className="mb-4">
        <p className="text-[#3D5898] text-xs font-extrabold uppercase tracking-wide mb-1.5 flex items-center justify-between">
          <span>2. Upload NPWP</span>
          {npwpFile && <span className="text-emerald-600 font-bold">✓ Terpilih</span>}
        </p>
        <UploadZone
          label="Pilih atau Drag File NPWP"
          fileName={npwpFile}
          fileSize={npwpSize}
          onFileSelect={(name, size) => { setNpwpFile(name); setNpwpSize(size); setError("") }}
        />
      </div>

      {/* Step 3 — Face Scan */}
      <div className="mb-6">
        <p className="text-[#3D5898] text-xs font-extrabold uppercase tracking-wide mb-1.5 flex items-center justify-between">
          <span>3. Face Scan (Verifikasi Wajah)</span>
          {faceScanned && <span className="text-emerald-600 font-bold">✓ Terverifikasi</span>}
        </p>
        <button
          type="button"
          onClick={() => setFaceScanned(!faceScanned)}
          className={`w-full rounded-2xl py-5 px-4 flex flex-col items-center justify-center transition-all active:scale-[0.98] border-2 ${
            faceScanned ? "bg-[#EBF3FF] border-[#3D5898]" : "bg-white border-[#3D5898] hover:bg-[#F4F5F9]"
          }`}
        >
          {faceScanned ? (
            <div className="flex flex-col items-center gap-2 py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-[#1E2D5A] font-extrabold text-sm">Wajah Berhasil Terdeteksi & Terverifikasi</span>
              <span className="text-[#7A8BB5] text-xs font-semibold">Klik untuk scan ulang</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-1">
              <div className="relative flex items-center justify-center w-24 h-24 my-1">
                {[
                  { top: 0, left: 0, rotate: 0 },
                  { top: 0, right: 0, rotate: 90 },
                  { bottom: 0, left: 0, rotate: 270 },
                  { bottom: 0, right: 0, rotate: 180 },
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      ...pos,
                      width: 20,
                      height: 20,
                      borderColor: "#3D5898",
                      borderTopWidth: i < 2 ? 3 : 0,
                      borderBottomWidth: i >= 2 ? 3 : 0,
                      borderLeftWidth: i % 2 === 0 ? 3 : 0,
                      borderRightWidth: i % 2 === 1 ? 3 : 0,
                    }}
                  />
                ))}
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3D5898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
              <span className="text-[#1E2D5A] font-extrabold text-sm">Klik untuk Ambil Scan Wajah</span>
              <span className="text-[#9BAACE] text-[11px]">Posisikan wajah Anda di dalam bingkai kamera</span>
            </div>
          )}
        </button>
      </div>

      {error && <p className="text-red-500 text-xs font-bold text-center mb-3">{error}</p>}

      <button
        type="button"
        onClick={handleContinue}
        className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base hover:bg-[#2D4270] active:scale-95 transition-all shadow-md mt-auto"
      >
        Lanjutkan Profil Artis →
      </button>
    </div>
  )
}
