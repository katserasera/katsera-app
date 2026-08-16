import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export default function ConcertTerms() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as { category: { label: string; price: number }; qty: number } | null
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-0 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-[#3D5898] font-extrabold text-xl">K Shop</span>
        </div>
        <p className="text-xs text-[#7A8BB5] font-semibold mb-3">← KONSER: Semua Aku Dirayakan</p>
        <div className="flex border-b border-[#E8E8E8]">
          {["Tiket", "Syarat dan Ketentuan"].map((label) => (
            <button
              key={label}
              className={`flex-1 py-2.5 text-sm font-bold transition-all ${label === "Syarat dan Ketentuan" ? "text-[#3D5898] border-b-2 border-[#3D5898]" : "text-[#7A8BB5]"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-5 overflow-y-auto pb-36">
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4 text-sm leading-relaxed text-[#1E2D5A]">
          <h2 className="font-extrabold text-base text-[#3D5898]">Selamat Datang di Katsera!</h2>
          <p className="text-[#7A8BB5] text-xs">Harap baca syarat dan ketentuan berikut dengan seksama sebelum melanjutkan pembelian tiket Anda.</p>

          <div className="bg-[#3D5898]/5 rounded-xl p-4">
            <h3 className="font-bold text-[#3D5898] mb-2">Ketentuan Umum</h3>
            <ol className="space-y-2 text-xs text-[#7A8BB5] list-decimal list-inside">
              <li>Batasan Pembelian: Pembelian tiket hanya dapat dilakukan melalui platform resmi Katsera. Pembelian di luar platform tidak dijamin keabsahannya.</li>
              <li>E-Ticket: Setiap transaksi menghasilkan satu E-Ticket yang mencantumkan QR Code. E-Ticket tidak dapat dipindahtangankan, difotokopi, atau digandakan dalam bentuk apapun.</li>
              <li>Metode Pembayaran: Pembayaran harus dilakukan secara online melalui metode yang tersedia.</li>
              <li>Waktu Pembayaran: Pembayaran harus diselesaikan dalam 30 menit setelah pemesanan. Jika tidak, pesanan akan otomatis dibatalkan.</li>
              <li>Pengembalian Dana: Tiket yang sudah dibeli tidak dapat dikembalikan atau ditukar.</li>
              <li>Penggunaan E-Ticket: Tiket yang sudah diproses/scan oleh pihak penyelenggara tidak dapat diproses ulang oleh pihak manapun.</li>
              <li>Masalah Teknis: Apabila terjadi error, pembeli wajib menghubungi Customer Service Katsera dalam waktu 1x24 jam setelah transaksi.</li>
            </ol>
          </div>

          <div className="bg-[#3D5898]/5 rounded-xl p-4">
            <h3 className="font-bold text-[#3D5898] mb-2">Informasi E-Ticket</h3>
            <ol className="space-y-2 text-xs text-[#7A8BB5] list-decimal list-inside" start={2}>
              <li>Validasi E-Ticket: Tiket QR Code hanya dapat divalidasi melalui aplikasi Katsera.</li>
              <li>Pengiriman E-Ticket: E-Ticket akan dikirimkan ke media sosial/email pembeli dalam 1x24 jam.</li>
              <li>Konversi E-Ticket: Katsera memiliki hak untuk mengkonversi E-Ticket ke media fisik apabila diperlukan.</li>
              <li>Masalah Penyelenggaraan: Katsera tidak bertanggung jawab atas masalah yang ditimbulkan oleh pihak penyelenggara acara terkait tiket yang berlaku di tanggal yang tertera.</li>
            </ol>
          </div>

          <div className="bg-[#F4F5F9] rounded-xl p-4">
            <h3 className="font-bold text-[#1E2D5A] mb-2">Tim Katsera</h3>
            <p className="text-xs text-[#7A8BB5]">Dengan melanjutkan pembelian, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan yang berlaku.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8E8E8] px-5 py-4 space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-5 h-5 accent-[#3D5898] rounded" />
          <span className="text-sm text-[#1E2D5A] font-semibold">Saya setuju dengan syarat dan ketentuan</span>
        </label>
        <button
          disabled={!agreed}
          onClick={() => navigate("/fan/concert/data", { state })}
          className={`w-full py-4 rounded-full font-extrabold text-base transition-all active:scale-95 ${agreed ? "bg-[#3D5898] text-white" : "bg-[#C8D0E8] text-[#7A8BB5] cursor-not-allowed"}`}
        >
          Lanjutkan
        </button>
      </div>
    </div>
  )
}
