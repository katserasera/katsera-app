import { useState } from "react"
import { useNavigate } from "react-router-dom"
import katseraLogo from "@/imports/katsera_logo.png"

const KLogo = () => <img src={katseraLogo} alt="Katsera" style={{ width: 22, height: 26, objectFit: "contain" as const }} />

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button onClick={onChange} className={`w-12 h-6 rounded-full transition-colors flex-none relative ${checked ? "bg-[#3D5898]" : "bg-[#C8D0E8]"}`}>
    <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-all ${checked ? "right-0.5" : "left-0.5"}`} />
  </button>
)

const blockedUsers = [
  { id: 1, name: "spamuser99", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop" },
  { id: 2, name: "hater123", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop" },
]

export default function PrivacySettings() {
  const navigate = useNavigate()
  const [settings, setSettings] = useState({
    publicProfile: true,
    hideEarnings: true,
    hideFollowerCount: false,
    hideContact: true,
    showVerifiedBadge: true,
    allowDMs: true,
  })
  const [blocked, setBlocked] = useState(blockedUsers)
  const [saved, setSaved] = useState(false)

  const toggle = (k: keyof typeof settings) => setSettings((p) => ({ ...p, [k]: !p[k] }))
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const groups = [
    {
      title: "Profile Visibility",
      items: [
        { key: "publicProfile" as const, label: "Public Profile", desc: "Anyone can view your profile" },
        { key: "showVerifiedBadge" as const, label: "Show Verified Badge", desc: "Display your verification badge" },
        { key: "hideFollowerCount" as const, label: "Hide Follower Count", desc: "Keep your follower number private" },
      ],
    },
    {
      title: "Earnings & Contact",
      items: [
        { key: "hideEarnings" as const, label: "Hide Earnings", desc: "Don't show your revenue publicly" },
        { key: "hideContact" as const, label: "Hide Contact Info", desc: "Keep email and phone private" },
      ],
    },
    {
      title: "Messaging",
      items: [
        { key: "allowDMs" as const, label: "Allow Direct Messages", desc: "Fans can send you messages" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm flex-none">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <KLogo />
        <span className="flex-1 font-extrabold text-[#1E2D5A] text-lg">Privacy</span>
      </div>

      <div className="flex-1 px-5 pb-32 overflow-y-auto space-y-5">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="font-extrabold text-[#1E2D5A] text-xs uppercase tracking-widest mb-2">{group.title}</p>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {group.items.map((item, i) => (
                <div key={item.key} className={`flex items-center gap-4 px-5 py-4 ${i < group.items.length - 1 ? "border-b border-[#F4F5F9]" : ""}`}>
                  <div className="flex-1">
                    <p className="font-bold text-[#1E2D5A] text-sm">{item.label}</p>
                    <p className="text-[#9BAACE] text-xs mt-0.5">{item.desc}</p>
                  </div>
                  <Toggle checked={settings[item.key]} onChange={() => toggle(item.key)} />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Blocked users */}
        <div>
          <p className="font-extrabold text-[#1E2D5A] text-xs uppercase tracking-widest mb-2">Blocked Users</p>
          {blocked.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <p className="text-[#9BAACE] text-sm font-semibold">No blocked users</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {blocked.map((u, i) => (
                <div key={u.id} className={`flex items-center gap-3 px-5 py-3.5 ${i < blocked.length - 1 ? "border-b border-[#F4F5F9]" : ""}`}>
                  <img src={u.avatar} alt="" className="w-9 h-9 rounded-full object-cover flex-none" />
                  <span className="flex-1 font-semibold text-[#1E2D5A] text-sm">@{u.name}</span>
                  <button onClick={() => setBlocked((p) => p.filter((x) => x.id !== u.id))} className="text-[#3D5898] text-xs font-bold px-3 py-1 rounded-full border-2 border-[#C8D0E8]">Unblock</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-5 pb-6 pt-3 bg-[#E8E8E8]">
        <button onClick={handleSave} className={`w-full py-4 rounded-full font-extrabold text-sm transition-all ${saved ? "bg-green-500 text-white" : "bg-[#3D5898] text-white"}`}>
          {saved ? "✓ Saved" : "Save Privacy Settings"}
        </button>
      </div>
    </div>
  )
}
