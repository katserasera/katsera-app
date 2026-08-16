import { useNavigate } from "react-router-dom"
import katseraLogo from "@/imports/katsera_logo.png"

const KLogo = () => <img src={katseraLogo} alt="Katsera" style={{ width: 22, height: 26, objectFit: "contain" as const }} />

const steps = [
  { label: "Profile Created", done: true, desc: "Your artist profile is active" },
  { label: "Phone Verified", done: true, desc: "+62 812 3456 7890 confirmed" },
  { label: "Identity Submitted", done: true, desc: "KTP uploaded and under review" },
  { label: "Music Sample Reviewed", done: false, desc: "Awaiting team review" },
  { label: "Verification Complete", done: false, desc: "Badge awarded upon approval" },
]

export default function VerificationStatus() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col max-w-md mx-auto font-[Nunito]">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm flex-none">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <KLogo />
        <span className="flex-1 font-extrabold text-[#1E2D5A] text-lg">Verification Status</span>
      </div>

      <div className="flex-1 px-5 pb-10 space-y-5">
        {/* Badge */}
        <div className="bg-gradient-to-br from-[#3D5898] to-[#1E2D5A] rounded-3xl p-6 flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="white" strokeWidth="1.8" fill="rgba(255,255,255,0.2)"/></svg>
          </div>
          <p className="font-extrabold text-white text-lg">Verification in Progress</p>
          <div className="bg-white/20 rounded-full px-4 py-1.5">
            <span className="text-white text-xs font-bold">Step 3 of 5 Complete</span>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {steps.map((step, i) => (
            <div key={step.label} className={`flex items-start gap-4 px-5 py-4 ${i < steps.length - 1 ? "border-b border-[#F4F5F9]" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-none mt-0.5 ${step.done ? "bg-green-100" : "bg-[#F4F5F9]"}`}>
                {step.done
                  ? <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <div className="w-2 h-2 rounded-full bg-[#C8D0E8]" />}
              </div>
              <div>
                <p className={`font-extrabold text-sm ${step.done ? "text-[#1E2D5A]" : "text-[#9BAACE]"}`}>{step.label}</p>
                <p className="text-xs text-[#9BAACE] mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact note */}
        <div className="bg-blue-50 rounded-2xl p-4 flex gap-3">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="flex-none mt-0.5"><circle cx="12" cy="12" r="10" stroke="#3D5898" strokeWidth="1.8"/><path d="M12 8v4M12 16h.01" stroke="#3D5898" strokeWidth="2" strokeLinecap="round"/></svg>
          <p className="text-xs text-[#3D5898] font-semibold leading-relaxed">Verification usually takes 3–5 business days. We'll notify you once the badge is awarded.</p>
        </div>

        <button onClick={() => navigate("/artist/help/contact")} className="w-full py-4 rounded-full border-2 border-[#3D5898] text-[#3D5898] font-extrabold text-sm">
          Contact Support
        </button>
      </div>
    </div>
  )
}
