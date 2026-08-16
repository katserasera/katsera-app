import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AIFilteredWords() {
  const navigate = useNavigate()
  const [words, setWords] = useState([
    { id: 1, word: "konten gajelas", duration: "Permanently" },
    { id: 2, word: "cringe", duration: "Permanently" },
  ])
  const [showAdd, setShowAdd] = useState(false)
  const [newWord, setNewWord] = useState("")
  const [duration, setDuration] = useState("Permanently")

  const addWord = () => {
    if (!newWord.trim()) return
    setWords((prev) => [...prev, { id: Date.now(), word: newWord.trim(), duration }])
    setNewWord("")
    setShowAdd(false)
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      {/* Header */}
      <div className="bg-[#E8E8E8] px-4 pt-12 pb-4">
        <div className="flex items-center gap-2 text-sm text-[#7A8BB5] font-semibold">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 hover:text-[#3D5898]">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            AI Moderation
          </button>
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          <span className="text-[#1E2D5A]">Filtered Words</span>
        </div>
      </div>

      <div className="flex-1 px-4">
        {words.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {words.map((item, i) => (
              <div key={item.id} className={`flex items-center justify-between px-5 py-4 ${i < words.length - 1 ? "border-b border-[#F4F5F9]" : ""}`}>
                <div>
                  <p className="text-[#1E2D5A] font-semibold text-sm">{item.word}</p>
                  <p className="text-[#7A8BB5] text-xs">{item.duration}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setWords((prev) => prev.filter((w) => w.id !== item.id))}
                    className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center"
                  >
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round"/></svg>
                  </button>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" stroke="#3D5898" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-[#7A8BB5]">
            <p className="text-4xl mb-3">🛡</p>
            <p className="font-semibold">No filtered words yet</p>
            <p className="text-xs mt-1">Add words to automatically block from live chat</p>
          </div>
        )}

        {/* AI info banner */}
        <div className="mt-4 bg-[#3D5898]/10 rounded-2xl p-3 flex items-start gap-2">
          <svg className="mt-0.5 flex-none" width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#3D5898" strokeWidth="2" fill="#3D5898" fillOpacity="0.2"/></svg>
          <p className="text-xs text-[#3D5898] leading-relaxed">
            <span className="font-bold">AI-powered: </span>
            Katsera AI also learns from your blocked patterns and automatically suggests new words to filter based on your audience behavior.
          </p>
        </div>
      </div>

      {/* Add modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end max-w-md mx-auto">
          <div className="w-full bg-white rounded-t-3xl p-6">
            <h3 className="font-extrabold text-[#1E2D5A] text-lg mb-4">Add Filtered Word</h3>
            <input
              autoFocus
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addWord()}
              placeholder="Enter word or phrase…"
              className="w-full bg-[#F4F5F9] rounded-full px-4 py-3 text-sm outline-none border border-[#C8D0E8] mb-4"
            />
            <div className="flex gap-2 mb-5">
              {["Permanently", "30 days", "7 days"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${duration === d ? "bg-[#3D5898] text-white" : "bg-[#F4F5F9] text-[#7A8BB5]"}`}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-3 rounded-full border-2 border-[#C8D0E8] text-[#7A8BB5] font-bold text-sm">
                Cancel
              </button>
              <button onClick={addWord} className="flex-1 py-3 rounded-full bg-[#3D5898] text-white font-extrabold text-sm">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setShowAdd(true)}
        className="fixed bottom-8 right-8 max-w-md w-14 h-14 rounded-2xl bg-[#3D5898] flex items-center justify-center shadow-xl active:scale-95 transition-all z-30"
        style={{ right: "calc(50% - 192px + 32px)" }}
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
      </button>
    </div>
  )
}
