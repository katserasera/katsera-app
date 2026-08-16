import { useState } from "react"
import { useNavigate } from "react-router-dom"
import katseraLogo from "@/imports/katsera_logo.png"

const KLogo = () => <img src={katseraLogo} alt="Katsera" style={{ width: 22, height: 26, objectFit: "contain" as const }} />

const BackHeader = ({ title, onBack, action }: { title: string; onBack: () => void; action?: React.ReactNode }) => (
  <div className="flex items-center gap-3 px-5 pt-12 pb-4">
    <button onClick={onBack} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm flex-none">
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
    <KLogo />
    <span className="flex-1 font-extrabold text-[#1E2D5A] text-lg">{title}</span>
    {action}
  </div>
)

type Field = { label: string; key: string; placeholder: string; type?: string; multiline?: boolean }

const profileFields: Field[] = [
  { label: "Display Name", key: "displayName", placeholder: "Your public name" },
  { label: "Username", key: "username", placeholder: "@username" },
  { label: "Email", key: "email", placeholder: "you@example.com", type: "email" },
  { label: "Phone Number", key: "phone", placeholder: "+62 812 3456 7890", type: "tel" },
  { label: "Country", key: "country", placeholder: "Indonesia" },
  { label: "City", key: "city", placeholder: "Jakarta" },
  { label: "Website", key: "website", placeholder: "https://yoursite.com", type: "url" },
]

const socialFields: Field[] = [
  { label: "Instagram", key: "instagram", placeholder: "@nadin.amizah" },
  { label: "TikTok", key: "tiktok", placeholder: "@nadinamizah" },
  { label: "YouTube", key: "youtube", placeholder: "youtube.com/@nadinamizah" },
  { label: "Spotify", key: "spotify", placeholder: "Nadin Amizah" },
  { label: "X (Twitter)", key: "twitter", placeholder: "@nadinamizah" },
]

type FormState = Record<string, string>

export default function EditProfile() {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>({
    displayName: "Nadin Amizah",
    username: "nadinamizah",
    email: "nadin@katsera.id",
    phone: "+62 812 3456 7890",
    country: "Indonesia",
    city: "Jakarta",
    website: "https://nadinamizah.com",
    bio: "Singer-songwriter from Indonesia. Music is my language.",
    instagram: "@nadin.amizah",
    tiktok: "@nadinamizah",
    youtube: "youtube.com/@nadinamizah",
    spotify: "Nadin Amizah",
    twitter: "@nadinamizah",
  })
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "taken">("idle")
  const [showDiscard, setShowDiscard] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const bioMax = 160

  const handleChange = (key: string, val: string) => {
    setForm((p) => ({ ...p, [key]: val }))
    if (key === "username") {
      setUsernameStatus("checking")
      setTimeout(() => setUsernameStatus(val.length > 3 ? "available" : "taken"), 800)
    }
    if (errors[key]) setErrors((p) => { const n = { ...p }; delete n[key]; return n })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.displayName.trim()) e.displayName = "Display name is required"
    if (!form.username.trim()) e.username = "Username is required"
    if (usernameStatus === "taken") e.username = "Username is already taken"
    if (!form.email.includes("@")) e.email = "Enter a valid email"
    return e
  }

  const handleSave = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); setSaved(true); setTimeout(() => navigate(-1), 1400) }, 1200)
  }

  if (saved) return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col items-center justify-center max-w-md mx-auto font-[Nunito] gap-4">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <p className="font-extrabold text-[#1E2D5A] text-xl">Profile Updated!</p>
      <p className="text-[#7A8BB5] text-sm">Your changes have been saved.</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <BackHeader title="Edit Profile" onBack={() => setShowDiscard(true)} />

      <div className="flex-1 px-5 pb-32 overflow-y-auto space-y-5">
        {/* Avatar */}
        <button onClick={() => navigate("/artist/profile/photo")} className="flex flex-col items-center gap-2 w-full py-2">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#3D5898]">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#3D5898] flex items-center justify-center">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="white" strokeWidth="2"/><circle cx="12" cy="13" r="4" stroke="white" strokeWidth="2"/></svg>
            </div>
          </div>
          <span className="text-[#3D5898] text-xs font-extrabold">Change Photo</span>
        </button>

        {/* Biography */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="font-extrabold text-[#1E2D5A] text-sm">Biography</p>
            <span className={`text-xs font-semibold ${form.bio.length > bioMax ? "text-red-500" : "text-[#9BAACE]"}`}>{form.bio.length}/{bioMax}</span>
          </div>
          <div className={`bg-white rounded-2xl px-4 py-3 border-2 transition-colors shadow-sm ${errors.bio ? "border-red-400" : "border-transparent focus-within:border-[#3D5898]"}`}>
            <textarea
              value={form.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={3}
              maxLength={bioMax + 20}
              className="w-full bg-transparent text-[#1E2D5A] font-semibold text-sm outline-none resize-none"
              placeholder="Tell fans about yourself..."
            />
          </div>
        </div>

        {/* Profile fields */}
        <div className="space-y-3">
          <p className="font-extrabold text-[#1E2D5A] text-sm uppercase tracking-widest text-xs">Profile Info</p>
          {profileFields.map(({ label, key, placeholder, type }) => (
            <div key={key}>
              <p className="font-bold text-[#1E2D5A] text-xs mb-1">{label}</p>
              <div className={`bg-white rounded-2xl px-4 py-3.5 border-2 transition-colors shadow-sm ${errors[key] ? "border-red-400" : "border-transparent focus-within:border-[#3D5898]"}`}>
                <div className="flex items-center gap-2">
                  {key === "username" && <span className="text-[#9BAACE] font-semibold text-sm">@</span>}
                  <input
                    type={type ?? "text"}
                    value={key === "username" ? form[key].replace("@", "") : form[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="flex-1 bg-transparent text-[#1E2D5A] font-semibold text-sm outline-none"
                    placeholder={placeholder}
                  />
                  {key === "username" && usernameStatus !== "idle" && (
                    <span className={`text-xs font-bold flex-none ${usernameStatus === "available" ? "text-green-500" : usernameStatus === "checking" ? "text-[#9BAACE]" : "text-red-500"}`}>
                      {usernameStatus === "checking" ? "..." : usernameStatus === "available" ? "✓ Available" : "✗ Taken"}
                    </span>
                  )}
                </div>
              </div>
              {errors[key] && <p className="text-red-500 text-xs mt-1 ml-1">{errors[key]}</p>}
            </div>
          ))}
        </div>

        {/* Genre + Language shortcuts */}
        <div className="space-y-3">
          {[
            { label: "Music Genres", path: "/artist/profile/genres", value: "Pop, Folk, Indie" },
            { label: "Languages", path: "/artist/profile/languages", value: "Indonesian, English" },
          ].map(({ label, path, value }) => (
            <div key={label}>
              <p className="font-bold text-[#1E2D5A] text-xs mb-1">{label}</p>
              <button onClick={() => navigate(path)} className="w-full bg-white rounded-2xl px-4 py-3.5 border-2 border-transparent shadow-sm flex items-center justify-between">
                <span className="text-[#1E2D5A] font-semibold text-sm">{value}</span>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#9BAACE" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="space-y-3">
          <p className="font-extrabold text-[#1E2D5A] text-xs uppercase tracking-widest">Social Links</p>
          {socialFields.map(({ label, key, placeholder }) => (
            <div key={key}>
              <p className="font-bold text-[#1E2D5A] text-xs mb-1">{label}</p>
              <div className="bg-white rounded-2xl px-4 py-3.5 border-2 border-transparent focus-within:border-[#3D5898] transition-colors shadow-sm">
                <input
                  type="text"
                  value={form[key] ?? ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full bg-transparent text-[#1E2D5A] font-semibold text-sm outline-none"
                  placeholder={placeholder}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom action */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-5 pb-6 pt-3 bg-[#E8E8E8]">
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Saving…</> : "Save Changes"}
        </button>
      </div>

      {/* Discard dialog */}
      {showDiscard && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 space-y-4">
            <p className="font-extrabold text-[#1E2D5A] text-lg text-center">Discard Changes?</p>
            <p className="text-[#7A8BB5] text-sm text-center">Your edits will be lost if you leave now.</p>
            <button onClick={() => navigate(-1)} className="w-full py-3.5 rounded-full bg-red-500 text-white font-extrabold text-sm">Discard</button>
            <button onClick={() => setShowDiscard(false)} className="w-full py-3.5 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-extrabold text-sm">Keep Editing</button>
          </div>
        </div>
      )}
    </div>
  )
}
