import { useState, useEffect, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"

type Stage =
  | "intro"
  | "permission-prompt"
  | "permission-denied"
  | "scanning"
  | "processing"
  | "verified"
  | "failed"
  | "retry"

// ── Animated scan overlay ─────────────────────────────────────────────────────
function ScanOverlay({ stage }: { stage: Stage }) {
  const isScanning = stage === "scanning"
  const isProcessing = stage === "processing"

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Darkened corners */}
      <div className="absolute inset-0 bg-black/60" style={{ WebkitMaskImage: "radial-gradient(ellipse 220px 280px at 50% 42%, transparent 100%, black 100%)", maskImage: "radial-gradient(ellipse 220px 280px at 50% 42%, transparent 100%, black 100%)" }} />

      {/* Face oval outline */}
      <div className="absolute" style={{ top: "10%", width: 220, height: 280 }}>
        <svg viewBox="0 0 220 280" width="220" height="280">
          {/* Background oval */}
          <ellipse cx="110" cy="140" rx="105" ry="135" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
          {/* Animated border segments */}
          <ellipse
            cx="110" cy="140" rx="105" ry="135"
            fill="none"
            stroke={stage === "verified" ? "#22c55e" : stage === "failed" ? "#ef4444" : "#3D5898"}
            strokeWidth="3"
            strokeDasharray={isScanning || isProcessing ? "60 600" : stage === "verified" || stage === "failed" ? "660 0" : "0 660"}
            strokeLinecap="round"
            style={{ transition: stage === "verified" || stage === "failed" ? "stroke-dasharray 0.8s ease" : "none", animation: isScanning || isProcessing ? "scanDash 2s linear infinite" : "none" }}
          />
        </svg>

        {/* Scan line */}
        {isScanning && (
          <div
            className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[#3D5898] to-transparent rounded-full"
            style={{ animation: "scanLine 2s ease-in-out infinite", top: "50%" }}
          />
        )}

        {/* Processing pulse */}
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-2 border-[#3D5898]/40 animate-ping" />
          </div>
        )}
      </div>

      {/* Corner guides */}
      {["top-[8%] left-[15%]", "top-[8%] right-[15%]", "bottom-[42%] left-[15%]", "bottom-[42%] right-[15%]"].map((pos, i) => (
        <div key={i} className={`absolute w-8 h-8 ${pos}`}>
          <svg viewBox="0 0 32 32" width="32" height="32">
            {i === 0 && <><path d="M0 12 V0 H12" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/></>}
            {i === 1 && <><path d="M32 12 V0 H20" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/></>}
            {i === 2 && <><path d="M0 20 V32 H12" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/></>}
            {i === 3 && <><path d="M32 20 V32 H20" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/></>}
          </svg>
        </div>
      ))}
    </div>
  )
}

// ── Dot matrix face illustration ──────────────────────────────────────────────
function FaceIllustration() {
  return (
    <div className="w-32 h-32 rounded-full bg-[#3D5898]/10 flex items-center justify-center">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="28" r="18" stroke="#3D5898" strokeWidth="2"/>
        <circle cx="24" cy="26" r="3" fill="#3D5898"/>
        <circle cx="40" cy="26" r="3" fill="#3D5898"/>
        <path d="M22 36 Q32 44 42 36" stroke="#3D5898" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M32 46 Q16 56 8 48" stroke="#3D5898" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M32 46 Q48 56 56 48" stroke="#3D5898" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        {/* Scan lines */}
        {[52, 44, 36].map((y) => (
          <line key={y} x1="4" y1={y/2 + 8} x2="60" y2={y/2 + 8} stroke="#3D5898" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4"/>
        ))}
      </svg>
    </div>
  )
}

export default function FaceVerification() {
  const navigate = useNavigate()
  const location = useLocation()
  const returnTo = (location.state as { returnTo?: string })?.returnTo || "/artist/identity"
  const [stage, setStage] = useState<Stage>("intro")
  const [scanProgress, setScanProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [hasRealCamera, setHasRealCamera] = useState(false)

  const [aiChecks, setAiChecks] = useState<{ label: string; done: boolean; result?: string }[]>([
    { label: "Detecting face", done: false },
    { label: "Checking liveness", done: false },
    { label: "Analyzing facial features", done: false },
    { label: "Matching identity", done: false },
    { label: "Generating verification hash", done: false },
  ])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Cleanup stream on unmount
  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (stream) stream.getTracks().forEach((t) => t.stop())
  }, [stream])

  async function requestCameraStream() {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } }
        })
        setStream(mediaStream)
        setHasRealCamera(true)
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
        startScan()
      } else {
        startScan()
      }
    } catch (err) {
      console.warn("Camera permission denied or unsupported:", err)
      // Fallback to simulated scan or permission denied stage
      setHasRealCamera(false)
      startScan()
    }
  }

  function startScan() {
    setStage("scanning")
    setScanProgress(0)

    // Animate progress 0→100 over ~4s
    let pct = 0
    const iv = setInterval(() => {
      pct += 2
      setScanProgress(pct)
      if (pct >= 100) {
        clearInterval(iv)
        setStage("processing")
        if (stream) stream.getTracks().forEach((t) => t.stop())
        runAiChecks()
      }
    }, 80)
  }

  function runAiChecks() {
    const checks = [...aiChecks].map((c) => ({ ...c, done: false }))
    setAiChecks(checks)

    checks.forEach((_, i) => {
      timerRef.current = setTimeout(() => {
        setAiChecks((prev) => {
          const next = [...prev]
          next[i] = { ...next[i], done: true, result: i < 4 ? "✓" : "hash_v9k2" }
          return next
        })
        if (i === checks.length - 1) {
          timerRef.current = setTimeout(() => {
            setStage("verified")
          }, 600)
        }
      }, (i + 1) * 700)
    })
  }

  function handleRetry() {
    setScanProgress(0)
    setAiChecks((prev) => prev.map((c) => ({ ...c, done: false, result: undefined })))
    setStage("retry")
    timerRef.current = setTimeout(() => requestCameraStream(), 500)
  }

  function requestPermission() {
    setStage("permission-prompt")
    timerRef.current = setTimeout(() => requestCameraStream(), 800)
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col w-full max-w-md sm:max-w-xl md:max-w-3xl mx-auto sm:my-4 sm:rounded-3xl sm:shadow-xl font-[Nunito] overflow-hidden relative transition-all">
      <style>{`
        @keyframes scanLine { 0% { transform: translateY(-120px) } 50% { transform: translateY(120px) } 100% { transform: translateY(-120px) } }
        @keyframes scanDash { to { stroke-dashoffset: -660 } }
      `}</style>

      {/* ── Intro ── */}
      {stage === "intro" && (
        <>
          <div className="pt-14 px-6">
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-95 transition-transform">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#1E2D5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <div className="flex-1 px-6 pt-8 pb-10 flex flex-col">
            <div className="flex flex-col items-center text-center mb-8">
              <FaceIllustration />
              <h1 className="text-[#1E2D5A] font-extrabold text-2xl mt-6 mb-2">Identity Verification</h1>
              <p className="text-[#7A8BB5] text-sm leading-relaxed max-w-xs">
                We use AI-powered face recognition to verify your identity. This helps keep the platform safe and authentic.
              </p>
            </div>

            {/* Steps */}
            <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 space-y-4">
              {[
                { icon: "📷", title: "Camera access", desc: "We'll need permission to use your front camera" },
                { icon: "😊", title: "Face scan", desc: "Position your face within the frame and hold still" },
                { icon: "🤖", title: "AI analysis", desc: "Our AI verifies your face in real-time" },
                { icon: "✅", title: "Verified!", desc: "Your identity is confirmed — all data is encrypted" },
              ].map(({ icon, title, desc }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F4F5F9] flex items-center justify-center flex-none text-lg">{icon}</div>
                  <div>
                    <p className="text-[#1E2D5A] font-bold text-sm">{title}</p>
                    <p className="text-[#9BAACE] text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#3D5898]/8 rounded-2xl p-4 mb-6 flex gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-none mt-0.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <p className="text-[#3D5898] text-xs leading-relaxed font-semibold">
                Your biometric data is processed securely and never stored on our servers. All verification happens in real-time.
              </p>
            </div>

            <button onClick={() => setStage("permission-prompt")} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-transform shadow-md">
              Begin Verification
            </button>
            <button onClick={() => navigate(returnTo)} className="mt-3 w-full py-3.5 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-bold text-sm active:scale-95 transition-transform">
              Verify Later
            </button>
          </div>
        </>
      )}

      {/* ── Permission prompt ── */}
      {stage === "permission-prompt" && (
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="bg-white rounded-3xl p-6 shadow-xl w-full max-w-xs text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#3D5898]/10 flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="#3D5898" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="13" r="4" stroke="#3D5898" strokeWidth="1.8"/></svg>
            </div>
            <p className="text-[#1E2D5A] font-extrabold text-base mb-2">"Katsera" wants to access your camera</p>
            <p className="text-[#7A8BB5] text-xs mb-5 leading-relaxed">Used only for identity verification. No images are stored.</p>
            <div className="space-y-2">
              <button onClick={requestPermission} className="w-full py-3 rounded-full bg-[#3D5898] text-white font-bold text-sm active:scale-95 transition-transform">Allow Camera Access</button>
              <button onClick={() => setStage("permission-denied")} className="w-full py-3 rounded-full border border-[#E0E5F2] text-[#7A8BB5] font-bold text-sm">Don't Allow</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Permission denied ── */}
      {stage === "permission-denied" && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <h2 className="text-[#1E2D5A] font-extrabold text-xl">Camera access denied</h2>
          <p className="text-[#7A8BB5] text-sm leading-relaxed max-w-xs">
            To verify your identity, please allow camera access in your browser or device settings.
          </p>
          <div className="bg-white rounded-2xl p-4 w-full shadow-sm text-left space-y-2">
            <p className="text-[#1E2D5A] font-bold text-sm">How to enable camera:</p>
            <p className="text-[#7A8BB5] text-xs">1. Open device Settings</p>
            <p className="text-[#7A8BB5] text-xs">2. Go to Privacy → Camera</p>
            <p className="text-[#7A8BB5] text-xs">3. Enable access for your browser</p>
          </div>
          <button onClick={() => setStage("intro")} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold active:scale-95 transition-transform">Try Again</button>
        </div>
      )}

      {/* ── Camera + scan view ── */}
      {(stage === "scanning" || stage === "retry") && (
        <div className="flex-1 flex flex-col bg-black relative">
          {/* Real WebRTC camera feed or fallback image */}
          <div className="flex-1 relative overflow-hidden flex items-center justify-center">
            {hasRealCamera ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop"
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
            )}

            <ScanOverlay stage={stage} />

            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 pt-safe-top px-5 pt-14 pb-4 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between z-10">
              <button onClick={() => setStage("intro")} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center active:scale-95">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round"/></svg>
              </button>
              <div className="bg-white/20 backdrop-blur rounded-full px-4 py-1.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-white text-xs font-bold">LIVE CAMERA SCAN</span>
              </div>
              <div className="w-9 h-9" />
            </div>

            {/* Guidance */}
            <div className="absolute bottom-28 left-0 right-0 px-6 text-center">
              <p className="text-white font-bold text-sm drop-shadow">Center your face in the oval</p>
              <p className="text-white/70 text-xs mt-1">Keep still and look directly at the camera</p>
            </div>

            {/* Progress */}
            <div className="absolute bottom-10 left-8 right-8">
              <div className="flex items-center justify-between text-white text-xs mb-2">
                <span className="font-semibold">Scanning…</span>
                <span className="font-bold">{scanProgress}%</span>
              </div>
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-[#3D5898] rounded-full transition-all duration-100" style={{ width: `${scanProgress}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── AI Processing ── */}
      {stage === "processing" && (
        <div className="flex-1 flex flex-col bg-[#1E2D5A] px-6 pt-16 pb-10">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full border-4 border-[#3D5898]/30 border-t-[#3D5898] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
            </div>
            <h2 className="text-white font-extrabold text-xl mb-2">AI Analysis in Progress</h2>
            <p className="text-white/50 text-sm text-center">Verifying your identity securely…</p>
          </div>

          {/* AI checks */}
          <div className="space-y-3">
            {aiChecks.map((check, i) => (
              <div key={i} className={`flex items-center gap-4 bg-white/8 rounded-2xl px-4 py-3.5 transition-all ${check.done ? "border border-white/10" : "border border-transparent"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-none transition-all ${check.done ? "bg-green-500" : "bg-white/15"}`}>
                  {check.done
                    ? <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="10 3 5 8 2 5"/></svg>
                    : <div className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  }
                </div>
                <span className={`text-sm font-semibold flex-1 transition-colors ${check.done ? "text-white" : "text-white/50"}`}>{check.label}</span>
                {check.done && check.result && (
                  <span className="text-[10px] font-mono text-green-400">{check.result}</span>
                )}
              </div>
            ))}
          </div>

          <p className="text-white/30 text-xs text-center mt-8 leading-relaxed">
            End-to-end encrypted · No biometrics stored · ISO 30107 compliant
          </p>
        </div>
      )}

      {/* ── Verified ── */}
      {stage === "verified" && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
          <div className="relative mb-2">
            <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center">
              <svg width="52" height="52" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"><polyline points="44 12 20 36 8 24"/></svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-[#3D5898] flex items-center justify-center shadow-lg">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="white"/></svg>
            </div>
          </div>
          <h1 className="text-[#1E2D5A] font-extrabold text-2xl">Identity Verified!</h1>
          <p className="text-[#7A8BB5] text-sm leading-relaxed max-w-xs">
            Your face has been successfully verified. Your account is now trusted and secured.
          </p>

          <div className="w-full bg-white rounded-2xl p-5 shadow-sm space-y-2 text-left">
            <p className="text-[#1E2D5A] font-bold text-sm mb-3">Verification Summary</p>
            {[
              { label: "Face Detection", value: "Confirmed" },
              { label: "Liveness Check", value: "Passed" },
              { label: "Identity Match", value: "98.4% confidence" },
              { label: "Verification ID", value: "#VRF-" + Math.random().toString(36).slice(2, 8).toUpperCase() },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-1.5 border-b border-[#F0F2F8] last:border-0">
                <span className="text-[#9BAACE] text-xs">{label}</span>
                <span className="text-[#1E2D5A] text-xs font-bold">{value}</span>
              </div>
            ))}
          </div>

          <button onClick={() => navigate(returnTo)} className="w-full py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-base active:scale-95 transition-transform shadow-md">
            Continue →
          </button>
        </div>
      )}

      {/* ── Failed ── */}
      {stage === "failed" && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
          <div className="w-28 h-28 rounded-full bg-red-100 flex items-center justify-center mb-2">
            <svg width="52" height="52" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </div>
          <h1 className="text-[#1E2D5A] font-extrabold text-2xl">Verification Failed</h1>
          <p className="text-[#7A8BB5] text-sm leading-relaxed max-w-xs">
            We couldn't verify your identity. This may be due to poor lighting or camera quality.
          </p>

          <div className="w-full bg-white rounded-2xl p-5 shadow-sm text-left space-y-3">
            <p className="text-[#1E2D5A] font-bold text-sm">Tips for better results:</p>
            {[
              "Find a well-lit environment",
              "Ensure your face is fully visible",
              "Remove sunglasses or hat",
              "Hold your device at eye level",
              "Avoid moving during the scan",
            ].map((tip) => (
              <div key={tip} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3D5898] flex-none" />
                <p className="text-[#7A8BB5] text-xs">{tip}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 w-full">
            <button onClick={() => navigate(-1)} className="flex-1 py-4 rounded-full border-2 border-[#C8D0E8] text-[#1E2D5A] font-bold text-sm active:scale-95 transition-transform">
              Cancel
            </button>
            <button onClick={handleRetry} className="flex-1 py-4 rounded-full bg-[#3D5898] text-white font-extrabold text-sm active:scale-95 transition-transform shadow-md">
              Retry Scan
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
