import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import nadinAmizah from "@/imports/nadin_amizah.jpg"
import bernadya from "@/imports/bernadya.jpg"
import tiaraAndhini from "@/imports/tiara_andhini.jpg"
import ariIrham from "@/imports/ari_irham.jpg"
import raisa from "@/imports/raisa.jpg"

// --- Data ---
const followedArtists = [
  { id: 1, name: "Nadin Amizah", role: "Singer", img: nadinAmizah, hasNew: true },
  { id: 2, name: "Bernadya", role: "Singer", img: bernadya, hasNew: true },
  { id: 3, name: "Tiara Andini", role: "Singer", img: tiaraAndhini, hasNew: false },
  { id: 4, name: "Ari Irham", role: "Actor", img: ariIrham, hasNew: true },
  { id: 5, name: "Raisa", role: "Singer", img: raisa, hasNew: false },
]

const feedPosts = [
  {
    id: 1,
    artistId: 1,
    artistName: "Nadin Amizah",
    artistImg: nadinAmizah,
    time: "2 hours ago",
    text: "New single dropping this Friday 🎵 Can't wait for you all to hear it. It's been months in the making.",
    postImg: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop&auto=format",
    likes: 4821,
    comments: 312,
    type: "post",
  },
  {
    id: 2,
    artistId: 2,
    artistName: "Bernadya",
    artistImg: bernadya,
    time: "5 hours ago",
    text: "Behind the scenes from the album shoot 📸 So grateful for this amazing team.",
    postImg: "https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=800&h=500&fit=crop&auto=format",
    likes: 7203,
    comments: 498,
    type: "post",
  },
  {
    id: 3,
    artistId: 4,
    artistName: "Ari Irham",
    artistImg: ariIrham,
    time: "1 day ago",
    text: "First day on set for the new project 🎬 Been rehearsing this scene for weeks. Let's go!",
    postImg: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=500&fit=crop&auto=format",
    likes: 5910,
    comments: 241,
    type: "post",
  },
]

const shopItems = [
  { id: 1, name: "Nadin Amizah Tour Tee", price: "Rp 185.000", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&auto=format", artist: "Nadin Amizah" },
  { id: 2, name: "Bernadya Photo Book Vol.1", price: "Rp 320.000", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&auto=format", artist: "Bernadya" },
  { id: 3, name: "Katsera Limited Hoodie", price: "Rp 450.000", img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=400&fit=crop&auto=format", artist: "Katsera" },
  { id: 4, name: "Tiara Andini Lightstick", price: "Rp 210.000", img: "https://images.unsplash.com/photo-1549298222-1c31e8915347?w=400&h=400&fit=crop&auto=format", artist: "Tiara Andini" },
]

const liveChannels = [
  { id: 1, name: "Nadin Amizah", label: "LIVE", viewers: "12.4K", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop&auto=format", artistImg: nadinAmizah },
  { id: 2, name: "Bernadya", label: "LIVE", viewers: "8.1K", img: "https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=600&h=400&fit=crop&auto=format", artistImg: bernadya },
  { id: 3, name: "Ari Irham", label: "Soon", viewers: "—", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop&auto=format", artistImg: ariIrham },
]

const painterPosts = [
  { id: 101, artistName: "Andi Wijaya", artistImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop", time: "1h ago", text: "New painting just finished — 'Midnight Bloom'. Acrylic on canvas, 80×100cm. DM for pricing 🎨", postImg: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=500&fit=crop", likes: 1842, comments: 94 },
  { id: 102, artistName: "Sinta Dewi", artistImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop", time: "3h ago", text: "Work in progress 🖌️ This piece has been challenging me in the best way. More soon.", postImg: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&h=500&fit=crop", likes: 3120, comments: 207 },
  { id: 103, artistName: "Reza Pratama", artistImg: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop", time: "Yesterday", text: "Behind the scenes of my latest workshop in Bandung. 18 students, beautiful energy ✨", postImg: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=500&fit=crop", likes: 2405, comments: 118 },
]

const painterFeedSections = [
  { label: "New Paintings", icon: "🖼️" },
  { label: "Work in Progress", icon: "🎨" },
  { label: "Tutorials", icon: "📹" },
  { label: "Studio Process", icon: "🏠" },
  { label: "Gallery", icon: "🖌️" },
  { label: "Workshops", icon: "📅" },
  { label: "Art Collections", icon: "🗂️" },
  { label: "Commissions", icon: "💼" },
  { label: "Premium Tutorials", icon: "⭐" },
  { label: "Artwork Store", icon: "🛒" },
]

const musicFeedSections = [
  { label: "Daily Life", icon: "📸" },
  { label: "Studio Updates", icon: "🎙️" },
  { label: "Songwriting", icon: "✍️" },
  { label: "Demo Songs", icon: "🎵" },
  { label: "Album Progress", icon: "💿" },
  { label: "Concerts", icon: "🎤" },
  { label: "Fan Community", icon: "👥" },
  { label: "Music Videos", icon: "📺" },
  { label: "Member Songs", icon: "🔒" },
  { label: "Merchandise", icon: "👕" },
]

// --- Icons ---
function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "#3D5898" : "none"} stroke={active ? "#3D5898" : "#9BAACE"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}
function ShopIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "#3D5898" : "none"} stroke={active ? "#3D5898" : "#9BAACE"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  )
}
function ChannelIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "#3D5898" : "none"} stroke={active ? "#3D5898" : "#9BAACE"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polygon fill={active ? "#3D5898" : "#9BAACE"} points="10 8 16 12 10 16 10 8"/>
    </svg>
  )
}
function MoreIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#3D5898" : "#9BAACE"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="1" fill={active ? "#3D5898" : "#9BAACE"}/>
      <circle cx="12" cy="12" r="1" fill={active ? "#3D5898" : "#9BAACE"}/>
      <circle cx="12" cy="19" r="1" fill={active ? "#3D5898" : "#9BAACE"}/>
    </svg>
  )
}

// --- Home Tab ---
const feedTabs = ["ALL", "POST", "LIVE", "MEDIA", "NOTICE", "SHOP"]

function HomeTab({ onArtistClick }: { onArtistClick: (id: number) => void }) {
  const navigate = useNavigate()
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set())
  const [feedTab, setFeedTab] = useState("ALL")
  const [commentPost, setCommentPost] = useState<number | null>(null)
  const [commentText, setCommentText] = useState("")
  const [creatorCat, setCreatorCat] = useState<"music" | "painter">(() => {
    return (localStorage.getItem("fanCreatorCat") as "music" | "painter") ?? "music"
  })

  useEffect(() => {
    localStorage.setItem("fanCreatorCat", creatorCat)
  }, [creatorCat])

  const isPainter = creatorCat === "painter"
  const displayedPosts = isPainter ? painterPosts : feedPosts
  const feedSections = isPainter ? painterFeedSections : musicFeedSections

  return (
    <div className="flex-1 overflow-y-auto pb-24">
      {/* ── Category switcher ── */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <p className="text-[#7A8BB5] text-xs font-semibold leading-relaxed max-w-[55%]">
          {isPainter ? "Discover art, workshops & galleries" : "Be on the internet — your favorite artist is human too."}
        </p>
        <div className="flex bg-[#E0E5F2] rounded-full p-0.5">
          <button onClick={() => setCreatorCat("music")} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-extrabold transition-all ${!isPainter ? "bg-white text-[#3D5898] shadow-sm" : "text-[#9BAACE]"}`}>
            🎵 Music
          </button>
          <button onClick={() => setCreatorCat("painter")} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-extrabold transition-all ${isPainter ? "bg-white text-[#3D5898] shadow-sm" : "text-[#9BAACE]"}`}>
            🎨 Art
          </button>
        </div>
      </div>

      {/* Content sections chips */}
      <div className="flex gap-2 px-5 mb-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {feedSections.map(({ label, icon }) => {
          const dest = label.toLowerCase().includes("concert") || label.toLowerCase().includes("workshop") || label.toLowerCase().includes("event")
            ? `/events/list`
            : label.toLowerCase().includes("demo") || label.toLowerCase().includes("member") || label.toLowerCase().includes("premium") || label.toLowerCase().includes("tutorial")
            ? `/fan/membership/content`
            : label.toLowerCase().includes("store") || label.toLowerCase().includes("merchandise")
            ? `/fan/shop`
            : label.toLowerCase().includes("gallery") || label.toLowerCase().includes("collection")
            ? `/fan/channel`
            : null
          return (
            <button key={label} onClick={() => dest && navigate(dest, { state: { creatorCategory: creatorCat } })} className="flex-none flex items-center gap-1.5 bg-white text-[#7A8BB5] text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform hover:text-[#3D5898]">
              <span>{icon}</span>{label}
            </button>
          )
        })}
      </div>

      {/* Live hero — dynamic per category */}
      <div className="relative mx-5 rounded-2xl overflow-hidden h-52 mb-4 cursor-pointer" onClick={() => isPainter ? navigate("/painter/community") : onArtistClick(1)}>
        <img src={isPainter ? "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop" : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=400&fit=crop"} alt="Live" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E2D5A]/90 via-[#1E2D5A]/30 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-red-500 rounded-full px-2.5 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-white text-[10px] font-extrabold">{isPainter ? "Live Painting" : "Live"}</span>
          </div>
          <div className="bg-black/40 rounded-full px-2 py-1 flex items-center gap-1">
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2"/><circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
            <span className="text-white text-[10px] font-bold">{isPainter ? "4.2K watching" : "members · 6 joined"}</span>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-white font-extrabold text-lg uppercase tracking-wide leading-tight">{isPainter ? "ANDI WIJAYA" : "NADIN AMIZAH"}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="white" strokeWidth="2"/></svg>
            <span className="text-white/80 text-xs font-semibold">{isPainter ? "Painting Midnight Bloom — Episode 3" : "Nadin's Space"}</span>
          </div>
        </div>
      </div>

      {/* Content tabs */}
      <div className="flex gap-0 px-5 mb-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {feedTabs.map((t) => (
          <button
            key={t}
            onClick={() => setFeedTab(t)}
            className={`flex-none px-4 py-2 text-xs font-extrabold transition-all border-b-2 ${feedTab === t ? "text-[#3D5898] border-[#3D5898]" : "text-[#7A8BB5] border-transparent"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab-specific content */}
      {feedTab === "LIVE" && (
        <div className="px-4 space-y-3 mb-4">
          {liveChannels.map((ch) => (
            <button key={ch.id} onClick={() => navigate(`/fan/channel/${ch.id}`)} className="w-full bg-white rounded-2xl overflow-hidden shadow-sm text-left active:scale-[0.98] transition-transform">
              <div className="relative h-40">
                <img src={ch.img} alt={ch.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${ch.label === "LIVE" ? "bg-red-500 text-white" : "bg-[#E0E5F2] text-[#3D5898]"}`}>{ch.label}</span>
                {ch.viewers !== "—" && <span className="absolute top-3 right-3 text-white text-xs font-bold bg-black/40 px-2 py-0.5 rounded-full">{ch.viewers} watching</span>}
              </div>
              <div className="p-3 flex items-center gap-2">
                <img src={ch.artistImg} alt={ch.name} className="w-8 h-8 rounded-full object-cover flex-none" />
                <p className="text-[#1E2D5A] font-bold text-sm">{ch.name}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {feedTab === "SHOP" && (
        <div className="px-4 grid grid-cols-2 gap-3 mb-4">
          {shopItems.map((item) => (
            <button key={item.id} onClick={() => navigate(`/fan/shop/product/${item.id}`)} className="bg-white rounded-2xl overflow-hidden shadow-sm text-left active:scale-95 transition-transform">
              <div className="h-32"><img src={item.img} alt={item.name} className="w-full h-full object-cover" /></div>
              <div className="p-2.5">
                <p className="text-[#9BAACE] text-[10px] mb-0.5">{item.artist}</p>
                <p className="text-[#1E2D5A] font-bold text-xs leading-tight mb-1">{item.name}</p>
                <p className="text-[#3D5898] font-extrabold text-xs">{item.price}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {feedTab === "MEDIA" && (
        <div className="px-4 grid grid-cols-3 gap-1 mb-4">
          {["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop","https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop","https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop","https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=300&h=300&fit=crop","https://images.unsplash.com/photo-1501386761578-eaa54b08e8d1?w=300&h=300&fit=crop","https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop"].map((src, i) => (
            <button key={i} onClick={() => navigate("/fan/media")} className="aspect-square overflow-hidden active:scale-95 transition-transform">
              <img src={src} alt="Media" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {feedTab === "NOTICE" && (
        <div className="px-4 space-y-3 mb-4">
          {[{t:"Tour Dates Announced",b:"Rumpang World Tour 2026 dates are now live! Get your tickets before they sell out.",d:"Jul 20",imp:true},{t:"Fan Meet & Greet — Jakarta",b:"A special fan meeting event this August in Jakarta. Limited slots.",d:"Jul 15",imp:false},{t:"New Album Coming",b:"Mark your calendars — the new album drops September 12. Pre-save now.",d:"Jul 10",imp:true}].map((n,i)=>(
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  {n.imp && <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">Important</span>}
                  <p className="text-[#1E2D5A] font-bold text-sm">{n.t}</p>
                </div>
                <p className="text-[#9BAACE] text-xs">{n.d}</p>
              </div>
              <p className="text-[#7A8BB5] text-sm">{n.b}</p>
            </div>
          ))}
        </div>
      )}

      {/* Feed (ALL and POST tabs) */}
      {(feedTab === "ALL" || feedTab === "POST") && (
      <div className="px-4 space-y-4">
        {displayedPosts.map((post) => {
          const isLiked = liked.has(post.id)
          return (
            <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 p-4">
                <button onClick={() => (post as { artistId?: number }).artistId && onArtistClick((post as { artistId?: number }).artistId!)}>
                  <img src={post.artistImg} alt={post.artistName} className="w-10 h-10 rounded-full object-cover" />
                </button>
                <div className="flex-1">
                  <p className="text-[#1E2D5A] font-extrabold text-sm">{post.artistName}</p>
                </div>
                <p className="text-[#9BAACE] text-xs">{post.time}</p>
              </div>
              {post.postImg && (
                <img src={post.postImg} alt="Post" className="w-full object-cover" style={{ maxHeight: 200 }} />
              )}
              <div className="px-4 py-3">
                <p className="text-[#1E2D5A] text-sm leading-relaxed">{post.text}</p>
              </div>
              <div className="flex items-center gap-5 px-4 py-3 border-t border-[#F0F2F8]">
                <button
                  onClick={() => { const next = new Set(liked); isLiked ? next.delete(post.id) : next.add(post.id); setLiked(next) }}
                  className="flex items-center gap-1.5 active:scale-90 transition-transform"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={isLiked ? "#E05A3A" : "none"} stroke={isLiked ? "#E05A3A" : "#9BAACE"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  <span className={`text-xs font-semibold ${isLiked ? "text-[#E05A3A]" : "text-[#9BAACE]"}`}>{(post.likes + (isLiked ? 1 : 0)).toLocaleString()}</span>
                </button>
                <button onClick={() => setCommentPost(post.id)} className="flex items-center gap-1.5 active:scale-90 transition-transform">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9BAACE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  <span className="text-xs font-semibold text-[#9BAACE]">{post.comments}</span>
                </button>
                <button onClick={() => { if (navigator.share) { navigator.share({ title: post.artistName, text: post.text, url: window.location.href }).catch(() => {}) } }} className="flex items-center gap-1.5 active:scale-90 transition-transform">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9BAACE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                </button>
                <button onClick={() => { const next = new Set(bookmarked); bookmarked.has(post.id) ? next.delete(post.id) : next.add(post.id); setBookmarked(next) }} className="ml-auto active:scale-90 transition-transform">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={bookmarked.has(post.id) ? "#3D5898" : "none"} stroke={bookmarked.has(post.id) ? "#3D5898" : "#9BAACE"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                </button>
              </div>
            </div>
          )
        })}
      </div>
      )}

      {/* Comment modal */}
      {commentPost !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setCommentPost(null)}>
          <div className="bg-white w-full max-w-md rounded-t-3xl p-5" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full bg-[#E0E5F2] mx-auto mb-4" />
            <p className="font-extrabold text-[#1E2D5A] text-base mb-4">Leave a comment</p>
            <div className="flex gap-3">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" alt="" className="w-9 h-9 rounded-full object-cover flex-none" />
              <div className="flex-1 bg-[#F4F5F9] rounded-2xl px-4 py-2.5 flex items-center gap-2">
                <input autoFocus value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write something…" className="flex-1 bg-transparent text-sm text-[#1E2D5A] font-semibold outline-none placeholder:text-[#C8D0E8]" onKeyDown={(e) => { if (e.key === "Enter" && commentText.trim()) { setCommentPost(null); setCommentText("") } }} />
                <button onClick={() => { if (commentText.trim()) { setCommentPost(null); setCommentText("") } }} className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${commentText.trim() ? "bg-[#3D5898]" : "bg-[#C8D0E8]"}`}>
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
            <p className="text-xs text-[#9BAACE] text-center mt-3">Press Enter or tap send to post</p>
          </div>
        </div>
      )}
    </div>
  )
}

// --- Shop Tab ---
function ShopTab({ onNavigate }: { onNavigate: (path: string, opts?: object) => void }) {
  return (
    <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4 space-y-4">
      {/* Banner */}
      <button onClick={() => onNavigate("/fan/shop")} className="relative rounded-2xl overflow-hidden h-36 w-full active:scale-95 transition-transform">
        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop&auto=format" alt="Shop banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#3D5898]/60 flex items-center justify-center">
          <p className="text-white font-extrabold text-xl text-center">Official Merchandise<br/><span className="text-sm font-medium opacity-80">From your favorite artists</span></p>
        </div>
      </button>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onNavigate("/fan/shop")} className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm active:scale-95 transition-transform">
          <span className="text-2xl">🛍️</span>
          <span className="text-xs font-bold text-[#1E2D5A]">My Artist Shop</span>
        </button>
        <button onClick={() => onNavigate("/events/marketplace")} className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm active:scale-95 transition-transform">
          <span className="text-2xl">🎫</span>
          <span className="text-xs font-bold text-[#1E2D5A]">Concert Tickets</span>
        </button>
        <button onClick={() => onNavigate("/fan/membership")} className="bg-gradient-to-br from-[#3D5898] to-[#2D4270] rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm active:scale-95 transition-transform">
          <span className="text-2xl">⭐</span>
          <span className="text-xs font-bold text-white">Membership</span>
        </button>
        <button onClick={() => onNavigate("/fan/shop")} className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm active:scale-95 transition-transform">
          <span className="text-2xl">🔥</span>
          <span className="text-xs font-bold text-[#1E2D5A]">Trendy</span>
        </button>
      </div>

      <h3 className="text-[#1E2D5A] font-extrabold text-base">Trending Now</h3>
      <div className="grid grid-cols-2 gap-3">
        {shopItems.map((item) => (
          <button key={item.id} onClick={() => onNavigate(`/fan/shop/product/${item.id}`)} className="bg-white rounded-2xl overflow-hidden shadow-sm active:scale-95 transition-transform text-left">
            <div className="h-36 bg-[#F4F5F9]">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <p className="text-[#9BAACE] text-xs mb-0.5">{item.artist}</p>
              <p className="text-[#1E2D5A] font-bold text-sm leading-tight mb-1">{item.name}</p>
              <p className="text-[#3D5898] font-extrabold text-sm">{item.price}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// --- Channel Tab ---
function ChannelTab({ onNavigate }: { onNavigate: (path: string, opts?: object) => void }) {
  return (
    <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[#1E2D5A] font-extrabold text-base">Live Now</h3>
        <button onClick={() => onNavigate("/fan/channel")} className="text-xs text-[#3D5898] font-bold">Lihat semua</button>
      </div>
      {liveChannels.map((ch) => (
        <button key={ch.id} onClick={() => onNavigate(`/fan/channel/${ch.id}`)} className="w-full bg-white rounded-2xl overflow-hidden shadow-sm active:scale-95 transition-transform text-left">
          <div className="relative h-44">
            <img src={ch.img} alt={ch.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ch.label === "LIVE" ? "bg-red-500 text-white" : "bg-[#E0E5F2] text-[#3D5898]"}`}>
                {ch.label}
              </span>
              {ch.viewers !== "—" && (
                <span className="bg-black/40 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                  {ch.viewers} watching
                </span>
              )}
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <img src={ch.artistImg} alt={ch.name} className="w-8 h-8 rounded-full object-cover border-2 border-white" />
              <p className="text-white font-bold text-sm">{ch.name}</p>
            </div>
          </div>
        </button>
      ))}
      <button
        onClick={() => onNavigate("/fan/channel")}
        className="w-full py-3 rounded-full border-2 border-[#3D5898] text-[#3D5898] font-bold text-sm active:scale-95 transition-all"
      >
        Explore All Channels
      </button>
    </div>
  )
}

// --- More Tab ---
function MoreTab() {
  const navigate = useNavigate()
  const menuItems = [
    { icon: "👤", label: "My Profile", path: "/fan/more" },
    { icon: "❤️", label: "My Favorites", path: "/fan/more" },
    { icon: "🎟️", label: "Event Tickets", path: "/events/list" },
    { icon: "🔔", label: "Notifications", path: "/fan/more" },
    { icon: "⚙️", label: "Settings", path: "/fan/profile" },
    { icon: "❓", label: "Help & Support", path: "/fan/more" },
  ]
  return (
    <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
      <div className="bg-[#3D5898] rounded-2xl p-5 flex items-center gap-4 mb-6">
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&auto=format" alt="Profile" className="w-16 h-16 rounded-full object-cover border-3 border-white" />
        <div>
          <p className="text-white font-extrabold text-lg">Martin Cortis</p>
          <p className="text-white/70 text-sm">Fan since 2024</p>
          <p className="text-white/60 text-xs mt-0.5">Following {followedArtists.length} artists</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm divide-y divide-[#F0F2F8]">
        {menuItems.map((item) => (
          <button key={item.label} onClick={() => navigate(item.path)} className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#F4F5F9] active:bg-[#E8E8E8] transition-colors text-left">
            <span className="text-xl">{item.icon}</span>
            <span className="text-[#1E2D5A] font-semibold text-sm flex-1">{item.label}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9BAACE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        ))}
      </div>
      <button onClick={() => navigate("/role")} className="w-full mt-4 py-3.5 rounded-2xl border-2 border-red-200 text-red-500 font-bold text-sm hover:bg-red-50 active:scale-95 transition-all">Log out</button>
    </div>
  )
}

// --- Main Dashboard ---
export default function FanDashboard() {
  const [tab, setTab] = useState<"home" | "shop" | "channel" | "more">("home")
  const [showSearch, setShowSearch] = useState(false)
  const [searchQ, setSearchQ] = useState("")
  const navigate = useNavigate()

  const handleArtistClick = (id: number) => {
    navigate(`/fan/artist/${id}`)
  }

  const tabs = [
    { key: "home", label: "Home", Icon: HomeIcon },
    { key: "shop", label: "Shop", Icon: ShopIcon },
    { key: "channel", label: "Channel", Icon: ChannelIcon },
    { key: "more", label: "More", Icon: MoreIcon },
  ] as const

  return (
    <div className="h-screen bg-[#F4F5F9] flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Search overlay */}
      {showSearch && (
        <div className="absolute inset-0 bg-white z-50 flex flex-col">
          <div className="flex items-center gap-3 px-4 pt-12 pb-3 border-b border-[#F0F2F8]">
            <div className="flex-1 bg-[#F4F5F9] rounded-full flex items-center gap-3 px-4 py-2.5">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="#9BAACE" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="#9BAACE" strokeWidth="2" strokeLinecap="round"/></svg>
              <input autoFocus value={searchQ} onChange={(e) => setSearchQ(e.target.value)} placeholder="Search artists, songs, concerts…" className="flex-1 bg-transparent text-[#1E2D5A] text-sm font-semibold outline-none placeholder:text-[#C8D0E8]" />
            </div>
            <button onClick={() => { setShowSearch(false); setSearchQ("") }} className="text-[#3D5898] font-bold text-sm">Cancel</button>
          </div>
          {searchQ ? (
            <div className="flex-1 px-4 pt-4 space-y-2 overflow-y-auto">
              {followedArtists.filter((a) => a.name.toLowerCase().includes(searchQ.toLowerCase())).map((a) => (
                <button key={a.id} onClick={() => { setShowSearch(false); navigate(`/fan/artist/${a.id}`) }} className="w-full flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm">
                  <img src={a.img} alt={a.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="text-left"><p className="font-bold text-[#1E2D5A] text-sm">{a.name}</p><p className="text-[#9BAACE] text-xs">{a.role}</p></div>
                </button>
              ))}
              {followedArtists.filter((a) => a.name.toLowerCase().includes(searchQ.toLowerCase())).length === 0 && (
                <div className="text-center py-12 text-[#9BAACE] text-sm font-semibold">No results for "{searchQ}"</div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-[#C8D0E8]">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <p className="text-sm font-semibold">Search for your favorite artists</p>
            </div>
          )}
        </div>
      )}
      {/* Top bar */}
      <div className="bg-white px-5 pt-5 pb-4 flex items-center justify-between flex-shrink-0 border-b border-[#F0F2F8]">
        <div className="flex items-center gap-2">
          <svg width="28" height="32" viewBox="0 0 60 69" fill="none">
            <path d="M10 8 L10 61" stroke="#3D5898" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 34 L48 10" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 34 L48 60" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[#3D5898] font-extrabold text-lg">Katsera</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowSearch(true)} className="w-9 h-9 rounded-full bg-[#F4F5F9] flex items-center justify-center active:scale-95 transition-transform">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D5898" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
          <button onClick={() => navigate("/fan/more")} className="w-9 h-9 rounded-full bg-[#F4F5F9] flex items-center justify-center relative active:scale-95 transition-transform">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D5898" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {tab === "home" && <HomeTab onArtistClick={handleArtistClick} />}
        {tab === "shop" && <ShopTab onNavigate={navigate} />}
        {tab === "channel" && <ChannelTab onNavigate={navigate} />}
        {tab === "more" && <MoreTab />}
      </div>

      {/* Bottom Nav */}
      <div className="bg-white border-t border-[#F0F2F8] flex items-center px-2 py-2 flex-shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        {tabs.map(({ key, label, Icon }) => {
          const active = tab === key
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="flex-1 flex flex-col items-center gap-1 py-1.5 active:scale-95 transition-transform"
            >
              <Icon active={active} />
              <span className={`text-xs font-bold ${active ? "text-[#3D5898]" : "text-[#9BAACE]"}`}>{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
