import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/Home.css";

interface Payload {
  name: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  organization?: string;
  toolsUsed: string[];
  desiredChanges?: string;
  idealLoi: boolean;
  utmSource?: string;
  utmCampaign?: string;
  referrer?: string;
  githubStars: number;
  score: number;
}

const GITHUB_STARS = 312;
const TOOLS_FOR_LOI = ["Slack", "Harvest", "QuickBooks"];

export default function Home() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* form fields */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");
  const [org, setOrg] = useState("");
  const [tools, setTools] = useState<string[]>([]);
  const [pain, setPain] = useState("");
  const [idealLoi, setIdealLoi] = useState(false);

  /* scroll to form if #waitlist */
  useEffect(() => {
    if (window.location.hash === "#waitlist") {
      document
        .getElementById("waitlist")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    setIdealLoi(TOOLS_FOR_LOI.filter((t) => tools.includes(t)).length >= 2);
  }, [tools]);

  const progress =
    (([name, email, job, org].filter(Boolean).length +
      (pain ? 1 : 0) +
      tools.length * 0.2) /
      6) *
    100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload: Payload = {
      name,
      email,
      phone: phone || undefined,
      jobTitle: job || undefined,
      organization: org || undefined,
      toolsUsed: tools,
      desiredChanges: pain || undefined,
      idealLoi,
      utmSource: searchParams.get("utm_source") || undefined,
      utmCampaign: searchParams.get("utm_campaign") || undefined,
      referrer: document.referrer || undefined,
      githubStars: GITHUB_STARS,
      score: 3 * (idealLoi ? 1 : 0) + 2 * (org ? 1 : 0) + (pain ? 1 : 0),
    };
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("network");
      setSubmitted(true);
      localStorage.setItem(
        "workdora_ref",
        email.split("@")[0] + "_" + Math.random().toString(36).slice(2, 8)
      );
    } catch {
      alert("Something went wrong – please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTool = (t: string) =>
    setTools((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  if (submitted) return <ThankYou />;

  return (
    <>
      <Hero />
      <Features />
      <Waitlist
        {...{
          name,
          setName,
          email,
          setEmail,
          phone,
          setPhone,
          job,
          setJob,
          org,
          setOrg,
          tools,
          toggleTool,
          pain,
          setPain,
          idealLoi,
          progress,
          loading,
          handleSubmit,
        }}
      />
      <Footer />
    </>
  );
}

/* ---------- sub components ---------- */
function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-overlay" />
      <div className="hero-content container">
        <h1 className="hero-title animate__animated animate__fadeIn">
          One Tool. More <span className="text-accent">Productivity.</span>
        </h1>
        <p className="hero-subtitle animate__animated animate__fadeIn animate__delay-1s">
          Convert Slack messages into billable tasks in under 5 seconds – join{" "}
          <strong>1,270 agencies</strong> already on the list.
        </p>
        <button
          onClick={() =>
            document
              .getElementById("waitlist")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="cta-button animate__animated animate__fadeIn animate__delay-2s"
        >
          Get Early Access – It’s Free
        </button>
      </div>
      {/* <div className="hero-content container">
        <h1>
          One Tool. More <span className="text-accent">Productivity.</span>
        </h1>
        <p>
          Convert Slack messages into billable tasks in under 5 seconds – join{" "}
          <strong>1,270 agencies</strong> already on the list.
        </p>
        <a href="#waitlist" className="cta-button">
          Join Waitlist
        </a>
      </div> */}
      <div className="sheen-overlay" />
    </section>
  );
}

function Features() {
  const feats = [
    {
      icon: "fa-layer-group",
      title: "Unified Platform",
      desc: "Streamline tasks, docs, collaboration in one workspace.",
    },
    {
      icon: "fa-brain",
      title: "Smart Automation",
      desc: "AI predicts tasks & bottlenecks before they happen.",
    },
    {
      icon: "fa-users",
      title: "Slack-Native",
      desc: "Turn any message into a scoped, billable task with /task.",
    },
    {
      icon: "fa-bolt",
      title: "Offline-First",
      desc: "Desktop wrapper keeps working without Wi-Fi.",
    },
    {
      icon: "fa-lock",
      title: "Advanced Security",
      desc: "AES-256 at rest, TLS 1.3 in transit, SOC-2 soon.",
    },
    {
      icon: "fa-puzzle-piece",
      title: "1-Click Invoicing",
      desc: "Close task → export to Harvest / QuickBooks instantly.",
    },
  ];
  return (
    <section id="features" className="features-section">
      <div className="container">
        <h2 className="section-title">Why Workdora?</h2>
        <div className="features-grid">
          {feats.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">
                <i className={`fas ${f.icon}`} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Waitlist(props: any) {
  const {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    job,
    setJob,
    org,
    setOrg,
    tools,
    toggleTool,
    pain,
    setPain,
    idealLoi,
    progress,
    loading,
    handleSubmit,
  } = props;
  return (
    <section id="waitlist" className="waitlist-section">
      <div className="container">
        <div className="waitlist-card">
          <h2>Join the Waitlist</h2>
          <p className="sub">Takes 45 seconds – we timed it.</p>

          <form onSubmit={handleSubmit} className="waitlist-form">
            <div className="progress-bar">
              <div style={{ width: `${progress}%` }} />
            </div>

            <div className="inputs">
              <input
                required
                aria-label="Full name"
                placeholder="Full name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                required
                aria-label="Work email"
                placeholder="Work email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                aria-label="Phone (optional)"
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                aria-label="Job title"
                placeholder="Job title"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
              <input
                aria-label="Organization"
                placeholder="Organization"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
              />

              <fieldset>
                <legend>Which tools do you currently use? (select all)</legend>
                <div className="tool-grid">
                  {[
                    "Slack",
                    "Harvest",
                    "QuickBooks",
                    "ClickUp",
                    "Notion",
                    "Asana",
                    "Trello",
                    "Jira",
                    "Monday.com",
                    "Linear",
                    "Other",
                  ].map((t) => (
                    <div key={t} className="tool-chk">
                      <input
                        id={t}
                        type="checkbox"
                        checked={tools.includes(t)}
                        onChange={() => toggleTool(t)}
                      />
                      <label htmlFor={t}>{t}</label>
                    </div>
                  ))}
                </div>
              </fieldset>

              <textarea
                aria-label="Biggest pain"
                placeholder="Biggest pain with current tools? (1 sentence)"
                rows={2}
                value={pain}
                onChange={(e) => setPain(e.target.value)}
                maxLength={120}
              />

              {idealLoi && (
                <div className="loi-box">
                  <input id="loi" type="checkbox" />
                  <label htmlFor="loi">
                    I'd like to be a paid design partner (5 seats min, 50 %
                    lifetime discount)
                  </label>
                </div>
              )}
            </div>

            <button type="submit" disabled={loading} className="submit-button">
              {loading ? "Saving…" : "Join Waitlist →"}
            </button>
            <p className="form-footer">
              By joining you agree to our <a href="/privacy">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function ThankYou() {
  const ref = localStorage.getItem("workdora_ref") || "";
  const shareLink = `https://workdora.com?ref=${ref}`;
  return (
    <section className="waitlist-section">
      <div className="container">
        <div className="waitlist-card success-card">
          <i className="fas fa-check-circle" />
          <h2>You're in!</h2>
          <p>Your spot is saved – we'll email you an invite soon.</p>
          <label>
            Share your link – get 3 friends to join and grab Pro free for 1
            year:
          </label>
          <div className="copy-row">
            <input readOnly value={shareLink} />
            <button onClick={() => navigator.clipboard.writeText(shareLink)}>
              Copy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-icon">W</span>
              <span className="logo-text">Workdora</span>
            </div>
            <p className="footer-tagline">Unfold Your Team's Potential</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#waitlist">Waitlist</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="/about">About</a>
            </div>
            <div className="footer-column">
              <h4>Connect</h4>
              <div className="social-links">
                <a
                  href="https://twitter.com/workdora"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-twitter" /> Twitter
                </a>
                <a
                  href="https://linkedin.com/company/workdora"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-linkedin" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Workdora. All rights reserved.</p>
          <div className="legal-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
