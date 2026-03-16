import "./Projects.css";

const projects = [
  {
    id: 1,
    title: "MockHire",
    description:
      "AI-powered interview platform with personalized question generation based on uploaded resumes. Features voice recognition, multi-language coding environment, real-time answer evaluation, and Google OAuth authentication.",
    tech: ["React", "Node.js", "MongoDB", "OpenAI API", "Speech-to-Text", "Google OAuth"],
    link: "https://mock-hire-tjt5.vercel.app/",
    image: "/images/mockhire.png",
  },
  {
    id: 2,
    title: "ScoutVault",
    description:
      "ML-powered scouting platform with Random Forest & Gradient Boosting achieving 98% prediction accuracy. Built with a full-stack React + Express app featuring interactive data visualizations and real-time state management.",
    tech: ["React", "Node.js", "MongoDB", "Python", "Scikit-learn", "Tailwind CSS"],
    link: "https://scoutvault.netlify.app/",
    image: "/images/scoutvault.png",
  },
  {
    id: 3,
    title: "Wanderlust",
    description:
      "Full-stack travel listing platform built on the MVC pattern. Features user authentication via Passport.js, session management, CRUD listings with image uploads through Multer and Cloudinary.",
    tech: ["MongoDB", "Express.js", "Node.js", "EJS", "Bootstrap", "Cloudinary"],
    link: "https://wanderlust-8g5q.onrender.com/listings",
    image: "/images/wanderlust.png",
  }
];

export default function Projects() {
  const handleCardClick = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="projects-section">
      <div className="projects-header">
        <p className="projects-label">MY WORK</p>
        <h2 className="projects-heading">Projects</h2>
        <p className="projects-subheading">Things I've built that I'm proud of</p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => handleCardClick(project.link)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleCardClick(project.link)}
          >
            {/* Top accent line */}
            <div className="card-accent-line" />

            {/* Project Image */}
            <div className="card-image-wrap">
              <img
                src={project.image}
                alt={project.title}
                className="card-image"
                onError={(e) => { e.target.style.display = "none"; e.target.parentNode.classList.add("no-image"); }}
              />
              <div className="card-image-overlay" />
              <span className="card-number">0{project.id}</span>
            </div>

            {/* Body */}
            <div className="card-body">
              {/* Title */}
              <h3 className="card-title">{project.title}</h3>

              {/* Description */}
              <p className="card-description">{project.description}</p>

              {/* Tech tags */}
              <div className="card-tags">
                {project.tech.map((t) => (
                  <span key={t} className="card-tag">{t}</span>
                ))}
              </div>

              {/* Click hint */}
              <div className="card-footer">
                <span className="card-link-hint">
                  View
                  <svg viewBox="0 0 16 16" fill="none" className="arrow-icon">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Hover glow */}
            <div className="card-glow" />
          </div>
        ))}
      </div>
    </section>
  );
}