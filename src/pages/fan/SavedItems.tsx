import { useState } from "react"
import { useNavigate } from "react-router-dom"

type Tab = "posts" | "wishlist"

const savedPosts = [
  { id: 1, artist: "Nadin Amizah", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop", text: "The moment I step off the stage and feel the energy you brought — nothing compares. Thank you, Jakarta 💙", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop", date: "Jul 20, 2026", likes: 14200 },
  { id: 2, artist: "Bernadya", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop", text: "New song dropping Friday. Been working on this for 2 years. I'm nervous and excited 🎵", img: "", date: "Jul 15, 2026", likes: 8500 },
  { id: 3, artist: "Andi Wijaya", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop", text: "Midnight Bloom just completed. Acrylic on canvas. 80×100cm. This took 3 months 🎨", img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=500&fit=crop", date: "Jul 10, 2026", likes: 3200 },
]

const wishlistItems = [
  { id: 1, name: "World Tour Tee 2026 — Navy", artist: "Nadin Amizah", price: 185000, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop", inStock: true },
  { id: 2, name: "Signed Photo Book — Limited Edition", artist: "Bernadya", price: 450000, img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=200&fit=crop", inStock: true },
  { id: 3, name: "Official Lightstick V3", artist: "Reality Club", price: 350000, img: "https://images.unsplash.com/photo-1549298222-1c31e8915347?w=200&h=200&fit=crop", inStock: false },
  { id: 4, name: "Embroidered Hoodie — Cream", artist: "Nadin Amizah", price: 420000, img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=200&h=200&fit=crop", inStock: true },
]

function fmt(n: number) { return "Rp" + n.toLocaleString("id-ID") }

export default function SavedItems() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>("posts")
  const [posts, setPosts] = useState(savedPosts)
  const [wishlist, setWishlist] = useState(wishlistItems)
  const [removing, setRemoving] = useState<number | null>(null)

  function removePost(id: number) {
    setRemoving(id)
    setTimeout(() => { setPosts((p) => p.filter((x) => x.id !== id)); setRemoving(null) }, 500)
  }

  function removeWishlist(id: number) {
    setRemoving(id)
    setTimeout(() => { setWishlist((p) => p.filter((x) => x.id !== id)); setRemoving(null) }, 500)
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="bg-white px-4 pt-12 pb-0 shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-transform">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <p className="text-[#1E2D5A] font-extrabold text-lg flex-1">Saved</p>
        </div>
        <div className="flex border-b border-[#F4F5F9]">
          {(["posts", "wishlist"] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 py-3 text-xs font-bold transition-colors capitalize border-b-2 ${tab === t ? "text-[#3D5898] border-[#3D5898]" : "text-[#9BAACE] border-transparent"}`}>
              {t === "posts" ? "Saved Posts" : "Wishlist"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto pb-8">
        {tab === "posts" && (
          posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <span className="text-5xl">🔖</span>
              <p className="text-[#1E2D5A] font-bold">No saved posts</p>
              <p className="text-[#9BAACE] text-sm text-center px-8">Posts you save will appear here</p>
            </div>
          ) : posts.map((post) => (
            <div key={post.id} className={`bg-white rounded-2xl overflow-hidden shadow-sm transition-all ${removing === post.id ? "opacity-0 scale-95" : "opacity-100"}`}>
              <div className="p-4 flex items-center gap-3">
                <img src={post.avatar} alt={post.artist} className="w-10 h-10 rounded-full object-cover flex-none" />
                <div className="flex-1">
                  <p className="text-[#1E2D5A] font-extrabold text-sm">{post.artist}</p>
                  <p className="text-[#9BAACE] text-xs">{post.date}</p>
                </div>
                <button onClick={() => removePost(post.id)} className="w-8 h-8 rounded-full bg-[#F4F5F9] flex items-center justify-center active:scale-95 transition-transform">
                  <svg width="14" height="14" fill="none" stroke="#7A8BB5" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>
                </button>
              </div>
              <p className="px-4 pb-3 text-[#1E2D5A] text-sm">{post.text}</p>
              {post.img && <img src={post.img} alt="" className="w-full h-48 object-cover" />}
              <div className="px-4 py-3 flex items-center justify-between border-t border-[#F4F5F9]">
                <span className="text-[#9BAACE] text-xs">{post.likes.toLocaleString()} likes</span>
                <button onClick={() => navigate("/comments", { state: { postTitle: post.text.slice(0, 40) } })} className="text-[#3D5898] text-xs font-bold active:scale-95">View Comments</button>
              </div>
            </div>
          ))
        )}

        {tab === "wishlist" && (
          wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <span className="text-5xl">🛍️</span>
              <p className="text-[#1E2D5A] font-bold">Wishlist is empty</p>
              <p className="text-[#9BAACE] text-sm text-center px-8">Save merchandise to buy later</p>
              <button onClick={() => navigate("/fan/shop")} className="px-6 py-2.5 rounded-full bg-[#3D5898] text-white text-sm font-bold active:scale-95">Browse Shop</button>
            </div>
          ) : wishlist.map((item) => (
            <div key={item.id} className={`bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 transition-all ${removing === item.id ? "opacity-0 scale-95" : "opacity-100"}`}>
              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-none">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                {!item.inStock && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><p className="text-white text-[8px] font-bold">SOLD OUT</p></div>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#1E2D5A] font-bold text-sm leading-tight line-clamp-2">{item.name}</p>
                <p className="text-[#9BAACE] text-xs mt-0.5">{item.artist}</p>
                <p className="text-[#3D5898] font-extrabold text-sm mt-1">{fmt(item.price)}</p>
              </div>
              <div className="flex flex-col gap-2 flex-none">
                {item.inStock ? (
                  <button onClick={() => navigate("/fan/shop/checkout", { state: { item } })} className="px-3 py-1.5 rounded-full bg-[#3D5898] text-white text-xs font-bold active:scale-95 transition-transform">Buy</button>
                ) : (
                  <span className="px-3 py-1.5 rounded-full bg-[#F4F5F9] text-[#9BAACE] text-xs font-bold">Sold Out</span>
                )}
                <button onClick={() => removeWishlist(item.id)} className="px-3 py-1.5 rounded-full border border-[#E0E5F2] text-[#9BAACE] text-xs font-bold active:scale-95 transition-transform">Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
