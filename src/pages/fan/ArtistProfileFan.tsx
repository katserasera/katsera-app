import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import nadinAmizah from "@/imports/nadin_amizah.jpg"
import bernadya from "@/imports/bernadya.jpg"
import ariIrham from "@/imports/ari_irham.jpg"

const artistsData: Record<string, {
  name: string; role: string; bio: string; followers: string; following: string; works: string;
  img: string; cover: string;
}> = {
  "1": {
    name: "Nadin Amizah",
    role: "Singer · Songwriter",
    bio: "Indonesian singer-songwriter known for her soulful folk sound. Her debut album 'Selamat Ulang Tahun' went platinum in 2021. Currently on the Rumpang World Tour.",
    followers: "4.2M",
    following: "312",
    works: "48",
    img: nadinAmizah,
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=400&fit=crop&auto=format",
  },
  "2": {
    name: "Bernadya",
    role: "Singer · Actress",
    bio: "Multi-talented performer with a unique voice that blends jazz and contemporary pop. Award-winning artist with three critically acclaimed albums.",
    followers: "3.8M",
    following: "198",
    works: "36",
    img: bernadya,
    cover: "https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=800&h=400&fit=crop&auto=format",
  },
  "4": {
    name: "Ari Irham",
    role: "Actor · Director",
    bio: "Rising star in Indonesian cinema and theater. Known for his intense dramatic performances in both film and stage productions.",
    followers: "2.1M",
    following: "421",
    works: "22",
    img: ariIrham,
    cover: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=400&fit=crop&auto=format",
  },
}

const defaultArtist = {
  name: "Artist",
  role: "Creator",
  bio: "A talented creator on Katsera.",
  followers: "1.0M",
  following: "100",
  works: "10",
  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format",
  cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=400&fit=crop&auto=format",
}

const posts = [
  { id: 1, text: "New single dropping this Friday 🎵 Can't wait for you all to hear it!", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop&auto=format", time: "2h ago", likes: 4821, comments: 312 },
  { id: 2, text: "Thank you Jakarta for an unforgettable night 💙 See you again soon!", img: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&h=400&fit=crop&auto=format", time: "1d ago", likes: 9203, comments: 841 },
  { id: 3, text: "Working on something special for you all... 🎶", img: "", time: "3d ago", likes: 3410, comments: 203 },
]

const mediaGrid = [
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop&auto=format",
]

const notices = [
  { id: 1, title: "Tour Dates Announced", body: "Rumpang World Tour 2025 dates are now live! Get your tickets before they sell out.", date: "Jul 20, 2025", important: true },
  { id: 2, title: "Fan Meet & Greet — Jakarta", body: "A special fan meeting event this August in Jakarta. Limited slots. Registration link below.", date: "Jul 15, 2025", important: false },
  { id: 3, title: "New Album Release Date", body: "Mark your calendars — the new album drops September 12, 2025. Pre-save now.", date: "Jul 10, 2025", important: true },
]

const shopItems = [
  { id: 1, name: "World Tour Tee 2025", price: "Rp 185.000", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&auto=format" },
  { id: 2, name: "Signed Photo Book", price: "Rp 450.000", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop&auto=format" },
  { id: 3, name: "Official Lightstick", price: "Rp 220.000", img: "https://images.unsplash.com/photo-1549298222-1c31e8915347?w=300&h=300&fit=crop&auto=format" },
  { id: 4, name: "Embroidered Hoodie", price: "Rp 380.000", img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=300&h=300&fit=crop&auto=format" },
]

const PROFILE_TABS = ["Post", "Live", "Media", "Notice", "Shop"] as const
type ProfileTab = typeof PROFILE_TABS[number]

export default function ArtistProfileFan() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [tab, setTab] = useState<ProfileTab>("Post")
  const [following, setFollowing] = useState(false)
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const [commentPost, setCommentPost] = useState<number | null>(null)
  const [commentText, setCommentText] = useState("")
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)

  const artist = (id && artistsData[id]) || defaultArtist

  return (
    <div className="h-screen bg-[#F4F5F9] flex flex-col max-w-md mx-auto overflow-hidden">
      {/* Cover + nav */}
      <div className="relative flex-shrink-0" style={{ height: 200 }}>
        <img src={artist.cover} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      </div>

      {/* Profile section */}
      <div className="bg-white px-5 pt-0 pb-4 flex-shrink-0 shadow-sm">
        <div className="flex items-end justify-between -mt-8 mb-3">
          <div className="rounded-full border-4 border-white overflow-hidden" style={{ width: 72, height: 72 }}>
            <img src={artist.img} alt={artist.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2 pb-1">
            <button
              onClick={() => setFollowing(!following)}
              className={`px-5 py-2 rounded-full text-sm font-bold border-2 transition-all active:scale-95 ${
                following
                  ? "border-[#3D5898] text-[#3D5898] bg-white"
                  : "border-[#3D5898] bg-[#3D5898] text-white"
              }`}
            >
              {following ? "Following" : "Follow"}
            </button>
            <button onClick={() => { if (navigator.share) { navigator.share({ title: artist.name, text: `Check out ${artist.name} on Katsera!`, url: window.location.href }).catch(() => {}) } }} className="w-9 h-9 rounded-full border-2 border-[#E0E5F2] flex items-center justify-center active:scale-95 transition-transform">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3D5898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
          </div>
        </div>

        <h2 className="text-[#1E2D5A] font-extrabold text-xl">{artist.name}</h2>
        <p className="text-[#9BAACE] text-sm font-medium mb-2">{artist.role}</p>

        {/* Stats row */}
        <div className="flex gap-6 mt-3 pb-3 border-b border-[#F0F2F8]">
          {[
            { value: artist.followers, label: "Followers" },
            { value: artist.following, label: "Following" },
            { value: artist.works, label: "Works" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-[#1E2D5A] font-extrabold text-base">{value}</p>
              <p className="text-[#9BAACE] text-xs">{label}</p>
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div className="flex gap-0 mt-3 -mb-4">
          {PROFILE_TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-colors ${
                tab === t
                  ? "border-[#3D5898] text-[#3D5898]"
                  : "border-transparent text-[#9BAACE] hover:text-[#3D5898]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto pb-6">

        {/* Post */}
        {tab === "Post" && (
          <div className="px-4 pt-4 space-y-4">
            {posts.map((post) => {
              const isLiked = liked.has(post.id)
              return (
                <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  <div className="flex items-center gap-3 p-4">
                    <img src={artist.img} alt={artist.name} className="w-9 h-9 rounded-full object-cover border-2 border-[#E0E5F2]" />
                    <div>
                      <p className="text-[#1E2D5A] font-bold text-sm">{artist.name}</p>
                      <p className="text-[#9BAACE] text-xs">{post.time}</p>
                    </div>
                  </div>
                  {post.img && <img src={post.img} alt="Post" className="w-full object-cover" style={{ maxHeight: 200 }} />}
                  <div className="px-4 pt-3 pb-1">
                    <p className="text-[#1E2D5A] text-sm leading-relaxed">{post.text}</p>
                  </div>
                  <div className="flex items-center gap-5 px-4 py-3 border-t border-[#F0F2F8] mt-2">
                    <button onClick={() => {
                      const n = new Set(liked); isLiked ? n.delete(post.id) : n.add(post.id); setLiked(n)
                    }} className="flex items-center gap-1.5 active:scale-95 transition-transform">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={isLiked ? "#E05A3A" : "none"} stroke={isLiked ? "#E05A3A" : "#9BAACE"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                      <span className="text-xs font-semibold text-[#9BAACE]">{(post.likes + (isLiked ? 1 : 0)).toLocaleString()}</span>
                    </button>
                    <button onClick={() => setCommentPost(post.id)} className="flex items-center gap-1.5 active:scale-95 transition-transform">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9BAACE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                      <span className="text-xs font-semibold text-[#9BAACE]">{post.comments}</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Live */}
        {tab === "Live" && (
          <div className="px-4 pt-4">
            <button onClick={() => navigate(`/fan/channel/${id || '1'}`)} className="w-full bg-[#3D5898] rounded-2xl overflow-hidden relative h-52 mb-4 flex items-center justify-center active:scale-95 transition-transform">
              <img src={artist.cover} alt="Live" className="absolute inset-0 w-full h-full object-cover opacity-50" />
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">LIVE</span>
                <p className="text-white font-bold">Join the live stream</p>
              </div>
            </button>
            <p className="text-[#1E2D5A] font-bold mb-1">Previous Streams</p>
            <div className="space-y-3">
              {["Acoustic Session — July 2025", "Q&A with Fans", "Behind the Scenes: Album Recording"].map((title, i) => (
                <button key={i} onClick={() => navigate(`/fan/channel/${id || '1'}`)} className="w-full bg-white rounded-xl flex items-center gap-3 p-3 active:scale-95 transition-transform shadow-sm text-left">
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-[#E0E5F2] flex-shrink-0">
                    <img src={mediaGrid[i]} alt={title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[#1E2D5A] text-sm font-bold">{title}</p>
                    <p className="text-[#9BAACE] text-xs">{4200 - i * 800} views</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9BAACE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Media */}
        {tab === "Media" && (
          <div className="pt-4 px-4">
            <div className="grid grid-cols-3 gap-1">
              {mediaGrid.map((src, i) => (
                <button key={i} onClick={() => setLightboxImg(src)} className="aspect-square bg-[#E0E5F2] overflow-hidden active:scale-95 transition-transform">
                  <img src={src} alt={`Media ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Notice */}
        {tab === "Notice" && (
          <div className="px-4 pt-4 space-y-3">
            {notices.map((n) => (
              <div key={n.id} className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer active:scale-95 transition-transform">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {n.important && (
                      <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">Important</span>
                    )}
                    <p className="text-[#1E2D5A] font-bold text-sm">{n.title}</p>
                  </div>
                  <p className="text-[#9BAACE] text-xs flex-shrink-0">{n.date}</p>
                </div>
                <p className="text-[#7A8BB5] text-sm leading-relaxed">{n.body}</p>
              </div>
            ))}
          </div>
        )}

        {/* Shop */}
        {tab === "Shop" && (
          <div className="px-4 pt-4">
            <div className="grid grid-cols-2 gap-3">
              {shopItems.map((item) => (
                <div key={item.id} onClick={() => navigate("/fan/shop")} className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer active:scale-95 transition-transform">
                  <div className="h-32 bg-[#F4F5F9]">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <p className="text-[#1E2D5A] font-bold text-sm leading-tight mb-1">{item.name}</p>
                    <p className="text-[#3D5898] font-extrabold text-sm">{item.price}</p>
                    <button onClick={(e) => { e.stopPropagation(); navigate("/fan/shop") }} className="mt-2 w-full py-1.5 rounded-full bg-[#3D5898] text-white text-xs font-bold hover:bg-[#2D4270] active:scale-95 transition-all">
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Comment modal */}
      {commentPost !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setCommentPost(null)}>
          <div className="bg-white w-full max-w-md rounded-t-3xl p-5" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full bg-[#E0E5F2] mx-auto mb-4" />
            <p className="font-extrabold text-[#1E2D5A] text-base mb-4">Comments</p>
            <div className="flex gap-3 items-center">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && commentText.trim()) { setCommentText(""); setCommentPost(null) } }}
                placeholder="Write a comment..."
                className="flex-1 bg-[#F4F5F9] rounded-full px-4 py-2.5 text-sm text-[#1E2D5A] outline-none"
              />
              <button
                onClick={() => { if (commentText.trim()) { setCommentText(""); setCommentPost(null) } }}
                className="w-9 h-9 rounded-full bg-[#3D5898] flex items-center justify-center active:scale-95 transition-transform"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
            <div className="pb-4" />
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={() => setLightboxImg(null)}>
          <img src={lightboxImg} alt="Media" className="max-w-full max-h-full object-contain rounded-xl" />
          <button className="absolute top-12 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      )}
    </div>
  )
}
