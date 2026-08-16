import { useState } from "react"
import { useNavigate } from "react-router-dom"
import nadinAmizah from "@/imports/nadin_amizah.jpg"
import bernadya from "@/imports/bernadya.jpg"
import tiaraAndhini from "@/imports/tiara_andhini.jpg"
import ariIrham from "@/imports/ari_irham.jpg"
import ekoNugroho from "@/imports/eko_nugroho.jpg"
import azaziAsadel from "@/imports/azizi_asadel.jpg"
import teaterKoma from "@/imports/teater_koma.jpg"
import raisa from "@/imports/raisa.jpg"
import isyana from "@/imports/isyana.jpg"

const artists = [
  { id: 1, name: "Nadin Amizah", role: "Singer", img: nadinAmizah },
  { id: 2, name: "Bernadya", role: "Singer", img: bernadya },
  { id: 3, name: "Popomangun", role: "Painter", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format" },
  { id: 4, name: "Tiara Andini", role: "Singer", img: tiaraAndhini },
  { id: 5, name: "Ari Irham", role: "Actor", img: ariIrham },
  { id: 6, name: "Winola S.", role: "Painter", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&auto=format" },
  { id: 7, name: "Eko Nugroho", role: "Painter", img: ekoNugroho },
  { id: 8, name: "Azizi Asadel", role: "Aktris", img: azaziAsadel },
  { id: 9, name: "Teater Koma", role: "Community", img: teaterKoma },
  { id: 10, name: "Raisa", role: "Singer", img: raisa },
  { id: 11, name: "Isyana", role: "Singer", img: isyana },
  { id: 12, name: "Adera", role: "Musician", img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=200&h=200&fit=crop&auto=format" },
]

export default function ArtistPick() {
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const navigate = useNavigate()

  const toggle = (id: number) => {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelected(next)
  }

  const canContinue = selected.size >= 5

  return (
    <div className="min-h-screen bg-[#3D5898] flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="px-6 pt-14 pb-6 text-center">
        <h1 className="text-white text-2xl font-extrabold mb-1">Pick your artists.</h1>
        <p className="text-white/70 text-sm font-medium">At least 5, go all out.</p>
      </div>

      {/* White card with grid */}
      <div className="flex-1 bg-white rounded-t-3xl px-5 pt-6 pb-4 overflow-y-auto">
        <div className="grid grid-cols-3 gap-x-4 gap-y-6 pb-6">
          {artists.map((artist) => {
            const isSelected = selected.has(artist.id)
            return (
              <button
                key={artist.id}
                onClick={() => toggle(artist.id)}
                className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
              >
                <div className="relative">
                  <div
                    className="rounded-full overflow-hidden transition-all"
                    style={{
                      width: 84,
                      height: 84,
                      border: isSelected ? "3px solid #3D5898" : "3px solid transparent",
                      boxShadow: isSelected ? "0 0 0 2px #3D5898" : "none",
                    }}
                  >
                    <img
                      src={artist.img}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isSelected && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#3D5898] flex items-center justify-center border-2 border-white">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-[#1E2D5A] text-xs font-bold leading-tight">{artist.name}</p>
                  <p className="text-[#9BAACE] text-xs">{artist.role}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="bg-[#3D5898] px-6 py-5 flex items-center justify-between">
        <p className="text-white/70 text-sm font-medium">
          {selected.size} / 5 selected
        </p>
        <button
          onClick={() => canContinue && navigate("/fan/home")}
          disabled={!canContinue}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            canContinue
              ? "bg-white hover:bg-gray-100 active:scale-95"
              : "bg-white/30 cursor-not-allowed"
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke={canContinue ? "#3D5898" : "white"} strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
