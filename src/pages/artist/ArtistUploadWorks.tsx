import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ArtistUploadWorks() {
  const navigate = useNavigate()
  const [uploaded, setUploaded] = useState(false)

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto px-6 pt-12 pb-10">
      <h1 className="text-[#1E2D5A] text-4xl font-extrabold mb-2">
        Artist Profile Setup
      </h1>
      <p className="text-[#7A8BB5] text-base font-medium mb-10 leading-relaxed">
        Make portfolio by show media files<br />(images, audio, video).
      </p>

      {/* Upload zone */}
      <button
        onClick={() => setUploaded(true)}
        className={`w-full border-2 rounded-2xl py-10 flex flex-col items-center gap-4 mb-6 transition-all active:scale-95 ${
          uploaded
            ? "bg-[#3D5898]/10 border-[#3D5898]"
            : "bg-white border-[#3D5898] hover:bg-[#F4F5F9]"
        }`}
      >
        {uploaded ? (
          <>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3D5898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-[#3D5898] font-bold text-base">3 files uploaded</span>
          </>
        ) : (
          <>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3D5898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 16 12 12 8 16" />
              <line x1="12" y1="12" x2="12" y2="21" />
              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
            </svg>
            <span className="text-[#3D5898] font-bold text-base">Upload your work</span>
          </>
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-[#C8D0E8]" />
        <span className="text-[#9BAACE] text-sm font-medium">or</span>
        <div className="flex-1 h-px bg-[#C8D0E8]" />
      </div>

      {/* Instagram import */}
      <button className="w-full flex items-center justify-center gap-3 py-4 rounded-full border-2 border-[#3D5898] bg-white text-[#1E2D5A] font-bold text-base hover:bg-[#F4F5F9] active:scale-95 transition-all mb-8">
        <svg width="22" height="22" viewBox="0 0 24 24">
          <defs>
            <radialGradient id="ig-grad2" cx="30%" cy="107%" r="150%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <rect width="24" height="24" rx="5" fill="url(#ig-grad2)" />
          <circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
        </svg>
        Import from Instagram
      </button>

      <button
        onClick={() => navigate("/artist/approval")}
        className="w-full py-4 rounded-full bg-[#3D5898] text-white font-bold text-lg hover:bg-[#2D4270] active:scale-95 transition-all shadow-md"
      >
        Finish
      </button>
    </div>
  )
}
