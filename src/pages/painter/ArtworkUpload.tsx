import { useState } from "react"
import { useNavigate } from "react-router-dom"

type Step = "select" | "info" | "ai-analysis" | "preview" | "publishing" | "published"

type AiCheck = { label: string; result: string; done: boolean }

const categories = ["Abstract", "Portrait", "Landscape", "Still Life", "Illustration", "Digital Art", "Street Art", "Sculpture", "Photography", "Mixed Media"]
const availabilityOptions = ["Available for Sale", "Commission Only", "Not for Sale", "On Display"]
const currencies = ["IDR", "USD", "SGD", "MYR"]

const aiTagSuggestions: Record<string, string[]> = {
  Abstract: ["abstract", "contemporary", "expressionism", "color theory", "non-representational"],
  Portrait: ["portrait", "figurative", "realism", "human", "faces", "psychology"],
  Landscape: ["landscape", "nature", "plein air", "scenery", "atmosphere", "light"],
  Illustration: ["illustration", "design", "editorial", "storytelling", "concept art"],
  "Digital Art": ["digital", "generative", "pixel", "concept", "NFT-ready", "vector"],
  default: ["fine art", "original work", "collectible", "signed edition", "gallery quality"],
}

export default function ArtworkUpload() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>("select")
  const [dragOver, setDragOver] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Form fields
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [medium, setMedium] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [price, setPrice] = useState("")
  const [currency, setCurrency] = useState("IDR")
  const [availability, setAvailability] = useState("Available for Sale")
  const [copyright, setCopyright] = useState("")
  const [license, setLicense] = useState("All Rights Reserved")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [aiChecks, setAiChecks] = useState<AiCheck[]>([])
  const [aiProgress, setAiProgress] = useState(0)
  const [aiTags, setAiTags] = useState<string[]>([])
  const [selectedAiTags, setSelectedAiTags] = useState<Set<string>>(new Set())
  const [publishProgress, setPublishProgress] = useState(0)

  function handleFileSelect(file: File) {
    if (!file.type.startsWith("image/")) return
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setStep("info")
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  function handleSimulatedUpload() {
    // Simulate picking a placeholder image
    setPreviewUrl("https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=800&fit=crop")
    setStep("info")
  }

  function validateInfo() {
    const errs: Record<string, string> = {}
    if (!title.trim()) errs.title = "Title is required"
    if (!category) errs.category = "Please select a category"
    if (!medium.trim()) errs.medium = "Please specify the medium"
    if (price && isNaN(Number(price.replace(/,/g, "")))) errs.price = "Enter a valid price"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function runAiAnalysis() {
    if (!validateInfo()) return
    setStep("ai-analysis")
    setAiProgress(0)

    const checks: AiCheck[] = [
      { label: "Analyzing composition & style", result: "", done: false },
      { label: "Detecting content & subject matter", result: "", done: false },
      { label: "Checking for copyright issues", result: "", done: false },
      { label: "Generating semantic tags", result: "", done: false },
      { label: "Optimizing for discoverability", result: "", done: false },
    ]
    setAiChecks(checks)

    let prog = 0
    const iv = setInterval(() => {
      prog += 1
      setAiProgress(Math.min(prog, 100))
    }, 40)

    const results = [
      "Acrylic texture, warm palette",
      "Abstract botanical elements",
      "No violations detected",
      "8 tags generated",
      "Score: 94/100",
    ]

    checks.forEach((_, i) => {
      setTimeout(() => {
        setAiChecks((prev) => {
          const next = [...prev]
          next[i] = { ...next[i], done: true, result: results[i] }
          return next
        })
        if (i === checks.length - 1) {
          clearInterval(iv)
          setAiProgress(100)
          const suggested = [...(aiTagSuggestions[category] || aiTagSuggestions.default)]
          setAiTags(suggested)
          setSelectedAiTags(new Set(suggested.slice(0, 3)))
          setTimeout(() => setStep("preview"), 800)
        }
      }, (i + 1) * 900)
    })
  }

  function addTag(t: string) {
    const clean = t.trim().toLowerCase().replace(/\s+/g, "-")
    if (clean && !tags.includes(clean) && tags.length < 15) setTags((prev) => [...prev, clean])
    setTagInput("")
  }

  function toggleAiTag(t: string) {
    setSelectedAiTags((prev) => {
      const n = new Set(prev)
      n.has(t) ? n.delete(t) : n.add(t)
      return n
    })
  }

  function handlePublish() {
    const allTags = [...new Set([...tags, ...selectedAiTags])]
    setTags(allTags)
    setStep("publishing")
    let prog = 0
    const iv = setInterval(() => {
      prog += 2
      setPublishProgress(Math.min(prog, 100))
      if (prog >= 100) { clearInterval(iv); setTimeout(() => setStep("published"), 300) }
    }, 50)
  }

  const totalSteps = 4
  const currentStepIdx = { select: 1, info: 2, "ai-analysis": 3, preview: 4, publishing: 4, published: 4 }[step]

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">

      {/* Header */}
      {step !== "published" && step !== "publishing" && (
        <div className="bg-white px-5 pt-12 pb-4 flex items-center justify-between shadow-sm">
          <button onClick={() => step === "info" ? setStep("select") : step === "preview" ? setStep("ai-analysis") : navigate(-1)} className="w-9 h-9 rounded-full bg-[#F4F5F9] flex items-center justify-center active:scale-95 transition-transform">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </button>
          <p className="text-[#1E2D5A] font-extrabold text-base">Upload Artwork</p>
          <div className="text-[#9BAACE] text-xs font-semibold">{currentStepIdx}/{totalSteps}</div>
        </div>
      )}

      {/* Step progress bar */}
      {step !== "published" && (
        <div className="h-1 bg-[#E0E5F2]">
          <div className="h-full bg-[#3D5898] transition-all duration-500" style={{ width: `${(currentStepIdx / totalSteps) * 100}%` }} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto pb-24">

        {/* ── Step 1: Select image ── */}
        {step === "select" && (
          <div className="px-5 pt-6">
            <h2 className="text-[#1E2D5A] font-extrabold text-xl mb-1">Select Artwork Image</h2>
            <p className="text-[#7A8BB5] text-sm mb-6">Upload a high-resolution image of your artwork</p>

            <button
              className={`w-full h-64 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all active:scale-[0.98] cursor-pointer ${dragOver ? "border-[#3D5898] bg-[#3D5898]/5" : "border-[#C8D0E8] bg-white"}`}
              onClick={handleSimulatedUpload}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#3D5898]/8 flex items-center justify-center">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#3D5898" strokeWidth="1.8"/><path d="M3 15l5-5 4 4 3-3 6 6" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <div className="text-center">
                <p className="text-[#1E2D5A] font-bold text-sm">Tap to select image</p>
                <p className="text-[#9BAACE] text-xs mt-1">or drag and drop here</p>
              </div>
              <div className="flex gap-2 flex-wrap justify-center px-8">
                {["JPG", "PNG", "WEBP", "TIFF"].map((f) => (
                  <span key={f} className="text-[10px] font-bold text-[#7A8BB5] bg-[#F4F5F9] px-2 py-0.5 rounded">{f}</span>
                ))}
              </div>
              <p className="text-[#9BAACE] text-xs">Max 100 MB · Min 1200×1200px recommended</p>
            </button>

            {/* Tips */}
            <div className="bg-white rounded-2xl p-4 shadow-sm mt-4 space-y-3">
              <p className="text-[#1E2D5A] font-bold text-sm">Photography tips</p>
              {[
                { icon: "💡", t: "Use natural lighting or studio light" },
                { icon: "📐", t: "Shoot perpendicular to avoid distortion" },
                { icon: "🔍", t: "High resolution captures fine details" },
                { icon: "🎨", t: "Ensure colors are true to the original" },
              ].map(({ icon, t }) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="text-base">{icon}</span>
                  <p className="text-[#7A8BB5] text-xs">{t}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 2: Artwork info ── */}
        {step === "info" && (
          <div className="px-5 pt-5 space-y-5">
            {/* Preview thumb */}
            {previewUrl && (
              <div className="relative h-44 rounded-2xl overflow-hidden">
                <img src={previewUrl} alt="" className="w-full h-full object-cover" />
                <button onClick={() => setStep("select")} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center active:scale-95">
                  <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="3" x2="11" y2="11"/><line x1="11" y1="3" x2="3" y2="11"/></svg>
                </button>
              </div>
            )}

            <h2 className="text-[#1E2D5A] font-extrabold text-lg">Artwork Information</h2>

            {/* Title */}
            <div>
              <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Title <span className="text-red-400">*</span></label>
              <input value={title} onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: "" })) }} placeholder="e.g. Midnight Bloom" className={`w-full bg-white rounded-2xl px-4 py-3.5 text-sm text-[#1E2D5A] outline-none font-semibold border-2 shadow-sm ${errors.title ? "border-red-300" : "border-transparent focus:border-[#3D5898]"}`} />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your artwork — inspiration, technique, story…" rows={4} className="w-full bg-white rounded-2xl px-4 py-3.5 text-sm text-[#1E2D5A] outline-none font-semibold border-2 border-transparent focus:border-[#3D5898] shadow-sm resize-none" />
              <p className="text-[#9BAACE] text-xs text-right mt-1">{description.length}/500</p>
            </div>

            {/* Category */}
            <div>
              <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Category <span className="text-red-400">*</span></label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button key={c} onClick={() => { setCategory(c); setErrors((p) => ({ ...p, category: "" })) }} className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${category === c ? "bg-[#3D5898] text-white" : "bg-white text-[#7A8BB5] shadow-sm"}`}>{c}</button>
                ))}
              </div>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>

            {/* Year + Medium */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Year</label>
                <input type="number" value={year} onChange={(e) => setYear(e.target.value)} min="1900" max={new Date().getFullYear()} className="w-full bg-white rounded-2xl px-4 py-3.5 text-sm text-[#1E2D5A] outline-none font-semibold border-2 border-transparent focus:border-[#3D5898] shadow-sm" />
              </div>
              <div>
                <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Medium <span className="text-red-400">*</span></label>
                <input value={medium} onChange={(e) => { setMedium(e.target.value); setErrors((p) => ({ ...p, medium: "" })) }} placeholder="e.g. Acrylic" className={`w-full bg-white rounded-2xl px-4 py-3.5 text-sm text-[#1E2D5A] outline-none font-semibold border-2 shadow-sm ${errors.medium ? "border-red-300" : "border-transparent focus:border-[#3D5898]"}`} />
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Dimensions (cm)</label>
              <div className="flex gap-3 items-center">
                <input value={width} onChange={(e) => setWidth(e.target.value)} placeholder="Width" className="flex-1 bg-white rounded-2xl px-4 py-3.5 text-sm text-[#1E2D5A] outline-none font-semibold border-2 border-transparent focus:border-[#3D5898] shadow-sm" />
                <span className="text-[#9BAACE] font-bold">×</span>
                <input value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height" className="flex-1 bg-white rounded-2xl px-4 py-3.5 text-sm text-[#1E2D5A] outline-none font-semibold border-2 border-transparent focus:border-[#3D5898] shadow-sm" />
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Price</label>
              <div className="flex gap-2">
                <div className="bg-white rounded-2xl px-3 py-3.5 shadow-sm">
                  <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="text-sm text-[#1E2D5A] font-bold outline-none bg-transparent">
                    {currencies.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <input value={price} onChange={(e) => { setPrice(e.target.value); setErrors((p) => ({ ...p, price: "" })) }} placeholder="0" className={`flex-1 bg-white rounded-2xl px-4 py-3.5 text-sm text-[#1E2D5A] outline-none font-semibold border-2 shadow-sm ${errors.price ? "border-red-300" : "border-transparent focus:border-[#3D5898]"}`} />
              </div>
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>

            {/* Availability */}
            <div>
              <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Availability</label>
              <div className="flex flex-wrap gap-2">
                {availabilityOptions.map((a) => (
                  <button key={a} onClick={() => setAvailability(a)} className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${availability === a ? "bg-[#3D5898] text-white" : "bg-white text-[#7A8BB5] shadow-sm"}`}>{a}</button>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div>
              <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Copyright</label>
              <input value={copyright} onChange={(e) => setCopyright(e.target.value)} placeholder={`© ${year} Artist Name`} className="w-full bg-white rounded-2xl px-4 py-3.5 text-sm text-[#1E2D5A] outline-none font-semibold border-2 border-transparent focus:border-[#3D5898] shadow-sm" />
            </div>

            {/* License */}
            <div>
              <label className="text-[#1E2D5A] font-bold text-sm block mb-2">License</label>
              <div className="flex flex-wrap gap-2">
                {["All Rights Reserved", "CC BY", "CC BY-NC", "CC0 Public Domain"].map((l) => (
                  <button key={l} onClick={() => setLicense(l)} className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${license === l ? "bg-[#3D5898] text-white" : "bg-white text-[#7A8BB5] shadow-sm"}`}>{l}</button>
                ))}
              </div>
            </div>

            {/* Manual tags */}
            <div>
              <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((t) => (
                  <span key={t} className="flex items-center gap-1 bg-[#3D5898]/10 text-[#3D5898] text-xs font-semibold px-3 py-1 rounded-full">
                    #{t}
                    <button onClick={() => setTags((prev) => prev.filter((x) => x !== t))} className="active:scale-90">
                      <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="1" y1="1" x2="7" y2="7"/><line x1="7" y1="1" x2="1" y2="7"/></svg>
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag(tagInput))} placeholder="Add a tag and press Enter" className="flex-1 bg-white rounded-2xl px-4 py-3 text-sm text-[#1E2D5A] outline-none font-semibold border-2 border-transparent focus:border-[#3D5898] shadow-sm" />
                <button onClick={() => addTag(tagInput)} className="bg-[#3D5898] text-white px-4 rounded-2xl text-sm font-bold active:scale-95 transition-transform">Add</button>
              </div>
              <p className="text-[#9BAACE] text-xs mt-1">{tags.length}/15 tags</p>
            </div>
          </div>
        )}

        {/* ── Step 3: AI Analysis ── */}
        {step === "ai-analysis" && (
          <div className="px-5 pt-8 flex flex-col items-center">
            <div className="relative mb-6">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="36" fill="none" stroke="#E0E5F2" strokeWidth="6"/>
                <circle cx="40" cy="40" r="36" fill="none" stroke="#3D5898" strokeWidth="6" strokeDasharray={`${aiProgress * 2.26} 226`} strokeLinecap="round" style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "stroke-dasharray 0.1s linear" }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#1E2D5A] font-extrabold text-sm">{aiProgress}%</span>
              </div>
            </div>
            <h2 className="text-[#1E2D5A] font-extrabold text-xl mb-2">AI Analyzing Artwork</h2>
            <p className="text-[#7A8BB5] text-sm mb-8 text-center">Our AI is examining your artwork for optimal tagging and discoverability</p>

            <div className="w-full space-y-3">
              {aiChecks.map((check, i) => (
                <div key={i} className={`flex items-center gap-4 bg-white rounded-2xl px-4 py-4 shadow-sm transition-all ${check.done ? "" : "opacity-60"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-none transition-all ${check.done ? "bg-[#3D5898]" : "bg-[#E0E5F2]"}`}>
                    {check.done
                      ? <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="12 3 6 9 3 6"/></svg>
                      : <div className="w-3.5 h-3.5 border-2 border-[#9BAACE] border-t-[#3D5898] rounded-full animate-spin" />
                    }
                  </div>
                  <div className="flex-1">
                    <p className="text-[#1E2D5A] font-bold text-sm">{check.label}</p>
                    {check.done && <p className="text-[#7A8BB5] text-xs mt-0.5">{check.result}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 4: Preview ── */}
        {step === "preview" && (
          <div className="px-5 pt-5 space-y-5">
            <h2 className="text-[#1E2D5A] font-extrabold text-xl">Preview Artwork</h2>
            <p className="text-[#7A8BB5] text-sm">This is how your artwork will appear on Katsera</p>

            {/* Artwork card preview */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-md">
              {previewUrl && <img src={previewUrl} alt={title} className="w-full h-72 object-cover" />}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-[#1E2D5A] font-extrabold text-lg">{title || "Untitled"}</h3>
                    <p className="text-[#7A8BB5] text-sm">{medium}{width && height ? ` · ${width}×${height} cm` : ""}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#3D5898] font-extrabold text-lg">{price ? `${currency} ${Number(price.replace(/,/g, "")).toLocaleString()}` : "Price TBD"}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${availability === "Available for Sale" ? "text-green-600 bg-green-50" : "text-[#7A8BB5] bg-[#F4F5F9]"}`}>{availability}</span>
                  </div>
                </div>
                {description && <p className="text-[#7A8BB5] text-sm leading-relaxed mb-3">{description}</p>}
                <div className="flex items-center gap-3 py-3 border-t border-b border-[#F0F2F8]">
                  <div className="text-[#9BAACE] text-xs flex gap-3">
                    <span>{category}</span>
                    <span>·</span>
                    <span>{year}</span>
                    {copyright && <><span>·</span><span>{copyright}</span></>}
                  </div>
                </div>
              </div>
            </div>

            {/* AI-suggested tags */}
            {aiTags.length > 0 && (
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-[#3D5898] flex items-center justify-center">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" fill="#3D5898"/><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" stroke="white" strokeWidth="0"/><path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                  </div>
                  <p className="text-[#1E2D5A] font-bold text-sm">AI-suggested tags</p>
                  <span className="text-xs text-[#9BAACE] font-semibold ml-auto">Tap to toggle</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {aiTags.map((t) => {
                    const selected = selectedAiTags.has(t)
                    return (
                      <button key={t} onClick={() => toggleAiTag(t)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${selected ? "bg-[#3D5898] text-white" : "bg-[#F4F5F9] text-[#7A8BB5]"}`}>#{t}</button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Your manual tags */}
            {tags.length > 0 && (
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <p className="text-[#7A8BB5] text-xs font-semibold mb-2">Your tags</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => <span key={t} className="text-xs font-semibold bg-[#F4F5F9] text-[#3D5898] px-3 py-1 rounded-full">#{t}</span>)}
                </div>
              </div>
            )}

            {/* Legal */}
            <div className="bg-[#F4F5F9] rounded-2xl p-4 flex gap-3">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="flex-none mt-0.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#7A8BB5" strokeWidth="1.8" strokeLinecap="round"/></svg>
              <p className="text-[#7A8BB5] text-xs leading-relaxed">
                License: <strong className="text-[#1E2D5A]">{license}</strong>. By publishing, you confirm this artwork is your original work and you hold the rights to distribute it on Katsera.
              </p>
            </div>
          </div>
        )}

        {/* ── Publishing ── */}
        {step === "publishing" && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center gap-4">
            <div className="relative mb-4">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="#E0E5F2" strokeWidth="8"/>
                <circle cx="50" cy="50" r="44" fill="none" stroke="#3D5898" strokeWidth="8" strokeDasharray={`${publishProgress * 2.76} 276`} strokeLinecap="round" style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "stroke-dasharray 0.05s linear" }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#1E2D5A] font-extrabold text-lg">{publishProgress}%</span>
              </div>
            </div>
            <h2 className="text-[#1E2D5A] font-extrabold text-xl">Publishing Artwork…</h2>
            <div className="space-y-2 w-full max-w-xs text-left">
              {[
                { label: "Uploading high-resolution image", done: publishProgress > 20 },
                { label: "Processing image variants", done: publishProgress > 45 },
                { label: "Indexing metadata & tags", done: publishProgress > 70 },
                { label: "Publishing to your portfolio", done: publishProgress > 90 },
              ].map(({ label, done }) => (
                <div key={label} className={`flex items-center gap-2 transition-opacity ${done ? "" : "opacity-40"}`}>
                  <div className={`w-4 h-4 rounded-full flex-none flex items-center justify-center ${done ? "bg-[#3D5898]" : "bg-[#E0E5F2]"}`}>
                    {done && <svg width="8" height="8" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="7 2 3 6 1 4"/></svg>}
                  </div>
                  <span className="text-[#7A8BB5] text-xs font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Published ── */}
        {step === "published" && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center gap-4">
            <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <svg width="52" height="52" fill="none" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round"><polyline points="44 12 20 36 8 24"/></svg>
            </div>
            <h1 className="text-[#1E2D5A] font-extrabold text-2xl">Artwork Published!</h1>
            <p className="text-[#7A8BB5] text-sm leading-relaxed max-w-xs">
              <strong className="text-[#1E2D5A]">{title || "Your artwork"}</strong> is now live on your Katsera profile and visible to collectors worldwide.
            </p>

            {previewUrl && (
              <div className="w-full rounded-2xl overflow-hidden shadow-md">
                <img src={previewUrl} alt={title} className="w-full h-48 object-cover" />
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 w-full">
              {[{ v: "0", l: "Views" }, { v: "0", l: "Saves" }, { v: availability === "Available for Sale" ? currency : "—", l: "Status" }].map(({ v, l }) => (
                <div key={l} className="bg-white rounded-2xl p-3 shadow-sm text-center">
                  <p className="text-[#1E2D5A] font-extrabold text-base">{v}</p>
                  <p className="text-[#9BAACE] text-xs">{l}</p>
                </div>
              ))}
            </div>

            <button onClick={() => navigate("/painter/studio")} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-transform shadow-md">
              View in Studio →
            </button>
            <button onClick={() => { setStep("select"); setTitle(""); setDescription(""); setCategory(""); setMedium(""); setPrice(""); setTags([]); setPreviewUrl(null) }} className="w-full py-3.5 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-bold text-sm active:scale-95 transition-transform">
              Upload Another Artwork
            </button>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      {(step === "info" || step === "preview") && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] px-5 py-4">
          <button
            onClick={step === "info" ? runAiAnalysis : handlePublish}
            className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md"
          >
            {step === "info" ? (
              <><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="white" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="17" r="0.5" fill="white"/></svg>Analyze with AI</>
            ) : (
              <><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>Publish Artwork</>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
