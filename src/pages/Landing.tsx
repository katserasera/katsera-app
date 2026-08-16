import { Link } from "react-router-dom"

const featuredWorks = [
  {
    id: 1,
    title: "Solitude in Ochre",
    artist: "Elena Voss",
    medium: "Oil on canvas",
    year: "2024",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=750&fit=crop&auto=format",
    slug: "elena-voss",
    size: "tall",
  },
  {
    id: 2,
    title: "Fragment No. 7",
    artist: "Mara Lund",
    medium: "Mixed media",
    year: "2024",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=400&fit=crop&auto=format",
    slug: "elena-voss",
    size: "wide",
  },
  {
    id: 3,
    title: "Blue Interval",
    artist: "Tomas Reyes",
    medium: "Acrylic",
    year: "2023",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop&auto=format",
    slug: "elena-voss",
    size: "square",
  },
  {
    id: 4,
    title: "Drift",
    artist: "Sun Li",
    medium: "Watercolor",
    year: "2024",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=750&fit=crop&auto=format",
    slug: "elena-voss",
    size: "tall",
  },
]

const categories = ["Painting", "Photography", "Sculpture", "Digital", "Printmaking", "Drawing"]

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      {/* Hero */}
      <section className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium tracking-widest text-[#C8684A] uppercase mb-6">
              The artists' platform
            </p>
            <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] font-light text-[#161514] mb-8">
              Where art finds<br />
              <em className="not-italic font-normal text-[#C8684A]">its audience.</em>
            </h1>
            <p className="text-[#7A7874] text-lg leading-relaxed max-w-md mb-10">
              Katsera gives artists a dedicated space to present work, build a following, and connect with collectors and curators worldwide.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/explore"
                className="px-6 py-3 bg-[#161514] text-[#F8F7F4] text-sm font-medium hover:bg-[#2E2C2A] transition-colors"
                style={{ borderRadius: "2px" }}
              >
                Explore artwork
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 border border-[#DDD9D4] text-[#161514] text-sm font-medium hover:border-[#161514] transition-colors"
                style={{ borderRadius: "2px" }}
              >
                Join as an artist
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 flex gap-3">
            <div className="flex flex-col gap-3 flex-1">
              <div className="bg-[#DDD9D4] overflow-hidden aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format"
                  alt="Artist portrait"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-1 mt-10">
              <div className="bg-[#DDD9D4] overflow-hidden aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop&auto=format"
                  alt="Featured artwork"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="bg-[#EAE9E4] p-4">
                <p className="text-xs text-[#7A7874] font-medium mb-1">Featured artist</p>
                <p className="font-display text-base font-medium">Elena Voss</p>
                <p className="text-xs text-[#7A7874] mt-0.5">Berlin, Germany</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-20 pt-10 border-t border-[#DDD9D4] grid grid-cols-3 gap-8 max-w-sm">
          {[
            { value: "12,000+", label: "Artists" },
            { value: "84,000+", label: "Artworks" },
            { value: "140+", label: "Countries" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="font-display text-2xl font-light text-[#161514]">{value}</p>
              <p className="text-xs text-[#7A7874] mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Browse by category */}
      <section className="py-16 border-t border-[#DDD9D4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-light text-[#161514]">Browse by medium</h2>
            <Link to="/explore" className="text-sm text-[#7A7874] hover:text-[#161514] transition-colors">
              See all →
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                to="/explore"
                className="px-4 py-2 border border-[#DDD9D4] text-sm text-[#4A4844] hover:border-[#161514] hover:text-[#161514] transition-colors"
                style={{ borderRadius: "2px" }}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-medium tracking-widest text-[#C8684A] uppercase mb-2">Curated picks</p>
              <h2 className="font-display text-3xl font-light text-[#161514]">Recent work we love</h2>
            </div>
            <Link to="/explore" className="text-sm text-[#7A7874] hover:text-[#161514] transition-colors hidden md:block">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredWorks.map((work) => (
              <Link
                key={work.id}
                to={`/artist/${work.slug}`}
                className="group block"
              >
                <div className="bg-[#DDD9D4] overflow-hidden mb-3"
                  style={{ aspectRatio: work.size === "tall" ? "3/4" : work.size === "wide" ? "4/3" : "1/1" }}
                >
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-sm font-medium text-[#161514] group-hover:text-[#C8684A] transition-colors">{work.title}</p>
                <p className="text-xs text-[#7A7874] mt-0.5">{work.artist} · {work.medium}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="py-20 bg-[#161514] text-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                number: "01",
                title: "Your portfolio, your identity",
                body: "A dedicated profile page that puts your work front and center — no algorithmic clutter, no noise.",
              },
              {
                number: "02",
                title: "Reach the right people",
                body: "Collectors, curators, and galleries browse Katsera for new talent. Get discovered by people who matter.",
              },
              {
                number: "03",
                title: "Tools built for artists",
                body: "Upload high-resolution work, write detailed descriptions, organize by series, and track views and saves.",
              },
            ].map(({ number, title, body }) => (
              <div key={number} className="border-t border-[#2E2C2A] pt-8">
                <p className="font-display text-4xl font-light text-[#C8684A] mb-6">{number}</p>
                <h3 className="font-display text-xl font-light mb-4">{title}</h3>
                <p className="text-[#7A7874] text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 text-center px-6">
        <p className="text-xs font-medium tracking-widest text-[#C8684A] uppercase mb-4">Start today</p>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light text-[#161514] leading-tight mb-8 max-w-2xl mx-auto">
          Ready to share your work with the world?
        </h2>
        <Link
          to="/login"
          className="inline-block px-8 py-4 bg-[#161514] text-[#F8F7F4] text-sm font-medium hover:bg-[#2E2C2A] transition-colors"
          style={{ borderRadius: "2px" }}
        >
          Create your free profile
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#DDD9D4] py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6 items-start">
          <p className="font-display text-lg font-medium text-[#161514]">Katsera</p>
          <div className="flex gap-8 text-sm text-[#7A7874]">
            <Link to="/explore" className="hover:text-[#161514] transition-colors">Explore</Link>
            <Link to="/login" className="hover:text-[#161514] transition-colors">Sign in</Link>
            <span>© 2024 Katsera</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
