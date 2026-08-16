import { useNavigate } from "react-router-dom"

const followingArtists = [
  { id: "1", name: "Reality Club", avatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop" },
  { id: "2", name: "Winona", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop" },
  { id: "3", name: "Erika Richardo", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop" },
  { id: "4", name: "Nadin Amizah", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" },
  { id: "5", name: "Indonesia Theater", avatar: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=80&h=80&fit=crop" },
]

const nadinProducts = [
  { id: "n1", name: "[TIKET] Konser Semua Aku Dirayakan", sub: "dari Nadin Amizah", price: 350000, img: "https://images.unsplash.com/photo-1501386761578-eaa54b08e8d1?w=300&h=300&fit=crop" },
  { id: "n2", name: "T-SHIRT [Ringer Tees] - Merch Album", sub: "Merch Album", price: 185000, img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop" },
]

const rcProducts = [
  { id: "r1", name: "T-SHIRT - Merch Album [EXCLUSIVE]", sub: "", price: 140000, img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop" },
  { id: "r2", name: "CAP - Merch Album [EXCLUSIVE]", sub: "", price: 99000, img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop" },
]

const katseraEditions = [
  { id: "k1", name: "Keychain % The Answer", sub: "Reality Club", price: 20000, img: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=200&h=200&fit=crop" },
  { id: "k2", name: "Keychain Message Reality Club", sub: "Reality Club", price: 20000, img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop" },
]

const fmt = (n: number) => `Rp${n.toLocaleString("id-ID")}`

function ProductCard({ product, onClick }: { product: { id: string; name: string; sub: string; price: number; img: string }; onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-left flex-none w-36 active:scale-95 transition-all">
      <div className="w-36 h-36 rounded-2xl overflow-hidden mb-2 bg-[#F4F5F9]">
        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
      </div>
      {product.sub && <p className="text-[10px] text-[#7A8BB5] font-semibold truncate">{product.sub}</p>}
      <p className="text-xs font-bold text-[#1E2D5A] leading-snug line-clamp-2">{product.name}</p>
      <p className="text-xs font-extrabold text-[#3D5898] mt-1">{fmt(product.price)}</p>
    </button>
  )
}

export default function ShopCollection() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="px-5 pt-12 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="22" height="25" viewBox="0 0 60 69" fill="none">
            <path d="M10 8 L10 61" stroke="#3D5898" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 34 L48 10" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 34 L48 60" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-extrabold text-[#1E2D5A] text-xl">Shop</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/fan/shop/checkout")} className="w-9 h-9 rounded-full border-2 border-[#C8D0E8] flex items-center justify-center active:scale-95 transition-transform">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="#3D5898" strokeWidth="1.8" strokeLinejoin="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/><path d="M16 10a4 4 0 0 1-8 0" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
          <button onClick={() => navigate("/fan/more")} className="w-9 h-9 rounded-full border-2 border-[#C8D0E8] flex items-center justify-center active:scale-95 transition-transform">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Hero banner */}
        <div className="mx-5 mb-4 rounded-2xl overflow-hidden h-36 relative">
          <img src="https://images.unsplash.com/photo-1501386761578-eaa54b08e8d1?w=600&h=300&fit=crop" alt="Live Concert" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E2D5A]/80 to-transparent flex flex-col justify-end p-4">
            <p className="text-white font-extrabold text-sm uppercase tracking-wide">RAN FOR YOUR GIGS</p>
            <p className="text-white/80 text-xs">Live Project Semarang 2026</p>
          </div>
          <button onClick={() => navigate("/fan/concert")} className="absolute top-3 right-3 bg-white/20 rounded-full px-3 py-1 text-white text-[10px] font-bold">Get Tickets</button>
        </div>

        {/* Search bar */}
        <div className="mx-5 mb-5">
          <div className="bg-white rounded-full flex items-center px-4 py-3 gap-2 shadow-sm">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="#7A8BB5" strokeWidth="1.8"/><path d="m21 21-4.35-4.35" stroke="#7A8BB5" strokeWidth="1.8" strokeLinecap="round"/></svg>
            <span className="text-[#7A8BB5] text-sm font-semibold">Find what's trending</span>
          </div>
        </div>

        {/* Following artists row */}
        <div className="mb-5">
          <p className="px-5 font-extrabold text-[#1E2D5A] text-sm mb-3">Following</p>
          <div className="flex gap-3 px-5 overflow-x-auto scrollbar-hide pb-1">
            {followingArtists.map((a) => (
              <button key={a.id} onClick={() => navigate(`/fan/artist/${a.id}`)} className="flex flex-col items-center gap-1.5 flex-none active:scale-95 transition-transform">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#3D5898]">
                  <img src={a.avatar} alt={a.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-[10px] font-bold text-[#1E2D5A] text-center w-16 truncate">{a.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Nadin Amizah section */}
        <div className="mb-5 bg-white mx-5 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <p className="font-extrabold text-[#1E2D5A] text-sm">Nadin Amizah</p>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="#D4A017" strokeWidth="2" fill="#D4A017"/></svg>
            </div>
            <button onClick={() => navigate("/fan/artist/1")} className="text-xs text-[#3D5898] font-extrabold flex items-center gap-1 active:opacity-60">
              Collections
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {nadinProducts.map((p) => (
              <ProductCard key={p.id} product={p} onClick={() => navigate(`/fan/shop/product/${p.id}`)} />
            ))}
          </div>
        </div>

        {/* Reality Club section */}
        <div className="mb-5 bg-white mx-5 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-none border-2 border-[#C8D0E8]">
              <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop" alt="" className="w-full h-full object-cover" />
            </div>
            <p className="font-extrabold text-[#1E2D5A] text-sm flex-1">Reality Club</p>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 mb-3">
            {rcProducts.map((p) => (
              <ProductCard key={p.id} product={p} onClick={() => navigate(`/fan/shop/product/${p.id}`)} />
            ))}
          </div>
          <button onClick={() => navigate("/fan/shop")} className="w-full py-2.5 rounded-full border-2 border-[#C8D0E8] text-[#7A8BB5] font-bold text-xs active:scale-95 transition-transform">
            See All
          </button>
        </div>

        {/* Katsera editions */}
        <div className="mb-5">
          <div className="mx-5 bg-[#3D5898] rounded-2xl p-4 mb-3 flex items-center justify-between">
            <div>
              <p className="font-extrabold text-white text-sm">Katsera editions</p>
              <p className="text-white/70 text-xs mt-0.5">Koleksi Katsera eksklusif dari para seniman pilihan</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="22" height="25" viewBox="0 0 60 69" fill="none">
                <path d="M10 8 L10 61" stroke="white" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 34 L48 10" stroke="white" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 34 L48 60" stroke="white" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="px-5 flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {[...followingArtists.slice(0, 4)].map((a) => (
              <p key={a.id} className="text-[10px] text-[#7A8BB5] font-semibold flex-none">{a.name}</p>
            ))}
          </div>
          <div className="px-5 flex gap-3 overflow-x-auto scrollbar-hide pb-1 mt-2">
            {katseraEditions.map((p) => (
              <ProductCard key={p.id} product={p} onClick={() => navigate(`/fan/shop/product/${p.id}`)} />
            ))}
          </div>
          <div className="px-5 mt-3">
            <button className="w-full py-2.5 rounded-full border-2 border-[#C8D0E8] text-[#7A8BB5] font-bold text-xs">
              See All
            </button>
          </div>
        </div>

        {/* Best sellers */}
        <div className="mb-5">
          <p className="px-5 font-extrabold text-[#1E2D5A] text-sm mb-3">Best</p>
          <div className="px-5 flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {[...nadinProducts, ...rcProducts].slice(0, 3).map((p) => (
              <ProductCard key={p.id} product={p} onClick={() => navigate(`/fan/shop/product/${p.id}`)} />
            ))}
          </div>
          <div className="px-5 mt-3">
            <button className="w-full py-2.5 rounded-full border-2 border-[#C8D0E8] text-[#7A8BB5] font-bold text-xs">
              See All
            </button>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pb-4">
        <div className="bg-white rounded-full flex shadow-lg border border-[#E8E8E8] px-2">
          {[
            { key: "home", label: "Home", path: "/fan/home", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
            { key: "shop", label: "Shop", path: "/fan/shop", active: true, icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
            { key: "channel", label: "Channel", path: "/fan/dm", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 14H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4l-4 4v-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
            { key: "more", label: "More", path: "/fan/more", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="19" cy="12" r="1.2" fill="currentColor"/></svg> },
          ].map((t) => (
            <button key={t.key} onClick={() => navigate(t.path)} className={`flex-1 flex flex-col items-center py-3 gap-0.5 ${t.active ? "text-[#3D5898]" : "text-[#C8D0E8]"}`}>
              {t.icon}
              <span className="text-[9px] font-bold">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
