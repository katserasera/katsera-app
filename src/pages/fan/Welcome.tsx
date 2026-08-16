import { useState } from "react"
import { useNavigate } from "react-router-dom"

const slides = [
  {
    id: 0,
    title: "Hey, there!",
    subtitle: "All the vibes, all the updates—\ndon't miss your faves.",
    layout: "diagonal-left",
    illustration: (
      <div className="relative w-full flex items-center justify-center" style={{ height: 280 }}>
        {/* Diagonal blue blob top-left */}
        <div
          className="absolute inset-0"
          style={{
            background: "#3D5898",
            clipPath: "polygon(0 0, 100% 0, 65% 70%, 20% 100%, 0 85%)",
            borderRadius: "0 0 40% 0",
          }}
        />
        {/* Circular clip for illustration */}
        <div
          className="relative z-10 rounded-full overflow-hidden border-4 border-white/20"
          style={{ width: 200, height: 200, marginTop: 30 }}
        >
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop&auto=format"
            alt="Friends saying hello"
            className="w-full h-full object-cover"
          />
          {/* Hello bubble overlay */}
          <div className="absolute inset-0 bg-[#3D5898]/40 flex items-center justify-center">
            <div className="bg-[#3D5898] rounded-2xl px-5 py-2">
              <span className="text-white font-extrabold text-2xl">Hello!</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 1,
    title: "Welcome to Katsera",
    subtitle: "Explore and find new things,\nnew vibes, new favorites",
    layout: "top-text",
    illustration: (
      <div className="relative w-full flex flex-col items-center" style={{ height: 320 }}>
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: 220,
            background: "#3D5898",
            borderRadius: "50% 50% 0 0 / 60% 60% 0 0",
          }}
        />
        <div className="relative z-10 mt-4 rounded-full overflow-hidden border-4 border-white/30"
          style={{ width: 220, height: 220 }}>
          <img
            src="https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=440&h=440&fit=crop&auto=format"
            alt="Friends celebrating"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Enjoy the Journey",
    subtitle: "Cherish every moment with your favorite\nartist, and spread only positivity",
    layout: "diagonal-left",
    illustration: (
      <div className="relative w-full flex items-center justify-center" style={{ height: 280 }}>
        <div
          className="absolute inset-0"
          style={{
            background: "#3D5898",
            clipPath: "polygon(0 0, 100% 0, 100% 55%, 60% 80%, 0 70%)",
          }}
        />
        <div
          className="relative z-10 rounded-full overflow-hidden border-4 border-white/20"
          style={{ width: 200, height: 200, marginTop: 20 }}
        >
          <img
            src="https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=400&h=400&fit=crop&auto=format"
            alt="People enjoying community"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Heart floaters */}
        {["top-4 right-12", "top-16 left-8", "top-28 right-6"].map((pos, i) => (
          <div key={i} className={`absolute ${pos} z-20 bg-[#3D5898] rounded-lg p-1`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
        ))}
      </div>
    ),
  },
]

export default function Welcome() {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

  const next = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1)
    } else {
      navigate("/fan/signup")
    }
  }

  const slide = slides[current]

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto">
      {/* Illustration area */}
      <div className="flex-shrink-0">
        {slide.layout === "top-text" ? (
          <>
            <div className="px-8 pt-12 pb-4 text-center">
              <h2 className="text-[#1E2D5A] text-3xl font-extrabold mb-2">{slide.title}</h2>
              <p className="text-[#7A8BB5] text-base font-medium whitespace-pre-line">{slide.subtitle}</p>
            </div>
            {slide.illustration}
          </>
        ) : (
          slide.illustration
        )}
      </div>

      {/* Text + nav */}
      {slide.layout !== "top-text" && (
        <div className="flex-1 flex flex-col items-center justify-center px-8 pt-8 pb-12">
          <h2 className="text-[#1E2D5A] text-4xl font-extrabold mb-3 text-center">{slide.title}</h2>
          <p className="text-[#7A8BB5] text-base font-medium text-center whitespace-pre-line mb-10">
            {slide.subtitle}
          </p>

          {/* Dots */}
          <div className="flex gap-2 mb-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all ${
                  i === current ? "w-6 h-2.5 bg-[#3D5898]" : "w-2.5 h-2.5 bg-[#C8D0E8]"
                }`}
              />
            ))}
          </div>

          {/* Chevron button */}
          <button
            onClick={next}
            className="w-14 h-14 rounded-full bg-[#3D5898] flex items-center justify-center hover:bg-[#2D4270] active:scale-95 transition-all shadow-lg"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}

      {slide.layout === "top-text" && (
        <div className="flex flex-col items-center py-10">
          <div className="flex gap-2 mb-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all ${
                  i === current ? "w-6 h-2.5 bg-[#3D5898]" : "w-2.5 h-2.5 bg-[#C8D0E8]"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-14 h-14 rounded-full bg-[#3D5898] flex items-center justify-center hover:bg-[#2D4270] active:scale-95 transition-all shadow-lg"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
