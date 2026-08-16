import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

function fmt(n: number) { return "Rp" + n.toLocaleString("id-ID") }

export default function ShopCheckout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { product, qty, size } = (location.state as { product: { name: string; artist: string; price: number; image: string; tag: string }; qty: number; size: string | null }) || {
    product: { name: "T-Shirt Official", artist: "Nadin Amizah", price: 149000, image: "👕", tag: "Merch" },
    qty: 1,
    size: "M",
  }

  const [address, setAddress] = useState("Jl. Sudirman No. 12, Jakarta Pusat, DKI Jakarta 10220")
  const [editingAddress, setEditingAddress] = useState(false)
  const [addressDraft, setAddressDraft] = useState(address)
  const subtotal = product.price * qty
  const shipping = 15000
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span className="text-[#1E2D5A] font-extrabold text-lg">Checkout</span>
      </div>

      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto pb-32">
        {/* Item */}
        <div className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#3D5898]/10 to-[#3D5898]/20 flex items-center justify-center text-3xl flex-none">
            {product.image}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#7A8BB5] font-semibold">{product.artist}</p>
            <p className="text-sm text-[#1E2D5A] font-bold leading-snug line-clamp-2">{product.name}</p>
            {size && <p className="text-xs text-[#7A8BB5] mt-0.5">Size: {size}</p>}
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-[#7A8BB5]">Qty: {qty}</span>
              <span className="text-[#3D5898] font-extrabold text-sm">{fmt(product.price * qty)}</span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="font-bold text-[#1E2D5A] text-sm">Delivery Address</p>
            <button onClick={() => { setAddressDraft(address); setEditingAddress(true) }} className="text-xs text-[#3D5898] font-bold active:opacity-60">Change</button>
          </div>
          <div className="flex gap-2">
            <svg className="mt-0.5 flex-none" width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#3D5898" strokeWidth="2"/><circle cx="12" cy="9" r="2.5" stroke="#3D5898" strokeWidth="2"/></svg>
            <p className="text-xs text-[#7A8BB5] leading-relaxed">{address}</p>
          </div>
        </div>

        {/* Shipping */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-[#1E2D5A] text-sm mb-3">Shipping Method</p>
          {[["JNE Regular", "2-3 hari", 15000], ["JNE Express", "1-2 hari", 25000], ["SiCepat", "1 hari", 22000]].map(([name, est, price]) => (
            <label key={String(name)} className="flex items-center justify-between py-2 border-b border-[#F4F5F9] last:border-0 cursor-pointer">
              <div className="flex items-center gap-2">
                <input type="radio" name="ship" defaultChecked={name === "JNE Regular"} className="accent-[#3D5898]" />
                <div>
                  <p className="text-sm font-semibold text-[#1E2D5A]">{name}</p>
                  <p className="text-xs text-[#7A8BB5]">{est}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-[#3D5898]">{fmt(Number(price))}</span>
            </label>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
          <p className="font-bold text-[#1E2D5A] text-sm mb-1">Order Summary</p>
          <div className="flex justify-between text-sm"><span className="text-[#7A8BB5]">Subtotal</span><span className="font-semibold text-[#1E2D5A]">{fmt(subtotal)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-[#7A8BB5]">Shipping</span><span className="font-semibold text-[#1E2D5A]">{fmt(shipping)}</span></div>
          <div className="border-t border-[#F4F5F9] pt-2 flex justify-between"><span className="font-bold text-[#1E2D5A]">Total</span><span className="font-extrabold text-[#3D5898] text-base">{fmt(total)}</span></div>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] px-5 py-4">
        <button
          onClick={() => navigate("/fan/shop/payment", { state: { total, product } })}
          className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-all"
        >
          Proceed to Payment
        </button>
      </div>

      {/* Address edit modal */}
      {editingAddress && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-5 space-y-4">
            <div className="w-10 h-1 rounded-full bg-[#E0E5F2] mx-auto" />
            <p className="font-extrabold text-[#1E2D5A] text-base">Change Delivery Address</p>
            <div className="bg-[#F4F5F9] rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#3D5898]">
              <textarea value={addressDraft} onChange={(e) => setAddressDraft(e.target.value)} rows={3} className="w-full bg-transparent text-[#1E2D5A] font-semibold text-sm outline-none resize-none" />
            </div>
            <button onClick={() => { setAddress(addressDraft); setEditingAddress(false) }} className="w-full py-3.5 rounded-full bg-[#3D5898] text-white font-extrabold text-sm">Save Address</button>
            <button onClick={() => setEditingAddress(false)} className="w-full py-3.5 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-extrabold text-sm">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
