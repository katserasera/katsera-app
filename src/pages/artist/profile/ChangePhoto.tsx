import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import katseraLogo from "@/imports/katsera_logo.png"

const KLogo = () => <img src={katseraLogo} alt="Katsera" style={{ width: 22, height: 26, objectFit: "contain" as const }} />

export default function ChangePhoto() {
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) handleFile(file)
  }

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => { setSaving(false); setDone(true); setTimeout(() => navigate(-1), 1200) }, 1000)
  }

  if (done) return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] gap-4">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <p className="font-extrabold text-[#1E2D5A] text-xl">Photo Updated!</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm flex-none">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <KLogo />
        <span className="flex-1 font-extrabold text-[#1E2D5A] text-lg">Change Photo</span>
      </div>

      <div className="flex-1 px-5 pb-32 space-y-5 overflow-y-auto">
        {/* Drop zone / preview */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`relative flex items-center justify-center rounded-3xl overflow-hidden transition-all ${dragOver ? "border-4 border-dashed border-[#3D5898] bg-blue-50" : "bg-white shadow-sm"}`}
          style={{ height: 300 }}
        >
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover transition-transform"
              style={{ transform: `scale(${zoom}) rotate(${rotate}deg)` }}
            />
          ) : (
            <div className="flex flex-col items-center gap-3 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#E0E5F2] flex items-center justify-center">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="#9BAACE" strokeWidth="1.8"/><circle cx="12" cy="13" r="4" stroke="#9BAACE" strokeWidth="1.8"/></svg>
              </div>
              <p className="font-extrabold text-[#1E2D5A] text-sm">Drag & Drop your photo</p>
              <p className="text-[#9BAACE] text-xs">or tap the button below to upload</p>
            </div>
          )}
        </div>

        {/* Controls (only when preview) */}
        {preview && (
          <div className="bg-white rounded-2xl p-4 space-y-4 shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[#1E2D5A] text-xs">Zoom</span>
                <span className="text-[#9BAACE] text-xs">{Math.round(zoom * 100)}%</span>
              </div>
              <input type="range" min="1" max="3" step="0.1" value={zoom} onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-[#3D5898]" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[#1E2D5A] text-xs">Rotate</span>
                <span className="text-[#9BAACE] text-xs">{rotate}°</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setRotate((r) => r - 90)} className="flex-1 py-2 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-bold text-xs">↺ −90°</button>
                <button onClick={() => setRotate(0)} className="flex-1 py-2 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-bold text-xs">Reset</button>
                <button onClick={() => setRotate((r) => r + 90)} className="flex-1 py-2 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-bold text-xs">↻ +90°</button>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-3">
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
          <button onClick={() => fileRef.current?.click()} className="w-full py-3.5 rounded-full border-2 border-[#3D5898] text-[#3D5898] font-extrabold text-sm">
            {preview ? "Replace Photo" : "Upload Photo"}
          </button>
          {preview && (
            <button onClick={() => { setPreview(null); setZoom(1); setRotate(0) }} className="w-full py-3.5 rounded-full border-2 border-red-200 text-red-500 font-extrabold text-sm">
              Remove Photo
            </button>
          )}
        </div>
      </div>

      {preview && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-5 pb-6 pt-3 bg-[#E8E8E8]">
          <button onClick={handleSave} disabled={saving} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm flex items-center justify-center gap-2 disabled:opacity-60">
            {saving ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Saving…</> : "Save Photo"}
          </button>
        </div>
      )}
    </div>
  )
}
