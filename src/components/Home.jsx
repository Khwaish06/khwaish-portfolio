import { useRef, useEffect, useState } from "react";
import "./Home.css";

const FULL_TEXT = "I'm a developer who bridges web and AI — crafting full-stack applications with the MERN stack while diving deep into computer vision and machine learning. With published research, internships, and production-grade projects, I turn ideas into impactful digital experiences.";

const TYPE_SPEED = 22;
const ERASE_SPEED = 10;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_ERASE = 400;

export default function Home() {
  const videoRef = useRef(null);
  const [displayed, setDisplayed] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    const delay = setTimeout(() => setStarted(true), 1200);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (!started) return;

    let timeout;

    if (!isErasing) {
      if (charIndex < FULL_TEXT.length) {
        timeout = setTimeout(() => {
          setDisplayed(FULL_TEXT.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, TYPE_SPEED);
      } else {
        timeout = setTimeout(() => {
          setIsErasing(true);
        }, PAUSE_AFTER_TYPE);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayed(FULL_TEXT.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, ERASE_SPEED);
      } else {
        timeout = setTimeout(() => {
          setIsErasing(false);
        }, PAUSE_AFTER_ERASE);
      }
    }

    return () => clearTimeout(timeout);
  }, [started, charIndex, isErasing]);

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <section className="hero">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="hero-video"
          onEnded={handleVideoEnd}
          onLoadedMetadata={(e) => {
            e.target.playbackRate = 0.85;
          }}
        >
          <source src="/display.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </div>

      <div className="hero-content">
        <p className="about-label">ABOUT ME</p>

        <h1 className="about-heading">
          Hey, I'm{" "}
          <span className="name-highlight">Khwaish Goel</span>.
        </h1>

        <p className="about-text">
          {displayed}
          <span className="cursor">|</span>
        </p>
      </div>
    </section>
  );
}