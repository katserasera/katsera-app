import { useState } from "react"
import { Link } from "react-router-dom"

const filters = ["All", "Painting", "Photography", "Sculpture", "Digital", "Printmaking", "Drawing"]

const artworks = [
  {
    id: 1, title: "Ochre Study III", artist: "Elena Voss", medium: "Oil on canvas", year: "2024",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=650&fit=crop&auto=format",
    category: "Painting", slug: "elena-voss", h: "tall",
  },
  {
    id: 2, title: "Coastline", artist: "Jonas Möller", medium: "Photography", year: "2024",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format",
    category: "Photography", slug: "elena-voss", h: "wide",
  },
  {
    id: 3, title: "Urban Fragment", artist: "Mara Lund", medium: "Mixed media", year: "2023",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&h=500&fit=crop&auto=format",
    category: "Painting", slug: "elena-voss", h: "square",
  },
  {
    id: 4, title: "Luminous Ground", artist: "Sun Li", medium: "Watercolor", year: "2024",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=500&h=650&fit=crop&auto=format",
    category: "Painting", slug: "elena-voss", h: "tall",
  },
  {
    id: 5, title: "Form Study I", artist: "Ana Petrov", medium: "Sculpture", year: "2023",
    image: "https://images.unsplash.com/photo-1565716875796-39bac52f3e81?w=500&h=500&fit=crop&auto=format",
    category: "Sculpture", slug: "elena-voss", h: "square",
  },
  {
    id: 6, title: "Interval", artist: "Tomas Reyes", medium: "Acrylic", year: "2024",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=650&fit=crop&auto=format",
    category: "Painting", slug: "elena-voss", h: "tall",
  },
  {
    id: 7, title: "Digital Bloom", artist: "Yuki Tanaka", medium: "Digital", year: "2024",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
    category: "Digital", slug: "elena-voss", h: "wide",
  },
  {
    id: 8, title: "Still Life No. 9", artist: "Pieter van Dam", medium: "Oil on panel", year: "2023",
    image: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=500&h=500&fit=crop&auto=format",
    category: "Painting", slug: "elena-voss", h: "square",
  },
  {
    id: 9, title: "Morning Fog", artist: "Clara Mehta", medium: "Photography", year: "2024",
    image: "https://images.unsplash.com/photo-1544965503-b0ff91dc05e4?w=500&h=650&fit=crop&auto=format",
    category: "Photography", slug: "elena-voss", h: "tall",
  },
  {
    id: 10, title: "Red Composition", artist: "Leo Fischer", medium: "Printmaking", year: "2024",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop&auto=format",
    category: "Printmaking", slug: "elena-voss", h: "wide",
  },
  {
    id: 11, title: "Dusk, Series II", artist: "Elena Voss", medium: "Oil on canvas", year: "2023",
    image: "https://images.unsplash.com/photo-1576700369538-e3d6e5c8e87f?w=500&h=650&fit=crop&auto=format",
    category: "Painting", slug: "elena-voss", h: "tall",
  },
  {
    id: 12, title: "Tension Lines", artist: "Mara Lund", medium: "Drawing", year: "2024",
    image: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=500&h=500&fit=crop&auto=format",
    category: "Drawing", slug: "elena-voss", h: "square",
  },
]

const aspectMap: Record<string, string> = {
  tall: "3 / 4",
  wide: "4 / 3",
  square: "1 / 1",
}

export default function Explore() {
  const [active, setActive] = useState("All")
  const [search, setSearch] = useState("")

  const filtered = artworks.filter((a) => {
    const matchCat = active === "All" || a.category === active
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.artist.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-[#F8F7F4] pt-14">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-b border-[#DDD9D4]">
        <h1 className="font-display text-4xl md:text-5xl font-light text-[#161514] mb-2">Explore</h1>
        <p className="text-[#7A7874] text-sm">Discover original works from artists around the world.</p>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-4 md:items-center justify-between">
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                active === f
                  ? "bg-[#161514] text-[#F8F7F4] border-[#161514]"
                  : "border-[#DDD9D4] text-[#4A4844] hover:border-[#161514] hover:text-[#161514]"
              }`}
              style={{ borderRadius: "2px" }}
            >
              {f}
            </button>
          ))}
        </div>
        {/* Search */}
        <input
          type="text"
          placeholder="Search by title or artist…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-sm px-4 py-2 border border-[#DDD9D4] bg-transparent text-[#161514] placeholder:text-[#7A7874] focus:outline-none focus:border-[#161514] md:w-64 transition-colors"
          style={{ borderRadius: "2px" }}
        />
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-[#7A7874] text-sm">No artworks match your search.</div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((work) => (
              <Link
                key={work.id}
                to={`/artist/${work.slug}`}
                className="group block break-inside-avoid"
              >
                <div className="bg-[#DDD9D4] overflow-hidden" style={{ aspectRatio: aspectMap[work.h] }}>
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="pt-2.5 pb-1">
                  <p className="text-sm font-medium text-[#161514] group-hover:text-[#C8684A] transition-colors leading-snug">
                    {work.title}
                  </p>
                  <p className="text-xs text-[#7A7874] mt-0.5">{work.artist}</p>
                  <p className="text-xs text-[#7A7874] opacity-70">{work.medium} · {work.year}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
