import React from "react";
import "../styles/PrivacyPolicy.css";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-hero">
        <h1>Privacy Policy</h1>
        <p>Last updated: September 5, 2025</p>
      </div>

      <div className="privacy-content">
        <section>
          <h2>1. Introduction</h2>
          <p>
            At <strong>Workdora</strong>, your privacy is a top priority. This
            Privacy Policy explains how we collect, use, and safeguard your
            information when you use our platform. By accessing Workdora, you
            agree to the terms outlined here.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <ul>
            <li>
              <strong>Personal Information:</strong> such as name, email, and
              phone number when you join our waitlist or sign up.
            </li>
            <li>
              <strong>Workspace Data:</strong> content, tasks, and preferences
              you input into Workdora.
            </li>
            <li>
              <strong>Usage Data:</strong> analytics on how you interact with
              our platform, device type, and browser information.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Provide and improve our productivity platform.</li>
            <li>Personalize your workspace using AI.</li>
            <li>Send updates, notifications, and support messages.</li>
            <li>Maintain security and prevent misuse.</li>
          </ul>
        </section>

        <section>
          <h2>4. Sharing of Information</h2>
          <p>
            We do <strong>not</strong> sell or rent your personal information.
            Data may only be shared with:
          </p>
          <ul>
            <li>
              <strong>Service providers:</strong> who help us run Workdora (e.g.
              hosting, analytics).
            </li>
            <li>
              <strong>Legal requirements:</strong> if required by law or
              governmental request.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Data Retention & Security</h2>
          <p>
            We store your data only as long as necessary to provide our
            services. We implement encryption, access control, and secure
            storage practices to safeguard your data.
          </p>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <p>
            Depending on your region, you may have rights to access, correct, or
            delete your personal data. To exercise these rights, contact us at:
            <a href="mailto:privacy@workdora.com"> privacy@workdora.com</a>.
          </p>
        </section>

        <section>
          <h2>7. Third-Party Services</h2>
          <p>
            Workdora may integrate with third-party tools for notifications,
            communication, or analytics. Please review their privacy practices
            separately.
          </p>
        </section>

        <section>
          <h2>8. Children’s Privacy</h2>
          <p>
            Workdora is not directed to children under 13. We do not knowingly
            collect data from children. If we discover such data, we will
            promptly delete it.
          </p>
        </section>

        <section>
          <h2>9. Changes to this Privacy Policy</h2>
          <p>
            We may update this Privacy Policy occasionally. Any major updates
            will be communicated via email or platform notification.
          </p>
        </section>

        <section>
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions, concerns, or feedback about this Privacy
            Policy, please contact us at:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:privacy@workdora.com">privacy@workdora.com</a>
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

export default PrivacyPolicy;
