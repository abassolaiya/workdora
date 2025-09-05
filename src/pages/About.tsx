import { Link } from "react-router-dom";
import "../styles/About.css";

const About = () => {
  const stats = [
    { num: "1,270+", label: "Teams on waitlist" },
    { num: "42", label: "Design partners" },
    { num: "28 %", label: "Less tool-time*" },
  ];
  return (
    <div className="about-page">
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <h1>Built for agencies who bill by the hour.</h1>
          <p>
            Workdora replaces the 7+ apps you juggle to scope, track and invoice
            work—so your team wins back a day every week.
          </p>
          <Link to="/#waitlist" className="cta-button">
            Get Early Access – It’s Free
          </Link>
          <span className="hero-note">
            *Average time saved by beta agencies vs. ClickUp + Harvest + Slack
            stack.
          </span>
        </div>
      </section>

      {/* METRIC BAR */}
      <section className="metric-bar">
        <div className="container">
          {stats.map((s) => (
            <div key={s.label} className="metric">
              <div className="num">{s.num}</div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="story">
        <div className="container">
          <h2>Our story</h2>
          <div className="content">
            <p>
              I ran a 15-person agency. We spent 28 % of the week copy-pasting
              between Slack, ClickUp and Harvest—then still missed billable
              hours. Existing “all-in-one” tools were slow and bloated.
            </p>
            <p>
              So we started Workdora: a Slack-first task layer that turns
              messages into scoped, billable deliverables in{" "}
              <strong>under 5 seconds</strong>. No migration headaches, no new
              UI to learn.
            </p>
            <p>
              Today 42 agencies run their entire delivery workflow inside
              Workdora—and get paid faster because scope, time and invoice live
              in the same thread.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="values">
        <div className="container">
          <h2>What we believe</h2>
          <div className="values-grid">
            <div className="value">
              <h3>Simplicity sells.</h3>
              <p>If onboarding takes longer than a coffee break, we failed.</p>
            </div>
            <div className="value">
              <h3>Time = money.</h3>
              <p>Every extra click steals billable minutes from our users.</p>
            </div>
            <div className="value">
              <h3>AI is a co-worker.</h3>
              <p>
                Not a gimmick—just invisible automation that moves work forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="team">
        <div className="container">
          <h2>Who's building it</h2>
          <div className="team-grid">
            <div className="member">
              <h4>Abass Olaiya</h4>
              <span>CEO & Founder</span>
              <p>
                Ex-agency owner (exit 2023). 8 years shipping client work on
                time.
              </p>
            </div>
            <div className="member">
              <h4>Popoola Covenat</h4>
              <span>CTO</span>
              <p>
                Ex-PhiBITech Software lead. 12 yrs Node / real-time systems.
              </p>
            </div>
            <div className="member">
              <h4>Olakuleyin Stephen</h4>
              <span>Design</span>
              <p>Former Atlassian Jira design lead. 5 yrs building B2B UX.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="cta-strip">
        <div className="container">
          <h2>Ready to win back a day every week?</h2>
          <Link to="/#waitlist" className="cta-button large">
            Get Early Access – It’s Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
