import { useState, useRef, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

interface Course {
  id: number
  title: string
  instructor: string
  duration: string
  thumbnail: string
  description: string
}

const COURSES: Course[] = [
  { id: 1, title: "The Digital Singer: Membangun Panggung Sendiri", instructor: "Satria Ramadhan", duration: "28:14", thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=340&fit=crop", description: "In this lesson, we dive deep into building your digital stage — from your artist identity to growing a loyal fanbase online. Perfect for emerging artists." },
  { id: 2, title: "Art Business: Manajemen Karier & Nilai Karya", instructor: "Kerenasti Tori", duration: "42:08", thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=340&fit=crop", description: "Understanding the business side of your art career: pricing, licensing, collaborations, and building your brand equity as an independent creator." },
  { id: 3, title: "Theater Branding: Membangun Pasukan Penonton Loyal", instructor: "Aria Satria", duration: "35:50", thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=340&fit=crop", description: "How to build and nurture a loyal fanbase that returns to every show. Covers community engagement, exclusive experiences, and word-of-mouth growth." },
]

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2]

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, "0")}`
}

export default function VideoPlayer() {
  const navigate = useNavigate()
  const location = useLocation()
  const { courseId = 1 } = (location.state as { courseId?: number }) || {}
  const course = COURSES.find((c) => c.id === courseId) || COURSES[0]

  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const duration = 28 * 60 + 14 // simulated
  const [speed, setSpeed] = useState(1)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [progress, setProgress] = useState(0) // saved progress per course
  const [showControls, setShowControls] = useState(true)
  const [completed, setCompleted] = useState(false)
  const [note, setNote] = useState("")
  const [notes, setNotes] = useState<{ time: string; text: string }[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  // Simulate playback
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((t) => {
          const next = t + speed
          if (next >= duration) { setPlaying(false); setCompleted(true); setProgress(100); return duration }
          setProgress(Math.round((next / duration) * 100))
          return next
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [playing, speed, duration])

  // Auto-hide controls
  useEffect(() => {
    if (!playing) { setShowControls(true); return }
    const t = setTimeout(() => setShowControls(false), 3000)
    return () => clearTimeout(t)
  }, [playing, currentTime])

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const t = parseFloat(e.target.value)
    setCurrentTime(t)
    setProgress(Math.round((t / duration) * 100))
  }

  function addNote() {
    if (!note.trim()) return
    setNotes((prev) => [{ time: formatTime(currentTime), text: note }, ...prev])
    setNote("")
  }


  return (
    <div className={`flex flex-col max-w-md mx-auto font-[Nunito] ${fullscreen ? "fixed inset-0 bg-black z-50" : "min-h-screen bg-[#1E2D5A]"}`}>
      {/* Video area */}
      <div className={`relative bg-black ${fullscreen ? "flex-1" : "aspect-video"}`} onClick={() => { setShowControls(!showControls) }}>
        {/* Thumbnail overlay (simulated player) */}
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-black/40" />

        {/* Play overlay when paused */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button onClick={(e) => { e.stopPropagation(); setPlaying(true) }} className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center active:scale-95 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#1E2D5A"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </button>
          </div>
        )}

        {/* Completed overlay */}
        {completed && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
              <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <p className="text-white font-extrabold text-lg">Lesson Complete!</p>
            <button onClick={() => { setCompleted(false); setCurrentTime(0); setProgress(0); setPlaying(false) }} className="px-6 py-2.5 rounded-full bg-white text-[#1E2D5A] font-bold text-sm active:scale-95">Watch Again</button>
          </div>
        )}

        {/* Controls overlay */}
        {showControls && !completed && (
          <div className="absolute inset-0 flex flex-col justify-between p-3">
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center active:scale-95">
                <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <div className="flex items-center gap-2">
                {/* Speed */}
                <div className="relative">
                  <button onClick={(e) => { e.stopPropagation(); setShowSpeedMenu(!showSpeedMenu) }} className="h-7 px-2.5 rounded-full bg-black/50 text-white text-xs font-bold active:scale-95">
                    {speed}×
                  </button>
                  {showSpeedMenu && (
                    <div className="absolute top-9 right-0 bg-white rounded-xl shadow-lg overflow-hidden z-10">
                      {SPEEDS.map((s) => (
                        <button key={s} onClick={(e) => { e.stopPropagation(); setSpeed(s); setShowSpeedMenu(false) }} className={`block w-full px-4 py-2 text-xs font-bold text-left ${speed === s ? "bg-[#3D5898] text-white" : "text-[#1E2D5A] hover:bg-[#F4F5F9]"}`}>{s}×</button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Fullscreen */}
                <button onClick={(e) => { e.stopPropagation(); setFullscreen(!fullscreen) }} className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center active:scale-95">
                  {fullscreen
                    ? <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
                    : <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* Bottom controls */}
            <div className="space-y-2">
              {/* Progress bar */}
              <input type="range" min={0} max={duration} value={currentTime} onChange={handleSeek} onClick={(e) => e.stopPropagation()} className="w-full h-1 appearance-none bg-white/30 rounded-full cursor-pointer" style={{ accentColor: "#3D5898" }} />
              <div className="flex items-center gap-3">
                <button onClick={(e) => { e.stopPropagation(); setPlaying(!playing) }} className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center active:scale-95">
                  {playing
                    ? <svg width="14" height="14" fill="#1E2D5A" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="#1E2D5A"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  }
                </button>
                <span className="text-white text-xs font-semibold">{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {!fullscreen && (
        <div className="flex-1 bg-[#E8E8E8] overflow-y-auto pb-8">
          {/* Course info */}
          <div className="bg-white px-4 py-4 shadow-sm">
            <p className="text-[#1E2D5A] font-extrabold text-base leading-snug">{course.title}</p>
            <p className="text-[#7A8BB5] text-xs mt-1">{course.instructor}</p>
            {/* Progress bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-[#9BAACE] mb-1">
                <span>Progress</span><span>{progress}% complete</span>
              </div>
              <div className="h-1.5 bg-[#E8E8E8] rounded-full overflow-hidden">
                <div className="h-full bg-[#3D5898] rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-[#1E2D5A] font-bold text-sm mb-2">About this lesson</p>
            <p className="text-[#7A8BB5] text-sm leading-relaxed">{course.description}</p>
          </div>

          {/* Other lessons */}
          <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-[#1E2D5A] font-bold text-sm mb-3">More Lessons</p>
            {COURSES.filter((c) => c.id !== course.id).map((c) => (
              <button key={c.id} onClick={() => navigate("/academy/player", { state: { courseId: c.id } })} className="w-full flex items-center gap-3 py-2.5 border-b border-[#F4F5F9] last:border-0 text-left active:scale-[0.98] transition-transform">
                <div className="relative w-16 h-10 rounded-lg overflow-hidden flex-none">
                  <img src={c.thumbnail} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1E2D5A] font-bold text-xs leading-tight line-clamp-2">{c.title}</p>
                  <p className="text-[#9BAACE] text-[10px] mt-0.5">{c.instructor} · {c.duration}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Notes */}
          <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-[#1E2D5A] font-bold text-sm mb-3">My Notes</p>
            <div className="flex gap-2 mb-3">
              <input value={note} onChange={(e) => setNote(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addNote()} placeholder={`Note at ${formatTime(currentTime)}...`} className="flex-1 bg-[#F4F5F9] rounded-xl px-3 py-2 text-xs text-[#1E2D5A] outline-none placeholder:text-[#C8D0E8]" />
              <button onClick={addNote} className="px-3 py-2 rounded-xl bg-[#3D5898] text-white text-xs font-bold active:scale-95">Add</button>
            </div>
            {notes.length === 0 ? (
              <p className="text-[#9BAACE] text-xs text-center py-4">No notes yet. Take notes as you watch!</p>
            ) : notes.map((n, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-[#F4F5F9] last:border-0">
                <span className="text-[#3D5898] text-[10px] font-bold bg-[#3D5898]/8 px-1.5 py-0.5 rounded flex-none">{n.time}</span>
                <p className="text-[#7A8BB5] text-xs">{n.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
