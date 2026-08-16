import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import katseraLogo from "@/imports/katsera_logo.png"
// ── K Logo ────────────────────────────────────────────────────────────────────
function KLogo() {
  return <img src={katseraLogo} alt="Katsera" style={{ width: 22, height: 25, objectFit: "contain" as const }} />
}

// ── Nav icon ──────────────────────────────────────────────────────────────────
function NavIcon({ type, active }: { type: string; active: boolean }) {
  const c = active ? "#3D5898" : "#9BAACE"
  if (type === "home") return <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? c : "none"} stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  if (type === "studio") return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/><circle cx="15.5" cy="14.5" r="2.5"/></svg>
  if (type === "sales") return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  if (type === "community") return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  if (type === "analytics") return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
  return null
}

const artworks = [
  { id: 1, title: "Midnight Bloom", medium: "Acrylic on canvas", price: "Rp 4.500.000", status: "Available", views: 2841, likes: 312, img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop" },
  { id: 2, title: "Urban Solitude", medium: "Oil on board", price: "Rp 8.200.000", status: "Sold", views: 5120, likes: 487, img: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=400&fit=crop" },
  { id: 3, title: "Golden Hour", medium: "Watercolor", price: "Rp 2.800.000", status: "Available", views: 1930, likes: 214, img: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&h=400&fit=crop" },
  { id: 4, title: "Abstract Mind", medium: "Digital print", price: "Rp 1.200.000", status: "Reserved", views: 3405, likes: 390, img: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=400&fit=crop" },
  { id: 5, title: "Forest Path", medium: "Pencil & ink", price: "Rp 3.100.000", status: "Available", views: 1240, likes: 155, img: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400&h=400&fit=crop" },
  { id: 6, title: "Blue Reverie", medium: "Mixed media", price: "Rp 5.900.000", status: "Available", views: 2210, likes: 278, img: "https://images.unsplash.com/photo-1554188248-986adbb73be4?w=400&h=400&fit=crop" },
]

const recentActivity = [
  { name: "Dinda R.", action: "saved your artwork", artwork: "Midnight Bloom", time: "5m ago", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" },
  { name: "Rizal F.", action: "placed a commission", artwork: "Portrait series", time: "2h ago", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" },
  { name: "Sari W.", action: "started following you", artwork: "", time: "4h ago", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop" },
  { name: "Budi S.", action: "purchased Urban Solitude", artwork: "", time: "Yesterday", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop" },
]

const statusColor: Record<string, string> = {
  Available: "text-green-600 bg-green-50",
  Sold: "text-[#7A8BB5] bg-[#F4F5F9]",
  Reserved: "text-amber-600 bg-amber-50",
}

// ── Home Tab ──────────────────────────────────────────────────────────────────
function HomeTab({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const [liked, setLiked] = useState<Set<number>>(new Set())
  return (
    <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
      {/* Profile card */}
      <div className="bg-gradient-to-br from-[#3D5898] to-[#5B4A9A] rounded-2xl p-5 mb-5 flex items-center gap-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-32 opacity-20" style={{ background: "radial-gradient(circle at 80% 50%, white 0%, transparent 70%)" }} />
        <img src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&h=200&fit=crop" alt="Artist" className="w-16 h-16 rounded-full object-cover border-2 border-white/50 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-white font-extrabold text-lg">Andi Wijaya</p>
          <p className="text-white/70 text-sm">Painter · Mixed Media</p>
          <div className="flex gap-4 mt-2">
            {[{ v: "28.4K", l: "Followers" }, { v: "42", l: "Artworks" }, { v: "Rp 38M", l: "Earned" }].map(({ v, l }) => (
              <div key={l}>
                <p className="text-white font-extrabold text-sm">{v}</p>
                <p className="text-white/60 text-xs">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#FFD700] text-[#1E2D5A] text-xs font-bold px-2 py-0.5 rounded-full self-start flex-shrink-0">Verified</div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {[
          { icon: "🖼️", label: "Upload Art", path: "/painter/upload" },
          { icon: "🔴", label: "Go Live", path: "/painter/community" },
          { icon: "💼", label: "Commission", path: "/painter/sales" },
          { icon: "📊", label: "Analytics", path: "/painter/analytics" },
        ].map(({ icon, label, path }) => (
          <button key={label} onClick={() => navigate(path)} className="bg-white rounded-2xl py-3 flex flex-col items-center gap-1.5 shadow-sm active:scale-95 transition-all">
            <span className="text-2xl">{icon}</span>
            <span className="text-[#1E2D5A] text-xs font-bold">{label}</span>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { value: "16.3K", label: "Art views", trend: "+18%" },
          { value: "1,240", label: "New saves", trend: "+31%" },
          { value: "Rp 5.8M", label: "Revenue", trend: "+25%" },
        ].map(({ value, label, trend }) => (
          <div key={label} className="bg-white rounded-2xl p-3 shadow-sm">
            <p className="text-[#1E2D5A] font-extrabold text-base">{value}</p>
            <p className="text-[#9BAACE] text-xs mt-0.5 leading-tight">{label}</p>
            <p className="text-green-500 text-xs font-bold mt-1">{trend}</p>
          </div>
        ))}
      </div>

      {/* Artwork feed */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-[#1E2D5A] font-extrabold text-base">Your Artworks</p>
        <button onClick={() => navigate("/painter/studio")} className="text-[#3D5898] text-sm font-semibold active:opacity-60">Manage →</button>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {artworks.slice(0, 4).map((art) => {
          const isLiked = liked.has(art.id)
          return (
            <button key={art.id} onClick={() => navigate("/painter/studio")} className="bg-white rounded-2xl overflow-hidden shadow-sm text-left active:scale-[0.98] transition-transform">
              <div className="relative h-36">
                <img src={art.img} alt={art.title} className="w-full h-full object-cover" />
                <span className={`absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${statusColor[art.status]}`}>{art.status}</span>
              </div>
              <div className="p-2.5">
                <p className="text-[#1E2D5A] font-bold text-xs leading-tight">{art.title}</p>
                <p className="text-[#9BAACE] text-[10px] mt-0.5">{art.medium}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <p className="text-[#3D5898] font-extrabold text-xs">{art.price}</p>
                  <button onClick={(e) => { e.stopPropagation(); const n = new Set(liked); isLiked ? n.delete(art.id) : n.add(art.id); setLiked(n) }} className="active:scale-90 transition-transform">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={isLiked ? "#E05A3A" : "none"} stroke={isLiked ? "#E05A3A" : "#C8D0E8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </button>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Recent activity */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-[#1E2D5A] font-extrabold text-base">Recent Activity</p>
      </div>
      <div className="space-y-3">
        {recentActivity.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl flex items-center gap-3 p-3 shadow-sm">
            <img src={item.img} alt={item.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[#1E2D5A] text-sm font-bold truncate">{item.name}</p>
              <p className="text-[#9BAACE] text-xs truncate">{item.action}{item.artwork && ` · ${item.artwork}`}</p>
            </div>
            <p className="text-[#9BAACE] text-xs flex-shrink-0">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Studio Tab ────────────────────────────────────────────────────────────────
function StudioTab({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const [studioTab, setStudioTab] = useState<"portfolio" | "collections" | "commissions">("portfolio")
  const [showUpload, setShowUpload] = useState(false)
  const [uploadDone, setUploadDone] = useState(false)

  function handleUpload() {
    setShowUpload(false)
    setUploadDone(true)
    setTimeout(() => setUploadDone(false), 2500)
  }

  return (
    <div className="flex-1 overflow-y-auto pb-24">
      {/* Upload done toast */}
      {uploadDone && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1E2D5A] text-white text-sm font-bold px-5 py-3 rounded-full shadow-xl flex items-center gap-2">
          <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          Artwork uploaded successfully!
        </div>
      )}

      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[#1E2D5A] font-extrabold text-lg">Artwork Studio</p>
          <button onClick={() => navigate("/painter/upload")} className="flex items-center gap-1.5 bg-[#3D5898] text-white text-xs font-bold px-4 py-2 rounded-full active:scale-95 transition-transform">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
            Upload Artwork
          </button>
        </div>
        {/* Sub tabs */}
        <div className="flex gap-0 border-b border-[#E0E5F2]">
          {(["portfolio", "collections", "commissions"] as const).map((t) => (
            <button key={t} onClick={() => setStudioTab(t)} className={`flex-1 py-2.5 text-xs font-bold capitalize transition-colors border-b-2 ${studioTab === t ? "text-[#3D5898] border-[#3D5898]" : "text-[#9BAACE] border-transparent"}`}>{t}</button>
          ))}
        </div>
      </div>

      {/* Portfolio */}
      {studioTab === "portfolio" && (
        <div className="px-4 space-y-0">
          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[{ v: "42", l: "Total" }, { v: "18", l: "Available" }, { v: "12", l: "Sold" }].map(({ v, l }) => (
              <div key={l} className="bg-white rounded-2xl p-3 shadow-sm text-center">
                <p className="text-[#1E2D5A] font-extrabold text-lg">{v}</p>
                <p className="text-[#9BAACE] text-xs">{l}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {artworks.map((art) => (
              <button key={art.id} onClick={() => navigate("/painter/studio")} className="bg-white rounded-2xl overflow-hidden shadow-sm text-left active:scale-[0.98] transition-transform">
                <div className="relative h-36">
                  <img src={art.img} alt={art.title} className="w-full h-full object-cover" />
                  <span className={`absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${statusColor[art.status]}`}>{art.status}</span>
                </div>
                <div className="p-3">
                  <p className="text-[#1E2D5A] font-bold text-xs leading-tight mb-0.5">{art.title}</p>
                  <p className="text-[#9BAACE] text-[10px] mb-1.5">{art.medium}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[#3D5898] font-extrabold text-xs">{art.price}</p>
                    <div className="flex items-center gap-2 text-[#9BAACE]">
                      <span className="flex items-center gap-0.5 text-[10px]">
                        <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                        {art.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-0.5 text-[10px]">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        {art.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Collections */}
      {studioTab === "collections" && (
        <div className="px-4 space-y-3">
          {[
            { name: "Nocturnal Series", count: 8, cover: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=200&fit=crop", desc: "Night-themed paintings exploring solitude and light" },
            { name: "Urban Life", count: 12, cover: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=200&fit=crop", desc: "Street scenes from Jakarta and Bandung" },
            { name: "Nature Studies", count: 6, cover: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&h=200&fit=crop", desc: "Botanical and landscape works in watercolor" },
          ].map((col) => (
            <div key={col.name} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-28">
                <img src={col.cover} alt={col.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-white font-bold text-sm">{col.name}</p>
                  <p className="text-white/70 text-xs">{col.count} artworks</p>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <p className="text-[#7A8BB5] text-xs">{col.desc}</p>
                <button className="text-[#3D5898] text-xs font-bold flex-shrink-0 ml-2">Edit</button>
              </div>
            </div>
          ))}
          <button onClick={() => {}} className="w-full py-3 rounded-2xl border-2 border-dashed border-[#C8D0E8] text-[#7A8BB5] text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            Create Collection
          </button>
        </div>
      )}

      {/* Commissions */}
      {studioTab === "commissions" && (
        <div className="px-4 space-y-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-[#1E2D5A] text-sm">Commission Status</p>
              <span className="text-xs text-green-600 bg-green-50 font-bold px-2 py-0.5 rounded-full">Open</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[{ v: "3", l: "Pending" }, { v: "2", l: "In Progress" }, { v: "12", l: "Completed" }, { v: "Rp 24M", l: "Total Earned" }].map(({ v, l }) => (
                <div key={l} className="bg-[#F4F5F9] rounded-xl p-3">
                  <p className="text-[#1E2D5A] font-extrabold text-base">{v}</p>
                  <p className="text-[#9BAACE] text-xs">{l}</p>
                </div>
              ))}
            </div>
          </div>
          {[
            { client: "Rizal F.", type: "Portrait (A3)", deadline: "Aug 15", price: "Rp 2.500.000", status: "In Progress", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" },
            { client: "Dewi A.", type: "Wedding Illustration", deadline: "Aug 30", price: "Rp 4.000.000", status: "Pending", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop" },
            { client: "Hendra K.", type: "Logo Artwork", deadline: "Aug 10", price: "Rp 1.800.000", status: "Pending", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop" },
          ].map((req, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
              <img src={req.img} alt={req.client} className="w-11 h-11 rounded-full object-cover flex-none" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-[#1E2D5A] font-bold text-sm">{req.client}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${req.status === "In Progress" ? "text-[#3D5898] bg-blue-50" : "text-amber-600 bg-amber-50"}`}>{req.status}</span>
                </div>
                <p className="text-[#7A8BB5] text-xs">{req.type}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[#9BAACE] text-[10px]">Due {req.deadline}</span>
                  <span className="text-[#3D5898] font-extrabold text-xs">{req.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload artwork modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-5 space-y-4">
            <div className="w-10 h-1 rounded-full bg-[#E0E5F2] mx-auto" />
            <p className="font-extrabold text-[#1E2D5A] text-base">Upload Artwork</p>
            <div className="border-2 border-dashed border-[#C8D0E8] rounded-2xl h-36 flex flex-col items-center justify-center gap-2 cursor-pointer active:bg-[#F4F5F9] transition-colors">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#C8D0E8" strokeWidth="1.8"/><path d="M3 15l5-5 4 4 3-3 6 6" stroke="#C8D0E8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <p className="text-[#7A8BB5] text-sm font-semibold">Tap to choose image</p>
              <p className="text-[#9BAACE] text-xs">PNG, JPG up to 50MB</p>
            </div>
            <div className="space-y-2">
              <input placeholder="Artwork title" className="w-full bg-[#F4F5F9] rounded-2xl px-4 py-3 text-sm text-[#1E2D5A] outline-none font-semibold" />
              <input placeholder="Medium (e.g. Acrylic on canvas)" className="w-full bg-[#F4F5F9] rounded-2xl px-4 py-3 text-sm text-[#1E2D5A] outline-none font-semibold" />
              <input placeholder="Price (Rp)" className="w-full bg-[#F4F5F9] rounded-2xl px-4 py-3 text-sm text-[#1E2D5A] outline-none font-semibold" />
            </div>
            <button onClick={handleUpload} className="w-full py-3.5 rounded-full bg-[#3D5898] text-white font-extrabold text-sm active:scale-95 transition-transform">Upload Artwork</button>
            <button onClick={() => setShowUpload(false)} className="w-full py-3.5 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-extrabold text-sm">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Sales Tab ─────────────────────────────────────────────────────────────────
function SalesTab({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const [salesTab, setSalesTab] = useState<"overview" | "transactions">("overview")
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [withdrawing, setWithdrawing] = useState(false)
  const [withdrawDone, setWithdrawDone] = useState(false)

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
  const values = [1.8, 3.2, 2.4, 5.1, 4.3, 6.8, 5.8]
  const max = Math.max(...values)

  const transactions = [
    { id: "ART-9921", type: "Artwork Sale", detail: "Midnight Bloom", amount: "+Rp4.500.000", date: "26 Jul 2026", status: "success" },
    { id: "COM-9910", type: "Commission", detail: "Portrait — Rizal F.", amount: "+Rp2.500.000", date: "25 Jul 2026", status: "success" },
    { id: "ART-9901", type: "Digital Print", detail: "Abstract Mind × 3", amount: "+Rp3.600.000", date: "23 Jul 2026", status: "success" },
    { id: "WIT-9890", type: "Withdrawal", detail: "To BCA ****4821", amount: "-Rp8.000.000", date: "20 Jul 2026", status: "pending" },
    { id: "ART-9881", type: "Artwork Sale", detail: "Urban Solitude", amount: "+Rp8.200.000", date: "18 Jul 2026", status: "success" },
  ]

  const categories = [
    { label: "Original Art", value: "Rp22.4M", pct: 45, color: "#3D5898" },
    { label: "Commissions", value: "Rp14.8M", pct: 30, color: "#5B4A9A" },
    { label: "Digital Prints", value: "Rp8.2M", pct: 17, color: "#A0B0D8" },
    { label: "Collections", value: "Rp4.0M", pct: 8, color: "#C8D0E8" },
  ]

  function handleWithdraw() {
    setWithdrawing(true)
    setTimeout(() => { setWithdrawing(false); setWithdrawDone(true); setShowWithdraw(false); setTimeout(() => setWithdrawDone(false), 2500) }, 2000)
  }

  return (
    <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
      {withdrawDone && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1E2D5A] text-white text-sm font-bold px-5 py-3 rounded-full shadow-xl flex items-center gap-2">
          <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          Withdrawal requested!
        </div>
      )}

      {/* Balance card */}
      <div className="bg-gradient-to-br from-[#3D5898] to-[#5B4A9A] rounded-3xl p-5 text-white shadow-lg mb-5">
        <p className="text-sm font-semibold opacity-80 mb-1">Total Balance</p>
        <p className="text-3xl font-extrabold">Rp 49.400.000</p>
        <p className="text-white/60 text-xs mt-1">+Rp 5.800.000 this month</p>
        <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
          <div>
            <p className="text-white/60 text-xs">Pending clearance</p>
            <p className="font-bold text-sm">Rp 2.500.000</p>
          </div>
          <button onClick={() => setShowWithdraw(true)} className="bg-white text-[#3D5898] text-sm font-extrabold px-5 py-2.5 rounded-full active:scale-95 transition-transform">
            Withdraw →
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-[#E0E5F2] mb-4">
        {(["overview", "transactions"] as const).map((t) => (
          <button key={t} onClick={() => setSalesTab(t)} className={`flex-1 py-2.5 text-xs font-bold capitalize border-b-2 transition-colors ${salesTab === t ? "text-[#3D5898] border-[#3D5898]" : "text-[#9BAACE] border-transparent"}`}>{t}</button>
        ))}
      </div>

      {salesTab === "overview" && (
        <>
          {/* Chart */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-[#1E2D5A] text-sm">Monthly Revenue</p>
              <p className="text-[#3D5898] font-extrabold text-sm">Rp 5.8M</p>
            </div>
            <div className="flex items-end gap-1 h-24">
              {values.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-md" style={{ height: `${(v / max) * 72}px`, background: i === 6 ? "#3D5898" : "#E0E5F2" }} />
                  <span className="text-[9px] text-[#9BAACE] font-semibold">{months[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <p className="font-bold text-[#1E2D5A] text-sm mb-3">Revenue Breakdown</p>
            <div className="space-y-3">
              {categories.map((cat) => (
                <div key={cat.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-[#1E2D5A]">{cat.label}</span>
                    <span className="font-bold text-[#1E2D5A]">{cat.value} <span className="text-[#9BAACE]">({cat.pct}%)</span></span>
                  </div>
                  <div className="h-2 bg-[#F4F5F9] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${cat.pct}%`, background: cat.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commission pricing */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="font-bold text-[#1E2D5A] text-sm mb-3">Commission Pricing</p>
            {[{ type: "Sketch (A4)", price: "Rp 800.000" }, { type: "Portrait (A3)", price: "Rp 2.500.000" }, { type: "Full Illustration", price: "Rp 5.000.000+" }].map((p) => (
              <div key={p.type} className="flex justify-between py-2 border-b border-[#F4F5F9] last:border-0">
                <span className="text-sm text-[#1E2D5A] font-semibold">{p.type}</span>
                <span className="text-sm text-[#3D5898] font-extrabold">{p.price}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {salesTab === "transactions" && (
        <div className="space-y-2">
          {transactions.map((tx) => (
            <div key={tx.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-none ${tx.amount.startsWith("+") ? "bg-green-50" : "bg-[#F4F5F9]"}`}>
                {tx.amount.startsWith("+")
                  ? <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"/></svg>
                  : <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M5 12h14" stroke="#7A8BB5" strokeWidth="2.5" strokeLinecap="round"/></svg>
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#1E2D5A] font-bold text-sm truncate">{tx.type}</p>
                <p className="text-[#9BAACE] text-xs truncate">{tx.detail} · {tx.date}</p>
              </div>
              <div className="text-right flex-none">
                <p className={`font-extrabold text-sm ${tx.amount.startsWith("+") ? "text-green-600" : "text-[#7A8BB5]"}`}>{tx.amount}</p>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${tx.status === "success" ? "text-green-600 bg-green-50" : "text-amber-600 bg-amber-50"}`}>{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Withdraw modal */}
      {showWithdraw && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-5 space-y-4">
            <div className="w-10 h-1 rounded-full bg-[#E0E5F2] mx-auto" />
            <p className="font-extrabold text-[#1E2D5A] text-base">Withdraw Funds</p>
            <div className="bg-[#F4F5F9] rounded-2xl p-4">
              <p className="text-xs text-[#7A8BB5] mb-1">Available balance</p>
              <p className="font-extrabold text-[#3D5898] text-2xl">Rp 49.400.000</p>
            </div>
            <input placeholder="Amount to withdraw" className="w-full bg-[#F4F5F9] rounded-2xl px-4 py-3 text-sm text-[#1E2D5A] outline-none font-semibold" />
            <div className="bg-[#F4F5F9] rounded-2xl px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-[#1E2D5A] font-semibold">BCA ****4821</span>
              <span className="text-xs text-[#3D5898] font-bold">Change</span>
            </div>
            <button onClick={handleWithdraw} disabled={withdrawing} className="w-full py-3.5 rounded-full bg-[#3D5898] text-white font-extrabold text-sm flex items-center justify-center gap-2 disabled:opacity-60 active:scale-95 transition-all">
              {withdrawing ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Processing...</> : "Request Withdrawal"}
            </button>
            <button onClick={() => setShowWithdraw(false)} className="w-full py-3.5 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-extrabold text-sm">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Community Tab ─────────────────────────────────────────────────────────────
function CommunityTab({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const [communityTab, setCommunityTab] = useState<"posts" | "live">("posts")
  const [postText, setPostText] = useState("")
  const [posts, setPosts] = useState([
    { id: 1, text: "Just finished this piece after 3 weeks 🎨 What do you think? Drop a comment!", img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop", likes: 482, comments: 38, time: "2h ago" },
    { id: 2, text: "Behind the scenes of the Nocturnal Series. Starting with charcoal sketches before moving to acrylic.", img: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=400&fit=crop", likes: 315, comments: 22, time: "1d ago" },
    { id: 3, text: "Commission open until next week! DM for details on pricing and turnaround time.", img: "", likes: 209, comments: 45, time: "3d ago" },
  ])
  const [liked, setLiked] = useState<Set<number>>(new Set())

  function handlePost() {
    if (!postText.trim()) return
    setPosts((prev) => [{ id: Date.now(), text: postText, img: "", likes: 0, comments: 0, time: "Just now" }, ...prev])
    setPostText("")
  }

  return (
    <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
      {/* Sub tabs */}
      <div className="flex gap-0 border-b border-[#E0E5F2] mb-4">
        {(["posts", "live"] as const).map((t) => (
          <button key={t} onClick={() => setCommunityTab(t)} className={`flex-1 py-2.5 text-xs font-bold capitalize border-b-2 transition-colors ${communityTab === t ? "text-[#3D5898] border-[#3D5898]" : "text-[#9BAACE] border-transparent"}`}>{t === "live" ? "Live Sessions" : t}</button>
        ))}
      </div>

      {communityTab === "posts" && (
        <>
          {/* Compose */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <div className="flex gap-3 items-start">
              <img src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=80&h=80&fit=crop" alt="" className="w-9 h-9 rounded-full object-cover flex-none" />
              <div className="flex-1 bg-[#F4F5F9] rounded-2xl px-3 py-2.5">
                <textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Share something with your fans…"
                  rows={2}
                  className="w-full bg-transparent text-sm text-[#1E2D5A] outline-none resize-none placeholder:text-[#C8D0E8]"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pl-12">
              <div className="flex gap-3">
                <button className="text-[#7A8BB5] active:scale-95 transition-transform">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M3 15l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                </button>
                <button className="text-[#7A8BB5] active:scale-95 transition-transform">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.82v6.36a1 1 0 0 1-1.447.89L15 14M3 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                </button>
              </div>
              <button onClick={handlePost} disabled={!postText.trim()} className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${postText.trim() ? "bg-[#3D5898] text-white" : "bg-[#C8D0E8] text-white"}`}>Post</button>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {posts.map((post) => {
              const isLiked = liked.has(post.id)
              return (
                <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  <div className="flex items-center gap-3 p-4">
                    <img src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=80&h=80&fit=crop" alt="" className="w-9 h-9 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="text-[#1E2D5A] font-bold text-sm">Andi Wijaya</p>
                      <p className="text-[#9BAACE] text-xs">{post.time}</p>
                    </div>
                  </div>
                  {post.img && <img src={post.img} alt="" className="w-full object-cover max-h-52" />}
                  <div className="px-4 py-3">
                    <p className="text-[#1E2D5A] text-sm leading-relaxed">{post.text}</p>
                  </div>
                  <div className="flex items-center gap-5 px-4 py-3 border-t border-[#F0F2F8]">
                    <button onClick={() => { const n = new Set(liked); isLiked ? n.delete(post.id) : n.add(post.id); setLiked(n) }} className="flex items-center gap-1.5 active:scale-90 transition-transform">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={isLiked ? "#E05A3A" : "none"} stroke={isLiked ? "#E05A3A" : "#9BAACE"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      <span className={`text-xs font-semibold ${isLiked ? "text-[#E05A3A]" : "text-[#9BAACE]"}`}>{post.likes + (isLiked ? 1 : 0)}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-[#9BAACE]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                      <span className="text-xs font-semibold">{post.comments}</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {communityTab === "live" && (
        <div className="space-y-4">
          {/* Go Live CTA */}
          <button onClick={() => navigate("/painter/community")} className="w-full bg-gradient-to-br from-[#3D5898] to-[#5B4A9A] rounded-2xl p-5 flex items-center gap-4 active:scale-[0.98] transition-transform">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center flex-none">
              <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" />
            </div>
            <div className="text-left">
              <p className="text-white font-extrabold text-base">Start Live Painting</p>
              <p className="text-white/70 text-sm">Share your creative process live</p>
            </div>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="ml-auto"><path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>

          {/* Past sessions */}
          <p className="text-[#1E2D5A] font-extrabold text-sm px-0.5">Past Sessions</p>
          {[
            { title: "Painting Midnight Bloom — Part 2", viewers: "1.2K watched", duration: "2:14:30", img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=220&fit=crop" },
            { title: "Q&A + Sketch Session", viewers: "870 watched", duration: "45:12", img: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&h=220&fit=crop" },
            { title: "Urban Solitude — Behind the Scene", viewers: "2.3K watched", duration: "1:32:00", img: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=220&fit=crop" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm flex items-center gap-3 p-3">
              <div className="w-20 h-14 rounded-xl overflow-hidden flex-none">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#1E2D5A] font-bold text-sm leading-tight">{s.title}</p>
                <p className="text-[#9BAACE] text-xs mt-0.5">{s.viewers} · {s.duration}</p>
              </div>
              <button className="w-8 h-8 rounded-full bg-[#3D5898] flex items-center justify-center flex-none active:scale-95 transition-transform">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Analytics Tab ─────────────────────────────────────────────────────────────
function AnalyticsTab() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d")

  const weekViews = [420, 580, 340, 790, 650, 920, 770]
  const maxViews = Math.max(...weekViews)
  const days = ["M", "T", "W", "T", "F", "S", "S"]

  const topArtworks = [
    { title: "Midnight Bloom", views: 2841, likes: 312, saves: 148, img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=100&h=100&fit=crop" },
    { title: "Urban Solitude", views: 5120, likes: 487, saves: 231, img: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=100&h=100&fit=crop" },
    { title: "Abstract Mind", views: 3405, likes: 390, saves: 189, img: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=100&h=100&fit=crop" },
  ]

  const demographics = [
    { label: "Indonesia", pct: 52 },
    { label: "Malaysia", pct: 18 },
    { label: "Singapore", pct: 14 },
    { label: "Others", pct: 16 },
  ]

  return (
    <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4 space-y-4">
      {/* Period selector */}
      <div className="flex gap-2">
        {(["7d", "30d", "90d"] as const).map((p) => (
          <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${period === p ? "bg-[#3D5898] text-white" : "bg-white text-[#7A8BB5] shadow-sm"}`}>{p}</button>
        ))}
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Total Views", value: "16.3K", trend: "+18%", up: true },
          { label: "Total Likes", value: "2,841", trend: "+31%", up: true },
          { label: "Total Saves", value: "912", trend: "+24%", up: true },
          { label: "Avg. Eng. Rate", value: "8.4%", trend: "+2.1%", up: true },
        ].map(({ label, value, trend, up }) => (
          <div key={label} className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-[#9BAACE] text-xs mb-1">{label}</p>
            <p className="text-[#1E2D5A] font-extrabold text-xl">{value}</p>
            <p className={`text-xs font-bold mt-1 ${up ? "text-green-500" : "text-red-400"}`}>{trend} vs last period</p>
          </div>
        ))}
      </div>

      {/* Daily views chart */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="font-bold text-[#1E2D5A] text-sm mb-4">Daily Views (this week)</p>
        <div className="flex items-end gap-1.5 h-24">
          {weekViews.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-md" style={{ height: `${(v / maxViews) * 80}px`, background: i === 5 ? "#3D5898" : "#E0E5F2" }} />
              <span className="text-[9px] text-[#9BAACE]">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top artworks */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="font-bold text-[#1E2D5A] text-sm mb-3">Top Performing Artworks</p>
        <div className="space-y-3">
          {topArtworks.map((art, i) => (
            <div key={art.title} className="flex items-center gap-3">
              <span className="text-[#9BAACE] font-extrabold text-sm w-5 text-center">{i + 1}</span>
              <img src={art.img} alt={art.title} className="w-10 h-10 rounded-xl object-cover flex-none" />
              <div className="flex-1 min-w-0">
                <p className="text-[#1E2D5A] font-bold text-sm truncate">{art.title}</p>
                <div className="flex items-center gap-3 text-[#9BAACE] text-[10px] mt-0.5">
                  <span>{art.views.toLocaleString()} views</span>
                  <span>{art.likes} likes</span>
                  <span>{art.saves} saves</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audience demographics */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="font-bold text-[#1E2D5A] text-sm mb-3">Audience Location</p>
        <div className="space-y-2.5">
          {demographics.map((d) => (
            <div key={d.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-[#1E2D5A]">{d.label}</span>
                <span className="font-bold text-[#9BAACE]">{d.pct}%</span>
              </div>
              <div className="h-2 bg-[#F4F5F9] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#3D5898] to-[#5B4A9A]" style={{ width: `${d.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buyer insights */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="font-bold text-[#1E2D5A] text-sm mb-3">Buyer Insights</p>
        <div className="grid grid-cols-3 gap-3">
          {[{ v: "68%", l: "Repeat buyers" }, { v: "Rp 3.8M", l: "Avg. order" }, { v: "4.9★", l: "Avg. rating" }].map(({ v, l }) => (
            <div key={l} className="bg-[#F4F5F9] rounded-xl p-3 text-center">
              <p className="text-[#1E2D5A] font-extrabold text-base">{v}</p>
              <p className="text-[#9BAACE] text-[10px] mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
type TabKey = "home" | "studio" | "sales" | "community" | "analytics"

export default function PainterDashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const [tab, setTab] = useState<TabKey>(() => {
    const seg = location.pathname.split("/").pop() as TabKey
    return (["home", "studio", "sales", "community", "analytics"] as TabKey[]).includes(seg) ? seg : "home"
  })

  useEffect(() => {
    const seg = location.pathname.split("/").pop() as TabKey
    const valid: TabKey[] = ["home", "studio", "sales", "community", "analytics"]
    if (valid.includes(seg)) setTab(seg)
  }, [location.pathname])

  const navItems: { key: TabKey; label: string }[] = [
    { key: "home", label: "Home" },
    { key: "studio", label: "Studio" },
    { key: "sales", label: "Sales" },
    { key: "community", label: "Community" },
    { key: "analytics", label: "Analytics" },
  ]

  return (
    <div className="h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito] overflow-hidden">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-3 flex items-center justify-between flex-shrink-0 shadow-sm z-20">
        <div className="flex items-center gap-2">
          <KLogo />
          <span className="font-extrabold text-[#1E2D5A] text-base">
            {tab === "home" && "Painter"}
            {tab === "studio" && "Studio"}
            {tab === "sales" && "Sales Hub"}
            {tab === "community" && "Community"}
            {tab === "analytics" && "Analytics"}
          </span>
          <span className="text-xs text-[#9BAACE] font-semibold bg-[#F4F5F9] px-2 py-0.5 rounded-full ml-1">Visual Artist</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/artist/help")} className="w-9 h-9 rounded-full bg-[#F4F5F9] flex items-center justify-center active:scale-95 transition-transform">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#7A8BB5" strokeWidth="1.8"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke="#7A8BB5" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
          <button className="w-9 h-9 rounded-full bg-[#F4F5F9] flex items-center justify-center relative active:scale-95 transition-transform">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#7A8BB5" strokeWidth="1.8" strokeLinecap="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#7A8BB5" strokeWidth="1.8" strokeLinecap="round"/></svg>
            <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border border-white" />
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {tab === "home" && <HomeTab navigate={navigate} />}
        {tab === "studio" && <StudioTab navigate={navigate} />}
        {tab === "sales" && <SalesTab navigate={navigate} />}
        {tab === "community" && <CommunityTab navigate={navigate} />}
        {tab === "analytics" && <AnalyticsTab />}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] px-2 flex-shrink-0 z-20">
        <div className="flex">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`flex-1 flex flex-col items-center py-3 gap-0.5 transition-colors ${tab === item.key ? "text-[#3D5898]" : "text-[#C8D0E8]"}`}
            >
              <NavIcon type={item.key} active={tab === item.key} />
              <span className="text-[9px] font-bold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
