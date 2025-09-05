// src/pages/About.js
import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>About Workdora</h1>
          <p>
            One intelligent platform that eliminates tool overload, bringing
            AI-native productivity directly into your workspace.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="story">
        <h2>Our Story</h2>
        <div className="story-text">
          <p>
            Workdora was born out of frustration with endless apps, constant
            context switching, and wasted energy. Teams were spending more time
            juggling tools than doing actual work.
          </p>
          <p>
            In 2025, we reimagined productivity from the ground up: What if AI
            could live natively in your workspace, unifying tasks,
            communication, and knowledge into one flow?
          </p>
          <p>
            That’s the Workdora vision—fewer apps, fewer distractions, more
            focus. Our mission is to empower teams to achieve more with less
            effort by making productivity simple, intelligent, and human.
          </p>
        </div>
      </section>

      {/* Why Workdora */}
      <section className="why">
        <h2>Why Workdora?</h2>
        <div className="why-grid">
          <div className="why-card">
            <div className="icon">🤖</div>
            <h3>AI-Native Workspace</h3>
            <p>
              AI is built into the core of Workdora—not an add-on. Automate
              routine tasks, generate insights instantly, and stay ahead with
              smart suggestions.
            </p>
          </div>
          <div className="why-card">
            <div className="icon">📂</div>
            <h3>One Platform</h3>
            <p>
              No more switching between countless apps. Tasks, docs,
              communication, and goals live together in one seamless experience.
            </p>
          </div>
          <div className="why-card">
            <div className="icon">⚡</div>
            <h3>More Focus</h3>
            <p>
              Less time lost to notifications and fragmented workflows. More
              time for real, meaningful work.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Simplicity</h3>
            <p>
              We strip away the noise so teams can focus on what matters most.
            </p>
          </div>
          <div className="value-card">
            <h3>Empowerment</h3>
            <p>
              Our tools amplify human creativity and decision-making, not
              replace them.
            </p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>
              We constantly explore new ways AI can make work smarter and more
              human.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
