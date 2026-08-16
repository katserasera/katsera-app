import { useState, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"

type CreatorType = "music" | "painter"
type Step = "upload" | "info" | "submitting" | "pending" | "approved" | "revision" | "rejected"

interface FileState {
  name: string
  size: string
  preview?: string
}

function FileUploadBox({ label, accept, file, onFile, required = true }: {
  label: string; accept: string; file: FileState | null; onFile: (f: FileState) => void; required?: boolean
}) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div>
      <p className="text-[#1E2D5A] font-bold text-xs mb-1.5">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</p>
      <button
        onClick={() => ref.current?.click()}
        className={`w-full border-2 border-dashed rounded-2xl p-4 flex flex-col items-center gap-2 transition-all active:scale-[0.98] ${file ? "border-green-400 bg-green-50" : "border-[#C8D0E8] bg-white hover:border-[#3D5898]"}`}
      >
        {file ? (
          <>
            <svg width="24" height="24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
            <p className="text-green-600 font-bold text-xs">{file.name}</p>
            <p className="text-green-500 text-[10px]">{file.size}</p>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-[#F4F5F9] flex items-center justify-center">
              <svg width="18" height="18" fill="none" stroke="#7A8BB5" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
            </div>
            <p className="text-[#7A8BB5] text-xs font-semibold">Tap to upload</p>
            <p className="text-[#9BAACE] text-[10px]">{accept.replace(/\./g, "").toUpperCase()}</p>
          </>
        )}
      </button>
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={(e) => {
        const f = e.target.files?.[0]
        if (f) onFile({ name: f.name, size: `${(f.size / 1024).toFixed(0)} KB`, preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined })
      }} />
    </div>
  )
}

export default function ContentVerification() {
  const navigate = useNavigate()
  const location = useLocation()
  const { creatorType = "music" } = (location.state as { creatorType?: CreatorType }) || {}
  const isPainter = creatorType === "painter"

  const [step, setStep] = useState<Step>("upload")
  const [files, setFiles] = useState<Record<string, FileState | null>>({})
  const [form, setForm] = useState({ title: "", description: "", year: "", medium: "", dimensions: "", isrc: "", album: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function setFile(key: string) { return (f: FileState) => setFiles((prev) => ({ ...prev, [key]: f })) }

  function validate(): boolean {
    const e: Record<string, string> = {}
    if (!form.title) e.title = "Required"
    if (isPainter) {
      if (!files.artwork) e.artwork = "Upload required"
      if (!files.copyright) e.copyright = "Upload required"
    } else {
      if (!files.audio) e.audio = "Upload required"
      if (!files.copyright) e.copyright = "Upload required"
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit() {
    if (!validate()) return
    setStep("submitting")
    setTimeout(() => setStep("pending"), 2500)
  }

  if (step === "submitting") return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] gap-5 px-8">
      <div className="relative w-24 h-24">
        <svg width="96" height="96" viewBox="0 0 96 96" className="animate-spin">
          <circle cx="48" cy="48" r="40" fill="none" stroke="#E0E5F2" strokeWidth="8"/>
          <circle cx="48" cy="48" r="40" fill="none" stroke="#3D5898" strokeWidth="8" strokeDasharray="80 170" strokeLinecap="round"/>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">{isPainter ? "🎨" : "🎵"}</span>
        </div>
      </div>
      <p className="text-[#1E2D5A] font-extrabold text-xl">Submitting...</p>
      <p className="text-[#7A8BB5] text-sm text-center">Your content is being uploaded and queued for review by the Katsera team.</p>
    </div>
  )

  if (step === "pending") return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] gap-5 px-8">
      <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center">
        <svg width="44" height="44" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="2"/><path d="M12 7v6M12 17v.01" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"/></svg>
      </div>
      <p className="text-[#1E2D5A] font-extrabold text-2xl text-center">Submission Received!</p>
      <p className="text-[#7A8BB5] text-sm text-center leading-relaxed">Your content is now in the <span className="font-bold text-amber-600">Verification Queue</span>. The Katsera Review Team will process it within 2–3 business days.</p>
      <div className="w-full bg-white rounded-2xl p-4 shadow-sm space-y-3">
        <p className="text-[#1E2D5A] font-bold text-sm">What happens next?</p>
        {[["🔍 Review", "Our team reviews your ownership documents"], ["✅ Approved", "Content is published to your profile"], ["📝 Revision", "We may request additional documents"], ["❌ Rejected", "Content doesn't meet guidelines"]].map(([title, desc]) => (
          <div key={title as string} className="flex items-start gap-3">
            <p className="text-sm font-bold text-[#1E2D5A] w-20 flex-none">{title as string}</p>
            <p className="text-[#7A8BB5] text-xs">{desc as string}</p>
          </div>
        ))}
      </div>
      <div className="w-full space-y-2">
        {/* Demo simulate outcomes */}
        <p className="text-[#9BAACE] text-xs text-center">Simulate review outcome:</p>
        <div className="flex gap-2">
          <button onClick={() => setStep("approved")} className="flex-1 py-2 rounded-full bg-green-500 text-white text-xs font-bold active:scale-95">Approved</button>
          <button onClick={() => setStep("revision")} className="flex-1 py-2 rounded-full bg-blue-500 text-white text-xs font-bold active:scale-95">Revision</button>
          <button onClick={() => setStep("rejected")} className="flex-1 py-2 rounded-full bg-red-500 text-white text-xs font-bold active:scale-95">Rejected</button>
        </div>
        <button onClick={() => navigate(-1)} className="w-full py-3 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-bold text-sm active:scale-95">Back to Dashboard</button>
      </div>
    </div>
  )

  if (step === "approved") return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] gap-5 px-8">
      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
        <svg width="44" height="44" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <p className="text-[#1E2D5A] font-extrabold text-2xl text-center">Content Approved!</p>
      <p className="text-[#7A8BB5] text-sm text-center">Your content has been verified and is now live on your profile.</p>
      <div className="w-full bg-green-50 border border-green-200 rounded-2xl p-4">
        <p className="text-green-700 font-bold text-sm">{form.title || "Your content"}</p>
        <p className="text-green-600 text-xs mt-1">Published · Verified ✓</p>
      </div>
      <button onClick={() => navigate(isPainter ? "/painter/dashboard" : "/artist/dashboard")} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm active:scale-95">View on Dashboard</button>
    </div>
  )

  if (step === "revision") return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] gap-5 px-8">
      <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
        <svg width="44" height="44" fill="none" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/></svg>
      </div>
      <p className="text-[#1E2D5A] font-extrabold text-2xl text-center">Revision Required</p>
      <div className="w-full bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-[#1E2D5A] font-bold text-sm mb-2">Reviewer notes:</p>
        <p className="text-[#7A8BB5] text-sm leading-relaxed">"The copyright certificate provided is incomplete. Please re-upload a full copy including the registration number and date. Additionally, please provide a clearer scan of the HKI document."</p>
      </div>
      <button onClick={() => setStep("upload")} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm active:scale-95">Resubmit Documents</button>
      <button onClick={() => navigate(-1)} className="w-full py-3 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-bold text-sm active:scale-95">Back</button>
    </div>
  )

  if (step === "rejected") return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] gap-5 px-8">
      <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
        <svg width="44" height="44" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2"/><path d="M15 9l-6 6M9 9l6 6" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round"/></svg>
      </div>
      <p className="text-[#1E2D5A] font-extrabold text-2xl text-center">Content Rejected</p>
      <div className="w-full bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-[#1E2D5A] font-bold text-sm mb-2">Reason for rejection:</p>
        <p className="text-[#7A8BB5] text-sm leading-relaxed">"The submitted content appears to infringe on existing copyright. Please ensure you are the original owner or have proper licensing before resubmitting."</p>
      </div>
      <button onClick={() => navigate("/artist/help/contact")} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm active:scale-95">Appeal Decision</button>
      <button onClick={() => navigate(-1)} className="w-full py-3 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-bold text-sm active:scale-95">Back to Dashboard</button>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="bg-white px-5 pt-12 pb-4 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-[#F4F5F9] flex items-center justify-center active:scale-95 transition-transform">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </button>
          <div>
            <p className="text-[#1E2D5A] font-extrabold text-lg">{isPainter ? "Artwork Verification" : "Music Verification"}</p>
            <p className="text-[#9BAACE] text-xs">Submit content for Katsera review</p>
          </div>
        </div>
        <div className="bg-amber-50 rounded-xl p-3 flex items-start gap-2">
          <span className="text-amber-500 text-base">⚠️</span>
          <p className="text-amber-700 text-xs">All content must be verified before publishing. Upload your ownership documents below.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 pb-32">
        {isPainter ? (
          <>
            <FileUploadBox label="Artwork Image" accept="image/*" file={files.artwork || null} onFile={setFile("artwork")} />
            {errors.artwork && <p className="text-red-500 text-xs -mt-3">{errors.artwork}</p>}
            <FileUploadBox label="Copyright Certificate" accept=".pdf,.jpg,.png" file={files.copyright || null} onFile={setFile("copyright")} />
            {errors.copyright && <p className="text-red-500 text-xs -mt-3">{errors.copyright}</p>}
            <FileUploadBox label="HKI Certificate" accept=".pdf,.jpg,.png" file={files.hki || null} onFile={setFile("hki")} />
          </>
        ) : (
          <>
            <FileUploadBox label="Audio File (MP3 / WAV / FLAC)" accept=".mp3,.wav,.flac" file={files.audio || null} onFile={setFile("audio")} />
            {errors.audio && <p className="text-red-500 text-xs -mt-3">{errors.audio}</p>}
            <FileUploadBox label="Copyright Certificate" accept=".pdf,.jpg,.png" file={files.copyright || null} onFile={setFile("copyright")} />
            {errors.copyright && <p className="text-red-500 text-xs -mt-3">{errors.copyright}</p>}
            <FileUploadBox label="Ownership Proof" accept=".pdf,.jpg,.png" file={files.ownership || null} onFile={setFile("ownership")} required={false} />
          </>
        )}

        {/* Info fields */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <p className="text-[#1E2D5A] font-bold text-sm">{isPainter ? "Artwork Information" : "Song Information"}</p>
          {[
            { key: "title", label: isPainter ? "Artwork Title" : "Song Title", placeholder: isPainter ? "e.g. Midnight Bloom" : "e.g. Senja Ini" },
            { key: "description", label: "Description", placeholder: "Brief description..." },
            isPainter ? { key: "medium", label: "Medium", placeholder: "e.g. Acrylic on Canvas" } : { key: "album", label: "Album / EP", placeholder: "e.g. Rumpang" },
            isPainter ? { key: "dimensions", label: "Dimensions", placeholder: "e.g. 80×100 cm" } : { key: "isrc", label: "ISRC (optional)", placeholder: "e.g. IDK-25-00001" },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <p className="text-[#1E2D5A] text-xs font-semibold mb-1">{label}{key === "title" && <span className="text-red-500 ml-0.5">*</span>}</p>
              <div className={`bg-[#F4F5F9] rounded-xl px-3 py-2.5 border-2 transition-colors ${errors[key] ? "border-red-400" : "border-transparent focus-within:border-[#3D5898]"}`}>
                <input value={form[key as keyof typeof form]} onChange={(e) => { setForm((p) => ({ ...p, [key]: e.target.value })); if (errors[key]) setErrors((p) => { const n = { ...p }; delete n[key]; return n }) }} placeholder={placeholder} className="w-full bg-transparent text-[#1E2D5A] text-sm outline-none placeholder:text-[#C8D0E8]" />
              </div>
              {errors[key] && <p className="text-red-500 text-xs mt-0.5">{errors[key]}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-5 pb-6 pt-3 bg-[#E8E8E8]">
        <button onClick={handleSubmit} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm active:scale-95 transition-transform flex items-center justify-center gap-2">
          Submit for Verification
        </button>
      </div>
    </div>
  )
}
