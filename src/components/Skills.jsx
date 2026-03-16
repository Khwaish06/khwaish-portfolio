import { useEffect, useRef, useState } from "react";
import "./Skills.css";

const ALL_SKILLS = [
  { name: "JavaScript", cat: "Language" },
  { name: "Python", cat: "Language" },
  { name: "Java", cat: "Language" },
  { name: "C/C++", cat: "Language" },
  { name: "SQL", cat: "Language" },
  { name: "R", cat: "Language" },
  { name: "HTML/CSS", cat: "Language" },
  { name: "React", cat: "Frontend" },
  { name: "Tailwind CSS", cat: "Frontend" },
  { name: "Bootstrap", cat: "Frontend" },
  { name: "Material-UI", cat: "Frontend" },
  { name: "EJS", cat: "Frontend" },
  { name: "Node.js", cat: "Backend" },
  { name: "Express.js", cat: "Backend" },
  { name: "REST APIs", cat: "Backend" },
  { name: "Passport.js", cat: "Backend" },
  { name: "JWT", cat: "Backend" },
  { name: "MongoDB", cat: "Database" },
  { name: "PostgreSQL", cat: "Database" },
  { name: "Mongoose", cat: "Database" },
  { name: "Machine Learning", cat: "AI/ML" },
  { name: "Deep Learning", cat: "AI/ML" },
  { name: "GenAI", cat: "AI/ML" },
  { name: "TensorFlow", cat: "AI/ML" },
  { name: "PyTorch", cat: "AI/ML" },
  { name: "Scikit-learn", cat: "AI/ML" },
  { name: "Transfer Learning", cat: "AI/ML" },
  { name: "Computer Vision", cat: "AI/ML" },
  { name: "NLP", cat: "AI/ML" },
  { name: "AI Engineering", cat: "AI/ML" },
  { name: "Pandas", cat: "Data" },
  { name: "NumPy", cat: "Data" },
  { name: "Matplotlib", cat: "Data" },
  { name: "OpenAI API", cat: "Data" },
  { name: "Git", cat: "Tools" },
  { name: "GitHub", cat: "Tools" },
  { name: "Docker", cat: "Tools" },
  { name: "Postman", cat: "Tools" },
  { name: "Google Cloud", cat: "Tools" },
  { name: "Vercel", cat: "Tools" },
  { name: "Netlify", cat: "Tools" },
  { name: "DSA", cat: "CS" },
  { name: "OOP", cat: "CS" },
  { name: "DBMS", cat: "CS" },
  { name: "Computer Networks", cat: "CS" },
  { name: "OS", cat: "CS" },
];

const CAT_COLORS = {
  Language: { bg: "rgba(230,50,50,0.18)",  border: "rgba(230,50,50,0.85)",  text: "#ff8888" },
  Frontend: { bg: "rgba(80,120,255,0.18)", border: "rgba(80,120,255,0.85)", text: "#889fff" },
  Backend:  { bg: "rgba(230,80,50,0.18)",  border: "rgba(230,80,50,0.85)",  text: "#ff9977" },
  Database: { bg: "rgba(160,60,255,0.18)", border: "rgba(160,60,255,0.85)", text: "#cc88ff" },
  "AI/ML":  { bg: "rgba(255,50,80,0.18)",  border: "rgba(255,50,80,0.85)",  text: "#ff6688" },
  Data:     { bg: "rgba(230,50,50,0.15)",  border: "rgba(230,50,50,0.75)",  text: "#ff8080" },
  Tools:    { bg: "rgba(120,120,150,0.18)",border: "rgba(180,180,210,0.75)",text: "#ccccee" },
  CS:       { bg: "rgba(200,30,30,0.18)",  border: "rgba(200,30,30,0.85)",  text: "#ff6666" },
};

function rnd(a, b) { return a + Math.random() * (b - a); }

function insideEllipse(x, y, rx, ry) {
  return (x * x) / (rx * rx) + (y * y) / (ry * ry) <= 1;
}

export default function Skills() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const stateRef = useRef(null);
  const animRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const W = container.offsetWidth;
    const H = container.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const cx = W / 2;
    const cy = H / 2;
    const RX = W * 0.43;
    const RY = H * 0.41;
    const IRX = RX - 8;
    const IRY = RY - 8;

    const ctx = canvas.getContext("2d");
    ctx.font = '400 11px "DM Mono", monospace';

    const pills = ALL_SKILLS.map((skill) => {
      const tw = ctx.measureText(skill.name).width;
      const pw = tw + 24;
      const ph = 22;
      const halfW = pw / 2;
      const halfH = ph / 2;
      const safeRX = IRX - halfW;
      const safeRY = IRY - halfH;

      let lx, ly;
      do {
        lx = rnd(-safeRX, safeRX);
        ly = rnd(-safeRY, safeRY);
      } while (!insideEllipse(lx, ly, safeRX * 0.95, safeRY * 0.95));

      return {
        ...skill,
        w: pw, h: ph,
        lx, ly,
        vx: rnd(-0.9, 0.9) || 0.5,   // faster spawn
        vy: rnd(-0.9, 0.9) || 0.5,
        bobOffset: rnd(0, Math.PI * 2),
        bobSpeed: rnd(0.008, 0.018),
        hovered: false,
        sx: cx, sy: cy, pscale: 1, depth: 0,
      };
    });

    const state = {
      pills,
      tick: 0,
      rotAngle: 0,
      tiltAngle: 0,
      tiltDir: 1,
    };
    stateRef.current = state;

    function bounceInsideEllipse(p) {
      const halfW = p.w / 2;
      const halfH = p.h / 2;
      const safeRX = IRX - halfW - 1;
      const safeRY = IRY - halfH - 1;
      if (safeRX <= 0 || safeRY <= 0) return;

      const norm = (p.lx * p.lx) / (safeRX * safeRX) + (p.ly * p.ly) / (safeRY * safeRY);
      if (norm >= 1) {
        const nx = (p.lx / (safeRX * safeRX));
        const ny = (p.ly / (safeRY * safeRY));
        const nlen = Math.sqrt(nx * nx + ny * ny) || 1;
        const nnx = nx / nlen;
        const nny = ny / nlen;

        // gentler push back — 0.995 instead of 0.97
        const scale = 0.995 / Math.sqrt(norm);
        p.lx *= scale;
        p.ly *= scale;

        const dot = p.vx * nnx + p.vy * nny;
        if (dot > 0) {
          p.vx -= 2 * dot * nnx * 0.75;
          p.vy -= 2 * dot * nny * 0.75;
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      state.tick++;
      const t = state.tick;

      state.rotAngle += 0.004;
      state.tiltAngle += 0.0015 * state.tiltDir;
      if (Math.abs(state.tiltAngle) > 0.38) state.tiltDir *= -1;

      const tilt = state.tiltAngle;
      const cosTilt = Math.cos(tilt);
      const sinTilt = Math.sin(tilt);

      // Move pills — smoother physics
      for (const p of state.pills) {
        if (p.hovered) continue;

        // stronger bob for more fluid motion
        p.vy += Math.sin(t * p.bobSpeed + p.bobOffset) * 0.008;
        p.vx += Math.cos(t * p.bobSpeed * 0.8 + p.bobOffset) * 0.005;

        p.lx += p.vx;
        p.ly += p.vy;

        // less damping — pills keep momentum longer
        p.vx *= 0.9995;
        p.vy *= 0.9995;

        // higher minimum speed so pills never stall
        const spd = Math.hypot(p.vx, p.vy);
        if (spd < 0.4) {
          const a = Math.random() * Math.PI * 2;
          p.vx += Math.cos(a) * 0.35;
          p.vy += Math.sin(a) * 0.35;
        }

        bounceInsideEllipse(p);
      }

      // Pill-pill collision — softer pushes
      for (let i = 0; i < state.pills.length; i++) {
        for (let j = i + 1; j < state.pills.length; j++) {
          const a = state.pills[i], b = state.pills[j];
          const dx = b.lx - a.lx;
          const dy = b.ly - a.ly;
          const minX = (a.w + b.w) / 2 + 4;
          const minY = (a.h + b.h) / 2 + 4;
          if (Math.abs(dx) < minX && Math.abs(dy) < minY) {
            const ox = minX - Math.abs(dx);
            const oy = minY - Math.abs(dy);
            let nx, ny;
            if (ox < oy) { nx = Math.sign(dx); ny = 0; }
            else         { nx = 0; ny = Math.sign(dy); }

            // softer push — 0.3 instead of 0.5
            const push = Math.min(ox, oy) * 0.3;
            if (!a.hovered) { a.lx -= nx * push; a.ly -= ny * push; bounceInsideEllipse(a); }
            if (!b.hovered) { b.lx += nx * push; b.ly += ny * push; bounceInsideEllipse(b); }

            const rv = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
            if (rv < 0) {
              // softer impulse — 0.4 instead of 0.55
              const imp = rv * 0.4;
              if (!a.hovered) { a.vx += imp * nx; a.vy += imp * ny; }
              if (!b.hovered) { b.vx -= imp * nx; b.vy -= imp * ny; }
            }
          }
        }
      }

      // Project pills to screen via tilt
      for (const p of state.pills) {
        const sy_tilted = p.ly * cosTilt;
        const sz = p.ly * sinTilt;
        const fov = 3.8;
        const scale = fov / (fov + sz / Math.max(RY, 1));
        p.sx = cx + p.lx * scale;
        p.sy = cy + sy_tilted * scale;
        p.depth = sz;
        p.pscale = scale;
      }

      // ── DRAW GLOBE ──────────────────────────────

      for (let i = 4; i >= 1; i--) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, RX + i * 10, RY + i * 8, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200,20,20,${0.055 - i * 0.011})`;
        ctx.lineWidth = 8;
        ctx.stroke();
      }

      const grd = ctx.createRadialGradient(cx - RX * 0.22, cy - RY * 0.22, 8, cx, cy, Math.max(RX, RY) * 1.05);
      grd.addColorStop(0,    "rgba(32,5,5,0.95)");
      grd.addColorStop(0.5,  "rgba(14,3,3,0.91)");
      grd.addColorStop(1,    "rgba(4,1,1,0.97)");
      ctx.beginPath();
      ctx.ellipse(cx, cy, RX, RY, 0, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Grid lines clipped inside globe
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, RX - 1, RY - 1, 0, 0, Math.PI * 2);
      ctx.clip();
      ctx.globalAlpha = 0.07;

      for (let i = 1; i <= 5; i++) {
        const ratio = (i / 6) * 2 - 1;
        const latY = cy + ratio * RY * cosTilt;
        const latRX = RX * Math.sqrt(Math.max(0, 1 - ratio * ratio));
        const latRY = Math.max(1, latRX * 0.2 * Math.abs(cosTilt));
        ctx.beginPath();
        ctx.ellipse(cx, latY, latRX, latRY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "#ff2222";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let i = 0; i < 8; i++) {
        const angle = state.rotAngle + (Math.PI * i) / 8;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, RX * 0.15, RY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "#ff2222";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.ellipse(cx, cy, RX, RY, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(210,30,30,0.7)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx - RX * 0.18, cy - RY * 0.2, RX * 0.48, RY * 0.32, -0.2, Math.PI * 1.1, Math.PI * 1.75);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // ── CLIP PILLS TO GLOBE ──────────────────────
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, RX - 1, RY - 1, 0, 0, Math.PI * 2);
      ctx.clip();

      const sorted = [...state.pills].sort((a, b) => (a.depth || 0) - (b.depth || 0));

      for (const p of sorted) {
        const col = CAT_COLORS[p.cat] || CAT_COLORS.Tools;
        const isHov = p.hovered;
        const s = Math.max(0.6, Math.min(1.15, p.pscale || 1));
        const pw = p.w * s;
        const ph = p.h * s;
        const r = ph / 2;
        const x = p.sx - pw / 2;
        const y = p.sy - ph / 2;

        const depthAlpha = Math.min(1, 0.38 + ((p.depth || 0) / RY + 1) * 0.32);

        ctx.save();
        ctx.globalAlpha = isHov ? 1 : depthAlpha;

        if (isHov) {
          ctx.shadowColor = "rgba(230,50,50,0.9)";
          ctx.shadowBlur = 20;
        }

        ctx.beginPath();
        ctx.roundRect(x, y, pw, ph, r);
        ctx.fillStyle = isHov ? "rgba(45,6,6,1)" : col.bg;
        ctx.fill();

        ctx.beginPath();
        ctx.roundRect(x, y, pw, ph, r);
        ctx.strokeStyle = isHov ? "#ff3333" : col.border;
        ctx.lineWidth = isHov ? 1.5 : Math.max(0.6, s * 0.9);
        ctx.stroke();

        ctx.shadowBlur = 0;

        const fontSize = Math.max(8, Math.round(11 * s));
        ctx.font = `400 ${fontSize}px "DM Mono", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = isHov ? "#ffffff" : col.text;
        ctx.fillText(p.name, p.sx, p.sy);

        ctx.restore();
      }

      ctx.restore();

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (W / rect.width);
      const my = (e.clientY - rect.top) * (H / rect.height);
      let found = null;
      for (const p of stateRef.current.pills) {
        const s = Math.max(0.6, Math.min(1.15, p.pscale || 1));
        const pw = p.w * s;
        const ph = p.h * s;
        const hit = mx >= p.sx - pw / 2 && mx <= p.sx + pw / 2 &&
                    my >= p.sy - ph / 2 && my <= p.sy + ph / 2;
        p.hovered = hit;
        if (hit) found = p.name;
      }
      setHovered(found);
      canvas.style.cursor = found ? "pointer" : "default";
    };

    const onLeave = () => {
      for (const p of stateRef.current.pills) p.hovered = false;
      setHovered(null);
    };

    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (W / rect.width);
      const my = (e.clientY - rect.top) * (H / rect.height);
      for (const p of stateRef.current.pills) {
        const s = Math.max(0.6, Math.min(1.15, p.pscale || 1));
        const pw = p.w * s;
        const ph = p.h * s;
        const hit = mx >= p.sx - pw / 2 && mx <= p.sx + pw / 2 &&
                    my >= p.sy - ph / 2 && my <= p.sy + ph / 2;
        if (hit) {
          const a = Math.random() * Math.PI * 2;
          p.vx = Math.cos(a) * 4;
          p.vy = Math.sin(a) * 4;
        }
      }
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <section className="skills-section">
      <div className="skills-header">
        <p className="skills-label">WHAT I KNOW</p>
        <h2 className="skills-heading">Skills</h2>
        <p className="skills-subheading">Hover to highlight · Click to scatter</p>
      </div>

      <div className="skills-arena" ref={containerRef}>
        <canvas ref={canvasRef} className="skills-canvas" />
        {hovered && <div className="skills-tooltip">{hovered}</div>}
      </div>

      <div className="skills-legend">
        {Object.entries(CAT_COLORS).map(([cat, col]) => (
          <span key={cat} className="legend-item"
            style={{ color: col.text, borderColor: col.border, background: col.bg }}>
            <span className="legend-dot" style={{ background: col.border }} />
            {cat}
          </span>
        ))}
      </div>
    </section>
  );
}