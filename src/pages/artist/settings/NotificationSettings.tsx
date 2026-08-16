import { useState } from "react"
import { useNavigate } from "react-router-dom"
import katseraLogo from "@/imports/katsera_logo.png"

const KLogo = () => <img src={katseraLogo} alt="Katsera" style={{ width: 22, height: 26, objectFit: "contain" as const }} />

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button onClick={onChange} className={`w-12 h-6 rounded-full transition-colors flex-none relative ${checked ? "bg-[#3D5898]" : "bg-[#C8D0E8]"}`}>
    <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-all ${checked ? "right-0.5" : "left-0.5"}`} />
  </button>
)

type NotifKeys = "newFollowers" | "purchases" | "comments" | "messages" | "revenueUpdates" | "promotions" | "emailNotifs" | "pushNotifs" | "liveAlerts" | "weeklyDigest"

const groups: { title: string; items: { key: NotifKeys; label: string; desc: string }[] }[] = [
  {
    title: "Fan Activity",
    items: [
      { key: "newFollowers", label: "New Followers", desc: "When someone follows your profile" },
      { key: "comments", label: "Comments", desc: "Replies and comments on your posts" },
      { key: "messages", label: "Messages", desc: "Direct messages from fans" },
    ],
  },
  {
    title: "Revenue",
    items: [
      { key: "purchases", label: "Purchases", desc: "When fans buy your content or merch" },
      { key: "revenueUpdates", label: "Revenue Updates", desc: "Weekly earnings summary" },
    ],
  },
  {
    title: "Live & Content",
    items: [
      { key: "liveAlerts", label: "Live Stream Alerts", desc: "Reminders before your scheduled streams" },
      { key: "weeklyDigest", label: "Weekly Digest", desc: "Performance summary every Monday" },
    ],
  },
  {
    title: "Marketing",
    items: [
      { key: "promotions", label: "Promotional Notifications", desc: "Katsera offers and platform updates" },
    ],
  },
  {
    title: "Channels",
    items: [
      { key: "emailNotifs", label: "Email Notifications", desc: "Receive notifications by email" },
      { key: "pushNotifs", label: "Push Notifications", desc: "Receive push notifications on device" },
    ],
  },
]

export default function NotificationSettings() {
  const navigate = useNavigate()
  const [settings, setSettings] = useState<Record<NotifKeys, boolean>>({
    newFollowers: true,
    purchases: true,
    comments: true,
    messages: false,
    revenueUpdates: true,
    promotions: false,
    emailNotifs: true,
    pushNotifs: true,
    liveAlerts: true,
    weeklyDigest: true,
  })
  const [saved, setSaved] = useState(false)

  const toggle = (k: NotifKeys) => setSettings((p) => ({ ...p, [k]: !p[k] }))
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm flex-none">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <KLogo />
        <span className="flex-1 font-extrabold text-[#1E2D5A] text-lg">Notifications</span>
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
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-5 pb-6 pt-3 bg-[#E8E8E8]">
        <button onClick={handleSave} className={`w-full py-4 rounded-full font-extrabold text-sm transition-all ${saved ? "bg-green-500 text-white" : "bg-[#3D5898] text-white"}`}>
          {saved ? "✓ Saved" : "Save Settings"}
        </button>
      </div>
    </div>
  )
}
