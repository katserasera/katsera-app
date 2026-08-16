import { useState } from "react"
import { useNavigate } from "react-router-dom"

function UploadZone({ label, fileName, onSet }: { label: string; fileName: string | null; onSet: () => void }) {
  return (
    <button
      onClick={onSet}
      className="w-full bg-white border-2 border-[#3D5898] rounded-2xl py-8 flex flex-col items-center gap-3 hover:bg-[#F4F5F9] active:scale-95 transition-all"
    >
      {fileName ? (
        <>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3D5898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="text-[#3D5898] font-bold text-sm">{fileName}</span>
        </>
      ) : (
        <>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3D5898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 16 12 12 8 16" />
            <line x1="12" y1="12" x2="12" y2="21" />
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
          </svg>
          <span className="text-[#3D5898] font-bold text-sm">{label}</span>
        </>
      )}
    </button>
  )
}

export default function ArtistIdentity() {
  const navigate = useNavigate()
  const [idFile, setIdFile] = useState<string | null>(null)
  const [npwpFile, setNpwpFile] = useState<string | null>(null)
  const [faceScanned, setFaceScanned] = useState(false)

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto px-6 pt-12 pb-8">
      <h1 className="text-[#1E2D5A] text-4xl font-extrabold mb-8">
        Verify Your Identity
      </h1>

      {/* Step 1 */}
      <p className="text-[#3D5898] text-sm font-extrabold mb-2">Step 1: Upload ID</p>
      <UploadZone
        label="Drag KTP or Passport"
        fileName={idFile}
        onSet={() => setIdFile("KTP_document.pdf")}
      />

      {/* Step 2 */}
      <p className="text-[#3D5898] text-sm font-extrabold mt-6 mb-2">Step 2: Upload NPWP</p>
      <UploadZone
        label="Drag NPWP"
        fileName={npwpFile}
        onSet={() => setNpwpFile("NPWP_document.pdf")}
      />

      {/* Step 3 — Face Scan */}
      <p className="text-[#3D5898] text-sm font-extrabold mt-6 mb-2">Step 3: Face Scan</p>
      <button
        onClick={() => navigate("/auth/face-verify", { state: { returnTo: "/artist/create-profile" } })}
        className={`w-full bg-white border-2 rounded-2xl py-6 flex flex-col items-center justify-center transition-all active:scale-95 ${
          faceScanned ? "border-[#3D5898]" : "border-[#3D5898]"
        }`}
        style={{ minHeight: 180 }}
      >
        {faceScanned ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-[#3D5898]/10 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3D5898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-[#3D5898] font-bold text-sm">Face Detected</span>
          </div>
        ) : (
          <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>
            {/* Corner brackets */}
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
                  width: 28,
                  height: 28,
                  borderColor: "#3D5898",
                  borderTopWidth: i < 2 ? 3 : 0,
                  borderBottomWidth: i >= 2 ? 3 : 0,
                  borderLeftWidth: i % 2 === 0 ? 3 : 0,
                  borderRightWidth: i % 2 === 1 ? 3 : 0,
                  borderStyle: "solid",
                }}
              />
            ))}
            {/* Person silhouette */}
            <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#3D5898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
        )}
      </button>

      {/* Hint */}
      <div className="flex items-center gap-2 mt-3 justify-center">
        <p className="text-[#1E2D5A] text-sm font-bold">Place your face in the frame</p>
      </div>
      <div className="flex items-center gap-1.5 justify-center mt-1">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E05A3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p className="text-[#9BAACE] text-xs">Make sure you are in well-fit area</p>
      </div>

      <button
        onClick={() => navigate("/artist/create-profile")}
        className="w-full py-4 rounded-full bg-[#3D5898] text-white font-bold text-lg hover:bg-[#2D4270] active:scale-95 transition-all shadow-md mt-auto"
      >
        Continue
      </button>
    </div>
  )
}
