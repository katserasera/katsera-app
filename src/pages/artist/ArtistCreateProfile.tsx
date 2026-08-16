import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CATEGORIES = ["Singer", "Musician", "Painter", "Actor", "Illustrator", "Photographer", "Community", "Other"]

export default function ArtistCreateProfile() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [category, setCategory] = useState("")
  const [showCategoryDrop, setShowCategoryDrop] = useState(false)
  const [tags, setTags] = useState(["#indie", "#illustrator"])
  const [newTag, setNewTag] = useState("")
  const [addingTag, setAddingTag] = useState(false)
  const [photo, setPhoto] = useState(false)

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag))

  const addTag = () => {
    const t = newTag.trim().replace(/^#?/, "#")
    if (t && t !== "#" && !tags.includes(t)) setTags([...tags, t])
    setNewTag("")
    setAddingTag(false)
  }

  const inputCls =
    "w-full px-5 py-3.5 rounded-full border-2 border-[#3D5898] bg-white text-[#1E2D5A] placeholder:text-[#9BAACE] focus:outline-none focus:border-[#2D4270] text-base font-medium transition-colors"

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto px-6 pt-12 pb-10 overflow-y-auto">
      <h1 className="text-[#1E2D5A] text-4xl font-extrabold mb-8">
        Create Your Profile
      </h1>

      {/* Photo upload */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setPhoto(true)}
          className="w-28 h-28 rounded-full border-2 border-[#3D5898] bg-[#F0F2FA] flex items-center justify-center hover:bg-[#E8ECFA] active:scale-95 transition-all overflow-hidden"
        >
          {photo ? (
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3D5898" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
        </button>
      </div>

      {/* Name */}
      <p className="text-[#1E2D5A] text-sm font-extrabold mb-2">Name</p>
      <input
        type="text"
        placeholder="Username / Stage Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputCls + " mb-5"}
      />

      {/* Bio */}
      <p className="text-[#1E2D5A] text-sm font-extrabold mb-2">Bio</p>
      <input
        type="text"
        placeholder="Tell about yourself"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className={inputCls + " mb-5"}
      />

      {/* Category */}
      <p className="text-[#1E2D5A] text-sm font-extrabold mb-2">Category</p>
      <div className="relative mb-5">
        <button
          onClick={() => setShowCategoryDrop(!showCategoryDrop)}
          className="w-full px-5 py-3.5 rounded-full border-2 border-[#3D5898] bg-white text-left text-base font-medium transition-colors flex items-center justify-between"
        >
          <span className={category ? "text-[#1E2D5A]" : "text-[#9BAACE]"}>
            {category || "Select Category"}
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D5898" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {showCategoryDrop && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-[#3D5898] rounded-2xl overflow-hidden z-20 shadow-lg">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setShowCategoryDrop(false) }}
                className="w-full px-5 py-3 text-left text-sm font-medium text-[#1E2D5A] hover:bg-[#F0F2FA] transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Skill tags */}
      <p className="text-[#1E2D5A] text-sm font-extrabold mb-3">Skill tags</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((tag) => (
          <span key={tag} className="flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-[#3D5898] bg-white text-[#1E2D5A] text-sm font-semibold">
            Tag: {tag}
            <button onClick={() => removeTag(tag)} className="text-[#9BAACE] hover:text-[#E05A3A] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </span>
        ))}
        {addingTag ? (
          <div className="flex items-center gap-2">
            <input
              autoFocus
              type="text"
              placeholder="#tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTag()}
              className="px-3 py-2 rounded-full border-2 border-[#3D5898] bg-white text-[#1E2D5A] text-sm font-medium w-28 focus:outline-none"
            />
            <button onClick={addTag} className="text-[#3D5898] font-bold text-sm">Add</button>
          </div>
        ) : (
          <button
            onClick={() => setAddingTag(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-[#3D5898] bg-white text-[#3D5898] text-sm font-bold"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Tag
          </button>
        )}
      </div>

      <button
        onClick={() => navigate("/artist/upload-works")}
        className="w-full py-4 rounded-full bg-[#3D5898] text-white font-bold text-lg hover:bg-[#2D4270] active:scale-95 transition-all shadow-md"
      >
        Continue
      </button>
    </div>
  )
}
