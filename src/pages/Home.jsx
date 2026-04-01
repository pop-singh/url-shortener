import { useState } from "react";
import { Link } from "react-router-dom";
import { shortenUrl } from "../service/service";
import ParticlesBackground from "../component/ParticlesBackground";
import "./Home.css";

const FEATURES = [
  { icon: "⚡", title: "Lightning Fast", desc: "Generate short links in milliseconds with zero delay." },
  { icon: "🔒", title: "Secure by Default", desc: "Every link is served over HTTPS automatically." },
  { icon: "📊", title: "Analytics Ready", desc: "Track clicks, referrers, and engagement in real time." },
  { icon: "🌐", title: "Global Delivery", desc: "Fast redirects from data centers around the world." },
];

const STATS = [
  { value: "10M+", label: "Links Shortened" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "150+", label: "Countries Reached" },
];

const STEPS = [
  { num: "01", title: "Paste your URL", desc: "Drop in any long URL — no login required." },
  { num: "02", title: "Click Shorten", desc: "We generate a compact link instantly." },
  { num: "03", title: "Copy & Share", desc: "Use your short link anywhere, anytime." },
];

export default function Home() {
  const [heroUrl, setHeroUrl] = useState("");
  const [heroShort, setHeroShort] = useState("");
  const [heroLoading, setHeroLoading] = useState(false);
  const [heroCopied, setHeroCopied] = useState(false);
  const [heroError, setHeroError] = useState("");

  const handleHeroShorten = async () => {
    if (!heroUrl.trim()) return;
    if (!/^https?:\/\/.+/.test(heroUrl.trim())) {
      setHeroError("URL must start with http:// or https://");
      return;
    }
    setHeroLoading(true);
    setHeroError("");
    setHeroShort("");
    try {
      const res = await shortenUrl(heroUrl);
      setHeroShort(res.data.shortUrl);
    } catch {
      setHeroError("Could not shorten. Please try again.");
    } finally {
      setHeroLoading(false);
    }
  };

  const handleHeroCopy = () => {
    navigator.clipboard.writeText(heroShort).then(() => {
      setHeroCopied(true);
      setTimeout(() => setHeroCopied(false), 2000);
    });
  };

  return (
    <div className="home">
      {/* ── Hero ── */}
      <section className="hero">
        <ParticlesBackground />
        <div className="hero-inner">
          <span className="hero-badge">✨ Free · Fast · No Signup</span>
          <h1 className="hero-title">
            Shorten Links.<br />
            <span className="hero-highlight">Amplify Reach.</span>
          </h1>
          <p className="hero-subtitle">
            Create powerful short links in seconds. Share smarter, track everything.
          </p>

          <div className="hero-form-card">
            <div className="hero-input-row">
              <input
                type="text"
                placeholder="Paste your long URL here…"
                value={heroUrl}
                onChange={(e) => { setHeroUrl(e.target.value); setHeroError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleHeroShorten()}
              />
              <button
                className="hero-shorten-btn"
                onClick={handleHeroShorten}
                disabled={heroLoading}
              >
                {heroLoading ? <span className="hero-spinner" /> : "Shorten →"}
              </button>
            </div>

            {heroError && <p className="hero-error">{heroError}</p>}

            {heroShort && (
              <div className="hero-result">
                <a href={heroShort} target="_blank" rel="noreferrer" className="hero-short-url">
                  {heroShort}
                </a>
                <div className="hero-result-actions">
                  <button className="hero-copy-btn" onClick={handleHeroCopy}>
                    {heroCopied ? "✓ Copied!" : "📋 Copy"}
                  </button>
                  <Link to="/shorten" className="hero-full-btn">Full Tool →</Link>
                </div>
              </div>
            )}
          </div>

          <div className="hero-trust">
            <span>✓ Free forever</span>
            <span>✓ No signup needed</span>
            <span>✓ Instant results</span>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-section">
        <div className="section-container">
          <p className="section-eyebrow">Features</p>
          <h2 className="section-title">Everything you need</h2>
          <p className="section-subtitle">Powerful tools, zero complexity.</p>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon-wrap">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats-section">
        <div className="section-container stats-inner">
          {STATS.map((s) => (
            <div key={s.label} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="how-section">
        <div className="section-container">
          <p className="section-eyebrow">Process</p>
          <h2 className="section-title">How it works</h2>
          <p className="section-subtitle">Three steps to a shorter, smarter link.</p>
          <div className="steps-row">
            {STEPS.map((step, i) => (
              <div key={i} className="step-card">
                <span className="step-num">{step.num}</span>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
                {i < STEPS.length - 1 && <span className="step-arrow">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="section-container cta-inner">
          <h2 className="cta-title">Ready to shorten smarter?</h2>
          <p className="cta-subtitle">Join thousands who trust LinkSnap every day.</p>
          <div className="cta-actions">
            <Link to="/shorten" className="cta-primary-btn">Start for Free →</Link>
            <Link to="/pricing" className="cta-secondary-btn">See Pricing</Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="home-footer">
        <p>© 2026 LinkSnap · <Link to="/contact">Contact</Link> · <Link to="/docs">Docs</Link> · <Link to="/pricing">Pricing</Link></p>
      </footer>
    </div>
  );
}
