import { useRef, useEffect, useState } from "react";

export default function IntroVideo({ onFinish }) {
  const videoRef = useRef(null);
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    setEntered(true);
  };

  useEffect(() => {
    if (!entered) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;

    video.play().catch(() => {
      video.muted = true;
      video.play().then(() => {
        video.muted = false;
        video.volume = 1;
      }).catch(() => {});
    });

    const forceUnmute = () => {
      video.muted = false;
      video.volume = 1;
      if (video.paused) video.play().catch(() => {});
    };

    document.addEventListener("click", forceUnmute, { once: true });
    document.addEventListener("keydown", forceUnmute, { once: true });
    document.addEventListener("touchstart", forceUnmute, { once: true });
    document.addEventListener("mousemove", forceUnmute, { once: true });

    return () => {
      document.removeEventListener("click", forceUnmute);
      document.removeEventListener("keydown", forceUnmute);
      document.removeEventListener("touchstart", forceUnmute);
      document.removeEventListener("mousemove", forceUnmute);
    };
  }, [entered]);

  // ── ENTER SCREEN ──────────────────────────────
  if (!entered) {
    return (
      <div style={{
        position: "fixed",
        inset: 0,
        background: "#07070a",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(16px, 4vw, 32px)",
        fontFamily: '"DM Mono", monospace',
        padding: "24px",
        overflow: "hidden",
      }}>

        {/* Ambient glow */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(200,20,20,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Name / title */}
        <div style={{
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          padding: "0 16px",
        }}>
          <p style={{
            fontSize: "clamp(0.55rem, 1.8vw, 0.68rem)",
            letterSpacing: "0.3em",
            color: "rgba(230,50,50,0.6)",
            textTransform: "uppercase",
            marginBottom: "clamp(8px, 2vw, 14px)",
          }}>
            Portfolio
          </p>

          <h1 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: "clamp(2rem, 9vw, 5rem)",
            fontWeight: 300,
            color: "#f0ede6",
            lineHeight: 1.1,
            margin: 0,
            wordBreak: "break-word",
          }}>
            Khwaish{" "}
            <span style={{
              fontStyle: "italic",
              fontWeight: 600,
              color: "#e63232",
            }}>
              Goel
            </span>
          </h1>

          <p style={{
            fontSize: "clamp(0.55rem, 1.6vw, 0.7rem)",
            letterSpacing: "clamp(0.1em, 1vw, 0.2em)",
            color: "rgba(240,237,230,0.3)",
            marginTop: "clamp(8px, 2vw, 14px)",
            textTransform: "uppercase",
          }}>
            Full Stack Developer · AI Engineer
          </p>
        </div>

        {/* Enter button */}
        <button
          onClick={handleEnter}
          style={{
            position: "relative",
            zIndex: 1,
            background: "transparent",
            border: "1px solid rgba(230,50,50,0.6)",
            borderRadius: "8px",
            padding: "clamp(10px, 2.5vw, 14px) clamp(28px, 6vw, 48px)",
            color: "#f0ede6",
            fontFamily: '"DM Mono", monospace',
            fontSize: "clamp(0.65rem, 1.8vw, 0.75rem)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "border-color 0.3s, box-shadow 0.3s, color 0.3s",
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "#e63232";
            e.currentTarget.style.boxShadow = "0 0 32px rgba(230,50,50,0.35), inset 0 0 32px rgba(230,50,50,0.08)";
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(230,50,50,0.6)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.color = "#f0ede6";
          }}
        >
          Enter
        </button>

        {/* Hint */}
        <p style={{
          position: "absolute",
          bottom: "clamp(16px, 4vw, 32px)",
          fontSize: "clamp(0.5rem, 1.4vw, 0.6rem)",
          letterSpacing: "0.2em",
          color: "rgba(240,237,230,0.2)",
          textTransform: "uppercase",
          textAlign: "center",
          padding: "0 16px",
          zIndex: 1,
        }}>
          Click enter to begin
        </p>

        {/* Corner decorations — hidden on very small screens */}
        {[
          { top: "clamp(12px,3vw,24px)", left: "clamp(14px,3vw,28px)" },
          { top: "clamp(12px,3vw,24px)", right: "clamp(14px,3vw,28px)" },
          { bottom: "clamp(12px,3vw,24px)", left: "clamp(14px,3vw,28px)" },
          { bottom: "clamp(12px,3vw,24px)", right: "clamp(14px,3vw,28px)" },
        ].map((pos, i) => (
          <div key={i} style={{
            position: "absolute",
            ...pos,
            width: "clamp(12px, 3vw, 20px)",
            height: "clamp(12px, 3vw, 20px)",
            borderColor: "rgba(230,50,50,0.3)",
            borderStyle: "solid",
            borderWidth: 0,
            borderTopWidth:    i < 2  ? "1px" : 0,
            borderBottomWidth: i >= 2 ? "1px" : 0,
            borderLeftWidth:   i % 2 === 0 ? "1px" : 0,
            borderRightWidth:  i % 2 === 1 ? "1px" : 0,
            zIndex: 1,
          }} />
        ))}
      </div>
    );
  }

  // ── VIDEO ──────────────────────────────────────
 // ── VIDEO ──────────────────────────────────────
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "#000",
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        onEnded={onFinish}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",   // shows full video without cropping
          display: "block",
          borderRadius: "clamp(6px, 2vw, 12px)",
        }}
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>
    </div>
  );
}