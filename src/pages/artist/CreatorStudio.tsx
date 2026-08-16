import { useState } from "react"
import { useNavigate } from "react-router-dom"

type StudioTab = "home" | "drafts" | "scheduled" | "calendar" | "analytics"
type PostType = "post" | "video" | "audio" | "story"

interface Draft {
  id: number
  type: PostType
  title: string
  excerpt: string
  updated: string
  thumb?: string
}

interface Scheduled {
  id: number
  type: PostType
  title: string
  scheduledFor: string
  platform: string[]
}

const DRAFTS: Draft[] = [
  { id: 1, type: "video", title: "Jakarta Concert BTS", excerpt: "Behind the scenes footage from Jakarta leg of Rumpang World Tour...", updated: "2h ago", thumb: "https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=200&h=120&fit=crop" },
  { id: 2, type: "audio", title: "Unreleased Demo — Senja Ini", excerpt: "Raw vocal demo, verse 1 complete, chorus still WIP", updated: "Yesterday" },
  { id: 3, type: "post", title: "Tour Diary — Bandung Night", excerpt: "Last night in Bandung was absolutely magical. 15,000 fans singing back every word...", updated: "3 days ago" },
]

const SCHEDULED: Scheduled[] = [
  { id: 1, type: "post", title: "Album announcement — Rumpang", scheduledFor: "Aug 1, 2026 · 09:00 WIB", platform: ["Feed", "Story"] },
  { id: 2, type: "video", title: "Studio Session Vlog #3", scheduledFor: "Aug 5, 2026 · 18:00 WIB", platform: ["Feed"] },
  { id: 3, type: "audio", title: "Demo Preview — Members Only", scheduledFor: "Aug 8, 2026 · 12:00 WIB", platform: ["Members"] },
]

const AI_SUGGESTIONS = [
  { emoji: "📅", tip: "Best time to post: Weekdays 18:00–20:00 WIB (peak engagement)" },
  { emoji: "🎯", tip: "Your audience responds best to personal, behind-the-scenes content" },
  { emoji: "📈", tip: "Posting 4–5x per week increases reach by 38% based on your data" },
  { emoji: "🎵", tip: "Audio content gets 2.4× more saves than image posts for music artists" },
  { emoji: "✍️", tip: "Include a question in your caption to boost comment rate by 67%" },
]

const CALENDAR_WEEKS = [
  ["28", "29", "30", "31", "1", "2", "3"],
  ["4", "5", "6", "7", "8", "9", "10"],
  ["11", "12", "13", "14", "15", "16", "17"],
  ["18", "19", "20", "21", "22", "23", "24"],
]

const EVENTS_ON: Record<string, string[]> = {
  "1": ["post"], "5": ["video"], "8": ["audio"], "12": ["post", "video"]
}

const TYPE_COLORS: Record<PostType, string> = { post: "#3D5898", video: "#7C3AED", audio: "#EF4444", story: "#F59E0B" }
const TYPE_ICONS: Record<PostType, string> = { post: "📝", video: "🎬", audio: "🎵", story: "⚡" }

function fmt(n: number) { return n.toLocaleString() }

export default function CreatorStudio() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<StudioTab>("home")
  const [drafts, setDrafts] = useState(DRAFTS)
  const [scheduled, setScheduled] = useState(SCHEDULED)
  const [publishing, setPublishing] = useState<number | null>(null)
  const [published, setPublished] = useState<Set<number>>(new Set())
  const [composing, setComposing] = useState(false)
  const [composeText, setComposeText] = useState("")
  const [postType, setPostType] = useState<PostType>("post")
  const [posting, setPosting] = useState(false)

  function handlePublish(id: number) {
    setPublishing(id)
    setTimeout(() => {
      setPublishing(null)
      setPublished((prev) => new Set([...prev, id]))
      setDrafts((prev) => prev.filter((d) => d.id !== id))
    }, 1800)
  }

  function handlePost() {
    if (!composeText.trim()) return
    setPosting(true)
    setTimeout(() => { setPosting(false); setComposing(false); setComposeText("") }, 1500)
  }

  const tabs: { key: StudioTab; label: string; icon: string }[] = [
    { key: "home", label: "Home", icon: "🏠" },
    { key: "drafts", label: "Drafts", icon: "📝" },
    { key: "scheduled", label: "Scheduled", icon: "⏰" },
    { key: "calendar", label: "Calendar", icon: "📅" },
    { key: "analytics", label: "Analytics", icon: "📊" },
  ]

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="bg-white px-5 pt-12 pb-0 shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-[#F4F5F9] flex items-center justify-center active:scale-95 transition-transform">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </button>
          <div className="flex-1">
            <p className="text-[#1E2D5A] font-extrabold text-lg">Creator Studio</p>
            <p className="text-[#9BAACE] text-xs">Your content workspace</p>
          </div>
          <button onClick={() => navigate("/artist/upload")} className="px-4 py-2 rounded-full bg-[#3D5898] text-white text-xs font-bold active:scale-95 transition-transform">+ Upload</button>
        </div>
        <div className="flex border-b border-[#F4F5F9] overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {tabs.map(({ key, label, icon }) => (
            <button key={key} onClick={() => setTab(key)} className={`flex-none flex items-center gap-1.5 px-4 py-3 text-xs font-bold border-b-2 transition-colors ${tab === key ? "text-[#3D5898] border-[#3D5898]" : "text-[#9BAACE] border-transparent"}`}>
              <span>{icon}</span>{label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-8">
        {/* HOME */}
        {tab === "home" && (
          <div className="px-4 pt-4 space-y-4">
            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              {[{ label: "Posts", value: fmt(42) }, { label: "Reach", value: "2.8M" }, { label: "Engagement", value: "6.4%" }].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-3 shadow-sm text-center">
                  <p className="text-[#1E2D5A] font-extrabold text-base">{s.value}</p>
                  <p className="text-[#9BAACE] text-xs">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Compose */}
            {composing ? (
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  {(["post", "video", "audio", "story"] as PostType[]).map((t) => (
                    <button key={t} onClick={() => setPostType(t)} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${postType === t ? "text-white" : "bg-[#F4F5F9] text-[#7A8BB5]"}`} style={{ background: postType === t ? TYPE_COLORS[t] : undefined }}>
                      {TYPE_ICONS[t]} {t}
                    </button>
                  ))}
                </div>
                <textarea value={composeText} onChange={(e) => setComposeText(e.target.value)} placeholder="What's on your mind? Share with your fans..." rows={4} className="w-full text-sm text-[#1E2D5A] outline-none resize-none bg-[#F4F5F9] rounded-xl p-3 placeholder:text-[#C8D0E8]" />
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => setComposing(false)} className="flex-1 py-2.5 rounded-full border-2 border-[#C8D0E8] text-[#7A8BB5] text-xs font-bold active:scale-95">Cancel</button>
                  <button onClick={handlePost} disabled={!composeText.trim() || posting} className="flex-1 py-2.5 rounded-full bg-[#3D5898] text-white text-xs font-bold active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2">
                    {posting ? <div className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" /> : null}
                    {posting ? "Publishing..." : "Publish Now"}
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={() => setComposing(true)} className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 text-left active:scale-[0.98] transition-transform">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop" alt="" className="w-10 h-10 rounded-full object-cover flex-none" />
                <p className="text-[#C8D0E8] text-sm flex-1">Share something with your fans...</p>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="#C8D0E8" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            )}

            {/* Drafts preview */}
            {drafts.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[#1E2D5A] font-bold text-sm">Drafts ({drafts.length})</p>
                  <button onClick={() => setTab("drafts")} className="text-[#3D5898] text-xs font-bold">See all</button>
                </div>
                {drafts.slice(0, 2).map((d) => (
                  <div key={d.id} className="bg-white rounded-2xl p-3 shadow-sm flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-none" style={{ background: TYPE_COLORS[d.type] + "20" }}>
                      <span className="text-sm">{TYPE_ICONS[d.type]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#1E2D5A] font-bold text-xs truncate">{d.title}</p>
                      <p className="text-[#9BAACE] text-[10px]">Edited {d.updated}</p>
                    </div>
                    <button onClick={() => handlePublish(d.id)} disabled={publishing === d.id} className="px-3 py-1.5 rounded-full bg-[#3D5898] text-white text-xs font-bold active:scale-95 flex items-center gap-1.5 disabled:opacity-70">
                      {publishing === d.id ? <div className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" /> : "Publish"}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* AI Suggestions */}
            <div className="bg-gradient-to-br from-[#3D5898] to-[#1E2D5A] rounded-2xl p-4">
              <p className="text-white font-bold text-sm mb-3">🤖 AI Suggestions</p>
              <div className="space-y-2">
                {AI_SUGGESTIONS.slice(0, 3).map((s, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-white/80">
                    <span>{s.emoji}</span><p>{s.tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DRAFTS */}
        {tab === "drafts" && (
          <div className="px-4 pt-4 space-y-3">
            {drafts.length === 0 ? (
              <div className="flex flex-col items-center py-20 gap-3">
                <span className="text-5xl">📝</span>
                <p className="text-[#1E2D5A] font-bold">No drafts</p>
                <p className="text-[#9BAACE] text-sm">Your saved drafts will appear here</p>
              </div>
            ) : drafts.map((d) => (
              <div key={d.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                {d.thumb && <img src={d.thumb} alt="" className="w-full h-28 object-cover" />}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: TYPE_COLORS[d.type] }}>{TYPE_ICONS[d.type]} {d.type}</span>
                    <span className="text-[#9BAACE] text-xs">Edited {d.updated}</span>
                  </div>
                  <p className="text-[#1E2D5A] font-bold text-sm">{d.title}</p>
                  <p className="text-[#7A8BB5] text-xs mt-1 line-clamp-2">{d.excerpt}</p>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 py-2 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] text-xs font-bold active:scale-95">Edit</button>
                    <button onClick={() => handlePublish(d.id)} disabled={publishing === d.id || published.has(d.id)} className="flex-1 py-2 rounded-full bg-[#3D5898] text-white text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-60">
                      {publishing === d.id ? <div className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" /> : published.has(d.id) ? "✓ Published" : "Publish"}
                    </button>
                    <button onClick={() => setDrafts((prev) => prev.filter((x) => x.id !== d.id))} className="w-9 h-9 rounded-full border-2 border-red-100 text-red-400 flex items-center justify-center active:scale-95">
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SCHEDULED */}
        {tab === "scheduled" && (
          <div className="px-4 pt-4 space-y-3">
            {scheduled.length === 0 ? (
              <div className="flex flex-col items-center py-20 gap-3">
                <span className="text-5xl">⏰</span>
                <p className="text-[#1E2D5A] font-bold">No scheduled posts</p>
              </div>
            ) : scheduled.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-none" style={{ background: TYPE_COLORS[s.type] + "20" }}>
                    <span className="text-base">{TYPE_ICONS[s.type]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[#1E2D5A] font-bold text-sm">{s.title}</p>
                    <p className="text-[#9BAACE] text-xs mt-0.5">📅 {s.scheduledFor}</p>
                    <div className="flex gap-1.5 mt-2">
                      {s.platform.map((p) => (
                        <span key={p} className="bg-[#3D5898]/8 text-[#3D5898] text-[10px] font-bold px-2 py-0.5 rounded-full">{p}</span>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setScheduled((prev) => prev.filter((x) => x.id !== s.id))} className="text-[#C8D0E8] active:scale-95">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CALENDAR */}
        {tab === "calendar" && (
          <div className="px-4 pt-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[#1E2D5A] font-extrabold text-sm">August 2026</p>
                <div className="flex gap-1">
                  <button className="w-7 h-7 rounded-full bg-[#F4F5F9] flex items-center justify-center"><svg width="12" height="12" fill="none" stroke="#7A8BB5" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button>
                  <button className="w-7 h-7 rounded-full bg-[#F4F5F9] flex items-center justify-center"><svg width="12" height="12" fill="none" stroke="#7A8BB5" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg></button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <p key={i} className="text-center text-[9px] font-bold text-[#9BAACE]">{d}</p>)}
              </div>
              {CALENDAR_WEEKS.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
                  {week.map((day, di) => {
                    const events = EVENTS_ON[day] || []
                    const isToday = day === "28"
                    return (
                      <div key={di} className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-colors cursor-pointer hover:bg-[#F4F5F9] ${isToday ? "bg-[#3D5898] text-white" : "text-[#1E2D5A]"}`}>
                        {day}
                        {events.length > 0 && (
                          <div className="flex gap-0.5 mt-0.5">
                            {events.slice(0, 2).map((e, i) => <div key={i} className="w-1 h-1 rounded-full" style={{ background: isToday ? "white" : TYPE_COLORS[e as PostType] }} />)}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-[#1E2D5A] font-bold text-sm mb-3">Upcoming Posts</p>
              {scheduled.map((s) => (
                <div key={s.id} className="flex items-center gap-3 py-2 border-b border-[#F4F5F9] last:border-0">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: TYPE_COLORS[s.type] + "20" }}>
                    <span className="text-sm">{TYPE_ICONS[s.type]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[#1E2D5A] font-bold text-xs">{s.title}</p>
                    <p className="text-[#9BAACE] text-[10px]">{s.scheduledFor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANALYTICS */}
        {tab === "analytics" && (
          <div className="px-4 pt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[{ label: "Total Reach", value: "2.8M", change: "+18%", up: true }, { label: "Impressions", value: "8.4M", change: "+24%", up: true }, { label: "Profile Visits", value: "142K", change: "+9%", up: true }, { label: "Link Clicks", value: "18.2K", change: "-3%", up: false }].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm">
                  <p className="text-[#9BAACE] text-xs mb-1">{s.label}</p>
                  <p className="text-[#1E2D5A] font-extrabold text-xl">{s.value}</p>
                  <p className={`text-xs font-bold mt-0.5 ${s.up ? "text-green-600" : "text-red-500"}`}>{s.change} vs last week</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-[#1E2D5A] font-bold text-sm mb-3">Top Performing Content</p>
              {[{ title: "Jakarta BTS Vlog", type: "video", reach: "1.2M", eng: "8.4%" }, { title: "New song announcement", type: "post", reach: "890K", eng: "6.2%" }, { title: "Studio session clips", type: "story", reach: "450K", eng: "12.1%" }].map((c, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-[#F4F5F9] last:border-0">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: TYPE_COLORS[c.type as PostType] + "20" }}>
                    <span className="text-sm">{TYPE_ICONS[c.type as PostType]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#1E2D5A] font-bold text-xs truncate">{c.title}</p>
                    <p className="text-[#9BAACE] text-[10px]">{c.reach} reach · {c.eng} engagement</p>
                  </div>
                </div>
              ))}
            </div>
            {/* AI suggestions in analytics */}
            <div className="bg-[#F4F5F9] rounded-2xl p-4">
              <p className="text-[#1E2D5A] font-bold text-sm mb-3">🤖 AI Growth Tips</p>
              {AI_SUGGESTIONS.map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#7A8BB5] py-2 border-b border-white last:border-0">
                  <span>{s.emoji}</span><p>{s.tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
