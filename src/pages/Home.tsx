import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

interface FormData {
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  organization: string;
  toolsUsed: string[];
  desiredChanges: string;
}

function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    organization: "",
    toolsUsed: [],
    desiredChanges: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      const tools = [...formData.toolsUsed];

      if (checkbox.checked) {
        tools.push(checkbox.value);
      } else {
        const index = tools.indexOf(checkbox.value);
        if (index > -1) {
          tools.splice(index, 1);
        }
      }
      setFormData({ ...formData, toolsUsed: tools });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="App">
      {/* Navigation */}
      {/* <nav className="nav">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">W</span>
            <span className="logo-text">Workdora</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#waitlist">Waitlist</a>
            <Link
              to="/about"
              className={`text-sm font-medium ${
                location.pathname === "/about"
                  ? "text-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              About Us
            </Link>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <h1 className="hero-title animate__animated animate__fadeIn">
            One Tool. More <span className="text-accent">Productivity.</span>
          </h1>
          <p className="hero-subtitle animate__animated animate__fadeIn animate__delay-1s">
            An intelligent, unified platform for seamless productivity.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("waitlist")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="cta-button animate__animated animate__fadeIn animate__delay-2s"
          >
            Join the Waitlist
          </button>
        </div>
        <div className="sheen-overlay"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <h2 className="section-title animate__animated animate__fadeIn">
            Why Workdora?
          </h2>
          <div className="features-grid">
            {[
              {
                icon: "fa-layer-group",
                title: "Unified Platform",
                description:
                  "Streamline tasks, documents, and collaboration in one elegant workspace.",
              },
              {
                icon: "fa-brain",
                title: "Smart Automation",
                description:
                  "Harness AI to predict tasks and optimize workflows effortlessly.",
              },
              {
                icon: "fa-users",
                title: "Seamless Collaboration",
                description:
                  "Stay connected with real-time updates across all devices.",
              },
              {
                icon: "fa-bolt",
                title: "Superior Performance",
                description:
                  "Fast, reliable, and designed for modern efficiency.",
              },
              {
                icon: "fa-lock",
                title: "Advanced Security",
                description:
                  "Protect your data with enterprise-grade safeguards.",
              },
              {
                icon: "fa-puzzle-piece",
                title: "Effortless Integrations",
                description: "Connect seamlessly with your essential tools.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-icon">
                  <i className={`fas ${feature.icon}`}></i>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="waitlist-section">
        <div className="container">
          <h2 className="section-title animate__animated animate__fadeIn">
            Join the Waitlist
          </h2>
          <p className="section-subtitle">
            Be the first to access Workdora’s transformative features.
          </p>
          <div className="waitlist-card">
            <div className="waitlist-form-container">
              {submitted ? (
                <div className="success-message animate__animated animate__fadeIn">
                  <i className="fas fa-check-circle"></i>
                  <h3>Thank You!</h3>
                  <p>You’re on the waitlist. Expect updates soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="waitlist-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name *"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address *"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="Job Title"
                      />
                    </div>
                    <div className="form-group full-width">
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Organization"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>
                        Which tools do you currently use? (Select all that
                        apply)
                      </label>
                      <div className="checkbox-grid">
                        {[
                          "ClickUp",
                          "Notion",
                          "Asana",
                          "Trello",
                          "Slack",
                          "Microsoft Teams",
                          "Jira",
                          "Monday.com",
                          "Linear",
                          "Other",
                        ].map((tool) => (
                          <div key={tool} className="checkbox-group">
                            <input
                              type="checkbox"
                              id={tool}
                              name="toolsUsed"
                              value={tool}
                              checked={formData.toolsUsed.includes(tool)}
                              onChange={handleChange}
                            />
                            <label htmlFor={tool}>{tool}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="form-group full-width">
                      <textarea
                        id="desiredChanges"
                        name="desiredChanges"
                        value={formData.desiredChanges}
                        onChange={handleChange}
                        rows={4}
                        placeholder="What would you change about your current workflow tools?"
                      ></textarea>
                    </div>
                  </div>
                  <button type="submit" className="submit-button">
                    Join Waitlist
                  </button>
                  <div className="form-footer">
                    <p>
                      By joining, you agree to our{" "}
                      <a href="#privacy">Privacy Policy</a> and to receive
                      updates about Workdora.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <a href="#pricing">Pricing</a>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <a href="/about">About</a>
              </div>
              <div className="footer-column">
                <h4>Connect</h4>
                <div className="social-links">
                  <a href="#twitter">
                    <i className="fab fa-twitter"></i> Twitter
                  </a>
                  <a href="#linkedin">
                    <i className="fab fa-linkedin"></i> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Workdora. All rights reserved.</p>
            <div className="legal-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
