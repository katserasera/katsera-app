import { useState } from "react"
import { useNavigate } from "react-router-dom"

type UploadType = "song" | "album"
type Step = "type" | "file" | "cover" | "info" | "ai-analysis" | "preview" | "publishing" | "published"

const genres = ["Pop", "R&B", "Hip-Hop", "Rock", "Electronic", "Jazz", "Classical", "Folk", "Indie", "Dangdut", "Keroncong", "Other"]
const languages = ["Indonesian", "English", "Javanese", "Sundanese", "Mandarin", "Japanese", "Korean", "Other"]
const licenses = ["All Rights Reserved", "Creative Commons BY", "Creative Commons BY-NC", "Public Domain"]

// ── Waveform decoration ────────────────────────────────────────────────────────
function Waveform({ active = false }: { active?: boolean }) {
  const bars = [4, 8, 13, 7, 16, 12, 5, 10, 14, 9, 6, 15, 11, 8, 4, 12, 7, 16, 10, 5]
  return (
    <div className="flex items-center gap-0.5 h-8">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-1 rounded-full transition-all"
          style={{
            height: `${(h / 16) * 100}%`,
            background: active ? "#3D5898" : "#C8D0E8",
            animation: active ? `waveBar ${0.4 + (i % 5) * 0.15}s ease-in-out infinite alternate` : "none",
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  )
}

type AiCheck = { label: string; result: string; done: boolean }

export default function SongUpload() {
  const navigate = useNavigate()
  const [uploadType, setUploadType] = useState<UploadType>("song")
  const [step, setStep] = useState<Step>("type")
  const [audioReady, setAudioReady] = useState(false)
  const [coverReady, setCoverReady] = useState(false)
  const [coverUrl, setCoverUrl] = useState<string | null>(null)

  // Song info
  const [title, setTitle] = useState("")
  const [artistName, setArtistName] = useState("")
  const [genre, setGenre] = useState("")
  const [language, setLanguage] = useState("Indonesian")
  const [description, setDescription] = useState("")
  const [lyrics, setLyrics] = useState("")
  const [releaseDate, setReleaseDate] = useState("")
  const [isrc, setIsrc] = useState("")
  const [explicit, setExplicit] = useState(false)
  const [allowDownload, setAllowDownload] = useState(false)
  const [license, setLicense] = useState("All Rights Reserved")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Album extras
  const [albumTracks, setAlbumTracks] = useState<string[]>(["", "", ""])

  const [aiChecks, setAiChecks] = useState<AiCheck[]>([])
  const [aiProgress, setAiProgress] = useState(0)
  const [aiTags, setAiTags] = useState<string[]>([])
  const [selectedAiTags, setSelectedAiTags] = useState<Set<string>>(new Set())
  const [publishProgress, setPublishProgress] = useState(0)

  function simulateAudioUpload() {
    setTimeout(() => setAudioReady(true), 1200)
  }

  function simulateCoverUpload() {
    setCoverUrl("https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop")
    setTimeout(() => setCoverReady(true), 1000)
  }

  function validateInfo() {
    const errs: Record<string, string> = {}
    if (!title.trim()) errs.title = "Title is required"
    if (!genre) errs.genre = "Select a genre"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function runAiAnalysis() {
    if (!validateInfo()) return
    setStep("ai-analysis")
    setAiProgress(0)

    const checks: AiCheck[] = uploadType === "song" ? [
      { label: "Analyzing audio fingerprint", result: "", done: false },
      { label: "Detecting BPM & key signature", result: "", done: false },
      { label: "Copyright & plagiarism check", result: "", done: false },
      { label: "Generating mood & genre tags", result: "", done: false },
      { label: "Optimizing metadata", result: "", done: false },
    ] : [
      { label: "Scanning all tracks", result: "", done: false },
      { label: "Detecting tracklist order", result: "", done: false },
      { label: "Copyright check (album)", result: "", done: false },
      { label: "Generating album tags", result: "", done: false },
      { label: "Building album index", result: "", done: false },
    ]
    setAiChecks(checks)

    let prog = 0
    const iv = setInterval(() => { prog += 1; setAiProgress(Math.min(prog, 100)) }, 40)

    const results = uploadType === "song"
      ? ["Hash: A9F2…CB4", "128 BPM · D minor", "No violations detected", "8 tags generated", "ISRC ready"]
      : ["3 tracks detected", "Tracklist indexed", "No violations detected", "12 tags generated", "Album ID: ALB-" + Math.random().toString(36).slice(2, 6).toUpperCase()]

    checks.forEach((_, i) => {
      setTimeout(() => {
        setAiChecks((prev) => { const n = [...prev]; n[i] = { ...n[i], done: true, result: results[i] }; return n })
        if (i === checks.length - 1) {
          clearInterval(iv)
          setAiProgress(100)
          const suggested = [genre.toLowerCase(), language.toLowerCase(), "new release", "streaming", "katsera exclusive", "original"].filter(Boolean)
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
    setSelectedAiTags((prev) => { const n = new Set(prev); n.has(t) ? n.delete(t) : n.add(t); return n })
  }

  function handlePublish() {
    setStep("publishing")
    let prog = 0
    const iv = setInterval(() => {
      prog += 2; setPublishProgress(Math.min(prog, 100))
      if (prog >= 100) { clearInterval(iv); setTimeout(() => setStep("published"), 300) }
    }, 50)
  }

  const stepMap: Record<Step, number> = { type: 1, file: 2, cover: 3, info: 4, "ai-analysis": 5, preview: 6, publishing: 6, published: 6 }
  const totalSteps = 6

  const back = () => {
    const order: Step[] = ["type", "file", "cover", "info", "ai-analysis", "preview"]
    const idx = order.indexOf(step)
    if (idx > 0) setStep(order[idx - 1])
    else navigate(-1)
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <style>{`@keyframes waveBar { from { transform: scaleY(0.3) } to { transform: scaleY(1) } }`}</style>

      {/* Header */}
      {step !== "published" && step !== "publishing" && (
        <div className="bg-white px-5 pt-12 pb-4 flex items-center justify-between shadow-sm">
          <button onClick={back} className="w-9 h-9 rounded-full bg-[#F4F5F9] flex items-center justify-center active:scale-95 transition-transform">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </button>
          <p className="text-[#1E2D5A] font-extrabold text-base">Upload {uploadType === "song" ? "Song" : "Album"}</p>
          <div className="text-[#9BAACE] text-xs font-semibold">{stepMap[step]}/{totalSteps}</div>
        </div>
      )}

      {step !== "published" && (
        <div className="h-1 bg-[#E0E5F2]">
          <div className="h-full bg-[#3D5898] transition-all duration-500" style={{ width: `${(stepMap[step] / totalSteps) * 100}%` }} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto pb-28">

        {/* ── Type selection ── */}
        {step === "type" && (
          <div className="px-5 pt-8">
            <h2 className="text-[#1E2D5A] font-extrabold text-xl mb-1">What are you uploading?</h2>
            <p className="text-[#7A8BB5] text-sm mb-6">Choose the type of music release</p>
            <div className="space-y-4">
              {([
                { type: "song" as UploadType, icon: "🎵", title: "Single / Song", desc: "One track — single release, cover, or standalone song", extras: ["MP3, WAV, FLAC supported", "Up to 320kbps", "Max 50 MB"] },
                { type: "album" as UploadType, icon: "💿", title: "Album / EP", desc: "Multiple tracks bundled as one release", extras: ["2–30 tracks", "Full tracklist management", "Album art included"] },
              ] as { type: UploadType; icon: string; title: string; desc: string; extras: string[] }[]).map(({ type, icon, title, desc, extras }) => (
                <button key={type} onClick={() => setUploadType(type)} className={`w-full rounded-3xl p-5 text-left transition-all active:scale-[0.98] border-2 ${uploadType === type ? "bg-white border-[#3D5898] shadow-md" : "bg-white border-transparent shadow-sm"}`}>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-[#3D5898]/8 flex items-center justify-center text-3xl">{icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[#1E2D5A] font-extrabold text-base">{title}</p>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${uploadType === type ? "border-[#3D5898] bg-[#3D5898]" : "border-[#C8D0E8]"}`}>
                          {uploadType === type && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </div>
                      <p className="text-[#7A8BB5] text-xs mt-0.5">{desc}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {extras.map((e) => <span key={e} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#F4F5F9] text-[#7A8BB5]">{e}</span>)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── File upload ── */}
        {step === "file" && (
          <div className="px-5 pt-8 space-y-5">
            <h2 className="text-[#1E2D5A] font-extrabold text-xl mb-1">Upload {uploadType === "song" ? "Audio File" : "Tracks"}</h2>
            <p className="text-[#7A8BB5] text-sm">Supported: MP3, WAV, FLAC, AAC · Up to {uploadType === "song" ? "50 MB" : "500 MB"}</p>

            {uploadType === "song" ? (
              <button
                onClick={() => { if (!audioReady) simulateAudioUpload() }}
                className={`w-full h-44 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-all active:scale-[0.98] ${audioReady ? "border-[#3D5898] bg-[#3D5898]/5" : "border-[#C8D0E8] bg-white"}`}
              >
                <Waveform active={audioReady} />
                {audioReady ? (
                  <div className="text-center">
                    <p className="text-[#3D5898] font-bold text-sm">track_master.wav</p>
                    <p className="text-[#9BAACE] text-xs mt-1">4:32 · 44.1 kHz · 320 kbps · 18.4 MB</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-[#1E2D5A] font-bold text-sm">Tap to upload audio</p>
                    <p className="text-[#9BAACE] text-xs mt-1">MP3, WAV, FLAC, AAC</p>
                  </div>
                )}
              </button>
            ) : (
              <div className="space-y-3">
                {albumTracks.map((t, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#3D5898]/8 flex items-center justify-center flex-none">
                      <span className="text-[#3D5898] font-extrabold text-sm">{i + 1}</span>
                    </div>
                    <input
                      value={t}
                      onChange={(e) => { const n = [...albumTracks]; n[i] = e.target.value; setAlbumTracks(n) }}
                      placeholder={`Track ${i + 1} title`}
                      className="flex-1 text-sm text-[#1E2D5A] font-semibold outline-none placeholder:text-[#C8D0E8] bg-transparent"
                    />
                    <button
                      onClick={() => { if (!audioReady) { simulateAudioUpload() } }}
                      className="text-xs font-bold text-[#3D5898] bg-[#3D5898]/8 px-3 py-1.5 rounded-full active:scale-95 transition-transform"
                    >
                      {audioReady ? "✓ Ready" : "Upload"}
                    </button>
                  </div>
                ))}
                <button onClick={() => setAlbumTracks([...albumTracks, ""])} className="w-full py-3 rounded-2xl border-2 border-dashed border-[#C8D0E8] text-[#7A8BB5] text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  Add Track
                </button>
              </div>
            )}

            {audioReady && (
              <div className="bg-green-50 rounded-2xl p-4 flex items-center gap-3">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#22c55e"/><polyline points="20 6 9 17 4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
                <div>
                  <p className="text-green-700 font-bold text-sm">Audio ready</p>
                  <p className="text-green-600 text-xs">Your {uploadType === "song" ? "track" : "tracks are"} ready for processing</p>
                </div>
              </div>
            )}

            <div className="bg-[#F4F5F9] rounded-2xl p-4 space-y-2">
              <p className="text-[#1E2D5A] font-bold text-sm">Audio requirements</p>
              {["Minimum bitrate: 128 kbps (320 kbps recommended)", "Sample rate: 44.1 kHz or higher", "Channels: Stereo preferred", "Max file size: 50 MB per track"].map((req) => (
                <div key={req} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7A8BB5] flex-none" />
                  <p className="text-[#7A8BB5] text-xs">{req}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Cover art ── */}
        {step === "cover" && (
          <div className="px-5 pt-8 space-y-5">
            <h2 className="text-[#1E2D5A] font-extrabold text-xl mb-1">Add Cover Art</h2>
            <p className="text-[#7A8BB5] text-sm">A great cover makes your release stand out. Min 1400×1400 px.</p>

            <button onClick={() => { if (!coverReady) simulateCoverUpload() }} className={`w-full h-64 rounded-3xl border-2 border-dashed overflow-hidden flex flex-col items-center justify-center gap-3 transition-all active:scale-[0.98] relative ${coverReady ? "border-[#3D5898]" : "border-[#C8D0E8] bg-white"}`}>
              {coverReady && coverUrl ? (
                <img src={coverUrl} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-[#3D5898]/8 flex items-center justify-center">
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#3D5898" strokeWidth="1.8"/><path d="M3 15l5-5 4 4 3-3 6 6" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  </div>
                  <p className="text-[#1E2D5A] font-bold text-sm">Tap to upload cover art</p>
                  <p className="text-[#9BAACE] text-xs">JPG or PNG · Square format · Min 1400×1400 px</p>
                </>
              )}
              {coverReady && (
                <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="12 2 5 8 2 5"/></svg>
                </div>
              )}
            </button>

            {coverReady && (
              <button onClick={() => { setCoverReady(false); setCoverUrl(null) }} className="text-[#7A8BB5] text-sm font-semibold text-center w-full active:opacity-60">
                Remove cover →
              </button>
            )}

            <div className="bg-[#F4F5F9] rounded-2xl p-4 space-y-2">
              <p className="text-[#1E2D5A] font-bold text-sm">Cover art guidelines</p>
              {["Square format (1:1 ratio)", "Minimum 1400×1400 pixels", "JPEG or PNG format", "No explicit content visible on cover", "Original artwork — no stock photos"].map((g) => (
                <div key={g} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7A8BB5] flex-none" />
                  <p className="text-[#7A8BB5] text-xs">{g}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Song info ── */}
        {step === "info" && (
          <div className="px-5 pt-5 space-y-5">
            <h2 className="text-[#1E2D5A] font-extrabold text-lg">Release Information</h2>

            {/* Cover thumb */}
            {coverUrl && (
              <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm">
                <img src={coverUrl} alt="" className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <p className="text-[#7A8BB5] text-xs">Cover art ready</p>
                  <p className="text-[#1E2D5A] font-bold text-sm">1 image selected</p>
                </div>
                <div className="ml-auto">
                  <Waveform active />
                </div>
              </div>
            )}

            {/* Title */}
            <div>
              <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Title <span className="text-red-400">*</span></label>
              <input value={title} onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: "" })) }} placeholder={uploadType === "song" ? "Song title" : "Album name"} className={`w-full bg-white rounded-2xl px-4 py-3.5 text-sm text-[#1E2D5A] outline-none font-semibold border-2 shadow-sm ${errors.title ? "border-red-300" : "border-transparent focus:border-[#3D5898]"}`} />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            {/* Artist name */}
            <div>
              <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Artist / Stage Name</label>
              <input value={artistName} onChange={(e) => setArtistName(e.target.value)} placeholder="Your artist name" className="w-full bg-white rounded-2xl px-4 py-3.5 text-sm text-[#1E2D5A] outline-none font-semibold border-2 border-transparent focus:border-[#3D5898] shadow-sm" />
            </div>

            {/* Genre */}
            <div>
              <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Genre <span className="text-red-400">*</span></label>
              <div className="flex flex-wrap gap-2">
                {genres.map((g) => (
                  <button key={g} onClick={() => { setGenre(g); setErrors((p) => ({ ...p, genre: "" })) }} className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${genre === g ? "bg-[#3D5898] text-white" : "bg-white text-[#7A8BB5] shadow-sm"}`}>{g}</button>
                ))}
              </div>
              {errors.genre && <p className="text-red-500 text-xs mt-1">{errors.genre}</p>}
            </div>

            {/* Language */}
            <div>
              <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Language</label>
              <div className="flex flex-wrap gap-2">
                {languages.map((l) => (
                  <button key={l} onClick={() => setLanguage(l)} className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${language === l ? "bg-[#3D5898] text-white" : "bg-white text-[#7A8BB5] shadow-sm"}`}>{l}</button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is this song about? Share the story behind it…" rows={3} className="w-full bg-white rounded-2xl px-4 py-3.5 text-sm text-[#1E2D5A] outline-none font-semibold border-2 border-transparent focus:border-[#3D5898] shadow-sm resize-none" />
            </div>

            {/* Lyrics */}
            {uploadType === "song" && (
              <div>
                <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Lyrics <span className="text-[#9BAACE] text-xs font-normal">(optional)</span></label>
                <textarea value={lyrics} onChange={(e) => setLyrics(e.target.value)} placeholder="Paste your lyrics here for fans to follow along…" rows={6} className="w-full bg-white rounded-2xl px-4 py-3.5 text-sm text-[#1E2D5A] outline-none font-semibold border-2 border-transparent focus:border-[#3D5898] shadow-sm resize-none font-mono" />
              </div>
            )}

            {/* Release date + ISRC */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#1E2D5A] font-bold text-sm block mb-2">Release Date</label>
                <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} className="w-full bg-white rounded-2xl px-4 py-3.5 text-sm text-[#1E2D5A] outline-none font-semibold border-2 border-transparent focus:border-[#3D5898] shadow-sm" />
              </div>
              <div>
                <label className="text-[#1E2D5A] font-bold text-sm block mb-2">ISRC <span className="text-[#9BAACE] text-xs font-normal">(optional)</span></label>
                <input value={isrc} onChange={(e) => setIsrc(e.target.value)} placeholder="ID-A12-24-XXXXX" className="w-full bg-white rounded-2xl px-4 py-3.5 text-sm text-[#1E2D5A] outline-none font-semibold border-2 border-transparent focus:border-[#3D5898] shadow-sm" />
              </div>
            </div>

            {/* Toggles */}
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
              {[
                { label: "Explicit content", sub: "Contains mature language or themes", val: explicit, set: setExplicit },
                { label: "Allow download", sub: "Fans can download this track offline", val: allowDownload, set: setAllowDownload },
              ].map(({ label, sub, val, set }) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[#1E2D5A] font-bold text-sm">{label}</p>
                    <p className="text-[#9BAACE] text-xs">{sub}</p>
                  </div>
                  <button onClick={() => set(!val)} className={`w-12 h-6 rounded-full transition-colors flex-none flex items-center px-0.5 ${val ? "bg-[#3D5898]" : "bg-[#E0E5F2]"}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${val ? "translate-x-6" : "translate-x-0"}`} />
                  </button>
                </div>
              ))}
            </div>

            {/* License */}
            <div>
              <label className="text-[#1E2D5A] font-bold text-sm block mb-2">License</label>
              <div className="flex flex-wrap gap-2">
                {licenses.map((l) => <button key={l} onClick={() => setLicense(l)} className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${license === l ? "bg-[#3D5898] text-white" : "bg-white text-[#7A8BB5] shadow-sm"}`}>{l}</button>)}
              </div>
            </div>

            {/* Tags */}
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
            </div>
          </div>
        )}

        {/* ── AI Analysis ── */}
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
            <h2 className="text-[#1E2D5A] font-extrabold text-xl mb-2">AI Analyzing {uploadType === "song" ? "Track" : "Album"}</h2>
            <p className="text-[#7A8BB5] text-sm mb-8 text-center">Checking metadata, copyright, and generating optimal tags</p>
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

        {/* ── Preview ── */}
        {step === "preview" && (
          <div className="px-5 pt-5 space-y-5">
            <h2 className="text-[#1E2D5A] font-extrabold text-xl">Preview Release</h2>

            {/* Release card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-md">
              <div className="flex items-center gap-4 p-5">
                {coverUrl
                  ? <img src={coverUrl} alt="" className="w-20 h-20 rounded-2xl object-cover flex-none" />
                  : <div className="w-20 h-20 rounded-2xl bg-[#3D5898]/10 flex items-center justify-center flex-none text-3xl">{uploadType === "song" ? "🎵" : "💿"}</div>
                }
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[#1E2D5A] font-extrabold text-base truncate">{title || "Untitled"}</p>
                    {explicit && <span className="text-[10px] font-extrabold bg-[#1E2D5A] text-white px-1.5 rounded flex-none">E</span>}
                  </div>
                  <p className="text-[#7A8BB5] text-sm">{artistName || "Artist Name"}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {genre && <span className="text-[10px] font-bold bg-[#3D5898]/10 text-[#3D5898] px-2 py-0.5 rounded-full">{genre}</span>}
                    {language && <span className="text-[10px] font-bold bg-[#F4F5F9] text-[#7A8BB5] px-2 py-0.5 rounded-full">{language}</span>}
                    {releaseDate && <span className="text-[10px] font-bold bg-[#F4F5F9] text-[#7A8BB5] px-2 py-0.5 rounded-full">{releaseDate}</span>}
                  </div>
                </div>
              </div>
              {description && (
                <div className="px-5 pb-5 border-t border-[#F0F2F8] pt-3">
                  <p className="text-[#7A8BB5] text-sm leading-relaxed">{description}</p>
                </div>
              )}
              {uploadType === "album" && albumTracks.filter(Boolean).length > 0 && (
                <div className="px-5 pb-5 border-t border-[#F0F2F8] pt-3">
                  <p className="text-[#9BAACE] text-xs font-bold uppercase tracking-wide mb-2">Tracklist</p>
                  {albumTracks.filter(Boolean).map((t, i) => (
                    <div key={i} className="flex items-center gap-3 py-1.5">
                      <span className="text-[#C8D0E8] font-bold text-xs w-4">{i + 1}</span>
                      <span className="text-[#1E2D5A] text-sm font-semibold">{t}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI tags */}
            {aiTags.length > 0 && (
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-[#3D5898] flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="white"/></svg>
                  </div>
                  <p className="text-[#1E2D5A] font-bold text-sm">AI-suggested tags</p>
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

            {/* Settings summary */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-[#1E2D5A] font-bold text-sm mb-3">Settings</p>
              <div className="space-y-2">
                {[
                  { label: "License", value: license },
                  { label: "Download", value: allowDownload ? "Allowed" : "Streaming only" },
                  { label: "Explicit", value: explicit ? "Yes" : "No" },
                  { label: "ISRC", value: isrc || "Auto-assigned" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-1 border-b border-[#F4F5F9] last:border-0">
                    <span className="text-[#9BAACE] text-xs">{label}</span>
                    <span className="text-[#1E2D5A] text-xs font-bold">{value}</span>
                  </div>
                ))}
              </div>
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
            <h2 className="text-[#1E2D5A] font-extrabold text-xl">Publishing {uploadType === "song" ? "Song" : "Album"}…</h2>
            <div className="space-y-2 w-full max-w-xs text-left">
              {[
                { label: "Uploading audio file", done: publishProgress > 25 },
                { label: "Processing audio quality", done: publishProgress > 50 },
                { label: "Indexing metadata", done: publishProgress > 70 },
                { label: "Publishing to Katsera", done: publishProgress > 90 },
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
            <h1 className="text-[#1E2D5A] font-extrabold text-2xl">{uploadType === "song" ? "Song" : "Album"} Published!</h1>
            <p className="text-[#7A8BB5] text-sm leading-relaxed max-w-xs">
              <strong className="text-[#1E2D5A]">{title || "Your release"}</strong> is now live on Katsera and ready for your fans.
            </p>

            {coverUrl && <img src={coverUrl} alt={title} className="w-36 h-36 rounded-2xl object-cover shadow-lg" />}

            <div className="grid grid-cols-3 gap-3 w-full">
              {[{ v: "0", l: "Streams" }, { v: "0", l: "Likes" }, { v: "0", l: "Saves" }].map(({ v, l }) => (
                <div key={l} className="bg-white rounded-2xl p-3 shadow-sm text-center">
                  <p className="text-[#1E2D5A] font-extrabold text-base">{v}</p>
                  <p className="text-[#9BAACE] text-xs">{l}</p>
                </div>
              ))}
            </div>

            <button onClick={() => navigate("/artist/dashboard")} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-transform shadow-md">
              View on Dashboard →
            </button>
            <button onClick={() => { setStep("type"); setTitle(""); setDescription(""); setGenre(""); setAudioReady(false); setCoverReady(false); setCoverUrl(null); setTags([]) }} className="w-full py-3.5 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-bold text-sm active:scale-95 transition-transform">
              Upload Another Release
            </button>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      {(step === "type" || step === "file" || step === "cover" || step === "info" || step === "preview") && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] px-5 py-4">
          <button
            onClick={() => {
              if (step === "type") setStep("file")
              else if (step === "file") setStep("cover")
              else if (step === "cover") setStep("info")
              else if (step === "info") runAiAnalysis()
              else if (step === "preview") handlePublish()
            }}
            disabled={step === "file" && !audioReady}
            className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md disabled:opacity-50"
          >
            {step === "preview" ? "🚀 Publish Now" : step === "info" ? "Analyze with AI →" : "Continue →"}
          </button>
        </div>
      )}
    </div>
  )
}
