import { useState, useEffect } from "react";
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

  // Add this near your other useEffect hooks
  useEffect(() => {
    // Warm up the server when the component mounts
    const warmUpServer = async () => {
      try {
        const API_BASE_URL =
          import.meta.env.VITE_API_URL ||
          "https://workdorabackend.onrender.com";
        console.log("Warming up server...");

        // Make a simple HEAD request to wake up the server
        await fetch(`${API_BASE_URL}/api/health`, {
          method: "HEAD",
          // Add a timeout to prevent hanging
          signal: AbortSignal.timeout(5000),
        }).catch(() => {
          // It's okay if this fails - we're just trying to wake up the server
          console.log("Server warm-up attempt completed");
        });
      } catch (error) {
        console.log("Server warm-up attempt completed (may have timed out)");
      }
    };

    warmUpServer();
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
      const API_BASE_URL =
        import.meta.env.VITE_API_URL || "https://workdorabackend.onrender.com";

      // Show a loading message that indicates server might be waking up
      const loadingInterval = setInterval(() => {
        console.log("Server might be waking up, please wait...");
      }, 2000);

      const res = await fetchWithRetry(
        `${API_BASE_URL}/api/waitlist`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        3
      ); // Retry up to 3 times

      clearInterval(loadingInterval);

      // Check if the response is OK before trying to parse JSON
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${res.status} - ${errorText}`);
      }

      const responseData = await res.json();
      console.log("Response:", responseData);

      if (responseData.success) {
        setSubmitted(true);
        localStorage.setItem(
          "workdora_ref",
          responseData.data.referralCode ||
            email.split("@")[0] + "_" + Math.random().toString(36).slice(2, 8)
        );
      } else {
        alert(
          responseData.message || "Something went wrong with your submission."
        );
      }
    } catch (error: any) {
      console.error("Submission error:", error);

      // More specific error messages
      if (error.name === "AbortError") {
        alert(
          "The request took too long. The server might be waking up. Please try again in a few moments."
        );
      } else if (error.message.includes("Failed to fetch")) {
        alert(
          "Cannot connect to the server. Please check your internet connection and try again."
        );
      } else {
        alert(error.message || "Something went wrong – please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Add this helper function for retry logic
  async function fetchWithRetry(
    url: string,
    options: RequestInit,
    retries: number
  ): Promise<Response> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error: any) {
      if (retries > 0 && error.name === "AbortError") {
        console.log(`Retrying request... ${retries} attempts left`);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
        return fetchWithRetry(url, options, retries - 1);
      }
      throw error;
    }
  }

  const toggleTool = (t: string) =>
    setTools((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  if (submitted) return <ThankYou />;

  return (
    <div className="app-container">
      <Nav />
      <Hero />
      <Features />
      <FAQ />
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
    </div>
  );
}

/* ---------- sub components ---------- */
function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`nav ${isScrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-container">
        <div className="logo">
          <div className="logo-icon">
            <i className="fas fa-bolt"></i>
          </div>
          <span className="logo-text">Workdora</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#waitlist">Waitlist</a>
          <a href="#faq">FAQ</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-background-pattern"></div>

      <div className="hero-content container">
        <div className="hero-badge">
          <span>Early Access Available</span>
        </div>

        <h1 className="hero-title">
          One Tool. More <span className="text-accent">Productivity.</span>
        </h1>

        <p className="hero-subtitle">
          Convert Slack messages into billable tasks in under 5 seconds – join{" "}
          <strong>1,270+ agencies</strong> already on the list.
        </p>

        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">5s</div>
            <div className="stat-label">Task Creation</div>
          </div>
          <div className="stat">
            <div className="stat-number">98%</div>
            <div className="stat-label">Time Saved</div>
          </div>
          <div className="stat">
            <div className="stat-number">1,270+</div>
            <div className="stat-label">Agencies</div>
          </div>
        </div>

        <button
          onClick={() =>
            document
              .getElementById("waitlist")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="cta-button"
        >
          <i className="fas fa-arrow-right"></i>
          Get Early Access – It's Free
        </button>

        <div className="hero-proof">
          <div className="trusted-by">Join agencies who've already saved</div>
          <div className="proof-stats">
            <div className="proof-stat">
              <strong>4,200+</strong> hours
            </div>
            <div className="proof-stat">
              <strong>$127K+</strong> revenue
            </div>
            <div className="proof-stat">
              <strong>98%</strong> satisfaction
            </div>
          </div>
        </div>
      </div>

      <div className="sheen-overlay"></div>
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
        <div className="section-header">
          <h2 className="section-title">Why Workdora?</h2>
          <p className="section-subtitle">
            Designed for agencies that value efficiency and seamless workflows
          </p>
        </div>

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

        <div className="features-cta">
          <h3>Ready to transform your workflow?</h3>
          <a href="#waitlist" className="secondary-button">
            Join the Waitlist
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is Workdora?",
      answer:
        "Workdora is a unified productivity platform that helps agencies convert Slack messages into billable tasks in under 5 seconds. It streamlines task management, documentation, and collaboration in one workspace.",
    },
    {
      question: "How does the waitlist work?",
      answer:
        "Joining our waitlist gives you priority access to Workdora as we roll out invitations. The earlier you join, the sooner you'll get access. We're gradually inviting people from the waitlist to ensure a smooth onboarding experience for everyone.",
    },
    {
      question: "What are the benefits of joining the waitlist?",
      answer:
        "Waitlist members receive exclusive benefits including early access to new features, priority support, and most importantly—beta testers who join through the waitlist will receive a 50% lifetime discount on their subscription once Workdora launches publicly.",
    },
    {
      question: "How do I qualify for the 50% lifetime discount?",
      answer:
        "Anyone who joins the waitlist and is selected as a beta tester will qualify for the 50% lifetime discount. This discount will apply to your account forever, even as we add new features and increase prices for new customers.",
    },
    {
      question: "When will I get access to Workdora?",
      answer:
        "We're rolling out access in phases. The first beta group will get access within 2-3 weeks, with subsequent groups added every 1-2 weeks. You'll receive an email notification when your account is ready.",
    },
    {
      question: "What does it mean to be a design partner?",
      answer:
        "Design partners are agencies that commit to using Workdora with at least 5 seats and provide regular feedback to help shape the product. In addition to the 50% lifetime discount, design partners get direct access to our product team and influence over our roadmap.",
    },
    {
      question: "Which tools does Workdora integrate with?",
      answer:
        "Currently, Workdora integrates with Slack, Harvest, and QuickBooks, with more integrations coming soon. Our goal is to connect with all the tools agencies use daily without requiring you to change your existing workflow.",
    },
    {
      question: "How secure is my data with Workdora?",
      answer:
        "Security is our top priority. We use AES-256 encryption at rest and TLS 1.3 in transit. We're also working toward SOC-2 compliance to ensure enterprise-grade security for all our customers.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes! All beta testers will have full access to Workdora for free during the beta period. After launch, you'll have the option to continue with your 50% lifetime discount or explore our free tier which includes basic functionality.",
    },
    {
      question:
        "How can I maximize my chances of being selected as a beta tester?",
      answer:
        "Complete your waitlist profile thoroughly, especially the information about your current tools and pain points. The more we understand your needs, the more likely we are to select you for early access. Sharing your referral link also increases your priority.",
    },
  ];

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about Workdora and the waitlist
          </p>
        </div>

        <div className="faq-container">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
              >
                <span>{item.question}</span>
                <i
                  className={`fas ${
                    activeIndex === index ? "fa-minus" : "fa-plus"
                  }`}
                ></i>
              </button>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <div className="discount-highlight">
            <div className="discount-badge">
              <i className="fas fa-crown"></i>
              <span>50% Lifetime Discount</span>
            </div>
            <h3>
              Join the waitlist today and secure your exclusive beta tester
              benefits
            </h3>
            <p>Limited spots available for our initial beta rollout</p>
          </div>
          <a href="#waitlist" className="cta-button">
            <i className="fas fa-arrow-right"></i>
            Join Waitlist Now
          </a>
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
        <div className="section-header">
          <h2 className="section-title">Join the Waitlist</h2>
          <p className="section-subtitle">
            Get early access and exclusive benefits as a founding user
          </p>
        </div>

        <div className="waitlist-card">
          <div className="waitlist-header">
            <h3>Reserve Your Spot</h3>
            <p>Takes 45 seconds – we timed it.</p>
          </div>

          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="progress-text">
              {Math.round(progress)}% Complete
            </div>
          </div>

          <form onSubmit={handleSubmit} className="waitlist-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  required
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Work Email *</label>
                <input
                  id="email"
                  required
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone (Optional)</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="job">Job Title</label>
                <input
                  id="job"
                  placeholder="e.g. Project Manager"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="org">Organization</label>
                <input
                  id="org"
                  placeholder="Company name"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                />
              </div>

              <div className="form-group full-width">
                <label>Which tools do you currently use? (select all)</label>
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
                        id={`tool-${t}`}
                        type="checkbox"
                        checked={tools.includes(t)}
                        onChange={() => toggleTool(t)}
                      />
                      <label htmlFor={`tool-${t}`}>{t}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="pain">
                  Biggest pain with current tools? (1 sentence)
                </label>
                <textarea
                  id="pain"
                  placeholder="Tell us what frustrates you most about your current workflow..."
                  rows={3}
                  value={pain}
                  onChange={(e) => setPain(e.target.value)}
                  maxLength={120}
                />
                <div className="char-count">{pain.length}/120</div>
              </div>

              {idealLoi && (
                <div className="form-group full-width">
                  <div className="loi-box">
                    <input id="loi" type="checkbox" />
                    <label htmlFor="loi">
                      <i className="fas fa-crown"></i>
                      I'd like to be a paid design partner (5 seats min, 50%
                      lifetime discount)
                    </label>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`submit-button ${loading ? "loading" : ""}`}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Saving...
                </>
              ) : (
                <>
                  Join Waitlist
                  <i className="fas fa-arrow-right"></i>
                </>
              )}
            </button>

            <div className="form-footer">
              <p>
                By joining you agree to our{" "}
                <a href="/privacy">Privacy Policy</a>. We respect your data and
                never share it without permission.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function ThankYou() {
  const ref = localStorage.getItem("workdora_ref") || "";
  const shareLink = `https://workdora.onrender.com/?ref=${ref}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    // You could add a toast notification here
  };

  return (
    <section className="waitlist-section">
      <div className="container">
        <div className="success-card">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>

          <h2>You're in!</h2>
          <p className="success-message">
            Your spot is saved – we'll email you an invite soon.
          </p>

          <div className="success-benefits">
            <h3>As an early access member, you'll get:</h3>
            <ul>
              <li>
                <i className="fas fa-check"></i> Priority access to new features
              </li>
              <li>
                <i className="fas fa-check"></i> Exclusive founder pricing
                forever
              </li>
              <li>
                <i className="fas fa-check"></i> Direct line to our product team
              </li>
            </ul>
          </div>

          <div className="referral-section">
            <label>
              Share your link – get 3 friends to join and grab Pro free for 1
              year:
            </label>
            <div className="copy-row">
              <input readOnly value={shareLink} />
              <button onClick={copyToClipboard}>
                <i className="fas fa-copy"></i> Copy
              </button>
            </div>
          </div>

          <div className="social-share">
            <p>Or share directly:</p>
            <div className="social-buttons">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  "I just joined the Workdora waitlist! A revolutionary tool that turns Slack messages into billable tasks in seconds. Check it out: " +
                    shareLink
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button twitter"
              >
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  shareLink
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button linkedin"
              >
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
            </div>
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
              <div className="logo-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <span className="logo-text">Workdora</span>
            </div>
            <p className="footer-tagline">Unfold Your Team's Potential</p>
            <div className="footer-social">
              <a
                href="https://twitter.com/workdora"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://linkedin.com/company/workdora"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://github.com/workdora"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#waitlist">Waitlist</a>
              <a href="#pricing">Pricing</a>
              <a href="#integrations">Integrations</a>
            </div>

            <div className="footer-column">
              <h4>Resources</h4>
              <a href="/blog">Blog</a>
              <a href="/docs">Documentation</a>
              <a href="/guides">Guides</a>
              <a href="/webinars">Webinars</a>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <a href="/about">About</a>
              <a href="/careers">Careers</a>
              <a href="/contact">Contact</a>
              <a href="/press">Press</a>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/security">Security</a>
              <a href="/compliance">Compliance</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Workdora, Inc. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
