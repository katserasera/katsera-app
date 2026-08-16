import { useState } from "react"
import { Link } from "react-router-dom"

const artist = {
  name: "Elena Voss",
  location: "Berlin, Germany",
  bio: "My practice centers on the material qualities of paint — its weight, translucency, and resistance. I work in extended series, building up layers over months until a painting earns its right to stop. Based in Berlin, my work has been shown across Europe and North America.",
  medium: "Oil on canvas",
  joined: "Member since 2021",
  followers: 2841,
  views: 48300,
  works: 64,
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format",
  cover: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=1400&h=400&fit=crop&auto=format",
  website: "elenavoss.com",
  instagram: "@elenavoss",
}

const portfolio = [
  {
    id: 1, title: "Ochre Study III", year: "2024", medium: "Oil on canvas", dimensions: "90 × 120 cm",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=750&fit=crop&auto=format",
    series: "Ochre Studies", h: "tall",
  },
  {
    id: 2, title: "Dusk, Series II", year: "2023", medium: "Oil on canvas", dimensions: "60 × 80 cm",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop&auto=format",
    series: "Dusk", h: "square",
  },
  {
    id: 3, title: "Ground Layer", year: "2024", medium: "Oil on linen", dimensions: "120 × 90 cm",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=750&fit=crop&auto=format",
    series: "Ochre Studies", h: "tall",
  },
  {
    id: 4, title: "Weight of Light", year: "2023", medium: "Oil on canvas", dimensions: "100 × 130 cm",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=450&fit=crop&auto=format",
    series: "Dusk", h: "wide",
  },
  {
    id: 5, title: "Interval I", year: "2022", medium: "Oil on panel", dimensions: "40 × 40 cm",
    image: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=600&h=600&fit=crop&auto=format",
    series: "Intervals", h: "square",
  },
  {
    id: 6, title: "Interval IV", year: "2022", medium: "Oil on panel", dimensions: "40 × 40 cm",
    image: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=600&h=450&fit=crop&auto=format",
    series: "Intervals", h: "wide",
  },
]

const tabs = ["Works", "About", "Exhibitions"]

const exhibitions = [
  { year: "2024", title: "Between Ground and Surface", venue: "Galerie Nord, Berlin" },
  { year: "2023", title: "New Voices in European Painting", venue: "Saatchi Gallery, London" },
  { year: "2023", title: "Material Witness", venue: "Galeria Fortes Vilaça, São Paulo" },
  { year: "2022", title: "Slow Painting", venue: "Museum Frieder Burda, Baden-Baden" },
  { year: "2021", title: "Emerging Artists Prize", venue: "Kunsthalle Wien, Vienna" },
]

export default function ArtistProfile() {
  const [tab, setTab] = useState("Works")
  const [following, setFollowing] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8F7F4] pt-14">
      {/* Cover */}
      <div className="w-full h-48 md:h-64 bg-[#DDD9D4] overflow-hidden">
        <img src={artist.cover} alt="Cover" className="w-full h-full object-cover" />
      </div>

      {/* Profile header */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-10 mb-8">
          {/* Avatar */}
          <div className="w-20 h-20 md:w-24 md:h-24 bg-[#DDD9D4] border-4 border-[#F8F7F4] overflow-hidden flex-shrink-0"
            style={{ borderRadius: "50%" }}>
            <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 md:pb-1">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl font-light text-[#161514]">{artist.name}</h1>
                <p className="text-sm text-[#7A7874] mt-1">{artist.location} · {artist.medium}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFollowing(!following)}
                  className={`px-5 py-2 text-sm font-medium border transition-colors ${
                    following
                      ? "bg-[#161514] text-[#F8F7F4] border-[#161514]"
                      : "border-[#DDD9D4] text-[#161514] hover:border-[#161514]"
                  }`}
                  style={{ borderRadius: "2px" }}
                >
                  {following ? "Following" : "Follow"}
                </button>
                <button
                  className="px-4 py-2 text-sm border border-[#DDD9D4] text-[#4A4844] hover:border-[#161514] transition-colors"
                  style={{ borderRadius: "2px" }}
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-8 py-4 border-t border-b border-[#DDD9D4] mb-8">
          {[
            { value: artist.works, label: "Works" },
            { value: artist.followers.toLocaleString(), label: "Followers" },
            { value: (artist.views / 1000).toFixed(1) + "k", label: "Views" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="font-display text-xl font-light text-[#161514]">{value}</p>
              <p className="text-xs text-[#7A7874]">{label}</p>
            </div>
          ))}
          <div className="ml-auto hidden sm:flex flex-col justify-center text-right">
            <p className="text-xs text-[#7A7874]">{artist.joined}</p>
            {artist.website && (
              <p className="text-xs text-[#C8684A] mt-0.5">{artist.website}</p>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-[#DDD9D4] mb-10">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                tab === t
                  ? "border-[#161514] text-[#161514]"
                  : "border-transparent text-[#7A7874] hover:text-[#161514]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Works tab */}
        {tab === "Works" && (
          <div className="columns-2 md:columns-3 gap-4 space-y-4 pb-24">
            {portfolio.map((work) => (
              <div key={work.id} className="group break-inside-avoid cursor-pointer">
                <div
                  className="bg-[#DDD9D4] overflow-hidden"
                  style={{ aspectRatio: work.h === "tall" ? "3/4" : work.h === "wide" ? "4/3" : "1/1" }}
                >
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="pt-2.5 pb-1">
                  <p className="text-sm font-medium text-[#161514] leading-snug">{work.title}</p>
                  <p className="text-xs text-[#7A7874] mt-0.5">{work.year} · {work.dimensions}</p>
                  <p className="text-xs text-[#7A7874] opacity-70">{work.series}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* About tab */}
        {tab === "About" && (
          <div className="max-w-xl pb-24">
            <p className="text-[#4A4844] leading-relaxed mb-8">{artist.bio}</p>
            <div className="space-y-4 border-t border-[#DDD9D4] pt-8">
              {[
                { label: "Medium", value: artist.medium },
                { label: "Location", value: artist.location },
                { label: "Website", value: artist.website },
                { label: "Instagram", value: artist.instagram },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-8">
                  <p className="text-xs text-[#7A7874] w-24 pt-0.5 flex-shrink-0">{label}</p>
                  <p className="text-sm text-[#161514]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exhibitions tab */}
        {tab === "Exhibitions" && (
          <div className="max-w-xl pb-24">
            <div className="space-y-0">
              {exhibitions.map((ex, i) => (
                <div key={i} className="flex gap-6 py-5 border-b border-[#DDD9D4]">
                  <p className="font-display text-sm text-[#C8684A] w-12 flex-shrink-0 pt-0.5">{ex.year}</p>
                  <div>
                    <p className="text-sm font-medium text-[#161514]">{ex.title}</p>
                    <p className="text-xs text-[#7A7874] mt-0.5">{ex.venue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
