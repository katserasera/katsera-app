import { useNavigate } from "react-router-dom"

const courses = [
  {
    id: 1,
    title: "The Digital Singer: Membangun 'Panggung' Sendiri",
    instructor: "Satria Ramadhan, Senior Brand Management",
    videos: 3,
    color: "#E8EDF5",
    accent: "#3D5898",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
  },
  {
    id: 2,
    title: "Art Business: Manajemen Karier & Nilai Karya",
    instructor: "Kerenasti Tori, Independent Art Curator & Consultant",
    videos: 5,
    color: "#F5EDE8",
    accent: "#C4783A",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
  },
  {
    id: 3,
    title: "Theater Branding: Membangun Pasukan Penonton Loyal",
    instructor: "Aria Satria, Executive Producer Theater",
    videos: 4,
    color: "#EEE8F5",
    accent: "#6B3D98",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
  },
  {
    id: 4,
    title: "Theater Branding: Membangun Pasukan Penonton Loyal",
    instructor: "Aria Satria, Executive Producer Theater",
    videos: 4,
    color: "#F5F0E8",
    accent: "#A07840",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop",
  },
]

export default function KatseraAcademy() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F4F5F9] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 border-b border-[#F0F2F8]">
        <div className="flex items-center justify-center mb-2">
          <svg width="28" height="32" viewBox="0 0 60 69" fill="none">
            <path d="M10 8 L10 61" stroke="#3D5898" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 34 L48 10" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 34 L48 60" stroke="#3D5898" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#3D5898" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-[#3D5898] font-extrabold text-lg"> Katsera Academy</span>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto pb-28">
        <p className="text-xs text-[#7A8BB5] mb-4 leading-relaxed">
          Complete these strategic video to maximize your global revenue potential
        </p>

        <div className="space-y-3">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => navigate("/academy/player", { state: { courseId: course.id } })}
              className="w-full text-left rounded-2xl overflow-hidden shadow-sm active:scale-[0.98] transition-transform"
              style={{ background: course.color }}
            >
              <div className="p-4 flex items-start gap-4">
                <div className="flex-1">
                  <p className="font-extrabold text-[#1E2D5A] text-sm leading-snug mb-1">{course.title}</p>
                  <p className="text-xs text-[#7A8BB5] leading-snug mb-3">{course.instructor}</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: course.accent }}>
                      <svg width="8" height="10" fill="white" viewBox="0 0 10 12"><path d="M0 0v12l10-6z"/></svg>
                    </div>
                    <span className="text-xs font-bold" style={{ color: course.accent }}>{course.videos} video</span>
                  </div>
                </div>
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-none shadow-sm">
                  <img src={course.img} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* AI recommendation banner */}
        <div className="mt-4 bg-gradient-to-r from-[#3D5898] to-[#2D4270] rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-none">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2"/><path d="M6 20v-2a6 6 0 0 1 12 0v2" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M18 8l2 2m0 0l2-2m-2 2V6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <div>
            <p className="text-white font-extrabold text-sm">AI Recommends for You</p>
            <p className="text-white/70 text-xs">Based on your artist profile and growth patterns</p>
          </div>
        </div>
      </div>

      {/* Artist bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md">
        <div className="mx-4 mb-4 bg-white rounded-full flex shadow-lg border border-[#E8E8E8]">
          {[
            { key: "home", label: "Home", path: "/artist/dashboard", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg> },
            { key: "sales", label: "Sales Hub", path: "/artist/dashboard", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M8 12h8M8 8h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
            { key: "notif", label: "Alerts", path: "/artist/dashboard", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
            { key: "learn", label: "Learn", path: "/artist/academy", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg> },
            { key: "more", label: "More", path: "/artist/dashboard", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/><circle cx="5" cy="12" r="1" fill="currentColor"/></svg> },
          ].map((t) => (
            <button key={t.key} onClick={() => navigate(t.path)} className={`flex-1 flex flex-col items-center py-3 gap-0.5 ${t.key === "learn" ? "text-[#3D5898]" : "text-[#C8D0E8]"}`}>
              {t.icon}
              <span className="text-[9px] font-bold">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
