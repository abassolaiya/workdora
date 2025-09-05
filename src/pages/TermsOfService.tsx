import React from "react";
import "../styles/TermsOfService.css";

const TermsOfService: React.FC = () => {
  return (
    <div className="terms-container">
      <div className="terms-hero">
        <h1>Terms of Service</h1>
        <p>Last updated: September 5, 2025</p>
      </div>

      <div className="terms-content">
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using <strong>Workdora</strong>, you agree to be
            bound by these Terms of Service and our Privacy Policy. If you do
            not agree, you may not use the platform.
          </p>
        </section>

        <section>
          <h2>2. Eligibility</h2>
          <p>
            You must be at least 13 years old to use Workdora. If you are under
            18, you represent that you have parental or guardian consent.
          </p>
        </section>

        <section>
          <h2>3. Accounts & Responsibilities</h2>
          <ul>
            <li>
              You must provide accurate information when creating an account.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account credentials.
            </li>
            <li>
              You are responsible for all activities that occur under your
              account.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Acceptable Use</h2>
          <p>You agree not to use Workdora to:</p>
          <ul>
            <li>Violate any applicable laws or regulations.</li>
            <li>Upload or share harmful, offensive, or unlawful content.</li>
            <li>
              Attempt to gain unauthorized access to our systems or disrupt the
              platform.
            </li>
            <li>Misuse AI features for spam or harmful automation.</li>
          </ul>
        </section>

        <section>
          <h2>5. AI-Powered Features</h2>
          <p>
            Workdora integrates artificial intelligence to enhance productivity.
            You acknowledge that AI outputs may not always be accurate and agree
            to review and use them responsibly.
          </p>
        </section>

        <section>
          <h2>6. Service Availability</h2>
          <p>
            We aim to provide continuous access, but we do not guarantee
            uninterrupted availability. We may suspend or modify services for
            maintenance, updates, or unforeseen issues.
          </p>
        </section>

        <section>
          <h2>7. Intellectual Property</h2>
          <p>
            Workdora, including its name, logo, and platform design, is the
            intellectual property of Workdora Technologies. You may not copy,
            modify, or distribute our content without permission.
          </p>
        </section>

        <section>
          <h2>8. Termination</h2>
          <p>
            We may suspend or terminate your account if you violate these Terms
            or misuse the platform. You may also delete your account at any
            time.
          </p>
        </section>

        <section>
          <h2>9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Workdora is not responsible
            for indirect, incidental, or consequential damages arising from your
            use of the platform.
          </p>
        </section>

        <section>
          <h2>10. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of
            Workdora after changes means you accept the revised Terms.
          </p>
        </section>

        <section>
          <h2>11. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the
            laws of Nigeria, without regard to conflict of law principles.
          </p>
        </section>

        <section>
          <h2>12. Contact Us</h2>
          <p>If you have any questions about these Terms, contact us at:</p>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:support@workdora.com">support@workdora.com</a>
            </li>
            <li>Phone: +2347066419790</li>
            <li>
              Website: <a href="https://workdora.com">www.workdora.com</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
