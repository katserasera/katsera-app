import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

export default function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to: "/explore", label: "Explore" },
    { to: "/artist/elena-voss", label: "Artists" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F8F7F4]/90 backdrop-blur-sm border-b border-[#DDD9D4]">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-semibold tracking-tight text-[#161514]">
          Katsera
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm font-medium transition-colors ${
                location.pathname.startsWith(to)
                  ? "text-[#161514]"
                  : "text-[#7A7874] hover:text-[#161514]"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-[#7A7874] hover:text-[#161514] transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/login"
            className="text-sm font-medium px-4 py-1.5 bg-[#161514] text-[#F8F7F4] hover:bg-[#2E2C2A] transition-colors"
            style={{ borderRadius: "2px" }}
          >
            Get started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-[#161514] transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-px bg-[#161514] transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-[#161514] transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#DDD9D4] bg-[#F8F7F4] px-6 py-4 flex flex-col gap-4">
          {links.map(({ to, label }) => (
            <Link key={to} to={to} className="text-sm font-medium text-[#161514]" onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <Link to="/login" className="text-sm font-medium text-[#7A7874]" onClick={() => setMenuOpen(false)}>
            Sign in
          </Link>
          <Link
            to="/login"
            className="text-sm font-medium px-4 py-2 bg-[#161514] text-[#F8F7F4] text-center"
            style={{ borderRadius: "2px" }}
            onClick={() => setMenuOpen(false)}
          >
            Get started
          </Link>
        </div>
      )}
    </header>
  )
}
