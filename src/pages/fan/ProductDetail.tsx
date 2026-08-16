import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const products: Record<string, { name: string; artist: string; price: number; image: string; tag: string; desc: string; sizes?: string[] }> = {
  "101": { name: "T-Shirt 'Semua Aku Tanyakan' Official", artist: "Nadin Amizah", price: 149000, image: "👕", tag: "Merch", desc: "Official merchandise from Nadin Amizah's 'Semua Aku Tanyakan' era. Premium cotton, unisex fit, available in multiple sizes.", sizes: ["S", "M", "L", "XL", "XXL"] },
  "102": { name: "Album 'Tiara' (Deluxe Ver.)", artist: "Nadin Amizah", price: 275000, image: "💿", tag: "Album", desc: "Deluxe version includes full photobook (80 pages), 3 photocards, and exclusive B-side tracks. Signed edition available." },
  "103": { name: "TICKET Live Concert Edelweis Showcase", artist: "Nadin Amizah", price: 450000, image: "🎫", tag: "Concert", desc: "Live concert at Gelora Bung Karno, 22 Oktober 2026. Festival standing category. Non-refundable." },
  "201": { name: "Bernadya Tour Tote Bag", artist: "Bernadya", price: 120000, image: "👜", tag: "Merch", desc: "Canvas tote bag from the Bernadya 2026 Tour collection. Durable canvas, printed graphic, 40L capacity." },
  "301": { name: "T-Shirt 'Tiara Era' Minimal logo + pastel aesthetic", artist: "Tiara Andini", price: 199000, image: "👕", tag: "Merch", desc: "Minimal design with pastel aesthetic from Tiara Andini's Tiara Era. Soft cotton blend.", sizes: ["S", "M", "L", "XL"] },
  "302": { name: "Album 'Tiara' (Deluxe Ver.) Included Photobook & Photocards", artist: "Tiara Andini", price: 275000, image: "💿", tag: "Album", desc: "Complete deluxe album package with 80-page photobook and exclusive photocards set." },
}

function fmt(n: number) { return "Rp" + n.toLocaleString("id-ID") }

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [added, setAdded] = useState(false)

  const product = products[id || "101"] || products["101"]

  const handleAddToCart = () => {
    setAdded(true)
    setTimeout(() => navigate("/fan/shop/checkout", { state: { product, qty, size: selectedSize } }), 800)
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#3D5898] to-[#2D4270] h-72 flex items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-9 h-9 bg-white/20 rounded-full flex items-center justify-center"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="text-8xl">{product.image}</div>
        <span className="absolute bottom-4 left-4 text-[10px] bg-white/20 text-white rounded-full px-3 py-1 font-bold backdrop-blur-sm">{product.tag}</span>
      </div>

      <div className="flex-1 bg-white rounded-t-3xl -mt-4 px-5 pt-5 pb-32 overflow-y-auto">
        <p className="text-xs text-[#7A8BB5] font-semibold mb-1">{product.artist}</p>
        <h1 className="text-[#1E2D5A] font-extrabold text-lg leading-snug mb-1">{product.name}</h1>
        <p className="text-[#3D5898] font-extrabold text-xl mb-4">{fmt(product.price)}</p>

        <p className="text-sm text-[#7A8BB5] leading-relaxed mb-5">{product.desc}</p>

        {/* Sizes */}
        {product.sizes && (
          <div className="mb-5">
            <p className="text-xs font-bold text-[#1E2D5A] mb-2 uppercase tracking-wide">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${selectedSize === s ? "bg-[#3D5898] text-white" : "bg-[#F4F5F9] text-[#1E2D5A]"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="mb-5">
          <p className="text-xs font-bold text-[#1E2D5A] mb-2 uppercase tracking-wide">Quantity</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-10 h-10 rounded-xl bg-[#F4F5F9] flex items-center justify-center font-bold text-[#3D5898] text-xl"
            >−</button>
            <span className="text-[#1E2D5A] font-extrabold text-lg w-8 text-center">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-10 h-10 rounded-xl bg-[#3D5898] flex items-center justify-center font-bold text-white text-xl"
            >+</button>
          </div>
        </div>

        {/* Total */}
        <div className="bg-[#F4F5F9] rounded-2xl p-4 flex items-center justify-between mb-6">
          <span className="text-sm font-bold text-[#7A8BB5]">Total</span>
          <span className="text-[#3D5898] font-extrabold text-lg">{fmt(product.price * qty)}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] px-5 py-4">
        <button
          onClick={handleAddToCart}
          disabled={!!product.sizes && !selectedSize}
          className={`w-full py-4 rounded-full font-extrabold text-base transition-all active:scale-95 ${added ? "bg-green-500 text-white" : product.sizes && !selectedSize ? "bg-[#C8D0E8] text-[#7A8BB5] cursor-not-allowed" : "bg-[#3D5898] text-white"}`}
        >
          {added ? "✓ Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  )
}
